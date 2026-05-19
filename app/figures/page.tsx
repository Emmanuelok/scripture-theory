import Link from "next/link";

export const metadata = {
  title: "Figures — Scripture Theory",
  description:
    "Every graphical figure across the site, gathered in one place. Beautiful, interactive diagrams that help the eye see what the text says.",
};

type Figure = {
  title: string;
  blurb: string;
  href: string;
  group: "Story" | "Doctrine" | "Time" | "Prayer & Practice" | "Mission" | "Walk";
};

const FIGURES: Figure[] = [
  // Story / Bible
  { title: "Biblical Timeline",      blurb: "Eleven eras across history; the line peaks at the Cross.",                  href: "/timeline",            group: "Story" },
  { title: "Days of Creation",       blurb: "The seven days of Genesis 1-2 as a circle of form-and-fill petals.",        href: "/timeline#creation",   group: "Story" },
  { title: "Gospel Arc",             blurb: "God → Sin → Jesus → Response — the four movements drawn as a fall-and-rise.", href: "/gospel",             group: "Story" },
  { title: "Roman Road",             blurb: "A winding road through five Romans verses, from sin to whoever calls.",     href: "/gospel",              group: "Story" },
  { title: "Canon Panorama",         blurb: "All 66 books as colour-coded bars sized by chapter count.",                 href: "/bible",               group: "Story" },
  { title: "Christ in Every Book",   blurb: "Sixty-six division-coloured tiles, each carrying its 'Jesus is…' headline.", href: "/jesus#canonical-sweep", group: "Story" },
  { title: "Seven I AM Sayings",     blurb: "Seven self-disclosures of Jesus orbiting the divine name ἐγώ εἰμι.",        href: "/jesus",               group: "Story" },
  { title: "Beatitudes Ladder",      blurb: "Eight blessings as ascending stair-steps to the kingdom.",                  href: "/beatitudes",          group: "Story" },
  { title: "Sermon on the Mount",    blurb: "The architecture of Matthew 5-7 — eight movements rising to the rock.",     href: "/beatitudes",          group: "Story" },
  { title: "Seven Last Words",       blurb: "Jesus' seven sayings from the cross laid along the beam itself.",           href: "/seven-words",         group: "Story" },
  { title: "The Twelve",             blurb: "The apostles as a constellation orbiting Christ at the centre.",            href: "/apostles",            group: "Story" },

  // Doctrine
  { title: "Trinity Shield",         blurb: "The medieval Scutum Fidei — three Persons, one God.",                       href: "/resources/creeds",    group: "Doctrine" },
  { title: "Ordo Salutis",           blurb: "The order of salvation as a left-to-right cascade.",                        href: "/beliefs",             group: "Doctrine" },
  { title: "Spiritual Gifts Wheel",  blurb: "Twenty gifts named in the New Testament, around love at the centre.",       href: "/gifts",               group: "Doctrine" },
  { title: "Armor of God",           blurb: "A labelled silhouette of the Ephesians 6 armour.",                          href: "/armor",               group: "Doctrine" },
  { title: "Fruit of the Spirit",    blurb: "Nine petals of one fruit (Galatians 5:22-23).",                             href: "/fruit",               group: "Doctrine" },

  // Time
  { title: "Church Year Wheel",      blurb: "Nine colour-coded season arcs with a pointer at today.",                    href: "/calendar",            group: "Time" },
  { title: "Daily Office Clock",     blurb: "A 24-hour face with the four offices, hand tracking the current hour.",     href: "/hours",               group: "Time" },
  { title: "Sabbath Rhythm",         blurb: "Six work-tiles and one flame-coloured rest tile.",                          href: "/sabbath",             group: "Time" },

  // Prayer & Practice
  { title: "Lord's Prayer Diagram",  blurb: "The architecture Jesus gave — address, Godward, usward, doxology.",         href: "/pray",                group: "Prayer & Practice" },
  { title: "ACTS Prayer Wheel",      blurb: "Adoration, Confession, Thanksgiving, Supplication — flowing clockwise.",     href: "/pray",                group: "Prayer & Practice" },
  { title: "Examen Flow",            blurb: "Thank → notice → repent → ask — the four-step evening rhythm.",             href: "/examen",              group: "Prayer & Practice" },
  { title: "Rule of Life Dial",      blurb: "Daily / weekly / monthly / yearly bands around Christ.",                    href: "/rule",                group: "Prayer & Practice" },
  { title: "Disciplines Wheel",      blurb: "Eight historic disciplines as spokes around Christ.",                       href: "/resources/disciplines", group: "Prayer & Practice" },

  // Mission
  { title: "Acts 1:8 Circles",       blurb: "Jerusalem → Judea → Samaria → ends of the earth.",                          href: "/witness",             group: "Mission" },
  { title: "Discipleship Stations",  blurb: "Seven stations from praying-for to reproducing.",                           href: "/disciple/journey",    group: "Mission" },
  { title: "Vocation Funnel",        blurb: "From the general call to particular sending.",                              href: "/vocation",            group: "Mission" },

  // Walk
  { title: "Practice Heatmap",       blurb: "A year of your practice grid, pulled from local profile data.",             href: "/me",                  group: "Walk" },
  { title: "Memory Progress",        blurb: "Each curated verse, shaded by mastery level.",                              href: "/memory",              group: "Walk" },
];

const GROUPS: Figure["group"][] = ["Story", "Doctrine", "Time", "Prayer & Practice", "Mission", "Walk"];

export default function FiguresPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        Figures of the <span className="gradient-text">faith.</span>
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        Beautiful, interactive diagrams scattered across the site — gathered here in one
        place. Geometry doing theology: the Cross at the centre of history, fruit as one
        plant with nine facets, the believer's calling narrowing from "made on purpose"
        to "sent." Visit any figure to read it; the text below each is its companion.
      </p>

      <div className="mt-12 space-y-12">
        {GROUPS.map((group) => {
          const items = FIGURES.filter((f) => f.group === group);
          return (
            <section key={group}>
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="font-serif text-2xl text-ink-900">{group}</h2>
                <span className="text-[10px] uppercase tracking-widest text-ink-500">
                  {items.length} {items.length === 1 ? "figure" : "figures"}
                </span>
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((f) => (
                  <li key={f.title}>
                    <Link
                      href={f.href}
                      className="group block rounded-2xl border border-ink-200 bg-card hover:border-flame-500/60 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all p-5"
                    >
                      <div className="text-[10px] uppercase tracking-widest text-flame-700">
                        Figure
                      </div>
                      <div className="font-serif text-lg text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
                        {f.title}
                      </div>
                      <p className="text-sm text-ink-700 mt-2 leading-relaxed">{f.blurb}</p>
                      <div className="mt-3 text-xs text-ink-500">{f.href}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-xl md:text-2xl leading-snug italic">
          &ldquo;The heavens declare the glory of God, and the firmament shows His handiwork.&rdquo;
        </p>
        <p className="mt-2 text-ink-300">— Psalm 19:1</p>
      </div>
    </section>
  );
}
