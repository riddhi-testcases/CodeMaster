"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Target,
  Award,
  Clock,
  Users,
  TrendingUp,
  Play,
  CheckCircle,
  Star,
  Brain,
  Code2,
  Trophy,
  Calendar,
  BarChart3,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

const learningPaths = [
  {
    id: 1,
    title: "Full Stack JavaScript Mastery",
    description: "Master modern JavaScript development from frontend to backend",
    progress: 65,
    totalLessons: 45,
    completedLessons: 29,
    difficulty: "Intermediate",
    duration: "12 weeks",
    students: 15420,
    rating: 4.9,
    color: "from-yellow-500 to-orange-500",
    skills: ["React", "Node.js", "Express", "MongoDB"],
    nextLesson: "Advanced React Hooks",
  },
  {
    id: 2,
    title: "AI & Machine Learning Fundamentals",
    description: "Learn the basics of AI and machine learning with practical projects",
    progress: 30,
    totalLessons: 38,
    completedLessons: 11,
    difficulty: "Advanced",
    duration: "16 weeks",
    students: 8750,
    rating: 4.8,
    color: "from-purple-500 to-pink-500",
    skills: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
    nextLesson: "Neural Network Basics",
  },
  {
    id: 3,
    title: "System Design & Architecture",
    description: "Design scalable systems and understand distributed architecture",
    progress: 80,
    totalLessons: 25,
    completedLessons: 20,
    difficulty: "Expert",
    duration: "10 weeks",
    students: 5230,
    rating: 4.9,
    color: "from-blue-500 to-cyan-500",
    skills: ["Microservices", "Docker", "Kubernetes", "AWS"],
    nextLesson: "Load Balancing Strategies",
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with React Native",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    difficulty: "Intermediate",
    duration: "14 weeks",
    students: 12100,
    rating: 4.7,
    color: "from-green-500 to-emerald-500",
    skills: ["React Native", "Expo", "Firebase", "Redux"],
    nextLesson: "Navigation Patterns",
  },
]

const achievements = [
  {
    id: 1,
    title: "Code Warrior",
    description: "Complete 100 coding challenges",
    progress: 75,
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    unlocked: false,
  },
  {
    id: 2,
    title: "Learning Streak",
    description: "Study for 30 consecutive days",
    progress: 100,
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
    unlocked: true,
  },
  {
    id: 3,
    title: "Mentor Helper",
    description: "Help 10 fellow developers",
    progress: 60,
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    unlocked: false,
  },
  {
    id: 4,
    title: "AI Enthusiast",
    description: "Complete AI fundamentals course",
    progress: 30,
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    unlocked: false,
  },
]

const weeklyStats = [
  { day: "Mon", hours: 2.5, completed: 3 },
  { day: "Tue", hours: 1.8, completed: 2 },
  { day: "Wed", hours: 3.2, completed: 4 },
  { day: "Thu", hours: 2.1, completed: 2 },
  { day: "Fri", hours: 4.0, completed: 5 },
  { day: "Sat", hours: 3.5, completed: 4 },
  { day: "Sun", hours: 2.8, completed: 3 },
]

const skillProgress = [
  { skill: "JavaScript", level: 85, color: "bg-yellow-500" },
  { skill: "React", level: 78, color: "bg-blue-500" },
  { skill: "Node.js", level: 65, color: "bg-green-500" },
  { skill: "Python", level: 45, color: "bg-purple-500" },
  { skill: "System Design", level: 60, color: "bg-cyan-500" },
]

export default function LearningPage() {
  const [selectedPath, setSelectedPath] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [activeTab, setActiveTab] = useState("paths")

  const filteredPaths = learningPaths.filter((path) => {
    const matchesSearch =
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = filterDifficulty === "all" || path.difficulty.toLowerCase() === filterDifficulty
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">Learning Dashboard</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accelerate your coding journey with AI-powered personalized learning paths and real-time progress tracking.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-lg border border-white/10">
            <TabsTrigger value="paths" className="data-[state=active]:bg-white/10 text-white">
              <Target className="w-4 h-4 mr-2" />
              Learning Paths
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-white/10 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white/10 text-white">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-white/10 text-white">
              <Code2 className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Learning Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search learning paths..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="all" className="text-white hover:bg-white/10">
                    All Levels
                  </SelectItem>
                  <SelectItem value="beginner" className="text-white hover:bg-white/10">
                    Beginner
                  </SelectItem>
                  <SelectItem value="intermediate" className="text-white hover:bg-white/10">
                    Intermediate
                  </SelectItem>
                  <SelectItem value="advanced" className="text-white hover:bg-white/10">
                    Advanced
                  </SelectItem>
                  <SelectItem value="expert" className="text-white hover:bg-white/10">
                    Expert
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Learning Paths Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white text-xl mb-2">{path.title}</CardTitle>
                          <p className="text-gray-300 text-sm mb-4">{path.description}</p>
                        </div>
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${path.color} rounded-xl flex items-center justify-center ml-4`}
                        >
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {path.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {path.students.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {path.rating}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-white">
                            {path.completedLessons}/{path.totalLessons} lessons
                          </span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                        <div className="text-right text-sm text-gray-400 mt-1">{path.progress}% complete</div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-300 mb-2">Skills you'll learn:</div>
                        <div className="flex flex-wrap gap-2">
                          {path.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs border-white/20 text-gray-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="text-sm text-gray-400">Next lesson:</div>
                          <div className="text-sm text-white font-medium">{path.nextLesson}</div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Weekly Activity */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyStats.map((day, index) => (
                      <motion.div
                        key={day.day}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-12 text-sm text-gray-400">{day.day}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-300">{day.hours}h studied</span>
                            <span className="text-gray-300">{day.completed} lessons</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(day.hours / 4) * 100}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Study Streak */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Study Streak
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <motion.div
                    className="text-4xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  >
                    23
                  </motion.div>
                  <div className="text-gray-300 text-sm mb-4">Days in a row</div>
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning Statistics */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Total Hours", value: "127", icon: Clock, color: "from-blue-500 to-cyan-500" },
                { label: "Lessons Completed", value: "89", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
                { label: "Certificates Earned", value: "5", icon: Award, color: "from-yellow-500 to-orange-500" },
                { label: "Rank", value: "#342", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10 text-center">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    className={`bg-white/5 backdrop-blur-lg border border-white/10 ${achievement.unlocked ? "ring-2 ring-yellow-500/50" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center ${!achievement.unlocked ? "opacity-50" : ""}`}
                        >
                          <achievement.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
                            {achievement.unlocked && (
                              <Badge className="bg-yellow-500 text-black">
                                <Trophy className="w-3 h-3 mr-1" />
                                Unlocked
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Skill Progress */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Code2 className="w-5 h-5 mr-2" />
                    Skill Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillProgress.map((skill, index) => (
                    <motion.div
                      key={skill.skill}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{skill.skill}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <motion.div
                          className={`${skill.color} h-3 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommended Skills */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "TypeScript", reason: "Enhance your JavaScript skills", priority: "High" },
                    { skill: "Docker", reason: "Essential for modern deployment", priority: "Medium" },
                    { skill: "GraphQL", reason: "Next-gen API development", priority: "Medium" },
                    { skill: "Rust", reason: "High-performance systems programming", priority: "Low" },
                  ].map((rec, index) => (
                    <motion.div
                      key={rec.skill}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{rec.skill}</h4>
                        <Badge
                          variant={
                            rec.priority === "High"
                              ? "destructive"
                              : rec.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{rec.reason}</p>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
