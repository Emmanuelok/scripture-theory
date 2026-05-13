// ─── The Daily Office ─────────────────────────────────────────
// The "Daily Office" (Latin: opus Dei, "the work of God") is the practice of
// praying at fixed hours of the day. Rooted in Psalm 119:164 ("Seven times a
// day I praise You") and Acts 3:1 (Peter and John going up at "the hour of
// prayer"), it shaped Christian piety from the first centuries through every
// branch of the church.
//
// We offer four simple offices — Morning (Lauds), Midday (Sext), Evening
// (Vespers), and Night (Compline) — drawn from the historic forms and
// stripped of in-house jargon so any believer can pray them. Each office
// follows the same rhythm: opening, psalm, Scripture, canticle/prayer,
// the Lord's Prayer, blessing.

export type OfficeId = "morning" | "midday" | "evening" | "night";

export type OfficePart = {
  kind: "opening" | "psalm" | "scripture" | "canticle" | "prayer" | "lords-prayer" | "blessing";
  label: string;
  text: string;
  ref?: string;
};

export type Office = {
  id: OfficeId;
  name: string;
  altName: string;
  windowLabel: string; // "Pray at sunrise…"
  description: string;
  parts: OfficePart[];
};

const LORDS_PRAYER: OfficePart = {
  kind: "lords-prayer",
  label: "The Lord's Prayer",
  text:
    "Our Father, who art in heaven, hallowed be Thy name.\nThy kingdom come, Thy will be done, on earth as it is in heaven.\nGive us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us.\nAnd lead us not into temptation, but deliver us from evil.\nFor Thine is the kingdom, and the power, and the glory, forever. Amen.",
  ref: "Matthew 6:9-13",
};

export const offices: Office[] = [
  {
    id: "morning",
    name: "Morning Prayer",
    altName: "Lauds",
    windowLabel: "First light to mid-morning",
    description:
      "The day begins with God. Before email, before news, before food — give Him your first thought.",
    parts: [
      {
        kind: "opening",
        label: "Opening",
        text: "O Lord, open my lips,\nand my mouth shall declare Your praise.",
        ref: "Psalm 51:15",
      },
      {
        kind: "psalm",
        label: "Psalm 95 (the Venite)",
        text:
          "Come, let us sing to the LORD;\nlet us shout for joy to the Rock of our salvation.\nLet us come before His presence with thanksgiving,\nand raise a loud shout to Him with psalms.\nFor the LORD is a great God,\nand a great King above all gods.\nIn His hand are the caverns of the earth,\nand the heights of the hills are His also.\nThe sea is His, for He made it,\nand His hands have molded the dry land.\nCome, let us bow down and bend the knee,\nand kneel before the LORD our Maker.\nFor He is our God,\nand we are the people of His pasture and the sheep of His hand.",
        ref: "Psalm 95:1-7",
      },
      {
        kind: "scripture",
        label: "Scripture",
        text:
          "The steadfast love of the LORD never ceases; His mercies never come to an end; they are new every morning; great is Your faithfulness.",
        ref: "Lamentations 3:22-23",
      },
      {
        kind: "canticle",
        label: "Canticle — the Song of Zechariah",
        text:
          "Blessed be the Lord, the God of Israel,\nfor He has visited and redeemed His people.\nHe has raised up a horn of salvation for us\nin the house of His servant David.\nIn the tender compassion of our God\nthe dawn from on high shall break upon us,\nto give light to those who sit in darkness and in the shadow of death,\nand to guide our feet into the way of peace.",
        ref: "Luke 1:68, 78-79",
      },
      {
        kind: "prayer",
        label: "Prayer of the morning",
        text:
          "Lord God, You have brought me to the beginning of this day. Defend me by Your mighty power; let me fall into no sin, neither run into any kind of danger; but that all my doings, being ordered by Your governance, may be righteous in Your sight; through Jesus Christ my Lord. Amen.",
      },
      LORDS_PRAYER,
      {
        kind: "blessing",
        label: "Going out",
        text:
          "The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit, be with me this day. Amen.",
        ref: "2 Corinthians 13:14",
      },
    ],
  },
  {
    id: "midday",
    name: "Midday Prayer",
    altName: "Sext",
    windowLabel: "Late morning to early afternoon",
    description:
      "A pause in the middle of the day's work. Three minutes is enough. The point is to lift your eyes.",
    parts: [
      {
        kind: "opening",
        label: "Opening",
        text:
          "I will lift up my eyes to the hills — from whence comes my help?\nMy help comes from the LORD, who made heaven and earth.",
        ref: "Psalm 121:1-2",
      },
      {
        kind: "psalm",
        label: "Psalm 67",
        text:
          "God be merciful to us and bless us,\nand cause His face to shine upon us,\nthat Your way may be known on earth,\nYour salvation among all nations.\nLet the peoples praise You, O God;\nlet all the peoples praise You.\nOh, let the nations be glad and sing for joy!\nFor You shall judge the people righteously,\nand govern the nations on earth.",
        ref: "Psalm 67:1-4",
      },
      {
        kind: "scripture",
        label: "Scripture",
        text:
          "Whatever you do, do all to the glory of God.",
        ref: "1 Corinthians 10:31",
      },
      {
        kind: "prayer",
        label: "Prayer at noon",
        text:
          "Almighty Savior, who at noonday called Your servant Saint Paul to be an apostle to the Gentiles: I pray You to illumine the world with the radiance of Your glory, that all nations may come and worship You; who lives and reigns forever and ever. Amen.",
      },
      LORDS_PRAYER,
      {
        kind: "blessing",
        label: "Returning to the work",
        text:
          "Prosper, O Lord, the work of my hands; prosper, O Lord, my work. Amen.",
        ref: "Psalm 90:17",
      },
    ],
  },
  {
    id: "evening",
    name: "Evening Prayer",
    altName: "Vespers",
    windowLabel: "Late afternoon to early evening",
    description:
      "The work of the day is laid down. The lamps are lit. Thanksgiving rises like incense.",
    parts: [
      {
        kind: "opening",
        label: "Opening",
        text:
          "Let my prayer be set forth in Your sight as incense,\nthe lifting up of my hands as the evening sacrifice.",
        ref: "Psalm 141:2",
      },
      {
        kind: "psalm",
        label: "Psalm 27",
        text:
          "The LORD is my light and my salvation; whom shall I fear?\nThe LORD is the strength of my life; of whom shall I be afraid?\nOne thing I have desired of the LORD, that will I seek:\nThat I may dwell in the house of the LORD all the days of my life,\nto behold the beauty of the LORD,\nand to inquire in His temple.\nWait on the LORD; be of good courage,\nand He shall strengthen your heart;\nwait, I say, on the LORD!",
        ref: "Psalm 27:1, 4, 14",
      },
      {
        kind: "scripture",
        label: "Scripture",
        text:
          "Now may the God of peace Himself sanctify you completely; and may your whole spirit, soul, and body be preserved blameless at the coming of our Lord Jesus Christ. He who calls you is faithful, who also will do it.",
        ref: "1 Thessalonians 5:23-24",
      },
      {
        kind: "canticle",
        label: "Canticle — the Magnificat",
        text:
          "My soul magnifies the Lord,\nand my spirit has rejoiced in God my Savior.\nFor He has regarded the lowly state of His maidservant…\nHe has shown strength with His arm;\nHe has scattered the proud in the imagination of their hearts.\nHe has put down the mighty from their thrones,\nand exalted the lowly.\nHe has filled the hungry with good things,\nand the rich He has sent away empty.",
        ref: "Luke 1:46-53",
      },
      {
        kind: "prayer",
        label: "Prayer of the evening",
        text:
          "Lord, You have called Your servants to ventures of which we cannot see the ending, by paths as yet untrodden, through perils unknown. Give us faith to go out with good courage, not knowing where we go, but only that Your hand is leading us and Your love supporting us; through Jesus Christ our Lord. Amen.",
      },
      LORDS_PRAYER,
      {
        kind: "blessing",
        label: "Going to rest",
        text:
          "May the Lord grant us a peaceful evening and a perfect end. Amen.",
      },
    ],
  },
  {
    id: "night",
    name: "Night Prayer",
    altName: "Compline",
    windowLabel: "Before sleep",
    description:
      "The day is given back to God. Sins are confessed. The soul lies down trusting.",
    parts: [
      {
        kind: "opening",
        label: "Opening",
        text:
          "The Lord almighty grant me a quiet night and peace at the last. Amen.",
      },
      {
        kind: "prayer",
        label: "Confession",
        text:
          "Almighty God, our heavenly Father, I have sinned against You, through my own fault, in thought, and word, and deed, in what I have done, and in what I have left undone. For the sake of Your Son Jesus Christ, have mercy on me, forgive me my sins, and bring me to everlasting life; through Jesus Christ my Lord. Amen.",
      },
      {
        kind: "psalm",
        label: "Psalm 91",
        text:
          "He who dwells in the secret place of the Most High\nshall abide under the shadow of the Almighty.\nI will say of the LORD, 'He is my refuge and my fortress;\nmy God, in Him I will trust.'\nHe shall cover you with His feathers,\nand under His wings you shall take refuge;\nHis truth shall be your shield and buckler.\nYou shall not be afraid of the terror by night,\nnor of the arrow that flies by day.\nBecause you have made the LORD, who is my refuge,\neven the Most High, your dwelling place,\nno evil shall befall you,\nnor shall any plague come near your dwelling.\nFor He shall give His angels charge over you,\nto keep you in all your ways.",
        ref: "Psalm 91:1-5, 9-11",
      },
      {
        kind: "scripture",
        label: "Scripture",
        text:
          "Be sober, be vigilant; because your adversary the devil walks about like a roaring lion, seeking whom he may devour. Resist him, steadfast in the faith.",
        ref: "1 Peter 5:8-9",
      },
      {
        kind: "canticle",
        label: "Canticle — the Song of Simeon (Nunc Dimittis)",
        text:
          "Lord, now You are letting Your servant depart in peace,\naccording to Your word;\nfor my eyes have seen Your salvation\nwhich You have prepared before the face of all peoples,\na light to bring revelation to the Gentiles,\nand the glory of Your people Israel.",
        ref: "Luke 2:29-32",
      },
      {
        kind: "prayer",
        label: "Prayer at the close of day",
        text:
          "Keep watch, dear Lord, with those who work, or watch, or weep this night, and give Your angels charge over those who sleep. Tend the sick, Lord Christ; give rest to the weary, bless the dying, soothe the suffering, pity the afflicted, shield the joyous; and all for Your love's sake. Amen.",
      },
      LORDS_PRAYER,
      {
        kind: "blessing",
        label: "Into His hands",
        text:
          "Into Your hands, O Lord, I commit my spirit; You have redeemed me, O Lord, God of truth.",
        ref: "Psalm 31:5",
      },
    ],
  },
];

export function whichOfficeNow(date = new Date()): OfficeId {
  const h = date.getHours();
  if (h < 11) return "morning";
  if (h < 15) return "midday";
  if (h < 21) return "evening";
  return "night";
}

export const officeIntro = {
  title: "Seven times a day I praise You.",
  body: [
    "From the earliest centuries, Christians have stopped their work several times a day to turn the heart toward God. The Psalms shaped these hours; the Apostles kept them (Acts 3:1, 10:9). They became the Daily Office — the slow, ancient rhythm under all the more recent rhythms of the church.",
    "Most modern believers have never been shown the door to this room. Here it is. Four short offices — morning, midday, evening, night. Each is built of Scripture: an opening, a psalm, a reading, a canticle, a prayer, the Lord's Prayer, a blessing. None of it requires a clergyman, a building, or even a Bible at hand. It can be prayed in five minutes.",
    "These are not magic. They are not earning. They are the trellis on which the Spirit grows the vine of a prayerful life.",
  ],
};
