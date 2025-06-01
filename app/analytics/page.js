"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Award,
  Calendar,
  Code2,
  Brain,
  Users,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Activity,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"

const overviewStats = [
  {
    title: "Total Study Hours",
    value: "127.5",
    change: "+12.3%",
    trend: "up",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Lessons Completed",
    value: "89",
    change: "+8.2%",
    trend: "up",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Code Quality Score",
    value: "92",
    change: "+5.1%",
    trend: "up",
    icon: Code2,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Global Rank",
    value: "#342",
    change: "-15",
    trend: "up",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
  },
]

const weeklyActivity = [
  { day: "Mon", hours: 2.5, lessons: 3, quality: 88 },
  { day: "Tue", hours: 1.8, lessons: 2, quality: 85 },
  { day: "Wed", hours: 3.2, lessons: 4, quality: 92 },
  { day: "Thu", hours: 2.1, lessons: 2, quality: 89 },
  { day: "Fri", hours: 4.0, lessons: 5, quality: 95 },
  { day: "Sat", hours: 3.5, lessons: 4, quality: 91 },
  { day: "Sun", hours: 2.8, lessons: 3, quality: 87 },
]

const skillProgress = [
  { skill: "JavaScript", current: 85, previous: 78, trend: "up", color: "bg-yellow-500" },
  { skill: "React", current: 78, previous: 72, trend: "up", color: "bg-blue-500" },
  { skill: "Node.js", current: 65, previous: 58, trend: "up", color: "bg-green-500" },
  { skill: "Python", current: 45, previous: 48, trend: "down", color: "bg-purple-500" },
  { skill: "System Design", current: 60, previous: 55, trend: "up", color: "bg-cyan-500" },
  { skill: "TypeScript", current: 52, previous: 45, trend: "up", color: "bg-blue-600" },
]

const achievements = [
  {
    title: "Code Warrior",
    description: "Complete 100 coding challenges",
    progress: 75,
    icon: Trophy,
    unlocked: false,
    category: "Coding",
  },
  {
    title: "Learning Streak",
    description: "Study for 30 consecutive days",
    progress: 100,
    icon: Calendar,
    unlocked: true,
    category: "Consistency",
  },
  {
    title: "Mentor Helper",
    description: "Help 10 fellow developers",
    progress: 60,
    icon: Users,
    unlocked: false,
    category: "Community",
  },
  {
    title: "AI Enthusiast",
    description: "Complete AI fundamentals course",
    progress: 30,
    icon: Brain,
    unlocked: false,
    category: "Learning",
  },
]

const monthlyGoals = [
  {
    title: "Complete React Advanced Course",
    progress: 80,
    target: "Dec 31, 2024",
    status: "on-track",
    category: "Learning",
  },
  {
    title: "Improve Code Quality Score to 95",
    progress: 92,
    target: "Dec 31, 2024",
    status: "on-track",
    category: "Quality",
  },
  {
    title: "Mentor 5 Junior Developers",
    progress: 40,
    target: "Dec 31, 2024",
    status: "behind",
    category: "Mentoring",
  },
  {
    title: "Build 3 Portfolio Projects",
    progress: 67,
    target: "Dec 31, 2024",
    status: "ahead",
    category: "Projects",
  },
]

const learningInsights = [
  {
    title: "Peak Learning Hours",
    value: "2-4 PM",
    description: "You're most productive during afternoon sessions",
    icon: Clock,
  },
  {
    title: "Strongest Skill",
    value: "JavaScript",
    description: "85% proficiency with consistent improvement",
    icon: Code2,
  },
  {
    title: "Learning Style",
    value: "Visual Learner",
    description: "You prefer video tutorials and interactive content",
    icon: Brain,
  },
  {
    title: "Improvement Area",
    value: "System Design",
    description: "Focus on scalability patterns and architecture",
    icon: Target,
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Analytics Dashboard</h1>
            <p className="text-xl text-gray-300">
              Track your progress, analyze your learning patterns, and optimize your coding journey.
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              <SelectItem value="7d" className="text-white hover:bg-white/10">
                7 Days
              </SelectItem>
              <SelectItem value="30d" className="text-white hover:bg-white/10">
                30 Days
              </SelectItem>
              <SelectItem value="90d" className="text-white hover:bg-white/10">
                90 Days
              </SelectItem>
              <SelectItem value="1y" className="text-white hover:bg-white/10">
                1 Year
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-white/10 text-white">
              <Code2 className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white/10 text-white">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-white/10 text-white">
              <Target className="w-4 h-4 mr-2" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-white/10 text-white">
              <Brain className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                        >
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div
                          className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
                        >
                          {stat.trend === "up" ? (
                            <ArrowUp className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDown className="w-4 h-4 mr-1" />
                          )}
                          {stat.change}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.title}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Weekly Activity Chart */}
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Hours Chart */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Study Hours</h4>
                    <div className="space-y-3">
                      {weeklyActivity.map((day, index) => (
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
                              <span className="text-gray-300">{day.hours}h</span>
                              <span className="text-gray-300">{day.lessons} lessons</span>
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
                          <div className="w-16 text-right">
                            <Badge
                              variant={day.quality >= 90 ? "default" : day.quality >= 80 ? "secondary" : "destructive"}
                            >
                              {day.quality}%
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Completed React Hooks Deep Dive", time: "2 hours ago", icon: CheckCircle },
                    { title: "Improved Code Quality Score", time: "1 day ago", icon: TrendingUp },
                    { title: "Helped 3 developers in community", time: "2 days ago", icon: Users },
                    { title: "Finished System Design Challenge", time: "3 days ago", icon: Target },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{activity.title}</div>
                        <div className="text-gray-400 text-sm">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Learning Streaks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                    >
                      23
                    </motion.div>
                    <div className="text-gray-300 text-sm mb-4">Current Streak (Days)</div>
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Longest Streak</span>
                      <span className="text-white font-semibold">45 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">This Month</span>
                      <span className="text-white font-semibold">28 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Active Days</span>
                      <span className="text-white font-semibold">156 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skill Progress */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Skill Progress</CardTitle>
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
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{skill.skill}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">{skill.previous}%</span>
                          <div
                            className={`flex items-center text-sm ${skill.trend === "up" ? "text-green-400" : "text-red-400"}`}
                          >
                            {skill.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          </div>
                          <span className="text-white font-semibold">{skill.current}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <motion.div
                          className={`${skill.color} h-3 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.current}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Skill Recommendations */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">AI Skill Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      skill: "TypeScript",
                      reason: "Enhance your JavaScript development",
                      priority: "High",
                      estimatedTime: "2 weeks",
                    },
                    {
                      skill: "Docker",
                      reason: "Essential for modern deployment",
                      priority: "Medium",
                      estimatedTime: "1 week",
                    },
                    {
                      skill: "GraphQL",
                      reason: "Next-gen API development",
                      priority: "Medium",
                      estimatedTime: "3 weeks",
                    },
                    {
                      skill: "Rust",
                      reason: "High-performance systems programming",
                      priority: "Low",
                      estimatedTime: "6 weeks",
                    },
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
                      <p className="text-gray-300 text-sm mb-2">{rec.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Est. {rec.estimatedTime}</span>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Start Learning
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
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
                          className={`w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center ${!achievement.unlocked ? "opacity-50" : ""}`}
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
                            <Badge variant="outline" className="border-white/20 text-gray-300">
                              {achievement.category}
                            </Badge>
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

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {monthlyGoals.map((goal, index) => (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">{goal.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="border-white/20 text-gray-300">
                              {goal.category}
                            </Badge>
                            <Badge
                              variant={
                                goal.status === "on-track"
                                  ? "default"
                                  : goal.status === "ahead"
                                    ? "default"
                                    : "destructive"
                              }
                              className={
                                goal.status === "ahead" ? "bg-green-500" : goal.status === "behind" ? "bg-red-500" : ""
                              }
                            >
                              {goal.status.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{goal.progress}%</div>
                          <div className="text-sm text-gray-400">Complete</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Progress value={goal.progress} className="h-3" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Target: {goal.target}</span>
                          <span className="text-gray-300">
                            {goal.progress < 100 ? `${100 - goal.progress}% remaining` : "Completed!"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Add New Goal */}
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10 border-dashed">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Set New Goal</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Create a new learning goal to track your progress and stay motivated.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Target className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {learningInsights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <insight.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{insight.title}</h3>
                          <div className="text-xl font-bold text-blue-400 mb-2">{insight.value}</div>
                          <p className="text-gray-300 text-sm">{insight.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* AI Recommendations */}
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI-Powered Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Optimize Study Schedule",
                    description:
                      "Based on your peak performance hours (2-4 PM), consider scheduling complex topics during this time.",
                    action: "Adjust Schedule",
                    priority: "High",
                  },
                  {
                    title: "Focus on System Design",
                    description:
                      "Your system design skills need attention. Recommend dedicating 30 minutes daily to architecture patterns.",
                    action: "Start Learning Path",
                    priority: "Medium",
                  },
                  {
                    title: "Join Study Groups",
                    description:
                      "You learn better in collaborative environments. Consider joining our React study group.",
                    action: "Find Groups",
                    priority: "Low",
                  },
                ].map((rec, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-white font-medium">{rec.title}</h4>
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
                        <p className="text-gray-300 text-sm">{rec.description}</p>
                      </div>
                      <Button
                        size="sm"
                        className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        {rec.action}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
