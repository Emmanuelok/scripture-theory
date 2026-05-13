"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { homeHero } from "@/data/homepage-i18n";
import { locales, localeOrder, type LocaleCode } from "@/data/gospel-i18n";

const STORAGE = "scripture-theory-locale";

export default function HomeHero() {
  const [locale, setLocale] = useState<LocaleCode>("en");
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
    try {
      window.localStorage.setItem(STORAGE, code);
    } catch {}
  }

  const t = homeHero[locale];
  const dir = locales[locale].meta.dir;

  return (
    <section
      className="mx-auto max-w-6xl px-5 pt-16 md:pt-24 pb-12"
      dir={dir}
      suppressHydrationWarning
    >
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs uppercase tracking-widest text-ink-400 mr-1">Language</span>
        {localeOrder.map((code) => {
          const active = code === locale;
          const item = locales[code];
          return (
            <button
              key={code}
              onClick={() => pick(code)}
              className={`rounded-full px-3 py-1 text-sm border transition-colors ${
                active
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
              }`}
              aria-pressed={active}
              lang={code}
              dir={item.meta.dir}
            >
              {item.meta.nativeName}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-12 gap-10 items-start" lang={mounted ? locale : "en"}>
        <div className={`md:col-span-7 ${dir === "rtl" ? "text-right" : ""}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-600">
            <span className="h-1.5 w-1.5 rounded-full bg-flame-500" />
            {t.badge}
          </span>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05] text-ink-900">
            {t.h1Lead}{" "}
            <span className="gradient-text">{t.h1Name}</span>
            {t.h1Trail}
          </h1>
          <p className="mt-6 text-lg text-ink-700 leading-relaxed max-w-xl">{t.subtitle}</p>
          <p className="mt-4 text-ink-600 max-w-xl leading-relaxed">{t.body}</p>
          <div className={`mt-8 flex flex-wrap gap-3 ${dir === "rtl" ? "justify-end" : ""}`}>
            <Link
              href="/start"
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
            >
              {t.ctaStart} →
            </Link>
            <Link
              href="/gospel"
              className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
            >
              {t.ctaGospel}
            </Link>
            <Link
              href="/bible"
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900 transition-colors"
            >
              {t.ctaWord}
            </Link>
            <Link
              href="/pray/nations"
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900 transition-colors"
            >
              {t.ctaPray}
            </Link>
          </div>
        </div>

        <aside className={`md:col-span-5 ${dir === "rtl" ? "text-right" : ""}`}>
          <div className="rounded-2xl bg-ink-900 text-ink-50 p-6 md:p-7 glow-ring">
            <div className="text-xs uppercase tracking-widest text-flame-300">{t.sidebarLabel}</div>
            <p className="font-serif text-xl md:text-2xl mt-3 leading-snug">{t.sidebarQuote}</p>
            <p className="text-sm text-ink-300 mt-3 italic">{t.sidebarRef}</p>
            <div className="mt-5 border-t border-ink-700 pt-4">
              <p className="text-sm text-ink-200">{t.sidebarNote}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
