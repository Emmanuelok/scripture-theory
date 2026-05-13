"use client";

import { useMemo, useState } from "react";
import { apologetics, topicInfo, apologeticsPosture, type Topic } from "@/data/apologetics";

export default function ApologeticsView() {
  const [filter, setFilter] = useState<Topic | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = filter === "all" ? apologetics : apologetics.filter((a) => a.topic === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (a) =>
          a.question.toLowerCase().includes(s) ||
          a.oneLine.toLowerCase().includes(s) ||
          a.answer.some((p) => p.toLowerCase().includes(s))
      );
    }
    return list;
  }, [filter, q]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">{apologeticsPosture.title}</h2>
        {apologeticsPosture.body.map((p, i) => (
          <p key={i} className="mt-3 text-ink-700 leading-relaxed">{p}</p>
        ))}
      </section>

      <section>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a question, a topic, an objection…"
          className="w-full rounded-2xl border border-ink-300 bg-card px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-flame-500"
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Pill active={filter === "all"} onClick={() => setFilter("all")}>
            All ({apologetics.length})
          </Pill>
          {(Object.entries(topicInfo) as [Topic, typeof topicInfo.god][]).map(([id, info]) => (
            <Pill key={id} active={filter === id} onClick={() => setFilter(id)}>
              {info.label}
            </Pill>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {filtered.map((a) => (
          <details
            key={a.id}
            open={open === a.id}
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) setOpen(a.id);
              else if (open === a.id) setOpen(null);
            }}
            className="rounded-2xl border border-ink-200 bg-card p-5 open:border-flame-500"
          >
            <summary className="cursor-pointer list-none">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                {topicInfo[a.topic].label}
              </div>
              <div className="font-serif text-lg text-ink-900 mt-1">{a.question}</div>
              <p className="text-sm text-ink-600 mt-2 italic">{a.oneLine}</p>
            </summary>
            <div className="mt-5 space-y-3 text-ink-800 leading-relaxed">
              {a.answer.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="mt-3 pt-3 border-t border-ink-200">
                <div className="text-[10px] uppercase tracking-widest text-flame-700">Scripture</div>
                <p className="text-sm text-ink-700 mt-1">{a.scripture.join(" · ")}</p>
              </div>
            </div>
          </details>
        ))}
        {filtered.length === 0 && (
          <p className="text-ink-500 text-sm">
            Nothing matches. Try a different word or clear the filter.
          </p>
        )}
      </section>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs ${
        active
          ? "bg-flame-600 text-ink-50"
          : "border border-ink-300 text-ink-700 hover:border-ink-900"
      }`}
    >
      {children}
    </button>
  );
}
