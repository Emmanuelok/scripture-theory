import Link from "next/link";
import { CREEDS } from "@/data/resources/creeds";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Historic Creeds — Scripture Theory",
  description:
    "The Apostles', Nicene, Chalcedonian, and Athanasian creeds — the historic confessions of the worldwide Church.",
};

export default function CreedsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <div className="mt-3">
        <PageHero
          eyebrow={`${CREEDS.length} historic creeds`}
          title="The Church's"
          titleAccent="confessions."
          intro="For 1,700 years the worldwide Church — Orthodox, Catholic, Anglican, Reformed, Lutheran, evangelical — has confessed the same core faith in the words of these creeds. Read them slowly. Pray them. Believe them with the saints."
          scripture="Hold the pattern of sound words which you have heard from me, in faith and love which is in Christ Jesus."
          scriptureRef="2 Timothy 1:13"
        />
      </div>

      <div className="mt-12 space-y-4">
        {CREEDS.map((c, i) => (
          <details
            key={c.slug}
            id={c.slug}
            open={i === 0}
            className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-card transition-colors"
          >
            <summary className="cursor-pointer list-none p-6 md:p-7 hover:bg-card-subtle transition-colors">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-flame-700">
                    {String(i + 1).padStart(2, "0")} · {c.era}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">{c.name}</h2>
                  <div className="text-xs text-ink-500 mt-1">{c.origin}</div>
                </div>
                <span className="text-flame-700 text-2xl transition-transform group-open:rotate-45">
                  +
                </span>
              </div>
              <p className="mt-3 text-sm text-ink-600 italic leading-relaxed max-w-2xl">{c.why}</p>
            </summary>
            <div className="px-6 md:px-7 pb-7">
              <div className="rounded-2xl bg-card-subtle border border-ink-200 p-5 md:p-6">
                <pre className="whitespace-pre-wrap font-serif text-ink-900 leading-relaxed text-base">
{c.text}
                </pre>
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
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
            "I believe in one holy catholic and apostolic Church."
          </p>
          <p className="mt-2 text-ink-300">— from the Nicene Creed</p>
        </div>
      </div>
    </section>
  );
}
