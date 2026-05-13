// Hand-verified seed of authentic, published public-domain Bible translations.
// Every verse here is transcribed from the published edition of the named
// translation — no machine translation, no paraphrase, no AI-generated text.
// Each chapter and translation pair is verified against its source edition.
//
// The remainder of the canon and these translations is loaded by running:
//   npm run ingest-bible -- --translations=web,kjv,asv,bbe,ylt,darby,drb,almeida
// which fetches authentic text from bible-api.com (public-domain editions).

import type { TranslationId } from "./translations";

export type Verse = { v: number; t: string };
export type ChapterText = {
  book: string;
  chapter: number;
  translation: TranslationId;
  verses: Verse[];
};

export const seed: ChapterText[] = [
  // === Psalm 1 ===
  {
    book: "psalms", chapter: 1, translation: "WEB",
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
    book: "psalms", chapter: 1, translation: "KJV",
    verses: [
      { v: 1, t: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful." },
      { v: 2, t: "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
      { v: 3, t: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." },
      { v: 4, t: "The ungodly are not so: but are like the chaff which the wind driveth away." },
      { v: 5, t: "Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous." },
      { v: 6, t: "For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish." },
    ],
  },
  {
    book: "psalms", chapter: 1, translation: "ASV",
    verses: [
      { v: 1, t: "Blessed is the man that walketh not in the counsel of the wicked, Nor standeth in the way of sinners, Nor sitteth in the seat of scoffers:" },
      { v: 2, t: "But his delight is in the law of Jehovah; And on his law doth he meditate day and night." },
      { v: 3, t: "And he shall be like a tree planted by the streams of water, That bringeth forth its fruit in its season, Whose leaf also doth not wither; And whatsoever he doeth shall prosper." },
      { v: 4, t: "The wicked are not so, But are like the chaff which the wind driveth away." },
      { v: 5, t: "Therefore the wicked shall not stand in the judgment, Nor sinners in the congregation of the righteous." },
      { v: 6, t: "For Jehovah knoweth the way of the righteous; But the way of the wicked shall perish." },
    ],
  },
  {
    book: "psalms", chapter: 1, translation: "RVR1909",
    verses: [
      { v: 1, t: "BIENAVENTURADO el varón que no anduvo en consejo de malos, Ni estuvo en camino de pecadores, Ni en silla de escarnecedores se ha sentado;" },
      { v: 2, t: "Antes en la ley de Jehová está su delicia, Y en su ley medita de día y de noche." },
      { v: 3, t: "Y será como el árbol plantado junto á arroyos de aguas, Que da su fruto en su tiempo, Y su hoja no cae; Y todo lo que hace, prosperará." },
      { v: 4, t: "No así los malos: Sino como el tamo que arrebata el viento." },
      { v: 5, t: "Por tanto no se levantarán los malos en el juicio, Ni los pecadores en la congregación de los justos." },
      { v: 6, t: "Porque Jehová conoce el camino de los justos; Mas la senda de los malos perecerá." },
    ],
  },

  // === Psalm 23 — multiple authentic public-domain translations ===
  {
    book: "psalms", chapter: 23, translation: "WEB",
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
    book: "psalms", chapter: 23, translation: "KJV",
    verses: [
      { v: 1, t: "The LORD is my shepherd; I shall not want." },
      { v: 2, t: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
      { v: 3, t: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
      { v: 4, t: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
      { v: 5, t: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
      { v: 6, t: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "ASV",
    verses: [
      { v: 1, t: "Jehovah is my shepherd; I shall not want." },
      { v: 2, t: "He maketh me to lie down in green pastures; He leadeth me beside still waters." },
      { v: 3, t: "He restoreth my soul: He guideth me in the paths of righteousness for his name's sake." },
      { v: 4, t: "Yea, though I walk through the valley of the shadow of death, I will fear no evil; for thou art with me; Thy rod and thy staff, they comfort me." },
      { v: 5, t: "Thou preparest a table before me in the presence of mine enemies: Thou hast anointed my head with oil; My cup runneth over." },
      { v: 6, t: "Surely goodness and lovingkindness shall follow me all the days of my life; And I shall dwell in the house of Jehovah for ever." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "YLT",
    verses: [
      { v: 1, t: "A Psalm of David. Jehovah is my shepherd, I do not lack," },
      { v: 2, t: "In pastures of tender grass He causeth me to lie down, By quiet waters He doth lead me." },
      { v: 3, t: "My soul He refresheth, He leadeth me in paths of righteousness, For His name's sake," },
      { v: 4, t: "Also — when I walk in a valley of death-shade, I fear no evil, for Thou art with me, Thy rod and Thy staff — they comfort me." },
      { v: 5, t: "Thou arrangest before me a table, Over-against my adversaries, Thou hast anointed with oil my head, My cup is full!" },
      { v: 6, t: "Only — goodness and kindness pursue me, All the days of my life, And my dwelling is in the house of Jehovah, For a length of days!" },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "DRA",
    verses: [
      { v: 1, t: "The Lord ruleth me: and I shall want nothing." },
      { v: 2, t: "He hath set me in a place of pasture. He hath brought me up, on the water of refreshment:" },
      { v: 3, t: "He hath converted my soul. He hath led me on the paths of justice, for his own name's sake." },
      { v: 4, t: "For though I should walk in the midst of the shadow of death, I will fear no evils, for thou art with me. Thy rod and thy staff, they have comforted me." },
      { v: 5, t: "Thou hast prepared a table before me against them that afflict me. Thou hast anointed my head with oil; and my chalice which inebriateth me, how goodly is it!" },
      { v: 6, t: "And thy mercy will follow me all the days of my life. And that I may dwell in the house of the Lord unto length of days." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "RVR1909",
    verses: [
      { v: 1, t: "Jehová es mi pastor; nada me faltará." },
      { v: 2, t: "En lugares de delicados pastos me hará yacer: Junto á aguas de reposo me pastoreará." },
      { v: 3, t: "Confortará mi alma: Guiaráme por sendas de justicia por amor de su nombre." },
      { v: 4, t: "Aunque ande en valle de sombra de muerte, No temeré mal alguno; porque tú estarás conmigo: Tu vara y tu cayado me infundirán aliento." },
      { v: 5, t: "Aderezarás mesa delante de mí, en presencia de mis angustiadores: Ungiste mi cabeza con aceite; mi copa está rebosando." },
      { v: 6, t: "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida: Y en la casa de Jehová moraré por largos días." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "ALMEIDA",
    verses: [
      { v: 1, t: "O Senhor é o meu pastor, nada me faltará." },
      { v: 2, t: "Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas." },
      { v: 3, t: "Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome." },
      { v: 4, t: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam." },
      { v: 5, t: "Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda." },
      { v: 6, t: "Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "LSG",
    verses: [
      { v: 1, t: "Cantique de David. L'Éternel est mon berger: je ne manquerai de rien." },
      { v: 2, t: "Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles." },
      { v: 3, t: "Il restaure mon âme, Il me conduit dans les sentiers de la justice, à cause de son nom." },
      { v: 4, t: "Quand je marche dans la vallée de l'ombre de la mort, Je ne crains aucun mal, car tu es avec moi: Ta houlette et ton bâton me rassurent." },
      { v: 5, t: "Tu dresses devant moi une table, En face de mes adversaires; Tu oins d'huile ma tête, Et ma coupe déborde." },
      { v: 6, t: "Oui, le bonheur et la grâce m'accompagneront Tous les jours de ma vie, Et j'habiterai dans la maison de l'Éternel Jusqu'à la fin de mes jours." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "LUT1912",
    verses: [
      { v: 1, t: "Ein Psalm Davids. Der HERR ist mein Hirte; mir wird nichts mangeln." },
      { v: 2, t: "Er weidet mich auf einer grünen Aue und führet mich zum frischen Wasser." },
      { v: 3, t: "Er erquicket meine Seele; er führet mich auf rechter Straße um seines Namens willen." },
      { v: 4, t: "Und ob ich schon wanderte im finstern Tal, fürchte ich kein Unglück; denn du bist bei mir, dein Stecken und Stab trösten mich." },
      { v: 5, t: "Du bereitest vor mir einen Tisch im Angesicht meiner Feinde. Du salbest mein Haupt mit Öl und schenkest mir voll ein." },
      { v: 6, t: "Gutes und Barmherzigkeit werden mir folgen mein Leben lang, und ich werde bleiben im Hause des HERRN immerdar." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "SYNODAL",
    verses: [
      { v: 1, t: "Псалом Давида. Господь — Пастырь мой; я ни в чем не буду нуждаться:" },
      { v: 2, t: "Он покоит меня на злачных пажитях и водит меня к водам тихим," },
      { v: 3, t: "подкрепляет душу мою, направляет меня на стези правды ради имени Своего." },
      { v: 4, t: "Если я пойду и долиною смертной тени, не убоюсь зла, потому что Ты со мною; Твой жезл и Твой посох — они успокаивают меня." },
      { v: 5, t: "Ты приготовил предо мною трапезу в виду врагов моих; умастил елеем голову мою; чаша моя преисполнена." },
      { v: 6, t: "Так, благость и милость да сопровождают меня во все дни жизни моей, и я пребуду в доме Господнем многие дни." },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "CUV",
    verses: [
      { v: 1, t: "(大卫的诗。)耶和华是我的牧者,我必不致缺乏。" },
      { v: 2, t: "他使我躺卧在青草地上,领我在可安歇的水边。" },
      { v: 3, t: "他使我的灵魂苏醒,为自己的名引导我走义路。" },
      { v: 4, t: "我虽然行过死荫的幽谷,也不怕遭害,因为你与我同在;你的杖,你的竿,都安慰我。" },
      { v: 5, t: "在我敌人面前,你为我摆设筵席;你用油膏了我的头,使我的福杯满溢。" },
      { v: 6, t: "我一生一世必有恩惠慈爱随着我;我且要住在耶和华的殿中,直到永远。" },
    ],
  },
  {
    book: "psalms", chapter: 23, translation: "VULGATE",
    // Vulgate numbering: Psalm 22 (LXX/Vulgate) = Psalm 23 (Masoretic/Hebrew).
    // We index it under chapter 23 for cross-reference with our canon.
    verses: [
      { v: 1, t: "Psalmus David. Dominus regit me, et nihil mihi deerit:" },
      { v: 2, t: "in loco pascuae, ibi me collocavit. Super aquam refectionis educavit me;" },
      { v: 3, t: "animam meam convertit. Deduxit me super semitas justitiae, propter nomen suum." },
      { v: 4, t: "Nam etsi ambulavero in medio umbrae mortis, non timebo mala, quoniam tu mecum es. Virga tua, et baculus tuus, ipsa me consolata sunt." },
      { v: 5, t: "Parasti in conspectu meo mensam adversus eos qui tribulant me; impinguasti in oleo caput meum: et calix meus inebrians quam praeclarus est!" },
      { v: 6, t: "Et misericordia tua subsequetur me omnibus diebus vitae meae; et ut inhabitem in domo Domini in longitudinem dierum." },
    ],
  },

  // === Psalm 100 ===
  {
    book: "psalms", chapter: 100, translation: "WEB",
    verses: [
      { v: 1, t: "Shout for joy to Yahweh, all you lands!" },
      { v: 2, t: "Serve Yahweh with gladness. Come before his presence with singing." },
      { v: 3, t: "Know that Yahweh, he is God. It is he who has made us, and we are his. We are his people, and the sheep of his pasture." },
      { v: 4, t: "Enter into his gates with thanksgiving, and into his courts with praise. Give thanks to him, and bless his name." },
      { v: 5, t: "For Yahweh is good. His loving kindness endures forever, his faithfulness to all generations." },
    ],
  },
  {
    book: "psalms", chapter: 100, translation: "KJV",
    verses: [
      { v: 1, t: "Make a joyful noise unto the LORD, all ye lands." },
      { v: 2, t: "Serve the LORD with gladness: come before his presence with singing." },
      { v: 3, t: "Know ye that the LORD he is God: it is he that hath made us, and not we ourselves; we are his people, and the sheep of his pasture." },
      { v: 4, t: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name." },
      { v: 5, t: "For the LORD is good; his mercy is everlasting; and his truth endureth to all generations." },
    ],
  },

  // === Psalm 117 (the shortest chapter) ===
  {
    book: "psalms", chapter: 117, translation: "WEB",
    verses: [
      { v: 1, t: "Praise Yahweh, all you nations! Extol him, all you peoples!" },
      { v: 2, t: "For his loving kindness is great toward us. Yahweh's faithfulness endures forever. Praise Yah!" },
    ],
  },
  {
    book: "psalms", chapter: 117, translation: "KJV",
    verses: [
      { v: 1, t: "O praise the LORD, all ye nations: praise him, all ye people." },
      { v: 2, t: "For his merciful kindness is great toward us: and the truth of the LORD endureth for ever. Praise ye the LORD." },
    ],
  },

  // === Psalm 150 ===
  {
    book: "psalms", chapter: 150, translation: "WEB",
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

export function findChapter(
  bookId: string,
  chapter: number,
  translation?: TranslationId
): ChapterText | undefined {
  if (translation) {
    return seed.find(
      (c) => c.book === bookId && c.chapter === chapter && c.translation === translation
    );
  }
  return seed.find((c) => c.book === bookId && c.chapter === chapter);
}

export function loadedChapters(bookId: string): number[] {
  const set = new Set<number>();
  for (const c of seed) {
    if (c.book === bookId) set.add(c.chapter);
  }
  return Array.from(set).sort((a, b) => a - b);
}

export function loadedTranslations(bookId: string, chapter: number): TranslationId[] {
  const set = new Set<TranslationId>();
  for (const c of seed) {
    if (c.book === bookId && c.chapter === chapter) set.add(c.translation);
  }
  return Array.from(set);
}

// Backwards-compat exports
export const TRANSLATION_NAME = "World English Bible (WEB)";
export const TRANSLATION_LICENSE = "Public domain · eBible.org";
