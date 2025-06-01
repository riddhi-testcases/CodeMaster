"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Star,
  MessageSquare,
  Video,
  Calendar,
  Clock,
  Award,
  Brain,
  Search,
  MapPin,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Navbar from "@/components/navbar"

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    location: "San Francisco, CA",
    languages: ["English", "Mandarin"],
    specialties: ["React", "Node.js", "System Design", "Career Guidance"],
    experience: "8+ years",
    bio: "Passionate about helping developers grow their careers. Specialized in full-stack development and system architecture.",
    availability: "Available",
    responseTime: "< 2 hours",
    totalSessions: 450,
    successRate: 98,
    badges: ["Top Mentor", "Career Expert", "System Design Pro"],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Tech Lead",
    company: "Microsoft",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 95,
    location: "Seattle, WA",
    languages: ["English", "Spanish"],
    specialties: ["Python", "Machine Learning", "Data Science", "Leadership"],
    experience: "10+ years",
    bio: "ML engineer turned tech lead. Love mentoring on AI/ML projects and technical leadership skills.",
    availability: "Busy",
    responseTime: "< 4 hours",
    totalSessions: 320,
    successRate: 96,
    badges: ["AI Expert", "Leadership Coach", "Top Rated"],
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Full Stack Developer",
    company: "Stripe",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 75,
    location: "Austin, TX",
    languages: ["English"],
    specialties: ["JavaScript", "TypeScript", "React", "Backend Development"],
    experience: "6+ years",
    bio: "Full-stack developer with expertise in modern web technologies. Focused on clean code and best practices.",
    availability: "Available",
    responseTime: "< 1 hour",
    totalSessions: 280,
    successRate: 99,
    badges: ["Quick Responder", "Code Quality Expert", "Beginner Friendly"],
  },
  {
    id: 4,
    name: "David Kim",
    title: "DevOps Engineer",
    company: "Netflix",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviews: 73,
    hourlyRate: 90,
    location: "Los Angeles, CA",
    languages: ["English", "Korean"],
    specialties: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    experience: "7+ years",
    bio: "DevOps specialist helping teams scale their infrastructure. Expert in cloud technologies and automation.",
    availability: "Available",
    responseTime: "< 3 hours",
    totalSessions: 195,
    successRate: 97,
    badges: ["Cloud Expert", "DevOps Pro", "Scaling Specialist"],
  },
]

const upcomingSessions = [
  {
    id: 1,
    mentor: "Sarah Chen",
    topic: "System Design Review",
    date: "Today",
    time: "2:00 PM",
    duration: "60 min",
    type: "video",
    status: "confirmed",
  },
  {
    id: 2,
    mentor: "Emily Johnson",
    topic: "Code Review Session",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "45 min",
    type: "screen-share",
    status: "pending",
  },
  {
    id: 3,
    mentor: "Marcus Rodriguez",
    topic: "Career Planning",
    date: "Friday",
    time: "3:30 PM",
    duration: "90 min",
    type: "video",
    status: "confirmed",
  },
]

const mentorshipStats = [
  { label: "Total Sessions", value: "23", icon: Video, color: "from-blue-500 to-cyan-500" },
  { label: "Hours Mentored", value: "34", icon: Clock, color: "from-green-500 to-emerald-500" },
  { label: "Skills Improved", value: "8", icon: Target, color: "from-purple-500 to-pink-500" },
  { label: "Goals Achieved", value: "5", icon: Award, color: "from-yellow-500 to-orange-500" },
]

export default function MentorshipPage() {
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")
  const [activeTab, setActiveTab] = useState("find-mentors")

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.specialties.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSpecialty = filterSpecialty === "all" || mentor.specialties.includes(filterSpecialty)
    const matchesAvailability = filterAvailability === "all" || mentor.availability.toLowerCase() === filterAvailability
    return matchesSearch && matchesSpecialty && matchesAvailability
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
          <h1 className="text-5xl font-bold text-white mb-4">Mentorship Hub</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with expert developers, get personalized guidance, and accelerate your career growth with 1-on-1
            mentorship.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-lg border border-white/10">
            <TabsTrigger value="find-mentors" className="data-[state=active]:bg-white/10 text-white">
              <Users className="w-4 h-4 mr-2" />
              Find Mentors
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-white/10 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              My Sessions
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-white/10 text-white">
              <Target className="w-4 h-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="become-mentor" className="data-[state=active]:bg-white/10 text-white">
              <Award className="w-4 h-4 mr-2" />
              Become Mentor
            </TabsTrigger>
          </TabsList>

          {/* Find Mentors Tab */}
          <TabsContent value="find-mentors" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search mentors by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="all" className="text-white hover:bg-white/10">
                    All Specialties
                  </SelectItem>
                  <SelectItem value="React" className="text-white hover:bg-white/10">
                    React
                  </SelectItem>
                  <SelectItem value="Node.js" className="text-white hover:bg-white/10">
                    Node.js
                  </SelectItem>
                  <SelectItem value="Python" className="text-white hover:bg-white/10">
                    Python
                  </SelectItem>
                  <SelectItem value="System Design" className="text-white hover:bg-white/10">
                    System Design
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="all" className="text-white hover:bg-white/10">
                    All
                  </SelectItem>
                  <SelectItem value="available" className="text-white hover:bg-white/10">
                    Available
                  </SelectItem>
                  <SelectItem value="busy" className="text-white hover:bg-white/10">
                    Busy
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mentors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    <CardHeader className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                        <AvatarFallback>
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-white text-xl">{mentor.name}</CardTitle>
                      <p className="text-gray-300 text-sm">{mentor.title}</p>
                      <p className="text-gray-400 text-sm">{mentor.company}</p>

                      <div className="flex items-center justify-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-white text-sm">{mentor.rating}</span>
                          <span className="text-gray-400 text-sm ml-1">({mentor.reviews})</span>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs ${
                            mentor.availability === "Available"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {mentor.availability}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Rate:</span>
                        <span className="text-white font-semibold">${mentor.hourlyRate}/hour</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {mentor.location}
                      </div>

                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        Responds in {mentor.responseTime}
                      </div>

                      <div>
                        <div className="text-sm text-gray-300 mb-2">Specialties:</div>
                        <div className="flex flex-wrap gap-1">
                          {mentor.specialties.slice(0, 3).map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs border-white/20 text-gray-300">
                              {specialty}
                            </Badge>
                          ))}
                          {mentor.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                              +{mentor.specialties.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {mentor.badges.map((badge) => (
                          <Badge key={badge} className="text-xs bg-gradient-to-r from-blue-500 to-purple-600">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-white/20 text-white hover:bg-white/10"
                            >
                              View Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">{mentor.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="flex items-start space-x-4">
                                <Avatar className="w-24 h-24">
                                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                                  <AvatarFallback>
                                    {mentor.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="text-xl font-semibold">{mentor.title}</h3>
                                  <p className="text-gray-300">{mentor.company}</p>
                                  <p className="text-gray-400 mt-2">{mentor.bio}</p>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{mentor.totalSessions}</div>
                                  <div className="text-sm text-gray-400">Total Sessions</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{mentor.successRate}%</div>
                                  <div className="text-sm text-gray-400">Success Rate</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{mentor.experience}</div>
                                  <div className="text-sm text-gray-400">Experience</div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Specialties</h4>
                                <div className="flex flex-wrap gap-2">
                                  {mentor.specialties.map((specialty) => (
                                    <Badge key={specialty} variant="outline" className="border-white/20 text-gray-300">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Book Session
                                </Button>
                                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* My Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upcoming Sessions */}
              <div className="lg:col-span-2">
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        className="p-4 bg-white/5 rounded-lg border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{session.topic}</h4>
                            <p className="text-gray-300 text-sm">with {session.mentor}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {session.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {session.time}
                              </div>
                              <div className="flex items-center">
                                <Video className="w-4 h-4 mr-1" />
                                {session.duration}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                              {session.status}
                            </Badge>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Mentor
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Session History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              {mentorshipStats.map((stat, index) => (
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

            {/* Progress Details */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Completed React Advanced Course", date: "2 days ago", icon: CheckCircle },
                    { title: "Improved Code Quality Score", date: "1 week ago", icon: Zap },
                    { title: "Successful System Design Review", date: "2 weeks ago", icon: Award },
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <achievement.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{achievement.title}</div>
                        <div className="text-gray-400 text-sm">{achievement.date}</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Mentor Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { mentor: "Sarah Chen", feedback: "Great progress on system design concepts!", rating: 5 },
                    { mentor: "Emily Johnson", feedback: "Code quality has improved significantly.", rating: 5 },
                    { mentor: "Marcus Rodriguez", feedback: "Excellent understanding of ML fundamentals.", rating: 4 },
                  ].map((feedback, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-white/5 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{feedback.mentor}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{feedback.feedback}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Become Mentor Tab */}
          <TabsContent value="become-mentor" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">Become a Mentor</CardTitle>
                <p className="text-gray-300">Share your expertise and help other developers grow</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Share Knowledge",
                      description: "Help developers learn and grow their skills",
                      icon: Brain,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "Earn Income",
                      description: "Get paid for your expertise and time",
                      icon: Award,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      title: "Build Network",
                      description: "Connect with talented developers worldwide",
                      icon: Users,
                      color: "from-purple-500 to-pink-500",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Apply to Become a Mentor
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
