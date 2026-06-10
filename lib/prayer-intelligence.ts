/* ──────────────────────────────────────────────────────────────────
   Sub-topic intelligence for prayer stories.

   Each PRAYER_CATEGORIES entry now has a *general* anchor set
   (always available, broad). On top of that, each category gets a
   set of sub-topics — a finer reading of the actual story — with
   their own specific anchor scriptures and prayer points.

   The matcher reads the title + description and picks the FIRST
   sub-topic whose words fire (so order = priority, most specific
   first). When a sub-topic fires we use its scriptures and prompts;
   when nothing fires we fall back to the category's general set.

   No AI — pure word-boundary regex over an editorial table. But the
   table is wide enough that an airstrike, a peace talks story, a
   refugee story, a bereaved family, and a leaders-decide story all
   get verses that fit them, not the same 1 Timothy 2:1-2 over and
   over.
────────────────────────────────────────────────────────────────── */

import type { PrayerCategory } from "@/data/prayer-categories";

export type SubTopic = {
  id: string;
  /** Triggers — whole-word regex. */
  match: RegExp;
  /** A line explaining WHY this scripture fits THIS situation. */
  why: string;
  anchors: { ref: string; text: string }[];
  prompts: string[];
};

/**
 * Build a whole-word matcher. Each `word`:
 *   - May contain spaces (phrasal trigger).
 *   - Trailing `*` becomes a wide stem: "persecut*" → "persecut\w*".
 *   - Embedded `*` in any token (e.g. "missionar* killed") becomes a
 *     stem on that token only.
 *   - Otherwise we add lenient inflection tolerance covering plurals,
 *     past tense, gerund: \b(s|es|ed|d|ing|ies)?
 */
function re(words: string[]): RegExp {
  const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stemToken = (tok: string) =>
    tok.includes("*") ? `${esc(tok.replace(/\*/g, ""))}\\w*` : null;

  const parts = words.map((w) => {
    // Multi-word phrase: apply stem handling per token, only the LAST
    // token gets inflection tolerance (the head of the phrase).
    if (w.includes(" ")) {
      const toks = w.split(/\s+/);
      const lastIdx = toks.length - 1;
      return toks
        .map((t, i) => {
          const stem = stemToken(t);
          if (stem) return stem;
          return i === lastIdx ? `${esc(t)}(?:s|es|ed|d|ing|ies)?` : esc(t);
        })
        .join("\\s+");
    }
    // Single token
    const stem = stemToken(w);
    return stem ? stem : `${esc(w)}(?:s|es|ed|d|ing|ies)?`;
  });
  return new RegExp(`\\b(?:${parts.join("|")})\\b`, "i");
}

/* ── WAR & CONFLICT ─────────────────────────────────────────────── */
const SUB_WAR: SubTopic[] = [
  {
    id: "war-ceasefire",
    match: re(["ceasefire", "peace talk", "truce", "negotiation", "armistice", "diplomatic resolution"]),
    why: "When peace is being negotiated, Scripture calls peacemakers blessed and asks the Lord to break the bow Himself.",
    anchors: [
      { ref: "Matthew 5:9", text: "Blessed are the peacemakers, for they shall be called children of God." },
      { ref: "Isaiah 2:4", text: "They will beat their swords into plowshares, and their spears into pruning hooks. Nation will not lift up sword against nation, neither will they learn war any more." },
      { ref: "Psalm 46:9", text: "He makes wars cease to the end of the earth. He breaks the bow, and shatters the spear." },
    ],
    prompts: [
      "Pray for honesty and patience at the negotiating table — that hidden agendas would be exposed and good faith found.",
      "Pray for the peacemakers Jesus called blessed — those quietly building bridges no headline names.",
      "Pray that the bow itself would be broken, not just laid down.",
      "Pray for the families who have already lost — that any peace would honour their grief.",
    ],
  },
  {
    id: "war-airstrike",
    match: re(["airstrike", "missile strike", "bombing", "shelling", "drone strike", "bombard*"]),
    why: "When fire falls from the sky, Scripture is for those underneath — God hears the cry of the afflicted and is close to the broken-hearted.",
    anchors: [
      { ref: "Psalm 34:18", text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit." },
      { ref: "Psalm 10:17–18", text: "Yahweh, you have heard the desire of the humble. You will prepare their heart. You will cause your ear to hear, to judge the fatherless and the oppressed." },
      { ref: "Psalm 91:4", text: "He will cover you with his feathers. Under his wings you will take refuge." },
    ],
    prompts: [
      "Pray for those still searching the rubble — that a hand would find a hand alive.",
      "Pray for the medics working without sleep.",
      "Pray for the children who watched it happen — that Jesus, who loves children, would meet them in their dreams.",
      "Pray for the soul who fired the strike — that conscience would not let them sleep until they repent.",
    ],
  },
  {
    id: "war-casualties",
    match: re(["killed", "dead", "casualties", "wounded", "death toll", "bereaved", "mass grave"]),
    why: "Where there are bodies and bereaved, Scripture promises that God Himself is near, and that not one of the small ones is forgotten.",
    anchors: [
      { ref: "Psalm 34:18", text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit." },
      { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more." },
      { ref: "John 11:35", text: "Jesus wept." },
    ],
    prompts: [
      "Pray by name for one family bereaved today — even if you have to invent the name in your own heart, the Father knows them.",
      "Pray for the friends who saw it and cannot sleep.",
      "Pray that the day be hastened when He wipes every tear with His own hand.",
      "Pray that the dead would have heard the Gospel before they fell.",
    ],
  },
  {
    id: "war-hostage",
    match: re(["hostage", "kidnap*", "abduct*", "captive*", "abducted"]),
    why: "When believers and innocents are held, Scripture remembers prisoners as though chained with them, and asks the Lord to set the captives free.",
    anchors: [
      { ref: "Hebrews 13:3", text: "Remember those who are in prison, as bound with them; and those who are ill-treated, since you are also in the body." },
      { ref: "Isaiah 61:1", text: "Yahweh has anointed me… to proclaim liberty to the captives, and release to those who are bound." },
      { ref: "Acts 12:5", text: "Peter therefore was kept in the prison, but constant prayer was made by the assembly to God for him." },
    ],
    prompts: [
      "Pray for each captive by what little you know of them — name, age, family — and ask the Lord to be in the cell.",
      "Pray for the captors — that the Spirit would soften one of them tonight.",
      "Pray for the families waiting at home in unbearable silence.",
      "Pray that, if release is possible, today be the day.",
    ],
  },
  {
    id: "war-soldiers",
    match: re(["soldier", "troops", "army", "marines", "battalion", "frontline", "trench"]),
    why: "Soldiers stand on both sides of every front. Scripture asks for the Lord's eye on them — that they would meet Christ before they meet death.",
    anchors: [
      { ref: "Psalm 18:2", text: "Yahweh is my rock, my fortress, and my deliverer; my God, my strength, in whom I will trust." },
      { ref: "Romans 14:8", text: "If we live, we live to the Lord. Or if we die, we die to the Lord. If therefore we live or die, we are the Lord's." },
      { ref: "Luke 7:9", text: "I have not found such great faith, no, not in Israel." },
    ],
    prompts: [
      "Pray for the soldiers on every side — that they would meet Christ before they meet death.",
      "Pray for restraint in the moment of fear, and mercy in the moment of victory.",
      "Pray for the chaplains and pastors walking the lines.",
      "Pray for those who will come home wounded in places no one can see.",
    ],
  },
  {
    id: "war-civilians",
    match: re(["civilian", "refugee", "displaced", "evacuat*", "shelter", "humanitarian corridor"]),
    why: "When the line moves over the houses of ordinary people, Scripture commands us to remember the foreigner, the widow, and the child in the line of fire.",
    anchors: [
      { ref: "Psalm 146:9", text: "Yahweh preserves the foreigners. He upholds the fatherless and widow." },
      { ref: "Isaiah 25:4", text: "You have been a stronghold to the poor, a stronghold to the needy in his distress, a refuge from the storm, a shade from the heat." },
      { ref: "Matthew 25:35", text: "I was a stranger and you took me in." },
    ],
    prompts: [
      "Pray for safe passage — for any corridor, however narrow.",
      "Pray for the aid workers risking everything to get bread through.",
      "Pray for the churches receiving the displaced — that they would have room and patience for months, not days.",
      "Pray for one specific child whose face you've seen on the news.",
    ],
  },
  {
    id: "war-coup",
    match: re(["coup", "junta", "military takeover", "overthrow", "putsch"]),
    why: "When power changes by force, Scripture appeals over the heads of generals to the Lord who removes kings and sets up kings.",
    anchors: [
      { ref: "Daniel 2:21", text: "He changes the times and the seasons. He removes kings, and sets up kings." },
      { ref: "Proverbs 21:1", text: "The king's heart is in Yahweh's hand like the watercourses. He turns it wherever he desires." },
      { ref: "Romans 13:1", text: "Let every soul be in subjection to the higher authorities, for there is no authority except from God." },
    ],
    prompts: [
      "Pray that the country would not pay in blood for the change of power.",
      "Pray for the church to be wise — neither flattering the new authority nor inflaming the old.",
      "Pray for the journalists and judges already at risk for telling the truth.",
      "Pray for the Lord to give the people, not the strongest, the throne.",
    ],
  },
];

/* ── PERSECUTION ────────────────────────────────────────────────── */
const SUB_PERSECUTION: SubTopic[] = [
  {
    id: "persec-arrest",
    match: re(["arrest", "detain*", "jailed", "prison", "imprison*", "custody", "convicted of blasphemy"]),
    why: "When believers are jailed for the Name, Scripture remembers them as fellow-prisoners and asks the Lord to act as He did for Peter.",
    anchors: [
      { ref: "Hebrews 13:3", text: "Remember those who are in prison, as bound with them; and those who are ill-treated, since you are also in the body." },
      { ref: "Acts 12:5", text: "Peter therefore was kept in the prison, but constant prayer was made by the assembly to God for him." },
      { ref: "Acts 16:25", text: "About midnight Paul and Silas were praying and singing hymns to God, and the prisoners were listening to them." },
    ],
    prompts: [
      "Pray for the believer in the cell tonight — for sleep, for songs at midnight, for the Lord's nearness.",
      "Pray for the lawyers who defend them — courage and craft.",
      "Pray for the families who lost the income when the believer was taken.",
      "Pray for the guards — that one of them would hear what is being sung and ask why.",
    ],
  },
  {
    id: "persec-church-attack",
    match: re(["church attack", "church bombing", "cathedral attack", "monastery attack", "burned the church", "church arson"]),
    why: "When the gathering itself is attacked, Scripture promises the gates of hell will not prevail — and prays for boldness in the very hour of fear.",
    anchors: [
      { ref: "Matthew 16:18", text: "I also tell you that you are Peter, and on this rock I will build my assembly, and the gates of Hades will not prevail against it." },
      { ref: "Acts 4:29", text: "Now, Lord, look at their threats, and grant to your servants to speak your word with all boldness." },
      { ref: "Tertullian", text: "The blood of the martyrs is the seed of the church." },
    ],
    prompts: [
      "Pray for the wounded and bereaved in the congregation tonight.",
      "Pray for the pastor — that he would be the first comforter and the last man to leave.",
      "Pray for the believers who will come to next Sunday's service braver than the last.",
      "Pray for the attackers — that the Lord would do with them what He did with Saul of Tarsus.",
    ],
  },
  {
    id: "persec-blasphemy-law",
    match: re(["blasphemy law", "anti-conversion law", "conversion ban", "apostasy law", "forced conversion"]),
    why: "When the law itself stands against the Gospel, Scripture obeys God rather than men — and asks for an open door for the Word.",
    anchors: [
      { ref: "Acts 5:29", text: "We must obey God rather than men." },
      { ref: "2 Thessalonians 3:1", text: "Pray for us, that the word of the Lord may spread rapidly and be glorified, even as also with you." },
      { ref: "Matthew 5:10–12", text: "Blessed are those who have been persecuted for righteousness' sake, for theirs is the Kingdom of Heaven." },
    ],
    prompts: [
      "Pray for the believers facing a law that criminalises their faith.",
      "Pray for the legislators — that the Lord would change one heart in the chamber.",
      "Pray for the underground church to be wise as serpents and innocent as doves.",
      "Pray that the door for the Word would not be closed.",
    ],
  },
  {
    id: "persec-pastor",
    match: re(["pastor killed", "priest killed", "bishop killed", "missionar* killed", "martyr*"]),
    why: "When a shepherd is taken, Scripture honours the Good Shepherd who lays down His life — and asks for the next servant to be raised up.",
    anchors: [
      { ref: "John 10:11", text: "I am the good shepherd. The good shepherd lays down his life for the sheep." },
      { ref: "Revelation 6:9–10", text: "I saw underneath the altar the souls of those who had been killed for the Word of God… how long, Master?" },
      { ref: "Philippians 1:21", text: "For to me to live is Christ, and to die is gain." },
    ],
    prompts: [
      "Pray for the bereaved family — that the Lord would be their husband and Father.",
      "Pray for the flock left behind — that the wolves would not scatter them.",
      "Pray for the Lord of the harvest to send another labourer into that field.",
      "Pray for the killers — that the prayer of the dying martyr would be heard.",
    ],
  },
];

/* ── LEADERS & GOVERNMENTS ──────────────────────────────────────── */
const SUB_LEADERS: SubTopic[] = [
  {
    id: "leaders-election",
    match: re(["election", "voted", "votes", "ballot", "primary", "campaign", "polling", "elected"]),
    why: "On election day, Scripture does not pray for a party — it asks the Lord, who turns kings' hearts like watercourses, to set up righteous rule.",
    anchors: [
      { ref: "Proverbs 21:1", text: "The king's heart is in Yahweh's hand like the watercourses. He turns it wherever he desires." },
      { ref: "Daniel 2:21", text: "He changes the times and the seasons. He removes kings, and sets up kings." },
      { ref: "Proverbs 14:34", text: "Righteousness exalts a nation, but sin is a disgrace to any people." },
    ],
    prompts: [
      "Pray for honest counting, peaceful queues, and accepted results.",
      "Pray for the one who will lose — that pride would not turn into violence.",
      "Pray for the one who will win — that the office would not corrupt them.",
      "Pray for the believers voting — that the Kingdom would shape the ballot more than the tribe.",
    ],
  },
  {
    id: "leaders-corruption",
    match: re(["corruption", "bribery", "scandal", "indict*", "impeach*", "money laundering", "fraud"]),
    why: "When public trust is sold, Scripture warns that God will not acquit the guilty — and asks the Lord to expose and to cleanse.",
    anchors: [
      { ref: "Proverbs 28:13", text: "He who conceals his sins doesn't prosper, but whoever confesses and renounces them finds mercy." },
      { ref: "Isaiah 1:23", text: "Your princes are rebellious, and companions of thieves. Everyone loves bribes, and follows after rewards." },
      { ref: "Luke 8:17", text: "There is nothing hidden that shall not be revealed; nor anything secret that shall not be known and come to light." },
    ],
    prompts: [
      "Pray for the investigators and the whistle-blowers — protection and integrity.",
      "Pray for the judges — that the verdict would not be sold.",
      "Pray that those who hid evil would come to repentance before they come to prison.",
      "Pray for the people robbed — that what was stolen would somehow return.",
    ],
  },
  {
    id: "leaders-sanctions",
    match: re(["sanction", "tariff", "trade war", "embargo", "trade dispute"]),
    why: "Where nations punish nations with money, Scripture remembers the ordinary worker most hurt by it — and prays that the strong would not despise the small.",
    anchors: [
      { ref: "Proverbs 22:22–23", text: "Don't exploit the poor because he is poor; don't crush the needy in court; for Yahweh will plead their case." },
      { ref: "Amos 5:24", text: "Let justice roll on like rivers, and righteousness like a mighty stream." },
      { ref: "1 Timothy 2:1–2", text: "I urge that supplications, prayers, intercessions, and givings of thanks be made for all people; for kings and all who are in high places." },
    ],
    prompts: [
      "Pray for the families who already cannot afford bread.",
      "Pray for the negotiators — that pride would not block a workable compromise.",
      "Pray for the church in both countries — that no political loyalty would divide the Body.",
    ],
  },
  {
    id: "leaders-diplomacy",
    match: re(["summit", "diplomat", "treaty", "bilateral", "envoy", "ambassador"]),
    why: "When kings meet, Scripture asks the Lord to put His own words in their mouths — and the welfare of all peoples in their hearts.",
    anchors: [
      { ref: "1 Timothy 2:1–2", text: "I urge that supplications, prayers, intercessions, and givings of thanks be made for all people; for kings and all who are in high places, that we may lead a tranquil and quiet life." },
      { ref: "Jeremiah 29:7", text: "Seek the peace of the city where I have caused you to be carried away captive, and pray to Yahweh for it." },
      { ref: "Proverbs 16:7", text: "When a man's ways please Yahweh, he makes even his enemies to be at peace with him." },
    ],
    prompts: [
      "Pray for the translators — that no nuance be lost where the wrong word could cost lives.",
      "Pray for the believers in both delegations — that they would witness quietly by their conduct.",
      "Pray for the small countries at the table — that they would not be steamrolled.",
      "Pray that the Lord would make even enemies be at peace.",
    ],
  },
];

/* ── FAMINE & HUNGER ────────────────────────────────────────────── */
const SUB_FAMINE: SubTopic[] = [
  {
    id: "famine-children",
    match: re(["child malnutri*", "child starv*", "children hungry", "infant mortality", "wasting", "stunted"]),
    why: "When children are hungry, Scripture quotes a Saviour who took a child in His arms and said the Kingdom belongs to such as these.",
    anchors: [
      { ref: "Matthew 19:14", text: "Allow the little children, and don't forbid them to come to me; for the Kingdom of Heaven belongs to ones like these." },
      { ref: "Lamentations 4:4", text: "The tongue of the nursing child clings to the roof of his mouth for thirst. The young children ask bread, and no one breaks it for them." },
      { ref: "Matthew 25:35", text: "I was hungry, and you gave me food to eat." },
    ],
    prompts: [
      "Pray for the mothers nursing on empty.",
      "Pray for the nurses weighing children every morning and writing the small numbers down.",
      "Pray that the food convoy gets through tonight.",
      "Pray for the Church to give until it costs us.",
    ],
  },
  {
    id: "famine-drought",
    match: re(["drought", "crop failure", "harvest fail", "dry season", "rainfall fail*"]),
    why: "When the rain doesn't come, Scripture remembers an Elijah who prayed seven times and a Lord who sends the early and the latter rains.",
    anchors: [
      { ref: "James 5:17–18", text: "Elijah… prayed earnestly that it might not rain, and it didn't rain on the earth… and the heaven gave rain, and the earth produced its fruit." },
      { ref: "Joel 2:23", text: "He gives you the early rain in just measure, and he causes the rain to come down for you, the early rain and the latter rain." },
      { ref: "Psalm 65:9–10", text: "You visit the earth, and water it. You greatly enrich it. The river of God is full of water… you soften it with showers." },
    ],
    prompts: [
      "Pray for rain — actually, by name, the way Elijah prayed.",
      "Pray for the farmers losing the next season's seed to today's hunger.",
      "Pray for the agronomists and well-diggers.",
      "Pray for the churches to share the harvest of those who still have one.",
    ],
  },
  {
    id: "famine-war-caused",
    match: re(["food blockade", "siege starv*", "war-driven famine", "weaponise food", "weaponize food"]),
    why: "When hunger is used as a weapon, Scripture warns God will judge those who keep food from the hungry — and asks for the siege to be broken.",
    anchors: [
      { ref: "Ezekiel 18:7", text: "He gives his bread to the hungry, and covers the naked with a garment." },
      { ref: "Isaiah 58:6–7", text: "Isn't this the fast that I have chosen… to deal your bread to the hungry, and that you bring the poor who are cast out to your house?" },
      { ref: "Proverbs 11:26", text: "People curse someone who withholds grain, but blessing will be on the head of him who sells it." },
    ],
    prompts: [
      "Pray for the besieged to receive bread tonight — by miracle or by mercy.",
      "Pray for the soul of the commander withholding it.",
      "Pray for the bakers still trying to bake on nothing.",
      "Pray for the Lord to remember the children who can no longer cry.",
    ],
  },
];

/* ── DISEASE & THE SICK ─────────────────────────────────────────── */
const SUB_DISEASE: SubTopic[] = [
  {
    id: "disease-outbreak",
    match: re(["outbreak", "epidemic", "pandemic", "cholera", "ebola", "measles", "polio"]),
    why: "When disease spreads, Scripture asks for the Lord who healed the leper to stop the contagion — and for the wisdom of those who care for the sick.",
    anchors: [
      { ref: "Numbers 16:48", text: "He stood between the dead and the living; and the plague was stayed." },
      { ref: "Matthew 8:3", text: "Jesus stretched out his hand and touched him, saying, 'I want to. Be made clean.' Immediately his leprosy was cleansed." },
      { ref: "Psalm 91:6", text: "Nor of the pestilence that walks in darkness, nor of the destruction that wastes at noonday." },
    ],
    prompts: [
      "Pray for the doctors and nurses going back in tomorrow.",
      "Pray for the supply chain of vaccines and medicine.",
      "Pray for the parents wondering whether to keep the children home.",
      "Pray that the Lord would stand between the dead and the living.",
    ],
  },
  {
    id: "disease-individual",
    match: re(["cancer", "diagnosis", "terminal", "tumor", "tumour", "leukemia", "leukaemia", "stroke"]),
    why: "When one believer faces a hard diagnosis, Scripture asks the elders to anoint with oil and the prayer of faith to save the sick.",
    anchors: [
      { ref: "James 5:14–15", text: "Is any among you sick? Let him call for the elders of the assembly… the prayer of faith will heal him who is sick, and the Lord will raise him up." },
      { ref: "Psalm 103:3", text: "Who forgives all your sins; who heals all your diseases." },
      { ref: "Isaiah 53:4–5", text: "Surely he has borne our sickness and carried our suffering… by his wounds we are healed." },
    ],
    prompts: [
      "Pray for the surgeons' hands tomorrow.",
      "Pray for the patient's faith — that fear would not be the loudest voice.",
      "Pray for the family carrying them — strength for the long visits.",
      "Pray that, whether healed today or healed at the resurrection, they would know whose they are.",
    ],
  },
  {
    id: "disease-healthworkers",
    match: re(["health worker", "doctor", "nurse", "hospital", "ICU", "clinic"]),
    why: "Scripture honours the work of healing — Luke the physician, the Good Samaritan paying the innkeeper — and asks the Lord to sustain those who carry it.",
    anchors: [
      { ref: "Colossians 4:14", text: "Luke, the beloved physician, and Demas greet you." },
      { ref: "Luke 10:34", text: "Came to him, and bound up his wounds, pouring on oil and wine… brought him to an inn, and took care of him." },
      { ref: "Isaiah 40:31", text: "Those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary." },
    ],
    prompts: [
      "Pray for the worker on the night shift right now.",
      "Pray against the kind of exhaustion that makes mistakes.",
      "Pray for compassion that doesn't burn out.",
      "Pray for the believers among them to bring Christ quietly into every ward.",
    ],
  },
];

/* ── NATURAL DISASTERS ──────────────────────────────────────────── */
const SUB_DISASTER: SubTopic[] = [
  {
    id: "disaster-earthquake",
    match: re(["earthquake", "tremor", "seismic"]),
    why: "When the ground itself moves, Scripture's response is Psalm 46 — God is our refuge though the earth give way.",
    anchors: [
      { ref: "Psalm 46:1–3", text: "God is our refuge and strength, a very present help in trouble. Therefore we won't be afraid, though the earth changes, though the mountains are shaken into the heart of the seas." },
      { ref: "Isaiah 54:10", text: "The mountains may depart, and the hills be removed, but my loving kindness will not depart from you." },
      { ref: "Hebrews 12:26–27", text: "Yet once more I will shake not only the earth, but also the heavens… that those things which can't be shaken may remain." },
    ],
    prompts: [
      "Pray for the rescuers in the rubble — speed and tenderness.",
      "Pray for the children pulled out alive — and for the ones who weren't.",
      "Pray for the believers nearby with shovels and bread — that they would be the hands.",
      "Pray that the kingdom which cannot be shaken would remain.",
    ],
  },
  {
    id: "disaster-flood",
    match: re(["flood", "flooding", "tsunami", "deluge", "burst its banks", "river overflow"]),
    why: "When the waters rise, Scripture remembers a Saviour who walked on the sea — and a Father who promises the floods will not sweep His people away.",
    anchors: [
      { ref: "Isaiah 43:2", text: "When you pass through the waters, I will be with you; and through the rivers, they will not overflow you." },
      { ref: "Psalm 29:10", text: "Yahweh sat enthroned at the Flood. Yes, Yahweh sits as King forever." },
      { ref: "Matthew 14:25", text: "In the fourth watch of the night Jesus came to them, walking on the sea." },
    ],
    prompts: [
      "Pray for those still on roofs and trees waiting for the boats.",
      "Pray for clean drinking water.",
      "Pray against the cholera that follows the flood.",
      "Pray for the believers boating in to neighbours' homes — strength and grace.",
    ],
  },
  {
    id: "disaster-fire",
    match: re(["wildfire", "bush fire", "bushfire", "blaze", "wildfires"]),
    why: "When the fires spread, Scripture promises the Lord who walked with three young men in the furnace — that the flame would not consume.",
    anchors: [
      { ref: "Isaiah 43:2", text: "When you walk through the fire, you will not be burned, and flame will not scorch you." },
      { ref: "Daniel 3:25", text: "I see four men loose, walking in the middle of the fire… the appearance of the fourth is like a son of the gods." },
      { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
    ],
    prompts: [
      "Pray for the firefighters — protection and sleep.",
      "Pray for the wind to shift away from the towns.",
      "Pray for the farmers and homeowners losing everything tonight.",
      "Pray for the rain.",
    ],
  },
  {
    id: "disaster-storm",
    match: re(["hurricane", "typhoon", "cyclone", "tornado", "storm surge"]),
    why: "When the great wind comes, Scripture remembers Jesus stilling the storm with a word — and prays Peace, be still.",
    anchors: [
      { ref: "Mark 4:39", text: "He awoke, and rebuked the wind, and said to the sea, 'Peace! Be still!' The wind ceased, and there was a great calm." },
      { ref: "Psalm 107:29", text: "He makes the storm a calm, so that its waves are still." },
      { ref: "Nahum 1:3", text: "Yahweh has his way in the whirlwind and in the storm. The clouds are the dust of his feet." },
    ],
    prompts: [
      "Pray for the path of the storm to weaken before landfall.",
      "Pray for the early-warning systems and shelters.",
      "Pray for the fishermen and the families along the coast.",
      "Pray, simply, Peace, be still.",
    ],
  },
];

/* ── TRAFFICKING & THE VULNERABLE ───────────────────────────────── */
const SUB_TRAFFICKING: SubTopic[] = [
  {
    id: "traf-children",
    match: re(["child trafficking", "child labor", "child labour", "child soldier", "missing child*", "street child*"]),
    why: "When children are bought and sold, Scripture warns it were better a millstone be hung round the trafficker's neck — and prays for rescue.",
    anchors: [
      { ref: "Matthew 18:6", text: "Whoever causes one of these little ones who believe in me to stumble, it would be better for him that a huge millstone should be hung around his neck, and that he should be sunk in the depths of the sea." },
      { ref: "Psalm 10:14", text: "You consider trouble and grief, to repay it with your hand. You help the victim and the fatherless." },
      { ref: "Isaiah 61:1", text: "He has sent me… to proclaim liberty to the captives, and release to those who are bound." },
    ],
    prompts: [
      "Pray by name for one missing child — even a name you invent, the Father knows them.",
      "Pray for the rescue teams already on the move.",
      "Pray for safe houses and the believers who run them.",
      "Pray for the buyers — that conscience would not let them eat or sleep.",
    ],
  },
  {
    id: "traf-women",
    match: re(["sex trafficking", "forced marriage", "forced prostitution", "brothel raid", "human trafficking"]),
    why: "Where women are violated, Scripture remembers the God who saw Hagar in the wilderness — the God who sees — and acts for the oppressed.",
    anchors: [
      { ref: "Genesis 16:13", text: "She called the name of Yahweh who spoke to her, 'You are a God who sees.'" },
      { ref: "Psalm 10:17–18", text: "You will cause your ear to hear, to judge the fatherless and the oppressed, that man who is of the earth may terrify no more." },
      { ref: "Luke 4:18", text: "He has anointed me to preach good news to the poor… to set at liberty those who are crushed." },
    ],
    prompts: [
      "Pray for tonight's rescue — that doors would open and the right addresses be known.",
      "Pray for the recovery shelters — every form of healing the women will need.",
      "Pray for the police officers who work this beat — integrity in a corrupt system.",
      "Pray for the traffickers — that the Lord would frighten them into repentance.",
    ],
  },
];

/* ── REFUGEES & THE DISPLACED ───────────────────────────────────── */
const SUB_REFUGEES: SubTopic[] = [
  {
    id: "ref-sea",
    match: re(["boat capsiz*", "mediterranean migrant", "drown*", "shipwreck*", "channel crossing", "rubber boat"]),
    why: "When the sea takes the desperate, Scripture remembers a Saviour who reached for Peter in the waves — and prays for hands to do the same.",
    anchors: [
      { ref: "Matthew 14:31", text: "Immediately Jesus stretched out his hand, took hold of him, and said to him, 'You of little faith, why did you doubt?'" },
      { ref: "Psalm 107:28–30", text: "Then they cry to Yahweh in their trouble, and he brings them out of their distress. He makes the storm a calm." },
      { ref: "Matthew 25:35", text: "I was a stranger, and you took me in." },
    ],
    prompts: [
      "Pray for the coastguard and rescue ships still searching tonight.",
      "Pray for the families who will not hear from someone tomorrow.",
      "Pray for the churches on receiving coasts — quick to welcome, slow to suspect.",
      "Pray that the conditions making people choose the sea would change.",
    ],
  },
  {
    id: "ref-camp",
    match: re(["refugee camp", "displacement camp", "IDP camp", "camp condition*", "tent settlement"]),
    why: "When the displaced settle into camps, Scripture asks us to love the stranger as ourselves — for we too were strangers.",
    anchors: [
      { ref: "Leviticus 19:34", text: "The stranger who lives as a foreigner with you shall be to you as the native-born among you, and you shall love him as yourself." },
      { ref: "Deuteronomy 10:18–19", text: "He does justice for the fatherless and widow, and loves the foreigner, in giving him food and clothing. Therefore love the foreigner." },
      { ref: "Hebrews 13:2", text: "Don't forget to show hospitality to strangers, for in doing so, some have entertained angels without knowing it." },
    ],
    prompts: [
      "Pray for the next-coming winter / dry season in the camp.",
      "Pray for the believers among the refugees to plant churches in the tents.",
      "Pray for the host country — that compassion would outlive the news cycle.",
      "Pray for one specific family by name if you can find it.",
    ],
  },
  {
    id: "ref-border",
    match: re(["border closure", "deport*", "asylum", "asylum-seeker", "asylum seeker", "border policy"]),
    why: "Where borders are closing, Scripture cuts through politics with a simple commandment to love the foreigner — and to do justice.",
    anchors: [
      { ref: "Zechariah 7:10", text: "Don't oppress the widow, nor the fatherless, the foreigner, nor the poor; and let none of you devise evil against his brother in your heart." },
      { ref: "Isaiah 1:17", text: "Learn to do well. Seek justice. Relieve the oppressed. Defend the fatherless. Plead for the widow." },
      { ref: "Matthew 25:35", text: "I was a stranger, and you took me in." },
    ],
    prompts: [
      "Pray for those waiting at fences and tents tonight — that they would not despair.",
      "Pray for the officers processing them — patience and humanity.",
      "Pray for the believers welcoming, and the ones tempted to fear the welcoming.",
      "Pray for the legislators — clearer minds and kinder hearts.",
    ],
  },
];

/* ── THE GOSPEL & THE NATIONS ───────────────────────────────────── */
const SUB_GOSPEL: SubTopic[] = [
  {
    id: "gospel-revival",
    match: re(["revival", "mass baptism", "baptiz*", "thousands came to Christ", "evangeli*", "great commission"]),
    why: "When the Spirit moves and crowds turn, Scripture rejoices over one sinner who repents — and asks for more labourers for the harvest.",
    anchors: [
      { ref: "Luke 15:10", text: "I tell you, even so there is joy in the presence of the angels of God over one sinner repenting." },
      { ref: "Acts 2:41", text: "Then those who gladly received his word were baptised. There were added that day about three thousand souls." },
      { ref: "Matthew 9:38", text: "Pray therefore that the Lord of the harvest will send out labourers into his harvest." },
    ],
    prompts: [
      "Thank the Father, by name, for each one written into the Lamb's book today.",
      "Pray for the new believers to find a real local church.",
      "Pray for the workers — that exhaustion would not steal the joy.",
      "Pray for the Lord to send more labourers right behind them.",
    ],
  },
  {
    id: "gospel-bible-translation",
    match: re(["bible translation", "scripture translation", "new testament published", "first translation", "scripture access"]),
    why: "When the Word reaches a new tongue, Scripture rejoices that every nation will hear in their own language — Pentecost is still happening.",
    anchors: [
      { ref: "Acts 2:11", text: "We hear them speaking in our languages the mighty works of God." },
      { ref: "Revelation 7:9", text: "A great multitude… out of every nation and of all tribes, peoples, and languages, standing before the throne." },
      { ref: "Isaiah 55:11", text: "So shall my word be that goes out of my mouth: it will not return to me void." },
    ],
    prompts: [
      "Thank the Lord for the translators — decades of unseen work.",
      "Pray for safe distribution where the law forbids it.",
      "Pray for the first readers — that one chapter would be enough to begin.",
      "Pray for the rest of the languages still waiting.",
    ],
  },
  {
    id: "gospel-unreached",
    match: re(["unreached", "frontier mission", "people group", "previously closed", "underground church"]),
    why: "Where the Gospel has not yet been named, Scripture asks the Lord of the harvest for labourers — and for the doors only He can open.",
    anchors: [
      { ref: "Matthew 9:37–38", text: "The harvest indeed is plentiful, but the labourers are few. Pray therefore that the Lord of the harvest will send out labourers into his harvest." },
      { ref: "Romans 10:14–15", text: "How will they hear without a preacher? And how will they preach unless they are sent?" },
      { ref: "Acts 16:9", text: "Come over into Macedonia and help us." },
    ],
    prompts: [
      "Pray, by name if you know one, for an unreached people group.",
      "Pray for the believers whose neighbours have never heard the Name once.",
      "Pray for the senders — that churches would let go of their best.",
      "Pray that the Lord would set His own appointments in that place this week.",
    ],
  },
];

/* ── PEACE OF JERUSALEM / ISRAEL ────────────────────────────────── */
const SUB_ISRAEL: SubTopic[] = [
  {
    id: "isr-hostages",
    match: re(["hostage*", "captive*", "abduct*", "kidnap*"]),
    why: "When sons and daughters are held, Scripture remembers prisoners as if chained with them — and prays for return.",
    anchors: [
      { ref: "Hebrews 13:3", text: "Remember those who are in prison, as bound with them; and those who are ill-treated, since you are also in the body." },
      { ref: "Psalm 126:1", text: "When Yahweh brought back those who returned to Zion, we were like those who dream." },
      { ref: "Isaiah 49:25", text: "I will contend with him who contends with you, and I will save your children." },
    ],
    prompts: [
      "Pray for each hostage by name where you can.",
      "Pray for the families holding photos by the door.",
      "Pray for the negotiators — wisdom that fits no headline.",
      "Pray for Christ to be known by the hostages and the captors alike.",
    ],
  },
  {
    id: "isr-civilians",
    match: re(["civilian", "gaza", "rafah", "tel aviv", "west bank", "ramallah", "settler", "displaced"]),
    why: "Where civilians on every side bleed, Scripture asks the Prince of Peace to break down the dividing wall and make the two one.",
    anchors: [
      { ref: "Ephesians 2:14", text: "He is our peace, who made both one, and broke down the middle wall of partition." },
      { ref: "Psalm 122:6", text: "Pray for the peace of Jerusalem. Those who love you will prosper." },
      { ref: "Romans 12:18", text: "If it is possible, as much as it is up to you, be at peace with all men." },
    ],
    prompts: [
      "Pray for Israeli civilians under threat.",
      "Pray for Palestinian civilians under threat.",
      "Pray for Arab and Jewish believers — that they would witness one Body to a watching land.",
      "Pray for the Prince of Peace to break the wall that politics cannot.",
    ],
  },
  {
    id: "isr-gospel",
    match: re(["messianic", "arab christian", "palestinian christian", "house church", "believer"]),
    why: "Where Jew and Gentile believer worship together, Scripture says the mystery of Christ is openly displayed — pray for them.",
    anchors: [
      { ref: "Romans 10:1", text: "Brothers, my heart's desire and my prayer to God is for Israel, that they may be saved." },
      { ref: "Ephesians 3:6", text: "The Gentiles are fellow heirs, and fellow members of the body, and fellow partakers of his promise in Christ Jesus through the Good News." },
      { ref: "Acts 1:8", text: "You will be my witnesses in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth." },
    ],
    prompts: [
      "Pray for the believers in Jerusalem and across the land — courage and peace.",
      "Pray for shared tables where Arab and Jewish believers eat together.",
      "Pray for Jewish men and women coming to know their Messiah this week.",
      "Pray for Arab Christians — that they would not be invisible in either narrative.",
    ],
  },
];

/* ── Registry ───────────────────────────────────────────────────── */
const SUB_TOPICS: Record<string, SubTopic[]> = {
  war: SUB_WAR,
  persecution: SUB_PERSECUTION,
  leaders: SUB_LEADERS,
  famine: SUB_FAMINE,
  disease: SUB_DISEASE,
  disaster: SUB_DISASTER,
  trafficking: SUB_TRAFFICKING,
  refugees: SUB_REFUGEES,
  gospel: SUB_GOSPEL,
  israel: SUB_ISRAEL,
};

/* ──────────────────────────────────────────────────────────────────
   Public API
────────────────────────────────────────────────────────────────── */

export type StoryPrayer = {
  /** Final why-line — the sub-topic's if matched, else the category's. */
  why: string;
  anchors: { ref: string; text: string }[];
  prompts: string[];
  /** Tag we matched on (or "general"), surfaced as a subtle label. */
  subId: string;
  subLabel: string;
};

const SUB_LABELS: Record<string, string> = {
  "war-ceasefire": "Peace talks",
  "war-airstrike": "Under fire",
  "war-casualties": "The bereaved",
  "war-hostage": "Hostages",
  "war-soldiers": "Soldiers",
  "war-civilians": "Civilians caught in conflict",
  "war-coup": "Power changing by force",
  "persec-arrest": "Believers in prison",
  "persec-church-attack": "Attack on the church",
  "persec-blasphemy-law": "Laws against the Gospel",
  "persec-pastor": "Shepherd taken",
  "leaders-election": "Election",
  "leaders-corruption": "Corruption exposed",
  "leaders-sanctions": "Economic pressure between nations",
  "leaders-diplomacy": "Diplomacy",
  "famine-children": "Children going hungry",
  "famine-drought": "Drought",
  "famine-war-caused": "Hunger as a weapon",
  "disease-outbreak": "Outbreak",
  "disease-individual": "A hard diagnosis",
  "disease-healthworkers": "Those who care for the sick",
  "disaster-earthquake": "Earthquake",
  "disaster-flood": "Flood",
  "disaster-fire": "Wildfire",
  "disaster-storm": "Storm",
  "traf-children": "Children trafficked",
  "traf-women": "Women trafficked",
  "ref-sea": "At sea",
  "ref-camp": "In the camps",
  "ref-border": "At the border",
  "gospel-revival": "Revival",
  "gospel-bible-translation": "Word in a new tongue",
  "gospel-unreached": "Among the unreached",
  "isr-hostages": "Hostages",
  "isr-civilians": "Civilians on every side",
  "isr-gospel": "Believers in the land",
};

/**
 * Read the story and return the most-fitting scripture set.
 *
 * Matching: title + description, lowercased, whole-word; the FIRST
 * sub-topic to fire wins (order = priority). Falls back to the
 * category's general anchors + prompts when nothing fires.
 */
export function prayerFor(
  category: PrayerCategory,
  title: string,
  description: string | null,
): StoryPrayer {
  const subs = SUB_TOPICS[category.id];
  const hay = `${title} ${description ?? ""}`;
  if (subs) {
    for (const s of subs) {
      if (s.match.test(hay)) {
        return {
          why: s.why,
          anchors: s.anchors,
          prompts: s.prompts,
          subId: s.id,
          subLabel: SUB_LABELS[s.id] ?? "",
        };
      }
    }
  }
  return {
    why: category.why,
    anchors: category.anchors,
    prompts: category.prompts,
    subId: "general",
    subLabel: "",
  };
}
