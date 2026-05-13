"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile, stageInfo } from "@/lib/profile";
import { readingPlans } from "@/data/readings";
import { localizedPlan, localizedDay } from "@/data/readings-i18n";
import { prayerLocales } from "@/data/prayers-i18n";
import { locales, type LocaleCode } from "@/data/gospel-i18n";
import { seed as bibleSeed } from "@/data/bible/seed";
import { translations as transMeta } from "@/data/bible/translations";
import { canon as bibleCanon } from "@/data/bible/canon";
import { referenceHref } from "@/lib/reference";
import { todaysNation, regions as nationRegions, rotationCycleDay, findNation } from "@/data/nations";
import { flagEmoji } from "@/lib/flags";
import NationFlag from "@/components/NationFlag";
import { thisWeeksVerse } from "@/data/memory";
import PrayingForList from "@/components/PrayingForList";
import EncourageMe from "@/components/EncourageMe";
import DailyDevotional from "@/components/DailyDevotional";

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
  const localizedNext = localizedDay(locale as LocaleCode, activePlan.id, nextReading.day);
  const nextRef = localizedNext?.reference ?? nextReading.reference;
  const nextTitle = localizedNext?.title ?? nextReading.title;
  const nextMed = localizedNext?.meditation ?? nextReading.meditation;
  const activePlanLocalName = localizedPlan(locale as LocaleCode, activePlan.id)?.name ?? activePlan.name;

  // Today's Lord's Prayer line, rotated by day
  const prayerLine = useMemo(() => {
    const lines = prayerLocales[locale].lords.lines;
    return lines[dayOfYear(now) % lines.length];
  }, [locale, now]);

  // Today's nation in the rotation (specific country)
  const nation = todaysNation(now);
  const nationDay = rotationCycleDay(now);
  const adopted = profile.adoptedNationIso ? findNation(profile.adoptedNationIso) : undefined;
  // This week's memory verse
  const memoryVerse = thisWeeksVerse(now);
  const memoryRecord = profile.memory?.find((r) => r.verseId === memoryVerse.id);

  // Today's verse — rotated daily from the WEB seed (authentic public-domain text).
  const dailyVerse = useMemo(() => {
    const webChapters = bibleSeed.filter((c) => c.translation === "WEB");
    if (webChapters.length === 0) return null;
    // Flatten to (book, chapter, verse) tuples and pick one by day-of-year.
    const tuples: { book: string; chapter: number; v: number; t: string }[] = [];
    for (const c of webChapters) {
      for (const v of c.verses) tuples.push({ book: c.book, chapter: c.chapter, v: v.v, t: v.t });
    }
    const pick = tuples[dayOfYear(now) % tuples.length];
    const bookMeta = bibleCanon.find((b) => b.id === pick.book);
    return {
      ...pick,
      bookName: bookMeta?.name ?? pick.book,
    };
  }, [now]);

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
      <div className="rounded-3xl border border-ink-200 bg-card p-8 glow-ring text-ink-500">
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
              {greeting(now, locale)}
              {profile.name ? `, ${profile.name}` : ""}
              {profile.stage && ` · ${stageInfo[profile.stage].label}`}
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
            value={activePlanLocalName}
            sub={`${activeDone.length} of ${activePlan.totalDays} days read`}
          />
          <Mini label="Language" value={locales[locale].meta.nativeName} sub={locales[locale].meta.languageName} />
          <Mini
            label="Today's nation"
            value={`${flagEmoji(nation.iso)} ${nation.name}`}
            sub={nationRegions[nation.region]}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
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

      {dailyVerse && (
        <section className="rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8 glow-ring">
          <div className="text-xs uppercase tracking-widest text-flame-700">
            Today's verse · {transMeta.WEB.abbrev}
          </div>
          <blockquote className="mt-3 prose-scripture text-ink-900 text-lg md:text-xl">
            "{dailyVerse.t}"
          </blockquote>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <span className="text-sm text-ink-600 italic">
              — {dailyVerse.bookName} {dailyVerse.chapter}:{dailyVerse.v} ({transMeta.WEB.abbrev})
            </span>
            <Link
              href={`/bible/${dailyVerse.book}/${dailyVerse.chapter}#v${dailyVerse.v}`}
              className="text-xs text-flame-700 hover:underline"
            >
              Open in the Bible →
            </Link>
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">
              This week's memory verse
            </div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">{memoryVerse.ref}</h2>
          </div>
          {memoryRecord && (
            <span className="text-xs uppercase tracking-widest text-flame-700">
              {memoryRecord.level === "mastered" ? "Mastered ✓" : `Level: ${memoryRecord.level}`}
            </span>
          )}
        </div>
        <p className="mt-3 prose-scripture text-ink-900">{memoryVerse.text}</p>
        <p className="mt-3 text-xs text-ink-500 italic">{memoryVerse.why}</p>
        <Link
          href="/memory"
          className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
        >
          Practice now →
        </Link>
      </section>

      <DailyDevotional />

      <EncourageMe />

      <PrayingForList />

      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Practices</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">
              Old paths for today.
            </h2>
            <p className="mt-1 text-sm text-ink-600">
              The disciplines that have actually formed believers across history. Pick one tonight.
            </p>
          </div>
          <Link
            href="/practices"
            className="text-xs text-flame-700 hover:underline"
          >
            All practices →
          </Link>
        </div>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <PracticeChip href="/hours" eyebrow="Now" title="The Daily Office" sub="Pray the hour you're in" />
          <PracticeChip href="/examen" eyebrow="5 minutes" title="Daily Examen" sub="End the day with Him" />
          <PracticeChip href="/listen" eyebrow="His voice" title="Listening prayer" sub="Quiet down. Open the Word. Hear." />
          <PracticeChip href="/fast" eyebrow="Matt 6:16" title="Fasting" sub="When, not if." />
          <PracticeChip href="/lament" eyebrow="Psalms" title="Lament" sub="Bring the wound to Him" />
          <PracticeChip href="/forgive" eyebrow="70 × 7" title="Forgiveness walk" sub="Lay down the debt" />
          <PracticeChip href="/heal" eyebrow="James 5" title="Healing prayer" sub="Pray for the sick" />
          <PracticeChip href="/sabbath" eyebrow="Exod 20:8" title="Sabbath" sub="One day in seven" />
          <PracticeChip href="/catechism" eyebrow="1 of 52" title="Catechism" sub="This week's Lord's Day" />
        </div>
      </section>

      <Link
        href="/persecuted"
        className="block rounded-3xl border border-ink-200 bg-card p-6 hover:border-flame-500 transition-colors"
      >
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">
              Hebrews 13:3 · This month
            </div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">Remember the persecuted Church.</h2>
            <p className="mt-2 text-sm text-ink-700 leading-relaxed">
              ~365 million believers face high or extreme pressure for following Jesus. They are
              your family. Pray for them by name.
            </p>
          </div>
          <span className="text-xs text-flame-700 shrink-0">Open →</span>
        </div>
      </Link>

      <div className="grid md:grid-cols-2 gap-5">
        <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8" lang={locale} dir={dir}>
          <div className="text-xs uppercase tracking-widest text-flame-700">Today's Word</div>
          <h2 className="font-serif text-2xl text-ink-900 mt-1">
            {activePlanLocalName} · Day {nextReading.day}
          </h2>
          <div className="text-sm text-ink-500 mt-0.5">{nextRef}</div>
          <p className="mt-3 font-serif text-lg text-ink-900">{nextTitle}</p>
          <p className="mt-2 text-ink-700 leading-relaxed text-sm">{nextMed}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(() => {
              const href = referenceHref(nextReading.reference);
              return href ? (
                <Link
                  href={href}
                  className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
                >
                  Open in the Bible
                </Link>
              ) : null;
            })()}
            <Link
              href="/read"
              className="inline-flex items-center rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-800 hover:border-ink-900"
            >
              Open plan
            </Link>
          </div>
        </section>

        <section
          className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8"
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

      <Link
        href="/pray/nations"
        className="block rounded-3xl overflow-hidden border border-ink-200 bg-card glow-ring hover:border-flame-500 transition-colors"
        dir="ltr"
      >
        <div className="relative aspect-[16/7] bg-ink-800 overflow-hidden">
          <NationFlag
            iso={nation.iso}
            alt={`Flag of ${nation.name}`}
            width={640}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/10 to-ink-900/80" />
          <div className="absolute top-3 left-4">
            <span className="text-[10px] uppercase tracking-widest text-flame-300">
              Day {nationDay} · Praying for the Nations
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
            <span className="text-4xl leading-none" aria-hidden>
              {flagEmoji(nation.iso)}
            </span>
            <div>
              <div className="font-serif text-2xl md:text-3xl text-ink-50 leading-none">
                {nation.name}
              </div>
              <div className="text-xs text-ink-300 mt-1">{nationRegions[nation.region]}</div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-ink-700 text-sm leading-relaxed">{nation.context}</p>
          <div className="mt-4 text-xs text-flame-700">
            Tap to read all prayer points and intercede →
          </div>
        </div>
      </Link>

      {adopted && adopted.iso !== nation.iso && (
        <Link
          href={`/pray/nations/${adopted.iso.toLowerCase()}`}
          className="block rounded-2xl border border-flame-300 bg-flame-50/60 p-4 hover:bg-flame-50"
        >
          <div className="text-xs uppercase tracking-widest text-flame-700">
            Your adopted nation · pray daily
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-2xl" aria-hidden>
              {flagEmoji(adopted.iso)}
            </span>
            <span className="font-serif text-xl text-ink-900">{adopted.name}</span>
          </div>
        </Link>
      )}

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

function PracticeChip({
  href,
  eyebrow,
  title,
  sub,
}: {
  href: string;
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-ink-200 bg-card-subtle p-4 hover:border-flame-500 transition-colors"
    >
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{eyebrow}</div>
      <div className="font-serif text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
        {title}
      </div>
      <div className="text-xs text-ink-500 mt-0.5">{sub}</div>
    </Link>
  );
}
