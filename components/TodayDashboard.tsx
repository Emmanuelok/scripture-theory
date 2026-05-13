"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile, stageInfo } from "@/lib/profile";
import { readingPlans } from "@/data/readings";
import { worldPrayer, todaysRegionIndex } from "@/data/prayers";
import { prayerLocales } from "@/data/prayers-i18n";
import { locales, type LocaleCode } from "@/data/gospel-i18n";

const PLAN_PROGRESS_KEY = "scripture-theory-progress";

type Progress = Record<string, number[]>;

function dayOfYear(d: Date) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const here = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.floor((here - start) / 86400000);
}

function greeting(now: Date, locale: LocaleCode) {
  const h = now.getHours();
  if (locale === "es") return h < 12 ? "Buenos días" : h < 18 ? "Buenas tardes" : "Buenas noches";
  if (locale === "pt") return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
  if (locale === "fr") return h < 12 ? "Bonjour" : h < 18 ? "Bon après-midi" : "Bonsoir";
  if (locale === "sw") return h < 12 ? "Habari ya asubuhi" : h < 18 ? "Habari ya mchana" : "Habari ya jioni";
  if (locale === "hi") return h < 12 ? "शुभ प्रभात" : h < 18 ? "शुभ दिन" : "शुभ संध्या";
  if (locale === "ar") return h < 12 ? "صباح الخير" : h < 18 ? "نهارك سعيد" : "مساء الخير";
  if (locale === "zh") return h < 12 ? "早安" : h < 18 ? "午安" : "晚安";
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export default function TodayDashboard() {
  const { profile, update, reset, mounted } = useProfile();
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(PLAN_PROGRESS_KEY);
      setProgress(raw ? JSON.parse(raw) : {});
    } catch {}
  }, []);

  const locale = (profile.locale ?? "en") as LocaleCode;
  const dir = locales[locale].meta.dir;
  const stage = profile.stage;
  const now = useMemo(() => new Date(), []);

  // Active reading plan = the one with the most progress; else first
  const activePlan = useMemo(() => {
    const plansWithProgress = readingPlans
      .map((p) => ({ plan: p, done: progress[p.id]?.length ?? 0 }))
      .sort((a, b) => b.done - a.done);
    return plansWithProgress[0]?.plan ?? readingPlans[0];
  }, [progress]);

  const activeDone = progress[activePlan.id] ?? [];
  const nextReading =
    activePlan.days.find((d) => !activeDone.includes(d.day)) ??
    activePlan.days[activePlan.days.length - 1];

  // Today's Lord's Prayer line, rotated by day
  const prayerLine = useMemo(() => {
    const lines = prayerLocales[locale].lords.lines;
    return lines[dayOfYear(now) % lines.length];
  }, [locale, now]);

  // Today's region of the world
  const region = worldPrayer[todaysRegionIndex()];

  // Today's curated next step, based on stage
  const nextStep = useMemo(() => {
    if (!stage) {
      return {
        label: "Tell us where you are with Jesus — it takes 30 seconds.",
        cta: "Begin Start",
        href: "/start",
      };
    }
    switch (stage) {
      case "seeker":
        return {
          label: "Read the four movements of the Gospel and meet Jesus today.",
          cta: "Open the Gospel",
          href: "/gospel",
        };
      case "new":
        return {
          label: "Open today's reading from John, and tell one believer you said yes to Jesus.",
          cta: "Open today's chapter",
          href: "/read",
        };
      case "growing":
        return {
          label: "Pray for one person who doesn't yet know Jesus, then read today's chapter.",
          cta: "Open Witness",
          href: "/witness",
        };
      case "leader":
        return {
          label: "Open The Path and identify one person you can disciple this quarter.",
          cta: "Open The Path",
          href: "/disciple",
        };
      case "pastor":
        return {
          label: "Claim your church so newcomers in your city can be introduced to you.",
          cta: "Claim your church",
          href: "/connect/claim",
        };
    }
  }, [stage]);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-8 glow-ring text-ink-500">
        Loading your rhythm…
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={dir}>
      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-300">
              {greeting(now, locale)} {profile.stage && `· ${stageInfo[profile.stage].label}`}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl mt-1">
              {now.toLocaleDateString(locale === "en" ? undefined : locale, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h1>
          </div>
          <div className="text-xs text-ink-300 max-w-xs">
            Your rhythm lives on this device only. Three small steps a day are better than ten you
            never take.
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Mini
            label="Active plan"
            value={activePlan.name}
            sub={`${activeDone.length} of ${activePlan.totalDays} days read`}
          />
          <Mini label="Language" value={locales[locale].meta.nativeName} sub={locales[locale].meta.languageName} />
          <Mini
            label="Today's region of the world"
            value={region.region}
            sub={region.focus}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-700">Today's next step</div>
        <p className="mt-2 font-serif text-2xl md:text-3xl text-ink-900 leading-snug">
          {nextStep.label}
        </p>
        <Link
          href={nextStep.href}
          className="mt-5 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700"
        >
          {nextStep.cta} →
        </Link>
      </section>

      <div className="grid md:grid-cols-2 gap-5">
        <section className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8" lang={locale}>
          <div className="text-xs uppercase tracking-widest text-flame-700">Today's Word</div>
          <h2 className="font-serif text-2xl text-ink-900 mt-1">
            {activePlan.name} · Day {nextReading.day}
          </h2>
          <div className="text-sm text-ink-500 mt-0.5">{nextReading.reference}</div>
          <p className="mt-3 font-serif text-lg text-ink-900">{nextReading.title}</p>
          <p className="mt-2 text-ink-700 leading-relaxed text-sm">{nextReading.meditation}</p>
          <Link
            href="/read"
            className="mt-4 inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
          >
            Open the reading
          </Link>
        </section>

        <section
          className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8"
          lang={locale}
          dir={dir}
        >
          <div className="text-xs uppercase tracking-widest text-flame-700">
            Today's prayer line
          </div>
          <p className="mt-2 font-serif text-xl text-ink-900 leading-snug">{prayerLine.phrase}</p>
          <p className="mt-2 text-ink-700 leading-relaxed text-sm">{prayerLine.meditation}</p>
          <p className="mt-3 text-sm text-flame-700 leading-relaxed">
            <span className="uppercase tracking-widest text-xs mr-2">
              {prayerLocales[locale].lords.prayNowLabel}
            </span>
            {prayerLine.prompt}
          </p>
          <Link
            href="/pray"
            className="mt-4 inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
          >
            Walk the whole prayer
          </Link>
        </section>
      </div>

      <section className="rounded-3xl border border-flame-200 bg-flame-50/60 p-6 md:p-8" dir="ltr">
        <div className="text-xs uppercase tracking-widest text-flame-700">
          Pray for the world today
        </div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">{region.region}</h2>
        <p className="text-ink-500 italic mt-0.5 text-sm">{region.focus}</p>
        <ul className="mt-4 space-y-2">
          {region.pray.map((p) => (
            <li key={p} className="flex gap-3 text-ink-800 text-sm leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-flame-500 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm text-ink-600">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <strong className="text-ink-900">Personalize again.</strong> Change your stage,
            language, or starting point anytime.
          </div>
          <div className="flex gap-3">
            <Link href="/start" className="text-flame-700 hover:underline">
              Edit my answers
            </Link>
            <button
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.confirm("Clear your saved stage, locale, and need? Reading progress is kept.")
                ) {
                  reset();
                  update({});
                }
              }}
              className="text-ink-500 hover:text-ink-900"
            >
              Clear my profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Mini({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-ink-800 border border-ink-700 p-4">
      <div className="text-[10px] uppercase tracking-widest text-flame-300">{label}</div>
      <div className="font-serif text-lg text-ink-50 mt-1">{value}</div>
      <div className="text-xs text-ink-300 mt-0.5">{sub}</div>
    </div>
  );
}
