import { devotional, type DevotionalEntry } from "@/data/devotional";

/** Stable URL slug from a devotional title. */
export function slugifyDevotional(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Look up an entry by slug. Returns the entry and its day-of-year-style index. */
export function findDevotional(
  slug: string
): { entry: DevotionalEntry; index: number } | null {
  for (let i = 0; i < devotional.length; i++) {
    if (slugifyDevotional(devotional[i].title) === slug) {
      return { entry: devotional[i], index: i };
    }
  }
  return null;
}

/** Today's entry (matches the rotation used by DailyDevotional). */
export function todaysDevotional(d: Date = new Date()): {
  entry: DevotionalEntry;
  index: number;
} {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const here = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const doy = Math.floor((here - start) / 86400000);
  const index = doy % devotional.length;
  return { entry: devotional[index], index };
}
