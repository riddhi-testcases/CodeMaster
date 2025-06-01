"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Keyboard, X, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { editorShortcuts } from "@/lib/monacoConfig"

export default function EditorShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="h-8 text-white hover:bg-white/10"
        title="Keyboard Shortcuts"
      >
        <Keyboard className="w-4 h-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-slate-800 border border-white/20 rounded-lg p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Command className="w-5 h-5" />
                  <span>Keyboard Shortcuts</span>
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {editorShortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-sm text-gray-300">{shortcut.description}</span>
                    <Badge variant="outline" className="text-xs border-white/20 text-gray-400 font-mono">
                      {shortcut.key}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-400 text-center">
                Press{" "}
                <Badge variant="outline" className="text-xs mx-1">
                  F1
                </Badge>{" "}
                in the editor for more commands
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
