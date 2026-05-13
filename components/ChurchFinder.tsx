"use client";

import { useMemo, useState } from "react";
import {
  churches,
  cities,
  filterChurches,
  traditionLabels,
  type ChurchTradition,
  type CityId,
} from "@/data/churches";

const allLanguages = Array.from(
  new Set(churches.flatMap((c) => c.languages))
).sort();

export default function ChurchFinder() {
  const [city, setCity] = useState<CityId | "all">("all");
  const [tradition, setTradition] = useState<ChurchTradition | "all">("all");
  const [language, setLanguage] = useState<string>("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(
    () => filterChurches({ city, tradition, language, q }),
    [city, tradition, language, q]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-card p-5 md:p-6 glow-ring">
        <label className="text-xs uppercase tracking-widest text-ink-400">Search</label>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Neighborhood, language, tradition…"
          className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
        />

        <div className="mt-5 grid sm:grid-cols-3 gap-4">
          <Select
            label="City"
            value={city}
            onChange={(v) => setCity(v as CityId | "all")}
            options={[
              ["all", "All five pilot cities"],
              ...(Object.entries(cities).map(([id, c]) => [id, `${c.label}, ${c.country}`]) as [string, string][]),
            ]}
          />
          <Select
            label="Tradition"
            value={tradition}
            onChange={(v) => setTradition(v as ChurchTradition | "all")}
            options={[
              ["all", "All traditions"],
              ...(Object.entries(traditionLabels) as [string, string][]),
            ]}
          />
          <Select
            label="Language"
            value={language}
            onChange={(v) => setLanguage(v)}
            options={[
              ["all", "Any language"],
              ...allLanguages.map((l) => [l, l] as [string, string]),
            ]}
          />
        </div>
      </div>

      <div className="flex items-baseline justify-between text-sm text-ink-600">
        <div>
          <strong className="text-ink-900">{results.length}</strong> of {churches.length}{" "}
          {results.length === 1 ? "church" : "churches"} match — across {Object.keys(cities).length}{" "}
          pilot cities.
        </div>
        {(city !== "all" || tradition !== "all" || language !== "all" || q) && (
          <button
            onClick={() => {
              setCity("all");
              setTradition("all");
              setLanguage("all");
              setQ("");
            }}
            className="text-flame-700 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-ink-50 p-8 text-center text-ink-600">
          No church matches those filters yet. We are expanding to 25 cities by month 12 — the next
          one may be yours.
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {results.map((c) => {
            const isOpen = openId === c.id;
            return (
              <li
                key={c.id}
                className="rounded-2xl border border-ink-200 bg-card p-5 flex flex-col"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg text-ink-900">{c.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-flame-700">
                    {traditionLabels[c.tradition]}
                  </span>
                </div>
                <div className="text-xs text-ink-500 mt-0.5">
                  {c.neighborhood} · {cities[c.city].label}, {cities[c.city].country}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.languages.map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-ink-50 border border-ink-200 px-2 py-0.5 text-[11px] text-ink-600"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">{c.discipleship}</p>

                <button
                  onClick={() => setOpenId(isOpen ? null : c.id)}
                  className="mt-4 inline-flex items-center self-start rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Hide intro" : "Request a warm intro →"}
                </button>

                {isOpen && (
                  <div className="mt-4 rounded-xl border border-flame-200 bg-flame-50/60 p-4 text-sm">
                    <div className="text-xs uppercase tracking-widest text-flame-700">
                      The warm intro
                    </div>
                    <p className="mt-1.5 text-ink-800 leading-relaxed">{c.pastorIntro}</p>
                    <p className="mt-3 text-xs text-ink-500 leading-relaxed">
                      In the live version of One Body, this button will send a brief, you-controlled
                      message to a vetted local pastor (or a delegate from the welcome team) with
                      your name and how you'd like to be contacted. During the Q3 pilot we are
                      hand-introducing each disciple ourselves.
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-ink-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:outline-none focus:ring-2 focus:ring-flame-300"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
