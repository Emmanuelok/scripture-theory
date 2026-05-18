/**
 * Bible Lands atlas data.
 *
 * Each named place in Scripture's story carries the (lat, lon) coordinate
 * the historic site is identified with — drawn from public-domain biblical
 * geography (Smith's Bible Atlas, modern OSM geocoding). When a place is
 * truly contested or unknown (Eden's "Pishon" and "Gihon," the precise
 * route of the Exodus, the location of Mount Sinai) we mark it as
 * approximate.
 *
 * The eras and the editorial structure are unchanged from the page that
 * surfaced this content; the only new thing is geography.
 */

export type EraId =
  | "garden-eden"
  | "patriarchs"
  | "exodus-wandering"
  | "conquest-judges"
  | "united-kingdom"
  | "divided-kingdom"
  | "second-temple"
  | "apostolic";

export type AtlasPlace = {
  name: string;
  what: string;
  ref?: string;
  /** Latitude in degrees north. */
  lat: number;
  /** Longitude in degrees east. */
  lon: number;
  /** Mark as ~ when the site is contested or only roughly localized. */
  approx?: boolean;
};

export type AtlasRegion = {
  id: EraId;
  era: string;
  title: string;
  blurb: string;
  /** Visualized color for dots in this era. */
  color: string;
  places: AtlasPlace[];
};

export const atlasRegions: AtlasRegion[] = [
  {
    id: "garden-eden",
    era: "Before history · Genesis 2",
    title: "The Garden, the Rivers, and the World Begins",
    blurb:
      "Eden lay east of Mesopotamia, watered by four rivers — Pishon, Gihon, Tigris, Euphrates. The Tigris and Euphrates we still trace today; the others are lost. The point is geography: the story of God begins in a real place.",
    color: "#a1a1aa", // zinc-400
    places: [
      { name: "Eden (approximate)", what: "The garden God planted for the first humans", ref: "Genesis 2:8", lat: 33.5, lon: 44.0, approx: true },
      { name: "Tigris & Euphrates", what: "The two surviving rivers of Eden's four", ref: "Genesis 2:14", lat: 33.0, lon: 43.5 },
      { name: "Ararat", what: "Where Noah's ark came to rest after the flood", ref: "Genesis 8:4", lat: 39.7, lon: 44.3 },
      { name: "Babel (Babylon)", what: "Where humanity's languages were divided", ref: "Genesis 11:9", lat: 32.54, lon: 44.42 },
      { name: "Ur of the Chaldeans", what: "Abraham's hometown — southern Mesopotamia", ref: "Genesis 11:31", lat: 30.96, lon: 46.10 },
    ],
  },
  {
    id: "patriarchs",
    era: "c. 2000–1700 B.C. · Genesis 12–50",
    title: "The Patriarchs — Promise on the Move",
    blurb:
      "Abraham walks from Ur to Canaan, the land God promises. The trail loops through Egypt, the Negev, Hebron, Bethel, Beersheba. By the end of Genesis the family is in Egypt, set up for the next chapter.",
    color: "#f59e0b", // amber-500
    places: [
      { name: "Haran", what: "Where Abraham's family paused before entering Canaan", ref: "Genesis 12:4", lat: 36.86, lon: 39.03 },
      { name: "Shechem", what: "Abraham's first altar in the land of promise", ref: "Genesis 12:6–7", lat: 32.21, lon: 35.28 },
      { name: "Bethel", what: "Jacob's ladder dream; later a regular altar of the family", ref: "Genesis 28:19", lat: 31.93, lon: 35.22 },
      { name: "Mount Moriah", what: "Where Abraham offered Isaac; later Solomon's temple", ref: "Genesis 22:2", lat: 31.78, lon: 35.235 },
      { name: "Hebron", what: "Burial cave of Abraham, Sarah, Isaac, Rebekah, Jacob, Leah", ref: "Genesis 23:19", lat: 31.53, lon: 35.10 },
      { name: "Beersheba", what: "Well of the oath — the southern boundary of the land", ref: "Genesis 21:31", lat: 31.25, lon: 34.79 },
      { name: "Goshen (Egypt)", what: "Where Joseph settled his family during famine", ref: "Genesis 47:6", lat: 30.83, lon: 31.93 },
    ],
  },
  {
    id: "exodus-wandering",
    era: "c. 1446 / 1290 B.C. · Exodus – Deuteronomy",
    title: "The Exodus and Forty Years in the Wilderness",
    blurb:
      "From Goshen, through the Sea of Reeds, around Sinai, to the edge of Canaan east of the Jordan. Israel is shaped as a people in the desert before they take the land.",
    color: "#f97316", // orange-500
    places: [
      { name: "Rameses → Succoth", what: "The first leg of the exodus march", ref: "Exodus 12:37", lat: 30.70, lon: 31.85 },
      { name: "The Sea of Reeds (Red Sea)", what: "The crossing where Pharaoh's army drowned", ref: "Exodus 14:21", lat: 30.0, lon: 32.5, approx: true },
      { name: "Mount Sinai (traditional Horeb)", what: "The mountain of the giving of the Law", ref: "Exodus 19:18", lat: 28.54, lon: 33.97, approx: true },
      { name: "Kadesh-barnea", what: "Where Israel refused the land and was sent back into the wilderness", ref: "Numbers 13:26", lat: 30.66, lon: 34.43 },
      { name: "The Plains of Moab", what: "Israel's last camp before crossing the Jordan", ref: "Numbers 22:1", lat: 31.85, lon: 35.62 },
      { name: "Mount Nebo / Pisgah", what: "Where Moses saw the land and died", ref: "Deuteronomy 34:1", lat: 31.77, lon: 35.73 },
    ],
  },
  {
    id: "conquest-judges",
    era: "c. 1400–1050 B.C. · Joshua – 1 Samuel",
    title: "The Conquest and the Judges",
    blurb:
      "Joshua leads Israel across the Jordan; the land is divided among twelve tribes. For the next two centuries Israel is a tribal confederation under intermittent judges — until they ask for a king.",
    color: "#84cc16", // lime-500
    places: [
      { name: "Jericho", what: "First city to fall after the Jordan crossing", ref: "Joshua 6:20", lat: 31.87, lon: 35.44 },
      { name: "Ai", what: "The early Canaan campaign — second city after Jericho", ref: "Joshua 8:1", lat: 31.92, lon: 35.27 },
      { name: "Gibeon", what: "The day the sun stood still", ref: "Joshua 10:12–13", lat: 31.85, lon: 35.18 },
      { name: "Shiloh", what: "Where the tabernacle stood for centuries before Jerusalem", ref: "Joshua 18:1", lat: 32.06, lon: 35.29 },
      { name: "Hazor", what: "The great northern city Israel burned under Joshua", ref: "Joshua 11:10–13", lat: 33.02, lon: 35.57 },
      { name: "Ramah", what: "Samuel's home and judging seat", ref: "1 Samuel 7:17", lat: 31.89, lon: 35.21 },
    ],
  },
  {
    id: "united-kingdom",
    era: "c. 1050–930 B.C. · 1 Samuel – 1 Kings 11",
    title: "Saul, David, and Solomon — the United Kingdom",
    blurb:
      "Saul reigns from Gibeah. David expands the kingdom, brings the ark to Jerusalem, and is given the everlasting-throne promise. Solomon builds the temple on Mount Moriah.",
    color: "#8b5cf6", // violet-500
    places: [
      { name: "Bethlehem", what: "David's hometown; the prophet Samuel anointed him here", ref: "1 Samuel 16:1", lat: 31.70, lon: 35.20 },
      { name: "Valley of Elah", what: "Where David killed Goliath", ref: "1 Samuel 17:2", lat: 31.69, lon: 34.95 },
      { name: "Hebron (David's first capital)", what: "Where David reigned seven years before Jerusalem", ref: "2 Samuel 5:5", lat: 31.535, lon: 35.105 },
      { name: "Jerusalem (City of David)", what: "Captured from the Jebusites; capital for the rest of Israel's history", ref: "2 Samuel 5:7", lat: 31.78, lon: 35.23 },
      { name: "Megiddo", what: "Strategic fortress city; will give its name to Armageddon", ref: "1 Kings 9:15", lat: 32.58, lon: 35.18 },
    ],
  },
  {
    id: "divided-kingdom",
    era: "930–586 B.C. · 1 Kings 12 – 2 Kings",
    title: "The Divided Kingdom and the Exiles",
    blurb:
      "After Solomon, Israel splits — ten northern tribes (capital Samaria) and Judah (capital Jerusalem). Both eventually fall: Israel to Assyria in 722, Judah to Babylon in 586.",
    color: "#f43f5e", // rose-500
    places: [
      { name: "Samaria", what: "Capital of the northern kingdom, built by Omri", ref: "1 Kings 16:24", lat: 32.28, lon: 35.19 },
      { name: "Mount Carmel", what: "Where Elijah confronted the prophets of Baal", ref: "1 Kings 18:19", lat: 32.73, lon: 35.05 },
      { name: "Nineveh", what: "Capital of Assyria — Jonah's city", ref: "Jonah 1:2", lat: 36.36, lon: 43.16 },
      { name: "Babylon", what: "Capital of the empire that took Judah into exile", ref: "2 Kings 25:1", lat: 32.54, lon: 44.42 },
      { name: "Susa", what: "Persian capital where Esther served", ref: "Esther 1:2", lat: 32.19, lon: 48.26 },
    ],
  },
  {
    id: "second-temple",
    era: "538 B.C. – A.D. 30 · Ezra – the Gospels",
    title: "The Return, the Second Temple, and the Coming of Christ",
    blurb:
      "Persia lets the exiles go home. The temple is rebuilt under Zerubbabel and Ezra; Nehemiah rebuilds the walls. Four hundred years of silence — then the Word becomes flesh in Bethlehem.",
    color: "#0ea5e9", // sky-500
    places: [
      { name: "Bethlehem of Judea", what: "Where Christ was born — fulfilling Micah 5:2", ref: "Matthew 2:1", lat: 31.70, lon: 35.20 },
      { name: "Nazareth", what: "Jesus' hometown in Galilee", ref: "Luke 2:39", lat: 32.70, lon: 35.30 },
      { name: "The Jordan River", what: "Where John baptized Jesus", ref: "Matthew 3:13", lat: 32.31, lon: 35.57 },
      { name: "Capernaum", what: "Jesus' Galilean ministry base", ref: "Matthew 4:13", lat: 32.88, lon: 35.57 },
      { name: "Sea of Galilee", what: "Where Jesus called His first disciples, calmed the storm, walked on water", ref: "Mark 4:35–41", lat: 32.83, lon: 35.59 },
      { name: "Caesarea Philippi", what: "Where Peter confessed Jesus as the Christ", ref: "Matthew 16:13–16", lat: 33.25, lon: 35.69 },
      { name: "Bethany", what: "Home of Mary, Martha, and the raised Lazarus", ref: "John 11:1", lat: 31.77, lon: 35.26 },
      { name: "Gethsemane", what: "The garden of His agony before the cross", ref: "Matthew 26:36", lat: 31.78, lon: 35.24 },
      { name: "Golgotha (Jerusalem)", what: "The place of the Skull — where He was crucified", ref: "John 19:17", lat: 31.78, lon: 35.23 },
      { name: "Emmaus", what: "Where the risen Christ opened the Scriptures", ref: "Luke 24:13", lat: 31.84, lon: 35.0, approx: true },
    ],
  },
  {
    id: "apostolic",
    era: "A.D. 30–95 · Acts – Revelation",
    title: "The Apostles — The Gospel Goes to the Ends of the Earth",
    blurb:
      "From Jerusalem outward in concentric circles: Judea, Samaria, the Roman world. Paul's three missionary journeys take the gospel through Asia Minor, Greece, and finally Rome.",
    color: "#ef4444", // red-500
    places: [
      { name: "Jerusalem (Pentecost)", what: "Pentecost; the first church; the apostles' base", ref: "Acts 2:1", lat: 31.781, lon: 35.231 },
      { name: "Antioch (Syria)", what: "Where believers were first called \"Christians\"; Paul's sending church", ref: "Acts 11:26", lat: 36.20, lon: 36.16 },
      { name: "Damascus", what: "Where Saul met the risen Christ on the road", ref: "Acts 9:3", lat: 33.51, lon: 36.30 },
      { name: "Philippi", what: "First Christian convert in Europe — Lydia", ref: "Acts 16:14", lat: 41.01, lon: 24.29 },
      { name: "Athens", what: "Paul on Mars Hill before the philosophers", ref: "Acts 17:22", lat: 37.98, lon: 23.73 },
      { name: "Corinth", what: "Paul's eighteen-month stay; two letters survive", ref: "Acts 18:11", lat: 37.94, lon: 22.93 },
      { name: "Ephesus", what: "Paul's three-year base in Asia Minor", ref: "Acts 19:10", lat: 37.95, lon: 27.37 },
      { name: "Rome", what: "Paul's house arrest; the imperial capital reached", ref: "Acts 28:16", lat: 41.90, lon: 12.50 },
      { name: "Patmos", what: "Where John received the Revelation of Jesus Christ", ref: "Revelation 1:9", lat: 37.32, lon: 26.55 },
    ],
  },
];

/** Bounding box of the lands the Bible names (approximately). */
export const BIBLE_LANDS_BBOX = {
  west: 10,   // Rome's longitude minus a margin
  east: 50,   // east of Susa
  south: 24,  // south of Sinai
  north: 43,  // north of Ararat / Black Sea coast
};
