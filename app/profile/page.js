"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Camera,
  Edit3,
  Save,
  X,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Calendar,
  Award,
  Code2,
  Trophy,
  Target,
  BookOpen,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"

const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe_dev",
  bio: "Full-stack developer passionate about creating innovative solutions. Love learning new technologies and helping others grow.",
  location: "San Francisco, CA",
  joinDate: "January 2023",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=200&width=800",
  website: "https://johndoe.dev",
  github: "johndoe",
  linkedin: "johndoe",
  twitter: "johndoe_dev",
}

const userStats = [
  { label: "Learning Hours", value: "127", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
  { label: "Courses Completed", value: "12", icon: Award, color: "from-green-500 to-emerald-500" },
  { label: "Code Reviews", value: "89", icon: Code2, color: "from-purple-500 to-pink-500" },
  { label: "Mentoring Sessions", value: "23", icon: Users, color: "from-yellow-500 to-orange-500" },
]

const achievements = [
  { title: "Code Warrior", icon: Trophy, unlocked: true },
  { title: "Learning Streak", icon: Calendar, unlocked: true },
  { title: "Mentor Helper", icon: Users, unlocked: false },
  { title: "AI Enthusiast", icon: Zap, unlocked: false },
]

const skills = [
  { name: "JavaScript", level: 85, color: "bg-yellow-500" },
  { name: "React", level: 78, color: "bg-blue-500" },
  { name: "Node.js", level: 65, color: "bg-green-500" },
  { name: "Python", level: 45, color: "bg-purple-500" },
]

const recentActivity = [
  { action: "Completed React Hooks Course", time: "2 hours ago", type: "course" },
  { action: "Helped 3 developers in community", time: "1 day ago", type: "community" },
  { action: "Improved code quality score", time: "2 days ago", type: "achievement" },
  { action: "Started System Design path", time: "3 days ago", type: "learning" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState(userProfile)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: true,
  })

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data logic here
  }

  const handleCancel = () => {
    setIsEditing(false)
    setProfileData(userProfile)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            {isEditing && (
              <Button size="sm" className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <Camera className="w-4 h-4 mr-2" />
                Change Cover
              </Button>
            )}
          </div>

          {/* Profile Info */}
          <div className="relative -mt-16 px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white/20 backdrop-blur-sm">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="bg-white/5 border-white/20 text-white text-2xl font-bold"
                    />
                    <Input
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      className="bg-white/5 border-white/20 text-white"
                      placeholder="@username"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                    <p className="text-gray-300">@{profileData.username}</p>
                  </div>
                )}

                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {profileData.joinDate}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-lg border border-white/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/10 text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-white/10 text-white">
              <Target className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/10 text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-white/10 text-white">
              <Palette className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-300">{profileData.bio}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className={`${skill.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.title}
                          className={`text-center p-4 rounded-lg border ${achievement.unlocked ? "border-yellow-500/50 bg-yellow-500/10" : "border-white/10 bg-white/5"}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <achievement.icon
                            className={`w-8 h-8 mx-auto mb-2 ${achievement.unlocked ? "text-yellow-400" : "text-gray-400"}`}
                          />
                          <div
                            className={`text-sm font-medium ${achievement.unlocked ? "text-white" : "text-gray-400"}`}
                          >
                            {achievement.title}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userStats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                        >
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold">{stat.value}</div>
                          <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Github className="w-4 h-4 text-gray-400" />
                          <Input
                            value={profileData.github}
                            onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="GitHub username"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Linkedin className="w-4 h-4 text-gray-400" />
                          <Input
                            value={profileData.linkedin}
                            onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="LinkedIn username"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Twitter className="w-4 h-4 text-gray-400" />
                          <Input
                            value={profileData.twitter}
                            onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="Twitter username"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <a
                          href={`https://github.com/${profileData.github}`}
                          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                        <a
                          href={`https://linkedin.com/in/${profileData.linkedin}`}
                          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href={`https://twitter.com/${profileData.twitter}`}
                          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>Twitter</span>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "course"
                          ? "bg-blue-500"
                          : activity.type === "community"
                            ? "bg-green-500"
                            : activity.type === "achievement"
                              ? "bg-yellow-500"
                              : "bg-purple-500"
                      }`}
                    >
                      {activity.type === "course" && <BookOpen className="w-4 h-4 text-white" />}
                      {activity.type === "community" && <Users className="w-4 h-4 text-white" />}
                      {activity.type === "achievement" && <Award className="w-4 h-4 text-white" />}
                      {activity.type === "learning" && <Target className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{activity.action}</div>
                      <div className="text-gray-400 text-sm">{activity.time}</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Account Settings */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">Email</label>
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Location</label>
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Website</label>
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Email Notifications</div>
                      <div className="text-gray-400 text-sm">Receive updates via email</div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Push Notifications</div>
                      <div className="text-gray-400 text-sm">Receive browser notifications</div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Marketing Emails</div>
                      <div className="text-gray-400 text-sm">Receive promotional content</div>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Product Updates</div>
                      <div className="text-gray-400 text-sm">Get notified about new features</div>
                    </div>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Privacy & Security */}
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Change Password
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Download Data
                </Button>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Appearance */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">Theme</label>
                    <Select defaultValue="dark">
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="dark" className="text-white hover:bg-white/10">
                          Dark
                        </SelectItem>
                        <SelectItem value="light" className="text-white hover:bg-white/10">
                          Light
                        </SelectItem>
                        <SelectItem value="auto" className="text-white hover:bg-white/10">
                          Auto
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Accent Color</label>
                    <div className="flex space-x-2">
                      {["blue", "purple", "green", "orange", "pink"].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full bg-${color}-500 border-2 border-white/20 hover:border-white/40 transition-colors`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">Language</label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="en" className="text-white hover:bg-white/10">
                          English
                        </SelectItem>
                        <SelectItem value="es" className="text-white hover:bg-white/10">
                          Spanish
                        </SelectItem>
                        <SelectItem value="fr" className="text-white hover:bg-white/10">
                          French
                        </SelectItem>
                        <SelectItem value="de" className="text-white hover:bg-white/10">
                          German
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Timezone</label>
                    <Select defaultValue="pst">
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="pst" className="text-white hover:bg-white/10">
                          Pacific Standard Time
                        </SelectItem>
                        <SelectItem value="est" className="text-white hover:bg-white/10">
                          Eastern Standard Time
                        </SelectItem>
                        <SelectItem value="utc" className="text-white hover:bg-white/10">
                          UTC
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
