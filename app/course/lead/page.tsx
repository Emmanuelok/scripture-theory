import Link from "next/link";
import { COURSE_WEEKS } from "@/data/course";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Lead a group — Foundations of the Faith — Scripture Theory",
  description:
    "Practical guidance for pastors, small-group leaders, and family heads running Foundations of the Faith with a cohort.",
};

const PRINCIPLES = [
  {
    glyph: "hands" as const,
    title: "You are not the teacher",
    sub: "The Spirit is. You are a fellow walker. Read the lesson before everyone else, ask honest questions, and let the Spirit do the depth-work.",
  },
  {
    glyph: "hours" as const,
    title: "Ninety minutes is the sweet spot",
    sub: "Open with prayer (5). Group discussion of the lesson (30). Walk through the discussion questions (40). Close with prayer for one another by name (15).",
  },
  {
    glyph: "people" as const,
    title: "Five to eight is the right size",
    sub: "Smaller, people stay quiet. Larger, people stay hidden. Five to eight forces honesty and lets every voice find air.",
  },
  {
    glyph: "lamp" as const,
    title: "Be known by your group",
    sub: "Don't hide behind the lesson plan. Share your own answers to the reflection questions before asking theirs. Vulnerability moves first.",
  },
  {
    glyph: "wreath" as const,
    title: "Honor traditions",
    sub: "On Weeks 7 (Spirit & gifts) and 9 (baptism & Lord's Supper) you'll have voices from different traditions in the room. Honor them. Don't arbitrate. Read the multi-tradition voices in the lesson aloud.",
  },
  {
    glyph: "house" as const,
    title: "Send to a faithful pastor",
    sub: "The course cannot replace a local pastor. If anyone in your group needs baptism, marriage counsel, or hard pastoral care, walk them to a faithful pastor in their city. Use /connect.",
  },
];

const TIMELINE = [
  {
    step: "Before week 1",
    label: "Recruit + commit",
    body: "Tell 5–10 people. Set a meeting time and place. Ask each person to commit verbally to walking the twelve weeks with you.",
  },
  {
    step: "Week 0 (kickoff)",
    label: "Cast the vision",
    body: "Gather the group. Read the pastoral letter from /course/begin together. Each person picks their pace. Pray together. Distribute the schedule.",
  },
  {
    step: "Each week",
    label: "The rhythm",
    body: "Members walk the daily readings + lesson on their own through the week. The group meets once (live or virtual) to discuss. Quiz is private; do it at home before the next gathering.",
  },
  {
    step: "Week 7 + Week 9",
    label: "Tender weeks",
    body: "These two weeks touch where Christians have differed for centuries. Read the multi-tradition voices in the lesson aloud as a group. Honor the family conversation.",
  },
  {
    step: "Week 12",
    label: "Send well",
    body: "Each person names the one discipline they're carrying forward. Pray a blessing over each by name, citing Philippians 1:6. Encourage everyone to take the final exam at home and to print their certificate.",
  },
  {
    step: "After",
    label: "Hand it on",
    body: "Encourage each member to recruit and lead a Foundations group themselves within twelve months. 2 Timothy 2:2 — entrust to faithful people who will teach others.",
  },
];

export default function CourseLeadPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link
        href="/course"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Foundations
      </Link>

      <PageHero
        eyebrow="For pastors, small-group leaders, family heads"
        title="Lead a Foundations"
        titleAccent="cohort."
        intro="The course works alone, but it shines in a group. Five to eight believers walking twelve weeks together — at a kitchen table, in a living room, around a campfire, on Zoom — change. Here is everything we have learned about leading one."
        scripture="What you have heard from me in the presence of many witnesses entrust to faithful people who will be able to teach others also."
        scriptureRef="2 Timothy 2:2"
      />

      <Tile
        size="wide"
        tone="dark"
        eyebrow="The point"
        title={
          <>
            You are not handing out content. You are making{" "}
            <span className="text-flame-300">disciples who will make disciples.</span>
          </>
        }
        sub="The course's job is to plant. Your job is to soak the soil with love, prayer, honesty, and your own walking ahead. Six weeks in, your group should already be asking, 'who could I lead next?'"
        glyph={<Glyph id="path" size={120} />}
        className="mt-12"
      />

      {/* Principles */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          Six principles for the leader
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {PRINCIPLES.map((p) => (
            <li key={p.title}>
              <Tile title={p.title} sub={p.sub} glyph={<Glyph id={p.glyph} size={48} />} />
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          The shape of a cohort
        </h2>
        <ol className="relative space-y-4">
          <span
            aria-hidden
            className="hidden md:block absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-flame-300 via-flame-500/40 to-ink-200"
          />
          {TIMELINE.map((t, i) => (
            <li key={i}>
              <article className="relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-flame-500 bg-gradient-to-br from-flame-50 to-flame-100 flex items-center justify-center font-serif text-base text-flame-700 text-center px-1 leading-tight">
                    {t.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-ink-900">{t.label}</h3>
                  <p className="mt-1.5 text-ink-700 leading-relaxed text-sm md:text-base">
                    {t.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>

      {/* Per-week facilitator notes (collect from data) */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          Per-week leader notes
        </h2>
        <p className="text-sm text-ink-600 italic mb-5">
          Only the weeks where we've written specific guidance. The rest of the weeks, the
          discussion questions in the lesson are your spine.
        </p>
        <ul className="space-y-3">
          {COURSE_WEEKS.filter(
            (w) => w.facilitatorNotes && w.facilitatorNotes.length > 0
          ).map((w) => (
            <li key={w.week}>
              <article className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      Week {w.week}
                    </div>
                    <h3 className="font-serif text-xl text-ink-900 mt-0.5">{w.title}</h3>
                  </div>
                  <Link
                    href={`/course/week/${w.week}`}
                    className="text-xs text-flame-700 hover:underline"
                  >
                    Open week →
                  </Link>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-ink-700 leading-relaxed">
                  {w.facilitatorNotes!.map((n, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-flame-700 shrink-0">·</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div className="mt-14 grid md:grid-cols-3 gap-4">
        <Tile
          href="/cohort"
          eyebrow="Walk it together"
          title="Start a cohort →"
          sub="Create a six-letter code. Your group joins, walks, and a shared prayer thread carries them through twelve weeks."
          glyph={<Glyph id="people" size={48} />}
        />
        <Tile
          href="/course"
          eyebrow="The course itself"
          title="Open Foundations"
          sub="Twelve weeks, all content. Walk it ahead of your group."
          glyph={<Glyph id="open-book" size={48} />}
        />
        <Tile
          href="/course/memory"
          eyebrow="Twelve verses"
          title="Memory verses"
          sub="The twelve verses the course plants in every walker."
          glyph={<Glyph id="memory" size={48} />}
        />
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
            "Shepherd the flock of God that is among you… not domineering… but being examples to
            the flock."
          </p>
          <p className="mt-2 text-ink-300">1 Peter 5:2–3</p>
        </div>
      </div>
    </section>
  );
}
