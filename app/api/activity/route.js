import { NextResponse } from "next/server"
import { activityCache } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "demo-user"
    const type = searchParams.get("type")
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    let activities
    if (type) {
      activities = await activityCache.getActivityByType(userId, type, limit)
    } else {
      activities = await activityCache.getRecentActivity(userId, limit)
    }

    return NextResponse.json({ success: true, activities })
  } catch (error) {
    console.error("Activity fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { userId, activity } = await request.json()

    if (!userId || !activity) {
      return NextResponse.json({ success: false, error: "User ID and activity are required" }, { status: 400 })
    }

    const savedActivity = await activityCache.logActivity(userId, activity)
    return NextResponse.json({ success: true, activity: savedActivity })
  } catch (error) {
    console.error("Activity logging error:", error)
    return NextResponse.json({ success: false, error: "Failed to log activity" }, { status: 500 })
  }
}
