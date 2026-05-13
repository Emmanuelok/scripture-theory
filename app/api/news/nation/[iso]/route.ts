import { NextResponse } from "next/server";
import { findNation } from "@/data/nations";
import {
  parseRss,
  googleNewsCountryFeedUrl,
  sortByPublished,
  isPrayerWorthy,
  type NewsItem,
} from "@/lib/news";

export const revalidate = 1800; // 30 minutes

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ iso: string }> }
) {
  const { iso } = await params;
  const nation = findNation(iso);
  if (!nation) {
    return NextResponse.json({ ok: false, error: "Unknown nation" }, { status: 404 });
  }

  const url = googleNewsCountryFeedUrl(nation.iso);
  try {
    const res = await fetch(url, {
      next: { revalidate: 1800, tags: [`news:nation:${nation.iso}`] },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ScriptureTheory/1.0; +https://scripture-theory.org)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Upstream not reachable", items: [] as NewsItem[] },
        { status: 502 }
      );
    }
    const xml = await res.text();
    const parsed = parseRss(xml, "Google News");
    const items = sortByPublished(parsed)
      .slice(0, 12)
      .map((it) => ({ ...it, prayerWorthy: isPrayerWorthy(it) }));
    return NextResponse.json(
      { ok: true, nation: nation.iso, items },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err), items: [] as NewsItem[] },
      { status: 502 }
    );
  }
}
