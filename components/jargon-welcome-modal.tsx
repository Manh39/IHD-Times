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
    meaning: "A guaranteed block of IPO shares reserved for marquee institutional investors right before bidding opens to the public.",
    example: "The IPO secured strong validation after sovereign wealth funds fully backed its ₹1,200 Cr anchor book.",
    contextTrigger: "ipo",
  },
  {
    term: "Grey Market Premium (GMP) 📈",
    category: "IPO",
    meaning: "The unofficial cash premium traders bid on an unlisted IPO share before it officially rings the listing bell on NSE/BSE.",
    example: "With a ₹45 GMP over the ₹180 price band, D-Street is pricing in a 25% debut listing pop.",
    contextTrigger: "ipo",
  },
  {
    term: "Dead Cat Bounce 🐱",
    category: "Markets",
    meaning: "A temporary, deceptive rally in a sharply falling stock that gives false hope before plunging right back down.",
    example: "Don't get trapped by today's 2% bounce — with volumes this dry, it's just a classic dead cat bounce.",
    contextTrigger: "markets",
  },
  {
    term: "Circuit Breaker ⚡",
    category: "Markets",
    meaning: "An automatic exchange halt triggered when benchmark indices crash or rocket past 10%, 15%, or 20% to curb panic trading.",
    example: "NSE halted trading for 45 minutes after the lower circuit breaker was breached in morning trade.",
    contextTrigger: "markets",
  },
  {
    term: "Short Squeeze 🚀",
    category: "Markets",
    meaning: "When bears heavily bet against a stock, but surprise buying forces them to cover and buy back shares at any price, skyrocketing the chart.",
    example: "Bears scrambling to close positions caused an explosive 14% intraday short squeeze.",
    contextTrigger: "markets",
  },
  {
    term: "Repo Rate 🏦",
    category: "Macro",
    meaning: "The benchmark interest rate at which RBI lends short-term money to commercial banks — directly impacting home loan EMIs.",
    example: "RBI holding repo rates steady means home loan borrowers won't see their monthly EMIs spike this quarter.",
    contextTrigger: "economy",
  },
  {
    term: "Deleveraging 📉",
    category: "Corporate",
    meaning: "A company aggressively paying off its bank loans and debt burdens rather than reckless expansion.",
    example: "The management is using free cash flows for rapid deleveraging to turn net-debt-free by FY27.",
    contextTrigger: "companies",
  },
  {
    term: "Operating Leverage ⚙️",
    category: "Corporate",
    meaning: "When fixed costs are covered, so every additional rupee of sales flows straight down into exploding profit margins.",
    example: "Thanks to operating leverage, a 12% bump in revenue translated into a 35% surge in operating profit.",
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
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              In Plain English
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
