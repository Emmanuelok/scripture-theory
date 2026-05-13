import Link from "next/link";
import { CREEDS } from "@/data/resources/creeds";

export const metadata = {
  title: "Historic Creeds — Scripture Theory",
  description:
    "The Apostles', Nicene, Chalcedonian, and Athanasian creeds — the historic confessions of the worldwide Church.",
};

export default function CreedsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        The Church's confessions.
      </h1>
      <p className="mt-3 text-ink-700 leading-relaxed">
        For 1,700 years the worldwide Church — Orthodox, Catholic, Anglican, Reformed, Lutheran,
        evangelical — has confessed the same core faith in the words of these creeds. Read them
        slowly. Pray them. Believe them with the saints.
      </p>

      <div className="mt-10 space-y-8">
        {CREEDS.map((c) => (
          <article key={c.slug} className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
            <div className="text-xs uppercase tracking-widest text-flame-700">{c.era}</div>
            <h2 className="font-serif text-3xl text-ink-900 mt-1">{c.name}</h2>
            <div className="text-xs text-ink-500 mt-0.5">{c.origin}</div>
            <p className="mt-3 text-sm text-ink-600 italic leading-relaxed">{c.why}</p>

            <div className="mt-5 rounded-2xl bg-ink-50 border border-ink-100 p-5">
              <pre className="whitespace-pre-wrap font-serif text-ink-900 leading-relaxed text-base">
{c.text}
              </pre>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "Hold the pattern of sound words which you have heard from me, in faith and love which
          is in Christ Jesus."
        </p>
        <p className="mt-2 text-ink-300">2 Timothy 1:13</p>
      </div>
    </section>
  );
}
