import { XMLParser } from "fast-xml-parser"

export type NewsItem = {
  id: string
  title: string
  displayTitle?: string
  link: string
  source: string
  sources?: string[] // Track all sources that covered this common story
  category: string
  summary: string
  image?: string
  pubDate: string
  pubMs: number
  importanceScore?: number
}

export type Category = {
  id: string
  label: string
}

// Category tabs shown in the UI, mapped to four premier Indian financial news sources
export const CATEGORIES: Category[] = [
  { id: "all", label: "All News" },
  { id: "markets", label: "Markets" },
  { id: "ipo", label: "IPO News" },
  { id: "economy", label: "Economy" },
  { id: "companies", label: "Companies" },
  { id: "technology", label: "Technology" },
  { id: "startups", label: "Startups & VC" },
  { id: "wealth", label: "Wealth" },
  { id: "world", label: "Global Dial" },
  { id: "mindful", label: "Mindful Activity ☕" },
]

type Feed = { url: string; source: string }

// Real financial news RSS feeds from Economic Times, Mint, Business Standard, and Moneycontrol
const FEEDS: Record<string, Feed[]> = {
  all: [
    { url: "https://economictimes.indiatimes.com/rssfeedstopstories.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/news", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/latestnews.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/latest.rss", source: "Business Standard" },
  ],
  markets: [
    { url: "https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/markets", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/marketreports.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/markets-106.rss", source: "Business Standard" },
  ],
  ipo: [
    { url: "https://economictimes.indiatimes.com/markets/ipos/fpos/rssfeeds/1977015348.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/ipo", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/ipo.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/markets-ipo-112.rss", source: "Business Standard" },
  ],
  economy: [
    { url: "https://economictimes.indiatimes.com/news/economy/rssfeeds/1373380680.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/economy", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/economy.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/economy-110.rss", source: "Business Standard" },
  ],
  companies: [
    { url: "https://economictimes.indiatimes.com/industry/rssfeeds/13352306.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/companies", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/business.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/companies-113.rss", source: "Business Standard" },
  ],
  technology: [
    { url: "https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/technology", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/technology.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/technology-108.rss", source: "Business Standard" },
  ],
  startups: [
    { url: "https://economictimes.indiatimes.com/tech/startups/rssfeeds/76054874.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/startups", source: "Mint" },
    { url: "https://www.business-standard.com/rss/startups-113.rss", source: "Business Standard" },
    { url: "https://www.moneycontrol.com/rss/business.xml", source: "Moneycontrol" },
  ],
  wealth: [
    { url: "https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/wealth", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/personalfinance.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/personal-finance-117.rss", source: "Business Standard" },
  ],
  world: [
    { url: "https://economictimes.indiatimes.com/news/international/rssfeeds/7771250.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/world", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/economy.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/international-111.rss", source: "Business Standard" },
  ],
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
})

function cleanSummary(input: string): string {
  return input
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/Also Read:.*$/i, "")
    .replace(/Read more at:.*$/i, "")
    .replace(/Click here to.*$/i, "")
    .replace(/Follow us on.*$/i, "")
    .replace(/Catch all the.*$/i, "")
    .replace(/\s+/g, " ")
    .trim()
}

function stripHtml(input: string): string {
  return cleanSummary(input)
}

function firstImage(item: Record<string, any>): string | undefined {
  const enclosure = item.enclosure
  if (enclosure) {
    const enc = Array.isArray(enclosure) ? enclosure[0] : enclosure
    const url = enc?.["@_url"]
    if (url && /^https?:\/\//.test(url)) return url
  }
  const media = item["media:content"] ?? item["media:thumbnail"]
  if (media) {
    const m = Array.isArray(media) ? media[0] : media
    const url = m?.["@_url"]
    if (url && /^https?:\/\//.test(url)) return url
  }
  const html = String(item["content:encoded"] ?? item.description ?? "")
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (match?.[1] && /^https?:\/\//.test(match[1])) return match[1]
  return undefined
}

function toText(value: unknown): string {
  if (value == null) return ""
  if (typeof value === "string") return value
  if (typeof value === "object" && "#text" in (value as any)) {
    return String((value as any)["#text"] ?? "")
  }
  return String(value)
}

async function fetchFeed(feed: Feed, category: string, noStore: boolean): Promise<NewsItem[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, text/html, */*",
        "Accept-Language": "en-US,en;q=0.9",
      },
      ...(noStore ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
    })
    clearTimeout(timeout)
    if (!res.ok) return []
    const xml = await res.text()
    const parsed = parser.parse(xml)
    const channel = parsed?.rss?.channel ?? parsed?.feed
    if (!channel) return []

    const rawItems = channel.item ?? channel.entry ?? []
    const items = Array.isArray(rawItems) ? rawItems : [rawItems]

    return items
      .map((item: Record<string, any>): NewsItem | null => {
        const title = stripHtml(toText(item.title))
        if (!title || title.length < 8) return null

        let link = ""
        if (typeof item.link === "string") link = item.link
        else if (item.link?.["@_href"]) link = item.link["@_href"]
        else if (Array.isArray(item.link)) link = item.link[0]?.["@_href"] ?? ""
        link = link || toText(item.guid)

        const rawSummary = toText(item.description ?? item.summary ?? item["content:encoded"])
        const summary = cleanSummary(rawSummary).slice(0, 350)

        const dateStr = toText(item.pubDate ?? item.published ?? item.updated ?? "")
        const pubMs = dateStr ? new Date(dateStr).getTime() : Date.now()

        return {
          id: (link || title).slice(0, 200),
          title,
          link,
          source: feed.source,
          category,
          summary,
          image: firstImage(item),
          pubDate: Number.isFinite(pubMs) ? new Date(pubMs).toISOString() : new Date().toISOString(),
          pubMs: Number.isFinite(pubMs) ? pubMs : Date.now(),
        }
      })
      .filter((x): x is NewsItem => x !== null)
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// 1. Multi-Source Deduplication & Best Jargon-Free Explanation Engine
// ---------------------------------------------------------------------------

// Common financial jargon terms to detect and downscore / clarify
const JARGON_TERMS = [
  /\bebitda\b/i,
  /\bheadwinds\b/i,
  /\btailwinds\b/i,
  /\bbottomline\b/i,
  /\btopline\b/i,
  /\bconsolidation phase\b/i,
  /\bprofit booking\b/i,
  /\btechnical charts\b/i,
  /\bfibo(nacci)? levels\b/i,
  /\brsi divergence\b/i,
  /\bopen interest\b/i,
  /\bput-call ratio\b/i,
  /\bcall writers\b/i,
  /\bdeleveraging\b/i,
  /\bsynergies\b/i,
  /\bbasis points\b/i,
]

// Demystify / replace common jargon into plain, clear English
export function clarifyJargon(text: string): string {
  return text
    .replace(/\bbottomline\b/gi, "net profit")
    .replace(/\btopline\b/gi, "total revenue")
    .replace(/\bebitda\b/gi, "operating profit")
    .replace(/\bheadwinds\b/gi, "challenges")
    .replace(/\btailwinds\b/gi, "favourable conditions")
    .replace(/\bdeleveraging\b/gi, "cutting debt")
    .replace(/\bprofit booking\b/gi, "investors cashing out profits")
    .replace(/\bbasis points\b/gi, "percentage points")
    .replace(/\b52-week high\b/gi, "1-year high")
    .replace(/\b52-week low\b/gi, "1-year low")
    .trim()
}

// Evaluate clarity & quality of an explanation (higher is clearer, less bloated, free of jargon)
function scoreExplanationQuality(title: string, summary: string): number {
  let score = 50

  const text = `${title} ${summary}`

  // Bonus for concrete numbers, percentages, and amounts (factual clarity)
  if (/₹|\$|\bcrore\b|\blakh\b|\bpercent\b|%/i.test(text)) score += 15
  if (/\b\d+(\.\d+)?\b/.test(title)) score += 10

  // Penalty for obscure financial jargon
  for (const regex of JARGON_TERMS) {
    if (regex.test(text)) score -= 8
  }

  // Penalty for clickbait phrasing
  if (/you won'?t believe|check details|what it means for you|top secret|shocking/i.test(text)) {
    score -= 30
  }

  // Optimal summary length (informative, not empty, not truncated mid-sentence)
  if (summary.length >= 60 && summary.length <= 260) {
    score += 15
  } else if (summary.length < 30) {
    score -= 15
  }

  // Bonus for complete sentences ending in punctuation
  if (/[.?!]$/.test(summary.trim())) score += 5

  return score
}

// Extract essential tokens for semantic clustering across ET, Mint, Moneycontrol, and Business Standard
function getNormalizedTokens(title: string): string[] {
  const stopWords = new Set([
    "the", "a", "an", "in", "on", "at", "for", "to", "of", "and", "or", "is", "are", "was",
    "were", "with", "by", "as", "from", "its", "it", "after", "over", "into", "shares", "stocks",
    "stock", "market", "markets", "news", "today", "india", "indian", "says", "said", "how",
    "why", "what", "here", "why", "will", "may", "can", "could", "new"
  ])

  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w))
}

// Calculate similarity ratio between two headlines
function calculateHeadlineSimilarity(tokensA: string[], tokensB: string[]): number {
  if (!tokensA.length || !tokensB.length) return 0
  const setB = new Set(tokensB)
  const intersection = tokensA.filter((t) => setB.has(t)).length
  const union = new Set([...tokensA, ...tokensB]).size
  return union === 0 ? 0 : intersection / union
}

// ---------------------------------------------------------------------------
// 2. Strict Relevancy & Importance Filtering
// ---------------------------------------------------------------------------

// Filter out noise, generic spam, horoscopes, and low-impact filler
const NOISE_FILTER_REGEX = [
  /\bhoroscope\b/i,
  /\bastrology\b/i,
  /\bzodiac\b/i,
  /\bpanchang\b/i,
  /\brashifal\b/i,
  /\bweb stories\b/i,
  /\bphoto gallery\b/i,
  /\blifestyle\b/i,
  /\bquiz\b/i,
  /\bword of the day\b/i,
  /\bcrossword\b/i,
  /\bcelebs\b/i,
  /\bbollywood\b/i,
  /\bcricket\b/i,
  /\bipl 202\d\b/i,
  /\bbest smartphones under\b/i,
  /\bhow to apply for voter\b/i,
  /\bbuy this stock for \d+% gain tomorrow\b/i,
  /\btop 5 stocks to buy today\b/i,
  /\bmultibagger stock to buy\b/i,
]

// Section-specific validation
function isRelevantToSection(item: NewsItem, categoryId: string): boolean {
  const content = `${item.title} ${item.summary}`.toLowerCase()

  // 1. Noise check
  for (const regex of NOISE_FILTER_REGEX) {
    if (regex.test(content)) return false
  }

  // 2. Category-specific relevance
  switch (categoryId) {
    case "ipo":
      return /ipo|listing|public issue|share sale|drhp|rhp|allotment|bidding|anchor book|debut|grey market|gmp|subscribed/i.test(content)
    case "economy":
      return /gdp|inflation|cpi|wpi|rbi|monetary policy|repo rate|fiscal|deficit|tax|gst|trade|exports|imports|rupee|forex|budget|treasury/i.test(content)
    case "startups":
      return /startup|startups|vc|venture capital|funding round|series [a-z]|seed round|unicorn|valuation|founder|esop|incubator|angel invest/i.test(content)
    case "technology":
      return /tech|technology|ai|artificial intelligence|semiconductor|chip|software|saas|cloud|data center|cybersecurity|telecom|5g|google|microsoft|apple|nvidia|tcs|infosys|wipro/i.test(content)
    case "wealth":
      return /mutual fund|sip|income tax|itr|fixed deposit|fd|pf|epfo|nps|pension|gold|real estate|saving|portfolio|insurance|capital gains/i.test(content)
    case "world":
      return /global|fed|federal reserve|us |china|europe|war|middle east|opec|crude|tariffs|wall street|nasdaq|dow|dollar|treasuries/i.test(content)
    case "companies":
      return /quarterly|q[1-4]|earnings|pat|revenue|profit|loss|acquisition|merger|board|ceo|cfo|order|contract|capex|dividend|plant|factory/i.test(content)
    case "markets":
      return /nifty|sensex|bse|nse|indices|stock|shares|rally|fall|tumble|slide|surge|fii|dii|bull|bear|equities|benchmark/i.test(content)
    default:
      return true
  }
}

// Compute importance score (prioritizing high-impact macro, regulatory, and corporate events)
function evaluateImportance(item: NewsItem): number {
  const content = `${item.title} ${item.summary}`.toLowerCase()
  let score = 50

  // High importance drivers
  if (/rbi|sebi|supreme court|finance ministry|central bank|federal reserve/i.test(content)) score += 25
  if (/gdp|inflation|repo rate|budget|tax slab|policy/i.test(content)) score += 20
  if (/crore|billion|million/i.test(content)) score += 15
  if (/net profit|q[1-4] results|earnings report|revenue rose|revenue fell/i.test(content)) score += 15
  if (/approved|fined|probe|investigation|fraud|hike|cut/i.test(content)) score += 15
  if (/merger|acquisition|joint venture|signs deal|wins order/i.test(content)) score += 15

  // Penalize generic opinion / speculative pieces
  if (/may see|could happen|speculates|opinion|views|analysts ponder/i.test(content)) score -= 15
  if (/tips|recommendations|stocks in focus/i.test(content)) score -= 10

  return score
}

// ---------------------------------------------------------------------------
// 3. Multi-Source Deduplication & Best-Explanation Aggregator
// ---------------------------------------------------------------------------

type StoryCluster = {
  canonical: NewsItem
  allSources: Set<string>
  candidates: NewsItem[]
}

function clusterAndSelectBestNews(rawItems: NewsItem[], categoryId: string): NewsItem[] {
  // Step 1: Filter for relevance and remove noise
  const relevantItems = rawItems
    .filter((item) => isRelevantToSection(item, categoryId))
    .map((item) => ({
      ...item,
      importanceScore: evaluateImportance(item),
    }))

  // Step 2: Cluster articles covering the exact same event
  const clusters: StoryCluster[] = []

  for (const item of relevantItems) {
    const tokens = getNormalizedTokens(item.title)
    let matchedCluster: StoryCluster | null = null

    for (const cluster of clusters) {
      const clusterTokens = getNormalizedTokens(cluster.canonical.title)
      const similarity = calculateHeadlineSimilarity(tokens, clusterTokens)

      // Overlap of 35%+ core tokens or matching key entities triggers clustering
      if (similarity >= 0.35) {
        matchedCluster = cluster
        break
      }
    }

    if (matchedCluster) {
      matchedCluster.candidates.push(item)
      matchedCluster.allSources.add(item.source)
    } else {
      clusters.push({
        canonical: item,
        allSources: new Set([item.source]),
        candidates: [item],
      })
    }
  }

  // Step 3: For each cluster, pick the BEST jargon-free explanation
  const curatedItems: NewsItem[] = clusters.map((cluster) => {
    let bestItem = cluster.candidates[0]
    let highestQuality = -999

    for (const candidate of cluster.candidates) {
      const q = scoreExplanationQuality(candidate.title, candidate.summary)
      if (q > highestQuality) {
        highestQuality = q
        bestItem = candidate
      }
    }

    // Demystify any lingering jargon in the selected summary
    const polishedSummary = clarifyJargon(bestItem.summary)

    // Ensure image is preserved if any source had an image
    const bestImage =
      bestItem.image || cluster.candidates.find((c) => Boolean(c.image))?.image

    // Boost importance if multiple sources reported it (common important news)
    const crossSourceCount = cluster.allSources.size
    const multiSourceBonus = (crossSourceCount - 1) * 20
    const finalImportance = (bestItem.importanceScore ?? 50) + multiSourceBonus

    return {
      ...bestItem,
      summary: polishedSummary,
      image: bestImage,
      sources: Array.from(cluster.allSources),
      importanceScore: finalImportance,
    }
  })

  // Step 4: Sort by Importance first, then Freshness
  curatedItems.sort((a, b) => {
    const scoreDiff = (b.importanceScore ?? 0) - (a.importanceScore ?? 0)
    if (Math.abs(scoreDiff) >= 20) return scoreDiff
    return b.pubMs - a.pubMs
  })

  return curatedItems.slice(0, 36)
}

// ---------------------------------------------------------------------------
// 4. In-Memory Hourly Cache (Refreshes once per hour unless force-refreshed)
// ---------------------------------------------------------------------------

type CachedCategory = {
  data: NewsItem[]
  updatedAt: string
  expiresAt: number
}

const HOURLY_CACHE = new Map<string, CachedCategory>()
const ONE_HOUR_MS = 60 * 60 * 1000 // 1 hour

export async function getNews(categoryId: string, forceRefresh = false): Promise<{ items: NewsItem[]; updatedAt: string }> {
  const now = Date.now()
  const cached = HOURLY_CACHE.get(categoryId)

  // Serve hourly cached dispatch if valid and not a forced manual refresh
  if (!forceRefresh && cached && cached.expiresAt > now) {
    return {
      items: cached.data,
      updatedAt: cached.updatedAt,
    }
  }

  const feeds = FEEDS[categoryId] ?? FEEDS.all
  const results = await Promise.allSettled(feeds.map((f) => fetchFeed(f, categoryId, forceRefresh)))
  let all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []))

  // Fallback for categories with fewer items (like IPO)
  if (categoryId === "ipo" && all.length < 5) {
    const marketResults = await Promise.allSettled(
      FEEDS.markets.map((f) => fetchFeed(f, "ipo", forceRefresh)),
    )
    const extra = marketResults
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter((item) => /ipo|listing|public issue|share sale|drhp|debut|allotment/i.test(item.title))
    all = [...all, ...extra]
  }

  // Multi-source deduplication, jargon-free explanation picking & relevance filtering
  const curated = clusterAndSelectBestNews(all, categoryId)
  const updatedAt = new Date().toISOString()

  // Save to 1-hour cache
  HOURLY_CACHE.set(categoryId, {
    data: curated,
    updatedAt,
    expiresAt: now + ONE_HOUR_MS,
  })

  return {
    items: curated,
    updatedAt,
  }
}

