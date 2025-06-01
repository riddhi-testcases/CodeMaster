"use client"

import { useState, useEffect } from "react"

export function useUserProfile(userId = "demo-user") {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [userId])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/user/profile?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setProfile(data.profile)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch profile")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, updates }),
      })

      const data = await response.json()
      if (data.success) {
        setProfile(data.profile)
        return data.profile
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { profile, loading, error, updateProfile, refetch: fetchProfile }
}

export function useUserStats(userId = "demo-user") {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [userId])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/user/stats?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch stats")
    } finally {
      setLoading(false)
    }
  }

  const incrementStat = async (statName, increment = 1) => {
    try {
      const response = await fetch("/api/user/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, statName, increment }),
      })

      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
        return data.stats
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { stats, loading, error, incrementStat, refetch: fetchStats }
}

export function useNotifications(userId = "demo-user") {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNotifications()
  }, [userId])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/notifications?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch notifications")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, notificationId }),
      })

      if (response.ok) {
        await fetchNotifications()
      }
    } catch (err) {
      setError("Failed to mark notification as read")
    }
  }

  return { notifications, unreadCount, loading, error, markAsRead, refetch: fetchNotifications }
}

export function useRealtimeChat(sessionId) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (sessionId) {
      fetchMessages()
    }
  }, [sessionId])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/chat/messages?sessionId=${sessionId}`)
      const data = await response.json()

      if (data.success) {
        setMessages(data.messages)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch messages")
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (message, sender, userId) => {
    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, userId, message, sender }),
      })

      const data = await response.json()
      if (data.success) {
        await fetchMessages() // Refresh messages
        return data.message
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { messages, loading, error, sendMessage, refetch: fetchMessages }
}

export function useCodeAnalysis() {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeCode = async (code, language, userId) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/code/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code, language }),
      })

      const data = await response.json()
      if (data.success) {
        setAnalysis(data.analysis)
        return data.analysis
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { analysis, loading, error, analyzeCode }
}
