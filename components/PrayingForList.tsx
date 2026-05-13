"use client";

import { useState } from "react";
import { useProfile, type PrayingForRecord } from "@/lib/profile";

const MAX_PEOPLE = 5;

export default function PrayingForList() {
  const { profile, update, mounted } = useProfile();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const list = profile.prayingFor ?? [];
  const today = new Date().toISOString().slice(0, 10);

  function add() {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (list.length >= MAX_PEOPLE) return;
    const record: PrayingForRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmed,
      note: note.trim() || undefined,
      addedAt: new Date().toISOString(),
      prayedAt: [],
    };
    update({ prayingFor: [...list, record] });
    setName("");
    setNote("");
  }

  function markPrayed(id: string) {
    const next = list.map((p) => {
      if (p.id !== id) return p;
      const last = p.prayedAt[p.prayedAt.length - 1];
      if (last === today) return p;
      return { ...p, prayedAt: [...p.prayedAt, today] };
    });
    update({ prayingFor: next });
  }

  function markShared(id: string) {
    const next = list.map((p) => {
      if (p.id !== id) return p;
      return { ...p, sharedAt: p.sharedAt ?? new Date().toISOString() };
    });
    update({ prayingFor: next });
  }

  function remove(id: string) {
    if (typeof window !== "undefined" && !window.confirm("Remove this person from your list?"))
      return;
    update({ prayingFor: list.filter((p) => p.id !== id) });
  }

  if (!mounted) return null;

  return (
    <section className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">
            People I'm praying for
          </div>
          <h2 className="font-serif text-2xl text-ink-900 mt-1">
            Three to five names. Pray daily. Share when the door opens.
          </h2>
        </div>
        <span className="text-xs text-ink-500">
          {list.length} of {MAX_PEOPLE}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">
        We don't track streaks, push notifications, or shame you. We just hold the names that you
        have hidden in your heart for the King. They live only on your device.
      </p>

      {list.length < MAX_PEOPLE && (
        <div className="mt-6 grid sm:grid-cols-[1fr_2fr_auto] gap-3 items-end">
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-ink-400">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="A first name is enough"
              className={inputCls}
              maxLength={40}
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-ink-400">
              A short note (optional)
            </span>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="My brother. Hurting at work. Open to a conversation."
              className={inputCls}
              maxLength={120}
            />
          </label>
          <button
            onClick={add}
            disabled={!name.trim()}
            className="inline-flex items-center justify-center rounded-full bg-ink-900 text-ink-50 px-4 py-2.5 text-sm hover:bg-flame-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to my list
          </button>
        </div>
      )}

      {list.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-6 text-center text-ink-500">
          No names yet. Begin with one. Most disciples grow most when they pray for the same person
          every day for a month.
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {list.map((p) => {
            const last = p.prayedAt[p.prayedAt.length - 1];
            const prayedToday = last === today;
            const totalDays = p.prayedAt.length;
            return (
              <li
                key={p.id}
                className="rounded-2xl border border-ink-200 bg-ink-50/60 p-4 md:p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="font-serif text-lg text-ink-900">{p.name}</div>
                    {p.note && (
                      <div className="text-xs text-ink-500 mt-0.5 italic">{p.note}</div>
                    )}
                  </div>
                  <div className="text-xs text-ink-500 flex flex-wrap items-center gap-3">
                    <span>
                      Prayed{" "}
                      <strong className="text-ink-900">
                        {totalDays} {totalDays === 1 ? "day" : "days"}
                      </strong>
                    </span>
                    {p.sharedAt && (
                      <span className="rounded-full bg-emerald-100 text-emerald-900 px-2 py-0.5">
                        Shared
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => markPrayed(p.id)}
                    disabled={prayedToday}
                    className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                      prayedToday
                        ? "bg-emerald-100 text-emerald-900 cursor-default"
                        : "bg-ink-900 text-ink-50 hover:bg-flame-700"
                    }`}
                  >
                    {prayedToday ? "Prayed today ✓" : "I prayed for them today"}
                  </button>
                  {!p.sharedAt && (
                    <button
                      onClick={() => markShared(p.id)}
                      className="inline-flex items-center rounded-full border border-flame-300 text-flame-700 px-3.5 py-1.5 text-xs hover:bg-flame-50"
                    >
                      I shared the Gospel with them
                    </button>
                  )}
                  <button
                    onClick={() => remove(p.id)}
                    className="inline-flex items-center rounded-full border border-ink-200 text-ink-500 px-3.5 py-1.5 text-xs hover:border-ink-400 ml-auto"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {list.length > 0 && (
        <p className="mt-5 text-xs text-ink-500 leading-relaxed">
          When the Lord opens a door with one of these names, mark it shared and celebrate quietly.
          The next conversation will follow the prayer.
        </p>
      )}
    </section>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300";
