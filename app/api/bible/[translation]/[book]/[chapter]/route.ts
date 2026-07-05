import { NextResponse } from "next/server";
import { getBook } from "@/data/bible/canon";
import { getChapter } from "@/lib/bible";
import type { TranslationId } from "@/data/bible/translations";
import { translationOrder, translations } from "@/data/bible/translations";

export const revalidate = 86400;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ translation: string; book: string; chapter: string }> }
) {
  const { translation, book, chapter } = await params;
  const upper = translation.toUpperCase();
  if (!translationOrder.includes(upper as TranslationId)) {
    return NextResponse.json({ ok: false, error: "Unknown translation" }, { status: 400 });
  }
  const bookMeta = getBook(book);
  if (!bookMeta) {
    return NextResponse.json({ ok: false, error: "Unknown book" }, { status: 404 });
  }
  const num = Number(chapter);
  // Must be a real chapter of this book — bounds the value so an attacker
  // can't enumerate /genesis/1..N and fan out uncached upstream fetches
  // (bible-api.com relay, ESV quota) with attacker-chosen cache keys.
  if (!Number.isInteger(num) || num < 1 || num > bookMeta.chapters) {
    return NextResponse.json({ ok: false, error: "Invalid chapter" }, { status: 400 });
  }

  const text = await getChapter(book, num, upper as TranslationId);
  if (!text) {
    const meta = translations[upper as TranslationId];
    const reason = meta?.requiresKey
      ? `${meta.name} requires an API key on the server. Set ${upper}_API_KEY in environment variables.`
      : "Translation not yet available for this chapter";
    return NextResponse.json({ ok: false, error: reason }, { status: 404 });
  }

  // Licensed translations get a shorter, no-SWR cache header so the CDN
  // never serves them more loosely than the publisher's terms allow.
  const meta = translations[upper as TranslationId];
  const cacheControl = meta?.requiresKey
    ? "public, s-maxage=3600"
    : "public, s-maxage=86400, stale-while-revalidate=604800";

  return NextResponse.json(text, { headers: { "Cache-Control": cacheControl } });
}
