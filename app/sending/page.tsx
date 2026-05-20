import Link from "next/link";
import SendingCompass from "@/components/SendingCompass";
import CloudOfWitnesses from "@/components/CloudOfWitnesses";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "Sent — Scripture Theory",
  description:
    "Every believer sent. The Great Commission is not a department of the church — it is the church. This page gathers the platform's sending tools and frames our quiet prayer to see a million ordinary believers carry the gospel to every place on earth.",
};

const FIVE_PHRASES = [
  { label: "All authority",   text: "All authority in heaven and on earth has been given to Me.",                            ref: "Matthew 28:18" },
  { label: "Go",              text: "Go therefore…",                                                                          ref: "Matthew 28:19" },
  { label: "Make disciples",  text: "…and make disciples of all nations…",                                                    ref: "Matthew 28:19" },
  { label: "Baptize",         text: "…baptizing them in the name of the Father and of the Son and of the Holy Spirit…",      ref: "Matthew 28:19" },
  { label: "Teach",           text: "…teaching them to observe all that I have commanded you.",                              ref: "Matthew 28:20" },
];

const SENDING_TOOLS = [
  {
    href: "/witness",
    glyph: "lamp" as const,
    eyebrow: "Step one",
    title: "Tell what you have seen",
    sub: "Every believer is a witness. Read the stories of brothers and sisters around the world, and begin to find your own words for the One you have met.",
  },
  {
    href: "/gospel",
    glyph: "open-book" as const,
    eyebrow: "Step two",
    title: "Know the message you carry",
    sub: "One gospel. Four movements. Walk it slowly until you could share it with a friend over a meal in two minutes.",
  },
  {
    href: "/disciple/journey",
    glyph: "people" as const,
    eyebrow: "Step three",
    title: "Walk with one soul",
    sub: "Name the person you are praying for. Begin where they are. Track the journey from praying-for to reproducing.",
  },
  {
    href: "/pray/nations",
    glyph: "globe" as const,
    eyebrow: "Step four",
    title: "Pray for the nations",
    sub: "One country a day. The whole field is the Lord's; many corners have never been brought before Him by name.",
  },
  {
    href: "/vocation",
    glyph: "key" as const,
    eyebrow: "Step five",
    title: "Discern your sending",
    sub: "Every believer is sent. Some to the workplace, some to a school, some across an ocean. Walk the discernment funnel from general call to particular sending.",
  },
  {
    href: "/connect/claim",
    glyph: "house" as const,
    eyebrow: "Step six",
    title: "Belong to a local body",
    sub: "Lone-wolf evangelism is not the New Testament pattern. The sent believer is sent FROM and BACK TO a local church. Claim or find yours.",
  },
];

const BEGIN_TODAY = [
  "Pray Matthew 28:18-20 over yourself, out loud, before sleep tonight.",
  "Name one person who does not yet know Jesus — by name — and write their name where you will see it.",
  "Read the Gospel in your language until you could tell it in two minutes.",
  "Tell one believer, this week, that you are willing to be sent.",
];

export default function SendingPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="The Great Commission · for every believer"
        title="Sent."
        titleAccent=""
        intro="The Great Commission is not a department of the church — it is the church. Every believer is sent: to a household, a workplace, a neighbour, a nation. This page gathers the tools the platform has built to help an ordinary disciple obey His last words; and beneath it all, our quiet prayer to see one million believers say yes to carrying His name."
        scripture="All authority in heaven and on earth has been given to Me. Go therefore and make disciples of all nations… and behold, I am with you always, to the end of the age."
        scriptureRef="Matthew 28:18-20"
      />

      {/* The figure */}
      <div className="mt-10">
        <SendingCompass />
      </div>

      {/* The Cloud of Witnesses — live registry of yeses */}
      <div className="mt-14">
        <CloudOfWitnesses />
      </div>

      {/* The 1M prayer — internal framing, not a public counter */}
      <section className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%)",
          }}
        />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-300">
              Project 1M · our quiet prayer
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink-50 mt-1 leading-tight">
              One million believers — ordinary, sent.
            </h2>
            <p className="mt-3 text-ink-200 leading-relaxed max-w-2xl">
              We pray for a million. Not a brand. Not a counter on a dashboard. A
              quiet, daily prayer that the Lord of the harvest would send
              labourers into His harvest field — that the platform would be a
              trellis the Spirit uses to raise, equip, send, and support an army
              of ordinary believers who carry Jesus to every place on earth.
            </p>
            <p className="mt-3 text-ink-300 italic text-sm leading-relaxed max-w-2xl">
              We will never count souls publicly. We will never run a leaderboard.
              The Lord knows His own. We are after the obedience of one heart at
              a time — multiplied a million times by the Spirit&apos;s own
              addition.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-flame-300/50 bg-ink-800/60 px-5 py-4 text-center">
            <div className="font-serif text-flame-200 text-5xl md:text-6xl leading-none">
              1M
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-flame-300/80">
              prayed, not measured
            </div>
          </div>
        </div>
      </section>

      {/* The five phrases of the Great Commission, displayed clearly */}
      <section className="mt-14">
        <div className="text-xs uppercase tracking-widest text-flame-700">
          The Great Commission, phrase by phrase
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          Five commands. One promise.
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-3 md:gap-4">
          {FIVE_PHRASES.map((p, i) => (
            <article key={p.label} className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl text-flame-700/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ScriptureRef
                  reference={p.ref}
                  className="text-[10px] uppercase tracking-widest text-flame-700"
                />
              </div>
              <div className="mt-2 font-serif text-lg text-ink-900">{p.label}.</div>
              <p className="mt-2 italic text-ink-700 leading-relaxed">&ldquo;{p.text}&rdquo;</p>
            </article>
          ))}
          {/* The promise that anchors all five */}
          <article className="rounded-3xl bg-flame-600 text-ink-50 p-5 md:p-6">
            <div className="text-[10px] uppercase tracking-widest text-flame-100/80">
              The promise
            </div>
            <div className="mt-2 font-serif text-lg">And He said:</div>
            <p className="mt-2 font-serif text-2xl leading-snug">
              &ldquo;I am with you always, to the end of the age.&rdquo;
            </p>
            <p className="mt-1 text-flame-100/90 text-xs">— Matthew 28:20</p>
          </article>
        </div>
      </section>

      {/* The six sending tools, sequenced as steps */}
      <section className="mt-14">
        <div className="text-xs uppercase tracking-widest text-flame-700">
          Six steps · the platform&apos;s sending tools
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          A trellis for the sent life.
        </h2>
        <p className="mt-2 text-sm text-ink-600 italic max-w-2xl">
          You do not need to do all six at once. Open one this week. The Spirit
          grows in you what He intends to grow.
        </p>
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {SENDING_TOOLS.map((t) => (
            <li key={t.href}>
              <Tile
                href={t.href}
                eyebrow={t.eyebrow}
                title={t.title}
                sub={t.sub}
                glyph={<Glyph id={t.glyph} size={48} />}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* How to begin — concrete and small */}
      <section className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">Begin today</div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          Four small steps, before sleep tonight.
        </h2>
        <ol className="mt-5 space-y-2.5 list-decimal pl-5">
          {BEGIN_TODAY.map((s) => (
            <li key={s} className="text-ink-800 leading-relaxed">
              {s}
            </li>
          ))}
        </ol>
      </section>

      {/* A covenant prayer the reader can pray right now */}
      <section className="mt-14 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">A prayer to say yes</div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          The sending begins in the heart.
        </h2>
        <p className="mt-3 text-ink-800 leading-relaxed italic">
          &ldquo;Lord Jesus, I am Yours. The earth is Yours, and everyone in it.
          You said You would be with me always. Make me a witness — to my
          household, my street, my city, and to whatever nation You name. Send
          me where I will go and where I would rather not. Make me brave with
          Your name and gentle with Your people. Number me with the labourers
          You are raising for the harvest. In Your name, Amen.&rdquo;
        </p>
        <p className="mt-3 text-[11px] text-ink-500 italic">
          Pray it slowly. Pray it aloud. Pray it whether or not you feel ready —
          He sends the unready and goes with them (Exodus 3:11-12, Jeremiah
          1:6-9).
        </p>
      </section>

      {/* Closing — the end of the story */}
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
            &ldquo;After these things I looked, and behold, a great multitude,
            which no man could count, out of every nation and of all tribes,
            peoples, and languages, standing before the throne and before the
            Lamb… crying with a loud voice: &lsquo;Salvation be to our God who
            sits on the throne, and to the Lamb!&rsquo;&rdquo;
          </p>
          <p className="mt-2 text-ink-300">— Revelation 7:9-10</p>
          <p className="mt-5 text-flame-300 italic text-sm">
            The end of the story is already written. The going is the part He
            has left to us.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/witness" className="text-sm text-flame-700 hover:underline">
          Read testimonies of those already sent →
        </Link>
      </div>
    </section>
  );
}
