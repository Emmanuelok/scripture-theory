// ─── Foundations of the Faith — Scripture Theory ──────────────
// Twelve weeks for a new believer (or anyone returning to Christ).
//
// Each week has:
//   • theme + tagline
//   • anchor scripture (full text)
//   • a short lesson body (the teaching)
//   • a reading for the week — chapters to walk through
//   • 3–4 reflection questions
//   • a single concrete practice
//   • a 5-question quiz that locks the week
//
// Doctrine is held ECUMENICALLY where Christians have legitimately
// disagreed for centuries — baptism mode, communion theology,
// church order, charismata. Where Scripture is unambiguous (the
// gospel, the Trinity, the resurrection, Scripture's authority,
// salvation by grace through faith) we are unambiguous too.

export type Quiz = {
  q: string;
  options: string[];
  correctIndex: number;
  /** Short explanation shown after the believer answers. */
  why: string;
};

export type CourseWeek = {
  week: number; // 1..12
  title: string;
  tagline: string;
  scripture: { ref: string; text: string };
  reading: string[]; // chapter references for the week
  lesson: string[]; // paragraphs
  reflection: string[];
  practice: string;
  quiz: Quiz[];
};

export const COURSE_TITLE = "Foundations of the Faith";
export const COURSE_SUBTITLE = "Twelve weeks for a new believer.";
export const COURSE_PASS_PCT = 80;

export const COURSE_WEEKS: CourseWeek[] = [
  /* ── WEEK 1 ──────────────────────────────────────────────── */
  {
    week: 1,
    title: "Who Jesus Is",
    tagline: "Everything else hangs on this answer.",
    scripture: {
      ref: "John 1:1-4, 14",
      text:
        "In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through Him… In Him was life, and the life was the light of men. And the Word became flesh and dwelt among us, and we saw His glory, glory as of the only Son from the Father, full of grace and truth.",
    },
    reading: ["John 1", "John 3", "John 14", "Colossians 1"],
    lesson: [
      "The Christian faith is not first a moral system, not first a community, not first a feeling. It is a Person. Everything else flows from who Jesus is — and the New Testament makes a staggering claim: He is God, in the flesh, walking around.",
      "Look at John 1 carefully. The Word was with God (so He is distinct from the Father) and the Word was God (so He is fully God), and the Word became flesh (so He is fully human). The Church has named this mystery for centuries: Jesus is one Person in two natures, fully God and fully man.",
      "This matters because only God can save us, and only a real human can stand in for us. A merely-good-teacher Jesus could not bear sin. A merely-divine Jesus could not die. The Jesus the Scriptures show us is exactly the Savior we need.",
    ],
    reflection: [
      "Before this week, what did you think of when you heard the name Jesus?",
      "Read John 1 slowly. What surprises you about the way John describes Him?",
      "If Jesus really is God in the flesh, what should that change about your week?",
    ],
    practice:
      "Read John 1 aloud once this week, slowly. Underline every line that describes who Jesus is.",
    quiz: [
      {
        q: "According to John 1, who was 'with God in the beginning' and 'was God'?",
        options: ["Moses", "The Word (Jesus)", "The Spirit", "The Father alone"],
        correctIndex: 1,
        why: "John 1:1 — 'In the beginning was the Word, and the Word was with God, and the Word was God.' John uses 'the Word' for the eternal Son who became Jesus.",
      },
      {
        q: "When the Bible says Jesus is 'fully God and fully man,' it means…",
        options: [
          "Half God, half human",
          "God during His ministry, human afterward",
          "One Person who is truly God and truly human",
          "A spiritual being only",
        ],
        correctIndex: 2,
        why: "Jesus is one Person in two complete natures — the historic confession of the global Church since at least the Council of Chalcedon (AD 451).",
      },
      {
        q: "Why does it matter that Jesus is fully human?",
        options: [
          "It means He can sympathize with our weakness",
          "Because only a real man could stand in our place and die for sin",
          "Both of the above",
          "It does not matter",
        ],
        correctIndex: 2,
        why: "Hebrews 2:17 and 4:15 — He was made like us in every way so He could be a faithful high priest and bear our sin.",
      },
      {
        q: "What does John 1:14 say about Jesus?",
        options: [
          "He sent a message",
          "The Word became flesh and dwelt among us",
          "He spoke from heaven only",
          "He was an angel",
        ],
        correctIndex: 1,
        why: "John 1:14 — God did not stay far. He came near. He took on a body.",
      },
      {
        q: "Christianity is, at its center…",
        options: [
          "A moral system",
          "A community",
          "A Person — Jesus Christ",
          "A set of rituals",
        ],
        correctIndex: 2,
        why: "Everything Christians do flows from who Jesus is. The faith is a Person before it is anything else.",
      },
    ],
  },

  /* ── WEEK 2 ──────────────────────────────────────────────── */
  {
    week: 2,
    title: "What He Did",
    tagline: "The cross. The empty tomb.",
    scripture: {
      ref: "1 Corinthians 15:3-4",
      text:
        "For I delivered to you first of all that which I also received, that Christ died for our sins according to the Scriptures; and that He was buried; and that He has been raised on the third day according to the Scriptures.",
    },
    reading: ["Mark 14", "Mark 15", "Mark 16", "1 Corinthians 15"],
    lesson: [
      "Paul condensed the whole gospel into four facts: Christ died, He was buried, He rose, He was seen. The cross was not an accident; the resurrection was not a metaphor. Both happened in history, on identifiable days, in a real place, witnessed by named people.",
      "Why the cross? Because sin earns death (Romans 6:23), and a holy God cannot pretend it does not. The unimaginable mercy of the cross is that the Judge took the punishment Himself. Jesus stood in your place. He absorbed what your sin deserved.",
      "Why the resurrection? Because the Father's verdict on the cross is announced when He raises the Son. 'It is finished' (John 19:30) is sealed by the empty tomb. If Christ has not been raised, Paul says, our faith is futile (1 Cor 15:17). But He has. And our faith is not.",
    ],
    reflection: [
      "Why is it good news that Jesus died, when death is usually bad news?",
      "If the resurrection didn't happen, what would change about Christianity?",
      "What sin in your life specifically did Jesus die for?",
    ],
    practice:
      "Memorize 1 Corinthians 15:3-4. Say it back, out loud, at the end of the week.",
    quiz: [
      {
        q: "Paul summarizes the gospel as Christ died, was buried, rose, and…",
        options: ["sat at God's right hand", "was seen", "ascended", "spoke to angels"],
        correctIndex: 1,
        why: "1 Corinthians 15:5-8 lists named witnesses — Peter, the Twelve, 500 brothers, James, Paul.",
      },
      {
        q: "What does 'Christ died for our sins' mean?",
        options: [
          "He died as an example only",
          "He died in our place, bearing what we deserved",
          "He died accidentally",
          "He died of natural causes",
        ],
        correctIndex: 1,
        why: "Substitutionary atonement: He took our place. (Isaiah 53:5-6, 2 Cor 5:21, 1 Pet 2:24.)",
      },
      {
        q: "If Christ has not been raised, Paul says our faith is…",
        options: ["strong", "useful", "futile", "private"],
        correctIndex: 2,
        why: "1 Corinthians 15:17 — 'If Christ has not been raised, your faith is futile and you are still in your sins.' The resurrection is the hinge.",
      },
      {
        q: "Romans 6:23 says the wages of sin is…",
        options: ["sickness", "death", "loneliness", "ignorance"],
        correctIndex: 1,
        why: "'For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.'",
      },
      {
        q: "Jesus' last words from the cross in John's Gospel were…",
        options: [
          "'My God, my God…'",
          "'Forgive them, Father.'",
          "'It is finished.'",
          "'Into Your hands I commit My spirit.'",
        ],
        correctIndex: 2,
        why: "John 19:30. 'It is finished' is one Greek word — tetelestai — meaning the debt has been paid in full.",
      },
    ],
  },

  /* ── WEEK 3 ──────────────────────────────────────────────── */
  {
    week: 3,
    title: "Father, Son, and Spirit",
    tagline: "One God, in three Persons, forever.",
    scripture: {
      ref: "Matthew 28:19",
      text:
        "Go therefore and make disciples of all the nations, baptizing them in the name [singular] of the Father and of the Son and of the Holy Spirit.",
    },
    reading: ["Matthew 28", "John 14", "John 16", "2 Corinthians 13"],
    lesson: [
      "There is one God (Deuteronomy 6:4). And yet the New Testament names the Father as God, the Son as God, and the Spirit as God — three Persons, one Being. The Church has called this the Trinity for nineteen centuries. It is not a contradiction; it is a mystery, and it is the deepest joy.",
      "You can see it everywhere in the New Testament. At Jesus' baptism, the Spirit descends, the Father speaks, the Son is baptized — three Persons, one God, one moment (Matt 3:16-17). Jesus prays to the Father (John 17). The Spirit testifies to Jesus (John 15:26). Paul's blessing names all three (2 Cor 13:14).",
      "Why does this matter for you? Because the gospel is Trinitarian. The Father sent the Son in the power of the Spirit to bring you home (Galatians 4:4-6). You are loved by Three, in one love.",
    ],
    reflection: [
      "Which Person of the Trinity have you thought of least, and why?",
      "Why does the Trinity protect us from imagining God as a lonely solitary figure?",
      "How does it change your prayer to know you are talking to a Father?",
    ],
    practice:
      "Pray to each Person this week: one day address the Father directly, one day Jesus, one day the Spirit. Same God; three lawful ways to speak to Him.",
    quiz: [
      {
        q: "The Trinity teaches that there is…",
        options: [
          "One God in one Person",
          "Three gods working together",
          "One God in three Persons",
          "One God who appears in different modes",
        ],
        correctIndex: 2,
        why: "One Being, three eternally distinct Persons — Father, Son, Holy Spirit. This is the historic confession of every Christian tradition.",
      },
      {
        q: "Where in the Gospels do we see all three Persons together at once?",
        options: ["The Sermon on the Mount", "The Transfiguration", "Jesus' baptism", "The Last Supper"],
        correctIndex: 2,
        why: "Matthew 3:16-17 — the Spirit descends, the Father speaks, the Son is in the water.",
      },
      {
        q: "Jesus said the Spirit's primary work is to…",
        options: [
          "Make us comfortable",
          "Testify about Him",
          "Make us wealthy",
          "Replace the need for Scripture",
        ],
        correctIndex: 1,
        why: "John 15:26, 16:14 — the Spirit testifies about Jesus and glorifies Him.",
      },
      {
        q: "When Paul prays for the church (2 Cor 13:14), he names…",
        options: [
          "Only God the Father",
          "Father, Son, and Spirit",
          "Jesus only",
          "Angels and saints",
        ],
        correctIndex: 1,
        why: "'The grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit be with you all.'",
      },
      {
        q: "The Trinity matters for the gospel because…",
        options: [
          "The Father sent the Son in the power of the Spirit",
          "It is a theological puzzle",
          "It impresses people",
          "It is a Catholic doctrine only",
        ],
        correctIndex: 0,
        why: "Galatians 4:4-6 — the whole gospel is Trinitarian. You are loved by Three, in one love.",
      },
    ],
  },

  /* ── WEEK 4 ──────────────────────────────────────────────── */
  {
    week: 4,
    title: "The Bible",
    tagline: "God's Word — sufficient, trustworthy, alive.",
    scripture: {
      ref: "2 Timothy 3:16-17",
      text:
        "Every Scripture is God-breathed, and profitable for teaching, for reproof, for correction, and for instruction in righteousness, that each person who belongs to God may be complete, thoroughly equipped for every good work.",
    },
    reading: ["Psalm 119:1-32", "2 Timothy 3", "Hebrews 4:12-13", "2 Peter 1:16-21"],
    lesson: [
      "The Bible is the inspired, written Word of God. 'God-breathed,' Paul calls it (2 Tim 3:16). Sixty-six books, forty-some authors, more than a thousand years — and yet one Story, one Voice. Christians have always confessed: the Spirit moved the writers (2 Pet 1:21), and what they wrote is what God said.",
      "The whole Story is about Jesus. He told the disciples on the road to Emmaus that Moses and the Prophets spoke of Him (Luke 24:27). The Old Testament prepares; the Gospels record; the rest of the New Testament unfolds. Don't read the Bible looking only for advice. Read it looking for Christ.",
      "There are 14 public-domain translations on this platform. They are all real translations by named, faithful scholars. Pick one you can actually read; we recommend WEB or KJV for English. Then come back tomorrow.",
    ],
    reflection: [
      "If the Bible is really God-breathed, what should that change about how you read it?",
      "Which Bible book are you most curious about — and what would it take to read it this season?",
      "How is reading Scripture different from reading anything else?",
    ],
    practice:
      "Read one chapter a day this week. Begin John, Mark, or Psalms. Same time, same place, every day.",
    quiz: [
      {
        q: "Paul says Scripture is 'God-breathed' in…",
        options: ["Romans 8", "2 Timothy 3:16", "John 1:1", "Hebrews 11"],
        correctIndex: 1,
        why: "'All Scripture is breathed out by God' — the foundational claim about Scripture's origin.",
      },
      {
        q: "On the road to Emmaus, Jesus showed the disciples that…",
        options: [
          "Only the New Testament is about Him",
          "Moses and all the Prophets spoke of Him",
          "The Old Testament is no longer relevant",
          "He was a new prophet",
        ],
        correctIndex: 1,
        why: "Luke 24:27 — Jesus is the key to the whole Story, Old Testament and New.",
      },
      {
        q: "The Bible is…",
        options: [
          "Inspired, sufficient, trustworthy",
          "A collection of moral fables",
          "Useful but optional",
          "A book about us",
        ],
        correctIndex: 0,
        why: "It is what God said and is enough for faith and life (2 Tim 3:16-17).",
      },
      {
        q: "How many books are in the Protestant canon of Scripture?",
        options: ["27", "39", "66", "73"],
        correctIndex: 2,
        why: "66 — 39 Old Testament + 27 New Testament. Catholic and Orthodox traditions include additional 'Deuterocanonical' books; this platform honors that.",
      },
      {
        q: "2 Peter 1:21 says that 'men spoke from God' as they were…",
        options: ["enlightened", "carried along by the Holy Spirit", "alone", "moved by their feelings"],
        correctIndex: 1,
        why: "The Spirit carried the writers — what they wrote is what God said.",
      },
    ],
  },

  /* ── WEEK 5 ──────────────────────────────────────────────── */
  {
    week: 5,
    title: "Prayer",
    tagline: "How a child of God talks to a Father.",
    scripture: {
      ref: "Matthew 6:9-13",
      text:
        "Our Father in heaven, may Your name be kept holy. Let Your Kingdom come. Let Your will be done, on earth as it is in heaven. Give us today our daily bread. Forgive us our debts, as we also forgive our debtors. Bring us not into temptation, but deliver us from the evil one. For Yours is the Kingdom, the power, and the glory forever. Amen.",
    },
    reading: ["Matthew 6:5-15", "Luke 11:1-13", "Philippians 4:6-7", "Psalm 51"],
    lesson: [
      "Prayer is not a technique. It is the freedom of a child to talk to a Father. When the disciples asked Jesus how to pray, He gave them the words we still pray: Our Father. That is everything. We are not begging an angry deity; we are speaking with our Father.",
      "There are four classic notes in Christian prayer — Adoration, Confession, Thanksgiving, Supplication. Adoration is praise — naming who God is. Confession is honesty about sin. Thanksgiving names His mercies, big and small. Supplication brings needs — yours and others'. The Lord's Prayer holds all four.",
      "You will pray dry days. You will pray distracted days. You will pray on days when it feels like the ceiling is concrete. Keep going. He hears you. The point is not the feeling; the point is the Father.",
    ],
    reflection: [
      "What stops you from praying as much as you'd like?",
      "Which line of the Lord's Prayer is hardest for you to mean right now?",
      "Is there something specific you've been afraid to ask the Father about?",
    ],
    practice:
      "Pray the Lord's Prayer slowly each morning this week. One phrase at a time. Pause to mean it.",
    quiz: [
      {
        q: "How did Jesus teach His disciples to begin prayer?",
        options: [
          "'O great judge'",
          "'Our Father in heaven'",
          "'Lord above the gods'",
          "'Almighty Sovereign'",
        ],
        correctIndex: 1,
        why: "Matthew 6:9 — 'Our Father.' The relationship of a child to a Father is the foundation of Christian prayer.",
      },
      {
        q: "The four classical notes of Christian prayer are A-C-T-S:",
        options: [
          "Adoration, Confession, Thanksgiving, Supplication",
          "Asking, Crying, Trusting, Singing",
          "Anger, Confusion, Tears, Silence",
          "Adoration, Charity, Trust, Sleep",
        ],
        correctIndex: 0,
        why: "Praise, honesty about sin, gratitude, and bringing needs. All four are in the Lord's Prayer.",
      },
      {
        q: "Philippians 4:6 tells us, instead of being anxious, to…",
        options: ["work harder", "be silent", "present our requests to God with thanksgiving", "ignore the problem"],
        correctIndex: 2,
        why: "'In everything by prayer and supplication with thanksgiving let your requests be made known to God.'",
      },
      {
        q: "Distraction in prayer means…",
        options: [
          "You should stop praying",
          "God isn't listening",
          "You're human; return your attention and continue",
          "You aren't a real Christian",
        ],
        correctIndex: 2,
        why: "Every faithful believer in history has struggled with distraction in prayer. Keep returning. The Father isn't grading.",
      },
      {
        q: "The point of prayer is…",
        options: [
          "To produce a feeling",
          "To impress God",
          "Communion with the Father",
          "To get what you want",
        ],
        correctIndex: 2,
        why: "Prayer is relationship before request. You will not always feel it. He always hears.",
      },
    ],
  },

  /* ── WEEK 6 ──────────────────────────────────────────────── */
  {
    week: 6,
    title: "Repentance & Forgiveness",
    tagline: "Turn. Be forgiven. Forgive.",
    scripture: {
      ref: "1 John 1:9",
      text:
        "If we confess our sins, He is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.",
    },
    reading: ["Psalm 51", "Luke 15", "Matthew 18:21-35", "1 John 1"],
    lesson: [
      "Repentance is not despair. It is not earning forgiveness. It is turning — from sin and toward God. The word itself means a change of mind that results in a change of direction. The believer's whole life is, in one sense, a long turn home.",
      "The promise of 1 John 1:9 is breathtaking: if we confess, He forgives. Always. Every time. He does not ration grace. He does not nurse grudges. He does not hold the sins of last month over the head of the child He has already adopted.",
      "Then there is the other side. Jesus tells us to forgive as we have been forgiven (Matt 6:14-15, 18:21-35). This is hard. It does not mean pretending the wound did not happen. It means handing the debt to the One who keeps the books. You can do this. He empowers what He commands.",
    ],
    reflection: [
      "Is there a specific sin you have not yet confessed to the Father, by name?",
      "Is there a specific person you have not yet forgiven?",
      "What is the difference between forgiving and pretending the wound did not happen?",
    ],
    practice:
      "Confess one specific sin to the Father this week. If you can, walk a forgiveness step toward one specific person. Use /forgive on the platform if it helps.",
    quiz: [
      {
        q: "What is repentance?",
        options: [
          "Earning forgiveness through guilt",
          "Turning from sin and toward God",
          "A one-time act at conversion",
          "Promising never to sin again",
        ],
        correctIndex: 1,
        why: "Repentance is a change of mind that results in a change of direction — and it continues throughout the Christian life.",
      },
      {
        q: "1 John 1:9 says when we confess, God…",
        options: [
          "Forgives sometimes",
          "Reduces the punishment",
          "Faithfully forgives and cleanses",
          "Waits for proof we won't repeat",
        ],
        correctIndex: 2,
        why: "He is faithful and righteous to forgive. Always.",
      },
      {
        q: "In Matthew 18, how many times does Jesus say to forgive?",
        options: ["Seven times", "Seventy times seven (without limit)", "Twice", "Only those who deserve it"],
        correctIndex: 1,
        why: "Forgiveness is to be without measure — because that is how we have been forgiven.",
      },
      {
        q: "To forgive does NOT mean…",
        options: [
          "Releasing the debt",
          "Refusing bitterness",
          "Pretending the wound never happened",
          "Trusting God with the books",
        ],
        correctIndex: 2,
        why: "Forgiveness does not minimize the wound. It hands the debt to the One who judges rightly.",
      },
      {
        q: "Why are believers told to forgive?",
        options: [
          "Because the offender deserves it",
          "Because we have been forgiven first",
          "Because feelings will follow",
          "Because it heals the offender",
        ],
        correctIndex: 1,
        why: "Ephesians 4:32 — 'Forgiving one another, as God in Christ has forgiven you.'",
      },
    ],
  },

  /* ── WEEK 7 ──────────────────────────────────────────────── */
  {
    week: 7,
    title: "The Holy Spirit & New Life",
    tagline: "He lives in you.",
    scripture: {
      ref: "Romans 8:11",
      text:
        "If the Spirit of Him who raised up Jesus from the dead dwells in you, He who raised up Christ Jesus from the dead will also give life to your mortal bodies through His Spirit who dwells in you.",
    },
    reading: ["John 14:15-31", "John 16:5-15", "Romans 8", "Galatians 5"],
    lesson: [
      "When you trusted Christ, the Spirit of God moved in. Not to visit — to live. Romans 8:9 says anyone who does not have the Spirit of Christ does not belong to Him; the corollary is staggering: if you do belong to Christ, His Spirit is in you. The same Spirit who raised Jesus.",
      "The Spirit does specific work. He testifies that you are God's child (Rom 8:16). He prays for you when you can't find the words (Rom 8:26). He produces fruit — love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control (Gal 5:22-23). This fruit is the slow, real evidence that He is changing you.",
      "Christians have disagreed in love for centuries about specific gifts of the Spirit — tongues, healing, prophecy. We honor that conversation. What every faithful tradition affirms: the Spirit indwells every believer, produces fruit, and equips you to serve the body.",
    ],
    reflection: [
      "Which fruit of the Spirit is the Spirit slowly growing in you?",
      "Have you ever asked the Father to fill you afresh with His Spirit? Do that today.",
      "What does it change to know your prayer is helped by the Spirit Himself?",
    ],
    practice:
      "Each morning this week, before you do anything, ask the Father: 'Fill me with Your Spirit today.' Then watch.",
    quiz: [
      {
        q: "Romans 8 says the Spirit who dwells in believers is the same Spirit who…",
        options: ["wrote the Old Testament", "raised Jesus from the dead", "moved over the waters", "spoke through angels"],
        correctIndex: 1,
        why: "Romans 8:11. The resurrection power lives in His people.",
      },
      {
        q: "The 'fruit of the Spirit' (Gal 5:22-23) begins with…",
        options: ["zeal", "love", "wisdom", "patience"],
        correctIndex: 1,
        why: "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
      },
      {
        q: "Romans 8:26 says when we don't know how to pray, the Spirit…",
        options: ["leaves us alone", "intercedes for us with groanings", "scolds us", "writes us a script"],
        correctIndex: 1,
        why: "The Spirit Himself prays in and through the believer.",
      },
      {
        q: "When does the Holy Spirit come to live in a believer?",
        options: [
          "After years of faithfulness",
          "After baptism only",
          "When you first trust Christ",
          "Only at a special second experience",
        ],
        correctIndex: 2,
        why: "Ephesians 1:13 — you were sealed with the Holy Spirit when you believed. (Christians have varied views on subsequent fillings — see the Apologetics page.)",
      },
      {
        q: "The fruit of the Spirit grows…",
        options: ["instantly", "by your effort alone", "slowly, by Him, in the soil of obedience", "only in pastors"],
        correctIndex: 2,
        why: "It is fruit, not manufacture. Real. Slow. Sure.",
      },
    ],
  },

  /* ── WEEK 8 ──────────────────────────────────────────────── */
  {
    week: 8,
    title: "The Church",
    tagline: "One body. Many members.",
    scripture: {
      ref: "Acts 2:42",
      text:
        "They continued steadfastly in the apostles' teaching and fellowship, in the breaking of bread and in the prayers.",
    },
    reading: ["Acts 2:42-47", "1 Corinthians 12", "Ephesians 4", "Hebrews 10:19-25"],
    lesson: [
      "There is no solo Christianity in the Bible. From Acts 2 onward, the believers gathered — for teaching, for the meal, for prayer, for one another. Jesus is building one Church across every tribe and tongue, and you cannot grow as a hand cut off from the body (1 Cor 12).",
      "The local church is not optional and is not replaceable by this app. We exist under, not over, your local body. Find a faithful church — one that preaches Jesus, honors the Scriptures, and loves like Christ. Join it. Submit to its elders. Take communion with it. Be known.",
      "You are not coming to receive only. You are coming to be a member — a hand, a foot, an ear (1 Cor 12:14-26). Bring your gifts. Bring your wounds. Stay long enough to be known and to know.",
    ],
    reflection: [
      "What's kept you out of (or at the edge of) a local church?",
      "What would 'being known' by a local body cost you — and what would it give you?",
      "What gift might Christ have given you for the building up of the body?",
    ],
    practice:
      "If you do not have a church home, visit one this Sunday. Use /connect to find one. If you have one, tell a leader that you are walking through this course.",
    quiz: [
      {
        q: "Acts 2:42 describes the first Christians as continuing in four things. Which?",
        options: [
          "Teaching, fellowship, breaking of bread, prayers",
          "Singing, work, prayer, almsgiving",
          "Apostles' teaching, miracles, evangelism, worship",
          "Reading, fasting, healing, witness",
        ],
        correctIndex: 0,
        why: "Acts 2:42 — the four marks of a faithful church.",
      },
      {
        q: "Paul calls the church 'the body of Christ' to teach that…",
        options: [
          "Every Christian is identical",
          "Every member has a different role and all are needed",
          "Only leaders matter",
          "It is a metaphor only",
        ],
        correctIndex: 1,
        why: "1 Corinthians 12. The eye cannot say to the hand, 'I have no need of you.'",
      },
      {
        q: "Hebrews 10:24-25 commands believers to…",
        options: [
          "Pray alone always",
          "Avoid meeting together",
          "Stir one another up to love, not neglecting to meet together",
          "Find a perfect church",
        ],
        correctIndex: 2,
        why: "Not neglecting our meeting together — and stirring one another to love and good works.",
      },
      {
        q: "Can a believer grow without a local church?",
        options: ["Yes, easily", "Yes, if they read enough", "Not as God designed it", "Only pastors need church"],
        correctIndex: 2,
        why: "Christian life is by design embodied and communal. You cannot fulfill the 'one another' commands alone.",
      },
      {
        q: "When choosing a church, what matters most?",
        options: [
          "It preaches Christ, honors the Scriptures, and loves like Him",
          "It has the best music",
          "It is small",
          "It is famous",
        ],
        correctIndex: 0,
        why: "Word, sacrament, prayer, love. Across every faithful tradition.",
      },
    ],
  },

  /* ── WEEK 9 ──────────────────────────────────────────────── */
  {
    week: 9,
    title: "Baptism & the Lord's Supper",
    tagline: "Two practices Jesus gave His Church.",
    scripture: {
      ref: "Matthew 28:19-20",
      text:
        "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.",
    },
    reading: ["Matthew 28", "Romans 6:1-14", "1 Corinthians 11:23-34", "Acts 8:26-39"],
    lesson: [
      "Jesus commanded two specific practices for His Church: baptism and the Lord's Supper. Christians have lovingly disagreed for centuries on the details — when to baptize, how much water, what exactly the Supper does — but every faithful tradition has held both close.",
      "Baptism is the public sign of belonging to Christ. Romans 6 connects it to dying and rising with Jesus. You go into the water; the old you is buried; you come up new. If you have trusted Christ and are not yet baptized, this is the next step — and a local pastor is who you talk to about it, not an app.",
      "The Lord's Supper (Communion, Eucharist, the Table) is the meal Jesus gave us the night before He died. We take the bread and the cup; we proclaim His death; we remember; we anticipate His return. Christians describe what happens at the Table in different ways. Christ is there in some real sense. Receive Him.",
    ],
    reflection: [
      "Have you been baptized? If not, who is the pastor you could talk to?",
      "What does it mean to you that the Table proclaims His death 'until He comes' (1 Cor 11:26)?",
      "Why might Jesus have given His Church two physical signs, not just words?",
    ],
    practice:
      "If you have never been baptized, message a pastor this week and ask. If you have, take communion at your local church this Sunday with full attention.",
    quiz: [
      {
        q: "Jesus commanded baptism in His Great Commission. He said to baptize…",
        options: [
          "Only adults",
          "In the name of the Father, Son, and Holy Spirit",
          "In secret",
          "Without water",
        ],
        correctIndex: 1,
        why: "Matthew 28:19. The Trinitarian formula is the standard for every Christian tradition.",
      },
      {
        q: "Romans 6 connects baptism to…",
        options: [
          "Earning salvation",
          "Dying and rising with Christ",
          "Joining a denomination",
          "Becoming clean physically",
        ],
        correctIndex: 1,
        why: "Romans 6:3-4. The old you is buried; the new you walks in newness of life.",
      },
      {
        q: "1 Corinthians 11:26 says when you take the Supper you…",
        options: [
          "Earn forgiveness",
          "Make Jesus return",
          "Proclaim the Lord's death until He comes",
          "Become more spiritual",
        ],
        correctIndex: 2,
        why: "The Table is preaching with bread and cup — past, present, and future.",
      },
      {
        q: "Christian traditions disagree about exactly how Christ is present at the Table. We should respond by…",
        options: [
          "Choosing the cleverest theology",
          "Holding the unity of Christ's people while honoring the conversation",
          "Refusing to take communion until we settle it",
          "Avoiding the Table altogether",
        ],
        correctIndex: 1,
        why: "Christians have held different views for centuries. The platform exists under your local church on these matters.",
      },
      {
        q: "The right person to talk to about being baptized is…",
        options: ["A social media coach", "An app", "A faithful local pastor", "A friend who's also new"],
        correctIndex: 2,
        why: "Baptism is a church act — done by Christ's body, into Christ's body. Find a local pastor.",
      },
    ],
  },

  /* ── WEEK 10 ─────────────────────────────────────────────── */
  {
    week: 10,
    title: "Witness",
    tagline: "Tell someone what He has done.",
    scripture: {
      ref: "Acts 1:8",
      text:
        "You will receive power when the Holy Spirit has come upon you. You will be witnesses to Me in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth.",
    },
    reading: ["Acts 1", "Acts 4:1-22", "1 Peter 3:13-17", "John 4:1-42"],
    lesson: [
      "A witness tells what they have seen and heard. That's all. You do not need a seminary degree, an outline, or a Bible college. You need the truth — Jesus is real, He has saved me, here is what He has done — and the courage to say it.",
      "Most people come to Christ through one ordinary friend who told them gently and stayed close. Not a preacher on TV. A neighbor. A roommate. A cousin. The Spirit pairs your faltering words with His power (1 Cor 2:4).",
      "1 Peter 3:15 says: be ready to give a reason for the hope that is in you — with meekness and fear. Posture matters as much as content. You are not arguing someone into the Kingdom; you are introducing them to a Person you love.",
    ],
    reflection: [
      "Who in your life right now does not yet know Jesus?",
      "What stops you from telling them?",
      "What is the simplest version of your story you could share over coffee?",
    ],
    practice:
      "Tell one person this week, in plain words: 'Here is something Jesus has done in my life.' Don't argue. Don't perform. Tell.",
    quiz: [
      {
        q: "In Acts 1:8, the power for witness comes from…",
        options: ["our personality", "the Holy Spirit", "training", "luck"],
        correctIndex: 1,
        why: "You will receive POWER when the Holy Spirit has come upon you.",
      },
      {
        q: "1 Peter 3:15 tells believers to give a reason for the hope in us, with…",
        options: ["pride", "force", "meekness and fear", "silence"],
        correctIndex: 2,
        why: "Posture matters. The how is as Christian as the what.",
      },
      {
        q: "A witness is someone who…",
        options: ["argues", "tells what they have seen and heard", "preaches", "debates"],
        correctIndex: 1,
        why: "You are not the judge or the prosecutor. You are the witness.",
      },
      {
        q: "Most people come to Christ through…",
        options: ["TV preachers", "ordinary friends who tell them gently and stay close", "books", "billboards"],
        correctIndex: 1,
        why: "The pattern of Acts and church history. Witness is friendship plus truth, over time.",
      },
      {
        q: "The samaritan woman in John 4 told the village about Jesus by…",
        options: [
          "preaching a sermon",
          "telling them everything He had told her",
          "writing a tract",
          "hiding her past",
        ],
        correctIndex: 1,
        why: "John 4:39 — her testimony, her real life, brought a town to Jesus.",
      },
    ],
  },

  /* ── WEEK 11 ─────────────────────────────────────────────── */
  {
    week: 11,
    title: "Suffering, Hope, and Eternity",
    tagline: "Living between the times.",
    scripture: {
      ref: "Romans 8:18",
      text:
        "I consider that the sufferings of this present time are not worthy to be compared with the glory which will be revealed toward us.",
    },
    reading: ["Romans 8", "1 Peter 4", "Revelation 21", "John 14:1-7"],
    lesson: [
      "The Christian life is lived between Christ's first coming and His second. The Kingdom has come; it has not yet come in full. So we suffer real loss, real grief, real hardship — and we do not grieve as those without hope (1 Thess 4:13). Hope is the Christian's distinctive note in the dark.",
      "Suffering does specific work in the believer. It produces endurance, endurance produces character, character produces hope (Romans 5:3-5). The cross-shaped life is not the absence of pain; it is the discovery that pain is not the last word.",
      "Revelation 21 is the future of every believer: God dwelling with His people, every tear wiped from every eye, no more death, no more mourning, no more pain. The old things have passed. Behold, He makes all things new. This is where the Story is going. Lean into it.",
    ],
    reflection: [
      "What loss are you carrying right now that you have not yet brought to Him?",
      "How is your suffering different because of Jesus — not lighter, but different?",
      "What does it change about today to know how the Story ends?",
    ],
    practice:
      "Read Revelation 21:1-7 every day this week, slowly, out loud. Memorize verse 4 if you can.",
    quiz: [
      {
        q: "Christians grieve…",
        options: [
          "Pretending nothing happened",
          "As those without hope",
          "But not as those without hope",
          "Less than others",
        ],
        correctIndex: 2,
        why: "1 Thessalonians 4:13. We feel real loss — and a real hope.",
      },
      {
        q: "Romans 5:3-5 says suffering produces…",
        options: [
          "endurance, character, hope",
          "anger, doubt, bitterness",
          "wealth, status, fame",
          "weakness, fear, exhaustion",
        ],
        correctIndex: 0,
        why: "A specific chain — suffering does real work in the saint.",
      },
      {
        q: "Revelation 21 promises that in the new creation…",
        options: [
          "we will rest forever doing nothing",
          "God will dwell with His people; every tear wiped away",
          "we will become gods",
          "the earth will be destroyed",
        ],
        correctIndex: 1,
        why: "Revelation 21:3-4. God with us — the deepest joy.",
      },
      {
        q: "Hope, for the Christian, is…",
        options: [
          "Wishful thinking",
          "Confidence in what Christ has promised",
          "A feeling",
          "Optimism about life",
        ],
        correctIndex: 1,
        why: "Hebrews 6:19 — hope is an anchor for the soul. It rests on Christ's promise, not your mood.",
      },
      {
        q: "Romans 8:18 says the sufferings of this present time…",
        options: [
          "destroy our faith",
          "are not worthy to be compared with coming glory",
          "are God's punishment",
          "have no purpose",
        ],
        correctIndex: 1,
        why: "Glory awaits. Today's pain is real, but it is not the last word.",
      },
    ],
  },

  /* ── WEEK 12 ─────────────────────────────────────────────── */
  {
    week: 12,
    title: "The Long Obedience",
    tagline: "A lifetime of following Jesus.",
    scripture: {
      ref: "Hebrews 12:1-2",
      text:
        "Let us also lay aside every weight and the sin which so easily entangles us, and let us run with patience the race that is set before us, looking to Jesus, the author and perfecter of faith, who for the joy that was set before Him endured the cross, despising shame, and has sat down at the right hand of the throne of God.",
    },
    reading: ["Philippians 3", "2 Timothy 2", "Hebrews 12", "Psalm 1"],
    lesson: [
      "Twelve weeks does not finish a disciple. Twelve years will not. The Christian life is, as Eugene Peterson put it, 'a long obedience in the same direction.' The cross is once-for-all. The walk is for life.",
      "Three habits will hold you through the years: the Word (read it daily, even briefly), prayer (talk to your Father, every day), and the gathered Body (a faithful local church, in person, week by week). Add to these the small disciplines you have learned in this course — confession, fasting, the Lord's Supper, sabbath, generosity, witness.",
      "And then disciple someone else (2 Timothy 2:2). The faithful believer becomes a parent in the faith — walking with one other person, who walks with one other person, until the Kingdom fills the earth. You started this course as a new believer. By twelve weeks from today, you can be helping someone else start theirs.",
    ],
    reflection: [
      "Twelve weeks in — what has changed in you?",
      "Who could you walk this same course alongside next?",
      "What one discipline will you carry for the rest of your life?",
    ],
    practice:
      "Open The Path on /disciple. Mark Stages 1–4 if they are honestly true of you. Pick the next stage. Walk it.",
    quiz: [
      {
        q: "Hebrews 12 tells us to run the race…",
        options: [
          "looking at our progress",
          "looking to Jesus",
          "comparing ourselves to others",
          "looking back",
        ],
        correctIndex: 1,
        why: "Hebrews 12:2 — the author and perfecter of our faith.",
      },
      {
        q: "Three lifelong habits the believer keeps are…",
        options: [
          "Reading the Bible, prayer, and the local church",
          "Streaks, badges, and stats",
          "Fasting, silence, and solitude only",
          "Just Sunday attendance",
        ],
        correctIndex: 0,
        why: "Word, prayer, body. The simplest rule for a long obedience.",
      },
      {
        q: "2 Timothy 2:2 commits Paul's teaching to faithful believers who will…",
        options: [
          "preserve it in writing",
          "teach others also",
          "memorize it",
          "argue against false teaching",
        ],
        correctIndex: 1,
        why: "Discipleship multiplies. You teach someone, who teaches someone — that is how the Kingdom moves.",
      },
      {
        q: "Eugene Peterson called the Christian life…",
        options: [
          "a quick sprint",
          "a constant feeling",
          "a long obedience in the same direction",
          "a vacation",
        ],
        correctIndex: 2,
        why: "The phrase echoes Psalm 1 — the steady walk of the blessed believer.",
      },
      {
        q: "After this course, the believer's next step on the platform is…",
        options: [
          "Stop using it",
          "Open The Path and start walking the twelve stages",
          "Take more quizzes",
          "Wait passively",
        ],
        correctIndex: 1,
        why: "/disciple — the platform's twelve-stage discipleship walk, designed to hand you off to a real local pastor.",
      },
    ],
  },
];

/* ── FINAL EXAM ──────────────────────────────────────────────
   24 questions, 2 from each week. Pass = 80% (≥ 19/24). The
   exam is built directly from the weekly quizzes' content so a
   believer who took those weeks seriously is well-prepared.
*/

export const EXAM_QUESTION_COUNT = 24;
export const EXAM_PASS_PERCENT = COURSE_PASS_PCT;

export type ExamQuestion = Quiz & { week: number };

/** Two questions per week, drawn from the weekly quizzes. Stable across sessions. */
export function buildFinalExam(): ExamQuestion[] {
  const out: ExamQuestion[] = [];
  for (const w of COURSE_WEEKS) {
    // Take first and third question from each week — covers the central + applied
    const pick = [w.quiz[0], w.quiz[2] ?? w.quiz[1]];
    for (const q of pick) out.push({ ...q, week: w.week });
  }
  return out;
}

/** Pass = ≥ 80% correct. */
export function passed(correct: number, total: number = EXAM_QUESTION_COUNT) {
  return (correct / total) * 100 >= EXAM_PASS_PERCENT;
}
