import { NextResponse } from "next/server"
import { userCache, activityCache, notifications } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "demo-user"

    // Try to get from cache first
    let profile = await userCache.getProfile(userId)

    if (!profile) {
      // If not in cache, create demo profile
      profile = {
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe_dev",
        bio: "Full-stack developer passionate about creating innovative solutions. Love learning new technologies and helping others grow.",
        location: "San Francisco, CA",
        joinDate: "January 2023",
        avatar: "/placeholder.svg?height=120&width=120",
        website: "https://johndoe.dev",
        github: "johndoe",
        linkedin: "johndoe",
        twitter: "johndoe_dev",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      // Cache the profile
      await userCache.setProfile(userId, profile)
    }

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { userId, updates } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    // Update profile in cache
    const updatedProfile = await userCache.updateProfile(userId, updates)

    if (!updatedProfile) {
      return NextResponse.json({ success: false, error: "Profile not found" }, { status: 404 })
    }

    // Log activity
    await activityCache.logActivity(userId, {
      type: "profile_update",
      action: "Updated profile information",
      metadata: { updatedFields: Object.keys(updates) },
    })

    // Send notification
    await notifications.addNotification(userId, {
      type: "info",
      title: "Profile Updated",
      message: "Your profile has been successfully updated.",
      icon: "user",
    })

    return NextResponse.json({ success: true, profile: updatedProfile })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 })
  }
}
