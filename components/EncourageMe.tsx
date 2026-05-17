"use client";

import Link from "next/link";
import { useState } from "react";

type Verse = {
  book: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
};

export default function EncourageMe() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(false);

  async function pull() {
    setLoading(true);
    try {
      const res = await fetch("/api/random-verse", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.ok) setVerse(data as Verse);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8">
      <div className="flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">Encourage me</div>
          <h2 className="font-serif text-2xl text-ink-900 mt-1">
            One verse, right now.
          </h2>
        </div>
        <button
          onClick={pull}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-flame-600 text-white px-4 py-2 text-sm hover:bg-flame-700 disabled:opacity-50"
        >
          {loading ? "…" : verse ? "Another one →" : "Encourage me →"}
        </button>
      </div>

      {verse && (
        <div className="mt-5 rounded-2xl bg-card border border-ink-200 p-5">
          <p className="prose-scripture text-ink-900 text-lg leading-relaxed">"{verse.text}"</p>
          <div className="mt-3 flex items-baseline justify-between flex-wrap gap-2">
            <Link
              href={`/verse/${verse.book}/${verse.chapter}/${verse.verse}`}
              className="text-sm text-flame-700 hover:underline"
            >
              — {verse.bookName} {verse.chapter}:{verse.verse} ({verse.translation}) →
            </Link>
            <Link
              href={`/api/verse-card/${verse.book}/${verse.chapter}/${verse.verse}?translation=${verse.translation}`}
              target="_blank"
              rel="noopener"
              className="text-xs text-ink-500 hover:text-flame-700"
            >
              Share as image
            </Link>
          </div>
        </div>
      )}

      {!verse && (
        <p className="mt-3 text-sm text-ink-600 italic">
          Sometimes you just need a verse. Tap above and the Spirit might use one
          ordinary line of Scripture to meet you today.
        </p>
      )}
    </section>
  );
}
