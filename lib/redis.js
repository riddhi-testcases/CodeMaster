import { Redis } from "@upstash/redis"

// Initialize Upstash Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// Cache keys
export const CACHE_KEYS = {
  USER_PROFILE: (userId) => `user:profile:${userId}`,
  USER_STATS: (userId) => `user:stats:${userId}`,
  USER_ACTIVITY: (userId) => `user:activity:${userId}`,
  LEARNING_PROGRESS: (userId) => `learning:progress:${userId}`,
  MENTORSHIP_SESSIONS: (userId) => `mentorship:sessions:${userId}`,
  CODE_ANALYSIS: (codeHash) => `code:analysis:${codeHash}`,
  LEADERBOARD: "global:leaderboard",
  ONLINE_USERS: "users:online",
  CHAT_MESSAGES: (sessionId) => `chat:messages:${sessionId}`,
  NOTIFICATIONS: (userId) => `notifications:${userId}`,
}

// Cache TTL (Time To Live) in seconds
export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
}

// User session management
export const userSession = {
  async setOnline(userId, userData) {
    const key = CACHE_KEYS.ONLINE_USERS
    await redis.hset(key, { [userId]: JSON.stringify({ ...userData, lastSeen: Date.now() }) })
    await redis.expire(key, CACHE_TTL.MEDIUM)
  },

  async setOffline(userId) {
    await redis.hdel(CACHE_KEYS.ONLINE_USERS, userId)
  },

  async getOnlineUsers() {
    const users = await redis.hgetall(CACHE_KEYS.ONLINE_USERS)
    return Object.entries(users || {}).map(([userId, data]) => ({
      userId,
      ...JSON.parse(data),
    }))
  },

  async isUserOnline(userId) {
    const user = await redis.hget(CACHE_KEYS.ONLINE_USERS, userId)
    return !!user
  },
}

// User profile caching
export const userCache = {
  async setProfile(userId, profile) {
    await redis.setex(CACHE_KEYS.USER_PROFILE(userId), CACHE_TTL.LONG, JSON.stringify(profile))
  },

  async getProfile(userId) {
    const profile = await redis.get(CACHE_KEYS.USER_PROFILE(userId))
    return profile ? JSON.parse(profile) : null
  },

  async updateProfile(userId, updates) {
    const existing = await this.getProfile(userId)
    if (existing) {
      const updated = { ...existing, ...updates, updatedAt: Date.now() }
      await this.setProfile(userId, updated)
      return updated
    }
    return null
  },

  async deleteProfile(userId) {
    await redis.del(CACHE_KEYS.USER_PROFILE(userId))
  },
}

// User statistics caching
export const statsCache = {
  async setStats(userId, stats) {
    await redis.setex(CACHE_KEYS.USER_STATS(userId), CACHE_TTL.MEDIUM, JSON.stringify(stats))
  },

  async getStats(userId) {
    const stats = await redis.get(CACHE_KEYS.USER_STATS(userId))
    return stats ? JSON.parse(stats) : null
  },

  async incrementStat(userId, statName, increment = 1) {
    const stats = (await this.getStats(userId)) || {}
    stats[statName] = (stats[statName] || 0) + increment
    stats.updatedAt = Date.now()
    await this.setStats(userId, stats)
    return stats
  },

  async updateLearningHours(userId, hours) {
    return await this.incrementStat(userId, "learningHours", hours)
  },

  async incrementCoursesCompleted(userId) {
    return await this.incrementStat(userId, "coursesCompleted", 1)
  },

  async incrementCodeReviews(userId) {
    return await this.incrementStat(userId, "codeReviews", 1)
  },
}

// Learning progress caching
export const learningCache = {
  async setProgress(userId, courseId, progress) {
    const key = `${CACHE_KEYS.LEARNING_PROGRESS(userId)}:${courseId}`
    await redis.setex(key, CACHE_TTL.LONG, JSON.stringify(progress))
  },

  async getProgress(userId, courseId) {
    const key = `${CACHE_KEYS.LEARNING_PROGRESS(userId)}:${courseId}`
    const progress = await redis.get(key)
    return progress ? JSON.parse(progress) : null
  },

  async getAllProgress(userId) {
    const pattern = `${CACHE_KEYS.LEARNING_PROGRESS(userId)}:*`
    const keys = await redis.keys(pattern)
    const progressData = {}

    for (const key of keys) {
      const courseId = key.split(":").pop()
      const progress = await redis.get(key)
      if (progress) {
        progressData[courseId] = JSON.parse(progress)
      }
    }

    return progressData
  },

  async updateLessonProgress(userId, courseId, lessonId, completed = true) {
    const progress = (await this.getProgress(userId, courseId)) || {
      completedLessons: [],
      totalLessons: 0,
      percentage: 0,
    }

    if (completed && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId)
      progress.percentage = Math.round((progress.completedLessons.length / progress.totalLessons) * 100)
      progress.updatedAt = Date.now()

      await this.setProgress(userId, courseId, progress)

      // Update user stats
      await statsCache.updateLearningHours(userId, 0.5) // Assume 30 min per lesson
    }

    return progress
  },
}

// Code analysis caching
export const codeCache = {
  async setAnalysis(codeHash, analysis) {
    await redis.setex(CACHE_KEYS.CODE_ANALYSIS(codeHash), CACHE_TTL.DAY, JSON.stringify(analysis))
  },

  async getAnalysis(codeHash) {
    const analysis = await redis.get(CACHE_KEYS.CODE_ANALYSIS(codeHash))
    return analysis ? JSON.parse(analysis) : null
  },

  async generateCodeHash(code) {
    // Simple hash function for demo - in production use crypto
    let hash = 0
    for (let i = 0; i < code.length; i++) {
      const char = code.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  },
}

// Real-time chat caching
export const chatCache = {
  async addMessage(sessionId, message) {
    const key = CACHE_KEYS.CHAT_MESSAGES(sessionId)
    const messageWithTimestamp = {
      ...message,
      timestamp: Date.now(),
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    await redis.lpush(key, JSON.stringify(messageWithTimestamp))
    await redis.ltrim(key, 0, 99) // Keep only last 100 messages
    await redis.expire(key, CACHE_TTL.DAY)

    return messageWithTimestamp
  },

  async getMessages(sessionId, limit = 50) {
    const key = CACHE_KEYS.CHAT_MESSAGES(sessionId)
    const messages = await redis.lrange(key, 0, limit - 1)
    return messages.map((msg) => JSON.parse(msg)).reverse()
  },

  async clearMessages(sessionId) {
    await redis.del(CACHE_KEYS.CHAT_MESSAGES(sessionId))
  },
}

// Global leaderboard
export const leaderboard = {
  async updateUserScore(userId, score, userData) {
    await redis.zadd(CACHE_KEYS.LEADERBOARD, { score, member: JSON.stringify({ userId, ...userData }) })
  },

  async getTopUsers(limit = 10) {
    const results = await redis.zrange(CACHE_KEYS.LEADERBOARD, 0, limit - 1, { rev: true, withScores: true })
    return results.map(({ member, score }) => ({
      ...JSON.parse(member),
      score,
    }))
  },

  async getUserRank(userId) {
    const rank = await redis.zrevrank(CACHE_KEYS.LEADERBOARD, userId)
    return rank !== null ? rank + 1 : null
  },
}

// Notifications
export const notifications = {
  async addNotification(userId, notification) {
    const key = CACHE_KEYS.NOTIFICATIONS(userId)
    const notificationWithId = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      read: false,
    }

    await redis.lpush(key, JSON.stringify(notificationWithId))
    await redis.ltrim(key, 0, 49) // Keep only last 50 notifications
    await redis.expire(key, CACHE_TTL.DAY * 7) // Keep for 7 days

    return notificationWithId
  },

  async getNotifications(userId, limit = 20) {
    const key = CACHE_KEYS.NOTIFICATIONS(userId)
    const notifications = await redis.lrange(key, 0, limit - 1)
    return notifications.map((notif) => JSON.parse(notif))
  },

  async markAsRead(userId, notificationId) {
    const notifications = await this.getNotifications(userId)
    const updated = notifications.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif))

    // Clear and repopulate
    const key = CACHE_KEYS.NOTIFICATIONS(userId)
    await redis.del(key)
    for (const notif of updated.reverse()) {
      await redis.lpush(key, JSON.stringify(notif))
    }
    await redis.expire(key, CACHE_TTL.DAY * 7)
  },

  async getUnreadCount(userId) {
    const notifications = await this.getNotifications(userId)
    return notifications.filter((notif) => !notif.read).length
  },
}

// Activity tracking
export const activityCache = {
  async logActivity(userId, activity) {
    const key = CACHE_KEYS.USER_ACTIVITY(userId)
    const activityWithTimestamp = {
      ...activity,
      timestamp: Date.now(),
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    await redis.lpush(key, JSON.stringify(activityWithTimestamp))
    await redis.ltrim(key, 0, 99) // Keep only last 100 activities
    await redis.expire(key, CACHE_TTL.DAY * 30) // Keep for 30 days

    return activityWithTimestamp
  },

  async getRecentActivity(userId, limit = 20) {
    const key = CACHE_KEYS.USER_ACTIVITY(userId)
    const activities = await redis.lrange(key, 0, limit - 1)
    return activities.map((activity) => JSON.parse(activity))
  },

  async getActivityByType(userId, type, limit = 10) {
    const activities = await this.getRecentActivity(userId, 100)
    return activities.filter((activity) => activity.type === type).slice(0, limit)
  },
}

// Utility functions
export const cacheUtils = {
  async clearUserCache(userId) {
    const keys = [
      CACHE_KEYS.USER_PROFILE(userId),
      CACHE_KEYS.USER_STATS(userId),
      CACHE_KEYS.USER_ACTIVITY(userId),
      CACHE_KEYS.NOTIFICATIONS(userId),
    ]

    await Promise.all(keys.map((key) => redis.del(key)))
    await redis.hdel(CACHE_KEYS.ONLINE_USERS, userId)
  },

  async getServerStats() {
    const info = await redis.info()
    return {
      connectedClients: await redis.dbsize(),
      memoryUsage: info,
      uptime: Date.now(),
    }
  },

  async healthCheck() {
    try {
      await redis.ping()
      return { status: "healthy", timestamp: Date.now() }
    } catch (error) {
      return { status: "unhealthy", error: error.message, timestamp: Date.now() }
    }
  },
}
