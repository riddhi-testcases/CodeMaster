"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Target, Clock, Users, Play, CheckCircle, Zap, Award, TrendingUp, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Navbar from "@/components/Navbar"

const challenges = [
  {
    id: 1,
    title: "Two Sum Problem",
    description: "Find two numbers in an array that add up to a target sum",
    difficulty: "Easy",
    points: 100,
    timeLimit: "30 min",
    participants: 15420,
    successRate: 78,
    tags: ["arrays", "hash-table", "two-pointers"],
    category: "Algorithms",
    completed: false,
    language: "javascript",
  },
  {
    id: 2,
    title: "Binary Tree Traversal",
    description: "Implement inorder, preorder, and postorder traversal of a binary tree",
    difficulty: "Medium",
    points: 250,
    timeLimit: "45 min",
    participants: 8750,
    successRate: 65,
    tags: ["tree", "recursion", "dfs"],
    category: "Data Structures",
    completed: true,
    language: "python",
  },
  {
    id: 3,
    title: "Dynamic Programming - Fibonacci",
    description: "Optimize fibonacci calculation using dynamic programming",
    difficulty: "Medium",
    points: 200,
    timeLimit: "40 min",
    participants: 12100,
    successRate: 72,
    tags: ["dynamic-programming", "optimization", "memoization"],
    category: "Algorithms",
    completed: false,
    language: "java",
  },
  {
    id: 4,
    title: "Graph Shortest Path",
    description: "Find the shortest path between two nodes using Dijkstra's algorithm",
    difficulty: "Hard",
    points: 400,
    timeLimit: "60 min",
    participants: 3200,
    successRate: 45,
    tags: ["graph", "shortest-path", "dijkstra"],
    category: "Algorithms",
    completed: false,
    language: "cpp",
  },
  {
    id: 5,
    title: "String Manipulation",
    description: "Implement various string operations and pattern matching",
    difficulty: "Easy",
    points: 150,
    timeLimit: "25 min",
    participants: 18900,
    successRate: 85,
    tags: ["strings", "pattern-matching", "regex"],
    category: "Fundamentals",
    completed: true,
    language: "python",
  },
  {
    id: 6,
    title: "Concurrent Programming",
    description: "Solve race conditions and implement thread-safe operations",
    difficulty: "Hard",
    points: 500,
    timeLimit: "90 min",
    participants: 1800,
    successRate: 32,
    tags: ["concurrency", "threads", "synchronization"],
    category: "Advanced",
    completed: false,
    language: "java",
  },
]

const leaderboard = [
  { rank: 1, name: "CodeNinja", points: 15420, avatar: "🥇", streak: 45 },
  { rank: 2, name: "AlgoMaster", points: 14200, avatar: "🥈", streak: 32 },
  { rank: 3, name: "DevGuru", points: 13800, avatar: "🥉", streak: 28 },
  { rank: 4, name: "ByteWizard", points: 12900, avatar: "👑", streak: 25 },
  { rank: 5, name: "CodeCrusher", points: 11500, avatar: "⚡", streak: 22 },
]

const categories = ["All", "Algorithms", "Data Structures", "Fundamentals", "Advanced", "Web Development"]
const difficulties = ["All", "Easy", "Medium", "Hard"]

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [activeTab, setActiveTab] = useState("challenges")

  const filteredChallenges = challenges.filter((challenge) => {
    const categoryMatch = selectedCategory === "All" || challenge.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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
          <h1 className="text-5xl font-bold text-white mb-4">Coding Challenges</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Test your skills, compete with developers worldwide, and level up your programming abilities
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
            <TabsTrigger value="challenges" className="data-[state=active]:bg-white/10 text-white">
              <Target className="w-4 h-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white/10 text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="contests" className="data-[state=active]:bg-white/10 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Contests
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white/10 text-white">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
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

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty} className="text-white hover:bg-white/10">
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Challenges Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg mb-2 flex items-center">
                            {challenge.completed && <CheckCircle className="w-5 h-5 text-green-400 mr-2" />}
                            {challenge.title}
                          </CardTitle>
                          <CardDescription className="text-gray-300">{challenge.description}</CardDescription>
                        </div>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Challenge Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">{challenge.points} pts</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{challenge.timeLimit}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300">{challenge.participants.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{challenge.successRate}%</span>
                        </div>
                      </div>

                      {/* Success Rate Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Success Rate</span>
                          <span className="text-white">{challenge.successRate}%</span>
                        </div>
                        <Progress value={challenge.successRate} className="h-2" />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {challenge.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Link href={`/editor?challenge=${challenge.id}`}>
                        <Button
                          className={`w-full ${
                            challenge.completed
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          }`}
                        >
                          {challenge.completed ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Challenge
                            </>
                          )}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription className="text-gray-300">Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="text-white font-semibold">{user.name}</div>
                          <div className="text-gray-400 text-sm">Rank #{user.rank}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{user.points.toLocaleString()} pts</div>
                        <div className="text-gray-400 text-sm flex items-center">
                          <Zap className="w-3 h-3 mr-1" />
                          {user.streak} day streak
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-6">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Upcoming Contests</h3>
              <p className="text-gray-400 mb-6">Compete in live coding contests and win prizes</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                View Contest Schedule
              </Button>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Your Achievements</h3>
              <p className="text-gray-400 mb-6">Track your progress and unlock new badges</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                View All Achievements
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
