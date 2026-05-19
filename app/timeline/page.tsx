import Link from "next/link";
import ScriptureRef from "@/components/ScriptureRef";
import BiblicalTimelineFigure from "@/components/BiblicalTimelineFigure";
import DaysOfCreation from "@/components/DaysOfCreation";

export const metadata = {
  title: "Biblical timeline — Scripture Theory",
  description:
    "From creation to the Apocalypse — the unfolding plot of Scripture. A reverent, dateable timeline of the biblical story with the events that matter and the One they all point to.",
};

type Era = {
  id: string;
  range: string; // approximate dates
  title: string;
  blurb: string;
  events: { when: string; what: string; ref?: string }[];
};

const ERAS: Era[] = [
  {
    id: "before-time",
    range: "Eternity past",
    title: "Before time — the eternal Son",
    blurb:
      "Before there was a universe to date, there was God — Father, Son, and Spirit — perfect in love. Scripture's story does not begin at the dotted line of time. It enters time.",
    events: [
      { when: "Eternity", what: "The Word was with God and was God", ref: "John 1:1" },
      { when: "Eternity", what: "The Father loved the Son", ref: "John 17:24" },
      { when: "Eternity", what: "Christ chosen as the Lamb before the foundation of the world", ref: "1 Peter 1:20" },
    ],
  },
  {
    id: "creation",
    range: "Creation",
    title: "Creation and the Fall",
    blurb:
      "God speaks, and a universe is. Humans are made in His image. They reach for the one tree they were told not to — and the long ache of redemption begins. The first preaching of the gospel comes within four chapters.",
    events: [
      { when: "Day One", what: "The Spirit hovers; God says, \"Let there be light.\"", ref: "Genesis 1:3" },
      { when: "Day Six", what: "God forms man from dust and breathes life", ref: "Genesis 2:7" },
      { when: "The Fall", what: "The protoevangelium — the Seed who will crush the serpent", ref: "Genesis 3:15" },
      { when: "Generations", what: "The flood; Noah's ark; the rainbow covenant", ref: "Genesis 9:13" },
    ],
  },
  {
    id: "patriarchs",
    range: "c. 2100–1700 B.C.",
    title: "The Patriarchs — the promise to Abraham",
    blurb:
      "Out of an idolatrous Mesopotamia, God calls one man — Abraham — and promises a land, a people, and a blessing for all the nations. The family line that will lead to Christ begins.",
    events: [
      { when: "c. 2091 B.C.", what: "The call of Abram from Ur", ref: "Genesis 12:1" },
      { when: "c. 2066", what: "Isaac is born", ref: "Genesis 21:2" },
      { when: "c. 2050", what: "Abraham offers Isaac on Mount Moriah", ref: "Genesis 22:9" },
      { when: "c. 2006", what: "Jacob and Esau are born", ref: "Genesis 25:25–26" },
      { when: "c. 1876", what: "Joseph saves his family in Egypt", ref: "Genesis 45:7" },
    ],
  },
  {
    id: "exodus",
    range: "c. 1446 B.C. (or 1290) – c. 1406 B.C.",
    title: "Egypt, Exodus, and Sinai",
    blurb:
      "Four hundred years in Egypt. A baby in a basket. Ten plagues. A sea parted. A mountain on fire. The Law given. Forty years in the wilderness. A nation forged.",
    events: [
      { when: "c. 1526", what: "Moses born and hidden in the Nile", ref: "Exodus 2:3" },
      { when: "c. 1446", what: "The Passover and the Exodus", ref: "Exodus 12:31" },
      { when: "c. 1446", what: "The Ten Commandments given at Sinai", ref: "Exodus 20" },
      { when: "c. 1406", what: "Moses dies on Mount Nebo", ref: "Deuteronomy 34:5" },
    ],
  },
  {
    id: "judges-kings",
    range: "c. 1400–586 B.C.",
    title: "Joshua, the Judges, and the Kings",
    blurb:
      "Israel enters the land, settles into tribal life, then asks for a king. David is anointed; the everlasting-throne promise is given; the kingdom rises, splits, and finally falls.",
    events: [
      { when: "c. 1406", what: "Jericho falls; the land is divided among the tribes", ref: "Joshua 6:20" },
      { when: "c. 1050", what: "Saul anointed Israel's first king", ref: "1 Samuel 10:1" },
      { when: "c. 1010", what: "David anointed king at Hebron", ref: "2 Samuel 5:3" },
      { when: "c. 1000", what: "The ark brought to Jerusalem", ref: "2 Samuel 6:17" },
      { when: "c. 1000", what: "The Davidic Covenant — an everlasting throne", ref: "2 Samuel 7:16" },
      { when: "c. 966", what: "Solomon begins to build the temple", ref: "1 Kings 6:1" },
      { when: "930", what: "The kingdom divides — Israel and Judah", ref: "1 Kings 12:19" },
      { when: "722", what: "Assyria destroys Samaria and exiles the ten tribes", ref: "2 Kings 17:6" },
      { when: "586", what: "Babylon destroys Jerusalem; the temple burns", ref: "2 Kings 25:9" },
    ],
  },
  {
    id: "prophets",
    range: "c. 850–430 B.C.",
    title: "The Prophets",
    blurb:
      "Across the long collapse and exile, God sends prophets — Elijah, Isaiah, Jeremiah, Ezekiel, Daniel, the Twelve. They thunder against idolatry and they see further than they say: a Servant who will be pierced, a Branch from David, a Son of Man, a Bethlehem-born King.",
    events: [
      { when: "c. 850", what: "Elijah confronts Baal on Mount Carmel", ref: "1 Kings 18:21" },
      { when: "c. 740", what: "Isaiah called — \"Holy, holy, holy\"", ref: "Isaiah 6:3" },
      { when: "c. 700", what: "Micah names Bethlehem for the coming Ruler", ref: "Micah 5:2" },
      { when: "c. 627", what: "Jeremiah called; the New Covenant prophesied", ref: "Jeremiah 31:31" },
      { when: "c. 593", what: "Ezekiel's visions among the exiles by the Chebar", ref: "Ezekiel 1:1" },
      { when: "c. 540", what: "Daniel sees the Son of Man receive the kingdom", ref: "Daniel 7:13" },
    ],
  },
  {
    id: "return",
    range: "538–432 B.C.",
    title: "The Return and the Second Temple",
    blurb:
      "Persia conquers Babylon. Cyrus lets the exiles go home. Ezra teaches the Law; Nehemiah rebuilds the wall; the second temple is finished. Malachi seals the Old Testament — then four hundred years of silence.",
    events: [
      { when: "538", what: "Cyrus's decree — exiles may return to Jerusalem", ref: "Ezra 1:2" },
      { when: "516", what: "Second temple dedicated", ref: "Ezra 6:15" },
      { when: "458", what: "Ezra teaches the Law", ref: "Ezra 7:10" },
      { when: "445", what: "Nehemiah rebuilds the wall in 52 days", ref: "Nehemiah 6:15" },
      { when: "c. 430", what: "Malachi — \"Behold, I send my messenger\"", ref: "Malachi 3:1" },
    ],
  },
  {
    id: "the-silence",
    range: "c. 430 B.C. – c. 4 B.C.",
    title: "The Four Hundred Years of Silence",
    blurb:
      "No prophet speaks. Empires turn — Persia falls to Greece, Greece to Rome. The Maccabees fight for the temple. Synagogues spread. The Septuagint puts the Old Testament into Greek, the lingua franca that will carry the gospel.",
    events: [
      { when: "331", what: "Alexander the Great conquers Persia", ref: "Daniel 8:5" },
      { when: "c. 250", what: "The Hebrew Scriptures translated into Greek (the Septuagint)" },
      { when: "165", what: "The Maccabean cleansing of the temple — Hanukkah", ref: "John 10:22" },
      { when: "63", what: "Rome takes Jerusalem under Pompey" },
    ],
  },
  {
    id: "advent",
    range: "c. 6/4 B.C. – A.D. 30/33",
    title: "The Coming of Christ",
    blurb:
      "The Word becomes flesh in a Bethlehem stable. Thirty years hidden, three years public, three days that change everything. The first Easter morning splits history.",
    events: [
      { when: "c. 6/4 B.C.", what: "Jesus born in Bethlehem of Judea", ref: "Luke 2:7" },
      { when: "c. A.D. 8", what: "Twelve-year-old Jesus in His Father's house", ref: "Luke 2:46" },
      { when: "c. A.D. 26", what: "John the Baptist begins to preach", ref: "Matthew 3:1" },
      { when: "c. A.D. 27", what: "Jesus baptized in the Jordan; ministry begins", ref: "Matthew 3:13" },
      { when: "c. A.D. 29", what: "Peter confesses Jesus as the Christ at Caesarea Philippi", ref: "Matthew 16:16" },
      { when: "c. A.D. 30 / 33", what: "Crucifixion at Golgotha, resurrection on the third day", ref: "1 Corinthians 15:3–4" },
      { when: "c. A.D. 30 / 33", what: "Ascension forty days after the resurrection", ref: "Acts 1:9" },
    ],
  },
  {
    id: "early-church",
    range: "A.D. 30 – c. 100",
    title: "The Apostolic Church",
    blurb:
      "Pentecost. The first martyrs. Paul on the road to Damascus. Three missionary journeys. The gospel reaches Rome. The New Testament is written. The Spirit fills the earth.",
    events: [
      { when: "c. A.D. 30 / 33", what: "Pentecost — the Spirit poured out", ref: "Acts 2:4" },
      { when: "c. A.D. 34", what: "Stephen martyred — the first to die for Christ", ref: "Acts 7:60" },
      { when: "c. A.D. 35", what: "Saul of Tarsus meets the risen Christ on the Damascus road", ref: "Acts 9:5" },
      { when: "c. A.D. 49", what: "The Jerusalem Council settles the place of the Gentiles", ref: "Acts 15:6" },
      { when: "c. A.D. 50–60", what: "Paul's three missionary journeys", ref: "Acts 13–21" },
      { when: "c. A.D. 60", what: "Paul under house arrest in Rome", ref: "Acts 28:16" },
      { when: "c. A.D. 64", what: "Peter and Paul martyred under Nero (tradition)" },
      { when: "A.D. 70", what: "Romans destroy the second temple", ref: "Matthew 24:2" },
      { when: "c. A.D. 95", what: "John on Patmos receives the Revelation of Jesus Christ", ref: "Revelation 1:9" },
    ],
  },
  {
    id: "until-He-comes",
    range: "A.D. 95 — the day He returns",
    title: "Until He Comes",
    blurb:
      "Two thousand years and still counting. The Church grows from a hundred and twenty in an upper room to two and a half billion across every nation. The story isn't over. The King is coming back.",
    events: [
      { when: "The future", what: "Christ returns in glory to judge the living and the dead", ref: "Revelation 22:20" },
      { when: "The future", what: "A new heaven, a new earth, the dwelling of God with man", ref: "Revelation 21:3" },
    ],
  },
];

export default function TimelinePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Biblical Timeline</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        From eternity past to the day He comes — one Story.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        Christianity is not a collection of separate religious moments. It is a single unfolding
        drama with a single protagonist. The dates below follow the most widely accepted scholarly
        chronologies; on disputed points we give the range honestly.
      </p>

      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6">
        <p className="font-serif text-lg text-ink-900 leading-snug italic">
          "Jesus Christ is the same yesterday and today and forever."
        </p>
        <p className="mt-1 text-sm text-ink-500">— Hebrews 13:8</p>
      </div>

      <BiblicalTimelineFigure />

      <nav className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-5">
        <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
          Eleven eras
        </div>
        <ul className="flex flex-wrap gap-2 text-sm">
          {ERAS.map((e) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1 text-ink-700 hover:border-flame-500 hover:text-flame-700"
              >
                {e.title.split("—")[0].trim().slice(0, 28)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-8">
        {ERAS.map((era) => (
          <article
            key={era.id}
            id={era.id}
            className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 scroll-mt-24"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">{era.range}</div>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1 leading-tight">
              {era.title}
            </h2>
            <p className="mt-3 text-ink-700 leading-relaxed">{era.blurb}</p>

            {era.id === "creation" && (
              <div className="mt-6">
                <DaysOfCreation />
              </div>
            )}

            <ul className="mt-5 space-y-2 border-l-2 border-flame-200 pl-4">
              {era.events.map((ev, i) => (
                <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="text-[11px] uppercase tracking-widest text-flame-700 min-w-[8rem] shrink-0">
                    {ev.when}
                  </span>
                  <span className="text-sm text-ink-800 flex-1 min-w-[12rem]">{ev.what}</span>
                  {ev.ref && (
                    <ScriptureRef
                      reference={ev.ref}
                      underline={false}
                      className="text-[11px] text-flame-700 hover:underline shrink-0"
                    />
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-ink-200 bg-card-subtle p-6 text-sm text-ink-600 leading-relaxed">
        <strong className="text-ink-900">A note on dates.</strong> Where conservative and
        critical scholarship disagree, we typically use the conservative range and indicate
        &ldquo;c.&rdquo; (approximately) before any contested date. Public-domain chronologies
        — Ussher (1650), Anstey (1913), Thiele (1944) — disagree on individual reign dates;
        the overall plot is firm.
      </div>

      <div className="mt-10 text-center">
        <Link href="/resources" className="text-sm text-flame-700 hover:underline">
          ← Back to Resources
        </Link>
      </div>
    </section>
  );
}
