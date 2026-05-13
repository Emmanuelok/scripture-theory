"use client";

import { useMemo, useState } from "react";
import {
  nations,
  regions,
  todaysNation,
  nationsByRegion,
  type Nation,
  type Region,
} from "@/data/nations";

const ALL_REGIONS = Object.keys(regions) as Region[];

export default function NationsView() {
  const today = todaysNation();
  const [openIso, setOpenIso] = useState<string>(today.iso);
  const [filter, setFilter] = useState<Region | "all">("all");
  const [q, setQ] = useState("");

  const grouped = useMemo(() => nationsByRegion(), []);

  const list = useMemo(() => {
    let xs: Nation[] = filter === "all" ? nations : grouped[filter];
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      xs = xs.filter(
        (n) =>
          n.name.toLowerCase().includes(needle) ||
          n.context.toLowerCase().includes(needle) ||
          n.iso.toLowerCase() === needle ||
          (n.nativeName ?? "").toLowerCase().includes(needle)
      );
    }
    return xs;
  }, [filter, q, grouped]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-9 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-300">Today's nation</div>
        <h2 className="font-serif text-3xl md:text-5xl mt-2 leading-tight">{today.name}</h2>
        <div className="text-sm text-ink-300 mt-1">{regions[today.region]}</div>
        <p className="mt-4 text-ink-200 leading-relaxed">{today.context}</p>

        <div className="mt-6">
          <div className="text-xs uppercase tracking-widest text-flame-300">Pray today</div>
          <ul className="mt-3 space-y-2">
            {today.prayer.map((p, i) => (
              <li key={i} className="flex gap-3 text-ink-100 leading-relaxed">
                <span className="font-serif text-flame-300 mt-0.5">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="mt-6 border-l-4 border-flame-300 pl-4 prose-scripture text-ink-100">
          <p>"{today.verse.text}"</p>
          <footer className="text-xs text-ink-300 mt-1 not-italic">— {today.verse.ref}</footer>
        </blockquote>
      </section>

      <section className="rounded-3xl border border-ink-200 bg-white p-5 md:p-6 glow-ring">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Search a country, region, or concern…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 min-w-[200px] rounded-xl border border-ink-200 bg-ink-50 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
          />
          <span className="text-xs text-ink-500">
            {list.length} of {nations.length}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            All regions
          </FilterButton>
          {ALL_REGIONS.map((r) => (
            <FilterButton key={r} active={filter === r} onClick={() => setFilter(r)}>
              {regions[r]}{" "}
              <span className="opacity-60">({grouped[r].length})</span>
            </FilterButton>
          ))}
        </div>
      </section>

      <ul className="space-y-3">
        {list.map((n) => {
          const isOpen = openIso === n.iso;
          const isToday = n.iso === today.iso;
          return (
            <li
              key={n.iso}
              className={`rounded-2xl border bg-white transition-colors ${
                isToday ? "border-flame-400" : "border-ink-200"
              }`}
            >
              <button
                onClick={() => setOpenIso(isOpen ? "" : n.iso)}
                className="w-full text-left p-5 flex flex-wrap items-baseline justify-between gap-3"
                aria-expanded={isOpen}
              >
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-serif text-xl text-ink-900">{n.name}</span>
                    {isToday && (
                      <span className="rounded-full bg-flame-100 text-flame-900 text-[10px] uppercase tracking-widest px-2 py-0.5">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-ink-500 mt-0.5">{regions[n.region]}</div>
                </div>
                <span className="text-flame-700 font-serif text-xl">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="border-t border-ink-100 p-5 space-y-4">
                  <p className="text-ink-700 leading-relaxed text-sm">{n.context}</p>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-flame-700">
                      Pray for {n.name}
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {n.prayer.map((p, i) => (
                        <li key={i} className="flex gap-3 text-ink-800 text-sm leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-flame-500 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <blockquote className="rounded-xl bg-ink-50 border border-ink-100 p-4 text-sm prose-scripture text-ink-800">
                    <p>"{n.verse.text}"</p>
                    <footer className="text-xs text-ink-500 mt-1 not-italic">— {n.verse.ref}</footer>
                  </blockquote>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FilterButton({
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
      className={`rounded-full px-3 py-1 text-xs border transition-colors ${
        active
          ? "bg-ink-900 text-ink-50 border-ink-900"
          : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
      }`}
    >
      {children}
    </button>
  );
}
