import Link from "next/link";
import { DISCIPLINES } from "@/data/resources/disciplines";
import { referenceHref } from "@/lib/reference";
import { PageHero } from "@/components/ui/Tile";
import { Glyph, type GlyphId } from "@/components/ui/Glyph";
import DisciplinesWheel from "@/components/DisciplinesWheel";

export const metadata = {
  title: "Spiritual disciplines — Scripture Theory",
  description:
    "How the saints have actually grown. Scripture, prayer, fasting, Sabbath, solitude, confession, generosity, and service — with starter practices for each.",
};

const SLUG_GLYPHS: Record<string, GlyphId> = {
  scripture: "open-book",
  prayer: "hands",
  fasting: "fast",
  sabbath: "sabbath",
  solitude: "door",
  silence: "door",
  confession: "forgive",
  generosity: "key",
  service: "hands",
  worship: "harp",
  community: "people",
};

function glyphFor(slug: string): GlyphId {
  return SLUG_GLYPHS[slug] ?? "flame";
}

export default function DisciplinesPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <div className="mt-3">
        <PageHero
          eyebrow={`${DISCIPLINES.length} spiritual disciplines`}
          title="How the saints"
          titleAccent="have actually grown."
          intro="None of these earn anything; all of them prepare the soil. Pick one this season and walk with it. Don't try to start them all at once."
          scripture="Train yourself for godliness; for bodily exercise has some value, but godliness has value in all things."
          scriptureRef="1 Timothy 4:7–8"
        />
      </div>

      <div className="mt-10">
        <DisciplinesWheel />
      </div>

      <ol className="mt-12 space-y-5">
        {DISCIPLINES.map((d, i) => (
          <li key={d.slug}>
            <article
              id={d.slug}
              className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 md:p-8 scroll-mt-24 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
              />
              <span
                aria-hidden
                className="absolute right-5 top-5 text-flame-700/15 group-hover:text-flame-700/50 group-hover:scale-110 transition-all duration-500"
              >
                <Glyph id={glyphFor(d.slug)} size={64} />
              </span>

              <div className="relative">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-flame-700 text-4xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-2xl md:text-3xl text-ink-900 group-hover:text-flame-700 transition-colors">
                      {d.name}
                    </h2>
                    <p className="text-ink-500 italic mt-0.5">{d.oneLine}</p>
                  </div>
                </div>

                <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">{d.why}</p>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-card-subtle border border-ink-200 p-5">
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      A way to start
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-ink-800">
                      {d.start.map((s, idx) => (
                        <li key={idx} className="flex gap-3 leading-relaxed">
                          <span className="text-flame-700 shrink-0">·</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-ink-200 bg-card-subtle p-5">
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      Anchored in
                    </div>
                    <ul className="mt-3 space-y-3">
                      {d.scriptures.map((s) => {
                        const href = referenceHref(s.ref);
                        return (
                          <li key={s.ref} className="border-l-2 border-flame-300 pl-3">
                            <p className="prose-scripture text-sm text-ink-800 italic">
                              "{s.text}"
                            </p>
                            <div className="text-xs text-ink-500 mt-1">
                              —{" "}
                              {href ? (
                                <Link href={href} className="hover:text-flame-700 underline">
                                  {s.ref}
                                </Link>
                              ) : (
                                s.ref
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>

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
            "He must increase, but I must decrease."
          </p>
          <p className="mt-2 text-ink-300">John 3:30 — John the Baptist</p>
        </div>
      </div>
    </section>
  );
}
