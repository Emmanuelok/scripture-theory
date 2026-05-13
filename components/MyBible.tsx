"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { canon, getBook } from "@/data/bible/canon";
import { translations, type TranslationId } from "@/data/bible/translations";

type Marks = {
  highlights: string[];
  bookmarks: string[];
  notes: Record<string, string>;
};

const MARKS_STORAGE = "scripture-theory-bible-marks";

type Mark = {
  type: "highlight" | "bookmark" | "note";
  translation: TranslationId;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  note?: string;
};

function parseKey(key: string): {
  translation: TranslationId;
  bookId: string;
  chapter: number;
  verse: number;
} | null {
  const parts = key.split(":");
  if (parts.length !== 4) return null;
  const [translation, bookId, chStr, vStr] = parts;
  const chapter = Number(chStr);
  const verse = Number(vStr);
  if (Number.isNaN(chapter) || Number.isNaN(verse)) return null;
  return { translation: translation as TranslationId, bookId, chapter, verse };
}

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

export default function MyBible() {
  const [marks, setMarks] = useState<Marks>({ highlights: [], bookmarks: [], notes: {} });
  const [filter, setFilter] = useState<"all" | "highlight" | "bookmark" | "note">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMarks(loadMarks());
    setMounted(true);
  }, []);

  const all: Mark[] = useMemo(() => {
    const out: Mark[] = [];
    for (const key of marks.highlights) {
      const p = parseKey(key);
      if (!p) continue;
      const book = getBook(p.bookId);
      if (!book) continue;
      out.push({ type: "highlight", ...p, bookName: book.name });
    }
    for (const key of marks.bookmarks) {
      const p = parseKey(key);
      if (!p) continue;
      const book = getBook(p.bookId);
      if (!book) continue;
      out.push({ type: "bookmark", ...p, bookName: book.name });
    }
    for (const [key, note] of Object.entries(marks.notes)) {
      const p = parseKey(key);
      if (!p) continue;
      const book = getBook(p.bookId);
      if (!book) continue;
      out.push({ type: "note", ...p, bookName: book.name, note });
    }
    // Sort by canonical book order, then chapter, then verse.
    return out.sort((a, b) => {
      const ba = canon.findIndex((x) => x.id === a.bookId);
      const bb = canon.findIndex((x) => x.id === b.bookId);
      if (ba !== bb) return ba - bb;
      if (a.chapter !== b.chapter) return a.chapter - b.chapter;
      if (a.verse !== b.verse) return a.verse - b.verse;
      const order = { highlight: 0, bookmark: 1, note: 2 } as const;
      return order[a.type] - order[b.type];
    });
  }, [marks]);

  const visible = filter === "all" ? all : all.filter((m) => m.type === filter);

  function removeHighlight(key: string) {
    const next = { ...marks, highlights: marks.highlights.filter((k) => k !== key) };
    setMarks(next);
    saveMarks(next);
  }
  function removeBookmark(key: string) {
    const next = { ...marks, bookmarks: marks.bookmarks.filter((k) => k !== key) };
    setMarks(next);
    saveMarks(next);
  }
  function removeNote(key: string) {
    const notes = { ...marks.notes };
    delete notes[key];
    const next = { ...marks, notes };
    setMarks(next);
    saveMarks(next);
  }
  function clearAll() {
    if (typeof window === "undefined") return;
    if (!window.confirm("Delete every highlight, bookmark, and note? This can't be undone.")) return;
    const empty = { highlights: [], bookmarks: [], notes: {} };
    setMarks(empty);
    saveMarks(empty);
  }
  function exportText() {
    const lines: string[] = [
      "Scripture Theory · My Bible Marks",
      `Exported ${new Date().toLocaleString()}`,
      "",
    ];
    for (const m of all) {
      const tag = m.type === "highlight" ? "—" : m.type === "bookmark" ? "★" : "✎";
      const ref = `${m.bookName} ${m.chapter}:${m.verse} (${translations[m.translation]?.abbrev ?? m.translation})`;
      lines.push(`${tag} ${ref}`);
      if (m.type === "note" && m.note) lines.push(`   ${m.note}`);
      lines.push("");
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scripture-theory-marks-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-8 text-ink-500">
        Loading your marks…
      </div>
    );
  }

  if (all.length === 0) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-10 text-center">
        <div className="text-5xl text-ink-300">✎</div>
        <h2 className="mt-4 font-serif text-2xl text-ink-900">No marks yet.</h2>
        <p className="mt-2 text-ink-600 leading-relaxed max-w-md mx-auto">
          Open any chapter of the Bible and tap a verse — you'll be able to highlight it,
          bookmark it, or save a personal note. Everything you mark shows up here.
        </p>
        <Link
          href="/bible/john/3"
          className="mt-6 inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
        >
          Start with John 3 →
        </Link>
      </div>
    );
  }

  const counts = {
    highlight: all.filter((m) => m.type === "highlight").length,
    bookmark: all.filter((m) => m.type === "bookmark").length,
    note: all.filter((m) => m.type === "note").length,
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-ink-500">Your Bible</div>
          <div className="mt-1 text-sm text-ink-700">
            <strong className="text-ink-900">{all.length}</strong> mark{all.length === 1 ? "" : "s"} across {new Set(all.map((m) => m.bookId)).size} book{new Set(all.map((m) => m.bookId)).size === 1 ? "" : "s"}
            {" · "}{counts.highlight} highlight{counts.highlight === 1 ? "" : "s"}
            {" · "}★ {counts.bookmark} bookmark{counts.bookmark === 1 ? "" : "s"}
            {" · "}✎ {counts.note} note{counts.note === 1 ? "" : "s"}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
            All ({all.length})
          </FilterPill>
          <FilterPill active={filter === "highlight"} onClick={() => setFilter("highlight")}>
            Highlights ({counts.highlight})
          </FilterPill>
          <FilterPill active={filter === "bookmark"} onClick={() => setFilter("bookmark")}>
            ★ Bookmarks ({counts.bookmark})
          </FilterPill>
          <FilterPill active={filter === "note"} onClick={() => setFilter("note")}>
            ✎ Notes ({counts.note})
          </FilterPill>
          <button
            onClick={exportText}
            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
            title="Export all marks as a text file"
          >
            Export
          </button>
          <button
            onClick={clearAll}
            className="rounded-full border border-red-200 text-red-700 px-3 py-1 text-xs hover:bg-red-50"
          >
            Clear all
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {visible.map((m) => {
          const key = `${m.translation}:${m.bookId}:${m.chapter}:${m.verse}`;
          const tMeta = translations[m.translation];
          const icon =
            m.type === "highlight" ? (
              <span className="inline-block h-2 w-2 rounded-full bg-flame-500 mt-2" aria-label="highlight" />
            ) : m.type === "bookmark" ? (
              <span className="text-flame-600 text-base" aria-label="bookmark">★</span>
            ) : (
              <span className="text-emerald-600 text-base" aria-label="note">✎</span>
            );
          return (
            <li
              key={`${m.type}-${key}`}
              className="rounded-2xl border border-ink-200 bg-card p-4 flex items-start gap-3"
            >
              <span className="shrink-0 w-5 flex items-center justify-center pt-0.5">{icon}</span>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/bible/${m.bookId}/${m.chapter}#v${m.verse}`}
                  className="font-medium text-ink-900 hover:text-flame-700"
                >
                  {m.bookName} {m.chapter}:{m.verse}
                </Link>
                <span className="text-xs text-ink-500 ml-2">
                  {tMeta?.abbrev ?? m.translation}
                </span>
                {m.type === "note" && m.note && (
                  <p className="mt-1.5 text-sm text-ink-700 italic leading-relaxed">"{m.note}"</p>
                )}
              </div>
              <button
                onClick={() => {
                  if (m.type === "highlight") removeHighlight(key);
                  if (m.type === "bookmark") removeBookmark(key);
                  if (m.type === "note") removeNote(key);
                }}
                className="text-xs text-ink-400 hover:text-red-600 px-2 py-1 shrink-0"
                aria-label="Remove"
                title="Remove this mark"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs border transition-colors ${
        active
          ? "bg-ink-900 text-ink-50 border-ink-900"
          : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
      }`}
    >
      {children}
    </button>
  );
}
