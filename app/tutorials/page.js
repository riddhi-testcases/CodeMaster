"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  CheckCircle,
  Filter,
  Search,
  Bookmark,
  Share2,
  Code2,
  Video,
  FileText,
  Headphones,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Navbar from "@/components/Navbar"

const tutorials = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming from variables to functions",
    instructor: "Sarah Chen",
    duration: "4h 30m",
    lessons: 24,
    students: 15420,
    rating: 4.9,
    level: "Beginner",
    category: "Web Development",
    type: "video",
    progress: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["javascript", "fundamentals", "programming"],
    price: "Free",
  },
  {
    id: 2,
    title: "Python Data Structures",
    description: "Deep dive into Python data structures and algorithms",
    instructor: "Marcus Rodriguez",
    duration: "6h 15m",
    lessons: 32,
    students: 8750,
    rating: 4.8,
    level: "Intermediate",
    category: "Data Science",
    type: "video",
    progress: 45,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["python", "data-structures", "algorithms"],
    price: "$29",
  },
  {
    id: 3,
    title: "React Complete Guide",
    description: "Build modern web applications with React and its ecosystem",
    instructor: "Emily Johnson",
    duration: "8h 45m",
    lessons: 48,
    students: 12100,
    rating: 4.9,
    level: "Intermediate",
    category: "Web Development",
    type: "video",
    progress: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["react", "frontend", "components"],
    price: "$49",
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning concepts and practical applications",
    instructor: "Dr. Alex Kim",
    duration: "10h 20m",
    lessons: 56,
    students: 5200,
    rating: 4.7,
    level: "Advanced",
    category: "Machine Learning",
    type: "video",
    progress: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["ml", "ai", "python", "tensorflow"],
    price: "$79",
  },
  {
    id: 5,
    title: "CSS Grid & Flexbox",
    description: "Master modern CSS layout techniques for responsive design",
    instructor: "Lisa Wang",
    duration: "3h 15m",
    lessons: 18,
    students: 9800,
    rating: 4.8,
    level: "Beginner",
    category: "Web Development",
    type: "interactive",
    progress: 100,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["css", "layout", "responsive"],
    price: "Free",
  },
  {
    id: 6,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js and Express",
    instructor: "James Wilson",
    duration: "7h 30m",
    lessons: 42,
    students: 6500,
    rating: 4.6,
    level: "Intermediate",
    category: "Backend",
    type: "video",
    progress: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["nodejs", "express", "backend", "api"],
    price: "$39",
  },
]

const categories = ["All", "Web Development", "Data Science", "Machine Learning", "Backend", "Mobile"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]
const types = ["All", "Video", "Interactive", "Text", "Audio"]

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [activeTab, setActiveTab] = useState("all")

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || tutorial.level === selectedLevel
    const matchesType = selectedType === "All" || tutorial.type === selectedType.toLowerCase()

    return matchesSearch && matchesCategory && matchesLevel && matchesType
  })

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "interactive":
        return <Code2 className="w-4 h-4" />
      case "text":
        return <FileText className="w-4 h-4" />
      case "audio":
        return <Headphones className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">Learn & Master</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive tutorials and courses to accelerate your programming journey
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search tutorials, courses, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
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

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                {levels.map((level) => (
                  <SelectItem key={level} value={level} className="text-white hover:bg-white/10">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                {types.map((type) => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-white/10 text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              All Tutorials
            </TabsTrigger>
            <TabsTrigger value="my-learning" className="data-[state=active]:bg-white/10 text-white">
              <Play className="w-4 h-4 mr-2" />
              My Learning
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="data-[state=active]:bg-white/10 text-white">
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-white/10 text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </TabsTrigger>
          </TabsList>

          {/* All Tutorials Tab */}
          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <div className="w-full h-48 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-t-lg flex items-center justify-center">
                          <div className="text-6xl opacity-20">{getTypeIcon(tutorial.type)}</div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className={getLevelColor(tutorial.level)}>{tutorial.level}</Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="border-white/20 text-white">
                            {tutorial.price}
                          </Badge>
                        </div>
                        {tutorial.progress > 0 && (
                          <div className="absolute bottom-3 left-3 right-3">
                            <Progress value={tutorial.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <CardTitle className="text-white text-lg mb-2">{tutorial.title}</CardTitle>
                        <CardDescription className="text-gray-300">{tutorial.description}</CardDescription>
                      </div>

                      <div className="text-sm text-gray-400">
                        <div className="flex items-center justify-between mb-2">
                          <span>by {tutorial.instructor}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{tutorial.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{tutorial.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{tutorial.students.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tutorial.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Link href={`/tutorials/${tutorial.id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            {tutorial.progress > 0 ? (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Continue
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Start Learning
                              </>
                            )}
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* My Learning Tab */}
          <TabsContent value="my-learning" className="space-y-6">
            <div className="text-center py-12">
              <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Continue Your Learning Journey</h3>
              <p className="text-gray-400 mb-6">Pick up where you left off</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Browse Tutorials
              </Button>
            </div>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Your Bookmarked Tutorials</h3>
              <p className="text-gray-400 mb-6">Save tutorials to learn later</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Explore Tutorials
              </Button>
            </div>
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Completed Tutorials</h3>
              <p className="text-gray-400 mb-6">Track your learning achievements</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                View Certificates
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
