import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import LiveTiles from "@/components/LiveTiles";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <LiveTiles />

      {/* The ONE Gospel — single, calm, beautiful */}
      <section className="mx-auto max-w-3xl px-5 py-24 md:py-32 text-center">
        <span className="text-xs uppercase tracking-widest text-flame-700">
          1 Corinthians 15:3–8
        </span>
        <p className="mt-5 font-serif text-2xl md:text-4xl text-ink-900 leading-snug">
          Christ died for our sins.<br />
          He was buried.<br />
          He rose on the third day.<br />
          He was seen.<br />
          <span className="gradient-text">He is alive. He is Lord.</span>
        </p>
        <Link
          href="/gospel"
          className="mt-10 inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-6 py-3 text-sm font-medium hover:bg-flame-700 transition-colors"
        >
          Read the Gospel →
        </Link>
      </section>

      {/* What's inside — six tiles, no walls of text */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Tile href="/bible" eyebrow="11 translations" title="The Bible" sub="WEB · KJV · ASV · RVR · LSG · CUV · Vulgate · and more" />
          <Tile href="/memory" eyebrow="36 verses" title="Scripture Memory" sub="Read · First letters · Blanks · Recite" />
          <Tile href="/pray/nations" eyebrow="110-day rotation" title="Praying for the Nations" sub="One country, one flag, every day" />
          <Tile href="/today" eyebrow="Personal" title="Today" sub="Your verse, your nation, your people, your rhythm" />
          <Tile href="/disciple" eyebrow="12 stages" title="The Path" sub="From first encounter to reproducing disciple" />
          <Tile href="/connect" eyebrow="11 traditions" title="One Body" sub="Find a real local church near you" />
        </div>
      </section>

      {/* Single, quiet closing */}
      <section className="mx-auto max-w-3xl px-5 pb-24 text-center">
        <p className="font-serif text-xl md:text-2xl text-ink-700 italic">
          "And I, when I am lifted up from the earth, will draw all people to myself."
        </p>
        <p className="mt-2 text-sm text-ink-500">John 12:32 — Jesus</p>
      </section>
    </>
  );
}

function Tile({
  href,
  eyebrow,
  title,
  sub,
}: {
  href: string;
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-ink-200 bg-card p-5 hover:border-flame-500 hover:shadow-md transition-all"
    >
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{eyebrow}</div>
      <div className="font-serif text-xl text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
        {title}
      </div>
      <div className="text-xs text-ink-500 mt-1.5 leading-snug">{sub}</div>
      <div className="mt-3 text-xs text-ink-400 group-hover:text-flame-700 transition-colors">→</div>
    </Link>
  );
}
