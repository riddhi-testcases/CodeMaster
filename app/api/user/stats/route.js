import { NextResponse } from "next/server"
import { statsCache, leaderboard } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "demo-user"

    // Try to get from cache first
    let stats = await statsCache.getStats(userId)

    if (!stats) {
      // If not in cache, create demo stats
      stats = {
        learningHours: 127.5,
        coursesCompleted: 12,
        codeReviews: 89,
        mentoringSessions: 23,
        skillsImproved: 8,
        goalsAchieved: 5,
        currentStreak: 23,
        longestStreak: 45,
        totalActiveDays: 156,
        codeQualityScore: 92,
        globalRank: 342,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      // Cache the stats
      await statsCache.setStats(userId, stats)

      // Update leaderboard
      await leaderboard.updateUserScore(userId, stats.codeQualityScore, {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      })
    }

    return NextResponse.json({ success: true, stats })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { userId, statName, increment } = await request.json()

    if (!userId || !statName) {
      return NextResponse.json({ success: false, error: "User ID and stat name are required" }, { status: 400 })
    }

    // Update stat in cache
    const updatedStats = await statsCache.incrementStat(userId, statName, increment)

    // Update leaderboard if it's a score-related stat
    if (statName === "codeQualityScore") {
      await leaderboard.updateUserScore(userId, updatedStats[statName], {
        name: "John Doe", // In real app, get from profile
        avatar: "/placeholder.svg?height=40&width=40",
      })
    }

    return NextResponse.json({ success: true, stats: updatedStats })
  } catch (error) {
    console.error("Stats update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update stats" }, { status: 500 })
  }
}
