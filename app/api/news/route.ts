import { gateway } from "@ai-sdk/gateway"
import { generateText } from "ai"
import type { NextRequest } from "next/server"
import { getNews, CATEGORIES, type NewsItem } from "@/lib/news"

export const dynamic = "force-dynamic"

function localGenZRewrite(title: string): string {
  return title
    .replace(/^Sebi approves/i, "SEBI just cleared")
    .replace(/^India's? /i, "India’s ")
    .replace(/according to/gi, "per")
    .replace(/amid concerns over/gi, "as")
    .replace(/shares rise/gi, "stock pops")
    .replace(/shares fall|shares drop/gi, "stock dips")
    .replace(/significant/gi, "major")
    .trim()
}

async function rewriteHeadlines(items: NewsItem[]): Promise<NewsItem[]> {
  if (!items.length) return items
  try {
    const prompt = `Rewrite each financial headline in a punchy, concise Gen Z tone. Preserve every fact, name, number, and meaning. Do not invent details. Return exactly one rewritten headline per line in the same order, with no bullets or numbering.\n\n${items.map((item, index) => `${index + 1}. ${item.title}`).join("\n")}`
    const { text } = await generateText({ model: gateway("google/gemini-2.5-flash-lite"), prompt, maxOutputTokens: 2048 })
    const rewritten = text.split("\n").map((line) => line.replace(/^\s*\d+[.)]\s*/, "").trim()).filter(Boolean)
    return items.map((item, index) => ({ ...item, displayTitle: rewritten[index] || item.title }))
  } catch {
    return items.map((item) => ({ ...item, displayTitle: localGenZRewrite(item.title) }))
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category") ?? "all"
  const refresh = searchParams.get("refresh") === "1"
  const valid = CATEGORIES.some((c) => c.id === category)
  const categoryId = valid ? category : "all"
  const items = await getNews(categoryId, refresh)
  const personalized = await rewriteHeadlines(items)
  return Response.json({ category: categoryId, updatedAt: new Date().toISOString(), count: personalized.length, items: personalized }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } })
}
