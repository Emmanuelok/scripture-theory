import Link from "next/link";
import { TOPICS } from "@/data/resources/topics";
import { CREEDS } from "@/data/resources/creeds";
import { GLOSSARY } from "@/data/resources/glossary";
import { DISCIPLINES } from "@/data/resources/disciplines";

export const metadata = {
  title: "Resources — Scripture Theory",
  description:
    "Every tool a believer needs for study and spiritual growth: a topical Scripture index, the historic creeds, a theological glossary, and a guide to the great spiritual disciplines.",
};

const TOOLS = [
  {
    href: "/resources/topical-index",
    eyebrow: `${TOPICS.length} topics · ${TOPICS.reduce((n, t) => n + t.verses.length, 0)} verses`,
    title: "Topical Scripture index",
    sub: "What the Bible says about anxiety, forgiveness, marriage, money, the Cross, and more — with verses to pray and memorize.",
  },
  {
    href: "/resources/creeds",
    eyebrow: `${CREEDS.length} historic creeds`,
    title: "The Church's creeds",
    sub: "The Apostles' Creed, the Nicene, Chalcedonian, and Athanasian — the confessions that have united the global Church for over a millennium.",
  },
  {
    href: "/resources/glossary",
    eyebrow: `${GLOSSARY.length} terms`,
    title: "Theological glossary",
    sub: "Plain-language definitions of the words every Christian needs to know — atonement, grace, justification, the Trinity, and more.",
  },
  {
    href: "/resources/disciplines",
    eyebrow: `${DISCIPLINES.length} disciplines`,
    title: "Spiritual disciplines",
    sub: "How the saints have actually grown — Scripture, prayer, fasting, Sabbath, solitude, confession, generosity, service.",
  },
  {
    href: "/bible/translations",
    eyebrow: "Bible references",
    title: "Translations catalog",
    sub: "The 14 authentic, public-domain Bible translations Scripture Theory serves — never machine-translated.",
  },
  {
    href: "/lens",
    eyebrow: "Multi-tradition lens",
    title: "Jesus in the Word",
    sub: "How Orthodox, Catholic, Reformed, Wesleyan, Pentecostal, and Anabaptist believers have read the same passage — together pointing to Christ.",
  },
  {
    href: "/practices",
    eyebrow: "23 ancient practices",
    title: "Practices hub",
    sub: "Daily Office, fasting, examen, lament, forgiveness, listening prayer, family altar, the Lord's Supper at home, the rule of life, healing prayer, marriage and parenting rhythms, and more.",
  },
  {
    href: "/catechism",
    eyebrow: "1563 · 52 Lord's Days",
    title: "Heidelberg Catechism",
    sub: "The warmest of the Reformation catechisms — 129 questions and answers in three movements: misery, deliverance, gratitude. One Lord's Day per week.",
  },
  {
    href: "/apologetics",
    eyebrow: "1 Peter 3:15",
    title: "Apologetics",
    sub: "Pastoral, honest answers to the hardest questions Christians are asked — God, the Bible, Jesus, suffering, science, hell, sexuality, hypocrisy.",
  },
  {
    href: "/hymns",
    eyebrow: "21 public-domain hymns",
    title: "The hymns",
    sub: "Wesley, Watts, Luther, Spafford, Newton — the songs the Church has sung for centuries, in full text.",
  },
];

export default function ResourcesHub() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Resources</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Every tool a believer needs.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Topical Scripture by life situation, the creeds the worldwide Church has confessed since
        the early centuries, plain-language definitions of theological terms, and a guide to the
        spiritual disciplines that have actually formed believers across history. All free, all
        searchable, all on your device.
      </p>

      <ul className="mt-10 grid sm:grid-cols-2 gap-4">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="group block rounded-3xl border border-ink-200 bg-card p-6 hover:border-flame-500 hover:shadow-md transition-all"
            >
              <div className="text-[10px] uppercase tracking-widest text-flame-700">{t.eyebrow}</div>
              <div className="font-serif text-2xl text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
                {t.title}
              </div>
              <p className="text-sm text-ink-600 mt-2 leading-relaxed">{t.sub}</p>
              <div className="mt-4 text-xs text-ink-400 group-hover:text-flame-700 transition-colors">
                Open →
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "Study to show yourself approved by God, a workman who doesn't need to be ashamed,
          properly handling the Word of Truth."
        </p>
        <p className="mt-2 text-ink-300">2 Timothy 2:15</p>
      </div>
    </section>
  );
}
