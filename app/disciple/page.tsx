import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph, type GlyphId } from "@/components/ui/Glyph";

export const metadata = {
  title: "The Path — Scripture Theory",
  description:
    "A 12-stage discipleship journey from first encounter with JESUS to mature, reproducing disciples — measurable, scriptural, and explicitly local-church-bound.",
};

type Stage = {
  stage: number;
  name: string;
  scripture: string;
  focus: string;
  glyph: GlyphId;
  /** "alone" stages can be done solo; "body" stages require the local church */
  kind: "alone" | "body";
};

const STAGES: Stage[] = [
  { stage: 1, name: "Encounter", scripture: "John 4:1–42", focus: "First meeting with Jesus, the Living Water.", glyph: "wave", kind: "alone" },
  { stage: 2, name: "Repent & Believe", scripture: "Mark 1:14–15", focus: "Turning from self-rule, trusting the King.", glyph: "key", kind: "alone" },
  { stage: 3, name: "Confess & Baptize", scripture: "Romans 10:9–10 · Matt. 28:19", focus: "Public confession; baptism in your local church.", glyph: "chalice", kind: "body" },
  { stage: 4, name: "Receive the Spirit", scripture: "Acts 2:38–39", focus: "Welcoming the Spirit's presence and power.", glyph: "dove", kind: "alone" },
  { stage: 5, name: "Learn the Story", scripture: "Luke 24:27", focus: "Read the whole Bible as one story centered on Christ.", glyph: "open-book", kind: "alone" },
  { stage: 6, name: "Pray & Fast", scripture: "Matt. 6:5–18", focus: "Daily life with the Father in secret.", glyph: "door", kind: "alone" },
  { stage: 7, name: "Belong", scripture: "Acts 2:42–47", focus: "A committed local church and a small community.", glyph: "house", kind: "body" },
  { stage: 8, name: "Forgive & Reconcile", scripture: "Matt. 5:21–26 · 18:15–22", focus: "Healing relationships; refusing bitterness.", glyph: "forgive", kind: "body" },
  { stage: 9, name: "Steward", scripture: "Luke 16:10–13", focus: "Money, time, work, and gifts under His Lordship.", glyph: "rule", kind: "alone" },
  { stage: 10, name: "Suffer Well", scripture: "1 Peter 4:12–19", focus: "Joy in trial; cross-shaped obedience.", glyph: "cross", kind: "alone" },
  { stage: 11, name: "Witness", scripture: "Acts 1:8", focus: "Telling your story, sharing the gospel where you live.", glyph: "lamp", kind: "body" },
  { stage: 12, name: "Reproduce", scripture: "2 Tim. 2:2", focus: "Discipling one person who disciples another.", glyph: "path", kind: "body" },
];

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

      {/* Featured: open journey tracker */}
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

      {/* Stat strip */}
      <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
        <StatCard number="12" label="Scriptural stages, from first encounter to reproducer" />
        <StatCard number="5+" label="Inter-denominational expressions per stage" />
        <StatCard number="0" label="Stages completed without a real local pastor's hand" />
      </div>

      {/* Twelve stages — visual timeline */}
      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">The twelve stages</h2>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-ink-500">
              <span className="h-2 w-2 rounded-full bg-ink-400" /> Alone with Him
            </span>
            <span className="inline-flex items-center gap-1.5 text-flame-700">
              <span className="h-2 w-2 rounded-full bg-flame-600" /> With the Body
            </span>
          </div>
        </div>

        <ol className="relative space-y-4">
          {/* Vertical timeline line, hidden on small screens */}
          <span
            aria-hidden
            className="hidden md:block absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-flame-300 via-flame-500/40 to-ink-200"
          />

          {STAGES.map((s) => (
            <li key={s.stage} className="relative">
              <div className="group relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border border-ink-200 bg-card p-5 md:p-6 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all overflow-hidden">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
                />
                {/* Stage badge */}
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div
                    className={[
                      "w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center font-serif text-2xl md:text-3xl tracking-tight transition-colors",
                      s.kind === "body"
                        ? "border-flame-500 bg-gradient-to-br from-flame-50 to-flame-100 text-flame-700"
                        : "border-ink-200 bg-card-subtle text-ink-700",
                    ].join(" ")}
                  >
                    {String(s.stage).padStart(2, "0")}
                  </div>
                  <span
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      s.kind === "body" ? "bg-flame-600" : "bg-ink-400",
                    ].join(" ")}
                  />
                </div>

                <div className="relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl md:text-2xl text-ink-900 group-hover:text-flame-700 transition-colors">
                      {s.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-flame-700">
                      {s.scripture}
                    </span>
                  </div>
                  <p className="mt-1.5 text-ink-700 leading-relaxed text-sm md:text-base">
                    {s.focus}
                  </p>
                </div>

                <Glyph
                  id={s.glyph}
                  size={56}
                  className="absolute right-4 bottom-4 text-flame-700/15 group-hover:text-flame-700/40 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500"
                />
              </div>
            </li>
          ))}
        </ol>
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

      {/* CTA to Connect */}
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

      {/* Closing scripture */}
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

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-card p-4 md:p-5">
      <div className="font-serif text-4xl md:text-5xl text-flame-700">{number}</div>
      <div className="mt-1 text-xs text-ink-600 leading-snug">{label}</div>
    </div>
  );
}
