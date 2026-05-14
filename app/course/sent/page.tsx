import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Sent — Foundations of the Faith — Scripture Theory",
  description:
    "You finished Foundations of the Faith. Here are the next concrete steps: walk The Path, disciple another, find a faithful church, hold the long obedience.",
};

const NEXT_PATHS = [
  {
    glyph: "path" as const,
    href: "/disciple",
    title: "Walk The Path",
    sub: "Twelve stages from first encounter to reproducing disciple. The course was the on-ramp; The Path is the road.",
  },
  {
    glyph: "people" as const,
    href: "/disciple/journey",
    title: "Disciple one person",
    sub: "Find one believer (new or hungry) and walk Foundations alongside them. 2 Timothy 2:2 — entrust what you have learned to faithful people who will teach others.",
  },
  {
    glyph: "house" as const,
    href: "/connect",
    title: "Plant in a local church",
    sub: "Find or commit to a faithful local body — for life. The course cannot replace this. Nothing can.",
  },
  {
    glyph: "door" as const,
    href: "/secret-place",
    title: "Keep the Secret Place",
    sub: "The daily walking habit you built in twelve weeks is now yours. Keep the door open every day.",
  },
  {
    glyph: "open-book" as const,
    href: "/read",
    title: "A longer reading plan",
    sub: "Start the New Testament in 90 days, the Psalms in 30, or build your own. The Word stays open for the rest of your life.",
  },
  {
    glyph: "memory" as const,
    href: "/memory",
    title: "Keep memorizing",
    sub: "You memorized 12 verses through the course. Keep going — the verses you hide today are the words God will give you tomorrow.",
  },
  {
    glyph: "rule" as const,
    href: "/rule",
    title: "Set a Rule of Life",
    sub: "A trellis for the vine. Pick the small disciplines you'll carry — daily, weekly, monthly — and live them.",
  },
  {
    glyph: "lamp" as const,
    href: "/witness",
    title: "Tell one person",
    sub: "You have a story now. Tell it. Most people come to Jesus through one ordinary friend.",
  },
];

export default function CourseSentPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link
        href="/course"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Course
      </Link>

      <PageHero
        eyebrow="Sent"
        title="The course is finished."
        titleAccent="The walk is for life."
        intro="Twelve weeks ago you began. The Father has done a real work in you. Now He sends you — not to a stage, but to a long obedience. Eight concrete next steps. Pick one and start today."
        scripture="As the Father has sent Me, I am sending you."
        scriptureRef="John 20:21"
      />

      <Tile
        size="wide"
        tone="dark"
        eyebrow="Three things from here"
        title={
          <>
            Be faithful · stay together ·{" "}
            <span className="text-flame-300">hand it on.</span>
          </>
        }
        sub="Faithful in small obediences nobody sees. Stay together — a faithful local body, week by week, in person. Hand it on — disciple one other believer, who disciples another. That is how the gospel has moved from Jerusalem to your living room. Now you carry it forward."
        glyph={<Glyph id="wreath" size={120} />}
        className="mt-12"
      />

      <div className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          Concrete next steps
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {NEXT_PATHS.map((p) => (
            <li key={p.href}>
              <Tile
                href={p.href}
                title={p.title}
                sub={p.sub}
                glyph={<Glyph id={p.glyph} size={48} />}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-4">
        <Tile
          href="/course/certificate"
          tone="flame"
          eyebrow="Your record"
          title="Your certificate"
          sub="Print it. Frame it. Show your spouse. It is a small thing; it is a real thing."
          glyph={<Glyph id="wreath" size={48} />}
        />
        <Tile
          href="/course/lead"
          eyebrow="Lead a group"
          title="Run Foundations for others"
          sub="Pastor, small-group leader, or family head — here's how to lead a cohort through the course."
          glyph={<Glyph id="people" size={48} />}
        />
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12 text-center relative overflow-hidden">
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
            "Now to Him who is able to keep you from stumbling, and to present you faultless
            before the presence of His glory with great joy — to God our Savior, through Jesus
            Christ our Lord, be glory and majesty, dominion and power, both now and forever. Amen."
          </p>
          <p className="mt-3 text-ink-300">Jude 24–25</p>
          <p className="mt-7 text-sm text-ink-300 max-w-xl mx-auto leading-relaxed">
            Go, beloved. The Father is with you. The Son walks ahead of you. The Spirit is in you.
            And we are praying for you here, until we see Him face to face.
          </p>
        </div>
      </div>
    </section>
  );
}
