import Link from "next/link";
import { PageHero, Tile, Bento } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "About — Scripture Theory",
  description:
    "Scripture Theory is a JESUS-centered, inter-denominational platform built to help anyone, anywhere, encounter the Lord through His Word.",
};

const PILLARS = [
  {
    glyph: "cross" as const,
    title: "Christ-centered",
    sub: "Jesus is not a topic on this platform. He is the point of every page.",
  },
  {
    glyph: "open-book" as const,
    title: "One Gospel",
    sub: "Christ died for our sins, was buried, and rose on the third day — the gospel Paul received and passed on (1 Cor 15:3–4).",
  },
  {
    glyph: "wreath" as const,
    title: "Inter-denominational",
    sub: "We hold the historic faith of the Church and leave secondary matters to the local body and the conscience.",
  },
  {
    glyph: "eye" as const,
    title: "Reader-respecting",
    sub: "We trust adults to read the Bible. Authentic public-domain translations, clearly labeled.",
  },
  {
    glyph: "shield" as const,
    title: "On-device by default",
    sub: "Your notes, prayers, journal, and walk live on your device — not on our servers.",
  },
  {
    glyph: "globe" as const,
    title: "For every nation",
    sub: "14 translations, 14 UI languages, daily intercession for 127 countries. The whole field is the Lord's.",
  },
];

const NOT = [
  "Not a replacement for the local church. Find a faithful body and join it.",
  "Not a prosperity platform. The Cross stays at the center.",
  "Not anti-tradition. We honor the historic creeds and the saints who came before us.",
  "Not a 'Bible AI' that rewrites Scripture. We use real, published, public-domain translations.",
];

const COMMITMENTS = [
  {
    title: "No AI translation of Scripture",
    body: "Every translation on this site is a real, published, public-domain edition (WEB, KJV, ASV, BBE, YLT, Darby, DRA, RVR1909, Almeida, LSG 1910, Luther 1912, Russian Synodal, CUV 1919, Clementine Vulgate). We will never let a machine paraphrase the Bible into our voice.",
  },
  {
    title: "Real church data only",
    body: "The church finder pulls from OpenStreetMap. We do not invent listings to fill maps.",
  },
  {
    title: "Honest about what we don't know",
    body: "If a passage is contested, we say so. If a translation is from 1611, we say so. If audio failed to load, we say so — and offer device voice instead.",
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="About"
        title="Jesus at the center."
        titleAccent="The Word as our food. The Body as our home."
        intro="Scripture Theory is an inter-denominational, Christ-centered platform built for anyone, anywhere, who wants to walk with Jesus through the Word. We are not a denomination, we do not represent a single church, we do not promote a brand. We try, imperfectly, to point people to the Lord — and to the local Body of believers He has placed near them."
      />

      {/* Why this exists — featured statement card */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="Why this exists"
        title={
          <>
            Billions of people carry a phone.{" "}
            <span className="text-flame-300">Most are still hungry for the Word.</span>
          </>
        }
        sub="Many do not own a Bible, cannot read theirs, or have never been shown how. Many believers love Jesus deeply but feel isolated from a faithful body, or do not know where to begin. We wanted a place — small, honest, free — that meets people where they are and walks them toward where Christ is calling them."
        glyph={<Glyph id="lamp" size={120} />}
        className="mt-12"
      />

      {/* Pillars */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl text-ink-900 mb-5">What we are</h2>
        <Bento>
          {PILLARS.map((p) => (
            <Tile
              key={p.title}
              title={p.title}
              sub={p.sub}
              glyph={<Glyph id={p.glyph} size={48} />}
            />
          ))}
        </Bento>
      </div>

      {/* What we're not */}
      <section className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">What we are not</div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          Four things we'll never become.
        </h2>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3">
          {NOT.map((n) => (
            <li
              key={n}
              className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-card p-4"
            >
              <span className="text-flame-700 mt-0.5">✕</span>
              <span className="text-sm text-ink-700 leading-relaxed">{n}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Editorial commitments */}
      <section className="mt-14">
        <h2 className="font-serif text-2xl text-ink-900 mb-5">Editorial commitments</h2>
        <div className="space-y-3">
          {COMMITMENTS.map((c, i) => (
            <details
              key={c.title}
              className="group rounded-2xl border border-ink-200 bg-card overflow-hidden"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-card-subtle transition-colors">
                <div className="flex items-baseline gap-3">
                  <span className="text-flame-700 text-[10px] uppercase tracking-widest">
                    Commitment {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-ink-900 text-lg">{c.title}</span>
                </div>
                <span className="text-flame-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-ink-700 leading-relaxed">{c.body}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Builders */}
      <section className="mt-14 rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">Who built this</div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          A small group of believers using the tools they have.
        </h2>
        <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">
          For the glory of the One who saved them. We are not perfect. If something on this site
          dishonors Christ or misrepresents His Word, please tell us — we will fix it.
        </p>
      </section>

      {/* Closing — invitation */}
      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.25), transparent 60%), radial-gradient(60% 50% at 50% 100%, rgba(184,66,12,0.18), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug italic">
            "Come to me, all who labor and are heavy laden, and I will give you rest."
          </p>
          <p className="mt-2 text-ink-300">Matthew 11:28 — Jesus</p>
          <p className="mt-6 text-sm text-ink-300 max-w-xl mx-auto leading-relaxed">
            Wherever you are — believer, skeptic, returning, exhausted, hungry, hopeful — Jesus is
            real, He is good, and He loves you. This site is here so you can meet Him in His Word
            and walk with His people. Welcome.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Link
              href="/gospel"
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 transition-colors"
            >
              Read the Gospel →
            </Link>
            <Link
              href="/beliefs"
              className="rounded-full border border-ink-700 text-ink-50 px-5 py-2.5 text-sm hover:border-flame-300 transition-colors"
            >
              What we believe
            </Link>
            <Link
              href="/privacy"
              className="rounded-full border border-ink-700 text-ink-50 px-5 py-2.5 text-sm hover:border-flame-300 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
