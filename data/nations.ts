// Praying for the Nations — a daily rotation through the countries of the
// world, each with prayer points specific to that nation's spiritual,
// pastoral, political, and humanitarian situation.
//
// Sources for the context: World Watch List (Open Doors), Operation World,
// Joshua Project, World Christian Database, Pew Research, UN OCHA, and
// widely-reported news. Prayer points reflect the actual situation in each
// country — not generic boilerplate. Where the situation is changing, the
// points stay broad enough to remain true through the rotation.
//
// This dataset is intentionally pastoral, not political. We pray for every
// people and every government, including those whose policies we disagree
// with (1 Timothy 2:1–4).
//
// EDITORIAL RULE — no naming of living political figures.
// We pray for "the government," "national leadership," "those in authority,"
// "the king," "prisoners of conscience" — not for any sitting president,
// prime minister, prisoner-by-name, or party. Two reasons: (1) Scripture's
// pattern in 1 Timothy 2:1–4 is to pray for the office, not the person;
// (2) the platform serves believers reading from inside every jurisdiction
// on earth, including ones where naming a political figure on the "wrong"
// side could put the reader at risk. Specific situations (e.g. "clergy
// expelled since 2018," "the 2024 sovereignty agreement") are fact and
// stay. Names of living politicians do not.

export type Region =
  | "africa"
  | "north-africa-middle-east"
  | "europe"
  | "central-eurasia"
  | "south-asia"
  | "east-asia"
  | "southeast-asia"
  | "oceania"
  | "north-america"
  | "caribbean-central-america"
  | "south-america";

export const regions: Record<Region, string> = {
  africa: "Sub-Saharan Africa",
  "north-africa-middle-east": "North Africa & Middle East",
  europe: "Europe",
  "central-eurasia": "Central Asia & Caucasus",
  "south-asia": "South Asia",
  "east-asia": "East Asia",
  "southeast-asia": "Southeast Asia",
  oceania: "Oceania",
  "north-america": "North America",
  "caribbean-central-america": "Caribbean & Central America",
  "south-america": "South America",
};

export type Nation = {
  iso: string;
  name: string;
  nativeName?: string;
  region: Region;
  context: string;
  prayer: string[];
  verse: { ref: string; text: string };
};

export const nations: Nation[] = [
  // ─── SUB-SAHARAN AFRICA ─────────────────────────────────────────
  {
    iso: "NG", name: "Nigeria",
    region: "africa",
    context: "Africa's most populous nation and one of the largest Christian populations in the world. Believers in the north and Middle Belt face severe attacks; the southern church is sending missionaries across Africa.",
    prayer: [
      "Protection and courage for believers in northern Nigeria and the Middle Belt facing violence from Boko Haram, ISWAP, and Fulani militants.",
      "Wisdom and integrity for the President and state governors; an end to corruption that hurts the poor.",
      "Deep discipleship to keep pace with the church's rapid numerical growth.",
      "Healing for families bereaved by terror, kidnapping, and ethnic conflict.",
      "A continued missionary movement out of Nigeria into West and North Africa.",
    ],
    verse: { ref: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God." },
  },
  {
    iso: "ET", name: "Ethiopia",
    region: "africa",
    context: "One of the oldest Christian nations on earth, home to the Ethiopian Orthodox Church and a fast-growing evangelical community. Recent conflict in Tigray and Amhara has scarred the church and the land.",
    prayer: [
      "Reconciliation and peace after the Tigray war and ongoing Amhara conflict.",
      "Unity between Orthodox, Pentecostal, and evangelical believers around the one Lord Jesus.",
      "Provision for displaced families and famine-affected regions.",
      "Bold gospel witness among the Afar, Somali, and unreached lowland peoples.",
    ],
    verse: { ref: "Acts 8:35", text: "Then Philip opened his mouth, and beginning with this Scripture he told him the good news about Jesus." },
  },
  {
    iso: "KE", name: "Kenya",
    region: "africa",
    context: "A majority-Christian nation with vibrant churches and significant social challenges — poverty, tribal tension, corruption, and rapid urbanization.",
    prayer: [
      "Integrity in government and an end to corruption.",
      "Discipleship that goes deeper than Sunday attendance, especially among urban youth.",
      "Protection along the northern border from al-Shabaab attacks.",
      "Renewal among Kenya's many mission agencies sending workers across East Africa.",
    ],
    verse: { ref: "Micah 6:8", text: "What does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God?" },
  },
  {
    iso: "ZA", name: "South Africa",
    region: "africa",
    context: "A deeply Christian nation wrestling with the long shadow of apartheid, severe inequality, high crime, and growing secularism among the young.",
    prayer: [
      "Racial reconciliation that goes deeper than politics — in churches, neighborhoods, and homes.",
      "Justice for victims of gender-based violence and the protection of women and children.",
      "Faithful witness from the South African church to a watching continent.",
      "A new generation of believers who love Jesus more than the prosperity gospel sells them.",
    ],
    verse: { ref: "2 Chronicles 7:14", text: "If my people, who are called by my name, will humble themselves and pray... then I will hear from heaven." },
  },
  {
    iso: "EG", name: "Egypt",
    region: "north-africa-middle-east",
    context: "Home to the Coptic Orthodox Church, one of the oldest Christian communities on earth (Mark planted it). Believers face social pressure and occasional violence.",
    prayer: [
      "Protection and favor for the Coptic Orthodox community.",
      "Growth of evangelical fellowships, especially among university students.",
      "Boldness for believers from a Muslim background.",
      "Wisdom for those in national leadership and stability for the region.",
    ],
    verse: { ref: "Isaiah 19:25", text: "Blessed be Egypt my people, and Assyria the work of my hands." },
  },
  {
    iso: "SD", name: "Sudan",
    region: "africa",
    context: "Ravaged by civil war since 2023. Millions displaced. The church suffers alongside the nation.",
    prayer: [
      "An immediate end to the war between the SAF and RSF.",
      "Protection for displaced families, especially in Darfur and Khartoum.",
      "Restoration of food, water, and medicine to the starving.",
      "The light of Christ shining through Sudanese believers in this darkness.",
    ],
    verse: { ref: "Psalm 46:9", text: "He makes wars cease to the end of the earth." },
  },
  {
    iso: "SS", name: "South Sudan",
    region: "africa",
    context: "The world's youngest nation. Christianity is dominant, but inter-tribal violence and weak governance continue to wound the people.",
    prayer: [
      "Lasting peace between rival communities.",
      "Honest leadership and an end to corruption.",
      "Bible translation in the dozens of languages still without Scripture.",
      "Healing for trauma carried by an entire generation.",
    ],
    verse: { ref: "Isaiah 9:6", text: "His name shall be called... Prince of Peace." },
  },
  {
    iso: "SO", name: "Somalia",
    region: "africa",
    context: "Almost entirely Muslim; one of the most dangerous countries in the world to follow Jesus. Believers are very few, often anonymous, and at great risk.",
    prayer: [
      "Courage and safety for the tiny Somali church.",
      "Dreams and visions of Jesus among Somalis worldwide.",
      "Stability after decades of civil war and al-Shabaab violence.",
      "Hope for Somali families in refugee camps across the Horn of Africa.",
    ],
    verse: { ref: "Acts 18:9–10", text: "Do not be afraid... for I am with you, and no one will attack you to harm you, for I have many in this city who are my people." },
  },
  {
    iso: "ER", name: "Eritrea",
    region: "africa",
    context: "One of the most repressive nations on earth for believers. Hundreds of Christians are imprisoned in shipping containers without trial.",
    prayer: [
      "Release of every believer unjustly imprisoned for their faith.",
      "Comfort for their families and for the underground church.",
      "Repentance and the opening of true religious freedom by those in authority.",
      "Steadfast faith for Eritrean believers in the diaspora.",
    ],
    verse: { ref: "Hebrews 13:3", text: "Remember those who are in prison, as though in prison with them." },
  },
  {
    iso: "GH", name: "Ghana",
    region: "africa",
    context: "Strong Christian heritage and a major missionary-sending country. Wrestling with prosperity-gospel distortions and rising secularism.",
    prayer: [
      "A return to biblical preaching in the megachurches.",
      "Honesty in government and economy after recent inflation crises.",
      "Reaching the unreached northern peoples.",
      "Discipleship for the youth in Accra and the universities.",
    ],
    verse: { ref: "2 Timothy 4:3–4", text: "The time is coming when people will not endure sound teaching." },
  },
  {
    iso: "CD", name: "Democratic Republic of the Congo",
    region: "africa",
    context: "Vast nation of immense Christian faith and immense suffering. M23 and other militias terrorize the east; minerals fund foreign profits at Congolese cost.",
    prayer: [
      "Peace in North Kivu, South Kivu, and Ituri.",
      "Protection for women and children from sexual violence used as a weapon of war.",
      "Just stewardship of the country's mineral wealth.",
      "Boldness for the Congolese church to lead the nation's healing.",
    ],
    verse: { ref: "Psalm 9:9", text: "The Lord is a stronghold for the oppressed, a stronghold in times of trouble." },
  },
  {
    iso: "UG", name: "Uganda",
    region: "africa",
    context: "Vibrant Christian majority; significant generational shifts, refugee influx from neighbors, and political tensions.",
    prayer: [
      "Genuine discipleship in churches that gather huge crowds.",
      "Care for hundreds of thousands of refugees from S. Sudan and DRC.",
      "Honest succession and democratic health.",
      "Courage to love and disciple those who differ from us, including in the LGBT debate.",
    ],
    verse: { ref: "Romans 12:18", text: "If possible, so far as it depends on you, live peaceably with all." },
  },
  {
    iso: "RW", name: "Rwanda",
    region: "africa",
    context: "Thirty years after the genocide, still recovering. A predominantly Christian nation that famously failed at love when it mattered most.",
    prayer: [
      "Continued reconciliation between Hutu and Tutsi families.",
      "A church courageous enough to speak truth and tend wounds.",
      "Honest leadership and protection of dissent.",
      "Healing for those still carrying genocide trauma.",
    ],
    verse: { ref: "Joel 2:25", text: "I will restore to you the years that the swarming locust has eaten." },
  },
  {
    iso: "TZ", name: "Tanzania",
    region: "africa",
    context: "Roughly half Christian, half Muslim; growing church, growing tensions, vast unreached coastal and Zanzibari populations.",
    prayer: [
      "Peace between Christian and Muslim communities.",
      "Bold and gentle witness to coastal and Zanzibari peoples.",
      "Bible translation in unreached languages of the interior.",
      "Honest, humble leadership.",
    ],
    verse: { ref: "Ephesians 2:14", text: "For he himself is our peace, who has made us both one." },
  },
  {
    iso: "ZW", name: "Zimbabwe",
    region: "africa",
    context: "Strong Christian heritage; decades of economic collapse and political dysfunction. Diaspora believers scattered across the world.",
    prayer: [
      "Economic recovery and an end to hyperinflation.",
      "Just and democratic government.",
      "Strength for pastors caring for traumatized congregations.",
      "Restoration of Zimbabwean believers scattered across the globe.",
    ],
    verse: { ref: "Lamentations 3:22–23", text: "His mercies never come to an end; they are new every morning." },
  },
  {
    iso: "MZ", name: "Mozambique",
    region: "africa",
    context: "Growing Christian witness; northern Cabo Delgado province has been ravaged by jihadist insurgency.",
    prayer: [
      "Peace and security in Cabo Delgado.",
      "Care for displaced families and Christian survivors of attacks.",
      "Bible translation and access in many local languages.",
      "Spirit-empowered renewal in the southern megacities.",
    ],
    verse: { ref: "Psalm 27:1", text: "The Lord is my light and my salvation; whom shall I fear?" },
  },
  {
    iso: "MG", name: "Madagascar",
    region: "africa",
    context: "Majority Christian, but folk religion runs deep; chronic poverty and recurring famines in the south.",
    prayer: [
      "Genuine repentance from ancestor-veneration toward Christ alone.",
      "Famine relief in the south of the island.",
      "Honest leaders and care for the poor.",
      "Holy renewal of the Reformed and Lutheran churches that helped shape the nation.",
    ],
    verse: { ref: "1 Corinthians 8:6", text: "For us there is one God, the Father... and one Lord, Jesus Christ." },
  },
  {
    iso: "AO", name: "Angola",
    region: "africa",
    context: "Majority Christian; rebuilding after decades of civil war, with deep poverty alongside oil wealth.",
    prayer: [
      "Just stewardship of oil and mineral wealth for the poor.",
      "Healthcare and education access outside the capital.",
      "Renewal of biblical preaching in growing Pentecostal churches.",
      "Care for children orphaned by conflict and disease.",
    ],
    verse: { ref: "Proverbs 14:31", text: "Whoever oppresses a poor man insults his Maker, but he who is generous to the needy honors him." },
  },

  // ─── NORTH AFRICA & MIDDLE EAST ─────────────────────────────────
  {
    iso: "MA", name: "Morocco",
    region: "north-africa-middle-east",
    context: "Almost entirely Muslim; the small church of believers from Muslim background grows quietly through dreams, friendships, and online discipleship.",
    prayer: [
      "Boldness and protection for Moroccan believers.",
      "Continuing dreams and encounters with Jesus among ordinary Moroccans.",
      "Wisdom for the king and the cabinet.",
      "Healthy underground house churches across the country.",
    ],
    verse: { ref: "Acts 16:9", text: "There was a man of Macedonia standing there, urging him and saying, 'Come over... and help us.'" },
  },
  {
    iso: "DZ", name: "Algeria",
    region: "north-africa-middle-east",
    context: "A growing Algerian church (mostly Kabyle Berber) under increasing legal pressure; churches forcibly closed since 2018.",
    prayer: [
      "Open doors for closed churches to gather again.",
      "Courage for pastors under surveillance.",
      "Continuing Berber revival, despite the cost.",
      "Wisdom for the government in religious-freedom decisions.",
    ],
    verse: { ref: "Revelation 3:8", text: "Behold, I have set before you an open door, which no one is able to shut." },
  },
  {
    iso: "TN", name: "Tunisia",
    region: "north-africa-middle-east",
    context: "Small but growing church; democratic erosion in recent years; significant religious-freedom concerns.",
    prayer: [
      "Steady gospel growth among Tunisian Muslims.",
      "Recovery of democratic freedoms.",
      "Discipleship for new believers, often isolated.",
      "Bridges of friendship between believers and their neighbors.",
    ],
    verse: { ref: "Psalm 67:1–2", text: "May God be gracious to us and bless us... that your way may be known on earth." },
  },
  {
    iso: "LY", name: "Libya",
    region: "north-africa-middle-east",
    context: "Fractured by civil war; Libyan believers are very few and very hidden. ISIS martyred 21 Egyptian Coptic Christians on its shore.",
    prayer: [
      "An end to the civil war and unity of government.",
      "Courage and life for Libya's few believers.",
      "Comfort for the families of the Coptic martyrs whose blood watered this land.",
      "Hope for displaced and migrant families crossing the Mediterranean.",
    ],
    verse: { ref: "Revelation 6:9–11", text: "I saw under the altar the souls of those who had been slain for the word of God." },
  },
  {
    iso: "SA", name: "Saudi Arabia",
    region: "north-africa-middle-east",
    context: "The home of Mecca and Medina; public Christian gatherings are illegal. Yet expatriate believers, online ministries, and the testimonies of dreams testify to a hidden movement.",
    prayer: [
      "Dreams and encounters with Isa al-Masih among Saudis.",
      "Faithful witness from expatriate believers working in the Kingdom.",
      "Wisdom for the king and the royal court.",
      "Religious-freedom reforms.",
    ],
    verse: { ref: "Acts 9:3–4", text: "Suddenly a light from heaven shone around him... 'Saul, Saul, why are you persecuting me?'" },
  },
  {
    iso: "IR", name: "Iran",
    region: "north-africa-middle-east",
    context: "One of the fastest-growing churches in the world is in Iran — entirely underground. Government repression is severe; the gospel keeps spreading.",
    prayer: [
      "Protection and bold witness for the underground Iranian church.",
      "Release of every believer imprisoned for their faith.",
      "Freedom and dignity for the Iranian people.",
      "Reach of Persian-language broadcasting and online discipleship.",
    ],
    verse: { ref: "Psalm 126:5–6", text: "Those who sow in tears shall reap with shouts of joy." },
  },
  {
    iso: "IQ", name: "Iraq",
    region: "north-africa-middle-east",
    context: "Cradle of Abraham. The historic Christian community in Nineveh and the Plain has been devastated by ISIS and displacement.",
    prayer: [
      "Restoration of Christian villages on the Nineveh Plain.",
      "Protection of the ancient Chaldean, Syriac, and Assyrian churches.",
      "Peace between Sunni, Shia, and Kurd.",
      "Economic stability and gospel hope for the next generation.",
    ],
    verse: { ref: "Jeremiah 29:11", text: "I know the plans I have for you, declares the Lord, plans for welfare and not for evil." },
  },
  {
    iso: "SY", name: "Syria",
    region: "north-africa-middle-east",
    context: "A historic Christian land — Damascus is where Saul met Jesus. Ravaged by 14 years of war and earthquake.",
    prayer: [
      "Lasting peace and just government after the fall of Assad.",
      "Restoration of historic Christian communities in Aleppo, Damascus, Homs.",
      "Return of refugees in dignity.",
      "Daily bread, medicine, and rebuilding.",
    ],
    verse: { ref: "Acts 9:11", text: "Rise and go to the street called Straight..." },
  },
  {
    iso: "LB", name: "Lebanon",
    region: "north-africa-middle-east",
    context: "Long-standing Christian community (Maronite, Greek Orthodox, evangelical). Economic collapse and political paralysis have brought immense suffering.",
    prayer: [
      "Economic recovery; a return of stability for ordinary families.",
      "Unity among Christian communities — Maronite, Orthodox, Catholic, Protestant.",
      "Welcome and ministry to Syrian and Palestinian refugees.",
      "Just, accountable government.",
    ],
    verse: { ref: "Psalm 92:12", text: "The righteous flourish like the palm tree and grow like a cedar in Lebanon." },
  },
  {
    iso: "IL", name: "Israel",
    region: "north-africa-middle-east",
    context: "The land of Jesus' birth, ministry, death, and resurrection. The Messianic Jewish community is small but growing; Arab Christian believers are present in Galilee and elsewhere.",
    prayer: [
      "Peace for the people of Israel and their neighbors.",
      "Salvation for Israel — that they would know their Messiah Jesus.",
      "Wisdom for the government in matters of war and justice.",
      "Comfort for every family bereaved on October 7 and since.",
    ],
    verse: { ref: "Romans 11:26", text: "And in this way all Israel will be saved." },
  },
  {
    iso: "PS", name: "Palestine",
    region: "north-africa-middle-east",
    context: "Ancient Christian community of Bethlehem and the West Bank, plus a small church in Gaza. War since October 2023 has caused unspeakable suffering.",
    prayer: [
      "An immediate end to the war in Gaza.",
      "Food, water, and medicine to civilians.",
      "Protection of Christian families in Bethlehem, Beit Sahour, and Gaza City.",
      "Reconciliation between Palestinian and Israeli believers in the one Body of Christ.",
    ],
    verse: { ref: "Ephesians 2:14–16", text: "He himself is our peace, who has made us both one and has broken down... the dividing wall of hostility." },
  },
  {
    iso: "JO", name: "Jordan",
    region: "north-africa-middle-east",
    context: "Historic Christian presence; host to millions of refugees from Iraq, Syria, and Palestine.",
    prayer: [
      "Provision and welcome for refugees on Jordanian soil.",
      "Strengthening of the historic Christian community.",
      "Wisdom for King Abdullah II.",
      "Peace along Jordan's borders.",
    ],
    verse: { ref: "Leviticus 19:34", text: "You shall treat the stranger who sojourns with you as the native among you, and you shall love him as yourself." },
  },
  {
    iso: "TR", name: "Turkey",
    region: "north-africa-middle-east",
    context: "Ancient cradle of the church (Antioch, the seven churches of Revelation, the early councils). Today the Christian remnant is small and pressured.",
    prayer: [
      "Revival of gospel witness on the soil where the church was first called 'Christian.'",
      "Protection of Turkish believers from harassment and false charges.",
      "Wisdom for the government.",
      "Comfort for those still recovering from the 2023 earthquakes.",
    ],
    verse: { ref: "Acts 11:26", text: "And in Antioch the disciples were first called Christians." },
  },
  {
    iso: "AF", name: "Afghanistan",
    region: "south-asia",
    context: "Since the Taliban return in 2021, life for Afghan believers is among the most dangerous on earth. Most worship in secret, often alone.",
    prayer: [
      "Protection, courage, and community for hidden believers.",
      "Dignity, freedom, and education restored to Afghan women and girls.",
      "Daily bread for a hungry nation.",
      "Refugees scattered abroad finding Christ and faithful churches.",
    ],
    verse: { ref: "Hebrews 11:38", text: "Of whom the world was not worthy — wandering about in deserts and mountains, and in dens and caves of the earth." },
  },
  {
    iso: "YE", name: "Yemen",
    region: "north-africa-middle-east",
    context: "The world's worst humanitarian crisis. Yemeni believers are very few and very hidden.",
    prayer: [
      "End of the civil war and ceasefire across the country.",
      "Food, water, and medicine for the starving.",
      "Hope and life for Yemen's secret believers.",
      "Healing among Yemeni refugees in the Horn of Africa.",
    ],
    verse: { ref: "Psalm 34:18", text: "The Lord is near to the brokenhearted and saves the crushed in spirit." },
  },

  // ─── EUROPE ────────────────────────────────────────────────────
  {
    iso: "GB", name: "United Kingdom",
    region: "europe",
    context: "Once a missionary-sending superpower; now one of the most secular societies in the world, with churches half-empty and a hungering generation that has never heard the gospel from someone they trust.",
    prayer: [
      "A new wave of spiritual hunger across Britain.",
      "Renewal of the Church of England, the Free Churches, the Catholic Church, and the African and Asian diaspora churches together.",
      "A generation of bold British evangelists.",
      "Healing of the deep divisions in British public life.",
    ],
    verse: { ref: "Ezekiel 37:5", text: "Thus says the Lord God to these bones: Behold, I will cause breath to enter you, and you shall live." },
  },
  {
    iso: "DE", name: "Germany",
    region: "europe",
    context: "The land of the Reformation; today both Catholic and Protestant churches are emptying, while a new movement of immigrant-led churches is rising in the cities.",
    prayer: [
      "A new Reformation — Spirit and Word together.",
      "Renewal of Catholic, Lutheran, and free-church traditions.",
      "Strengthening of immigrant churches and bridges between them and German-language fellowships.",
      "Compassion for refugees from Syria, Ukraine, and Afghanistan settling in German cities.",
    ],
    verse: { ref: "Habakkuk 3:2", text: "O Lord, I have heard the report of you, and your work, O Lord, do I fear. In the midst of the years revive it." },
  },
  {
    iso: "FR", name: "France",
    region: "europe",
    context: "Largely post-Christian; a small but growing evangelical movement and a sizable immigrant-origin church. Catholic life is recovering pockets of vitality.",
    prayer: [
      "Genuine revival across Catholic, Reformed, and evangelical communities.",
      "Bold and gentle witness in the universities and the banlieues.",
      "Wisdom in laïcité — secularism — without hostility to faith.",
      "Hope for North African and West African believers in France.",
    ],
    verse: { ref: "Lamentations 5:21", text: "Restore us to yourself, O Lord, that we may be restored! Renew our days as of old." },
  },
  {
    iso: "ES", name: "Spain",
    region: "europe",
    context: "A historically Catholic nation now largely secular. Evangelical believers number roughly 1% but are growing among young adults and immigrants.",
    prayer: [
      "Renewal in Spanish Catholic life.",
      "Multiplication of healthy evangelical congregations.",
      "Ministry among Spain's many North African and Latin American immigrants.",
      "Bold witness in the universities.",
    ],
    verse: { ref: "Acts 19:20", text: "So the word of the Lord continued to increase and prevail mightily." },
  },
  {
    iso: "IT", name: "Italy",
    region: "europe",
    context: "Home of Rome and the seat of the Catholic Church; cultural Christianity remains widespread, personal faith has thinned, and a small evangelical and Pentecostal movement is growing.",
    prayer: [
      "Spiritual renewal in Italian Catholicism.",
      "Multiplication of Christ-centered evangelical communities.",
      "Wise pastoral leadership across the Italian peninsula.",
      "Hope for refugees crossing the Mediterranean to Italian shores.",
    ],
    verse: { ref: "Romans 1:8", text: "First, I thank my God through Jesus Christ for all of you, because your faith is proclaimed in all the world." },
  },
  {
    iso: "RU", name: "Russia",
    region: "europe",
    context: "Long Christian history dominated by the Russian Orthodox Church. War in Ukraine has divided believers and tested the gospel's witness.",
    prayer: [
      "Peace — a just end to the war in Ukraine.",
      "Courage for Russian Orthodox, Baptist, Pentecostal, and evangelical believers to choose Christ over nationalism.",
      "Wisdom in government and care for the families bereaved by war.",
      "Renewal of the historic monasteries and parishes.",
    ],
    verse: { ref: "Matthew 5:9", text: "Blessed are the peacemakers, for they shall be called sons of God." },
  },
  {
    iso: "UA", name: "Ukraine",
    region: "europe",
    context: "Christian-majority nation under invasion since 2022. Both Orthodox and evangelical believers have shown the world what costly love looks like.",
    prayer: [
      "A just and lasting peace.",
      "Protection of soldiers and civilians; courage for those on the front lines.",
      "Provision for displaced families across Europe.",
      "Renewal and unity of the Ukrainian Orthodox, Baptist, and Pentecostal churches.",
    ],
    verse: { ref: "Psalm 91:7", text: "A thousand may fall at your side, ten thousand at your right hand, but it will not come near you." },
  },
  {
    iso: "PL", name: "Poland",
    region: "europe",
    context: "Strongly Catholic; significant cultural and political changes underway. Welcoming millions of Ukrainian refugees has been a witness.",
    prayer: [
      "Continued welcome of Ukrainian refugees.",
      "Renewal of personal faith inside Polish Catholic culture.",
      "Growth of healthy evangelical and Baptist communities.",
      "Wisdom in government and Europe-facing leadership.",
    ],
    verse: { ref: "Matthew 25:35", text: "I was a stranger and you welcomed me." },
  },
  {
    iso: "GR", name: "Greece",
    region: "europe",
    context: "The land where Paul preached. Greek Orthodoxy is the national church; vital faith is a personal question for many.",
    prayer: [
      "Renewal of the Greek Orthodox Church in personal faith.",
      "Growth of Greek-speaking evangelical fellowships.",
      "Ministry to refugees arriving from across the Mediterranean.",
      "Healing of the economic wounds of the past decade.",
    ],
    verse: { ref: "Acts 17:23", text: "What therefore you worship as unknown, this I proclaim to you." },
  },
  {
    iso: "NL", name: "Netherlands",
    region: "europe",
    context: "Birthplace of significant Reformed theology; today one of the most secular nations in Europe, with a vibrant immigrant church and pockets of Reformed and Pentecostal renewal.",
    prayer: [
      "Spiritual hunger across the Dutch population.",
      "Renewal of Reformed and Catholic communities.",
      "Strengthening and integration of immigrant-led churches.",
      "Bold witness in business, science, and the arts.",
    ],
    verse: { ref: "Psalm 85:6", text: "Will you not revive us again, that your people may rejoice in you?" },
  },
  {
    iso: "SE", name: "Sweden",
    region: "europe",
    context: "Among the most secular countries on earth. The Church of Sweden is large institutionally but spiritually thin; a small evangelical movement persists.",
    prayer: [
      "Awakening across a deeply secular generation.",
      "Renewal in the Lutheran national church.",
      "Strengthening of evangelical and Pentecostal fellowships.",
      "Ministry to Eritrean, Syrian, and Somali immigrants.",
    ],
    verse: { ref: "Isaiah 55:6", text: "Seek the Lord while he may be found; call upon him while he is near." },
  },

  // ─── CENTRAL EURASIA ───────────────────────────────────────────
  {
    iso: "UZ", name: "Uzbekistan",
    region: "central-eurasia",
    context: "Predominantly Muslim; a small but growing Uzbek church under social and legal pressure.",
    prayer: [
      "Religious-freedom reforms.",
      "Boldness and protection for Uzbek believers.",
      "Healthy underground house-church networks.",
      "Bridges of friendship between believers and their Muslim neighbors.",
    ],
    verse: { ref: "Isaiah 43:19", text: "Behold, I am doing a new thing; now it springs forth, do you not perceive it?" },
  },
  {
    iso: "KZ", name: "Kazakhstan",
    region: "central-eurasia",
    context: "Vast and diverse — Russian Orthodox, Muslim, and a growing Kazakh-language evangelical church.",
    prayer: [
      "Religious freedom and an end to restrictive new laws.",
      "Discipleship of new Kazakh believers.",
      "Unity across Russian, Kazakh, and Korean Christian communities.",
      "Wisdom for the government.",
    ],
    verse: { ref: "Isaiah 49:6", text: "I will make you as a light for the nations, that my salvation may reach to the end of the earth." },
  },
  {
    iso: "AZ", name: "Azerbaijan",
    region: "central-eurasia",
    context: "Majority Muslim; a small Azerbaijani church meets quietly. Years of war with Armenia have cost both nations dearly.",
    prayer: [
      "Lasting peace with Armenia.",
      "Protection for the small Azerbaijani church.",
      "Gospel access in the Azeri language online and in print.",
      "Reconciliation that only Christ can give.",
    ],
    verse: { ref: "Isaiah 19:23", text: "There will be a highway from Egypt to Assyria... and Egypt will worship with Assyria." },
  },
  {
    iso: "AM", name: "Armenia",
    region: "central-eurasia",
    context: "The first nation in history to embrace Christianity as its state religion (AD 301). Suffering profound losses after Nagorno-Karabakh.",
    prayer: [
      "Comfort for displaced Karabakh Armenians.",
      "Renewal of the Armenian Apostolic Church alongside growing evangelical fellowships.",
      "Peace with neighbors.",
      "Continued witness from this ancient Christian land.",
    ],
    verse: { ref: "Psalm 121:1–2", text: "I lift up my eyes to the hills. From where does my help come? My help comes from the Lord." },
  },
  {
    iso: "GE", name: "Georgia",
    region: "central-eurasia",
    context: "Ancient Orthodox Christian nation; navigating between Russian and European pulls.",
    prayer: [
      "Wisdom in foreign policy and protection of democratic freedoms.",
      "Renewal of the Georgian Orthodox Church.",
      "Growth and integration of evangelical fellowships.",
      "Healing of long-standing conflict with Russia over occupied territories.",
    ],
    verse: { ref: "Psalm 33:12", text: "Blessed is the nation whose God is the Lord." },
  },

  // ─── SOUTH ASIA ─────────────────────────────────────────────────
  {
    iso: "IN", name: "India",
    region: "south-asia",
    context: "Home to the largest unreached population on earth — and a vibrant, varied Christian community over 60 million strong. Rising Hindu-nationalist pressure in several states.",
    prayer: [
      "Religious-freedom protection in every state.",
      "Boldness for believers facing 'anti-conversion' charges, often unjust.",
      "Bible translation and discipleship among the 2,500+ unreached people groups.",
      "Unity across Catholic, Mar Thoma, Pentecostal, and indigenous evangelical communities.",
      "Wisdom for the Prime Minister and state governments.",
    ],
    verse: { ref: "Revelation 7:9", text: "A great multitude that no one could number, from every nation, from all tribes and peoples and languages." },
  },
  {
    iso: "PK", name: "Pakistan",
    region: "south-asia",
    context: "Christian minority under sustained pressure: blasphemy laws, mob violence, abductions of girls. Yet underground and aboveground churches grow.",
    prayer: [
      "Reform of the blasphemy laws and protection of religious minorities.",
      "Safety for Christian and Hindu girls from forced conversion and marriage.",
      "Comfort for families of believers killed for their faith.",
      "Bold proclamation of Jesus among the unreached majority.",
    ],
    verse: { ref: "Psalm 10:17–18", text: "O Lord, you hear the desire of the afflicted... to do justice to the fatherless and the oppressed." },
  },
  {
    iso: "BD", name: "Bangladesh",
    region: "south-asia",
    context: "Majority Muslim; small but growing Bengali, tribal, and migrant Christian communities.",
    prayer: [
      "Gospel access to the Bengali-speaking majority.",
      "Protection of believers from Muslim and Hindu backgrounds.",
      "Discipleship and Bible translation in tribal languages.",
      "Care for Rohingya refugees in Cox's Bazar.",
    ],
    verse: { ref: "Psalm 146:7", text: "He executes justice for the oppressed, gives food to the hungry." },
  },
  {
    iso: "LK", name: "Sri Lanka",
    region: "south-asia",
    context: "Buddhist majority with sizable Hindu, Muslim, and Christian minorities. Easter 2019 bombings still shape the church's witness.",
    prayer: [
      "Reconciliation across Sinhala, Tamil, Muslim, and Christian lines.",
      "Comfort for families of the Easter bombing victims; courage for ongoing witness.",
      "Economic recovery for ordinary families.",
      "Honest, accountable government.",
    ],
    verse: { ref: "Romans 12:21", text: "Do not be overcome by evil, but overcome evil with good." },
  },
  {
    iso: "NP", name: "Nepal",
    region: "south-asia",
    context: "Hindu-heritage nation with one of the fastest-growing churches in Asia, formed largely by Dalit and Janajati believers.",
    prayer: [
      "Continued church growth without compromise.",
      "Protection from new anti-conversion legislation.",
      "Bible translation in dozens of unreached languages.",
      "Healthy, indigenous discipleship and pastoral training.",
    ],
    verse: { ref: "Matthew 13:31–32", text: "The kingdom of heaven is like a grain of mustard seed... which is the smallest of all seeds, but when it has grown it is larger than all the garden plants." },
  },

  // ─── EAST ASIA ──────────────────────────────────────────────────
  {
    iso: "CN", name: "China",
    region: "east-asia",
    context: "Home to the largest church in the world by some estimates. Registered Three-Self congregations and unregistered house churches alike face renewed pressure since 2018.",
    prayer: [
      "Boldness and wisdom for house-church pastors under surveillance.",
      "Faith for parents teaching their children Christ in private.",
      "Continued growth of the gospel among Han, Hui, Tibetan, and Uyghur peoples.",
      "Comfort and freedom for Uyghur Christians and the unreached Uyghur majority.",
      "Wisdom for those in national leadership (1 Timothy 2:1–2).",
    ],
    verse: { ref: "Daniel 2:21", text: "He changes times and seasons; he removes kings and sets up kings." },
  },
  {
    iso: "JP", name: "Japan",
    region: "east-asia",
    context: "Less than 1% Christian. A spiritually hungry but resistant culture. Hidden Christians of Nagasaki preserved the faith for centuries under persecution.",
    prayer: [
      "A new spiritual awakening across Japanese cities.",
      "Strengthening of small Japanese congregations.",
      "Boldness for young Japanese to follow Christ despite social cost.",
      "Healing of generational trauma from war and economic stagnation.",
    ],
    verse: { ref: "Isaiah 60:1", text: "Arise, shine, for your light has come, and the glory of the Lord has risen upon you." },
  },
  {
    iso: "KR", name: "South Korea",
    region: "east-asia",
    context: "Vibrant Christian community that became a major missionary-sending nation. Today the church faces decline, scandal, and a generation walking away.",
    prayer: [
      "Renewal of fervent prayer and Word in Korean churches.",
      "Repentance from materialism and dynastic ministry abuses.",
      "Renewed commitment to global missions.",
      "Reconciliation with the North; protection of underground believers there.",
    ],
    verse: { ref: "Revelation 2:4–5", text: "I have this against you, that you have abandoned the love you had at first. Remember therefore from where you have fallen." },
  },
  {
    iso: "KP", name: "North Korea",
    region: "east-asia",
    context: "Among the most repressive nations on earth. Believers worship in silence, alone, often with only memorized Scripture. Many in prison camps.",
    prayer: [
      "Endurance and faith for North Korean believers in prison camps.",
      "Daily bread for hungry families across the nation.",
      "Eventual freedom, justice, and gospel access.",
      "Protection of believers smuggling Bibles and broadcasting in Korean.",
    ],
    verse: { ref: "Isaiah 42:7", text: "To open the eyes that are blind, to bring out the prisoners from the dungeon, from the prison those who sit in darkness." },
  },
  {
    iso: "MN", name: "Mongolia",
    region: "east-asia",
    context: "A young Mongolian church (mostly post-1990) is one of Asia's most dynamic, with significant missionary ambitions of its own.",
    prayer: [
      "Continued health and depth of the Mongolian church.",
      "Training of pastors and translators.",
      "Mongolian missionaries to the unreached peoples of Asia.",
      "Wisdom for democratic government.",
    ],
    verse: { ref: "Acts 13:47", text: "I have made you a light for the Gentiles, that you may bring salvation to the ends of the earth." },
  },
  {
    iso: "TW", name: "Taiwan",
    region: "east-asia",
    context: "Christian minority with significant cultural influence; faces political and military pressure from mainland China.",
    prayer: [
      "Peace across the Taiwan Strait.",
      "Bold witness from Taiwanese churches.",
      "Discipleship among indigenous Taiwanese peoples.",
      "Wisdom for the government in matters of war and peace.",
    ],
    verse: { ref: "Psalm 46:1–2", text: "God is our refuge and strength, a very present help in trouble." },
  },

  // ─── SOUTHEAST ASIA ─────────────────────────────────────────────
  {
    iso: "ID", name: "Indonesia",
    region: "southeast-asia",
    context: "World's largest Muslim-majority nation, with significant Christian minorities (~10%) under varying degrees of pressure.",
    prayer: [
      "Continued religious freedom under Indonesia's pluralist Pancasila.",
      "Protection of believers in Aceh and West Papua.",
      "Discipleship in fast-growing urban congregations.",
      "Bridges of friendship and respect between Muslims and Christians.",
    ],
    verse: { ref: "Romans 12:18", text: "If possible, so far as it depends on you, live peaceably with all." },
  },
  {
    iso: "PH", name: "Philippines",
    region: "southeast-asia",
    context: "One of the most Catholic nations on earth; significant evangelical and Pentecostal movements. Poverty, corruption, and overseas labor migration test the church.",
    prayer: [
      "Renewal of Catholic, evangelical, and Pentecostal communities together.",
      "Justice for the poor and an end to corruption.",
      "Care for overseas Filipino workers and their families left behind.",
      "Peace in Mindanao and protection of Christian and Muslim communities.",
    ],
    verse: { ref: "Isaiah 1:17", text: "Learn to do good; seek justice, correct oppression; bring justice to the fatherless, plead the widow's cause." },
  },
  {
    iso: "VN", name: "Vietnam",
    region: "southeast-asia",
    context: "Significant Christian community among Hmong, Ede, and other minorities; pressure from the state, especially in the central highlands.",
    prayer: [
      "Religious freedom and an end to harassment of unregistered churches.",
      "Bold gospel witness among the Kinh majority.",
      "Discipleship among Hmong, Ede, and other minorities.",
      "Wisdom for the Communist Party leadership.",
    ],
    verse: { ref: "Acts 4:29", text: "Lord, look upon their threats and grant to your servants to continue to speak your word with all boldness." },
  },
  {
    iso: "TH", name: "Thailand",
    region: "southeast-asia",
    context: "Buddhist-majority kingdom; less than 1% Christian after centuries of mission work. A spiritually resistant yet open culture.",
    prayer: [
      "Breakthrough among the Thai people.",
      "Discipleship for new believers, often isolated in their families.",
      "Hill-tribe churches and Bible translation work.",
      "Protection for women and children from human trafficking.",
    ],
    verse: { ref: "Matthew 9:37–38", text: "The harvest is plentiful, but the laborers are few." },
  },
  {
    iso: "MM", name: "Myanmar (Burma)",
    region: "southeast-asia",
    context: "Devastated by civil war since the 2021 coup. The Kachin, Karen, and Chin Christian communities suffer alongside the Bamar majority.",
    prayer: [
      "An end to the war and a path to democracy.",
      "Protection of Christian villages and IDPs.",
      "Care for refugees in Thailand and India.",
      "Healing for the trauma of an entire generation.",
    ],
    verse: { ref: "Psalm 56:8", text: "You have kept count of my tossings; put my tears in your bottle. Are they not in your book?" },
  },
  {
    iso: "MY", name: "Malaysia",
    region: "southeast-asia",
    context: "Plural society where the Malay majority is constitutionally Muslim. Christian believers are mostly from Chinese, Indian, and East Malaysian indigenous backgrounds.",
    prayer: [
      "Wise navigation of laws restricting Malay believers.",
      "Unity among Chinese, Indian, and Bumiputera churches.",
      "Strong witness in East Malaysia (Sabah and Sarawak).",
      "Religious-freedom reforms.",
    ],
    verse: { ref: "Galatians 3:28", text: "There is neither Jew nor Greek, there is neither slave nor free, there is no male and female, for you are all one in Christ Jesus." },
  },
  {
    iso: "KH", name: "Cambodia",
    region: "southeast-asia",
    context: "Recovering from the Khmer Rouge genocide; a small but growing Khmer church.",
    prayer: [
      "Continued growth and depth of the Khmer church.",
      "Healing of intergenerational trauma from the killing fields.",
      "Just government and care for the poor.",
      "Protection of children from sex trafficking.",
    ],
    verse: { ref: "Psalm 30:11", text: "You have turned for me my mourning into dancing." },
  },
  {
    iso: "LA", name: "Laos",
    region: "southeast-asia",
    context: "Communist state with significant restrictions on faith. Lao and Hmong believers face arrest and church closures.",
    prayer: [
      "Religious freedom; release of believers imprisoned for their faith.",
      "Boldness and joy for Lao and Hmong house churches.",
      "Bible translation and pastoral training.",
      "Wisdom for the government.",
    ],
    verse: { ref: "1 Peter 4:14", text: "If you are insulted for the name of Christ, you are blessed, because the Spirit of glory and of God rests upon you." },
  },

  // ─── OCEANIA ────────────────────────────────────────────────────
  {
    iso: "AU", name: "Australia",
    region: "oceania",
    context: "Increasingly secular; Christian heritage thinning. Aboriginal Christianity has its own deep story. Immigrant churches are growing.",
    prayer: [
      "Spiritual awakening in Australian cities.",
      "Reconciliation with Aboriginal and Torres Strait Islander peoples.",
      "Renewal of Anglican, Catholic, Pentecostal, and free-church communities.",
      "Wisdom in stewarding wealth and welcoming immigrants.",
    ],
    verse: { ref: "Isaiah 43:5–6", text: "Fear not, for I am with you; I will bring your offspring from the east, and from the west I will gather you." },
  },
  {
    iso: "NZ", name: "New Zealand",
    region: "oceania",
    context: "Secularizing Christian heritage; Māori Christianity has a rich and growing story.",
    prayer: [
      "Spiritual awakening among young New Zealanders.",
      "Maturing of Māori-led discipleship and Bible engagement.",
      "Renewal of Anglican, Presbyterian, Catholic, and free-church traditions.",
      "Care for Pacific Island peoples in Aotearoa.",
    ],
    verse: { ref: "Isaiah 42:10", text: "Sing to the Lord a new song, his praise from the end of the earth..." },
  },
  {
    iso: "PG", name: "Papua New Guinea",
    region: "oceania",
    context: "Christian-majority nation with extraordinary linguistic diversity (800+ languages). Bible translation has been a long, holy labor.",
    prayer: [
      "Completion of Bible translation in remaining languages.",
      "Genuine discipleship beyond cultural Christianity.",
      "Just stewardship of natural resources.",
      "An end to tribal and clan violence.",
    ],
    verse: { ref: "Acts 2:8", text: "How is it that we hear, each of us in his own native language?" },
  },
  {
    iso: "FJ", name: "Fiji",
    region: "oceania",
    context: "Christian-majority Pacific nation with strong Methodist heritage and growing evangelical movements; significant Hindu minority.",
    prayer: [
      "Renewal of the Methodist Church and growing evangelical congregations.",
      "Witness and friendship across iTaukei and Indo-Fijian communities.",
      "Resilience in the face of rising seas and cyclones.",
      "Honest leadership.",
    ],
    verse: { ref: "Psalm 24:1", text: "The earth is the Lord's and the fullness thereof, the world and those who dwell therein." },
  },

  // ─── NORTH AMERICA ──────────────────────────────────────────────
  {
    iso: "US", name: "United States",
    region: "north-america",
    context: "Christian-influenced culture rapidly secularizing. The church is large, diverse, conflicted, and uncertain. A new generation of believers is asking what discipleship costs.",
    prayer: [
      "Repentance from cultural and political idolatries.",
      "Renewal of personal faith — Scripture, prayer, and obedience.",
      "Unity across white, Black, Hispanic, Asian, and Indigenous churches.",
      "Faithful witness from immigrant and African American congregations to the wider church.",
      "Wisdom for the President, Congress, and the Supreme Court.",
    ],
    verse: { ref: "2 Chronicles 7:14", text: "If my people, who are called by my name, will humble themselves and pray and seek my face..." },
  },
  {
    iso: "CA", name: "Canada",
    region: "north-america",
    context: "Highly secular; significant immigrant-driven Christian growth; deep wounds in Indigenous communities from the residential-school era.",
    prayer: [
      "Truth and reconciliation with First Nations, Métis, and Inuit peoples.",
      "Renewal of historic and immigrant churches together.",
      "Bold witness in Quebec, where the post-Catholic gap is wide.",
      "Care for the lonely in long winters.",
    ],
    verse: { ref: "Isaiah 58:12", text: "You shall be called the repairer of the breach, the restorer of streets to dwell in." },
  },
  {
    iso: "MX", name: "Mexico",
    region: "caribbean-central-america",
    context: "Strongly Catholic and increasingly evangelical; cartel violence has devastated communities and threatened pastors.",
    prayer: [
      "An end to cartel violence and protection of pastors and journalists.",
      "Renewal of Catholic, evangelical, and indigenous Christian communities.",
      "Justice for victims of femicide and forced disappearances.",
      "Welcome and ministry to migrants at the northern and southern borders.",
    ],
    verse: { ref: "Psalm 72:4", text: "May he defend the cause of the poor of the people, give deliverance to the children of the needy, and crush the oppressor!" },
  },

  // ─── CARIBBEAN & CENTRAL AMERICA ────────────────────────────────
  {
    iso: "HT", name: "Haiti",
    region: "caribbean-central-america",
    context: "Christian-majority nation, currently overwhelmed by gang violence, economic collapse, and political vacuum.",
    prayer: [
      "An end to gang rule and restoration of safety.",
      "Care for displaced families and those without food or water.",
      "Strength for Haitian pastors caring for traumatized communities.",
      "Justice and stable government.",
    ],
    verse: { ref: "Psalm 121:7–8", text: "The Lord will keep you from all evil; he will keep your life. The Lord will keep your going out and your coming in." },
  },
  {
    iso: "DO", name: "Dominican Republic",
    region: "caribbean-central-america",
    context: "Strongly Catholic, growing evangelical and Pentecostal communities; significant ministry to Haitian immigrants.",
    prayer: [
      "Welcome and ministry to Haitian neighbors.",
      "Renewal of Catholic and evangelical witness.",
      "Justice for migrant workers.",
      "Discipleship among urban youth.",
    ],
    verse: { ref: "Hebrews 13:1–2", text: "Let brotherly love continue. Do not neglect to show hospitality to strangers." },
  },
  {
    iso: "GT", name: "Guatemala",
    region: "caribbean-central-america",
    context: "One of Latin America's most evangelical nations; deep poverty, violence, and migration to the U.S.",
    prayer: [
      "Discipleship beyond evangelistic crusades.",
      "Justice for Maya and indigenous communities.",
      "Comfort for families separated by migration.",
      "Honest government.",
    ],
    verse: { ref: "Amos 5:24", text: "Let justice roll down like waters, and righteousness like an ever-flowing stream." },
  },
  {
    iso: "CU", name: "Cuba",
    region: "caribbean-central-america",
    context: "Communist state with a resilient and growing church across Catholic, Baptist, Pentecostal, and Methodist traditions.",
    prayer: [
      "Religious freedom and humanitarian relief.",
      "Strength for pastors with limited resources.",
      "Bold gospel witness among the next generation.",
      "Hope for those tempted to leave the island.",
    ],
    verse: { ref: "Psalm 33:16–17", text: "The king is not saved by his great army; a warrior is not delivered by his great strength." },
  },

  // ─── SOUTH AMERICA ──────────────────────────────────────────────
  {
    iso: "BR", name: "Brazil",
    region: "south-america",
    context: "One of the largest Christian populations on earth — Catholic, Pentecostal, evangelical. Powerful church witness alongside prosperity-gospel distortions.",
    prayer: [
      "Renewal of biblical preaching in megachurches.",
      "Justice for the poor in favelas and the unreached interior.",
      "Care for the Amazon and its indigenous Christian communities.",
      "A new wave of Brazilian missionaries to the unreached world.",
    ],
    verse: { ref: "Luke 4:18", text: "He has anointed me to proclaim good news to the poor." },
  },
  {
    iso: "AR", name: "Argentina",
    region: "south-america",
    context: "Strongly Catholic, growing evangelical communities; severe economic instability.",
    prayer: [
      "Economic recovery for ordinary families.",
      "Renewal of Catholic and evangelical witness together.",
      "Discipleship among Argentina's many young adults.",
      "Honest leadership and care for the poor.",
    ],
    verse: { ref: "Proverbs 22:9", text: "Whoever has a bountiful eye will be blessed, for he shares his bread with the poor." },
  },
  {
    iso: "CO", name: "Colombia",
    region: "south-america",
    context: "Strongly Catholic and increasingly evangelical; a long peace process with FARC and other armed groups continues.",
    prayer: [
      "Lasting peace and full implementation of demobilization.",
      "Justice and reconciliation for victims of the conflict.",
      "Bold witness in Pacific and Amazon regions.",
      "Ministry to Venezuelan migrants.",
    ],
    verse: { ref: "Isaiah 32:17", text: "The effect of righteousness will be peace, and the result of righteousness, quietness and trust forever." },
  },
  {
    iso: "VE", name: "Venezuela",
    region: "south-america",
    context: "Severe economic and political crisis; massive emigration. The church endures and serves.",
    prayer: [
      "A peaceful path to democracy and economic recovery.",
      "Care for Venezuelans abroad — across Latin America and beyond.",
      "Strength for pastors and laypeople feeding their neighbors.",
      "Justice and freedom for political prisoners.",
    ],
    verse: { ref: "Psalm 113:7", text: "He raises the poor from the dust and lifts the needy from the ash heap." },
  },
  {
    iso: "PE", name: "Peru",
    region: "south-america",
    context: "Strongly Catholic with growing evangelical movements; political instability and rural poverty persist.",
    prayer: [
      "Discipleship among Quechua, Aymara, and Amazonian believers.",
      "Honest leadership and care for the poor.",
      "Renewal of Catholic and evangelical communities.",
      "Hope and witness in Lima's growing urban poor.",
    ],
    verse: { ref: "Isaiah 40:29", text: "He gives power to the faint, and to him who has no might he increases strength." },
  },
  {
    iso: "CL", name: "Chile",
    region: "south-america",
    context: "Heritage Catholic; rapidly secularizing among the young; a vital Pentecostal movement (Chile is the cradle of Latin American Pentecostalism).",
    prayer: [
      "Renewal of Chilean Pentecostal and Catholic communities.",
      "Healing of the Mapuche conflict in the south.",
      "Just leadership and care for the poor.",
      "Bold witness in universities and on the street.",
    ],
    verse: { ref: "Acts 2:17", text: "I will pour out my Spirit on all flesh." },
  },
  {
    iso: "BO", name: "Bolivia",
    region: "south-america",
    context: "Strongly Catholic with growing evangelical communities; deep indigenous Aymara and Quechua heritage; chronic poverty.",
    prayer: [
      "Discipleship for Aymara and Quechua believers.",
      "Just government and care for the poor.",
      "Healing of political division.",
      "Reach of the gospel into the Amazon basin.",
    ],
    verse: { ref: "Luke 6:20", text: "Blessed are you who are poor, for yours is God's Kingdom." },
  },
  {
    iso: "EC", name: "Ecuador",
    region: "south-america",
    context: "Catholic majority; rapidly growing evangelical movements; struggling with cartel violence creeping in from the north.",
    prayer: [
      "Protection from cartel violence.",
      "Strengthening of evangelical and Catholic communities.",
      "Bible translation and discipleship in Kichwa and Shuar.",
      "Hope for those tempted to migrate.",
    ],
    verse: { ref: "Psalm 91:5", text: "You shall not be afraid of the terror by night." },
  },
  {
    iso: "PY", name: "Paraguay",
    region: "south-america",
    context: "Strongly Catholic; small but growing evangelical movements; significant Guaraní-speaking population.",
    prayer: [
      "Bible translation and discipleship in Guaraní.",
      "Honest government and care for the poor.",
      "Renewal of Catholic and evangelical communities.",
      "Witness in rural and indigenous communities.",
    ],
    verse: { ref: "Isaiah 30:15", text: "In returning and rest you shall be saved." },
  },
  {
    iso: "UY", name: "Uruguay",
    region: "south-america",
    context: "One of the most secular nations in Latin America. The evangelical church is small and witnessing in a society that has largely forgotten God.",
    prayer: [
      "Awakening among a deeply secular generation.",
      "Strengthening of evangelical and Catholic congregations.",
      "Bold witness in universities and the workplace.",
      "Healthy church-planting in Montevideo and the interior.",
    ],
    verse: { ref: "Acts 17:23", text: "What therefore you worship in ignorance, this I announce to you." },
  },
  {
    iso: "JM", name: "Jamaica",
    region: "caribbean-central-america",
    context: "Christian-majority island with vibrant Pentecostal, Methodist, and Catholic communities; struggles with violence and out-migration.",
    prayer: [
      "An end to gang violence in Kingston and beyond.",
      "Restoration of fathers and families.",
      "Renewal of the Jamaican church's mission identity.",
      "Care for the elderly left behind by emigration.",
    ],
    verse: { ref: "Isaiah 58:6", text: "Is not this the fast that I have chosen: to loose the bonds of wickedness..." },
  },
  {
    iso: "TT", name: "Trinidad & Tobago",
    region: "caribbean-central-america",
    context: "Diverse Christian, Hindu, and Muslim populations; significant Pentecostal and Catholic communities; ongoing concerns about crime.",
    prayer: [
      "Protection from rising crime; renewed safety in Port of Spain.",
      "Bridges of friendship and witness between Christian, Hindu, and Muslim neighbors.",
      "Just government and care for the poor.",
      "Discipleship for young adults tempted to emigrate.",
    ],
    verse: { ref: "Psalm 122:6–7", text: "Pray for the peace of Jerusalem... Peace be within your walls." },
  },
  {
    iso: "BS", name: "Bahamas",
    region: "caribbean-central-america",
    context: "Christian-majority island nation with strong Baptist and Anglican heritage. Still rebuilding from devastating hurricanes.",
    prayer: [
      "Continued recovery from Hurricane Dorian and recent storms.",
      "Discipleship for youth in tourism-driven communities.",
      "Strengthening of Baptist, Anglican, and Pentecostal churches.",
      "Care for Haitian neighbors.",
    ],
    verse: { ref: "Psalm 107:29", text: "He makes the storm a calm, so that its waves are still." },
  },

  // — More Africa —
  {
    iso: "NE", name: "Niger",
    region: "africa",
    context: "Almost entirely Muslim. Believers are very few; recent political instability and Islamist insurgency have added new pressure.",
    prayer: [
      "Boldness and protection for Niger's small church.",
      "Peace and stability after the 2023 coup.",
      "Provision for hungry families in the Sahel.",
      "Bible translation in the dozens of languages still without Scripture.",
    ],
    verse: { ref: "Matthew 5:6", text: "Blessed are those who hunger and thirst after righteousness, for they shall be filled." },
  },
  {
    iso: "BF", name: "Burkina Faso",
    region: "africa",
    context: "Significant Christian minority; one of the world's worst recent surges in jihadist violence has displaced millions and martyred many believers.",
    prayer: [
      "An end to jihadist attacks on Christian communities and pastors.",
      "Comfort for the families of believers martyred for their faith.",
      "Provision for millions of internally displaced people.",
      "Boldness for Burkinabé Christians to stay and witness.",
    ],
    verse: { ref: "Revelation 2:10", text: "Be faithful unto death, and I will give you the crown of life." },
  },
  {
    iso: "ML", name: "Mali",
    region: "africa",
    context: "Predominantly Muslim with small Christian minority; severe instability and jihadist violence across the north.",
    prayer: [
      "Peace and a path out of military rule.",
      "Protection for Christian villages and missionaries.",
      "Daily bread for displaced and hungry families.",
      "Bible translation in Mali's many languages.",
    ],
    verse: { ref: "Psalm 86:16", text: "Turn to me, and have mercy on me! Give your strength to your servant." },
  },
  {
    iso: "SN", name: "Senegal",
    region: "africa",
    context: "Stable democracy in a turbulent region; majority Muslim with small but vibrant Christian community; strong inter-religious peace.",
    prayer: [
      "Continued inter-religious peace and friendship.",
      "Bold gospel witness through Christian Senegalese.",
      "Just leadership and care for the poor.",
      "Bible translation in Wolof and the smaller languages.",
    ],
    verse: { ref: "Romans 12:18", text: "If possible, so far as it depends on you, live peaceably with all." },
  },
  {
    iso: "CI", name: "Côte d'Ivoire",
    region: "africa",
    context: "Diverse Christian, Muslim, and traditional communities; recovering from civil war; growing church across denominations.",
    prayer: [
      "Lasting peace and reconciliation.",
      "Discipleship that outpaces the rapid church growth.",
      "Honest leadership.",
      "Welcome to refugees from neighboring Sahel countries.",
    ],
    verse: { ref: "Isaiah 32:17", text: "The effect of righteousness will be peace." },
  },
  {
    iso: "SL", name: "Sierra Leone",
    region: "africa",
    context: "Predominantly Muslim with significant Christian minority; remarkable peaceful coexistence between faiths. Still healing from civil war and Ebola.",
    prayer: [
      "Continued peaceful witness between Christian and Muslim communities.",
      "Care for those still bearing trauma from civil war and Ebola.",
      "Honest government and economic recovery.",
      "Bold and gentle Christian witness in Freetown and the provinces.",
    ],
    verse: { ref: "Ephesians 2:14", text: "He himself is our peace, who has made us both one." },
  },
  {
    iso: "LR", name: "Liberia",
    region: "africa",
    context: "Christian-heritage nation rebuilding from civil war and Ebola; the church remains a central institution.",
    prayer: [
      "Continued healing and reconciliation.",
      "Strengthening of Liberian pastors.",
      "Honest government.",
      "Discipleship for young Liberians.",
    ],
    verse: { ref: "Joel 2:25", text: "I will restore to you the years that the swarming locust has eaten." },
  },
  {
    iso: "CM", name: "Cameroon",
    region: "africa",
    context: "Diverse Christian, Muslim, and traditional populations; ongoing crisis in the Anglophone regions and Boko Haram violence in the north.",
    prayer: [
      "Resolution of the Anglophone crisis.",
      "Protection from Boko Haram attacks in the Far North.",
      "Strengthening of churches caring for displaced families.",
      "Honest leadership.",
    ],
    verse: { ref: "Psalm 9:18", text: "For the needy shall not always be forgotten, nor the hope of the poor perish forever." },
  },
  {
    iso: "ZM", name: "Zambia",
    region: "africa",
    context: "Constitutionally declared a Christian nation; growing church alongside economic struggles.",
    prayer: [
      "Genuine personal faith behind the national label.",
      "Economic recovery and care for the poor.",
      "Discipleship and biblical preaching in megachurches.",
      "Honest leadership.",
    ],
    verse: { ref: "Hosea 6:6", text: "I desire mercy, and not sacrifice; and the knowledge of God more than burnt offerings." },
  },
  {
    iso: "MW", name: "Malawi",
    region: "africa",
    context: "Christian-majority nation; deep rural poverty; vibrant but under-resourced churches.",
    prayer: [
      "Provision for rural pastors and families.",
      "Resilience after cyclones and floods.",
      "Pastoral training and biblical depth.",
      "Honest government and care for the poor.",
    ],
    verse: { ref: "Psalm 41:1", text: "Blessed is he who considers the poor." },
  },
  {
    iso: "TD", name: "Chad",
    region: "africa",
    context: "Diverse Muslim, Christian, and traditional populations; chronic poverty; hosting refugees from Sudan and the Sahel.",
    prayer: [
      "Welcome and care for Sudanese refugees.",
      "Peace between Muslim and Christian neighbors.",
      "Honest leadership and protection of the vulnerable.",
      "Bible translation in dozens of unreached languages.",
    ],
    verse: { ref: "Leviticus 19:34", text: "You shall treat the stranger... as the native among you." },
  },
  {
    iso: "CF", name: "Central African Republic",
    region: "africa",
    context: "One of the poorest and most fragile nations on earth; long history of inter-communal violence; the church serves heroically.",
    prayer: [
      "Stability and an end to armed-group violence.",
      "Reconciliation between Christian and Muslim communities.",
      "Provision for the church serving on the front lines.",
      "Honest leadership and protection of the vulnerable.",
    ],
    verse: { ref: "Isaiah 61:3", text: "...to give to them a wreath of beauty instead of ashes." },
  },
  {
    iso: "BI", name: "Burundi",
    region: "africa",
    context: "Christian-majority but deeply wounded by the same ethnic divisions that marked Rwanda; the church carries the weight of healing.",
    prayer: [
      "Healing between Hutu and Tutsi communities.",
      "Honest and humble leadership.",
      "Provision for chronic rural poverty.",
      "Continued ministry of the East African Revival's children.",
    ],
    verse: { ref: "Psalm 133:1", text: "Behold, how good and how pleasant it is for brothers to dwell together in unity!" },
  },
  {
    iso: "BW", name: "Botswana",
    region: "africa",
    context: "Stable democracy with a Christian majority; significant HIV/AIDS legacy.",
    prayer: [
      "Continued healing from the HIV epidemic.",
      "Honest leadership and care for the San and other vulnerable communities.",
      "Renewal of the church's mission identity.",
      "Bold witness to neighbors across southern Africa.",
    ],
    verse: { ref: "Psalm 103:3", text: "Who forgives all your sins, who heals all your diseases." },
  },
  {
    iso: "NA", name: "Namibia",
    region: "africa",
    context: "Strong Lutheran and Catholic heritage; growing evangelical communities; legacy of apartheid and the German colonial genocide still unhealed.",
    prayer: [
      "Reconciliation across racial and tribal lines.",
      "Renewal of Lutheran, Catholic, and evangelical communities.",
      "Honest leadership and economic justice.",
      "Witness to Owambo, Herero, Damara, and San communities.",
    ],
    verse: { ref: "Psalm 85:10", text: "Mercy and truth meet together. Righteousness and peace have kissed each other." },
  },

  // — More Europe —
  {
    iso: "IE", name: "Ireland",
    region: "europe",
    context: "Long-Catholic island wrestling with the legacy of clerical abuse and rapid secularization. Quiet renewal stirring in places.",
    prayer: [
      "Genuine repentance and reform after abuse scandals.",
      "Renewal of Irish Catholic and Protestant communities together.",
      "Healing of Northern Ireland's sectarian wounds.",
      "Bold and gentle witness in Dublin and the cities.",
    ],
    verse: { ref: "Psalm 51:10", text: "Create in me a clean heart, O God." },
  },
  {
    iso: "PT", name: "Portugal",
    region: "europe",
    context: "Historically Catholic; rapidly secularizing; small but growing evangelical and Brazilian-immigrant churches.",
    prayer: [
      "Spiritual hunger across a secular nation.",
      "Strengthening of evangelical fellowships.",
      "Renewal of Portuguese Catholic life.",
      "Bridges between Portuguese and Brazilian-immigrant churches.",
    ],
    verse: { ref: "Acts 13:49", text: "The word of the Lord was spread abroad throughout all the region." },
  },
  {
    iso: "NO", name: "Norway",
    region: "europe",
    context: "Cultural Lutheran heritage with a deeply secular present; pockets of free-church and immigrant-church vitality.",
    prayer: [
      "Awakening across a deeply secular generation.",
      "Renewal of the Lutheran church.",
      "Strengthening of free-church and immigrant communities.",
      "Bold witness in workplaces.",
    ],
    verse: { ref: "Isaiah 49:18", text: "Lift up your eyes around, and see..." },
  },
  {
    iso: "FI", name: "Finland",
    region: "europe",
    context: "Lutheran heritage with rapid secularization; growing immigrant and free-church communities.",
    prayer: [
      "Spiritual awakening in Finnish cities.",
      "Renewal of Lutheran congregations.",
      "Strengthening of free-church and Pentecostal communities.",
      "Ministry to refugees and asylum-seekers.",
    ],
    verse: { ref: "Psalm 130:5", text: "I wait for the Lord. My soul waits. I hope in his word." },
  },
  {
    iso: "CH", name: "Switzerland",
    region: "europe",
    context: "Land of Calvin and Zwingli; today divided between cultural Protestantism, cultural Catholicism, and a small but vital evangelical church.",
    prayer: [
      "Renewal of Reformed and Catholic Christianity.",
      "Strengthening of evangelical fellowships.",
      "Just stewardship of Swiss wealth and influence.",
      "Bold witness across linguistic regions.",
    ],
    verse: { ref: "Habakkuk 2:14", text: "The earth will be filled with the knowledge of the glory of the Lord." },
  },
  {
    iso: "AT", name: "Austria",
    region: "europe",
    context: "Cultural Catholic nation with low practice; a small but committed evangelical community.",
    prayer: [
      "Renewal of personal faith in Austrian Catholicism.",
      "Growth of healthy evangelical congregations.",
      "Wise navigation of immigration questions.",
      "Bold witness in Vienna and the universities.",
    ],
    verse: { ref: "Psalm 24:7", text: "Lift up your heads, you gates! Be lifted up, you everlasting doors, and the King of glory will come in!" },
  },
  {
    iso: "BE", name: "Belgium",
    region: "europe",
    context: "Historically Catholic; deeply secular today; small but growing evangelical communities, especially among African-immigrant believers.",
    prayer: [
      "Renewal across Catholic, Reformed, and evangelical communities.",
      "Strengthening of African-immigrant churches.",
      "Bold witness in Brussels and across the EU institutions.",
      "Healing of linguistic and political divisions.",
    ],
    verse: { ref: "Galatians 6:9", text: "Let us not be weary in doing good." },
  },
  {
    iso: "CZ", name: "Czechia",
    region: "europe",
    context: "One of the most atheistic populations in Europe; small but persevering Christian remnant.",
    prayer: [
      "Spiritual hunger among a deeply secular people.",
      "Strengthening of small Czech evangelical communities.",
      "Renewal of historic Catholic and Hussite traditions.",
      "Bold and gentle witness in Prague.",
    ],
    verse: { ref: "Isaiah 35:1", text: "The wilderness and the dry land will be glad. The desert will rejoice and blossom like a rose." },
  },
  {
    iso: "HU", name: "Hungary",
    region: "europe",
    context: "Cultural Christian heritage strong; personal faith varied; significant Reformed and Catholic communities.",
    prayer: [
      "Renewal of personal faith inside cultural Christianity.",
      "Welcome to the stranger, including refugees.",
      "Strengthening of Reformed, Catholic, and evangelical communities.",
      "Wise leadership.",
    ],
    verse: { ref: "Matthew 25:35", text: "I was a stranger and you welcomed me." },
  },

  // — More Asia —
  {
    iso: "SG", name: "Singapore",
    region: "southeast-asia",
    context: "Religiously diverse city-state with significant Christian minority that punches above its weight in regional and global mission.",
    prayer: [
      "Continued mission-sending from Singaporean churches.",
      "Discipleship in a high-pressure professional culture.",
      "Bridges to Muslim, Buddhist, and Hindu neighbors.",
      "Genuine humility behind material prosperity.",
    ],
    verse: { ref: "1 Corinthians 4:7", text: "What do you have that you didn't receive?" },
  },
  {
    iso: "BN", name: "Brunei",
    region: "southeast-asia",
    context: "Small majority-Muslim sultanate; Sharia law applies; expatriate believers worship under restrictions.",
    prayer: [
      "Religious-freedom reforms.",
      "Wisdom and courage for expatriate Christians.",
      "Dreams and encounters with Jesus among Bruneians.",
      "Wisdom for the Sultan.",
    ],
    verse: { ref: "Acts 17:26–27", text: "He... determined the boundaries of their dwelling, that they should seek the Lord, if perhaps they might reach out for him and find him." },
  },
  {
    iso: "MV", name: "Maldives",
    region: "south-asia",
    context: "Almost entirely Muslim by constitution; no public Christian witness allowed; tiny secret church.",
    prayer: [
      "Religious-freedom reforms.",
      "Courage and protection for Maldivian believers.",
      "Dreams and visions of Jesus among Maldivian people.",
      "Resilience as climate change threatens the islands themselves.",
    ],
    verse: { ref: "Psalm 139:9–10", text: "If I take the wings of the dawn, and settle in the uttermost parts of the sea, even there your hand will lead me." },
  },
  {
    iso: "BT", name: "Bhutan",
    region: "south-asia",
    context: "Buddhist Himalayan kingdom; small underground Bhutanese church; legal restrictions on Christian gathering.",
    prayer: [
      "Religious-freedom reforms.",
      "Courage and growth for the underground Bhutanese church.",
      "Bible translation in Dzongkha and minority languages.",
      "Wise leadership of the king and government.",
    ],
    verse: { ref: "Isaiah 42:3", text: "He won't break a bruised reed. He won't quench a dimly burning wick." },
  },
  {
    iso: "TJ", name: "Tajikistan",
    region: "central-eurasia",
    context: "Majority Muslim post-Soviet state; small Christian minority under tight legal restrictions.",
    prayer: [
      "Religious-freedom reforms.",
      "Boldness for Tajik believers from Muslim background.",
      "Healthy underground house churches.",
      "Provision for migrant workers in Russia and their families.",
    ],
    verse: { ref: "Psalm 27:14", text: "Wait for the Lord. Be strong, and let your heart take courage." },
  },
  {
    iso: "TM", name: "Turkmenistan",
    region: "central-eurasia",
    context: "One of the world's most closed societies; small Turkmen church under heavy state surveillance.",
    prayer: [
      "Courage and life for Turkmen believers.",
      "Freedom of worship and conscience.",
      "Wise and just leadership.",
      "Continued underground discipleship.",
    ],
    verse: { ref: "John 16:33", text: "In the world you have trouble; but cheer up! I have overcome the world." },
  },
  {
    iso: "KG", name: "Kyrgyzstan",
    region: "central-eurasia",
    context: "Majority Muslim with a small but growing Kyrgyz-speaking church; new restrictive laws threaten religious freedom.",
    prayer: [
      "Religious-freedom protection.",
      "Boldness for Kyrgyz believers.",
      "Bible translation and discipleship in Kyrgyz.",
      "Honest leadership.",
    ],
    verse: { ref: "Matthew 5:10", text: "Blessed are those who have been persecuted for righteousness' sake, for theirs is the Kingdom of Heaven." },
  },

  // — More Oceania —
  {
    iso: "SB", name: "Solomon Islands",
    region: "oceania",
    context: "Christian-majority Pacific nation with strong Anglican, Catholic, and evangelical communities; vulnerable to climate change and geopolitical pressure.",
    prayer: [
      "Wise navigation of geopolitical pressure.",
      "Resilience as seas rise.",
      "Renewal of Anglican, Catholic, and evangelical churches.",
      "Bible translation in the dozens of local languages.",
    ],
    verse: { ref: "Psalm 65:5", text: "By awesome deeds of righteousness you answer us, God of our salvation." },
  },
  {
    iso: "VU", name: "Vanuatu",
    region: "oceania",
    context: "Strongly Christian Pacific nation; faces severe climate vulnerability.",
    prayer: [
      "Resilience as cyclones and rising seas threaten communities.",
      "Strengthening of Presbyterian, Anglican, and evangelical churches.",
      "Bible translation in many island languages.",
      "Honest leadership.",
    ],
    verse: { ref: "Genesis 9:13", text: "I set my rainbow in the cloud, and it will be a sign of a covenant between me and the earth." },
  },
  {
    iso: "WS", name: "Samoa",
    region: "oceania",
    context: "Christianity is woven into the fabric of national life; deep church involvement in every village.",
    prayer: [
      "Genuine personal faith behind cultural Christianity.",
      "Renewal of pastors and village ministers (matai).",
      "Care for Samoans abroad and the families left behind.",
      "Resilience against climate change.",
    ],
    verse: { ref: "Joshua 24:15", text: "As for me and my house, we will serve the Lord." },
  },
  {
    iso: "TO", name: "Tonga",
    region: "oceania",
    context: "Christian-majority Pacific kingdom with deep Methodist heritage and active Catholic and Mormon presences.",
    prayer: [
      "Genuine renewal in Tongan Methodist and other churches.",
      "Wise and just leadership of the king and parliament.",
      "Care for those still recovering from the 2022 tsunami and volcano.",
      "Strengthening of Tongan mission work across the Pacific.",
    ],
    verse: { ref: "Psalm 95:5", text: "The sea is his, and he made it. His hands formed the dry land." },
  },

  // ─── EXPANSION: REMAINING UN MEMBER STATES ─────────────────────
  // Adding every UN-recognized country we hadn't yet covered, so the
  // rotation truly walks through the whole world.

  // ── Sub-Saharan Africa (additional) ──
  {
    iso: "BJ", name: "Benin",
    region: "africa",
    context: "Birthplace of Vodun (Voodoo); growing evangelical witness alongside Catholic and traditional religion. Religious freedom is genuine; the deeper struggle is spiritual.",
    prayer: [
      "Deliverance for those bound by occult practices and ancestral fear.",
      "Multiplication of healthy local churches across rural areas.",
      "Stable democratic transitions and integrity in public office.",
      "Bible translation completion in remaining minority languages.",
    ],
    verse: { ref: "Colossians 2:15", text: "He disarmed the principalities and the powers, and made a show of them openly, triumphing over them in it." },
  },
  {
    iso: "CG", name: "Republic of the Congo",
    region: "africa",
    context: "Capital Brazzaville; majority Christian but with widespread syncretism and post-conflict trauma from civil wars in the 1990s.",
    prayer: [
      "Healing of war wounds and reconciliation between ethnic groups.",
      "Pastors equipped to teach the Word against syncretism and prosperity teaching.",
      "Care for the urban poor in Brazzaville and Pointe-Noire.",
      "Justice and humility in government; an end to corruption.",
    ],
    verse: { ref: "2 Corinthians 5:18", text: "All things are of God, who reconciled us to himself through Jesus Christ." },
  },
  {
    iso: "CV", name: "Cabo Verde",
    region: "africa",
    context: "Ten-island archipelago off West Africa; Catholic majority with Protestant minority. Stable democracy; large diaspora in Europe and the Americas.",
    prayer: [
      "Spiritual renewal across the islands; faith that is more than cultural.",
      "Care for families separated by emigration.",
      "The Cabo Verdean church reaching the unreached in Lusophone Africa.",
      "Resilience in the face of drought and rising sea levels.",
    ],
    verse: { ref: "Isaiah 42:10", text: "Sing to Yahweh a new song, and his praise from the end of the earth, you who go down to the sea, and all that is therein!" },
  },
  {
    iso: "DJ", name: "Djibouti",
    region: "africa",
    context: "Tiny strategic Horn-of-Africa nation; 94% Muslim, less than 1% Christian. Religious freedom limited; converts face family pressure.",
    prayer: [
      "Courage and shelter for the small body of believers.",
      "Open doors for relief workers and medical missionaries.",
      "The Djiboutian government as it hosts foreign military bases.",
      "Dreams and visions drawing seekers to Christ.",
    ],
    verse: { ref: "Acts 2:17", text: "Your young men will see visions. Your old men will dream dreams." },
  },
  {
    iso: "GA", name: "Gabon",
    region: "africa",
    context: "Largely Christian by census; deep syncretism with Bwiti and traditional religion. Oil wealth has not reached the poor.",
    prayer: [
      "Genuine conversion to Christ from cultural Christianity and syncretism.",
      "Stable post-coup transition (2023) and just governance.",
      "Protection of the Pygmy peoples and their gospel access.",
      "Care for the equatorial forests and the people who depend on them.",
    ],
    verse: { ref: "Ezekiel 36:26", text: "I will give you a new heart, and I will put a new spirit within you." },
  },
  {
    iso: "GM", name: "The Gambia",
    region: "africa",
    context: "West Africa's smallest mainland nation; 95% Muslim, small Christian minority. After more than two decades of autocratic rule that ended in 2017, democratic reform is fragile.",
    prayer: [
      "Continued democratic reform and the strengthening of civic institutions.",
      "Friendship between Muslims and Christians; gospel through neighborly love.",
      "Care for migrants returning from the perilous European route.",
      "Strengthening of small mission churches across the river country.",
    ],
    verse: { ref: "Matthew 5:9", text: "Blessed are the peacemakers, for they shall be called children of God." },
  },
  {
    iso: "GN", name: "Guinea",
    region: "africa",
    context: "Majority Muslim (~85%); Christian minority concentrated in the forest region. Recurrent coups; recovering from Ebola.",
    prayer: [
      "Stable civilian government and respect for human rights.",
      "Healing for communities scarred by Ebola and intercommunal violence.",
      "Multiplication of Fulani-speaking believers and translators.",
      "Education and gospel access in the forest region.",
    ],
    verse: { ref: "Psalm 72:12", text: "He will deliver the needy when he cries; the poor, who has no helper." },
  },
  {
    iso: "GQ", name: "Equatorial Guinea",
    region: "africa",
    context: "Spanish-speaking; oil-rich but the wealth is concentrated. One of Africa's longest-serving regimes; restricted civil liberties.",
    prayer: [
      "Just distribution of resources and an end to entrenched corruption.",
      "Freedom for the church to preach and gather without state interference.",
      "Health care for the Bioko Island population.",
      "Renewal among the youth who feel they have no future.",
    ],
    verse: { ref: "Proverbs 14:34", text: "Righteousness exalts a nation, but sin is a disgrace to any people." },
  },
  {
    iso: "GW", name: "Guinea-Bissau",
    region: "africa",
    context: "Lusophone; mixed Muslim, traditional, and Christian; severe political instability and narco-trafficking pressure.",
    prayer: [
      "Stable democratic governance and an end to coups.",
      "Disruption of the cocaine transit trade that corrupts officials.",
      "Equipping pastors across small village congregations.",
      "Bible translation in remaining minority languages.",
    ],
    verse: { ref: "Isaiah 33:22", text: "Yahweh is our judge. Yahweh is our lawgiver. Yahweh is our king. He will save us." },
  },
  {
    iso: "KM", name: "Comoros",
    region: "africa",
    context: "Indian Ocean archipelago; 98% Muslim. Apostasy from Islam is criminalized; converts meet in tiny clandestine fellowships.",
    prayer: [
      "Protection for the handful of indigenous believers.",
      "Open hearts in the families of those who follow Christ.",
      "Wisdom for expatriate workers serving in business and medicine.",
      "Stable, just government across the three islands.",
    ],
    verse: { ref: "2 Timothy 2:9", text: "The word of God is not chained." },
  },
  {
    iso: "LS", name: "Lesotho",
    region: "africa",
    context: "Mountain kingdom surrounded by South Africa; predominantly Christian with severe HIV/AIDS burden.",
    prayer: [
      "Continued progress against HIV; care for AIDS orphans and widows.",
      "Strong family life and an end to gender-based violence.",
      "Stable parliamentary politics and clean governance.",
      "The Basotho church sending workers across southern Africa.",
    ],
    verse: { ref: "Psalm 121:1–2", text: "I will lift up my eyes to the hills. Where does my help come from? My help comes from Yahweh." },
  },
  {
    iso: "MR", name: "Mauritania",
    region: "africa",
    context: "An Islamic Republic where conversion from Islam carries the death penalty in law. The handful of indigenous believers live in extreme caution.",
    prayer: [
      "The unnamed Mauritanian believers — courage, shelter, fellowship.",
      "Repeal of laws criminalizing conversion.",
      "An end to the remaining vestiges of slavery and caste oppression.",
      "Dreams of Jesus among the Berber and Arab peoples.",
    ],
    verse: { ref: "John 8:36", text: "If therefore the Son makes you free, you will be free indeed." },
  },
  {
    iso: "MU", name: "Mauritius",
    region: "africa",
    context: "Indian Ocean island; multi-religious — Hindu majority, Christian and Muslim minorities. Stable democracy; growing tourism.",
    prayer: [
      "Inter-religious peace and respect across communities.",
      "Strong, missional Christian witness amid material prosperity.",
      "Care for the Chagossian community displaced from Diego Garcia.",
      "Reaching the Bhojpuri- and Creole-speaking peoples with the Word.",
    ],
    verse: { ref: "Revelation 7:9", text: "A great multitude, which no man could count, out of every nation and of all tribes, peoples, and languages." },
  },
  {
    iso: "SC", name: "Seychelles",
    region: "africa",
    context: "Indian Ocean archipelago; Catholic majority. Tourism-dependent; growing prosperity and secularization.",
    prayer: [
      "Spiritual depth beneath the surface of religious tradition.",
      "Care for migrant workers in tourism and fisheries.",
      "Protection of marine ecosystems entrusted to this nation.",
      "Renewed missionary heart among Seychellois Christians.",
    ],
    verse: { ref: "Psalm 24:1", text: "The earth is Yahweh's, with its fullness; the world, and those who dwell therein." },
  },
  {
    iso: "ST", name: "São Tomé and Príncipe",
    region: "africa",
    context: "Two small equatorial islands; Catholic majority with growing evangelical witness. Economy depends on cocoa, oil prospects, and tourism.",
    prayer: [
      "Just stewardship of any future oil revenues.",
      "Multiplication of evangelical churches across both islands.",
      "Care for poor families in the cocoa plantations.",
      "Bible literacy in Portuguese and the creole forros.",
    ],
    verse: { ref: "Acts 1:8", text: "You will be my witnesses … to the uttermost parts of the earth." },
  },
  {
    iso: "SZ", name: "Eswatini",
    region: "africa",
    context: "Africa's last absolute monarchy; predominantly Christian, struggling with HIV burden and limited political reform.",
    prayer: [
      "Wisdom, conscience, and openness to reform among the king and traditional leaders.",
      "Continued progress against HIV/AIDS; orphans cared for.",
      "Voice and dignity for ordinary Swazis seeking accountable government.",
      "Healthy churches that disciple rather than entertain.",
    ],
    verse: { ref: "Proverbs 21:1", text: "The king's heart is in Yahweh's hand like the watercourses. He turns it wherever he desires." },
  },
  {
    iso: "TG", name: "Togo",
    region: "africa",
    context: "Predominantly Christian (~50%) with significant Muslim and traditional populations. Long-ruling political dynasty; limited political opening.",
    prayer: [
      "Genuine democratic space and freedom of the press.",
      "Discipling depth across rapidly growing evangelical churches.",
      "Care for trafficked Togolese children and women.",
      "Believers in the Muslim-majority north reaching their neighbors.",
    ],
    verse: { ref: "Psalm 33:12", text: "Blessed is the nation whose God is Yahweh." },
  },

  // ── North Africa & Middle East (additional) ──
  {
    iso: "AE", name: "United Arab Emirates",
    region: "north-africa-middle-east",
    context: "Federation of seven emirates; majority foreign workers from the Indian subcontinent, Philippines, and elsewhere. Expatriate Christian gatherings are tolerated; outreach to Emiratis is forbidden.",
    prayer: [
      "Migrant workers — fair treatment, gospel community among Filipino, Indian, Pakistani, and African believers.",
      "Continued limited religious freedom for the expatriate church.",
      "Emirati hearts opened to Christ through dreams, friendship, and the gospel quietly carried home.",
      "Wisdom and humility for the rulers as the country leads regional diplomacy.",
    ],
    verse: { ref: "Isaiah 19:25", text: "Blessed be Egypt my people, Assyria the work of my hands, and Israel my inheritance." },
  },
  {
    iso: "BH", name: "Bahrain",
    region: "north-africa-middle-east",
    context: "Small Gulf island kingdom; Muslim majority (mixed Sunni–Shia tension) with old expatriate Christian community.",
    prayer: [
      "Healing of Sunni–Shia divisions and just treatment of the Shia majority.",
      "Strength of the expatriate church serving migrant workers.",
      "Continued goodwill toward Christian institutions and hospitals.",
      "Bahraini believers — few and quiet — for protection and growth.",
    ],
    verse: { ref: "Ephesians 2:14", text: "He is our peace, who made both one, and broke down the middle wall of partition." },
  },
  {
    iso: "KW", name: "Kuwait",
    region: "north-africa-middle-east",
    context: "Wealthy Gulf monarchy; vibrant expatriate church alongside Kuwaiti Muslim majority. Outreach to citizens illegal.",
    prayer: [
      "Migrant workers in Kuwait — Filipinos, Indians, Africans — to find living Christ-centered fellowship.",
      "Protection for Kuwaiti citizens who turn to Christ.",
      "Wisdom for the Emir and parliament; just labor reform.",
      "Continued safe space for the gathered expatriate church.",
    ],
    verse: { ref: "Matthew 11:28", text: "Come to me, all you who labor and are heavily burdened, and I will give you rest." },
  },
  {
    iso: "OM", name: "Oman",
    region: "north-africa-middle-east",
    context: "Ibadi Muslim majority with reputation for moderation; small but real expatriate church community.",
    prayer: [
      "Continued religious openness under the new Sultan.",
      "Omani believers — known only to the Lord — for courage and community.",
      "Just treatment of migrant domestic workers.",
      "The Arabic-speaking gospel reaching the interior.",
    ],
    verse: { ref: "Habakkuk 2:14", text: "The earth will be filled with the knowledge of the glory of Yahweh, as the waters cover the sea." },
  },
  {
    iso: "QA", name: "Qatar",
    region: "north-africa-middle-east",
    context: "Wealthy Gulf state; small Qatari Muslim population and huge migrant workforce. Christian compound in Doha allows expatriate worship.",
    prayer: [
      "Migrant workers — humane treatment, gospel access, fair wages.",
      "The expatriate church and its quiet witness in the region.",
      "Wisdom for Qatari leaders in regional diplomacy.",
      "Qatari Christians — for safety and growth.",
    ],
    verse: { ref: "Galatians 3:28", text: "There is neither Jew nor Greek, there is neither slave nor free man, there is neither male nor female; for you are all one in Christ Jesus." },
  },

  // ── Europe (additional) ──
  {
    iso: "AD", name: "Andorra",
    region: "europe",
    context: "Tiny Pyrenees principality; Catholic heritage, deeply secularized.",
    prayer: [
      "Awakening from cultural Christianity to living faith in Christ.",
      "A vibrant local evangelical witness.",
      "Care for migrant workers in tourism and finance.",
      "Wisdom for the co-princes and parliament.",
    ],
    verse: { ref: "Hosea 6:3", text: "Let us know, let us follow on to know Yahweh." },
  },
  {
    iso: "AL", name: "Albania",
    region: "europe",
    context: "After decades of forced atheism under Hoxha, Albania is mostly Muslim with growing Orthodox, Catholic, and evangelical communities. Genuine inter-religious peace.",
    prayer: [
      "Continued growth of evangelical churches planted since 1991.",
      "Discipling depth in a generation raised without faith.",
      "Continued inter-religious peace and cooperation.",
      "Justice for the rural poor and an end to corruption.",
    ],
    verse: { ref: "Isaiah 9:2", text: "The people who walked in darkness have seen a great light." },
  },
  {
    iso: "BA", name: "Bosnia and Herzegovina",
    region: "europe",
    context: "Still healing from the 1990s war; complex ethnic-religious mosaic (Bosniak Muslim, Croat Catholic, Serb Orthodox) under a fragile constitutional structure.",
    prayer: [
      "Reconciliation between Bosniak, Croat, and Serb communities.",
      "Healthy local evangelical churches across all three communities.",
      "An end to corruption that drives young people to emigrate.",
      "Justice and remembrance for the victims of Srebrenica.",
    ],
    verse: { ref: "Psalm 85:10", text: "Mercy and truth meet together. Righteousness and peace have kissed each other." },
  },
  {
    iso: "BG", name: "Bulgaria",
    region: "europe",
    context: "Orthodox heritage with significant Muslim Pomak and Turkish minorities; secularized after communism but with growing Roma evangelical movements.",
    prayer: [
      "Renewal of the Orthodox Church and dialogue with evangelicals.",
      "The Roma evangelical movement — one of Europe's most vibrant — for depth and leaders.",
      "Care for the elderly poor in shrinking rural villages.",
      "Wisdom amid the demographic crisis and emigration.",
    ],
    verse: { ref: "Isaiah 58:12", text: "You will be called Repairer of the Breach, Restorer of Paths to Dwell In." },
  },
  {
    iso: "BY", name: "Belarus",
    region: "europe",
    context: "Authoritarian state; mixed Orthodox and Catholic populations; severe political repression since 2020.",
    prayer: [
      "Justice and release for prisoners of conscience.",
      "Courage for Belarusian believers — Orthodox, Catholic, Protestant — who have stood with the oppressed.",
      "Wisdom for those in exile carrying gospel hope back to their homeland.",
      "Peace in the region and an end to the suffering caused by war.",
    ],
    verse: { ref: "Psalm 146:7", text: "Yahweh frees the prisoners." },
  },
  {
    iso: "CY", name: "Cyprus",
    region: "europe",
    context: "Divided island — Greek Orthodox south, Turkish Muslim north — since 1974. Long-standing Anglican and small evangelical presence.",
    prayer: [
      "Reunification or just settlement honored by both peoples.",
      "Renewal of the Orthodox Church and evangelistic outreach.",
      "Care for refugees crossing through Cyprus into Europe.",
      "Bridges of friendship between Greek and Turkish Cypriots.",
    ],
    verse: { ref: "Ephesians 2:14", text: "He is our peace, who made both one." },
  },
  {
    iso: "DK", name: "Denmark",
    region: "europe",
    context: "Lutheran state church on paper, deeply secular in practice. Small but growing immigrant and evangelical congregations.",
    prayer: [
      "Renewal of the Folkekirke and a return to apostolic preaching.",
      "Multiplication of evangelical churches in the cities.",
      "Welcome and gospel access for Middle Eastern refugees.",
      "Care for the elderly in a graying society.",
    ],
    verse: { ref: "Jeremiah 6:16", text: "Stand in the ways and see, and ask for the old paths, where the good way is, and walk in it." },
  },
  {
    iso: "EE", name: "Estonia",
    region: "europe",
    context: "One of Europe's most secular nations; Lutheran heritage largely faded under Soviet decades and post-Soviet drift.",
    prayer: [
      "Spiritual hunger awakened in a digital-secular generation.",
      "Renewal of the Estonian Lutheran and Orthodox churches.",
      "Multiplication of small evangelical fellowships in Tallinn and Tartu.",
      "Wisdom amid Russian-border tensions.",
    ],
    verse: { ref: "John 4:14", text: "Whoever drinks of the water that I will give him will never thirst." },
  },
  {
    iso: "HR", name: "Croatia",
    region: "europe",
    context: "Predominantly Catholic; recovering from the 1990s war and from population emigration to the EU.",
    prayer: [
      "Spiritual renewal in the Catholic Church and growing evangelical voices.",
      "Reconciliation with Serb neighbors a generation after the war.",
      "Care for the young families staying in shrinking towns.",
      "Just integration of returning diaspora and welcome of new migrants.",
    ],
    verse: { ref: "2 Corinthians 5:19", text: "God was in Christ reconciling the world to himself." },
  },
  {
    iso: "IS", name: "Iceland",
    region: "europe",
    context: "Lutheran state church; one of Europe's most post-Christian cultures yet with new spiritual openness in some quarters.",
    prayer: [
      "Renewal of the Lutheran church and faithful pastoral preaching.",
      "Small Pentecostal and free-church works for growth.",
      "Care for migrant fishers and Polish workers.",
      "Spiritual hunger in a prosperous, secular generation.",
    ],
    verse: { ref: "Acts 17:27", text: "He is not far from each one of us." },
  },
  {
    iso: "LI", name: "Liechtenstein",
    region: "europe",
    context: "Tiny Alpine principality; predominantly Catholic, deeply secularized, financial-services-dependent.",
    prayer: [
      "Living faith beneath inherited church culture.",
      "Just financial reform and transparency.",
      "Care for migrant workers from Eastern Europe.",
      "Small evangelical fellowships for growth.",
    ],
    verse: { ref: "Matthew 6:24", text: "You cannot serve God and Mammon." },
  },
  {
    iso: "LT", name: "Lithuania",
    region: "europe",
    context: "Strongly Catholic by heritage, more practicing than its Baltic neighbors; growing Pentecostal and evangelical witness.",
    prayer: [
      "Faithful Catholic priests and parish renewal.",
      "Multiplication of evangelical congregations in Vilnius, Kaunas, Klaipėda.",
      "Wisdom amid Russian-border anxiety.",
      "Care for elderly Lithuanians and the rural poor.",
    ],
    verse: { ref: "2 Chronicles 7:14", text: "If my people who are called by my name will humble themselves, pray, and seek my face, and turn from their wicked ways, then I will hear from heaven, will forgive their sin, and will heal their land." },
  },
  {
    iso: "LU", name: "Luxembourg",
    region: "europe",
    context: "Wealthy multi-cultural microstate; Catholic heritage with deep secularization and large immigrant population.",
    prayer: [
      "Renewal of inherited Christian culture into living faith.",
      "Just treatment of asylum seekers and migrant workers.",
      "A gospel witness in EU institutions headquartered here.",
      "Multiplication of small house churches.",
    ],
    verse: { ref: "Matthew 5:14", text: "You are the light of the world." },
  },
  {
    iso: "LV", name: "Latvia",
    region: "europe",
    context: "Mixed Lutheran, Catholic, and Orthodox heritages; deeply secular after Soviet decades; large Russian-speaking minority.",
    prayer: [
      "Reconciliation between Latvian-speaking and Russian-speaking communities.",
      "Renewal of all three historic churches and growth of evangelical works.",
      "Care for the elderly and the rural poor.",
      "Wisdom amid Russian-border tensions and demographic decline.",
    ],
    verse: { ref: "Romans 12:18", text: "If it is possible, as much as it is up to you, be at peace with all men." },
  },
  {
    iso: "MC", name: "Monaco",
    region: "europe",
    context: "Tiny coastal principality; Catholic heritage; tax-haven prosperity and extreme inequality with the world beyond its borders.",
    prayer: [
      "Conviction over the ways wealth is gained and held.",
      "A faithful Catholic parish life and small evangelical fellowships.",
      "Care for the workers who serve the wealthy.",
      "Wisdom and humility for the ruling Grimaldi family.",
    ],
    verse: { ref: "1 Timothy 6:17", text: "Charge those who are rich in this present age that they not be haughty." },
  },
  {
    iso: "MD", name: "Moldova",
    region: "europe",
    context: "Europe's poorest country; Orthodox majority, growing Pentecostal and Baptist churches; tensions between EU integration and Russian-leaning Transnistria.",
    prayer: [
      "Justice and just government; an end to oligarchic corruption.",
      "Faithful Orthodox priests and growing evangelical communities.",
      "Care for families separated by emigration to the EU.",
      "Peaceful resolution of the Transnistria question.",
    ],
    verse: { ref: "Psalm 9:9", text: "Yahweh will also be a high tower for the oppressed; a high tower in times of trouble." },
  },
  {
    iso: "ME", name: "Montenegro",
    region: "europe",
    context: "Small Adriatic country; mixed Orthodox, Catholic, and Muslim populations; recent NATO member; deep ethnic-religious sensitivities.",
    prayer: [
      "Peace between Serbian Orthodox and Montenegrin Orthodox communities.",
      "Care for the small Muslim Albanian and Bosniak populations.",
      "Justice and clean governance in a corruption-prone post-socialist state.",
      "Multiplication of small evangelical churches.",
    ],
    verse: { ref: "Psalm 133:1", text: "Behold, how good and how pleasant it is for brothers to dwell together in unity!" },
  },
  {
    iso: "MK", name: "North Macedonia",
    region: "europe",
    context: "Mixed Macedonian Orthodox majority and significant Albanian Muslim minority; long-standing inter-communal tensions easing.",
    prayer: [
      "Peace between Macedonian and Albanian communities.",
      "Renewal of the Macedonian Orthodox Church and Albanian Muslim openness to Christ.",
      "Care for the Roma community.",
      "Healthy local evangelical churches.",
    ],
    verse: { ref: "Acts 16:9", text: "Come over into Macedonia and help us!" },
  },
  {
    iso: "MT", name: "Malta",
    region: "europe",
    context: "Catholic island nation on the Mediterranean migrant route; deep historical Christian roots (Paul shipwrecked here, Acts 28); secularizing rapidly.",
    prayer: [
      "Care for migrants and refugees crossing from North Africa.",
      "Renewal of the Catholic Church to its New Testament roots.",
      "Multiplication of evangelical fellowships across the islands.",
      "Wisdom amid debates on religious freedom and family life.",
    ],
    verse: { ref: "Acts 28:1–2", text: "When we had escaped, then they learned that the island was called Malta. The natives showed us uncommon kindness." },
  },
  {
    iso: "RO", name: "Romania",
    region: "europe",
    context: "Orthodox majority with strong evangelical movement (Romania has the largest evangelical population in Eastern Europe). Significant emigration to the West.",
    prayer: [
      "The Romanian evangelical movement — for theological depth and missions.",
      "Renewal of the Romanian Orthodox Church.",
      "Care for the Roma community across Eastern Europe.",
      "Strong family life for Romanians scattered across the EU.",
    ],
    verse: { ref: "Isaiah 60:1", text: "Arise, shine; for your light has come, and Yahweh's glory has risen on you!" },
  },
  {
    iso: "RS", name: "Serbia",
    region: "europe",
    context: "Serbian Orthodox majority; still navigating the legacy of the 1990s wars; complex relations with Kosovo and Bosnia.",
    prayer: [
      "Reconciliation with Kosovo, Bosnia, and Croatia.",
      "Renewal of the Serbian Orthodox Church.",
      "Care for the Roma community.",
      "Wisdom amid pressures from Moscow and Brussels.",
    ],
    verse: { ref: "Romans 12:18", text: "If it is possible, as much as it is up to you, be at peace with all men." },
  },
  {
    iso: "SI", name: "Slovenia",
    region: "europe",
    context: "Predominantly Catholic; rapidly secularizing; prosperous, well-governed, small.",
    prayer: [
      "Renewal of Catholic faith from cultural to living.",
      "Multiplication of evangelical fellowships in Ljubljana and beyond.",
      "Care for refugees passing through the Balkan route.",
      "Stewardship of natural beauty and political integrity.",
    ],
    verse: { ref: "Psalm 19:1", text: "The heavens declare the glory of God." },
  },
  {
    iso: "SK", name: "Slovakia",
    region: "europe",
    context: "Strongly Catholic by tradition; evangelical and Reformed minorities; growing political polarization.",
    prayer: [
      "Faithful Catholic preaching and lay renewal movements.",
      "Care for the Roma community across Slovakia.",
      "Healthy political discourse and an end to corruption.",
      "Welcoming Ukrainian refugees who fled across the border.",
    ],
    verse: { ref: "Micah 6:8", text: "What does Yahweh require of you, but to act justly, to love mercy, and to walk humbly with your God?" },
  },
  {
    iso: "SM", name: "San Marino",
    region: "europe",
    context: "Tiny Catholic enclave in central Italy; deep medieval Christian heritage; secularizing.",
    prayer: [
      "Living faith beneath ancient inherited culture.",
      "Stable, just self-government.",
      "Care for visitors and pilgrims.",
      "Spiritual depth in the parishes.",
    ],
    verse: { ref: "Psalm 90:1", text: "Lord, you have been our dwelling place for all generations." },
  },
  {
    iso: "VA", name: "Vatican City",
    region: "europe",
    context: "Smallest sovereign state; spiritual home of 1.3 billion Catholics; world center of Christian charitable, doctrinal, and diplomatic work.",
    prayer: [
      "The Pope and the Catholic episcopate — wisdom, courage, and Christ-centered preaching.",
      "Faithful reform in the Curia and the worldwide Catholic Church.",
      "Care for victims of clergy abuse and just accountability.",
      "Christian unity across Catholic, Orthodox, and Protestant communions (John 17:20–23).",
    ],
    verse: { ref: "John 17:21", text: "That they may all be one; even as you, Father, are in me, and I in you, that they also may be one in us." },
  },
  {
    iso: "XK", name: "Kosovo",
    region: "europe",
    context: "Albanian-majority Muslim with significant Serbian Orthodox minority; partial international recognition; young, hopeful, scarred.",
    prayer: [
      "Peace and just resolution between Pristina and Belgrade.",
      "Protection of Serbian Orthodox monasteries (UNESCO sites).",
      "Open hearts in the Albanian Muslim majority to Christ.",
      "Care for the young — Europe's youngest population — and their economic future.",
    ],
    verse: { ref: "Isaiah 32:17", text: "The work of righteousness will be peace, and the effect of righteousness, quietness and confidence forever." },
  },

  // ── Caribbean & Central America (additional) ──
  {
    iso: "AG", name: "Antigua and Barbuda",
    region: "caribbean-central-america",
    context: "Twin-island Caribbean nation; Anglican and Methodist heritage; tourism-dependent.",
    prayer: [
      "Renewal of inherited Christian culture into living faith.",
      "Care for the rebuilding from hurricane damage.",
      "Just labor practices in the tourism sector.",
      "Multiplication of small Bible-teaching churches.",
    ],
    verse: { ref: "Psalm 89:9", text: "You rule the pride of the sea. When its waves rise up, you calm them." },
  },
  {
    iso: "BB", name: "Barbados",
    region: "caribbean-central-america",
    context: "Anglican heritage; deeply churched culture yet secularizing in the young; strong educational tradition.",
    prayer: [
      "Renewal of the Anglican Church and growing evangelical works.",
      "Care for the rural poor and elderly.",
      "Spiritual depth in the next generation.",
      "Continued political stability and just governance.",
    ],
    verse: { ref: "Psalm 100:1–2", text: "Shout for joy to Yahweh, all you lands! Serve Yahweh with gladness." },
  },
  {
    iso: "BZ", name: "Belize",
    region: "caribbean-central-america",
    context: "Central American nation with Caribbean culture; Catholic majority with strong Protestant minorities; growing Mennonite agricultural communities.",
    prayer: [
      "Care for the Mayan poor in the south.",
      "Cooperation across Catholic, Protestant, and Mennonite communities.",
      "An end to gang violence in Belize City.",
      "Care for Central American migrants passing through.",
    ],
    verse: { ref: "Psalm 67:1–2", text: "May God be merciful to us, bless us, and cause his face to shine on us, that your way may be known on earth, your salvation among all nations." },
  },
  {
    iso: "CR", name: "Costa Rica",
    region: "caribbean-central-america",
    context: "Central America's most stable democracy; Catholic and growing evangelical Christian majority; large Nicaraguan refugee population.",
    prayer: [
      "Continued stability, peace, and care for the environment.",
      "Welcome and gospel for Nicaraguan refugees.",
      "Discipling depth in fast-growing evangelical churches.",
      "Just family policies in a culture under cultural shift.",
    ],
    verse: { ref: "Hebrews 13:2", text: "Don't forget to show hospitality to strangers, for in doing so, some have entertained angels without knowing it." },
  },
  {
    iso: "DM", name: "Dominica",
    region: "caribbean-central-america",
    context: "Mountainous Caribbean island; Catholic majority; vulnerable to hurricanes; small Kalinago indigenous community.",
    prayer: [
      "Resilience in the face of repeated hurricane devastation.",
      "Care for the Kalinago indigenous community.",
      "Renewal of the Catholic Church and small evangelical works.",
      "Stable governance and economic recovery.",
    ],
    verse: { ref: "Nahum 1:7", text: "Yahweh is good, a stronghold in the day of trouble; and he knows those who take refuge in him." },
  },
  {
    iso: "GD", name: "Grenada",
    region: "caribbean-central-america",
    context: "Spice island; Catholic and Anglican heritage; small, devout, tourism-dependent.",
    prayer: [
      "Renewal of inherited Christian culture into living faith.",
      "Care for poor families and at-risk youth.",
      "Stewardship of natural beauty and marine ecosystems.",
      "Stable democratic governance.",
    ],
    verse: { ref: "James 1:17", text: "Every good gift and every perfect gift is from above, coming down from the Father of lights." },
  },
  {
    iso: "HN", name: "Honduras",
    region: "caribbean-central-america",
    context: "Catholic and growing evangelical population; gang violence drives emigration; political instability since the 2009 coup.",
    prayer: [
      "An end to gang violence and protection of families.",
      "Care for migrants and refugees fleeing north.",
      "Just government and an end to corruption.",
      "Strong, biblical evangelical churches across the country.",
    ],
    verse: { ref: "Psalm 9:9", text: "Yahweh will also be a high tower for the oppressed; a high tower in times of trouble." },
  },
  {
    iso: "KN", name: "Saint Kitts and Nevis",
    region: "caribbean-central-america",
    context: "Smallest sovereign state in the Americas; Anglican and Methodist heritage; small population.",
    prayer: [
      "Living faith beneath inherited Christian culture.",
      "Care for the youth and the next generation of leaders.",
      "Stable, just self-government.",
      "Stewardship of the islands' natural resources.",
    ],
    verse: { ref: "Zechariah 4:10", text: "Who has despised the day of small things?" },
  },
  {
    iso: "LC", name: "Saint Lucia",
    region: "caribbean-central-america",
    context: "Volcanic Caribbean island; Catholic majority; Creole and English-speaking; tourism-dependent.",
    prayer: [
      "Renewal of the Catholic Church and growth of evangelical works.",
      "Care for the rural poor and at-risk youth.",
      "Healing for families wounded by violence.",
      "Stewardship of natural beauty.",
    ],
    verse: { ref: "Isaiah 26:3", text: "You will keep whoever's mind is steadfast in perfect peace, because he trusts in you." },
  },
  {
    iso: "NI", name: "Nicaragua",
    region: "caribbean-central-america",
    context: "Catholic and evangelical majority; the government has restricted church life and expelled clergy and missionaries since 2018.",
    prayer: [
      "Protection for Catholic and evangelical leaders facing pressure.",
      "Restoration of religious freedom and freedom of assembly.",
      "Comfort for families of prisoners of conscience and those in exile.",
      "A just and peaceful future for the nation.",
    ],
    verse: { ref: "Acts 5:29", text: "We must obey God rather than men." },
  },
  {
    iso: "PA", name: "Panama",
    region: "caribbean-central-america",
    context: "Catholic and growing evangelical population; strategic canal nation; significant Caribbean and Chinese diasporas.",
    prayer: [
      "Just stewardship of the Canal and its revenues.",
      "Care for migrants crossing the Darién Gap on foot.",
      "Discipling depth across rapidly growing evangelical churches.",
      "An end to corruption and money laundering.",
    ],
    verse: { ref: "Proverbs 11:1", text: "A false balance is an abomination to Yahweh, but accurate weights are his delight." },
  },
  {
    iso: "SV", name: "El Salvador",
    region: "caribbean-central-america",
    context: "Catholic and growing evangelical majority; recovering from civil war and gang violence; sweeping recent security measures and mass detentions.",
    prayer: [
      "Justice and due process for those detained.",
      "Healing of families torn apart by gang violence and emigration.",
      "Strong, biblical evangelical churches.",
      "Wisdom and restraint for those in authority as the nation rebuilds.",
    ],
    verse: { ref: "Isaiah 1:17", text: "Learn to do well. Seek justice. Relieve the oppressed. Defend the fatherless. Plead for the widow." },
  },
  {
    iso: "VC", name: "Saint Vincent and the Grenadines",
    region: "caribbean-central-america",
    context: "Caribbean island chain; Anglican and Methodist heritage; vulnerable to volcanic eruption and hurricane.",
    prayer: [
      "Recovery from the 2021 La Soufrière eruption.",
      "Care for the Garifuna and Carib indigenous communities.",
      "Renewal of inherited Christian culture into living faith.",
      "Stewardship of marine ecosystems.",
    ],
    verse: { ref: "Psalm 46:1–2", text: "God is our refuge and strength, a very present help in trouble. Therefore we won't be afraid, though the earth changes." },
  },

  // ── South America (additional) ──
  {
    iso: "GY", name: "Guyana",
    region: "south-america",
    context: "English-speaking South American nation; Hindu, Christian, Muslim, and indigenous populations; recent oil boom transforming the economy.",
    prayer: [
      "Just stewardship of the new oil wealth.",
      "Care for the indigenous Amerindian communities.",
      "Strong inter-religious peace among Hindu, Christian, and Muslim communities.",
      "An end to political tribalism along ethnic lines.",
    ],
    verse: { ref: "Deuteronomy 8:18", text: "You shall remember Yahweh your God, for it is he who gives you power to get wealth." },
  },
  {
    iso: "SR", name: "Suriname",
    region: "south-america",
    context: "Dutch-speaking South American nation; remarkable mix of Christian, Hindu, Muslim, and traditional populations living peacefully.",
    prayer: [
      "Continued inter-religious peace as a model for the world.",
      "Care for the Maroon and Amerindian communities in the interior.",
      "Just stewardship of forest resources.",
      "Multiplication of healthy evangelical churches.",
    ],
    verse: { ref: "Psalm 67:4", text: "Let the nations be glad and sing for joy, for you will judge the peoples with equity." },
  },

  // ── Asia (additional) ──
  {
    iso: "TL", name: "Timor-Leste",
    region: "southeast-asia",
    context: "Independent since 2002; predominantly Catholic; recovering from Indonesian occupation and the violence that surrounded the independence vote.",
    prayer: [
      "Healing of the trauma of occupation and the 1999 violence.",
      "Care for the rural poor in mountain villages.",
      "Renewal of the Catholic Church into living, biblical faith.",
      "Just stewardship of new oil and gas revenues.",
    ],
    verse: { ref: "Isaiah 61:1", text: "He has sent me to bind up the brokenhearted, to proclaim liberty to the captives." },
  },

  // ── Oceania (additional) ──
  {
    iso: "FM", name: "Micronesia (Federated States)",
    region: "oceania",
    context: "Hundreds of Pacific islands; predominantly Christian (Catholic and Protestant); climate change is an existential threat.",
    prayer: [
      "Wisdom and resilience facing rising seas and stronger storms.",
      "Faithful local pastors across remote islands.",
      "Care for migrants relocating to Guam and the US mainland.",
      "Just relationship with the United States under the Compact.",
    ],
    verse: { ref: "Psalm 93:4", text: "Above the voices of many waters, the mighty breakers of the sea, Yahweh on high is mighty." },
  },
  {
    iso: "KI", name: "Kiribati",
    region: "oceania",
    context: "Coral atolls scattered across the equator; predominantly Catholic and Protestant; among the most vulnerable nations to rising seas.",
    prayer: [
      "The very future of the nation as the seas rise.",
      "Faithful churches across the dispersed islands.",
      "Care for the I-Kiribati diaspora relocating to Fiji and New Zealand.",
      "Continued unity and hope under existential threat.",
    ],
    verse: { ref: "Revelation 21:1", text: "I saw a new heaven and a new earth … and the sea is no more." },
  },
  {
    iso: "MH", name: "Marshall Islands",
    region: "oceania",
    context: "Coral atolls in the central Pacific; predominantly Protestant (UCCJ heritage from American missionaries); nuclear-testing legacy.",
    prayer: [
      "Healing of the nuclear-testing legacy at Bikini and Enewetak.",
      "Resilience facing rising seas and US-relationship anxiety.",
      "Faithful local pastors and renewal in the historic churches.",
      "Care for Marshallese living in Arkansas and elsewhere in the US.",
    ],
    verse: { ref: "Isaiah 43:2", text: "When you pass through the waters, I will be with you." },
  },
  {
    iso: "NR", name: "Nauru",
    region: "oceania",
    context: "World's smallest island republic; Protestant and Catholic majority; once-mined phosphate left ecological scars; controversial refugee detention history.",
    prayer: [
      "Healing of the ecological wounds from phosphate mining.",
      "Care for asylum seekers held on Nauru by Australia.",
      "Renewal of the historic churches.",
      "Wisdom in rebuilding a sustainable economy.",
    ],
    verse: { ref: "Joel 2:25", text: "I will restore to you the years that the swarming locust has eaten." },
  },
  {
    iso: "PW", name: "Palau",
    region: "oceania",
    context: "Stunning Pacific archipelago; predominantly Christian (Catholic and Protestant); reliant on US compact funding.",
    prayer: [
      "Stewardship of one of the world's healthiest marine ecosystems.",
      "Faithful local churches and renewal of the historic denominations.",
      "Care for the youth tempted by emigration.",
      "Just relationships in the Indo-Pacific.",
    ],
    verse: { ref: "Genesis 1:31", text: "God saw everything that he had made, and, behold, it was very good." },
  },
  {
    iso: "TV", name: "Tuvalu",
    region: "oceania",
    context: "Nine coral atolls; predominantly Protestant (Church of Tuvalu); among the most threatened nations on earth by rising seas.",
    prayer: [
      "The literal survival of the nation as the seas rise.",
      "Faithful local churches across the scattered atolls.",
      "Care for the Tuvaluan diaspora and those preparing to relocate.",
      "Climate justice from the world's high-emitting nations.",
    ],
    verse: { ref: "Psalm 102:25–27", text: "Of old, you laid the foundation of the earth … They will perish, but you will endure … You are the same. Your years will have no end." },
  },

  // ─── EXPANSION: INHABITED DEPENDENT TERRITORIES ────────────────
  // The ISO 3166-1 list runs to 249 entries because it also names
  // inhabited dependent territories — places that are not sovereign
  // states but have real populations, real churches, and distinct
  // prayer needs (Hong Kong's pressured pastors, Greenland's
  // Lutheran Inuit, Puerto Rico after Maria, Réunion's Indian-Ocean
  // Christianity, the Sahrawi people). Uninhabited codes
  // (Antarctica, Bouvet Island, French Southern Territories) are
  // intentionally excluded — there is no one there to pray for.

  // ── East Asia (Special Administrative Regions) ──
  {
    iso: "HK", name: "Hong Kong",
    region: "east-asia",
    context: "Special Administrative Region of China. Roughly 12% Christian, with deep influence through hospitals, schools, and missions. Pastors and churches navigate a tightening environment of self-censorship.",
    prayer: [
      "Courage and wisdom for pastors weighing what to preach and what to publish.",
      "Justice and mercy for Christian leaders and citizens held under national-security charges.",
      "The Hong Kong missionary movement — still one of Asia's largest senders.",
      "Reconciliation and hope for families separated by emigration.",
    ],
    verse: { ref: "Acts 5:29", text: "We must obey God rather than men." },
  },
  {
    iso: "MO", name: "Macau",
    region: "east-asia",
    context: "Former Portuguese colony, now a Chinese SAR. Catholic heritage, casinos dominate the economy, small but real Christian minority among migrant workers and locals.",
    prayer: [
      "Liberation for those bound by gambling addiction.",
      "Just treatment of migrant workers in the service economy.",
      "Continued openness for Macanese churches and the Catholic diocese.",
      "Bridges of fellowship between local Cantonese-speaking believers and Filipino, Indonesian, and Mainland migrants.",
    ],
    verse: { ref: "1 Timothy 6:10", text: "The love of money is a root of all kinds of evil." },
  },

  // ── Caribbean dependencies & overseas departments ──
  {
    iso: "PR", name: "Puerto Rico",
    region: "caribbean-central-america",
    context: "US territory of 3+ million. Catholic majority with very strong Pentecostal and evangelical movements. Recovering from Hurricane Maria (2017), a long debt crisis, and ongoing emigration to the US mainland.",
    prayer: [
      "Continued rebuilding from Maria, Fiona, and the chronic power-grid crisis.",
      "Just resolution of the debt crisis and the political-status question.",
      "The Puerto Rican evangelical movement — one of Latin America's most missional.",
      "Strong families and an end to the cycle of emigration.",
    ],
    verse: { ref: "Isaiah 61:3", text: "Beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness." },
  },
  {
    iso: "AW", name: "Aruba",
    region: "caribbean-central-america",
    context: "Dutch Caribbean constituent country; Catholic majority, tourism-dependent, stable and prosperous.",
    prayer: [
      "Living faith beneath comfortable cultural Christianity.",
      "Care for migrant workers and the small undocumented community.",
      "Stewardship of the marine environment.",
      "Multiplication of small evangelical fellowships.",
    ],
    verse: { ref: "Revelation 3:17", text: "You say, 'I am rich,' … and don't know that you are the wretched one, miserable, poor, blind, and naked." },
  },
  {
    iso: "CW", name: "Curaçao",
    region: "caribbean-central-america",
    context: "Dutch Caribbean constituent country with the oldest Jewish community in the Americas (Mikvé Israel-Emanuel). Catholic majority with growing Protestant churches; oil refinery and financial-services economy.",
    prayer: [
      "Care for the historic Jewish community and Christian–Jewish friendship.",
      "Just stewardship of refinery and offshore finance.",
      "Welcome for Venezuelan refugees fleeing across the strait.",
      "Multiplication of healthy Papiamento-speaking churches.",
    ],
    verse: { ref: "Psalm 122:6", text: "Pray for the peace of Jerusalem. Those who love you will prosper." },
  },
  {
    iso: "SX", name: "Sint Maarten",
    region: "caribbean-central-america",
    context: "Dutch half of the small island shared with French Saint-Martin. Catholic and Protestant; rebuilding from devastating Hurricane Irma (2017).",
    prayer: [
      "Continued rebuilding from hurricane devastation.",
      "Unity across the Dutch and French sides of the island.",
      "Care for migrant workers in tourism.",
      "Strong, biblical local churches.",
    ],
    verse: { ref: "Psalm 46:1–3", text: "God is our refuge and strength, a very present help in trouble." },
  },
  {
    iso: "BQ", name: "Bonaire, Sint Eustatius and Saba",
    region: "caribbean-central-america",
    context: "Three Dutch Caribbean special municipalities. Mix of Catholic and Protestant; very small populations, strong church life, fragile economies.",
    prayer: [
      "Stewardship of the world-class coral reefs around Bonaire.",
      "Faithful small congregations across all three islands.",
      "Care for the indigenous and Afro-Caribbean populations.",
      "Just relationships with the Netherlands.",
    ],
    verse: { ref: "Zechariah 4:10", text: "Who has despised the day of small things?" },
  },
  {
    iso: "KY", name: "Cayman Islands",
    region: "caribbean-central-america",
    context: "British Overseas Territory; major offshore financial center; mixed Christian denominations; strong church-going culture.",
    prayer: [
      "Conscience and integrity in the offshore financial industry.",
      "Care for the youth tempted by easy wealth.",
      "Continued churchgoing matched by personal faith in Christ.",
      "Resilience facing hurricane risk and rising seas.",
    ],
    verse: { ref: "Matthew 6:19–21", text: "Where your treasure is, there your heart will be also." },
  },
  {
    iso: "TC", name: "Turks and Caicos",
    region: "caribbean-central-america",
    context: "British Overseas Territory; Baptist majority with strong Methodist and other Protestant churches; tourism and offshore finance economy.",
    prayer: [
      "Faithful preaching in the historic Baptist churches.",
      "Care for Haitian and Dominican migrants.",
      "Just stewardship of finance and tourism.",
      "Stable governance and an end to corruption.",
    ],
    verse: { ref: "Proverbs 22:1", text: "A good name is more desirable than great riches, and loving favor is better than silver and gold." },
  },
  {
    iso: "BM", name: "Bermuda",
    region: "caribbean-central-america",
    context: "British Overseas Territory in the North Atlantic; Anglican heritage with significant Methodist, Catholic, and other churches; major insurance and financial-services center.",
    prayer: [
      "Renewal of the historic Anglican Church.",
      "Just integration of Portuguese, Caribbean, and other minority communities.",
      "Healing of racial inequities rooted in the colonial past.",
      "Conscience and integrity in the insurance and reinsurance industry.",
    ],
    verse: { ref: "Galatians 3:28", text: "There is neither Jew nor Greek … for you are all one in Christ Jesus." },
  },
  {
    iso: "AI", name: "Anguilla",
    region: "caribbean-central-america",
    context: "British Overseas Territory; Anglican, Methodist, and Pentecostal heritage; small population, strong community church life.",
    prayer: [
      "Strong, biblical local churches across the island.",
      "Care for the youth and the next generation of leaders.",
      "Resilience facing hurricane risk.",
      "Stable, just self-government.",
    ],
    verse: { ref: "1 Corinthians 3:11", text: "No one can lay any other foundation than that which has been laid, which is Jesus Christ." },
  },
  {
    iso: "MS", name: "Montserrat",
    region: "caribbean-central-america",
    context: "British Overseas Territory still recovering from the 1995–97 volcanic eruption that destroyed the capital Plymouth and displaced two-thirds of the population. Anglican and other Christian heritage.",
    prayer: [
      "Healing for a community scattered by volcanic disaster.",
      "Care for the diaspora in Britain and the Caribbean.",
      "Rebuilding hope for those who returned to Montserrat.",
      "Faithful churches in this small population.",
    ],
    verse: { ref: "Isaiah 58:12", text: "You will be called Repairer of the Breach, Restorer of Paths to Dwell In." },
  },
  {
    iso: "VG", name: "British Virgin Islands",
    region: "caribbean-central-america",
    context: "British Overseas Territory; Methodist, Anglican, and Pentecostal heritage; tourism and offshore finance economy.",
    prayer: [
      "Conscience and integrity in offshore finance.",
      "Renewal of the historic churches.",
      "Care for migrant workers and the rural poor.",
      "Resilience facing hurricane risk.",
    ],
    verse: { ref: "Amos 5:24", text: "Let justice roll on like rivers, and righteousness like a mighty stream." },
  },
  {
    iso: "VI", name: "U.S. Virgin Islands",
    region: "caribbean-central-america",
    context: "US unincorporated territory; rich Protestant heritage including Moravian, Lutheran, Methodist, and Anglican, with the Caribbean's oldest Protestant church traditions; rebuilding from 2017 hurricanes.",
    prayer: [
      "Rebuilding from Hurricanes Irma and Maria.",
      "Renewal of the historic Moravian and Lutheran churches.",
      "Care for the rural poor and undocumented workers.",
      "Just relationship with the United States and the path forward on status.",
    ],
    verse: { ref: "Zechariah 8:4–5", text: "Old men and old women shall dwell in the streets of Jerusalem … and the streets shall be full of boys and girls playing." },
  },
  {
    iso: "GP", name: "Guadeloupe",
    region: "caribbean-central-america",
    context: "French overseas department in the Caribbean; Catholic majority with growing evangelical Christianity; high unemployment and ongoing protests over French rule and the legacy of chlordecone pesticide poisoning.",
    prayer: [
      "Health and justice for those poisoned by chlordecone.",
      "Renewal of the Catholic Church and growth of evangelical churches.",
      "Reconciliation between Guadeloupe and metropolitan France.",
      "Care for the youth amid high unemployment.",
    ],
    verse: { ref: "Psalm 9:18", text: "The needy shall not always be forgotten, nor the hope of the poor perish forever." },
  },
  {
    iso: "MQ", name: "Martinique",
    region: "caribbean-central-america",
    context: "French overseas department; Catholic majority; birthplace of Aimé Césaire and Frantz Fanon; similar chlordecone and political-status struggles to Guadeloupe.",
    prayer: [
      "Health and justice for those poisoned by chlordecone.",
      "Renewal of the Catholic Church and growth of evangelical churches.",
      "Just resolution of the political-status question.",
      "Care for the elderly and the youth tempted by emigration.",
    ],
    verse: { ref: "Psalm 72:4", text: "He will judge the poor of the people. He will save the children of the needy." },
  },
  {
    iso: "MF", name: "Saint Martin (French part)",
    region: "caribbean-central-america",
    context: "French overseas collectivity sharing the island with Dutch Sint Maarten. Catholic majority; rebuilding from Hurricane Irma; tourism-dependent.",
    prayer: [
      "Continued rebuilding from hurricane devastation.",
      "Cross-border cooperation with the Dutch side of the island.",
      "Care for migrant workers and the undocumented.",
      "Strong, biblical local churches.",
    ],
    verse: { ref: "Nehemiah 2:18", text: "Let's rise up and build." },
  },
  {
    iso: "BL", name: "Saint Barthélemy",
    region: "caribbean-central-america",
    context: "French Caribbean island; small population; Catholic heritage; one of the world's most concentrated wealth destinations.",
    prayer: [
      "Conscience and humility among the wealthy who vacation here.",
      "Care for service workers who make tourism possible.",
      "Stewardship of the natural beauty.",
      "Faithful small churches across the island.",
    ],
    verse: { ref: "James 5:1–4", text: "Come now, you rich, weep and howl for your miseries that are coming on you." },
  },

  // ── Atlantic & European dependencies ──
  {
    iso: "GL", name: "Greenland",
    region: "north-america",
    context: "Autonomous Danish territory; 56,000 people, majority Indigenous Inuit; Lutheran Church of Greenland is the state church; pushing toward eventual independence as climate change exposes the island.",
    prayer: [
      "The Inuit people — protection of culture, language, and faith.",
      "Renewal of the Lutheran Church into living, biblical preaching.",
      "Healing of the trauma of colonial-era forced separations.",
      "Wisdom amid climate change, melting ice, and resource pressure.",
    ],
    verse: { ref: "Psalm 147:16–17", text: "He gives snow like wool, and scatters frost like ashes. He hurls down his hail like pebbles." },
  },
  {
    iso: "FO", name: "Faroe Islands",
    region: "europe",
    context: "Autonomous Danish territory in the North Atlantic. One of the most strongly Lutheran nations on earth, with significant Brethren and Pentecostal movements; fishing and aquaculture economy.",
    prayer: [
      "Faithful Lutheran and free-church preaching across the islands.",
      "Wisdom amid debates on whale-hunting traditions.",
      "Care for the youth tempted to leave for Denmark.",
      "Continued spiritual depth in a deeply church-going culture.",
    ],
    verse: { ref: "Acts 1:8", text: "You will be my witnesses … to the uttermost parts of the earth." },
  },
  {
    iso: "AX", name: "Åland Islands",
    region: "europe",
    context: "Autonomous Swedish-speaking region of Finland in the Baltic Sea. Lutheran heritage; deeply secularized; protected demilitarized status since 1856.",
    prayer: [
      "Renewal of inherited Lutheran culture into living faith.",
      "Care for the elderly and the youth in shrinking villages.",
      "Continued peaceful demilitarized status as a small witness.",
      "Multiplication of small evangelical fellowships.",
    ],
    verse: { ref: "Isaiah 2:4", text: "They shall beat their swords into plowshares, and their spears into pruning hooks." },
  },
  {
    iso: "SJ", name: "Svalbard and Jan Mayen",
    region: "europe",
    context: "Norwegian Arctic territories. Tiny scattered populations of researchers, miners, and the world's northernmost church (Svalbard Kirke in Longyearbyen).",
    prayer: [
      "The lone northernmost Lutheran congregation.",
      "Stewardship of one of Earth's most fragile environments.",
      "International scientific cooperation in a tense Arctic.",
      "Spiritual hunger for the small, transient population.",
    ],
    verse: { ref: "Job 37:6", text: "He says to the snow, 'Fall on the earth,' likewise to the shower of rain." },
  },
  {
    iso: "IM", name: "Isle of Man",
    region: "europe",
    context: "British Crown dependency in the Irish Sea; Anglican and Methodist heritage; offshore financial center; ancient Celtic Christian roots through Manx missionaries.",
    prayer: [
      "Conscience and integrity in offshore finance.",
      "Renewal of Manx-language Christian heritage.",
      "Care for the elderly in this aging population.",
      "Strong, biblical churches across the parishes.",
    ],
    verse: { ref: "Proverbs 11:1", text: "A false balance is an abomination to Yahweh, but accurate weights are his delight." },
  },
  {
    iso: "JE", name: "Jersey",
    region: "europe",
    context: "British Crown dependency in the Channel; Anglican and Methodist heritage; large offshore financial sector; deep ties to both Britain and France.",
    prayer: [
      "Conscience and integrity in offshore finance.",
      "Care for migrant workers from Portugal and Poland.",
      "Renewal of the Anglican and Methodist churches.",
      "Healing of the recent care-home abuse legacy.",
    ],
    verse: { ref: "Luke 12:48", text: "To whomever much is given, of him will much be required." },
  },
  {
    iso: "GG", name: "Guernsey",
    region: "europe",
    context: "British Crown dependency in the Channel; Anglican and Methodist heritage; offshore finance and tourism.",
    prayer: [
      "Conscience and integrity in offshore finance.",
      "Care for the elderly in this aging community.",
      "Renewal of inherited Christian culture into living faith.",
      "Resilience for the small islands of Alderney, Sark, and Herm.",
    ],
    verse: { ref: "Psalm 139:9–10", text: "If I take the wings of the dawn, and settle in the uttermost parts of the sea, even there your hand will lead me." },
  },
  {
    iso: "GI", name: "Gibraltar",
    region: "europe",
    context: "British Overseas Territory at the southern tip of Spain; Catholic and Anglican heritage; long-contested sovereignty with Spain; Brexit has complicated everything.",
    prayer: [
      "Just resolution of the sovereignty question.",
      "Cooperation across the Gibraltar–Spain border.",
      "Renewal of the historic Catholic and Anglican churches.",
      "Care for the small Jewish and Muslim communities and inter-faith friendship.",
    ],
    verse: { ref: "Psalm 18:2", text: "Yahweh is my rock, my fortress, and my deliverer." },
  },
  {
    iso: "FK", name: "Falkland Islands",
    region: "south-america",
    context: "British Overseas Territory in the South Atlantic; Anglican heritage; tiny population; long-contested sovereignty with Argentina (the 1982 war).",
    prayer: [
      "Just resolution of the sovereignty question.",
      "Healing of the wounds of the 1982 war on both sides.",
      "Faithful local Anglican and Catholic churches.",
      "Stewardship of one of the world's great penguin and seabird sanctuaries.",
    ],
    verse: { ref: "Isaiah 9:6", text: "His name will be called … Prince of Peace." },
  },
  {
    iso: "GF", name: "French Guiana",
    region: "south-america",
    context: "French overseas department on the South American mainland; Catholic majority with growing evangelical and Pentecostal churches; site of the Guiana Space Centre; rainforest covers 96% of the territory.",
    prayer: [
      "Care for the indigenous Wayãpi, Wayana, and other peoples.",
      "Gospel access for the Maroon and Hmong communities.",
      "Renewal of the Catholic Church and growth of evangelical works.",
      "Just stewardship of the Amazon and the gold-mining frontier.",
    ],
    verse: { ref: "Psalm 24:1", text: "The earth is Yahweh's, with its fullness." },
  },
  {
    iso: "PM", name: "Saint Pierre and Miquelon",
    region: "north-america",
    context: "Tiny French territorial collectivity off the coast of Newfoundland. Catholic majority; declining fishing economy; deep French Atlantic heritage.",
    prayer: [
      "Faithful Catholic parish life in a remote outpost.",
      "Care for the elderly in a shrinking population.",
      "Just transition from cod fishing to a sustainable economy.",
      "Strong family life and welcome of visitors.",
    ],
    verse: { ref: "John 21:6", text: "Cast the net on the right side of the boat, and you will find some." },
  },
  {
    iso: "SH", name: "Saint Helena, Ascension and Tristan da Cunha",
    region: "africa",
    context: "British Overseas Territory in the South Atlantic; three remote islands totaling fewer than 5,000 people; Anglican and Baptist heritage; Tristan is the most remote inhabited island on earth.",
    prayer: [
      "Faithful local churches across all three islands.",
      "Care for the small Tristan community after the 2024 sinking of supply ships.",
      "Stewardship of marine ecosystems including some of the world's largest fish reserves.",
      "Continued strong family life and inter-island fellowship.",
    ],
    verse: { ref: "Isaiah 41:5", text: "The islands have seen, and fear. The ends of the earth tremble." },
  },

  // ── Africa (additional territories) ──
  {
    iso: "RE", name: "Réunion",
    region: "africa",
    context: "French overseas department in the Indian Ocean; Catholic majority with significant Hindu and Muslim minorities; volcanic island of about 870,000.",
    prayer: [
      "Continued inter-religious peace among Christians, Hindus, and Muslims.",
      "Renewal of the Catholic Church and growth of evangelical churches.",
      "Care for the rural poor and Comorian migrants.",
      "Stewardship of the active volcano Piton de la Fournaise and protected forests.",
    ],
    verse: { ref: "Acts 17:26", text: "He made from one blood every nation of men to dwell on all the surface of the earth." },
  },
  {
    iso: "YT", name: "Mayotte",
    region: "africa",
    context: "French overseas department in the Indian Ocean (Comoros archipelago); 95% Muslim — the only majority-Muslim French department. France's poorest department; immigration crisis from Comoros; recent devastating cyclone (2024).",
    prayer: [
      "Recovery from Cyclone Chido and the chronic housing crisis.",
      "Just treatment of undocumented Comorian migrants.",
      "Open hearts in the Muslim majority to Christ.",
      "Small Christian gatherings — for shelter, courage, and growth.",
    ],
    verse: { ref: "Matthew 25:35", text: "I was a stranger, and you took me in." },
  },
  {
    iso: "EH", name: "Western Sahara",
    region: "north-africa-middle-east",
    context: "A disputed territory most of which is occupied by Morocco. The Sahrawi people are predominantly Muslim; many live as refugees in Algerian camps; the UN-promised independence referendum has been blocked since 1991.",
    prayer: [
      "Just resolution of the disputed sovereignty and the right to self-determination.",
      "Care for Sahrawi refugees in Tindouf camps and elsewhere.",
      "Quiet gospel access among the Sahrawi people.",
      "Wisdom for Morocco, Algeria, and the UN.",
    ],
    verse: { ref: "Isaiah 30:18", text: "Therefore Yahweh will wait, that he may be gracious to you. Therefore he will be exalted, that he may have mercy on you." },
  },

  // ── Oceania (additional territories) ──
  {
    iso: "PF", name: "French Polynesia",
    region: "oceania",
    context: "French overseas collectivity of 121 islands including Tahiti; Protestant majority (Maohi Protestant Church) and Catholic minority; nuclear-testing legacy at Moruroa.",
    prayer: [
      "Healing of the nuclear-testing legacy and care for affected families.",
      "Renewal of the Maohi Protestant Church and Christian witness in Tahitian and French.",
      "Just resolution of the political-status question.",
      "Stewardship of pearl-farm ecosystems and pristine reefs.",
    ],
    verse: { ref: "Isaiah 42:10", text: "Sing to Yahweh a new song, and his praise from the end of the earth, you who go down to the sea." },
  },
  {
    iso: "NC", name: "New Caledonia",
    region: "oceania",
    context: "French overseas collectivity with a long Kanak indigenous independence movement; Catholic majority; recent (2024) protests and violence over voting reform.",
    prayer: [
      "Just resolution of the Kanak independence question.",
      "Reconciliation between Kanak, Caldoche, and other communities.",
      "Healing of recent violence and rebuilding of trust.",
      "Renewal of the historic Catholic and Protestant churches.",
    ],
    verse: { ref: "Psalm 85:10", text: "Mercy and truth meet together. Righteousness and peace have kissed each other." },
  },
  {
    iso: "GU", name: "Guam",
    region: "oceania",
    context: "US territory in the western Pacific; majority Catholic Chamorro population; large US military presence; vulnerable to typhoons and regional tensions.",
    prayer: [
      "The Chamorro people — protection of culture, language, and indigenous land rights.",
      "Care for US military families and the local population they live among.",
      "Healing from the clergy-abuse scandal that wounded the Catholic Church here.",
      "Wisdom amid US–China tensions over the Pacific.",
    ],
    verse: { ref: "Isaiah 11:11", text: "He will set his hand again the second time to recover the remnant of his people … from the islands of the sea." },
  },
  {
    iso: "AS", name: "American Samoa",
    region: "oceania",
    context: "US territory in the South Pacific; deeply Christian (Protestant majority through London Missionary Society heritage; strong Catholic and Methodist communities); strong family and church-centered culture (fa'a Samoa).",
    prayer: [
      "Renewal of the historic Congregational churches.",
      "Care for those serving in the US military — a disproportionate share comes from American Samoa.",
      "Just resolution of the citizenship question — American Samoans are the only US territorial residents without birthright citizenship.",
      "Resilience facing typhoons and rising seas.",
    ],
    verse: { ref: "Psalm 127:1", text: "Unless Yahweh builds the house, they who build it labor in vain." },
  },
  {
    iso: "MP", name: "Northern Mariana Islands",
    region: "oceania",
    context: "US commonwealth in the western Pacific; majority Catholic Chamorro and Carolinian populations; tourism and garment economy; rebuilding from typhoons.",
    prayer: [
      "Recovery from repeated typhoon damage.",
      "Care for migrant workers in tourism and agriculture.",
      "Renewal of the Catholic Church and small Protestant works.",
      "Just relationship with the United States.",
    ],
    verse: { ref: "Psalm 121:7", text: "Yahweh will keep you from all evil. He will keep your soul." },
  },
  {
    iso: "CK", name: "Cook Islands",
    region: "oceania",
    context: "Self-governing in free association with New Zealand; the Cook Islands Christian Church (CICC) is the largest denomination; strong Christian culture, declining population due to emigration.",
    prayer: [
      "Renewal of the CICC and its mission to the diaspora.",
      "Care for the Cook Islanders in New Zealand and Australia.",
      "Stewardship of one of the world's largest marine protected areas.",
      "Faithful family life and Sunday rest.",
    ],
    verse: { ref: "Genesis 1:10", text: "God called the dry land 'earth,' and the gathering together of the waters he called 'seas.' God saw that it was good." },
  },
  {
    iso: "NU", name: "Niue",
    region: "oceania",
    context: "Self-governing in free association with New Zealand; one of the world's smallest fully self-governing populations (~1,700); strong Ekalesia Kerisiano Niue (Protestant) church.",
    prayer: [
      "Faithful preaching in the Ekalesia Kerisiano Niue.",
      "Care for the much larger Niuean diaspora in New Zealand.",
      "Stewardship of marine ecosystems.",
      "The future of a nation in which more people live overseas than at home.",
    ],
    verse: { ref: "Luke 12:32", text: "Don't be afraid, little flock, for it is your Father's good pleasure to give you the Kingdom." },
  },
  {
    iso: "TK", name: "Tokelau",
    region: "oceania",
    context: "New Zealand dependency of three atolls and ~1,500 people; predominantly Congregational and Catholic; among the most climate-vulnerable communities on earth; the world's first 100% solar-powered nation.",
    prayer: [
      "The literal survival of the atolls as the seas rise.",
      "Faithful small congregations across the three atolls.",
      "Care for the diaspora in New Zealand.",
      "A model of climate stewardship continuing to inspire larger nations.",
    ],
    verse: { ref: "Isaiah 43:2", text: "When you pass through the waters, I will be with you." },
  },
  {
    iso: "WF", name: "Wallis and Futuna",
    region: "oceania",
    context: "French overseas collectivity in the South Pacific; ~11,000 people; Catholic majority; three traditional kingdoms still recognized alongside French administration.",
    prayer: [
      "Faithful Catholic parish life across the islands.",
      "Care for the diaspora in New Caledonia and metropolitan France.",
      "Wisdom for the customary kings alongside French administration.",
      "Stewardship of the marine environment.",
    ],
    verse: { ref: "Psalm 65:5", text: "By awesome deeds of righteousness, you answer us, God of our salvation, you who are the hope of all the ends of the earth." },
  },
  {
    iso: "NF", name: "Norfolk Island",
    region: "oceania",
    context: "Australian external territory in the South Pacific; descendants of the Bounty mutineers and Tahitian settlers; Anglican and Methodist heritage; recent loss of self-government to Australia.",
    prayer: [
      "Faithful local Anglican and Methodist churches.",
      "Care for the unique Pitcairn-descended community and Norf'k language.",
      "Just resolution of self-government questions with Australia.",
      "Stewardship of the surrounding waters and the Norfolk Island pine forests.",
    ],
    verse: { ref: "Psalm 16:6", text: "The lines have fallen to me in pleasant places. Yes, I have a good inheritance." },
  },
  {
    iso: "CX", name: "Christmas Island",
    region: "oceania",
    context: "Australian external territory in the Indian Ocean; mostly Buddhist and Muslim due to historic phosphate-mining migration from Malaysia; long history as an Australian asylum-seeker detention center.",
    prayer: [
      "Care for asylum seekers detained on the island.",
      "Small Christian fellowships in a religiously diverse community.",
      "Stewardship of the famous red-crab migration and tropical forests.",
      "Just resolution of Australia's offshore-detention policy.",
    ],
    verse: { ref: "Hebrews 13:3", text: "Remember the prisoners as if chained with them, and those who are mistreated, since you are also in the body." },
  },
  {
    iso: "PN", name: "Pitcairn Islands",
    region: "oceania",
    context: "British Overseas Territory; ~50 people, descendants of the Bounty mutineers and Tahitian women; Seventh-day Adventist majority for over 130 years.",
    prayer: [
      "The continued survival of this remote community.",
      "Healing from the sexual-abuse trials that wounded the community in the 2000s.",
      "Faithful Adventist witness across the island.",
      "Care for the lonely and the youth tempted to leave.",
    ],
    verse: { ref: "Matthew 18:20", text: "Where two or three are gathered together in my name, there I am in the middle of them." },
  },
  {
    iso: "CC", name: "Cocos (Keeling) Islands",
    region: "oceania",
    context: "Australian external territory in the Indian Ocean; ~600 people; predominantly Sunni Muslim Cocos Malay community settled by Clunies-Ross family in the 1800s; one of the most isolated Muslim-majority communities on earth.",
    prayer: [
      "Quiet gospel access among the Cocos Malay people.",
      "Just relationships with Australia after the colonial Clunies-Ross era.",
      "Stewardship of the coral atolls and surrounding reefs.",
      "Care for the children and youth in a tiny isolated population.",
    ],
    verse: { ref: "Acts 8:31", text: "How can I, unless someone explains it to me?" },
  },
  {
    iso: "IO", name: "British Indian Ocean Territory",
    region: "africa",
    context: "Disputed British territory; the native Chagossian people were forcibly removed in 1968–73 to make way for the US military base on Diego Garcia. The displaced community lives in Mauritius, the Seychelles, and the UK; in 2024 the UK agreed in principle to return sovereignty to Mauritius.",
    prayer: [
      "Justice and the right of return for the Chagossian people.",
      "Care for the scattered Chagossian community and their churches in Mauritius, the Seychelles, and Britain.",
      "Healing of the wounds of forced displacement.",
      "Wisdom for the UK, US, and Mauritius in the sovereignty transfer.",
    ],
    verse: { ref: "Psalm 137:1", text: "By the rivers of Babylon, there we sat down. Yes, we wept, when we remembered Zion." },
  },
];

// Day-of-rotation: a stable integer that maps each calendar day to one
// nation. Uses an absolute epoch day so the rotation continues smoothly
// across year boundaries.
const EPOCH_DAY = Math.floor(Date.UTC(2024, 0, 1) / 86400000);

export function rotationDay(d = new Date()): number {
  const here = Math.floor(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000
  );
  return here - EPOCH_DAY;
}

/** Length of the full rotation — every nation we pray for, exactly once. */
export const NATION_CYCLE_LENGTH = nations.length;

/**
 * The day-within-current-cycle, 1..NATION_CYCLE_LENGTH.
 * Use this for any "Day X of N" UI label — rotationDay() returns a raw
 * day-since-epoch counter that grows forever and is not meant for display.
 */
export function rotationCycleDay(d = new Date()): number {
  const n = nations.length;
  return (((rotationDay(d) % n) + n) % n) + 1;
}

export function nationForDay(offsetDays = 0, base = new Date()): Nation {
  const day = rotationDay(base) + offsetDays;
  // JavaScript's % can return negative for negative operands — normalize.
  const idx = ((day % nations.length) + nations.length) % nations.length;
  return nations[idx];
}

export function todaysNation(d = new Date()): Nation {
  return nationForDay(0, d);
}

export function yesterdaysNation(d = new Date()): Nation {
  return nationForDay(-1, d);
}

export function tomorrowsNation(d = new Date()): Nation {
  return nationForDay(1, d);
}

export function upcomingNations(days = 7, base = new Date()): { date: Date; nation: Nation }[] {
  const out: { date: Date; nation: Nation }[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() + i);
    out.push({ date: d, nation: nationForDay(i, base) });
  }
  return out;
}

export function findNation(iso: string): Nation | undefined {
  const id = iso.toUpperCase();
  return nations.find((n) => n.iso === id);
}

export function nationIsoToday(d = new Date()): string {
  return todaysNation(d).iso;
}

// When will the rotation next reach a given nation?
export function daysUntilNation(iso: string, base = new Date()): number {
  const target = nations.findIndex((n) => n.iso === iso.toUpperCase());
  if (target < 0) return -1;
  const todayIdx = ((rotationDay(base) % nations.length) + nations.length) % nations.length;
  let delta = target - todayIdx;
  if (delta < 0) delta += nations.length;
  return delta;
}

// Backwards-compat: kept for callers still using the old name (none now).
export function dayOfYear(d = new Date()) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const here = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.floor((here - start) / 86400000);
}
