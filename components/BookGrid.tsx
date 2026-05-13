"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { oldTestament, newTestament, type BookMeta as Book } from "@/data/bible/canon";

/* ──────────────────────────────────────────────────────────────────
   BookGrid — searchable Bible book finder with traditional groupings.
────────────────────────────────────────────────────────────────── */

type Section = { id: string; label: string; books: string[]; accent: string };

const OT_SECTIONS: Section[] = [
  {
    id: "torah",
    label: "Torah · the Law",
    accent: "from-flame-50 to-card",
    books: ["genesis", "exodus", "leviticus", "numbers", "deuteronomy"],
  },
  {
    id: "history",
    label: "History",
    accent: "from-flame-50 to-card",
    books: [
      "joshua",
      "judges",
      "ruth",
      "1samuel",
      "2samuel",
      "1kings",
      "2kings",
      "1chronicles",
      "2chronicles",
      "ezra",
      "nehemiah",
      "esther",
    ],
  },
  {
    id: "poetry",
    label: "Wisdom & Poetry",
    accent: "from-flame-50 to-card",
    books: ["job", "psalms", "proverbs", "ecclesiastes", "songofsolomon"],
  },
  {
    id: "major",
    label: "Major Prophets",
    accent: "from-flame-50 to-card",
    books: ["isaiah", "jeremiah", "lamentations", "ezekiel", "daniel"],
  },
  {
    id: "minor",
    label: "Minor Prophets",
    accent: "from-flame-50 to-card",
    books: [
      "hosea",
      "joel",
      "amos",
      "obadiah",
      "jonah",
      "micah",
      "nahum",
      "habakkuk",
      "zephaniah",
      "haggai",
      "zechariah",
      "malachi",
    ],
  },
];

const NT_SECTIONS: Section[] = [
  {
    id: "gospels",
    label: "The Gospels",
    accent: "from-flame-50 to-card",
    books: ["matthew", "mark", "luke", "john"],
  },
  { id: "acts", label: "Acts", accent: "from-flame-50 to-card", books: ["acts"] },
  {
    id: "pauline",
    label: "Paul's letters",
    accent: "from-flame-50 to-card",
    books: [
      "romans",
      "1corinthians",
      "2corinthians",
      "galatians",
      "ephesians",
      "philippians",
      "colossians",
      "1thessalonians",
      "2thessalonians",
      "1timothy",
      "2timothy",
      "titus",
      "philemon",
    ],
  },
  {
    id: "general",
    label: "General letters",
    accent: "from-flame-50 to-card",
    books: ["hebrews", "james", "1peter", "2peter", "1john", "2john", "3john", "jude"],
  },
  {
    id: "apocalypse",
    label: "Apocalypse",
    accent: "from-flame-50 to-card",
    books: ["revelation"],
  },
];

export default function BookGrid() {
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState<"all" | "OT" | "NT">("all");

  const byId = useMemo(() => {
    const m = new Map<string, Book>();
    for (const b of [...oldTestament, ...newTestament]) m.set(b.id, b);
    return m;
  }, []);

  const q = query.trim().toLowerCase();

  function matchesQ(b: Book) {
    if (!q) return true;
    return b.name.toLowerCase().includes(q) || b.abbrev.toLowerCase().includes(q);
  }

  const showOT = testament !== "NT";
  const showNT = testament !== "OT";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="font-serif text-2xl text-ink-900">Find a book</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-full bg-card-subtle border border-ink-200 p-0.5">
            {(["all", "OT", "NT"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTestament(t)}
                aria-pressed={testament === t}
                className={[
                  "text-xs px-3 py-1 rounded-full transition-colors",
                  testament === t ? "bg-ink-900 text-ink-50" : "text-ink-600 hover:text-ink-900",
                ].join(" ")}
              >
                {t === "all" ? "All" : t}
              </button>
            ))}
          </div>
          <div className="relative w-56 max-w-full">
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Romans, John, Psalms…"
              className="w-full rounded-full border border-ink-200 bg-card pl-9 pr-3 py-1.5 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {showOT && (
          <TestamentBlock
            label="Old Testament"
            sections={OT_SECTIONS}
            byId={byId}
            matchesQ={matchesQ}
          />
        )}
        {showNT && (
          <TestamentBlock
            label="New Testament"
            sections={NT_SECTIONS}
            byId={byId}
            matchesQ={matchesQ}
          />
        )}
      </div>
    </div>
  );
}

function TestamentBlock({
  label,
  sections,
  byId,
  matchesQ,
}: {
  label: string;
  sections: Section[];
  byId: Map<string, Book>;
  matchesQ: (b: Book) => boolean;
}) {
  // Filter sections to those with at least one matching book
  const visible = sections
    .map((s) => ({
      ...s,
      books: s.books.map((id) => byId.get(id)).filter((b): b is Book => !!b && matchesQ(b)),
    }))
    .filter((s) => s.books.length > 0);

  if (visible.length === 0) return null;

  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-flame-700">{label}</div>
      <h3 className="font-serif text-xl text-ink-900 mt-1 mb-4">
        {label === "Old Testament" ? "Promise & prophet." : "Fulfillment & sending."}
      </h3>

      <div className="space-y-4">
        {visible.map((s) => (
          <div key={s.id}>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-[10px] uppercase tracking-widest text-ink-500">{s.label}</span>
              <span className="text-[10px] text-ink-400">· {s.books.length} books</span>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {s.books.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/bible/${b.id}`}
                    className="group relative block overflow-hidden rounded-xl border border-ink-200 bg-card p-3 hover:border-flame-500/70 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(249,115,22,0.35)] transition-all"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/60 to-transparent"
                    />
                    <div className="relative">
                      <div className="font-serif text-ink-900 truncate group-hover:text-flame-700 transition-colors">
                        {b.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-ink-400 mt-0.5">
                        {b.chapters} chapters
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
