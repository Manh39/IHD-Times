import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getIpoBySlug, getAllIpos } from "@/lib/ipo-data"
import { Masthead } from "@/components/masthead"
import { TickerTape } from "@/components/ticker-tape"

export async function generateStaticParams() {
  const ipos = getAllIpos()
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
  const ipo = getIpoBySlug(slug)
  if (!ipo) {
    return {
      title: "IPO Dossier Not Found | IHD Times",
    }
  }

  return {
    title: `${ipo.name} IPO Dossier — Issue Size, Price Band & Analysis | IHD Times`,
    description: `${ipo.name} IPO review: ${ipo.priceBand}, lot size ${ipo.lotSize}, issue size ${ipo.issueSize}. 60-second Gen-Z verdict, live subscription & financials.`,
  }
}

export default async function IpoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ipo = getIpoBySlug(slug)

  if (!ipo) {
    notFound()
  }

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
            <span className="bg-primary px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary-foreground">
              {ipo.category}
            </span>
            <span
              className={`px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-widest ${
                ipo.status === "ongoing"
                  ? "bg-emerald-500/15 text-gain"
                  : ipo.status === "recent"
                  ? "bg-muted text-foreground"
                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
              }`}
            >
              {ipo.status === "ongoing"
                ? "Live Bidding"
                : ipo.status === "recent"
                ? "Recently Listed"
                : "Upcoming Issue"}
            </span>
          </div>
        </div>

        {/* Company Title & Kicker */}
        <div className="border-b-4 border-double border-foreground pb-4">
          <p className="font-serif text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Official Public Issue Dossier · Dalal Street
          </p>
          <h1 className="mt-1 font-serif text-3xl font-black text-foreground sm:text-5xl">
            {ipo.name}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Bidding Window: <strong className="text-foreground">{ipo.openDate} – {ipo.closeDate}</strong> · Listing: <strong className="text-foreground">{ipo.listingDate}</strong>
          </p>
        </div>

        {/* Vital Issue Metrics Grid */}
        <div className="my-6 grid grid-cols-2 gap-px border border-foreground bg-foreground sm:grid-cols-4">
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Price Band</p>
            <p className="mt-1 font-serif text-xl font-bold text-foreground">{ipo.priceBand}</p>
          </div>
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Lot Size (Min Qty)</p>
            <p className="mt-1 font-serif text-xl font-bold text-foreground">{ipo.lotSize} Shares</p>
            <p className="text-[11px] font-mono text-muted-foreground">Min. {ipo.minInvestment}</p>
          </div>
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Total Issue Size</p>
            <p className="mt-1 font-serif text-xl font-bold text-foreground">{ipo.issueSize}</p>
            <p className="text-[11px] font-mono text-muted-foreground">Fresh: {ipo.freshIssue}</p>
          </div>
          <div className="bg-background p-4">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Overall Subscription</p>
            <p className="mt-1 font-serif text-xl font-bold text-primary">{ipo.subscription.total}</p>
            {ipo.listingGains && (
              <p className="text-[11px] font-mono font-bold text-gain">Listing Pop: {ipo.listingGains}</p>
            )}
          </div>
        </div>

        {/* Section: The 60-Second Gen-Z Verdict */}
        <section className="mb-8 border-2 border-dashed border-foreground/35 bg-card p-5">
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
            <h2 className="font-serif text-sm font-black uppercase tracking-[0.2em] text-primary">
              The 60-Second Gen-Z Verdict · Cut Through The Noise
            </h2>
            <span className="font-mono text-xs text-muted-foreground">Plain English Analysis</span>
          </div>

          <div className="space-y-4 font-sans text-sm">
            <div>
              <h3 className="font-serif text-base font-bold text-foreground">
                1. What Do They Actually Do? (The Core Biz)
              </h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                {ipo.verdict.coreBusiness}
              </p>
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-gain">
                2. The Flex (Why Bulls Are Excited)
              </h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                {ipo.verdict.theFlex}
              </p>
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-loss">
                3. The Red Flags &amp; DRHP Risks (What Could Go Wrong)
              </h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                {ipo.verdict.theRedFlags}
              </p>
            </div>
          </div>
        </section>

        {/* Section: Subscription Breakdown */}
        <section className="mb-8 border border-border bg-card p-5">
          <h2 className="border-b border-border pb-2 font-serif text-sm font-bold uppercase tracking-[0.18em] text-foreground">
            Live Bidding Multipliers &amp; Investor Demand
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-border p-3">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">QIB (Institutions)</p>
              <p className="mt-1 font-serif text-2xl font-bold text-foreground">{ipo.subscription.qib}</p>
            </div>
            <div className="border border-border p-3">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">NII / HNI (High Net Worth)</p>
              <p className="mt-1 font-serif text-2xl font-bold text-foreground">{ipo.subscription.nii}</p>
            </div>
            <div className="border border-border p-3">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Retail (Regular Traders)</p>
              <p className="mt-1 font-serif text-2xl font-bold text-foreground">{ipo.subscription.retail}</p>
            </div>
          </div>
        </section>

        {/* Section: 3-Year Audited Financial Trend */}
        <section className="mb-8 border border-border bg-card p-5">
          <h2 className="border-b border-border pb-2 font-serif text-sm font-bold uppercase tracking-[0.18em] text-foreground">
            Financial Health Check · 3-Year Audited Trend
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2">Financial Period</th>
                  <th className="py-2">Consolidated Revenue</th>
                  <th className="py-2">Net Profit (PAT)</th>
                  <th className="py-2">Profit Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {ipo.financials.map((fin) => (
                  <tr key={fin.year}>
                    <td className="py-2.5 font-bold">{fin.year}</td>
                    <td className="py-2.5">{fin.revenue}</td>
                    <td className="py-2.5">{fin.pat}</td>
                    <td className="py-2.5 font-bold text-primary">{fin.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Official Verification & Tools */}
        <section className="border-t-2 border-foreground pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xs font-bold uppercase text-foreground">Official Registrar &amp; Filing</p>
              <p className="text-xs font-mono text-muted-foreground">
                Registrar: {ipo.registrarName} · Allotment verification managed officially.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={ipo.drhpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
              >
                Official DRHP / RHP ↗
              </a>
              <a
                href={ipo.registrarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-background hover:opacity-85"
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
