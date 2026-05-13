// Spiritual disciplines — the historic practices believers across centuries
// have used to make space for the Spirit to form Christ in them. None of
// these earn anything; all of them prepare the soil.

export type Discipline = {
  slug: string;
  name: string;
  oneLine: string;
  why: string;
  start: string[]; // small starter practices
  scriptures: { ref: string; text: string }[];
};

export const DISCIPLINES: Discipline[] = [
  {
    slug: "scripture",
    name: "Scripture & meditation",
    oneLine: "Living in the Word until the Word lives in you.",
    why:
      "The Word of God is the most direct way the Spirit speaks. Reading it daily — slowly, prayerfully — is the central discipline that anchors all others.",
    start: [
      "Read one chapter of John each morning for 30 days.",
      "After reading, choose one verse to carry — repeat it silently four times during the day.",
      "End the week by writing what the Lord has been saying to you in a notebook.",
    ],
    scriptures: [
      { ref: "Psalm 1:2", text: "His delight is in Yahweh's law. On his law he meditates day and night." },
      { ref: "Joshua 1:8", text: "This book of the law shall not depart out of your mouth, but you shall meditate on it day and night." },
      { ref: "Colossians 3:16", text: "Let the word of Christ dwell in you richly..." },
    ],
  },
  {
    slug: "prayer",
    name: "Prayer",
    oneLine: "The breath of the Christian life — speaking and listening to the Father.",
    why:
      "Prayer is not first about getting answers; it is about being with God. Jesus prayed constantly — in private, at meals, in the garden, on the cross.",
    start: [
      "Set a fixed time daily — even five minutes — and keep it.",
      "Pray the Lord's Prayer slowly, phrase by phrase, before you ask for anything.",
      "Keep a short list of names you're praying for. Mark them when you pray.",
    ],
    scriptures: [
      { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
      { ref: "Matthew 6:6", text: "But you, when you pray, enter into your inner room, and having shut your door, pray to your Father who is in secret." },
      { ref: "Philippians 4:6", text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God." },
    ],
  },
  {
    slug: "fasting",
    name: "Fasting",
    oneLine: "Saying no to food (for a time) so the soul learns to hunger for God.",
    why:
      "Fasting is the discipline of letting the body's hunger remind the soul of what it really needs. Jesus assumed His disciples would fast (Matthew 6:16, 'when you fast').",
    start: [
      "Skip one meal a week and use that hour for prayer.",
      "Try a 24-hour fast (sunset to sunset) on a chosen day. Drink water; pray when hunger comes.",
      "Fast not as a hunger-strike at God but as a posture of dependence on Him.",
    ],
    scriptures: [
      { ref: "Matthew 6:16–18", text: "When you fast, don't be like the hypocrites... your Father, who sees in secret, will reward you openly." },
      { ref: "Isaiah 58:6", text: "Isn't this the fast that I have chosen: to release the bonds of wickedness, to undo the straps of the yoke?" },
      { ref: "Acts 13:2–3", text: "As they served the Lord and fasted, the Holy Spirit said, 'Separate Barnabas and Saul for me...'" },
    ],
  },
  {
    slug: "sabbath",
    name: "Sabbath rest",
    oneLine: "Trusting God enough to stop — one day in seven.",
    why:
      "Sabbath is rooted in creation and renewed in Christ. It is the weekly confession that the world goes on without us because God upholds it.",
    start: [
      "Pick one day a week. Don't earn money on it, don't do laundry, don't catch up on email.",
      "Worship with the gathered Church. Then rest, eat, walk, read, sleep, play.",
      "Plan ahead — prepare meals on Saturday so Sunday can be true rest.",
    ],
    scriptures: [
      { ref: "Genesis 2:2–3", text: "On the seventh day God finished his work which he had done; and he rested on the seventh day from all his work which he had done. God blessed the seventh day, and made it holy." },
      { ref: "Mark 2:27–28", text: "The Sabbath was made for man, not man for the Sabbath. Therefore the Son of Man is lord even of the Sabbath." },
      { ref: "Hebrews 4:9–10", text: "There remains therefore a Sabbath rest for the people of God." },
    ],
  },
  {
    slug: "solitude-silence",
    name: "Solitude & silence",
    oneLine: "Being alone with God — quiet enough to hear Him.",
    why:
      "Jesus regularly withdrew to lonely places to pray. In a noise-saturated age, solitude is harder and more necessary than ever.",
    start: [
      "Take 15 minutes a day with no input — no phone, no music, no words from anyone else.",
      "Sit quietly. Pray the Jesus Prayer: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.'",
      "Once a quarter, take a half-day or full day of solitude with the Lord.",
    ],
    scriptures: [
      { ref: "Mark 1:35", text: "Early in the morning, while it was still dark, he rose up and went out, and departed into a deserted place, and prayed there." },
      { ref: "Psalm 46:10", text: "Be still, and know that I am God." },
      { ref: "Isaiah 30:15", text: "In returning and rest you shall be saved. In quietness and in confidence shall be your strength." },
    ],
  },
  {
    slug: "confession",
    name: "Confession",
    oneLine: "Bringing sin into the light, before God and a trusted brother or sister.",
    why:
      "Hidden sin grows; confessed sin dies. Confession is the doorway to ongoing freedom and deep accountability.",
    start: [
      "Confess your sins to God specifically each evening, not in vague generalities.",
      "Find one trusted same-gender believer to whom you can confess the persistent ones.",
      "Pray James 5:16 over your friendship: confess and pray for one another, that you may be healed.",
    ],
    scriptures: [
      { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness." },
      { ref: "James 5:16", text: "Confess your offenses to one another, and pray for one another, that you may be healed." },
      { ref: "Psalm 32:5", text: "I acknowledged my sin to you. I didn't hide my iniquity... and you forgave the iniquity of my sin." },
    ],
  },
  {
    slug: "generosity",
    name: "Generosity",
    oneLine: "Letting go of money so it does not own you.",
    why:
      "Jesus spoke about money more than nearly anything else. Generosity is the practice that keeps wealth from becoming a god.",
    start: [
      "Start a regular percentage of giving — and increase it once a year.",
      "Give first and quickly, not from what is left at the end of the month.",
      "Practice secret generosity (Matt 6:3–4): one gift this week no one will know about.",
    ],
    scriptures: [
      { ref: "Acts 20:35", text: "It is more blessed to give than to receive." },
      { ref: "2 Corinthians 9:7", text: "Let each man give according as he has determined in his heart; not grudgingly, or under compulsion; for God loves a cheerful giver." },
      { ref: "Matthew 6:21", text: "Where your treasure is, there your heart will be also." },
    ],
  },
  {
    slug: "service",
    name: "Service",
    oneLine: "Putting on the towel — washing others' feet, in big and small ways.",
    why:
      "Jesus served. The disciple of Jesus serves. Service breaks pride and shapes the heart for the Kingdom.",
    start: [
      "Find one ongoing way to serve in your local church — even something small.",
      "Pick one neighbor, one widow, one struggling family, and serve them quietly for a season.",
      "Ask each morning: 'Lord, who is mine to serve today?'",
    ],
    scriptures: [
      { ref: "John 13:14–15", text: "If I then, the Lord and the Teacher, have washed your feet, you also ought to wash one another's feet. For I have given you an example, that you should also do as I have done to you." },
      { ref: "Galatians 5:13", text: "Through love, be servants of one another." },
      { ref: "Mark 10:45", text: "For the Son of Man also came not to be served, but to serve, and to give his life as a ransom for many." },
    ],
  },
];
