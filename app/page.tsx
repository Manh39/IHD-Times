import { Masthead } from "@/components/masthead"
import { TickerTape } from "@/components/ticker-tape"
import { Newspaper } from "@/components/newspaper"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Masthead />
      <TickerTape />
      <Newspaper />

      <footer className="mt-2 border-t-4 border-double border-foreground">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:flex-row sm:text-left">
          <p className="font-serif text-lg font-black text-foreground">IHD Times.</p>
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            © {new Date().getFullYear()} IHD Times · Headlines aggregated from public newswires
          </p>
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Economic Times · Moneycontrol · Business Standard
          </p>
        </div>
      </footer>
    </div>
  )
}
