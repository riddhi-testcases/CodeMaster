import { NextResponse } from "next/server"
import { learningCache, activityCache, notifications, statsCache } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "demo-user"
    const courseId = searchParams.get("courseId")

    if (courseId) {
      // Get specific course progress
      const progress = await learningCache.getProgress(userId, courseId)
      return NextResponse.json({ success: true, progress })
    } else {
      // Get all progress
      const allProgress = await learningCache.getAllProgress(userId)
      return NextResponse.json({ success: true, progress: allProgress })
    }
  } catch (error) {
    console.error("Learning progress fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch learning progress" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { userId, courseId, lessonId, completed } = await request.json()

    if (!userId || !courseId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "User ID, course ID, and lesson ID are required" },
        { status: 400 },
      )
    }

    // Update lesson progress
    const progress = await learningCache.updateLessonProgress(userId, courseId, lessonId, completed)

    // Log activity
    await activityCache.logActivity(userId, {
      type: "learning",
      action: completed ? "Completed lesson" : "Started lesson",
      metadata: { courseId, lessonId, progress: progress.percentage },
    })

    // Check if course is completed
    if (progress.percentage === 100) {
      await statsCache.incrementCoursesCompleted(userId)

      await notifications.addNotification(userId, {
        type: "success",
        title: "Course Completed!",
        message: `Congratulations! You've completed the course.`,
        icon: "award",
      })

      await activityCache.logActivity(userId, {
        type: "achievement",
        action: "Completed course",
        metadata: { courseId },
      })
    }

    return NextResponse.json({ success: true, progress })
  } catch (error) {
    console.error("Learning progress update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update learning progress" }, { status: 500 })
  }
}
