"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  search,
  searchKindLabel,
  quickStats,
  type SearchKind,
  type SearchResult,
} from "@/lib/search";

const KIND_COLOR: Record<SearchKind, string> = {
  bible: "bg-ink-900 text-ink-50",
  scripture: "bg-flame-100 text-flame-900",
  plan: "bg-emerald-100 text-emerald-900",
  prayer: "bg-sky-100 text-sky-900",
  gospel: "bg-rose-100 text-rose-900",
  testimony: "bg-violet-100 text-violet-900",
  glossary: "bg-amber-100 text-amber-900",
  topical: "bg-lime-100 text-lime-900",
  creed: "bg-stone-200 text-stone-900",
  catechism: "bg-teal-100 text-teal-900",
  apologetic: "bg-indigo-100 text-indigo-900",
  hymn: "bg-yellow-100 text-yellow-900",
  discipline: "bg-orange-100 text-orange-900",
  path: "bg-flame-600 text-ink-50",
  course: "bg-flame-700 text-ink-50",
};

const ALL_KINDS: SearchKind[] = [
  "bible",
  "scripture",
  "topical",
  "catechism",
  "glossary",
  "creed",
  "apologetic",
  "hymn",
  "discipline",
  "path",
  "course",
  "plan",
  "prayer",
  "gospel",
  "testimony",
];

const SUGGESTIONS = [
  "John 3",
  "Romans 8",
  "Beatitudes",
  "Lord's Prayer",
  "anxiety",
  "forgiveness",
  "atonement",
  "Trinity",
  "Sub-Saharan Africa",
  "Pentecostal",
];

export default function SearchView() {
  const [q, setQ] = useState("");
  const [enabled, setEnabled] = useState<Set<SearchKind>>(new Set(ALL_KINDS));
  const stats = useMemo(() => quickStats(), []);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const allResults = useMemo(() => search(q, 80), [q]);
  const results = useMemo(
    () => allResults.filter((r) => enabled.has(r.kind)),
    [allResults, enabled]
  );

  // Group by kind for nicer display
  const grouped = useMemo(() => {
    const m = new Map<SearchKind, SearchResult[]>();
    for (const r of results) {
      if (!m.has(r.kind)) m.set(r.kind, []);
      m.get(r.kind)!.push(r);
    }
    return Array.from(m.entries());
  }, [results]);

  function toggle(k: SearchKind) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  function setAll(on: boolean) {
    setEnabled(on ? new Set(ALL_KINDS) : new Set());
  }

  const total = ALL_KINDS.reduce((n, k) => n + (stats[k] ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="rounded-3xl border border-ink-200 bg-card p-5 md:p-7 glow-ring">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.18em] text-flame-700">
            One search · {total.toLocaleString()} entries indexed
          </span>
          <div className="relative mt-2">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="A verse, a topic, a doctrine, a city, a hymn line…"
              className="w-full rounded-2xl border border-ink-200 bg-ink-50 pl-12 pr-10 py-3 text-lg text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              autoFocus
            />
            {q && (
              <button
                onClick={() => {
                  setQ("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-200 hover:bg-ink-300 text-ink-700 h-6 w-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </label>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {ALL_KINDS.map((k) => {
            const on = enabled.has(k);
            return (
              <button
                key={k}
                onClick={() => toggle(k)}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                  on
                    ? `${KIND_COLOR[k]} border-transparent`
                    : "bg-card text-ink-400 border-ink-200 hover:border-ink-400"
                }`}
                aria-pressed={on}
              >
                {searchKindLabel(k)}{" "}
                <span className="opacity-60">({stats[k]})</span>
              </button>
            );
          })}
          <button
            onClick={() => setAll(enabled.size < ALL_KINDS.length)}
            className="ml-auto text-xs text-ink-500 hover:text-ink-900 underline"
          >
            {enabled.size < ALL_KINDS.length ? "Select all" : "Deselect all"}
          </button>
        </div>
      </div>

      {/* Suggestions when no query */}
      {!q && (
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-5 md:p-6">
          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-3">
            Try one
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                className="rounded-full bg-card border border-ink-200 px-3 py-1.5 text-sm text-ink-700 hover:border-flame-500 hover:text-flame-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result summary */}
      {q && (
        <div className="text-sm text-ink-600">
          <strong className="text-ink-900">{results.length}</strong> result
          {results.length === 1 ? "" : "s"}
          {allResults.length > results.length && (
            <> · {allResults.length - results.length} hidden by filters</>
          )}
        </div>
      )}

      {/* Empty state */}
      {q && results.length === 0 && (
        <div className="rounded-3xl border border-ink-200 bg-card p-8 md:p-10 text-center">
          <p className="text-ink-700">
            No matches for <strong className="text-ink-900">"{q}"</strong>.
          </p>
          <p className="mt-2 text-sm text-ink-500">
            Try a Bible reference, a topic like "anxiety", a doctrine like "atonement", or the
            name of a hymn.
          </p>
        </div>
      )}

      {/* Grouped results */}
      {grouped.length > 0 && (
        <div className="space-y-8">
          {grouped.map(([kind, items]) => (
            <section key={kind}>
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] ${KIND_COLOR[kind]}`}
                >
                  {searchKindLabel(kind)}
                </span>
                <span className="text-xs text-ink-500">{items.length} match{items.length === 1 ? "" : "es"}</span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {items.map((r, i) => (
                  <Result key={`${r.kind}-${r.href}-${i}`} r={r} q={q} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

/** Highlight every occurrence of any query token inside a string. */
function highlight(text: string, q: string): React.ReactNode {
  const tokens = q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^\p{L}\p{N}:]/gu, ""))
    .filter((t) => t.length >= 2);
  if (tokens.length === 0) return text;
  // Build a single regex with all tokens
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark
        key={i}
        className="bg-flame-100 text-flame-900 rounded px-0.5"
      >
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function Result({ r, q }: { r: SearchResult; q: string }) {
  return (
    <li>
      <Link
        href={r.href}
        className="group relative block h-full overflow-hidden rounded-2xl border border-ink-200 bg-card p-5 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
        />
        <div className="relative">
          <div className="font-serif text-lg text-ink-900 group-hover:text-flame-700 transition-colors">
            {highlight(r.title, q)}
          </div>
          {r.subtitle && (
            <div className="text-xs text-ink-500 mt-0.5 italic">{r.subtitle}</div>
          )}
          <p className="mt-2 text-sm text-ink-700 leading-relaxed line-clamp-3">
            {highlight(r.snippet, q)}
          </p>
          <div className="mt-3 text-[10px] uppercase tracking-widest text-flame-700/70">
            Open →
          </div>
        </div>
      </Link>
    </li>
  );
}
