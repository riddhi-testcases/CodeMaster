"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Play, Share2, Download, Sparkles, Clock, Star, Eye, Heart, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import Navbar from "@/components/Navbar"

const featuredSnippets = [
  {
    id: 1,
    title: "Fibonacci Generator",
    description: "Generate Fibonacci sequence with memoization",
    language: "javascript",
    author: "CodeMaster",
    likes: 234,
    views: 1520,
    code: `function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log("Fibonacci sequence:");
for (let i = 1; i <= 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
    tags: ["algorithm", "recursion", "optimization"],
  },
  {
    id: 2,
    title: "Quick Sort Algorithm",
    description: "Efficient sorting algorithm implementation",
    language: "python",
    author: "AlgoExpert",
    likes: 189,
    views: 892,
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Test the algorithm
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", numbers)
sorted_numbers = quicksort(numbers)
print("Sorted array:", sorted_numbers)`,
    tags: ["sorting", "algorithm", "divide-conquer"],
  },
  {
    id: 3,
    title: "Binary Search Tree",
    description: "Complete BST implementation with operations",
    language: "java",
    author: "DataStructures",
    likes: 156,
    views: 743,
    code: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        this.val = val;
    }
}

class BinarySearchTree {
    TreeNode root;
    
    public void insert(int val) {
        root = insertRec(root, val);
    }
    
    private TreeNode insertRec(TreeNode root, int val) {
        if (root == null) {
            root = new TreeNode(val);
            return root;
        }
        
        if (val < root.val)
            root.left = insertRec(root.left, val);
        else if (val > root.val)
            root.right = insertRec(root.right, val);
            
        return root;
    }
    
    public void inorder() {
        inorderRec(root);
    }
    
    private void inorderRec(TreeNode root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.val + " ");
            inorderRec(root.right);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();
        bst.insert(50);
        bst.insert(30);
        bst.insert(20);
        bst.insert(40);
        bst.insert(70);
        bst.insert(60);
        bst.insert(80);
        
        System.out.println("Inorder traversal:");
        bst.inorder();
    }
}`,
    tags: ["data-structures", "tree", "search"],
  },
]

const categories = [
  { name: "All", count: 1247 },
  { name: "Algorithms", count: 342 },
  { name: "Data Structures", count: 198 },
  { name: "Web Development", count: 287 },
  { name: "Machine Learning", count: 156 },
  { name: "Game Development", count: 89 },
  { name: "Mobile Apps", count: 175 },
]

export default function PlaygroundPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [selectedSnippet, setSelectedSnippet] = useState(null)

  const handleRunSnippet = (snippet) => {
    // Navigate to editor with the snippet code
    const encodedCode = encodeURIComponent(snippet.code)
    window.open(`/editor?code=${encodedCode}&language=${snippet.language}`, "_blank")
  }

  const handleShareSnippet = (snippet) => {
    setSelectedSnippet(snippet)
    setShowShareDialog(true)
  }

  const copySnippetLink = () => {
    const url = `${window.location.origin}/playground/snippet/${selectedSnippet.id}`
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Code Playground</h1>
            <p className="text-xl text-gray-300">
              Discover, share, and learn from community code snippets and projects
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/editor">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Code2 className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1">
            <Input
              placeholder="Search code snippets, algorithms, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/20">
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name} className="text-white hover:bg-white/10">
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <Tabs defaultValue="featured" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="featured" className="data-[state=active]:bg-white/10 text-white">
              <Star className="w-4 h-4 mr-2" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-white/10 text-white">
              <Clock className="w-4 h-4 mr-2" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-white/10 text-white">
              <Heart className="w-4 h-4 mr-2" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-white/10 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSnippets.map((snippet, index) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg mb-2">{snippet.title}</CardTitle>
                          <CardDescription className="text-gray-300">{snippet.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-white/20 text-gray-300 ml-2">
                          {snippet.language}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Code Preview */}
                      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                        <pre className="text-sm text-gray-300 overflow-hidden">
                          <code>{snippet.code.substring(0, 150)}...</code>
                        </pre>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {snippet.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>by {snippet.author}</span>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{snippet.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{snippet.views}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleRunSnippet(snippet)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Run
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareSnippet(snippet)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Recent Snippets</h3>
              <p className="text-gray-400">Latest code snippets from the community</p>
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Popular Snippets</h3>
              <p className="text-gray-400">Most liked and shared code snippets</p>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Trending Snippets</h3>
              <p className="text-gray-400">Hot and trending code snippets this week</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-slate-900 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Share Code Snippet</DialogTitle>
          </DialogHeader>
          {selectedSnippet && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Snippet Title</label>
                <Input value={selectedSnippet.title} readOnly className="bg-white/5 border-white/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Share Link</label>
                <div className="flex space-x-2">
                  <Input
                    value={`${window.location.origin}/playground/snippet/${selectedSnippet.id}`}
                    readOnly
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Button onClick={copySnippetLink} className="bg-blue-500 hover:bg-blue-600">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Editor
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
