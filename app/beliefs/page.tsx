import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "What we believe — Scripture Theory",
  description:
    "Scripture Theory holds the historic faith of the Christian Church as expressed in the Apostles' Creed and the Nicene Creed — and the one gospel of Jesus Christ.",
};

const ESSENTIALS = [
  {
    glyph: "wreath" as const,
    title: "The Trinity",
    body: "One God, eternally existing in three Persons — Father, Son, and Holy Spirit — co-equal, co-eternal, of one substance.",
  },
  {
    glyph: "cross" as const,
    title: "Jesus is God and man",
    body: "Fully God and fully man in one Person, forever. The Word made flesh (John 1:14).",
  },
  {
    glyph: "open-book" as const,
    title: "The authority of Scripture",
    body: "The 66 books of the Old and New Testaments are the inspired, written Word of God, sufficient for faith and life.",
  },
  {
    glyph: "key" as const,
    title: "Grace through faith in Christ alone",
    body: "Salvation is not by works, tradition, or merit. The Spirit then produces the fruit of obedience in those He has redeemed.",
  },
  {
    glyph: "flame" as const,
    title: "Bodily resurrection of Jesus",
    body: "No resurrection, no Christianity (1 Corinthians 15:14). The empty tomb is the hinge of history.",
  },
  {
    glyph: "globe" as const,
    title: "The Church",
    body: "The universal Body of Christ, made visible in faithful local congregations, marked by Word, sacrament, prayer, mission, and love.",
  },
];

const LOOSELY_HELD = [
  "Church government",
  "Mode and recipients of baptism",
  "Timing and details of Christ's return",
  "Nature of spiritual gifts",
  "Relationship of freedom and old-covenant law",
  "Worship styles",
];

export default function BeliefsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="What we believe"
        title="The faith"
        titleAccent="once for all delivered to the saints."
        intro={`"Inter-denominational" does not mean "no doctrine." It means we hold to the historic Christian faith — the faith of Scripture, the faith of the early Church, the faith confessed by believers across centuries, languages, and traditions — and we leave secondary matters where Scripture leaves them: to the conscience, the local church, and the work of the Spirit.`}
        scripture="Contend earnestly for the faith which was once for all delivered to the saints."
        scriptureRef="Jude 3"
      />

      {/* The core gospel — hero */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="The core · 1 Corinthians 15:3–4"
        title={
          <>
            We confess what Paul confessed —{" "}
            <span className="text-flame-300">one Gospel.</span>
          </>
        }
        glyph={<Glyph id="cross" size={120} />}
        className="mt-12"
      >
        <blockquote className="mt-4 border-l-2 border-flame-500/70 pl-4 italic text-flame-100/90 max-w-2xl">
          "For I delivered unto you first of all that which I also received, how that Christ died
          for our sins according to the Scriptures; and that he was buried, and that he rose again
          the third day according to the Scriptures."
        </blockquote>
        <p className="mt-4 text-sm text-ink-300 leading-relaxed max-w-2xl">
          Jesus Christ — fully God and fully man — lived a sinless life, died on the cross as a
          substitute for sinners, was buried, rose bodily on the third day, ascended to the right
          hand of the Father, and is coming again. By repentance from sin and faith in Him, anyone
          may be saved, forgiven, indwelt by the Holy Spirit, and adopted as a child of God.
        </p>
      </Tile>

      {/* Essentials — grid */}
      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">Essentials we will not negotiate</h2>
          <p className="text-sm text-ink-500 italic">The hill we stand on.</p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {ESSENTIALS.map((e) => (
            <li key={e.title}>
              <Tile title={e.title} sub={e.body} glyph={<Glyph id={e.glyph} size={48} />} />
            </li>
          ))}
        </ul>
      </div>

      {/* Historic creeds — full text in collapsible panels */}
      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            The Creeds we confess with the global Church
          </h2>
          <Link href="/resources/creeds" className="text-xs text-flame-700 hover:underline">
            All four creeds →
          </Link>
        </div>

        <div className="space-y-3">
          <details className="group rounded-3xl border border-ink-200 bg-card overflow-hidden" open>
            <summary className="cursor-pointer list-none flex items-center justify-between p-6 hover:bg-card-subtle transition-colors">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  Since the 2nd century
                </div>
                <div className="font-serif text-xl text-ink-900 mt-0.5">The Apostles' Creed</div>
              </div>
              <span className="text-flame-700 text-2xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 font-serif text-lg leading-relaxed text-ink-900 space-y-3">
              <p>I believe in God, the Father almighty, creator of heaven and earth.</p>
              <p>
                I believe in Jesus Christ, his only Son, our Lord, who was conceived by the Holy
                Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified,
                died, and was buried; he descended to the dead. On the third day he rose again; he
                ascended into heaven, he is seated at the right hand of the Father, and he will
                come again to judge the living and the dead.
              </p>
              <p>
                I believe in the Holy Spirit, the holy catholic Church, the communion of saints,
                the forgiveness of sins, the resurrection of the body, and the life everlasting.
                Amen.
              </p>
              <p className="text-xs not-italic text-ink-500 mt-2">
                "Catholic" here is the original meaning: universal — every faithful believer in
                every place who confesses Christ as Lord.
              </p>
            </div>
          </details>

          <details className="group rounded-3xl border border-ink-200 bg-card overflow-hidden">
            <summary className="cursor-pointer list-none flex items-center justify-between p-6 hover:bg-card-subtle transition-colors">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  A.D. 325 / 381 · Nicaea & Constantinople
                </div>
                <div className="font-serif text-xl text-ink-900 mt-0.5">The Nicene Creed</div>
              </div>
              <span className="text-flame-700 text-2xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 font-serif text-lg leading-relaxed text-ink-900 space-y-3">
              <p>
                We believe in one God, the Father almighty, maker of heaven and earth, of all
                things visible and invisible.
              </p>
              <p>
                And in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father
                before all worlds; God of God, Light of Light, very God of very God; begotten, not
                made, being of one substance with the Father, by whom all things were made; who
                for us men and for our salvation came down from heaven, and was incarnate by the
                Holy Spirit of the Virgin Mary, and was made man; and was crucified also for us
                under Pontius Pilate; he suffered and was buried; and the third day he rose again
                according to the Scriptures; and ascended into heaven, and sitteth on the right
                hand of the Father; and he shall come again, with glory, to judge both the quick
                and the dead; whose kingdom shall have no end.
              </p>
              <p>
                And we believe in the Holy Spirit, the Lord and Giver of life, who proceedeth from
                the Father, who with the Father and the Son together is worshipped and glorified,
                who spake by the prophets.
              </p>
              <p>
                And we believe in one holy catholic and apostolic Church. We acknowledge one
                baptism for the remission of sins; and we look for the resurrection of the dead,
                and the life of the world to come. Amen.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* What we hold loosely */}
      <section className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">What we hold loosely</div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          Faithful brothers and sisters disagree, in love, over many things.
        </h2>
        <p className="mt-3 text-ink-700 leading-relaxed max-w-3xl">
          On these matters Scripture Theory takes no partisan position. We commend you to your
          local church and to your conscience before God. Christ prayed "that they all may be
          one" — division over secondary matters dishonors Him.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {LOOSELY_HELD.map((l) => (
            <li
              key={l}
              className="inline-flex items-center rounded-full border border-ink-200 bg-card px-3 py-1.5 text-xs text-ink-700"
            >
              {l}
            </li>
          ))}
        </ul>
      </section>

      {/* Go deeper */}
      <section className="mt-14 grid md:grid-cols-2 gap-4">
        <Tile
          href="/resources/creeds"
          eyebrow="4 creeds"
          title="Read the historic creeds"
          sub="Apostles, Nicene, Chalcedonian, and Athanasian — in full, with context."
          glyph={<Glyph id="wreath" size={48} />}
        />
      </section>

      {/* Closing */}
      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.25), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug italic">
            "Search the Scriptures … these are they which testify of Me."
          </p>
          <p className="mt-2 text-ink-300">John 5:39 — Jesus</p>
          <p className="mt-6 text-sm text-ink-300 max-w-xl mx-auto leading-relaxed">
            The Bereans, Luke commends, did not take Paul's word for it — they searched the
            Scriptures themselves (Acts 17:11). Do the same here.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Link
              href="/gospel"
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 transition-colors"
            >
              Read the Gospel →
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-ink-700 text-ink-50 px-5 py-2.5 text-sm hover:border-flame-300 transition-colors"
            >
              About this site
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
