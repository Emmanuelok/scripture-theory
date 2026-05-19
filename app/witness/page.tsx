import Link from "next/link";
import { testimonies, sharePrompts } from "@/data/testimonies";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";
import WitnessCircles from "@/components/WitnessCircles";

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
        <WitnessCircles />
      </div>

      {/* Featured testimony — large */}
      {testimonies[0] && (
        <article className="mt-12 group relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 border border-ink-800">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.18em] text-flame-300">
              Testimony · {testimonies[0].place}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl mt-2 leading-tight">
              {testimonies[0].name}
            </h2>
            <div className="mt-1 text-xs uppercase tracking-widest text-flame-300">
              {testimonies[0].verse}
            </div>
            <div className="mt-7 grid md:grid-cols-3 gap-4">
              <DarkBlock label="Before">{testimonies[0].before}</DarkBlock>
              <DarkBlock label="Jesus met me">{testimonies[0].encounter}</DarkBlock>
              <DarkBlock label="Now">{testimonies[0].now}</DarkBlock>
            </div>
          </div>
        </article>
      )}

      {/* Remaining testimonies — uniform tile grid */}
      <div className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            More stories of the same Lord
          </h2>
          <p className="text-sm text-ink-500 italic">
            One Christ, many tongues, many tribes.
          </p>
        </div>
        <ol className="grid sm:grid-cols-2 gap-4">
          {testimonies.slice(1).map((t) => (
            <li key={t.name + t.place} className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/50 to-transparent"
              />
              <div className="relative">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl text-ink-900 group-hover:text-flame-700 transition-colors">
                    {t.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-flame-700">
                    {t.verse}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-ink-500 mt-0.5">{t.place}</div>
                <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                  <LightBlock label="Before">{t.before}</LightBlock>
                  <LightBlock label="Jesus met me">{t.encounter}</LightBlock>
                  <LightBlock label="Now">{t.now}</LightBlock>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

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

function DarkBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-700/60 bg-ink-800/40 p-4">
      <div className="text-[10px] uppercase tracking-widest text-flame-300">{label}</div>
      <p className="mt-1.5 text-ink-100 leading-relaxed text-sm">{children}</p>
    </div>
  );
}
function LightBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-card-subtle p-3">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <p className="mt-1 text-ink-800 leading-relaxed text-sm">{children}</p>
    </div>
  );
}
