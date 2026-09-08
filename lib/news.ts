import { XMLParser } from "fast-xml-parser"

export type NewsItem = {
  id: string
  title: string
  displayTitle?: string
  link: string
  source: string
  category: string
  summary: string
  image?: string
  pubDate: string
  pubMs: number
}

export type Category = {
  id: string
  label: string
}

// Category tabs shown in the UI, mapped to one or more RSS feeds below.
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
]

type Feed = { url: string; source: string }

// Real financial news RSS feeds, grouped by category with multiple reliable mirrors.
const FEEDS: Record<string, Feed[]> = {
  all: [
    { url: "https://economictimes.indiatimes.com/rssfeedstopstories.cms", source: "Economic Times" },
    { url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss", source: "Mint" },
    { url: "https://www.livemint.com/rss/news", source: "Mint" },
    { url: "https://www.moneycontrol.com/rss/latestnews.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/markets-106.rss", source: "Business Standard" },
    { url: "https://www.business-standard.com/rss/latest.rss", source: "Business Standard" },
  ],
  markets: [
    { url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms", source: "Economic Times" },
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
    { url: "https://economictimes.indiatimes.com/small-biz/rssfeeds/5575607.cms", source: "Economic Times" },
    { url: "https://www.livemint.com/rss/startups", source: "Mint" },
    { url: "https://www.business-standard.com/rss/startups-113.rss", source: "Business Standard" },
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
};

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
    .replace(/\s+/g, " ")
    .trim()
}

function stripHtml(input: string): string {
  return cleanSummary(input)
}

function firstImage(item: Record<string, any>): string | undefined {
  // <enclosure url="..." type="image/..."/>
  const enclosure = item.enclosure
  if (enclosure) {
    const enc = Array.isArray(enclosure) ? enclosure[0] : enclosure
    const url = enc?.["@_url"]
    if (url && /^https?:\/\//.test(url)) return url
  }
  // <media:content url="..."/> or <media:thumbnail url="..."/>
  const media = item["media:content"] ?? item["media:thumbnail"]
  if (media) {
    const m = Array.isArray(media) ? media[0] : media
    const url = m?.["@_url"]
    if (url && /^https?:\/\//.test(url)) return url
  }
  // first <img src="..."> inside description / content
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
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, text/html, */*",
        "Accept-Language": "en-US,en;q=0.9",
      },
      ...(noStore
        ? { cache: "no-store" as const }
        : { next: { revalidate: 180 } }),
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
        if (!title || title.length < 5) return null

        let link = ""
        if (typeof item.link === "string") link = item.link
        else if (item.link?.["@_href"]) link = item.link["@_href"]
        else if (Array.isArray(item.link)) link = item.link[0]?.["@_href"] ?? ""
        link = link || toText(item.guid)

        const rawSummary = toText(item.description ?? item.summary ?? item["content:encoded"])
        const summary = cleanSummary(rawSummary).slice(0, 300)

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

export async function getNews(categoryId: string, noStore = false): Promise<NewsItem[]> {
  const feeds = FEEDS[categoryId] ?? FEEDS.all
  const results = await Promise.allSettled(feeds.map((f) => fetchFeed(f, categoryId, noStore)))

  let all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []))

  // Fallback for categories with fewer items (like IPO)
  if (categoryId === "ipo" && all.length < 5) {
    const marketResults = await Promise.allSettled(
      FEEDS.markets.map((f) => fetchFeed(f, "ipo", noStore)),
    )
    const extra = marketResults
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter((item) => /ipo|listing|public issue|share sale|drhp|debut|allotment/i.test(item.title))
    all = [...all, ...extra]
  }

  // Dedupe by normalized alphanumeric signature
  const seen = new Set<string>()
  const deduped: NewsItem[] = []
  for (const item of all) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 45)
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(item)
  }

  deduped.sort((a, b) => b.pubMs - a.pubMs)
  // Deliver top 36 fresh stories for full broadsheet coverage
  return deduped.slice(0, 36)
}
