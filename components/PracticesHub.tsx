"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────
   PracticesHub — interactive, categorized, time-aware practices page.
────────────────────────────────────────────────────────────────── */

type Practice = {
  href: string;
  eyebrow: string;
  title: string;
  sub: string;
  category: CategoryId;
  glyph: GlyphId;
};

type CategoryId =
  | "prayer"
  | "rhythms"
  | "household"
  | "worship"
  | "formation"
  | "world";

type GlyphId =
  | "door"
  | "hours"
  | "ear"
  | "examen"
  | "lament"
  | "forgive"
  | "heal"
  | "rule"
  | "sabbath"
  | "fast"
  | "altar"
  | "rings"
  | "tree"
  | "bread"
  | "harp"
  | "scroll"
  | "memory"
  | "catechism"
  | "dove"
  | "fruit"
  | "compass"
  | "apologetics"
  | "chain";

const CATEGORIES: { id: CategoryId; label: string; tagline: string }[] = [
  { id: "prayer", label: "Prayer & listening", tagline: "How we speak to Him — and how we hear." },
  { id: "rhythms", label: "Rhythms of life", tagline: "The trellis the vine grows on." },
  { id: "household", label: "Household", tagline: "The first congregation — your home." },
  { id: "worship", label: "Worship & Word", tagline: "The Word, the table, the song." },
  { id: "formation", label: "Formation & discernment", tagline: "How He shapes you, and shows you." },
  { id: "world", label: "The wider Church", tagline: "Remember the prisoners. Pray the nations." },
];

const PRACTICES: Practice[] = [
  { href: "/secret-place", eyebrow: "Matthew 6:6", title: "The Secret Place", sub: "Your private journal, prayers, gratitudes, and confessions. Lives only on this device.", category: "prayer", glyph: "door" },
  { href: "/hours", eyebrow: "Psalm 119:164", title: "The Daily Office", sub: "Four short prayer offices — Morning, Midday, Evening, Night. Five minutes apiece, ancient and Scripture-built.", category: "prayer", glyph: "hours" },
  { href: "/listen", eyebrow: "Hearing God", title: "Listening prayer", sub: "Seven steps with Scripture, silence, and a tested journal — for the lifelong learning of His voice.", category: "prayer", glyph: "ear" },
  { href: "/examen", eyebrow: "Five minutes", title: "Daily Examen", sub: "End the day with Him: thanksgiving, encounter, repentance, longing for tomorrow.", category: "prayer", glyph: "examen" },
  { href: "/lament", eyebrow: "The Psalms", title: "Lament", sub: "Five movements through grief, anger, and unanswered prayer — turn, complaint, ask, trust, vow.", category: "prayer", glyph: "lament" },
  { href: "/forgive", eyebrow: "Seventy times seven", title: "Forgiveness walk", sub: "A pastoral, scriptural release — for someone else, for yourself, or before God.", category: "prayer", glyph: "forgive" },
  { href: "/heal", eyebrow: "James 5", title: "Healing prayer", sub: "Pray for the sick — confession, anointing, the prayer of faith — with a private journal.", category: "prayer", glyph: "heal" },

  { href: "/rule", eyebrow: "John 15", title: "Rule of Life", sub: "A trellis for the vine — daily, weekly, and monthly disciplines you choose and keep.", category: "rhythms", glyph: "rule" },
  { href: "/sabbath", eyebrow: "Exodus 20:8", title: "Sabbath planner", sub: "Plan a real, doable Sabbath — when, what you'll stop, what you'll do instead.", category: "rhythms", glyph: "sabbath" },
  { href: "/fast", eyebrow: "Matthew 6:16", title: "Fasting", sub: "Biblical guide and private tracker for full, partial, Daniel, sundown, media, and custom fasts.", category: "rhythms", glyph: "fast" },

  { href: "/family", eyebrow: "Deuteronomy 6:7", title: "Family altar", sub: "Ten-minute household worship for littles, kids, youth, and adults. A different theme each day.", category: "household", glyph: "altar" },
  { href: "/marriage", eyebrow: "Ephesians 5:32", title: "Marriage rhythm", sub: "Seven daily prayer themes for your spouse — words, repentance, joy, sabbath, worship.", category: "household", glyph: "rings" },
  { href: "/parenting", eyebrow: "Psalm 78:4", title: "Parenting rhythm", sub: "Pray your children by name — seven daily themes, every child added to the wall.", category: "household", glyph: "tree" },

  { href: "/communion", eyebrow: "1 Corinthians 11", title: "The Lord's Supper at home", sub: "A reverent, non-denominational liturgy for sickness, isolation, persecution, or family worship.", category: "worship", glyph: "bread" },
  { href: "/hymns", eyebrow: "Ephesians 5:19", title: "The hymns", sub: "Twenty-one public-domain hymns the global church has sung for centuries.", category: "worship", glyph: "harp" },
  { href: "/sermons", eyebrow: "Acts 17:11", title: "Sermon notes", sub: "Catch what your pastor preaches — passage, big idea, outline, application, prayer.", category: "worship", glyph: "scroll" },
  { href: "/memory", eyebrow: "Psalm 119:11", title: "Scripture memory", sub: "Read · first letters · blanks · recite. Hide the Word in your heart.", category: "worship", glyph: "memory" },
  { href: "/catechism", eyebrow: "1563 · 52 weeks", title: "Heidelberg Catechism", sub: "129 questions and answers — your only comfort in life and in death. One Lord's Day per week.", category: "worship", glyph: "catechism" },

  { href: "/gifts", eyebrow: "1 Corinthians 12", title: "Spiritual gifts", sub: "Discern how the Spirit has gifted you to serve the body — twenty gifts, forty statements.", category: "formation", glyph: "dove" },
  { href: "/fruit", eyebrow: "Galatians 5:22-23", title: "Fruit of the Spirit check", sub: "Periodic, honest growth check on love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.", category: "formation", glyph: "fruit" },
  { href: "/calling", eyebrow: "1 Thess 5:24", title: "Calling discernment", sub: "Seven-step walk for vocation and life direction — love, wiring, world, Word, wise, yes, next.", category: "formation", glyph: "compass" },
  { href: "/apologetics", eyebrow: "1 Peter 3:15", title: "Apologetics", sub: "Pastoral, honest answers to the hardest questions — God, the Bible, Jesus, suffering, science, religion.", category: "formation", glyph: "apologetics" },

  { href: "/persecuted", eyebrow: "Hebrews 13:3", title: "The persecuted Church", sub: "Twelve nations, one each month, with specific prayer points. Remember the prisoners.", category: "world", glyph: "chain" },
];

function pickFeatured(hour: number): Practice {
  // A pastoral, time-aware nudge.
  if (hour >= 4 && hour < 11) return PRACTICES.find((p) => p.href === "/hours")!;        // morning
  if (hour >= 11 && hour < 14) return PRACTICES.find((p) => p.href === "/secret-place")!; // midday
  if (hour >= 14 && hour < 19) return PRACTICES.find((p) => p.href === "/listen")!;      // afternoon
  if (hour >= 19 && hour < 23) return PRACTICES.find((p) => p.href === "/examen")!;      // evening
  return PRACTICES.find((p) => p.href === "/lament")!;                                    // late night
}

export default function PracticesHub() {
  const [query, setQuery] = useState("");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(i);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRACTICES;
    return PRACTICES.filter((p) =>
      [p.title, p.sub, p.eyebrow, p.category].some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  const grouped = useMemo(() => {
    const m: Record<CategoryId, Practice[]> = {
      prayer: [],
      rhythms: [],
      household: [],
      worship: [],
      formation: [],
      world: [],
    };
    for (const p of filtered) m[p.category].push(p);
    return m;
  }, [filtered]);

  const featured = useMemo(() => pickFeatured(now ? now.getHours() : 7), [now]);
  const timeBand =
    now == null
      ? "Morning"
      : now.getHours() < 11
      ? "Morning"
      : now.getHours() < 14
      ? "Midday"
      : now.getHours() < 19
      ? "Afternoon"
      : now.getHours() < 23
      ? "Evening"
      : "Late night";

  function scrollTo(id: CategoryId) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(`cat-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Featured, time-aware suggestion */}
      <FeaturedCard practice={featured} timeBand={timeBand} />

      {/* Search + jump bar */}
      <div className="mt-10 sticky top-16 z-20 -mx-5 px-5 py-3 backdrop-blur bg-ink-50/85 border-y border-ink-200">
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
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search practices — fasting, lament, sabbath…"
              className="w-full rounded-full border border-ink-200 bg-card pl-9 pr-9 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-400 hover:text-ink-900"
              >
                ✕
              </button>
            )}
          </div>
          <ul className="hidden md:flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => scrollTo(c.id)}
                  className="rounded-full border border-ink-200 bg-card px-3 py-1.5 text-xs text-ink-600 hover:border-flame-500 hover:text-ink-900 transition-colors"
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sections by category */}
      <div className="mt-10 space-y-14">
        {CATEGORIES.map((cat) => {
          const items = grouped[cat.id];
          if (!items?.length) return null;
          return (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-flame-700">
                    {String(items.length).padStart(2, "0")} · {cat.id}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
                    {cat.label}
                  </h2>
                </div>
                <p className="text-sm text-ink-500 italic max-w-md">{cat.tagline}</p>
              </div>

              <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((p) => (
                  <li key={p.href}>
                    <PracticeCard practice={p} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-ink-500 italic">
            No practice matches "{query}". Try fasting, examen, lament…
          </p>
        )}
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FeaturedCard — large, time-aware recommendation at the top.
────────────────────────────────────────────────────────────────── */

function FeaturedCard({ practice, timeBand }: { practice: Practice; timeBand: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={practice.href}
      onMouseMove={onMove}
      className="group relative block overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 border border-ink-800 hover:border-flame-500/60 transition-colors"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(70% 60% at 10% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(253,186,116,0.22), transparent 45%)",
        }}
      />

      <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-flame-300">
            For this hour · {timeBand}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mt-2 leading-tight">
            Start here: <span className="text-flame-300">{practice.title}</span>.
          </h2>
          <p className="mt-4 text-ink-300 max-w-xl leading-relaxed">{practice.sub}</p>
          <div className="mt-6 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm group-hover:bg-flame-500 transition-colors">
            Open {practice.title} →
          </div>
        </div>
        <div className="hidden md:block text-flame-300/40 group-hover:text-flame-300/70 transition-colors">
          <Glyph id={practice.glyph} size={140} />
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PracticeCard — small interactive tile with spotlight.
────────────────────────────────────────────────────────────────── */

function PracticeCard({ practice }: { practice: Practice }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={practice.href}
      onMouseMove={onMove}
      className="group relative block h-full overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.32)] transition-all duration-300"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(249,115,22,0.13), transparent 45%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 text-flame-700/25 group-hover:text-flame-700/70 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500"
      >
        <Glyph id={practice.glyph} size={48} />
      </span>

      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.18em] text-flame-700">
          {practice.eyebrow}
        </div>
        <h3 className="font-serif text-xl text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
          {practice.title}
        </h3>
        <p className="text-sm text-ink-600 mt-2 leading-relaxed pr-8">{practice.sub}</p>
        <div className="mt-4 text-xs text-ink-400 group-hover:text-flame-700 transition-colors">
          Open →
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Glyphs — small inline SVGs, one per practice.
────────────────────────────────────────────────────────────────── */

function Glyph({ id, size = 44 }: { id: GlyphId; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "door":
      return (
        <svg {...common}>
          <path d="M5 3h14v18H5z" />
          <circle cx="15" cy="12" r="0.8" fill="currentColor" />
          <path d="M9 3v18" />
        </svg>
      );
    case "hours":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2.5" />
        </svg>
      );
    case "ear":
      return (
        <svg {...common}>
          <path d="M7 9a5 5 0 0 1 10 0c0 4-3 4-3 7a3 3 0 0 1-6 0" />
          <path d="M10 9a2 2 0 0 1 4 0" />
        </svg>
      );
    case "examen":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 13.5c1 1.2 2.4 1.8 4 1.8s3-.6 4-1.8" />
          <circle cx="9" cy="10" r="0.8" fill="currentColor" />
          <circle cx="15" cy="10" r="0.8" fill="currentColor" />
        </svg>
      );
    case "lament":
      return (
        <svg {...common}>
          <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-4 3-6 5-9Z" />
          <path d="M12 14v5" />
        </svg>
      );
    case "forgive":
      return (
        <svg {...common}>
          <path d="M4 12c2-4 6-7 8-7s6 3 8 7" />
          <path d="M4 12c2 4 6 7 8 7s6-3 8-7" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "heal":
      return (
        <svg {...common}>
          <path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z" />
        </svg>
      );
    case "rule":
      return (
        <svg {...common}>
          <path d="M4 5h16M4 12h16M4 19h16" />
          <circle cx="7" cy="5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="13" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="19" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sabbath":
      return (
        <svg {...common}>
          <path d="M21 13a8 8 0 1 1-10-10 7 7 0 0 0 10 10Z" />
        </svg>
      );
    case "fast":
      return (
        <svg {...common}>
          <path d="M5 7h14M5 12h14M5 17h14" />
          <path d="M2 2l20 20" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "altar":
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M7 20V10h10v10" />
          <path d="M9 10V6h6v4" />
          <path d="M11 4h2" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common}>
          <circle cx="9" cy="13" r="5" />
          <circle cx="15" cy="13" r="5" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 21v-7" />
          <path d="M12 14a5 5 0 0 1-5-5 4 4 0 0 1 5-4 4 4 0 0 1 5 4 5 5 0 0 1-5 5Z" />
        </svg>
      );
    case "bread":
      return (
        <svg {...common}>
          <path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6H4z" />
          <path d="M8 13v3M12 13v3M16 13v3" />
        </svg>
      );
    case "harp":
      return (
        <svg {...common}>
          <path d="M6 3v18M18 3v18" />
          <path d="M6 6c4 0 8 2 12 0M6 10c4 0 8 2 12 0M6 14c4 0 8 2 12 0M6 18c4 0 8 2 12 0" />
        </svg>
      );
    case "scroll":
      return (
        <svg {...common}>
          <path d="M6 4h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4Z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "memory":
      return (
        <svg {...common}>
          <path d="M9 4a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h1v-4H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1V4Z" />
          <path d="M15 4a5 5 0 0 1 5 5v6a5 5 0 0 1-5 5h-1v-4h1a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1V4Z" />
        </svg>
      );
    case "catechism":
      return (
        <svg {...common}>
          <path d="M4 5h7v15H4zM13 5h7v15h-7z" />
          <path d="M11 5v15" />
        </svg>
      );
    case "dove":
      return (
        <svg {...common} fill="currentColor" opacity="0.8" stroke="none">
          <path d="M3 14c2-3 5-5 9-5 0-2 2-3 4-3-1 2-2 3-2 4 2 0 4 1 5 3-2 1-5 1-7 1-1 2-3 4-6 4l-3-1c-1-1-1-2 0-3Z" />
        </svg>
      );
    case "fruit":
      return (
        <svg {...common}>
          <path d="M9 6c-3 1-5 4-5 8 0 3 3 6 8 6s8-3 8-6c0-4-2-7-5-8" />
          <path d="M12 3v5" />
          <path d="M14 4c-1 2-3 3-2 4" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 15l2-6 6-2-2 6Z" fill="currentColor" stroke="none" opacity="0.5" />
        </svg>
      );
    case "apologetics":
      return (
        <svg {...common}>
          <path d="M12 3l2 5h5l-4 3 2 6-5-4-5 4 2-6-4-3h5Z" />
        </svg>
      );
    case "chain":
      return (
        <svg {...common}>
          <path d="M9 12a3 3 0 0 1 0-4l2-2a3 3 0 0 1 4 4l-1 1" />
          <path d="M15 12a3 3 0 0 1 0 4l-2 2a3 3 0 0 1-4-4l1-1" />
        </svg>
      );
  }
}
