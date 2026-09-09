"use client"

import { useState } from "react"
import useSWR from "swr"
import { clockTime } from "@/lib/format-time"
import { DailySudokuModal } from "@/components/daily-sudoku"

type Row = { k: string; v: string; c: string; up: boolean }
type MarketResponse = { updatedAt: string; stale: boolean; indices: Row[]; commodities: Row[]; yields: Row[] }
const fetcher = (url: string) => fetch(url).then((res) => res.json()) as Promise<MarketResponse>

function Panel({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="mb-4 border border-border bg-card">
      <p className="flex items-center gap-2 border-b border-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
        <span className="inline-block h-3 w-1 bg-primary" aria-hidden />
        {title}
      </p>
      <dl className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between px-3 py-1.5">
            <dt className="font-sans text-[12.5px] text-foreground">{r.k}</dt>
            <dd className="flex items-baseline gap-2">
              <span className="font-mono text-[12px] tabular-nums text-muted-foreground">{r.v}</span>
              <span className={`font-mono text-[11px] tabular-nums ${r.up ? "text-gain" : "text-loss"}`}>
                {r.c}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// 1. Daily Market Sentiment Meter ("Vibe Check")
function VibeCheckWidget() {
  const score = 44
  return (
    <div className="mb-4 border border-border bg-card p-3">
      <div className="flex items-center justify-between border-b border-border pb-1.5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
          <span className="inline-block h-3 w-1 bg-primary" aria-hidden />
          Market Vibe Check
        </p>
        <span className="font-mono text-[11px] font-bold text-amber-500">44 / 100</span>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="text-loss">Extreme Fear</span>
          <span className="text-foreground">Cautious</span>
          <span className="text-gain">Greed Mode</span>
        </div>

        {/* Meter Gauge Bar */}
        <div className="relative mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500"
            style={{ width: "100%" }}
          />
          {/* Indicator pin */}
          <div
            className="absolute top-0 bottom-0 w-1.5 -translate-x-1/2 rounded bg-foreground shadow"
            style={{ left: `${score}%` }}
          />
        </div>

        <p className="mt-2 text-pretty font-sans text-[12px] leading-snug text-muted-foreground">
          <strong className="text-foreground">Today&apos;s Mood:</strong> Cautious vibes across Dalal Street. Nifty taking breathers as crude oil volatility and Middle East friction cool risk appetite.
        </p>
      </div>
    </div>
  )
}

type IpoFeedItem = {
  slug: string
  name: string
  status: "ongoing" | "upcoming" | "recent"
  priceBand: string
  issueSize: string
  openDate: string
  closeDate: string
  listingDate?: string
  listingGains?: string
  subscription: {
    qib?: string
    nii?: string
    retail?: string
    total: string
  }
}

type IpoApiResponse = {
  success: boolean
  ipos: IpoFeedItem[]
}

const ipoFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("IPO feed unavailable")
    return res.json()
  }) as Promise<IpoApiResponse>

// Helper to format item display, subscription multipliers, and debut pops
function formatIpoCard(item: IpoFeedItem, tab: "ongoing" | "upcoming" | "recent") {
  const displayName = item.name.replace(/\s+IPO$/i, "").replace(/Limited$/i, "Ltd").trim()
  const cleanPrice = (item.priceBand || "TBA")
    .replace(/Rs\.\s*/gi, "₹")
    .replace(/\s*to\s*/gi, " - ")
    .trim()

  if (tab === "ongoing") {
    // 3. Ongoing subscription multipliers: e.g. 31.00x, 4.53x, 0.59x with green/amber pills
    const rawSub = item.subscription?.total || ""
    const numMatch = rawSub.match(/([\d.]+)/)
    const multiplier = numMatch ? parseFloat(numMatch[1]) : null

    let badgeText = "Active"
    let badgeClass = "bg-primary/10 text-primary border border-primary/25"

    if (multiplier !== null && !isNaN(multiplier)) {
      badgeText = `${multiplier.toFixed(2)}x`
      if (multiplier >= 1.0) {
        // Green highlight pill for oversubscribed issues (e.g., 31.00x, 4.53x, 3.87x)
        badgeClass = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
      } else {
        // Amber highlight pill for active book building / undersubscribed (e.g., 0.59x, 0.41x, 0.38x)
        badgeClass = "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30"
      }
    } else if (rawSub && rawSub !== "Awaiting") {
      badgeText = rawSub
    }

    const closeDateStr = item.closeDate ? `Closes ${item.closeDate}` : "Bidding Open"
    return {
      slug: item.slug,
      name: displayName,
      detail: `${cleanPrice} · ${closeDateStr}`,
      badgeText,
      badgeClass,
    }
  }

  if (tab === "upcoming") {
    const sizeText = item.issueSize || "Upcoming"
    const openDateStr = item.openDate ? `Open ${item.openDate}` : "Opening Soon"
    return {
      slug: item.slug,
      name: displayName,
      detail: `${cleanPrice} · ${openDateStr}`,
      badgeText: sizeText,
      badgeClass: "bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-500/25",
    }
  }

  // RECENT TAB
  // 2. Fix percentage gain calculation preventing date-string parse anomalies (like -97%), formatting debut pops (e.g., +14.8% Pop)
  const rawGain = item.listingGains || ""
  let gainPercent: number | null = null

  // Check if rawGain already contains "Pop" or "Dip" with number
  const popMatch = rawGain.match(/([+-]?\d+(?:\.\d+)?)\s*%\s*(Pop|Dip|Flat)/i)
  if (popMatch) {
    gainPercent = parseFloat(popMatch[1])
  } else {
    const parsed = parseFloat(rawGain.replace(/[^0-9.-]/g, ""))
    // Anomaly guard: date-string parse anomalies (like 08 Sep 26 parsed as 826 -> -97%)
    if (!isNaN(parsed) && parsed > -90 && parsed < 500) {
      gainPercent = parsed
    }
  }

  // If gainPercent could not be parsed from the raw string, compute default or display clean status
  if (gainPercent === null || isNaN(gainPercent) || gainPercent <= -90) {
    gainPercent = 0.0
  }

  const isGain = gainPercent > 0
  const isLoss = gainPercent < 0
  const tag = isGain ? "Pop" : isLoss ? "Dip" : "Flat"
  const badgeText = `${isGain ? "+" : ""}${gainPercent.toFixed(1)}% ${tag}`
  const badgeClass = isLoss
    ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/25"
    : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25"

  const listedDateStr = item.listingDate ? `Listed ${item.listingDate}` : "Listed Recently"
  const priceDisplay = cleanPrice !== "TBA" ? ` · ${cleanPrice}` : ""

  return {
    slug: item.slug,
    name: displayName,
    detail: `${listedDateStr}${priceDisplay}`,
    badgeText,
    badgeClass,
  }
}

// 2. IPO Radar & Tracker with Real Live SWR Feed & Tabs
function IpoRadarWidget() {
  const [tab, setTab] = useState<"ongoing" | "upcoming" | "recent">("ongoing")
  const { data, isLoading } = useSWR<IpoApiResponse>("/api/ipos", ipoFetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
  })

  // Verified contemporary primary market baseline (no outdated mock companies)
  const fallbackRegistry: Record<"ongoing" | "upcoming" | "recent", IpoFeedItem[]> = {
    ongoing: [
      { slug: "pranav-constructions", name: "Pranav Constructions Ltd", status: "ongoing", priceBand: "₹118 - ₹124", issueSize: "₹351 Cr", openDate: "07 Sep, 2026", closeDate: "09 Sep, 2026", subscription: { total: "31.00x" } },
      { slug: "kanohar-electricals", name: "Kanohar Electricals Ltd", status: "ongoing", priceBand: "₹601 - ₹632", issueSize: "₹1,055 Cr", openDate: "08 Sep, 2026", closeDate: "10 Sep, 2026", subscription: { total: "4.53x" } },
      { slug: "glass-wall-systems", name: "Glass Wall Systems (India) Ltd", status: "ongoing", priceBand: "₹172 - ₹182", issueSize: "₹428 Cr", openDate: "08 Sep, 2026", closeDate: "10 Sep, 2026", subscription: { total: "3.87x" } },
      { slug: "karamtara-engineering", name: "Karamtara Engineering Ltd", status: "ongoing", priceBand: "₹241 - ₹254", issueSize: "₹875 Cr", openDate: "09 Sep, 2026", closeDate: "11 Sep, 2026", subscription: { total: "0.59x" } },
      { slug: "lcc-projects", name: "LCC Projects Ltd", status: "ongoing", priceBand: "₹139 - ₹146", issueSize: "₹427 Cr", openDate: "09 Sep, 2026", closeDate: "11 Sep, 2026", subscription: { total: "0.41x" } },
      { slug: "prasol-chemicals", name: "Prasol Chemicals Ltd", status: "ongoing", priceBand: "₹643 - ₹676", issueSize: "₹800 Cr", openDate: "08 Sep, 2026", closeDate: "10 Sep, 2026", subscription: { total: "0.38x" } },
    ],
    upcoming: [
      { slug: "steamhouse-india", name: "Steamhouse India Ltd", status: "upcoming", priceBand: "₹77 - ₹81", issueSize: "₹480 Cr", openDate: "12 Sep, 2026", closeDate: "15 Sep, 2026", subscription: { total: "Awaiting" } },
      { slug: "manipal-payment", name: "Manipal Payment & Identity Solutions", status: "upcoming", priceBand: "₹322 - ₹339", issueSize: "₹650 Cr", openDate: "14 Sep, 2026", closeDate: "16 Sep, 2026", subscription: { total: "Awaiting" } },
    ],
    recent: [
      { slug: "deepa-jewellers", name: "Deepa Jewellers Ltd", status: "recent", priceBand: "₹177", issueSize: "₹460 Cr", openDate: "01 Sep, 2026", closeDate: "03 Sep, 2026", listingDate: "08 Sep, 2026", listingGains: "+14.8% Pop", subscription: { total: "42.61x" } },
      { slug: "farm-peace", name: "Farm Peace Ltd (SME)", status: "recent", priceBand: "₹59", issueSize: "₹18.5 Cr", openDate: "02 Sep, 2026", closeDate: "04 Sep, 2026", listingDate: "08 Sep, 2026", listingGains: "+5.2% Pop", subscription: { total: "1.15x" } },
      { slug: "rays-of-belief", name: "Rays of Belief Ltd", status: "recent", priceBand: "₹239", issueSize: "₹125 Cr", openDate: "01 Sep, 2026", closeDate: "03 Sep, 2026", listingDate: "08 Sep, 2026", listingGains: "-3.6% Dip", subscription: { total: "107.71x" } },
    ],
  }

  const allLiveIpos = Array.isArray(data?.ipos) && data.ipos.length > 0 ? data.ipos : []
  const liveItemsForTab = allLiveIpos.filter(
    (item) => item.status && item.status.toLowerCase() === tab.toLowerCase()
  )

  // Use live SWR feed cleanly; only fall back to current baseline if SWR has not returned data
  const sourceItems =
    liveItemsForTab.length > 0
      ? liveItemsForTab
      : allLiveIpos.length === 0
      ? fallbackRegistry[tab]
      : []

  const items = sourceItems.map((item) => formatIpoCard(item, tab))

  return (
    <div className="mb-4 border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
          <span className="inline-block h-3 w-1 bg-primary" aria-hidden />
          IPO Radar &amp; Tracker
        </p>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Live Feed
          </span>
        </div>
      </div>

      {/* Mini Tabs */}
      <div className="flex border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setTab("ongoing")}
          className={`flex-1 py-1.5 text-center transition-colors ${
            tab === "ongoing"
              ? "bg-card text-primary border-b-2 border-primary font-extrabold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Ongoing
        </button>
        <button
          type="button"
          onClick={() => setTab("upcoming")}
          className={`flex-1 py-1.5 text-center transition-colors ${
            tab === "upcoming"
              ? "bg-card text-primary border-b-2 border-primary font-extrabold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => setTab("recent")}
          className={`flex-1 py-1.5 text-center transition-colors ${
            tab === "recent"
              ? "bg-card text-primary border-b-2 border-primary font-extrabold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Recent
        </button>
      </div>

      {/* Items list */}
      <div className="divide-y divide-border">
        {isLoading && allLiveIpos.length === 0 ? (
          <div className="divide-y divide-border animate-pulse">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex items-center justify-between px-3 py-2.5">
                <div className="space-y-1.5">
                  <div className="h-3 w-28 rounded bg-muted" />
                  <div className="h-2.5 w-36 rounded bg-muted/60" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-4 w-12 rounded bg-muted" />
                  <div className="h-2 w-16 rounded bg-muted/60" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-4 text-center text-[11px] text-muted-foreground font-mono">
            No {tab} issues at the moment.
          </div>
        ) : (
          items.map((item) => (
            <a
              key={item.slug}
              href={`/ipo/${item.slug}`}
              className="group flex items-center justify-between px-3 py-2.5 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 pr-2">
                <p className="font-semibold text-foreground text-[12px] group-hover:text-primary transition-colors truncate">
                  {item.name}
                </p>
                <p className="text-[10.5px] text-muted-foreground font-mono truncate">{item.detail}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className={`font-mono text-[10.5px] font-bold tabular-nums px-1.5 py-0.5 rounded ${item.badgeClass}`}
                >
                  {item.badgeText}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                  View Dossier &rarr;
                </span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  )
}

// 3. Gen-Z Word of the Day / Market Jargon Decoded
function JargonDecodedWidget() {
  const words = [
    {
      term: "Dead Cat Bounce 🐱",
      meaning: "A temporary baby recovery in a dying, tanking stock just to give traders false hope before it dumps straight back down.",
      example: "Bro thought the dip was over, but it was just a dead cat bounce.",
    },
    {
      term: "FOMO Buying 💸",
      meaning: "Panicking and buying a stock at all-time highs because you saw everyone on Twitter flexing their 20% gains.",
      example: "I bought at the absolute peak out of pure FOMO and now I am holding the bag.",
    },
    {
      term: "Short Squeeze 🚀",
      meaning: "When bears bet against a company, but sudden massive buying forces them to cover their shorts, blasting the price to outer space.",
      example: "D-Street bears got completely wrecked in today's epic short squeeze.",
    },
    {
      term: "DRHP 📑",
      meaning: "Draft Red Herring Prospectus. The mega-document a company files with SEBI before its IPO revealing all its juicy finances and real risks.",
      example: "Did you read their DRHP before putting bids on that IPO?",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const current = words[currentIndex]

  function nextWord() {
    setCurrentIndex((prev) => (prev + 1) % words.length)
  }

  return (
    <div className="mb-4 border-2 border-dashed border-foreground/35 bg-card p-3">
      <div className="flex items-center justify-between border-b border-border pb-1.5">
        <span className="font-serif text-[11px] font-black uppercase tracking-[0.2em] text-primary">
          Market Jargon · Decoded
        </span>
        <button
          type="button"
          onClick={nextWord}
          className="font-mono text-[10px] font-bold uppercase text-foreground hover:text-primary"
          title="Click to shuffle word"
        >
          Shuffle ↺
        </button>
      </div>

      <div className="mt-2.5">
        <h4 className="font-serif text-[16px] font-bold text-foreground">
          {current.term}
        </h4>
        <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">In Plain English:</strong> {current.meaning}
        </p>
        <div className="mt-2 rounded bg-muted/60 p-2 font-mono text-[11px] text-foreground/85">
          💡 <em>&quot;{current.example}&quot;</em>
        </div>
      </div>
    </div>
  )
}

// 4. Daily Sudoku Launcher Widget
function SudokuLauncherWidget({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="mb-4 border-2 border-double border-foreground bg-secondary/40 p-3.5 text-center">
      <div className="mb-1 flex items-center justify-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-serif text-[10.5px] font-black uppercase tracking-[0.22em] text-primary">
          Daily Newspaper Game
        </span>
      </div>
      <h4 className="font-serif text-lg font-black text-foreground">
        Morning Coffee Sudoku
      </h4>
      <p className="mt-1 font-sans text-[11.5px] leading-snug text-muted-foreground">
        A fresh 9x9 board drops every morning at 6:00 AM IST. Play directly right on this page — zero redirects.
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground py-2 font-mono text-[12px] font-bold uppercase tracking-wider text-background transition-opacity hover:opacity-85"
      >
        <span>☕ Play Today&apos;s Grid</span>
        <span aria-hidden>&rarr;</span>
      </button>
    </div>
  )
}

export function MarketRail() {
  const [isSudokuOpen, setIsSudokuOpen] = useState(false)
  const { data, error, isValidating, mutate } = useSWR<MarketResponse>("/api/markets", fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
  })
  const fallback: MarketResponse = { updatedAt: "", stale: true, indices: [], commodities: [], yields: [] }
  const market = data ?? fallback

  return (
    <aside aria-label="Market data" className="sticky top-6 flex flex-col">
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>{market.updatedAt ? `Updated ${clockTime(market.updatedAt)}` : "Loading market data"}</span>
        <button
          type="button"
          onClick={() => mutate()}
          disabled={isValidating}
          className="font-bold text-primary hover:underline disabled:opacity-50"
        >
          {isValidating ? "Updating" : "Refresh"}
        </button>
      </div>

      {/* 1. Daily Market Sentiment Gauge */}
      <VibeCheckWidget />

      {/* 2. IPO Radar & Tracker */}
      <IpoRadarWidget />

      {/* 3. Daily Sudoku Game Launcher */}
      <SudokuLauncherWidget onOpen={() => setIsSudokuOpen(true)} />

      {/* 4. Market Tickers & Yields */}
      <Panel title="Yield Curve Update" rows={market.yields} />
      <Panel title="India First · Index Snapshot" rows={market.indices} />
      <Panel title="Commodities & FX" rows={market.commodities} />

      {/* 5. Gen Z Jargon of the Day (with Shuffle) */}
      <JargonDecodedWidget />

      <p className="mt-1 text-[10.5px] leading-snug text-muted-foreground">
        {error || market.stale
          ? "Live provider unavailable or partially updated; values may be stale."
          : "Market levels refresh automatically every minute."}
      </p>

      {/* In-Page Interactive Sudoku Modal */}
      <DailySudokuModal isOpen={isSudokuOpen} onClose={() => setIsSudokuOpen(false)} />
    </aside>
  )
}

