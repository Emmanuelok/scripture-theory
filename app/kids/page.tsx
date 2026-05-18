import Link from "next/link";
import { kidsStories, kidsAges } from "@/data/kids-stories";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "Bible stories for kids — Scripture Theory",
  description:
    "Sixteen faithful read-aloud Bible stories — creation, Noah, Joseph, Moses, David, Daniel, Christmas, the Cross, Easter, and Pentecost — written for ages 3–10. Every story keeps the Bible reference so a parent can read the real passage afterward.",
};

const AGE_COLOR: Record<string, string> = {
  Littles: "bg-rose-100 text-rose-800 border-rose-200",
  Kids: "bg-sky-100 text-sky-800 border-sky-200",
  "Older kids": "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function KidsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Kids</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Tell them the Story.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        Sixteen Bible stories, written for ages 3 to 10, faithful to the text. Read one a night
        out loud, or pick a story your child needs today. Each one ends with a Big Idea, a
        prayer, and a question to talk about — and a link to the real Bible passage for
        afterward.
      </p>

      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6">
        <p className="font-serif text-lg text-ink-900 leading-snug italic">
          "Let the little children come to me, and do not hinder them; for the kingdom of God
          belongs to such as these."
        </p>
        <p className="mt-1 text-sm text-ink-500">— Jesus, Mark 10:14</p>
      </div>

      <div className="mt-8 rounded-2xl border border-ink-200 bg-card-subtle p-4 text-sm text-ink-700 leading-relaxed">
        <strong className="text-ink-900">For parents.</strong> These stories are written in
        simple language but they do not soften the Bible. We do not add to Scripture. The names,
        the places, and the shape of every story are exactly as the Bible tells them. Children
        understand more than we think — and Jesus is for them, today.
      </div>

      <nav className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-5">
        <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
          Stories
        </div>
        <ul className="flex flex-wrap gap-2 text-sm">
          {kidsStories.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1 text-ink-700 hover:border-flame-500 hover:text-flame-700"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-8">
        {kidsStories.map((story) => (
          <article
            id={story.id}
            key={story.id}
            className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 scroll-mt-24"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight">
                {story.title}
              </h2>
              <span
                className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${
                  AGE_COLOR[story.age]
                }`}
              >
                {story.age}
              </span>
            </div>
            <p className="mt-1 text-sm">
              <ScriptureRef
                reference={story.reference}
                underline={false}
                className="text-flame-700 hover:underline"
              />
            </p>

            <div className="mt-4 space-y-3 text-ink-800 leading-relaxed">
              {story.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-flame-200 bg-flame-50/50 p-4">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Big idea</div>
              <p className="mt-1 font-serif text-lg text-ink-900 leading-snug">{story.bigIdea}</p>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
                <div className="text-[10px] uppercase tracking-widest text-flame-700">A prayer to pray together</div>
                <p className="mt-1 text-sm italic text-ink-800 leading-relaxed">{story.prayer}</p>
              </div>
              <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
                <div className="text-[10px] uppercase tracking-widest text-flame-700">A question to talk about</div>
                <p className="mt-1 text-sm text-ink-800 leading-relaxed">{story.question}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <h3 className="font-serif text-xl text-ink-900">After the story</h3>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          When your child is ready for more — gather the whole family for nightly worship at{" "}
          <Link href="/family" className="text-flame-700 hover:underline">
            the Family Altar
          </Link>{" "}
          (Deuteronomy 6:7), or memorize one verse a week together at{" "}
          <Link href="/memory" className="text-flame-700 hover:underline">
            Scripture Memory
          </Link>
          .
        </p>
      </div>

      <div className="mt-10 text-center">
        <Link href="/resources" className="text-sm text-flame-700 hover:underline">
          ← Back to Resources
        </Link>
      </div>
    </section>
  );
}
