"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function useRealTimeExecution() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)
  const [executionProgress, setExecutionProgress] = useState(null)
  const [executionOutput, setExecutionOutput] = useState([])
  const [error, setError] = useState(null)
  const [executionId, setExecutionId] = useState(null)
  const [queueStatus, setQueueStatus] = useState(null)
  const [realTimeOutput, setRealTimeOutput] = useState("")

  const outputRef = useRef([])
  const progressRef = useRef(null)
  const pollingRef = useRef(null)
  const wsRef = useRef(null)

  // Initialize WebSocket connection for real-time updates
  const initializeWebSocket = useCallback((execId) => {
    if (wsRef.current) {
      wsRef.current.close()
    }

    // Simulate WebSocket with polling for real-time updates
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/code/execute?action=stream&executionId=${execId}`)
        const data = await response.json()

        if (data.success && data.output) {
          setRealTimeOutput((prev) => prev + data.output)
          setExecutionOutput((prev) => [
            ...prev,
            {
              type: "stdout",
              content: data.output,
              timestamp: Date.now(),
            },
          ])
        }

        if (data.status === "completed" || data.status === "failed") {
          clearInterval(pollInterval)
          setIsExecuting(false)
        }
      } catch (error) {
        console.error("Real-time polling error:", error)
      }
    }, 100) // Poll every 100ms for real-time feel

    return () => clearInterval(pollInterval)
  }, [])

  const executeCode = useCallback(
    async (code, language, input = "", userId = null) => {
      try {
        setIsExecuting(true)
        setError(null)
        setExecutionResult(null)
        setExecutionProgress({ status: "starting", message: "Initializing execution..." })
        setExecutionOutput([])
        setRealTimeOutput("")
        outputRef.current = []

        const response = await fetch("/api/code/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, code, language, input, realTime: true }),
        })

        const data = await response.json()

        if (data.success) {
          setExecutionId(data.executionId)

          // Start real-time monitoring
          const cleanup = initializeWebSocket(data.executionId)

          // Start polling for status updates
          startPolling(data.executionId)

          return data.result
        } else {
          throw new Error(data.error)
        }
      } catch (err) {
        setError(err.message)
        setIsExecuting(false)
        throw err
      }
    },
    [initializeWebSocket],
  )

  const startPolling = useCallback((execId) => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current)
    }

    pollingRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/code/execute?action=status&executionId=${execId}`)
        const data = await response.json()

        if (data.success && data.status) {
          const status = data.status

          setExecutionProgress({
            status: status.status,
            message: getStatusMessage(status.status),
            executionTime: status.executionTime,
            progress: getProgressPercentage(status.status),
          })

          if (status.status === "completed" || status.status === "failed" || status.status === "cancelled") {
            setIsExecuting(false)
            setExecutionResult(status.result || data.result)
            clearInterval(pollingRef.current)
            pollingRef.current = null
          }
        }
      } catch (error) {
        console.error("Polling error:", error)
      }
    }, 200) // Faster polling for better responsiveness
  }, [])

  const getStatusMessage = (status) => {
    const messages = {
      pending: "Waiting in execution queue...",
      starting: "Setting up execution environment...",
      compiling: "Compiling source code...",
      executing: "Running your code...",
      completed: "Execution completed successfully",
      failed: "Execution failed with errors",
      cancelled: "Execution was cancelled",
    }
    return messages[status] || "Processing your request..."
  }

  const getProgressPercentage = (status) => {
    const progressMap = {
      pending: 10,
      starting: 25,
      compiling: 50,
      executing: 75,
      completed: 100,
      failed: 100,
      cancelled: 0,
    }
    return progressMap[status] || 0
  }

  const cancelExecution = useCallback(async () => {
    if (executionId) {
      try {
        const response = await fetch(`/api/code/execute?action=cancel&executionId=${executionId}`)
        const data = await response.json()

        if (data.success && data.cancelled) {
          setIsExecuting(false)
          setExecutionProgress({ status: "cancelled", message: "Execution cancelled by user" })

          if (pollingRef.current) {
            clearInterval(pollingRef.current)
            pollingRef.current = null
          }
        }
      } catch (error) {
        console.error("Cancel execution error:", error)
      }
    }
  }, [executionId])

  const getQueueStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/code/execute?action=queue")
      const data = await response.json()

      if (data.success) {
        setQueueStatus(data.queue)
        return data.queue
      }
    } catch (error) {
      console.error("Queue status error:", error)
    }
    return null
  }, [])

  const clearResult = useCallback(() => {
    setExecutionResult(null)
    setExecutionProgress(null)
    setExecutionOutput([])
    setRealTimeOutput("")
    setError(null)
    setExecutionId(null)
    outputRef.current = []
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return {
    executeCode,
    cancelExecution,
    getQueueStatus,
    clearResult,
    isExecuting,
    executionResult,
    executionProgress,
    executionOutput,
    realTimeOutput,
    error,
    executionId,
    queueStatus,
  }
}

export function useCodeExecutionHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const addToHistory = useCallback((execution) => {
    setHistory((prev) => [
      {
        id: execution.executionId || Date.now(),
        language: execution.language,
        code: execution.code?.substring(0, 100) + (execution.code?.length > 100 ? "..." : ""),
        result: execution.result,
        timestamp: new Date(),
        success: execution.result?.success || false,
      },
      ...prev.slice(0, 49), // Keep only last 50 executions
    ])
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const removeFromHistory = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }, [])

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    loading,
  }
}

export function useLanguageSupport() {
  const [supportedLanguages, setSupportedLanguages] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLanguageSupport = async () => {
      try {
        const response = await fetch("/api/code/execute?action=languages")
        const data = await response.json()

        if (data.success) {
          setSupportedLanguages(data.languages)
        }
      } catch (error) {
        console.error("Failed to fetch language support:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLanguageSupport()
  }, [])

  const isLanguageSupported = useCallback(
    (language) => {
      return supportedLanguages[language]?.supported || false
    },
    [supportedLanguages],
  )

  const getLanguageConfig = useCallback(
    (language) => {
      return supportedLanguages[language] || null
    },
    [supportedLanguages],
  )

  return {
    supportedLanguages,
    isLanguageSupported,
    getLanguageConfig,
    loading,
  }
}
