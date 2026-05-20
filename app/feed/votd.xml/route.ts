import { devotional, todaysDevotional, type DevotionalEntry } from "@/data/devotional";

const BASE =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://scripture-theory.vercel.app").replace(/\/$/, "");

const DAY_MS = 86_400_000;
const ITEMS = 30; // last ~month of daily entries

export const revalidate = 3600; // refresh hourly

function chapterUrl(e: DevotionalEntry): string {
  if (e.bookId && e.chapter) return `${BASE}/bible/${e.bookId}/${e.chapter}`;
  return `${BASE}/today`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(d: Date): string {
  return d.toUTCString();
}

export async function GET() {
  const today = new Date();
  // Build the last N days (today and back); same day-of-year => same entry,
  // so the feed item is the entry that the reader would have seen on that day.
  const items: { date: Date; entry: DevotionalEntry }[] = [];
  for (let i = 0; i < ITEMS; i++) {
    const d = new Date(today.getTime() - i * DAY_MS);
    items.push({ date: d, entry: todaysDevotional(d) });
  }

  const now = rfc822(today);
  const channelTitle = "Scripture Theory — Verse of the Day";
  const channelDesc =
    "A short, Scripture-anchored daily devotional that points to Christ. " +
    "One verse, one reflection, one brief prayer. Edited by Scripture Theory.";
  const link = `${BASE}/today`;
  const self = `${BASE}/feed/votd.xml`;

  const xmlItems = items
    .map(({ date, entry }) => {
      const guid = `${entry.reference}#${date.toISOString().slice(0, 10)}`;
      const title = `${entry.reference} — ${entry.title}`;
      const description =
        `<![CDATA[<blockquote><em>${escapeXml(entry.verseText)}</em><br/>` +
        `<strong>${escapeXml(entry.reference)}</strong></blockquote>` +
        `<p>${escapeXml(entry.body)}</p>` +
        `<p><em>${escapeXml(entry.prayer)}</em></p>` +
        `<p><a href="${escapeXml(chapterUrl(entry))}">Read the chapter →</a></p>]]>`;
      return [
        "    <item>",
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${escapeXml(chapterUrl(entry))}</link>`,
        `      <guid isPermaLink="false">${escapeXml(guid)}</guid>`,
        `      <pubDate>${rfc822(date)}</pubDate>`,
        `      <description>${description}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(link)}</link>
    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channelDesc)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>60</ttl>
${xmlItems}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

// Reference the array so tree-shaking doesn't drop it for the hourly rebuild.
void devotional.length;
