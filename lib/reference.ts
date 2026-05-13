// Parse English/native-language scripture references into a Bible deep link.
// e.g. "John 1:1–18" -> /bible/john/1
//      "Psalm 23"   -> /bible/psalms/23
//      "1 Cor 13"   -> /bible/1corinthians/13
//      "Salmos 1"   -> /bible/psalms/1   (non-English reading plans)
//      "Yohana 1"   -> /bible/john/1
import { canon } from "@/data/bible/canon";

const ALIASES: Record<string, string> = {
  // Cross-language aliases used by our reading plans + Verse Lens references.
  // Maps a normalized lowercase token to a book id.
  // English (covered by canonical names below)
  ps: "psalms",
  psalm: "psalms",
  psalms: "psalms",
  "song of solomon": "songofsongs",
  song: "songofsongs",
  // Spanish
  juan: "john",
  marcos: "mark",
  mateo: "matthew",
  lucas: "luke",
  hechos: "acts",
  romanos: "romans",
  filipenses: "philippians",
  efesios: "ephesians",
  colosenses: "colossians",
  gálatas: "galatians",
  galatas: "galatians",
  santiago: "james",
  apocalipsis: "revelation",
  génesis: "genesis",
  genesis: "genesis",
  éxodo: "exodus",
  exodo: "exodus",
  isaías: "isaiah",
  isaias: "isaiah",
  salmo: "psalms",
  salmos: "psalms",
  proverbios: "proverbs",
  "1 corintios": "1corinthians",
  "2 corintios": "2corinthians",
  // Portuguese
  joão: "john",
  joao: "john",
  mateus: "matthew",
  marcos_pt: "mark",
  atos: "acts",
  filipenses_pt: "philippians",
  tiago: "james",
  apocalipse: "revelation",
  gênesis: "genesis",
  isaías_pt: "isaiah",
  salmo_pt: "psalms",
  "1 coríntios": "1corinthians",
  "2 coríntios": "2corinthians",
  "1 corintios pt": "1corinthians",
  // French
  jean: "john",
  matthieu: "matthew",
  marc: "mark",
  luc: "luke",
  actes: "acts",
  romains: "romans",
  philippiens: "philippians",
  éphésiens: "ephesians",
  ephesiens: "ephesians",
  jacques: "james",
  apocalypse: "revelation",
  genèse: "genesis",
  genese: "genesis",
  ésaïe: "isaiah",
  esaie: "isaiah",
  psaume: "psalms",
  psaumes: "psalms",
  "1 corinthiens": "1corinthians",
  "2 corinthiens": "2corinthians",
  // Swahili
  yohana: "john",
  mathayo: "matthew",
  marko: "mark",
  luka: "luke",
  matendo: "acts",
  warumi: "romans",
  wafilipi: "philippians",
  waefeso: "ephesians",
  zaburi: "psalms",
  mwanzo: "genesis",
  isaya: "isaiah",
  "1 wakorintho": "1corinthians",
  // Hindi (transliterated tokens)
  // Arabic
  يوحنا: "john",
  متى: "matthew",
  مرقس: "mark",
  لوقا: "luke",
  أعمال: "acts",
  رومية: "romans",
  // Mandarin
  约翰福音: "john",
  马太福音: "matthew",
  马可福音: "mark",
  路加福音: "luke",
  使徒行传: "acts",
  罗马书: "romans",
  诗篇: "psalms",
  创世记: "genesis",
};

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

// Build canon name lookup
const canonNameToId = new Map<string, string>();
for (const b of canon) {
  canonNameToId.set(normalize(b.name), b.id);
  canonNameToId.set(normalize(b.abbrev), b.id);
}

export type ParsedRef = {
  bookId: string;
  bookName: string;
  chapter: number;
};

export function parseReference(input: string): ParsedRef | null {
  if (!input) return null;
  const s = input.trim();
  // Match "<book> <chapter>[:verses][–...]" — supports number prefix like "1 John"
  const m = s.match(/^([֐-׿؀-ۿऀ-ॿ一-鿿\p{L}1-3.\s]+?)\s*(\d+)(?::|\s|$|–|—|-)/u);
  if (!m) return null;
  const rawBook = normalize(m[1].replace(/\.$/, "").replace(/^\s*\.\s*/, ""));
  const chapter = Number(m[2]);
  if (!Number.isFinite(chapter) || chapter < 1) return null;

  // Try canon names first
  let bookId = canonNameToId.get(rawBook);
  // Try aliases
  if (!bookId) bookId = ALIASES[rawBook];
  // Try removing trailing punctuation/numerals
  if (!bookId) {
    const alt = rawBook.replace(/\.$/, "");
    bookId = canonNameToId.get(alt) ?? ALIASES[alt];
  }
  if (!bookId) return null;
  const book = canon.find((b) => b.id === bookId);
  if (!book || chapter > book.chapters) return null;
  return { bookId, bookName: book.name, chapter };
}

export function referenceHref(input: string): string | null {
  const parsed = parseReference(input);
  if (!parsed) return null;
  return `/bible/${parsed.bookId}/${parsed.chapter}`;
}
