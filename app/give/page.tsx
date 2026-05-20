import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Support the work — Scripture Theory",
  description:
    "Scripture Theory is free and ad-free. If the Lord nudges you to support the work, here is how. Every dollar goes to keeping the lights on, paying contributors honestly, and reaching more nations.",
};

// Links come from env vars so deployments can wire any payment provider —
// Stripe Payment Link, Ko-fi, Patreon, GoFundMe, etc. — without code changes.
// Set in Vercel: NEXT_PUBLIC_GIVE_ONCE_URL, NEXT_PUBLIC_GIVE_MONTHLY_URL.
const GIVE_ONCE_URL = process.env.NEXT_PUBLIC_GIVE_ONCE_URL ?? "";
const GIVE_MONTHLY_URL = process.env.NEXT_PUBLIC_GIVE_MONTHLY_URL ?? "";

const USES = [
  {
    glyph: "globe" as const,
    title: "Hosting & infrastructure",
    sub: "Bandwidth, edge servers, the Bible API mirror, the church-finder data fees. Every chapter served around the world costs something.",
  },
  {
    glyph: "open-book" as const,
    title: "Translation & content",
    sub: "Paying believers to translate UI strings into their mother tongue, write devotionals, and check doctrine.",
  },
  {
    glyph: "people" as const,
    title: "Reaching the unreached",
    sub: "Translations for languages with no Bible-reading app. Audio for the non-readers. Partnerships with national pastors.",
  },
  {
    glyph: "shield" as const,
    title: "Independence",
    sub: "No ads, no data sales, no tracker SDKs, ever. Your gift keeps it that way.",
  },
];

const NEVERS = [
  "We will never sell your data, even if asked. There is nothing to sell — the platform stores almost nothing on our servers.",
  "We will never run advertising on Scripture-adjacent pages, or anywhere else.",
  "We will never bundle a 'premium tier' that gates the Bible, prayer, or any practice. The gospel is free; so is this.",
  "We will never lobby, endorse politicians, or align the platform with a political party.",
];

export default function GivePage() {
  const isConfigured = Boolean(GIVE_ONCE_URL || GIVE_MONTHLY_URL);
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Support the work"
        title="The gospel is free."
        titleAccent="So is this. Forever."
        intro="Scripture Theory takes no ad money. It sells no data. There is no paid tier — the Bible, the Daily Office, the Secret Place, the Prayer Wall, and the pastor handoff are free to every believer on earth. If the Lord nudges you to help us keep it that way, this page is for you."
        scripture="Freely you have received; freely give."
        scriptureRef="Matthew 10:8"
      />

      {/* Featured CTA */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="One-time or monthly"
        title={
          <>
            Every gift goes to keeping the lights on —{" "}
            <span className="text-flame-300">and reaching one more nation.</span>
          </>
        }
        sub="We're a small team. Your gift, however small, is a direct line to whether we can serve the next translation, pay the next contributor, or send the next intro to a pastor across an ocean."
        glyph={<Glyph id="hands" size={120} />}
        className="mt-12"
      >
        {isConfigured ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {GIVE_ONCE_URL && (
              <a
                href={GIVE_ONCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
              >
                Give once →
              </a>
            )}
            {GIVE_MONTHLY_URL && (
              <a
                href={GIVE_MONTHLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-ink-700 text-ink-50 px-5 py-2.5 text-sm hover:border-flame-300"
              >
                Give monthly →
              </a>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-ink-700/60 bg-ink-800/40 p-4 text-sm text-ink-300 leading-relaxed">
            <div className="text-[10px] uppercase tracking-widest text-flame-300 mb-1">
              Setup pending
            </div>
            Payment endpoints aren't configured yet. Set{" "}
            <code className="rounded bg-ink-900 px-1.5 py-0.5 text-flame-200">NEXT_PUBLIC_GIVE_ONCE_URL</code>
            {" "}and{" "}
            <code className="rounded bg-ink-900 px-1.5 py-0.5 text-flame-200">NEXT_PUBLIC_GIVE_MONTHLY_URL</code>
            {" "}in Vercel environment variables (Stripe Payment Link, Ko-fi, Patreon, etc.) and these
            buttons will appear automatically — no code changes needed.
          </div>
        )}
      </Tile>

      {/* Where the money goes */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          Where the money goes
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {USES.map((u) => (
            <li key={u.title}>
              <Tile title={u.title} sub={u.sub} glyph={<Glyph id={u.glyph} size={48} />} />
            </li>
          ))}
        </ul>
      </div>

      {/* What we'll never do */}
      <section className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">Never, by covenant</div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          What your gift buys us out of.
        </h2>
        <ul className="mt-5 space-y-2.5">
          {NEVERS.map((n) => (
            <li key={n} className="flex items-start gap-3 text-sm text-ink-700 leading-relaxed">
              <span className="text-flame-700 shrink-0 mt-0.5">✕</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Other ways to support */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          Other ways to support — that don't cost money
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
          <li>
            <Tile
              href="/witness"
              title="Share the platform"
              sub="Tell one believer who has no Bible reader, no church home, or no Christian community where they live."
              glyph={<Glyph id="lamp" size={48} />}
            />
          </li>
          <li>
            <Tile
              href="/connect/claim"
              title="Claim your church (pastors)"
              sub="If you shepherd a local body, claim it. Newcomers in your city need a real local pastor — that's the whole platform's purpose."
              glyph={<Glyph id="house" size={48} />}
            />
          </li>
          <li>
            <Tile
              href="/pray/wall"
              title="Carry one prayer today"
              sub="Open the Wall. Pray for one believer somewhere in the world. The Body is one."
              glyph={<Glyph id="hands" size={48} />}
            />
          </li>
          <li>
            <Tile
              href="/pray/nations"
              title="Pray for the nations"
              sub="One country a day. The whole field is the Lord's, but most of it has never been brought before Him by name."
              glyph={<Glyph id="globe" size={48} />}
            />
          </li>
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
            &ldquo;Each one must give as he has decided in his heart, not reluctantly or under
            compulsion, for God loves a cheerful giver.&rdquo;
          </p>
          <p className="mt-2 text-ink-300">2 Corinthians 9:7</p>
        </div>
      </div>

      <p className="mt-8 text-xs text-ink-500 text-center max-w-xl mx-auto">
        Scripture Theory is not currently a registered 501(c)(3). Your gift is not yet
        tax-deductible. We will tell you if and when that changes.{" "}
        <Link href="/about" className="underline">
          About this site
        </Link>
        .
      </p>
    </section>
  );
}
