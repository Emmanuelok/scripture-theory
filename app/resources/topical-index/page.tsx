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

  const totalVerses = TOPICS.reduce((n, t) => n + t.verses.length, 0);

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link
        href="/resources"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Resources
      </Link>

      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        Topical Scripture{" "}
        <span className="gradient-text">by life situation.</span>
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        What the Bible says about the situations of an ordinary life. Pick a topic; read the
        verses; carry one with you today. {TOPICS.length} topics · {totalVerses} verses.
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
              placeholder="anxiety, forgiveness, money…"
              className="w-full rounded-full border border-ink-200 bg-card pl-9 pr-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
            />
          </div>
          <span className="text-xs text-ink-500">
            {filtered.length} of {TOPICS.length} topics
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Pill active={cat === "all"} onClick={() => setCat("all")}>
            All
          </Pill>
          {CATEGORIES.map((c) => {
            const n = TOPICS.filter((t) => t.category === c).length;
            return (
              <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
                {c} <span className="opacity-60">({n})</span>
              </Pill>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 grid sm:grid-cols-2 gap-3">
        {filtered.map((t) => {
          const isOpen = openSlug === t.slug;
          return (
            <li
              key={t.slug}
              className={[
                "group relative overflow-hidden rounded-2xl border bg-card hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all",
                isOpen ? "border-flame-500 sm:col-span-2" : "border-ink-200",
              ].join(" ")}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
              />
              <button
                onClick={() => setOpenSlug(isOpen ? null : t.slug)}
                className="relative w-full text-left p-5 flex flex-wrap items-baseline justify-between gap-3"
                aria-expanded={isOpen}
              >
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="font-serif text-xl text-ink-900 group-hover:text-flame-700 transition-colors">
                      {t.title}
                    </h2>
                    <span className="text-[10px] uppercase tracking-widest text-flame-700">
                      {t.category}
                    </span>
                    <span className="text-[10px] text-ink-400">· {t.verses.length} verses</span>
                  </div>
                  <p className="text-sm text-ink-600 mt-1 italic leading-relaxed">{t.blurb}</p>
                </div>
                <span
                  className="text-flame-700 font-serif text-xl shrink-0 transition-transform"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="relative border-t border-ink-200 p-5 space-y-4">
                  {t.verses.map((v) => {
                    const href = referenceHref(v.ref);
                    return (
                      <blockquote key={v.ref} className="border-l-2 border-flame-500/70 pl-4">
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
                      <div className="flex flex-wrap gap-1.5">
                        {t.cross.map((s) => {
                          const t2 = TOPICS.find((x) => x.slug === s);
                          if (!t2) return null;
                          return (
                            <button
                              key={s}
                              onClick={() => setOpenSlug(s)}
                              className="rounded-full bg-card-subtle border border-ink-200 px-3 py-1 text-xs text-ink-700 hover:border-flame-500"
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

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-500 italic">
          No topic matches "{q}". Try anxiety, forgiveness, money…
        </p>
      )}
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
      className={[
        "rounded-full px-3 py-1.5 text-xs border transition-colors",
        active
          ? "bg-ink-900 text-ink-50 border-ink-900"
          : "bg-card text-ink-700 border-ink-200 hover:border-flame-500 hover:text-flame-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
