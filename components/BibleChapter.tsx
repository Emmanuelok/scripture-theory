"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChapterText } from "@/data/bible/seed";
import { passages as lensPassages } from "@/data/lens";
import { translations, type TranslationId } from "@/data/bible/translations";

type Marks = {
  highlights: string[];
  bookmarks: string[];
  notes: Record<string, string>;
};

const MARKS_STORAGE = "scripture-theory-bible-marks";
const TRANSLATION_PREF = "scripture-theory-translation";

function loadMarks(): Marks {
  if (typeof window === "undefined") return { highlights: [], bookmarks: [], notes: {} };
  try {
    const raw = window.localStorage.getItem(MARKS_STORAGE);
    if (!raw) return { highlights: [], bookmarks: [], notes: {} };
    const parsed = JSON.parse(raw);
    return {
      highlights: parsed.highlights ?? [],
      bookmarks: parsed.bookmarks ?? [],
      notes: parsed.notes ?? {},
    };
  } catch {
    return { highlights: [], bookmarks: [], notes: {} };
  }
}

function saveMarks(m: Marks) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MARKS_STORAGE, JSON.stringify(m));
}

function verseKey(translation: TranslationId, bookId: string, chapter: number, v: number) {
  return `${translation}:${bookId}:${chapter}:${v}`;
}

export default function BibleChapter({
  chapters,
  bookId,
  bookName,
  chapterNum,
  available,
  prev,
  next,
}: {
  chapters: Record<TranslationId, ChapterText | undefined>;
  bookId: string;
  bookName: string;
  chapterNum: number;
  available: TranslationId[];
  prev: { book: string; chapter: number; bookName: string } | null;
  next: { book: string; chapter: number; bookName: string } | null;
}) {
  const [translationId, setTranslationId] = useState<TranslationId>(available[0]);
  const [marks, setMarks] = useState<Marks>({ highlights: [], bookmarks: [], notes: {} });
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [compareIds, setCompareIds] = useState<TranslationId[]>([]);

  useEffect(() => {
    setMarks(loadMarks());
    if (typeof window !== "undefined") {
      const pref = window.localStorage.getItem(TRANSLATION_PREF) as TranslationId | null;
      if (pref && available.includes(pref)) setTranslationId(pref);
    }
    setMounted(true);
  }, [available]);

  function pickTranslation(t: TranslationId) {
    setTranslationId(t);
    try {
      window.localStorage.setItem(TRANSLATION_PREF, t);
    } catch {}
  }

  function toggleCompare(t: TranslationId) {
    setCompareIds((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  const chapter = chapters[translationId];
  const meta = translations[translationId];

  const lensMatch = useMemo(() => {
    const ref = `${bookName} ${chapterNum}`.toLowerCase();
    return lensPassages.find((p) => p.reference.toLowerCase().startsWith(ref.split(":")[0]));
  }, [bookName, chapterNum]);

  function update(patch: Partial<Marks>) {
    setMarks((prev) => {
      const next = { ...prev, ...patch };
      saveMarks(next);
      return next;
    });
  }

  function toggleHighlight(v: number) {
    const key = verseKey(translationId, bookId, chapterNum, v);
    update({
      highlights: marks.highlights.includes(key)
        ? marks.highlights.filter((k) => k !== key)
        : [...marks.highlights, key],
    });
  }

  function toggleBookmark(v: number) {
    const key = verseKey(translationId, bookId, chapterNum, v);
    update({
      bookmarks: marks.bookmarks.includes(key)
        ? marks.bookmarks.filter((k) => k !== key)
        : [...marks.bookmarks, key],
    });
  }

  function saveNote(v: number, text: string) {
    const key = verseKey(translationId, bookId, chapterNum, v);
    const notes = { ...marks.notes };
    if (text.trim()) notes[key] = text.trim();
    else delete notes[key];
    update({ notes });
  }

  async function copyVerse(v: number, t: string) {
    try {
      await navigator.clipboard.writeText(
        `"${t}" — ${bookName} ${chapterNum}:${v} (${meta.abbrev})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  if (!chapter) return null;

  return (
    <article className="space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-ink-50/60 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <div className="text-xs uppercase tracking-widest text-ink-500">
            Translation · {available.length} available for this chapter
          </div>
          <div className="text-xs text-ink-500">
            {meta.publisher} · {meta.year} · {meta.license}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {available.map((id) => {
            const t = translations[id];
            const active = id === translationId;
            return (
              <button
                key={id}
                onClick={() => pickTranslation(id)}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                  active
                    ? "bg-ink-900 text-ink-50 border-ink-900"
                    : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
                }`}
                title={`${t.name} · ${t.languageNative}`}
              >
                <span className="font-medium">{t.abbrev}</span>{" "}
                <span className={active ? "text-ink-300" : "text-ink-500"}>
                  · {t.languageNative}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring"
        lang={meta.language.toLowerCase().slice(0, 2)}
      >
        <div className="prose-scripture text-ink-900">
          {chapter.verses.map((verse) => {
            const key = verseKey(translationId, bookId, chapterNum, verse.v);
            const isHi = mounted && marks.highlights.includes(key);
            const isBk = mounted && marks.bookmarks.includes(key);
            const hasNote = mounted && Boolean(marks.notes[key]);
            return (
              <span
                key={verse.v}
                id={`v${verse.v}`}
                className={`group cursor-pointer scroll-mt-24 ${
                  isHi ? "bg-flame-100/80 rounded px-1 -mx-1" : ""
                }`}
                onClick={() => {
                  setActiveVerse(activeVerse === verse.v ? null : verse.v);
                  setNoteDraft(marks.notes[key] ?? "");
                }}
              >
                <sup className="text-[11px] text-flame-700 font-sans font-medium align-super mr-0.5 select-none">
                  {verse.v}
                </sup>
                <span className="leading-relaxed">{verse.t}</span>
                {isBk && (
                  <span className="text-flame-600 ml-1 select-none" aria-label="bookmarked">
                    ★
                  </span>
                )}
                {hasNote && (
                  <span className="text-emerald-600 ml-1 select-none" aria-label="has note">
                    ✎
                  </span>
                )}{" "}
              </span>
            );
          })}
        </div>
      </div>

      {available.length > 1 && (
        <details className="rounded-3xl border border-ink-200 bg-white p-6">
          <summary className="cursor-pointer text-sm text-ink-700 hover:text-flame-700">
            Compare side-by-side ({available.length - 1} other{" "}
            {available.length - 1 === 1 ? "translation" : "translations"} available)
          </summary>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {available
                .filter((id) => id !== translationId)
                .map((id) => {
                  const t = translations[id];
                  const on = compareIds.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleCompare(id)}
                      className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                        on
                          ? "bg-ink-900 text-ink-50 border-ink-900"
                          : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
                      }`}
                    >
                      {t.abbrev} · {t.languageNative}
                    </button>
                  );
                })}
            </div>
            {compareIds.length > 0 && (
              <div className="space-y-4">
                {compareIds.map((id) => {
                  const cText = chapters[id];
                  const m = translations[id];
                  if (!cText) return null;
                  return (
                    <div
                      key={id}
                      className="rounded-2xl border border-ink-200 p-4"
                      lang={m.language.toLowerCase().slice(0, 2)}
                    >
                      <div className="text-xs uppercase tracking-widest text-flame-700 mb-2">
                        {m.name} · {m.year}
                      </div>
                      <div className="prose-scripture text-ink-800 text-sm">
                        {cText.verses.map((v) => (
                          <span key={v.v}>
                            <sup className="text-[10px] text-flame-700 mr-0.5">{v.v}</sup>
                            <span>{v.t}</span>{" "}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </details>
      )}

      {mounted && activeVerse !== null && (
        <div
          className="rounded-3xl border border-flame-300 bg-flame-50/50 p-5 md:p-6 sticky bottom-4"
          role="dialog"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-serif text-xl text-ink-900">
              {bookName} {chapterNum}:{activeVerse}{" "}
              <span className="text-xs text-ink-500 font-sans">({meta.abbrev})</span>
            </h3>
            <button
              onClick={() => setActiveVerse(null)}
              className="text-xs text-ink-500 hover:text-ink-900"
            >
              Close
            </button>
          </div>
          <p className="mt-2 prose-scripture text-ink-800">
            {chapter.verses.find((v) => v.v === activeVerse)?.t}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => toggleHighlight(activeVerse)}
              className="rounded-full bg-ink-900 text-ink-50 px-3.5 py-1.5 text-xs hover:bg-flame-700"
            >
              {marks.highlights.includes(verseKey(translationId, bookId, chapterNum, activeVerse))
                ? "Remove highlight"
                : "Highlight"}
            </button>
            <button
              onClick={() => toggleBookmark(activeVerse)}
              className="rounded-full border border-ink-300 px-3.5 py-1.5 text-xs text-ink-800 hover:border-ink-900"
            >
              {marks.bookmarks.includes(verseKey(translationId, bookId, chapterNum, activeVerse))
                ? "Remove bookmark"
                : "Bookmark"}
            </button>
            <button
              onClick={() => {
                const t = chapter.verses.find((v) => v.v === activeVerse)?.t ?? "";
                copyVerse(activeVerse, t);
              }}
              className="rounded-full border border-ink-300 px-3.5 py-1.5 text-xs text-ink-800 hover:border-ink-900"
            >
              {copied ? "Copied!" : "Copy verse"}
            </button>
            {lensMatch && (
              <Link
                href="/lens"
                className="rounded-full border border-flame-300 text-flame-700 px-3.5 py-1.5 text-xs hover:bg-flame-50"
              >
                Open in Verse Lens
              </Link>
            )}
          </div>

          <div className="mt-4">
            <label className="text-xs uppercase tracking-widest text-ink-400">Your note</label>
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={3}
              placeholder="What is the Spirit saying to you here?"
              className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => saveNote(activeVerse, noteDraft)}
                className="rounded-full bg-flame-600 text-ink-50 px-3.5 py-1.5 text-xs hover:bg-flame-700"
              >
                Save note
              </button>
              {marks.notes[verseKey(translationId, bookId, chapterNum, activeVerse)] && (
                <button
                  onClick={() => {
                    saveNote(activeVerse, "");
                    setNoteDraft("");
                  }}
                  className="rounded-full border border-ink-200 px-3.5 py-1.5 text-xs text-ink-500 hover:border-ink-400"
                >
                  Delete note
                </button>
              )}
            </div>
            <p className="mt-2 text-[11px] text-ink-500">
              Notes, highlights, and bookmarks live only on this device, keyed by translation.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {prev ? (
          <Link
            href={`/bible/${prev.book}/${prev.chapter}`}
            className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900"
          >
            ← {prev.bookName} {prev.chapter}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/bible/${next.book}/${next.chapter}`}
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700"
          >
            {next.bookName} {next.chapter} →
          </Link>
        )}
      </div>
    </article>
  );
}
