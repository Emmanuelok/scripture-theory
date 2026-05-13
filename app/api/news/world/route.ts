import { NextResponse } from "next/server";
import {
  parseRss,
  WORLD_FEEDS,
  dedupe,
  sortByPublished,
  isPrayerWorthy,
  type NewsItem,
} from "@/lib/news";

export const revalidate = 900; // 15 minutes — the world moves quickly

async function fetchOne(url: string, source: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 900, tags: [`news:world:${source}`] },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ScriptureTheory/1.0; +https://scripture-theory.org)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = parseRss(xml, source);
    return items.map((it) => ({ ...it, source }));
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(WORLD_FEEDS.map((f) => fetchOne(f.url, f.source)));
  const merged = results.flat();
  const sorted = sortByPublished(dedupe(merged))
    .slice(0, 30)
    .map((it) => ({ ...it, prayerWorthy: isPrayerWorthy(it) }));
  return NextResponse.json(
    { ok: true, items: sorted },
    {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400",
      },
    }
  );
}
