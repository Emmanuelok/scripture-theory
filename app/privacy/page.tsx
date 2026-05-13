import Link from "next/link";

export const metadata = {
  title: "Privacy commitment — Scripture Theory",
  description:
    "Your walk with Jesus is not our data. Scripture Theory keeps your journal, prayers, notes, and personal records on your device — never on our servers.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Privacy</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Your walk with Jesus is not our data.
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed">
        Most apps that say "free" mean "we will sell your attention, your behavior, or both."
        Scripture Theory is not one of those. We do not run ads. We do not sell data. We do not
        build profiles on you. We do not even ask for your email unless you choose to send us
        one. Everything below is plain English — no legal trickery.
      </p>

      <div className="mt-10 space-y-8 text-ink-700 leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">The short version</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Your private content stays on your device.</strong> Journal entries,
              prayer lists, gratitudes, Bible highlights, bookmarks, notes, your discipleship
              tracker, your prayer-for-the-nations log, your reading progress — all of it lives
              in your browser's local storage. We never receive it.
            </li>
            <li>
              <strong>Clearing your browser data clears your content.</strong> That is the trade-off
              of true on-device privacy. We offer "Export as text" inside My Secret Place so you
              can back things up to a file you control.
            </li>
            <li>
              <strong>No accounts, no sign-up.</strong> There is nothing to log into.
            </li>
            <li>
              <strong>No advertising trackers.</strong> No Facebook pixel, no Google Analytics
              shadow, no behavioral retargeting.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">What technically does leave your device</h2>
          <p>
            We try to be honest, so here is everything that touches a server when you use this
            site:
          </p>
          <ul className="space-y-3 list-disc pl-5 mt-3">
            <li>
              <strong>Bible chapter requests.</strong> When you open a chapter in a translation we
              don't ship in the seed file, your browser asks our server for the chapter text.
              Our server in turn fetches it from{" "}
              <a
                href="https://bible-api.com"
                rel="noopener"
                target="_blank"
                className="text-flame-700 hover:underline"
              >
                bible-api.com
              </a>
              , a public Bible API. Standard HTTP request logs (IP, timestamp, URL) may exist on
              the platform that hosts the site (currently Vercel) and on the upstream API. We do
              not aggregate or share these.
            </li>
            <li>
              <strong>Audio Bible.</strong> If you press play on the human-narrated KJV audio,
              your browser streams the MP3 from{" "}
              <a
                href="https://www.wordproject.org"
                rel="noopener"
                target="_blank"
                className="text-flame-700 hover:underline"
              >
                wordproject.org
              </a>
              , a long-running missionary site. Their servers see the request.
            </li>
            <li>
              <strong>World map data.</strong> The realistic world map on{" "}
              <Link href="/pray/live" className="text-flame-700 hover:underline">/pray/live</Link>{" "}
              is rendered from a Natural Earth TopoJSON file we proxy. Your browser downloads it
              from our server.
            </li>
            <li>
              <strong>Church finder.</strong> When you use the church finder, your search terms
              (city/region + tradition) are sent to OpenStreetMap's Overpass API so it can return
              real church locations near you. We do not associate the search with you.
            </li>
            <li>
              <strong>Flags and map tiles.</strong> Country flag images are pulled from
              flagcdn.com / jsdelivr (with an emoji fallback).
            </li>
            <li>
              <strong>Pastor claim / testimony intake.</strong> If you choose to submit the
              "claim your church" form or share a testimony, you are deliberately sending us that
              information by email. We use it only to follow up.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">Cookies</h2>
          <p>
            We do not set tracking cookies. The site uses{" "}
            <code className="text-xs bg-ink-100 dark:bg-ink-100/30 px-1.5 py-0.5 rounded">localStorage</code>{" "}
            (an on-device key/value store, not a cookie) to remember your theme, your translation
            preference, your reading prefs, and your private content. None of that is transmitted
            to us.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">Children</h2>
          <p>
            Scripture Theory is appropriate for readers of any age, including children reading
            with a parent or guardian. We do not knowingly collect any personal information from
            anyone, and that includes children.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">Why we do it this way</h2>
          <p>
            Jesus said, "When thou prayest, enter into thy closet, and when thou hast shut thy
            door, pray to thy Father which is in secret." (Matthew 6:6) The secret place is
            sacred. We refuse to be the company that monetizes your tears, your confessions, or
            your prayer list. Your walk with the Lord is between you and Him — full stop.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">If we ever change this</h2>
          <p>
            If a future version of this platform offers optional sync, group prayer, or anything
            that involves us storing your data on a server, it will be:
          </p>
          <ul className="space-y-2 list-disc pl-5 mt-3">
            <li>strictly opt-in, never default;</li>
            <li>end-to-end encrypted where the content is sacred (journal, confession);</li>
            <li>announced clearly on this page before any such feature ships;</li>
            <li>built so you can export and delete your data at any time.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">Questions, concerns, corrections</h2>
          <p>
            Email us. If anything in this commitment is unclear or you spot something on the site
            that contradicts it, we want to know. We will fix it.
          </p>
        </section>
      </div>

      <p className="mt-12 text-xs text-ink-400 italic">
        Last reviewed: this page is maintained alongside the codebase. The current build was
        deployed in the year you are reading this.
      </p>
    </section>
  );
}
