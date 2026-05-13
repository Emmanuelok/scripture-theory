import Link from "next/link";

export const metadata = {
  title: "Practices — Scripture Theory",
  description:
    "Every spiritual practice the believer needs — fasting, examen, lament, forgiveness, listening prayer, the Lord's Supper at home, family altar, rule of life, and the Secret Place. Old paths, made plain.",
};

const PRACTICES = [
  // — Prayer & listening —
  {
    href: "/secret-place",
    eyebrow: "Matthew 6:6",
    title: "The Secret Place",
    sub: "Your private journal, prayers, gratitudes, and confessions. Lives only on this device.",
  },
  {
    href: "/hours",
    eyebrow: "Psalm 119:164",
    title: "The Daily Office",
    sub: "Four short prayer offices — Morning, Midday, Evening, Night. Five minutes apiece, ancient and Scripture-built.",
  },
  {
    href: "/listen",
    eyebrow: "Hearing God",
    title: "Listening prayer",
    sub: "Seven steps with Scripture, silence, and a tested journal — for the lifelong learning of His voice.",
  },
  {
    href: "/examen",
    eyebrow: "Five minutes",
    title: "Daily Examen",
    sub: "End the day with Him: thanksgiving, encounter, repentance, longing for tomorrow.",
  },
  {
    href: "/lament",
    eyebrow: "The Psalms",
    title: "Lament",
    sub: "Five movements through grief, anger, and unanswered prayer — turn, complaint, ask, trust, vow.",
  },
  {
    href: "/forgive",
    eyebrow: "Seventy times seven",
    title: "Forgiveness walk",
    sub: "A pastoral, scriptural release — for someone else, for yourself, or before God.",
  },
  {
    href: "/heal",
    eyebrow: "James 5",
    title: "Healing prayer",
    sub: "Pray for the sick — confession, anointing, the prayer of faith — with a private journal.",
  },

  // — Rhythms of life —
  {
    href: "/rule",
    eyebrow: "John 15",
    title: "Rule of Life",
    sub: "A trellis for the vine — daily, weekly, and monthly disciplines you choose and keep.",
  },
  {
    href: "/sabbath",
    eyebrow: "Exodus 20:8",
    title: "Sabbath planner",
    sub: "Plan a real, doable Sabbath — when, what you'll stop, what you'll do instead.",
  },
  {
    href: "/fast",
    eyebrow: "Matthew 6:16",
    title: "Fasting",
    sub: "Biblical guide and private tracker for full, partial, Daniel, sundown, media, and custom fasts.",
  },

  // — Household —
  {
    href: "/family",
    eyebrow: "Deuteronomy 6:7",
    title: "Family altar",
    sub: "Ten-minute household worship for littles, kids, youth, and adults. A different theme each day.",
  },
  {
    href: "/marriage",
    eyebrow: "Ephesians 5:32",
    title: "Marriage rhythm",
    sub: "Seven daily prayer themes for your spouse — words, repentance, joy, sabbath, worship.",
  },
  {
    href: "/parenting",
    eyebrow: "Psalm 78:4",
    title: "Parenting rhythm",
    sub: "Pray your children by name — seven daily themes, every child added to the wall.",
  },

  // — Worship & word —
  {
    href: "/communion",
    eyebrow: "1 Corinthians 11",
    title: "The Lord's Supper at home",
    sub: "A reverent, non-denominational liturgy for sickness, isolation, persecution, or family worship.",
  },
  {
    href: "/hymns",
    eyebrow: "Ephesians 5:19",
    title: "The hymns",
    sub: "Twenty-one public-domain hymns the global church has sung for centuries.",
  },
  {
    href: "/sermons",
    eyebrow: "Acts 17:11",
    title: "Sermon notes",
    sub: "Catch what your pastor preaches — passage, big idea, outline, application, prayer.",
  },
  {
    href: "/memory",
    eyebrow: "Psalm 119:11",
    title: "Scripture memory",
    sub: "Read · first letters · blanks · recite. Hide the Word in your heart.",
  },
  {
    href: "/catechism",
    eyebrow: "1563 · 52 weeks",
    title: "Heidelberg Catechism",
    sub: "129 questions and answers — your only comfort in life and in death. One Lord's Day per week.",
  },

  // — Formation & discernment —
  {
    href: "/gifts",
    eyebrow: "1 Corinthians 12",
    title: "Spiritual gifts",
    sub: "Discern how the Spirit has gifted you to serve the body — twenty gifts, forty statements.",
  },
  {
    href: "/fruit",
    eyebrow: "Galatians 5:22-23",
    title: "Fruit of the Spirit check",
    sub: "Periodic, honest growth check on love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
  },
  {
    href: "/calling",
    eyebrow: "1 Thess 5:24",
    title: "Calling discernment",
    sub: "Seven-step walk for vocation and life direction — love, wiring, world, Word, wise, yes, next.",
  },
  {
    href: "/apologetics",
    eyebrow: "1 Peter 3:15",
    title: "Apologetics",
    sub: "Pastoral, honest answers to the hardest questions — God, the Bible, Jesus, suffering, science, religion.",
  },

  // — The world & the wider Church —
  {
    href: "/persecuted",
    eyebrow: "Hebrews 13:3",
    title: "The persecuted Church",
    sub: "Twelve nations, one each month, with specific prayer points. Remember the prisoners.",
  },
];

export default function PracticesHub() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practices</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Old paths. Made plain.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Every practice the Christian needs — and most Christian apps refuse to teach. Fasting,
        lament, examen, listening prayer, forgiveness, household worship, the Lord's Supper at
        home, the rule of life, the hymns, and the prisoners we are to remember. None of it
        gimmicky. All of it ancient. All of it for you.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Stand in the ways and see, and ask for the old paths, where the good way is, and walk in
        it; then you will find rest for your souls." — Jeremiah 6:16
      </p>

      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRACTICES.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="group block h-full rounded-3xl border border-ink-200 bg-card p-6 hover:border-flame-500 hover:shadow-md transition-all"
            >
              <div className="text-[10px] uppercase tracking-widest text-flame-700">{p.eyebrow}</div>
              <div className="font-serif text-xl text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
                {p.title}
              </div>
              <p className="text-sm text-ink-600 mt-2 leading-relaxed">{p.sub}</p>
              <div className="mt-4 text-xs text-ink-400 group-hover:text-flame-700 transition-colors">
                Open →
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "He must increase, but I must decrease."
        </p>
        <p className="mt-2 text-ink-300">John 3:30</p>
        <p className="mt-4 text-sm text-ink-300 max-w-xl mx-auto leading-relaxed">
          The practices are not the life. Christ is the life. They are the trellis on which He
          grows the vine.
        </p>
      </div>
    </section>
  );
}
