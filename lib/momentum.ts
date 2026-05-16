import type { Profile } from "@/lib/profile";

/* ──────────────────────────────────────────────────────────────────
   momentum — quiet, anti-gamified visibility into a believer's walk
   over the last 14 days. No flames, no badges, no streaks-as-pride.
   Just an honest answer to "have I been showing up?"

   "Showing up" = any of: journal entry, gratitude, prayer logged,
   examen, fast meditation, course day marked, course week complete,
   sermon note, healing intercession, memory verse practiced.
────────────────────────────────────────────────────────────────── */

const WINDOW_DAYS = 14;

function dayKey(iso: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

export type MomentumReading = {
  daysActive: number;            // days in the window with any activity
  windowDays: number;            // always 14
  last7: number;                 // active in the last 7 days
  prev7: number;                 // active in the 7 before that
  trend: "rising" | "steady" | "softening" | "new";
  activeDayKeys: string[];       // chronological list of active days, last → first
};

export function readMomentum(profile: Profile, now: Date = new Date()): MomentumReading {
  const windowStart = new Date(now.getTime() - WINDOW_DAYS * 86_400_000);
  const seenDays = new Set<string>();

  function consume(iso?: string) {
    if (!iso) return;
    const t = new Date(iso).getTime();
    if (Number.isNaN(t)) return;
    if (t < windowStart.getTime() || t > now.getTime()) return;
    const k = dayKey(iso);
    if (k) seenDays.add(k);
  }

  // Secret place
  for (const e of profile.secretPlace?.entries ?? []) consume(e.date);
  for (const p of profile.secretPlace?.prayers ?? []) consume(p.date);
  for (const g of profile.secretPlace?.gratitudes ?? []) consume(g.date);

  // Examens
  for (const e of profile.examens ?? []) consume(e.date);

  // Memory practice
  for (const m of profile.memory ?? []) consume(m.lastPracticedAt);

  // Fasts — start/end markers
  for (const f of profile.fasts ?? []) {
    consume(f.startedAt);
    consume(f.endedAt);
  }

  // Healing prayer updates
  for (const h of profile.healing ?? []) {
    consume(h.startedAt);
    for (const up of h.updates ?? []) consume(up.at);
  }

  // Sermon notes
  for (const s of profile.sermons ?? []) consume(s.date);

  // Praying-for log (every time they marked a person prayed for)
  for (const p of profile.prayingFor ?? []) {
    for (const at of p.prayedAt ?? []) consume(at);
  }

  // Family altar
  for (const f of profile.familyAltar ?? []) consume(f.date);

  // Foundations course
  for (const iso of Object.values(profile.course?.weekCompletedAt ?? {})) consume(iso);

  // Nations prayed for
  for (const n of profile.nationsPrayed ?? []) consume(n.date);

  // Last activity (catches recent reading without other footprint)
  consume(profile.lastActivity?.at);

  const sorted = Array.from(seenDays).sort().reverse();
  const todayKey = dayKey(now.toISOString())!;
  const sevenAgoKey = dayKey(new Date(now.getTime() - 7 * 86_400_000).toISOString())!;

  let last7 = 0;
  let prev7 = 0;
  for (const k of sorted) {
    if (k <= todayKey && k > sevenAgoKey) last7++;
    else prev7++;
  }

  const trend: MomentumReading["trend"] =
    sorted.length === 0
      ? "new"
      : last7 > prev7
      ? "rising"
      : last7 < prev7
      ? "softening"
      : "steady";

  return {
    daysActive: sorted.length,
    windowDays: WINDOW_DAYS,
    last7,
    prev7,
    trend,
    activeDayKeys: sorted,
  };
}

export function momentumPastoralLine(m: MomentumReading): string {
  if (m.daysActive === 0) return "A new day. Begin where you are.";
  if (m.last7 === 7) return "Seven of seven. The Father sees your faithfulness — not the number.";
  if (m.last7 >= 5) return "A steady week. You are being formed slowly, deeply.";
  if (m.trend === "rising") return "You are turning back toward Him — and He toward you.";
  if (m.trend === "softening") return "It has been quieter lately. He is not counting; He is waiting.";
  if (m.trend === "steady") return "A steady, hidden walk. This is enough.";
  return "Show up tomorrow. That is all.";
}
