import { NextResponse } from "next/server"
import { userSession } from "@/lib/redis"

export async function POST(request) {
  try {
    const { userId, action, userData } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ success: false, error: "User ID and action are required" }, { status: 400 })
    }

    if (action === "online") {
      await userSession.setOnline(userId, userData || {})
    } else if (action === "offline") {
      await userSession.setOffline(userId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Session management error:", error)
    return NextResponse.json({ success: false, error: "Failed to manage session" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (userId) {
      const isOnline = await userSession.isUserOnline(userId)
      return NextResponse.json({ success: true, isOnline })
    } else {
      const onlineUsers = await userSession.getOnlineUsers()
      return NextResponse.json({ success: true, onlineUsers })
    }
  } catch (error) {
    console.error("Session fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch session data" }, { status: 500 })
  }
}
