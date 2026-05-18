import Link from "next/link";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "Bible atlas — Scripture Theory",
  description:
    "The geography of Scripture: where the events happened. Curated maps and routes from creation to the apostolic journeys, drawn from public-domain biblical atlases.",
};

type Region = {
  id: string;
  era: string;
  title: string;
  blurb: string;
  places: { name: string; what: string; ref?: string }[];
};

const REGIONS: Region[] = [
  {
    id: "garden-eden",
    era: "Before history · Genesis 2",
    title: "The Garden, the Rivers, and the World Begins",
    blurb:
      "Eden lay east of Mesopotamia, watered by four rivers — Pishon, Gihon, Tigris, Euphrates. The Tigris and Euphrates we still trace today; the others are lost. The point is geography: the story of God begins in a real place.",
    places: [
      { name: "Eden", what: "The garden God planted for the first humans", ref: "Genesis 2:8" },
      { name: "Tigris & Euphrates", what: "The two surviving rivers of Eden's four", ref: "Genesis 2:14" },
      { name: "Ararat", what: "Where Noah's ark came to rest after the flood", ref: "Genesis 8:4" },
      { name: "Babel (Babylon)", what: "Where humanity's languages were divided", ref: "Genesis 11:9" },
      { name: "Ur of the Chaldeans", what: "Abraham's hometown — southern Mesopotamia", ref: "Genesis 11:31" },
    ],
  },
  {
    id: "patriarchs",
    era: "c. 2000–1700 B.C. · Genesis 12–50",
    title: "The Patriarchs — Promise on the Move",
    blurb:
      "Abraham walks from Ur to Canaan, the land God promises. The trail loops through Egypt, the Negev, Hebron, Bethel, Beersheba. By the end of Genesis the family is in Egypt, set up for the next chapter.",
    places: [
      { name: "Haran", what: "Where Abraham's family paused before entering Canaan", ref: "Genesis 12:4" },
      { name: "Shechem", what: "Abraham's first altar in the land of promise", ref: "Genesis 12:6–7" },
      { name: "Bethel", what: "Jacob's ladder dream; later a regular altar of the family", ref: "Genesis 28:19" },
      { name: "Mount Moriah", what: "Where Abraham offered Isaac; later Solomon's temple", ref: "Genesis 22:2" },
      { name: "Hebron", what: "Burial cave of Abraham, Sarah, Isaac, Rebekah, Jacob, Leah", ref: "Genesis 23:19" },
      { name: "Beersheba", what: "Well of the oath — the southern boundary of the land", ref: "Genesis 21:31" },
      { name: "Goshen (Egypt)", what: "Where Joseph settled his family during famine", ref: "Genesis 47:6" },
    ],
  },
  {
    id: "exodus-wandering",
    era: "c. 1446 / 1290 B.C. · Exodus – Deuteronomy",
    title: "The Exodus and Forty Years in the Wilderness",
    blurb:
      "From Goshen, through the Sea of Reeds, around Sinai, to the edge of Canaan east of the Jordan. Israel is shaped as a people in the desert before they take the land.",
    places: [
      { name: "Rameses → Succoth", what: "The first leg of the exodus march", ref: "Exodus 12:37" },
      { name: "The Sea of Reeds (Red Sea)", what: "The crossing where Pharaoh's army drowned", ref: "Exodus 14" },
      { name: "Mount Sinai (Horeb)", what: "The mountain of the giving of the Law", ref: "Exodus 19" },
      { name: "Kadesh-barnea", what: "Where Israel refused the land and was sent back into the wilderness", ref: "Numbers 13–14" },
      { name: "The Plains of Moab", what: "Israel's last camp before crossing the Jordan", ref: "Numbers 22:1" },
      { name: "Mount Nebo / Pisgah", what: "Where Moses saw the land and died", ref: "Deuteronomy 34" },
    ],
  },
  {
    id: "conquest-judges",
    era: "c. 1400–1050 B.C. · Joshua – 1 Samuel",
    title: "The Conquest and the Judges",
    blurb:
      "Joshua leads Israel across the Jordan; the land is divided among twelve tribes. For the next two centuries Israel is a tribal confederation under intermittent judges — until they ask for a king.",
    places: [
      { name: "Jericho", what: "First city to fall after the Jordan crossing", ref: "Joshua 6" },
      { name: "Ai & Bethel", what: "The early Canaan campaign", ref: "Joshua 7–8" },
      { name: "Gibeon", what: "The day the sun stood still", ref: "Joshua 10:12–13" },
      { name: "Shiloh", what: "Where the tabernacle stood for centuries before Jerusalem", ref: "Joshua 18:1" },
      { name: "Hazor", what: "The great northern city Israel burned under Joshua", ref: "Joshua 11:10–13" },
      { name: "Ramah", what: "Samuel's home and judging seat", ref: "1 Samuel 7:17" },
    ],
  },
  {
    id: "united-kingdom",
    era: "c. 1050–930 B.C. · 1 Samuel – 1 Kings 11",
    title: "Saul, David, and Solomon — the United Kingdom",
    blurb:
      "Saul reigns from Gibeah. David expands the kingdom, brings the ark to Jerusalem, and is given the everlasting-throne promise. Solomon builds the temple on Mount Moriah.",
    places: [
      { name: "Bethlehem", what: "David's hometown; the prophet Samuel anointed him here", ref: "1 Samuel 16:1" },
      { name: "Valley of Elah", what: "Where David killed Goliath", ref: "1 Samuel 17:2" },
      { name: "Hebron", what: "David's first capital, seven years before Jerusalem", ref: "2 Samuel 5:5" },
      { name: "Jerusalem (Zion / City of David)", what: "Captured from the Jebusites; capital for the rest of Israel's history", ref: "2 Samuel 5:7" },
      { name: "Mount Moriah / Temple Mount", what: "Solomon built the first temple here", ref: "2 Chronicles 3:1" },
      { name: "Megiddo", what: "Strategic fortress city; will give its name to Armageddon", ref: "1 Kings 9:15" },
    ],
  },
  {
    id: "divided-kingdom",
    era: "930–586 B.C. · 1 Kings 12 – 2 Kings",
    title: "The Divided Kingdom and the Exiles",
    blurb:
      "After Solomon, Israel splits — ten northern tribes (capital Samaria) and Judah (capital Jerusalem). Both eventually fall: Israel to Assyria in 722, Judah to Babylon in 586.",
    places: [
      { name: "Samaria", what: "Capital of the northern kingdom, built by Omri", ref: "1 Kings 16:24" },
      { name: "Mount Carmel", what: "Where Elijah confronted the prophets of Baal", ref: "1 Kings 18" },
      { name: "Nineveh", what: "Capital of Assyria — Jonah's city", ref: "Jonah 1:2" },
      { name: "Babylon", what: "Capital of the empire that took Judah into exile", ref: "2 Kings 25:1" },
      { name: "Susa", what: "Persian capital where Esther served", ref: "Esther 1:2" },
    ],
  },
  {
    id: "second-temple",
    era: "538 B.C. – A.D. 30 · Ezra – the Gospels",
    title: "The Return, the Second Temple, and the Coming of Christ",
    blurb:
      "Persia lets the exiles go home. The temple is rebuilt under Zerubbabel and Ezra; Nehemiah rebuilds the walls. Four hundred years of silence — then the Word becomes flesh in Bethlehem.",
    places: [
      { name: "Bethlehem of Judea", what: "Where Christ was born — fulfilling Micah 5:2", ref: "Matthew 2:1" },
      { name: "Nazareth", what: "Jesus' hometown in Galilee", ref: "Luke 2:39" },
      { name: "The Jordan River", what: "Where John baptized Jesus", ref: "Matthew 3:13" },
      { name: "Capernaum", what: "Jesus' Galilean ministry base", ref: "Matthew 4:13" },
      { name: "Sea of Galilee", what: "Where Jesus called His first disciples, calmed the storm, walked on water", ref: "Mark 4:35–41" },
      { name: "Caesarea Philippi", what: "Where Peter confessed Jesus as the Christ", ref: "Matthew 16:13–16" },
      { name: "Bethany", what: "Home of Mary, Martha, and the raised Lazarus", ref: "John 11:1" },
      { name: "Gethsemane", what: "The garden of His agony before the cross", ref: "Matthew 26:36" },
      { name: "Golgotha", what: "The place of the Skull — where He was crucified", ref: "John 19:17" },
      { name: "Emmaus", what: "Where the risen Christ opened the Scriptures", ref: "Luke 24:13" },
    ],
  },
  {
    id: "apostolic",
    era: "A.D. 30–95 · Acts – Revelation",
    title: "The Apostles — The Gospel Goes to the Ends of the Earth",
    blurb:
      "From Jerusalem outward in concentric circles: Judea, Samaria, the Roman world. Paul's three missionary journeys take the gospel through Asia Minor, Greece, and finally Rome.",
    places: [
      { name: "Jerusalem", what: "Pentecost; the first church; the apostles' base", ref: "Acts 2" },
      { name: "Antioch (Syria)", what: "Where believers were first called \"Christians\"; Paul's sending church", ref: "Acts 11:26" },
      { name: "Damascus", what: "Where Saul met the risen Christ on the road", ref: "Acts 9:3" },
      { name: "Philippi", what: "First Christian convert in Europe — Lydia", ref: "Acts 16:14" },
      { name: "Athens", what: "Paul on Mars Hill before the philosophers", ref: "Acts 17:22" },
      { name: "Corinth", what: "Paul's eighteen-month stay; two letters survive", ref: "Acts 18:11" },
      { name: "Ephesus", what: "Paul's three-year base in Asia Minor", ref: "Acts 19:10" },
      { name: "Rome", what: "Paul's house arrest; the imperial capital reached", ref: "Acts 28:16" },
      { name: "Patmos", what: "Where John received the Revelation of Jesus Christ", ref: "Revelation 1:9" },
    ],
  },
];

export default function AtlasPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Bible Atlas</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        The Word happened in a real place.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        Christianity is not a myth in a vague otherworld. It is a story told in named cities,
        on real roads, under skies the same stars still cross. Below is the geography of
        Scripture — eight movements, dozens of places, every one of them linked to the verse
        that names it.
      </p>

      <div className="mt-8 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6">
        <p className="font-serif text-lg text-ink-900 leading-snug italic">
          "The Word became flesh and dwelt among us, and we beheld His glory."
        </p>
        <p className="mt-1 text-sm text-ink-500">— John 1:14</p>
      </div>

      <nav className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-5">
        <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
          Eight movements
        </div>
        <ul className="flex flex-wrap gap-2 text-sm">
          {REGIONS.map((r) => (
            <li key={r.id}>
              <a
                href={`#${r.id}`}
                className="rounded-full border border-ink-300 bg-card px-3.5 py-1 text-ink-700 hover:border-flame-500 hover:text-flame-700"
              >
                {r.title.split("—")[0].trim().split("·")[0].trim().slice(0, 28)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-10">
        {REGIONS.map((r) => (
          <article
            key={r.id}
            id={r.id}
            className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 scroll-mt-24"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">{r.era}</div>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1 leading-tight">
              {r.title}
            </h2>
            <p className="mt-3 text-ink-700 leading-relaxed">{r.blurb}</p>

            <ul className="mt-5 space-y-2">
              {r.places.map((p) => (
                <li
                  key={p.name}
                  className="rounded-xl border border-ink-200 bg-card-subtle p-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="font-serif text-ink-900">{p.name}</span>
                  <span className="text-sm text-ink-700 flex-1 min-w-[12rem]">{p.what}</span>
                  {p.ref && (
                    <ScriptureRef
                      reference={p.ref}
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
        <strong className="text-ink-900">For full maps</strong> — a curated atlas works best
        alongside actual maps you can zoom and pan. We commend the free public-domain biblical
        atlases at{" "}
        <a
          href="https://www.openbible.info/geo/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-flame-700 hover:underline"
        >
          OpenBible.info Geocoded Places
        </a>{" "}
        and the historic maps of Smith's Bible Atlas (1858) preserved at{" "}
        <a
          href="https://www.ccel.org/bible/atlas/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-flame-700 hover:underline"
        >
          CCEL
        </a>
        . Both are free, faithful, and as detailed as you can stand.
      </div>

      <div className="mt-10 text-center">
        <Link href="/resources" className="text-sm text-flame-700 hover:underline">
          ← Back to Resources
        </Link>
      </div>
    </section>
  );
}
