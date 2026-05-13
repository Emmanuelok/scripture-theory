import { NextResponse } from "next/server";
import { searchChurches } from "@/lib/overpass";
import { haversineKm } from "@/lib/geo";

export const revalidate = 86400; // 24h

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") ?? "");
  const lng = parseFloat(searchParams.get("lng") ?? "");
  const radiusKm = Math.max(0.5, Math.min(50, parseFloat(searchParams.get("radius") ?? "5")));
  const denomination = searchParams.get("denomination") ?? null;
  const limit = Math.max(1, Math.min(50, parseInt(searchParams.get("limit") ?? "30", 10)));

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return NextResponse.json(
      { ok: false, error: "lat and lng are required" },
      { status: 400 }
    );
  }

  try {
    const raw = await searchChurches({
      lat,
      lng,
      radiusMeters: radiusKm * 1000,
      denomination,
    });

    // Decorate with distance, drop unnamed entries, sort nearest first.
    const churches = raw
      .filter((c) => c.name) // only named places — unnamed are usually data-quality noise
      .map((c) => ({
        ...c,
        distanceKm: haversineKm(lat, lng, c.lat, c.lng),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, limit);

    return NextResponse.json(
      {
        ok: true,
        count: churches.length,
        center: { lat, lng },
        radiusKm,
        denomination,
        churches,
        source: "OpenStreetMap · Overpass API",
        license: "© OpenStreetMap contributors (ODbL)",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: String(err),
        message:
          "OpenStreetMap is the data source — the public Overpass API is temporarily unreachable. Try again in a moment.",
      },
      { status: 502 }
    );
  }
}
