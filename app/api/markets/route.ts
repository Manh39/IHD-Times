import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type Quote = { k: string; v: string; c: string; up: boolean }

const symbols = [
  ["NIFTY 50", "^NSEI"], ["SENSEX", "^BSESN"], ["BANK NIFTY", "^NSEBANK"],
  ["S&P 500", "^GSPC"], ["Nasdaq", "^IXIC"], ["Dow Jones", "^DJI"],
  ["Gold", "GC=F"], ["Brent Crude", "BZ=F"], ["USD / INR", "INR=X"],
  ["US 10Y Treasury", "^TNX"], ["India 10Y G-Sec", "IN10YT=RR"],
] as const

async function quote(label: string, symbol: string): Promise<Quote> {
  const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1m`, { cache: "no-store" })
  if (!res.ok) throw new Error("Market provider unavailable")
  const json = await res.json()
  const meta = json.chart?.result?.[0]?.meta
  const price = Number(meta?.regularMarketPrice)
  const previous = Number(meta?.previousClose ?? meta?.chartPreviousClose)
  const change = previous ? ((price - previous) / previous) * 100 : 0
  return { k: label, v: Number.isFinite(price) ? price.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : "—", c: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`, up: change >= 0 }
}

export async function GET() {
  const results = await Promise.allSettled(symbols.map(([label, symbol]) => quote(label, symbol)))
  const rows = results.flatMap((result) => result.status === "fulfilled" ? [result.value] : [])
  const indexNames = new Set(["NIFTY 50", "SENSEX", "BANK NIFTY", "S&P 500", "Nasdaq", "Dow Jones"])
  const yieldNames = new Set(["US 10Y Treasury", "India 10Y G-Sec"])
  // Yield values from Yahoo Finance are already in % (e.g. 4.284 = 4.284%), so append the % sign.
  const yieldRows = rows
    .filter((row) => yieldNames.has(row.k))
    .map((row) => ({ ...row, v: row.v === "—" ? "—" : `${row.v}%` }))
  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    stale: rows.length !== symbols.length,
    indices: rows.filter((row) => indexNames.has(row.k)),
    commodities: rows.filter((row) => !indexNames.has(row.k) && !yieldNames.has(row.k)),
    yields: yieldRows,
  }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } })
}
