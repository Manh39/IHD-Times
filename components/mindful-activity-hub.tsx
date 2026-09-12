"use client"

import { SudokuBoardGame } from "@/components/daily-sudoku"

type PlannedActivity = {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  status: "live" | "coming_soon"
  badge: string
}

const UPCOMING_ACTIVITIES: PlannedActivity[] = [
  {
    id: "crossword",
    title: "The Financial Crossword",
    subtitle: "5x5 Daily Mini & 15x15 Weekend Edition",
    category: "Vocabulary & Lore",
    description:
      "Bite-sized crossword puzzles with clever clues across Dalal Street history, macroeconomic indicators, SEBI regulations, and iconic mergers.",
    status: "coming_soon",
    badge: "In Prototyping",
  },
  {
    id: "termle",
    title: "Market Termle (Finance Wordle)",
    subtitle: "Daily 5-Letter Financial Word Guess",
    category: "Word Puzzle",
    description:
      "Guess the 5-letter market term in 6 tries (e.g., BULLS, YIELD, HEDGE, RALLY). Clean color-coded feedback to test your market vocabulary.",
    status: "coming_soon",
    badge: "Next Drop",
  },
  {
    id: "valuation-riddle",
    title: "The 60-Second Valuation Riddle",
    subtitle: "Guess the Mystery Indian Enterprise",
    category: "Fundamental Analysis",
    description:
      "Review 3 real anonymized balance sheet metrics (P/E ratio, 3-year revenue CAGR, core product) and deduce which Dalal Street titan it is.",
    status: "coming_soon",
    badge: "Concept Design",
  },
  {
    id: "pre-bell-breath",
    title: "Pre-Bell Focus & Zen Breathing",
    subtitle: "60-Second Mindful Market Pacer",
    category: "Mental Clarity",
    description:
      "An interactive visual breathing pacer designed for traders and investors to center focus and prevent impulsive panic trading before the 9:15 AM opening bell.",
    status: "coming_soon",
    badge: "Wellness",
  },
  {
    id: "market-trivia",
    title: "Dalal Street Archive Trivia",
    subtitle: "3 Daily Curiosity Questions",
    category: "Financial History",
    description:
      "Fast, fascinating trivia about landmark Indian market milestones, currency devaluations, the 1992 Harshad Mehta probe, and the dot-com era.",
    status: "coming_soon",
    badge: "Community Favorite",
  },
]

export function MindfulActivityHub() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Hub Masthead Header */}
      <div className="border-b-2 border-foreground pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-serif text-[11px] font-black uppercase tracking-[0.25em] text-primary">
            Broadsheet Leisure &amp; Mindful Games
          </span>
          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[10.5px] font-bold text-primary uppercase">
            Mental Gym for Investors
          </span>
        </div>
        <h1 className="mt-1 font-serif text-3xl font-black text-foreground sm:text-4xl">
          Mindful Activity Lounge
        </h1>
        <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-muted-foreground max-w-3xl">
          Take a breather from volatile tickers and breaking headlines. Sharpen your analytical instincts with daily broadsheet games, logic puzzles, and mindful cognitive resets.
        </p>
      </div>

      {/* 2. Featured Game: Interactive Morning Coffee Sudoku */}
      <div className="border-2 border-foreground bg-card p-6 shadow-sm">
        <SudokuBoardGame />
      </div>

      {/* 3. Suggestions & Expansion Roadmap Suite */}
      <div>
        <div className="mb-4 flex items-center justify-between border-b-2 border-foreground pb-2">
          <div>
            <h2 className="font-serif text-lg font-black uppercase tracking-wider text-foreground">
              Future Mindful Activities · In Development
            </h2>
            <p className="text-xs text-muted-foreground font-sans">
              Curated mental fitness games tailored specifically for modern market readers.
            </p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Suggest an Activity ✉️
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {UPCOMING_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col justify-between border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/40 hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                    {activity.category}
                  </span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-muted-foreground">
                    {activity.badge}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-bold text-foreground">
                  {activity.title}
                </h3>
                <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
                  {activity.subtitle}
                </p>
                <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Coming in Next Release
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
