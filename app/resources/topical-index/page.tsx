"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TOPICS, CATEGORIES } from "@/data/resources/topics";
import { referenceHref } from "@/lib/reference";

export default function TopicalIndexPage() {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let xs = TOPICS;
    if (cat !== "all") xs = xs.filter((t) => t.category === cat);
    if (q.trim()) {
      const n = q.trim().toLowerCase();
      xs = xs.filter(
        (t) =>
          t.title.toLowerCase().includes(n) ||
          t.blurb.toLowerCase().includes(n) ||
          t.verses.some((v) => v.text.toLowerCase().includes(n) || v.ref.toLowerCase().includes(n))
      );
    }
    return xs;
  }, [cat, q]);

  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Topical Scripture index.
      </h1>
      <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">
        What the Bible says about the situations of an ordinary life. Pick a topic; read the
        verses; carry one with you today.
      </p>

      <div className="mt-8 rounded-2xl border border-ink-200 bg-card-subtle p-5">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a topic or a verse…"
          className="w-full rounded-xl border border-ink-200 bg-card px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill active={cat === "all"} onClick={() => setCat("all")}>
            All ({TOPICS.length})
          </Pill>
          {CATEGORIES.map((c) => {
            const n = TOPICS.filter((t) => t.category === c).length;
            return (
              <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
                {c} ({n})
              </Pill>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {filtered.map((t) => {
          const isOpen = openSlug === t.slug;
          return (
            <li key={t.slug} className="rounded-2xl border border-ink-200 bg-card">
              <button
                onClick={() => setOpenSlug(isOpen ? null : t.slug)}
                className="w-full text-left p-5 flex flex-wrap items-baseline justify-between gap-3"
                aria-expanded={isOpen}
              >
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="font-serif text-xl text-ink-900">{t.title}</h2>
                    <span className="text-[10px] uppercase tracking-widest text-ink-400">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-sm text-ink-600 mt-1 italic">{t.blurb}</p>
                </div>
                <span className="text-flame-700 font-serif text-xl shrink-0">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="border-t border-ink-100 p-5 space-y-3">
                  {t.verses.map((v) => {
                    const href = referenceHref(v.ref);
                    return (
                      <blockquote key={v.ref} className="border-l-4 border-flame-300 pl-4">
                        <p className="prose-scripture text-ink-900">"{v.text}"</p>
                        <footer className="text-xs text-ink-500 mt-1 not-italic">
                          —{" "}
                          {href ? (
                            <Link href={href} className="hover:text-flame-700 underline">
                              {v.ref}
                            </Link>
                          ) : (
                            v.ref
                          )}
                        </footer>
                      </blockquote>
                    );
                  })}
                  {t.cross && t.cross.length > 0 && (
                    <div className="pt-3 border-t border-ink-100">
                      <div className="text-[10px] uppercase tracking-widest text-ink-500 mb-2">
                        Related topics
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {t.cross.map((s) => {
                          const t2 = TOPICS.find((x) => x.slug === s);
                          if (!t2) return null;
                          return (
                            <button
                              key={s}
                              onClick={() => setOpenSlug(s)}
                              className="rounded-full bg-card border border-ink-200 px-3 py-1 text-xs text-ink-700 hover:border-flame-500"
                            >
                              {t2.title}
                            </button>
                          );
                        })}
                      </div>
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

function Pill({
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
