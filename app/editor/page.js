"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import {
  Play,
  Square,
  Save,
  Download,
  Upload,
  Copy,
  Settings,
  Maximize2,
  Minimize2,
  Terminal,
  Eye,
  EyeOff,
  Palette,
  Type,
  Code2,
  FileText,
  Sparkles,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import FileExplorer from "@/components/FileExplorer"
import OutputConsole from "@/components/OutputConsole"
import { useCodeExecution } from "@/hooks/useCodeExecution"
import { useFileSystem } from "@/hooks/useFileSystem"

// Dynamically import Monaco Editor to prevent SSR issues
const MonacoEditor = dynamic(() => import("@/components/MonacoEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-900">
      <div className="flex items-center space-x-2 text-white">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading Monaco Editor...</span>
      </div>
    </div>
  ),
})

const languages = [
  { id: "javascript", name: "JavaScript", icon: "🟨", extension: ".js", template: "console.log('Hello, World!');" },
  { id: "python", name: "Python", icon: "🐍", extension: ".py", template: "print('Hello, World!')" },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    extension: ".java",
    template: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚡",
    extension: ".cpp",
    template: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  },
  {
    id: "c",
    name: "C",
    icon: "🔧",
    extension: ".c",
    template: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  },
  { id: "typescript", name: "TypeScript", icon: "🔷", extension: ".ts", template: "console.log('Hello, World!');" },
  {
    id: "go",
    name: "Go",
    icon: "🐹",
    extension: ".go",
    template: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    extension: ".rs",
    template: `fn main() {\n    println!("Hello, World!");\n}`,
  },
  { id: "php", name: "PHP", icon: "🐘", extension: ".php", template: `<?php\necho "Hello, World!";\n?>` },
  { id: "ruby", name: "Ruby", icon: "💎", extension: ".rb", template: `puts "Hello, World!"` },
  { id: "swift", name: "Swift", icon: "🦉", extension: ".swift", template: `print("Hello, World!")` },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "🎯",
    extension: ".kt",
    template: `fun main() {\n    println("Hello, World!")\n}`,
  },
]

const themes = [
  { id: "vs-dark", name: "Dark", preview: "bg-slate-900" },
  { id: "vs", name: "Light", preview: "bg-white" },
  { id: "hc-black", name: "High Contrast Dark", preview: "bg-black" },
  { id: "hc-light", name: "High Contrast Light", preview: "bg-gray-100" },
]

export default function EditorPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(languages[0].template)
  const [input, setInput] = useState("")
  const [theme, setTheme] = useState("vs-dark")
  const [fontSize, setFontSize] = useState(14)
  const [showFileExplorer, setShowFileExplorer] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [wordWrap, setWordWrap] = useState(true)
  const [minimap, setMinimap] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [lastSaved, setLastSaved] = useState(null)

  const { files, currentFile, createFile, openFile, saveFile, deleteFile } = useFileSystem()
  const { executeCode, isExecuting, result, error, clearOutput } = useCodeExecution()

  const editorRef = useRef(null)

  useEffect(() => {
    const lang = languages.find((l) => l.id === selectedLanguage)
    if (lang && !currentFile) {
      setCode(lang.template)
    }
  }, [selectedLanguage, currentFile])

  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId)
    const lang = languages.find((l) => l.id === langId)
    if (lang) {
      setCode(lang.template)
    }
  }

  const handleRunCode = async () => {
    try {
      await executeCode(code, selectedLanguage, input)
    } catch (err) {
      console.error("Execution failed:", err)
    }
  }

  const handleSaveCode = () => {
    if (currentFile) {
      saveFile(currentFile.id, code)
    } else {
      const lang = languages.find((l) => l.id === selectedLanguage)
      const fileName = `main${lang?.extension || ".txt"}`
      createFile(fileName, code, selectedLanguage)
    }
    setLastSaved(new Date())
  }

  const handleDownloadCode = () => {
    const lang = languages.find((l) => l.id === selectedLanguage)
    const fileName = `code${lang?.extension || ".txt"}`
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUploadCode = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCode(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const formatExecutionTime = (ms) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col">
      {/* Header */}
      <motion.header
        className="border-b border-white/10 bg-black/20 backdrop-blur-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">CodeMaster AI</span>
                <span className="text-xs text-gray-400 -mt-1">Professional IDE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                {languages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id} className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-2">
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Editor Controls */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCopyCode} className="text-white hover:bg-white/10">
                <Copy className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleSaveCode} className="text-white hover:bg-white/10">
                <Save className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleDownloadCode} className="text-white hover:bg-white/10">
                <Download className="w-4 h-4" />
              </Button>

              <label>
                <input
                  type="file"
                  accept=".js,.py,.java,.cpp,.c,.ts,.go,.rs,.php,.rb,.swift,.kt,.html,.css"
                  onChange={handleUploadCode}
                  className="hidden"
                />
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
                  <span>
                    <Upload className="w-4 h-4" />
                  </span>
                </Button>
              </label>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFileExplorer(!showFileExplorer)}
                className="text-white hover:bg-white/10"
              >
                {showFileExplorer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>

              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-white/20 text-white max-w-md">
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
                        {themes.map((themeOption) => (
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

                    <Separator className="bg-white/10" />

                    {/* Editor Options */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Word Wrap</label>
                        <Switch checked={wordWrap} onCheckedChange={setWordWrap} />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Minimap</label>
                        <Switch checked={minimap} onCheckedChange={setMinimap} />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Auto Save</label>
                        <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                      </div>
                    </div>

                    {lastSaved && (
                      <div className="text-xs text-gray-400 text-center">
                        Last saved: {lastSaved.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/10"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-white/20" />

            {/* Run Button */}
            <Button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6"
            >
              {isExecuting ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <AnimatePresence>
          {showFileExplorer && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-64 bg-black/20 border-r border-white/10"
            >
              <FileExplorer
                files={files}
                currentFile={currentFile}
                onFileSelect={openFile}
                onFileCreate={createFile}
                onFileDelete={deleteFile}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-black/20 border-b border-white/10 rounded-none justify-start p-0">
              <TabsTrigger value="editor" className="data-[state=active]:bg-white/10 text-white px-6 py-3">
                <Code2 className="w-4 h-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="output" className="data-[state=active]:bg-white/10 text-white px-6 py-3">
                <Terminal className="w-4 h-4 mr-2" />
                Output
              </TabsTrigger>
              <TabsTrigger value="input" className="data-[state=active]:bg-white/10 text-white px-6 py-3">
                <FileText className="w-4 h-4 mr-2" />
                Input
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="flex-1 m-0">
              <MonacoEditor
                language={selectedLanguage}
                value={code}
                onChange={setCode}
                theme={theme}
                fontSize={fontSize}
                wordWrap={wordWrap}
                minimap={minimap}
                className="h-full"
              />
            </TabsContent>

            <TabsContent value="output" className="flex-1 m-0">
              <OutputConsole
                isExecuting={isExecuting}
                result={result}
                error={error}
                language={selectedLanguage}
                onClear={clearOutput}
                className="h-full"
              />
            </TabsContent>

            <TabsContent value="input" className="flex-1 m-0 p-6">
              <div className="space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Program Input</h3>
                  <Button
                    size="sm"
                    onClick={() => setInput("")}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Clear
                  </Button>
                </div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter input for your program (if needed)..."
                  className="flex-1 bg-white/5 border-white/20 text-white font-mono text-sm resize-none"
                />
                <div className="text-sm text-gray-400">
                  This input will be passed to your program when executed. Each line represents a separate input.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-black/20 border-t border-white/10 px-4 py-2 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <span>CodeMaster AI</span>
          <span>•</span>
          <span>{languages.find((l) => l.id === selectedLanguage)?.name}</span>
          <span>•</span>
          <span>UTF-8</span>
          {lastSaved && (
            <>
              <span>•</span>
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span>Ln 1, Col 1</span>
          <span>•</span>
          <span>{code.split("\n").length} lines</span>
        </div>
      </div>
    </div>
  )
}
