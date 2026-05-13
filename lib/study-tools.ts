/**
 * External study-tool links for any verse.
 *
 * We deliberately link OUT to free, public, well-trusted resources rather
 * than try to host commentaries and lexicons ourselves. Each of these is
 * a public website any believer can use; we are merely a convenient
 * doorway.
 *
 *   - Blue Letter Bible — Strong's numbers, interlinear Greek/Hebrew,
 *     classic commentaries.
 *   - Bible Hub — Treasury of Scripture Knowledge, Matthew Henry,
 *     Jamieson-Fausset-Brown, Pulpit Commentary, Strong's, interlinear.
 *   - StepBible — modern, free, ad-free study Bible from Tyndale House.
 */

// Our internal bookId → Blue Letter Bible 3-letter abbreviation
const BLB_ABBREV: Record<string, string> = {
  genesis: "gen", exodus: "exo", leviticus: "lev", numbers: "num", deuteronomy: "deu",
  joshua: "jos", judges: "jdg", ruth: "rut", "1samuel": "1sa", "2samuel": "2sa",
  "1kings": "1ki", "2kings": "2ki", "1chronicles": "1ch", "2chronicles": "2ch",
  ezra: "ezr", nehemiah: "neh", esther: "est", job: "job", psalms: "psa",
  proverbs: "pro", ecclesiastes: "ecc", songofsongs: "sng", isaiah: "isa",
  jeremiah: "jer", lamentations: "lam", ezekiel: "ezk", daniel: "dan", hosea: "hos",
  joel: "joe", amos: "amo", obadiah: "oba", jonah: "jon", micah: "mic", nahum: "nah",
  habakkuk: "hab", zephaniah: "zep", haggai: "hag", zechariah: "zec", malachi: "mal",
  matthew: "mat", mark: "mrk", luke: "luk", john: "jhn", acts: "act",
  romans: "rom", "1corinthians": "1co", "2corinthians": "2co", galatians: "gal",
  ephesians: "eph", philippians: "php", colossians: "col",
  "1thessalonians": "1th", "2thessalonians": "2th",
  "1timothy": "1ti", "2timothy": "2ti", titus: "tit", philemon: "phm",
  hebrews: "heb", james: "jas", "1peter": "1pe", "2peter": "2pe",
  "1john": "1jn", "2john": "2jn", "3john": "3jn", jude: "jud", revelation: "rev",
};

// Our internal bookId → Bible Hub URL slug
const BIBLEHUB_SLUG: Record<string, string> = {
  genesis: "genesis", exodus: "exodus", leviticus: "leviticus", numbers: "numbers",
  deuteronomy: "deuteronomy", joshua: "joshua", judges: "judges", ruth: "ruth",
  "1samuel": "1_samuel", "2samuel": "2_samuel",
  "1kings": "1_kings", "2kings": "2_kings",
  "1chronicles": "1_chronicles", "2chronicles": "2_chronicles",
  ezra: "ezra", nehemiah: "nehemiah", esther: "esther", job: "job",
  psalms: "psalms", proverbs: "proverbs", ecclesiastes: "ecclesiastes",
  songofsongs: "songs", isaiah: "isaiah", jeremiah: "jeremiah",
  lamentations: "lamentations", ezekiel: "ezekiel", daniel: "daniel",
  hosea: "hosea", joel: "joel", amos: "amos", obadiah: "obadiah",
  jonah: "jonah", micah: "micah", nahum: "nahum", habakkuk: "habakkuk",
  zephaniah: "zephaniah", haggai: "haggai", zechariah: "zechariah", malachi: "malachi",
  matthew: "matthew", mark: "mark", luke: "luke", john: "john", acts: "acts",
  romans: "romans", "1corinthians": "1_corinthians", "2corinthians": "2_corinthians",
  galatians: "galatians", ephesians: "ephesians", philippians: "philippians",
  colossians: "colossians",
  "1thessalonians": "1_thessalonians", "2thessalonians": "2_thessalonians",
  "1timothy": "1_timothy", "2timothy": "2_timothy",
  titus: "titus", philemon: "philemon", hebrews: "hebrews", james: "james",
  "1peter": "1_peter", "2peter": "2_peter",
  "1john": "1_john", "2john": "2_john", "3john": "3_john",
  jude: "jude", revelation: "revelation",
};

export type StudyLink = {
  label: string;
  href: string;
  source: string;
  description: string;
};

export function studyLinksFor(bookId: string, chapter: number, verse: number): StudyLink[] {
  const blb = BLB_ABBREV[bookId];
  const hub = BIBLEHUB_SLUG[bookId];
  const links: StudyLink[] = [];

  if (hub) {
    links.push({
      label: "Commentaries",
      source: "Bible Hub",
      href: `https://biblehub.com/commentaries/${hub}/${chapter}-${verse}.htm`,
      description: "Matthew Henry, JFB, Pulpit, Geneva, Treasury of Scripture Knowledge",
    });
    links.push({
      label: "Interlinear",
      source: "Bible Hub",
      href: `https://biblehub.com/interlinear/${hub}/${chapter}-${verse}.htm`,
      description: "Greek/Hebrew word-by-word with Strong's numbers",
    });
  }

  if (blb) {
    links.push({
      label: "Strong's & Lexicon",
      source: "Blue Letter Bible",
      href: `https://www.blueletterbible.org/lexicon/${blb}/${chapter}/${verse}/`,
      description: "Click any original-language word for its dictionary entry",
    });
  }

  // StepBible — works at the chapter level, neutral fallback
  if (hub) {
    const hubBookForStep = hub
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    links.push({
      label: "Cross-references",
      source: "StepBible",
      href: `https://www.stepbible.org/?q=reference=${encodeURIComponent(
        `${hubBookForStep}.${chapter}.${verse}`,
      )}&options=HVUN`,
      description: "Free, ad-free study Bible from Tyndale House",
    });
  }

  return links;
}
