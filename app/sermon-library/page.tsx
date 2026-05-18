import Link from "next/link";
import { sermonLibrary, sermonLibraryNote } from "@/data/sermon-library";

export const metadata = {
  title: "Sermon library — Scripture Theory",
  description:
    "The great preachers of the Church, freely available. Chrysostom, Augustine, Luther, Calvin, Wesley, Whitefield, Edwards, Spurgeon, M'Cheyne, Moody — public-domain sermons curated and linked to reputable free archives.",
};

export default function SermonLibraryPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Sermon library</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Sit at the feet of the preachers who came before us.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        The Church did not start last Sunday. For two thousand years, faithful preachers have
        opened the Word and lifted up Christ. Below is a curated doorway into the giants whose
        sermons are now public-domain — every entry links out to a trusted free archive.
      </p>

      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6">
        <p className="font-serif text-lg text-ink-900 leading-snug italic">
          "Faith comes by hearing, and hearing by the word of God."
        </p>
        <p className="mt-1 text-sm text-ink-500">— Romans 10:17</p>
      </div>

      {/* Jump nav */}
      <nav className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-5">
        <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
          Preachers
        </div>
        <ul className="flex flex-wrap gap-2 text-sm">
          {sermonLibrary.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1 text-ink-700 hover:border-flame-500 hover:text-flame-700"
              >
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-12">
        {sermonLibrary.map((p) => (
          <article
            id={p.id}
            key={p.id}
            className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 scroll-mt-24"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  {p.tradition}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1 leading-tight">
                  {p.name}
                </h2>
                <p className="text-sm text-ink-500 mt-0.5">{p.era}</p>
              </div>
              <a
                href={p.archive.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink-300 px-3 py-1 text-xs text-ink-700 hover:border-flame-500 inline-flex items-center gap-1"
              >
                {p.archive.label} <span className="text-ink-400">↗</span>
              </a>
            </div>

            <p className="mt-3 text-ink-700 leading-relaxed">{p.bio}</p>

            <ul className="mt-5 space-y-3">
              {p.sermons.map((s) => (
                <li
                  key={s.title}
                  className="rounded-2xl border border-ink-200 bg-card-subtle p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-lg text-ink-900 hover:text-flame-700 inline-flex items-baseline gap-2"
                  >
                    {s.title} <span className="text-ink-400 text-sm">↗</span>
                  </a>
                  {(s.preachedOn || s.year) && (
                    <p className="text-[11px] uppercase tracking-widest text-flame-700 mt-1">
                      {s.preachedOn && <span>{s.preachedOn}</span>}
                      {s.preachedOn && s.year && <span> · </span>}
                      {s.year && <span>{s.year}</span>}
                    </p>
                  )}
                  <p className="text-sm text-ink-700 leading-relaxed mt-1.5">{s.blurb}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6 text-sm text-ink-600 leading-relaxed whitespace-pre-line">
        <strong className="text-ink-900 not-italic block mb-2">A note on the sources</strong>
        {sermonLibraryNote}
      </div>

      <div className="mt-10 text-center">
        <Link href="/resources" className="text-sm text-flame-700 hover:underline">
          ← Back to Resources
        </Link>
      </div>
    </section>
  );
}
