/**
 * Jesus throughout the Scriptures, Genesis to Revelation.
 *
 * One Christ-revealing portrait for every book of the Bible. These are not
 * commentaries on the books themselves — they are answers to the one
 * question Jesus put on the Emmaus road: "And beginning at Moses and all
 * the prophets, he expounded unto them in all the scriptures the things
 * concerning himself." (Luke 24:27)
 *
 * Each entry:
 *   - headline: "Jesus is..." in one sentence
 *   - keyPassages: the specific texts that anchor the connection
 *   - body: a few short paragraphs showing how the whole book points to Christ
 *
 * Editorial: we name only what Scripture names. Where a typology is plain
 * (Passover Lamb, bronze serpent), we say so. Where it is speculative, we
 * leave it. The aim is illumination, not invention.
 */

export type CanonBookRevelation = {
  bookId: string; // matches data/bible/canon.ts id
  name: string;
  testament: "OT" | "NT";
  division:
    | "Pentateuch"
    | "History (OT)"
    | "Wisdom & Poetry"
    | "Major Prophets"
    | "Minor Prophets"
    | "Gospels"
    | "Acts"
    | "Pauline Epistles"
    | "General Epistles"
    | "Apocalypse";
  headline: string; // "Jesus is..."
  keyPassages: string[]; // refs like "Genesis 3:15"
  body: string[]; // 2–3 short paragraphs
};

export const jesusInScripture: CanonBookRevelation[] = [
  // ─────────── Pentateuch ───────────
  {
    bookId: "genesis",
    name: "Genesis",
    testament: "OT",
    division: "Pentateuch",
    headline: "Jesus is the seed of the woman who crushes the serpent.",
    keyPassages: ["Genesis 3:15", "Genesis 22:8", "Genesis 49:10"],
    body: [
      "Within four chapters of the world's beginning, the gospel is already preached. To the serpent in Eden, God promises a Seed of the woman whose heel will be bruised — and who will crush the serpent's head (Genesis 3:15). The whole of Scripture is the unfolding of that one sentence.",
      "When Abraham raises the knife over his only son and a ram appears in the thicket, we are watching a rehearsal of Calvary on Mount Moriah. \"God will provide himself a lamb,\" Abraham tells Isaac (Gen 22:8) — two thousand years before another Father climbs the same range with His only Son.",
      "Joseph — betrayed by his brothers, sold for silver, falsely accused, raised from a pit, exalted to a throne, and used by God to keep alive a people who once rejected him — is one of the clearest pre-figurations of Christ in the entire Old Testament.",
    ],
  },
  {
    bookId: "exodus",
    name: "Exodus",
    testament: "OT",
    division: "Pentateuch",
    headline: "Jesus is the Passover Lamb and the deliverer who leads His people out of bondage.",
    keyPassages: ["Exodus 12:13", "Exodus 17:6", "John 1:29", "1 Corinthians 5:7"],
    body: [
      "Israel is spared from death not by their righteousness but by the blood of a spotless lamb painted on the doorpost (Exodus 12). \"When I see the blood, I will pass over you.\" Paul will later write, plainly: \"Christ our passover is sacrificed for us\" (1 Cor 5:7).",
      "Jesus is also the Moses-greater-than-Moses — the deliverer who breaks the power that enslaves us, leads us through the waters, feeds us with bread from heaven, and gives us water from the rock that He Himself is (1 Cor 10:4).",
      "The tabernacle that closes the book — God dwelling with His people behind a veil — is the shadow. Jesus is the substance: the Word made flesh who tabernacled among us (John 1:14), the One who tore the veil in two on the cross.",
    ],
  },
  {
    bookId: "leviticus",
    name: "Leviticus",
    testament: "OT",
    division: "Pentateuch",
    headline: "Jesus is the Great High Priest and the once-for-all sacrifice every offering pointed to.",
    keyPassages: ["Leviticus 16:21", "Leviticus 17:11", "Hebrews 10:11–14"],
    body: [
      "Every offering in Leviticus — burnt, grain, peace, sin, trespass — is a finger pointing to Calvary. The blood that makes atonement for the soul on the altar (Lev 17:11) is the blood Jesus carried into the true sanctuary, His own (Heb 9:12).",
      "On the Day of Atonement, two goats are required: one slaughtered to satisfy justice, one driven into the wilderness bearing the sins of the people (Lev 16). Jesus is both — He bore our sins in His body, and He carried them away as far as the east is from the west.",
      "Leviticus is not a book Christians outgrow. It is a book that finally makes sense once you have stood at the cross.",
    ],
  },
  {
    bookId: "numbers",
    name: "Numbers",
    testament: "OT",
    division: "Pentateuch",
    headline: "Jesus is the bronze serpent lifted up that all who look may live.",
    keyPassages: ["Numbers 21:8–9", "Numbers 24:17", "John 3:14–15"],
    body: [
      "In Numbers 21, when bitten Israelites are dying in the wilderness, God commands Moses to lift up a bronze serpent on a pole. \"Everyone who is bitten, when he sees it, shall live.\" Jesus picks up this exact image to describe His cross: \"As Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up.\"",
      "Numbers also gives us Balaam's reluctant prophecy: \"A star shall come out of Jacob, a scepter shall rise out of Israel\" (24:17) — the verse that two thousand years later would draw magi from the east.",
      "The cloud, the pillar, the rock that gave water, the manna day by day — every provision of the wilderness is a portrait of the Christ who sustains His people through their own wildernesses.",
    ],
  },
  {
    bookId: "deuteronomy",
    name: "Deuteronomy",
    testament: "OT",
    division: "Pentateuch",
    headline: "Jesus is the Prophet greater than Moses, the One who kept the covenant where Israel failed.",
    keyPassages: ["Deuteronomy 18:15", "Deuteronomy 21:23", "Galatians 3:13"],
    body: [
      "Moses prophesies a coming Prophet \"like me from among your brethren — him you shall hear\" (Deut 18:15). Acts 3 will declare without hesitation: this is Jesus.",
      "Deuteronomy 21:23 places a curse on anyone who is hanged on a tree. Paul reaches into that verse to explain Calvary: \"Christ has redeemed us from the curse of the law, having become a curse for us\" (Gal 3:13). Jesus deliberately took the curse Deuteronomy named.",
      "Israel could not keep the covenant. Jesus did — perfectly, on our behalf — and gave us a new one written not on stone but on the heart.",
    ],
  },

  // ─────────── History (OT) ───────────
  {
    bookId: "joshua",
    name: "Joshua",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the true Joshua — the Captain of the Lord's army who leads His people into rest.",
    keyPassages: ["Joshua 1:5", "Joshua 5:13–15", "Hebrews 4:8–10"],
    body: [
      "\"Joshua\" and \"Jesus\" are the same Hebrew name: Yeshua — \"the Lord saves.\" The Joshua of the book leads Israel into a temporal rest. The Joshua of the New Testament leads His people into the eternal one (Heb 4).",
      "When Joshua meets the \"Commander of the army of the Lord\" outside Jericho and is told to take off his sandals, he is meeting a pre-incarnate appearance of Christ — the Captain who alone wins the battles of His people.",
      "Every wall that fell at Jericho, every Canaanite that fell at His word, says the same thing: the King who fights for His people is unstoppable.",
    ],
  },
  {
    bookId: "judges",
    name: "Judges",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the perfect Judge and Deliverer the failed judges of Israel pointed beyond themselves to.",
    keyPassages: ["Judges 2:16–18", "Judges 21:25"],
    body: [
      "The book of Judges is a relentless cycle: Israel sins, is enslaved, cries out, is delivered, forgets, sins again. Every deliverer — Gideon, Samson, Deborah, Jephthah — is broken in some way. The last verse of the book confesses the ache of every age: \"In those days there was no king in Israel; every man did what was right in his own eyes\" (21:25).",
      "Judges screams for a King who will not fail. That King is Jesus — the only Deliverer whose obedience is perfect, whose strength is not in His hair, whose courage does not falter at midnight.",
    ],
  },
  {
    bookId: "ruth",
    name: "Ruth",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the Kinsman-Redeemer who has the right and the willingness to redeem.",
    keyPassages: ["Ruth 4:9–10", "Ephesians 1:7"],
    body: [
      "Boaz redeems Ruth because three conditions are met: he is a near kinsman, he is willing, and he is able to pay the price. Jesus took on flesh to become our near Kinsman (Heb 2:14), was willing to lay down His life freely, and was rich enough to pay a debt no one else could carry.",
      "And what is the outworking of Boaz's redemption? A great-grandson named David — and a thousand years later, a child born in Bethlehem of Judah, Boaz's own town. Ruth's love story is one branch in the family tree of Christ.",
    ],
  },
  {
    bookId: "1samuel",
    name: "1 Samuel",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the anointed Shepherd-King foreshadowed in David — chosen not by sight but by the heart.",
    keyPassages: ["1 Samuel 16:7", "1 Samuel 16:13", "Matthew 1:1"],
    body: [
      "When Israel demands a king and gets Saul, they get a king after their own image — tall, impressive, externally fitting. When God chooses His king, He picks a shepherd boy no one would have called. \"The Lord looks on the heart.\"",
      "David, the anointed but not-yet-throned king, is hunted, hidden, and surrounded by the desperate and the dispossessed. The shape of his life pre-figures the shape of the greater Son of David who would also be anointed, also hunted, and also gather a kingdom of outcasts.",
    ],
  },
  {
    bookId: "2samuel",
    name: "2 Samuel",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the Son of David, heir of the throne God Himself swore would last forever.",
    keyPassages: ["2 Samuel 7:12–16", "Luke 1:32–33"],
    body: [
      "The Davidic Covenant in 2 Samuel 7 is one of the load-bearing pillars of the rest of Scripture. God swears to David: a Son will come, His throne will be established forever, and God will be His Father.",
      "Gabriel quotes 2 Samuel 7 to Mary nearly word for word in Luke 1: \"He will be great, and will be called the Son of the Most High; and the Lord God will give to him the throne of his father David… and of his kingdom there will be no end.\" Jesus is what God promised David.",
    ],
  },
  {
    bookId: "1kings",
    name: "1 Kings",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the wisdom greater than Solomon, and the true Temple-builder.",
    keyPassages: ["1 Kings 8:27", "Matthew 12:42", "John 2:19–21"],
    body: [
      "Solomon's wisdom drew rulers from the ends of the earth. Jesus said, \"a greater than Solomon is here\" (Matt 12:42). All the treasures of wisdom and knowledge are hidden in Him (Col 2:3).",
      "Solomon built a temple of stone in which the glory of God dwelt for a season. Jesus said, \"Destroy this temple, and in three days I will raise it up\" — speaking of the temple of His body (John 2:19–21). The true dwelling place of God among men is not a building but a Person.",
    ],
  },
  {
    bookId: "2kings",
    name: "2 Kings",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the King the kings of Israel and Judah failed to be — and the Healer Elisha pointed beyond himself to.",
    keyPassages: ["2 Kings 5:14", "Luke 4:27"],
    body: [
      "Kings rise and fall through 2 Kings; nearly all of them disappoint. The book ends in exile. The story screams that no human king will be enough.",
      "The prophets in 2 Kings — Elijah, Elisha — perform miracles that Jesus will repeat and exceed. Naaman dipping seven times in the Jordan is washed clean of his leprosy; we, dipped into Christ, are washed of something far deeper than skin.",
    ],
  },
  {
    bookId: "1chronicles",
    name: "1 Chronicles",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the long-promised Son of David through whom God will reign over all things.",
    keyPassages: ["1 Chronicles 17:11–14", "Revelation 22:16"],
    body: [
      "Chronicles retells Israel's history with one editorial focus: the throne of David. The covenant of 2 Samuel 7 is repeated here so the post-exilic remnant will not forget what they were promised.",
      "Even when the throne is empty and the temple lies in rubble, God has not forgotten. The line is being preserved. Jesus calls Himself \"the Root and Offspring of David, the bright Morning Star\" (Rev 22:16). Chronicles is the family tree that ends at His feet.",
    ],
  },
  {
    bookId: "2chronicles",
    name: "2 Chronicles",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the rightful Heir — the messianic line preserved through every catastrophe.",
    keyPassages: ["2 Chronicles 7:14", "2 Chronicles 36:23"],
    body: [
      "2 Chronicles tells the story of Judah's kings ending in fire and exile. But the book closes not in despair but in mid-sentence — with Cyrus's decree to rebuild. The story is unfinished. The King is still coming.",
      "Every revival, every reform, every \"if my people\" promise (7:14) is a foretaste of the greater renewal Christ will bring to a people far more broken than Judah.",
    ],
  },
  {
    bookId: "ezra",
    name: "Ezra",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the rebuilder of what was lost — restoring His people and His worship.",
    keyPassages: ["Ezra 3:11–13", "Haggai 2:9"],
    body: [
      "The exiles return and lay a foundation for a new temple. The old men who remembered Solomon's temple wept; the young men shouted. Jesus is the One in whom the rebuilding is finally finished — \"The glory of this latter house shall be greater than that of the former\" (Hag 2:9).",
      "Ezra labors to set the people right with the Word of God (Neh 8). Jesus is the Word Himself, come to do for hearts what Ezra could only do for hearings.",
    ],
  },
  {
    bookId: "nehemiah",
    name: "Nehemiah",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the One who rebuilds the walls of His people and repairs the breaches.",
    keyPassages: ["Nehemiah 2:17", "Isaiah 58:12"],
    body: [
      "Nehemiah looks at broken walls and weeps; then he goes home and prays; then he rolls up his sleeves. Jesus looks at a fallen humanity and does the same: weeps over Jerusalem, intercedes in Gethsemane, and rolls up His sleeves on the cross.",
      "What Nehemiah did for one city, Christ does for the City of God — repairing the breaches between God and man, between people and people, between us and our own peace.",
    ],
  },
  {
    bookId: "esther",
    name: "Esther",
    testament: "OT",
    division: "History (OT)",
    headline: "Jesus is the unseen King whose providence preserves His people for His purposes.",
    keyPassages: ["Esther 4:14", "Romans 8:28"],
    body: [
      "God is never named in the book of Esther. But every page is full of Him. A king's insomnia, a queen's courage, a gallows turned on the man who built it — coincidences pile up until even the most secular reader has to admit that someone is at work behind the curtain.",
      "Jesus often works the way the God of Esther works — unseen, unhurried, preserving His people through enemies who think they have the upper hand. Mordecai's whisper — \"Who knows whether you have come to the kingdom for such a time as this?\" — was already echoing toward Calvary, where another Jew of the line of David did come to a kingdom precisely for such a time as this.",
    ],
  },

  // ─────────── Wisdom & Poetry ───────────
  {
    bookId: "job",
    name: "Job",
    testament: "OT",
    division: "Wisdom & Poetry",
    headline: "Jesus is the Redeemer Job longed for — the perfect Mediator between God and man.",
    keyPassages: ["Job 9:33", "Job 19:25–27", "1 Timothy 2:5"],
    body: [
      "Job cries from the ash heap: \"There is no daysman betwixt us, that might lay his hand upon us both\" (9:33). He aches for a Mediator who can place one hand on God and one hand on man. Jesus is exactly that Mediator (1 Tim 2:5).",
      "And in his darkest chapter Job sees further than he knew: \"I know that my Redeemer lives, and at the last he will stand upon the earth… in my flesh shall I see God\" (19:25–26). A suffering man, in the silence, prophesied resurrection.",
    ],
  },
  {
    bookId: "psalms",
    name: "Psalms",
    testament: "OT",
    division: "Wisdom & Poetry",
    headline: "Jesus is the Shepherd of Psalm 23, the King of Psalm 2, the suffering Sufferer of Psalm 22, the Cornerstone of Psalm 118.",
    keyPassages: ["Psalm 2:7", "Psalm 22:1", "Psalm 23:1", "Psalm 110:1", "Psalm 118:22"],
    body: [
      "The Psalms are the prayer book Jesus prayed. He sang them on the way to the cross, He quoted Psalm 22 from the cross, He pointed to Psalm 110 to silence His opponents.",
      "Psalm 2 enthrones Him as the Son the nations must kiss. Psalm 22 walks through Calvary in detail centuries before the nails. Psalm 23 names Him the Shepherd. Psalm 45 sees Him as the divine Bridegroom-King. Psalm 110 seats Him at the Father's right hand.",
      "Read the Psalms with Jesus in view and they stop being merely beautiful — they become His autobiography in song.",
    ],
  },
  {
    bookId: "proverbs",
    name: "Proverbs",
    testament: "OT",
    division: "Wisdom & Poetry",
    headline: "Jesus is the Wisdom of God personified — and given to us.",
    keyPassages: ["Proverbs 8:22–31", "1 Corinthians 1:24, 30", "Colossians 2:3"],
    body: [
      "Proverbs 8 dresses Wisdom in personal language — eternal, present at creation, delighting before the Father. The New Testament uncovers what Old Testament readers could only glimpse: that Wisdom is a Person, and His name is Jesus (1 Cor 1:24).",
      "Every wise word in Proverbs reaches its fullest expression in the life of Christ. \"In Him are hidden all the treasures of wisdom and knowledge\" (Col 2:3). To live wisely is to walk with Him.",
    ],
  },
  {
    bookId: "ecclesiastes",
    name: "Ecclesiastes",
    testament: "OT",
    division: "Wisdom & Poetry",
    headline: "Jesus is the only meaning under the sun — every vanity points to the One who alone is not vanity.",
    keyPassages: ["Ecclesiastes 12:13", "John 10:10"],
    body: [
      "Ecclesiastes is the book of a man who tried everything under the sun and called all of it vanity — money, wisdom, pleasure, work, fame. The book honestly names the ache of life apart from God.",
      "Jesus answers the ache. \"I came that they may have life, and have it abundantly\" (John 10:10). The vanity Ecclesiastes names is the very vanity Christ broke open with resurrection life.",
    ],
  },
  {
    bookId: "songofsongs",
    name: "Song of Songs",
    testament: "OT",
    division: "Wisdom & Poetry",
    headline: "Jesus is the Bridegroom who loves His Bride with covenant love.",
    keyPassages: ["Song of Songs 6:3", "Ephesians 5:25–32", "Revelation 19:7"],
    body: [
      "The Song is, on its surface, an unembarrassed celebration of marital love. It also has been read across centuries as a window into the love between Christ and the Church — not because the surface reading is wrong, but because the surface reading itself reflects something deeper (Eph 5:32).",
      "\"I am my beloved's, and my beloved is mine\" (6:3) is the language of every believer who knows that they were sought, found, named, kissed, and loved by a Bridegroom who is not ashamed to call them His.",
    ],
  },

  // ─────────── Major Prophets ───────────
  {
    bookId: "isaiah",
    name: "Isaiah",
    testament: "OT",
    division: "Major Prophets",
    headline: "Jesus is Immanuel, the Suffering Servant, the Prince of Peace.",
    keyPassages: ["Isaiah 7:14", "Isaiah 9:6", "Isaiah 53", "Isaiah 61:1–2"],
    body: [
      "No Old Testament book sees Christ as clearly as Isaiah. Born of a virgin (7:14). Called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace (9:6). Anointed to preach good news to the poor — the very text Jesus chose to read in His hometown synagogue (61:1, Luke 4).",
      "And Isaiah 53. Seven centuries before the crucifixion, the entire scene is described: despised and rejected, a man of sorrows, pierced for our transgressions, crushed for our iniquities, the chastisement of our peace upon Him. There is no other explanation for Isaiah 53 than the Lamb of God who would one day fulfill it.",
    ],
  },
  {
    bookId: "jeremiah",
    name: "Jeremiah",
    testament: "OT",
    division: "Major Prophets",
    headline: "Jesus is the Righteous Branch — and the New Covenant in His blood.",
    keyPassages: ["Jeremiah 23:5–6", "Jeremiah 31:31–34", "Luke 22:20"],
    body: [
      "Jeremiah prophesies a \"righteous Branch\" from David — a King who will reign wisely and be called \"The Lord Our Righteousness\" (23:5–6). Jesus is that name in flesh.",
      "And Jeremiah is the prophet of the New Covenant — God writing His law on hearts of flesh, forgiving iniquity, remembering sin no more (31:31–34). At the Last Supper Jesus lifts the cup and says, \"This cup is the new covenant in my blood\" (Luke 22:20). The covenant Jeremiah saw at a distance was signed in red on Calvary.",
    ],
  },
  {
    bookId: "lamentations",
    name: "Lamentations",
    testament: "OT",
    division: "Major Prophets",
    headline: "Jesus is the Man of Sorrows who weeps over Jerusalem.",
    keyPassages: ["Lamentations 1:12", "Lamentations 3:22–23", "Luke 19:41–44"],
    body: [
      "\"Is it nothing to you, all you who pass by?\" (1:12) is the cry of a city brought down. It is also a cry the Church has long heard on the lips of her crucified Lord.",
      "Jesus wept over Jerusalem (Luke 19:41) as Jeremiah did. He is the greater Jeremiah — and the deeper compassions of God toward a people who would not come to Him are gathered in His tears.",
    ],
  },
  {
    bookId: "ezekiel",
    name: "Ezekiel",
    testament: "OT",
    division: "Major Prophets",
    headline: "Jesus is the True Shepherd, the One who gives a heart of flesh, the resurrection over dry bones.",
    keyPassages: ["Ezekiel 34:23–24", "Ezekiel 36:26", "Ezekiel 37:1–14", "John 10:11"],
    body: [
      "In Ezekiel 34 God promises to come Himself and shepherd His scattered sheep — and to set over them \"one shepherd, my servant David.\" Jesus stands up in John 10 and says, \"I am the good shepherd.\" The fulfillment is direct.",
      "Ezekiel also promises a new heart and a new spirit (36:26), and the valley of dry bones rising at the word of the Lord (37). That is the gospel: dead in our trespasses, brought to life by the breath of Christ, given a heart that can love what we used to ignore.",
    ],
  },
  {
    bookId: "daniel",
    name: "Daniel",
    testament: "OT",
    division: "Major Prophets",
    headline: "Jesus is the Son of Man who receives the kingdom that never ends.",
    keyPassages: ["Daniel 2:44", "Daniel 7:13–14", "Daniel 9:25–26", "Mark 14:62"],
    body: [
      "Daniel 7 is one of the most explosive prophecies in the Old Testament: a figure \"like a son of man\" approaches the Ancient of Days and is given dominion, glory, and a kingdom that all peoples should serve — a kingdom that shall not pass away.",
      "Jesus chose \"Son of Man\" as His favorite self-designation. At His trial before the high priest, He answered the question \"Are you the Christ?\" by directly quoting Daniel 7 (Mark 14:62). The Sanhedrin understood. They tore their robes. They had heard a man claim to be the figure of Daniel's vision.",
    ],
  },

  // ─────────── Minor Prophets ───────────
  {
    bookId: "hosea",
    name: "Hosea",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the faithful Husband who pursues an unfaithful Bride.",
    keyPassages: ["Hosea 11:1", "Hosea 6:1–2", "Matthew 2:15"],
    body: [
      "Hosea is told to marry an unfaithful woman — to live out, in his marriage, what God has been enduring with His people. The book is the love story of a God who keeps coming back even when His people will not.",
      "\"Out of Egypt I called my son\" (11:1) — originally a description of Israel — is applied in Matthew 2:15 to the Christ child. The whole story of Israel is being recapitulated in the life of Jesus, this time perfectly.",
    ],
  },
  {
    bookId: "joel",
    name: "Joel",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the One who pours out the Spirit on all flesh.",
    keyPassages: ["Joel 2:28–32", "Acts 2:16–21"],
    body: [
      "Peter, standing in Jerusalem on the day the Church was born, points to Joel: \"This is what was uttered through the prophet Joel\" — the promise of the Spirit poured out on sons and daughters, old and young, slave and free.",
      "Jesus is the One who pours. The promise of Joel is fulfilled by the ascended Christ who, having been seated at the right hand of God, sends the Spirit to His people.",
    ],
  },
  {
    bookId: "amos",
    name: "Amos",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the restorer of David's fallen tent — gathering the nations into one people.",
    keyPassages: ["Amos 9:11–12", "Acts 15:16–17"],
    body: [
      "Amos thunders against injustice and idolatry, but the book ends with a promise: \"I will raise up the tabernacle of David which has fallen, and rebuild its ruins\" (9:11).",
      "At the Jerusalem Council in Acts 15, James reaches for this verse to explain why the Gentiles are streaming into the Church: God said He would. Jesus is the One raising David's fallen tent — and the rebuilt house has room for every nation.",
    ],
  },
  {
    bookId: "obadiah",
    name: "Obadiah",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the Deliverer who comes to Mount Zion to judge and to save.",
    keyPassages: ["Obadiah 17", "Obadiah 21"],
    body: [
      "The shortest book in the Old Testament ends with a promise: \"Saviors shall come up on Mount Zion to judge the mountain of Esau, and the kingdom shall be the Lord's\" (v. 21).",
      "Jesus is the Savior who came up to Mount Zion. The kingdom that, after all the pride of Edom and every Edom-like power, will at last belong to Him.",
    ],
  },
  {
    bookId: "jonah",
    name: "Jonah",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the greater Jonah — three days in the heart of the earth, sent to a Nineveh of the nations.",
    keyPassages: ["Jonah 1:17", "Jonah 4:11", "Matthew 12:39–41"],
    body: [
      "Jesus chose Jonah's three days in the fish as the sign that would be given to a wicked generation: as Jonah was three days in the belly of the great fish, so the Son of Man would be three days in the heart of the earth (Matt 12:40).",
      "But Jonah is also the prophet who didn't want his enemies to repent. Jesus is the better Prophet — the one who weeps for His enemies, who prays for those who crucify Him, who actually loves the city He is sent to.",
    ],
  },
  {
    bookId: "micah",
    name: "Micah",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the One who came out of Bethlehem, whose origin is from of old.",
    keyPassages: ["Micah 5:2", "Micah 6:8", "Matthew 2:5–6"],
    body: [
      "Seven hundred years before the manger, Micah told them where to find Him: \"But you, Bethlehem Ephrathah, who are little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days\" (5:2).",
      "The chief priests quoted this verse to Herod when the magi came asking where the King was to be born. Micah was that specific. Jesus is that promised.",
    ],
  },
  {
    bookId: "nahum",
    name: "Nahum",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the One whose feet bring good news of peace.",
    keyPassages: ["Nahum 1:15", "Romans 10:15"],
    body: [
      "Nahum is unsparing about the fall of a wicked empire. But in the middle of the judgment is a flash of gospel light: \"Behold, on the mountains, the feet of him who brings good news, who proclaims peace!\" (1:15).",
      "Paul quotes the line in Romans 10 to describe every preacher who carries the gospel into the world. The feet of Jesus carried that good news first, all the way to a cross.",
    ],
  },
  {
    bookId: "habakkuk",
    name: "Habakkuk",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the One in whom the just shall live by faith.",
    keyPassages: ["Habakkuk 2:4", "Romans 1:17", "Galatians 3:11", "Hebrews 10:38"],
    body: [
      "Habakkuk's seven-word sentence — \"the just shall live by his faith\" (2:4) — is quoted three times in the New Testament and became the heart-cry of the Reformation. The verse points beyond itself to a Righteous One in whom faith finds its object: Jesus.",
      "Habakkuk also gives us the most defiant song of trust in the Old Testament (3:17–18) — \"though the fig tree should not blossom… yet I will rejoice in the Lord.\" That song has its center in Christ.",
    ],
  },
  {
    bookId: "zephaniah",
    name: "Zephaniah",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the King in the midst of His people, singing over them with joy.",
    keyPassages: ["Zephaniah 3:17"],
    body: [
      "Zephaniah's final chapter shifts from judgment to one of the most tender promises in Scripture: \"The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing\" (3:17).",
      "Read it with Jesus in view. The King is in our midst. The salvation is His. The singing is His. We are the ones He is singing over.",
    ],
  },
  {
    bookId: "haggai",
    name: "Haggai",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the Desire of all nations and the Glory of the greater Temple.",
    keyPassages: ["Haggai 2:6–9"],
    body: [
      "To a discouraged remnant rebuilding a small temple, Haggai prophesies that \"the desire of all nations shall come, and I will fill this house with glory… The glory of this latter house shall be greater than the former\" (2:7, 9).",
      "Jesus walked into the second temple as a child, as a boy, as a Rabbi. The greater glory had come. The smaller temple held the One who would replace temples forever.",
    ],
  },
  {
    bookId: "zechariah",
    name: "Zechariah",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the King on a donkey, the Shepherd struck, the One they pierced.",
    keyPassages: ["Zechariah 9:9", "Zechariah 11:12–13", "Zechariah 12:10", "Zechariah 13:7"],
    body: [
      "No prophet's Christology is more specific than Zechariah's. The King comes \"lowly and riding on a donkey\" (9:9) — fulfilled on Palm Sunday. He is sold for thirty pieces of silver, thrown to the potter (11:12–13) — fulfilled by Judas. The Shepherd is struck and the sheep scattered (13:7) — Jesus quotes this on the way to Gethsemane.",
      "And: \"They shall look on me whom they have pierced\" (12:10) — quoted in John 19:37 of the spear that opened His side. Zechariah was watching Calvary five centuries ahead.",
    ],
  },
  {
    bookId: "malachi",
    name: "Malachi",
    testament: "OT",
    division: "Minor Prophets",
    headline: "Jesus is the Sun of Righteousness rising with healing in His wings.",
    keyPassages: ["Malachi 3:1", "Malachi 4:2", "Mark 1:2–3"],
    body: [
      "Malachi closes the Old Testament with one final promise: a messenger to prepare the way (3:1) and \"the Sun of righteousness shall rise with healing in his wings\" (4:2).",
      "Then four hundred years of silence. Then a voice in the wilderness — John the Baptist, fulfilling Malachi 3 — pointing at a young man and saying, \"Behold the Lamb of God.\" The Sun had risen.",
    ],
  },

  // ─────────── Gospels ───────────
  {
    bookId: "matthew",
    name: "Matthew",
    testament: "NT",
    division: "Gospels",
    headline: "Jesus is the long-awaited King — Son of David, Son of Abraham.",
    keyPassages: ["Matthew 1:1", "Matthew 5:17", "Matthew 28:18–20"],
    body: [
      "Matthew opens with a genealogy because Matthew is writing to Jews who needed to know that Jesus has the legal right to David's throne. Every prophecy is now arriving — \"that it might be fulfilled\" is Matthew's drumbeat phrase.",
      "Matthew's Jesus teaches with authority no rabbi had — \"You have heard that it was said… but I say to you\" (5:21–22). The Sermon on the Mount is the constitution of His kingdom, and the cross is its coronation. He ends the Gospel claiming all authority in heaven and on earth.",
    ],
  },
  {
    bookId: "mark",
    name: "Mark",
    testament: "NT",
    division: "Gospels",
    headline: "Jesus is the Servant Son of God whose cross is His glory.",
    keyPassages: ["Mark 1:1", "Mark 10:45", "Mark 15:39"],
    body: [
      "Mark's Gospel is short, fast, urgent. He opens with no genealogy and no birth narrative — just \"The beginning of the gospel of Jesus Christ, the Son of God.\" Mark wants you running with him.",
      "The pivot of Mark is 10:45: \"The Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.\" The Servant-King moves with relentless purpose toward His cross — and a Roman centurion at the foot of it is the first human in the book to confess, \"Truly this man was the Son of God\" (15:39).",
    ],
  },
  {
    bookId: "luke",
    name: "Luke",
    testament: "NT",
    division: "Gospels",
    headline: "Jesus is the perfect Son of Man, Savior of all peoples.",
    keyPassages: ["Luke 2:10–11", "Luke 4:18–19", "Luke 19:10", "Luke 24:27"],
    body: [
      "Luke, the Gentile physician, writes for the outsider. His genealogy goes back not just to Abraham but to Adam — because Jesus is the Savior of all flesh, not just of one nation.",
      "Luke's Jesus is found with shepherds, tax collectors, sinners, women, foreigners, lepers. He came \"to seek and to save the lost\" (19:10). And on the road to Emmaus, beginning at Moses and the Prophets, He opens to us the Scriptures about Himself — the very project of this whole page.",
    ],
  },
  {
    bookId: "john",
    name: "John",
    testament: "NT",
    division: "Gospels",
    headline: "Jesus is the eternal Word made flesh — God Himself.",
    keyPassages: ["John 1:1–14", "John 8:58", "John 14:6", "John 20:31"],
    body: [
      "John soars where the other Gospels walk. \"In the beginning was the Word, and the Word was with God, and the Word was God.\" Jesus is not merely sent from heaven; He is the One who has always been with the Father.",
      "The seven \"I AM\" statements — bread of life, light of the world, door, good shepherd, resurrection and life, way and truth and life, true vine — make Jesus' divinity unmistakable. \"Before Abraham was, I AM\" (8:58) drew stones from the crowd. He meant exactly what they thought He meant.",
    ],
  },

  // ─────────── Acts ───────────
  {
    bookId: "acts",
    name: "Acts",
    testament: "NT",
    division: "Acts",
    headline: "Jesus is the risen, ascended Lord who builds His Church by His Spirit.",
    keyPassages: ["Acts 1:1", "Acts 2:36", "Acts 4:12"],
    body: [
      "Luke's first volume told what \"Jesus began to do and to teach.\" Acts is the second volume — what Jesus continues to do, now through His Body, by His Spirit.",
      "Within fifty days of His crucifixion, three thousand are baptized. Within thirty years, the gospel has reached Rome. Acts is the story of an ascended King who does not stop working when His feet leave the ground.",
    ],
  },

  // ─────────── Pauline Epistles ───────────
  {
    bookId: "romans",
    name: "Romans",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is our righteousness — the propitiation, the second Adam, the source of new life.",
    keyPassages: ["Romans 1:16–17", "Romans 3:23–26", "Romans 5:18–19", "Romans 8:1"],
    body: [
      "Romans is the most systematic statement of the gospel ever written. All have sinned. Christ has been set forth as a propitiation. The righteousness of God is now offered freely through faith in Jesus. The Spirit raises those who are in Him.",
      "Where the first Adam plunged us into death, the second Adam — Jesus — pulls us into life (5:18). There is therefore now no condemnation for those who are in Him (8:1). Romans is the Christian's manifesto.",
    ],
  },
  {
    bookId: "1corinthians",
    name: "1 Corinthians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the wisdom and power of God, the Head of His Body, the resurrection-firstfruits.",
    keyPassages: ["1 Corinthians 1:23–24", "1 Corinthians 15:3–4", "1 Corinthians 15:20"],
    body: [
      "Paul writes to a divided, gifted, immoral, brilliant church and brings them back, again and again, to the cross — \"we preach Christ crucified… the power of God and the wisdom of God\" (1:23–24).",
      "Chapter 15 is the resurrection chapter, the longest sustained argument for the bodily resurrection of Jesus in the New Testament — and the promise that, because He rose, we will too.",
    ],
  },
  {
    bookId: "2corinthians",
    name: "2 Corinthians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the One who became poor that we might become rich.",
    keyPassages: ["2 Corinthians 5:21", "2 Corinthians 8:9", "2 Corinthians 12:9"],
    body: [
      "The greatest exchange in the universe is in one verse: \"He made him who knew no sin to be sin for us, that we might become the righteousness of God in him\" (5:21).",
      "And the King of the universe \"though he was rich, yet for your sake he became poor, that you through his poverty might become rich\" (8:9). Christianity, at its core, is the news of an exchange we did not deserve.",
    ],
  },
  {
    bookId: "galatians",
    name: "Galatians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the One who set us free from the curse of the law.",
    keyPassages: ["Galatians 2:20", "Galatians 3:13", "Galatians 5:1"],
    body: [
      "Galatians is Paul's fiercest letter — a defense of the gospel of grace against any return to law-keeping as the basis of acceptance with God. Christ has redeemed us from the curse of the law by becoming a curse for us.",
      "The Christian's identity is summed up in 2:20: \"I have been crucified with Christ. It is no longer I who live, but Christ who lives in me.\" Freedom is not lawlessness — it is the indwelling Christ.",
    ],
  },
  {
    bookId: "ephesians",
    name: "Ephesians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the Head of the Church and the centerpiece of God's eternal plan.",
    keyPassages: ["Ephesians 1:9–10", "Ephesians 2:8–10", "Ephesians 5:25–27"],
    body: [
      "God's eternal purpose is \"to unite all things in him, things in heaven and things on earth\" (1:10). Jesus is the gravitational center of the universe — every loose end of history reaches its rest in Him.",
      "And the Church is His Body, His Bride. He gave Himself up for her, sanctifies her, washes her, and is preparing to present her radiant and unblemished.",
    ],
  },
  {
    bookId: "philippians",
    name: "Philippians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the humble Servant who emptied Himself — and the Name above every name.",
    keyPassages: ["Philippians 2:5–11", "Philippians 3:7–10"],
    body: [
      "Philippians 2 may be the oldest Christian hymn we have on paper: the One who was in the form of God emptied Himself, took the form of a servant, humbled Himself, was obedient unto death, even death on a cross — and therefore God highly exalted Him.",
      "Paul, from a Roman prison, calls everything else loss compared to \"the surpassing worth of knowing Christ Jesus my Lord\" (3:8). The chains do not deter him. The Person is enough.",
    ],
  },
  {
    bookId: "colossians",
    name: "Colossians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the firstborn over all creation — supreme in everything.",
    keyPassages: ["Colossians 1:15–20", "Colossians 2:9", "Colossians 3:1–4"],
    body: [
      "Colossians 1:15–20 is one of the loftiest portraits of Christ in the New Testament. He is the image of the invisible God, firstborn over creation, creator and sustainer of all things, head of the Body, firstborn from the dead — \"that in everything he might be preeminent.\"",
      "\"In him the whole fullness of deity dwells bodily\" (2:9). Whatever you think you need apart from Christ, Colossians says: He is enough. He is more than enough.",
    ],
  },
  {
    bookId: "1thessalonians",
    name: "1 Thessalonians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the Lord who is coming again.",
    keyPassages: ["1 Thessalonians 4:13–18", "1 Thessalonians 5:9–10"],
    body: [
      "Every chapter of 1 Thessalonians ends with the return of Christ. The early Church was a Church living on tiptoe — waiting, watching, working until He comes.",
      "Jesus is the One \"who delivers us from the wrath to come\" (1:10) and who will descend from heaven \"with the trumpet of God\" (4:16) to gather His own. Sorrow over the dead in Christ does not have the last word; the return of Christ does.",
    ],
  },
  {
    bookId: "2thessalonians",
    name: "2 Thessalonians",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the One who will be revealed in flaming glory.",
    keyPassages: ["2 Thessalonians 1:7–10", "2 Thessalonians 2:8"],
    body: [
      "Paul corrects misunderstandings about the Day of the Lord by directing the suffering Thessalonians forward — to the day when \"the Lord Jesus is revealed from heaven with his mighty angels in flaming fire\" (1:7).",
      "Whatever lawless power rises, the Lord Jesus will slay it \"with the breath of his mouth and bring it to nothing by the appearance of his coming\" (2:8). The return is not just comfort — it is justice.",
    ],
  },
  {
    bookId: "1timothy",
    name: "1 Timothy",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the one Mediator between God and man.",
    keyPassages: ["1 Timothy 2:5–6", "1 Timothy 3:16", "1 Timothy 6:15–16"],
    body: [
      "\"There is one God, and one mediator between God and men, the man Christ Jesus, who gave himself as a ransom for all\" (2:5–6). No saint, no system, no synagogue, no priesthood replaces Him.",
      "1 Timothy 3:16 preserves a fragment of an early Christian hymn: \"He was manifested in the flesh, vindicated by the Spirit, seen by angels, proclaimed among the nations, believed on in the world, taken up in glory.\"",
    ],
  },
  {
    bookId: "2timothy",
    name: "2 Timothy",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the One who abolished death and brought life and immortality to light.",
    keyPassages: ["2 Timothy 1:10", "2 Timothy 2:8", "2 Timothy 4:7–8"],
    body: [
      "Paul writes this letter from a Roman dungeon, knowing his execution is near. He tells Timothy what is unbreakable: a Savior \"who abolished death and brought life and immortality to light through the gospel\" (1:10).",
      "His own race is finished. The crown is laid up. And it is laid up not only for him \"but also to all who have loved his appearing\" (4:8). 2 Timothy is Christianity from a man hours from his beheading — still steady, still hopeful, still in love with Christ.",
    ],
  },
  {
    bookId: "titus",
    name: "Titus",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is our great God and Savior whose appearing we await.",
    keyPassages: ["Titus 2:11–14", "Titus 3:4–7"],
    body: [
      "Titus contains one of the New Testament's clearest summaries of the Christian life: the grace of God appeared, training us to renounce ungodliness, waiting for the appearing of \"our great God and Savior Jesus Christ\" who gave Himself for us (2:13).",
      "Salvation is not by works of righteousness we have done, \"but according to his mercy, by the washing of regeneration and renewal of the Holy Spirit\" (3:5). Everything we are now and will be is His gift.",
    ],
  },
  {
    bookId: "philemon",
    name: "Philemon",
    testament: "NT",
    division: "Pauline Epistles",
    headline: "Jesus is the One who reconciles — slave and master become brothers.",
    keyPassages: ["Philemon 15–18"],
    body: [
      "Paul writes one private letter on behalf of a runaway slave named Onesimus, asking his master Philemon to receive him back \"no longer as a slave but more than a slave, as a beloved brother.\"",
      "And in the middle of the letter is the gospel in miniature: \"If he has wronged you at all, or owes you anything, charge that to my account\" (v. 18). That is exactly what Jesus has done for every one of us at the cross.",
    ],
  },

  // ─────────── General Epistles ───────────
  {
    bookId: "hebrews",
    name: "Hebrews",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus is better — better than angels, Moses, Aaron, and the old covenant.",
    keyPassages: ["Hebrews 1:1–3", "Hebrews 4:14–16", "Hebrews 7:25", "Hebrews 12:1–2"],
    body: [
      "Hebrews is an extended argument that Jesus is the climax of everything the Old Testament was building toward. Better than the angels who delivered the law. Better than Moses who led Israel out of Egypt. Better than Aaron whose priesthood was temporary. Better than the sacrifices that had to be repeated.",
      "He is our great High Priest who entered the heavenly sanctuary by His own blood, once for all, and who \"always lives to make intercession for them\" (7:25). If you have Jesus, you have everything every shadow ever pointed to.",
    ],
  },
  {
    bookId: "james",
    name: "James",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus is the Lord of Glory whose faith works.",
    keyPassages: ["James 2:1", "James 2:17", "James 5:7–8"],
    body: [
      "James — likely the Lord's own half-brother — names Jesus only twice (1:1, 2:1), and both times in startling reverence: \"our Lord Jesus Christ, the Lord of glory.\" The man who once thought his brother was out of His mind (Mark 3:21) now confesses Him as the Lord of glory.",
      "James will not let \"faith\" be reduced to mental assent. \"Faith without works is dead\" (2:17). The Jesus he met after the resurrection saved him not into ideas but into a transformed life.",
    ],
  },
  {
    bookId: "1peter",
    name: "1 Peter",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus is the precious cornerstone — the Shepherd-Bishop of our souls.",
    keyPassages: ["1 Peter 1:18–19", "1 Peter 2:6–8", "1 Peter 2:24"],
    body: [
      "Peter writes to scattered believers under suffering. He reminds them what they were ransomed by — \"not with corruptible things… but with the precious blood of Christ, as of a lamb without blemish and without spot\" (1:18–19).",
      "Jesus is the stone the builders rejected, now the cornerstone of God's new house. \"By His wounds you have been healed\" (2:24) — and that comfort is enough for any suffering Christian, in any century.",
    ],
  },
  {
    bookId: "2peter",
    name: "2 Peter",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus is the Lord whose return is sure.",
    keyPassages: ["2 Peter 1:16–18", "2 Peter 3:9", "2 Peter 3:18"],
    body: [
      "Peter writes a final letter as his own death approaches. He testifies what he saw: \"We did not follow cleverly devised myths… but we were eyewitnesses of his majesty\" (1:16). The transfiguration is still vivid in his mind.",
      "The Lord is not slow about His promise; He is patient. He will return. And until then: \"grow in the grace and knowledge of our Lord and Savior Jesus Christ\" (3:18). The last verse of Peter's pen.",
    ],
  },
  {
    bookId: "1john",
    name: "1 John",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus is the Word of Life — the propitiation, the One who came in the flesh.",
    keyPassages: ["1 John 1:1–3", "1 John 2:2", "1 John 4:9–10"],
    body: [
      "John, sixty years after the resurrection, still writes like a man stunned: \"that which we have heard, which we have seen with our eyes, which we have looked upon and our hands have handled\" (1:1). The eternal Word he met in the flesh.",
      "Jesus is the propitiation for our sins (2:2). The proof that God is love is not abstract — it is that He sent His Son (4:9–10). The First Letter of John is a beautiful, urgent, simple book about a fierce love.",
    ],
  },
  {
    bookId: "2john",
    name: "2 John",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus came in the flesh — the truth that defines fellowship.",
    keyPassages: ["2 John 7", "2 John 9"],
    body: [
      "John warns the \"elect lady\" about deceivers who deny that Jesus has come in the flesh. The whole gospel hinges on the Incarnation; deny it, and you deny everything.",
      "To abide \"in the teaching of Christ\" is to have both the Father and the Son (v. 9). Truth and love walk together in 2 John, as in every faithful church.",
    ],
  },
  {
    bookId: "3john",
    name: "3 John",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus is the One whose Name is worth walking in the truth for.",
    keyPassages: ["3 John 7", "3 John 11"],
    body: [
      "John commends Gaius for the hospitality he showed traveling missionaries — those who \"have gone out for the sake of the name\" (v. 7). The Name is the name of Jesus.",
      "Every Christian generosity, every loyal welcome of a believer in need, is done for the sake of that Name. 3 John is short, particular, and quietly beautiful.",
    ],
  },
  {
    bookId: "jude",
    name: "Jude",
    testament: "NT",
    division: "General Epistles",
    headline: "Jesus is the only Master and Lord who keeps us from falling.",
    keyPassages: ["Jude 1", "Jude 24–25"],
    body: [
      "Jude — another half-brother of Jesus — calls himself \"a servant of Jesus Christ\" before he calls himself anything else (v. 1). His letter contends earnestly for the faith against false teachers.",
      "And the benediction is one of the most glorious in Scripture: \"Now to him who is able to keep you from stumbling and to present you blameless before the presence of his glory with great joy, to the only God, our Savior, through Jesus Christ our Lord, be glory, majesty, dominion, and authority, before all time and now and forever. Amen\" (vv. 24–25).",
    ],
  },

  // ─────────── Apocalypse ───────────
  {
    bookId: "revelation",
    name: "Revelation",
    testament: "NT",
    division: "Apocalypse",
    headline: "Jesus is the Lamb who was slain — now reigning as King of kings and Lord of lords.",
    keyPassages: ["Revelation 1:5–8", "Revelation 5:9–10", "Revelation 19:11–16", "Revelation 22:13"],
    body: [
      "The very title of Revelation is \"The Revelation of Jesus Christ\" (1:1). The whole book is, before anything else, a portrait of Him. The One who walks among His lampstands. The Lamb who alone is worthy to open the scroll. The Rider on the white horse. The Alpha and the Omega.",
      "And the book ends as the Bible should: with a wedding, a city, a river, a tree, healing for the nations, a face we will finally see. \"Surely I am coming soon,\" Jesus says. The right answer is the answer the Church has been giving for two thousand years: \"Amen. Come, Lord Jesus.\"",
    ],
  },
];

export const divisions = [
  "Pentateuch",
  "History (OT)",
  "Wisdom & Poetry",
  "Major Prophets",
  "Minor Prophets",
  "Gospels",
  "Acts",
  "Pauline Epistles",
  "General Epistles",
  "Apocalypse",
] as const;
