import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import type { NextRequest } from "next/server"
import { getNews, CATEGORIES, type NewsItem } from "@/lib/news"

export const dynamic = "force-dynamic"

// Unmistakably punchy Gen-Z headline transformer
function localGenZTitle(title: string): string {
  let t = title.trim()

  // 1. Direct financial action replacements
  t = t
    .replace(/^SEBI approves|^Sebi approves/i, "SEBI Just Greenlit")
    .replace(/^RBI slaps|^RBI imposes/i, "RBI Slaps Big Fine On")
    .replace(/Sensex slides|Sensex falls|Sensex drops|Nifty tumbles|Nifty slides|Nifty falls|Markets tumble|Markets fall/gi, "Markets Take a Hit")
    .replace(/Sensex rises|Sensex gains|Sensex surges|Nifty rallies|Nifty jumps|Markets rally|Markets surge/gi, "Markets Pop Off")
    .replace(/shares rise|shares surge|stock surges|stocks climb|shares gain/gi, "shares pop")
    .replace(/shares fall|shares slump|shares tumble|stock drops|shares decline|shares slide/gi, "shares dip hard")
    .replace(/record high|all-time peak/gi, "all-time high")
    .replace(/amid concerns over|amid worries over/gi, "as panic grows over")
    .replace(/according to reports|according to sources|sources say/gi, "per sources")
    .replace(/significant growth|massive growth/gi, "insane growth")
    .replace(/strategic partnership|enters into agreement with/gi, "huge collab with")
    .replace(/acquisition of/gi, "snapping up")
    .replace(/quarterly profit|net profit rises/gi, "Q-earnings cook")
    .replace(/net profit falls|profit drops/gi, "Q-earnings miss")
    .replace(/layoffs at|cuts workforce at/gi, "slashes jobs at")
    .replace(/slams|criticises|condemns/gi, "calls out")
    .replace(/is flat on debut|trades flat on debut/gi, "vibes flat on listing day")
    .replace(/gains on debut|surges on debut/gi, "debuts with a massive pop")
    .replace(/surges after/gi, "pops hard after")
    .replace(/rallies after/gi, "runs up after")
    .replace(/loss narrows to/gi, "trims losses to")
    .replace(/securing supply contract/gi, "bagging a massive deal")
    .trim()

  // 2. If the headline was not altered by specific regex, inject a punchy Gen-Z market hook
  if (t === title.trim()) {
    if (/shares|stocks|bse|nse|ipo/i.test(t)) {
      t = `Market Watch: ${t}`
    } else if (/profit|revenue|loss|earnings|crore|million|billion/i.test(t)) {
      t = `Money Moves: ${t}`
    } else if (/rbi|sebi|govt|tax|policy/i.test(t)) {
      t = `Policy Check: ${t}`
    } else {
      t = `Breaking: ${t}`
    }
  }

  return t
}

// Engaging, punchy Gen-Z quick overview summarizer
function localGenZSummary(rawSummary: string, title: string): string {
  // Clean raw HTML artifacts
  const cleaned = (rawSummary || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/Also Read:.*$/i, "")
    .replace(/Read more at:.*$/i, "")
    .replace(/Click here to.*$/i, "")
    .replace(/\s+/g, " ")
    .trim()

  let body = ""
  if (cleaned.length >= 25) {
    const sentences = cleaned.split(/(?<=[.?!])\s+/).filter(Boolean)
    body = sentences.slice(0, 2).join(" ")
  } else {
    body = `Big developments unfolding around ${title.slice(0, 60)}.`
  }

  if (body.length > 200) {
    body = body.slice(0, 197).trim() + "..."
  }

  // Prepend an engaging conversational hook
  return `The lowdown: ${body}`
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

