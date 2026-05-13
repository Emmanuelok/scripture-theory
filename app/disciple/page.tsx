import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";
import PathTracker from "@/components/PathTracker";

export const metadata = {
  title: "The Path — Scripture Theory",
  description:
    "A 12-stage discipleship journey from first encounter with JESUS to mature, reproducing disciples — measurable, scriptural, and explicitly local-church-bound. Track your walk, stage by stage.",
};

const DISTINCTIVES = [
  {
    glyph: "compass" as const,
    title: "Measurable",
    sub: "Every stage has an observable sign — not a quiz score, not a streak. Did baptism happen? Did the conversation happen?",
  },
  {
    glyph: "people" as const,
    title: "Embodied",
    sub: "Stages 3, 7, 8, 11, 12 cannot be completed alone or online. The Christian life is lived face to face.",
  },
  {
    glyph: "house" as const,
    title: "Local-church first",
    sub: "A real pastor confirms stage 3 and stage 7. We never do — the platform exists under, not over, the local body.",
  },
  {
    glyph: "wreath" as const,
    title: "Inter-denominational",
    sub: "Each stage offers expressions from multiple faithful traditions. The Lord is one; His Body is wider than any tribe.",
  },
];

export default function DisciplePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="The Path"
        title="A twelve-stage"
        titleAccent="discipleship journey."
        intro="Most apps deliver content. Disciples need a path. Pastors say discipleship is a priority, yet only about half have an intentional plan. The Path closes that gap with a measurable, scriptural progression — and it is explicitly designed to hand each disciple off to a local pastor, not to keep them in our app."
      />

      <Tile
        size="wide"
        tone="dark"
        eyebrow="Your private record"
        title={
          <>
            Track the souls you're praying for —{" "}
            <span className="text-flame-300">and the Kingdom multiplies.</span>
          </>
        }
        sub="Add a name. Log what happened today. Watch one person move from praying-for to baptized to discipling someone else (2 Timothy 2:2). On-device, never shared."
        glyph={<Glyph id="people" size={120} />}
        href="/disciple/journey"
        className="mt-12"
      />

      {/* Interactive tracker — current stage, progress, mark complete, notes */}
      <div className="mt-14">
        <PathTracker />
      </div>

      {/* How The Path is different */}
      <div className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            How The Path is different
          </h2>
          <p className="text-sm text-ink-500 italic">No app finishes a disciple. Only Christ does.</p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {DISTINCTIVES.map((d) => (
            <li key={d.title}>
              <Tile title={d.title} sub={d.sub} glyph={<Glyph id={d.glyph} size={48} />} />
            </li>
          ))}
        </ul>
      </div>

      <Tile
        size="wide"
        tone="flame"
        eyebrow="One Body"
        title="Find a faithful local church near you."
        sub="The Path cannot finish without a local pastor's hand. Three short questions and we'll surface real congregations near you, anywhere on earth — from OpenStreetMap, never fabricated."
        glyph={<Glyph id="house" size={120} />}
        href="/connect"
        className="mt-14"
      />

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
            "The things which you have heard from me among many witnesses, commit to faithful
            people who will be able to teach others also."
          </p>
          <p className="mt-2 text-ink-300">2 Timothy 2:2</p>
        </div>
      </div>
    </section>
  );
}
