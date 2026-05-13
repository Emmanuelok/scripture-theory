"use client";

import { useState } from "react";
import { useProfile } from "@/lib/profile";
import { marriageWeek, marriageIntentions } from "@/data/marriage-parenting";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const WEEKDAY_ORDER = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function MarriageView() {
  const { profile, update, mounted } = useProfile();
  const m = profile.marriage ?? {};
  const today = todayKey();
  const todayName = WEEKDAY_ORDER[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState<string>(todayName);
  const day = marriageWeek.find((d) => d.weekday === selectedDay) ?? marriageWeek[0];
  const prayedToday = (m.daysLogged ?? []).includes(today);

  const [partner, setPartner] = useState(m.partnerName ?? "");
  const [anniversary, setAnniversary] = useState(m.anniversary ?? "");

  function savePartner() {
    update({
      marriage: { ...m, partnerName: partner.trim() || undefined, anniversary: anniversary || undefined, beganAt: m.beganAt ?? new Date().toISOString() },
    });
  }

  function prayed() {
    if (prayedToday) return;
    update({
      marriage: {
        ...m,
        daysLogged: [today, ...(m.daysLogged ?? [])].slice(0, 366),
        beganAt: m.beganAt ?? new Date().toISOString(),
      },
    });
  }

  function toggleIntention(text: string) {
    const list = m.intentions ?? [];
    const next = list.includes(text) ? list.filter((x) => x !== text) : [...list, text];
    update({ marriage: { ...m, intentions: next, beganAt: m.beganAt ?? new Date().toISOString() } });
  }

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">My spouse</label>
            <input
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              onBlur={savePartner}
              placeholder="Their name"
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">Anniversary (optional)</label>
            <input
              type="date"
              value={anniversary}
              onChange={(e) => setAnniversary(e.target.value)}
              onBlur={savePartner}
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
            />
          </div>
        </div>
        <p className="mt-4 text-sm text-ink-600">
          {(m.daysLogged?.length ?? 0)} days prayed{m.partnerName ? ` for ${m.partnerName}` : ""}.
        </p>
      </section>

      <section>
        <div className="text-xs uppercase tracking-widest text-flame-700">Pick a day</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {marriageWeek.map((d) => (
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
        <p className="text-sm text-ink-600 mt-1">
          Marriage vows are made once. Intentions are renewed weekly. Pick what you commit to.
        </p>
        <ul className="mt-4 space-y-2">
          {marriageIntentions.map((i) => {
            const on = (m.intentions ?? []).includes(i);
            return (
              <li key={i}>
                <button
                  onClick={() => toggleIntention(i)}
                  className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                    on ? "border-flame-500 bg-flame-50/60" : "border-ink-200 bg-card hover:border-ink-400"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-ink-900">{i}</span>
                    <span className={`text-xs ${on ? "text-flame-700" : "text-ink-400"}`}>
                      {on ? "✓ committed" : "+ add"}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
