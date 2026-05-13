"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GLOSSARY } from "@/data/resources/glossary";
import { referenceHref } from "@/lib/reference";

export default function GlossaryPage() {
  const [q, setQ] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const sorted = [...GLOSSARY].sort((a, b) => a.word.localeCompare(b.word));
    if (!q.trim()) return sorted;
    const n = q.trim().toLowerCase();
    return sorted.filter(
      (t) => t.word.toLowerCase().includes(n) || t.short.toLowerCase().includes(n) || t.long.toLowerCase().includes(n)
    );
  }, [q]);

  // Group by first letter for an A-Z index
  const byLetter = useMemo(() => {
    const m = new Map<string, typeof GLOSSARY>();
    for (const t of filtered) {
      const ch = (t.word[0] ?? "?").toUpperCase();
      if (!m.has(ch)) m.set(ch, []);
      m.get(ch)!.push(t);
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        Theological{" "}
        <span className="gradient-text">glossary.</span>
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        Plain-language definitions of the words every Christian needs to know — accurate enough
        for a pastor to nod at, short enough for a 14-year-old to read. {GLOSSARY.length} terms,
        clickable scripture references.
      </p>

      <div className="mt-8 sticky top-16 z-20 -mx-5 px-5 py-3 backdrop-blur bg-ink-50/85 border-y border-ink-200">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="atonement, grace, Trinity…"
              className="w-full rounded-full border border-ink-200 bg-card pl-9 pr-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
            />
          </div>
          <span className="text-xs text-ink-500">
            {filtered.length} of {GLOSSARY.length} terms
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1 text-[10px] uppercase tracking-widest">
          {byLetter.map(([ch]) => (
            <a
              key={ch}
              href={`#letter-${ch}`}
              className="rounded-full border border-ink-200 bg-card w-7 h-7 inline-flex items-center justify-center text-ink-600 hover:border-flame-500 hover:text-flame-700"
            >
              {ch}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {byLetter.map(([letter, items]) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-44">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-serif text-4xl text-flame-700/50">{letter}</span>
              <span className="text-[10px] uppercase tracking-widest text-ink-500">
                {items.length} terms
              </span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {items.map((t) => {
                const isOpen = openSlug === t.slug;
                return (
                  <li
                    key={t.slug}
                    className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-card hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
                    />
                    <button
                      onClick={() => setOpenSlug(isOpen ? null : t.slug)}
                      className="w-full text-left p-4 flex flex-wrap items-baseline justify-between gap-3 relative"
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0">
                        <h2 className="font-serif text-lg text-ink-900 group-hover:text-flame-700 transition-colors">
                          {t.word}
                        </h2>
                        <p className="text-sm text-ink-700 mt-0.5 leading-relaxed">{t.short}</p>
                      </div>
                      <span className="text-flame-700 font-serif text-xl shrink-0 transition-transform" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-ink-100 p-4 space-y-3 relative">
                        <p className="text-sm text-ink-700 leading-relaxed">{t.long}</p>
                        {t.refs && t.refs.length > 0 && (
                          <div className="text-xs text-ink-500 flex flex-wrap gap-1.5">
                            {t.refs.map((r) => {
                              const href = referenceHref(r);
                              return href ? (
                                <Link
                                  key={r}
                                  href={href}
                                  className="rounded-full bg-card-subtle border border-ink-200 px-2.5 py-0.5 hover:border-flame-500"
                                >
                                  {r}
                                </Link>
                              ) : (
                                <span
                                  key={r}
                                  className="rounded-full bg-card-subtle border border-ink-200 px-2.5 py-0.5"
                                >
                                  {r}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-500 italic">
          No term matches "{q}". Try atonement, grace, Trinity…
        </p>
      )}
    </section>
  );
}
