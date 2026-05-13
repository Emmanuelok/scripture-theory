import NewBelieverPath from "@/components/NewBelieverPath";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Just said yes to Jesus? — Scripture Theory",
  description:
    "A concrete, 30-day pathway for new believers — and for anyone returning to Christ. One short Scripture, one short reflection, one small step every day.",
};

const NEXT_STEPS = [
  {
    glyph: "open-book" as const,
    href: "/read",
    title: "A longer reading plan",
    sub: "The 90-day New Testament or a Psalms year — pick what fits.",
  },
  {
    glyph: "door" as const,
    href: "/secret-place",
    title: "My Secret Place",
    sub: "A private journal of what the Lord is teaching you — Matthew 6:6.",
  },
  {
    glyph: "people" as const,
    href: "/disciple/journey",
    title: "Discipleship Journey",
    sub: "Track the souls you're walking with toward Christ.",
  },
  {
    glyph: "memory" as const,
    href: "/memory",
    title: "Scripture Memory",
    sub: "One verse a week, hidden in your heart for the rest of your life.",
  },
];

export default function NewBelieverPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="First 30 Days"
        title="Just said yes to Jesus?"
        titleAccent="Welcome home."
        intro="Whether you trusted Christ today, last week, or you are coming back to Him after years away — this page is for you. The next 30 days are a small, concrete pathway: one short Scripture, one short reflection, one small step. Five minutes a day. Nothing to log into. Nothing to pay for. Your progress is saved on this device only."
      />

      <Tile
        size="wide"
        tone="dark"
        eyebrow="Why you're here"
        title={
          <>
            "I came that they may have life, and have it{" "}
            <span className="text-flame-300">abundantly.</span>"
          </>
        }
        sub="The Father is not far. The Spirit is not silent. The Son is not ashamed of you. Take the first day."
        glyph={<Glyph id="lamp" size={120} />}
        className="mt-12"
      />

      <div className="mt-12">
        <NewBelieverPath />
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">After Day 30 — what next?</h2>
          <p className="text-sm text-ink-500 italic">Four small rooms.</p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {NEXT_STEPS.map((s) => (
            <li key={s.href}>
              <Tile
                href={s.href}
                title={s.title}
                sub={s.sub}
                glyph={<Glyph id={s.glyph} size={48} />}
              />
            </li>
          ))}
        </ul>
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
            "Behold, I am with you always, to the end of the age."
          </p>
          <p className="mt-2 text-ink-300">Matthew 28:20 — Jesus</p>
        </div>
      </div>
    </section>
  );
}
