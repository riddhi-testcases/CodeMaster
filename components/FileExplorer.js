"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, MoreHorizontal, Edit3, Trash2, Copy, Download, FolderPlus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function FileExplorer({ files, currentFile, onFileSelect, onFileCreate, onFileDelete }) {
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const [expandedFolders, setExpandedFolders] = useState(new Set(["root"]))

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onFileCreate(newFileName.trim())
      setNewFileName("")
      setShowNewFileDialog(false)
    }
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "js":
      case "jsx":
        return "🟨"
      case "ts":
      case "tsx":
        return "🔷"
      case "py":
        return "🐍"
      case "java":
        return "☕"
      case "cpp":
      case "cc":
        return "⚡"
      case "c":
        return "🔧"
      case "html":
        return "🌐"
      case "css":
        return "🎨"
      case "json":
        return "📋"
      case "md":
        return "📝"
      default:
        return "📄"
    }
  }

  return (
    <div className="h-full bg-black/20 backdrop-blur-sm border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Explorer</h3>
          <div className="flex items-center space-x-1">
            <Dialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-white/20 text-white">
                <DialogHeader>
                  <DialogTitle>Create New File</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">File Name</label>
                    <Input
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="example.js"
                      className="bg-white/5 border-white/20 text-white"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleCreateFile()
                        }
                      }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateFile} className="flex-1 bg-blue-500 hover:bg-blue-600">
                      Create
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewFileDialog(false)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
              <FolderPlus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                currentFile?.id === file.id
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => onFileSelect(file)}
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-sm">{getFileIcon(file.name)}</span>
                <span className="text-sm truncate">{file.name}</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-white/20" align="end">
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem className="text-red-400 hover:bg-red-500/10" onClick={() => onFileDelete(file.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ))}
        </div>

        {files.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No files yet</p>
            <p className="text-xs">Create your first file to get started</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-400">
          {files.length} file{files.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  )
}
