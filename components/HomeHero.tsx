"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { homeHero } from "@/data/homepage-i18n";
import { locales, type LocaleCode } from "@/data/gospel-i18n";

export default function HomeHero() {
  const { profile, mounted } = useProfile();
  const locale: LocaleCode = ((profile.locale as LocaleCode) ?? "en") in homeHero
    ? ((profile.locale as LocaleCode) ?? "en")
    : "en";
  const t = homeHero[locale];
  const dir = locales[locale].meta.dir;

  return (
    <section
      className="relative isolate overflow-hidden"
      dir={mounted ? dir : "ltr"}
      suppressHydrationWarning
    >
      {/* Aurora background — subtle in light, dramatic in dark */}
      <div className="aurora absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-full
          [background:radial-gradient(60%_60%_at_50%_0%,rgb(var(--ink-100)/0.6),transparent_70%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-5 pt-24 md:pt-32 pb-16 md:pb-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-card/80 backdrop-blur px-3 py-1 text-xs text-ink-600 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-flame-500 animate-pulse" />
          For every believer
        </span>

        <h1
          className={`mt-8 font-serif font-light leading-[0.9] tracking-tight ${
            dir === "rtl" ? "text-right" : ""
          }`}
        >
          <span className="block text-ink-500 text-2xl md:text-4xl mb-3 font-normal">
            {t.h1Lead}
          </span>
          <span className="block text-7xl md:text-9xl gradient-text">{t.h1Name}</span>
          <span className="text-ink-900 text-7xl md:text-9xl">{t.h1Trail}</span>
        </h1>

        <p className="mt-8 mx-auto max-w-xl text-lg md:text-xl text-ink-700 leading-relaxed">
          {t.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/today"
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-6 py-3 text-sm font-medium hover:bg-flame-700 transition-colors shadow-sm"
          >
            Open today →
          </Link>
          <Link
            href="/bible/john/3"
            className="inline-flex items-center rounded-full border border-ink-300 bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium text-ink-900 hover:border-ink-900 transition-colors"
          >
            Read the Bible
          </Link>
          <Link
            href="/pray/nations"
            className="inline-flex items-center rounded-full border border-ink-300 bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium text-ink-900 hover:border-ink-900 transition-colors"
          >
            Today&apos;s nation
          </Link>
        </div>
      </div>
    </section>
  );
}
