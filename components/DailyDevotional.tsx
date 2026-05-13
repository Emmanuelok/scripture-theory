"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { todaysDevotional } from "@/data/devotional";

export default function DailyDevotional() {
  const entry = useMemo(() => todaysDevotional(), []);
  const [open, setOpen] = useState(false);

  const verseHref =
    entry.bookId && entry.chapter
      ? `/bible/${entry.bookId}/${entry.chapter}${entry.verse ? `#v${entry.verse}` : ""}`
      : null;

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-widest text-flame-700">
          Devotional · daily
        </span>
        <span className="text-[10px] text-ink-400">
          Scripture Theory editorial · public-domain WEB
        </span>
      </div>

      <h2 className="mt-3 font-serif text-2xl md:text-3xl text-ink-900 leading-tight">
        {entry.title}
      </h2>

      <blockquote className="mt-4 border-l-4 border-flame-300 pl-4 italic text-ink-800 leading-relaxed">
        "{entry.verseText}"
        <span className="block mt-1 not-italic text-sm text-ink-500">
          — {entry.reference}
        </span>
      </blockquote>

      <p className="mt-5 prose-scripture text-ink-800 leading-relaxed">{entry.body}</p>

      {open && (
        <div className="mt-5 rounded-2xl border border-flame-200 bg-flame-50/40 p-4">
          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
            A prayer
          </div>
          <p className="italic text-ink-800 leading-relaxed">{entry.prayer}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-xs hover:bg-flame-700"
        >
          {open ? "Hide the prayer" : "Pray with this"}
        </button>
        {verseHref && (
          <Link
            href={verseHref}
            className="rounded-full border border-ink-300 px-4 py-1.5 text-xs text-ink-800 hover:border-ink-900"
          >
            Open passage →
          </Link>
        )}
        <Link
          href="/secret-place"
          className="rounded-full border border-ink-300 px-4 py-1.5 text-xs text-ink-800 hover:border-ink-900"
        >
          Journal this in my Secret Place
        </Link>
      </div>

      <p className="mt-4 text-[11px] text-ink-400 leading-relaxed">
        These short meditations are written by Scripture Theory editorial — not attributed to
        any historic author. For the classic English daily devotional, Charles Spurgeon's{" "}
        <em>Morning &amp; Evening</em> is freely available in full at{" "}
        <a
          href="https://www.ccel.org/ccel/spurgeon/morneve.html"
          rel="noopener"
          target="_blank"
          className="underline hover:text-flame-700"
        >
          ccel.org
        </a>
        .
      </p>
    </div>
  );
}
