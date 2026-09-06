"use client"

import useSWR from "swr"
import { clockTime } from "@/lib/format-time"

type Row = { k: string; v: string; c: string; up: boolean }
type MarketResponse = { updatedAt: string; stale: boolean; indices: Row[]; commodities: Row[]; yields: Row[] }
const fetcher = (url: string) => fetch(url).then((res) => res.json()) as Promise<MarketResponse>

function Panel({ title, rows }: { title: string; rows: Row[] }) {
  return <div className="mb-4 border border-border bg-card">
    <p className="flex items-center gap-2 border-b border-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground"><span className="inline-block h-3 w-1 bg-primary" aria-hidden />{title}</p>
    <dl className="divide-y divide-border">{rows.map((r) => <div key={r.k} className="flex items-baseline justify-between px-3 py-1.5"><dt className="font-sans text-[12.5px] text-foreground">{r.k}</dt><dd className="flex items-baseline gap-2"><span className="font-mono text-[12px] tabular-nums text-muted-foreground">{r.v}</span><span className={`font-mono text-[11px] tabular-nums ${r.up ? "text-gain" : "text-loss"}`}>{r.c}</span></dd></div>)}</dl>
  </div>
}

export function MarketRail() {
  const { data, error, isValidating, mutate } = useSWR<MarketResponse>("/api/markets", fetcher, { refreshInterval: 60_000, revalidateOnFocus: true })
  const fallback: MarketResponse = { updatedAt: "", stale: true, indices: [], commodities: [], yields: [] }
  const market = data ?? fallback
  return <aside aria-label="Market data" className="flex flex-col">
    <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span>{market.updatedAt ? `Updated ${clockTime(market.updatedAt)}` : "Loading market data"}</span><button type="button" onClick={() => mutate()} disabled={isValidating} className="font-bold text-primary hover:underline disabled:opacity-50">{isValidating ? "Updating" : "Refresh"}</button></div>
    <Panel title="Yield Curve Update" rows={market.yields} />
    <Panel title="India First · Index Snapshot" rows={market.indices} />
    <Panel title="Commodities & FX" rows={market.commodities} />
    <p className="mt-1 text-[10.5px] leading-snug text-muted-foreground">{error || market.stale ? "Live provider unavailable or partially updated; values may be stale." : "Market levels refresh automatically every minute."}</p>
  </aside>
}
