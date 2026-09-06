"use client"

import { CATEGORIES } from "@/lib/news"

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string
  onChange: (id: string) => void
}) {
  return (
    <nav aria-label="News categories" className="border-y border-border bg-background">
      <ul className="mx-auto flex max-w-[1280px] items-center gap-0 overflow-x-auto px-4">
        {CATEGORIES.map((cat, i) => {
          const selected = cat.id === active
          return (
            <li key={cat.id} className="flex items-center">
              {i > 0 && <span className="h-3 w-px bg-border" aria-hidden />}
              <button
                type="button"
                onClick={() => onChange(cat.id)}
                aria-current={selected ? "true" : undefined}
                className={`whitespace-nowrap px-3.5 py-2.5 font-sans text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                  selected
                    ? "bg-foreground text-background"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
