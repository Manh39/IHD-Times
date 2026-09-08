"use client"

import { useState, useEffect } from "react"

// Deterministic daily seeded puzzle generator (Medium difficulty)
// Resets every morning at 6:00 AM local time
function getDailyPuzzleSeed(): { puzzle: number[][]; solution: number[][] } {
  // Classic valid base Sudoku boards
  const baseBoards = [
    {
      puzzle: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
      ],
      solution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ],
    },
    {
      puzzle: [
        [0, 0, 0, 2, 6, 0, 7, 0, 1],
        [6, 8, 0, 0, 7, 0, 0, 9, 0],
        [1, 9, 0, 0, 0, 4, 5, 0, 0],
        [8, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 0, 4, 6, 0, 2, 9, 0, 0],
        [0, 5, 0, 0, 0, 3, 0, 2, 8],
        [0, 0, 9, 3, 0, 0, 0, 7, 4],
        [0, 4, 0, 0, 5, 0, 0, 3, 6],
        [7, 0, 3, 0, 1, 8, 0, 0, 0],
      ],
      solution: [
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9],
      ],
    },
  ]

  // Calculate day index based on 6:00 AM cutoff
  const now = new Date()
  const adjusted = new Date(now.getTime() - 6 * 60 * 60 * 1000)
  const dayOfYear = Math.floor(
    (adjusted.getTime() - new Date(adjusted.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const index = Math.abs(dayOfYear) % baseBoards.length
  return baseBoards[index]
}

export function DailySudokuModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [board, setBoard] = useState<number[][]>([])
  const [initialMask, setInitialMask] = useState<boolean[][]>([])
  const [solution, setSolution] = useState<number[][]>([])
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [timer, setTimer] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [notesMode, setNotesMode] = useState(false)
  const [notes, setNotes] = useState<Record<string, number[]>>({})

  // Initialize daily puzzle
  useEffect(() => {
    if (!isOpen) return
    const { puzzle, solution: sol } = getDailyPuzzleSeed()
    setBoard(puzzle.map((row) => [...row]))
    setInitialMask(puzzle.map((row) => row.map((val) => val !== 0)))
    setSolution(sol)
    setSelectedCell([0, 0])
    setIsWon(false)
    setNotes({})
  }, [isOpen])

  // Timer
  useEffect(() => {
    if (!isOpen || isWon) return
    const interval = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [isOpen, isWon])

  // Handle number input
  function handleNumberInput(num: number) {
    if (!selectedCell || isWon) return
    const [r, c] = selectedCell
    if (initialMask[r]?.[c]) return // Can't edit initial clues

    if (notesMode) {
      const key = `${r}-${c}`
      setNotes((prev) => {
        const curr = prev[key] ?? []
        const next = curr.includes(num) ? curr.filter((n) => n !== num) : [...curr, num].sort()
        return { ...prev, [key]: next }
      })
      return
    }

    const next = board.map((row) => [...row])
    next[r][c] = next[r][c] === num ? 0 : num
    setBoard(next)

    // Check win condition
    if (next[r][c] !== 0) {
      let won = true
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (next[i][j] !== solution[i]?.[j]) {
            won = false
            break
          }
        }
      }
      if (won) setIsWon(true)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key >= "1" && e.key <= "9") {
        handleNumberInput(parseInt(e.key, 10))
      } else if (e.key === "Backspace" || e.key === "Delete") {
        if (!selectedCell) return
        const [r, c] = selectedCell
        if (initialMask[r]?.[c]) return
        const next = board.map((row) => [...row])
        next[r][c] = 0
        setBoard(next)
      } else if (e.key === "ArrowUp") {
        setSelectedCell(([r, c]) => [Math.max(0, r - 1), c])
      } else if (e.key === "ArrowDown") {
        setSelectedCell(([r, c]) => [Math.min(8, r + 1), c])
      } else if (e.key === "ArrowLeft") {
        setSelectedCell(([r, c]) => [r, Math.max(0, c - 1)])
      } else if (e.key === "ArrowRight") {
        setSelectedCell(([r, c]) => [r, Math.min(8, c + 1)])
      } else if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedCell, board, initialMask, solution, notesMode, isWon])

  if (!isOpen) return null

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[540px] border-4 border-double border-foreground bg-background p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 border border-foreground px-2 py-0.5 font-mono text-[12px] font-bold uppercase hover:bg-foreground hover:text-background"
        >
          ✕ Close
        </button>

        {/* Header */}
        <div className="border-b-2 border-foreground pb-3 text-center">
          <p className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            The Daily Broadsheet Edition
          </p>
          <h3 className="font-serif text-2xl font-black text-foreground sm:text-3xl">
            Morning Coffee Sudoku
          </h3>
          <div className="mt-1 flex items-center justify-center gap-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>Daily 6:00 AM Issue</span>
            <span>·</span>
            <span>Difficulty: Medium</span>
            <span>·</span>
            <span className="font-bold text-foreground">Time: {formatTimer(timer)}</span>
          </div>
        </div>

        {/* Victory Notification */}
        {isWon && (
          <div className="my-3 border-2 border-emerald-500 bg-emerald-500/15 p-3 text-center">
            <p className="font-serif text-lg font-bold text-emerald-600 dark:text-emerald-400">
              🎉 Brilliant! Daily Puzzle Solved!
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              You cracked today&apos;s morning grid in {formatTimer(timer)}. Next puzzle arrives tomorrow at 6:00 AM IST.
            </p>
          </div>
        )}

        {/* 9x9 Sudoku Grid */}
        <div className="mx-auto my-4 grid aspect-square max-w-[380px] grid-cols-9 border-2 border-foreground bg-foreground">
          {board.map((row, rIdx) =>
            row.map((val, cIdx) => {
              const isSelected = selectedCell?.[0] === rIdx && selectedCell?.[1] === cIdx
              const isInitial = initialMask[rIdx]?.[cIdx]
              const cellNotes = notes[`${rIdx}-${cIdx}`] ?? []

              // Thick 3x3 block borders
              const borderRight = (cIdx + 1) % 3 === 0 && cIdx !== 8 ? "border-r-2 border-r-foreground" : "border-r border-border"
              const borderBottom = (rIdx + 1) % 3 === 0 && rIdx !== 8 ? "border-b-2 border-b-foreground" : "border-b border-border"

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  type="button"
                  onClick={() => setSelectedCell([rIdx, cIdx])}
                  className={`relative flex items-center justify-center font-serif text-base font-bold transition-colors sm:text-lg ${borderRight} ${borderBottom} ${
                    isSelected
                      ? "bg-primary/25 text-foreground"
                      : isInitial
                      ? "bg-secondary/70 text-foreground font-black"
                      : "bg-background text-primary hover:bg-muted"
                  }`}
                >
                  {val !== 0 ? (
                    val
                  ) : cellNotes.length > 0 ? (
                    <div className="grid grid-cols-3 gap-0.5 text-[8px] font-mono leading-none text-muted-foreground">
                      {cellNotes.map((n) => (
                        <span key={n}>{n}</span>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Controls & Numpad */}
        <div className="mt-4 flex flex-col gap-3">
          <div className="grid grid-cols-9 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleNumberInput(num)}
                className="border border-foreground py-2 font-serif text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 text-xs">
            <button
              type="button"
              onClick={() => setNotesMode(!notesMode)}
              className={`border border-foreground px-3 py-1.5 font-mono uppercase tracking-wider transition-colors ${
                notesMode ? "bg-foreground text-background font-bold" : "text-foreground hover:bg-muted"
              }`}
            >
              ✎ Notes: {notesMode ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={() => {
                if (!selectedCell) return
                const [r, c] = selectedCell
                if (initialMask[r]?.[c]) return
                const next = board.map((row) => [...row])
                next[r][c] = 0
                setBoard(next)
              }}
              className="border border-foreground px-3 py-1.5 font-mono uppercase tracking-wider text-foreground hover:bg-muted"
            >
              ⌫ Erase
            </button>

            <button
              type="button"
              onClick={() => {
                const { puzzle } = getDailyPuzzleSeed()
                setBoard(puzzle.map((row) => [...row]))
                setIsWon(false)
                setNotes({})
              }}
              className="border border-foreground px-3 py-1.5 font-mono uppercase tracking-wider text-foreground hover:bg-muted"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}