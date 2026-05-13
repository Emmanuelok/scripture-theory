"use client";

import { useMemo, useState } from "react";
import { useProfile, type DiscipleRecord, type JourneyEvent, type JourneyEventType, type JourneyStage } from "@/lib/profile";

const STAGES: { id: JourneyStage; label: string; emoji: string; blurb: string }[] = [
  { id: "outside", label: "Praying for them", emoji: "🌱", blurb: "Not yet a believer — we are praying and being a friend." },
  { id: "conversation", label: "Conversation begun", emoji: "🗣", blurb: "Spiritual conversations are happening." },
  { id: "studying", label: "Reading the Word together", emoji: "📖", blurb: "Meeting around Scripture, asking questions." },
  { id: "responded", label: "Said yes to Jesus", emoji: "✝", blurb: "They have turned to Christ in faith." },
  { id: "baptized", label: "Baptized", emoji: "💧", blurb: "Publicly confessed faith in baptism." },
  { id: "community", label: "In a local church", emoji: "⛪", blurb: "Committed to the Body of Christ where they live." },
  { id: "reproducing", label: "Discipling others", emoji: "🌳", blurb: "Now making disciples themselves (2 Tim 2:2)." },
];

const EVENT_TYPES: { id: JourneyEventType; label: string; promotesTo?: JourneyStage }[] = [
  { id: "prayed_for", label: "Prayed for them" },
  { id: "conversation", label: "Had a spiritual conversation", promotesTo: "conversation" },
  { id: "shared_gospel", label: "Shared the Gospel" },
  { id: "studied_scripture", label: "Read the Bible together", promotesTo: "studying" },
  { id: "discipleship_meeting", label: "Discipleship meeting" },
  { id: "responded", label: "They said yes to Jesus", promotesTo: "responded" },
  { id: "baptized", label: "They were baptized", promotesTo: "baptized" },
  { id: "joined_community", label: "They joined a local church", promotesTo: "community" },
  { id: "began_discipling", label: "They began discipling someone", promotesTo: "reproducing" },
];

const STAGE_ORDER: JourneyStage[] = STAGES.map((s) => s.id);

function todayIso() {
  return new Date().toISOString();
}

function dateKey(iso: string) {
  return iso.slice(0, 10);
}

function stageRank(stage: JourneyStage): number {
  return STAGE_ORDER.indexOf(stage);
}

export default function JourneyTracker() {
  const { profile, update, mounted } = useProfile();
  const disciples = profile.disciples ?? [];

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  function addDisciple() {
    const trimmed = name.trim();
    if (!trimmed) return;
    const rec: DiscipleRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmed,
      city: city.trim() || undefined,
      startedAt: todayIso(),
      stage: "outside",
      events: [],
    };
    update({ disciples: [...disciples, rec] });
    setName("");
    setCity("");
    setOpenId(rec.id);
  }

  function logEvent(disciple: DiscipleRecord, type: JourneyEventType, note?: string) {
    const evt: JourneyEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      date: todayIso(),
      note: note?.trim() || undefined,
    };
    const eventMeta = EVENT_TYPES.find((e) => e.id === type);
    // Auto-promote stage when the new event implies a later stage.
    let nextStage = disciple.stage;
    if (eventMeta?.promotesTo && stageRank(eventMeta.promotesTo) > stageRank(disciple.stage)) {
      nextStage = eventMeta.promotesTo;
    }
    const next: DiscipleRecord = {
      ...disciple,
      stage: nextStage,
      events: [evt, ...disciple.events],
    };
    update({ disciples: disciples.map((d) => (d.id === disciple.id ? next : d)) });
  }

  function setStage(disciple: DiscipleRecord, stage: JourneyStage) {
    const next = { ...disciple, stage };
    update({ disciples: disciples.map((d) => (d.id === disciple.id ? next : d)) });
  }

  function removeDisciple(disciple: DiscipleRecord) {
    if (typeof window === "undefined") return;
    if (!window.confirm(`Remove ${disciple.name} from your journey? This deletes all events for them.`)) return;
    update({ disciples: disciples.filter((d) => d.id !== disciple.id) });
  }

  const stats = useMemo(() => {
    const byStage = STAGES.reduce<Record<JourneyStage, number>>(
      (acc, s) => ({ ...acc, [s.id]: 0 }),
      { outside: 0, conversation: 0, studying: 0, responded: 0, baptized: 0, community: 0, reproducing: 0 }
    );
    let totalEvents = 0;
    let prayerDays = new Set<string>();
    let gospelShares = 0;
    let discipleshipMeetings = 0;
    for (const d of disciples) {
      byStage[d.stage] += 1;
      for (const e of d.events) {
        totalEvents++;
        if (e.type === "prayed_for") prayerDays.add(`${d.id}:${dateKey(e.date)}`);
        if (e.type === "shared_gospel") gospelShares++;
        if (e.type === "discipleship_meeting") discipleshipMeetings++;
      }
    }
    return {
      total: disciples.length,
      byStage,
      totalEvents,
      prayerDays: prayerDays.size,
      gospelShares,
      discipleshipMeetings,
      responded: byStage.responded + byStage.baptized + byStage.community + byStage.reproducing,
      reproducing: byStage.reproducing,
    };
  }, [disciples]);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-8 text-ink-500">
        Loading your journey…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lifetime stats */}
      {disciples.length > 0 && (
        <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-flame-300">Your discipleship</div>
          <h2 className="font-serif text-2xl md:text-3xl mt-1">
            {stats.total} {stats.total === 1 ? "person" : "people"} on the journey with you.
          </h2>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Stat label="Prayer days logged" value={String(stats.prayerDays)} />
            <Stat label="Gospel shares" value={String(stats.gospelShares)} />
            <Stat label="Discipleship meetings" value={String(stats.discipleshipMeetings)} />
            <Stat label="Said yes to Jesus" value={String(stats.responded)} highlight />
          </div>
          {stats.reproducing > 0 && (
            <p className="mt-4 text-sm text-flame-300 italic">
              ★ {stats.reproducing} {stats.reproducing === 1 ? "person you've discipled is" : "people you've discipled are"}{" "}
              now discipling others. The Kingdom is multiplying.
            </p>
          )}
        </section>
      )}

      {/* Add new */}
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7">
        <div className="text-xs uppercase tracking-widest text-flame-700">Add someone</div>
        <h3 className="font-serif text-xl text-ink-900 mt-1">Who are you praying for, witnessing to, or walking with?</h3>
        <div className="mt-4 grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-ink-500">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="A first name is enough"
              className="mt-1 w-full rounded-xl border border-ink-200 bg-card px-3 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              maxLength={40}
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-ink-500">City (optional)</span>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="So you remember"
              className="mt-1 w-full rounded-xl border border-ink-200 bg-card px-3 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              maxLength={50}
            />
          </label>
          <button
            onClick={addDisciple}
            disabled={!name.trim()}
            className="inline-flex items-center justify-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to journey
          </button>
        </div>
      </section>

      {/* People list */}
      {disciples.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-300 bg-card-subtle p-8 text-center">
          <div className="text-4xl">🌱</div>
          <h3 className="mt-3 font-serif text-xl text-ink-900">Begin with one name.</h3>
          <p className="mt-2 text-sm text-ink-600 max-w-md mx-auto leading-relaxed">
            The Christian life is not a numbers game — it is a faithful walk with the people the
            Lord has put around you. Start by adding one person and keep walking.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {disciples.map((d) => {
            const stageMeta = STAGES.find((s) => s.id === d.stage)!;
            const isOpen = openId === d.id;
            return (
              <li key={d.id} className="rounded-2xl border border-ink-200 bg-card">
                <button
                  onClick={() => setOpenId(isOpen ? null : d.id)}
                  className="w-full text-left p-5 flex flex-wrap items-baseline justify-between gap-3"
                  aria-expanded={isOpen}
                >
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-serif text-xl text-ink-900">{d.name}</h3>
                      {d.city && <span className="text-xs text-ink-500">· {d.city}</span>}
                    </div>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 border border-ink-200 px-2.5 py-0.5 text-xs">
                        <span aria-hidden>{stageMeta.emoji}</span>
                        {stageMeta.label}
                      </span>
                      <span className="text-xs text-ink-500">
                        {d.events.length} event{d.events.length === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                  <span className="text-flame-700 font-serif text-xl shrink-0">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-ink-100 p-5 space-y-5">
                    {/* Stage selector */}
                    <div>
                      <div className="text-xs uppercase tracking-widest text-flame-700 mb-2">
                        Stage on the journey
                      </div>
                      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {STAGES.map((s) => {
                          const active = s.id === d.stage;
                          return (
                            <li key={s.id}>
                              <button
                                onClick={() => setStage(d, s.id)}
                                className={`w-full text-left rounded-xl border p-3 transition-colors text-sm ${
                                  active
                                    ? "bg-ink-900 text-ink-50 border-ink-900"
                                    : "bg-card text-ink-900 border-ink-200 hover:border-flame-500"
                                }`}
                              >
                                <div className="font-medium">
                                  <span className="mr-1.5" aria-hidden>{s.emoji}</span>
                                  {s.label}
                                </div>
                                <div className={`text-xs mt-0.5 ${active ? "text-ink-300" : "text-ink-500"}`}>
                                  {s.blurb}
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </div>

                    {/* Log an event */}
                    <div>
                      <div className="text-xs uppercase tracking-widest text-flame-700 mb-2">
                        Log what happened today
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {EVENT_TYPES.map((e) => (
                          <button
                            key={e.id}
                            onClick={() => logEvent(d, e.id)}
                            className="rounded-full bg-card border border-ink-200 px-3 py-1.5 text-xs text-ink-800 hover:border-flame-500 transition-colors"
                          >
                            + {e.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* History */}
                    {d.events.length > 0 && (
                      <div>
                        <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">
                          Journey log
                        </div>
                        <ul className="space-y-1.5 text-sm">
                          {d.events.slice(0, 12).map((e) => {
                            const meta = EVENT_TYPES.find((x) => x.id === e.type);
                            return (
                              <li key={e.id} className="flex gap-3 text-ink-700">
                                <span className="text-xs text-ink-400 shrink-0 w-24">
                                  {new Date(e.date).toLocaleDateString()}
                                </span>
                                <span>{meta?.label ?? e.type}</span>
                                {e.note && <span className="italic text-ink-500">— {e.note}</span>}
                              </li>
                            );
                          })}
                        </ul>
                        {d.events.length > 12 && (
                          <p className="text-xs text-ink-500 mt-2">
                            …{d.events.length - 12} earlier event{d.events.length - 12 === 1 ? "" : "s"}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="pt-3 border-t border-ink-100 flex justify-end">
                      <button
                        onClick={() => removeDisciple(d)}
                        className="text-xs text-ink-400 hover:text-red-600"
                      >
                        Remove from journey
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-xs text-ink-500 leading-relaxed">
        Your journey lives only on this device. We never see it, never sync it, never sell it.
        That's the point — pure intercession is a quiet thing between you and the Lord.
      </p>
    </div>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-2xl bg-ink-800 border border-ink-700 p-3">
      <div className="text-[10px] uppercase tracking-widest text-flame-300">{label}</div>
      <div className={`font-serif text-2xl mt-0.5 ${highlight ? "text-flame-300" : "text-ink-50"}`}>{value}</div>
    </div>
  );
}
