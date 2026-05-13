import Link from "next/link";
import NewBelieverPath from "@/components/NewBelieverPath";

export const metadata = {
  title: "Just said yes to Jesus? — Scripture Theory",
  description:
    "A concrete, 30-day pathway for new believers — and for anyone returning to Christ. One short Scripture, one short reflection, one small step every day.",
};

export default function NewBelieverPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-10 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">First 30 Days</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Just said yes to Jesus? Welcome home.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Whether you trusted Christ today, last week, or you are coming back to Him after years
        away — this page is for you. The next 30 days are a small, concrete pathway: one short
        Scripture, one short reflection, one small step. Five minutes a day. Nothing to log into.
        Nothing to pay for.
      </p>
      <p className="mt-3 text-ink-700 leading-relaxed">
        Your progress is saved on this device only — never to our servers, never to anyone else.
      </p>

      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6">
        <p className="font-serif text-xl text-ink-900">
          "I came that they may have life, and may have it abundantly."
        </p>
        <p className="mt-1 text-sm text-ink-500">— Jesus, John 10:10</p>
      </div>

      <div className="mt-8">
        <NewBelieverPath />
      </div>

      <div className="mt-12 rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <h2 className="font-serif text-2xl text-ink-900">After Day 30 — what next?</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>
            • Begin a longer reading plan —{" "}
            <Link href="/read" className="text-flame-700 hover:underline">choose one here</Link>
            . The 90-day NT or year-through-the-Psalms are great next steps.
          </li>
          <li>
            • Open <Link href="/secret-place" className="text-flame-700 hover:underline">My Secret Place</Link>{" "}
            and keep a private journal of what the Lord is teaching you.
          </li>
          <li>
            • Start the{" "}
            <Link href="/disciple/journey" className="text-flame-700 hover:underline">
              Discipleship Journey
            </Link>{" "}
            — track the people you are walking with toward Christ.
          </li>
          <li>
            • Memorize one verse a week —{" "}
            <Link href="/memory" className="text-flame-700 hover:underline">
              Scripture Memory
            </Link>
            .
          </li>
        </ul>
      </div>
    </section>
  );
}
