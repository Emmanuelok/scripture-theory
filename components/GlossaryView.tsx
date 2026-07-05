"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GLOSSARY, type Term } from "@/data/resources/glossary";
import { referenceHref } from "@/lib/reference";

const KNOWN_KEY = "scripture-theory-glossary-known";

function readKnownSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KNOWN_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeKnownSet(s: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KNOWN_KEY, JSON.stringify(Array.from(s)));
}

function originalLineFor(t: Term): string {
  const bits: string[] = [];
  if (t.hebrew) bits.push(`Hebrew · ${t.hebrew.script} (${t.hebrew.translit})`);
  if (t.aramaic) bits.push(`Aramaic · ${t.aramaic.script} (${t.aramaic.translit})`);
  if (t.greek) bits.push(`Greek · ${t.greek.script} (${t.greek.translit})`);
  if (t.latin) bits.push(`Latin · ${t.latin.script}`);
  return bits.join(" · ");
}

export default function GlossaryView({
  initialMode = "list",
}: {
  initialMode?: "list" | "cards";
}) {
  const [mode, setMode] = useState<"list" | "cards">(initialMode);

  // ─────────── shared state ───────────
  const [q, setQ] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // ─────────── card-mode state ───────────
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [hideKnown, setHideKnown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setKnown(readKnownSet());
    setMounted(true);
  }, []);

  // Selected letter — "ALL" shows every letter at once.
  const [letter, setLetter] = useState<string>("A");

  // ─────────── list-mode data ───────────
  // Sort the 370-term corpus once, not on every keystroke.
  const sortedTerms = useMemo(
    () => [...GLOSSARY].sort((a, b) => a.word.localeCompare(b.word)),
    [],
  );
  // Filter against a deferred query so typing stays responsive.
  const deferredQ = useDeferredValue(q);
  const filtered = useMemo(() => {
    if (!deferredQ.trim()) return sortedTerms;
    const n = deferredQ.trim().toLowerCase();
    return sortedTerms.filter(
      (t) =>
        t.word.toLowerCase().includes(n) ||
        t.short.toLowerCase().includes(n) ||
        t.long.toLowerCase().includes(n) ||
        (t.hebrew?.translit.toLowerCase().includes(n) ?? false) ||
        (t.greek?.translit.toLowerCase().includes(n) ?? false) ||
        (t.latin?.script.toLowerCase().includes(n) ?? false),
    );
  }, [deferredQ, sortedTerms]);

  function firstChar(t: Term) {
    return (t.word.replace(/^The\s+/, "")[0] ?? "?").toUpperCase();
  }

  const byLetter = useMemo(() => {
    const m = new Map<string, Term[]>();
    for (const t of filtered) {
      const ch = firstChar(t);
      if (!m.has(ch)) m.set(ch, []);
      m.get(ch)!.push(t);
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  // When a search narrows results so that the active letter has nothing,
  // hop to the first letter that does (or "ALL" if many matches).
  useEffect(() => {
    if (letter === "ALL") return;
    if (byLetter.find(([ch]) => ch === letter)) return;
    if (byLetter.length > 0) setLetter(byLetter[0][0]);
  }, [byLetter, letter]);

  // If the user is searching and several letters match, "ALL" is friendlier.
  useEffect(() => {
    if (q.trim() && byLetter.length > 1 && letter !== "ALL") setLetter("ALL");
    if (!q.trim() && letter === "ALL") setLetter(byLetter[0]?.[0] ?? "A");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // ─────────── card-mode data ───────────
  const cards = useMemo(() => {
    let pool: Term[] = [...GLOSSARY];
    if (hideKnown && mounted) pool = pool.filter((t) => !known.has(t.slug));
    if (!shuffled) return pool.sort((a, b) => a.word.localeCompare(b.word));
    // Deterministic shuffle from seed so React doesn't re-shuffle every render.
    const out = [...pool];
    let s = shuffleSeed || 1;
    for (let i = out.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) | 0;
      const j = Math.abs(s) % (i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }, [shuffled, shuffleSeed, hideKnown, known, mounted]);

  // Reset card index when the pool changes.
  useEffect(() => {
    setCardIdx(0);
    setFlipped(false);
  }, [cards.length, shuffled, shuffleSeed, hideKnown]);

  const card = cards[cardIdx];
  function nextCard() {
    if (cards.length === 0) return;
    setFlipped(false);
    setCardIdx((i) => (i + 1) % cards.length);
  }
  function prevCard() {
    if (cards.length === 0) return;
    setFlipped(false);
    setCardIdx((i) => (i - 1 + cards.length) % cards.length);
  }
  function markKnown() {
    if (!card) return;
    const next = new Set(known);
    next.add(card.slug);
    setKnown(next);
    writeKnownSet(next);
    nextCard();
  }
  function markUnknown() {
    if (!card) return;
    const next = new Set(known);
    next.delete(card.slug);
    setKnown(next);
    writeKnownSet(next);
    nextCard();
  }
  function shuffleDeck() {
    setShuffled(true);
    setShuffleSeed(Date.now() & 0x7fffffff);
  }
  function resetProgress() {
    if (!window.confirm("Reset your flashcard progress?")) return;
    setKnown(new Set());
    writeKnownSet(new Set());
  }

  // Keyboard shortcuts in card mode.
  useEffect(() => {
    if (mode !== "cards") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") nextCard();
      else if (e.key === "ArrowLeft") prevCard();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((v) => !v);
      } else if (e.key.toLowerCase() === "k") markKnown();
      else if (e.key.toLowerCase() === "u") markUnknown();
      else if (e.key.toLowerCase() === "s") shuffleDeck();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, cards.length, cardIdx, known]);

  // ─────────── render ───────────
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link
        href="/resources"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        Theological <span className="gradient-text">glossary.</span>
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        {GLOSSARY.length} terms across the alphabet — accurate enough for a
        pastor to nod at, short enough for a 14-year-old to read. Many entries
        carry the original word in Hebrew, Aramaic, Greek, or Latin. Click a
        letter to open everything under it.
      </p>

      {/* Mode toggle */}
      <div className="mt-6 inline-flex rounded-full border border-ink-300 bg-card p-1">
        <button
          onClick={() => setMode("list")}
          aria-pressed={mode === "list"}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            mode === "list"
              ? "bg-ink-900 text-ink-50"
              : "text-ink-700 hover:text-ink-900"
          }`}
        >
          List
        </button>
        <button
          onClick={() => setMode("cards")}
          aria-pressed={mode === "cards"}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            mode === "cards"
              ? "bg-ink-900 text-ink-50"
              : "text-ink-700 hover:text-ink-900"
          }`}
        >
          Flashcards
        </button>
      </div>

      {mode === "list" ? (
        <ListMode
          q={q}
          setQ={setQ}
          filtered={filtered}
          byLetter={byLetter}
          openSlug={openSlug}
          setOpenSlug={setOpenSlug}
          letter={letter}
          setLetter={setLetter}
        />
      ) : (
        <CardsMode
          card={card}
          cards={cards}
          cardIdx={cardIdx}
          flipped={flipped}
          setFlipped={setFlipped}
          shuffled={shuffled}
          shuffleDeck={shuffleDeck}
          unshuffleDeck={() => setShuffled(false)}
          hideKnown={hideKnown}
          setHideKnown={setHideKnown}
          knownCount={known.size}
          nextCard={nextCard}
          prevCard={prevCard}
          markKnown={markKnown}
          markUnknown={markUnknown}
          resetProgress={resetProgress}
        />
      )}
    </section>
  );
}

// ─────────────────────────── LIST MODE ───────────────────────────

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function ListMode({
  q,
  setQ,
  filtered,
  byLetter,
  openSlug,
  setOpenSlug,
  letter,
  setLetter,
}: {
  q: string;
  setQ: (v: string) => void;
  filtered: Term[];
  byLetter: [string, Term[]][];
  openSlug: string | null;
  setOpenSlug: (v: string | null) => void;
  letter: string;
  setLetter: (v: string) => void;
}) {
  const present = new Map(byLetter);
  const sectionsToRender =
    letter === "ALL"
      ? byLetter
      : present.has(letter)
      ? [[letter, present.get(letter)!] as [string, Term[]]]
      : [];

  // When the user clicks a "See also" link to a slug in another letter,
  // jump the tab to that letter so the entry is actually visible.
  function openSlugAcrossLetters(slug: string) {
    const target = GLOSSARY.find((x) => x.slug === slug);
    if (!target) return;
    const ch = (target.word.replace(/^The\s+/, "")[0] ?? "?").toUpperCase();
    if (letter !== "ALL" && letter !== ch) setLetter(ch);
    setOpenSlug(slug);
  }

  return (
    <>
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
              placeholder="atonement, charis, Yeshua, chesed…"
              className="w-full rounded-full border border-ink-200 bg-card pl-9 pr-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
            />
          </div>
          <span className="text-xs text-ink-500">
            {filtered.length} of {GLOSSARY.length} terms
            {letter !== "ALL" && present.has(letter) && (
              <> · {present.get(letter)!.length} under {letter}</>
            )}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
          <button
            onClick={() => setLetter("ALL")}
            className={`rounded-full px-2.5 h-7 inline-flex items-center justify-center uppercase tracking-widest transition-colors ${
              letter === "ALL"
                ? "bg-ink-900 text-ink-50 border border-ink-900"
                : "border border-ink-200 bg-card text-ink-600 hover:border-flame-500 hover:text-flame-700"
            }`}
            aria-pressed={letter === "ALL"}
          >
            All
          </button>
          {ALPHABET.map((ch) => {
            const has = present.has(ch);
            const isActive = letter === ch;
            return (
              <button
                key={ch}
                onClick={() => has && setLetter(ch)}
                disabled={!has}
                aria-pressed={isActive}
                className={`w-7 h-7 inline-flex items-center justify-center rounded-full transition-colors font-medium ${
                  isActive
                    ? "bg-flame-600 text-ink-50 border border-flame-600"
                    : has
                    ? "border border-ink-200 bg-card text-ink-700 hover:border-flame-500 hover:text-flame-700"
                    : "border border-ink-100 bg-transparent text-ink-300 cursor-not-allowed"
                }`}
              >
                {ch}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-10">
        {sectionsToRender.map(([ch, items]) => (
          <section key={ch} id={`letter-${ch}`} className="scroll-mt-44">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-serif text-5xl text-flame-700/40 leading-none">{ch}</span>
              <span className="text-[10px] uppercase tracking-widest text-ink-500">
                {items.length} {items.length === 1 ? "term" : "terms"}
              </span>
            </div>
            <ul className="divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-card overflow-hidden">
              {items.map((t) => {
                const isOpen = openSlug === t.slug;
                const orig = originalLineFor(t);
                return (
                  <li key={t.slug} className={isOpen ? "bg-flame-50/30" : ""}>
                    <button
                      onClick={() => setOpenSlug(isOpen ? null : t.slug)}
                      className="w-full text-left px-4 py-2.5 flex items-baseline gap-3 hover:bg-flame-50/40 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-ink-900 shrink-0 min-w-[6.5rem] sm:min-w-[9rem]">
                        {t.word}
                      </span>
                      <span className="text-sm text-ink-600 truncate">
                        {t.short}
                      </span>
                      {orig && (
                        <span className="hidden md:inline text-[11px] text-flame-700/80 ml-auto pl-3 shrink-0 max-w-[40%] truncate">
                          {orig}
                        </span>
                      )}
                      <span
                        className="text-flame-700 font-serif text-lg shrink-0 ml-2 transition-transform"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 space-y-3 border-t border-ink-100">
                        <p className="text-sm text-ink-700 leading-relaxed">{t.long}</p>
                        {(t.hebrew || t.greek || t.latin || t.aramaic) && (
                          <div className="grid grid-cols-1 gap-1.5 text-xs">
                            {t.hebrew && <OrigRow lang="Hebrew" o={t.hebrew} />}
                            {t.aramaic && <OrigRow lang="Aramaic" o={t.aramaic} />}
                            {t.greek && <OrigRow lang="Greek" o={t.greek} />}
                            {t.latin && <OrigRow lang="Latin" o={t.latin} />}
                          </div>
                        )}
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
                        {t.related && t.related.length > 0 && (
                          <div className="text-xs text-ink-500 pt-1">
                            <span className="text-flame-700 mr-2">See also</span>
                            {t.related.map((slug, i) => {
                              const rt = GLOSSARY.find((x) => x.slug === slug);
                              if (!rt) return null;
                              return (
                                <span key={slug}>
                                  <button
                                    onClick={() => openSlugAcrossLetters(slug)}
                                    className="text-ink-700 hover:text-flame-700 hover:underline"
                                  >
                                    {rt.word}
                                  </button>
                                  {i < t.related!.length - 1 ? ", " : ""}
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
          No term matches &ldquo;{q}&rdquo;. Try atonement, charis, chesed, Yeshua…
        </p>
      )}
    </>
  );
}

function OrigRow({ lang, o }: { lang: string; o: { script: string; translit: string; gloss?: string } }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[10px] uppercase tracking-widest text-flame-700 shrink-0 w-14">
        {lang}
      </span>
      <span className="font-serif text-base text-ink-900" lang={lang === "Hebrew" || lang === "Aramaic" ? "he" : lang === "Greek" ? "el" : "la"}>
        {o.script}
      </span>
      <span className="text-ink-500 italic">{o.translit}</span>
      {o.gloss && <span className="text-ink-500">— {o.gloss}</span>}
    </div>
  );
}

// ─────────────────────────── CARDS MODE ───────────────────────────

function CardsMode({
  card,
  cards,
  cardIdx,
  flipped,
  setFlipped,
  shuffled,
  shuffleDeck,
  unshuffleDeck,
  hideKnown,
  setHideKnown,
  knownCount,
  nextCard,
  prevCard,
  markKnown,
  markUnknown,
  resetProgress,
}: {
  card: Term | undefined;
  cards: Term[];
  cardIdx: number;
  flipped: boolean;
  setFlipped: (v: boolean | ((p: boolean) => boolean)) => void;
  shuffled: boolean;
  shuffleDeck: () => void;
  unshuffleDeck: () => void;
  hideKnown: boolean;
  setHideKnown: (v: boolean) => void;
  knownCount: number;
  nextCard: () => void;
  prevCard: () => void;
  markKnown: () => void;
  markUnknown: () => void;
  resetProgress: () => void;
}) {
  if (cards.length === 0) {
    return (
      <div className="mt-12 rounded-3xl border border-ink-200 bg-card-subtle p-8 text-center">
        <p className="font-serif text-2xl text-ink-900">All caught up.</p>
        <p className="mt-2 text-sm text-ink-600">
          You&apos;ve marked every term as known. Toggle &ldquo;Hide known&rdquo;
          off to see them again, or reset progress.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setHideKnown(false)}
            className="rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-700 hover:border-ink-900"
          >
            Show all
          </button>
          <button
            onClick={resetProgress}
            className="rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-700 hover:border-ink-900"
          >
            Reset progress
          </button>
        </div>
      </div>
    );
  }
  if (!card) return null;
  const orig = originalLineFor(card);

  return (
    <div className="mt-8">
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-ink-500 mr-2">
          {cardIdx + 1} / {cards.length}
        </span>
        <button
          onClick={shuffled ? unshuffleDeck : shuffleDeck}
          className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
          title="S"
        >
          {shuffled ? "A–Z order" : "Shuffle"}
        </button>
        <button
          onClick={() => setHideKnown(!hideKnown)}
          className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
        >
          {hideKnown ? "Show known too" : "Hide known"}
        </button>
        <span className="text-xs text-ink-400 ml-auto">
          {knownCount} known · saved on this device
        </span>
        {knownCount > 0 && (
          <button
            onClick={resetProgress}
            className="text-xs text-ink-400 hover:text-ink-700 underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* The card */}
      <button
        onClick={() => setFlipped((v) => !v)}
        className="w-full text-left"
        aria-label="Flip card"
      >
        <article
          className="relative rounded-3xl border-2 border-flame-300 bg-card p-8 md:p-12 min-h-[24rem] md:min-h-[28rem] flex flex-col justify-center items-center text-center transition-all hover:shadow-2xl"
        >
          <span className="absolute top-3 left-4 text-[10px] uppercase tracking-widest text-flame-700">
            {flipped ? "Definition" : "Term"}
          </span>
          <span className="absolute top-3 right-4 text-[10px] uppercase tracking-widest text-ink-400">
            Tap to flip · ␣
          </span>

          {!flipped ? (
            <div className="space-y-5">
              <h2 className="font-serif text-5xl md:text-7xl text-ink-900 leading-tight">
                {card.word}
              </h2>
              {(card.hebrew || card.aramaic || card.greek || card.latin) && (
                <div className="space-y-1.5 text-ink-700">
                  {card.hebrew && (
                    <p>
                      <span className="text-[10px] uppercase tracking-widest text-flame-700 mr-2">Hebrew</span>
                      <span lang="he" className="font-serif text-2xl text-ink-900">{card.hebrew.script}</span>
                      <span className="italic ml-2 text-ink-500">{card.hebrew.translit}</span>
                    </p>
                  )}
                  {card.aramaic && (
                    <p>
                      <span className="text-[10px] uppercase tracking-widest text-flame-700 mr-2">Aramaic</span>
                      <span lang="he" className="font-serif text-2xl text-ink-900">{card.aramaic.script}</span>
                      <span className="italic ml-2 text-ink-500">{card.aramaic.translit}</span>
                    </p>
                  )}
                  {card.greek && (
                    <p>
                      <span className="text-[10px] uppercase tracking-widest text-flame-700 mr-2">Greek</span>
                      <span lang="el" className="font-serif text-2xl text-ink-900">{card.greek.script}</span>
                      <span className="italic ml-2 text-ink-500">{card.greek.translit}</span>
                    </p>
                  )}
                  {card.latin && (
                    <p>
                      <span className="text-[10px] uppercase tracking-widest text-flame-700 mr-2">Latin</span>
                      <span lang="la" className="font-serif text-2xl text-ink-900 italic">{card.latin.script}</span>
                    </p>
                  )}
                </div>
              )}
              {!orig && (
                <p className="text-sm text-ink-400 italic">Tap to reveal the definition.</p>
              )}
            </div>
          ) : (
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-serif text-3xl md:text-4xl text-ink-900">
                {card.word}
              </h3>
              <p className="font-serif text-lg md:text-xl text-flame-700 leading-snug italic">
                {card.short}
              </p>
              <p className="text-ink-700 leading-relaxed">{card.long}</p>
              {card.refs && card.refs.length > 0 && (
                <div className="text-xs text-ink-500 flex flex-wrap gap-1.5 justify-center pt-2">
                  {card.refs.map((r) => {
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
        </article>
      </button>

      {/* Action row */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={prevCard}
          className="rounded-full border border-ink-300 bg-card px-4 py-1.5 text-sm text-ink-800 hover:border-ink-900"
          title="←"
        >
          ← Previous
        </button>
        <button
          onClick={() => setFlipped((v) => !v)}
          className="rounded-full border border-ink-300 bg-card px-4 py-1.5 text-sm text-ink-800 hover:border-ink-900"
          title="space"
        >
          Flip
        </button>
        <button
          onClick={nextCard}
          className="rounded-full border border-ink-300 bg-card px-4 py-1.5 text-sm text-ink-800 hover:border-ink-900"
          title="→"
        >
          Next →
        </button>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            onClick={markUnknown}
            className="rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-sm text-amber-900 hover:border-amber-500"
            title="U"
          >
            Need more practice
          </button>
          <button
            onClick={markKnown}
            className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-sm text-emerald-900 hover:border-emerald-500"
            title="K"
          >
            I know this
          </button>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-ink-400">
        Keyboard: <kbd>space</kbd> flip · <kbd>←</kbd>/<kbd>→</kbd> previous/next ·
        <kbd className="mx-1">K</kbd> known · <kbd>U</kbd> need practice ·
        <kbd className="ml-1">S</kbd> shuffle. Progress is saved on this device only.
      </p>
    </div>
  );
}
