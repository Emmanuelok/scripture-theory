// ─── Liturgical-calendar date math ───────────────────────────
// Western (Gregorian) computus for Easter, then derived seasons +
// movable feasts. Pure functions, no I/O. Honored by every
// faithful Christian tradition: dates, not doctrines.

import { FEASTS, SEASONS, type Feast, type FeastId, type Season, type SeasonId } from "@/data/calendar";

/* ── Utilities ─────────────────────────────────────────────── */

const MS_DAY = 86_400_000;

function utc(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m - 1, d));
}
function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * MS_DAY);
}
function dayOnly(d: Date): Date {
  return utc(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}
function daysBetween(a: Date, b: Date): number {
  return Math.round((dayOnly(b).getTime() - dayOnly(a).getTime()) / MS_DAY);
}

/* ── Easter (Western Gregorian) ──────────────────────────────
   Anonymous Gregorian algorithm — standard textbook computus. */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(year, month, day);
}

/* ── First Sunday of Advent for a given liturgical year ──────
   Advent 1 = the Sunday nearest Nov 30 (St. Andrew). Standard
   Western rule: the 4th Sunday before Christmas Day. */
export function adventStart(christmasYear: number): Date {
  const christmas = utc(christmasYear, 12, 25);
  const dow = christmas.getUTCDay(); // 0=Sun
  // Sunday before Christmas
  const lastSundayBeforeChristmas = addDays(christmas, -((dow + 7) % 7 || 7));
  return addDays(lastSundayBeforeChristmas, -21);
}

/* ── Derived feast / season dates for a given Gregorian year ── */

export type LiturgicalYear = {
  year: number;
  easter: Date;
  ashWednesday: Date;
  palmSunday: Date;
  maundyThursday: Date;
  goodFriday: Date;
  holySaturday: Date;
  ascension: Date;
  pentecost: Date;
  trinitySunday: Date;
  adventStart: Date;            // Advent 1 (begins the NEW liturgical year)
  christTheKing: Date;          // The Sunday before Advent 1
};

export function liturgicalYear(year: number): LiturgicalYear {
  const easter = easterSunday(year);
  const palmSunday = addDays(easter, -7);
  const goodFriday = addDays(easter, -2);
  const holySaturday = addDays(easter, -1);
  const maundyThursday = addDays(easter, -3);
  const ashWednesday = addDays(easter, -46);
  const ascension = addDays(easter, 39);
  const pentecost = addDays(easter, 49);
  const trinitySunday = addDays(pentecost, 7);
  const advent = adventStart(year);
  const christTheKing = addDays(advent, -7);
  return {
    year,
    easter,
    ashWednesday,
    palmSunday,
    maundyThursday,
    goodFriday,
    holySaturday,
    ascension,
    pentecost,
    trinitySunday,
    adventStart: advent,
    christTheKing,
  };
}

/* ── Current season for a given date ─────────────────────────
   We compute relative to the Gregorian year of `d`; if `d` is in
   Dec on/after Advent 1, we still treat the active season as
   Advent (it'll point to next year's Christmas). */
export function seasonOn(d: Date = new Date()): { season: Season; daysIn: number; daysLeft: number } {
  const day = dayOnly(d);
  const y = day.getUTCFullYear();
  const ly = liturgicalYear(y);
  const lyPrev = liturgicalYear(y - 1);
  const lyNext = liturgicalYear(y + 1);

  // Advent of THIS year (begins late Nov, ends Dec 24)
  if (day >= ly.adventStart && day <= utc(y, 12, 24)) {
    return {
      season: SEASONS.advent,
      daysIn: daysBetween(ly.adventStart, day),
      daysLeft: daysBetween(day, utc(y, 12, 24)),
    };
  }

  // Christmastide: Dec 25 → Jan 5
  if (day >= utc(y, 12, 25)) {
    // late December: Christmas of THIS year through Jan 5 next year
    return {
      season: SEASONS.christmas,
      daysIn: daysBetween(utc(y, 12, 25), day),
      daysLeft: daysBetween(day, utc(y + 1, 1, 5)),
    };
  }
  if (day <= utc(y, 1, 5)) {
    // early January = Christmastide of previous-year Christmas
    return {
      season: SEASONS.christmas,
      daysIn: daysBetween(utc(y - 1, 12, 25), day),
      daysLeft: daysBetween(day, utc(y, 1, 5)),
    };
  }

  // Epiphany: Jan 6 → day before Ash Wednesday (of this year)
  if (day >= utc(y, 1, 6) && day < ly.ashWednesday) {
    return {
      season: SEASONS.epiphany,
      daysIn: daysBetween(utc(y, 1, 6), day),
      daysLeft: daysBetween(day, addDays(ly.ashWednesday, -1)),
    };
  }

  // Lent: Ash Wednesday → Saturday before Palm Sunday
  if (day >= ly.ashWednesday && day < ly.palmSunday) {
    return {
      season: SEASONS.lent,
      daysIn: daysBetween(ly.ashWednesday, day),
      daysLeft: daysBetween(day, addDays(ly.palmSunday, -1)),
    };
  }

  // Holy Week: Palm Sunday → Holy Saturday
  if (day >= ly.palmSunday && day < ly.easter) {
    return {
      season: SEASONS["holy-week"],
      daysIn: daysBetween(ly.palmSunday, day),
      daysLeft: daysBetween(day, ly.holySaturday),
    };
  }

  // Eastertide: Easter → Saturday before Pentecost
  if (day >= ly.easter && day < ly.pentecost) {
    return {
      season: SEASONS.easter,
      daysIn: daysBetween(ly.easter, day),
      daysLeft: daysBetween(day, addDays(ly.pentecost, -1)),
    };
  }

  // Pentecost + the week after
  if (day >= ly.pentecost && day < addDays(ly.pentecost, 7)) {
    return {
      season: SEASONS["pentecost-season"],
      daysIn: daysBetween(ly.pentecost, day),
      daysLeft: daysBetween(day, addDays(ly.pentecost, 6)),
    };
  }

  // Ordinary Time after Pentecost (until Advent)
  if (day >= addDays(ly.pentecost, 7) && day < ly.adventStart) {
    return {
      season: SEASONS["ordinary-after-pentecost"],
      daysIn: daysBetween(addDays(ly.pentecost, 7), day),
      daysLeft: daysBetween(day, addDays(ly.adventStart, -1)),
    };
  }

  // Fallback (shouldn't fire) — call it pre-Lent ordinary time
  void lyPrev;
  void lyNext;
  return {
    season: SEASONS["ordinary-pre-lent"],
    daysIn: 0,
    daysLeft: 0,
  };
}

/* ── Today's feast (if any) ──────────────────────────────────
   Returns the feast for `d` if today is one of the named feast days. */
export function feastOn(d: Date = new Date()): Feast | null {
  const day = dayOnly(d);
  const y = day.getUTCFullYear();
  const ly = liturgicalYear(y);

  if (sameDay(day, utc(y, 12, 24))) return FEASTS["christmas-eve"];
  if (sameDay(day, utc(y, 12, 25))) return FEASTS["christmas"];
  if (sameDay(day, utc(y, 1, 6))) return FEASTS["epiphany-day"];
  if (sameDay(day, ly.ashWednesday)) return FEASTS["ash-wednesday"];
  if (sameDay(day, ly.palmSunday)) return FEASTS["palm-sunday"];
  if (sameDay(day, ly.maundyThursday)) return FEASTS["maundy-thursday"];
  if (sameDay(day, ly.goodFriday)) return FEASTS["good-friday"];
  if (sameDay(day, ly.holySaturday)) return FEASTS["holy-saturday"];
  if (sameDay(day, ly.easter)) return FEASTS["easter-day"];
  if (sameDay(day, ly.ascension)) return FEASTS["ascension"];
  if (sameDay(day, ly.pentecost)) return FEASTS["pentecost-day"];
  if (sameDay(day, ly.trinitySunday)) return FEASTS["trinity-sunday"];
  if (sameDay(day, utc(y, 11, 1))) return FEASTS["all-saints"];
  if (sameDay(day, ly.christTheKing)) return FEASTS["christ-the-king"];

  return null;
}

/* ── Next feast (within 30 days) ─────────────────────────────
   Useful for "Advent begins in 6 days" style hints. */
export function nextFeastWithin(d: Date = new Date(), days = 30): { feast: Feast; on: Date; in: number } | null {
  const start = dayOnly(d);
  for (let i = 1; i <= days; i++) {
    const probe = addDays(start, i);
    const f = feastOn(probe);
    if (f) return { feast: f, on: probe, in: i };
  }
  return null;
}

/* ── List feasts in a given Gregorian year (for /calendar) ── */
export type FeastInYear = { id: FeastId; feast: Feast; date: Date };

export function feastsInYear(year: number): FeastInYear[] {
  const ly = liturgicalYear(year);
  const list: FeastInYear[] = [
    { id: "epiphany-day", feast: FEASTS["epiphany-day"], date: utc(year, 1, 6) },
    { id: "ash-wednesday", feast: FEASTS["ash-wednesday"], date: ly.ashWednesday },
    { id: "palm-sunday", feast: FEASTS["palm-sunday"], date: ly.palmSunday },
    { id: "maundy-thursday", feast: FEASTS["maundy-thursday"], date: ly.maundyThursday },
    { id: "good-friday", feast: FEASTS["good-friday"], date: ly.goodFriday },
    { id: "holy-saturday", feast: FEASTS["holy-saturday"], date: ly.holySaturday },
    { id: "easter-day", feast: FEASTS["easter-day"], date: ly.easter },
    { id: "ascension", feast: FEASTS["ascension"], date: ly.ascension },
    { id: "pentecost-day", feast: FEASTS["pentecost-day"], date: ly.pentecost },
    { id: "trinity-sunday", feast: FEASTS["trinity-sunday"], date: ly.trinitySunday },
    { id: "all-saints", feast: FEASTS["all-saints"], date: utc(year, 11, 1) },
    { id: "christ-the-king", feast: FEASTS["christ-the-king"], date: ly.christTheKing },
    { id: "christmas-eve", feast: FEASTS["christmas-eve"], date: utc(year, 12, 24) },
    { id: "christmas", feast: FEASTS["christmas"], date: utc(year, 12, 25) },
  ];
  return list.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/* ── Pretty date formatting ──────────────────────────────────
   Used by /calendar; UI layer is welcome to format differently. */
export function fmtFeastDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function fmtFullDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ── Re-exports for convenience ─────────────────────────────── */
export { SEASONS, FEASTS };
export type { Season, Feast, SeasonId, FeastId };
