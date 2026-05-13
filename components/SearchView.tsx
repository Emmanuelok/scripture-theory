"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { search, searchKindLabel, quickStats, type SearchKind, type SearchResult } from "@/lib/search";

const KIND_COLOR: Record<SearchKind, string> = {
  bible: "bg-ink-900 text-ink-50",
  scripture: "bg-flame-100 text-flame-900",
  plan: "bg-emerald-100 text-emerald-900",
  prayer: "bg-sky-100 text-sky-900",
  gospel: "bg-rose-100 text-rose-900",
  testimony: "bg-violet-100 text-violet-900",
};

const ALL_KINDS: SearchKind[] = ["bible", "scripture", "plan", "prayer", "gospel", "testimony"];

const SUGGESTIONS = [
  "John 3",
  "Romans 8",
  "Beatitudes",
  "Lord's Prayer",
  "Sub-Saharan Africa",
  "Lagos",
  "Pentecostal",
  "forgiveness",
  "hope",
  "abide",
];

export default function SearchView() {
  const [q, setQ] = useState("");
  const [enabled, setEnabled] = useState<Set<SearchKind>>(new Set(ALL_KINDS));
  const stats = useMemo(() => quickStats(), []);

  const allResults = useMemo(() => search(q), [q]);
  const results = useMemo(
    () => allResults.filter((r) => enabled.has(r.kind)),
    [allResults, enabled]
  );

  function toggle(k: SearchKind) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-ink-200 bg-card p-5 md:p-7 glow-ring">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-ink-400">
            Search across the platform
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="A verse, a topic, a city, a tradition…"
            className="mt-2 w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-lg text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
            autoFocus
          />
        </label>

        <div className="mt-4 flex flex-wrap items-center gap-2">
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
        </div>
      </div>

      {!q && (
        <div className="rounded-2xl border border-ink-200 bg-ink-50/60 p-5">
          <div className="text-xs uppercase tracking-widest text-ink-500 mb-3">Try one</div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                className="rounded-full bg-card border border-ink-200 px-3 py-1 text-sm text-ink-700 hover:border-flame-500"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {q && (
        <div className="text-sm text-ink-600">
          <strong className="text-ink-900">{results.length}</strong> result
          {results.length === 1 ? "" : "s"}
          {allResults.length > results.length && (
            <> · {allResults.length - results.length} hidden by filters</>
          )}
        </div>
      )}

      {q && results.length === 0 && (
        <div className="rounded-2xl border border-ink-200 bg-card p-8 text-center text-ink-600">
          No matches yet. The platform is small at pilot — try a Bible reference, a city, a
          tradition, or a topic like "hope" or "forgiveness".
        </div>
      )}

      {results.length > 0 && (
        <ul className="space-y-3">
          {results.map((r, i) => (
            <Result key={`${r.kind}-${r.href}-${i}`} r={r} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Result({ r }: { r: SearchResult }) {
  return (
    <li>
      <Link
        href={r.href}
        className="block rounded-2xl border border-ink-200 bg-card p-5 hover:border-flame-500 transition-colors"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] ${KIND_COLOR[r.kind]}`}>
            {searchKindLabel(r.kind)}
          </span>
          <span className="text-xs text-ink-400">{r.href}</span>
        </div>
        <div className="mt-2 font-serif text-lg text-ink-900">{r.title}</div>
        {r.subtitle && <div className="text-xs text-ink-500 mt-0.5 italic">{r.subtitle}</div>}
        <p className="mt-2 text-sm text-ink-700 leading-relaxed line-clamp-3">{r.snippet}</p>
      </Link>
    </li>
  );
}
