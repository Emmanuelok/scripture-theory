import Link from "next/link";
import {
  jesusInScripture,
  divisions,
  type CanonBookRevelation,
} from "@/data/jesus-in-scripture";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "Jesus throughout the Scriptures — Scripture Theory",
  description:
    "Christ in every book of the Bible, Genesis to Revelation. \"And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself.\" — Luke 24:27",
};

function BookCard({ b }: { b: CanonBookRevelation }) {
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
    </article>
  );
}

export default function JesusInScripturePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Jesus throughout the Scriptures
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        From Genesis to Revelation, the Bible tells one Story — and His Name is Jesus.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        On the road to Emmaus, after His resurrection, Jesus walked with two disciples and did
        the most extraordinary thing — He opened to them the whole Hebrew Bible and showed them
        Himself in every part of it. Sixty-six books, two testaments, forty authors, one Christ.
      </p>

      {/* Luke 24 anchor quote */}
      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8">
        <blockquote className="font-serif text-xl md:text-2xl text-ink-900 leading-snug italic">
          "And beginning at Moses and all the prophets, he expounded unto them in all the
          scriptures the things concerning himself."
        </blockquote>
        <p className="mt-2 text-sm text-ink-600">
          — <ScriptureRef reference="Luke 24:27" className="text-ink-600 hover:text-flame-700" />
        </p>
      </div>

      {/* Jump nav */}
      <div className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-5">
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
      </div>

      {/* Divisions */}
      <div className="mt-12 space-y-14">
        {divisions.map((d) => {
          const slug = d.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const inDiv = jesusInScripture.filter((b) => b.division === d);
          if (inDiv.length === 0) return null;
          return (
            <section key={d} id={slug} className="scroll-mt-24">
              <div className="flex items-baseline justify-between gap-3 mb-5 border-b border-ink-200 pb-3">
                <h2 className="font-serif text-3xl md:text-4xl text-ink-900">{d}</h2>
                <span className="text-xs text-ink-500">
                  {inDiv.length} {inDiv.length === 1 ? "book" : "books"}
                </span>
              </div>

              {/* Per-section book index for fast scanning */}
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

      {/* Closing call */}
      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
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
            — <Link href="/verse/john/5/39" className="hover:text-flame-300">John 5:39</Link>
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
        Editorial note: every typology and prophecy named on this page is named by Scripture
        itself. Where the connection between an Old Testament image and Christ is explicit in
        the New Testament, we cite the New Testament text. Where it is not explicit, we proceed
        with care. The aim is illumination, not invention.
      </p>
    </section>
  );
}
