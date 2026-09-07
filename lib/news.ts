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

// Real financial news RSS feeds, grouped by category.
const FEEDS: Record<string, Feed[]> = {
  all: [
    { url: "https://economictimes.indiatimes.com/rssfeedstopstories.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/latestnews.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/markets-106.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss", source: "Mint" },
  ],
  markets: [
    { url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/marketreports.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/markets-106.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss/markets", source: "Mint" },
  ],
  ipo: [
    { url: "https://economictimes.indiatimes.com/markets/ipos/fpos/rssfeeds/1977015348.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/ipo.xml", source: "Moneycontrol" },
    { url: "https://www.livemint.com/rss/ipo", source: "Mint" },
  ],
  economy: [
    { url: "https://economictimes.indiatimes.com/news/economy/rssfeeds/1373380680.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/economy.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/economy-110.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss/economy", source: "Mint" },
  ],
  companies: [
    { url: "https://economictimes.indiatimes.com/industry/rssfeeds/13352306.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/business.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/companies-113.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss/companies", source: "Mint" },
  ],
  technology: [
    { url: "https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/technology.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/technology-108.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss/technology", source: "Mint" },
  ],
  startups: [
    { url: "https://economictimes.indiatimes.com/tech/startups/rssfeeds/76054874.cms", source: "ET Tech" },
    { url: "https://economictimes.indiatimes.com/small-biz/rssfeeds/5575607.cms", source: "Economic Times" },
    { url: "https://www.business-standard.com/rss/startups-113.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss/startups", source: "Mint" },
  ],
  wealth: [
    { url: "https://economictimes.indiatimes.com/wealth/rssfeeds/837555174.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/personalfinance.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/personal-finance-117.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss/wealth", source: "Mint" },
  ],
  world: [
    { url: "https://economictimes.indiatimes.com/news/international/rssfeeds/7771250.cms", source: "Economic Times" },
    { url: "https://www.moneycontrol.com/rss/economy.xml", source: "Moneycontrol" },
    { url: "https://www.business-standard.com/rss/international-111.rss", source: "Business Standard" },
    { url: "https://www.livemint.com/rss/world", source: "Mint" },
  ],
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
})

function stripHtml(input: string): string {
  return input
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
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
    const res = await fetch(feed.url, {
      headers: {
        // Some publishers reject requests without a browser-like UA.
        "User-Agent":
          "Mozilla/5.0 (compatible; CapitalLedgerBot/1.0; +https://vercel.com)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      ...(noStore
        ? { cache: "no-store" as const }
        : { next: { revalidate: 300 } }),
    })
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
        if (!title) return null

        let link = ""
        if (typeof item.link === "string") link = item.link
        else if (item.link?.["@_href"]) link = item.link["@_href"]
        else if (Array.isArray(item.link)) link = item.link[0]?.["@_href"] ?? ""
        link = link || toText(item.guid)

        const rawSummary = toText(item.description ?? item.summary ?? item["content:encoded"])
        const summary = stripHtml(rawSummary).slice(0, 260)

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

  // IPO-specific RSS feeds can be empty or temporarily blocked. Fall back to
  // the live markets feeds and keep only IPO-related stories so the tab never
  // renders blank when publishers change their feed URLs.
  if (categoryId === "ipo" && all.length === 0) {
    const marketResults = await Promise.allSettled(
      FEEDS.markets.map((f) => fetchFeed(f, "ipo", noStore)),
    )
    all = marketResults
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter((item) => /ipo|initial public|listing|public issue|offer price|share sale/i.test(item.title))
  }

  // Dedupe by normalized title.
  const seen = new Set<string>()
  const deduped: NewsItem[] = []
  for (const item of all) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60)
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(item)
  }

  deduped.sort((a, b) => b.pubMs - a.pubMs)
  return deduped.slice(0, 24)
}
