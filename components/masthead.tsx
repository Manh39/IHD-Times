"use client"

import Link from "next/link"
import useSWR from "swr"
import { ThemeToggle } from "@/components/theme-toggle"

type Row = { k: string; v: string; c: string; up: boolean }
type MarketResponse = { indices: Row[]; yields: Row[] }

const fetcher = (url: string) => fetch(url).then((res) => res.json()) as Promise<MarketResponse>

function IndexQuote({
  name,
  value,
  change,
  up,
}: {
  name: string
  value: string
  change: string
  up: boolean
}) {
  return (
    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {name}
      </span>
      <span className="font-mono text-[12px] tabular-nums text-foreground">{value}</span>
      <span
        className={`font-mono text-[11px] tabular-nums ${up ? "text-gain" : "text-loss"}`}
      >
        {up ? "▲" : "▼"} {change}
      </span>
    </div>
  )
}

function IndexQuoteSkeleton({ name }: { name: string }) {
  return (
    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {name}
      </span>
      <span className="font-mono text-[12px] tabular-nums text-muted-foreground">—</span>
    </div>
  )
}

export function Masthead() {
  const { data } = useSWR<MarketResponse>("/api/markets", fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
  })

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const sp500 = data?.indices?.find((r) => r.k === "S&P 500")
  const nasdaq = data?.indices?.find((r) => r.k === "Nasdaq")
  const ust10y = data?.yields?.find((r) => r.k === "US 10Y Treasury")

  return (
    <header className="border-b-4 border-double border-foreground bg-background">
      {/* Utility strip */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-1.5">
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Vol. CXLVII · No. 2,318
          </span>
          <div className="flex items-center gap-4 overflow-hidden">
            {sp500 ? (
              <IndexQuote name="S&P 500" value={sp500.v} change={sp500.c} up={sp500.up} />
            ) : (
              <IndexQuoteSkeleton name="S&P 500" />
            )}
            <span className="hidden h-3 w-px bg-border md:block" />
            {nasdaq ? (
              <IndexQuote name="Nasdaq" value={nasdaq.v} change={nasdaq.c} up={nasdaq.up} />
            ) : (
              <IndexQuoteSkeleton name="Nasdaq" />
            )}
            <span className="hidden h-3 w-px bg-border lg:block" />
            <div className="hidden lg:block">
              {ust10y ? (
                <IndexQuote name="10Y UST" value={ust10y.v} change={ust10y.c} up={ust10y.up} />
              ) : (
                <IndexQuoteSkeleton name="10Y UST" />
              )}
            </div>
          </div>
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Late City Edition
          </span>
        </div>
      </div>

      {/* Nameplate */}
      <div className="relative mx-auto max-w-[1280px] px-4 pt-4 pb-3 text-center">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <div className="mb-1 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-primary">
          <span className="h-px w-10 bg-primary" />
          Established 1878
          <span className="h-px w-10 bg-primary" />
        </div>
        <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-foreground sm:text-6xl md:text-7xl">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            IHD Times<span className="text-primary">.</span>
          </Link>
        </h1>
        <p className="mt-2 font-serif text-[13px] italic text-muted-foreground">
          &ldquo;The only news that matters &mdash; global business, markets &amp; finance, aggregated live.&rdquo;
        </p>
      </div>

      {/* Dateline strip */}
      <div className="border-y border-border">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          <span>{today}</span>
          <span className="hidden md:block">India</span>
          <span>Price £3.80 / $4.50</span>
        </div>
      </div>

    </header>
  )
}
