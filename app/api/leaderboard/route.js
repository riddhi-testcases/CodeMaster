import { NextResponse } from "next/server"
import { leaderboard } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const userId = searchParams.get("userId")

    const topUsers = await leaderboard.getTopUsers(limit)

    let userRank = null
    if (userId) {
      userRank = await leaderboard.getUserRank(userId)
    }

    return NextResponse.json({
      success: true,
      leaderboard: topUsers,
      userRank,
    })
  } catch (error) {
    console.error("Leaderboard fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
