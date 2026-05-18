"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChapterText } from "@/data/bible/seed";
import { passages as lensPassages } from "@/data/lens";
import { translations, translationOrder, type TranslationId } from "@/data/bible/translations";
import { crossRefsFor } from "@/data/bible/cross-refs";
import { referenceHref } from "@/lib/reference";
import { studyLinksFor } from "@/lib/study-tools";
import VerseCardModal from "@/components/VerseCardModal";
import { slotKey } from "@/lib/slots";

export type HighlightColor =
  | "amber"
  | "yellow"
  | "rose"
  | "sky"
  | "emerald"
  | "violet";

const HIGHLIGHT_COLORS: { id: HighlightColor; label: string; swatch: string; bg: string; bgDark: string }[] = [
  { id: "amber",   label: "Amber",   swatch: "bg-amber-400",   bg: "bg-amber-100",   bgDark: "dark:bg-amber-300/20" },
  { id: "yellow",  label: "Yellow",  swatch: "bg-yellow-300",  bg: "bg-yellow-100",  bgDark: "dark:bg-yellow-300/20" },
  { id: "rose",    label: "Rose",    swatch: "bg-rose-400",    bg: "bg-rose-100",    bgDark: "dark:bg-rose-300/20" },
  { id: "sky",     label: "Sky",     swatch: "bg-sky-400",     bg: "bg-sky-100",     bgDark: "dark:bg-sky-300/20" },
  { id: "emerald", label: "Emerald", swatch: "bg-emerald-400", bg: "bg-emerald-100", bgDark: "dark:bg-emerald-300/20" },
  { id: "violet",  label: "Violet",  swatch: "bg-violet-400",  bg: "bg-violet-100",  bgDark: "dark:bg-violet-300/20" },
];

function highlightBg(color: HighlightColor): string {
  const c = HIGHLIGHT_COLORS.find((x) => x.id === color) ?? HIGHLIGHT_COLORS[0];
  return `${c.bg} ${c.bgDark}`;
}

type Marks = {
  /** Map of verseKey -> color. (Migrated from older string[] shape on load.) */
  highlights: Record<string, HighlightColor>;
  bookmarks: string[];
  notes: Record<string, string>;
};

type VerseLayout = "flow" | "line";

type ReaderPrefs = {
  fontScale: number; // 1 = base, 0.875 small, 1.125 comfortable, 1.25 large
  spacing: "compact" | "comfortable";
  layout: VerseLayout; // flow = continuous paragraph · line = each verse on its own line
  highlightColor: HighlightColor; // default color when tapping a swatch-less Highlight action
};

const MARKS_STORAGE_BASE = "scripture-theory-bible-marks";
function MARKS_STORAGE() {
  return slotKey(MARKS_STORAGE_BASE);
}
const TRANSLATION_PREF = "scripture-theory-translation";
const READER_PREFS = "scripture-theory-reader";

const FONT_SCALES = [
  { value: 0.875, label: "S" },
  { value: 1, label: "M" },
  { value: 1.125, label: "L" },
  { value: 1.25, label: "XL" },
];

function loadMarks(): Marks {
  const empty: Marks = { highlights: {}, bookmarks: [], notes: {} };
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(MARKS_STORAGE());
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    // Migrate legacy string[] highlights to a Record keyed by verseKey
    let highlights: Record<string, HighlightColor> = {};
    if (Array.isArray(parsed.highlights)) {
      for (const k of parsed.highlights) highlights[k] = "amber";
    } else if (parsed.highlights && typeof parsed.highlights === "object") {
      highlights = parsed.highlights as Record<string, HighlightColor>;
    }
    return {
      highlights,
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      notes: parsed.notes ?? {},
    };
  } catch {
    return empty;
  }
}

function saveMarks(m: Marks) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MARKS_STORAGE(), JSON.stringify(m));
}

function loadPrefs(): ReaderPrefs {
  const defaults: ReaderPrefs = {
    fontScale: 1,
    spacing: "comfortable",
    layout: "flow",
    highlightColor: "amber",
  };
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(READER_PREFS);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      fontScale: typeof parsed.fontScale === "number" ? parsed.fontScale : defaults.fontScale,
      spacing: parsed.spacing === "compact" ? "compact" : "comfortable",
      layout: parsed.layout === "line" ? "line" : "flow",
      highlightColor:
        HIGHLIGHT_COLORS.some((c) => c.id === parsed.highlightColor)
          ? parsed.highlightColor
          : "amber",
    };
  } catch {
    return defaults;
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
  const [marks, setMarks] = useState<Marks>({ highlights: {}, bookmarks: [], notes: {} });
  const [prefs, setPrefs] = useState<ReaderPrefs>({
    fontScale: 1,
    spacing: "comfortable",
    layout: "flow",
    highlightColor: "amber",
  });
  // Multi-verse selection. Tapping a verse toggles its membership.
  const [selection, setSelection] = useState<number[]>([]);
  // The bottom toolbar can be collapsed to a small reopen-handle so the
  // reader can keep working without it covering verses.
  const [toolbarOpen, setToolbarOpen] = useState(true);
  const [noteOpen, setNoteOpen] = useState(false);
  const [shareVerse, setShareVerse] = useState<number | null>(null);
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

  // Remember last-read position
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        slotKey("scripture-theory-last-read"),
        JSON.stringify({
          bookId,
          bookName,
          chapter: chapterNum,
          translation: translationId,
          at: new Date().toISOString(),
        })
      );
    } catch {}
  }, [bookId, bookName, chapterNum, translationId]);

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

  function toggleSelection(v: number) {
    setSelection((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v].sort((a, b) => a - b)));
    setToolbarOpen(true);
    setNoteOpen(false);
  }

  function clearSelection() {
    setSelection([]);
    setNoteOpen(false);
  }

  /** Apply a color highlight to every verse currently in the selection. */
  function applyHighlight(color: HighlightColor) {
    if (selection.length === 0) return;
    const next = { ...marks.highlights };
    for (const v of selection) {
      next[verseKey(translationId, bookId, chapterNum, v)] = color;
    }
    update({ highlights: next });
    updatePrefs({ highlightColor: color });
  }

  /** Remove any highlight from the currently-selected verses. */
  function clearHighlight() {
    if (selection.length === 0) return;
    const next = { ...marks.highlights };
    for (const v of selection) {
      delete next[verseKey(translationId, bookId, chapterNum, v)];
    }
    update({ highlights: next });
  }

  /** Bookmark every verse in the selection (or unbookmark if all already bookmarked). */
  function toggleBookmarkSelection() {
    if (selection.length === 0) return;
    const keys = selection.map((v) => verseKey(translationId, bookId, chapterNum, v));
    const allOn = keys.every((k) => marks.bookmarks.includes(k));
    const bookmarks = allOn
      ? marks.bookmarks.filter((k) => !keys.includes(k))
      : Array.from(new Set([...marks.bookmarks, ...keys]));
    update({ bookmarks });
  }

  function saveNote(v: number, text: string) {
    const key = verseKey(translationId, bookId, chapterNum, v);
    const notes = { ...marks.notes };
    if (text.trim()) notes[key] = text.trim();
    else delete notes[key];
    update({ notes });
  }

  /** Compose selected verses' text into one string for copy/share. */
  function selectionText(): string {
    if (!chapter || selection.length === 0) return "";
    const lines = selection
      .map((v) => chapter.verses.find((x) => x.v === v))
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
      .map((x) => `${x.v} ${x.t}`)
      .join(" ");
    const ref =
      selection.length === 1
        ? `${bookName} ${chapterNum}:${selection[0]}`
        : `${bookName} ${chapterNum}:${selection[0]}–${selection[selection.length - 1]}`;
    return `"${lines.trim()}" — ${ref} (${meta.abbrev})`;
  }

  async function copySelection() {
    const text = selectionText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  async function shareSelection() {
    const text = selectionText();
    if (!text) return;
    if (typeof navigator !== "undefined" && (navigator as Navigator).share) {
      try {
        await (navigator as Navigator).share({ text });
        return;
      } catch {}
    }
    await copySelection();
  }

  const totalHighlights = Object.keys(marks.highlights).filter((k) => k.includes(`:${bookId}:${chapterNum}:`)).length;
  const totalBookmarks = marks.bookmarks.filter((k) => k.includes(`:${bookId}:${chapterNum}:`)).length;
  const totalNotes = Object.keys(marks.notes).filter((k) => k.includes(`:${bookId}:${chapterNum}:`)).length;
  const hasMarks = totalHighlights + totalBookmarks + totalNotes > 0;

  const fontScale = mounted ? prefs.fontScale : 1;
  const lineLeading = mounted && prefs.spacing === "compact" ? "leading-relaxed" : "leading-loose";

  return (
    <article className="space-y-6">
      {/* Reader controls bar */}
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-3 md:p-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        {/* Translation dropdown */}
        <label className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-widest text-ink-500 shrink-0">Translation</span>
          <div className="relative flex-1 min-w-0">
            <select
              value={translationId}
              onChange={(e) => pickTranslation(e.target.value as TranslationId)}
              className="w-full appearance-none rounded-full border border-ink-300 bg-card pl-3 pr-8 py-1.5 text-sm text-ink-900 hover:border-ink-900 focus:outline-none focus:ring-2 focus:ring-flame-300 cursor-pointer truncate"
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
        <div className="flex items-center gap-1 sm:ml-auto">
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

        {/* Verse layout toggle */}
        <button
          onClick={() => updatePrefs({ layout: prefs.layout === "flow" ? "line" : "flow" })}
          className="rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
          title="Continuous paragraph vs one verse per line"
        >
          {prefs.layout === "flow" ? "One verse per line" : "Continuous flow"}
        </button>

        <Link
          href="/bible/my"
          className="rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-ink-900 inline-flex items-center gap-1.5"
          title="Your highlights, bookmarks, and notes"
        >
          <span aria-hidden>✎</span> My marks
        </Link>
      </div>

      {/* Tap-a-verse hint (one-time) */}
      {mounted && !hintDismissed && (
        <div className="rounded-2xl border border-flame-200 bg-flame-50/60 p-4 text-sm text-flame-900 flex items-start justify-between gap-3">
          <span>
            <strong>Tip:</strong> tap any verse to select it. Tap more verses to add to your selection. The action bar at the bottom lets you highlight (in any color), bookmark, note, copy, share, and more — without ever blocking the chapter.
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
        className="rounded-3xl border border-ink-200 bg-card p-4 md:p-6 lg:p-8 glow-ring overflow-hidden"
        lang={meta.language.toLowerCase().slice(0, 2)}
        style={{ fontSize: `${fontScale}rem` }}
      >
        {chapter ? (
          <div
            className={`prose-scripture text-ink-900 ${lineLeading} break-words ${
              prefs.layout === "line" ? "space-y-2.5" : ""
            }`}
          >
            {chapter.verses.map((verse) => {
              const key = verseKey(translationId, bookId, chapterNum, verse.v);
              const color = mounted ? marks.highlights[key] : undefined;
              const isBk = mounted && marks.bookmarks.includes(key);
              const hasNote = mounted && Boolean(marks.notes[key]);
              const isActive = mounted && selection.includes(verse.v);
              const lineMode = prefs.layout === "line";
              const Tag = lineMode ? "div" : "span";
              return (
                <Tag
                  key={verse.v}
                  id={`v${verse.v}`}
                  className={`group cursor-pointer scroll-mt-24 transition-colors ${
                    color ? `${highlightBg(color)} rounded px-1 -mx-1` : ""
                  } ${
                    isActive ? "ring-2 ring-flame-400 ring-offset-2 ring-offset-card rounded" : ""
                  } ${lineMode ? "block" : ""}`}
                  onClick={() => toggleSelection(verse.v)}
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
                  )}{!lineMode && " "}
                </Tag>
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

      {/* ───────── Bottom-docked, non-blocking action bar (replaces the modal) ───────── */}
      {mounted && selection.length > 0 && chapter && (() => {
        const firstV = selection[0];
        const lastV = selection[selection.length - 1];
        const ref =
          selection.length === 1
            ? `${bookName} ${chapterNum}:${firstV}`
            : `${bookName} ${chapterNum}:${firstV}–${lastV} (${selection.length})`;
        const single = selection.length === 1 ? firstV : null;
        const singleKey =
          single !== null ? verseKey(translationId, bookId, chapterNum, single) : null;
        const allBookmarked = selection.every((v) =>
          marks.bookmarks.includes(verseKey(translationId, bookId, chapterNum, v))
        );
        const anyHighlighted = selection.some((v) =>
          Boolean(marks.highlights[verseKey(translationId, bookId, chapterNum, v)])
        );
        return (
          <div
            className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
            // Wrapper isn't blocking — only the inner card receives events.
          >
            <div className="mx-auto max-w-3xl px-3 pb-3 sm:pb-4 pointer-events-auto">
              <div className="rounded-2xl border border-flame-300 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 shadow-2xl">
                {/* Top row — selection meta */}
                <div className="flex items-center gap-2 px-3 pt-2.5 pb-1.5 border-b border-ink-100">
                  <span className="text-[11px] uppercase tracking-widest text-flame-700 truncate">
                    {ref} <span className="text-ink-400 normal-case tracking-normal">· {meta.abbrev}</span>
                  </span>
                  <button
                    onClick={() => setToolbarOpen((v) => !v)}
                    className="ml-auto text-[11px] text-ink-500 hover:text-ink-900"
                    title={toolbarOpen ? "Collapse" : "Expand"}
                  >
                    {toolbarOpen ? "▾" : "▴"}
                  </button>
                  <button
                    onClick={clearSelection}
                    className="text-[11px] text-ink-500 hover:text-ink-900"
                    aria-label="Clear selection"
                  >
                    Clear
                  </button>
                </div>

                {toolbarOpen && (
                  <div className="px-3 pt-2 pb-3 space-y-2.5 max-h-[55vh] overflow-y-auto overscroll-contain">
                    {/* Highlight color swatches */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] uppercase tracking-widest text-ink-500">
                        Highlight
                      </span>
                      {HIGHLIGHT_COLORS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => applyHighlight(c.id)}
                          title={c.label}
                          aria-label={`Highlight ${c.label}`}
                          className={`h-7 w-7 rounded-full ${c.swatch} ring-2 ${
                            prefs.highlightColor === c.id
                              ? "ring-ink-900 ring-offset-1 ring-offset-card"
                              : "ring-transparent"
                          } hover:scale-110 transition-transform`}
                        />
                      ))}
                      {anyHighlighted && (
                        <button
                          onClick={clearHighlight}
                          className="text-[11px] text-ink-500 hover:text-ink-900 underline ml-1"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Action chips */}
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={toggleBookmarkSelection}
                        className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                      >
                        {allBookmarked ? "★ Bookmarked" : "★ Bookmark"}
                      </button>
                      {single !== null && (
                        <button
                          onClick={() => {
                            setNoteOpen((v) => !v);
                            setNoteDraft(
                              singleKey ? marks.notes[singleKey] ?? "" : ""
                            );
                          }}
                          className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                        >
                          ✎ {singleKey && marks.notes[singleKey] ? "Edit note" : "Note"}
                        </button>
                      )}
                      <button
                        onClick={copySelection}
                        className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={shareSelection}
                        className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                      >
                        Share text
                      </button>
                      {single !== null && (
                        <button
                          onClick={() => setShareVerse(single)}
                          className="rounded-full border border-flame-300 bg-card text-flame-700 px-3 py-1 text-xs hover:bg-flame-50"
                          title="A 1080×1080 image to share"
                        >
                          Share as image
                        </button>
                      )}
                      {single !== null && (
                        <Link
                          href={`/verse/${bookId}/${chapterNum}/${single}`}
                          className="rounded-full border border-flame-300 bg-card text-flame-700 px-3 py-1 text-xs hover:bg-flame-50"
                        >
                          Permalink ↗
                        </Link>
                      )}
                      {single !== null && (
                        <Link
                          href={`/memory?ref=${encodeURIComponent(
                            `${bookName} ${chapterNum}:${single}`
                          )}`}
                          className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                          title="Add to Scripture memory"
                        >
                          Memorize
                        </Link>
                      )}
                      <Link
                        href={`/pray`}
                        className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                        title="Open the prayer rhythms — pray this passage"
                      >
                        Pray this
                      </Link>
                      {lensMatch && (
                        <Link
                          href="/jesus#emphases"
                          className="rounded-full border border-flame-300 bg-card text-flame-700 px-3 py-1 text-xs hover:bg-flame-50"
                        >
                          Christ in this passage
                        </Link>
                      )}
                    </div>

                    {/* Inline note editor (single-verse only) */}
                    {single !== null && noteOpen && (
                      <div className="rounded-xl border border-ink-200 bg-card-subtle p-3">
                        <label className="text-[10px] uppercase tracking-widest text-ink-500">
                          Your note on {bookName} {chapterNum}:{single}
                        </label>
                        <textarea
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          rows={3}
                          placeholder="What is the Spirit saying to you here?"
                          className="mt-1.5 w-full rounded-lg border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => {
                              saveNote(single, noteDraft);
                              setNoteOpen(false);
                            }}
                            className="rounded-full bg-flame-600 text-white px-3 py-1 text-xs hover:bg-flame-700"
                          >
                            Save note
                          </button>
                          {singleKey && marks.notes[singleKey] && (
                            <button
                              onClick={() => {
                                saveNote(single, "");
                                setNoteDraft("");
                                setNoteOpen(false);
                              }}
                              className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-500 hover:border-ink-400"
                            >
                              Delete
                            </button>
                          )}
                          <button
                            onClick={() => setNoteOpen(false)}
                            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-500 hover:border-ink-400 ml-auto"
                          >
                            Hide
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Cross-references — single-verse only */}
                    {single !== null && (() => {
                      const refs = crossRefsFor(bookId, chapterNum, single);
                      if (refs.length === 0) return null;
                      return (
                        <div className="pt-2 border-t border-ink-100">
                          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
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

                    {/* Study tools — single-verse only */}
                    {single !== null && (() => {
                      const links = studyLinksFor(bookId, chapterNum, single);
                      if (links.length === 0) return null;
                      return (
                        <div className="pt-2 border-t border-ink-100">
                          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
                            Study tools · opens in a new tab
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {links.map((l) => (
                              <a
                                key={l.label}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`${l.description} · ${l.source}`}
                                className="rounded-full bg-card border border-ink-200 px-2.5 py-0.5 text-[11px] text-ink-700 hover:border-flame-500 inline-flex items-center gap-1"
                              >
                                {l.label} <span className="text-ink-400">↗</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

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

      {mounted && shareVerse !== null && chapter && (
        <VerseCardModal
          bookId={bookId}
          bookName={bookName}
          chapter={chapterNum}
          verse={shareVerse}
          verseText={chapter.verses.find((v) => v.v === shareVerse)?.t ?? ""}
          translation={translationId}
          translationAbbrev={meta.abbrev}
          onClose={() => setShareVerse(null)}
        />
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
