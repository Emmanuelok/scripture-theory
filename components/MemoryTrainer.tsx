"use client";

import { useEffect, useMemo, useState } from "react";
import { memoryVerses, themeLabels, type MemoryVerse, type Theme } from "@/data/memory";
import { useProfile, type MemoryLevel, type MemoryRecord } from "@/lib/profile";

const LEVEL_ORDER: MemoryLevel[] = ["reading", "first-letters", "blanks", "recited", "mastered"];

const LEVEL_LABEL: Record<MemoryLevel, string> = {
  reading: "Read it",
  "first-letters": "First letters",
  blanks: "Fill the blanks",
  recited: "Recite",
  mastered: "Mastered",
};

const LEVEL_HELP: Record<MemoryLevel, string> = {
  reading: "Read the verse aloud, slowly, three times. Pay attention to every word.",
  "first-letters":
    "Only the first letter of each word is shown. Try to say the whole verse from these tiny anchors.",
  blanks:
    "Some key words are hidden. Speak the whole verse, supplying the missing words. Tap to reveal.",
  recited:
    "Now recite the verse without looking. When you can do it three days in a row, mark it Mastered.",
  mastered: "You can recall this verse from memory. Keep it warm by reciting it weekly.",
};

const ALL_THEMES = Array.from(new Set(memoryVerses.map((v) => v.theme))) as Theme[];

export default function MemoryTrainer({ initialVerseId }: { initialVerseId?: string }) {
  const { profile, update, mounted } = useProfile();

  // When arriving from the course (or a verse permalink), a custom verse
  // can be passed via ?ref=...&text=... — we treat it as a one-off
  // "extra" verse alongside the catalog and switch to it immediately.
  const [customVerse, setCustomVerse] = useState<MemoryVerse | null>(null);
  const [activeId, setActiveId] = useState<string>(initialVerseId ?? memoryVerses[0].id);
  const [themeFilter, setThemeFilter] = useState<Theme | "all">("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const ref = url.searchParams.get("ref");
    const text = url.searchParams.get("text");
    if (ref && text) {
      const slug = `custom-${ref.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      const v: MemoryVerse = {
        id: slug,
        ref,
        text,
        translation: "WEB",
        theme: "discipleship",
        why: "Memory verse from Foundations of the Faith. Walk it home this week.",
      };
      setCustomVerse(v);
      setActiveId(slug);
      // Clean the URL so refresh doesn't keep re-seeding
      url.searchParams.delete("ref");
      url.searchParams.delete("text");
      window.history.replaceState(
        {},
        "",
        url.pathname + (url.search ? `?${url.searchParams.toString()}` : "")
      );
    }
  }, []);

  const allVerses = useMemo(
    () => (customVerse ? [customVerse, ...memoryVerses] : memoryVerses),
    [customVerse]
  );

  const verse = useMemo(
    () => allVerses.find((v) => v.id === activeId) ?? allVerses[0],
    [activeId, allVerses]
  );

  const records = profile.memory ?? [];
  const record = records.find((r) => r.verseId === verse.id);
  const level: MemoryLevel = record?.level ?? "reading";

  function upsertRecord(patch: Partial<MemoryRecord>) {
    const today = new Date().toISOString();
    const existing = records.find((r) => r.verseId === verse.id);
    const next: MemoryRecord = existing
      ? { ...existing, ...patch, lastPracticedAt: today, attempts: existing.attempts + 1 }
      : {
          verseId: verse.id,
          startedAt: today,
          lastPracticedAt: today,
          attempts: 1,
          level: "reading",
          ...patch,
        };
    const others = records.filter((r) => r.verseId !== verse.id);
    update({ memory: [...others, next] });
  }

  function setLevel(newLevel: MemoryLevel) {
    upsertRecord({ level: newLevel });
  }

  function advance() {
    const idx = LEVEL_ORDER.indexOf(level);
    if (idx < LEVEL_ORDER.length - 1) setLevel(LEVEL_ORDER[idx + 1]);
  }

  function regress() {
    const idx = LEVEL_ORDER.indexOf(level);
    if (idx > 0) setLevel(LEVEL_ORDER[idx - 1]);
  }

  function reset() {
    if (typeof window !== "undefined" && !window.confirm("Reset progress for this verse?")) return;
    upsertRecord({ level: "reading", attempts: 0 });
  }

  const filtered = useMemo(() => {
    let xs = memoryVerses;
    if (themeFilter !== "all") xs = xs.filter((v) => v.theme === themeFilter);
    if (q.trim()) {
      const n = q.trim().toLowerCase();
      xs = xs.filter(
        (v) => v.ref.toLowerCase().includes(n) || v.text.toLowerCase().includes(n)
      );
    }
    return xs;
  }, [themeFilter, q]);

  const stats = useMemo(() => {
    const counts = { started: 0, mastered: 0 };
    for (const r of records) {
      counts.started++;
      if (r.level === "mastered") counts.mastered++;
    }
    return counts;
  }, [records]);

  return (
    <div className="space-y-6">
      {mounted && (
        <div className="rounded-2xl border border-flame-200 bg-flame-50/60 p-4 text-sm text-flame-900 flex flex-wrap items-center justify-between gap-3">
          <span>
            You have started <strong>{stats.started}</strong> of {memoryVerses.length} verses ·{" "}
            <strong>{stats.mastered}</strong> mastered
          </span>
          <span className="text-xs text-flame-700/80">
            Progress lives only on this device.
          </span>
        </div>
      )}

      <TrainerCard verse={verse} level={level} record={record} mounted={mounted} />

      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Practice level</div>
            <h3 className="font-serif text-xl text-ink-900 mt-0.5">
              {LEVEL_LABEL[level]} <span className="text-ink-400 text-base">·</span>{" "}
              <span className="text-ink-500 text-base font-normal">
                {LEVEL_ORDER.indexOf(level) + 1} / {LEVEL_ORDER.length}
              </span>
            </h3>
          </div>
          {mounted && (
            <div className="flex flex-wrap gap-2">
              {level !== "reading" && (
                <button
                  onClick={regress}
                  className="rounded-full border border-ink-200 px-3 py-1.5 text-xs text-ink-600 hover:border-ink-400"
                >
                  ← Step back
                </button>
              )}
              {level !== "mastered" && (
                <button
                  onClick={advance}
                  className="rounded-full bg-ink-900 text-ink-50 px-3.5 py-1.5 text-xs hover:bg-flame-700"
                >
                  I'm ready for next →
                </button>
              )}
              {record && (
                <button
                  onClick={reset}
                  className="rounded-full border border-ink-200 px-3 py-1.5 text-xs text-ink-500 hover:border-ink-400"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-ink-700 leading-relaxed">{LEVEL_HELP[level]}</p>
      </div>

      <div className="rounded-3xl border border-ink-200 bg-ink-50/60 p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
          <div className="text-xs uppercase tracking-widest text-ink-500">Choose a verse</div>
          <span className="text-xs text-ink-500">
            {filtered.length} of {memoryVerses.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <FilterPill active={themeFilter === "all"} onClick={() => setThemeFilter("all")}>
            All themes
          </FilterPill>
          {ALL_THEMES.map((t) => (
            <FilterPill
              key={t}
              active={themeFilter === t}
              onClick={() => setThemeFilter(t)}
            >
              {themeLabels[t]}
            </FilterPill>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search reference or text…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
        />
        <ul className="mt-4 grid sm:grid-cols-2 gap-2">
          {filtered.map((v) => {
            const r = records.find((x) => x.verseId === v.id);
            const isActive = v.id === activeId;
            return (
              <li key={v.id}>
                <button
                  onClick={() => setActiveId(v.id)}
                  className={`w-full text-left rounded-xl border px-3 py-2.5 transition-colors text-sm ${
                    isActive
                      ? "bg-ink-900 text-ink-50 border-ink-900"
                      : "bg-card border-ink-200 hover:border-flame-500 text-ink-900"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium">{v.ref}</span>
                    {r && (
                      <span
                        className={`text-[10px] uppercase tracking-widest ${
                          isActive ? "text-flame-300" : "text-flame-700"
                        }`}
                      >
                        {LEVEL_LABEL[r.level]}
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs mt-0.5 ${
                      isActive ? "text-ink-300" : "text-ink-500"
                    }`}
                  >
                    {themeLabels[v.theme]}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function TrainerCard({
  verse,
  level,
  record,
  mounted,
}: {
  verse: MemoryVerse;
  level: MemoryLevel;
  record: MemoryRecord | undefined;
  mounted: boolean;
}) {
  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-flame-700">
            {themeLabels[verse.theme]}
          </span>
          <h2 className="font-serif text-3xl text-ink-900 mt-1">{verse.ref}</h2>
        </div>
        <span className="text-xs text-ink-500">WEB</span>
      </div>
      <p className="mt-3 text-sm text-ink-500 italic">{verse.why}</p>

      <div className="mt-6 rounded-2xl bg-ink-50 border border-ink-100 p-5 md:p-6 min-h-32">
        <VerseRender verse={verse} level={level} />
      </div>

      {mounted && record && (
        <div className="mt-4 text-xs text-ink-500 flex flex-wrap gap-3">
          <span>Attempts: <strong className="text-ink-900">{record.attempts}</strong></span>
          <span>Started: <strong className="text-ink-900">{new Date(record.startedAt).toLocaleDateString()}</strong></span>
          {record.lastPracticedAt && (
            <span>Last practiced: <strong className="text-ink-900">{new Date(record.lastPracticedAt).toLocaleDateString()}</strong></span>
          )}
        </div>
      )}
    </div>
  );
}

function VerseRender({ verse, level }: { verse: MemoryVerse; level: MemoryLevel }) {
  const [revealedBlanks, setRevealedBlanks] = useState<Set<number>>(new Set());
  const [revealAll, setRevealAll] = useState(false);

  // Reset reveal state when verse or level changes
  useEffect(() => {
    setRevealedBlanks(new Set());
    setRevealAll(false);
  }, [verse.id, level]);

  if (level === "reading" || level === "mastered" || revealAll) {
    return (
      <>
        <p className="prose-scripture text-ink-900 text-lg md:text-xl leading-relaxed">
          {verse.text}
        </p>
        {revealAll && (
          <button
            onClick={() => setRevealAll(false)}
            className="mt-3 text-xs text-flame-700 hover:underline"
          >
            Hide again
          </button>
        )}
      </>
    );
  }

  if (level === "first-letters") {
    const firstLetters = verse.text
      .split(/(\s+)/)
      .map((tok) => {
        if (!tok.trim()) return tok;
        // Preserve leading punctuation, take first letter of the word
        const m = tok.match(/^([^a-zA-ZÀ-ſ]*)([a-zA-ZÀ-ſ])([a-zA-ZÀ-ſ]*)([^a-zA-ZÀ-ſ]*)/);
        if (!m) return tok;
        return `${m[1]}${m[2]}${"_".repeat(Math.max(0, m[3].length))}${m[4]}`;
      })
      .join("");
    return (
      <>
        <p className="prose-scripture text-ink-900 text-lg md:text-xl leading-relaxed font-mono tracking-wide">
          {firstLetters}
        </p>
        <button
          onClick={() => setRevealAll(true)}
          className="mt-3 text-xs text-flame-700 hover:underline"
        >
          Reveal the full verse
        </button>
      </>
    );
  }

  if (level === "blanks") {
    // Hide roughly every 3rd-4th word, deterministic by position
    const words = verse.text.split(/(\s+)/);
    return (
      <>
        <p className="prose-scripture text-ink-900 text-lg md:text-xl leading-relaxed">
          {words.map((tok, i) => {
            if (!tok.trim()) return <span key={i}>{tok}</span>;
            const isWord = /[a-zA-ZÀ-ſ]/.test(tok);
            // Hide ~1 in 3 substantive words deterministically
            const wordIdx = Math.floor(i / 2);
            const shouldHide = isWord && wordIdx % 3 === 1 && tok.length >= 3;
            if (!shouldHide || revealedBlanks.has(i)) {
              return <span key={i}>{tok}</span>;
            }
            return (
              <button
                key={i}
                onClick={() =>
                  setRevealedBlanks((prev) => new Set(prev).add(i))
                }
                className="inline-block bg-flame-100 text-flame-900 rounded px-1 mx-0.5 hover:bg-flame-200"
                aria-label="Reveal hidden word"
              >
                {"·".repeat(Math.min(tok.length, 6))}
              </button>
            );
          })}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <button
            onClick={() => setRevealAll(true)}
            className="text-flame-700 hover:underline"
          >
            Reveal all
          </button>
          <button
            onClick={() => setRevealedBlanks(new Set())}
            className="text-ink-500 hover:text-ink-900"
          >
            Hide again
          </button>
        </div>
      </>
    );
  }

  // level === "recited"
  return (
    <>
      <p className="text-ink-500 italic">Recite the verse from memory. When you've spoken it without looking, reveal to check.</p>
      <button
        onClick={() => setRevealAll(true)}
        className="mt-4 inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
      >
        Reveal to check
      </button>
    </>
  );
}

function FilterPill({
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
