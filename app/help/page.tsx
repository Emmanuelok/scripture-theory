import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Help — Scripture Theory",
  description:
    "Honest answers to the most common questions about Scripture Theory: how to install, what's stored where, how to share a verse, how to find a church, how to use the Path, the Secret Place, household sharing, and the Prayer Wall.",
};

type Q = { q: string; a: React.ReactNode };

const SECTIONS: { title: string; eyebrow: string; questions: Q[] }[] = [
  {
    eyebrow: "Getting started",
    title: "First questions",
    questions: [
      {
        q: "What is Scripture Theory?",
        a: (
          <>
            A JESUS-centered, inter-denominational platform for daily life with God. Read the Bible
            in 14 public-domain translations, pray with the global Body, walk the discipleship
            Path, keep a Secret Place, and find a real local church. We are not a denomination, we
            do not sell ads, and almost nothing leaves your device.
          </>
        ),
      },
      {
        q: "Is it free?",
        a: (
          <>
            Yes. Everything — the Bible, the Daily Office, the Secret Place, the Prayer Wall, the
            Path, the church finder, everything. There is no premium tier. If you want to support
            the work, see{" "}
            <Link href="/give" className="text-flame-700 hover:underline">
              /give
            </Link>
            .
          </>
        ),
      },
      {
        q: "Do I need an account?",
        a: (
          <>
            No. Almost everything works without one — your reading, journal, prayers, fasts, and
            Path progress live on this device only. You'd sign in (passwordless email link) only
            for: (1) carrying your data across devices, (2) posting on the Prayer Wall, or (3)
            claiming a church as a pastor. See{" "}
            <Link href="/account" className="text-flame-700 hover:underline">
              /account
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "Install & offline",
    title: "Make it feel like an app",
    questions: [
      {
        q: "How do I install it on my phone or computer?",
        a: (
          <>
            On Android / Chrome / Edge: an Install banner appears the first time you visit on
            mobile — one tap. On iPhone / iPad Safari: tap the Share button, then "Add to Home
            Screen." It will open full-screen with its own icon and work offline.
          </>
        ),
      },
      {
        q: "Does it work offline?",
        a: (
          <>
            Yes, for any page you've already visited. Bible chapters you've opened are cached. If
            you lose signal mid-walk, the Secret Place, Daily Office, and any chapter you read this
            week are still there.
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "Privacy",
    title: "What's stored where",
    questions: [
      {
        q: "What lives on my device versus your servers?",
        a: (
          <>
            <strong>On your device only:</strong> Secret Place entries, journal, gratitudes,
            prayer list, fasts, examens, reading progress, Bible highlights and notes, the Path
            stages, all preferences.{" "}
            <strong>Sent to our server only if you sign in:</strong> your profile blob travels to
            Supabase so you can use a second device. The Secret Place is excluded by default — you
            opt it in.{" "}
            <strong>Public:</strong> only what you explicitly post on the Prayer Wall (with the
            anonymous option on by default).
          </>
        ),
      },
      {
        q: "Can I delete everything?",
        a: (
          <>
            Yes. On{" "}
            <Link href="/me" className="text-flame-700 hover:underline">
              /me
            </Link>{" "}
            there is an "Erase everything" button that wipes every walk on this device. Cloud sync
            has a separate "Clear cloud copy" button on /account.
          </>
        ),
      },
      {
        q: "How do I back my data up?",
        a: (
          <>
            On{" "}
            <Link href="/me" className="text-flame-700 hover:underline">
              /me
            </Link>{" "}
            there is a passphrase-encrypted backup. Download it. Keep it anywhere. Restore on any
            device with the same passphrase.
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "Bible reader",
    title: "Reading & sharing",
    questions: [
      {
        q: "How do I share a verse with a friend?",
        a: (
          <>
            Tap any verse in the Bible reader — a dialog opens with Highlight / Bookmark / Copy /
            Share text / Share as image / Cross-references. The image is 1080×1080 and ready for
            any social platform. There's also a verse permalink page (e.g. /verse/john/3/16) you
            can text directly.
          </>
        ),
      },
      {
        q: "Why so many translations?",
        a: (
          <>
            Because no single English translation captures everything, and most of the world doesn't
            read English. Every translation we serve is real, named, published, and in the public
            domain — we never machine-translate Scripture. See{" "}
            <Link href="/bible/translations" className="text-flame-700 hover:underline">
              /bible/translations
            </Link>
            .
          </>
        ),
      },
      {
        q: "Can I change the text size or fonts?",
        a: (
          <>
            Yes. In the Bible reader, the size controls are at the top (S / M / L / XL). For
            global accessibility — dyslexia-friendly font, high contrast, reduced motion, always-
            visible link underlines — see{" "}
            <Link href="/accessibility" className="text-flame-700 hover:underline">
              /accessibility
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "The Path",
    title: "Discipleship & pastor handoff",
    questions: [
      {
        q: "What's The Path?",
        a: (
          <>
            A twelve-stage scriptural journey from first encounter with Jesus to discipling
            someone else (2 Tim 2:2). You mark stages as you walk them. Stages 3 (Confess &
            Baptize) and 7 (Belong) require a real local pastor's hand — we route an introduction
            to a faithful pastor in your city.
          </>
        ),
      },
      {
        q: "I'm a pastor. How do I receive newcomers?",
        a: (
          <>
            Sign in at{" "}
            <Link href="/account" className="text-flame-700 hover:underline">
              /account
            </Link>
            , then claim your church at{" "}
            <Link href="/connect/claim" className="text-flame-700 hover:underline">
              /connect/claim
            </Link>
            . When a disciple in your city asks for an introduction, it lands on your dashboard at{" "}
            <Link href="/connect/dashboard" className="text-flame-700 hover:underline">
              /connect/dashboard
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "Household & sharing",
    title: "Multiple believers, one device",
    questions: [
      {
        q: "Can my family share one device?",
        a: (
          <>
            Yes. On{" "}
            <Link href="/me" className="text-flame-700 hover:underline">
              /me
            </Link>
            , tap the avatar in the top-right of the dark header — "Whose walk is this?" Each walk
            has its own profile, reading progress, and Bible marks. Theme and language stay shared.
          </>
        ),
      },
      {
        q: "Is the Prayer Wall safe?",
        a: (
          <>
            It's signed-in only (to keep bots out), anonymous-by-default, and rate-limited. Three
            flags from distinct believers auto-hides a post pending review. No DMs, no reply
            chains — one-way intercession.
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "Trouble",
    title: "When something is off",
    questions: [
      {
        q: "Something looks wrong / a verse seems mistranslated / a feature is broken.",
        a: (
          <>
            Tell us. We publish a public roadmap and we read every email. If a passage feels off,
            it might be the translation (some 1611 KJV phrasings are jarring to modern ears, for
            instance) — try toggling to another at the top of the chapter.
          </>
        ),
      },
      {
        q: "How do I find a specific Bible book or chapter?",
        a: (
          <>
            On{" "}
            <Link href="/bible" className="text-flame-700 hover:underline">
              /bible
            </Link>{" "}
            there's a "Find a book" search and grouped book lists (Torah, Gospels, Paul's letters,
            etc.). Or just type the reference into{" "}
            <Link href="/search" className="text-flame-700 hover:underline">
              /search
            </Link>{" "}
            — it knows references and full text.
          </>
        ),
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Help"
        title="The most common"
        titleAccent="questions, answered."
        intro="Honest answers about what the platform does, what it doesn't, where your data lives, and how to use the parts most people miss."
      />

      {/* Quick links */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Tile
          href="/start"
          eyebrow="New here?"
          title="Begin"
          sub="Three questions, then we meet you where you are."
          glyph={<Glyph id="door" size={48} />}
        />
        <Tile
          href="/new-believer"
          eyebrow="Just said yes to Jesus?"
          title="First 30 Days"
          sub="A daily pathway for new believers."
          glyph={<Glyph id="lamp" size={48} />}
        />
        <Tile
          href="/account"
          eyebrow="Optional"
          title="Sign in / sync"
          sub="Passwordless email link for cross-device sync."
          glyph={<Glyph id="key" size={48} />}
        />
      </div>

      {/* FAQ sections */}
      <div className="mt-14 space-y-12">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <div className="border-b border-ink-200 pb-3 mb-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-flame-700">
                {s.eyebrow}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">{s.title}</h2>
            </div>
            <div className="space-y-3">
              {s.questions.map((q, i) => (
                <details
                  key={q.q}
                  className="group rounded-2xl border border-ink-200 bg-card overflow-hidden"
                  open={i === 0}
                >
                  <summary className="cursor-pointer list-none p-5 flex items-baseline justify-between gap-3 hover:bg-card-subtle transition-colors">
                    <span className="font-serif text-ink-900">{q.q}</span>
                    <span className="text-flame-700 text-xl transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-ink-700 leading-relaxed">{q.a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
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
            "If any of you lacks wisdom, let him ask of God, who gives generously to all without
            reproach, and it will be given him."
          </p>
          <p className="mt-2 text-ink-300">James 1:5</p>
        </div>
      </div>
    </section>
  );
}
