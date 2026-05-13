// Seed of the World English Bible (WEB) — public domain.
// Each chapter included here has been hand-verified against the WEB text.
// The remainder of the canon is loaded by running:  npm run ingest-bible
// which fetches the full WEB from bible-api.com (public-domain WEB)
// and writes per-book files into data/bible/text/.
//
// Translation: WEB (World English Bible) — public domain, Michael Paul Johnson, eBible.org.

export type Verse = { v: number; t: string };
export type ChapterText = {
  book: string; // book id
  chapter: number;
  translation: "WEB";
  verses: Verse[];
};

// Hand-verified WEB seed: short, well-known chapters.
export const seed: ChapterText[] = [
  {
    book: "psalms",
    chapter: 1,
    translation: "WEB",
    verses: [
      { v: 1, t: "Blessed is the man who doesn't walk in the counsel of the wicked, nor stand on the path of sinners, nor sit in the seat of scoffers;" },
      { v: 2, t: "but his delight is in Yahweh's law. On his law he meditates day and night." },
      { v: 3, t: "He will be like a tree planted by the streams of water, that produces its fruit in its season, whose leaf also does not wither. Whatever he does shall prosper." },
      { v: 4, t: "The wicked are not so, but are like the chaff which the wind drives away." },
      { v: 5, t: "Therefore the wicked shall not stand in the judgment, nor sinners in the congregation of the righteous." },
      { v: 6, t: "For Yahweh knows the way of the righteous, but the way of the wicked shall perish." },
    ],
  },
  {
    book: "psalms",
    chapter: 23,
    translation: "WEB",
    verses: [
      { v: 1, t: "Yahweh is my shepherd; I shall lack nothing." },
      { v: 2, t: "He makes me lie down in green pastures. He leads me beside still waters." },
      { v: 3, t: "He restores my soul. He guides me in the paths of righteousness for his name's sake." },
      { v: 4, t: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me." },
      { v: 5, t: "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over." },
      { v: 6, t: "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh's house forever." },
    ],
  },
  {
    book: "psalms",
    chapter: 100,
    translation: "WEB",
    verses: [
      { v: 1, t: "Shout for joy to Yahweh, all you lands!" },
      { v: 2, t: "Serve Yahweh with gladness. Come before his presence with singing." },
      { v: 3, t: "Know that Yahweh, he is God. It is he who has made us, and we are his. We are his people, and the sheep of his pasture." },
      { v: 4, t: "Enter into his gates with thanksgiving, and into his courts with praise. Give thanks to him, and bless his name." },
      { v: 5, t: "For Yahweh is good. His loving kindness endures forever, his faithfulness to all generations." },
    ],
  },
  {
    book: "psalms",
    chapter: 117,
    translation: "WEB",
    verses: [
      { v: 1, t: "Praise Yahweh, all you nations! Extol him, all you peoples!" },
      { v: 2, t: "For his loving kindness is great toward us. Yahweh's faithfulness endures forever. Praise Yah!" },
    ],
  },
  {
    book: "psalms",
    chapter: 150,
    translation: "WEB",
    verses: [
      { v: 1, t: "Praise Yah! Praise God in his sanctuary! Praise him in his heavens for his acts of power!" },
      { v: 2, t: "Praise him for his mighty acts! Praise him according to his excellent greatness!" },
      { v: 3, t: "Praise him with the sounding of the trumpet! Praise him with harp and lyre!" },
      { v: 4, t: "Praise him with tambourine and dancing! Praise him with stringed instruments and flute!" },
      { v: 5, t: "Praise him with loud cymbals! Praise him with resounding cymbals!" },
      { v: 6, t: "Let everything that has breath praise Yah! Praise Yah!" },
    ],
  },
];

export function findChapter(bookId: string, chapter: number): ChapterText | undefined {
  return seed.find((c) => c.book === bookId && c.chapter === chapter);
}

export function loadedChapters(bookId: string): number[] {
  return seed.filter((c) => c.book === bookId).map((c) => c.chapter).sort((a, b) => a - b);
}

export const TRANSLATION_NAME = "World English Bible (WEB)";
export const TRANSLATION_LICENSE = "Public domain · eBible.org";
