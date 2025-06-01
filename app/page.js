"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Code2,
  Sparkles,
  Play,
  Brain,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Globe,
  BookOpen,
  Target,
  Rocket,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Navbar from "@/components/Navbar"

const features = [
  {
    icon: Code2,
    title: "Professional IDE Experience",
    description: "Monaco Editor with full IntelliSense, syntax highlighting, and debugging support for 12+ languages.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Real-time Code Execution",
    description: "Instant compilation and execution with live output streaming and performance monitoring.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Intelligent code review, optimization suggestions, and automated bug detection.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Real-time collaboration, peer mentoring, and interactive learning paths.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Secure Sandbox",
    description: "Isolated execution environment with enterprise-grade security and resource management.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "JavaScript, Python, Java, C++, TypeScript, Go, Rust, and more with intelligent templates.",
    color: "from-teal-500 to-blue-500",
  },
]

const languages = [
  { name: "JavaScript", icon: "🟨", users: "2.1M+" },
  { name: "Python", icon: "🐍", users: "1.8M+" },
  { name: "Java", icon: "☕", users: "1.2M+" },
  { name: "C++", icon: "⚡", users: "890K+" },
  { name: "TypeScript", icon: "🔷", users: "750K+" },
  { name: "Go", icon: "🐹", users: "420K+" },
  { name: "Rust", icon: "🦀", users: "380K+" },
  { name: "PHP", icon: "🐘", users: "650K+" },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "👩‍💻",
    content: "CodeMaster AI transformed how I learn new languages. The AI feedback is incredibly accurate and helpful.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "CS Student at MIT",
    avatar: "👨‍🎓",
    content: "Best coding platform I've used. The real-time collaboration features are game-changing for study groups.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Full-Stack Developer",
    avatar: "👩‍🔬",
    content: "The Monaco integration is flawless. Feels exactly like VS Code but with powerful AI assistance built-in.",
    rating: 5,
  },
]

const stats = [
  { label: "Active Developers", value: "500K+", icon: Users },
  { label: "Code Executions", value: "10M+", icon: Play },
  { label: "Languages Supported", value: "12+", icon: Code2 },
  { label: "Success Rate", value: "99.9%", icon: CheckCircle },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced AI Technology
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Code Smarter with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Intelligence
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional IDE experience with real-time code execution, intelligent analysis, and collaborative
              learning. Master programming with the most advanced code editor platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Coding Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/learning">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Learning Paths
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Code Like a Pro
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade tools and AI-powered features designed to accelerate your coding journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Support for{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Every Language
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From web development to systems programming, we support all major programming languages with intelligent
              templates and optimizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{lang.icon}</div>
                <h3 className="text-white font-semibold mb-2">{lang.name}</h3>
                <p className="text-gray-400 text-sm">{lang.users} developers</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Developers
              </span>{" "}
              Worldwide
            </h2>
          </motion.div>

          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-300 mb-6 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                {testimonials[currentTestimonial].avatar}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-blue-500" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Coding?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of developers who are already coding smarter with CodeMaster AI. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/learning">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Target className="w-5 h-5 mr-2" />
                  View Learning Paths
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CodeMaster AI</span>
              </div>
              <p className="text-gray-400">
                The most advanced AI-powered code editor and learning platform for modern developers.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <Link href="/editor" className="block text-gray-400 hover:text-white transition-colors">
                  Code Editor
                </Link>
                <Link href="/learning" className="block text-gray-400 hover:text-white transition-colors">
                  Learning Paths
                </Link>
                <Link href="/mentorship" className="block text-gray-400 hover:text-white transition-colors">
                  Mentorship
                </Link>
                <Link href="/analytics" className="block text-gray-400 hover:text-white transition-colors">
                  Analytics
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  API Reference
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Tutorials
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Community
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodeMaster AI. All rights reserved. Built with ❤️ for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
