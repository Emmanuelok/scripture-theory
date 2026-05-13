"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { findNation, nations, todaysNation } from "@/data/nations";
import { flagEmoji } from "@/lib/flags";

function todayKey(d = new Date()): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dateMinus(days: number, base = new Date()): string {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() - days);
  return todayKey(d);
}

function computeStreak(prayedDates: string[]): number {
  const set = new Set(prayedDates);
  // Streak ends today (if prayed today) or yesterday (so a user who hasn't
  // prayed today yet doesn't drop their streak mid-day).
  let day = set.has(todayKey()) ? 0 : 1;
  let streak = 0;
  while (true) {
    const key = dateMinus(day);
    if (set.has(key)) {
      streak++;
      day++;
    } else {
      break;
    }
  }
  return streak;
}

export default function NationsRhythm() {
  const { profile, mounted } = useProfile();

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 grid sm:grid-cols-3 gap-4 text-sm text-ink-500">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  const records = profile.nationsPrayed ?? [];
  const today = todayKey();
  const todays = todaysNation();
  const prayedToday = records.some((r) => r.iso === todays.iso && r.date === today);
  const allDates = Array.from(new Set(records.map((r) => r.date)));
  const streak = computeStreak(allDates);
  const uniqueNations = new Set(records.map((r) => r.iso)).size;
  const adopted = profile.adoptedNationIso ? findNation(profile.adoptedNationIso) : undefined;

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-3">
        <Stat
          label="Today"
          value={prayedToday ? "Prayed ✓" : "Not yet"}
          accent={prayedToday ? "emerald" : "muted"}
        />
        <Stat
          label="Streak"
          value={`${streak} ${streak === 1 ? "day" : "days"}`}
          sub={streak > 0 ? "consecutive" : "no shame — pray today"}
          accent={streak > 0 ? "flame" : "muted"}
        />
        <Stat
          label="Nations prayed"
          value={`${uniqueNations} / ${nations.length}`}
          sub="across all time"
          accent="muted"
        />
      </div>

      {adopted && (
        <Link
          href={`/pray/nations/${adopted.iso.toLowerCase()}`}
          className="block rounded-2xl border border-flame-300 bg-flame-50/60 p-4 hover:bg-flame-50"
        >
          <div className="text-xs uppercase tracking-widest text-flame-700">
            Adopted nation · pray daily
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-2xl" aria-hidden>
              {flagEmoji(adopted.iso)}
            </span>
            <span className="font-serif text-xl text-ink-900">{adopted.name}</span>
          </div>
        </Link>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent = "muted",
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "emerald" | "flame" | "muted";
}) {
  const accentCls =
    accent === "emerald"
      ? "text-emerald-700"
      : accent === "flame"
      ? "text-flame-700"
      : "text-ink-900";
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4">
      <div className="text-[10px] uppercase tracking-widest text-ink-500">{label}</div>
      <div className={`font-serif text-2xl mt-0.5 ${accentCls}`}>{value}</div>
      {sub && <div className="text-xs text-ink-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4">
      <div className="h-2 w-12 bg-ink-100 rounded" />
      <div className="mt-3 h-6 w-20 bg-ink-100 rounded" />
    </div>
  );
}
