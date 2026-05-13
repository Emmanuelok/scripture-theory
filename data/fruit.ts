// ─── Fruit of the Spirit growth check ─────────────────────────
// "But the fruit of the Spirit is love, joy, peace, patience, kindness,
// goodness, faithfulness, gentleness, self-control. Against such there
// is no law." — Galatians 5:22-23
//
// Sanctification is real and observable. This is not a guilt trip and
// not a personality test. It is a periodic self-check — am I more like
// Christ this season than last? Where is the Spirit working? Where am
// I resisting?

import type { FruitFacet } from "@/lib/profile";

export type FruitDef = {
  id: FruitFacet;
  name: string;
  greek: string;
  scripture: { ref: string; text: string };
  short: string;
  questions: string[];     // 3 honest self-questions
  prayer: string;
  opposite: string;
};

export const fruits: FruitDef[] = [
  {
    id: "love",
    name: "Love",
    greek: "agapē",
    scripture: { ref: "1 John 4:7-8", text: "Beloved, let us love one another, for love is of God; and everyone who loves is born of God and knows God." },
    short: "Willing the good of the other, even at cost to self. Not feeling — choosing.",
    questions: [
      "Did I lay my life down (time, money, comfort) for another this week?",
      "Whom did I refuse to love this week — and why?",
      "Did anyone experience the love of Jesus through me?",
    ],
    prayer: "Father, pour out Your love into my heart by the Spirit. Make me a channel today.",
    opposite: "indifference, selfishness, transactional relating",
  },
  {
    id: "joy",
    name: "Joy",
    greek: "chara",
    scripture: { ref: "John 15:11", text: "These things I have spoken to you, that My joy may remain in you, and that your joy may be full." },
    short: "Deep gladness in God that doesn't depend on circumstance.",
    questions: [
      "What stole my joy this week — and did I bring it to Him?",
      "Did I delight in something simple from the Father's hand?",
      "Where did I trade gladness for self-pity?",
    ],
    prayer: "Lord, You are my exceeding joy (Psalm 43:4). Restore the gladness of my salvation.",
    opposite: "cynicism, complaining, joyless duty",
  },
  {
    id: "peace",
    name: "Peace",
    greek: "eirēnē",
    scripture: { ref: "John 14:27", text: "Peace I leave with you, My peace I give to you; not as the world gives do I give to you." },
    short: "Wholeness with God, neighbor, and self. Quiet under the storm.",
    questions: [
      "Did anxiety drive me this week — or trust?",
      "Where was I a peacemaker? Where did I escalate?",
      "What am I refusing to surrender to Him?",
    ],
    prayer: "Lord, You are my Shalom. Bind up the fractures in me. Make me an instrument of Your peace.",
    opposite: "anxiety, agitation, internal warfare",
  },
  {
    id: "patience",
    name: "Patience",
    greek: "makrothymia",
    scripture: { ref: "James 5:7-8", text: "Therefore be patient, brethren, until the coming of the Lord." },
    short: "Long-tempered. Slow to anger. Able to wait.",
    questions: [
      "Whom did I lose patience with this week — and why?",
      "What am I tired of waiting for? Am I trusting God in the wait?",
      "Did my response time grow shorter or longer in stress?",
    ],
    prayer: "Father, You have been patient with me beyond measure. Form patience in me toward others.",
    opposite: "irritability, short fuse, demanding speed",
  },
  {
    id: "kindness",
    name: "Kindness",
    greek: "chrēstotēs",
    scripture: { ref: "Ephesians 4:32", text: "Be kind to one another, tenderhearted, forgiving one another, even as God in Christ forgave you." },
    short: "Useful goodness — practical, warm, present.",
    questions: [
      "Did I do an unrequired kindness this week?",
      "Was I kind to the people I find most difficult?",
      "Was I kind in private, where no one would see?",
    ],
    prayer: "Lord, Your kindness leads me to repentance (Rom 2:4). Let it flow through me to others.",
    opposite: "coldness, harshness, calculated transactions",
  },
  {
    id: "goodness",
    name: "Goodness",
    greek: "agathōsynē",
    scripture: { ref: "Psalm 23:6", text: "Surely goodness and mercy shall follow me all the days of my life." },
    short: "Moral excellence that benefits others — generosity of being.",
    questions: [
      "Did I do what was right this week, even where it cost me?",
      "Where did I cut a moral corner and call it pragmatism?",
      "What hidden temptation did I refuse?",
    ],
    prayer: "Father, You are the source of all goodness. Make me good in the unseen places.",
    opposite: "compromise, hidden evil, ethical drift",
  },
  {
    id: "faithfulness",
    name: "Faithfulness",
    greek: "pistis",
    scripture: { ref: "1 Corinthians 4:2", text: "Moreover it is required in stewards that one be found faithful." },
    short: "Reliability. Showing up. Keeping word.",
    questions: [
      "Did I keep my word this week — to God, to people, to myself?",
      "Did I show up for the small, hidden, faithful things?",
      "Where did I quit before I should have?",
    ],
    prayer: "Lord, You are faithful when I am faithless. Make me trustworthy in the small things.",
    opposite: "flakiness, broken promises, abandonment",
  },
  {
    id: "gentleness",
    name: "Gentleness",
    greek: "prautēs",
    scripture: { ref: "Matthew 11:29", text: "Take My yoke upon you and learn from Me, for I am gentle and lowly in heart." },
    short: "Strength under control. Power that does not bruise.",
    questions: [
      "Did I use my words to crush this week, or to build?",
      "Where was I needlessly forceful, defensive, or argumentative?",
      "Did I receive correction with humility?",
    ],
    prayer: "Lord Jesus, gentle and lowly, conform me to Your meekness.",
    opposite: "harshness, defensiveness, contempt",
  },
  {
    id: "self-control",
    name: "Self-control",
    greek: "enkrateia",
    scripture: { ref: "2 Peter 1:6", text: "To knowledge, self-control; to self-control, perseverance; to perseverance, godliness." },
    short: "Mastery of the body, tongue, and impulses — under the Spirit.",
    questions: [
      "What appetite ruled me this week — food, screens, anger, fantasy?",
      "Did I say things I should not have said?",
      "Where did I yield to the flesh? Where did I crucify it?",
    ],
    prayer: "Spirit of God, my willpower is not enough. Have mastery in me where I cannot have it in myself.",
    opposite: "impulse, addiction, runaway tongue",
  },
];

export const fruitIntro = {
  title: "Fruit, not works.",
  body: [
    "Galatians 5 calls these the fruit of the Spirit — singular fruit, plural facets. They are produced in us by the Holy Spirit, not earned by our striving. We cannot squeeze them out of ourselves.",
    "But fruit can be checked. A tree growing in the right soil bears more, season by season. So can a soul abiding in Christ (John 15). This check is a periodic look — am I growing? Where is the Spirit at work? Where am I resisting Him?",
    "Be honest. Be kind to yourself. Then ask one trusted believer to look at the same questions and tell you what they see.",
  ],
};
