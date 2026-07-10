"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChapterText } from "@/data/bible/seed";
import { passages as lensPassages } from "@/data/lens";
import {
  translations,
  translationOrder,
  type TranslationId,
} from "@/data/bible/translations";
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

const HIGHLIGHT_COLORS: {
  id: HighlightColor;
  label: string;
  swatch: string;
  bg: string;
  bgDark: string;
}[] = [
  {
    id: "amber",
    label: "Amber",
    swatch: "bg-amber-400",
    bg: "bg-amber-100",
    bgDark: "dark:bg-amber-300/20",
  },
  {
    id: "yellow",
    label: "Yellow",
    swatch: "bg-yellow-300",
    bg: "bg-yellow-100",
    bgDark: "dark:bg-yellow-300/20",
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "bg-rose-400",
    bg: "bg-rose-100",
    bgDark: "dark:bg-rose-300/20",
  },
  {
    id: "sky",
    label: "Sky",
    swatch: "bg-sky-400",
    bg: "bg-sky-100",
    bgDark: "dark:bg-sky-300/20",
  },
  {
    id: "emerald",
    label: "Emerald",
    swatch: "bg-emerald-400",
    bg: "bg-emerald-100",
    bgDark: "dark:bg-emerald-300/20",
  },
  {
    id: "violet",
    label: "Violet",
    swatch: "bg-violet-400",
    bg: "bg-violet-100",
    bgDark: "dark:bg-violet-300/20",
  },
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

type TranslationLoadState =
  | { status: "loading" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      code?: string;
      retryable: boolean;
    };

type ErrorPayload = {
  error?: unknown;
  code?: unknown;
  retryable?: unknown;
};

const MARKS_STORAGE_BASE = "scripture-theory-bible-marks";
function MARKS_STORAGE() {
  return slotKey(MARKS_STORAGE_BASE);
}
const TRANSLATION_PREF = "scripture-theory-translation";
const READER_PREFS = "scripture-theory-reader";
const MAX_COMPARE_TRANSLATIONS = 3;

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
  try {
    window.localStorage.setItem(MARKS_STORAGE(), JSON.stringify(m));
  } catch {
    // Storage full / disabled (private mode). Highlights are best-effort —
    // never let a quota error thrown from a setState updater crash the reader.
  }
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
      fontScale:
        typeof parsed.fontScale === "number"
          ? parsed.fontScale
          : defaults.fontScale,
      spacing: parsed.spacing === "compact" ? "compact" : "comfortable",
      layout: parsed.layout === "line" ? "line" : "flow",
      highlightColor: HIGHLIGHT_COLORS.some(
        (c) => c.id === parsed.highlightColor,
      )
        ? parsed.highlightColor
        : "amber",
    };
  } catch {
    return defaults;
  }
}

function savePrefs(p: ReaderPrefs) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(READER_PREFS, JSON.stringify(p));
  } catch {
    // Storage full / disabled — reader prefs are best-effort.
  }
}

function verseKey(
  translation: TranslationId,
  bookId: string,
  chapter: number,
  v: number,
) {
  return `${translation}:${bookId}:${chapter}:${v}`;
}

function normalizedCompare(
  ids: TranslationId[],
  active: TranslationId,
): TranslationId[] {
  return translationOrder
    .filter((id) => id !== active && ids.includes(id))
    .slice(0, MAX_COMPARE_TRANSLATIONS);
}

function readerQuery(
  translation: TranslationId,
  compare: TranslationId[],
): string {
  const params = new URLSearchParams({ translation });
  const normalized = normalizedCompare(compare, translation);
  if (normalized.length > 0) params.set("compare", normalized.join(","));
  return `?${params.toString()}`;
}

function chapterFromPayload(
  data: unknown,
  translation: TranslationId,
  bookId: string,
  chapter: number,
): ChapterText | null {
  if (!data || typeof data !== "object" || !("verses" in data)) return null;
  const rawVerses = (data as { verses?: unknown }).verses;
  if (!Array.isArray(rawVerses)) return null;
  const verses = rawVerses
    .map((verse) => {
      if (!verse || typeof verse !== "object") return null;
      const v = Number((verse as { v?: unknown }).v);
      const t = (verse as { t?: unknown }).t;
      if (!Number.isInteger(v) || v < 1 || typeof t !== "string" || !t.trim())
        return null;
      return { v, t: t.trim() };
    })
    .filter((verse): verse is { v: number; t: string } => Boolean(verse));
  if (verses.length === 0) return null;
  return { book: bookId, chapter, translation, verses };
}

function providerSummary(id: TranslationId): string {
  const meta = translations[id];
  if (meta.provider === "crossway") {
    return "Crossway ESV API · licensed · live-only · never stored offline";
  }
  if (meta.provider === "bible-api") {
    return "bible-api.com · public domain · eligible for offline cache after opening";
  }
  return meta.coverage === "selected"
    ? "Verified bundled text · selected passages"
    : "Verified bundled text";
}

export default function BibleChapter({
  chapters,
  bookId,
  bookName,
  chapterNum,
  available,
  initialTranslation,
  initialCompare,
  translationFromUrl,
  initialStateMessage,
  prev,
  next,
}: {
  chapters: Record<TranslationId, ChapterText | undefined>;
  bookId: string;
  bookName: string;
  chapterNum: number;
  available: TranslationId[];
  initialTranslation: TranslationId;
  initialCompare: TranslationId[];
  translationFromUrl: boolean;
  initialStateMessage?: string | null;
  prev: { book: string; chapter: number; bookName: string } | null;
  next: { book: string; chapter: number; bookName: string } | null;
}) {
  const startingTranslation = available.includes(initialTranslation)
    ? initialTranslation
    : (available[0] ?? "WEB");
  const [translationId, setTranslationId] =
    useState<TranslationId>(startingTranslation);
  const [marks, setMarks] = useState<Marks>({
    highlights: {},
    bookmarks: [],
    notes: {},
  });
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
  const [compareOpen, setCompareOpen] = useState(initialCompare.length > 0);
  const [compareIds, setCompareIds] = useState<TranslationId[]>(() =>
    normalizedCompare(initialCompare, startingTranslation),
  );
  const [fetched, setFetched] = useState<
    Partial<Record<TranslationId, ChapterText>>
  >({});
  const [loadStates, setLoadStates] = useState<
    Partial<Record<TranslationId, TranslationLoadState>>
  >({});
  const [hintDismissed, setHintDismissed] = useState(false);
  const [stateMessage, setStateMessage] = useState(initialStateMessage ?? null);
  const inFlight = useRef<Map<TranslationId, AbortController>>(new Map());
  const copiedTimer = useRef<number | null>(null);

  useEffect(() => {
    setMarks(loadMarks());
    setPrefs(loadPrefs());
    if (typeof window !== "undefined") {
      try {
        const pref = window.localStorage.getItem(
          TRANSLATION_PREF,
        ) as TranslationId | null;
        if (!translationFromUrl && pref && available.includes(pref)) {
          setTranslationId(pref);
          setCompareIds((current) => normalizedCompare(current, pref));
        }
        setHintDismissed(
          window.localStorage.getItem("scripture-theory-bible-hint") === "1",
        );
      } catch {
        // Preferences are best-effort when storage is disabled.
      }
    }
    setMounted(true);
  }, [available, translationFromUrl]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("translation", translationId);
    const normalized = normalizedCompare(compareIds, translationId);
    if (normalized.length > 0) params.set("compare", normalized.join(","));
    else params.delete("compare");
    const search = params.toString();
    const nextUrl = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [compareIds, mounted, translationId]);

  useEffect(() => {
    const activeRequests = inFlight.current;
    return () => {
      for (const controller of activeRequests.values()) controller.abort();
      activeRequests.clear();
      if (copiedTimer.current !== null)
        window.clearTimeout(copiedTimer.current);
    };
  }, []);

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
        }),
      );
    } catch {}
  }, [bookId, bookName, chapterNum, translationId]);

  const loadTranslation = useCallback(
    async (id: TranslationId, force = false) => {
      if (!force && (chapters[id] || fetched[id])) return;
      if (inFlight.current.has(id)) return;

      const controller = new AbortController();
      inFlight.current.set(id, controller);
      setLoadStates((current) => ({ ...current, [id]: { status: "loading" } }));

      try {
        const response = await fetch(
          `/api/bible/${id}/${bookId}/${chapterNum}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json" },
            cache:
              translations[id].provider === "crossway" ? "no-store" : "default",
          },
        );
        const payload = (await response
          .json()
          .catch(() => null)) as ErrorPayload | null;

        if (!response.ok) {
          const message =
            payload && typeof payload.error === "string"
              ? payload.error
              : `${translations[id].name} could not be loaded.`;
          const error = new Error(message) as Error & {
            code?: string;
            retryable?: boolean;
          };
          if (payload && typeof payload.code === "string")
            error.code = payload.code;
          error.retryable =
            payload && typeof payload.retryable === "boolean"
              ? payload.retryable
              : response.status === 429 || response.status >= 500;
          throw error;
        }

        const loaded = chapterFromPayload(payload, id, bookId, chapterNum);
        if (!loaded) {
          const error = new Error(
            `${translations[id].name} returned an unreadable chapter. Please try again.`,
          ) as Error & { code?: string; retryable?: boolean };
          error.code = "INVALID_PROVIDER_RESPONSE";
          error.retryable = true;
          throw error;
        }

        if (controller.signal.aborted) return;
        setFetched((current) => ({ ...current, [id]: loaded }));
        setLoadStates((current) => ({
          ...current,
          [id]: { status: "success" },
        }));
      } catch (cause) {
        if (controller.signal.aborted) return;
        const error = cause as Error & { code?: string; retryable?: boolean };
        const offline = typeof navigator !== "undefined" && !navigator.onLine;
        const message = offline
          ? translations[id].provider === "crossway"
            ? "This licensed translation is live-only. Reconnect and try again."
            : "You appear to be offline and this chapter is not cached on this device yet."
          : error.message || `${translations[id].name} could not be loaded.`;
        setLoadStates((current) => ({
          ...current,
          [id]: {
            status: "error",
            message,
            code: error.code,
            retryable: error.retryable ?? true,
          },
        }));
      } finally {
        if (inFlight.current.get(id) === controller)
          inFlight.current.delete(id);
      }
    },
    [bookId, chapterNum, chapters, fetched],
  );

  useEffect(() => {
    if (!mounted) return;
    void loadTranslation(translationId);
  }, [loadTranslation, mounted, translationId]);

  useEffect(() => {
    if (!mounted) return;
    for (const id of compareIds) void loadTranslation(id);
  }, [compareIds, loadTranslation, mounted]);

  function pickTranslation(t: TranslationId) {
    setTranslationId(t);
    setCompareIds((current) => normalizedCompare(current, t));
    setStateMessage(null);
    try {
      window.localStorage.setItem(TRANSLATION_PREF, t);
    } catch {}
  }

  function toggleCompare(t: TranslationId) {
    setStateMessage(null);
    setCompareIds((current) => {
      if (current.includes(t)) return current.filter((id) => id !== t);
      if (current.length >= MAX_COMPARE_TRANSLATIONS) return current;
      return normalizedCompare([...current, t], translationId);
    });
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
  const activeLoad = loadStates[translationId];
  const compareLimitReached = compareIds.length >= MAX_COMPARE_TRANSLATIONS;
  const navigationQuery = useMemo(
    () => readerQuery(translationId, compareIds),
    [compareIds, translationId],
  );

  const lensMatch = useMemo(() => {
    const ref = `${bookName} ${chapterNum}`.toLowerCase();
    return lensPassages.find((p) =>
      p.reference.toLowerCase().startsWith(ref.split(":")[0]),
    );
  }, [bookName, chapterNum]);

  function update(patch: Partial<Marks>) {
    setMarks((prev) => {
      const next = { ...prev, ...patch };
      saveMarks(next);
      return next;
    });
  }

  function toggleSelection(v: number) {
    setSelection((cur) =>
      cur.includes(v)
        ? cur.filter((x) => x !== v)
        : [...cur, v].sort((a, b) => a - b),
    );
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
    const keys = selection.map((v) =>
      verseKey(translationId, bookId, chapterNum, v),
    );
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
      if (copiedTimer.current !== null)
        window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => {
        setCopied(false);
        copiedTimer.current = null;
      }, 1800);
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

  const totalHighlights = Object.keys(marks.highlights).filter((k) =>
    k.includes(`:${bookId}:${chapterNum}:`),
  ).length;
  const totalBookmarks = marks.bookmarks.filter((k) =>
    k.includes(`:${bookId}:${chapterNum}:`),
  ).length;
  const totalNotes = Object.keys(marks.notes).filter((k) =>
    k.includes(`:${bookId}:${chapterNum}:`),
  ).length;
  const hasMarks = totalHighlights + totalBookmarks + totalNotes > 0;

  const fontScale = mounted ? prefs.fontScale : 1;
  const lineLeading =
    mounted && prefs.spacing === "compact"
      ? "leading-relaxed"
      : "leading-loose";

  return (
    <article className="space-y-6">
      {/* Reader controls bar */}
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-3 md:p-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        {/* Translation dropdown */}
        <label className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-widest text-ink-500 shrink-0">
            Translation
          </span>
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
        <div
          className="flex items-center gap-1 sm:ml-auto"
          role="group"
          aria-label="Text size"
        >
          <span className="text-[10px] uppercase tracking-widest text-ink-500 mr-1">
            Size
          </span>
          {FONT_SCALES.map((s) => (
            <button
              type="button"
              key={s.value}
              onClick={() => updatePrefs({ fontScale: s.value })}
              className={`h-10 w-10 rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400 ${
                Math.abs(fontScale - s.value) < 0.01
                  ? "bg-ink-900 text-ink-50"
                  : "text-ink-500 hover:text-ink-900"
              }`}
              aria-pressed={Math.abs(fontScale - s.value) < 0.01}
              aria-label={`Text size ${s.label}`}
              title={`Text size ${s.label}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Spacing toggle */}
        <button
          type="button"
          onClick={() =>
            updatePrefs({
              spacing: prefs.spacing === "compact" ? "comfortable" : "compact",
            })
          }
          className="min-h-10 rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400"
          aria-pressed={prefs.spacing === "compact"}
          title="Toggle line spacing"
        >
          Compact spacing
        </button>

        {/* Verse layout toggle */}
        <button
          type="button"
          onClick={() =>
            updatePrefs({ layout: prefs.layout === "flow" ? "line" : "flow" })
          }
          className="min-h-10 rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400"
          aria-pressed={prefs.layout === "line"}
          title="Continuous paragraph vs one verse per line"
        >
          One verse per line
        </button>

        <Link
          href="/bible/my"
          className="rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-ink-900 inline-flex items-center gap-1.5"
          title="Your highlights, bookmarks, and notes"
        >
          <span aria-hidden>✎</span> My marks
        </Link>
        <p className="w-full text-[11px] leading-relaxed text-ink-500">
          <span className="font-medium text-ink-700">Provider:</span>{" "}
          {providerSummary(translationId)}
        </p>
      </div>

      {stateMessage && (
        <div
          role="status"
          className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900"
        >
          {stateMessage}
        </div>
      )}

      {/* Tap-a-verse hint (one-time) */}
      {mounted && !hintDismissed && (
        <div className="rounded-2xl border border-flame-200 bg-flame-50/60 p-4 text-sm text-flame-900 flex items-start justify-between gap-3">
          <span>
            <strong>Tip:</strong> select any verse by tapping, clicking, or
            pressing Enter or Space. Select more verses to build a range. The
            action bar lets you highlight, bookmark, note, copy, share, and more
            without blocking the chapter.
          </span>
          <button
            type="button"
            onClick={dismissHint}
            className="min-h-10 px-2 text-xs text-flame-700 hover:underline shrink-0"
          >
            Got it
          </button>
        </div>
      )}

      <div
        className="rounded-3xl border border-ink-200 bg-card p-4 md:p-6 lg:p-8 glow-ring overflow-hidden"
        style={{ fontSize: `${fontScale}rem` }}
      >
        {chapter ? (
          <div
            lang={meta.bcp47}
            dir={meta.dir ?? "ltr"}
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
              return (
                <button
                  type="button"
                  key={verse.v}
                  id={`v${verse.v}`}
                  aria-pressed={isActive}
                  className={`group appearance-none border-0 bg-transparent p-0 text-left text-inherit cursor-pointer scroll-mt-24 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-500 focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                    color ? `${highlightBg(color)} rounded px-1 -mx-1` : ""
                  } ${
                    isActive
                      ? "ring-2 ring-flame-400 ring-offset-2 ring-offset-card rounded"
                      : ""
                  } ${lineMode ? "block w-full py-1" : "inline"}`}
                  onClick={() => toggleSelection(verse.v)}
                >
                  <sup className="text-[0.6em] text-flame-700 font-sans font-medium align-super mr-0.5 select-none">
                    {verse.v}
                  </sup>
                  <span>{verse.t}</span>
                  {isBk && (
                    <span className="text-flame-600 ml-1 select-none">
                      <span aria-hidden>★</span>
                      <span className="sr-only"> Bookmarked</span>
                    </span>
                  )}
                  {hasNote && (
                    <span className="text-emerald-600 ml-1 select-none">
                      <span aria-hidden>✎</span>
                      <span className="sr-only"> Has note</span>
                    </span>
                  )}
                  {!lineMode && " "}
                </button>
              );
            })}
          </div>
        ) : activeLoad?.status === "error" ? (
          <TranslationErrorPanel
            id={translationId}
            state={activeLoad}
            onRetry={() => void loadTranslation(translationId, true)}
            onSwitch={
              translationId !== "WEB" && available.includes("WEB")
                ? () => pickTranslation("WEB")
                : undefined
            }
          />
        ) : (
          <ChapterSkeleton label={`Loading ${meta.name}`} />
        )}

        {hasMarks && (
          <div className="mt-6 pt-3 border-t border-ink-100 text-xs text-ink-500 flex flex-wrap gap-3">
            {totalHighlights > 0 && (
              <span>
                {totalHighlights} highlight{totalHighlights > 1 && "s"}
              </span>
            )}
            {totalBookmarks > 0 && (
              <span>
                ★ {totalBookmarks} bookmark{totalBookmarks > 1 && "s"}
              </span>
            )}
            {totalNotes > 0 && (
              <span>
                ✎ {totalNotes} note{totalNotes > 1 && "s"}
              </span>
            )}
          </div>
        )}

        {/* Publisher attribution for licensed translations (e.g. ESV). */}
        {meta?.attribution && chapter && (
          <p className="mt-6 pt-3 border-t border-ink-100 text-[11px] text-ink-500 italic leading-relaxed">
            {meta.attribution}{" "}
            {meta.attributionUrl && (
              <a
                href={meta.attributionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="not-italic text-flame-700 underline underline-offset-2 hover:text-flame-800"
              >
                Publisher page ↗
              </a>
            )}
          </p>
        )}
      </div>

      {available.length > 1 && (
        <div className="rounded-3xl border border-ink-200 bg-card p-6">
          <button
            type="button"
            onClick={() => setCompareOpen((v) => !v)}
            className="w-full min-h-10 text-left flex items-center justify-between text-sm text-ink-700 hover:text-flame-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400"
            aria-expanded={compareOpen}
            aria-controls="translation-comparison"
          >
            <span>
              Compare side-by-side ({available.length - 1} other{" "}
              {available.length - 1 === 1 ? "translation" : "translations"}{" "}
              available)
            </span>
            <span aria-hidden className="text-flame-700 font-serif text-xl">
              {compareOpen ? "−" : "+"}
            </span>
          </button>
          {compareOpen && (
            <div id="translation-comparison" className="mt-4">
              <p className="mb-3 text-xs text-ink-500">
                Choose up to {MAX_COMPARE_TRANSLATIONS} editions. Your selection
                is saved in the page link.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {available
                  .filter((id) => id !== translationId)
                  .map((id) => {
                    const t = translations[id];
                    const on = compareIds.includes(id);
                    return (
                      <button
                        type="button"
                        key={id}
                        onClick={() => toggleCompare(id)}
                        aria-pressed={on}
                        disabled={!on && compareLimitReached}
                        className={`min-h-10 rounded-full px-3 py-1 text-xs border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400 disabled:cursor-not-allowed disabled:opacity-45 ${
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
                <div className="grid gap-4 lg:grid-cols-2">
                  {compareIds.map((id) => {
                    const cText = chapters[id] ?? fetched[id];
                    const m = translations[id];
                    const comparisonLoad = loadStates[id];
                    return (
                      <div
                        key={id}
                        className="rounded-2xl border border-ink-200 p-4"
                      >
                        <div className="text-xs uppercase tracking-widest text-flame-700 mb-2">
                          {m.name} · {m.year}
                        </div>
                        <div className="mb-3 text-[11px] leading-relaxed text-ink-500">
                          {providerSummary(id)}
                        </div>
                        {cText ? (
                          <div
                            lang={m.bcp47}
                            dir={m.dir ?? "ltr"}
                            className="prose-scripture text-ink-800 text-sm"
                          >
                            {cText.verses.map((v) => (
                              <span key={v.v}>
                                <sup className="text-[10px] text-flame-700 mr-0.5">
                                  {v.v}
                                </sup>
                                <span>{v.t}</span>{" "}
                              </span>
                            ))}
                          </div>
                        ) : comparisonLoad?.status === "error" ? (
                          <div
                            role="alert"
                            className="rounded-xl bg-rose-50 p-3 text-xs text-rose-900"
                          >
                            <p>{comparisonLoad.message}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {comparisonLoad.retryable && (
                                <button
                                  type="button"
                                  onClick={() => void loadTranslation(id, true)}
                                  className="min-h-9 rounded-full bg-rose-900 px-3 text-white"
                                >
                                  Retry
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => toggleCompare(id)}
                                className="min-h-9 rounded-full border border-rose-300 px-3"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            role="status"
                            aria-live="polite"
                            className="text-xs text-ink-500 italic"
                          >
                            Loading {m.abbrev}…
                          </div>
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
      {mounted &&
        selection.length > 0 &&
        chapter &&
        (() => {
          const firstV = selection[0];
          const lastV = selection[selection.length - 1];
          const ref =
            selection.length === 1
              ? `${bookName} ${chapterNum}:${firstV}`
              : `${bookName} ${chapterNum}:${firstV}–${lastV} (${selection.length})`;
          const single = selection.length === 1 ? firstV : null;
          const singleKey =
            single !== null
              ? verseKey(translationId, bookId, chapterNum, single)
              : null;
          const allBookmarked = selection.every((v) =>
            marks.bookmarks.includes(
              verseKey(translationId, bookId, chapterNum, v),
            ),
          );
          const anyHighlighted = selection.some((v) =>
            Boolean(
              marks.highlights[verseKey(translationId, bookId, chapterNum, v)],
            ),
          );
          return (
            <div
              className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
              role="region"
              aria-label="Verse actions"
              // Wrapper isn't blocking — only the inner card receives events.
            >
              <div className="mx-auto max-w-3xl px-3 pb-3 sm:pb-4 pointer-events-auto">
                <div className="rounded-2xl border border-flame-300 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 shadow-2xl">
                  {/* Top row — selection meta */}
                  <div className="flex items-center gap-2 px-3 pt-2.5 pb-1.5 border-b border-ink-100">
                    <span className="text-[11px] uppercase tracking-widest text-flame-700 truncate">
                      {ref}{" "}
                      <span className="text-ink-400 normal-case tracking-normal">
                        · {meta.abbrev}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setToolbarOpen((v) => !v)}
                      className="ml-auto text-[11px] text-ink-500 hover:text-ink-900"
                      title={toolbarOpen ? "Collapse" : "Expand"}
                      aria-label={
                        toolbarOpen
                          ? "Collapse verse actions"
                          : "Expand verse actions"
                      }
                      aria-expanded={toolbarOpen}
                      aria-controls="verse-action-controls"
                    >
                      {toolbarOpen ? "▾" : "▴"}
                    </button>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-[11px] text-ink-500 hover:text-ink-900"
                      aria-label="Clear selection"
                    >
                      Clear
                    </button>
                  </div>

                  {toolbarOpen && (
                    <div
                      id="verse-action-controls"
                      className="px-3 pt-2 pb-3 space-y-2.5 max-h-[55vh] overflow-y-auto overscroll-contain"
                    >
                      {/* Highlight color swatches */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase tracking-widest text-ink-500">
                          Highlight
                        </span>
                        {HIGHLIGHT_COLORS.map((c) => (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => applyHighlight(c.id)}
                            title={c.label}
                            aria-label={`Highlight ${c.label}`}
                            aria-pressed={prefs.highlightColor === c.id}
                            className={`h-10 w-10 rounded-full ${c.swatch} ring-2 focus-visible:outline-none focus-visible:ring-ink-900 ${
                              prefs.highlightColor === c.id
                                ? "ring-ink-900 ring-offset-1 ring-offset-card"
                                : "ring-transparent"
                            } hover:scale-110 transition-transform`}
                          />
                        ))}
                        {anyHighlighted && (
                          <button
                            type="button"
                            onClick={clearHighlight}
                            className="min-h-10 px-2 text-[11px] text-ink-500 hover:text-ink-900 underline ml-1"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Action chips */}
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={toggleBookmarkSelection}
                          className="min-h-10 rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                        >
                          {allBookmarked ? "★ Bookmarked" : "★ Bookmark"}
                        </button>
                        {single !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setNoteOpen((v) => !v);
                              setNoteDraft(
                                singleKey ? (marks.notes[singleKey] ?? "") : "",
                              );
                            }}
                            className="min-h-10 rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                          >
                            ✎{" "}
                            {singleKey && marks.notes[singleKey]
                              ? "Edit note"
                              : "Note"}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={copySelection}
                          className="min-h-10 rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                        <button
                          type="button"
                          onClick={shareSelection}
                          className="min-h-10 rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-800 hover:border-ink-900"
                        >
                          Share text
                        </button>
                        {single !== null && (
                          <button
                            type="button"
                            onClick={() => setShareVerse(single)}
                            className="min-h-10 rounded-full border border-flame-300 bg-card text-flame-700 px-3 py-1 text-xs hover:bg-flame-50"
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
                              `${bookName} ${chapterNum}:${single}`,
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
                          <label
                            htmlFor="verse-note"
                            className="text-[10px] uppercase tracking-widest text-ink-500"
                          >
                            Your note on {bookName} {chapterNum}:{single}
                          </label>
                          <textarea
                            id="verse-note"
                            value={noteDraft}
                            onChange={(e) => setNoteDraft(e.target.value)}
                            rows={3}
                            placeholder="What is the Spirit saying to you here?"
                            className="mt-1.5 w-full rounded-lg border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              type="button"
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
                                type="button"
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
                              type="button"
                              onClick={() => setNoteOpen(false)}
                              className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-500 hover:border-ink-400 ml-auto"
                            >
                              Hide
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Cross-references — single-verse only */}
                      {single !== null &&
                        (() => {
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
                      {single !== null &&
                        (() => {
                          const links = studyLinksFor(
                            bookId,
                            chapterNum,
                            single,
                          );
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
                                    {l.label}{" "}
                                    <span className="text-ink-400">↗</span>
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
            href={`/bible/${prev.book}/${prev.chapter}${navigationQuery}`}
            className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900"
          >
            ← {prev.bookName} {prev.chapter}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/bible/${next.book}/${next.chapter}${navigationQuery}`}
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700"
          >
            {next.bookName} {next.chapter} →
          </Link>
        )}
      </div>

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

function TranslationErrorPanel({
  id,
  state,
  onRetry,
  onSwitch,
}: {
  id: TranslationId;
  state: Extract<TranslationLoadState, { status: "error" }>;
  onRetry: () => void;
  onSwitch?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-rose-200 bg-rose-50/80 p-5 text-sm text-rose-950"
    >
      <h2 className="font-serif text-xl">
        Couldn’t load {translations[id].abbrev}
      </h2>
      <p className="mt-2 leading-relaxed">{state.message}</p>
      <p className="mt-2 text-xs text-rose-800">{providerSummary(id)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {state.retryable && (
          <button
            type="button"
            onClick={onRetry}
            className="min-h-10 rounded-full bg-rose-900 px-4 text-xs font-medium text-white hover:bg-rose-800"
          >
            Retry
          </button>
        )}
        {onSwitch && (
          <button
            type="button"
            onClick={onSwitch}
            className="min-h-10 rounded-full border border-rose-300 bg-white px-4 text-xs font-medium text-rose-900"
          >
            Switch to WEB
          </button>
        )}
      </div>
    </div>
  );
}

function ChapterSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div aria-hidden className="space-y-3 animate-pulse">
        <div className="h-4 bg-ink-100 rounded w-full" />
        <div className="h-4 bg-ink-100 rounded w-11/12" />
        <div className="h-4 bg-ink-100 rounded w-10/12" />
        <div className="h-4 bg-ink-100 rounded w-full" />
        <div className="h-4 bg-ink-100 rounded w-9/12" />
      </div>
    </div>
  );
}
