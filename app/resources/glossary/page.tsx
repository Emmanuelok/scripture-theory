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

  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Theological glossary.
      </h1>
      <p className="mt-3 text-ink-700 leading-relaxed">
        Plain-language definitions of the words every Christian needs to know — accurate enough
        for a pastor to nod at, short enough for a 14-year-old to read.
      </p>

      <div className="mt-8">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a term…"
          className="w-full rounded-xl border border-ink-200 bg-card px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
        />
        <div className="mt-2 text-xs text-ink-500">
          {filtered.length} of {GLOSSARY.length} terms
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {filtered.map((t) => {
          const isOpen = openSlug === t.slug;
          return (
            <li key={t.slug} className="rounded-2xl border border-ink-200 bg-card">
              <button
                onClick={() => setOpenSlug(isOpen ? null : t.slug)}
                className="w-full text-left p-4 flex flex-wrap items-baseline justify-between gap-3"
                aria-expanded={isOpen}
              >
                <div className="min-w-0">
                  <h2 className="font-serif text-lg text-ink-900">{t.word}</h2>
                  <p className="text-sm text-ink-700 mt-0.5">{t.short}</p>
                </div>
                <span className="text-flame-700 font-serif text-xl shrink-0">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="border-t border-ink-100 p-4 space-y-3">
                  <p className="text-sm text-ink-700 leading-relaxed">{t.long}</p>
                  {t.refs && t.refs.length > 0 && (
                    <div className="text-xs text-ink-500 flex flex-wrap gap-2">
                      {t.refs.map((r) => {
                        const href = referenceHref(r);
                        return (
                          <span key={r}>
                            {href ? (
                              <Link href={href} className="rounded-full bg-ink-50 border border-ink-200 px-2 py-0.5 hover:border-flame-500">
                                {r}
                              </Link>
                            ) : (
                              <span className="rounded-full bg-ink-50 border border-ink-200 px-2 py-0.5">{r}</span>
                            )}
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
  );
}
