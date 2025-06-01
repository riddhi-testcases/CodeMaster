"use client"

import { useState } from "react"

export function useCodeExecution() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const executeCode = async (code, language, input = "") => {
    // Only execute on client side
    if (typeof window === "undefined") return

    setIsExecuting(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/code/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          input,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.result)
      } else {
        setError(data.error || "Execution failed")
      }
    } catch (err) {
      setError("Network error: " + err.message)
    } finally {
      setIsExecuting(false)
    }
  }

  const clearOutput = () => {
    setResult(null)
    setError(null)
  }

  return {
    executeCode,
    isExecuting,
    result,
    error,
    clearOutput,
  }
}
