"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

// Classic valid base Sudoku boards
const BASE_BOARDS = [
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

export function getDailyPuzzleSeed(): { puzzle: number[][]; solution: number[][] } {
  const now = new Date()
  const adjusted = new Date(now.getTime() - 6 * 60 * 60 * 1000)
  const dayOfYear = Math.floor(
    (adjusted.getTime() - new Date(adjusted.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const index = Math.abs(dayOfYear) % BASE_BOARDS.length
  return BASE_BOARDS[index]
}

export function SudokuBoardGame({
  isModal = false,
  onClose,
}: {
  isModal?: boolean
  onClose?: () => void
}) {
  const [board, setBoard] = useState<number[][]>([])
  const [initialMask, setInitialMask] = useState<boolean[][]>([])
  const [solution, setSolution] = useState<number[][]>([])
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>([0, 0])
  const [history, setHistory] = useState<number[][][]>([])
  const [timer, setTimer] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [notesMode, setNotesMode] = useState(false)
  const [notes, setNotes] = useState<Record<string, number[]>>({})

  // Initialize daily puzzle
  useEffect(() => {
    const { puzzle, solution: sol } = getDailyPuzzleSeed()
    setBoard(puzzle.map((row) => [...row]))
    setInitialMask(puzzle.map((row) => row.map((val) => val !== 0)))
    setSolution(sol)
    setSelectedCell([0, 0])
    setIsWon(false)
    setNotes({})
    setHistory([])
    setTimer(0)
  }, [])

  // Live timer
  useEffect(() => {
    if (isWon) return
    const interval = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [isWon])

  // Get current selected value
  const selectedValue = useMemo(() => {
    if (!selectedCell || !board.length) return null
    const val = board[selectedCell[0]]?.[selectedCell[1]]
    return val !== 0 ? val : null
  }, [selectedCell, board])

  // Check conflicts in real time (duplicate numbers in same row, column, or 3x3 box)
  const conflicts = useMemo(() => {
    const set = new Set<string>()
    if (!board.length) return set

    // Check rows & cols
    for (let i = 0; i < 9; i++) {
      const rowVals = new Map<number, number[]>()
      const colVals = new Map<number, number[]>()

      for (let j = 0; j < 9; j++) {
        const rVal = board[i][j]
        if (rVal !== 0) {
          if (!rowVals.has(rVal)) rowVals.set(rVal, [])
          rowVals.get(rVal)!.push(j)
        }

        const cVal = board[j][i]
        if (cVal !== 0) {
          if (!colVals.has(cVal)) colVals.set(cVal, [])
          colVals.get(cVal)!.push(j)
        }
      }

      for (const [, cols] of rowVals.entries()) {
        if (cols.length > 1) {
          cols.forEach((c) => set.add(`${i}-${c}`))
        }
      }

      for (const [, rows] of colVals.entries()) {
        if (rows.length > 1) {
          rows.forEach((r) => set.add(`${r}-${i}`))
        }
      }
    }

    // Check 3x3 boxes
    for (let boxR = 0; boxR < 3; boxR++) {
      for (let boxC = 0; boxC < 3; boxC++) {
        const boxVals = new Map<number, [number, number][]>()
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const actualR = boxR * 3 + r
            const actualC = boxC * 3 + c
            const val = board[actualR][actualC]
            if (val !== 0) {
              if (!boxVals.has(val)) boxVals.set(val, [])
              boxVals.get(val)!.push([actualR, actualC])
            }
          }
        }
        for (const [, coords] of boxVals.entries()) {
          if (coords.length > 1) {
            coords.forEach(([r, c]) => set.add(`${r}-${c}`))
          }
        }
      }
    }

    return set
  }, [board])

  // Handle number entry
  const handleNumberInput = useCallback(
    (num: number) => {
      if (!selectedCell || isWon) return
      const [r, c] = selectedCell
      if (initialMask[r]?.[c]) return

      if (notesMode) {
        const key = `${r}-${c}`
        setNotes((prev) => {
          const curr = prev[key] ?? []
          const next = curr.includes(num) ? curr.filter((n) => n !== num) : [...curr, num].sort()
          return { ...prev, [key]: next }
        })
        return
      }

      setHistory((prev) => [...prev, board.map((row) => [...row])])

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
    },
    [selectedCell, isWon, initialMask, notesMode, board, solution]
  )

  // Erase current cell
  const handleErase = useCallback(() => {
    if (!selectedCell || isWon) return
    const [r, c] = selectedCell
    if (initialMask[r]?.[c]) return

    setHistory((prev) => [...prev, board.map((row) => [...row])])
    const next = board.map((row) => [...row])
    next[r][c] = 0
    setBoard(next)

    // Clear notes for this cell too
    setNotes((prev) => {
      const copy = { ...prev }
      delete copy[`${r}-${c}`]
      return copy
    })
  }, [selectedCell, isWon, initialMask, board])

  // Undo move
  const handleUndo = useCallback(() => {
    if (!history.length || isWon) return
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setBoard(prev)
  }, [history, isWon])

  // Hint (reveals current selected cell logically)
  const handleHint = useCallback(() => {
    if (!selectedCell || isWon) return
    const [r, c] = selectedCell
    if (initialMask[r]?.[c]) return
    const correctVal = solution[r]?.[c]
    if (correctVal) {
      handleNumberInput(correctVal)
    }
  }, [selectedCell, isWon, initialMask, solution, handleNumberInput])

  // Comprehensive Keyboard Navigation (WASD, HJKL, Arrows, 1-9, Numpad, N, U, Backspace)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't intercept if user is typing in a text field
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return
      }

      const key = e.key

      // Number keys (1–9 and numpad)
      if (/^[1-9]$/.test(key)) {
        e.preventDefault()
        handleNumberInput(parseInt(key, 10))
        return
      }

      // Action keys
      if (key === "Backspace" || key === "Delete" || key === "0") {
        e.preventDefault()
        handleErase()
        return
      }

      // Notes toggle (N key)
      if (key === "n" || key === "N") {
        e.preventDefault()
        setNotesMode((prev) => !prev)
        return
      }

      // Undo (U key or Ctrl+Z)
      if (key === "u" || key === "U" || (e.ctrlKey && key === "z")) {
        e.preventDefault()
        handleUndo()
        return
      }

      // Hint (H key)
      if (key === "h" || key === "H") {
        e.preventDefault()
        handleHint()
        return
      }

      // Close modal on Escape
      if (key === "Escape" && onClose) {
        e.preventDefault()
        onClose()
        return
      }

      // Directional navigation: Arrows, WASD, and Vim (HJKL)
      if (
        [
          "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
          "w", "W", "s", "S", "a", "A", "d", "D",
          "k", "K", "j", "J", "h", "H", "l", "L",
        ].includes(key)
      ) {
        e.preventDefault()
        setSelectedCell((prev) => {
          const [r, c] = prev ?? [0, 0]
          switch (key) {
            case "ArrowUp":
            case "w":
            case "W":
            case "k":
            case "K":
              return [Math.max(0, r - 1), c]
            case "ArrowDown":
            case "s":
            case "S":
            case "j":
            case "J":
              return [Math.min(8, r + 1), c]
            case "ArrowLeft":
            case "a":
            case "A":
            case "h":
            case "H":
              return [r, Math.max(0, c - 1)]
            case "ArrowRight":
            case "d":
            case "D":
            case "l":
            case "L":
              return [r, Math.min(8, c + 1)]
            default:
              return [r, c]
          }
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNumberInput, handleErase, handleUndo, handleHint, onClose])

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full max-w-[540px] mx-auto">
      {/* Broadsheet Game Card Header */}
      <div className="border-b-2 border-foreground pb-3 text-center">
        <div className="flex items-center justify-between">
          <span className="font-serif text-[10.5px] font-black uppercase tracking-[0.22em] text-primary">
            The Daily Broadsheet Edition
          </span>
          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary uppercase">
            6:00 AM IST Drop
          </span>
        </div>
        <h3 className="mt-1 font-serif text-2xl font-black text-foreground sm:text-3xl">
          Morning Coffee Sudoku
        </h3>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>Difficulty: Medium</span>
          <span>·</span>
          <span className="font-bold text-foreground">Time: {formatTimer(timer)}</span>
          <span>·</span>
          <span>Keyboard: WASD / Arrows / 1–9</span>
        </div>
      </div>

      {/* Victory Celebration */}
      {isWon && (
        <div className="my-3 border-2 border-emerald-500 bg-emerald-500/15 p-3 text-center animate-in zoom-in">
          <p className="font-serif text-lg font-bold text-emerald-600 dark:text-emerald-400">
            🎉 Brilliant! Daily Puzzle Solved!
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">
            You cracked today&apos;s morning grid in {formatTimer(timer)}. Next puzzle arrives tomorrow at 6:00 AM IST.
          </p>
        </div>
      )}

      {/* 9x9 Sudoku Grid */}
      <div className="mx-auto my-4 grid aspect-square max-w-[420px] grid-cols-9 border-2 border-foreground bg-foreground shadow-sm select-none">
        {board.map((row, rIdx) =>
          row.map((val, cIdx) => {
            const isSelected = selectedCell?.[0] === rIdx && selectedCell?.[1] === cIdx
            const isSameRow = selectedCell?.[0] === rIdx
            const isSameCol = selectedCell?.[1] === cIdx
            const isSameBox =
              selectedCell &&
              Math.floor(selectedCell[0] / 3) === Math.floor(rIdx / 3) &&
              Math.floor(selectedCell[1] / 3) === Math.floor(cIdx / 3)
            const isCrosshair = isSameRow || isSameCol || isSameBox
            const isSameNumber = selectedValue !== null && val === selectedValue
            const isConflict = conflicts.has(`${rIdx}-${cIdx}`)
            const isInitial = initialMask[rIdx]?.[cIdx]
            const cellNotes = notes[`${rIdx}-${cIdx}`] ?? []

            // Thick 3x3 block borders
            const borderRight = (cIdx + 1) % 3 === 0 && cIdx !== 8 ? "border-r-2 border-r-foreground" : "border-r border-border"
            const borderBottom = (rIdx + 1) % 3 === 0 && rIdx !== 8 ? "border-b-2 border-b-foreground" : "border-b border-border"

            let bgClass = "bg-background"
            if (isSelected) {
              bgClass = "bg-primary/30 ring-2 ring-inset ring-primary z-10"
            } else if (isConflict) {
              bgClass = "bg-destructive/20 text-destructive font-bold"
            } else if (isSameNumber) {
              bgClass = "bg-amber-400/25 dark:bg-amber-400/20 font-extrabold"
            } else if (isCrosshair) {
              bgClass = "bg-muted/60"
            } else if (isInitial) {
              bgClass = "bg-secondary/70 font-black"
            }

            return (
              <button
                key={`${rIdx}-${cIdx}`}
                type="button"
                onClick={() => setSelectedCell([rIdx, cIdx])}
                className={`relative flex items-center justify-center font-serif text-base font-bold transition-all sm:text-xl ${borderRight} ${borderBottom} ${bgClass} ${
                  isInitial ? "text-foreground" : "text-primary"
                }`}
              >
                {val !== 0 ? (
                  val
                ) : cellNotes.length > 0 ? (
                  <div className="grid grid-cols-3 gap-0.5 text-[8.5px] font-mono leading-none text-muted-foreground p-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <span key={n} className={cellNotes.includes(n) ? "font-bold text-foreground" : "opacity-0"}>
                        {n}
                      </span>
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

      {/* Touch / Click Numpad */}
      <div className="mt-3 grid grid-cols-9 gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleNumberInput(num)}
            className="border border-foreground py-2.5 font-serif text-base font-bold text-foreground transition-all hover:bg-foreground hover:text-background active:scale-95"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Control Buttons & Hotkey Reminders */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setNotesMode(!notesMode)}
            className={`border border-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              notesMode ? "bg-foreground text-background font-bold" : "text-foreground hover:bg-muted"
            }`}
            title="Press [N] key to toggle pencil notes"
          >
            ✎ Notes: {notesMode ? "ON" : "OFF"} <span className="text-[9px] opacity-75">(N)</span>
          </button>

          <button
            type="button"
            onClick={handleUndo}
            disabled={!history.length}
            className="border border-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:bg-muted disabled:opacity-40"
            title="Press [U] key to undo"
          >
            ↶ Undo <span className="text-[9px] opacity-75">(U)</span>
          </button>

          <button
            type="button"
            onClick={handleErase}
            className="border border-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:bg-muted"
            title="Press [Backspace] or [Del]"
          >
            ⌫ Erase
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleHint}
            className="border border-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-primary hover:bg-muted font-bold"
            title="Press [H] for a logical hint"
          >
            💡 Hint <span className="text-[9px] opacity-75">(H)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const { puzzle } = getDailyPuzzleSeed()
              setBoard(puzzle.map((row) => [...row]))
              setIsWon(false)
              setNotes({})
              setHistory([])
            }}
            className="border border-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:bg-muted"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Keyboard navigation quick guide */}
      <div className="mt-3 rounded border border-dashed border-border bg-muted/30 p-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        ⌨️ <strong>Power Controls:</strong> Arrow Keys / WASD / HJKL to move · 1-9 / Numpad to fill · N = Notes · U = Undo · H = Hint · Backspace = Clear
      </div>
    </div>
  )
}

export function DailySudokuModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[560px] border-4 border-double border-foreground bg-background p-6 shadow-2xl animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 border border-foreground px-2.5 py-1 font-mono text-[12px] font-bold uppercase hover:bg-foreground hover:text-background transition-colors"
        >
          ✕ Close
        </button>
        <SudokuBoardGame isModal onClose={onClose} />
      </div>
    </div>
  )
}