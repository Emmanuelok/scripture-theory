// Lightweight RSS / Atom parser for prayer-news fetching.
// Server-side only. We hit free public feeds (Google News, BBC,
// Al Jazeera, Reuters world wire) and normalize them into a common
// shape. Cached at the Next.js fetch layer.

export type NewsItem = {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string | null;
  description: string | null;
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
        description: description ? description.slice(0, 280) : null,
      });
    }
  }
  return items;
}

// Google News RSS by country code. ISO alpha-2 → (gl, ceid, hl)
const GOOGLE_NEWS_HL: Record<string, string> = {
  US: "en-US", GB: "en-GB", CA: "en-CA", AU: "en-AU", IE: "en-IE",
  NG: "en-NG", KE: "en-KE", ZA: "en-ZA", GH: "en-GH",
  IN: "en-IN", PK: "en-PK", BD: "en-BD", LK: "en-LK", NP: "en",
  PH: "en-PH", MY: "en-MY", SG: "en-SG", ID: "id",
  CN: "zh-CN", TW: "zh-TW", HK: "zh-HK", JP: "ja", KR: "ko", MN: "en", VN: "vi", TH: "th", MM: "en", KH: "en", LA: "en",
  AF: "en", IR: "en", IQ: "en", SY: "en", LB: "en", IL: "iw", PS: "en", JO: "en", TR: "tr", YE: "en",
  SA: "ar", EG: "ar", MA: "ar", DZ: "ar", TN: "ar", LY: "ar", SD: "en", SS: "en", SO: "en", ER: "en",
  ET: "en", UG: "en", RW: "en", TZ: "en", ZW: "en", MZ: "en", MG: "en", AO: "en",
  CD: "fr", BI: "fr", CM: "fr", CI: "fr", SN: "fr", ML: "fr", TD: "fr", BF: "fr", NE: "fr", CF: "fr", GA: "fr",
  SL: "en", LR: "en", ZM: "en", MW: "en", BW: "en", NA: "en",
  DE: "de", FR: "fr", ES: "es", IT: "it", PT: "pt-PT", NL: "nl", SE: "sv", NO: "no", FI: "fi-FI",
  GR: "el", PL: "pl", HU: "hu", CZ: "cs", AT: "de-AT", BE: "fr-BE", CH: "de-CH",
  RU: "ru", UA: "uk",
  UZ: "en", KZ: "ru", AZ: "en", AM: "en", GE: "en", TJ: "en", TM: "en", KG: "en",
  MX: "es-419", BR: "pt-BR", AR: "es-419", CO: "es-419", VE: "es-419", PE: "es-419", CL: "es-419",
  BO: "es-419", EC: "es-419", PY: "es-419", UY: "es-419", CU: "es-419", DO: "es-419", GT: "es-419",
  HT: "fr", JM: "en", TT: "en", BS: "en",
  NZ: "en-NZ", PG: "en", FJ: "en", SB: "en", VU: "en", WS: "en", TO: "en",
  BN: "en", MV: "en", BT: "en",
};

export function googleNewsCountryFeedUrl(iso: string): string {
  const u = iso.toUpperCase();
  const hl = GOOGLE_NEWS_HL[u] ?? "en";
  return `https://news.google.com/rss?gl=${u}&hl=${hl}&ceid=${u}:${hl.split("-")[0]}`;
}

// World-news RSS sources. We dedupe by title prefix.
export const WORLD_FEEDS: { url: string; source: string }[] = [
  { url: "http://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
  { url: "https://feeds.npr.org/1004/rss.xml", source: "NPR World" },
  { url: "https://news.google.com/rss?gl=US&hl=en-US&ceid=US:en", source: "Google News (Top)" },
];

export function dedupe(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (const it of items) {
    const key = it.title.toLowerCase().slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

// Sort newest first when we have valid dates; preserve order otherwise.
export function sortByPublished(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return tb - ta;
  });
}

// Light heuristic: which items are likely intercession-worthy
// (conflict, disaster, suffering, persecution, healing). Used to surface
// "pray now" badges; non-matches still appear in the feed.
const PRAYER_KEYWORDS = [
  "war", "attack", "killed", "dead", "wounded", "hostage", "violence", "conflict",
  "famine", "drought", "flood", "earthquake", "storm", "wildfire", "evacuat",
  "refugee", "displaced", "humanitarian", "crisis", "aid",
  "persecut", "Christian", "church", "missionary", "pastor", "priest",
  "disease", "outbreak", "epidemic", "hospital",
  "election", "protest", "coup", "junta", "sanction",
  "shooting", "stabbing", "missing", "trapped", "rescue",
  "abduct", "kidnap", "trafficking",
];

export function isPrayerWorthy(item: NewsItem): boolean {
  const hay = `${item.title} ${item.description ?? ""}`.toLowerCase();
  return PRAYER_KEYWORDS.some((k) => hay.includes(k));
}
