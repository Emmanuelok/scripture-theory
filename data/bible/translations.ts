// Registry of Bible translations served by Scripture Theory.
//
// Public-domain editions are the heart of the catalog (KJV, ASV, WEB, BBE,
// YLT, Darby, DRA, RVR1909, Almeida, LSG, LUT1912, Synodal, CUV, Vulgate).
// They are ours forever, free of usage caps and attribution boilerplate, and
// they cover the major language families.
//
// Where a modern translation is genuinely useful and the publisher offers a
// fair public API, we wire it up under license — currently only the ESV
// via Crossway's free API (requires an API key set in ESV_API_KEY; falls
// back gracefully when not configured). Licensed translations are clearly
// labelled and stored only in transit per the publisher's terms.
//
// Editorial standard for any translation we serve:
//   - Real, named, published by a recognized publisher or translation
//     committee.
//   - Not a paraphrase (so no The Message, Passion, Living Bible).
//   - Not a sectarian edition rejected by the mainstream Church (e.g., the
//     New World Translation).
//   - Never AI- or machine-translated. Scripture must come from named
//     human translators.

export type TranslationId =
  // English (public domain)
  | "WEB"     // World English Bible (eBible.org, public domain)
  | "KJV"     // King James Version (1769 Oxford)
  | "ASV"     // American Standard Version (1901)
  | "BBE"     // Bible in Basic English (1949)
  | "YLT"     // Young's Literal Translation (1898)
  | "DARBY"   // Darby Bible (1890)
  | "DRA"     // Douay-Rheims (Challoner Revision, 1899) — Roman Catholic
  // English (licensed via free API)
  | "ESV"     // English Standard Version — via Crossway's free API
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
  /** True for licensed APIs that require an env-configured key. */
  requiresKey?: boolean;
  /** Required attribution string to display when this translation is active. */
  attribution?: string;
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
  ESV: {
    id: "ESV", name: "English Standard Version", abbrev: "ESV",
    language: "English", languageNative: "English", year: 2001,
    publisher: "Crossway",
    license: "Licensed · served live via Crossway's free ESV API",
    source: "api.esv.org",
    requiresKey: true,
    attribution:
      "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.",
    note: "Fetched live from Crossway's API. Requires ESV_API_KEY. Per Crossway's terms, not stored offline.",
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
  "WEB", "KJV", "ESV", "ASV", "BBE", "YLT", "DARBY", "DRA",
  "RVR1909", "ALMEIDA", "LSG", "LUT1912", "SYNODAL", "CUV", "VULGATE",
];

export const englishTranslations: TranslationId[] = ["WEB", "KJV", "ESV", "ASV", "BBE", "YLT", "DARBY", "DRA"];

// Why this catalog is what it is (shown on /bible).
export const EDITORIAL_NOTE = `Every Bible served here is real, published, and translated by named humans — never machine-translated. The core of the catalog is public-domain editions that are ours forever: KJV, ASV, WEB, BBE, YLT, Darby, Douay-Rheims, Reina-Valera, Almeida, Louis Segond, Luther 1912, Synodal, Chinese Union, and the Clementine Vulgate. Where a modern translation is genuinely useful and the publisher offers a fair public API, we serve it live under license — currently only the ESV via Crossway's free API — clearly labelled and stored only in transit per the publisher's terms. We deliberately exclude paraphrases (The Message, The Passion, Living Bible), sectarian editions rejected by the mainstream Church (e.g., the New World Translation), and AI or machine-translated text of any kind.`;
