"use client"

import useSWR from "swr"

type Row = { k: string; v: string; c: string; up: boolean }
type MarketResponse = { indices: Row[]; commodities: Row[] }
const fetcher = (url: string) => fetch(url).then((res) => res.json()) as Promise<MarketResponse>

function Row({ values }: { values: Row[] }) {
  return <>{values.map((t, i) => <span key={`${t.k}-${i}`} className="inline-flex items-baseline gap-1.5 px-4"><span className="text-[12px] font-bold uppercase tracking-wide">{t.k}</span><span className="font-mono text-[12px] tabular-nums text-background/70">{t.v}</span><span className={`font-mono text-[12px] tabular-nums ${t.up ? "text-emerald-300" : "text-red-300"}`}>{t.c}</span><span className="pl-3 text-background/30" aria-hidden>•</span></span>)}</>
}

export function TickerTape() {
  const { data } = useSWR<MarketResponse>("/api/markets", fetcher, { refreshInterval: 60_000 })
  const values = data ? [...data.indices, ...data.commodities] : []
  return <div className="border-b border-foreground bg-foreground text-background"><div className="mx-auto flex max-w-[1280px] items-stretch"><div className="flex shrink-0 items-center gap-2 border-r border-background/25 bg-primary px-3 py-1.5 text-primary-foreground"><span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping bg-primary-foreground opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 bg-primary-foreground" /></span><span className="text-[11px] font-bold uppercase tracking-[0.18em]">Live Wire</span></div><div className="relative flex-1 overflow-hidden py-1.5"><div className="flex w-max animate-ticker whitespace-nowrap"><Row values={values} /><Row values={values} /></div></div></div></div>
}
