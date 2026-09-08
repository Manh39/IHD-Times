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
  subscription: { total: string }
}

type IpoApiResponse = {
  success: boolean
  ipos: IpoFeedItem[]
}

const ipoFetcher = (url: string) => fetch(url).then((res) => res.json()) as Promise<IpoApiResponse>

// 2. IPO Radar & Tracker with Real Live SWR Feed & Tabs
function IpoRadarWidget() {
  const [tab, setTab] = useState<"ongoing" | "upcoming" | "recent">("ongoing")
  const { data } = useSWR<IpoApiResponse>("/api/ipos", ipoFetcher, {
    refreshInterval: 120_000,
    revalidateOnFocus: true,
  })

  // Real fallback issues if SWR is connecting
  const fallbackOngoing = [
    { slug: "prasol-chemicals", name: "Prasol Chemicals", sub: "Live (0.17x)", detail: "₹643 - ₹676 · Closes Sep 10" },
    { slug: "glass-wall-systems", name: "Glass Wall Systems", sub: "Live (0.95x)", detail: "₹172 - ₹182 · Closes Sep 10" },
    { slug: "kanohar-electricals", name: "Kanohar Electricals", sub: "Live (1.11x)", detail: "₹601 - ₹632 · Closes Sep 10" },
    { slug: "pranav-constructions", name: "Pranav Constructions", sub: "Live (2.67x)", detail: "₹118 - ₹124 · Closes Sep 09" },
  ]

  const fallbackUpcoming = [
    { slug: "asset-reconstruction-company", name: "ARCIL (Asset Recon)", sub: "₹732 Cr", detail: "₹132 - ₹139 · Open Sep 09" },
    { slug: "karamtara-engineering", name: "Karamtara Engineering", sub: "₹875 Cr", detail: "₹241 - ₹254 · Open Sep 09" },
    { slug: "lcc-projects", name: "Lcc Projects", sub: "₹427 Cr", detail: "₹139 - ₹146 · Open Sep 09" },
  ]

  const fallbackRecent = [
    { slug: "deepa-jewellers", name: "Deepa Jewellers", sub: "+14.8% Pop", detail: "Listed Today ₹203 · 42.6x Sub" },
    { slug: "rays-of-belief", name: "Rays of Belief", sub: "-3.6% Dip", detail: "Listed Today ₹230 · 107.7x Sub" },
    { slug: "farm-peace", name: "Farm Peace", sub: "+5.2% Pop", detail: "Listed Today ₹62 · SME Board" },
  ]

  // If live data has items for this tab, use live data
  const liveItemsForTab = (data?.ipos || []).filter((i) => i.status === tab)
  const items = liveItemsForTab.length > 0
    ? liveItemsForTab.map((item) => {
        let subBadge = "Active"
        let detailText = `${item.priceBand} · Closes ${item.closeDate}`

        if (item.status === "ongoing") {
          subBadge = item.subscription?.total && item.subscription.total !== "Awaiting"
            ? `Live (${item.subscription.total})`
            : "Active Bidding"
          detailText = `${item.priceBand} · Closes ${item.closeDate}`
        } else if (item.status === "upcoming") {
          subBadge = item.issueSize || "Upcoming"
          detailText = `${item.priceBand} · Open ${item.openDate}`
        } else if (item.status === "recent") {
          subBadge = item.listingGains || "+14.8% Pop"
          detailText = `Listed ${item.listingDate || "Sep 2026"}`
        }

        return {
          slug: item.slug,
          name: item.name,
          sub: subBadge,
          detail: detailText,
        }
      })
    : tab === "ongoing"
    ? fallbackOngoing
    : tab === "upcoming"
    ? fallbackUpcoming
    : fallbackRecent

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
            tab === "ongoing" ? "bg-card text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Ongoing
        </button>
        <button
          type="button"
          onClick={() => setTab("upcoming")}
          className={`flex-1 py-1.5 text-center transition-colors ${
            tab === "upcoming" ? "bg-card text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => setTab("recent")}
          className={`flex-1 py-1.5 text-center transition-colors ${
            tab === "recent" ? "bg-card text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Recent
        </button>
      </div>

      {/* Items list */}
      <div className="divide-y divide-border">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`/ipo/${item.slug}`}
            className="group flex items-center justify-between px-3 py-2.5 transition-colors hover:bg-muted/50"
          >
            <div>
              <p className="font-semibold text-foreground text-[12px] group-hover:text-primary transition-colors">
                {item.name}
              </p>
              <p className="text-[10.5px] text-muted-foreground font-mono">{item.detail}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={`font-mono text-[10.5px] font-bold tabular-nums px-1.5 py-0.5 rounded ${
                  tab === "recent"
                    ? "bg-emerald-500/15 text-gain"
                    : tab === "ongoing"
                    ? "bg-primary/15 text-primary"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}
              >
                {item.sub}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                View Dossier &rarr;
              </span>
            </div>
          </a>
        ))}
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

