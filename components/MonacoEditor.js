"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function MonacoEditor({
  language = "javascript",
  value = "",
  onChange,
  theme = "vs-dark",
  fontSize = 14,
  wordWrap = true,
  minimap = true,
  className = "",
}) {
  const editorRef = useRef(null)
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [monaco, setMonaco] = useState(null)

  useEffect(() => {
    // Only load Monaco on client side
    if (typeof window !== "undefined" && containerRef.current && !isLoaded) {
      import("monaco-editor")
        .then((monacoModule) => {
          setMonaco(monacoModule)

          // Initialize Monaco Editor
          editorRef.current = monacoModule.editor.create(containerRef.current, {
            value,
            language,
            theme,
            fontSize,
            wordWrap: wordWrap ? "on" : "off",
            minimap: { enabled: minimap },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            renderLineHighlight: "all",
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: "line",
            glyphMargin: true,
            folding: true,
            lineNumbers: "on",
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderWhitespace: "selection",
            contextmenu: true,
            mouseWheelZoom: true,
            smoothScrolling: true,
            cursorBlinking: "blink",
            cursorSmoothCaretAnimation: true,
            renderFinalNewline: true,
            links: true,
            colorDecorators: true,
            lightbulb: { enabled: true },
            suggest: {
              enabled: true,
              showKeywords: true,
              showSnippets: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            parameterHints: { enabled: true },
            formatOnType: true,
            formatOnPaste: true,
            dragAndDrop: true,
            accessibilitySupport: "auto",
            find: {
              addExtraSpaceOnTop: false,
              autoFindInSelection: "never",
              seedSearchStringFromSelection: "always",
            },
          })

          // Set up change listener
          editorRef.current.onDidChangeModelContent(() => {
            const currentValue = editorRef.current.getValue()
            if (onChange) {
              onChange(currentValue)
            }
          })

          // Set up keyboard shortcuts
          editorRef.current.addCommand(monacoModule.KeyMod.CtrlCmd | monacoModule.KeyCode.KeyS, () => {
            console.log("Save triggered")
          })

          editorRef.current.addCommand(monacoModule.KeyMod.CtrlCmd | monacoModule.KeyCode.Enter, () => {
            console.log("Run code triggered")
          })

          setIsLoaded(true)
        })
        .catch((error) => {
          console.error("Failed to load Monaco Editor:", error)
        })
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose()
      }
    }
  }, [])

  // Update editor when props change
  useEffect(() => {
    if (editorRef.current && isLoaded) {
      const currentValue = editorRef.current.getValue()
      if (currentValue !== value) {
        editorRef.current.setValue(value)
      }
    }
  }, [value, isLoaded])

  useEffect(() => {
    if (editorRef.current && monaco && isLoaded) {
      monaco.editor.setModelLanguage(editorRef.current.getModel(), language)
    }
  }, [language, monaco, isLoaded])

  useEffect(() => {
    if (editorRef.current && monaco && isLoaded) {
      monaco.editor.setTheme(theme)
    }
  }, [theme, monaco, isLoaded])

  useEffect(() => {
    if (editorRef.current && isLoaded) {
      editorRef.current.updateOptions({
        fontSize,
        wordWrap: wordWrap ? "on" : "off",
        minimap: { enabled: minimap },
      })
    }
  }, [fontSize, wordWrap, minimap, isLoaded])

  if (typeof window === "undefined") {
    return (
      <div className="flex items-center justify-center h-full bg-slate-900">
        <div className="flex items-center space-x-2 text-white">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Editor...</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className={`h-full bg-slate-900 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div ref={containerRef} className="w-full h-full" />
    </motion.div>
  )
}
