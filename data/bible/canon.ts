export type Testament = "OT" | "NT";

export type BookMeta = {
  id: string; // slug, e.g., "john"
  name: string; // canonical English name
  abbrev: string;
  testament: Testament;
  order: number;
  chapters: number;
};

// Standard 66-book Protestant canon (Roman Catholic & Orthodox add deuterocanon —
// extensible by adding books here).
export const canon: BookMeta[] = [
  // OLD TESTAMENT
  { id: "genesis", name: "Genesis", abbrev: "Gen", testament: "OT", order: 1, chapters: 50 },
  { id: "exodus", name: "Exodus", abbrev: "Exod", testament: "OT", order: 2, chapters: 40 },
  { id: "leviticus", name: "Leviticus", abbrev: "Lev", testament: "OT", order: 3, chapters: 27 },
  { id: "numbers", name: "Numbers", abbrev: "Num", testament: "OT", order: 4, chapters: 36 },
  { id: "deuteronomy", name: "Deuteronomy", abbrev: "Deut", testament: "OT", order: 5, chapters: 34 },
  { id: "joshua", name: "Joshua", abbrev: "Josh", testament: "OT", order: 6, chapters: 24 },
  { id: "judges", name: "Judges", abbrev: "Judg", testament: "OT", order: 7, chapters: 21 },
  { id: "ruth", name: "Ruth", abbrev: "Ruth", testament: "OT", order: 8, chapters: 4 },
  { id: "1samuel", name: "1 Samuel", abbrev: "1 Sam", testament: "OT", order: 9, chapters: 31 },
  { id: "2samuel", name: "2 Samuel", abbrev: "2 Sam", testament: "OT", order: 10, chapters: 24 },
  { id: "1kings", name: "1 Kings", abbrev: "1 Kgs", testament: "OT", order: 11, chapters: 22 },
  { id: "2kings", name: "2 Kings", abbrev: "2 Kgs", testament: "OT", order: 12, chapters: 25 },
  { id: "1chronicles", name: "1 Chronicles", abbrev: "1 Chr", testament: "OT", order: 13, chapters: 29 },
  { id: "2chronicles", name: "2 Chronicles", abbrev: "2 Chr", testament: "OT", order: 14, chapters: 36 },
  { id: "ezra", name: "Ezra", abbrev: "Ezra", testament: "OT", order: 15, chapters: 10 },
  { id: "nehemiah", name: "Nehemiah", abbrev: "Neh", testament: "OT", order: 16, chapters: 13 },
  { id: "esther", name: "Esther", abbrev: "Esth", testament: "OT", order: 17, chapters: 10 },
  { id: "job", name: "Job", abbrev: "Job", testament: "OT", order: 18, chapters: 42 },
  { id: "psalms", name: "Psalms", abbrev: "Ps", testament: "OT", order: 19, chapters: 150 },
  { id: "proverbs", name: "Proverbs", abbrev: "Prov", testament: "OT", order: 20, chapters: 31 },
  { id: "ecclesiastes", name: "Ecclesiastes", abbrev: "Eccl", testament: "OT", order: 21, chapters: 12 },
  { id: "songofsongs", name: "Song of Songs", abbrev: "Song", testament: "OT", order: 22, chapters: 8 },
  { id: "isaiah", name: "Isaiah", abbrev: "Isa", testament: "OT", order: 23, chapters: 66 },
  { id: "jeremiah", name: "Jeremiah", abbrev: "Jer", testament: "OT", order: 24, chapters: 52 },
  { id: "lamentations", name: "Lamentations", abbrev: "Lam", testament: "OT", order: 25, chapters: 5 },
  { id: "ezekiel", name: "Ezekiel", abbrev: "Ezek", testament: "OT", order: 26, chapters: 48 },
  { id: "daniel", name: "Daniel", abbrev: "Dan", testament: "OT", order: 27, chapters: 12 },
  { id: "hosea", name: "Hosea", abbrev: "Hos", testament: "OT", order: 28, chapters: 14 },
  { id: "joel", name: "Joel", abbrev: "Joel", testament: "OT", order: 29, chapters: 3 },
  { id: "amos", name: "Amos", abbrev: "Amos", testament: "OT", order: 30, chapters: 9 },
  { id: "obadiah", name: "Obadiah", abbrev: "Obad", testament: "OT", order: 31, chapters: 1 },
  { id: "jonah", name: "Jonah", abbrev: "Jonah", testament: "OT", order: 32, chapters: 4 },
  { id: "micah", name: "Micah", abbrev: "Mic", testament: "OT", order: 33, chapters: 7 },
  { id: "nahum", name: "Nahum", abbrev: "Nah", testament: "OT", order: 34, chapters: 3 },
  { id: "habakkuk", name: "Habakkuk", abbrev: "Hab", testament: "OT", order: 35, chapters: 3 },
  { id: "zephaniah", name: "Zephaniah", abbrev: "Zeph", testament: "OT", order: 36, chapters: 3 },
  { id: "haggai", name: "Haggai", abbrev: "Hag", testament: "OT", order: 37, chapters: 2 },
  { id: "zechariah", name: "Zechariah", abbrev: "Zech", testament: "OT", order: 38, chapters: 14 },
  { id: "malachi", name: "Malachi", abbrev: "Mal", testament: "OT", order: 39, chapters: 4 },
  // NEW TESTAMENT
  { id: "matthew", name: "Matthew", abbrev: "Matt", testament: "NT", order: 40, chapters: 28 },
  { id: "mark", name: "Mark", abbrev: "Mark", testament: "NT", order: 41, chapters: 16 },
  { id: "luke", name: "Luke", abbrev: "Luke", testament: "NT", order: 42, chapters: 24 },
  { id: "john", name: "John", abbrev: "John", testament: "NT", order: 43, chapters: 21 },
  { id: "acts", name: "Acts", abbrev: "Acts", testament: "NT", order: 44, chapters: 28 },
  { id: "romans", name: "Romans", abbrev: "Rom", testament: "NT", order: 45, chapters: 16 },
  { id: "1corinthians", name: "1 Corinthians", abbrev: "1 Cor", testament: "NT", order: 46, chapters: 16 },
  { id: "2corinthians", name: "2 Corinthians", abbrev: "2 Cor", testament: "NT", order: 47, chapters: 13 },
  { id: "galatians", name: "Galatians", abbrev: "Gal", testament: "NT", order: 48, chapters: 6 },
  { id: "ephesians", name: "Ephesians", abbrev: "Eph", testament: "NT", order: 49, chapters: 6 },
  { id: "philippians", name: "Philippians", abbrev: "Phil", testament: "NT", order: 50, chapters: 4 },
  { id: "colossians", name: "Colossians", abbrev: "Col", testament: "NT", order: 51, chapters: 4 },
  { id: "1thessalonians", name: "1 Thessalonians", abbrev: "1 Thess", testament: "NT", order: 52, chapters: 5 },
  { id: "2thessalonians", name: "2 Thessalonians", abbrev: "2 Thess", testament: "NT", order: 53, chapters: 3 },
  { id: "1timothy", name: "1 Timothy", abbrev: "1 Tim", testament: "NT", order: 54, chapters: 6 },
  { id: "2timothy", name: "2 Timothy", abbrev: "2 Tim", testament: "NT", order: 55, chapters: 4 },
  { id: "titus", name: "Titus", abbrev: "Titus", testament: "NT", order: 56, chapters: 3 },
  { id: "philemon", name: "Philemon", abbrev: "Phlm", testament: "NT", order: 57, chapters: 1 },
  { id: "hebrews", name: "Hebrews", abbrev: "Heb", testament: "NT", order: 58, chapters: 13 },
  { id: "james", name: "James", abbrev: "Jas", testament: "NT", order: 59, chapters: 5 },
  { id: "1peter", name: "1 Peter", abbrev: "1 Pet", testament: "NT", order: 60, chapters: 5 },
  { id: "2peter", name: "2 Peter", abbrev: "2 Pet", testament: "NT", order: 61, chapters: 3 },
  { id: "1john", name: "1 John", abbrev: "1 John", testament: "NT", order: 62, chapters: 5 },
  { id: "2john", name: "2 John", abbrev: "2 John", testament: "NT", order: 63, chapters: 1 },
  { id: "3john", name: "3 John", abbrev: "3 John", testament: "NT", order: 64, chapters: 1 },
  { id: "jude", name: "Jude", abbrev: "Jude", testament: "NT", order: 65, chapters: 1 },
  { id: "revelation", name: "Revelation", abbrev: "Rev", testament: "NT", order: 66, chapters: 22 },
];

export function getBook(id: string): BookMeta | undefined {
  return canon.find((b) => b.id === id);
}

export const oldTestament = canon.filter((b) => b.testament === "OT");
export const newTestament = canon.filter((b) => b.testament === "NT");
