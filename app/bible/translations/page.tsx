import Link from "next/link";
import { translations, translationOrder, EDITORIAL_NOTE } from "@/data/bible/translations";
import { seed } from "@/data/bible/seed";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Translations — Scripture Theory",
  description:
    "Every Bible translation served on Scripture Theory — by language, by era, by the human translators who made it. We never machine-translate Scripture.",
};

export default function TranslationsPage() {
  const seeded = new Set(seed.map((c) => c.translation));
  const englishCount = translationOrder.filter((id) => translations[id].language === "English").length;
  const langCount = new Set(translationOrder.map((id) => translations[id].language)).size;

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
      <Link href="/bible" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← The Bible
      </Link>

      <div className="mt-3">
        <PageHero
          eyebrow="The translations we serve"
          title="Real translations,"
          titleAccent="made by named humans."
          intro={`${translationOrder.length} editions across ${langCount} languages (${englishCount} English plus the others). Every Bible served here is a published translation by named human translators. We never machine-translate Scripture.`}
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
      <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
        <Stat value={String(translationOrder.length)} label="Translations" />
        <Stat value={String(langCount)} label="Languages" />
        <Stat value={String(seeded.size)} label="Seeded offline" />
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
                const isSeeded = seeded.has(id);
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
                        <span className="font-serif text-ink-900 text-2xl">{t.abbrev}</span>
                        <span
                          className={`text-[10px] uppercase tracking-widest ${
                            isSeeded ? "text-emerald-700" : "text-ink-400"
                          }`}
                          title={isSeeded ? "Bundled offline-ready" : "Fetched on first open"}
                        >
                          {isSeeded ? "● Seeded" : "○ On-demand"}
                        </span>
                      </div>
                      <div className="text-sm text-ink-700 mt-1">{t.name}</div>
                      <div className="text-xs text-ink-500 mt-1">
                        {t.languageNative} · {t.year}
                      </div>
                      <div className="text-[11px] text-ink-400 mt-2 leading-snug">{t.publisher}</div>
                      {t.note && (
                        <div className="text-[11px] text-flame-700 mt-2 leading-snug italic">
                          {t.note}
                        </div>
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
        title="Three places, in order."
        glyph={<Glyph id="library" size={100} />}
        className="mt-14"
      >
        <ol className="mt-4 space-y-3 text-sm text-ink-300 leading-relaxed">
          <li className="flex gap-3">
            <span className="font-serif text-flame-300 text-lg leading-none">01</span>
            <span>
              <strong className="text-ink-50">On-disk seed.</strong> A small set of hand-verified
              chapters bundled in the repo for instant offline reading.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-flame-300 text-lg leading-none">02</span>
            <span>
              <strong className="text-ink-50">Ingested catalog.</strong> When{" "}
              <code className="bg-ink-800/60 px-1.5 py-0.5 rounded text-xs">npm run ingest-bible</code>{" "}
              has been run, the full WEB / KJV / ASV / DRA / Almeida live in the build.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-flame-300 text-lg leading-none">03</span>
            <span>
              <strong className="text-ink-50">Live, server-cached fetch</strong> from{" "}
              <code className="bg-ink-800/60 px-1.5 py-0.5 rounded text-xs">bible-api.com</code>{" "}
              (free, public-domain). The first visitor pays the round-trip; everyone after them
              gets the cached chapter for 24 hours.
            </span>
          </li>
        </ol>
      </Tile>
    </section>
  );
}

function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-card p-4 md:p-5 text-center">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <div className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">{value}</div>
      {sub && <div className="text-xs text-ink-500 mt-0.5">{sub}</div>}
    </div>
  );
}
