import Link from "next/link";
import {
  jesusInScripture,
  divisions,
  type CanonBookRevelation,
} from "@/data/jesus-in-scripture";
import { voicesFor, type VoiceCitation } from "@/data/jesus-voices";
import { jesusStudy, studyEpigraph } from "@/data/jesus-study";
import { passages, type Passage } from "@/data/lens";
import ScriptureRef from "@/components/ScriptureRef";
import ChristInEveryBook from "@/components/ChristInEveryBook";
import SevenIAmSayings from "@/components/SevenIAmSayings";
import ChristsFootsteps from "@/components/ChristsFootsteps";
import GenealogyOfChrist from "@/components/GenealogyOfChrist";

export const metadata = {
  title: "Jesus throughout the Scriptures — Scripture Theory",
  description:
    "Christ in every book of the Bible, Genesis to Revelation — with the witnesses of the Fathers, Reformers, Puritans, and modern teachers of the whole Church. Plus six emphases the Church has heard in six key passages.",
};

// ─────────── Voice card ───────────
function VoiceCard({ v }: { v: VoiceCitation }) {
  return (
    <li className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-serif text-ink-900 text-sm">{v.author}</span>
        <span className="text-[10px] uppercase tracking-widest text-flame-700">
          {v.era}
        </span>
      </div>
      {v.work && (
        <p className="mt-1 text-xs text-ink-500 italic">{v.work}</p>
      )}
      {v.quote && (
        <blockquote className="mt-2 border-l-2 border-flame-300 pl-3 text-sm text-ink-800 italic leading-relaxed">
          "{v.quote}"
        </blockquote>
      )}
      {v.note && !v.quote && (
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">{v.note}</p>
      )}
      {v.note && v.quote && (
        <p className="mt-2 text-xs text-ink-600 leading-relaxed">{v.note}</p>
      )}
    </li>
  );
}

// ─────────── Emphasis card (one facet of how Christ has been heard here) ───────────
function EmphasisCard({
  reading,
}: {
  reading: Passage["readings"][number];
}) {
  return (
    <article className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">
        Emphasis
      </div>
      <p className="mt-1 font-serif text-base text-ink-900 leading-snug">
        {reading.emphasis}
      </p>
      <p className="mt-3 text-sm text-ink-800 leading-relaxed">
        {reading.reading}
      </p>
      {reading.voices.length > 0 && (
        <p className="mt-3 text-[11px] text-ink-500 italic">
          Voices in this hearing: {reading.voices.join(" · ")}
        </p>
      )}
    </article>
  );
}

// ─────────── Six-tradition deep-dive passage ───────────
function TraditionPassage({ p }: { p: Passage }) {
  return (
    <article
      id={`tradition-${p.reference.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 scroll-mt-24"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight">
          <ScriptureRef
            reference={p.reference}
            underline={false}
            className="text-ink-900 hover:text-flame-700"
          />
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-flame-700 shrink-0">
          {p.translation}
        </span>
      </div>

      <blockquote className="mt-4 border-l-4 border-flame-300 pl-4 text-ink-800 leading-relaxed">
        "{p.text}"
      </blockquote>

      <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
          <div className="text-[10px] uppercase tracking-widest text-ink-500 mb-1">
            Context
          </div>
          <p className="text-ink-700 leading-relaxed">{p.context}</p>
        </div>
        <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
          <div className="text-[10px] uppercase tracking-widest text-ink-500 mb-1">
            Literal sense
          </div>
          <p className="text-ink-700 leading-relaxed">{p.literal}</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-flame-300 bg-flame-50/60 p-4">
        <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
          Christ-centered reading
        </div>
        <p className="text-ink-800 leading-relaxed">{p.christCentered}</p>
      </div>

      <div className="mt-6">
        <h4 className="font-serif text-lg text-ink-900 mb-3">
          Six emphases the Church has heard here
        </h4>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {p.readings.map((r) => (
            <li key={r.tradition}>
              <EmphasisCard reading={r} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
          <div className="text-[10px] uppercase tracking-widest text-emerald-800 mb-1">
            The shared confession
          </div>
          <p className="text-ink-800 leading-relaxed">{p.agreement}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
          <div className="text-[10px] uppercase tracking-widest text-amber-800 mb-1">
            Where hearings differ — held in love
          </div>
          <p className="text-ink-800 leading-relaxed">{p.disagreement}</p>
        </div>
      </div>

      {p.formation.length > 0 && (
        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
            Formation
          </div>
          <ul className="space-y-1 text-sm text-ink-700">
            {p.formation.map((f, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="text-flame-700">·</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

// ─────────── Book card (with voices) ───────────
function BookCard({ b }: { b: CanonBookRevelation }) {
  const voices = voicesFor(b.bookId);
  return (
    <article
      id={b.bookId}
      className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 scroll-mt-24"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <Link
            href={`/bible/${b.bookId}`}
            className="text-[10px] uppercase tracking-widest text-flame-700 hover:text-flame-800"
          >
            {b.testament} · {b.division}
          </Link>
          <h3 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight mt-1">
            <Link
              href={`/bible/${b.bookId}`}
              className="hover:text-flame-700 transition-colors"
            >
              {b.name}
            </Link>
          </h3>
        </div>
      </div>

      <p className="mt-3 font-serif text-lg md:text-xl text-flame-700 leading-snug italic">
        {b.headline}
      </p>

      {b.keyPassages.length > 0 && (
        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-widest text-ink-500 mb-1.5">
            Key passages
          </div>
          <div className="flex flex-wrap gap-1.5">
            {b.keyPassages.map((p) => (
              <ScriptureRef
                key={p}
                reference={p}
                underline={false}
                className="rounded-full bg-card-subtle border border-ink-200 px-2.5 py-0.5 text-[11px] text-ink-700 hover:border-flame-500"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 space-y-3 text-ink-800 leading-relaxed">
        {b.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {voices.length > 0 && (
        <div className="mt-6 pt-5 border-t border-ink-100">
          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-3">
            Voices in the tradition
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {voices.map((v, i) => (
              <VoiceCard key={i} v={v} />
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function JesusPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Jesus throughout the Scriptures
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        From Genesis to Revelation, the Bible tells one Story — and His Name is Jesus.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-3xl">
        An extensive study of the Christ-centered reading of Scripture: how Jesus Himself read
        His own Bible, how the apostles and Fathers and Reformers followed Him, and what every
        book of Scripture has to say about the One in whom all the promises of God find their
        Yes.
      </p>

      {/* Epigraph */}
      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8">
        <blockquote className="font-serif text-xl md:text-2xl text-ink-900 leading-snug italic">
          "{studyEpigraph.text}"
        </blockquote>
        <p className="mt-2 text-sm text-ink-600">
          —{" "}
          <ScriptureRef
            reference={studyEpigraph.reference}
            className="text-ink-600 hover:text-flame-700"
          />
        </p>
      </div>

      {/* Footsteps — schematic map of His earthly walk */}
      <div className="mt-10">
        <ChristsFootsteps />
      </div>

      {/* Genealogy — Matthew 1 */}
      <div className="mt-10">
        <GenealogyOfChrist />
      </div>

      {/* "I AM" sayings — figure */}
      <div className="mt-10">
        <SevenIAmSayings />
      </div>

      {/* Table of contents */}
      <nav className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-5">
        <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
          On this page
        </div>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-ink-700 list-decimal pl-5">
          <li><a href="#study" className="hover:text-flame-700 hover:underline">The study — 9 sections</a></li>
          <li><a href="#emphases" className="hover:text-flame-700 hover:underline">Six emphases on six key passages</a></li>
          <li><a href="#canonical-sweep" className="hover:text-flame-700 hover:underline">Christ in every book of the Bible</a></li>
        </ol>
      </nav>

      {/* ═════════ Part 1: The study ═════════ */}
      <section id="study" className="mt-16 scroll-mt-24">
        <div className="border-b border-ink-200 pb-3 mb-8">
          <span className="text-[10px] uppercase tracking-widest text-flame-700">
            Part one
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">
            The Christ-centered reading of Scripture — a study
          </h2>
          <p className="mt-2 text-sm text-ink-600 italic">
            Tracing the witness from Jesus through the Fathers, Reformers, Puritans, and moderns.
          </p>
        </div>

        <div className="space-y-10">
          {jesusStudy.map((s) => (
            <article id={s.id} key={s.id} className="scroll-mt-24">
              <h3 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight">
                {s.heading}
              </h3>
              {s.epigraph && (
                <blockquote className="mt-3 border-l-4 border-flame-300 pl-4 italic text-ink-800 leading-relaxed">
                  "{s.epigraph.text}"
                  <span className="block mt-1 not-italic text-sm text-ink-500">
                    —{" "}
                    <ScriptureRef
                      reference={s.epigraph.reference}
                      className="text-ink-500 hover:text-flame-700"
                    />
                  </span>
                </blockquote>
              )}
              <div className="mt-4 space-y-3 text-ink-800 leading-relaxed">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═════════ Part 2: Six emphases on six key passages ═════════ */}
      <section id="emphases" className="mt-20 scroll-mt-24">
        <div className="border-b border-ink-200 pb-3 mb-8">
          <span className="text-[10px] uppercase tracking-widest text-flame-700">
            Part two
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">
            Six emphases on six key passages
          </h2>
          <p className="mt-2 text-sm text-ink-600 italic">
            One Christ, many faithful hearings. Six facets the Church across the centuries has
            heard in six of the most-loved passages in Scripture — each one converging on the
            same Lord.
          </p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-5 mb-8 text-sm text-ink-700 leading-relaxed">
          We do not name parties or pit them against each other. We name what believers across
          time have heard in each verse, and we let Christ be the center of every hearing. The
          historical voices cited under each emphasis — Fathers, mothers, mystics, Reformers,
          Puritans, Pietists, missionaries, modern teachers — testify together to the one Lord
          they all confess.
        </div>

        <div className="space-y-8">
          {passages.map((p) => (
            <TraditionPassage key={p.reference} p={p} />
          ))}
        </div>
      </section>

      {/* ═════════ Part 3: Canonical sweep ═════════ */}
      <section id="canonical-sweep" className="mt-20 scroll-mt-24">
        <div className="border-b border-ink-200 pb-3 mb-8">
          <span className="text-[10px] uppercase tracking-widest text-flame-700">
            Part three
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">
            Christ in every book of the Bible
          </h2>
          <p className="mt-2 text-sm text-ink-600 italic">
            Sixty-six books, ten canonical divisions, one Christ — with the historical voices
            who have read it this way.
          </p>
        </div>

        <ChristInEveryBook />

        {/* Division jump nav */}
        <nav className="rounded-3xl border border-ink-200 bg-card-subtle p-5 mb-10">
          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
            Jump to a section
          </div>
          <ul className="flex flex-wrap gap-2 text-sm">
            {divisions.map((d) => {
              const slug = d.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              const count = jesusInScripture.filter((b) => b.division === d).length;
              return (
                <li key={d}>
                  <a
                    href={`#${slug}`}
                    className="rounded-full border border-ink-300 bg-card px-3.5 py-1 text-ink-700 hover:border-flame-500 hover:text-flame-700"
                  >
                    {d} <span className="text-ink-400">· {count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-14">
          {divisions.map((d) => {
            const slug = d.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const inDiv = jesusInScripture.filter((b) => b.division === d);
            if (inDiv.length === 0) return null;
            return (
              <section key={d} id={slug} className="scroll-mt-24">
                <div className="flex items-baseline justify-between gap-3 mb-5 border-b border-ink-200 pb-3">
                  <h3 className="font-serif text-2xl md:text-3xl text-ink-900">
                    {d}
                  </h3>
                  <span className="text-xs text-ink-500">
                    {inDiv.length} {inDiv.length === 1 ? "book" : "books"}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2 mb-6">
                  {inDiv.map((b) => (
                    <li key={b.bookId}>
                      <a
                        href={`#${b.bookId}`}
                        className="rounded-full bg-card border border-ink-200 px-2.5 py-0.5 text-[11px] text-ink-700 hover:border-flame-500 hover:text-flame-700"
                      >
                        {b.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="space-y-5">
                  {inDiv.map((b) => (
                    <BookCard key={b.bookId} b={b} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Closing */}
      <div className="mt-20 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug italic">
            "You search the Scriptures, because you think that in them you have eternal life;
            and it is they that bear witness about me."
          </p>
          <p className="mt-2 text-ink-300">
            —{" "}
            <Link href="/verse/john/5/39" className="hover:text-flame-300">
              John 5:39
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/bible"
              className="rounded-full bg-flame-600 text-white px-5 py-2 text-sm hover:bg-flame-700"
            >
              Open the Bible →
            </Link>
            <Link
              href="/gospel"
              className="rounded-full border border-ink-50/30 px-5 py-2 text-sm hover:border-flame-300 text-ink-50"
            >
              Read the Gospel →
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-10 text-xs text-ink-400 leading-relaxed text-center max-w-2xl mx-auto">
        Editorial note: every typology and prophecy named on this page is named first by
        Scripture itself, and every historical figure cited is a real and well-attested writer
        in the Christian tradition. Where the connection between an Old Testament image and
        Christ is explicit in the New Testament, we cite the New Testament text. The aim is
        illumination, not invention.
      </p>
    </section>
  );
}
