import Link from "next/link";
import {
  translations,
  translationOrder,
  EDITORIAL_NOTE,
  type TranslationCoverage,
  type TranslationId,
} from "@/data/bible/translations";
import { seed } from "@/data/bible/seed";
import { ingested } from "@/data/bible/text";
import { isRuntimeFetchable } from "@/lib/bible-fetch";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Translations — Scripture Theory",
  description:
    "The Scripture Theory Bible translation catalog — named sources, coverage, live availability, licensing, and offline policy.",
};

export default function TranslationsPage() {
  const bundled = new Set(seed.map((c) => c.translation));
  for (const id of translationOrder) {
    if (ingested[id] && Object.keys(ingested[id]!).length > 0) bundled.add(id);
  }
  const readyCount = translationOrder.filter(
    (id) => bundled.has(id) || isRuntimeFetchable(id),
  ).length;
  const englishCount = translationOrder.filter(
    (id) => translations[id].language === "English",
  ).length;
  const langCount = new Set(
    translationOrder.map((id) => translations[id].language),
  ).size;

  // Group by language family
  const grouped = new Map<string, typeof translationOrder>();
  for (const id of translationOrder) {
    const lang = translations[id].language;
    if (!grouped.has(lang)) grouped.set(lang, []);
    grouped.get(lang)!.push(id);
  }
  const groups = Array.from(grouped.entries());

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link
        href="/bible"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← The Bible
      </Link>

      <div className="mt-3">
        <PageHero
          eyebrow="Translation catalog"
          title="Real translations,"
          titleAccent="made by named humans."
          intro={`${translationOrder.length} catalogued editions across ${langCount} languages (${englishCount} English plus the others). ${readyCount} are readable on this deployment through bundled text or a configured provider. Every card below names the source, coverage, and offline policy.`}
        />
      </div>

      <Tile
        size="wide"
        tone="dark"
        eyebrow="Our editorial standard"
        title="A bright, simple line."
        sub={EDITORIAL_NOTE}
        glyph={<Glyph id="shield" size={100} />}
        className="mt-10"
      />

      {/* Stat strip */}
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <Stat
          value={String(translationOrder.length)}
          label="Catalogued editions"
        />
        <Stat value={String(readyCount)} label="Readable now" />
        <Stat value={String(langCount)} label="Languages" />
        <Stat value={String(bundled.size)} label="With built-in text" />
      </div>

      {/* Grouped by language */}
      <div className="mt-12 space-y-10">
        {groups.map(([lang, ids]) => (
          <section key={lang}>
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-ink-200">
              <h2 className="font-serif text-2xl text-ink-900">{lang}</h2>
              <span className="text-[10px] uppercase tracking-widest text-flame-700">
                {ids.length} editions
              </span>
            </div>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ids.map((id) => {
                const t = translations[id];
                const delivery = deliveryFor(id, bundled.has(id));
                return (
                  <li
                    key={id}
                    className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-card p-5 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_12px_36px_-16px_rgba(249,115,22,0.28)] transition-all"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
                    />
                    <div className="relative">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-serif text-ink-900 text-2xl">
                          {t.abbrev}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-widest ${delivery.tone}`}
                          title={delivery.title}
                        >
                          {delivery.badge}
                        </span>
                      </div>
                      <div className="text-sm text-ink-700 mt-1">{t.name}</div>
                      <div className="text-xs text-ink-500 mt-1">
                        {t.languageNative} · {t.year}
                      </div>
                      <div className="text-[11px] text-ink-400 mt-2 leading-snug">
                        {t.publisher}
                      </div>
                      <div className="text-[11px] text-ink-600 mt-2 leading-snug">
                        <strong className="font-medium text-ink-700">
                          Source:
                        </strong>{" "}
                        {delivery.provider}
                      </div>
                      <div className="text-[11px] text-ink-500 mt-1 leading-snug">
                        <strong className="font-medium text-ink-600">
                          Coverage:
                        </strong>{" "}
                        {coverageLabel(t.coverage)} · {delivery.offline}
                      </div>
                      <div
                        className={`text-[11px] mt-1 leading-snug ${t.requiresKey ? "text-flame-700" : "text-ink-500"}`}
                      >
                        {t.license}
                      </div>
                      {t.note && (
                        <div className="text-[11px] text-flame-700 mt-2 leading-snug italic">
                          {t.note}
                        </div>
                      )}
                      {delivery.href && (
                        <Link
                          href={delivery.href}
                          className="mt-4 inline-flex min-h-10 items-center rounded-full border border-flame-300 px-3 py-1 text-xs font-medium text-flame-700 hover:bg-flame-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400"
                        >
                          {delivery.action} →
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* How chapters load */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="How chapters load"
        title="Three delivery paths, clearly labelled."
        glyph={<Glyph id="library" size={100} />}
        className="mt-14"
      >
        <ol className="mt-4 space-y-3 text-sm text-ink-300 leading-relaxed">
          <li className="flex gap-3">
            <span className="font-serif text-flame-300 text-lg leading-none">
              01
            </span>
            <span>
              <strong className="text-ink-50">Built-in text.</strong> Verified
              seed and ingested chapters ship with the application. Cards say
              “Selected passages” when a verified full-canon provider is not
              connected yet.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-flame-300 text-lg leading-none">
              02
            </span>
            <span>
              <strong className="text-ink-50">Public-domain API.</strong>{" "}
              Supported editions load from{" "}
              <code className="bg-ink-800/60 px-1.5 py-0.5 rounded text-xs">
                bible-api.com
              </code>{" "}
              on demand and are eligible for this device’s offline cache after
              they have opened.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-flame-300 text-lg leading-none">
              03
            </span>
            <span>
              <strong className="text-ink-50">Licensed publisher API.</strong>{" "}
              The ESV loads directly through Crossway only when this deployment
              is configured. It is online-only, carries the required
              attribution, and is never written to the PWA’s offline cache.
            </span>
          </li>
        </ol>
      </Tile>
    </section>
  );
}

type Delivery = {
  badge: string;
  title: string;
  provider: string;
  offline: string;
  tone: string;
  href?: string;
  action?: string;
};

function deliveryFor(id: TranslationId, hasBundledText: boolean): Delivery {
  const meta = translations[id];
  if (meta.provider === "crossway") {
    const configured = isRuntimeFetchable(id);
    return {
      badge: configured ? "◆ Live licensed" : "◇ Setup required",
      title: configured
        ? "Configured and fetched live from Crossway"
        : "The server-side ESV_API_KEY is not configured",
      provider: "Crossway ESV API",
      offline: "online-only; never stored offline",
      tone: configured ? "text-flame-700" : "text-amber-700",
      href: configured ? `/bible/john/3?translation=${id}` : undefined,
      action: configured ? "Read John 3" : undefined,
    };
  }

  if (meta.provider === "bible-api") {
    return {
      badge: "○ Live on-demand",
      title: "Available on demand from the public-domain provider",
      provider: meta.source ?? "bible-api.com",
      offline: "eligible for offline cache after opening",
      tone: "text-emerald-700",
      href: `/bible/john/3?translation=${id}`,
      action: "Read John 3",
    };
  }

  return {
    badge: hasBundledText ? "● Selected passages" : "– Catalog only",
    title: hasBundledText
      ? "Verified selected passages are bundled"
      : "No verified text provider is connected yet",
    provider: hasBundledText
      ? (meta.source ?? "Verified bundled text")
      : "Provider pending",
    offline: hasBundledText
      ? "bundled where available"
      : "not currently readable",
    tone: hasBundledText ? "text-sky-700" : "text-ink-400",
    href: hasBundledText ? `/bible/psalms/23?translation=${id}` : undefined,
    action: hasBundledText ? "Open bundled Psalm 23" : undefined,
  };
}

function coverageLabel(coverage: TranslationCoverage): string {
  if (coverage === "full") return "Full canon";
  if (coverage === "new-testament") return "New Testament";
  return "Selected passages";
}

function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-card p-4 md:p-5 text-center">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">
        {label}
      </div>
      <div className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">
        {value}
      </div>
      {sub && <div className="text-xs text-ink-500 mt-0.5">{sub}</div>}
    </div>
  );
}
