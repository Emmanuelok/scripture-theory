// Registry of authentic, published, public-domain Bible translations.
// Editorial standard:
//
//   - Every translation is real, named, and published by a recognized
//     publisher or translation committee.
//   - We do NOT include paraphrases (e.g., The Message, The Passion
//     Translation, Living Bible) — they are not translations.
//   - We do NOT include sectarian editions rejected by the mainstream
//     Church (e.g., the New World Translation).
//   - We do NOT include AI / machine-translated text of any kind. Scripture
//     must be translated by named human translators.
//
// What remains is the breadth of authentic public-domain Bibles in major
// world languages — including widely-used mainstream editions (KJV, ASV,
// WEB, Reina-Valera, Almeida, Louis Segond, Luther, Synodal, CUV, Vulgate,
// Douay-Rheims) AND legitimate scholarly/historical editions (YLT, Darby,
// BBE). We carry them so readers can compare and choose — we do not gate
// the catalog beyond what the editorial standard above demands.

export type TranslationId =
  // English
  | "WEB"     // World English Bible (eBible.org, public domain)
  | "KJV"     // King James Version (1769 Oxford)
  | "ASV"     // American Standard Version (1901)
  | "BBE"     // Bible in Basic English (1949)
  | "YLT"     // Young's Literal Translation (1898)
  | "DARBY"   // Darby Bible (1890)
  | "DRA"     // Douay-Rheims (Challoner Revision, 1899) — Roman Catholic
  // Spanish
  | "RVR1909" // Reina-Valera 1909
  // Portuguese
  | "ALMEIDA" // João Ferreira de Almeida (Corrigida)
  // French
  | "LSG"     // Louis Segond 1910
  // German
  | "LUT1912" // Luther Bibel 1912
  // Russian
  | "SYNODAL" // Russian Synodal Translation (1876)
  // Chinese (Mandarin)
  | "CUV"     // Chinese Union Version (1919)
  // Latin
  | "VULGATE";// Clementine Vulgate (1592)

export type TranslationMeta = {
  id: TranslationId;
  name: string;
  abbrev: string;
  language: string;
  languageNative: string;
  year: number | string;
  publisher: string;
  license: string;
  source?: string;
  ingestKey?: string;
  dir?: "ltr" | "rtl";
  note?: string;
};

export const translations: Record<TranslationId, TranslationMeta> = {
  WEB: {
    id: "WEB", name: "World English Bible", abbrev: "WEB",
    language: "English", languageNative: "English", year: 2000,
    publisher: "Michael Paul Johnson · eBible.org",
    license: "Public domain",
    source: "ebible.org",
    ingestKey: "web",
  },
  KJV: {
    id: "KJV", name: "King James Version", abbrev: "KJV",
    language: "English", languageNative: "English", year: 1769,
    publisher: "Authorized Version (Oxford)",
    license: "Public domain (worldwide; UK Crown Patent for printing only)",
    source: "Authorized Version, 1769 Oxford standard",
    ingestKey: "kjv",
  },
  ASV: {
    id: "ASV", name: "American Standard Version", abbrev: "ASV",
    language: "English", languageNative: "English", year: 1901,
    publisher: "Thomas Nelson & Sons",
    license: "Public domain",
    ingestKey: "asv",
  },
  BBE: {
    id: "BBE", name: "Bible in Basic English", abbrev: "BBE",
    language: "English", languageNative: "English (Basic)", year: 1949,
    publisher: "Samuel Hooke · Cambridge University Press",
    license: "Public domain",
    ingestKey: "bbe",
    note: "Simplified-vocabulary edition. Useful for English-as-a-second-language readers.",
  },
  YLT: {
    id: "YLT", name: "Young's Literal Translation", abbrev: "YLT",
    language: "English", languageNative: "English", year: 1898,
    publisher: "Robert Young",
    license: "Public domain",
    ingestKey: "ylt",
    note: "Strictly literal word-for-word rendering. A study tool, not a reading Bible.",
  },
  DARBY: {
    id: "DARBY", name: "Darby Bible", abbrev: "Darby",
    language: "English", languageNative: "English", year: 1890,
    publisher: "John Nelson Darby",
    license: "Public domain",
    ingestKey: "darby",
    note: "Translated by J. N. Darby; widely used in Plymouth Brethren and study contexts.",
  },
  DRA: {
    id: "DRA", name: "Douay-Rheims (Challoner)", abbrev: "DRA",
    language: "English", languageNative: "English", year: 1899,
    publisher: "Roman Catholic — Challoner revision",
    license: "Public domain",
    ingestKey: "drb",
  },
  RVR1909: {
    id: "RVR1909", name: "Reina-Valera 1909", abbrev: "RVR1909",
    language: "Spanish", languageNative: "Español", year: 1909,
    publisher: "Sociedades Bíblicas Unidas — Reina (1569) / Valera (1602)",
    license: "Public domain",
    source: "Reina-Valera 1909 revision",
  },
  ALMEIDA: {
    id: "ALMEIDA", name: "Almeida — Corrigida", abbrev: "Almeida",
    language: "Portuguese", languageNative: "Português", year: 1819,
    publisher: "João Ferreira Annes d'Almeida — Sociedade Bíblica",
    license: "Public domain",
    source: "Almeida (Antiga / Corrigida)",
    ingestKey: "almeida",
  },
  LSG: {
    id: "LSG", name: "Louis Segond 1910", abbrev: "LSG",
    language: "French", languageNative: "Français", year: 1910,
    publisher: "Louis Segond / Société biblique de Genève",
    license: "Public domain",
  },
  LUT1912: {
    id: "LUT1912", name: "Luther Bibel 1912", abbrev: "LUT",
    language: "German", languageNative: "Deutsch", year: 1912,
    publisher: "Martin Luther (1545) — revision of 1912",
    license: "Public domain",
  },
  SYNODAL: {
    id: "SYNODAL", name: "Russian Synodal Bible", abbrev: "СИНОД",
    language: "Russian", languageNative: "Русский", year: 1876,
    publisher: "Russian Orthodox Synod",
    license: "Public domain",
  },
  CUV: {
    id: "CUV", name: "Chinese Union Version", abbrev: "和合本",
    language: "Chinese", languageNative: "中文", year: 1919,
    publisher: "China Bible House",
    license: "Public domain",
  },
  VULGATE: {
    id: "VULGATE", name: "Clementine Vulgate", abbrev: "Vulgata",
    language: "Latin", languageNative: "Latina", year: 1592,
    publisher: "Pope Clement VIII — Jerome's Latin Vulgate",
    license: "Public domain",
  },
};

export const translationOrder: TranslationId[] = [
  "WEB", "KJV", "ASV", "BBE", "YLT", "DARBY", "DRA",
  "RVR1909", "ALMEIDA", "LSG", "LUT1912", "SYNODAL", "CUV", "VULGATE",
];

export const englishTranslations: TranslationId[] = ["WEB", "KJV", "ASV", "BBE", "YLT", "DARBY", "DRA"];

// Why this catalog is what it is (shown on /bible).
export const EDITORIAL_NOTE = `Every Bible served here is an authentic, published, public-domain translation made by named human translators. We deliberately exclude paraphrases (The Message, The Passion Translation, Living Bible) because they are not translations; sectarian editions rejected by the mainstream Church (e.g., the New World Translation); and AI or machine-translated text of any kind. Within that line, we carry the full breadth of legitimate public-domain Bibles — widely-used mainstream editions and scholarly/historical ones alike — so that readers can compare them and choose for themselves. We are not in the business of gatekeeping which faithful Bible a believer is allowed to read.`;
