"use client";

import Link from "next/link";
import { useState } from "react";
import { useProfile, type SabbathPlan } from "@/lib/profile";

const DAY_OPTIONS: { id: NonNullable<SabbathPlan["day"]>; label: string; sub: string }[] = [
  { id: "fri-sat", label: "Friday sundown → Saturday sundown", sub: "The biblical Sabbath." },
  { id: "sat-sun", label: "Saturday sundown → Sunday sundown", sub: "Eve of the Lord's Day to its end." },
  { id: "sun", label: "Sunday all day", sub: "The Lord's Day rest." },
  { id: "custom", label: "Custom 24 hours", sub: "What faithfulness looks like for your week." },
];

const REST_PRACTICES = [
  "Worship with the gathered church",
  "Long, slow meal with family or friends",
  "Walk somewhere outdoors",
  "Nap without guilt",
  "Read Scripture without an agenda",
  "Read something not work-related",
  "Sing — even alone",
  "Light a candle at the start; extinguish it at the end",
  "Hand-write a letter or note",
  "Play with children or a pet",
  "Visit someone elderly or sick",
  "Cook something slowly",
  "Take communion at home (if cut off from gathered worship)",
];

const ABSTAIN = [
  "Work / paid labor",
  "Shopping / errands",
  "Social media",
  "News",
  "Email",
  "Productivity apps",
  "Striving conversations",
  "Driving (where possible)",
  "Doomscrolling",
  "Self-improvement",
];

function isoWeek(date: Date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

export default function SabbathView() {
  const { profile, update, mounted } = useProfile();
  const s: SabbathPlan = profile.sabbath ?? {};
  const thisWeek = isoWeek(new Date());
  const keptThisWeek = (s.weeksKept ?? []).includes(thisWeek);

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function patch(p: Partial<SabbathPlan>) {
    update({ sabbath: { ...s, ...p } });
  }

  function toggleList(key: "rhythms" | "abstain", v: string) {
    const list = (s[key] ?? []) as string[];
    const next = list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
    patch({ [key]: next } as any);
  }

  function markKept() {
    if (keptThisWeek) return;
    patch({ weeksKept: [thisWeek, ...(s.weeksKept ?? [])].slice(0, 104) });
  }

  return (
    <div className="space-y-8">
      <Link
        href="/sabbath/letter"
        className="group relative overflow-hidden block rounded-3xl border border-flame-300 bg-flame-50/60 p-5 md:p-6 hover:border-flame-500 hover:bg-flame-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Read back · your week
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-ink-900 mt-0.5">
              Open this week's Sabbath letter →
            </h3>
            <p className="text-sm text-ink-700 italic mt-1 leading-relaxed">
              A pastoral retrospective of what you walked through — built on this device from your
              own journal, prayers, course, and examens. Not a dashboard, a letter.
            </p>
          </div>
          <span className="text-flame-700 font-serif text-xl shrink-0 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </Link>

      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <h2 className="font-serif text-2xl text-ink-900">The day, the start, the end</h2>
        <p className="mt-2 text-sm text-ink-600">
          Pick what is faithful for your life. Then guard it.
        </p>

        <div className="mt-5 grid sm:grid-cols-2 gap-2">
          {DAY_OPTIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => patch({ day: d.id })}
              className={`text-left rounded-2xl border p-4 transition-colors ${
                s.day === d.id
                  ? "border-flame-500 bg-flame-50/60"
                  : "border-ink-200 bg-card hover:border-ink-400"
              }`}
            >
              <div className="font-serif text-ink-900">{d.label}</div>
              <div className="text-xs text-ink-500 mt-0.5">{d.sub}</div>
            </button>
          ))}
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">Starts at</label>
            <input
              type="time"
              value={s.startsAt ?? ""}
              onChange={(e) => patch({ startsAt: e.target.value })}
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">Ends at</label>
            <input
              type="time"
              value={s.endsAt ?? ""}
              onChange={(e) => patch({ endsAt: e.target.value })}
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-ink-900">What you will stop</h2>
        <p className="text-sm text-ink-600 mt-1">
          Sabbath is, first, a "no." Choose the no's that protect the yes.
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-2">
          {ABSTAIN.map((a) => {
            const on = (s.abstain ?? []).includes(a);
            return (
              <li key={a}>
                <button
                  onClick={() => toggleList("abstain", a)}
                  className={`w-full text-left rounded-2xl border p-3 text-sm ${
                    on
                      ? "border-flame-500 bg-flame-50/60 text-ink-900"
                      : "border-ink-200 bg-card text-ink-700 hover:border-ink-400"
                  }`}
                >
                  <span className="flex justify-between">
                    <span>{a}</span>
                    <span className={on ? "text-flame-700" : "text-ink-400"}>{on ? "✓" : "+"}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-ink-900">What you will do instead</h2>
        <p className="text-sm text-ink-600 mt-1">
          Pick a few. Not all. The Sabbath is generous, not a checklist.
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-2">
          {REST_PRACTICES.map((r) => {
            const on = (s.rhythms ?? []).includes(r);
            return (
              <li key={r}>
                <button
                  onClick={() => toggleList("rhythms", r)}
                  className={`w-full text-left rounded-2xl border p-3 text-sm ${
                    on
                      ? "border-flame-500 bg-flame-50/60 text-ink-900"
                      : "border-ink-200 bg-card text-ink-700 hover:border-ink-400"
                  }`}
                >
                  <span className="flex justify-between">
                    <span>{r}</span>
                    <span className={on ? "text-flame-700" : "text-ink-400"}>{on ? "✓" : "+"}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <label className="text-[10px] uppercase tracking-widest text-flame-700">Notes for my Sabbath</label>
        <textarea
          value={s.customNotes ?? ""}
          onChange={(e) => patch({ customNotes: e.target.value })}
          rows={3}
          placeholder="What does faithful rest look like in this season? Anything to remember?"
          className="mt-1 w-full rounded-2xl border border-ink-300 bg-card px-4 py-3 text-ink-900"
        />
      </section>

      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-300">This week</div>
        <h2 className="font-serif text-2xl mt-1">{thisWeek}</h2>
        <p className="mt-3 text-ink-300 leading-relaxed">
          You've kept Sabbath <strong className="text-ink-50">{s.weeksKept?.length ?? 0}</strong>{" "}
          weeks logged here. The reward is the rest itself, not the streak.
        </p>
        <button
          onClick={markKept}
          disabled={keptThisWeek}
          className={`mt-5 rounded-full px-5 py-2 text-sm ${
            keptThisWeek
              ? "bg-ink-800 border border-ink-700 text-ink-400"
              : "bg-flame-600 text-ink-50 hover:bg-flame-700"
          }`}
        >
          {keptThisWeek ? "Kept this week ✓" : "I kept Sabbath this week"}
        </button>
      </section>
    </div>
  );
}
