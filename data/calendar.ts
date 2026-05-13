// ─── The liturgical calendar ─────────────────────────────────
// The shape of the Christian year, held ecumenically (the moments
// every faithful tradition recognizes — Advent through Christ the
// King — with light scripture + prayer prompts that point to Christ.
//
// Date math (Easter is movable; everything else hangs off it) lives
// in lib/calendar.ts. This file is just the names, themes, colors,
// and prompts.

export type SeasonId =
  | "advent"
  | "christmas"
  | "epiphany"
  | "ordinary-pre-lent"
  | "lent"
  | "holy-week"
  | "easter"
  | "pentecost-season" // Pentecost + the week after
  | "ordinary-after-pentecost";

export type Season = {
  id: SeasonId;
  name: string;
  tagline: string;
  /** The dominant Christian-tradition color for this season. */
  color: "purple" | "white" | "green" | "red" | "rose" | "gold";
  /** Hex used in UI accents — we map back to flame/ink in components. */
  accent: string;
  /** A one-paragraph description for the /calendar page. */
  about: string;
  /** A central scripture for the season. */
  scripture: { ref: string; text: string };
  /** Three short prayer prompts. */
  pray: string[];
  /** Practical practices for the season. */
  practices: string[];
};

export const SEASONS: Record<SeasonId, Season> = {
  advent: {
    id: "advent",
    name: "Advent",
    tagline: "Watch. The King is coming.",
    color: "purple",
    accent: "#7c3aed",
    about:
      "Four weeks of watching. The Church remembers how Israel waited for Messiah, and waits herself for His return. Quiet, expectant, hopeful — not yet Christmas, not yet ordinary. The candle is lit one more each week.",
    scripture: {
      ref: "Isaiah 9:2",
      text: "The people who walked in darkness have seen a great light; those who dwelt in the land of the shadow of death, upon them a light has shined.",
    },
    pray: [
      "Come, Lord Jesus — keep me hungry for Your return, not just Your blessings.",
      "Show me what to put down so my hands are free to receive Your Son.",
      "Father, where I have grown numb to the wonder, give me back the longing.",
    ],
    practices: [
      "Light a candle each Sunday at home; read a prophecy of Christ's coming.",
      "Keep one small Advent fast — a meal, a screen, a comfort — to feel the longing.",
      "Read Isaiah 7, 9, 11, and 40 across the four weeks.",
    ],
  },
  christmas: {
    id: "christmas",
    name: "Christmastide",
    tagline: "God moved into the neighborhood.",
    color: "white",
    accent: "#f59e0b",
    about:
      "The twelve days from Christmas Day to Epiphany. The Word became flesh and dwelt among us — and the angels are still singing somewhere over Bethlehem. We feast.",
    scripture: {
      ref: "John 1:14",
      text: "And the Word became flesh and dwelt among us, and we saw His glory, glory as of the only Son from the Father, full of grace and truth.",
    },
    pray: [
      "Father, thank You that You did not stay far. You came near.",
      "Jesus, You took on a body. Teach me to honor mine and others'.",
      "Spirit, fill our homes with the joy of Bethlehem this week.",
    ],
    practices: [
      "Read John 1 aloud on Christmas Day.",
      "Sing real hymns at home; the carols are catechism.",
      "Give to a believer or family who has less. The shepherds were poor.",
    ],
  },
  epiphany: {
    id: "epiphany",
    name: "Epiphany",
    tagline: "His light revealed to the nations.",
    color: "white",
    accent: "#0ea5e9",
    about:
      "Jan 6 and the weeks after. The Magi arrive — Gentile kings before the Jewish King — a sign that this Savior is for every tribe and tongue. The season meditates on the manifestation of Christ to the world.",
    scripture: {
      ref: "Matthew 2:11",
      text: "And going into the house, they saw the child with Mary his mother, and they fell down and worshiped him. Then, opening their treasures, they offered him gifts.",
    },
    pray: [
      "Lord, draw nations to Yourself — and use my small life as a star.",
      "What gift are You asking me to bring You this year?",
      "Open my eyes to see Your glory in places I'd dismissed.",
    ],
    practices: [
      "Pray for an unreached people group this week.",
      "Open the Nations rotation and adopt one country to carry all year.",
      "Bless your home: chalk 20 + C + M + B + (year) above the door, asking Christ to keep your household.",
    ],
  },
  "ordinary-pre-lent": {
    id: "ordinary-pre-lent",
    name: "Ordinary Time (winter)",
    tagline: "The slow, faithful walk.",
    color: "green",
    accent: "#16a34a",
    about:
      "The unhurried weeks between Epiphany and Ash Wednesday. Not a low season — the season where most of life is lived. Christ grew, ate, and walked the long road in 'ordinary' time too.",
    scripture: {
      ref: "Galatians 6:9",
      text: "And let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
    },
    pray: [
      "Father, give me a long obedience in the same direction.",
      "Where I'm waiting for the 'big' season, teach me to love this one.",
      "Make me faithful in the small, hidden things.",
    ],
    practices: [
      "Pick one discipline and walk it daily through the season.",
      "Read straight through one Gospel without rushing.",
      "Eat a slow meal once a week; thank Him out loud.",
    ],
  },
  lent: {
    id: "lent",
    name: "Lent",
    tagline: "Forty days back to the Father.",
    color: "purple",
    accent: "#7c3aed",
    about:
      "From Ash Wednesday to Holy Saturday — forty days mirroring Christ in the wilderness. The Church fasts, prays, gives, and repents her way back to the cross. Not earning anything; preparing to receive everything.",
    scripture: {
      ref: "Joel 2:12",
      text: '"Yet even now," declares the LORD, "return to me with all your heart, with fasting, with weeping, and with mourning."',
    },
    pray: [
      "Father, what have I let creep into the throne of my heart? Show me.",
      "Where I am rich, make me hungry. Where I am hungry, fill me.",
      "Search me, O God. I want to come to Easter clean.",
    ],
    practices: [
      "Choose one fast (food, screens, a comfort) and one extra prayer time.",
      "Walk through the Forgiveness practice for someone you've held a debt against.",
      "Give to a believer in need; do not let the right hand know what the left is doing.",
    ],
  },
  "holy-week": {
    id: "holy-week",
    name: "Holy Week",
    tagline: "Walk with Him to the cross.",
    color: "red",
    accent: "#b91c1c",
    about:
      "Palm Sunday through Holy Saturday — the most consequential week in human history. Read the Gospels' passion narratives day by day. Eat a Seder if you can. Keep silent vigil on Saturday.",
    scripture: {
      ref: "John 13:1",
      text: "Having loved his own who were in the world, he loved them to the end.",
    },
    pray: [
      "Jesus, walk me through this week. Do not let me look away from the cross.",
      "Father, what would You crucify in me this week?",
      "Holy Saturday — Lord, I will wait. I trust You in the dark.",
    ],
    practices: [
      "Read Matthew 21–27 across the week, a portion a day.",
      "Maundy Thursday: take the Lord's Supper at home if you cannot at church.",
      "Good Friday: keep a black fast — bread and water until sundown.",
    ],
  },
  easter: {
    id: "easter",
    name: "Eastertide",
    tagline: "He is risen indeed.",
    color: "gold",
    accent: "#f59e0b",
    about:
      "The fifty days from Easter Sunday to Pentecost. The longest feast in the Christian year — longer than Lent. We sing 'alleluia' loudly because the tomb is still empty.",
    scripture: {
      ref: "1 Corinthians 15:20",
      text: "But in fact Christ has been raised from the dead, the firstfruits of those who have fallen asleep.",
    },
    pray: [
      "Lord Jesus, You are alive. Make me alive with You today.",
      "Father, where I'm still buried in old shame, roll the stone away.",
      "Spirit of the risen Christ, fill this fifty-day feast.",
    ],
    practices: [
      "Sing 'Christ the Lord Is Risen Today' at home through the season.",
      "Feast — break every Lenten fast; the Bridegroom is back.",
      "Tell one unbelieving friend, in plain words, what the resurrection means.",
    ],
  },
  "pentecost-season": {
    id: "pentecost-season",
    name: "Pentecost",
    tagline: "The Spirit poured out.",
    color: "red",
    accent: "#dc2626",
    about:
      "Fifty days after Easter the Spirit fell. The Church was born from tongues of fire. We pray for fresh fire, for power to witness, for the gospel to run to every tongue.",
    scripture: {
      ref: "Acts 2:17",
      text: "And in the last days it shall be, God declares, that I will pour out my Spirit on all flesh.",
    },
    pray: [
      "Come, Holy Spirit. Fall on Your Church again.",
      "Give me power to witness today — in plain words, in this very neighborhood.",
      "Lord, multiply Your Body across every tongue and tribe.",
    ],
    practices: [
      "Pray for the unreached today: open Pray for the nations.",
      "Read Acts 2 and ask the Father for boldness.",
      "Lay hands on a brother or sister; pray for their gift to be stirred.",
    ],
  },
  "ordinary-after-pentecost": {
    id: "ordinary-after-pentecost",
    name: "Ordinary Time",
    tagline: "Live the Kingdom now.",
    color: "green",
    accent: "#16a34a",
    about:
      "The long green season after Pentecost. Trinity Sunday opens it; Christ the King closes it. Most of the year. This is where the Spirit grows real fruit through small daily obedience.",
    scripture: {
      ref: "Galatians 5:22-23",
      text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
    },
    pray: [
      "Father, grow the fruit. Even slowly. Especially slowly.",
      "Make me a faithful disciple in the unseen places.",
      "Use me where I am — not where I think I should be.",
    ],
    practices: [
      "Set or revise your Rule of Life for this stretch.",
      "Take a Fruit-of-the-Spirit check; ask the Lord which He's growing in you.",
      "Disciple one person, in your home or city, for the rest of this season.",
    ],
  },
};

/** Major fixed and movable feasts the global Church honors. */
export type FeastId =
  | "christmas-eve"
  | "christmas"
  | "epiphany-day"
  | "ash-wednesday"
  | "palm-sunday"
  | "maundy-thursday"
  | "good-friday"
  | "holy-saturday"
  | "easter-day"
  | "ascension"
  | "pentecost-day"
  | "trinity-sunday"
  | "all-saints"
  | "christ-the-king";

export type Feast = {
  id: FeastId;
  name: string;
  tagline: string;
  scripture: { ref: string; text: string };
  /** Which season this feast belongs inside. */
  season: SeasonId;
};

export const FEASTS: Record<FeastId, Feast> = {
  "christmas-eve": {
    id: "christmas-eve",
    name: "Christmas Eve",
    tagline: "The watch before the dawn.",
    scripture: {
      ref: "Luke 2:10-11",
      text: "Fear not, for behold, I bring you good news of great joy that will be for all the people. For unto you is born this day in the city of David a Savior, who is Christ the Lord.",
    },
    season: "advent",
  },
  christmas: {
    id: "christmas",
    name: "Christmas Day",
    tagline: "The Word made flesh.",
    scripture: {
      ref: "John 1:14",
      text: "And the Word became flesh and dwelt among us.",
    },
    season: "christmas",
  },
  "epiphany-day": {
    id: "epiphany-day",
    name: "Epiphany",
    tagline: "His light revealed to the nations.",
    scripture: {
      ref: "Matthew 2:1-2",
      text: "Behold, wise men from the east came to Jerusalem, saying, 'Where is he who has been born king of the Jews? For we saw his star when it rose and have come to worship him.'",
    },
    season: "epiphany",
  },
  "ash-wednesday": {
    id: "ash-wednesday",
    name: "Ash Wednesday",
    tagline: "Remember — you are dust.",
    scripture: {
      ref: "Genesis 3:19",
      text: "You are dust, and to dust you shall return.",
    },
    season: "lent",
  },
  "palm-sunday": {
    id: "palm-sunday",
    name: "Palm Sunday",
    tagline: "Hosanna to the King.",
    scripture: {
      ref: "Matthew 21:9",
      text: "Hosanna to the Son of David! Blessed is he who comes in the name of the Lord!",
    },
    season: "holy-week",
  },
  "maundy-thursday": {
    id: "maundy-thursday",
    name: "Maundy Thursday",
    tagline: "Love one another as I have loved you.",
    scripture: {
      ref: "John 13:34",
      text: "A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another.",
    },
    season: "holy-week",
  },
  "good-friday": {
    id: "good-friday",
    name: "Good Friday",
    tagline: "It is finished.",
    scripture: {
      ref: "John 19:30",
      text: "When Jesus had received the sour wine, he said, 'It is finished,' and he bowed his head and gave up his spirit.",
    },
    season: "holy-week",
  },
  "holy-saturday": {
    id: "holy-saturday",
    name: "Holy Saturday",
    tagline: "He has gone down to the dead.",
    scripture: {
      ref: "Psalm 130:1",
      text: "Out of the depths I cry to you, O LORD.",
    },
    season: "holy-week",
  },
  "easter-day": {
    id: "easter-day",
    name: "Easter Sunday",
    tagline: "Christ is risen — He is risen indeed.",
    scripture: {
      ref: "Matthew 28:6",
      text: "He is not here, for he has risen, as he said. Come, see the place where he lay.",
    },
    season: "easter",
  },
  ascension: {
    id: "ascension",
    name: "Ascension Day",
    tagline: "Crowned at the right hand.",
    scripture: {
      ref: "Acts 1:9",
      text: "And when he had said these things, as they were looking on, he was lifted up, and a cloud took him out of their sight.",
    },
    season: "easter",
  },
  "pentecost-day": {
    id: "pentecost-day",
    name: "Pentecost Sunday",
    tagline: "The Spirit fell on the Church.",
    scripture: {
      ref: "Acts 2:4",
      text: "And they were all filled with the Holy Spirit and began to speak in other tongues as the Spirit gave them utterance.",
    },
    season: "pentecost-season",
  },
  "trinity-sunday": {
    id: "trinity-sunday",
    name: "Trinity Sunday",
    tagline: "Holy, holy, holy.",
    scripture: {
      ref: "Matthew 28:19",
      text: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
    },
    season: "ordinary-after-pentecost",
  },
  "all-saints": {
    id: "all-saints",
    name: "All Saints' Day",
    tagline: "A great cloud of witnesses.",
    scripture: {
      ref: "Hebrews 12:1",
      text: "Since we are surrounded by so great a cloud of witnesses, let us also lay aside every weight, and sin which clings so closely, and let us run with endurance the race that is set before us.",
    },
    season: "ordinary-after-pentecost",
  },
  "christ-the-king": {
    id: "christ-the-king",
    name: "Christ the King",
    tagline: "Every knee, every tongue.",
    scripture: {
      ref: "Philippians 2:10-11",
      text: "At the name of Jesus every knee should bow… and every tongue confess that Jesus Christ is Lord.",
    },
    season: "ordinary-after-pentecost",
  },
};
