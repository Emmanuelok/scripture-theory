// World news fetcher, strictly filtered to what Scripture asks us to pray
// about. Returns only stories that match one of the PRAYER_CATEGORIES, with
// their primary category and rough (lat, lng) coordinates so they can be
// pinned on the world map.

import {
  PRAYER_CATEGORIES,
  type PrayerCategory,
} from "@/data/prayer-categories";
import { placeFromText, type Place } from "@/lib/places";

export type NewsItem = {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string | null;
  description: string | null;
};

export type PrayerStory = NewsItem & {
  category: PrayerCategory;
  place: Place;
};

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function stripCdata(s: string): string {
  const m = s.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return m ? m[1] : s;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function clean(s: string): string {
  return decodeEntities(stripTags(stripCdata(s))).trim();
}

function pick(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? clean(m[1]) : null;
}

export function parseRss(xml: string, defaultSource = "News"): NewsItem[] {
  const items: NewsItem[] = [];
  const blockRe = /<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(xml))) {
    const block = m[0];
    const title = pick(block, "title");
    let link = pick(block, "link");
    if (!link) {
      const hrefMatch = block.match(/<link[^>]*href=["']([^"']+)["']/i);
      if (hrefMatch) link = hrefMatch[1];
    }
    const pubDate = pick(block, "pubDate") ?? pick(block, "updated") ?? pick(block, "published");
    const description = pick(block, "description") ?? pick(block, "summary") ?? pick(block, "content");
    const source = pick(block, "source") ?? defaultSource;
    if (title && link) {
      items.push({
        id: link,
        title,
        link,
        source,
        publishedAt: pubDate,
        description: description ? description.slice(0, 400) : null,
      });
    }
  }
  return items;
}

export const WORLD_FEEDS: { url: string; source: string }[] = [
  { url: "http://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
  { url: "https://feeds.npr.org/1004/rss.xml", source: "NPR World" },
  { url: "https://feeds.reuters.com/Reuters/worldNews", source: "Reuters World" },
];

// Categorize. Returns the *first* matching PrayerCategory or null.
// Order matters: PRAYER_CATEGORIES is arranged most-specific-first.
export function categorize(item: NewsItem): PrayerCategory | null {
  const hay = `${item.title} ${item.description ?? ""}`.toLowerCase();
  for (const cat of PRAYER_CATEGORIES) {
    for (const k of cat.keywords) {
      if (hay.includes(k)) return cat;
    }
  }
  return null;
}

// Returns only stories that (a) match a scriptural prayer category AND
// (b) place to a recognizable city/country. Everything else is dropped.
export function toPrayerStories(items: NewsItem[]): PrayerStory[] {
  const out: PrayerStory[] = [];
  const seenTitles = new Set<string>();
  for (const it of items) {
    const key = it.title.toLowerCase().slice(0, 60);
    if (seenTitles.has(key)) continue;
    const cat = categorize(it);
    if (!cat) continue;
    const place = placeFromText(`${it.title} ${it.description ?? ""}`);
    if (!place) continue;
    seenTitles.add(key);
    out.push({ ...it, category: cat, place });
  }
  return out;
}

export function sortByPublished<T extends NewsItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return tb - ta;
  });
}
