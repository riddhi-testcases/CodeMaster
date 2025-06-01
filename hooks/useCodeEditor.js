"use client"

import { useState, useEffect, useCallback } from "react"
import { getTemplate } from "@/lib/codeTemplates"

export function useCodeExecution() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)
  const [error, setError] = useState(null)

  const executeCode = useCallback(async (code, language, input = "", userId = null) => {
    try {
      setIsExecuting(true)
      setError(null)

      const response = await fetch("/api/code/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code, language, input }),
      })

      const data = await response.json()

      if (data.success) {
        setExecutionResult(data.result)
        return data.result
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsExecuting(false)
    }
  }, [])

  const clearResult = useCallback(() => {
    setExecutionResult(null)
    setError(null)
  }, [])

  return {
    executeCode,
    isExecuting,
    executionResult,
    error,
    clearResult,
  }
}

export function useCodeTemplates() {
  const [templates, setTemplates] = useState({})
  const [loading, setLoading] = useState(false)

  const loadTemplate = useCallback(async (language, type = "basic") => {
    try {
      setLoading(true)
      const response = await fetch(`/api/code/templates?language=${language}&type=${type}`)
      const data = await response.json()

      if (data.success) {
        return data.template
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      console.error("Failed to load template:", err)
      return getTemplate(language, type) // Fallback to local template
    } finally {
      setLoading(false)
    }
  }, [])

  const getAvailableTemplates = useCallback(async (language) => {
    try {
      const response = await fetch(`/api/code/templates?language=${language}&type=list`)
      const data = await response.json()

      if (data.success) {
        return data.templates
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      console.error("Failed to get templates:", err)
      return ["basic"] // Fallback
    }
  }, [])

  return {
    loadTemplate,
    getAvailableTemplates,
    loading,
  }
}

export function useCodeEditor(initialLanguage = "javascript") {
  const [language, setLanguage] = useState(initialLanguage)
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [fontSize, setFontSize] = useState(14)
  const [theme, setTheme] = useState("dark")
  const [wordWrap, setWordWrap] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [lastSaved, setLastSaved] = useState(null)

  const { loadTemplate } = useCodeTemplates()

  // Load template when language changes
  useEffect(() => {
    const loadLanguageTemplate = async () => {
      const template = await loadTemplate(language)
      setCode(template)
    }

    loadLanguageTemplate()
  }, [language, loadTemplate])

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && code) {
      const timer = setTimeout(() => {
        localStorage.setItem(`code_${language}`, code)
        setLastSaved(new Date())
      }, 2000) // Save after 2 seconds of inactivity

      return () => clearTimeout(timer)
    }
  }, [code, language, autoSave])

  // Load saved code on mount
  useEffect(() => {
    const savedCode = localStorage.getItem(`code_${language}`)
    if (savedCode) {
      setCode(savedCode)
    }
  }, [language])

  const changeLanguage = useCallback(
    async (newLanguage) => {
      setLanguage(newLanguage)
      const template = await loadTemplate(newLanguage)
      setCode(template)
    },
    [loadTemplate],
  )

  const loadTemplateType = useCallback(
    async (type) => {
      const template = await loadTemplate(language, type)
      setCode(template)
    },
    [language, loadTemplate],
  )

  const saveCode = useCallback(() => {
    localStorage.setItem(`code_${language}`, code)
    setLastSaved(new Date())
  }, [code, language])

  const clearCode = useCallback(() => {
    setCode("")
    setInput("")
  }, [])

  const insertText = useCallback((text, position) => {
    setCode((prevCode) => {
      const before = prevCode.slice(0, position)
      const after = prevCode.slice(position)
      return before + text + after
    })
  }, [])

  return {
    language,
    code,
    input,
    fontSize,
    theme,
    wordWrap,
    autoSave,
    lastSaved,
    setCode,
    setInput,
    setFontSize,
    setTheme,
    setWordWrap,
    setAutoSave,
    changeLanguage,
    loadTemplateType,
    saveCode,
    clearCode,
    insertText,
  }
}
