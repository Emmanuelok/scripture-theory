// Prayer categories grounded explicitly in Scripture.
//
// Every news story surfaced on /pray/live must match at least ONE of these
// categories. If a story doesn't fall under something Scripture admonishes
// believers to pray about, we don't show it. This keeps the live feed
// focused on intercession, not the news cycle.
//
// Each category carries:
//   - matching keywords (lowercase substring match on title + description)
//   - the Bible passages that ground the prayer
//   - a few concrete prayer prompts a believer can pray right now
//
// Categories are checked in order; the first match wins (so more specific
// categories should come first).

export type PrayerCategory = {
  id: string;
  label: string;
  emoji: string;
  scripture: string; // headline reference
  why: string; // 1-line explanation of why Scripture calls us to pray here
  keywords: string[];
  anchors: { ref: string; text: string }[]; // 2-3 verses
  prompts: string[]; // 3-4 prayer prompts
};

export const PRAYER_CATEGORIES: PrayerCategory[] = [
  {
    id: "persecution",
    label: "Persecuted believers",
    emoji: "🕊",
    scripture: "Hebrews 13:3",
    why: "Scripture explicitly tells us to remember the imprisoned and persecuted as though we were in chains with them.",
    keywords: [
      "christian", "church", "pastor", "priest", "missionar*",
      "persecut*", "blasphemy", "convert",
      "monastery", "monk", "nun", "cathedral",
    ],
    anchors: [
      { ref: "Hebrews 13:3", text: "Remember those who are in prison, as though in prison with them, and those who are mistreated, since you also are in the body." },
      { ref: "Matthew 5:10–12", text: "Blessed are those who are persecuted for righteousness' sake, for theirs is the Kingdom of Heaven... rejoice and be glad, for great is your reward in heaven." },
      { ref: "Acts 12:5", text: "Peter therefore was kept in prison, but earnest prayer was made by the assembly to God for him." },
    ],
    prompts: [
      "Pray for boldness for the believers named or implied in this story.",
      "Pray for the protection and faith of their families.",
      "Pray for their accusers — that the Lord would open eyes and soften hearts.",
      "Pray for the global Body to feel this as our own family's pain (Heb 13:3).",
    ],
  },
  {
    id: "war",
    label: "War and conflict",
    emoji: "🕯",
    scripture: "1 Timothy 2:1–2",
    why: "Scripture asks for prayers, intercessions, and thanksgivings for kings and all in authority — that we may lead peaceful lives.",
    keywords: [
      "war", "ceasefire", "missile", "airstrike", "drone strike",
      "soldier", "troops", "military", "battle",
      "kill", "killed", "dead", "casualties", "wounded",
      "ukraine", "gaza", "sudan", "yemen", "myanmar",
      "armed forces", "rebels", "junta", "coup",
      "hostage", "ambush", "siege", "bombing",
    ],
    anchors: [
      { ref: "1 Timothy 2:1–2", text: "I urge that supplications, prayers, intercessions, and givings of thanks be made for all people; for kings and all who are in high places, that we may lead a tranquil and quiet life." },
      { ref: "Psalm 46:9", text: "He makes wars cease to the end of the earth. He breaks the bow, and shatters the spear." },
      { ref: "Matthew 5:9", text: "Blessed are the peacemakers, for they shall be called children of God." },
    ],
    prompts: [
      "Pray for the Lord to make wars cease — that the bow would be broken (Ps 46:9).",
      "Pray for wisdom and restraint for the leaders deciding on force.",
      "Pray for the soldiers on every side — that they would meet Christ before they meet death.",
      "Pray for the families bereaved by this conflict, by name where you can.",
    ],
  },
  {
    id: "leaders",
    label: "Leaders and governments",
    emoji: "👑",
    scripture: "1 Timothy 2:1–4",
    why: "Scripture tells us to pray for kings and all in authority, because the Lord turns rulers' hearts as channels of water.",
    keywords: [
      "president", "prime minister", "premier", "chancellor",
      "parliament", "congress", "senate", "supreme court",
      "election", "vote", "elected", "polls",
      "sanction", "treaty", "summit", "diplomat",
      "scandal", "impeach*", "indict*", "trial of",
      "corruption", "bribery", "anti-corruption",
    ],
    anchors: [
      { ref: "1 Timothy 2:1–4", text: "I urge... that supplications, prayers, intercessions, and givings of thanks be made for all people; for kings and all who are in high places... God our Savior, who desires all people to be saved." },
      { ref: "Proverbs 21:1", text: "The king's heart is in the Lord's hand like the watercourses. He turns it wherever he desires." },
      { ref: "Daniel 2:21", text: "He changes the times and the seasons. He removes kings, and sets up kings." },
    ],
    prompts: [
      "Pray that the Lord would turn the leader's heart toward justice (Prov 21:1).",
      "Pray for advisors of integrity around them.",
      "Pray for the salvation of those in power — God desires it (1 Tim 2:4).",
      "Pray for citizens to walk in tranquility under just government.",
    ],
  },
  {
    id: "famine",
    label: "Hunger and daily bread",
    emoji: "🌾",
    scripture: "Matthew 6:11",
    why: "Jesus taught us to pray for daily bread — for ourselves and for every person without it.",
    keywords: [
      "famine", "starv*", "malnutri*", "hunger", "food shortage", "food insecurity",
      "drought", "crop failure", "harvest fail",
      "world food program", "wfp", "humanitarian crisis",
    ],
    anchors: [
      { ref: "Matthew 6:11", text: "Give us today our daily bread." },
      { ref: "Isaiah 58:7", text: "Isn't it to distribute your bread to the hungry, and that you bring the poor who are cast out to your house?" },
      { ref: "Proverbs 22:9", text: "Whoever has a bountiful eye will be blessed, for he shares his bread with the poor." },
    ],
    prompts: [
      "Pray for daily bread for every family in this story — by name in your spirit.",
      "Pray for the aid workers and the supply lines that carry food.",
      "Pray for rain on the dry land.",
      "Ask: 'Lord, is there a family I am to feed this week?'",
    ],
  },
  {
    id: "disease",
    label: "Disease and the sick",
    emoji: "🏥",
    scripture: "James 5:14–16",
    why: "Scripture asks us to call for the elders and pray over the sick, that the Lord would raise them up.",
    keywords: [
      "outbreak", "epidemic", "pandemic", "disease",
      "cholera", "malaria", "ebola", "measles", "polio",
      "hospital", "icu", "doctor", "nurse", "health worker",
      "cancer", "diagnosis", "death toll", "mortality",
    ],
    anchors: [
      { ref: "James 5:14–15", text: "Is any among you sick? Let him call for the elders of the assembly... The prayer of faith will heal him who is sick, and the Lord will raise him up." },
      { ref: "Psalm 103:3", text: "Who forgives all your sins, who heals all your diseases." },
      { ref: "Matthew 9:35", text: "Jesus went about all the cities and the villages... healing every disease and every sickness among the people." },
    ],
    prompts: [
      "Pray for the sick named or counted in this story — for healing in Jesus' name.",
      "Pray for the doctors and nurses caring for them — for endurance.",
      "Pray for clean water, vaccines, and medicine to reach where they are needed.",
      "Pray for those grieving the dead — that comfort would find them.",
    ],
  },
  {
    id: "disaster",
    label: "Natural disasters",
    emoji: "🌊",
    scripture: "Psalm 46:1",
    why: "Scripture calls God our refuge and strength, a very present help in trouble — and tells us to bring trouble to Him.",
    keywords: [
      "earthquake", "tsunami", "hurricane", "typhoon", "cyclone", "tornado",
      "flood", "flooding", "wildfire", "bush fire",
      "landslide", "mudslide", "volcanic", "eruption",
      "storm", "blizzard", "heatwave", "drought",
      "evacuat*", "displaced by", "shelter", "rescue",
    ],
    anchors: [
      { ref: "Psalm 46:1–3", text: "God is our refuge and strength, a very present help in trouble. Therefore we won't be afraid, though the earth changes, though the mountains are shaken into the heart of the seas." },
      { ref: "Psalm 107:29", text: "He makes the storm a calm, so that its waves are still." },
      { ref: "Mark 4:39", text: "He awoke, and rebuked the wind, and said to the sea, 'Peace! Be still!' The wind ceased, and there was a great calm." },
    ],
    prompts: [
      "Speak peace over the storm in Jesus' authority (Mark 4:39).",
      "Pray for first responders and rescue teams — wisdom, safety, stamina.",
      "Pray for those trapped, displaced, or missing.",
      "Pray for the families grieving today — that the God of all comfort would draw near.",
    ],
  },
  {
    id: "trafficking",
    label: "Children and the trafficked",
    emoji: "🛡",
    scripture: "Isaiah 1:17",
    why: "Scripture tells us to seek justice, rescue the oppressed, defend the orphan, and plead for the widow.",
    keywords: [
      "traffick*", "child labor", "child labour", "abduct*", "kidnap*",
      "missing girl", "missing boy", "missing children",
      "abus*", "exploit", "forced marriage",
      "orphan", "street children", "child soldier",
    ],
    anchors: [
      { ref: "Isaiah 1:17", text: "Learn to do well. Seek justice. Relieve the oppressed. Judge the fatherless. Plead for the widow." },
      { ref: "Psalm 10:17–18", text: "Yahweh, you have heard the desire of the humble. You will prepare their heart... to judge the fatherless and the oppressed." },
      { ref: "Matthew 19:14", text: "Allow the little children, and don't forbid them to come to me; for the Kingdom of Heaven belongs to ones like these." },
    ],
    prompts: [
      "Pray for the children in this story by name in your spirit — protection, rescue, restoration.",
      "Pray for those who hunt them down — that the Lord would expose every dark corner.",
      "Pray for the investigators, the social workers, and the safe houses.",
      "Ask the Lord what He would have you do, as a believer near or far.",
    ],
  },
  {
    id: "refugees",
    label: "Refugees and the displaced",
    emoji: "🏕",
    scripture: "Leviticus 19:34",
    why: "Scripture commands us to treat the stranger as the native — and to love them as ourselves.",
    keywords: [
      "refugee", "asylum",
      "migrant", "border crossing",
      "displaced", "internally displaced", "idp",
      "rohingya", "sahel", "venezuelan migrant",
      "humanitarian", "aid camp", "shelter",
    ],
    anchors: [
      { ref: "Leviticus 19:34", text: "The stranger who lives as a foreigner with you shall be to you as the native-born among you, and you shall love him as yourself; for you lived as foreigners in the land of Egypt." },
      { ref: "Matthew 25:35", text: "I was a stranger, and you took me in." },
      { ref: "Hebrews 13:2", text: "Don't forget to show hospitality to strangers, for in doing so, some have entertained angels without knowing it." },
    ],
    prompts: [
      "Pray for safety on the road for those fleeing.",
      "Pray for the workers in camps and at borders — for compassion to outlast exhaustion.",
      "Pray for the host nations to receive these sojourners well.",
      "Ask the Lord what hospitality He would have your family practice this season.",
    ],
  },
  {
    id: "gospel",
    label: "The advance of the Gospel",
    emoji: "📖",
    scripture: "2 Thessalonians 3:1",
    why: "Scripture tells us to pray that the word of the Lord may run swiftly and be glorified.",
    keywords: [
      "evangeli*", "revival", "baptism", "baptiz*",
      "bible translation", "scripture access",
      "underground church", "house church",
      "great commission", "unreached",
    ],
    anchors: [
      { ref: "2 Thessalonians 3:1", text: "Finally, brothers, pray for us, that the word of the Lord may spread rapidly and be glorified, even as also with you." },
      { ref: "Matthew 9:38", text: "Pray therefore that the Lord of the harvest will send out laborers into his harvest." },
      { ref: "Ephesians 6:19", text: "Pray for me, that utterance may be given to me in opening my mouth, to make known with boldness the mystery of the Good News." },
    ],
    prompts: [
      "Pray for laborers into this harvest field (Matt 9:38).",
      "Pray for boldness and protection for those carrying the Gospel where it is costly.",
      "Pray for fresh Bible translation and Scripture access where the Word is scarce.",
      "Pray that the Word of the Lord would run swiftly here and be glorified.",
    ],
  },
  {
    id: "israel",
    label: "The peace of Jerusalem",
    emoji: "🕎",
    scripture: "Psalm 122:6",
    why: "Scripture commands us to pray for the peace of Jerusalem — that those who love her may prosper.",
    keywords: [
      "jerusalem", "israel", "israeli", "tel aviv",
      "gaza", "palestin*", "west bank", "ramallah",
      "hamas", "hezbollah", "netanyahu",
      "two-state", "messianic",
    ],
    anchors: [
      { ref: "Psalm 122:6", text: "Pray for the peace of Jerusalem. Those who love you will prosper." },
      { ref: "Romans 10:1", text: "Brothers, my heart's desire and my prayer to God is for Israel, that they may be saved." },
      { ref: "Ephesians 2:14", text: "He is our peace, who made both one, and broke down the middle wall of partition." },
    ],
    prompts: [
      "Pray for the peace of Jerusalem (Ps 122:6) — including the Palestinian families on both sides of every wall.",
      "Pray for Messianic Jewish believers in the Land and Arab Christian believers in Gaza, Bethlehem, and the West Bank.",
      "Pray for an end to the war — and for what comes after the war.",
      "Pray Romans 10:1: 'that they may be saved.'",
    ],
  },
];

export function categoryById(id: string): PrayerCategory | undefined {
  return PRAYER_CATEGORIES.find((c) => c.id === id);
}
