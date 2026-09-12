"use client"

import { useState } from "react"
import useSWR from "swr"
import type { NewsItem } from "@/lib/news"
import { CATEGORIES } from "@/lib/news"
import { timeAgo, clockTime } from "@/lib/format-time"
import { CategoryTabs } from "@/components/category-tabs"
import { MarketRail } from "@/components/market-rail"
import { JargonWelcomeModal } from "@/components/jargon-welcome-modal"
import { MindfulActivityHub } from "@/components/mindful-activity-hub"

type NewsResponse = {
  category: string
  updatedAt: string
  count: number
  items: NewsItem[]
}

const fetcher = async (url: string): Promise<NewsResponse> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to load newswire")
  return res.json()
}

function SourceTag({ source, sources }: { source: string; sources?: string[] }) {
  const isMultiSource = sources && sources.length > 1
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
        {source}
      </span>
      {isMultiSource && (
        <span className="border border-emerald-600/40 bg-emerald-500/10 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Also on {sources.filter((s) => s !== source).join(", ")}
        </span>
      )}
    </div>
  )
}

function Kicker({ item }: { item: NewsItem }) {
  const label = CATEGORIES.find((c) => c.id === item.category)?.label ?? "Newswire"
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-wider text-muted-foreground">
      <SourceTag source={item.source} sources={item.sources} />
      <span className="font-semibold text-foreground">{label}</span>
      <span aria-hidden>·</span>
      <time dateTime={item.pubDate}>{clockTime(item.pubDate)}</time>
    </div>
  )
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex flex-col justify-between border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/40 hover:shadow-sm">
      <div>
        <Kicker item={item} />
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="text-pretty font-serif text-[17px] font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-[19px]">
            {item.displayTitle ?? item.title}
          </h3>
        </a>

        {item.image && (
          <div className="mt-3 overflow-hidden border border-border bg-muted">
            <img
              src={item.image}
              alt=""
              className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              crossOrigin="anonymous"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.display = "none"
              }}
            />
          </div>
        )}

        {item.summary && (
          <p className="mt-2.5 font-sans text-[13.5px] leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {timeAgo(item.pubDate)}
        </span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-[11.5px] font-bold uppercase tracking-wider text-primary hover:underline"
        >
          Read More <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-pulse border border-border bg-card p-4" aria-hidden>
      <div className="mb-2 h-3 w-28 bg-muted" />
      <div className="space-y-2">
        <div className="h-5 w-full bg-muted" />
        <div className="h-5 w-3/4 bg-muted" />
      </div>
      <div className="mt-3 aspect-[16/9] w-full bg-muted" />
      <div className="mt-3 space-y-1.5">
        <div className="h-3 w-full bg-muted" />
        <div className="h-3 w-4/5 bg-muted" />
      </div>
      <div className="mt-4 flex justify-between border-t border-border pt-3">
        <div className="h-3 w-16 bg-muted" />
        <div className="h-3 w-20 bg-muted" />
      </div>
    </div>
  )
}

export function Newspaper() {
  const [category, setCategory] = useState("all")
  const [isJargonModalForced, setIsJargonModalForced] = useState(false)

  const { data, error, isLoading, isValidating, mutate } = useSWR<NewsResponse>(
    `/api/news?category=${category}`,
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000, // Automatic refresh every 10 minutes
      revalidateOnFocus: false, // Don't refresh on window focus
      revalidateOnReconnect: false,
      keepPreviousData: true,
    },
  )

  const items = data?.items ?? []

  async function handleRefresh() {
    await mutate(fetcher(`/api/news?category=${category}&refresh=1`), {
      revalidate: false,
    })
  }

  return (
    <div>
      {/* Control bar */}
      <div className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-2">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-primary" />
            </span>
            <span className="uppercase tracking-wider">Last Updated:</span>
            <span className="font-mono tabular-nums text-foreground">
              {data?.updatedAt ? clockTime(data.updatedAt) : "—"}
            </span>
            <span aria-hidden>·</span>
            <span className="font-semibold text-foreground">
              {items.length} Stories Dispatched
            </span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isValidating}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-background transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            <span
              className={`inline-block h-3 w-3 border-2 border-background border-t-transparent ${
                isValidating ? "animate-spin rounded-full" : ""
              }`}
              aria-hidden
            />
            {isValidating ? "Refreshing" : "Refresh Now"}
          </button>
        </div>
      </div>

      <CategoryTabs active={category} onChange={setCategory} />

      {/* Main grid */}
      <div className="mx-auto max-w-[1280px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-0">
          {/* Left: news content or mindful activity hub */}
          <div className="lg:pr-6">
            {category === "mindful" ? (
              <MindfulActivityHub />
            ) : error ? (
              <div className="border border-loss/40 bg-card p-6 text-center">
                <p className="font-serif text-lg font-bold text-loss">Newswire unavailable</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We could not reach the news feeds. Please refresh to try again.
                </p>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="mt-3 border border-foreground px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
                >
                  Retry
                </button>
              </div>
            ) : isLoading && items.length === 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : items.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">No stories in this section right now.</p>
            ) : (
              <div>
                <div className="mb-4 flex items-center justify-between border-b-2 border-foreground pb-1.5">
                  <h2 className="font-serif text-[14px] font-bold uppercase tracking-[0.2em] text-foreground">
                    Live Dispatch · Full Dossier
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    All Stories Uniform Format
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
                  {items.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: market data rail */}
          <div className="border-border lg:border-l lg:pl-6">
            <MarketRail onTriggerJargonModal={() => setIsJargonModalForced(true)} />
          </div>
        </div>
      </div>

      {/* 8:00 AM Context-Aware Market Jargon Blur Welcome Modal */}
      <JargonWelcomeModal
        forceOpen={isJargonModalForced}
        onClose={() => setIsJargonModalForced(false)}
      />
    </div>
  )
}
