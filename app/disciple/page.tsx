import Link from "next/link";

export const metadata = {
  title: "The Path — Scripture Theory",
  description:
    "A 12-stage discipleship journey from first encounter with JESUS to mature, reproducing disciples — measurable, scriptural, and explicitly local-church-bound.",
};

const stages = [
  { stage: 1, name: "Encounter", scripture: "John 4:1–42", focus: "First meeting with Jesus, the Living Water." },
  { stage: 2, name: "Repent & Believe", scripture: "Mark 1:14–15", focus: "Turning from self-rule, trusting the King." },
  { stage: 3, name: "Confess & Baptize", scripture: "Romans 10:9–10; Matt. 28:19", focus: "Public confession; baptism in your local church." },
  { stage: 4, name: "Receive the Spirit", scripture: "Acts 2:38–39", focus: "Welcoming the Spirit's presence and power." },
  { stage: 5, name: "Learn the Story", scripture: "Luke 24:27", focus: "Read the whole Bible as one story centered on Christ." },
  { stage: 6, name: "Pray & Fast", scripture: "Matt. 6:5–18", focus: "Daily life with the Father in secret." },
  { stage: 7, name: "Belong", scripture: "Acts 2:42–47", focus: "A committed local church and a small community." },
  { stage: 8, name: "Forgive & Reconcile", scripture: "Matt. 5:21–26; 18:15–22", focus: "Healing relationships; refusing bitterness." },
  { stage: 9, name: "Steward", scripture: "Luke 16:10–13", focus: "Money, time, work, and gifts under His Lordship." },
  { stage: 10, name: "Suffer Well", scripture: "1 Peter 4:12–19", focus: "Joy in trial; cross-shaped obedience." },
  { stage: 11, name: "Witness", scripture: "Acts 1:8", focus: "Telling your story, sharing the gospel where you live." },
  { stage: 12, name: "Reproduce", scripture: "2 Tim. 2:2", focus: "Discipling one person who disciples another." },
];

export default function DisciplePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">The Path</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900">
        A 12-stage discipleship journey.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Most apps deliver content. Disciples need a path. Pastors say discipleship is a priority,
        yet only about half have an intentional plan. The Path closes that gap with a measurable,
        scriptural progression — and it is explicitly designed to hand each disciple off to a local
        pastor, not to keep them in our app.
      </p>

      <div className="mt-6 rounded-2xl border border-flame-200 bg-flame-50/60 p-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-flame-900">
          Track the souls you're praying for, witnessing to, and discipling.
        </span>
        <Link
          href="/disciple/journey"
          className="inline-flex items-center rounded-full bg-flame-600 text-white px-4 py-2 text-sm font-medium hover:bg-flame-700 whitespace-nowrap"
        >
          Open your journey →
        </Link>
      </div>

      <div className="mt-10 rounded-2xl bg-ink-900 text-ink-50 p-6 md:p-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Stat number="12" label="Scriptural stages from first encounter to reproducer" />
          <Stat number="5+" label="Inter-denominational expressions per stage" />
          <Stat
            number="0"
            label="Stages completed without a real conversation with a local pastor"
          />
        </div>
      </div>

      <ol className="mt-12 space-y-4">
        {stages.map((s) => (
          <li
            key={s.stage}
            className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl bg-card border border-ink-200 p-5"
          >
            <div className="font-serif text-flame-700 text-3xl w-14 text-center leading-none pt-1">
              {String(s.stage).padStart(2, "0")}
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-serif text-xl text-ink-900">{s.name}</h3>
                <span className="text-xs text-flame-700">{s.scripture}</span>
              </div>
              <p className="mt-1 text-ink-700 leading-relaxed">{s.focus}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-2xl border border-ink-200 bg-ink-50 p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">How The Path is different</h2>
        <ul className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-ink-700">
          <li className="rounded-xl bg-card border border-ink-200 p-4">
            <strong className="text-ink-900">Measurable.</strong> Every stage has an observable
            sign — not a quiz score.
          </li>
          <li className="rounded-xl bg-card border border-ink-200 p-4">
            <strong className="text-ink-900">Embodied.</strong> Stages 3, 7, 8, 11, 12 cannot be
            completed alone or online.
          </li>
          <li className="rounded-xl bg-card border border-ink-200 p-4">
            <strong className="text-ink-900">Local-church first.</strong> A real pastor confirms
            stage 3 and stage 7. We don't.
          </li>
          <li className="rounded-xl bg-card border border-ink-200 p-4">
            <strong className="text-ink-900">Inter-denominational.</strong> Each stage offers
            expressions from multiple traditions.
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/connect"
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
          >
            How we connect you to a local body →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-5xl text-flame-300">{number}</div>
      <div className="mt-1 text-sm text-ink-200 leading-snug">{label}</div>
    </div>
  );
}
