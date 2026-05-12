"use client";

import { useState } from "react";
import { lordsPrayer, acts, worldPrayer, todaysRegionIndex } from "@/data/prayers";

type Mode = "lords" | "acts" | "world";

export default function PrayerGuide() {
  const [mode, setMode] = useState<Mode>("lords");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <ModeButton current={mode} value="lords" onClick={setMode}>
          The Lord's Prayer
        </ModeButton>
        <ModeButton current={mode} value="acts" onClick={setMode}>
          A · C · T · S
        </ModeButton>
        <ModeButton current={mode} value="world" onClick={setMode}>
          Pray for the world
        </ModeButton>
      </div>

      {mode === "lords" && <LordsPrayerView />}
      {mode === "acts" && <ActsView />}
      {mode === "world" && <WorldView />}
    </div>
  );
}

function ModeButton({
  current,
  value,
  onClick,
  children,
}: {
  current: Mode;
  value: Mode;
  onClick: (v: Mode) => void;
  children: React.ReactNode;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-full px-4 py-2 text-sm border transition-colors ${
        active
          ? "bg-ink-900 text-ink-50 border-ink-900"
          : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
      }`}
    >
      {children}
    </button>
  );
}

function LordsPrayerView() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-ink-900 text-ink-50 p-6">
        <div className="text-xs uppercase tracking-widest text-flame-300">Matthew 6:9–13</div>
        <p className="font-serif text-xl md:text-2xl mt-2 leading-relaxed">
          "Pray then like this..." — Jesus
        </p>
        <p className="mt-2 text-sm text-ink-200">
          He didn't just tell us to pray. He taught us how. Walk through it slowly, one line at a
          time — and let it become your own.
        </p>
      </div>

      <ol className="space-y-3">
        {lordsPrayer.map((l, i) => (
          <li
            key={i}
            className="rounded-2xl border border-ink-200 bg-white p-5 md:p-6 glow-ring"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-flame-700 text-2xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-serif text-xl text-ink-900">{l.phrase}</p>
                <p className="mt-2 text-ink-700 leading-relaxed">{l.meditation}</p>
                <p className="mt-3 text-sm text-flame-700">
                  <span className="uppercase tracking-widest text-xs text-flame-700 mr-2">
                    Pray now:
                  </span>
                  {l.prompt}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ActsView() {
  return (
    <div className="space-y-4">
      <p className="text-ink-700 leading-relaxed max-w-2xl">
        A simple, ancient pattern that helps anyone pray with shape: <strong>A</strong>doration,{" "}
        <strong>C</strong>onfession, <strong>T</strong>hanksgiving, <strong>S</strong>upplication.
      </p>
      <ol className="grid md:grid-cols-2 gap-4">
        {acts.map((m) => (
          <li key={m.letter} className="rounded-2xl border border-ink-200 bg-white p-6 glow-ring">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-flame-700 text-4xl leading-none">{m.letter}</span>
              <h3 className="font-serif text-2xl text-ink-900">{m.word}</h3>
            </div>
            <p className="mt-3 text-ink-700 leading-relaxed">{m.body}</p>
            <blockquote className="mt-4 border-l-4 border-flame-300 pl-4 prose-scripture text-ink-800">
              <p>"{m.scripture}"</p>
              <footer className="text-xs text-ink-500 mt-1 not-italic">— {m.reference}</footer>
            </blockquote>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WorldView() {
  const today = worldPrayer[todaysRegionIndex()];
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-700">Today's focus</div>
        <h3 className="font-serif text-3xl text-ink-900 mt-1">{today.region}</h3>
        <p className="text-ink-500 italic mt-1">{today.focus}</p>
        <ul className="mt-5 space-y-3">
          {today.pray.map((p) => (
            <li key={p} className="flex gap-3 text-ink-800 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-flame-500 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-ink-500 mb-3">
          All eight regions — pray through one each day
        </div>
        <ul className="grid md:grid-cols-2 gap-3">
          {worldPrayer.map((r) => (
            <li
              key={r.region}
              className="rounded-2xl border border-ink-200 bg-ink-50 p-4"
            >
              <div className="font-serif text-ink-900">{r.region}</div>
              <div className="text-xs text-ink-500 italic mt-0.5">{r.focus}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
