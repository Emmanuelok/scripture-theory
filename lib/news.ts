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
  // BBC over https (was http — plain-HTTP fetch of a mixed-content feed).
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
  { url: "https://feeds.npr.org/1004/rss.xml", source: "NPR World" },
  // (Reuters' feeds.reuters.com RSS was discontinued in 2020; dropped so it
  // no longer burns a DNS/connect timeout on every 15-minute revalidation.)
];

// ── Classification ────────────────────────────────────────────────
// Whole-word matching only. The old substring check made "World Cup
// warm-up" match the keyword "war" and put a football friendly on the
// intercession map under "War and conflict". Never again.

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Compile keywords to a whole-word regex.
 *   "war"        → \bwar(s|es|ed|d|ing|ies)?\b  (plurals + past tense + gerund)
 *   "persecut*"  → \bpersecut\w*\b              (explicit stem)
 *   "world cup"  → \bworld\s+cup(s|...)?\b      (phrase with simple plural on head)
 * "warm-up" can't match because the \w in war breaks at the hyphen, and
 * the surrounding \b anchors prevent partial matches.
 */
function compileKeywords(words: string[]): RegExp {
  const stemToken = (tok: string) =>
    tok.includes("*") ? `${escapeRe(tok.replace(/\*/g, ""))}\\w*` : null;

  const parts = words.map((w) => {
    if (w.includes(" ")) {
      const toks = w.split(/\s+/);
      const lastIdx = toks.length - 1;
      return toks
        .map((t, i) => {
          const stem = stemToken(t);
          if (stem) return stem;
          return i === lastIdx ? `${escapeRe(t)}(?:s|es|ed|d|ing|ies)?` : escapeRe(t);
        })
        .join("\\s+");
    }
    const stem = stemToken(w);
    return stem ? stem : `${escapeRe(w)}(?:s|es|ed|d|ing|ies)?`;
  });
  return new RegExp(`\\b(?:${parts.join("|")})\\b`, "i");
}

// Stories that are clearly sport / entertainment / lifestyle are dropped
// before classification — they are not what Scripture asks us to pray
// about, however many metaphorical "battles" their headlines contain.
// Title-only, so a war report whose body happens to mention a stadium
// isn't lost.
const NOT_PRAYER_NEWS = compileKeywords([
  "world cup", "premier league", "champions league", "europa league",
  "fifa", "uefa", "olympics", "olympic", "paralympic",
  "international friendly", "friendly match",
  "football", "soccer", "cricket", "rugby", "tennis", "golf",
  "formula 1", "formula one", "grand prix", "motogp",
  "nba", "nfl", "mlb", "nhl", "playoff", "playoffs",
  "semi-final", "semifinal", "quarter-final", "quarterfinal",
  "kick-off", "kickoff", "halftime", "matchday", "transfer window",
  "grand slam", "wimbledon", "super bowl",
  "box office", "film festival", "red carpet", "movie review",
  "album", "grammy", "grammys", "oscars", "billboard",
  "celebrity", "concert tour", "fashion week",
]);

const CATEGORY_MATCHERS = PRAYER_CATEGORIES.map((cat) => ({
  cat,
  re: compileKeywords(cat.keywords),
}));

// Categorize. Returns the *first* matching PrayerCategory or null.
// Order matters: PRAYER_CATEGORIES is arranged most-specific-first.
export function categorize(item: NewsItem): PrayerCategory | null {
  if (NOT_PRAYER_NEWS.test(item.title)) return null;
  const hay = `${item.title} ${item.description ?? ""}`;
  for (const m of CATEGORY_MATCHERS) {
    if (m.re.test(hay)) return m.cat;
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
