import { todaysDevotional } from "@/data/devotional";

const BASE =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://scripture-theory.vercel.app").replace(/\/$/, "");

export const revalidate = 3600;

export async function GET() {
  const today = new Date();
  const e = todaysDevotional(today);
  const chapterUrl =
    e.bookId && e.chapter ? `${BASE}/bible/${e.bookId}/${e.chapter}` : `${BASE}/today`;

  const body = {
    date: today.toISOString().slice(0, 10),
    title: e.title,
    reference: e.reference,
    book: e.bookId ?? null,
    chapter: e.chapter ?? null,
    verse: e.verse ?? null,
    verseText: e.verseText,
    body: e.body,
    prayer: e.prayer,
    links: {
      chapter: chapterUrl,
      today: `${BASE}/today`,
      rss: `${BASE}/feed/votd.xml`,
    },
    source: {
      site: "Scripture Theory",
      url: BASE,
      bibleVersion: "WEB (public domain)",
      license: "Devotional text © Scripture Theory editorial; free to republish with link.",
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
