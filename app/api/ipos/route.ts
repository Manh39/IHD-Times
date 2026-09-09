import { NextResponse } from "next/server"
import { fetchLiveIpos, AUDITED_IPO_REGISTRY } from "@/lib/live-ipo"

export const dynamic = "force-dynamic"
export const revalidate = 120

export async function GET() {
  try {
    const ipos = await fetchLiveIpos()
    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        count: ipos.length,
        ipos,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
          "CDN-Cache-Control": "public, s-maxage=120",
          "Vercel-CDN-Cache-Control": "public, s-maxage=120",
        },
      }
    )
  } catch (error) {
    console.error("API /api/ipos failed, serving audited fallback:", error)
    return NextResponse.json(
      {
        success: true,
        fallback: true,
        timestamp: new Date().toISOString(),
        count: AUDITED_IPO_REGISTRY.length,
        ipos: AUDITED_IPO_REGISTRY,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    )
  }
}

