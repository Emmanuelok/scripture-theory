import Link from "next/link";
import ScriptureRef from "@/components/ScriptureRef";
import BibleLandsMap from "@/components/BibleLandsMapLazy";
import { atlasRegions } from "@/data/atlas";

export const metadata = {
  title: "Bible atlas — Scripture Theory",
  description:
    "An interactive map of the Bible lands. Every named place in Scripture's story — from Eden and Ur to Patmos and Rome — plotted on the real geography, filterable by era, linked to the verse that names it.",
};

export default function AtlasPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Bible Atlas</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        The Word happened in a real place.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        Christianity is not a myth in a vague otherworld. It is a story told in named cities,
        on real roads, under skies the same stars still cross. Below is the geography of
        Scripture — eight movements, dozens of places, every one of them tappable on the map
        and linked to the verse that names it.
      </p>

      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6">
        <p className="font-serif text-lg text-ink-900 leading-snug italic">
          &ldquo;The Word became flesh and dwelt among us, and we beheld His glory.&rdquo;
        </p>
        <p className="mt-1 text-sm text-ink-500">— John 1:14</p>
      </div>

      {/* THE MAP */}
      <div className="mt-10">
        <BibleLandsMap />
      </div>

      {/* Per-era jump nav */}
      <nav className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-5">
        <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
          Eight movements
        </div>
        <ul className="flex flex-wrap gap-2 text-sm">
          {atlasRegions.map((r) => (
            <li key={r.id}>
              <a
                href={`#${r.id}`}
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1 text-ink-700 hover:border-flame-500 hover:text-flame-700 inline-flex items-center gap-1.5"
              >
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                {r.title.split("—")[0].trim().split("·")[0].trim()}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-10">
        {atlasRegions.map((r) => (
          <article
            key={r.id}
            id={r.id}
            className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 scroll-mt-24"
          >
            <div className="flex items-baseline gap-2">
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: r.color }}
              />
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                {r.era}
              </div>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1 leading-tight">
              {r.title}
            </h2>
            <p className="mt-3 text-ink-700 leading-relaxed">{r.blurb}</p>

            <ul className="mt-5 space-y-2">
              {r.places.map((p) => (
                <li
                  key={p.name}
                  className="rounded-xl border border-ink-200 bg-card-subtle p-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="font-serif text-ink-900">
                    {p.name}
                    {p.approx && (
                      <span className="ml-1 text-[10px] uppercase tracking-widest text-ink-400">
                        approx
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-ink-700 flex-1 min-w-[12rem]">{p.what}</span>
                  {p.ref && (
                    <ScriptureRef
                      reference={p.ref}
                      underline={false}
                      className="text-[11px] text-flame-700 hover:underline shrink-0"
                    />
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6 text-sm text-ink-600 leading-relaxed">
        <strong className="text-ink-900">For deeper exploration</strong> — the map above is
        meant to give the reader a feel for the geography, not to replace a full study atlas.
        For pan-and-zoom interactive mapping of every named place, we commend{" "}
        <a
          href="https://www.openbible.info/geo/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-flame-700 hover:underline"
        >
          OpenBible.info Geocoded Places
        </a>{" "}
        and the historic maps of Smith's Bible Atlas (1858) preserved at{" "}
        <a
          href="https://www.ccel.org/bible/atlas/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-flame-700 hover:underline"
        >
          CCEL
        </a>
        . Both are free and faithful.
      </div>

      <div className="mt-10 text-center">
        <Link href="/resources" className="text-sm text-flame-700 hover:underline">
          ← Back to Resources
        </Link>
      </div>
    </section>
  );
}
