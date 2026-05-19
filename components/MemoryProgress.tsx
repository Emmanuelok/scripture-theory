"use client";

import { useMemo } from "react";
import { useProfile, type MemoryLevel } from "@/lib/profile";
import { memoryVerses, themeLabels, type Theme } from "@/data/memory";

// ─── Memory progress garden ────────────────────────────────────
// Each verse is a small dot, grouped by theme, coloured by mastery level.
// At a glance you can see where you've planted, where you've watered, and
// where verses have grown into something memorised. All from local profile.

const LEVEL_ORDER: Record<MemoryLevel, number> = {
  "reading": 1,
  "first-letters": 2,
  "blanks": 3,
  "recited": 4,
  "mastered": 5,
};

const LEVEL_COLOR: Record<MemoryLevel | "untouched", string> = {
  untouched:       "rgb(30 41 59 / 0.55)",
  "reading":       "rgb(120 113 108)",
  "first-letters": "rgb(249 115 22 / 0.55)",
  "blanks":        "rgb(249 115 22 / 0.8)",
  "recited":       "rgb(254 215 170)",
  "mastered":      "rgb(254 240 199)",
};

const LEVEL_LABEL: Record<MemoryLevel | "untouched", string> = {
  untouched:       "Not started",
  "reading":       "Reading",
  "first-letters": "First letters",
  "blanks":        "Fill the blanks",
  "recited":       "Recited",
  "mastered":      "Mastered",
};

const THEME_ORDER: Theme[] = ["jesus", "gospel", "father", "spirit", "discipleship", "prayer", "comfort", "wisdom", "mission", "love"];

export default function MemoryProgress() {
  const { profile, mounted } = useProfile();

  const byVerse = useMemo(() => {
    const m = new Map<string, MemoryLevel>();
    for (const r of profile.memory ?? []) m.set(r.verseId, r.level);
    return m;
  }, [profile.memory]);

  // Group verses by theme
  const grouped = useMemo(() => {
    const g = new Map<Theme, typeof memoryVerses>();
    for (const v of memoryVerses) {
      if (!g.has(v.theme)) g.set(v.theme, []);
      g.get(v.theme)!.push(v);
    }
    return g;
  }, []);

  const totals = useMemo(() => {
    const total = memoryVerses.length;
    let started = 0;
    let mastered = 0;
    for (const v of memoryVerses) {
      const lvl = byVerse.get(v.id);
      if (lvl) started += 1;
      if (lvl === "mastered" || lvl === "recited") mastered += 1;
    }
    return { total, started, mastered };
  }, [byVerse]);

  if (!mounted) {
    return <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading the garden…</div>;
  }

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Memory garden</div>
          <h3 className="font-serif text-xl text-ink-50 mt-0.5">
            {totals.started > 0 ? (
              <>{totals.started} of {totals.total} verses tended · {totals.mastered} recited or mastered.</>
            ) : (
              <>{totals.total} verses, hand-picked across the great themes.</>
            )}
          </h3>
        </div>
        <div className="text-xs text-ink-400 italic">
          Stays on this device. The reward is the meeting, not the streak.
        </div>
      </div>

      <div className="space-y-3">
        {THEME_ORDER.map((theme) => {
          const verses = grouped.get(theme) ?? [];
          if (verses.length === 0) return null;
          const themeStarted = verses.filter((v) => byVerse.has(v.id)).length;
          const themeMastered = verses.filter((v) => {
            const l = byVerse.get(v.id);
            return l === "recited" || l === "mastered";
          }).length;
          return (
            <div key={theme} className="rounded-2xl bg-ink-800/50 border border-ink-700/60 p-3">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <div className="font-serif text-ink-100 text-sm">{themeLabels[theme]}</div>
                <div className="text-[10px] uppercase tracking-widest text-ink-500">
                  {themeStarted}/{verses.length} started · {themeMastered} learned
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {verses.map((v) => {
                  const level = byVerse.get(v.id);
                  const color = level ? LEVEL_COLOR[level] : LEVEL_COLOR.untouched;
                  return (
                    <span
                      key={v.id}
                      title={`${v.ref} — ${level ? LEVEL_LABEL[level] : LEVEL_LABEL.untouched}`}
                      className="inline-block rounded-sm"
                      style={{
                        width: 16,
                        height: 16,
                        background: color,
                        border: "0.6px solid rgb(15 23 42)",
                        boxShadow: level === "mastered" ? "0 0 10px rgba(254, 240, 199, 0.6)" : undefined,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-400">
        <span>Legend:</span>
        {(["untouched", "reading", "first-letters", "blanks", "recited", "mastered"] as const).map((l) => (
          <span key={l} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block rounded-sm"
              style={{ width: 12, height: 12, background: LEVEL_COLOR[l], border: "0.6px solid rgb(15 23 42)" }}
            />
            <span>{LEVEL_LABEL[l]}</span>
          </span>
        ))}
      </div>
    </figure>
  );
}
