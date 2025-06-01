"use client"

import { useState, useEffect } from "react"

export function useFileSystem() {
  const [files, setFiles] = useState([])
  const [currentFile, setCurrentFile] = useState(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Load files from localStorage
      const savedFiles = localStorage.getItem("codemaster-files")
      if (savedFiles) {
        try {
          setFiles(JSON.parse(savedFiles))
        } catch (error) {
          console.error("Failed to load files:", error)
        }
      }
    }
  }, [])

  const saveToStorage = (newFiles) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("codemaster-files", JSON.stringify(newFiles))
    }
  }

  const createFile = (name, content = "", language = "javascript") => {
    const newFile = {
      id: Date.now().toString(),
      name,
      content,
      language,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const newFiles = [...files, newFile]
    setFiles(newFiles)
    saveToStorage(newFiles)
    setCurrentFile(newFile)
    return newFile
  }

  const openFile = (fileId) => {
    const file = files.find((f) => f.id === fileId)
    if (file) {
      setCurrentFile(file)
    }
  }

  const saveFile = (fileId, content) => {
    const newFiles = files.map((file) =>
      file.id === fileId ? { ...file, content, updatedAt: new Date().toISOString() } : file,
    )
    setFiles(newFiles)
    saveToStorage(newFiles)

    if (currentFile && currentFile.id === fileId) {
      setCurrentFile({ ...currentFile, content, updatedAt: new Date().toISOString() })
    }
  }

  const deleteFile = (fileId) => {
    const newFiles = files.filter((file) => file.id !== fileId)
    setFiles(newFiles)
    saveToStorage(newFiles)

    if (currentFile && currentFile.id === fileId) {
      setCurrentFile(null)
    }
  }

  return {
    files,
    currentFile,
    createFile,
    openFile,
    saveFile,
    deleteFile,
  }
}
