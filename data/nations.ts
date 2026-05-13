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
      "Wisdom for President al-Sisi and stability for the region.",
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
      "Repentance and freedom for President Isaias Afwerki's government.",
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
      "Wisdom for King Salman and Crown Prince Mohammed bin Salman.",
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
      "Wisdom for President Xi Jinping and the Communist Party.",
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
];

// Day-of-year rotation: every day picks one nation. The 365-day cycle wraps
// around our dataset so each country is prayed for once every (nations.length)
// days. As the dataset grows, the cycle grows.
export function dayOfYear(d = new Date()) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const here = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.floor((here - start) / 86400000);
}

export function todaysNation(d = new Date()): Nation {
  return nations[dayOfYear(d) % nations.length];
}

export function findNation(iso: string): Nation | undefined {
  const id = iso.toUpperCase();
  return nations.find((n) => n.iso === id);
}

export function nationsByRegion(): Record<Region, Nation[]> {
  const out = {} as Record<Region, Nation[]>;
  for (const r of Object.keys(regions) as Region[]) out[r] = [];
  for (const n of nations) out[n.region].push(n);
  return out;
}
