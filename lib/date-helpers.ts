/* ──────────────────────────────────────────────────────────────────
   Date keys — one place, so "what day is it" is computed consistently.

   Two notions of "today" intentionally coexist:

     • UTC day — for content that must be identical for everyone on the
       same calendar day regardless of timezone: the verse of the day,
       the nation of the day, the devotional rotation. Everyone in the
       world should be reading the same one.

     • Local day — for a believer's own wall-clock experience: the daily
       reminder, dismissals, "prayed today" marks. These belong to the
       person's day, not the server's.

   Pick deliberately. Mixing them is how a reminder dismissal "sticks"
   or a daily card reappears near midnight.
────────────────────────────────────────────────────────────────── */

/** YYYY-MM-DD in UTC. Use for globally-shared daily content. */
export function utcDayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/** YYYY-MM-DD in the device's local timezone. Use for user-facing "today". */
export function localDayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Day of the year, 1..366, computed in UTC. */
export function dayOfYearUTC(d: Date = new Date()): number {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const here = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.floor((here - start) / 86_400_000);
}
