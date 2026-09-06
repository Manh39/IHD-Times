"use client"

import { useState } from "react"
import useSWR from "swr"
import type { NewsItem } from "@/lib/news"
import { CATEGORIES } from "@/lib/news"
import { timeAgo, clockTime } from "@/lib/format-time"
import { CategoryTabs } from "@/components/category-tabs"
import { MarketRail } from "@/components/market-rail"

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

function SourceTag({ source }: { source: string }) {
  return (
    <span className="bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
      {source}
    </span>
  )
}

function Kicker({ item }: { item: NewsItem }) {
  const label = CATEGORIES.find((c) => c.id === item.category)?.label ?? "Newswire"
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-wider text-muted-foreground">
      <SourceTag source={item.source} />
      <span className="font-semibold text-foreground">{label}</span>
      <span aria-hidden>·</span>
      <time dateTime={item.pubDate}>{clockTime(item.pubDate)}</time>
    </div>
  )
}

function LeadStory({ item }: { item: NewsItem }) {
  return (
    <article className="border-b border-border pb-5">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
        Lead Editorial Story
      </p>
      <Kicker item={item} />
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
        <h2 className="text-balance font-serif text-[26px] font-black leading-[1.1] text-foreground group-hover:text-primary sm:text-[32px]">
          {item.displayTitle ?? item.title}
        </h2>
      </a>
      {item.image && (
        <img
          src={item.image || "/placeholder.svg"}
          alt=""
          className="mt-3 aspect-[16/8] w-full border border-border object-cover"
          crossOrigin="anonymous"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = "none"
          }}
        />
      )}
      {item.summary && (
        <p className="drop-cap mt-3 font-sans text-[15px] leading-relaxed text-foreground">
          {item.summary}
        </p>
      )}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-widest text-primary hover:underline"
      >
        Read More <span aria-hidden>&rarr;</span>
      </a>
    </article>
  )
}

function DossierCard({ item }: { item: NewsItem }) {
  return (
    <article className="flex flex-col border-b border-border pb-4">
      <Kicker item={item} />
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
        <h3 className="text-pretty font-serif text-[17px] font-bold leading-snug text-foreground group-hover:text-primary">
          {item.displayTitle ?? item.title}
        </h3>
      </a>
      {item.summary && (
        <p className="mt-1.5 line-clamp-3 font-sans text-[13px] leading-relaxed text-muted-foreground">
          {item.summary}
        </p>
      )}
    </article>
  )
}

function BriefRow({ item }: { item: NewsItem }) {
  return (
    <li className="flex items-baseline gap-3 border-b border-border py-2 last:border-b-0">
      <time className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground" dateTime={item.pubDate}>
        {timeAgo(item.pubDate)}
      </time>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-[13.5px] leading-snug text-foreground hover:text-primary"
      >
        {item.displayTitle ?? item.title}
      </a>
    </li>
  )
}

function SkeletonBlock() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden>
      <div className="h-3 w-32 bg-muted" />
      <div className="h-8 w-full bg-muted" />
      <div className="h-8 w-3/4 bg-muted" />
      <div className="aspect-[16/8] w-full bg-muted" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-muted" />
        <div className="h-3 w-full bg-muted" />
        <div className="h-3 w-2/3 bg-muted" />
      </div>
    </div>
  )
}

export function Newspaper() {
  const [category, setCategory] = useState("all")

  const { data, error, isLoading, isValidating, mutate } = useSWR<NewsResponse>(
    `/api/news?category=${category}`,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: true,
      keepPreviousData: true,
    },
  )

  const items = data?.items ?? []
  const [lead, ...rest] = items
  const dossier = rest.slice(0, 6)
  const briefs = rest.slice(6, 18)

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
          {/* Left: news content */}
          <div className="lg:pr-6">
            {error ? (
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
              <SkeletonBlock />
            ) : items.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">No stories in this section right now.</p>
            ) : (
              <>
                {lead && <LeadStory item={lead} />}

                {dossier.length > 0 && (
                  <section className="mt-5">
                    <h2 className="mb-3 border-b-2 border-foreground pb-1 font-serif text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">
                      General Dossier &amp; Insights
                    </h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                      {dossier.map((item) => (
                        <DossierCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                )}

                {briefs.length > 0 && (
                  <section className="mt-6">
                    <h2 className="mb-2 border-b-2 border-foreground pb-1 font-serif text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">
                      News In Brief
                    </h2>
                    <ul>
                      {briefs.map((item) => (
                        <BriefRow key={item.id} item={item} />
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </div>

          {/* Right: market data rail */}
          <div className="border-border lg:border-l lg:pl-6">
            <MarketRail />
          </div>
        </div>
      </div>
    </div>
  )
}
