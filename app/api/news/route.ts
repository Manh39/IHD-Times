import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import type { NextRequest } from "next/server"
import { getNews, CATEGORIES, type NewsItem } from "@/lib/news"

export const dynamic = "force-dynamic"

// Smart rule-based Gen-Z headline transformer
function localGenZTitle(title: string): string {
  let t = title
    .replace(/^SEBI approves|^Sebi approves/i, "SEBI Just Greenlit")
    .replace(/^RBI slaps|^RBI imposes/i, "RBI Drops Penalty On")
    .replace(/Sensex slides|Sensex falls|Sensex drops|Nifty tumbles|Nifty slides|Nifty falls|Markets tumble|Markets fall/gi, "Markets Take a Hit")
    .replace(/Sensex rises|Sensex gains|Sensex surges|Nifty rallies|Nifty jumps|Markets rally|Markets surge/gi, "Markets Pop Big")
    .replace(/shares rise|shares surge|stock surges|stocks climb|shares gain/gi, "shares pop")
    .replace(/shares fall|shares slump|shares tumble|stock drops|shares decline|shares slide/gi, "shares dip")
    .replace(/record high|all-time peak/gi, "all-time high")
    .replace(/amid concerns over|amid worries over/gi, "over")
    .replace(/according to reports|according to sources|sources say/gi, "per sources")
    .replace(/significant growth|massive growth/gi, "solid gains")
    .replace(/strategic partnership|enters into agreement with/gi, "big collab with")
    .replace(/acquisition of/gi, "buying")
    .replace(/quarterly profit|net profit rises/gi, "Q-earnings pop")
    .replace(/net profit falls|profit drops/gi, "Q-earnings miss")
    .replace(/layoffs at|cuts workforce at/gi, "cuts jobs at")
    .replace(/slams|criticises|condemns/gi, "calls out")
    .trim()

  return t
}

// Smart rule-based Gen-Z quick overview summarizer
function localGenZSummary(rawSummary: string, title: string): string {
  if (!rawSummary || rawSummary.length < 20) {
    return `Quick take: Things are moving fast around ${title.slice(0, 50)}. Check the full story at the original source.`
  }

  // Clean and split into sentences
  const cleaned = rawSummary
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/Also Read:.*$/i, "")
    .replace(/Read more at:.*$/i, "")
    .replace(/Click here to.*$/i, "")
    .trim()

  const sentences = cleaned.split(/(?<=[.?!])\s+/).filter(Boolean)
  let quickSummary = sentences.slice(0, 2).join(" ")

  if (quickSummary.length > 220) {
    quickSummary = quickSummary.slice(0, 217).trim() + "..."
  }

  return quickSummary
}

async function rewriteNewsBatch(items: NewsItem[]): Promise<NewsItem[]> {
  if (!items.length) return items

  // Check if Gemini API key exists in environment
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (apiKey) {
    try {
      const google = createGoogleGenerativeAI({ apiKey })
      const prompt = `You are a financial editor writing for Gen Z. 
Rewrite the headline and provide a punchy 2-sentence quick overview for each article below.
Preserve all company names, numbers, ticker symbols, and facts accurately. Do not invent any facts.
Output ONLY a strict JSON array where each element has:
{
  "id": number (1 to ${items.length}),
  "headline": "punchy concise gen-z style headline",
  "overview": "1-2 sentence quick overview explaining what happened and why it matters"
}

Articles:
${items.map((it, idx) => `${idx + 1}. Title: ${it.title}\nContext: ${it.summary || it.title}`).join("\n\n")}`

      const { text } = await generateText({
        model: google("gemini-2.5-flash"),
        prompt,
        maxOutputTokens: 3000,
      })

      const cleanedJson = text.replace(/```json|```/gi, "").trim()
      const parsed = JSON.parse(cleanedJson) as Array<{ id: number; headline: string; overview: string }>
      const map = new Map(parsed.map((p) => [p.id, p]))

      return items.map((item, idx) => {
        const ai = map.get(idx + 1)
        return {
          ...item,
          displayTitle: ai?.headline || localGenZTitle(item.title),
          summary: ai?.overview || localGenZSummary(item.summary, item.title),
        }
      })
    } catch {
      // Graceful fallback if API quota or connection issue occurs
    }
  }

  // Fast, reliable local transformation fallback
  return items.map((item) => ({
    ...item,
    displayTitle: localGenZTitle(item.title),
    summary: localGenZSummary(item.summary, item.title),
  }))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category") ?? "all"
  const refresh = searchParams.get("refresh") === "1"
  const valid = CATEGORIES.some((c) => c.id === category)
  const categoryId = valid ? category : "all"

  const items = await getNews(categoryId, refresh)
  const personalized = await rewriteNewsBatch(items)

  return Response.json(
    {
      category: categoryId,
      updatedAt: new Date().toISOString(),
      count: personalized.length,
      items: personalized,
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  )
}

