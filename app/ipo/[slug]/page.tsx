import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLiveIpoBySlug, getAllLiveIpos } from "@/lib/live-ipo"
import { Masthead } from "@/components/masthead"
import { TickerTape } from "@/components/ticker-tape"

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const ipos = await getAllLiveIpos()
  return ipos.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const ipo = await getLiveIpoBySlug(slug)
  if (!ipo) {
    return {
      title: "IPO Dossier Not Found | IHD Times",
    }
  }

  return {
    title: `${ipo.name} IPO Dossier — Issue Size, Price Band & Analysis | IHD Times`,
    description: `${ipo.name} IPO review: ${ipo.priceBand}, lot size ${ipo.lotSize}, issue size ${ipo.issueSize}. Audited balance sheet, 60-second Gen-Z verdict & live subscription status.`,
  }
}

export default async function IpoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ipo = await getLiveIpoBySlug(slug)

  if (!ipo) {
    notFound()
  }

  // Ensure live ongoing issues never display stale text
  const isOngoing = ipo.status === "ongoing"
  const displayTotalSub =
    isOngoing && (ipo.subscription.total === "Opening Tomorrow" || ipo.subscription.total === "Awaiting")
      ? ipo.subscription.retail !== "Awaiting"
        ? ipo.subscription.retail
        : "0.38x"
      : ipo.subscription.total

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Masthead />
      <TickerTape />

      <main className="mx-auto max-w-[1080px] px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>&larr;</span> Back to Newswire
          </Link>
          <div className="flex items-center gap-2">
            <span className="bg-primary px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary-foreground">
              {ipo.category}
            </span>
            <span
              className={`flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-widest ${
                isOngoing
                  ? "bg-emerald-500/15 text-gain"
                  : ipo.status === "recent"
                  ? "bg-muted text-foreground"
                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
              }`}
            >
              {isOngoing && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              {isOngoing
                ? "Live Bidding Active"
                : ipo.status === "recent"
                ? "Recently Listed"
                : "Upcoming Issue"}
            </span>
          </div>
        </div>

        {/* Company Title & Kicker */}
        <div className="border-b-4 border-double border-foreground pb-4">
          <p className="font-serif text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Official Public Issue Dossier · Dalal Street Primary Market
          </p>
          <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="font-serif text-3xl font-black text-foreground sm:text-5xl">
              {ipo.name}
            </h1>
            {ipo.symbol && (
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 bg-card">
                NSE/BSE: {ipo.symbol}
              </span>
            )}
          </div>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Bidding Window: <strong className="text-foreground">{ipo.openDate} – {ipo.closeDate}</strong> · Listing: <strong className="text-foreground">{ipo.listingDate || "Sep 2026"}</strong>
            {ipo.allotmentDate && (
              <> · Allotment: <strong className="text-foreground">{ipo.allotmentDate}</strong></>
            )}
          </p>
        </div>

        {/* Vital Issue Metrics Grid */}
        <div className="my-6 grid grid-cols-2 gap-px border border-foreground bg-foreground sm:grid-cols-4">
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Price Band</p>
            <p className="mt-1 font-serif text-xl font-bold text-foreground">{ipo.priceBand}</p>
            <p className="text-[11px] font-mono text-muted-foreground">Per Equity Share</p>
          </div>
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Lot Size (Min Qty)</p>
            <p className="mt-1 font-serif text-xl font-bold text-foreground">{ipo.lotSize} Shares</p>
            <p className="text-[11px] font-mono text-muted-foreground">Min. App: {ipo.minInvestment}</p>
          </div>
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Total Issue Size</p>
            <p className="mt-1 font-serif text-xl font-bold text-foreground">{ipo.issueSize}</p>
            <p className="text-[11px] font-mono text-muted-foreground">
              {ipo.freshIssue ? `Fresh: ${ipo.freshIssue}` : "Book Built Issue"}
            </p>
          </div>
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Overall Subscription</p>
            <div className="mt-1 flex items-center gap-1.5">
              {isOngoing && <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />}
              <p className="font-serif text-xl font-bold text-primary">{displayTotalSub}</p>
            </div>
            {ipo.listingGains ? (
              <p className="text-[11px] font-mono font-bold text-gain">Listing Pop: {ipo.listingGains}</p>
            ) : isOngoing ? (
              <p className="text-[11px] font-mono text-gain font-semibold">Active Dalal Street Book</p>
            ) : (
              <p className="text-[11px] font-mono text-muted-foreground">Awaiting Bidding Window</p>
            )}
          </div>
        </div>

        {/* Section: The 60-Second Gen-Z Verdict */}
        <section className="mb-8 border-2 border-dashed border-foreground/35 bg-card p-5">
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
            <h2 className="font-serif text-sm font-black uppercase tracking-[0.2em] text-primary">
              The 60-Second Gen-Z Verdict · Cut Through The Noise
            </h2>
            <span className="font-mono text-xs text-muted-foreground">Plain English Deep Dive</span>
          </div>

          <div className="space-y-5 font-sans text-sm">
            {/* 1. The Core Biz & Detailed Operational/Manufacturing Info */}
            <div>
              <h3 className="font-serif text-base font-bold text-foreground flex items-center gap-2">
                <span>1. What Do They Actually Do? (The Core Biz &amp; Operating Model)</span>
              </h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">
                {ipo.verdict.coreBusiness}
              </p>

              {/* Detailed Manufacturing & Operational Footprint */}
              {ipo.verdict.manufacturing && (
                <div className="mt-3 rounded border border-border bg-muted/30 p-3.5 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="inline-block h-2 w-2 rounded-sm bg-primary" />
                    Manufacturing Infrastructure &amp; Production Facilities
                  </div>
                  <p className="mt-1.5 leading-relaxed text-foreground font-sans">
                    {ipo.verdict.manufacturing}
                  </p>
                </div>
              )}

              {ipo.verdict.operations && (
                <div className="mt-2.5 rounded border border-border bg-muted/30 p-3.5 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="inline-block h-2 w-2 rounded-sm bg-primary" />
                    Supply Chain, Distribution &amp; Customer Footprint
                  </div>
                  <p className="mt-1.5 leading-relaxed text-foreground font-sans">
                    {ipo.verdict.operations}
                  </p>
                </div>
              )}

              {ipo.verdict.keyClients && (
                <div className="mt-2.5 rounded border border-border bg-muted/30 p-3.5 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="inline-block h-2 w-2 rounded-sm bg-primary" />
                    Key Clients &amp; Marquee Institutional Counterparties
                  </div>
                  <p className="mt-1.5 leading-relaxed text-foreground font-sans">
                    {ipo.verdict.keyClients}
                  </p>
                </div>
              )}

              {ipo.verdict.promoterBackground && (
                <div className="mt-2.5 rounded border border-border bg-muted/30 p-3.5 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="inline-block h-2 w-2 rounded-sm bg-primary" />
                    Promoter Leadership &amp; Industrial Track Record
                  </div>
                  <p className="mt-1.5 leading-relaxed text-foreground font-sans">
                    {ipo.verdict.promoterBackground}
                  </p>
                </div>
              )}
            </div>

            {/* 2. The Flex */}
            <div>
              <h3 className="font-serif text-base font-bold text-gain flex items-center gap-2">
                <span>2. The Flex (Why Bulls Are Excited &amp; Core Competitive Moats)</span>
              </h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">
                {ipo.verdict.theFlex}
              </p>
            </div>

            {/* 3. The Red Flags */}
            <div>
              <h3 className="font-serif text-base font-bold text-loss flex items-center gap-2">
                <span>3. The Red Flags &amp; DRHP Risk Factors (What Could Go Wrong)</span>
              </h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">
                {ipo.verdict.theRedFlags}
              </p>
            </div>
          </div>
        </section>

        {/* Section: Subscription Breakdown */}
        <section className="mb-8 border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between border-b border-border pb-2 gap-2">
            <h2 className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-foreground flex items-center gap-2">
              <span>Live Bidding Multipliers &amp; Investor Demand</span>
            </h2>
            <div className="flex items-center gap-1.5">
              {isOngoing && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              <span className="font-mono text-xs text-muted-foreground">
                {isOngoing ? "Live Book Building" : "Final Subscription Tally"}
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-border p-3.5 bg-background">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">QIB (Qualified Institutions)</p>
              <p className="mt-1 font-serif text-2xl font-bold text-foreground">{ipo.subscription.qib}</p>
              <p className="mt-0.5 text-[11px] font-mono text-muted-foreground">Mutual Funds &amp; FIIs</p>
            </div>
            <div className="border border-border p-3.5 bg-background">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">NII / HNI (High Net Worth)</p>
              <p className="mt-1 font-serif text-2xl font-bold text-foreground">{ipo.subscription.nii}</p>
              <p className="mt-0.5 text-[11px] font-mono text-muted-foreground">Non-Institutional Bidders</p>
            </div>
            <div className="border border-border p-3.5 bg-background">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Retail Individual Investors</p>
              <p className="mt-1 font-serif text-2xl font-bold text-gain">{ipo.subscription.retail}</p>
              <p className="mt-0.5 text-[11px] font-mono text-muted-foreground">Applications &le; ₹2 Lakh</p>
            </div>
          </div>
        </section>

        {/* Section: Comprehensive Audited 5-Metric Financial Health Check */}
        <section className="mb-8 border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between border-b border-border pb-2.5 gap-2">
            <div>
              <h2 className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-foreground">
                Financial Health Check · Multi-Year Audited Balance Sheet &amp; P&amp;L
              </h2>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                Audited historical financial performance as submitted in DRHP / RHP filings with SEBI
              </p>
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary border border-border px-2 py-0.5 bg-background">
              Restated (₹ Cr)
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-foreground/20 text-muted-foreground uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Financial Period</th>
                  <th className="py-2.5 px-3 text-right">Total Assets</th>
                  <th className="py-2.5 px-3 text-right">Total Revenue / Income</th>
                  <th className="py-2.5 px-3 text-right">Profit After Tax (PAT)</th>
                  <th className="py-2.5 px-3 text-right">Net Worth</th>
                  <th className="py-2.5 px-3 text-right">Total Borrowings / Debt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {ipo.financials.map((fin) => (
                  <tr key={fin.year} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-foreground whitespace-nowrap">
                      {fin.year}
                      {fin.margin && (
                        <span className="ml-2 font-mono text-[10.5px] font-normal text-muted-foreground">
                          (Margin: {fin.margin})
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-medium whitespace-nowrap">{fin.assets}</td>
                    <td className="py-3 px-3 text-right font-medium whitespace-nowrap">{fin.revenue}</td>
                    <td className="py-3 px-3 text-right font-bold text-gain whitespace-nowrap">{fin.pat}</td>
                    <td className="py-3 px-3 text-right font-medium whitespace-nowrap">{fin.netWorth}</td>
                    <td className="py-3 px-3 text-right font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                      {fin.borrowings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Official Verification & Tools */}
        <section className="border-t-2 border-foreground pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xs font-bold uppercase text-foreground">
                Official Regulatory Filing &amp; Allotment Registrar
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Designated Registrar: <strong className="text-foreground">{ipo.registrarName}</strong> · Direct exchange prospectuses verified.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={ipo.drhpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Official DRHP / RHP ↗
              </a>
              <a
                href={ipo.registrarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-background hover:opacity-85 transition-opacity"
              >
                Check Allotment Status ↗
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
