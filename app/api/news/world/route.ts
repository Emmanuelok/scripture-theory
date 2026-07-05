import { NextResponse } from "next/server";
import {
  parseRss,
  WORLD_FEEDS,
  toPrayerStories,
  sortByPublished,
  type NewsItem,
} from "@/lib/news";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const revalidate = 900; // 15 minutes — the world moves quickly

async function fetchOne(url: string, source: string): Promise<NewsItem[]> {
  try {
    const res = await fetchWithTimeout(url, {
      timeoutMs: 8000,
      next: { revalidate: 900, tags: [`news:world:${source}`] },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ScriptureTheory/1.0; +https://scripture-theory.org)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml, source).map((it) => ({ ...it, source }));
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(WORLD_FEEDS.map((f) => fetchOne(f.url, f.source)));
  const merged = results.flat();
  const stories = sortByPublished(toPrayerStories(merged))
    .slice(0, 80)
    .map((s) => ({
      id: s.id,
      title: s.title,
      link: s.link,
      source: s.source,
      publishedAt: s.publishedAt,
      description: s.description,
      categoryId: s.category.id,
      lat: s.place.lat,
      lng: s.place.lng,
      placeName: s.place.name,
    }));

  return NextResponse.json(
    { ok: true, stories },
    {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400",
      },
    }
  );
}
