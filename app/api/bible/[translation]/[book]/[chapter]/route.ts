import { NextResponse } from "next/server";
import { getBook } from "@/data/bible/canon";
import { getChapter } from "@/lib/bible";
import type { TranslationId } from "@/data/bible/translations";
import { translationOrder } from "@/data/bible/translations";

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
  if (!getBook(book)) {
    return NextResponse.json({ ok: false, error: "Unknown book" }, { status: 404 });
  }
  const num = Number(chapter);
  if (!Number.isFinite(num) || num < 1) {
    return NextResponse.json({ ok: false, error: "Invalid chapter" }, { status: 400 });
  }

  const text = await getChapter(book, num, upper as TranslationId);
  if (!text) {
    return NextResponse.json(
      { ok: false, error: "Translation not yet available for this chapter" },
      { status: 404 }
    );
  }
  return NextResponse.json(text, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
