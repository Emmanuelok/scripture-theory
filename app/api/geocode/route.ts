import { NextResponse } from "next/server";
import { geocode } from "@/lib/geocode";

export const revalidate = 86400; // 24h

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim().slice(0, 200);
  if (!q) {
    return NextResponse.json(
      { ok: false, error: "q is required" },
      { status: 400 }
    );
  }
  const results = await geocode(q, 5);
  return NextResponse.json(
    {
      ok: true,
      results,
      source: "Nominatim · OpenStreetMap",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
