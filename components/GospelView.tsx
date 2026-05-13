"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { locales, localeOrder, type LocaleCode } from "@/data/gospel-i18n";

const STORAGE = "scripture-theory-locale";

export default function GospelView() {
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE) as LocaleCode | null;
      if (saved && locales[saved]) setLocale(saved);
    } catch {}
    setMounted(true);
  }, []);

  function pick(code: LocaleCode) {
    setLocale(code);
    try {
      window.localStorage.setItem(STORAGE, code);
    } catch {}
  }

  const t = locales[locale];
  const dir = t.meta.dir;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6" suppressHydrationWarning>
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
              aria-label={`Read in ${item.meta.languageName}`}
            >
              {item.meta.nativeName}
            </button>
          );
        })}
      </div>

      <article dir={dir} className={dir === "rtl" ? "text-right" : ""} lang={mounted ? locale : "en"}>
        <span className="text-xs uppercase tracking-widest text-flame-700">{t.meta.pageEyebrow}</span>
        <h1 className="font-serif text-4xl md:text-6xl mt-2 text-ink-900 leading-tight">
          {t.meta.pageTitle}
        </h1>
        <p className="mt-5 text-lg text-ink-700 leading-relaxed">{t.meta.pageIntro}</p>

        <ol className="mt-12 space-y-10">
          {t.movements.map((m) => (
            <li
              key={m.number}
              className="rounded-3xl border border-ink-200 bg-white p-6 md:p-9 glow-ring"
            >
              <div className={`flex flex-wrap items-baseline gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <span className="font-serif text-5xl text-flame-700 leading-none">{m.number}</span>
                <div>
                  <h2 className="font-serif text-3xl text-ink-900">{m.title}</h2>
                  <p className="text-ink-500 mt-0.5">{m.subtitle}</p>
                </div>
              </div>
              <blockquote
                className={`mt-6 prose-scripture text-ink-800 ${
                  dir === "rtl"
                    ? "border-r-4 border-flame-300 pr-5"
                    : "border-l-4 border-flame-300 pl-5"
                }`}
              >
                <p>"{m.scripture}"</p>
                <footer className="text-sm text-ink-500 mt-2 not-italic">— {m.reference}</footer>
              </blockquote>
              <p className="mt-6 text-ink-800 leading-relaxed">{m.body}</p>
              <div className="mt-5 border-t border-ink-100 pt-4">
                <div className="text-xs uppercase tracking-widest text-ink-400">
                  {locale === "es" ? "Ver también" :
                   locale === "pt" ? "Veja também" :
                   locale === "fr" ? "Voir aussi" :
                   locale === "sw" ? "Tazama pia" :
                   locale === "hi" ? "यह भी देखें" :
                   locale === "ar" ? "انظر أيضًا" :
                   locale === "zh" ? "另见" :
                   "Also see"}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {m.echoes.map((e) => (
                    <span
                      key={e}
                      className="rounded-full bg-ink-50 border border-ink-200 px-3 py-0.5 text-xs text-ink-600"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
          <span className="text-xs uppercase tracking-widest text-flame-300">
            {t.prayer.eyebrow}
          </span>
          <h2 className="font-serif text-3xl mt-2">{t.prayer.heading}</h2>
          <p className="mt-3 text-ink-200 leading-relaxed">{t.prayer.intro}</p>
          <pre
            dir={dir}
            className={`mt-6 whitespace-pre-wrap font-serif text-lg leading-relaxed text-ink-50 bg-ink-800 border border-ink-700 rounded-2xl p-6 ${
              dir === "rtl" ? "text-right" : ""
            }`}
            style={{ fontFamily: dir === "rtl" ? "ui-serif, Georgia, serif" : undefined }}
          >
{t.prayer.body}
          </pre>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">{t.next.heading}</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {t.next.steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white border border-ink-200 p-5">
                <div className={`flex items-baseline gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <span className="font-serif text-flame-700 text-2xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-lg text-ink-900">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-ink-700 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className={`mt-8 flex flex-wrap gap-3 ${dir === "rtl" ? "justify-end" : ""}`}>
            <Link
              href="/read"
              className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
            >
              {t.cta.readJohn} →
            </Link>
            <Link
              href="/pray"
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900"
            >
              {t.cta.learnPray}
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900"
            >
              {t.cta.findChurch}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
