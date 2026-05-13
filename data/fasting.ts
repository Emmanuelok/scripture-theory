// ─── Biblical Fasting ─────────────────────────────────────────
// Fasting was assumed by Jesus — "WHEN you fast" (Matthew 6:16), not if.
// The Church has practiced fasting for two thousand years for hearing,
// breakthrough, repentance, and intercession. This guide is non-denominational
// and rooted in Scripture rather than legalism.

export type FastTypeDef = {
  id: "full" | "partial" | "daniel" | "media" | "sundown" | "one-meal" | "custom";
  name: string;
  duration: string;
  description: string;
  practice: string;
  scripture: { ref: string; text: string }[];
  cautions: string[];
};

export const fastTypes: FastTypeDef[] = [
  {
    id: "full",
    name: "Full fast (Esther fast)",
    duration: "1 to 3 days",
    description:
      "No food. Water only (or no water for a short time, as Esther). The most intense and ancient form, used for urgent intercession, repentance, and breakthrough.",
    practice:
      "Drink water generously. Replace meal times with Scripture and prayer. Withdraw from noise. Sleep more. Break the fast gently with broth, fruit, or simple food.",
    scripture: [
      { ref: "Esther 4:16", text: "Neither eat nor drink for three days, night or day." },
      { ref: "Matthew 4:2", text: "He fasted forty days and forty nights, and afterward He was hungry." },
      { ref: "Acts 13:2-3", text: "While they were ministering to the Lord and fasting, the Holy Spirit said…" },
    ],
    cautions: [
      "Do not attempt without water beyond 1–2 days.",
      "If you have a medical condition, are pregnant, nursing, diabetic, recovering from an eating disorder, or under 18 — consult a doctor and pastor first, or choose a partial fast.",
      "Break a multi-day full fast slowly. Do not eat a heavy meal at the end.",
    ],
  },
  {
    id: "daniel",
    name: "Daniel fast",
    duration: "10 to 21 days",
    description:
      "No meat, no rich food, no wine. Vegetables, fruit, legumes, whole grains, water. Daniel's spiritual posture: humility, mourning, seeking the Lord.",
    practice:
      "Plan meals before you begin. Cut sweets, alcohol, processed food. Keep water plentiful. Use the daily time gained from preparation and craving for Scripture and intercession.",
    scripture: [
      { ref: "Daniel 1:12", text: "Test your servants for ten days: let them give us vegetables to eat and water to drink." },
      { ref: "Daniel 10:3", text: "I ate no pleasant bread, neither came flesh nor wine in my mouth." },
    ],
    cautions: [
      "It is still a real fast — expect discomfort.",
      "Don't substitute one comfort for another (vegan junk food is not the point).",
    ],
  },
  {
    id: "partial",
    name: "Partial fast",
    duration: "Sunrise to sunset, or one designated meal time",
    description:
      "Abstaining from food for part of the day. A common rhythm for working believers, parents, and those new to fasting.",
    practice:
      "Decide your window before you begin (e.g. 6am–6pm). Skip the meals in that window. Pray and read Scripture at the times you'd normally eat.",
    scripture: [
      { ref: "Judges 20:26", text: "All the people went up… and sat there before the LORD, and fasted that day until evening." },
      { ref: "Acts 10:30", text: "Four days ago I was fasting until this hour; and at the ninth hour I prayed in my house." },
    ],
    cautions: [
      "Don't binge-eat at the end. The point is hunger that turns to prayer.",
    ],
  },
  {
    id: "one-meal",
    name: "One-meal day",
    duration: "One day",
    description:
      "Eat one simple meal in the day. The rest of the day, water and prayer. A gentle entry to fasting and a practical weekly rhythm.",
    practice:
      "Choose a quiet meal (bread, soup, vegetables). Keep it small and undistracted. Pray at the meal — Jesus is the Bread.",
    scripture: [
      { ref: "Matthew 6:11", text: "Give us this day our daily bread." },
      { ref: "John 6:35", text: "I am the bread of life." },
    ],
    cautions: ["Don't over-engineer it. The point is dependence."],
  },
  {
    id: "sundown",
    name: "Sundown-to-sundown fast",
    duration: "24 hours",
    description:
      "No food from sunset to sunset the next day — the biblical pattern of a day. Water only. Strong for weekly rhythm or first attempts.",
    practice:
      "Eat a normal dinner. Skip breakfast and lunch the next day. Break with a quiet evening meal of thanksgiving.",
    scripture: [
      { ref: "Leviticus 23:32", text: "From evening to evening shall you celebrate your sabbath." },
    ],
    cautions: ["Hydrate well throughout the day."],
  },
  {
    id: "media",
    name: "Media / digital fast",
    duration: "1 day to 40 days",
    description:
      "Abstain from screens, scrolling, news, entertainment. Not a substitute for food fasting — an additional discipline for the noise-exhausted soul.",
    practice:
      "Delete the apps for the period (don't just close them). Tell the people who'll be looking for you. Spend the reclaimed hours in Scripture, prayer, sleep, presence with people, the outdoors.",
    scripture: [
      { ref: "Psalm 46:10", text: "Be still, and know that I am God." },
      { ref: "Mark 1:35", text: "Very early in the morning… Jesus departed and went to a solitary place, and there prayed." },
    ],
    cautions: [
      "If your work requires the screen, narrow the fast to off-work hours and personal feeds.",
    ],
  },
  {
    id: "custom",
    name: "Custom fast",
    duration: "You decide",
    description:
      "Any abstinence you set before the Lord with prayerful intent — sugar, alcohol, a meal, social media. Write the focus, ask Him to meet you in the hunger.",
    practice:
      "Write what you're abstaining from, for how long, and the matter you're bringing to the Lord. Tell one trusted person.",
    scripture: [
      { ref: "Joel 2:12", text: "Return to me with all your heart, with fasting, with weeping, and with mourning." },
    ],
    cautions: [
      "Don't make fasting a way to perform for God. He sees what is done in secret (Matthew 6:18).",
    ],
  },
];

export const fastingTeaching = {
  whyFast: [
    {
      title: "Jesus assumed we would.",
      body: "He said 'when you fast' not 'if you fast' (Matthew 6:16). And He said His disciples would fast after He returned to the Father (Matthew 9:15).",
    },
    {
      title: "Fasting amplifies prayer.",
      body: "Throughout Scripture, fasting accompanied the deepest moments of seeking — Esther before the king, Daniel before the visions, the church at Antioch before sending Paul out, Jesus before His ministry began.",
    },
    {
      title: "Fasting clarifies hunger.",
      body: "Most of us no longer know what we long for. Hunger of the body unmasks the hunger of the soul — and we discover what we have been feeding on instead of God.",
    },
    {
      title: "Fasting is not a hunger strike.",
      body: "We do not move God by suffering. We move toward Him by becoming aware of our dependence. The fast is for us, not for Him.",
    },
  ],
  howToBegin: [
    "Decide the type and length before you begin. Write it down with the matter you're bringing to the Lord.",
    "Tell one person — a spouse, a pastor, a friend — for accountability and intercession with you.",
    "Plan the time you'd usually spend eating for Scripture and prayer. Don't fast and then doom-scroll.",
    "Drink water. Keep working unless the fast is very long. Sleep more if you can.",
    "Break the fast gently — fruit, broth, soft food. Give thanks.",
  ],
  warnings: [
    "Fasting is not weight loss. It is not a detox. It is not a religious performance.",
    "Don't broadcast that you're fasting. Jesus warned against this very thing (Matthew 6:16-18).",
    "If you have an eating disorder, a medical condition, are pregnant or nursing, take medication that requires food, or are under 18 — choose a media fast or partial fast, and consult your doctor and a pastor.",
    "If a fast becomes a way to punish yourself, stop. The Father is not asking for that. Repent of legalism and rest in Christ.",
  ],
};

export const fastingPrayerLiturgy = {
  morning: [
    "Father, I am hungry — not only for bread but for You.",
    "Empty me of the comforts I run to instead of Your face.",
    "Speak to me in this fast. I am listening. In Jesus' name, amen.",
  ],
  midday: [
    "Lord, the body protests. Remind me that man does not live by bread alone but by every word that proceeds from Your mouth (Matthew 4:4).",
    "Hear my prayer for ____.",
    "Strengthen me to finish what You set before me.",
  ],
  breaking: [
    "Father, I receive this food from Your hand with thanksgiving.",
    "Whatever You spoke in the hunger, plant in me now.",
    "Send me out to live what You showed me. In Jesus' name, amen.",
  ],
};
