"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { worldPrayer, todaysRegionIndex } from "@/data/prayers";
import { prayerLocales } from "@/data/prayers-i18n";
import { locales, localeOrder, type LocaleCode } from "@/data/gospel-i18n";
import { todaysNation, regions as nationRegions, rotationDay } from "@/data/nations";
import { flagEmoji } from "@/lib/flags";
import NationFlag from "@/components/NationFlag";

type Mode = "lords" | "acts" | "world" | "nations";

const STORAGE = "scripture-theory-locale";

export default function PrayerGuide() {
  const [mode, setMode] = useState<Mode>("lords");
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE) as LocaleCode | null;
      if (saved && prayerLocales[saved]) setLocale(saved);
    } catch {}
    setMounted(true);
  }, []);

  function pickLocale(code: LocaleCode) {
    setLocale(code);
    try {
      window.localStorage.setItem(STORAGE, code);
    } catch {}
  }

  const t = prayerLocales[locale];
  const dir = locales[locale].meta.dir;

  return (
    <div className="space-y-8" dir={dir} suppressHydrationWarning>
      <header className={dir === "rtl" ? "text-right" : ""} lang={mounted ? locale : "en"}>
        <span className="text-xs uppercase tracking-widest text-flame-700">{t.pageEyebrow}</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
          {t.pageTitle}
        </h1>
        <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">{t.pageIntro}</p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-ink-400 mr-1">Language</span>
        {localeOrder.map((code) => {
          const active = code === locale;
          const item = locales[code];
          return (
            <button
              key={code}
              onClick={() => pickLocale(code)}
              className={`rounded-full px-3 py-1 text-sm border transition-colors ${
                active
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
              }`}
              aria-pressed={active}
            >
              {item.meta.nativeName}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <ModeButton current={mode} value="lords" onClick={setMode}>
          {t.modes.lords}
        </ModeButton>
        <ModeButton current={mode} value="acts" onClick={setMode}>
          {t.modes.acts}
        </ModeButton>
        <ModeButton current={mode} value="nations" onClick={setMode}>
          Pray for the nations
        </ModeButton>
        <Link
          href="/pray/live"
          className="rounded-full px-4 py-2 text-sm border bg-flame-600 text-white border-flame-600 hover:bg-flame-700 inline-flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          Pray for the world · live
        </Link>
        <ModeButton current={mode} value="world" onClick={setMode}>
          {t.modes.world}
        </ModeButton>
      </div>

      {mode === "lords" && <LordsPrayerView t={t} dir={dir} locale={locale} />}
      {mode === "acts" && <ActsView t={t} dir={dir} />}
      {mode === "nations" && <NationsTeaser />}
      {mode === "world" && <WorldView />}

      <div className="rounded-3xl bg-ink-900 text-ink-50 p-8 text-center" dir={dir}>
        <p className="font-serif text-2xl">"{t.closing.quote}"</p>
        <p className="mt-2 text-ink-300">{t.closing.ref}</p>
      </div>
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
          : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
      }`}
    >
      {children}
    </button>
  );
}

function LordsPrayerView({
  t,
  dir,
  locale,
}: {
  t: ReturnType<typeof useT>;
  dir: "ltr" | "rtl";
  locale: LocaleCode;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-ink-900 text-ink-50 p-6">
        <div className="text-xs uppercase tracking-widest text-flame-300">
          {t.lords.headingScriptureRef}
        </div>
        <p className="font-serif text-xl md:text-2xl mt-2 leading-relaxed">
          {t.lords.headingScripture}
        </p>
        <p className="mt-2 text-sm text-ink-200">{t.lords.headingTagline}</p>
      </div>

      <ol className="space-y-3" lang={locale}>
        {t.lords.lines.map((l, i) => (
          <li
            key={i}
            className="rounded-2xl border border-ink-200 bg-card p-5 md:p-6 glow-ring"
          >
            <div className={`flex items-baseline gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <span className="font-serif text-flame-700 text-2xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={dir === "rtl" ? "text-right" : ""}>
                <p className="font-serif text-xl text-ink-900">{l.phrase}</p>
                <p className="mt-2 text-ink-700 leading-relaxed">{l.meditation}</p>
                <p className="mt-3 text-sm text-flame-700">
                  <span className="uppercase tracking-widest text-xs text-flame-700 mr-2">
                    {t.lords.prayNowLabel}
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

function ActsView({ t, dir }: { t: ReturnType<typeof useT>; dir: "ltr" | "rtl" }) {
  return (
    <div className="space-y-4">
      <p className="text-ink-700 leading-relaxed max-w-2xl">{t.acts.intro}</p>
      <ol className="grid md:grid-cols-2 gap-4">
        {t.acts.movements.map((m, i) => (
          <li key={i} className="rounded-2xl border border-ink-200 bg-card p-6 glow-ring">
            <div className={`flex items-baseline gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <span className="font-serif text-flame-700 text-4xl leading-none">{m.letter}</span>
              <h3 className="font-serif text-2xl text-ink-900">{m.word}</h3>
            </div>
            <p className="mt-3 text-ink-700 leading-relaxed">{m.body}</p>
            <blockquote
              className={`mt-4 prose-scripture text-ink-800 ${
                dir === "rtl" ? "border-r-4 border-flame-300 pr-4" : "border-l-4 border-flame-300 pl-4"
              }`}
            >
              <p>"{m.scripture}"</p>
              <footer className="text-xs text-ink-500 mt-1 not-italic">— {m.reference}</footer>
            </blockquote>
          </li>
        ))}
      </ol>
    </div>
  );
}

function NationsTeaser() {
  const today = todaysNation();
  const day = rotationDay();
  return (
    <div className="space-y-5" dir="ltr">
      <div className="rounded-3xl overflow-hidden border border-ink-200 bg-card glow-ring">
        <div className="relative aspect-[16/7] bg-ink-800 overflow-hidden">
          <NationFlag
            iso={today.iso}
            alt={`Flag of ${today.name}`}
            width={640}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/10 to-ink-900/80" />
          <div className="absolute top-4 left-5">
            <span className="text-[10px] uppercase tracking-widest text-flame-300">
              Day {day} · Praying for the Nations
            </span>
          </div>
          <div className="absolute bottom-4 left-5 right-5 flex items-end gap-3">
            <span className="text-4xl leading-none" aria-hidden>
              {flagEmoji(today.iso)}
            </span>
            <div>
              <div className="font-serif text-2xl md:text-3xl text-ink-50 leading-none">
                {today.name}
              </div>
              <div className="text-xs text-ink-300 mt-1">{nationRegions[today.region]}</div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-ink-700 leading-relaxed text-sm">{today.context}</p>
          <ul className="mt-4 space-y-2">
            {today.prayer.slice(0, 2).map((p, i) => (
              <li key={i} className="flex gap-3 text-ink-800 text-sm leading-relaxed">
                <span className="font-serif text-flame-700">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/pray/nations"
            className="mt-5 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Open today's full intercession →
          </Link>
        </div>
      </div>
      <p className="text-xs text-ink-500 leading-relaxed">
        Every day one specific country is lifted up. Tomorrow another. The rotation covers every
        region of the world. Like the verse of the day — but for the nations.
      </p>
    </div>
  );
}

function WorldView() {
  const today = worldPrayer[todaysRegionIndex()];
  return (
    <div dir="ltr" className="space-y-6">
      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
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
        <p className="mt-5 text-xs text-ink-500">
          Pray-for-the-world is currently in English only — regional translations arrive with the
          Q2 daily-rhythm release.
        </p>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-ink-500 mb-3">
          All eight regions — pray through one each day
        </div>
        <ul className="grid md:grid-cols-2 gap-3">
          {worldPrayer.map((r) => (
            <li key={r.region} className="rounded-2xl border border-ink-200 bg-ink-50 p-4">
              <div className="font-serif text-ink-900">{r.region}</div>
              <div className="text-xs text-ink-500 italic mt-0.5">{r.focus}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// helper type aliasing to keep the component signatures clean
function useT() {
  return prayerLocales.en;
}
