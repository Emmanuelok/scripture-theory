export type LordsPrayerLine = {
  phrase: string;
  meditation: string;
  prompt: string;
};

export const lordsPrayer: LordsPrayerLine[] = [
  {
    phrase: "Our Father in heaven,",
    meditation:
      "We are not orphans. The God who made the universe is your Father. We do not begin by demanding — we begin by belonging.",
    prompt: "Tell God He is your Father. Thank Him that you are not alone today.",
  },
  {
    phrase: "hallowed be your name.",
    meditation:
      "Before our needs, His glory. May His name be honored in the earth, in our city, and in our own life today.",
    prompt: "Name one place in your life where God is not yet honored. Ask Him to be honored there.",
  },
  {
    phrase: "Your kingdom come,",
    meditation:
      "We are asking for the King's rule to come — into our home, our work, our nation, our heart.",
    prompt: "Pray for one situation where evil seems to be winning. Ask the King to come.",
  },
  {
    phrase: "your will be done, on earth as it is in heaven.",
    meditation:
      "Heaven is where God's will is done freely and joyfully. We are praying earth would look more like heaven today.",
    prompt: "Surrender one thing you have been trying to control. Say: Your will, not mine.",
  },
  {
    phrase: "Give us this day our daily bread.",
    meditation:
      "We ask for today's bread, not next year's. Trust is rebuilt one day at a time.",
    prompt: "Ask the Father for what you actually need today — food, work, wisdom, courage, joy.",
  },
  {
    phrase: "And forgive us our debts,",
    meditation:
      "Bring your sins into the light. He already knows them; He longs to forgive them.",
    prompt: "Name your sins to God specifically. Receive His mercy through Jesus.",
  },
  {
    phrase: "as we also have forgiven our debtors.",
    meditation:
      "Forgiveness is the air the forgiven breathe. Refusing to forgive blocks our own lungs.",
    prompt: "Who do you need to forgive today? Begin — even with a single sentence.",
  },
  {
    phrase: "And lead us not into temptation,",
    meditation:
      "We are weak. We need a Father who steers us away from the places where we fall.",
    prompt: "Name one temptation you face this week. Ask the Father to lead you around it.",
  },
  {
    phrase: "but deliver us from evil.",
    meditation:
      "There is a real enemy. We are not strong enough on our own — and we don't have to be.",
    prompt: "Ask Jesus, the Stronger One, for deliverance — where you have felt powerless.",
  },
  {
    phrase: "For yours is the kingdom and the power and the glory, forever. Amen.",
    meditation:
      "We end where we began: with Him. The kingdom, the power, and the glory are not ours — and that is good news.",
    prompt: "Close in praise. Tell Him He is enough.",
  },
];

export type ActsMovement = {
  letter: string;
  word: string;
  body: string;
  scripture: string;
  reference: string;
};

export const acts: ActsMovement[] = [
  {
    letter: "A",
    word: "Adoration",
    body: "Begin by telling God who He is and praising Him for it. Not what He has done for you yet — who He is.",
    scripture: "Holy, holy, holy is the Lord of hosts; the whole earth is full of his glory!",
    reference: "Isaiah 6:3",
  },
  {
    letter: "C",
    word: "Confession",
    body: "Name your sins. Specifically. He is faithful and just to forgive — that is His character, not your achievement.",
    scripture: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
    reference: "1 John 1:9",
  },
  {
    letter: "T",
    word: "Thanksgiving",
    body: "Now count the gifts. Today's. This week's. From this season. Gratitude reorders the soul.",
    scripture: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
    reference: "1 Thessalonians 5:18",
  },
  {
    letter: "S",
    word: "Supplication",
    body: "Now ask. For yourself, for your people, for the nations. The Father invites it.",
    scripture: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    reference: "Philippians 4:6",
  },
];

export type RegionPrayer = {
  region: string;
  focus: string;
  pray: string[];
};

export const worldPrayer: RegionPrayer[] = [
  {
    region: "Sub-Saharan Africa",
    focus: "Discipleship deeper than growth",
    pray: [
      "For the millions of new believers across the continent — that they would be deeply formed in Christ.",
      "For Bible translation in the hundreds of African languages still without a full Bible.",
      "For peace in places of conflict, and for the protection of believers who suffer for the Name.",
    ],
  },
  {
    region: "East Asia",
    focus: "Boldness and wisdom",
    pray: [
      "For the underground and registered church across China, Japan, Korea, and beyond.",
      "For believers who follow Jesus at great cost from their families and governments.",
      "For students, workers, and grandparents to encounter the Living Christ in their own language.",
    ],
  },
  {
    region: "South Asia",
    focus: "The fields are ripe",
    pray: [
      "For India, Pakistan, Bangladesh, Nepal, and Sri Lanka — billions who have not heard of Jesus.",
      "For the local church to be unafraid in seasons of pressure and persecution.",
      "For Dalit, tribal, and unreached peoples to hear the Gospel in their heart language.",
    ],
  },
  {
    region: "Middle East & North Africa",
    focus: "Dreams and bold witnesses",
    pray: [
      "For the rapidly growing church in Iran, the Gulf, and across Arabic-speaking lands.",
      "For brothers and sisters who follow Jesus at the cost of family, livelihood, and life.",
      "For believing women, who often lead in faith at greatest cost.",
    ],
  },
  {
    region: "Latin America",
    focus: "Joy and justice",
    pray: [
      "For the global influence of the Latin American church — sending missionaries to every continent.",
      "For young believers — that they would be discipled deeply, not just emotionally moved.",
      "For peace in countries broken by violence, corruption, and poverty.",
    ],
  },
  {
    region: "Europe",
    focus: "A new spring",
    pray: [
      "For revival in the places where the Gospel once burned brightly and is now nearly forgotten.",
      "For a generation of young Europeans who have never heard the name of Jesus from anyone they trust.",
      "For unity among believers across confessional lines in cities that need a single witness.",
    ],
  },
  {
    region: "North America",
    focus: "Repentance and renewal",
    pray: [
      "For the American and Canadian church — that it would be marked by Christ, not by partisanship.",
      "For believers across First Nations, Indigenous, and immigrant communities.",
      "For pastors carrying burdens silently — that they would find rest in Jesus.",
    ],
  },
  {
    region: "Oceania & the Pacific",
    focus: "Faithfulness across the islands",
    pray: [
      "For the church across Australia, New Zealand, Papua New Guinea, and the Pacific nations.",
      "For Bible translators serving among the hundreds of Pacific languages.",
      "For believers facing the loss of land, livelihood, and home from climate-related crises.",
    ],
  },
];

export function todaysRegionIndex(d: Date = new Date()) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - start;
  const day = Math.floor(diff / 86400000);
  return day % worldPrayer.length;
}
