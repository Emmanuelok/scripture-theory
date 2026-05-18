import { TOPICS } from "@/data/resources/topics";
import { CREEDS } from "@/data/resources/creeds";
import { GLOSSARY } from "@/data/resources/glossary";
import { DISCIPLINES } from "@/data/resources/disciplines";
import { translationOrder } from "@/data/bible/translations";
import { heidelberg } from "@/data/catechism";
import { Tile, Bento, PageHero } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Resources — Scripture Theory",
  description:
    "Every tool a believer needs for study and spiritual growth: a topical Scripture index, the historic creeds, a theological glossary, and a guide to the great spiritual disciplines.",
};

export default function ResourcesHub() {
  const verses = TOPICS.reduce((n, t) => n + t.verses.length, 0);
  const sampleTopics = TOPICS.slice(0, 4).map((t) => t.title);
  const sampleCreeds = CREEDS.slice(0, 4).map((c) => c.name);
  const sampleTerms = GLOSSARY.slice(0, 6).map((g) => g.word);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Resources"
        title="Every tool"
        titleAccent="a believer needs."
        intro="Topical Scripture by life situation, the creeds the worldwide Church has confessed since the early centuries, plain-language definitions of theological terms, and a guide to the spiritual disciplines that have actually formed believers across history. All free, all searchable, all on your device."
        scripture="Study to show yourself approved by God, a workman who doesn't need to be ashamed, properly handling the Word of Truth."
        scriptureRef="2 Timothy 2:15"
      />

      <div className="mt-12">
        <Bento>
          {/* HERO — Jesus throughout the Scriptures: the platform's reason for being */}
          <Tile
            href="/jesus"
            size="hero"
            tone="dark"
            eyebrow="66 books · one Christ"
            title={
              <>
                Jesus throughout the Scriptures —{" "}
                <span className="text-flame-300">Genesis to Revelation.</span>
              </>
            }
            sub="Christ in every book of the Bible. The seed of the woman, the Passover Lamb, the bronze serpent, the Suffering Servant, the Son of Man, the Lamb who was slain. Sixty-six books. One Story. His Name is Jesus."
            glyph={<Glyph id="cross" size={120} />}
          />

          {/* Topical index */}
          <Tile
            href="/resources/topical-index"
            eyebrow={`${TOPICS.length} topics · ${verses} verses`}
            title="Topical Scripture by life situation"
            sub="When you're anxious, when you've sinned, when you're grieving — what the Bible actually says."
            glyph={<Glyph id="open-book" size={48} />}
          >
            <div className="mt-2 flex flex-wrap gap-1.5">
              {sampleTopics.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-ink-800/60 border border-ink-700/60 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-flame-300"
                >
                  {t}
                </span>
              ))}
              <span className="inline-flex items-center rounded-full bg-ink-800/40 border border-ink-700/40 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-ink-300">
                + {TOPICS.length - 4} more
              </span>
            </div>
          </Tile>

          {/* CREEDS — tall pillar */}
          <Tile
            href="/resources/creeds"
            size="tall"
            tone="dark"
            eyebrow={`${CREEDS.length} historic creeds`}
            title="The Church's creeds"
            sub="The confessions that have united the global Body since the early centuries."
            glyph={<Glyph id="wreath" size={48} />}
          >
            <ul className="mt-2 space-y-1.5 text-xs text-ink-300">
              {sampleCreeds.map((c) => (
                <li key={c} className="flex items-baseline gap-2">
                  <span className="text-flame-300">·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Tile>

          {/* GLOSSARY — tall pillar */}
          <Tile
            href="/resources/glossary"
            size="tall"
            tone="dark"
            eyebrow={`${GLOSSARY.length} terms`}
            title="Theological glossary"
            sub="Plain-language definitions of the words every Christian needs to know."
            glyph={<Glyph id="tablet" size={48} />}
          >
            <div className="mt-2 flex flex-wrap gap-1">
              {sampleTerms.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-widest text-flame-300/90 after:content-['·'] after:ml-1 last:after:content-none"
                >
                  {t}
                </span>
              ))}
            </div>
          </Tile>

          {/* DISCIPLINES */}
          <Tile
            href="/resources/disciplines"
            eyebrow={`${DISCIPLINES.length} disciplines`}
            title="Spiritual disciplines"
            sub="How the saints have actually grown — Scripture, prayer, fasting, Sabbath, solitude, confession, generosity, service."
            glyph={<Glyph id="rule" size={48} />}
          />

          {/* TRANSLATIONS */}
          <Tile
            href="/bible/translations"
            eyebrow={`${translationOrder.length} Bible translations`}
            title="Translations catalog"
            sub="Every translation we serve — authentic, public-domain, never machine-translated."
            glyph={<Glyph id="library" size={48} />}
          />

          {/* JESUS IN THE WORD — now merged into /jesus Part Two; tile retained as a deep-link */}
          <Tile
            href="/jesus#tradition-lenses"
            eyebrow="Six traditions"
            title="How the Church reads Christ together"
            sub="Orthodox, Catholic, Reformed, Wesleyan, Pentecostal, and Anabaptist readings of six key passages — now part of Jesus throughout the Scriptures."
            glyph={<Glyph id="eye" size={48} />}
          />

          {/* PRACTICES */}
          <Tile
            href="/practices"
            eyebrow="23 ancient practices"
            title="Practices hub"
            sub="Daily Office, fasting, examen, lament, forgiveness, listening prayer, family altar, the Lord's Supper at home, the rule of life — and more."
            glyph={<Glyph id="flame" size={48} />}
          />

          {/* HEIDELBERG */}
          <Tile
            href="/catechism"
            eyebrow={`1563 · ${heidelberg.length} Lord's Days`}
            title="Heidelberg Catechism"
            sub="The warmest of the Reformation catechisms — 129 questions and answers in three movements: misery, deliverance, gratitude."
            glyph={<Glyph id="catechism" size={48} />}
          />

          {/* APOLOGETICS */}
          <Tile
            href="/apologetics"
            eyebrow="1 Peter 3:15"
            title="Apologetics"
            sub="Pastoral, honest answers to the hardest questions — God, the Bible, Jesus, suffering, science, hell, sexuality, hypocrisy."
            glyph={<Glyph id="shield" size={48} />}
          />

          {/* HYMNS */}
          <Tile
            href="/hymns"
            eyebrow="21 public-domain hymns"
            title="The hymns"
            sub="Wesley, Watts, Luther, Spafford, Newton — the songs the Church has sung for centuries, in full text."
            glyph={<Glyph id="harp" size={48} />}
          />
        </Bento>
      </div>

      {/* Closing scripture card */}
      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%), radial-gradient(60% 50% at 50% 100%, rgba(184,66,12,0.18), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            "Open my eyes, that I may behold wondrous things out of Your law."
          </p>
          <p className="mt-2 text-ink-300">Psalm 119:18</p>
        </div>
      </div>
    </section>
  );
}
