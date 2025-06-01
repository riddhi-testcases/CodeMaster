import { NextResponse } from "next/server"
import { notifications } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "demo-user"
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    const userNotifications = await notifications.getNotifications(userId, limit)
    const unreadCount = await notifications.getUnreadCount(userId)

    return NextResponse.json({
      success: true,
      notifications: userNotifications,
      unreadCount,
    })
  } catch (error) {
    console.error("Notifications fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { userId, notification } = await request.json()

    if (!userId || !notification) {
      return NextResponse.json({ success: false, error: "User ID and notification are required" }, { status: 400 })
    }

    const savedNotification = await notifications.addNotification(userId, notification)
    return NextResponse.json({ success: true, notification: savedNotification })
  } catch (error) {
    console.error("Notification creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { userId, notificationId } = await request.json()

    if (!userId || !notificationId) {
      return NextResponse.json({ success: false, error: "User ID and notification ID are required" }, { status: 400 })
    }

    await notifications.markAsRead(userId, notificationId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Notification update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update notification" }, { status: 500 })
  }
}
