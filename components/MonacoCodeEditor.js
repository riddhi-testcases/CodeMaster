"use client"

import { useRef, useState } from "react"
import Editor from "@monaco-editor/react"
import { motion } from "framer-motion"
import { Copy, Download, Upload, RotateCcw, Maximize2, Minimize2, Settings, Palette, Type, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

const monacoThemes = [
  { id: "vs-dark", name: "Dark", preview: "bg-slate-900" },
  { id: "vs", name: "Light", preview: "bg-white" },
  { id: "hc-black", name: "High Contrast Dark", preview: "bg-black" },
  { id: "hc-light", name: "High Contrast Light", preview: "bg-gray-100" },
]

const languageConfigs = {
  javascript: {
    monaco: "javascript",
    extensions: [".js", ".mjs"],
    snippets: ["console.log", "function", "const", "let", "var", "if", "for", "while"],
  },
  typescript: {
    monaco: "typescript",
    extensions: [".ts", ".tsx"],
    snippets: ["interface", "type", "class", "function", "const", "let"],
  },
  python: {
    monaco: "python",
    extensions: [".py"],
    snippets: ["print", "def", "class", "if", "for", "while", "import"],
  },
  java: {
    monaco: "java",
    extensions: [".java"],
    snippets: ["public class", "public static void main", "System.out.println", "if", "for"],
  },
  cpp: {
    monaco: "cpp",
    extensions: [".cpp", ".cc", ".cxx"],
    snippets: ["#include", "using namespace std", "int main", "cout", "cin"],
  },
  c: {
    monaco: "c",
    extensions: [".c"],
    snippets: ["#include", "int main", "printf", "scanf", "if", "for"],
  },
  go: {
    monaco: "go",
    extensions: [".go"],
    snippets: ["package main", "import", "func main", "fmt.Println", "if", "for"],
  },
  rust: {
    monaco: "rust",
    extensions: [".rs"],
    snippets: ["fn main", "println!", "let", "mut", "if", "for", "match"],
  },
  php: {
    monaco: "php",
    extensions: [".php"],
    snippets: ["<?php", "echo", "function", "$", "if", "for", "while"],
  },
  ruby: {
    monaco: "ruby",
    extensions: [".rb"],
    snippets: ["puts", "def", "class", "if", "for", "while", "each"],
  },
  swift: {
    monaco: "swift",
    extensions: [".swift"],
    snippets: ["import", "func", "var", "let", "if", "for", "while", "print"],
  },
  kotlin: {
    monaco: "kotlin",
    extensions: [".kt"],
    snippets: ["fun main", "println", "val", "var", "if", "for", "while"],
  },
}

export default function MonacoCodeEditor({
  language = "javascript",
  code = "",
  onChange,
  onSave,
  readOnly = false,
  className = "",
}) {
  const editorRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showMinimap, setShowMinimap] = useState(true)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [wordWrap, setWordWrap] = useState(true)
  const [fontSize, setFontSize] = useState(14)
  const [tabSize, setTabSize] = useState(2)
  const [theme, setTheme] = useState("vs-dark")
  const [autoSave, setAutoSave] = useState(true)
  const [lastSaved, setLastSaved] = useState(null)
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [selectedText, setSelectedText] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const langConfig = languageConfigs[language] || languageConfigs.javascript

  // Monaco Editor configuration
  const editorOptions = {
    fontSize,
    tabSize,
    wordWrap: wordWrap ? "on" : "off",
    minimap: { enabled: showMinimap },
    lineNumbers: showLineNumbers ? "on" : "off",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    renderWhitespace: "selection",
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true,
    },
    suggest: {
      showKeywords: true,
      showSnippets: true,
      showFunctions: true,
      showVariables: true,
    },
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true,
    },
    parameterHints: { enabled: true },
    hover: { enabled: true },
    contextmenu: true,
    mouseWheelZoom: true,
    formatOnPaste: true,
    formatOnType: true,
    autoIndent: "full",
    folding: true,
    foldingHighlight: true,
    showFoldingControls: "always",
    readOnly,
  }

  // Handle editor mount
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
    setIsLoading(false)

    // Configure language-specific features
    monaco.languages.registerCompletionItemProvider(langConfig.monaco, {
      provideCompletionItems: (model, position) => {
        const suggestions = langConfig.snippets.map((snippet, index) => ({
          label: snippet,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column,
          },
        }))
        return { suggestions }
      },
    })

    // Track cursor position
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column,
      })
    })

    // Track selection
    editor.onDidChangeCursorSelection((e) => {
      const selection = editor.getModel().getValueInRange(e.selection)
      setSelectedText(selection)
    })

    // Auto-save functionality
    if (autoSave) {
      editor.onDidChangeModelContent(() => {
        const timer = setTimeout(() => {
          if (onSave) {
            onSave(editor.getValue())
            setLastSaved(new Date())
          }
        }, 2000)
        return () => clearTimeout(timer)
      })
    }

    // Keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (onSave) {
        onSave(editor.getValue())
        setLastSaved(new Date())
      }
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
      const selection = editor.getSelection()
      editor.executeEdits("duplicate-line", [
        {
          range: selection,
          text: editor.getModel().getValueInRange(selection) + "\n",
        },
      ])
    })
  }

  // Editor actions
  const handleCopyCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue()
      navigator.clipboard.writeText(code)
    }
  }

  const handleDownloadCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue()
      const filename = `code${langConfig.extensions[0]}`
      const blob = new Blob([code], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleUploadCode = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (editorRef.current) {
          editorRef.current.setValue(e.target.result)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run()
    }
  }

  const handleResetCode = () => {
    if (editorRef.current) {
      editorRef.current.setValue("")
    }
  }

  const insertSnippet = (snippet) => {
    if (editorRef.current) {
      const position = editorRef.current.getPosition()
      editorRef.current.executeEdits("insert-snippet", [
        {
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          },
          text: snippet,
        },
      ])
      editorRef.current.focus()
    }
  }

  return (
    <motion.div
      className={`relative h-full bg-slate-900 rounded-lg overflow-hidden border border-white/10 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 bg-black/20 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
            {langConfig.monaco}
          </Badge>
          <div className="text-xs text-gray-400">
            Line {cursorPosition.line}, Column {cursorPosition.column}
          </div>
          {selectedText && <div className="text-xs text-blue-400">{selectedText.length} chars selected</div>}
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Snippets */}
          <Select onValueChange={insertSnippet}>
            <SelectTrigger className="w-32 h-8 bg-white/5 border-white/20 text-white text-xs">
              <SelectValue placeholder="Snippets" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              {langConfig.snippets.map((snippet) => (
                <SelectItem key={snippet} value={snippet} className="text-white hover:bg-white/10 text-xs">
                  {snippet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Editor Actions */}
          <Button variant="ghost" size="sm" onClick={handleCopyCode} className="h-8 text-white hover:bg-white/10">
            <Copy className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleFormatCode} className="h-8 text-white hover:bg-white/10">
            <Zap className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleDownloadCode} className="h-8 text-white hover:bg-white/10">
            <Download className="w-4 h-4" />
          </Button>

          <label>
            <input
              type="file"
              accept={langConfig.extensions.join(",")}
              onChange={handleUploadCode}
              className="hidden"
            />
            <Button variant="ghost" size="sm" className="h-8 text-white hover:bg-white/10" asChild>
              <span>
                <Upload className="w-4 h-4" />
              </span>
            </Button>
          </label>

          <Button variant="ghost" size="sm" onClick={handleResetCode} className="h-8 text-white hover:bg-white/10">
            <RotateCcw className="w-4 h-4" />
          </Button>

          {/* Settings Dialog */}
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-white/20 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Editor Settings</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Theme</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {monacoThemes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => setTheme(themeOption.id)}
                        className={`p-3 rounded-lg border transition-all ${
                          theme === themeOption.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <div className={`w-full h-6 rounded mb-2 ${themeOption.preview}`}></div>
                        <div className="text-xs">{themeOption.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Font Size */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Type className="w-4 h-4" />
                    <span>Font Size</span>
                  </label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={10}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-400">{fontSize}px</div>
                </div>

                {/* Tab Size */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tab Size</label>
                  <Slider
                    value={[tabSize]}
                    onValueChange={(value) => setTabSize(value[0])}
                    min={2}
                    max={8}
                    step={2}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-400">{tabSize} spaces</div>
                </div>

                <Separator className="bg-white/10" />

                {/* Editor Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show Minimap</label>
                    <Switch checked={showMinimap} onCheckedChange={setShowMinimap} />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Line Numbers</label>
                    <Switch checked={showLineNumbers} onCheckedChange={setShowLineNumbers} />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Word Wrap</label>
                    <Switch checked={wordWrap} onCheckedChange={setWordWrap} />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto Save</label>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>
                </div>

                {lastSaved && (
                  <div className="text-xs text-gray-400 text-center">Last saved: {lastSaved.toLocaleTimeString()}</div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 text-white hover:bg-white/10"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="relative h-[calc(100%-60px)]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading Monaco Editor...</span>
            </div>
          </div>
        )}

        <Editor
          height="100%"
          language={langConfig.monaco}
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme={theme}
          options={editorOptions}
          loading={
            <div className="flex items-center justify-center h-full bg-slate-900">
              <div className="flex items-center space-x-2 text-white">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Initializing Editor...</span>
              </div>
            </div>
          }
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-black/20 border-t border-white/10 text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Monaco Editor</span>
          <span>UTF-8</span>
          <span>{langConfig.monaco}</span>
        </div>
        <div className="flex items-center space-x-4">
          {selectedText && <span>{selectedText.length} selected</span>}
          <span>
            Ln {cursorPosition.line}, Col {cursorPosition.column}
          </span>
          <span>{code.split("\n").length} lines</span>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Code Editor - Fullscreen</h2>
              <Button variant="ghost" onClick={() => setIsFullscreen(false)} className="text-white hover:bg-white/10">
                <Minimize2 className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                language={langConfig.monaco}
                value={code}
                onChange={onChange}
                theme={theme}
                options={editorOptions}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
