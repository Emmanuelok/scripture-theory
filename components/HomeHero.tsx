"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { homeHero } from "@/data/homepage-i18n";
import { locales, localeOrder, type LocaleCode } from "@/data/gospel-i18n";

const STORAGE = "scripture-theory-locale";

export default function HomeHero() {
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE) as LocaleCode | null;
      if (saved && homeHero[saved]) setLocale(saved);
    } catch {}
    setMounted(true);
  }, []);

  function pick(code: LocaleCode) {
    setLocale(code);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE, code);
    } catch {}
  }

  const t = homeHero[locale];
  const dir = locales[locale].meta.dir;

  return (
    <section
      className="relative isolate overflow-hidden"
      dir={dir}
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
        {/* Tiny language pill, hidden until needed */}
        <div className="absolute right-5 top-5 md:top-6 md:right-7">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-card/80 backdrop-blur px-3 py-1 text-xs text-ink-600 hover:text-ink-900"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <span className="font-medium">{locales[locale].meta.nativeName}</span>
            <span aria-hidden>▾</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-ink-200 bg-card shadow-lg p-1 z-30">
              {localeOrder.map((code) => {
                const active = code === locale;
                return (
                  <button
                    key={code}
                    onClick={() => pick(code)}
                    className={`w-full text-left rounded-xl px-3 py-1.5 text-sm flex items-center justify-between ${
                      active ? "bg-ink-900 text-ink-50" : "text-ink-800 hover:bg-ink-100"
                    }`}
                    lang={code}
                    dir={locales[code].meta.dir}
                  >
                    <span>{locales[code].meta.nativeName}</span>
                    <span className={active ? "text-ink-300 text-xs" : "text-ink-400 text-xs"}>
                      {locales[code].meta.languageName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

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

        <div className={`mt-10 flex flex-wrap justify-center gap-3`}>
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
            Today's nation
          </Link>
        </div>
      </div>
    </section>
  );
}
