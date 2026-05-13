// ─── The Persecuted Church ────────────────────────────────────
// "Remember the prisoners as if chained with them — those who are mistreated,
// since you yourselves are in the body also." — Hebrews 13:3
//
// ~365 million Christians live under high or extreme persecution. Western
// believers rarely pray for them by name. This is a 12-stop monthly rotation
// of nations where the cost of following Jesus is real — with specific,
// scriptural prayer points. Public, factual, current.

export type PersecutedNation = {
  iso: string;
  name: string;
  region: string;
  /** Brief, factual context of pressure facing believers. */
  context: string;
  /** Forms persecution takes (general, not exhaustive). */
  realities: string[];
  /** Concrete prayer points — scriptural and specific. */
  prayerPoints: string[];
  /** A verse to pray for them. */
  scripture: { ref: string; text: string };
};

export const persecutedNations: PersecutedNation[] = [
  {
    iso: "KP",
    name: "North Korea",
    region: "East Asia",
    context:
      "Christians in North Korea face arrest, imprisonment in labor camps, and death if discovered. The state demands worship of the Kim dynasty as a religion. House churches meet in extreme secrecy; some believers have never met another Christian.",
    realities: [
      "Owning a Bible is punishable by imprisonment or death.",
      "Three generations of a family can be punished for one believer's faith.",
      "Estimated tens of thousands of Christians in labor camps.",
    ],
    prayerPoints: [
      "Pray for hidden believers to be sustained in joy and not lose hope (Romans 12:12).",
      "Pray for Bibles smuggled in to reach the right hands.",
      "Pray for the regime — that the rulers themselves might come to Christ as Saul did (1 Tim 2:1-4).",
      "Pray for North Korean believers in labor camps — for endurance, courage, and visions of Jesus.",
    ],
    scripture: {
      ref: "Isaiah 9:2",
      text: "The people who walked in darkness have seen a great light; those who dwelt in the land of the shadow of death, upon them a light has shined.",
    },
  },
  {
    iso: "SO",
    name: "Somalia",
    region: "East Africa",
    context:
      "To leave Islam in Somalia is to risk immediate death — sometimes from family. The church exists almost entirely underground. Al-Shabaab specifically hunts converts.",
    realities: [
      "Conversion from Islam often means execution by family or militants.",
      "No public church gatherings.",
      "Believers practice their faith alone or in tiny secret groups.",
    ],
    prayerPoints: [
      "Pray for protection of hidden believers and their families.",
      "Pray that the Lord would reveal Himself in dreams and visions (many Somali believers testify to this).",
      "Pray for the failed state — for peace, justice, and the gospel's free course.",
    ],
    scripture: {
      ref: "Isaiah 19:20",
      text: "They will cry to the LORD because of the oppressors, and He will send them a Savior and a Mighty One, and He will deliver them.",
    },
  },
  {
    iso: "YE",
    name: "Yemen",
    region: "Arabian Peninsula",
    context:
      "A decade of civil war and famine layered on top of severe pressure for any Muslim background believer. Christianity is criminalized; expatriate Christians have been killed.",
    realities: [
      "Apostasy from Islam is criminalized and frequently lethal.",
      "Humanitarian crisis: famine and disease.",
      "The historic Christian presence on the Arabian Peninsula has largely vanished.",
    ],
    prayerPoints: [
      "Pray for the Yemeni church — small, brave, scattered.",
      "Pray for an end to the war, and food and medicine to reach those starving.",
      "Pray for believers in hiding to find one another.",
    ],
    scripture: {
      ref: "Psalm 9:9",
      text: "The LORD also will be a refuge for the oppressed, a refuge in times of trouble.",
    },
  },
  {
    iso: "LY",
    name: "Libya",
    region: "North Africa",
    context:
      "Lawless since 2011, with militant Islamist groups operating freely. Sub-Saharan migrant Christians have been killed for their faith; Libyan-background Christians live entirely underground.",
    realities: [
      "Migrant Christians beheaded by ISIS-affiliated groups in 2015 and after — the same gospel they died confessing reaches us today.",
      "Almost no legal protection for believers.",
    ],
    prayerPoints: [
      "Pray for migrant Christians from sub-Saharan Africa working in Libya.",
      "Pray that the names of the Libyan-background believers be written ever more clearly in the Book of Life.",
      "Pray for stability that the gospel may run freely.",
    ],
    scripture: {
      ref: "Revelation 6:9",
      text: "I saw under the altar the souls of those who had been slain for the word of God and for the testimony which they held.",
    },
  },
  {
    iso: "ER",
    name: "Eritrea",
    region: "East Africa",
    context:
      "Often called 'the North Korea of Africa.' Only four religious bodies are recognized by the state. All others — including Pentecostal, evangelical, and Bahá'í — are illegal. Believers are imprisoned indefinitely in shipping containers.",
    realities: [
      "Mass arrests of Pentecostal and evangelical Christians in roundups.",
      "Imprisonment in shipping containers in desert heat.",
      "Indefinite national service that doubles as state pressure.",
    ],
    prayerPoints: [
      "Pray for the thousands of believers imprisoned for years — for life, for release, for joy in chains (Phil 1:13-14).",
      "Pray for the regime to fear God and free the church.",
      "Pray for family members of the imprisoned who carry on quietly.",
    ],
    scripture: {
      ref: "Hebrews 13:3",
      text: "Remember the prisoners as if chained with them — those who are mistreated, since you yourselves are in the body also.",
    },
  },
  {
    iso: "NG",
    name: "Nigeria",
    region: "West Africa",
    context:
      "More Christians are killed for their faith in Nigeria than in any other country. Fulani militants, Boko Haram, and ISWAP attack villages, churches, and Christian schools — especially in the Middle Belt and the North.",
    realities: [
      "Thousands of Christians killed each year.",
      "Mass kidnappings of school children, including the Chibok girls and many since.",
      "Whole villages displaced from ancestral lands.",
    ],
    prayerPoints: [
      "Pray for the Christians of the Middle Belt — Plateau, Kaduna, Benue — for protection and courage.",
      "Pray for the kidnapped, by name where known, that they would be returned home alive and faithful.",
      "Pray for Nigerian authorities to act with justice and not to abandon Christian communities.",
      "Pray for the church's witness even in suffering — that it would draw the persecutors to Christ.",
    ],
    scripture: {
      ref: "Romans 8:35-37",
      text:
        "Who shall separate us from the love of Christ? Shall tribulation, or distress, or persecution? … Yet in all these things we are more than conquerors through Him who loved us.",
    },
  },
  {
    iso: "AF",
    name: "Afghanistan",
    region: "Central Asia",
    context:
      "Under Taliban rule, leaving Islam is officially punishable by death. The tiny Afghan church meets only in deepest secrecy; some have fled, many remain.",
    realities: [
      "Conversion punishable by death under Taliban law.",
      "No public Christian presence.",
      "Believers cannot trust extended family.",
    ],
    prayerPoints: [
      "Pray for the hidden Afghan church to be kept by the power of God (1 Peter 1:5).",
      "Pray for women believers, doubly oppressed under current laws.",
      "Pray for Afghan refugees scattered across the world — that they would meet Jesus where they have fled.",
    ],
    scripture: {
      ref: "Daniel 3:17-18",
      text:
        "Our God whom we serve is able to deliver us… But if not, let it be known to you, O king, that we do not serve your gods.",
    },
  },
  {
    iso: "IN",
    name: "India",
    region: "South Asia",
    context:
      "Pressure on Christians has risen sharply with Hindu nationalist movements. Anti-conversion laws in many states are used to harass believers; pastors are beaten; churches are demolished.",
    realities: [
      "Anti-conversion laws in multiple states criminalize evangelism.",
      "Mob violence against pastors, especially in tribal and rural areas.",
      "Dalit (formerly 'untouchable') Christians face double discrimination.",
    ],
    prayerPoints: [
      "Pray for pastors and evangelists in rural India — for courage and protection.",
      "Pray for Dalit believers, who find in Christ a dignity their society denies them.",
      "Pray for the wisdom of Indian Christians to engage with neighbors in love (1 Pet 3:15).",
    ],
    scripture: {
      ref: "John 16:33",
      text: "In the world you will have tribulation; but be of good cheer, I have overcome the world.",
    },
  },
  {
    iso: "IR",
    name: "Iran",
    region: "Western Asia",
    context:
      "Despite the regime, Iran is one of the fastest-growing churches in the world — almost entirely underground. House churches are raided; pastors and leaders are imprisoned for 'crimes against national security.'",
    realities: [
      "Conversion from Islam is criminalized.",
      "House church leaders imprisoned for many years.",
      "Yet the Iranian church has multiplied — possibly the fastest-growing church on earth.",
    ],
    prayerPoints: [
      "Pray for the underground Iranian church to keep multiplying.",
      "Pray for imprisoned house church leaders — by name where known (Mary Mohammadi, Nasser Navard Gol-Tapeh, and many others).",
      "Pray that the regime would fall to the Lordship of Christ.",
    ],
    scripture: {
      ref: "Acts 4:29-31",
      text: "Lord… grant to Your servants that with all boldness they may speak Your word… and the place where they were assembled together was shaken.",
    },
  },
  {
    iso: "PK",
    name: "Pakistan",
    region: "South Asia",
    context:
      "Blasphemy laws are routinely used to imprison and threaten Christians. The Christian community — many of them Dalit-background sweepers — is among the most marginalized in society. Mob attacks on Christian neighborhoods have killed many.",
    realities: [
      "Blasphemy accusations can carry the death penalty; many languish in prison for years.",
      "Christian girls abducted and forcibly converted/married.",
      "Whole Christian neighborhoods burned by mobs.",
    ],
    prayerPoints: [
      "Pray for Christians falsely accused of blasphemy.",
      "Pray for Christian girls and women trafficked into forced marriage.",
      "Pray for justice and reform of laws weaponized against minorities.",
    ],
    scripture: {
      ref: "Psalm 82:3-4",
      text: "Defend the poor and fatherless; do justice to the afflicted and needy. Deliver the poor and needy; free them from the hand of the wicked.",
    },
  },
  {
    iso: "CN",
    name: "China",
    region: "East Asia",
    context:
      "Sharp tightening since 2018. Unregistered house churches are raided; pastors imprisoned; surveillance is total. Yet the Chinese church may number 100 million and continues to grow.",
    realities: [
      "Surveillance cameras inside registered churches.",
      "Crackdowns on house churches and arrests of leaders.",
      "Children under 18 banned from religious education in many places.",
    ],
    prayerPoints: [
      "Pray for imprisoned pastors (Wang Yi and many others) — for their families, their joy, their endurance.",
      "Pray for the rising generation of Chinese believers to be unshakable.",
      "Pray for the gospel to travel the Belt and Road — and back to Jerusalem.",
    ],
    scripture: {
      ref: "Matthew 16:18",
      text: "On this rock I will build My church, and the gates of Hades shall not prevail against it.",
    },
  },
  {
    iso: "SD",
    name: "Sudan",
    region: "East Africa",
    context:
      "Civil war since 2023 has devastated the country. Christians caught between warring factions, especially in the Nuba Mountains. Churches burned; believers displaced en masse.",
    realities: [
      "Active civil war with mass civilian casualties.",
      "Churches destroyed; Christian refugees in the millions.",
      "Famine conditions in some regions.",
    ],
    prayerPoints: [
      "Pray for peace — for the war to end.",
      "Pray for displaced Christians in camps in Chad, South Sudan, and Egypt.",
      "Pray for Christian relief workers, often the only help in many places.",
    ],
    scripture: {
      ref: "Matthew 5:9",
      text: "Blessed are the peacemakers, for they shall be called sons of God.",
    },
  },
];

export function persecutedOfTheMonth(date = new Date()): PersecutedNation {
  // 12-month rotation. Use UTC month for stability.
  const m = date.getUTCMonth(); // 0-11
  return persecutedNations[m % persecutedNations.length];
}

export const persecutedTheology = [
  {
    title: "We are one body.",
    body:
      "When one part suffers, every part suffers with it (1 Corinthians 12:26). Christians in Pyongyang, Pyongtaek, Plateau State, and Pittsburgh are family. We owe them tears, prayer, advocacy, and — when we can — material help.",
  },
  {
    title: "Persecution is normal.",
    body:
      "Jesus told us to expect it (John 15:20). The early church considered it a privilege (Acts 5:41). It is not a sign of God's absence but a sign that we belong to Christ. The blood of the martyrs is, as Tertullian said, the seed of the church.",
  },
  {
    title: "We are not powerless.",
    body:
      "Prayer is not the least we can do — it is the most. Beyond that: support trusted ministries (Open Doors, Voice of the Martyrs, Barnabas Aid, In Defense of Christians), advocate with your government, host refugees, learn their stories.",
  },
];

export const monthlyPrayerLiturgy = [
  "Father, I remember Your church today in {nation}.",
  "I do not know all their names — You do.",
  "I do not know all their needs — You do.",
  "Hold them. Strengthen them. Protect them. Where they are imprisoned, sustain them. Where they are killed, receive them. Where they are hidden, multiply them.",
  "And teach me — comfortable, surrounded, free — to value the gospel as they do. To suffer when called. To rejoice in the privilege of bearing Your name.",
  "Through Jesus, who suffered and was raised. Amen.",
];
