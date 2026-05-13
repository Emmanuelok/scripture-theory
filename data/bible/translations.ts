// Registry of authentic, published, mainstream-accepted, public-domain Bible
// translations. Editorial standard:
//
//   - Every translation is real, named, and published by a recognized
//     publisher or translation committee.
//   - We never machine-translate or AI-paraphrase Scripture.
//   - We do NOT include paraphrases (e.g., The Message, The Passion
//     Translation, Living Bible) or sectarian translations rejected by the
//     mainstream Church (e.g., New World Translation).
//   - We do NOT include niche-only or extreme-literal editions (e.g.,
//     Young's Literal, Darby, Bible in Basic English) that are scholarly
//     curiosities rather than the Bibles ordinary Christians read in their
//     congregations.
//
// What remains is the set of historically accepted, denominationally trusted,
// public-domain Bibles in major world languages — the kind of catalog you
// would find on YouVersion or in a respected denominational study Bible.

export type TranslationId =
  // English
  | "WEB"     // World English Bible (eBible.org, public domain)
  | "KJV"     // King James Version (1769 Oxford)
  | "ASV"     // American Standard Version (1901)
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
  "WEB", "KJV", "ASV", "DRA",
  "RVR1909", "ALMEIDA", "LSG", "LUT1912", "SYNODAL", "CUV", "VULGATE",
];

export const englishTranslations: TranslationId[] = ["WEB", "KJV", "ASV", "DRA"];

// Why this catalog is what it is (shown on /bible):
export const EDITORIAL_NOTE = `Every Bible served here is an authentic, published, mainstream-accepted, public-domain translation made by named translators and recognized by the worldwide Church. We do not include paraphrases (The Message, The Passion Translation, Living Bible), sectarian translations rejected by the mainstream Church (e.g., New World Translation), AI or machine-translated text, or niche/extreme-literal scholarly editions (Young's Literal, Darby, Bible in Basic English). The remaining catalog is the set of Bibles ordinary Christians actually read in their congregations across major world languages.`;
