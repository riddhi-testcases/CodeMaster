"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Eye,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Plus,
  Hash,
  Award,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Navbar from "@/components/Navbar"

const posts = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      avatar: "👩‍💻",
      reputation: 2450,
      badge: "Expert",
    },
    title: "Best practices for React state management in 2024",
    content:
      "I've been working with React for 5 years and wanted to share some insights on state management patterns that have worked well for me...",
    tags: ["react", "state-management", "javascript"],
    likes: 234,
    replies: 45,
    views: 1520,
    timeAgo: "2 hours ago",
    category: "Discussion",
    solved: false,
  },
  {
    id: 2,
    author: {
      name: "Marcus Rodriguez",
      avatar: "👨‍🔬",
      reputation: 1890,
      badge: "Contributor",
    },
    title: "Help: Getting TypeError in my Python data analysis script",
    content: "I'm trying to process a CSV file with pandas but keep getting a TypeError. Here's my code...",
    tags: ["python", "pandas", "data-analysis", "help"],
    likes: 12,
    replies: 8,
    views: 156,
    timeAgo: "4 hours ago",
    category: "Help",
    solved: true,
  },
  {
    id: 3,
    author: {
      name: "Emily Johnson",
      avatar: "👩‍🎨",
      reputation: 3200,
      badge: "Mentor",
    },
    title: "Show & Tell: Built a real-time chat app with WebSockets",
    content:
      "Just finished building a real-time chat application using Node.js and Socket.io. Here's what I learned...",
    tags: ["nodejs", "websockets", "real-time", "showcase"],
    likes: 189,
    replies: 23,
    views: 892,
    timeAgo: "1 day ago",
    category: "Showcase",
    solved: false,
  },
  {
    id: 4,
    author: {
      name: "David Kim",
      avatar: "👨‍💼",
      reputation: 1560,
      badge: "Regular",
    },
    title: "Career advice: Transitioning from frontend to full-stack",
    content:
      "I've been a frontend developer for 3 years and want to become full-stack. What backend technologies should I focus on?",
    tags: ["career", "full-stack", "advice"],
    likes: 67,
    replies: 34,
    views: 445,
    timeAgo: "2 days ago",
    category: "Career",
    solved: false,
  },
]

const trendingTopics = [
  { name: "React 18", posts: 234, trend: "+15%" },
  { name: "TypeScript", posts: 189, trend: "+8%" },
  { name: "Next.js", posts: 156, trend: "+12%" },
  { name: "Python", posts: 298, trend: "+5%" },
  { name: "Machine Learning", posts: 134, trend: "+22%" },
  { name: "Web3", posts: 89, trend: "+18%" },
]

const categories = ["All", "Discussion", "Help", "Showcase", "Career", "News"]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostTags, setNewPostTags] = useState("")

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Expert":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Mentor":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Contributor":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Help":
        return "bg-red-500/20 text-red-400"
      case "Showcase":
        return "bg-green-500/20 text-green-400"
      case "Career":
        return "bg-blue-500/20 text-blue-400"
      case "News":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
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
            <h1 className="text-4xl font-bold text-white mb-2">Developer Community</h1>
            <p className="text-xl text-gray-300">Connect, learn, and grow with fellow developers</p>
          </div>
          <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="What's your question or topic?"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <Textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your thoughts, code, or question..."
                    className="bg-white/5 border-white/20 text-white min-h-32"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags</label>
                  <Input
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                    placeholder="javascript, react, help (comma separated)"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Post
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Save Draft
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search posts, topics, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/20 text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Tabs defaultValue="recent" className="flex-1">
                  <TabsList className="bg-white/5 border border-white/10">
                    <TabsTrigger value="recent" className="data-[state=active]:bg-white/10 text-white">
                      <Clock className="w-4 h-4 mr-2" />
                      Recent
                    </TabsTrigger>
                    <TabsTrigger value="popular" className="data-[state=active]:bg-white/10 text-white">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Popular
                    </TabsTrigger>
                    <TabsTrigger value="unanswered" className="data-[state=active]:bg-white/10 text-white">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Unanswered
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </motion.div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg">
                            {post.author.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-white font-medium">{post.author.name}</span>
                                <Badge className={getBadgeColor(post.author.badge)}>{post.author.badge}</Badge>
                                <span className="text-gray-400 text-sm">{post.timeAgo}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                                {post.solved && (
                                  <Badge className="bg-green-500/20 text-green-400">
                                    <Award className="w-3 h-3 mr-1" />
                                    Solved
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Content */}
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{post.content}</p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-white/20 text-gray-300">
                                <Hash className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Reply className="w-4 h-4" />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{post.views}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">#{topic.name}</div>
                        <div className="text-gray-400 text-sm">{topic.posts} posts</div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">{topic.trend}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50,234</div>
                    <div className="text-gray-400 text-sm">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">12,456</div>
                    <div className="text-gray-400 text-sm">Posts This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">98.5%</div>
                    <div className="text-gray-400 text-sm">Questions Answered</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Sarah Chen", reputation: 2450, avatar: "👩‍💻" },
                    { name: "Emily Johnson", reputation: 3200, avatar: "👩‍🎨" },
                    { name: "Marcus Rodriguez", reputation: 1890, avatar: "👨‍🔬" },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-xl">{user.avatar}</div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.reputation} reputation</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
