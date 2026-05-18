// Brief, plain-language definitions of key theological terms.
// Written to be accurate enough for a pastor to nod at and short enough for a
// 14-year-old to read.

/** Original-language form. `script` is the native script (Hebrew or Greek
 *  unicode); `translit` is the Latin-letter transliteration; `gloss` is the
 *  literal meaning if it differs from the headword. */
export type OriginalLanguage = {
  script: string;
  translit: string;
  gloss?: string;
};

export type Term = {
  slug: string;
  word: string;
  short: string; // one-sentence answer
  long: string; // 2–4 sentence expansion
  refs?: string[]; // anchor verses
  hebrew?: OriginalLanguage;
  greek?: OriginalLanguage;
  latin?: OriginalLanguage;
  aramaic?: OriginalLanguage;
  /** Slugs of related entries — drives flashcard cross-references. */
  related?: string[];
};

export const GLOSSARY: Term[] = [
  { slug: "atonement", word: "Atonement",
    short: "The work of Christ on the cross that reconciles sinners to God.",
    long: "Atonement means 'at-one-ment' — to make at one. In Scripture, atonement is the way God, in Christ, took the punishment our sin deserved so that we could be brought near. The cross is the center of atonement; the empty tomb is its vindication.",
    refs: ["Romans 3:25", "1 John 2:2"],
    hebrew: { script: "כִּפֻּר", translit: "kippur", gloss: "covering" },
    related: ["propitiation", "redemption", "reconciliation"] },

  { slug: "baptism", word: "Baptism",
    short: "The public sign of union with Christ in His death and resurrection.",
    long: "Christ commanded His disciples to baptize in the name of the Father, Son, and Holy Spirit. Christians across traditions differ on the mode (immersion or pouring) and the timing (infant or believer), but agree that baptism marks entry into the visible Church and union with Jesus.",
    refs: ["Matthew 28:19", "Romans 6:3–4"] },

  { slug: "canon", word: "Canon",
    short: "The list of books recognized by the Church as the Spirit-breathed Scripture.",
    long: "The Christian canon is 66 books (39 Old Testament + 27 New Testament) in Protestant Bibles; Catholic and Orthodox Bibles include additional deuterocanonical books. The Church did not create the canon — it recognized the books God had given.",
    refs: ["2 Timothy 3:16"] },

  { slug: "christ", word: "Christ / Messiah",
    short: "The Anointed One promised throughout the Old Testament — Jesus of Nazareth.",
    long: "'Christ' is Greek for 'Messiah' (Hebrew Mashiach), meaning 'Anointed One.' Israel waited for the Messiah-King who would deliver God's people. Jesus of Nazareth is that promised one — Prophet, Priest, and King.",
    refs: ["John 1:41", "Luke 24:27"],
    hebrew: { script: "מָשִׁיחַ", translit: "Mashiach", gloss: "anointed one" },
    greek: { script: "Χριστός", translit: "Christos", gloss: "anointed one" } },

  { slug: "church", word: "Church",
    short: "The called-out people of God — both local congregations and the universal Body of Christ.",
    long: "The Greek ekklēsia means 'assembly' — those called out. Locally, it is the believers who gather in one place to worship and obey Jesus. Universally, it is every believer in every age and place, joined to Christ.",
    refs: ["Matthew 16:18", "Ephesians 1:22–23"],
    greek: { script: "ἐκκλησία", translit: "ekklēsia", gloss: "assembly, called-out ones" } },

  { slug: "conversion", word: "Conversion",
    short: "Turning from sin to Christ in faith and repentance.",
    long: "Conversion involves both turning from (repentance) and turning to (faith in Christ). It is a one-time decisive turning and the beginning of a lifelong walk of repentance and faith.",
    refs: ["Acts 3:19", "1 Thessalonians 1:9"] },

  { slug: "covenant", word: "Covenant",
    short: "A binding relationship initiated by God with His people.",
    long: "Throughout Scripture God enters covenants — with Noah, Abraham, Israel at Sinai, David, and finally the new covenant in Christ's blood. The Bible's story is one unfolding covenant relationship reaching its fulfillment in Jesus.",
    refs: ["Jeremiah 31:31–34", "Luke 22:20"],
    hebrew: { script: "בְּרִית", translit: "berith", gloss: "covenant, treaty, pledge" },
    greek: { script: "διαθήκη", translit: "diathēkē", gloss: "covenant, will, testament" },
    related: ["new-covenant"] },

  { slug: "discipleship", word: "Discipleship",
    short: "Becoming the kind of person Jesus was, and doing what He did.",
    long: "A disciple (mathētēs) is a learner — but learning here means whole-life apprenticeship to Jesus. Discipleship is not extra; it is the basic Christian shape. Disciples make disciples (Matthew 28:19).",
    refs: ["Luke 9:23", "2 Timothy 2:2"],
    greek: { script: "μαθητής", translit: "mathētēs", gloss: "learner, apprentice" } },

  { slug: "eschatology", word: "Eschatology",
    short: "The doctrine of last things — Christ's return, the resurrection, judgment, and the new creation.",
    long: "Eschatology asks: how does the story end? Christians confess that Christ will return bodily, the dead will be raised, all will be judged, and the heavens and earth will be renewed (Revelation 21).",
    refs: ["Acts 1:11", "Revelation 21:1–4"] },

  { slug: "lords-supper", word: "Lord's Supper / Eucharist / Communion",
    short: "The meal Christ instituted in which believers remember and proclaim His death until He comes.",
    long: "On the night He was betrayed Jesus took bread and wine and said, 'This is my body… this is my blood.' Christians differ in their understanding of how Christ is present, but agree the meal is central to the Church's life.",
    refs: ["1 Corinthians 11:23–26"] },

  { slug: "faith", word: "Faith",
    short: "Trust in Christ for everything He promises in the Gospel.",
    long: "Faith is not a vague hope; it is trust, grounded in evidence, that Christ is who He says He is. Saving faith both believes and clings — head, heart, and life.",
    refs: ["Hebrews 11:1", "Romans 10:17"] },

  { slug: "fall", word: "The Fall",
    short: "Humanity's original turning away from God in Genesis 3 and its consequences.",
    long: "When Adam and Eve disobeyed, sin entered the world and death through sin. The Fall did not destroy God's image in us; it disordered it. All people since are born east of Eden, longing to come home.",
    refs: ["Genesis 3", "Romans 5:12"],
    related: ["sin", "original-sin", "salvation"] },

  { slug: "glory", word: "Glory",
    short: "The weighty beauty of God — His radiant presence and worth.",
    long: "God's glory is the visible expression of His invisible perfections. Christ is 'the radiance of God's glory' (Heb 1:3). Our destiny is to be transformed into His likeness, 'from glory to glory' (2 Cor 3:18).",
    refs: ["Exodus 33:18–19", "John 1:14"],
    hebrew: { script: "כָּבוֹד", translit: "kavod", gloss: "weight, honor, glory" },
    greek: { script: "δόξα", translit: "doxa", gloss: "glory, splendor" } },

  { slug: "gospel", word: "Gospel",
    short: "The good news that Jesus is Lord — He died for our sins, was buried, was raised, and reigns.",
    long: "The Gospel is the announcement of what God has done in Christ. Paul summarizes it in 1 Cor 15:3–8: Christ died for our sins, was buried, rose on the third day, and was seen. Believing this is salvation.",
    refs: ["1 Corinthians 15:3–8", "Romans 1:16"],
    greek: { script: "εὐαγγέλιον", translit: "euangelion", gloss: "good news, glad announcement" } },

  { slug: "grace", word: "Grace",
    short: "God's unmerited favor — His free gift in Christ.",
    long: "Grace is God doing for us what we could not do for ourselves and giving us what we could never earn. Salvation is by grace, through faith, in Christ alone.",
    refs: ["Ephesians 2:8–9", "Titus 2:11"],
    hebrew: { script: "חֵן", translit: "chen", gloss: "favor" },
    greek: { script: "χάρις", translit: "charis", gloss: "grace, favor, gift" } },

  { slug: "heaven", word: "Heaven",
    short: "Where God's will is done freely and joyfully — and one day, the renewed earth too.",
    long: "Heaven is the realm of God's unhindered reign. Christian hope is not 'escape to heaven' but the union of heaven and earth in the new creation when Christ returns.",
    refs: ["Matthew 6:10", "Revelation 21:2–3"] },

  { slug: "hell", word: "Hell",
    short: "Final, just separation from God for those who reject Christ.",
    long: "Hell is real and serious. Scripture pictures it as fire, darkness, and the absence of God. Christ Himself spoke of it more than anyone else — precisely so we would be saved from it.",
    refs: ["Matthew 25:46", "Revelation 20:14–15"] },

  { slug: "holy", word: "Holy / Holiness",
    short: "Set apart for God — pure, distinct, devoted.",
    long: "God is holy — utterly other, morally perfect. He calls His people to be holy too, not by trying harder but by being made new in Christ and walking by the Spirit.",
    refs: ["Isaiah 6:3", "1 Peter 1:15–16"],
    hebrew: { script: "קָדוֹשׁ", translit: "qadosh", gloss: "set apart, holy" },
    greek: { script: "ἅγιος", translit: "hagios", gloss: "holy, set apart" } },

  { slug: "incarnation", word: "Incarnation",
    short: "God the Son took on flesh and became truly human in Jesus of Nazareth.",
    long: "The Word became flesh and lived among us (John 1:14). Without ceasing to be God, the Son became truly human — body and soul. This is the hinge of the Christian faith.",
    refs: ["John 1:14", "Philippians 2:5–8"],
    latin: { script: "incarnatio", translit: "in-carne", gloss: "into flesh" },
    related: ["logos", "christ"] },

  { slug: "justification", word: "Justification",
    short: "God's verdict that the sinner is righteous in Christ, by grace through faith.",
    long: "Justification is a courtroom term: God declares the believing sinner righteous because Christ's righteousness is credited to them. It is not earned; it is received.",
    refs: ["Romans 3:23–26", "Galatians 2:16"] },

  { slug: "kingdom", word: "Kingdom of God",
    short: "God's reign — already begun in Christ, awaiting its full revealing.",
    long: "Jesus' first message was 'the Kingdom of God has come near.' The Kingdom is wherever Christ's reign is welcomed. It is already here in part; it will be all in all when He returns.",
    refs: ["Mark 1:14–15", "Matthew 6:10"] },

  { slug: "logos", word: "Logos",
    short: "John's name for Christ — the eternal Word of God who became flesh.",
    long: "The opening of John's Gospel echoes Genesis 1: 'In the beginning was the Word, and the Word was with God, and the Word was God.' Christ is God's self-expression to the world.",
    refs: ["John 1:1–14"],
    greek: { script: "λόγος", translit: "logos", gloss: "word, reason, divine utterance" },
    related: ["incarnation"] },

  { slug: "mercy", word: "Mercy",
    short: "God withholding the judgment we deserved.",
    long: "Mercy is the other side of grace: grace gives the good we did not earn; mercy withholds the punishment we did. Both meet at the cross.",
    refs: ["Titus 3:5", "Lamentations 3:22–23"],
    hebrew: { script: "רַחֲמִים", translit: "rachamim", gloss: "tender mercies, compassions" },
    greek: { script: "ἔλεος", translit: "eleos", gloss: "mercy" } },

  { slug: "pentecost", word: "Pentecost",
    short: "The day the Holy Spirit was poured out on the Church (Acts 2), fulfilling Joel 2.",
    long: "Pentecost was a Jewish harvest festival. On that day, fifty days after Christ's resurrection, the Spirit fell on the gathered disciples — the birth of the Church and the start of the worldwide mission.",
    refs: ["Acts 2:1–4", "Joel 2:28"] },

  { slug: "propitiation", word: "Propitiation",
    short: "The turning-aside of God's righteous anger against sin, satisfied at the cross.",
    long: "Propitiation does not mean an angry God appeased by His Son — it means the loving God Himself bears the just consequence of sin in the person of His Son, so we go free.",
    refs: ["Romans 3:25", "1 John 4:10"] },

  { slug: "reconciliation", word: "Reconciliation",
    short: "Friendship with God restored through Christ.",
    long: "Sin made us enemies of God. The cross made peace. Reconciliation is not just the absence of hostility — it is the restoration of friendship with the Father.",
    refs: ["2 Corinthians 5:18–19", "Romans 5:10"] },

  { slug: "redemption", word: "Redemption",
    short: "Being bought back — out of slavery to sin and into freedom in Christ.",
    long: "Redemption pictures a slave being set free at a price. The price was Christ's blood. The freedom is real.",
    refs: ["Ephesians 1:7", "1 Peter 1:18–19"] },

  { slug: "repentance", word: "Repentance",
    short: "A change of mind that becomes a change of life.",
    long: "Repentance is more than feeling sorry — it is turning. The Greek metanoia means a change of mind that bears fruit in a changed life. It is the perpetual posture of the disciple.",
    refs: ["Mark 1:15", "Acts 3:19"] },

  { slug: "resurrection", word: "Resurrection",
    short: "Christ rose bodily from the grave — and so will all who are His.",
    long: "Resurrection is not the immortality of the soul but the bodily raising of the dead. Christ is the firstfruits; we follow at His coming. The Christian hope is fully physical and fully glorious.",
    refs: ["1 Corinthians 15:20–22", "John 11:25"] },

  { slug: "righteousness", word: "Righteousness",
    short: "Right standing with God — and right living before Him.",
    long: "In Christ we are made righteous (justification) and we are being made righteous (sanctification). The first is His gift; the second is His Spirit's work in us.",
    refs: ["Romans 3:22", "Matthew 5:6"] },

  { slug: "sabbath", word: "Sabbath",
    short: "God-given rhythm of rest, rooted in creation and renewed in Christ.",
    long: "The Sabbath was given as a sign of trust — that the world goes on without us because God upholds it. Christ calls Himself Lord of the Sabbath and is its true rest.",
    refs: ["Genesis 2:2–3", "Matthew 11:28", "Hebrews 4:9–10"] },

  { slug: "sanctification", word: "Sanctification",
    short: "The lifelong process of becoming holy — being made more like Jesus.",
    long: "Justification is a once-for-all verdict; sanctification is a lifelong becoming. The Spirit who saved us is now shaping us into the image of Christ, with our cooperation.",
    refs: ["1 Thessalonians 4:3", "2 Corinthians 3:18"] },

  { slug: "sin", word: "Sin",
    short: "Falling short of the glory of God — both rebellion and brokenness.",
    long: "Sin is both what we do wrong and what is wrong with us. It is missing the mark, breaking the law, and twisting the loves of the heart. The Gospel is God's answer to it.",
    refs: ["Romans 3:23", "1 John 3:4"] },

  { slug: "spirit", word: "Holy Spirit",
    short: "The third Person of the Trinity — fully God, sent to indwell and sanctify believers.",
    long: "The Spirit convicts of sin, comforts the saints, gives gifts to the Church, and produces fruit in the disciple. He is not an impersonal force; He is the Lord, the giver of life.",
    refs: ["John 14:16–17", "Galatians 5:22–23"],
    hebrew: { script: "רוּחַ", translit: "ruach", gloss: "spirit, wind, breath" },
    greek: { script: "πνεῦμα", translit: "pneuma", gloss: "spirit, wind, breath" },
    related: ["trinity", "pentecost"] },

  { slug: "trinity", word: "Trinity",
    short: "One God in three persons: Father, Son, and Holy Spirit.",
    long: "The doctrine of the Trinity says God is one in being and three in person. Not three gods, not one person with three masks — but the eternal, mutual love of Father, Son, and Spirit.",
    refs: ["Matthew 28:19", "2 Corinthians 13:14"],
    latin: { script: "Trinitas", translit: "Trinitas", gloss: "threeness" } },

  { slug: "wisdom", word: "Wisdom",
    short: "Skill in the art of living rightly before God — and a Person in whom we find it.",
    long: "Biblical wisdom is more than knowledge; it is knowing how to live. Proverbs 9 personifies Wisdom; 1 Corinthians 1 identifies Christ as the wisdom of God.",
    refs: ["Proverbs 1:7", "1 Corinthians 1:30"],
    hebrew: { script: "חָכְמָה", translit: "chokmah", gloss: "skill, wisdom, expertise" },
    greek: { script: "σοφία", translit: "sophia", gloss: "wisdom" } },

  { slug: "worship", word: "Worship",
    short: "Ascribing worth to God with our whole life — words, deeds, time, money, love.",
    long: "Worship is not first an event but a posture. Sunday's gathering trains the rest of the week's living. Romans 12 calls our offered bodies our true and proper worship.",
    refs: ["John 4:23–24", "Romans 12:1"],
    hebrew: { script: "שָׁחָה", translit: "shachah", gloss: "to bow down" },
    greek: { script: "προσκυνέω", translit: "proskuneō", gloss: "to bow toward, to kiss the ground before" } },

  // ─────────── ORIGINAL-LANGUAGE WORDS ───────────

  { slug: "abba", word: "Abba",
    short: "An Aramaic word for Father — the intimate name Jesus used in prayer.",
    long: "Abba is the warm Aramaic word a child uses for their father. Jesus prayed it in Gethsemane (Mark 14:36). Paul says the Spirit cries 'Abba!' in our hearts, naming us as God's adopted children.",
    refs: ["Mark 14:36", "Romans 8:15", "Galatians 4:6"],
    aramaic: { script: "אַבָּא", translit: "Abba", gloss: "Father" },
    related: ["adoption", "father"] },

  { slug: "agape", word: "Agape",
    short: "The Greek word for self-giving, cross-shaped love.",
    long: "Agape is the love that pours itself out for the good of another, even at cost. It is the love named in John 3:16 and 1 Corinthians 13. The Father, Son, and Spirit love one another with agape eternally; in Christ we are drawn into that love.",
    refs: ["John 3:16", "1 Corinthians 13:4–7", "1 John 4:8"],
    greek: { script: "ἀγάπη", translit: "agapē", gloss: "self-giving love" },
    related: ["father"] },

  { slug: "amen", word: "Amen",
    short: "An ancient affirmation: 'truly,' 'so be it,' 'this is firm.'",
    long: "Amen is one of the few words that travels untranslated from Hebrew through Greek into nearly every language of the Church. Jesus often opens His sayings with 'Amen, amen' — 'Truly, truly.' Revelation 3:14 calls Christ Himself 'the Amen.'",
    refs: ["Deuteronomy 27:15", "John 1:51", "Revelation 3:14"],
    hebrew: { script: "אָמֵן", translit: "amen", gloss: "truly, firm, faithful" } },

  { slug: "apostle", word: "Apostle",
    short: "A 'sent one' — one of the Twelve, plus Paul and others commissioned by Christ.",
    long: "The Twelve were chosen by Jesus, witnessed the resurrection, and were sent with His authority to plant the Church. Paul was added by direct commission. The apostolic office in the strict sense ended with that founding generation; their teaching is the Church's permanent foundation.",
    refs: ["Matthew 10:1–4", "Ephesians 2:20", "Acts 1:8"],
    greek: { script: "ἀπόστολος", translit: "apostolos", gloss: "sent one, emissary" } },

  { slug: "chesed", word: "Chesed",
    short: "Hebrew for steadfast, covenant love — translated 'lovingkindness,' 'mercy,' 'faithful love.'",
    long: "Chesed is the love God keeps because He has bound Himself to keep it. It is the heart of God's character in the Old Testament — patient, unfailing, fierce. Lamentations 3:22–23 sings it: 'It is because of Yahweh's chesed that we are not consumed.'",
    refs: ["Exodus 34:6", "Psalm 136", "Lamentations 3:22–23"],
    hebrew: { script: "חֶסֶד", translit: "chesed", gloss: "steadfast covenant love" },
    related: ["covenant", "mercy"] },

  { slug: "doxa", word: "Doxa",
    short: "Greek for glory — the radiant weight of God's presence.",
    long: "Doxa is the Greek word the New Testament uses where the Old Testament had kavod (weight, glory). Christ has doxa as the only-begotten of the Father (John 1:14); we are being transformed from doxa to doxa as we behold Him (2 Cor 3:18).",
    refs: ["John 1:14", "2 Corinthians 3:18"],
    greek: { script: "δόξα", translit: "doxa", gloss: "glory, radiance, weight" },
    related: ["glory"] },

  { slug: "elohim", word: "Elohim",
    short: "The plural-form Hebrew name for God — used singularly of the one true God.",
    long: "Elohim opens the Bible: 'In the beginning Elohim created the heavens and the earth.' The form is plural but the verbs are singular — a grammatical hint that points (the Church has long said) toward the Trinity. The same word, in lowercase, is sometimes used of angelic beings or judges.",
    refs: ["Genesis 1:1", "Deuteronomy 6:4"],
    hebrew: { script: "אֱלֹהִים", translit: "Elohim", gloss: "God (mighty one)" } },

  { slug: "emet", word: "Emet",
    short: "Hebrew for truth — but truth as faithfulness, firmness, that which is reliable.",
    long: "Emet is not abstract truth-of-statements; it is truth-as-trustworthiness. God's emet is the bedrock of the covenant. Psalm 117 pairs His chesed (steadfast love) with His emet (faithfulness) — the two attributes that make Him utterly safe to lean on.",
    refs: ["Psalm 25:5", "Psalm 117:2", "John 14:6"],
    hebrew: { script: "אֱמֶת", translit: "emet", gloss: "truth, faithfulness, firmness" } },

  { slug: "euangelion", word: "Euangelion",
    short: "The Greek word translated 'gospel' — literally 'good news.'",
    long: "Euangelion was the word for the announcement of a royal victory or a king's birth. The New Testament writers used it for the news that God's true King had come, died, and risen. Our English word 'evangel' (and 'evangelist') comes straight from it.",
    refs: ["Mark 1:1", "Romans 1:16"],
    greek: { script: "εὐαγγέλιον", translit: "euangelion", gloss: "good news, glad announcement" },
    related: ["gospel"] },

  { slug: "kairos", word: "Kairos",
    short: "Greek for the appointed, opportune moment — distinct from clock time (chronos).",
    long: "Chronos is the ticking of seconds and seasons. Kairos is the right moment, the appointed time. 'The kairos is fulfilled,' Jesus says as His ministry begins. Believers learn to discern kairos in the ordinary chronos of a day.",
    refs: ["Mark 1:15", "Ecclesiastes 3:1", "Galatians 6:10"],
    greek: { script: "καιρός", translit: "kairos", gloss: "appointed time, opportune moment" } },

  { slug: "kenosis", word: "Kenosis",
    short: "The 'self-emptying' of Christ in the incarnation — Philippians 2.",
    long: "Kenosis is the Greek word in Philippians 2:7 — Christ 'emptied Himself' (ekenōsen), taking the form of a servant. He did not stop being God; He laid aside the rightful enjoyment of His glory to take on our flesh, our weakness, and our death.",
    refs: ["Philippians 2:5–11"],
    greek: { script: "κένωσις", translit: "kenōsis", gloss: "emptying" },
    related: ["incarnation", "humility"] },

  { slug: "koinonia", word: "Koinonia",
    short: "Greek for fellowship — a sharing in common life, goods, suffering, and joy.",
    long: "Koinonia is what the early Church had: fellowship in the apostles' teaching, in the breaking of bread, in prayer, in possessions. It is participation, not just acquaintance. The Lord's Supper itself is called the koinonia of the body and blood of Christ.",
    refs: ["Acts 2:42", "1 Corinthians 10:16", "1 John 1:3"],
    greek: { script: "κοινωνία", translit: "koinōnia", gloss: "fellowship, partnership, sharing" },
    related: ["church"] },

  { slug: "kurios", word: "Kurios",
    short: "Greek for Lord — the New Testament's word for both YHWH and Jesus.",
    long: "Kurios renders the Old Testament Yahweh in the Greek Septuagint. The earliest Christian confession is 'Jesus is kurios' (Romans 10:9) — a deliberate, costly identification of Jesus with the God of Israel.",
    refs: ["Romans 10:9", "Philippians 2:11", "Acts 2:36"],
    greek: { script: "κύριος", translit: "kurios", gloss: "Lord, Master" },
    related: ["yhwh"] },

  { slug: "maranatha", word: "Maranatha",
    short: "An ancient Aramaic prayer of the Church: 'Our Lord, come.'",
    long: "Maranatha is one of the oldest preserved phrases of the believing community — Paul writes it in Aramaic to a Greek-speaking church in 1 Corinthians 16:22. It captures the early Christian longing for Christ's return.",
    refs: ["1 Corinthians 16:22", "Revelation 22:20"],
    aramaic: { script: "מָרַנָא תָא", translit: "Marana tha", gloss: "Our Lord, come" } },

  { slug: "nephesh", word: "Nephesh",
    short: "Hebrew for a living, breathing being — not 'soul' as a detachable part.",
    long: "Nephesh refers to the whole living creature. When Genesis 2:7 says 'man became a living nephesh,' it does not mean a body that has a soul attached; it means a unified living being. This shapes the Bible's vision of resurrection as bodily, not the immortality of an isolated soul.",
    refs: ["Genesis 2:7", "Psalm 103:1"],
    hebrew: { script: "נֶפֶשׁ", translit: "nephesh", gloss: "living being, life, self" } },

  { slug: "parousia", word: "Parousia",
    short: "The Greek word for the bodily, visible return of Christ.",
    long: "Parousia means 'coming' or 'presence' — used in the New Testament for the second appearing of Jesus in glory. Every believer's hope is parousia: the day He returns to judge, to reign, and to make all things new.",
    refs: ["Matthew 24:27", "1 Thessalonians 4:15", "James 5:7"],
    greek: { script: "παρουσία", translit: "parousia", gloss: "coming, arrival, presence" },
    related: ["eschatology"] },

  { slug: "shalom", word: "Shalom",
    short: "Hebrew for peace — not just absence of conflict, but wholeness, completeness, well-being.",
    long: "Shalom is the way things were meant to be: all relationships rightly ordered — with God, with self, with others, with creation. The Hebrew greeting and farewell, the Aaronic blessing's climax, and one of the names of Christ (Prince of Shalom, Isaiah 9:6).",
    refs: ["Numbers 6:24–26", "Isaiah 9:6", "John 14:27"],
    hebrew: { script: "שָׁלוֹם", translit: "shalom", gloss: "peace, wholeness, completeness" } },

  { slug: "shema", word: "Shema",
    short: "Israel's central confession, prayed twice daily: 'Hear, O Israel — the Lord our God, the Lord is one.'",
    long: "The Shema (Deuteronomy 6:4–9) is the foundational creed of Israel. Jesus called it the greatest commandment when paired with 'love the Lord your God with all your heart…' Christian believers join Israel in confessing the oneness of God — and in Christ they see the one God revealed as Father, Son, and Spirit.",
    refs: ["Deuteronomy 6:4–9", "Mark 12:29–30"],
    hebrew: { script: "שְׁמַע", translit: "shema", gloss: "hear, listen, obey" } },

  { slug: "torah", word: "Torah",
    short: "The first five books of the Bible — and more deeply, God's instruction for life.",
    long: "Torah is usually translated 'law,' but the root means 'instruction' or 'teaching.' The first five books (Genesis–Deuteronomy) are the Torah of Moses. Beyond that, Psalm 119 sings 'I delight in your torah' — God's whole teaching is a delight to the heart that loves Him.",
    refs: ["Psalm 1:2", "Psalm 119:97", "Matthew 5:17"],
    hebrew: { script: "תּוֹרָה", translit: "Torah", gloss: "instruction, teaching, law" } },

  { slug: "yhwh", word: "YHWH",
    short: "The personal covenant name of God — 'I AM,' revealed to Moses at the burning bush.",
    long: "YHWH (the Tetragrammaton) is the four-letter Hebrew name God gave Moses (Exodus 3:14). Out of reverence, Jewish readers say 'Adonai' (my Lord) in its place; most English Bibles print it as 'LORD' in small caps. Jesus' own 'I AM' sayings (John 8:58) deliberately echo this name and apply it to Himself.",
    refs: ["Exodus 3:14–15", "Isaiah 42:8", "John 8:58"],
    hebrew: { script: "יהוה", translit: "YHWH / Yahweh", gloss: "I AM; He who is" },
    related: ["kurios"] },

  { slug: "yeshua", word: "Yeshua / Jesus",
    short: "The Hebrew/Aramaic name of our Lord — 'Yahweh saves.'",
    long: "Yeshua is the Hebrew name behind 'Jesus' — a contracted form of Yehoshua (Joshua), meaning 'Yahweh is salvation.' The angel told Joseph to name the child Yeshua 'for He will save His people from their sins' (Matthew 1:21). His name is His mission.",
    refs: ["Matthew 1:21", "Acts 4:12", "Philippians 2:9–11"],
    hebrew: { script: "יֵשׁוּעַ", translit: "Yeshua", gloss: "Yahweh is salvation" },
    related: ["christ", "salvation"] },

  // ─────────── ADDITIONAL DOCTRINAL TERMS ───────────

  { slug: "adoption", word: "Adoption",
    short: "God taking us into His family as sons and daughters with full rights.",
    long: "Adoption is the New Testament's most intimate picture of salvation. We are not merely pardoned criminals; we are taken into the Father's house. The Spirit testifies in our hearts that we belong, crying 'Abba!' (Romans 8:15).",
    refs: ["Romans 8:14–17", "Galatians 4:4–7", "Ephesians 1:5"],
    greek: { script: "υἱοθεσία", translit: "huiothesia", gloss: "placement as a son" },
    related: ["abba", "father"] },

  { slug: "ascension", word: "Ascension",
    short: "Forty days after the resurrection, the risen Christ was visibly taken up into heaven.",
    long: "The Ascension is not Christ becoming absent; it is His enthronement at the right hand of the Father, from where He pours out the Spirit and reigns over all things. Acts 1:11 promises He will return in the same way.",
    refs: ["Acts 1:9–11", "Ephesians 1:20–22", "Hebrews 1:3"],
    related: ["pentecost", "parousia"] },

  { slug: "assurance", word: "Assurance",
    short: "The believer's settled confidence of being God's child, given by the Spirit.",
    long: "Assurance is not arrogance about ourselves; it is confidence in Christ. The Spirit testifies with our spirit that we are children of God (Romans 8:16). Assurance grows as we trust the promises of the gospel.",
    refs: ["Romans 8:16", "Hebrews 10:22", "1 John 5:13"] },

  { slug: "christology", word: "Christology",
    short: "The doctrine of the person and work of Christ.",
    long: "Christology asks two ancient questions: Who is Jesus? And what did He do? The Church confessed at Chalcedon (A.D. 451) that Christ is one Person in two natures — fully God and fully man — and that He accomplished our salvation by His life, death, resurrection, ascension, and ongoing intercession.",
    refs: ["Colossians 1:15–20", "Hebrews 4:14–16"] },

  { slug: "creation", word: "Creation",
    short: "God's free, sovereign act of bringing all things into being out of nothing.",
    long: "Genesis 1 declares that God spoke the world into being from nothing (ex nihilo). Creation is not God's body or an emanation from God; it is His good work, distinct from Him, dependent on Him, and declared 'very good.'",
    refs: ["Genesis 1:1, 31", "John 1:3", "Colossians 1:16"],
    hebrew: { script: "בָּרָא", translit: "bara", gloss: "to create (of God alone)" },
    latin: { script: "ex nihilo", translit: "ex nihilo", gloss: "out of nothing" } },

  { slug: "creed", word: "Creed",
    short: "A short, authoritative statement of Christian belief — confessed corporately.",
    long: "The historic creeds (Apostles', Nicene, Chalcedonian, Athanasian) summarize the faith the universal Church has held since the early centuries. To say 'I believe…' is to join one's voice with the millions of saints who have said the same.",
    refs: ["1 Corinthians 15:3–4", "1 Timothy 3:16"],
    latin: { script: "credo", translit: "credo", gloss: "I believe" } },

  { slug: "election", word: "Election",
    short: "God's eternal, gracious choice of a people to be His own in Christ.",
    long: "Scripture teaches that God chose His people in Christ before the foundation of the world (Ephesians 1:4). Christians differ in how they understand election's relation to human response; all affirm that salvation is God's initiative from beginning to end.",
    refs: ["Ephesians 1:4–6", "Romans 9:11", "1 Peter 1:1–2"] },

  { slug: "father", word: "God the Father",
    short: "The first Person of the Trinity — eternally Father of the Son, our Father in Christ.",
    long: "God is eternally Father — not because of us, but because of the Son He has always loved. In Christ, the Father adopts us into the same intimate love He has for the Son. Jesus taught us to begin every prayer: 'Our Father.'",
    refs: ["Matthew 6:9", "John 17:24", "1 John 3:1"],
    related: ["trinity", "abba", "adoption"] },

  { slug: "fellowship", word: "Fellowship",
    short: "The shared life of believers in Christ — practical, mutual, and Spirit-given.",
    long: "Fellowship (koinonia) is the warm, working unity of those who share the same Lord. It involves shared truth, shared table, shared resources, shared suffering, and shared prayer.",
    refs: ["Acts 2:42", "Philippians 1:5", "1 John 1:7"],
    greek: { script: "κοινωνία", translit: "koinōnia" },
    related: ["koinonia", "church"] },

  { slug: "hermeneutics", word: "Hermeneutics",
    short: "The art and discipline of interpreting Scripture rightly.",
    long: "Hermeneutics asks: how do we read the Bible the way it asks to be read? At its heart for Christian readers: Christ Himself opens the Scriptures (Luke 24:27). Sound hermeneutics honors the literal sense, the canonical context, and the centrality of Christ.",
    refs: ["Luke 24:27", "2 Timothy 2:15", "2 Peter 1:20–21"] },

  { slug: "imago-dei", word: "Imago Dei",
    short: "Latin for 'image of God' — every human bears it.",
    long: "Genesis 1:27 declares humans made in the image and likeness of God. Every person — born and unborn, every race, every age, every ability — carries this dignity. The image was marred at the Fall but not erased; in Christ it is being restored.",
    refs: ["Genesis 1:26–27", "Colossians 3:10", "James 3:9"],
    latin: { script: "imago Dei", translit: "imago Dei", gloss: "image of God" } },

  { slug: "imputation", word: "Imputation",
    short: "God crediting Christ's righteousness to the believer's account.",
    long: "Imputation is the legal-theological term for what happens at justification: our sin was reckoned to Christ, and His righteousness is reckoned to us. We are accepted by God on the basis of Christ's record, not our own.",
    refs: ["Romans 4:3–5", "2 Corinthians 5:21"] },

  { slug: "inspiration", word: "Inspiration",
    short: "God's superintending of human authors so that what they wrote is exactly what He intended.",
    long: "2 Timothy 3:16 says Scripture is 'God-breathed' (theopneustos). The biblical writers were not stenographers; the Spirit carried them along (2 Peter 1:21) so that their real human voices speak God's true Word.",
    refs: ["2 Timothy 3:16", "2 Peter 1:20–21"],
    greek: { script: "θεόπνευστος", translit: "theopneustos", gloss: "God-breathed" } },

  { slug: "lords-day", word: "The Lord's Day",
    short: "Sunday — the day the Church has gathered to worship the risen Christ since the apostles.",
    long: "Christ rose on the first day of the week (Mark 16:2). The earliest believers gathered on that day to break bread and worship (Acts 20:7; 1 Corinthians 16:2). John calls it 'the Lord's day' (Revelation 1:10). It is the weekly anniversary of the resurrection.",
    refs: ["Mark 16:2", "Acts 20:7", "Revelation 1:10"],
    related: ["sabbath", "resurrection"] },

  { slug: "lords-prayer", word: "The Lord's Prayer",
    short: "The prayer Jesus taught His disciples to pray — the pattern for all Christian prayer.",
    long: "Found in Matthew 6:9–13 and Luke 11:2–4. Six petitions in two movements: three for God's glory ('Your name, Your kingdom, Your will'), three for our need ('daily bread, forgiveness, deliverance'). Christians have prayed it daily for two thousand years.",
    refs: ["Matthew 6:9–13", "Luke 11:2–4"],
    related: ["prayer", "father"] },

  { slug: "new-covenant", word: "The New Covenant",
    short: "God's promised covenant of inner transformation, sealed in Christ's blood.",
    long: "Jeremiah 31:31–34 promised a covenant where God would write His law on the heart and forgive sin. At the Last Supper Jesus lifted the cup and said, 'This cup is the new covenant in my blood' (Luke 22:20). It is the covenant we now live in.",
    refs: ["Jeremiah 31:31–34", "Luke 22:20", "Hebrews 8:6–13"],
    related: ["covenant", "lords-supper"] },

  { slug: "original-sin", word: "Original sin",
    short: "The inherited condition of sin every person is born into, traced from Adam.",
    long: "Original sin names two truths: that Adam's first sin brought guilt and corruption upon the whole human family (Romans 5:12–21), and that every person is born inclined toward sin. It is not that we are as bad as we could be; it is that we cannot fix ourselves. Only Christ, the second Adam, can.",
    refs: ["Psalm 51:5", "Romans 5:12–19", "Ephesians 2:1–3"],
    related: ["fall", "sin", "salvation"] },

  { slug: "predestination", word: "Predestination",
    short: "God's eternal purpose to bring His chosen people to glory through Christ.",
    long: "Predestination is closely linked to election: God determined beforehand that those He chose in Christ would be conformed to His Son's image (Romans 8:29). Christians have disagreed on its details for centuries; all affirm that our salvation rests on His unchanging purpose, not our changing performance.",
    refs: ["Romans 8:29–30", "Ephesians 1:11"],
    related: ["election"] },

  { slug: "providence", word: "Providence",
    short: "God's wise and personal care over every detail of creation and history.",
    long: "Providence is the doctrine that God did not start the world and walk away. He upholds it moment by moment, governs it in wisdom, and bends even evil toward His good purposes (Genesis 50:20). Not a hair falls without Him.",
    refs: ["Matthew 10:29–30", "Romans 8:28", "Colossians 1:17"] },

  { slug: "regeneration", word: "Regeneration",
    short: "Being born again — the Spirit's hidden, decisive act of giving the dead heart new life.",
    long: "Regeneration is the new birth Jesus told Nicodemus he must have (John 3:3, 5). It is something God does for us before we cooperate with anything. Where there was a heart of stone, He gives a heart of flesh (Ezekiel 36:26).",
    refs: ["John 3:3–8", "Ezekiel 36:26", "Titus 3:5"],
    related: ["sanctification", "holy-spirit"] },

  { slug: "sacrament", word: "Sacrament",
    short: "A visible sign of an invisible grace, instituted by Christ.",
    long: "Most Christians recognize at least two sacraments (sometimes called ordinances): baptism and the Lord's Supper. Catholic, Orthodox, and Anglican tradition recognize more. The word itself means 'sacred oath' — these are the gospel-acts of the Church.",
    refs: ["Matthew 28:19", "1 Corinthians 11:23–26"],
    latin: { script: "sacramentum", translit: "sacramentum", gloss: "sacred oath, mystery" },
    related: ["baptism", "lords-supper"] },

  { slug: "salvation", word: "Salvation",
    short: "Rescue from sin, death, and judgment — to God, by Christ, through the Spirit.",
    long: "Salvation is the whole work of God to deliver His people: past (justification — we were saved), present (sanctification — we are being saved), and future (glorification — we will be saved). Every tense is grace.",
    refs: ["Ephesians 2:8", "Philippians 2:12", "Romans 5:9–10"],
    hebrew: { script: "יְשׁוּעָה", translit: "yeshuah", gloss: "salvation, rescue" },
    greek: { script: "σωτηρία", translit: "sōtēria", gloss: "salvation, deliverance" },
    related: ["yeshua", "atonement"] },

  { slug: "septuagint", word: "Septuagint",
    short: "The Greek translation of the Hebrew Scriptures begun in the 3rd century B.C.",
    long: "The Septuagint (often abbreviated LXX, for the legendary seventy translators) was the Bible of the early Greek-speaking Church. Most New Testament quotations of the Old come from it. It carried the Scriptures into the Roman world long before Christ arrived.",
    refs: ["Acts 8:27–35", "Hebrews 10:5–7"] },

  { slug: "theodicy", word: "Theodicy",
    short: "The attempt to answer how a good and almighty God can allow evil and suffering.",
    long: "Theodicy literally means 'God-justification.' Christian responses have never been simple; the cross stands at the center of all of them. God in Christ entered our suffering. Final theodicy waits for the day every tear is wiped away.",
    refs: ["Job 38:1", "Romans 8:18–25", "Revelation 21:4"],
    related: ["suffering"] },

  { slug: "union-with-christ", word: "Union with Christ",
    short: "The deepest reality of the Christian life — joined to Jesus by the Spirit.",
    long: "Paul's most-used phrase for a Christian is 'in Christ.' Union with Christ means everything He has and is, He shares with His people: His death is our death; His resurrection, our resurrection; His Father, our Father. Every other benefit of salvation flows from this union.",
    refs: ["Romans 6:5", "Galatians 2:20", "Ephesians 1:3–14"],
    related: ["adoption", "justification", "sanctification"] },

  { slug: "vocation", word: "Vocation",
    short: "A calling — God's summons to a person to live out their faith in a particular work.",
    long: "Vocation begins with the universal calling to follow Christ. From there it shapes each life specifically — parent, teacher, farmer, pastor, doctor, friend, neighbor. Every honest work done unto the Lord is holy.",
    refs: ["1 Corinthians 7:17", "Ephesians 4:1", "Colossians 3:23"],
    latin: { script: "vocatio", translit: "vocatio", gloss: "a calling" } },

  { slug: "witness", word: "Witness",
    short: "Telling what we have seen and known of Christ — the basic Christian task.",
    long: "The Greek word is martus — the same root that gives us 'martyr.' To witness is to say what we know. Acts 1:8 promises the Spirit's power for it. Every believer is called to it; not every believer is called to pulpit ministry.",
    refs: ["Acts 1:8", "John 1:7", "1 Peter 3:15"],
    greek: { script: "μάρτυς", translit: "martus", gloss: "witness, martyr" },
    related: ["great-commission", "discipleship"] },

];
