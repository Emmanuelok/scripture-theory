"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/lib/profile";
import { altarWeek, ageInfo, altarPattern, type AgeGroup } from "@/data/family-altar";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function todayWeekday() {
  return new Date().getDay(); // 0 = Sunday
}

const WEEKDAY_ORDER = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function FamilyAltarView() {
  const { profile, update, mounted } = useProfile();
  const log = profile.familyAltar ?? [];
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("kids");
  const [selectedId, setSelectedId] = useState<string>(WEEKDAY_ORDER[todayWeekday()]);

  useEffect(() => {
    // Restore last age group from localStorage
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("st-family-age");
    if (saved && saved in ageInfo) setAgeGroup(saved as AgeGroup);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("st-family-age", ageGroup);
  }, [ageGroup]);

  const day = altarWeek.find((d) => d.id === selectedId) ?? altarWeek[0];
  const today = todayKey();
  const doneToday = log.find((l) => l.date === today && l.dayId === day.id && l.ageGroup === ageGroup);
  const ageMeta = ageInfo[ageGroup];
  const content = day.byAge[ageGroup];

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Your household</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">
              Who is gathered today?
            </h2>
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

      <section>
        <div className="text-xs uppercase tracking-widest text-flame-700">Pick a day</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {altarWeek.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`rounded-full px-3 py-1 text-xs ${
                selectedId === d.id
                  ? "bg-flame-600 text-ink-50"
                  : "border border-ink-300 text-ink-700 hover:border-ink-900"
              }`}
            >
              {d.weekday}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-300">
          {day.weekday} · {ageMeta.label}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl mt-1 leading-snug">{day.theme}</h1>

        <blockquote className="mt-6 prose-scripture text-ink-100 text-lg leading-relaxed">
          "{day.scripture.text}"
          <div className="mt-2 text-xs text-flame-300 not-italic">— {day.scripture.ref}</div>
        </blockquote>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-ink-800 border border-ink-700 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">Sing</div>
            <div className="font-serif text-lg mt-1">{day.song}</div>
            <p className="text-xs text-ink-300 mt-1">
              One verse is enough. Sing it slowly. Even off-key counts.
            </p>
          </div>
          <div className="rounded-2xl bg-ink-800 border border-ink-700 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">Pray</div>
            <p className="text-ink-100 italic mt-1 leading-relaxed">"{day.prayer}"</p>
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
              Gathered today ✓
            </span>
          ) : (
            <button
              onClick={() =>
                update({
                  familyAltar: [
                    { date: today, dayId: day.id, ageGroup },
                    ...(log ?? []),
                  ].slice(0, 365),
                })
              }
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
            >
              We gathered today ✓
            </button>
          )}
          <a
            href="#pattern"
            className="rounded-full border border-ink-600 text-ink-300 px-5 py-2 text-sm hover:text-ink-50 hover:border-ink-400"
          >
            How the altar runs ↓
          </a>
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
