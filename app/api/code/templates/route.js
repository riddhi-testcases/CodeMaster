import { NextResponse } from "next/server"
import { getTemplate, getAvailableTemplates } from "@/lib/codeTemplates"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language")
    const type = searchParams.get("type") || "basic"

    if (!language) {
      return NextResponse.json({ success: false, error: "Language parameter is required" }, { status: 400 })
    }

    if (type === "list") {
      const templates = getAvailableTemplates(language)
      return NextResponse.json({
        success: true,
        templates,
      })
    }

    const template = getTemplate(language, type)
    if (!template) {
      return NextResponse.json({ success: false, error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      template,
      language,
      type,
    })
  } catch (error) {
    console.error("Template fetch error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
