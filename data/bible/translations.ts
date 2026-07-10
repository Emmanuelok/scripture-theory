// Registry of Bible translations served by Scripture Theory.
//
// Public-domain editions are delivered through bible-api.com's structured
// chapter API where possible. Licensed editions are requested directly from
// their publisher and are never cached offline. A small number of historical
// editions remain selected-passage entries until a verified full-text source
// is connected.

export type TranslationId =
  | "WEB"
  | "WEBBE"
  | "KJV"
  | "ESV"
  | "OEBUS"
  | "OEBCW"
  | "ASV"
  | "BBE"
  | "YLT"
  | "DARBY"
  | "DRA"
  | "RVR1909"
  | "ALMEIDA"
  | "LSG"
  | "LUT1912"
  | "BKR"
  | "RCCV"
  | "SYNODAL"
  | "CUV"
  | "CHEROKEE"
  | "VULGATE";

export type TranslationProvider = "bible-api" | "crossway" | "bundled";
export type TranslationCoverage = "full" | "new-testament" | "selected";

export type TranslationMeta = {
  id: TranslationId;
  name: string;
  abbrev: string;
  language: string;
  languageNative: string;
  /** BCP 47 language tag used by the reader for accessibility and typography. */
  bcp47: string;
  year: number | string;
  publisher: string;
  license: string;
  source?: string;
  /** bible-api.com translation identifier. */
  apiId?: string;
  /** Backwards-compatible alias used by the build-time ingestion script. */
  ingestKey?: string;
  provider: TranslationProvider;
  coverage: TranslationCoverage;
  dir?: "ltr" | "rtl";
  note?: string;
  /** True for licensed APIs that require an env-configured key. */
  requiresKey?: boolean;
  /** Required attribution string to display when this translation is active. */
  attribution?: string;
  /** Publisher page required alongside licensed attribution. */
  attributionUrl?: string;
};

export const translations: Record<TranslationId, TranslationMeta> = {
  WEB: {
    id: "WEB",
    name: "World English Bible",
    abbrev: "WEB",
    language: "English",
    languageNative: "English",
    bcp47: "en",
    year: 2000,
    publisher: "Michael Paul Johnson · eBible.org",
    license: "Public domain",
    source: "bible-api.com · eBible.org",
    apiId: "web",
    ingestKey: "web",
    provider: "bible-api",
    coverage: "full",
  },
  WEBBE: {
    id: "WEBBE",
    name: "World English Bible, British Edition",
    abbrev: "WEBBE",
    language: "English",
    languageNative: "English (UK)",
    bcp47: "en-GB",
    year: 2000,
    publisher: "Michael Paul Johnson · eBible.org",
    license: "Public domain",
    source: "bible-api.com · eBible.org",
    apiId: "webbe",
    ingestKey: "webbe",
    provider: "bible-api",
    coverage: "full",
  },
  KJV: {
    id: "KJV",
    name: "King James Version",
    abbrev: "KJV",
    language: "English",
    languageNative: "English",
    bcp47: "en",
    year: 1769,
    publisher: "Authorized Version (Oxford)",
    license: "Public domain in most territories; UK Crown rights apply",
    source: "bible-api.com · 1769 Oxford standard",
    apiId: "kjv",
    ingestKey: "kjv",
    provider: "bible-api",
    coverage: "full",
  },
  ESV: {
    id: "ESV",
    name: "English Standard Version",
    abbrev: "ESV",
    language: "English",
    languageNative: "English",
    bcp47: "en",
    year: "2001 · 2025 text edition",
    publisher: "Crossway",
    license:
      "Licensed · served live from Crossway for eligible non-commercial use",
    source: "api.esv.org",
    provider: "crossway",
    coverage: "full",
    requiresKey: true,
    attribution:
      "Scripture quotations marked ESV are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. ESV Text Edition: 2025. Used by permission. All rights reserved.",
    attributionUrl: "https://www.esv.org/",
    note: "Requires ESV_API_KEY. Requested live from Crossway and never stored by the service worker.",
  },
  OEBUS: {
    id: "OEBUS",
    name: "Open English Bible, US Edition",
    abbrev: "OEB-US",
    language: "English",
    languageNative: "English (US)",
    bcp47: "en-US",
    year: "ongoing",
    publisher: "Open English Bible project",
    license: "Public domain",
    source: "bible-api.com · openenglishbible.org",
    apiId: "oeb-us",
    ingestKey: "oeb-us",
    provider: "bible-api",
    coverage: "full",
  },
  OEBCW: {
    id: "OEBCW",
    name: "Open English Bible, Commonwealth Edition",
    abbrev: "OEB-CW",
    language: "English",
    languageNative: "English (Commonwealth)",
    bcp47: "en-GB",
    year: "ongoing",
    publisher: "Open English Bible project",
    license: "Public domain",
    source: "bible-api.com · openenglishbible.org",
    apiId: "oeb-cw",
    ingestKey: "oeb-cw",
    provider: "bible-api",
    coverage: "full",
  },
  ASV: {
    id: "ASV",
    name: "American Standard Version",
    abbrev: "ASV",
    language: "English",
    languageNative: "English",
    bcp47: "en",
    year: 1901,
    publisher: "Thomas Nelson & Sons",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "asv",
    ingestKey: "asv",
    provider: "bible-api",
    coverage: "full",
  },
  BBE: {
    id: "BBE",
    name: "Bible in Basic English",
    abbrev: "BBE",
    language: "English",
    languageNative: "English (Basic)",
    bcp47: "en",
    year: 1949,
    publisher: "Samuel Hooke · Cambridge University Press",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "bbe",
    ingestKey: "bbe",
    provider: "bible-api",
    coverage: "full",
    note: "Simplified-vocabulary edition for readers and English-language learners.",
  },
  YLT: {
    id: "YLT",
    name: "Young's Literal Translation",
    abbrev: "YLT",
    language: "English",
    languageNative: "English",
    bcp47: "en",
    year: 1898,
    publisher: "Robert Young",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "ylt",
    ingestKey: "ylt",
    provider: "bible-api",
    coverage: "new-testament",
    note: "The connected API currently carries the New Testament. A literal study edition.",
  },
  DARBY: {
    id: "DARBY",
    name: "Darby Bible",
    abbrev: "Darby",
    language: "English",
    languageNative: "English",
    bcp47: "en",
    year: 1890,
    publisher: "John Nelson Darby",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "darby",
    ingestKey: "darby",
    provider: "bible-api",
    coverage: "full",
  },
  DRA: {
    id: "DRA",
    name: "Douay-Rheims 1899 American Edition",
    abbrev: "DRA",
    language: "English",
    languageNative: "English",
    bcp47: "en",
    year: 1899,
    publisher: "Roman Catholic · Challoner revision",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "dra",
    ingestKey: "dra",
    provider: "bible-api",
    coverage: "full",
  },
  RVR1909: {
    id: "RVR1909",
    name: "Reina-Valera 1909",
    abbrev: "RVR1909",
    language: "Spanish",
    languageNative: "Español",
    bcp47: "es",
    year: 1909,
    publisher: "Sociedades Bíblicas Unidas · Reina / Valera",
    license: "Public domain",
    source: "Verified local selections",
    provider: "bundled",
    coverage: "selected",
    note: "Selected passages are available while a verified full-canon adapter is prepared.",
  },
  ALMEIDA: {
    id: "ALMEIDA",
    name: "João Ferreira de Almeida",
    abbrev: "Almeida",
    language: "Portuguese",
    languageNative: "Português",
    bcp47: "pt",
    year: 1819,
    publisher: "João Ferreira Annes d'Almeida",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "almeida",
    ingestKey: "almeida",
    provider: "bible-api",
    coverage: "full",
  },
  LSG: {
    id: "LSG",
    name: "Louis Segond 1910",
    abbrev: "LSG",
    language: "French",
    languageNative: "Français",
    bcp47: "fr",
    year: 1910,
    publisher: "Louis Segond · Société biblique de Genève",
    license: "Public domain",
    source: "Verified local selections",
    provider: "bundled",
    coverage: "selected",
    note: "Selected passages are available while a verified full-canon adapter is prepared.",
  },
  LUT1912: {
    id: "LUT1912",
    name: "Luther Bibel 1912",
    abbrev: "LUT",
    language: "German",
    languageNative: "Deutsch",
    bcp47: "de",
    year: 1912,
    publisher: "Martin Luther · 1912 revision",
    license: "Public domain",
    source: "Verified local selections",
    provider: "bundled",
    coverage: "selected",
    note: "Selected passages are available while a verified full-canon adapter is prepared.",
  },
  BKR: {
    id: "BKR",
    name: "Bible kralická",
    abbrev: "BKR",
    language: "Czech",
    languageNative: "Čeština",
    bcp47: "cs",
    year: 1613,
    publisher: "Unity of the Brethren",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "bkr",
    ingestKey: "bkr",
    provider: "bible-api",
    coverage: "full",
  },
  RCCV: {
    id: "RCCV",
    name: "Romanian Corrected Cornilescu Version",
    abbrev: "RCCV",
    language: "Romanian",
    languageNative: "Română",
    bcp47: "ro",
    year: "corrected edition",
    publisher: "Dumitru Cornilescu tradition",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "rccv",
    ingestKey: "rccv",
    provider: "bible-api",
    coverage: "full",
  },
  SYNODAL: {
    id: "SYNODAL",
    name: "Russian Synodal Translation",
    abbrev: "СИНОД",
    language: "Russian",
    languageNative: "Русский",
    bcp47: "ru",
    year: 1876,
    publisher: "Russian Orthodox Synod",
    license: "Public domain",
    source: "Verified local selections",
    provider: "bundled",
    coverage: "selected",
    note: "Selected passages only. The upstream catalog lists this edition, but its chapter endpoint is not currently available.",
  },
  CUV: {
    id: "CUV",
    name: "Chinese Union Version",
    abbrev: "和合本",
    language: "Chinese",
    languageNative: "中文",
    bcp47: "zh-Hant",
    year: 1919,
    publisher: "China Bible House",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "cuv",
    ingestKey: "cuv",
    provider: "bible-api",
    coverage: "full",
  },
  CHEROKEE: {
    id: "CHEROKEE",
    name: "Cherokee New Testament",
    abbrev: "CHR",
    language: "Cherokee",
    languageNative: "ᏣᎳᎩ",
    bcp47: "chr",
    year: 1860,
    publisher: "American Bible Society · Cherokee translators",
    license: "Public domain",
    source: "bible-api.com",
    apiId: "cherokee",
    ingestKey: "cherokee",
    provider: "bible-api",
    coverage: "new-testament",
    note: "New Testament only.",
  },
  VULGATE: {
    id: "VULGATE",
    name: "Clementine Vulgate",
    abbrev: "Vulgata",
    language: "Latin",
    languageNative: "Latina",
    bcp47: "la",
    year: 1592,
    publisher: "Pope Clement VIII · Jerome's Latin Vulgate",
    license: "Public domain",
    source: "Verified local selections",
    provider: "bundled",
    coverage: "selected",
    note: "Selected passages only while Psalm numbering and canon mappings are verified.",
  },
};

export const translationOrder: TranslationId[] = [
  "WEB",
  "WEBBE",
  "KJV",
  "ESV",
  "OEBUS",
  "OEBCW",
  "ASV",
  "BBE",
  "YLT",
  "DARBY",
  "DRA",
  "RVR1909",
  "ALMEIDA",
  "LSG",
  "LUT1912",
  "BKR",
  "RCCV",
  "SYNODAL",
  "CUV",
  "CHEROKEE",
  "VULGATE",
];

export const englishTranslations = translationOrder.filter(
  (id) => translations[id].language === "English",
);

export const publicApiTranslations = translationOrder.filter(
  (id) => translations[id].provider === "bible-api",
);

export function translationSupportsTestament(
  id: TranslationId,
  testament: "OT" | "NT",
): boolean {
  const coverage = translations[id].coverage;
  if (coverage === "full") return true;
  if (coverage === "new-testament") return testament === "NT";
  return false;
}

export const EDITORIAL_NOTE = `Every Bible served here is a real published translation made by human translators — never machine-generated. Fifteen public-domain editions can load on demand through a structured Scripture API, including WEB, KJV, ASV, both Open English Bible editions, Almeida, Chinese Union, Bible kralická, Romanian Cornilescu, and the Cherokee New Testament. The ESV is served live from Crossway only when a server-side ESV_API_KEY is configured, with its required attribution and no offline storage. Historical editions without a working, verified full-canon adapter remain clearly labelled as selected passages. We exclude paraphrases, sectarian rewrites rejected by the mainstream Church, and AI-translated Scripture.`;
