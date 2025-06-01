import { NextResponse } from "next/server"
import { codeCache, activityCache, statsCache } from "@/lib/redis"

export async function POST(request) {
  try {
    const { userId, code, language } = await request.json()

    if (!code || !language) {
      return NextResponse.json({ success: false, error: "Code and language are required" }, { status: 400 })
    }

    // Generate hash for the code
    const codeHash = await codeCache.generateCodeHash(code)

    // Check if analysis is cached
    let analysis = await codeCache.getAnalysis(codeHash)

    if (!analysis) {
      // Simulate AI analysis (in real app, call actual AI service)
      analysis = {
        codeHash,
        language,
        suggestions: [
          {
            type: "optimization",
            severity: "medium",
            line: 2,
            title: "Performance Optimization",
            description: "Consider using memoization to improve performance",
            suggestion: "Use dynamic programming approach to reduce time complexity",
          },
          {
            type: "style",
            severity: "low",
            line: 1,
            title: "Code Style",
            description: "Add function documentation for better readability",
            suggestion: "Add JSDoc comments to describe function parameters and return values",
          },
        ],
        metrics: {
          complexity: 3,
          maintainability: 85,
          performance: 78,
          security: 92,
          qualityScore: 85,
        },
        analyzedAt: Date.now(),
      }

      // Cache the analysis
      await codeCache.setAnalysis(codeHash, analysis)
    }

    // Log activity if userId provided
    if (userId) {
      await activityCache.logActivity(userId, {
        type: "code_analysis",
        action: "Analyzed code",
        metadata: {
          language,
          codeHash,
          qualityScore: analysis.metrics.qualityScore,
        },
      })

      // Update code review stats
      await statsCache.incrementCodeReviews(userId)
    }

    return NextResponse.json({ success: true, analysis })
  } catch (error) {
    console.error("Code analysis error:", error)
    return NextResponse.json({ success: false, error: "Failed to analyze code" }, { status: 500 })
  }
}
