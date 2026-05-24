"use client";

import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { useToday } from "@/lib/useToday";
import {
  altarWeekdays,
  altarPattern,
  ageInfo,
  entryForDate,
  type AgeGroup,
} from "@/data/family-altar";

function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(base: Date, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

function startOfWeek(d: Date) {
  // Week starts Sunday — matches Date.getDay() === 0
  return addDays(d, -d.getDay());
}

function longDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function FamilyAltarView() {
  const { profile, update, mounted } = useProfile();
  const log = profile.familyAltar ?? [];

  const [ageGroup, setAgeGroup] = useState<AgeGroup>("kids");
  const today = useToday();
  const [viewDate, setViewDate] = useState<Date>(() => new Date());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("st-family-age");
    if (saved && saved in ageInfo) setAgeGroup(saved as AgeGroup);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("st-family-age", ageGroup);
  }, [ageGroup]);

  const week = useMemo(() => {
    const start = startOfWeek(today);
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      const slot = altarWeekdays[date.getDay()];
      const { entry } = entryForDate(date, slot);
      return { date, slot, entry };
    });
  }, [today]);

  const slot = altarWeekdays[viewDate.getDay()];
  const { entry, index: cycleIndex } = entryForDate(viewDate, slot);
  const ageMeta = ageInfo[ageGroup];
  const content = entry.byAge[ageGroup];

  const viewKey = ymd(viewDate);
  const isToday = ymd(today) === viewKey;
  const doneToday = log.find(
    (l) => l.date === viewKey && l.dayId === slot.id && l.ageGroup === ageGroup
  );

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Your household</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">Who is gathered today?</h2>
          </div>
        </div>
        <div className="mt-4 grid sm:grid-cols-4 gap-2">
          {(Object.entries(ageInfo) as [AgeGroup, typeof ageInfo.kids][]).map(([id, info]) => (
            <button
              key={id}
              onClick={() => setAgeGroup(id)}
              className={`text-left rounded-2xl border p-4 transition-colors ${
                ageGroup === id
                  ? "border-flame-500 bg-flame-50/60"
                  : "border-ink-200 bg-card hover:border-ink-400"
              }`}
            >
              <div className="font-serif text-ink-900">{info.label}</div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700 mt-0.5">
                {info.range}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-500">{ageMeta.note}</p>
      </section>

      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="text-xs uppercase tracking-widest text-flame-300">
            {isToday ? "Today" : longDate(viewDate)} · {slot.pillar} · {ageMeta.label}
          </div>
          {!isToday && (
            <button
              onClick={() => setViewDate(new Date())}
              className="text-[11px] uppercase tracking-widest text-flame-300 hover:text-flame-100"
            >
              ← Back to today
            </button>
          )}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl mt-1 leading-snug">{entry.theme}</h1>
        <p className="text-xs text-ink-300 mt-2 italic">{slot.pillarBlurb}</p>

        <blockquote className="mt-6 prose-scripture text-ink-100 text-lg leading-relaxed">
          "{entry.scripture.text}"
          <div className="mt-2 text-xs text-flame-300 not-italic">— {entry.scripture.ref}</div>
        </blockquote>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-ink-800 border border-ink-700 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">Sing</div>
            <div className="font-serif text-lg mt-1">{entry.song}</div>
            <p className="text-xs text-ink-300 mt-1">
              One verse is enough. Sing it slowly. Even off-key counts.
            </p>
          </div>
          <div className="rounded-2xl bg-ink-800 border border-ink-700 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">Pray</div>
            <p className="text-ink-100 italic mt-1 leading-relaxed">"{entry.prayer}"</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-flame-50 text-ink-900 p-5">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Ask together</div>
          <p className="mt-1 font-serif text-xl">{content.question}</p>
        </div>

        <div className="mt-4 rounded-2xl bg-ink-800 border border-ink-700 p-5">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Do</div>
          <p className="text-ink-100 mt-1 leading-relaxed">{content.activity}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {doneToday ? (
            <span className="rounded-full bg-ink-800 border border-ink-700 px-5 py-2 text-sm text-ink-300">
              Gathered {isToday ? "today" : "this day"} ✓
            </span>
          ) : (
            <button
              onClick={() =>
                update({
                  familyAltar: [
                    { date: viewKey, dayId: slot.id, ageGroup },
                    ...(log ?? []),
                  ].slice(0, 365),
                })
              }
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
            >
              We gathered {isToday ? "today" : "on this day"} ✓
            </button>
          )}
          <a
            href="#pattern"
            className="rounded-full border border-ink-600 text-ink-300 px-5 py-2 text-sm hover:text-ink-50 hover:border-ink-400"
          >
            How the altar runs ↓
          </a>
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-widest text-ink-500">
          Cycle week {cycleIndex + 1} of {slot.entries.length}
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-serif text-2xl text-ink-900">This week</h2>
          <span className="text-xs uppercase tracking-widest text-flame-700">
            Sun {ymd(week[0].date).slice(5)} – Sat {ymd(week[6].date).slice(5)}
          </span>
        </div>
        <p className="text-sm text-ink-600 mt-1">
          Seven pillars, one a day. A different theme each day, fresh content each week. Tap to
          revisit yesterday or peek ahead.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {week.map(({ date, slot: s, entry: e }) => {
            const key = ymd(date);
            const selected = key === viewKey;
            const past = key < ymd(today);
            const future = key > ymd(today);
            const dayLogged = log.some(
              (l) => l.date === key && l.dayId === s.id && l.ageGroup === ageGroup
            );
            return (
              <button
                key={key}
                onClick={() => setViewDate(date)}
                className={`text-left rounded-2xl border p-4 transition-colors ${
                  selected
                    ? "border-flame-500 bg-flame-50/60"
                    : "border-ink-200 bg-card hover:border-ink-400"
                } ${future ? "opacity-70" : ""}`}
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-flame-700">
                  <span>{s.weekday.slice(0, 3)} · {s.pillar}</span>
                  {dayLogged && <span className="text-ink-500">✓</span>}
                </div>
                <div className="font-serif text-ink-900 mt-1 leading-snug line-clamp-2">
                  {e.theme}
                </div>
                <div className="text-xs text-ink-500 mt-1">{e.scripture.ref}</div>
                {past && !dayLogged && (
                  <div className="text-[10px] uppercase tracking-widest text-ink-400 mt-2">
                    Catch up
                  </div>
                )}
                {future && (
                  <div className="text-[10px] uppercase tracking-widest text-ink-400 mt-2">
                    Coming
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section id="pattern">
        <h2 className="font-serif text-2xl text-ink-900">The pattern — seven simple steps</h2>
        <p className="text-sm text-ink-600 mt-1">
          Ten minutes. Same shape every time. Children learn what to expect; adults learn that
          worship is humble and doable.
        </p>
        <ol className="mt-4 space-y-3">
          {altarPattern.map((p, i) => (
            <li key={p.step} className="rounded-2xl border border-ink-200 bg-card p-5 flex gap-4">
              <div className="font-serif text-3xl text-flame-700 shrink-0 w-10 text-center">
                {i + 1}
              </div>
              <div>
                <div className="font-serif text-ink-900">{p.step}</div>
                <p className="text-sm text-ink-700 mt-1 leading-relaxed">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {log.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl text-ink-900">Our gatherings</h2>
          <p className="text-sm text-ink-500 mt-1">
            A quiet record of when this household met around the Word. The reward is the meeting,
            not the streak.
          </p>
          <p className="mt-3 text-ink-700">
            <strong className="text-ink-900">{log.length}</strong> gatherings recorded.
          </p>
        </section>
      )}
    </div>
  );
}
