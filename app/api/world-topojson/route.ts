import { NextResponse } from "next/server";

// Proxy + cache the Natural Earth 110m world map (public domain) so the
// client gets it with a permissive cache header instead of going to jsdelivr
// every visit. We hit jsdelivr once per build/region per 30 days.
const UPSTREAM =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const revalidate = 2592000; // 30 days in seconds

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate: 2592000 } });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `Upstream ${res.status}` },
        { status: 502 }
      );
    }
    const json = await res.json();
    return NextResponse.json(json, {
      headers: {
        "Cache-Control":
          "public, s-maxage=2592000, stale-while-revalidate=2592000",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 502 }
    );
  }
}
