import { NextResponse } from "next/server"
import { fetchLiveIpos } from "@/lib/live-ipo"

export const dynamic = "force-dynamic"
export const revalidate = 120

export async function GET() {
  try {
    const ipos = await fetchLiveIpos()
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      count: ipos.length,
      ipos,
    })
  } catch (error) {
    console.error("API /api/ipos failed:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch live IPOs" },
      { status: 500 }
    )
  }
}
