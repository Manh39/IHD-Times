"use client"

import { useState, useEffect } from "react"

export type JargonTerm = {
  term: string
  category: "IPO" | "Markets" | "Macro" | "Corporate"
  meaning: string
  example: string
  contextTrigger?: string
}

export const JARGON_VOCABULARY: JargonTerm[] = [
  {
    term: "Anchor Book ⚓",
    category: "IPO",
    meaning: "The VIP guest list before the party opens. Big-money sovereign funds and marquee institutions lock in shares early so regular investors don't feel like they're jumping into an empty pool.",
    example: "Marquee funds fully devoured the ₹1,200 Cr anchor book, giving retail bidders instant FOMO.",
    contextTrigger: "ipo",
  },
  {
    term: "Grey Market Premium (GMP) 📈",
    category: "IPO",
    meaning: "The Dalal Street street-smart betting slip. It's the cash premium unlisted shares trade at behind closed doors before the actual stock exchange bell rings.",
    example: "The ₹65 GMP signals D-Street is betting on a massive 30% listing pop on Tuesday.",
    contextTrigger: "ipo",
  },
  {
    term: "Dead Cat Bounce 🐱",
    category: "Markets",
    meaning: "Even a dead cat will bounce if dropped from a tall skyscraper. A fake baby rally in a doomed, tanking stock designed to trap dip-buyers before plunging right back down.",
    example: "Bro thought he timed the bottom, but today's 2% green candle was just a dead cat bounce.",
    contextTrigger: "markets",
  },
  {
    term: "Circuit Breaker ⚡",
    category: "Markets",
    meaning: "Dalal Street's mandatory panic timeout. When panic selling or wild greed goes out of hand, the exchange pulls the master plug to force everyone to touch grass for 45 minutes.",
    example: "The index plunged 10% in 15 minutes, slamming the lower circuit breaker and freezing trades.",
    contextTrigger: "markets",
  },
  {
    term: "Short Squeeze 🚀",
    category: "Markets",
    meaning: "When cynical bears bet huge money a stock will crash, but surprise buyers take the wheel — forcing panic-stricken bears to buy back shares at crazy prices, sending the stock to the moon.",
    example: "D-Street bears got totally roasted in an explosive 18% short squeeze.",
    contextTrigger: "markets",
  },
  {
    term: "Repo Rate 🏦",
    category: "Macro",
    meaning: "The RBI Governor's master interest dial. When RBI tightens it, commercial bank loans get pricier and your monthly EMI screams; when they cut it, the liquidity party starts.",
    example: "RBI paused repo rate hikes, saving home loan EMIs from another painful bump this month.",
    contextTrigger: "economy",
  },
  {
    term: "Deleveraging 📉",
    category: "Corporate",
    meaning: "The corporate glow-up. Instead of flexing flashy acquisitions, the company uses its hard cash to aggressively destroy bank debt and clean up its balance sheet.",
    example: "Management spent the entire quarter deleveraging, turning the company net-debt-free.",
    contextTrigger: "companies",
  },
  {
    term: "Operating Leverage ⚙️",
    category: "Corporate",
    meaning: "The dream financial turbocharger. Once a factory's rent and salaries are paid, every single extra rupee of sales flows straight down into exploding profit margins.",
    example: "A modest 10% bump in top-line sales translated into a ferocious 40% jump in profit thanks to operating leverage.",
    contextTrigger: "companies",
  },
]

// Pick today's term based on day of year, or context
export function getDailyJargon(): JargonTerm {
  const now = new Date()
  // Generate stable index based on date string YYYY-MM-DD
  const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  let hash = 0
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i)
    hash |= 0
  }
  const index = Math.abs(hash) % JARGON_VOCABULARY.length
  return JARGON_VOCABULARY[index]
}

export function JargonWelcomeModal({
  forceOpen = false,
  onClose,
}: {
  forceOpen?: boolean
  onClose?: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const current = getDailyJargon()

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true)
      return
    }

    // Check if user has already dismissed today's 8:00 AM jargon briefing
    const todayStr = new Date().toISOString().slice(0, 10)
    const stored = localStorage.getItem("ihd_daily_jargon_dismissed")
    if (stored !== todayStr) {
      setIsOpen(true)
    }
  }, [forceOpen])

  function handleDismiss() {
    const todayStr = new Date().toISOString().slice(0, 10)
    try {
      localStorage.setItem("ihd_daily_jargon_dismissed", todayStr)
    } catch {
      // ignore in restricted iframe/incognito
    }
    setIsOpen(false)
    if (onClose) onClose()
  }

  // Handle escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        handleDismiss()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="8:00 AM Morning Market Jargon Briefing"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
      onClick={handleDismiss}
    >
      {/* 1. Deep backdrop blur covering entire newspaper */}
      <div
        className="absolute inset-0 bg-background/75 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* 2. Elevated Broadsheet Jargon Card in the center */}
      <div
        className="relative z-10 w-full max-w-md border-2 border-foreground bg-card p-6 shadow-2xl transition-transform duration-200 hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()} // Prevent card click from dismissing immediately
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b-2 border-foreground pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-primary" />
            </span>
            <span className="font-serif text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              8:00 AM Briefing · Market Jargon
            </span>
          </div>
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground">
            {current.category}
          </span>
        </div>

        {/* Word Content */}
        <div className="mt-4">
          <h3 className="font-serif text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {current.term}
          </h3>

          <div className="mt-3 border-l-2 border-primary pl-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
              The Real Scoop 💡
            </p>
            <p className="mt-1 font-sans text-[14px] leading-relaxed font-medium text-foreground">
              {current.meaning}
            </p>
          </div>

          <div className="mt-4 rounded-sm border border-border bg-muted/70 p-3 font-mono text-[12px] leading-snug text-foreground/90">
            <span className="font-bold text-primary">D-Street Context:</span> &quot;{current.example}&quot;
          </div>
        </div>

        {/* Action Button & Dismiss Note */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleDismiss}
            className="flex w-full items-center justify-center gap-2 border border-foreground bg-foreground py-2.5 font-mono text-[12.5px] font-bold uppercase tracking-wider text-background transition-opacity hover:opacity-85"
          >
            <span>Start Reading Today&apos;s Dispatch</span>
            <span aria-hidden>&rarr;</span>
          </button>
          <p className="text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Tap anywhere outside or press ESC to dismiss
          </p>
        </div>
      </div>
    </div>
  )
}
