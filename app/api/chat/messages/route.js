import { NextResponse } from "next/server"
import { chatCache, activityCache } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")
    const limit = Number.parseInt(searchParams.get("limit")) || 50

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "Session ID is required" }, { status: 400 })
    }

    const messages = await chatCache.getMessages(sessionId, limit)
    return NextResponse.json({ success: true, messages })
  } catch (error) {
    console.error("Chat messages fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { sessionId, userId, message, sender } = await request.json()

    if (!sessionId || !message || !sender) {
      return NextResponse.json(
        { success: false, error: "Session ID, message, and sender are required" },
        { status: 400 },
      )
    }

    // Add message to cache
    const savedMessage = await chatCache.addMessage(sessionId, {
      userId,
      message,
      sender,
      type: "text",
    })

    // Log activity if userId provided
    if (userId) {
      await activityCache.logActivity(userId, {
        type: "chat",
        action: "Sent message",
        metadata: { sessionId, messageLength: message.length },
      })
    }

    // Simulate AI response if sender is user
    if (sender === "You") {
      setTimeout(async () => {
        await chatCache.addMessage(sessionId, {
          userId: "ai-mentor",
          message: "I understand your question. Let me help you with that...",
          sender: "AI Mentor",
          type: "text",
        })
      }, 1000)
    }

    return NextResponse.json({ success: true, message: savedMessage })
  } catch (error) {
    console.error("Chat message send error:", error)
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
  }
}
