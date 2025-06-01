"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Terminal,
  Copy,
  Download,
  Trash2,
  Maximize2,
  Minimize2,
  CheckCircle,
  AlertTriangle,
  Timer,
  MemoryStick,
  Cpu,
  Square,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OutputConsole({ isExecuting, result, error, language, onClear, className = "" }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const outputRef = useRef(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [result, error])

  const handleCopyOutput = () => {
    const outputText = result?.output || error || ""
    navigator.clipboard.writeText(outputText)
  }

  const handleDownloadOutput = () => {
    const outputText = result?.output || error || ""
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `output_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatExecutionTime = (ms) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  return (
    <motion.div
      className={`bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-black/20 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium">Output Console</span>
          {isExecuting && (
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              <Square className="w-3 h-3 mr-1" />
              Running
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleCopyOutput} className="h-8 text-white hover:bg-white/10">
            <Copy className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleDownloadOutput} className="h-8 text-white hover:bg-white/10">
            <Download className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-white hover:bg-white/10">
            <Trash2 className="w-4 h-4" />
          </Button>

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

      <Tabs defaultValue="output" className="flex-1 flex flex-col">
        <TabsList className="bg-transparent border-b border-white/10 rounded-none justify-start p-0">
          <TabsTrigger value="output" className="data-[state=active]:bg-white/10 text-white px-4 py-2 text-sm">
            <Terminal className="w-4 h-4 mr-2" />
            Output
          </TabsTrigger>
          <TabsTrigger value="errors" className="data-[state=active]:bg-white/10 text-white px-4 py-2 text-sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Errors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="output" className="flex-1 m-0">
          <div ref={outputRef} className="h-64 overflow-y-auto p-4 font-mono text-sm">
            {isExecuting ? (
              <div className="flex items-center space-x-2 text-blue-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Executing {language} code...</span>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Execution Info */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    {result.executionTime && (
                      <div className="flex items-center space-x-1">
                        <Timer className="w-4 h-4" />
                        <span>{formatExecutionTime(result.executionTime)}</span>
                      </div>
                    )}
                    {result.memoryUsage && (
                      <div className="flex items-center space-x-1">
                        <MemoryStick className="w-4 h-4" />
                        <span>{result.memoryUsage}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Cpu className="w-4 h-4" />
                      <span>{language}</span>
                    </div>
                  </div>
                  <Badge variant={result.success ? "default" : "destructive"}>
                    {result.success ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Success
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Error
                      </>
                    )}
                  </Badge>
                </div>

                {/* Output */}
                <div>
                  <pre className={`whitespace-pre-wrap ${result.success ? "text-green-400" : "text-red-400"}`}>
                    {result.success ? result.output : result.error}
                  </pre>
                </div>
              </div>
            ) : error ? (
              <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
            ) : (
              <div className="text-gray-400 text-center py-8">
                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No output yet. Run your code to see results.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="errors" className="flex-1 m-0">
          <div className="h-64 overflow-y-auto p-4 font-mono text-sm">
            {error || (result && !result.success) ? (
              <pre className="text-red-400 whitespace-pre-wrap">{error || result?.error}</pre>
            ) : (
              <div className="text-gray-400 text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No errors detected.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Output Console - Fullscreen</h2>
              <Button variant="ghost" onClick={() => setIsFullscreen(false)} className="text-white hover:bg-white/10">
                <Minimize2 className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 p-4">
              <div className="h-full overflow-y-auto font-mono text-sm bg-black/20 rounded-lg p-4">
                {result ? (
                  <pre className={`whitespace-pre-wrap ${result.success ? "text-green-400" : "text-red-400"}`}>
                    {result.success ? result.output : result.error}
                  </pre>
                ) : error ? (
                  <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
                ) : (
                  <div className="text-gray-400 text-center py-8">
                    <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No output yet. Run your code to see results.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
