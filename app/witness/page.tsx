import Link from "next/link";
import { sharePrompts } from "@/data/testimonies";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";
import WitnessCircles from "@/components/WitnessCircles";
import TestimoniesWall from "@/components/TestimoniesWall";
import FigureBoundary from "@/components/figure-utils/FigureBoundary";

export const metadata = {
  title: "Witness — Scripture Theory",
  description:
    "Read testimonies of Jesus from believers around the world, and learn how to tell your own story and share the Gospel with one person this week.",
};

export default function WitnessPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Witness"
        title="He is alive."
        titleAccent="Stories from around the world."
        intro="The same Jesus is meeting people in jails, kitchens, classrooms, and capital cities. We gather their testimonies — not to celebrate the stories, but to lift up the Lord who is in them."
        scripture="They overcame him by the blood of the Lamb and by the word of their testimony."
        scriptureRef="Revelation 12:11"
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/witness/share"
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 transition-colors"
        >
          Share your testimony →
        </Link>
        <a
          href="#share-the-gospel"
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900 transition-colors"
        >
          How to tell one person ↓
        </a>
      </div>

      <div className="mt-10">
        <FigureBoundary label="Acts 1:8 Circles">
          <WitnessCircles />
        </FigureBoundary>
      </div>

      {/* Real testimonies, fetched from the database */}
      <FigureBoundary label="Testimonies">
        <TestimoniesWall />
      </FigureBoundary>

      {/* Tell one person */}
      <section id="share-the-gospel" className="mt-20 scroll-mt-24">
        <PageHero
          eyebrow="Tell one person"
          title="You don't need to be a preacher."
          titleAccent="You need to be honest."
          intro="Most people come to Jesus through one ordinary friend who told them the truth gently and stayed close. Six simple steps to help you become that friend this week."
        />

        <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharePrompts.map((p, i) => (
            <li key={p.title}>
              <Tile
                eyebrow={`Step ${String(i + 1).padStart(2, "0")}`}
                title={p.title}
                sub={p.body}
                glyph={<Glyph id={STEP_GLYPHS[i % STEP_GLYPHS.length]} size={48} />}
              />
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Tile
            href="/witness/share"
            size="wide"
            tone="dark"
            eyebrow="Your story"
            title={
              <>
                Share <span className="text-flame-300">your</span> testimony.
              </>
            }
            sub="Write your before / Jesus met me / now. We'll publish stories that point clearly to Christ — anonymously if you wish."
            glyph={<Glyph id="flame" size={120} />}
          />
        </div>
      </section>

      {/* Closing */}
      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.25), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug italic">
            "But you will receive power when the Holy Spirit has come upon you, and you will be my
            witnesses…"
          </p>
          <p className="mt-2 text-ink-300">Acts 1:8 — Jesus</p>
        </div>
      </div>
    </section>
  );
}

const STEP_GLYPHS = ["hands", "ear", "open-book", "cross", "people", "lamp"] as const;
