import Link from "next/link";
import { PageHero } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Day one — Scripture Theory",
  description:
    "You said yes. Here is one small, ordinary path for the first week of carrying His name — read, pray, find a body, and tell one person.",
};

type Step = {
  n: number;
  eyebrow: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  scripture?: { ref: string; text: string };
  glyph:
    | "open-book"
    | "house"
    | "hands"
    | "people"
    | "lamp"
    | "cross"
    | "flame"
    | "globe";
};

const STEPS: Step[] = [
  {
    n: 1,
    eyebrow: "Begin where He began",
    title: "Open John 1.",
    body:
      "The first chapter that introduced you to Jesus — read it again, slowly, today. Not to learn it; to listen for His voice. Underline what surprises you. Pray one line back to Him before you close the chapter.",
    cta: { href: "/bible/john/1", label: "Read John 1 →" },
    scripture: {
      ref: "John 1:14",
      text: "The Word became flesh and dwelt among us, and we have seen His glory…",
    },
    glyph: "open-book",
  },
  {
    n: 2,
    eyebrow: "Find a body",
    title: "Belong to a local church.",
    body:
      "Lone-wolf discipleship is not the New Testament pattern. You are sent FROM and BACK TO a real, local body — a pastor who knows your face, brothers and sisters who will pray when you cannot. Find one, claim one, walk in.",
    cta: { href: "/connect", label: "Find your church →" },
    scripture: {
      ref: "Hebrews 10:24-25",
      text: "Let us consider how to stir one another up… not neglecting to meet together…",
    },
    glyph: "house",
  },
  {
    n: 3,
    eyebrow: "Carry a name",
    title: "Name one person.",
    body:
      "Write down — on paper, in a note, somewhere you will see it — the name of one person you long to know Jesus. Don't strategise. Pray for them by name every day this week. Watch how the Father moves.",
    cta: { href: "/pray/wall", label: "Take a request to the Father →" },
    scripture: {
      ref: "1 Timothy 2:1",
      text: "First of all… that supplications, prayers, intercessions, and thanksgivings be made for all people.",
    },
    glyph: "hands",
  },
  {
    n: 4,
    eyebrow: "Daily rhythm",
    title: "Walk a slow week.",
    body:
      "Open /today every morning — a Psalm, a chapter, a one-paragraph devotional, the Lord's Prayer. You don't have to be a theologian. You have to be a listener. Build a rhythm small enough that you keep it on the hard days.",
    cta: { href: "/today", label: "Today's reading →" },
    scripture: {
      ref: "Psalm 1:2",
      text: "His delight is in the law of the Lord, and on His law he meditates day and night.",
    },
    glyph: "lamp",
  },
  {
    n: 5,
    eyebrow: "Speak it out loud",
    title: "Tell one believer you said yes.",
    body:
      "Find one Christian — a friend, a pastor, an old youth-group leader, anyone — and tell them: \"I told the Lord I'm willing to be sent.\" Saying it out loud to another believer is how the Spirit anchors it in your life. Let them pray with you.",
    cta: { href: "/witness", label: "Read others' stories →" },
    scripture: {
      ref: "Romans 10:9",
      text: "If you confess with your mouth that Jesus is Lord… you will be saved.",
    },
    glyph: "people",
  },
  {
    n: 6,
    eyebrow: "Equip slowly",
    title: "Learn the foundations.",
    body:
      "Don't rush to be a teacher. Spend twelve weeks on the basic doctrines: who God is, who Jesus is, what the Spirit does, what the Gospel is, why the Body is, where it ends. The Foundations of the Faith course is free; pace it kindly.",
    cta: { href: "/course", label: "Foundations · 12 weeks →" },
    scripture: {
      ref: "2 Timothy 2:2",
      text: "What you have heard from me… entrust to faithful men who will be able to teach others also.",
    },
    glyph: "cross",
  },
];

export default function SendingBeginPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/sending"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Sent
      </Link>

      <div className="mt-3">
        <PageHero
          eyebrow="Day one of your sending"
          title="You said yes."
          titleAccent="Now walk slowly."
          intro={
            "The Lord does not need you to be impressive. He needs you to be His. Here is a small, ordinary, week-long path: read, pray, find a body, name a person, tell a believer. Six steps. No timer. He is patient."
          }
          scripture="The one who began a good work in you will bring it to completion at the day of Jesus Christ."
          scriptureRef="Philippians 1:6"
        />
      </div>

      <ol className="mt-12 space-y-6">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-start gap-5">
              <div
                aria-hidden
                className="shrink-0 rounded-2xl border border-flame-300 bg-flame-50 p-3 text-flame-700"
              >
                <Glyph id={s.glyph} size={48} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-flame-700">
                  <span className="rounded-full bg-flame-100 px-2 py-0.5 text-flame-800 font-mono">
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <span>{s.eyebrow}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1 leading-tight">
                  {s.title}
                </h2>
                <p className="mt-3 text-ink-700 leading-relaxed">{s.body}</p>

                {s.scripture && (
                  <blockquote className="mt-4 rounded-2xl border-l-2 border-flame-400 bg-card-subtle p-3 text-sm text-ink-800 italic leading-relaxed">
                    &ldquo;{s.scripture.text}&rdquo;
                    <div className="mt-1 not-italic text-[11px] uppercase tracking-widest text-flame-700">
                      {s.scripture.ref}
                    </div>
                  </blockquote>
                )}

                <div className="mt-5">
                  <Link
                    href={s.cta.href}
                    className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
                  >
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
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
            &ldquo;And behold, I am with you always, to the end of the age.&rdquo;
          </p>
          <p className="mt-2 text-ink-300">Matthew 28:20 — Jesus</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/sending#wall"
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
            >
              See the Wall of Yeses →
            </Link>
            <Link
              href="/witness/share"
              className="inline-flex items-center rounded-full border border-ink-700 text-ink-50 px-5 py-2.5 text-sm hover:border-flame-300"
            >
              Tell your story
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
