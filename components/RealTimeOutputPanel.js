"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Square,
  RefreshCw,
  Copy,
  Download,
  CloudyIcon as Clear,
  Maximize2,
  Minimize2,
  Timer,
  MemoryStick,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RealTimeOutputPanel({
  isExecuting,
  executionResult,
  executionProgress,
  executionOutput,
  realTimeOutput,
  error,
  language,
  onCancel,
  onClear,
  className = "",
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const outputRef = useRef(null)
  const [outputLines, setOutputLines] = useState([])

  // Auto-scroll to bottom when new output arrives
  useEffect(() => {
    if (autoScroll && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [realTimeOutput, autoScroll])

  // Parse real-time output into lines
  useEffect(() => {
    if (realTimeOutput) {
      const lines = realTimeOutput.split("\n").map((line, index) => ({
        id: index,
        content: line,
        timestamp: Date.now(),
        type: "stdout",
      }))
      setOutputLines(lines)
    }
  }, [realTimeOutput])

  const handleCopyOutput = () => {
    const outputText = executionResult?.success ? executionResult.output : executionResult?.error || realTimeOutput
    navigator.clipboard.writeText(outputText)
  }

  const handleDownloadOutput = () => {
    const outputText = executionResult?.success ? executionResult.output : executionResult?.error || realTimeOutput
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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "failed":
        return "text-red-400"
      case "executing":
        return "text-blue-400"
      case "compiling":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "failed":
        return <AlertTriangle className="w-4 h-4" />
      case "executing":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      case "compiling":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      default:
        return <Info className="w-4 h-4" />
    }
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
              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
              Running
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoScroll(!autoScroll)}
            className={`h-8 text-white hover:bg-white/10 ${autoScroll ? "bg-white/10" : ""}`}
          >
            Auto-scroll
          </Button>

          <Button variant="ghost" size="sm" onClick={handleCopyOutput} className="h-8 text-white hover:bg-white/10">
            <Copy className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleDownloadOutput} className="h-8 text-white hover:bg-white/10">
            <Download className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-white hover:bg-white/10">
            <Clear className="w-4 h-4" />
          </Button>

          {isExecuting && (
            <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 text-red-400 hover:bg-red-500/10">
              <Square className="w-4 h-4" />
            </Button>
          )}

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

      {/* Progress Bar */}
      {isExecuting && executionProgress && (
        <div className="p-3 bg-black/10 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={getStatusColor(executionProgress.status)}>{getStatusIcon(executionProgress.status)}</div>
              <span className="text-sm text-white">{executionProgress.message}</span>
            </div>
            {executionProgress.executionTime && (
              <span className="text-xs text-gray-400">{formatExecutionTime(executionProgress.executionTime)}</span>
            )}
          </div>
          <Progress value={executionProgress.progress || 0} className="h-1" />
        </div>
      )}

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
          <TabsTrigger value="debug" className="data-[state=active]:bg-white/10 text-white px-4 py-2 text-sm">
            <Info className="w-4 h-4 mr-2" />
            Debug
          </TabsTrigger>
        </TabsList>

        <TabsContent value="output" className="flex-1 m-0">
          <div ref={outputRef} className="h-64 overflow-y-auto p-4 font-mono text-sm">
            {isExecuting ? (
              <div className="space-y-1">
                {/* Real-time output lines */}
                <AnimatePresence>
                  {outputLines.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-400"
                    >
                      {line.content}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Cursor */}
                <motion.div
                  className="inline-block w-2 h-4 bg-green-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            ) : executionResult ? (
              <div className="space-y-4">
                {/* Execution Info */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Timer className="w-4 h-4" />
                      <span>{formatExecutionTime(executionResult.executionTime)}</span>
                    </div>
                    {executionResult.memoryUsage && (
                      <div className="flex items-center space-x-1">
                        <MemoryStick className="w-4 h-4" />
                        <span>{executionResult.memoryUsage}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Cpu className="w-4 h-4" />
                      <span>{language}</span>
                    </div>
                  </div>
                  <Badge variant={executionResult.success ? "default" : "destructive"}>
                    {executionResult.success ? "Success" : "Error"}
                  </Badge>
                </div>

                {/* Compilation Output */}
                {executionResult.compileOutput && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Compilation:</h4>
                    <pre className="text-blue-400 whitespace-pre-wrap">{executionResult.compileOutput}</pre>
                  </div>
                )}

                {/* Execution Output */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Output:</h4>
                  <pre className={`whitespace-pre-wrap ${executionResult.success ? "text-green-400" : "text-red-400"}`}>
                    {executionResult.success ? executionResult.output : executionResult.error}
                  </pre>
                </div>
              </div>
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
            {error ? (
              <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
            ) : executionResult && !executionResult.success ? (
              <pre className="text-red-400 whitespace-pre-wrap">{executionResult.error}</pre>
            ) : (
              <div className="text-gray-400 text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No errors detected.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="debug" className="flex-1 m-0">
          <div className="h-64 overflow-y-auto p-4 font-mono text-sm">
            <div className="space-y-2 text-gray-400">
              <div>
                Language: <span className="text-white">{language}</span>
              </div>
              <div>
                Status: <span className="text-white">{executionProgress?.status || "idle"}</span>
              </div>
              {executionResult && (
                <>
                  <div>
                    Execution Time:{" "}
                    <span className="text-white">{formatExecutionTime(executionResult.executionTime)}</span>
                  </div>
                  <div>
                    Memory Usage: <span className="text-white">{executionResult.memoryUsage || "N/A"}</span>
                  </div>
                  <div>
                    Success: <span className="text-white">{executionResult.success ? "Yes" : "No"}</span>
                  </div>
                </>
              )}
            </div>
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
                {/* Same content as main output */}
                {isExecuting ? (
                  <div className="space-y-1">
                    <AnimatePresence>
                      {outputLines.map((line) => (
                        <motion.div
                          key={line.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-green-400"
                        >
                          {line.content}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <motion.div
                      className="inline-block w-2 h-4 bg-green-400"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                ) : executionResult ? (
                  <pre className={`whitespace-pre-wrap ${executionResult.success ? "text-green-400" : "text-red-400"}`}>
                    {executionResult.success ? executionResult.output : executionResult.error}
                  </pre>
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
