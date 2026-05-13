"use client";

import { useState } from "react";
import { useProfile, type Child } from "@/lib/profile";
import { parentingWeek, parentingIntentions } from "@/data/marriage-parenting";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const WEEKDAY_ORDER = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ParentingView() {
  const { profile, update, mounted } = useProfile();
  const p = profile.parenting ?? {};
  const today = todayKey();
  const [selectedDay, setSelectedDay] = useState<string>(WEEKDAY_ORDER[new Date().getDay()]);
  const day = parentingWeek.find((d) => d.weekday === selectedDay) ?? parentingWeek[0];
  const prayedToday = (p.daysLogged ?? []).includes(today);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function addChild() {
    if (!name.trim()) return;
    const c: Child = { id: newId(), name: name.trim(), ageOrBirth: age.trim() || undefined };
    update({
      parenting: { ...p, children: [...(p.children ?? []), c], beganAt: p.beganAt ?? new Date().toISOString() },
    });
    setName("");
    setAge("");
  }

  function patchChild(id: string, patch: Partial<Child>) {
    update({
      parenting: {
        ...p,
        children: (p.children ?? []).map((c) => (c.id === id ? { ...c, ...patch } : c)),
      },
    });
  }

  function deleteChild(id: string) {
    if (typeof window !== "undefined" && window.confirm("Remove this child from the prayer list?")) {
      update({ parenting: { ...p, children: (p.children ?? []).filter((c) => c.id !== id) } });
    }
  }

  function prayed() {
    if (prayedToday) return;
    update({
      parenting: { ...p, daysLogged: [today, ...(p.daysLogged ?? [])].slice(0, 366), beganAt: p.beganAt ?? new Date().toISOString() },
    });
  }

  function toggleIntention(text: string) {
    const intentions = (p as any).intentions ?? []; // we'll piggyback on marriage style if useful
    // Parenting doesn't have intentions field; we'll just show the list.
    return text;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <h2 className="font-serif text-2xl text-ink-900">My children — by name</h2>
        <p className="text-sm text-ink-600 mt-1">
          Pray for them specifically. The Father knows the hairs of their heads (Luke 12:7).
        </p>
        <ul className="mt-4 space-y-2">
          {(p.children ?? []).map((c) => (
            <li key={c.id} className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="font-serif text-ink-900">{c.name}</div>
                  {c.ageOrBirth && <div className="text-xs text-ink-500 mt-0.5">{c.ageOrBirth}</div>}
                </div>
                <button
                  onClick={() => deleteChild(c.id)}
                  className="text-xs text-ink-400 hover:text-flame-700"
                >
                  Remove
                </button>
              </div>
              <input
                defaultValue={c.prayerFocus ?? ""}
                onBlur={(e) => patchChild(c.id, { prayerFocus: e.target.value })}
                placeholder="Today's prayer focus for this child…"
                className="mt-2 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900"
              />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="flex-1 rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age (optional)"
            className="w-32 rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
          />
          <button
            onClick={addChild}
            disabled={!name.trim()}
            className="rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700 disabled:opacity-40"
          >
            + Add child
          </button>
        </div>
        <p className="mt-3 text-xs text-ink-500">
          {(p.daysLogged?.length ?? 0)} days prayed.
        </p>
      </section>

      <section>
        <div className="text-xs uppercase tracking-widest text-flame-700">Pick a day</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {parentingWeek.map((d) => (
            <button
              key={d.weekday}
              onClick={() => setSelectedDay(d.weekday)}
              className={`rounded-full px-3 py-1 text-xs ${
                selectedDay === d.weekday
                  ? "bg-flame-600 text-ink-50"
                  : "border border-ink-300 text-ink-700 hover:border-ink-900"
              }`}
            >
              {d.weekday}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-10 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-300">
          {day.weekday} · {day.focus}
        </div>
        <blockquote className="mt-3 prose-scripture text-lg leading-relaxed italic">
          "{day.scripture.text}"
        </blockquote>
        <p className="text-xs text-flame-300 mt-1">— {day.scripture.ref}</p>
        <p className="mt-6 text-ink-100 italic leading-relaxed">"{day.prayer}"</p>

        {(p.children ?? []).length > 0 && (
          <div className="mt-6 rounded-2xl bg-ink-800 border border-ink-700 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">
              Praying for, by name
            </div>
            <ul className="mt-2 space-y-1.5">
              {(p.children ?? []).map((c) => (
                <li key={c.id} className="text-ink-100">
                  <span className="font-serif">{c.name}</span>
                  {c.prayerFocus && <span className="text-ink-400"> — {c.prayerFocus}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={prayed}
          disabled={prayedToday}
          className={`mt-8 rounded-full px-5 py-2 text-sm ${
            prayedToday
              ? "bg-ink-800 border border-ink-700 text-ink-400"
              : "bg-flame-600 text-ink-50 hover:bg-flame-700"
          }`}
        >
          {prayedToday ? "Prayed today ✓" : "I prayed today"}
        </button>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-ink-900">Intentions before the Lord</h2>
        <ul className="mt-4 space-y-2">
          {parentingIntentions.map((i) => (
            <li key={i} className="rounded-2xl border border-ink-200 bg-card p-4 text-ink-900">
              {i}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
