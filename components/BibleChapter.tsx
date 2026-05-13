"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChapterText } from "@/data/bible/seed";
import { passages as lensPassages } from "@/data/lens";
import { translations, translationOrder, type TranslationId } from "@/data/bible/translations";
import { crossRefsFor } from "@/data/bible/cross-refs";
import { referenceHref } from "@/lib/reference";
import AudioBibleControls from "@/components/AudioBibleControls";

type Marks = {
  highlights: string[];
  bookmarks: string[];
  notes: Record<string, string>;
};

type ReaderPrefs = {
  fontScale: number; // 1 = base, 0.875 small, 1.125 comfortable, 1.25 large
  spacing: "compact" | "comfortable";
};

const MARKS_STORAGE = "scripture-theory-bible-marks";
const TRANSLATION_PREF = "scripture-theory-translation";
const READER_PREFS = "scripture-theory-reader";

const FONT_SCALES = [
  { value: 0.875, label: "S" },
  { value: 1, label: "M" },
  { value: 1.125, label: "L" },
  { value: 1.25, label: "XL" },
];

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

function loadPrefs(): ReaderPrefs {
  if (typeof window === "undefined") return { fontScale: 1, spacing: "comfortable" };
  try {
    const raw = window.localStorage.getItem(READER_PREFS);
    if (!raw) return { fontScale: 1, spacing: "comfortable" };
    const parsed = JSON.parse(raw);
    return {
      fontScale: typeof parsed.fontScale === "number" ? parsed.fontScale : 1,
      spacing: parsed.spacing === "compact" ? "compact" : "comfortable",
    };
  } catch {
    return { fontScale: 1, spacing: "comfortable" };
  }
}

function savePrefs(p: ReaderPrefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(READER_PREFS, JSON.stringify(p));
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
  const [translationId, setTranslationId] = useState<TranslationId>(available[0] ?? "WEB");
  const [marks, setMarks] = useState<Marks>({ highlights: [], bookmarks: [], notes: {} });
  const [prefs, setPrefs] = useState<ReaderPrefs>({ fontScale: 1, spacing: "comfortable" });
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<TranslationId[]>([]);
  const [fetched, setFetched] = useState<Partial<Record<TranslationId, ChapterText>>>({});
  const [loadingTranslation, setLoadingTranslation] = useState<TranslationId | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    setMarks(loadMarks());
    setPrefs(loadPrefs());
    if (typeof window !== "undefined") {
      const pref = window.localStorage.getItem(TRANSLATION_PREF) as TranslationId | null;
      if (pref && available.includes(pref)) setTranslationId(pref);
      setHintDismissed(window.localStorage.getItem("scripture-theory-bible-hint") === "1");
    }
    setMounted(true);
  }, [available]);

  // Fetch the active translation if not provided + not yet fetched.
  useEffect(() => {
    if (!mounted) return;
    if (chapters[translationId] || fetched[translationId]) return;
    let cancelled = false;
    setLoadingTranslation(translationId);
    fetch(`/api/bible/${translationId}/${bookId}/${chapterNum}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data && data.verses) {
          setFetched((prev) => ({
            ...prev,
            [translationId]: { book: bookId, chapter: chapterNum, translation: translationId, verses: data.verses },
          }));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoadingTranslation((cur) => (cur === translationId ? null : cur));
      });
    return () => {
      cancelled = true;
    };
  }, [translationId, bookId, chapterNum, chapters, fetched, mounted]);

  // Fetch any selected comparison translations.
  useEffect(() => {
    for (const id of compareIds) {
      if (chapters[id] || fetched[id]) continue;
      fetch(`/api/bible/${id}/${bookId}/${chapterNum}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.verses) {
            setFetched((prev) => ({
              ...prev,
              [id]: { book: bookId, chapter: chapterNum, translation: id, verses: data.verses },
            }));
          }
        })
        .catch(() => {});
    }
  }, [compareIds, chapters, fetched, bookId, chapterNum]);

  function pickTranslation(t: TranslationId) {
    setTranslationId(t);
    try {
      window.localStorage.setItem(TRANSLATION_PREF, t);
    } catch {}
  }

  function toggleCompare(t: TranslationId) {
    setCompareIds((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function updatePrefs(patch: Partial<ReaderPrefs>) {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      savePrefs(next);
      return next;
    });
  }

  function dismissHint() {
    setHintDismissed(true);
    try {
      window.localStorage.setItem("scripture-theory-bible-hint", "1");
    } catch {}
  }

  const chapter = chapters[translationId] ?? fetched[translationId];
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

  const totalHighlights = marks.highlights.filter((k) => k.includes(`:${bookId}:${chapterNum}:`)).length;
  const totalBookmarks = marks.bookmarks.filter((k) => k.includes(`:${bookId}:${chapterNum}:`)).length;
  const totalNotes = Object.keys(marks.notes).filter((k) => k.includes(`:${bookId}:${chapterNum}:`)).length;
  const hasMarks = totalHighlights + totalBookmarks + totalNotes > 0;

  const fontScale = mounted ? prefs.fontScale : 1;
  const lineLeading = mounted && prefs.spacing === "compact" ? "leading-relaxed" : "leading-loose";

  return (
    <article className="space-y-6">
      {/* Reader controls bar */}
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-3 md:p-4 flex flex-wrap items-center gap-3">
        {/* Translation dropdown */}
        <label className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-ink-500">Translation</span>
          <div className="relative">
            <select
              value={translationId}
              onChange={(e) => pickTranslation(e.target.value as TranslationId)}
              className="appearance-none rounded-full border border-ink-300 bg-card pl-3 pr-8 py-1.5 text-sm text-ink-900 hover:border-ink-900 focus:outline-none focus:ring-2 focus:ring-flame-300 cursor-pointer"
            >
              {available.map((id) => {
                const t = translations[id];
                return (
                  <option key={id} value={id}>
                    {t.abbrev} — {t.name}
                  </option>
                );
              })}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-500 text-xs">
              ▾
            </span>
          </div>
        </label>

        {/* Font size controls */}
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-[10px] uppercase tracking-widest text-ink-500 mr-1">Size</span>
          {FONT_SCALES.map((s) => (
            <button
              key={s.value}
              onClick={() => updatePrefs({ fontScale: s.value })}
              className={`h-7 w-7 rounded-full text-xs font-medium transition-colors ${
                Math.abs(fontScale - s.value) < 0.01
                  ? "bg-ink-900 text-ink-50"
                  : "text-ink-500 hover:text-ink-900"
              }`}
              aria-pressed={Math.abs(fontScale - s.value) < 0.01}
              title={`Text size ${s.label}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Spacing toggle */}
        <button
          onClick={() => updatePrefs({ spacing: prefs.spacing === "compact" ? "comfortable" : "compact" })}
          className="rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
          title="Toggle line spacing"
        >
          {prefs.spacing === "compact" ? "Comfortable" : "Compact"}
        </button>

        <Link
          href="/bible/my"
          className="rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-ink-900 inline-flex items-center gap-1.5"
          title="Your highlights, bookmarks, and notes"
        >
          <span aria-hidden>✎</span> My marks
        </Link>
      </div>

      {/* Audio Bible (text-to-speech) */}
      {chapter && (
        <AudioBibleControls chapter={chapter} language={meta.language} />
      )}

      {/* Tap-a-verse hint (one-time) */}
      {mounted && !hintDismissed && (
        <div className="rounded-2xl border border-flame-200 bg-flame-50/60 p-4 text-sm text-flame-900 flex items-start justify-between gap-3">
          <span>
            <strong>Tip:</strong> tap any verse to highlight it, bookmark it, copy it, or save a personal note.
          </span>
          <button
            onClick={dismissHint}
            className="text-xs text-flame-700 hover:underline shrink-0"
          >
            Got it
          </button>
        </div>
      )}

      <div
        className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring"
        lang={meta.language.toLowerCase().slice(0, 2)}
        style={{ fontSize: `${fontScale}rem` }}
      >
        {chapter ? (
          <div className={`prose-scripture text-ink-900 ${lineLeading}`}>
            {chapter.verses.map((verse) => {
              const key = verseKey(translationId, bookId, chapterNum, verse.v);
              const isHi = mounted && marks.highlights.includes(key);
              const isBk = mounted && marks.bookmarks.includes(key);
              const hasNote = mounted && Boolean(marks.notes[key]);
              const isActive = activeVerse === verse.v;
              return (
                <span
                  key={verse.v}
                  id={`v${verse.v}`}
                  className={`group cursor-pointer scroll-mt-24 transition-colors ${
                    isHi ? "bg-flame-100 dark:bg-flame-100/30 rounded px-1 -mx-1" : ""
                  } ${
                    isActive ? "ring-2 ring-flame-300 ring-offset-2 ring-offset-card rounded" : ""
                  }`}
                  onClick={() => {
                    setActiveVerse(activeVerse === verse.v ? null : verse.v);
                    setNoteDraft(marks.notes[key] ?? "");
                  }}
                >
                  <sup className="text-[0.6em] text-flame-700 font-sans font-medium align-super mr-0.5 select-none">
                    {verse.v}
                  </sup>
                  <span>{verse.t}</span>
                  {isBk && (
                    <span className="text-flame-600 ml-1 select-none" aria-label="bookmarked">★</span>
                  )}
                  {hasNote && (
                    <span className="text-emerald-600 ml-1 select-none" aria-label="has note">✎</span>
                  )}{" "}
                </span>
              );
            })}
          </div>
        ) : (
          <ChapterSkeleton />
        )}

        {hasMarks && (
          <div className="mt-6 pt-3 border-t border-ink-100 text-xs text-ink-500 flex flex-wrap gap-3">
            {totalHighlights > 0 && <span>{totalHighlights} highlight{totalHighlights > 1 && "s"}</span>}
            {totalBookmarks > 0 && <span>★ {totalBookmarks} bookmark{totalBookmarks > 1 && "s"}</span>}
            {totalNotes > 0 && <span>✎ {totalNotes} note{totalNotes > 1 && "s"}</span>}
          </div>
        )}
      </div>

      {available.length > 1 && (
        <div className="rounded-3xl border border-ink-200 bg-card p-6">
          <button
            onClick={() => setCompareOpen((v) => !v)}
            className="w-full text-left flex items-center justify-between text-sm text-ink-700 hover:text-flame-700"
          >
            <span>
              Compare side-by-side ({available.length - 1} other{" "}
              {available.length - 1 === 1 ? "translation" : "translations"} available)
            </span>
            <span className="text-flame-700 font-serif text-xl">{compareOpen ? "−" : "+"}</span>
          </button>
          {compareOpen && (
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
                            : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
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
                    const cText = chapters[id] ?? fetched[id];
                    const m = translations[id];
                    return (
                      <div
                        key={id}
                        className="rounded-2xl border border-ink-200 p-4"
                        lang={m.language.toLowerCase().slice(0, 2)}
                      >
                        <div className="text-xs uppercase tracking-widest text-flame-700 mb-2">
                          {m.name} · {m.year}
                        </div>
                        {cText ? (
                          <div className="prose-scripture text-ink-800 text-sm">
                            {cText.verses.map((v) => (
                              <span key={v.v}>
                                <sup className="text-[10px] text-flame-700 mr-0.5">{v.v}</sup>
                                <span>{v.t}</span>{" "}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-ink-500 italic">Loading…</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {mounted && activeVerse !== null && chapter && (
        <>
          {/* Backdrop dims the chapter behind for legibility */}
          <div
            className="fixed inset-0 z-40 bg-ink-50/70 backdrop-blur-sm"
            onClick={() => setActiveVerse(null)}
            aria-hidden
          />
          <div
            className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 w-[calc(100%-2rem)] max-w-2xl rounded-3xl border border-flame-300 bg-card p-5 md:p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-serif text-xl text-ink-900">
                {bookName} {chapterNum}:{activeVerse}{" "}
                <span className="text-xs text-ink-500 font-sans">({meta.abbrev})</span>
              </h3>
              <button
                onClick={() => setActiveVerse(null)}
                className="text-xs text-ink-500 hover:text-ink-900"
                aria-label="Close"
              >
                Close ✕
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
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1.5 text-xs text-ink-800 hover:border-ink-900"
              >
                {marks.bookmarks.includes(verseKey(translationId, bookId, chapterNum, activeVerse))
                  ? "Remove bookmark"
                  : "★ Bookmark"}
              </button>
              <button
                onClick={() => {
                  const t = chapter.verses.find((v) => v.v === activeVerse)?.t ?? "";
                  copyVerse(activeVerse, t);
                }}
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1.5 text-xs text-ink-800 hover:border-ink-900"
              >
                {copied ? "Copied!" : "Copy verse"}
              </button>
              <button
                onClick={async () => {
                  const t = chapter.verses.find((v) => v.v === activeVerse)?.t ?? "";
                  const text = `"${t}" — ${bookName} ${chapterNum}:${activeVerse} (${meta.abbrev})`;
                  if (navigator.share) {
                    try { await navigator.share({ title: `${bookName} ${chapterNum}:${activeVerse}`, text }); } catch {}
                  } else {
                    copyVerse(activeVerse, t);
                  }
                }}
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1.5 text-xs text-ink-800 hover:border-ink-900"
              >
                Share text
              </button>
              <a
                href={`/api/verse-card/${bookId}/${chapterNum}/${activeVerse}?translation=${translationId}`}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-flame-300 bg-card text-flame-700 px-3.5 py-1.5 text-xs hover:bg-flame-50"
                title="Open a 1080x1080 verse card you can save and share"
              >
                Share as image
              </a>
              {lensMatch && (
                <Link
                  href="/lens"
                  className="rounded-full border border-flame-300 bg-card text-flame-700 px-3.5 py-1.5 text-xs hover:bg-flame-50"
                >
                  Open in Verse Lens
                </Link>
              )}
            </div>

            {/* Cross-references */}
            {(() => {
              const refs = crossRefsFor(bookId, chapterNum, activeVerse);
              if (refs.length === 0) return null;
              return (
                <div className="mt-4 pt-3 border-t border-flame-200">
                  <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1.5">
                    Cross-references
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {refs.map((r) => {
                      const href = referenceHref(r);
                      return href ? (
                        <Link
                          key={r}
                          href={href}
                          className="rounded-full bg-card border border-ink-200 px-2.5 py-0.5 text-[11px] text-ink-700 hover:border-flame-500"
                        >
                          {r}
                        </Link>
                      ) : (
                        <span
                          key={r}
                          className="rounded-full bg-card border border-ink-200 px-2.5 py-0.5 text-[11px] text-ink-600"
                        >
                          {r}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div className="mt-4">
              <label className="text-xs uppercase tracking-widest text-ink-500">Your note</label>
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                rows={3}
                placeholder="What is the Spirit saying to you here?"
                className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => saveNote(activeVerse, noteDraft)}
                  className="rounded-full bg-flame-600 text-white px-3.5 py-1.5 text-xs hover:bg-flame-700"
                >
                  Save note
                </button>
                {marks.notes[verseKey(translationId, bookId, chapterNum, activeVerse)] && (
                  <button
                    onClick={() => {
                      saveNote(activeVerse, "");
                      setNoteDraft("");
                    }}
                    className="rounded-full border border-ink-300 bg-card px-3.5 py-1.5 text-xs text-ink-500 hover:border-ink-400"
                  >
                    Delete note
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
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

      {loadingTranslation && (
        <div className="fixed bottom-5 right-5 rounded-full bg-ink-900 text-ink-50 px-4 py-2 text-xs shadow-lg">
          Loading {translations[loadingTranslation].abbrev}…
        </div>
      )}
    </article>
  );
}

function ChapterSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-ink-100 rounded w-full" />
      <div className="h-4 bg-ink-100 rounded w-11/12" />
      <div className="h-4 bg-ink-100 rounded w-10/12" />
      <div className="h-4 bg-ink-100 rounded w-full" />
      <div className="h-4 bg-ink-100 rounded w-9/12" />
    </div>
  );
}
