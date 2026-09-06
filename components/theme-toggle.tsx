"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // Read from localStorage (not DOM class) — the DOM class may not yet reflect
    // the user's choice because Next.js always SSRs without the stored preference.
    try {
      setDark(localStorage.getItem("ihd-theme") === "dark")
    } catch {
      setDark(false)
    }
  }, [])

  function toggleTheme() {
    const nextDark = !dark
    document.documentElement.classList.toggle("dark", nextDark)
    document.documentElement.classList.toggle("light", !nextDark)
    try {
      localStorage.setItem("ihd-theme", nextDark ? "dark" : "light")
    } catch {}
    setDark(nextDark)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center gap-2 border border-border px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {dark ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  )
}
