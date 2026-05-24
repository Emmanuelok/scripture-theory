"use client";

import Link from "next/link";
import { useToday } from "@/lib/useToday";
import { feastOn, nextFeastWithin, seasonOn } from "@/lib/calendar";
import type { SeasonId } from "@/data/calendar";

/* ──────────────────────────────────────────────────────────────────
   SeasonBanner — surfaces the Christian year prominently during the
   major seasons. Stays silent during the long Ordinary stretches so
   it doesn't become noise.

   Major seasons (banner shows): Advent, Christmastide, Holy Week,
   Easter (octave + early weeks), Pentecost week.

   Minor seasons (silent unless a feast is within ~10 days): Epiphany,
   ordinary-pre-lent, ordinary-after-pentecost. Lent shows from Ash
   Wednesday through Easter Saturday.

   On feast days (the dozen we honour ecumenically), the feast takes
   precedence over the season label.
────────────────────────────────────────────────────────────────── */

const MAJOR_SEASONS: SeasonId[] = [
  "advent",
  "christmas",
  "lent",
  "holy-week",
  "easter",
  "pentecost-season",
];

// Tailwind doesn't compose dynamic class names safely, so map seasons to
// fixed class strings.
const SEASON_THEME: Record<
  SeasonId,
  { border: string; bg: string; tag: string; titleAccent: string }
> = {
  advent: {
    border: "border-violet-300",
    bg: "bg-gradient-to-br from-violet-50 via-card to-card",
    tag: "text-violet-700",
    titleAccent: "text-violet-800",
  },
  christmas: {
    border: "border-amber-300",
    bg: "bg-gradient-to-br from-amber-50 via-card to-card",
    tag: "text-amber-700",
    titleAccent: "text-amber-800",
  },
  epiphany: {
    border: "border-sky-300",
    bg: "bg-gradient-to-br from-sky-50 via-card to-card",
    tag: "text-sky-700",
    titleAccent: "text-sky-800",
  },
  "ordinary-pre-lent": {
    border: "border-emerald-300",
    bg: "bg-gradient-to-br from-emerald-50 via-card to-card",
    tag: "text-emerald-700",
    titleAccent: "text-emerald-800",
  },
  lent: {
    border: "border-violet-400",
    bg: "bg-gradient-to-br from-violet-100 via-card to-card",
    tag: "text-violet-800",
    titleAccent: "text-violet-900",
  },
  "holy-week": {
    border: "border-red-400",
    bg: "bg-gradient-to-br from-red-50 via-card to-card",
    tag: "text-red-700",
    titleAccent: "text-red-800",
  },
  easter: {
    border: "border-amber-300",
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-card",
    tag: "text-amber-700",
    titleAccent: "text-amber-800",
  },
  "pentecost-season": {
    border: "border-rose-300",
    bg: "bg-gradient-to-br from-rose-50 via-card to-card",
    tag: "text-rose-700",
    titleAccent: "text-rose-800",
  },
  "ordinary-after-pentecost": {
    border: "border-emerald-300",
    bg: "bg-gradient-to-br from-emerald-50 via-card to-card",
    tag: "text-emerald-700",
    titleAccent: "text-emerald-800",
  },
};

export default function SeasonBanner({
  variant = "card",
}: {
  variant?: "card" | "strip";
}) {
  const today = useToday();
  const feast = feastOn(today);
  const { season, daysIn, daysLeft } = seasonOn(today);
  const upcoming = nextFeastWithin(today, 10);

  const isMajor = MAJOR_SEASONS.includes(season.id);
  // Don't surface during long Ordinary stretches unless a feast is near.
  if (!isMajor && !feast && !upcoming) return null;

  const theme = SEASON_THEME[season.id];

  // Feast today wins the headline
  if (feast) {
    return (
      <div className={`relative rounded-3xl border p-5 md:p-6 ${theme.border} ${theme.bg}`}>
        <div className={`text-[10px] uppercase tracking-widest ${theme.tag}`}>
          Feast · today
        </div>
        <h3 className={`font-serif text-xl md:text-2xl mt-0.5 leading-tight ${theme.titleAccent}`}>
          {feast.name}
        </h3>
        <p className="mt-2 text-sm text-ink-800 leading-relaxed">{feast.tagline}</p>
        {feast.scripture && (
          <blockquote className="mt-3 border-l-2 border-current pl-3 text-sm text-ink-800 italic leading-relaxed">
            &ldquo;{feast.scripture.text}&rdquo;
            <span className={`block mt-0.5 not-italic text-[10px] uppercase tracking-widest ${theme.tag}`}>
              {feast.scripture.ref}
            </span>
          </blockquote>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/calendar"
            className="rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-xs hover:bg-flame-700"
          >
            See the Christian year →
          </Link>
        </div>
      </div>
    );
  }

  // Strip variant — slim, for the home page
  if (variant === "strip") {
    return (
      <Link
        href="/calendar"
        className={`block rounded-2xl border p-3 md:p-4 hover:border-ink-700 transition-colors ${theme.border} ${theme.bg}`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className={`text-[10px] uppercase tracking-widest ${theme.tag}`}>
              Season
            </span>
            <span className={`font-serif text-base md:text-lg ${theme.titleAccent}`}>
              {season.name}
            </span>
          </div>
          <span className="text-[11px] text-ink-600 italic">
            {upcoming
              ? `${upcoming.feast.name} in ${upcoming.in} day${upcoming.in === 1 ? "" : "s"} →`
              : daysLeft > 0
                ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left →`
                : "Open the Christian year →"}
          </span>
        </div>
      </Link>
    );
  }

  // Card variant — full, for /today
  return (
    <div className={`relative rounded-3xl border p-5 md:p-6 ${theme.border} ${theme.bg}`}>
      <div className={`text-[10px] uppercase tracking-widest ${theme.tag}`}>
        Season · day {daysIn + 1}
      </div>
      <h3 className={`font-serif text-xl md:text-2xl mt-0.5 leading-tight ${theme.titleAccent}`}>
        {season.name}
      </h3>
      <p className="mt-1 text-sm text-ink-700 italic">{season.tagline}</p>
      <blockquote className="mt-3 border-l-2 border-current pl-3 text-sm text-ink-800 italic leading-relaxed">
        &ldquo;{season.scripture.text}&rdquo;
        <span className={`block mt-0.5 not-italic text-[10px] uppercase tracking-widest ${theme.tag}`}>
          {season.scripture.ref}
        </span>
      </blockquote>
      <p className="mt-3 text-sm text-ink-800 leading-relaxed">{season.pray[0]}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/calendar"
          className="rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-xs hover:bg-flame-700"
        >
          The Christian year →
        </Link>
        {upcoming && (
          <span className="rounded-full border border-ink-300 bg-card px-3 py-1.5 text-[11px] text-ink-700">
            {upcoming.feast.name} · in {upcoming.in} day{upcoming.in === 1 ? "" : "s"}
          </span>
        )}
        {!upcoming && daysLeft > 0 && (
          <span className="rounded-full border border-ink-300 bg-card px-3 py-1.5 text-[11px] text-ink-700">
            {daysLeft} day{daysLeft === 1 ? "" : "s"} left in {season.name}
          </span>
        )}
      </div>
    </div>
  );
}
