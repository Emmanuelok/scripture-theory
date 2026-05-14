// ─── Foundations of the Faith — Scripture Theory ──────────────
// Twelve weeks for a new believer (or anyone returning to Christ).
//
// Each week is built for depth:
//   • theme + tagline + anchor scripture (full text)
//   • memory verse to hide in the heart
//   • a seven-day daily structure (Read · Meditate · Pray ·
//     Apply · Journal · Review · Rest), each with a passage and a
//     short meditation
//   • a long-form lesson — pastoral teaching, biblical cross-refs
//   • voices from the global Church across the centuries
//   • a journal prompt that flows into /secret-place
//   • reflection questions for the believer alone
//   • discussion questions for a small group or one-on-one
//   • a concrete practice for the week
//   • an 8-question quiz that locks the week
//
// Doctrine is held ECUMENICALLY where Christians have legitimately
// differed (baptism mode, communion theology, charismata, polity).
// Where Scripture is unambiguous — the gospel, the Trinity, the
// resurrection, Scripture's authority, salvation by grace through
// faith — we are too.

export type Quiz = {
  q: string;
  options: string[];
  correctIndex: number;
  why: string;
};

export type DailyStep = {
  day: number; // 1..7
  label: string; // "Read" / "Meditate" / "Pray" / "Apply" / "Journal" / "Review" / "Rest"
  title: string;
  passage: string;
  meditation: string;
};

export type Witness = {
  who: string;
  when: string; // "354–430" etc.
  source?: string; // e.g. "Confessions, Book X"
  sourceUrl?: string; // public-domain source link (CCEL, archive.org, etc.)
  quote: string;
};

/** A voice from a specific Christian tradition on a contested topic. */
export type TraditionVoice = {
  tradition:
    | "Orthodox"
    | "Catholic"
    | "Anglican"
    | "Lutheran"
    | "Reformed"
    | "Wesleyan / Methodist"
    | "Anabaptist / Baptist"
    | "Pentecostal / Charismatic"
    | "Eastern non-Chalcedonian";
  voice: string;
};

/** Crosswalk to a historic catechism for this week's theme. */
export type Crosswalk = {
  catechism: string; // "Heidelberg", "Westminster Shorter", "Baltimore", "Orthodox", "Apostles' Creed"
  refs: string; // e.g. "LD 1 · Q&A 1" or "Q. 21"
};

/** A book the believer can read alongside this week, with a public-domain link if available. */
export type Reading = {
  title: string;
  author: string;
  when?: string; // year or era
  /** Short reason why this book pairs with this week. */
  why?: string;
  /** Public-domain source link (CCEL, archive.org, Project Gutenberg) when available. */
  url?: string;
};

export type CourseWeek = {
  week: number;
  title: string;
  tagline: string;
  scripture: { ref: string; text: string };
  memoryVerse: { ref: string; text: string };
  /** Estimated reading time for the full week (lessons + days + witnesses) in minutes. */
  readingMinutes?: number;
  days: DailyStep[]; // 7 entries
  lesson: string[]; // long-form paragraphs
  witnesses: Witness[];
  /** Optional — only on weeks where Christians have legitimately differed. */
  traditions?: TraditionVoice[];
  /** Crosswalk to historic catechisms (Heidelberg, Westminster, Baltimore, etc.). */
  crosswalk?: Crosswalk[];
  reflection: string[];
  discussion: string[];
  /** Notes for a small-group leader or family-night facilitator. */
  facilitatorNotes?: string[];
  /** Books to read alongside this week (mostly public-domain classics). */
  recommendedReading?: Reading[];
  practice: string;
  journalPrompt: string;
  quiz: Quiz[];
};

export const COURSE_TITLE = "Foundations of the Faith";
export const COURSE_SUBTITLE = "Twelve weeks for a new believer.";
export const COURSE_PASS_PCT = 80;
export const WEEKLY_QUIZ_PASS = 6; // out of 8

export const COURSE_WEEKS: CourseWeek[] = [
  /* ── WEEK 1 ───────────────────────────────────────────────── */
  {
    week: 1,
    title: "Who Jesus Is",
    tagline: "Everything else hangs on this answer.",
    scripture: {
      ref: "John 1:1-4, 14",
      text:
        "In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through Him, and without Him nothing was made that has been made. In Him was life, and the life was the light of men… And the Word became flesh and dwelt among us, and we saw His glory, glory as of the only Son from the Father, full of grace and truth.",
    },
    memoryVerse: {
      ref: "John 14:6",
      text:
        "Jesus said to him, 'I am the way, the truth, and the life. No one comes to the Father, except through Me.'",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "The Word who became flesh",
        passage: "John 1:1-18",
        meditation:
          "Read the prologue slowly. Underline every claim about who the Word is — eternal, with God, God Himself, the maker of all things, the life, the light, the only Son, full of grace and truth. This is not a teacher we're meeting; this is the One the universe was made through.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Image of the invisible God",
        passage: "Colossians 1:15-20",
        meditation:
          "Paul piles up titles: image of God, firstborn of creation, the One in whom all things hold together, head of the body, firstborn from the dead. Read it three times. Each time, ask: 'If this is true, what should change in me today?'",
      },
      {
        day: 3,
        label: "Pray",
        title: "Before His face",
        passage: "Hebrews 1:1-4",
        meditation:
          "God spoke in many ways through prophets — but in these last days He spoke through His Son. Pray today not to a vague higher power, but to the Father who has revealed Himself in Jesus. Tell Him you want to see His Son more clearly this week.",
      },
      {
        day: 4,
        label: "Apply",
        title: "I AM",
        passage: "John 8:58",
        meditation:
          "Jesus does not say, 'Before Abraham was, I was.' He says, 'I AM' — the name of God Himself (Exodus 3:14). The Jews picked up stones because they understood. Jesus claimed the divine name. Today, decide: do you believe what He said about Himself?",
      },
      {
        day: 5,
        label: "Journal",
        title: "Peter's confession",
        passage: "Matthew 16:13-20",
        meditation:
          "Jesus asks the question that matters most: 'Who do you say that I am?' Today, write your own answer. Not what you've heard others say. Not what your parents or pastor believe. What do you, sitting here today, say about Him?",
      },
      {
        day: 6,
        label: "Review",
        title: "Test the spirits",
        passage: "1 John 4:1-6",
        meditation:
          "John gives believers a sharp doctrinal test: every spirit that confesses Jesus has come in the flesh is from God. The incarnation is not a minor detail. It is the hinge. Look back at the week and ask: 'Did I receive Jesus this week as truly God and truly man?'",
      },
      {
        day: 7,
        label: "Rest",
        title: "Behold Him",
        passage: "Revelation 1:12-18",
        meditation:
          "John on Patmos sees the risen Christ — eyes like flame, voice like many waters, face like the sun. The Jesus of the Gospels is the same Jesus who reigns now. Rest in Him today. He holds the keys of Death and Hades. He is alive forever.",
      },
    ],
    lesson: [
      "The Christian faith is not first a moral system, not first a community, not first a feeling. It is a Person. Everything else flows from who Jesus is — and the New Testament makes a staggering claim about Him: He is God, in the flesh, walking around. The whole rest of the Faith stands or falls on whether that is true.",
      "Read John 1 carefully. The Word was 'with God' — so He is distinct from the Father. The Word 'was God' — so He is fully God. And the Word 'became flesh' — so He is fully human. Three claims, side by side, no contradiction allowed. The Church spent its first four centuries hammering out the right way to say it, and the language she settled on still serves us: Jesus is one Person in two natures, fully God and fully man, forever. The Council of Chalcedon (AD 451) put it most carefully: 'truly God and truly man… consubstantial with the Father according to the Godhead, consubstantial with us according to the manhood… acknowledged in two natures, without confusion, without change, without division, without separation.' That language is hard, but the meaning is good news: the Jesus who slept in a boat on the Sea of Galilee made the sea.",
      "Why does this matter? It matters because only God can save us, and only a real human can stand in for us. A merely-good-teacher Jesus could not bear sin. A merely-divine Jesus could not die. The Jesus the Scriptures show us is exactly the Savior we need. Athanasius said it plainly in the fourth century: 'God became man so that man might become a son of God.' If Jesus were less than God, the gospel collapses. If Jesus were less than man, the gospel collapses. Hold both. He is both.",
      "Jesus did not arrive incognito. He repeatedly said things only God could say. 'Before Abraham was, I AM' (John 8:58) is the divine name. 'I and the Father are one' (John 10:30) is divine identity. 'Truly, truly, I say to you' opens His sayings — no prophet in the Old Testament ever spoke like that. Prophets said, 'Thus says the Lord.' Jesus said, 'Truly, I say to you.' He spoke His own authority. He forgave sins (Mark 2:5-12). He received worship (Matt 14:33). He accepted Thomas's confession, 'My Lord and my God!' (John 20:28). And He stopped storms with a word.",
      "Then He died. This is the second great fact about Him — He did not stay safely divine. He took on flesh that could be bruised. He took on lungs that could fail. He took on a body that could be nailed to wood. He died a real death, in a real city, on a real day, and a real spear was put into His side. And then on the third day He stood up alive in that same body, scarred but glorified, and ate fish with His disciples.",
      "C. S. Lewis wrote a famous line about all this: a man who said the things Jesus said, claiming what He claimed, was not just 'a great moral teacher.' He was either a liar, a lunatic, or who He said He was. Lewis was right. There is no fourth option. Either Jesus is God-with-us, or He is the most dangerous fraud in human history. The disciples knew the choices. They watched Him; they ate with Him; they touched Him after the resurrection — and they laid down their lives saying He is Lord. They were not naive. Either they were liars and lunatics too, or they were telling the truth.",
      "This is where everything else in this course rests. Before we talk about the cross, or the Spirit, or the Church, or prayer, you must answer this question: who is Jesus? Not the safe Jesus of inspirational quotes. The Jesus John saw, and Peter confessed, and Thomas worshiped. The Jesus who is right now, this minute, alive at the Father's right hand and praying for you. If He is God in the flesh, then nothing about your life can stay the same. If He is not — well, then the New Testament is the saddest book in literature, and we should all go home.",
      "He is. And the door is open.",
    ],
    witnesses: [
      {
        who: "Athanasius of Alexandria",
        when: "c. 296–373",
        source: "On the Incarnation",
        quote:
          "He was made man that we might be made God. He manifested Himself by means of a body in order that we might perceive the mind of the unseen Father. He endured the insolence of men that we might inherit immortality.",
      },
      {
        who: "Nicene Creed",
        when: "AD 325 / 381",
        source: "Council of Nicaea / Constantinople",
        quote:
          "We believe in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all worlds; God of God, Light of Light, very God of very God; begotten, not made, being of one substance with the Father, by whom all things were made.",
      },
    ],
    readingMinutes: 35,
    crosswalk: [
      { catechism: "Heidelberg", refs: "Q&A 29–35 · why Jesus is the Christ, fully God and man" },
      { catechism: "Westminster Shorter", refs: "Q. 21–22 · the Redeemer of God's elect" },
      { catechism: "Nicene Creed", refs: "Article on the Son" },
      { catechism: "Chalcedonian Definition", refs: "AD 451 · the two natures" },
    ],
    facilitatorNotes: [
      "Aim for the heart, not the head. New believers often carry unspoken doubts about Christ's divinity — don't shame, sit with them.",
      "If anyone is shaky on Jesus' deity, return to John 1, John 20:28 (Thomas), and Hebrews 1. Don't argue; show.",
      "Close in prayer that names Jesus as Lord. Let the confession itself be the close.",
    ],
    reflection: [
      "Before this week, what did you think of when you heard the name Jesus?",
      "Which Day this week struck you most — and why?",
      "If Jesus really is God in the flesh, what should change about your week — not next year, this week?",
      "Where in your heart do you still treat Him as a great teacher rather than as God?",
    ],
    discussion: [
      "Read John 1:1-18 aloud as a group. What surprises you about the way John describes Jesus?",
      "C. S. Lewis said Jesus is either a liar, a lunatic, or Lord. Why does he say there is no fourth option?",
      "If a friend told you, 'I respect Jesus as a great teacher, but I don't believe He's God' — what would you say, gently?",
      "Share: when did you first realize Jesus was more than a moral example?",
    ],
    recommendedReading: [
      {
        title: "On the Incarnation",
        author: "Athanasius",
        when: "c. 318",
        why: "The Church's clearest classic on why God became man. Short, profound, life-shaping.",
        url: "https://www.ccel.org/ccel/athanasius/incarnation.html",
      },
      {
        title: "Cur Deus Homo (Why God Became Man)",
        author: "Anselm of Canterbury",
        when: "1098",
        why: "Why exactly the Savior had to be both fully God and fully man.",
        url: "https://www.ccel.org/ccel/anselm/basic_works.iv.html",
      },
    ],
    practice:
      "Read John 1 aloud once this week, slowly. Underline every line that describes who Jesus is.",
    journalPrompt:
      "Write your own answer to Jesus' question in Matthew 16: 'Who do you say that I am?' Not what you've been told. What do you say today?",
    quiz: [
      {
        q: "According to John 1, who was 'with God in the beginning' and 'was God'?",
        options: ["Moses", "The Word (Jesus)", "The Spirit", "The Father alone"],
        correctIndex: 1,
        why: "John 1:1 — 'In the beginning was the Word, and the Word was with God, and the Word was God.' John uses 'the Word' for the eternal Son who became Jesus.",
      },
      {
        q: "The Council of Chalcedon (AD 451) confessed that Jesus is…",
        options: [
          "Half God and half man",
          "One Person in two natures, fully God and fully man",
          "A great prophet only",
          "Sometimes God, sometimes man",
        ],
        correctIndex: 1,
        why: "One Person, two natures, without confusion, change, division, or separation — the historic confession of the global Church.",
      },
      {
        q: "Why does it matter that Jesus is fully human?",
        options: [
          "Only that He can sympathize with our weakness",
          "Only that He could die",
          "Both — He can sympathize AND He could stand in our place",
          "It does not matter",
        ],
        correctIndex: 2,
        why: "Hebrews 2:17 and 4:15 — He was made like us in every way so He could be a faithful high priest and bear our sin.",
      },
      {
        q: "What does John 1:14 say about Jesus?",
        options: [
          "He sent a message from heaven",
          "The Word became flesh and dwelt among us",
          "He spoke through prophets only",
          "He was an angel",
        ],
        correctIndex: 1,
        why: "God did not stay far. He came near. He took on a body.",
      },
      {
        q: "In John 8:58, Jesus claims the divine name from Exodus 3:14 by saying…",
        options: ["'I was before Abraham'", "'Before Abraham was, I AM'", "'I am older than Abraham'", "'Abraham knew Me'"],
        correctIndex: 1,
        why: "'I AM' is the divine name. The Jews knew exactly what He was claiming — and picked up stones.",
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
      {
        q: "C. S. Lewis's famous argument is that Jesus must be one of three things:",
        options: [
          "Liar, lunatic, or Lord",
          "Wise, kind, or distant",
          "Real, fictional, or mythical",
          "Prophet, priest, or king",
        ],
        correctIndex: 0,
        why: "He claimed too much to be merely 'a great moral teacher.' Either His claims are false (liar), He was deceived (lunatic), or they are true (Lord).",
      },
      {
        q: "Athanasius famously wrote that 'God became man…'",
        options: [
          "'…so that we could be more religious.'",
          "'…so that man might become a son of God.'",
          "'…to give us a better moral example.'",
          "'…to start a new religion.'",
        ],
        correctIndex: 1,
        why: "On the Incarnation, ch. 54. The whole logic of the gospel: God comes down so that we can be raised up.",
      },
    ],
  },

  /* ── WEEK 2 ───────────────────────────────────────────────── */
  {
    week: 2,
    title: "What He Did",
    tagline: "The cross. The empty tomb.",
    scripture: {
      ref: "1 Corinthians 15:3-8",
      text:
        "For I delivered to you first of all that which I also received, that Christ died for our sins according to the Scriptures; and that He was buried; and that He has been raised on the third day according to the Scriptures; and that He appeared to Cephas, then to the twelve. Then He appeared to over five hundred brothers at once, most of whom remain until now, but some have also fallen asleep. Then He appeared to James, then to all the apostles, and last of all, as to the child born at the wrong time, He appeared to me also.",
    },
    memoryVerse: {
      ref: "1 Corinthians 15:3-4",
      text:
        "Christ died for our sins according to the Scriptures; and that He was buried; and that He has been raised on the third day according to the Scriptures.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "The night He was betrayed",
        passage: "Mark 14",
        meditation:
          "Slow your pace today. Read the whole chapter — Gethsemane, the kiss, the trial, the denials. Notice that Jesus walks toward the cross step by step, eyes open. Nothing is happening to Him; He is doing this.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "The Lamb of God",
        passage: "Isaiah 53",
        meditation:
          "Written 700 years before Christ. Read it as a portrait of Jesus on Friday afternoon. 'He was pierced for our transgressions; He was crushed for our iniquities… and with His wounds we are healed.' Linger on verse 5 until you mean it.",
      },
      {
        day: 3,
        label: "Pray",
        title: "It is finished",
        passage: "John 19",
        meditation:
          "His last word from the cross in John is one Greek word: tetelestai. 'It is finished.' The same word was stamped on Roman business receipts: paid in full. There is no debt left for your sin that He did not pay. Pray today to know that, not just believe it.",
      },
      {
        day: 4,
        label: "Apply",
        title: "He is risen",
        passage: "Matthew 28:1-10",
        meditation:
          "Two Marys, an earthquake, an angel, an empty tomb. The first witnesses of the resurrection were women — whose testimony Roman courts did not accept. If you were inventing a religion, you would not start it this way. The Gospels do, because that's how it happened.",
      },
      {
        day: 5,
        label: "Journal",
        title: "What changed for me?",
        passage: "Romans 6:1-14",
        meditation:
          "If Jesus has truly died for me and risen, my old life is buried with Him and a new one has come. Write today: what specifically — what habit, what bondage, what shame — am I dragging around as if Jesus did not already pay for it?",
      },
      {
        day: 6,
        label: "Review",
        title: "Eyewitnesses",
        passage: "1 Corinthians 15:1-11",
        meditation:
          "Paul names names: Cephas, the Twelve, five hundred, James, the apostles, himself. He tells the Corinthians, 'most of whom remain until now' — go ask them. The resurrection is a public claim, not a private feeling.",
      },
      {
        day: 7,
        label: "Rest",
        title: "Death has lost",
        passage: "1 Corinthians 15:50-58",
        meditation:
          "'O death, where is your victory? O death, where is your sting?' Sit in this today. Death is real. It is not the last word. Because Jesus rose, every grave is now a temporary address.",
      },
    ],
    lesson: [
      "Paul condensed the whole gospel into four facts in 1 Corinthians 15: Christ died, He was buried, He rose, He was seen. He calls these 'first of all' — the things of first importance. The cross was not an accident; the resurrection was not a metaphor. Both happened in history, on identifiable days, in a real place, witnessed by named people.",
      "Why the cross? Because sin earns death (Romans 6:23), and a holy God cannot pretend it does not. There are easy versions of Christianity that try to soften this — God just forgives, no payment needed; the cross is a beautiful symbol of love and not much more. But the Bible's claim is sharper and stranger. Sin is real; it carries weight; the universe is morally serious; and an honest God who looked at evil and shrugged would be a small God indeed. The unimaginable mercy of the cross is that the Judge took the punishment Himself. 'For our sake He made Him to be sin who knew no sin, so that in Him we might become the righteousness of God' (2 Cor 5:21).",
      "Theologians have used many pictures to describe what happened at the cross — and the Scriptures themselves use several. He was a sacrifice (Hebrews 9). He was our substitute (Isaiah 53). He defeated the powers of darkness (Colossians 2:15). He bought us out of slavery (1 Peter 1:18-19). He reconciled us to God (Romans 5:10). All of these are true, like five witnesses describing the same event from different angles. Anselm in the 11th century called it satisfaction; Luther called it the great exchange — 'my sin to Him, His righteousness to me.' John Stott in our own time called it 'the self-substitution of God.' One Cross, many true things to say about it.",
      "But the cross is not the whole story. If Jesus died for our sins and stayed dead, we would have a noble martyr and no Savior. Paul says it plainly: 'If Christ has not been raised, your faith is futile and you are still in your sins' (1 Cor 15:17). Everything depends on Sunday morning. The empty tomb is the Father's verdict on the Son's sacrifice — accepted. The resurrection is not Jesus' soul going to heaven; it is His body, glorified, alive, eating fish on a beach with Peter. Christianity is the only world religion whose central claim is a public, physical, historical event that you could in principle have filmed.",
      "And the early Church knew it. Read Acts. The apostles do not preach a system; they preach an event. 'This Jesus God raised up, of which we are all witnesses' (Acts 2:32). 'He is not here, for He has risen, as He said' (Matt 28:6). They were not naive. They had grown up in a world with as much death and as little reincarnation as ours. They saw the risen Jesus, and it ruined them for everything else. Peter was crucified upside-down rather than recant. James was beheaded. Stephen was stoned. Eleven of the twelve apostles died for the claim that Jesus rose. People die for what they believe is true. People rarely die for what they know is a lie.",
      "So what does this mean for you today, sitting here? It means three things at minimum. First, your sin — the specific sin you carry that you are ashamed even to name — was on the cross. He has already paid for it. The shame is a lie; the debt is settled. Second, death has been defanged. You will die, almost certainly — but death is no longer the last room of your life. It is a doorway. Third, the resurrection is contagious. The same Spirit who raised Jesus dwells in every believer (Romans 8:11), and is in the slow business of raising you too — slowly, sometimes painfully, surely.",
      "This week, do not just believe the gospel. Receive it. Say to the Father, 'I trust that Jesus' death covers my sin and His life is now my life.' Then live as someone for whom that is true.",
    ],
    witnesses: [
      {
        who: "Anselm of Canterbury",
        when: "1033–1109",
        source: "Cur Deus Homo",
        quote:
          "If man has sinned, satisfaction must be made for sin. But no one ought to make this satisfaction except man, and no one can except God. Therefore the satisfaction must be made by one who is both God and man.",
      },
      {
        who: "Martin Luther",
        when: "1483–1546",
        source: "Commentary on Galatians",
        quote:
          "This is that mystery which is rich in divine grace to sinners: wherein by a wonderful exchange our sins are no longer ours but Christ's, and the righteousness of Christ not Christ's but ours. He has emptied Himself of His righteousness that He might clothe us with it, and filled Himself with our evils that He might deliver us from them.",
      },
    ],
    readingMinutes: 40,
    crosswalk: [
      { catechism: "Heidelberg", refs: "Q&A 37–44 · Christ's suffering, death, burial, descent, resurrection" },
      { catechism: "Westminster Shorter", refs: "Q. 25–28 · Christ's offices and humiliation" },
      { catechism: "Apostles' Creed", refs: "'Suffered… was crucified, died, was buried… rose again'" },
    ],
    reflection: [
      "Why is it good news that Jesus died, when death is usually bad news?",
      "If the resurrection didn't happen, what would change about Christianity?",
      "What sin in your life, specifically, did Jesus die for?",
      "Where are you still living as if His payment did not count?",
    ],
    discussion: [
      "Read 1 Corinthians 15:1-11 together. What does Paul mean by saying these are matters 'of first importance'?",
      "Why would someone die for a lie? Could the disciples have made up the resurrection? Discuss.",
      "Share a moment when the cross stopped being an idea and became personal to you.",
      "Who in your life right now needs to hear, gently, that Jesus has paid in full for them?",
    ],
    recommendedReading: [
      {
        title: "Commentary on Galatians",
        author: "Martin Luther",
        when: "1535",
        why: "Luther on the great exchange — your sin to Him, His righteousness to you. Pastoral and unmissable.",
        url: "https://www.ccel.org/ccel/luther/galatians.html",
      },
      {
        title: "The Death of Death in the Death of Christ",
        author: "John Owen",
        when: "1647",
        why: "Sober, careful, weighty. Owen on what the cross actually accomplished.",
        url: "https://www.ccel.org/ccel/owen/deathofdeath.html",
      },
    ],
    practice:
      "Memorize 1 Corinthians 15:3-4. Say it back, out loud, by the end of the week.",
    journalPrompt:
      "Name one specific sin or shame you've been carrying. Then write: 'Jesus has already paid for this in full. By His wounds, I am healed.' Sign and date the page.",
    quiz: [
      {
        q: "Paul summarizes the gospel as Christ died, was buried, rose, and…",
        options: ["sat at God's right hand", "was seen by named witnesses", "ascended privately", "spoke to angels"],
        correctIndex: 1,
        why: "1 Corinthians 15:5-8 lists named witnesses — Peter, the Twelve, 500 brothers, James, Paul. The resurrection is a public claim.",
      },
      {
        q: "What does 'Christ died for our sins' mean?",
        options: [
          "He died as a moral example only",
          "He died in our place, bearing what we deserved",
          "He died accidentally",
          "He died of natural causes",
        ],
        correctIndex: 1,
        why: "Substitutionary atonement. He took our place. (Isaiah 53:5-6, 2 Cor 5:21, 1 Pet 2:24.)",
      },
      {
        q: "If Christ has not been raised, Paul says our faith is…",
        options: ["strong", "useful", "futile", "private"],
        correctIndex: 2,
        why: "1 Corinthians 15:17 — 'If Christ has not been raised, your faith is futile and you are still in your sins.'",
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
          "'Into Your hands…'",
        ],
        correctIndex: 2,
        why: "John 19:30. 'It is finished' (tetelestai) — one Greek word meaning the debt has been paid in full.",
      },
      {
        q: "The first witnesses of the empty tomb in the Gospels are…",
        options: ["the apostles", "Pilate's soldiers", "the women who had followed Jesus", "the high priest"],
        correctIndex: 2,
        why: "All four Gospels feature women as the first witnesses — whose testimony Roman courts did not even accept. Hardly a fabrication tactic.",
      },
      {
        q: "Luther called the cross 'the great…'",
        options: ["sacrifice", "exchange", "victory", "tragedy"],
        correctIndex: 1,
        why: "'My sin to Him, His righteousness to me.' The most pastoral phrase in Reformation theology.",
      },
      {
        q: "Anselm argued atonement required someone who was…",
        options: [
          "wealthy and powerful",
          "perfectly innocent",
          "both God and man",
          "a Jewish priest",
        ],
        correctIndex: 2,
        why: "Cur Deus Homo. Only man owes the debt; only God can pay it. Therefore the Mediator must be both.",
      },
    ],
  },

  /* ── WEEK 3 ───────────────────────────────────────────────── */
  {
    week: 3,
    title: "Father, Son, and Spirit",
    tagline: "One God, in three Persons, forever.",
    scripture: {
      ref: "Matthew 28:18-20",
      text:
        "Jesus came to them and spoke to them, saying, 'All authority has been given to Me in heaven and on earth. Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you. And behold, I am with you always, even to the end of the age.'",
    },
    memoryVerse: {
      ref: "2 Corinthians 13:14",
      text:
        "The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "The baptism of Jesus",
        passage: "Matthew 3:13-17",
        meditation:
          "Watch the moment carefully. The Son rises from the water; the Spirit descends as a dove; the Father's voice speaks from heaven. Three Persons, one God, one moment. The Trinity is not abstract theology — it is exactly who Jesus showed us God is.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "The Comforter",
        passage: "John 14:15-26",
        meditation:
          "Jesus promises the Father will send 'another Comforter' — another of the same kind as Jesus. The Spirit is not a force. He is the third Person who carries on Christ's work in His people.",
      },
      {
        day: 3,
        label: "Pray",
        title: "Pray to the Father",
        passage: "Matthew 6:5-15",
        meditation:
          "Today, simply pray the Lord's Prayer slowly, addressed to the Father. Notice that Jesus tells us to begin where He begins — 'Our Father.' We are not strangers begging an unknown deity; we are children speaking to a Father.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Pray to the Son",
        passage: "Acts 7:54-60",
        meditation:
          "Stephen, the first martyr, prays directly to Jesus as he dies. 'Lord Jesus, receive my spirit.' It is not unbiblical to address the Son directly; the New Testament Church does it freely. Today, talk to Jesus directly.",
      },
      {
        day: 5,
        label: "Journal",
        title: "Pray with the Spirit",
        passage: "Romans 8:26-27",
        meditation:
          "When you do not know how to pray, the Spirit Himself intercedes within you. Today, sit silently for ten minutes. Don't form words. Ask the Spirit to pray for you what you do not yet know how to say. Then journal what surfaces.",
      },
      {
        day: 6,
        label: "Review",
        title: "One God",
        passage: "Deuteronomy 6:4-9; 1 Corinthians 8:4-6",
        meditation:
          "Israel's Shema: 'Hear, O Israel: the LORD our God, the LORD is one.' Paul does not deny this — he expands it. There is one God, the Father, from whom all things come, and one Lord, Jesus Christ, through whom all things come. Trinity is not three gods. It is the deeper grammar of the one God.",
      },
      {
        day: 7,
        label: "Rest",
        title: "Loved by Three",
        passage: "John 17:20-26",
        meditation:
          "Jesus prays for you — for everyone who would believe through the apostles' word. He prays that you would be loved with the same love the Father has loved Him. The Triune God includes you in that love. Rest in it today.",
      },
    ],
    lesson: [
      "There is one God. Deuteronomy 6:4 is the heart of Israel's faith: 'Hear, O Israel: the LORD our God, the LORD is one.' Every page of the Old Testament thunders this. There are no other gods. There never were. And yet — the New Testament opens up something even more astonishing inside that one God. The Father is God. The Son is God. The Spirit is God. Three Persons. One Being. One love. The Church has called this the Trinity for nineteen centuries.",
      "It is not a contradiction; it is a mystery. A contradiction says 'God is one and not one.' Trinity says 'God is one in one way, and three in another.' One in Being. Three in Person. Tertullian in the second century gave us the Latin: una substantia, tres personae. The fourth-century Cappadocian Fathers — Basil, Gregory of Nazianzus, Gregory of Nyssa — spent their lives clarifying it. Athanasius almost single-handedly defended it against the Arians, who said the Son was a created being. The Council of Nicaea (325) confessed that the Son is 'of one substance with the Father.' The Council of Constantinople (381) added the same for the Spirit. The doctrine you confess when you say the Nicene Creed is hard-won, paid for in blood and exile.",
      "Why does it matter? Because if Jesus is not God, He cannot save you. If the Spirit is not God, He cannot indwell you. If God is not eternally a fellowship of Persons, then love is not eternal — it is something God acquired when He made creatures to love. But the New Testament's claim is breathtaking: the love between the Father and the Son in the Spirit was there 'before the foundation of the world' (John 17:24). God did not become loving when He made us. God is love (1 John 4:8). The Triune life is the original life.",
      "You can see the Trinity all over the New Testament once you have eyes for it. At Jesus' baptism, the Father speaks, the Son is in the water, the Spirit descends (Matt 3:16-17). Jesus prays to the Father (John 17). The Spirit testifies to Jesus (John 15:26). Paul's blessing names all three: 'The grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit be with you all' (2 Cor 13:14). Peter's first sermon: the Father raised the Son and poured out the Spirit (Acts 2:32-33). The Great Commission baptizes 'in the name [singular] of the Father and of the Son and of the Holy Spirit' (Matt 28:19) — one name, three Persons.",
      "Practically, this changes how you pray. You are not whispering into a vague heaven. You are entering a conversation that has been going on forever. The Spirit prays in you, Jesus prays for you at the Father's right hand, and the Father hears. Every prayer of every believer is Trinitarian. You can address any of the three Persons — Stephen prays to Jesus as he dies; Paul prays to the Father most commonly; Christian tradition has always known both — but the destination is the one God.",
      "It also changes how you receive yourself. You are not a problem grudgingly tolerated. You are loved — by a Father who chose you before the world began, by a Son who died for you in time, by a Spirit who lives in you now. Three loves. One love. Augustine called the Spirit the bond of love between the Father and the Son; whatever you make of that exact phrasing, you have been drawn into that love. You are inside it.",
      "Two cautions before we close. First, do not try to picture the Trinity with analogies — water/ice/steam, three-leaf clover, etc. Every analogy breaks. Hold the doctrine in words: one Being, three Persons, equal in glory, distinct but inseparable. Second, do not despair if you cannot fully comprehend it. If your mind could fully comprehend God, He would not be God. Worship in the mystery. That is what the saints have always done.",
      "The Triune God is who you have come to. Welcome home.",
    ],
    witnesses: [
      {
        who: "Gregory of Nazianzus",
        when: "329–390",
        source: "Oration 40",
        quote:
          "No sooner do I conceive of the One than I am illumined by the splendor of the Three; no sooner do I distinguish Them than I am carried back to the One.",
      },
      {
        who: "Augustine of Hippo",
        when: "354–430",
        source: "On the Trinity, Book VIII",
        quote:
          "Behold then, when I, who am asking after this, love anything, there are three: I, and that which I love, and love itself. For neither is there love except it loves something… therefore there are no fewer than three: the lover, and that which is loved, and love.",
      },
    ],
    readingMinutes: 35,
    crosswalk: [
      { catechism: "Heidelberg", refs: "Q&A 24–25 · the Holy Trinity" },
      { catechism: "Westminster Shorter", refs: "Q. 5–6 · one God, three persons" },
      { catechism: "Nicene Creed", refs: "Whole — the Triune confession" },
      { catechism: "Athanasian Creed", refs: "Whole — the Trinity defined" },
    ],
    reflection: [
      "Which Person of the Trinity have you thought of least, and why?",
      "Why does the Trinity protect us from imagining God as a lonely solitary figure?",
      "How does it change your prayer to know you are talking to a Father, through the Son, in the Spirit?",
      "Where in your life do you need to receive that you are loved by Three?",
    ],
    discussion: [
      "If God were not Trinity, what would be different about love?",
      "Why did the early Church spend centuries fighting over how to say this?",
      "Have you ever been embarrassed to explain the Trinity? Try it together, simply.",
      "Discuss: is it lawful to address each Person of the Trinity in prayer? What does the New Testament show?",
    ],
    recommendedReading: [
      {
        title: "On the Trinity",
        author: "Augustine of Hippo",
        when: "c. 400–428",
        why: "The Western Church's deepest meditation on the Triune God — slow, patient, ultimately worshipful.",
        url: "https://www.ccel.org/ccel/schaff/npnf103.html",
      },
      {
        title: "On the Holy Spirit",
        author: "Basil the Great",
        when: "375",
        why: "Why the Spirit is fully God, with the same glory and worship.",
        url: "https://www.ccel.org/ccel/schaff/npnf208.toc.html",
      },
    ],
    practice:
      "Pray to each Person this week: one day address the Father directly, one day Jesus, one day the Spirit. Same God; three lawful ways to speak to Him.",
    journalPrompt:
      "Write about the Trinity not as a doctrine but as a love. The Father chose you. The Son died for you. The Spirit lives in you. Three loves. One love. What does it feel like to be inside that?",
    quiz: [
      {
        q: "The Trinity teaches that there is…",
        options: [
          "One God in one Person",
          "Three gods working together",
          "One God in three Persons",
          "One God who appears in different modes at different times",
        ],
        correctIndex: 2,
        why: "One Being, three eternally distinct Persons — Father, Son, Holy Spirit. The 'modes' option is the ancient heresy of modalism; the 'three gods' option is tritheism. Neither is Christian.",
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
        q: "Paul's blessing in 2 Corinthians 13:14 names…",
        options: [
          "Only God the Father",
          "Father, Son, and Spirit — grace, love, fellowship",
          "Jesus only",
          "Angels and saints",
        ],
        correctIndex: 1,
        why: "'The grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit be with you all.'",
      },
      {
        q: "The Trinity matters for the gospel because…",
        options: [
          "The Father sent the Son in the power of the Spirit to save us",
          "It is a theological puzzle",
          "It impresses people",
          "It is a Catholic doctrine only",
        ],
        correctIndex: 0,
        why: "Galatians 4:4-6 — the whole gospel is Trinitarian. You are loved by Three, in one love.",
      },
      {
        q: "Tertullian gave us the Latin formula 'una substantia, tres personae,' meaning…",
        options: [
          "one beginning, three endings",
          "one substance, three persons",
          "three substances, one person",
          "the same in all things",
        ],
        correctIndex: 1,
        why: "The grammar of the doctrine: one in Being, three in Person.",
      },
      {
        q: "What did the Council of Nicaea (AD 325) confess about the Son?",
        options: [
          "He is a created being",
          "He is of one substance with the Father",
          "He is less than the Father",
          "He is the Spirit in another form",
        ],
        correctIndex: 1,
        why: "Against the Arian heresy that the Son was created. The Son is begotten, not made, of one substance with the Father.",
      },
      {
        q: "Romans 8:26 says when we don't know how to pray, the Spirit…",
        options: ["leaves us alone", "intercedes for us with groanings too deep for words", "scolds us", "writes us a script"],
        correctIndex: 1,
        why: "The Spirit Himself prays in and through the believer.",
      },
    ],
  },

  /* ── WEEK 4 ───────────────────────────────────────────────── */
  {
    week: 4,
    title: "The Bible",
    tagline: "God's Word — inspired, sufficient, alive.",
    scripture: {
      ref: "2 Timothy 3:14-17",
      text:
        "Continue in the things which you have learned and have been assured of, knowing from whom you have learned them. From infancy, you have known the holy Scriptures which are able to make you wise for salvation through faith, which is in Christ Jesus. Every Scripture is God-breathed, and profitable for teaching, for reproof, for correction, and for instruction in righteousness, that each person who belongs to God may be complete, thoroughly equipped for every good work.",
    },
    memoryVerse: {
      ref: "Hebrews 4:12",
      text:
        "For the word of God is living and active, and sharper than any two-edged sword, and piercing even to the dividing of soul and spirit, of both joints and marrow, and is able to discern the thoughts and intentions of the heart.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "God-breathed",
        passage: "2 Timothy 3:10-17",
        meditation:
          "Paul writes to a young pastor. The Scriptures, he says, make you wise for salvation and equip you for every good work. Notice what he does not say: 'Scripture plus my opinions.' Scripture, full stop.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Love letter",
        passage: "Psalm 119:97-104",
        meditation:
          "The longest psalm in the Bible is one long love letter — to the Word. 'Oh, how I love Your law! It is my meditation all day.' Pause on that. The Bible was not given to be endured; it was given to be loved.",
      },
      {
        day: 3,
        label: "Pray",
        title: "Open my eyes",
        passage: "Psalm 119:18",
        meditation:
          "'Open my eyes, that I may behold wondrous things out of Your law.' Pray this verse before every Bible reading this week. The Spirit who breathed Scripture also illuminates Scripture.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Christ in all the Scriptures",
        passage: "Luke 24:13-35",
        meditation:
          "On the road to Emmaus, Jesus opens the Old Testament from Moses through the Prophets and shows them that all of it has been about Him. When you read your Old Testament, ask: where is Jesus in this?",
      },
      {
        day: 5,
        label: "Journal",
        title: "A lamp to my feet",
        passage: "Psalm 119:105-112",
        meditation:
          "'Your word is a lamp to my feet and a light to my path.' Today, journal: name a specific decision or struggle you are facing this week. What Bible passage might be a lamp for that step?",
      },
      {
        day: 6,
        label: "Review",
        title: "Carried by the Spirit",
        passage: "2 Peter 1:16-21",
        meditation:
          "Peter says the prophets did not invent their messages. They were 'carried along by the Holy Spirit.' What they wrote is what God said. The Bible has dual authorship — fully human (with each writer's voice) and fully divine.",
      },
      {
        day: 7,
        label: "Rest",
        title: "Stand forever",
        passage: "Isaiah 40:6-8",
        meditation:
          "Empires fall. Headlines rot. 'The grass withers, the flower fades; but the word of our God will stand forever.' Today, rest in something that does not move.",
      },
    ],
    lesson: [
      "The Bible is the inspired, written Word of God. 'God-breathed,' Paul calls it (2 Tim 3:16). Sixty-six books, forty-some authors, written across more than a millennium, in three languages, on three continents — and yet one Story, one Voice. Christians have always confessed: the Spirit moved the writers (2 Pet 1:21), and what they wrote is what God said.",
      "This is staggering, and it changes how you read. You are not picking up a religious anthology. You are picking up the words of God. When Jesus answered Satan in the wilderness, He answered with 'It is written' — three times. When He silenced the Sadducees, He said, 'Have you not read what was said to you by God?' He treated the Old Testament as God's voice. He spoke as if His own words would 'never pass away' (Matt 24:35). The early Church received the apostles' writings on the same authority. Peter calls Paul's letters 'Scripture' (2 Pet 3:16). The Spirit who inspired the Old Testament also inspired the New.",
      "The whole Story is about Jesus. He told the disciples on the road to Emmaus, beginning with Moses and all the Prophets, that 'in all the Scriptures' the things concerning Himself were written (Luke 24:27). The Old Testament prepares; the Gospels record; the rest of the New Testament unfolds. Don't read the Bible looking only for advice. Read it looking for Christ. He is the Hero of every chapter. The lamb on Mount Moriah, the manna in the wilderness, the rock that gave water, the bronze serpent on the pole, the Passover, the temple, the prophets — all of it points to Him.",
      "Three things have always been confessed about Scripture by every faithful Christian tradition. First, it is inspired — God's own words, given through real human writers in their own languages and personalities. Not dictated like a stenographer takes notes; carried, as Peter says, by the Spirit. Second, it is authoritative — when Scripture says something, the conversation is settled. Not because believers are intellectually lazy, but because God has spoken and the creature listens. Third, it is sufficient — meaning, you have here everything you need 'for life and godliness' (2 Pet 1:3). Not everything for cosmology or quantum physics, but everything for becoming a holy person who knows God.",
      "How then do you read it? Three commitments will hold you. (1) Read it regularly. Even fifteen minutes daily will reshape you in a year. (2) Read it in context — never pull a verse out of its paragraph, its chapter, its book, the whole Story. (3) Read it praying. The Spirit who breathed Scripture is the same Spirit who lights it up in your mind. Calvin called this the internal testimony of the Spirit: the same Spirit who inspired the prophets bears witness in your heart that these words are God's words.",
      "On translations: the Bible was not written in English. The Old Testament is Hebrew (with some Aramaic); the New Testament is Greek. Every English Bible you read is a translation. Faithful translation is hard, lawful, and beautiful work. The platform serves fourteen public-domain translations, all by named scholars. We will never let a machine paraphrase Scripture into our voice. Pick a translation you can actually read — for English, the WEB (modern, public domain) or the KJV (classic, public domain) are both faithful starting places.",
      "On the canon: the 66 books of the Bible were not chosen at Nicaea by political committee; they were recognized by the Church over the first four centuries because they bore the marks of apostolic authority and were already being read in the worshiping congregations everywhere. Catholic and Orthodox traditions include additional 'Deuterocanonical' books which Jews and most Protestants do not; this platform honors that disagreement and is honest about it. The core 66 are not in dispute among any faithful tradition.",
      "One last thing. The Bible is not a magic book. It will not give you what you want; it will give you what you need, which is sometimes harder. It will rebuke you. It will undo you. It will sit on your chest some mornings. And by some other morning, after years, you will have become a different person — patient where you were brittle, generous where you were grasping, full of joy where you were hollow. That is what 'the word of God is living and active' means. It is not just true. It is alive. It is working on you. Welcome the work.",
    ],
    witnesses: [
      {
        who: "John Chrysostom",
        when: "c. 347–407",
        source: "Homilies on Matthew",
        quote:
          "The reading of the Scriptures is a great safeguard against sin. The ignorance of Scripture is a great cliff and a deep abyss; to know nothing of the divine laws is a great betrayal of salvation.",
      },
      {
        who: "Thomas à Kempis",
        when: "c. 1380–1471",
        source: "The Imitation of Christ",
        quote:
          "All Scripture should be read in the spirit in which it was written. We must rather seek for what is profitable in Scripture, than for what ministers to subtlety in discourse.",
      },
    ],
    readingMinutes: 35,
    crosswalk: [
      { catechism: "Westminster Shorter", refs: "Q. 2–3 · the rule God has given to direct us" },
      { catechism: "Westminster Confession", refs: "Ch. 1 · Of the Holy Scripture" },
      { catechism: "Baltimore", refs: "Lesson 11 · The Holy Scriptures" },
    ],
    reflection: [
      "If the Bible is really God-breathed, what should that change about how you read it?",
      "Which Bible book are you most curious about — and what would it take to begin it this season?",
      "How is reading Scripture different from reading anything else?",
      "What sin or struggle in your life might the Word be aimed at, if you let it sit on you?",
    ],
    discussion: [
      "How do you respond to friends who say the Bible was 'written by men, edited by committee, and shouldn't be trusted'?",
      "Share: which Bible book has shaped you most so far?",
      "What's the difference between reading the Bible for advice and reading it for Christ?",
      "What would a year of daily reading look like in your life? What gets in the way?",
    ],
    recommendedReading: [
      {
        title: "Institutes of the Christian Religion, Book I",
        author: "John Calvin",
        when: "1559 (final edition)",
        why: "Calvin's foundational chapters on Scripture's authority and self-attestation.",
        url: "https://www.ccel.org/ccel/calvin/institutes.html",
      },
      {
        title: "The Pilgrim's Progress",
        author: "John Bunyan",
        when: "1678",
        why: "The Christian life as a Bible-shaped journey. Best-loved Christian allegory ever written.",
        url: "https://www.ccel.org/ccel/bunyan/pilgrim.html",
      },
    ],
    practice:
      "Read one chapter a day this week, same time, same place. Begin John, Mark, or Psalms. Pray Psalm 119:18 before each reading.",
    journalPrompt:
      "Write a letter to the Bible — to the Word God breathed out across centuries. Confess where you've neglected it. Ask Him to give you a hunger for it. Date the letter.",
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
        q: "The historic Christian confession about Scripture is that it is…",
        options: [
          "Inspired, authoritative, sufficient",
          "A collection of moral fables",
          "Useful but optional",
          "A book primarily about us",
        ],
        correctIndex: 0,
        why: "Inspired (God's words), authoritative (settles disputes), sufficient (enough for faith and life). 2 Tim 3:16-17, 2 Pet 1:3.",
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
      {
        q: "Hebrews 4:12 says the word of God is…",
        options: ["clear and simple", "living and active", "ancient and obscure", "useful in part"],
        correctIndex: 1,
        why: "It is alive. It cuts. It discerns the heart.",
      },
      {
        q: "When you read the Old Testament, you should be looking primarily for…",
        options: [
          "Moral examples",
          "Christ",
          "Historical facts",
          "Cultural color",
        ],
        correctIndex: 1,
        why: "Luke 24:27. He is the hermeneutical key.",
      },
      {
        q: "What's the right response when Scripture sits on your chest and convicts you?",
        options: [
          "Close the Bible",
          "Push the verse down",
          "Receive the conviction; let it do its work",
          "Find a different translation that softens it",
        ],
        correctIndex: 2,
        why: "Scripture's sharpness is its kindness. The cut is for healing (Heb 4:12-13).",
      },
    ],
  },

  /* ── WEEK 5 ───────────────────────────────────────────────── */
  {
    week: 5,
    title: "Prayer",
    tagline: "How a child of God talks to a Father.",
    scripture: {
      ref: "Matthew 6:9-13",
      text:
        "Our Father in heaven, may Your name be kept holy. Let Your Kingdom come. Let Your will be done, on earth as it is in heaven. Give us today our daily bread. Forgive us our debts, as we also forgive our debtors. Bring us not into temptation, but deliver us from the evil one. For Yours is the Kingdom, the power, and the glory forever. Amen.",
    },
    memoryVerse: {
      ref: "Philippians 4:6-7",
      text:
        "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "When you pray",
        passage: "Matthew 6:5-15",
        meditation:
          "Notice Jesus says 'when' you pray, not 'if.' Prayer is assumed. And He gives an outline — six requests, in two halves: three about God's name, kingdom, will; three about our needs, debts, deliverance. Memorize the shape.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Lord, teach us to pray",
        passage: "Luke 11:1-13",
        meditation:
          "The disciples watched Jesus pray and asked Him to teach them how. Even after years with Him, they knew they didn't know. The whole Christian life starts with the same humility: I don't know how. Teach me.",
      },
      {
        day: 3,
        label: "Pray",
        title: "Adoration · Confession · Thanksgiving · Supplication",
        passage: "Psalm 51",
        meditation:
          "David's psalm of repentance has all four notes — praising God, confessing sin, thanking Him for cleansing, asking for restoration. Today, walk through ACTS slowly. Praise Him. Confess one specific thing. Thank Him for three specific gifts. Then ask.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Casting your cares",
        passage: "Philippians 4:4-9",
        meditation:
          "Paul writes from prison. 'Rejoice in the Lord always.' His secret is verse 6 — 'In nothing be anxious; but in everything, by prayer with thanksgiving, let your requests be made known to God.' Today, write down every anxiety. Then pray each one specifically.",
      },
      {
        day: 5,
        label: "Journal",
        title: "Search me",
        passage: "Psalm 139:23-24",
        meditation:
          "'Search me, O God, and know my heart… see if there is any wicked way in me, and lead me in the way everlasting.' This is the bravest prayer in the Bible. Pray it today, and journal what surfaces.",
      },
      {
        day: 6,
        label: "Review",
        title: "Watch and pray",
        passage: "Mark 14:32-42",
        meditation:
          "Even Jesus, in Gethsemane, asked His disciples to watch and pray with Him — and they fell asleep. Don't be hard on them; don't be hard on yourself when you fail to pray as you intended. Just start again.",
      },
      {
        day: 7,
        label: "Rest",
        title: "Abba, Father",
        passage: "Romans 8:14-17",
        meditation:
          "'You received the Spirit of adoption, by whom we cry, Abba! Father!' Abba is the intimate Aramaic for 'Papa.' You are not a beggar. You are a child. Rest in that today.",
      },
    ],
    lesson: [
      "Prayer is not a technique. It is the freedom of a child to talk to a Father. When the disciples asked Jesus how to pray, He did not give them a method; He gave them a relationship and a few words. 'Pray then like this: Our Father.' That is everything. We are not begging an angry deity. We are not bargaining with a distant force. We are speaking with our Father, who happens to be Almighty, who happens to know every hair on our head.",
      "But how, practically? The Christian tradition has long taught four classical notes, ACTS — Adoration, Confession, Thanksgiving, Supplication. Adoration is praise — naming who God is. 'Hallowed be Your name.' Confession is honesty about sin. 'Forgive us our debts.' Thanksgiving names His mercies, big and small — 'Give us this day our daily bread' is gratitude in disguise. Supplication brings needs — ours and others'. 'Deliver us from evil.' The Lord's Prayer itself contains all four notes. Pray that prayer often, slowly, and you will be praying biblically without trying.",
      "But prayer is more than ACTS. The Psalms — the inspired prayer book of the Bible — give us a far wider emotional range than most modern Christians use. The psalmists complain. They lament. They argue. They get angry at God. They wait. They give up. They come back. They sing. They weep. There is no posture before the Father that has not been offered up by some psalmist before you. If your prayers sound like the Psalms, you are praying like the saints have always prayed.",
      "Three obstacles will rise. First, distraction. Your mind will wander; your phone will buzz; thoughts of work and worry will gallop through. The desert fathers in the third century called this acedia and were honest about it. The remedy is not to defeat distraction — it is to gently return. Every return is itself an act of prayer. Brother Lawrence in the 17th century, washing dishes in a monastery, taught what he called 'the practice of the presence of God' — short, gentle returns to the Father all day. Try that.",
      "Second, dryness. Many days prayer will feel like nothing. You will speak into what feels like a ceiling. Saints across centuries have called this the dark night, the wilderness, the cloud of unknowing. It is not always evidence of God's absence; sometimes it is His training. Keep going. Plant your face in the Psalms. Pray the Lord's Prayer when you cannot find your own words. He hears you on those days exactly as much as on the days when prayer flows.",
      "Third, doubt that anything is happening. Did your prayer 'do' anything? The Bible's answer is: yes, it did. James says the prayer of a righteous person has great power as it is working (James 5:16). Jesus says ask, and it will be given (Matt 7:7). And yet — every prayer is answered 'yes,' 'no,' or 'wait,' and God knows better than you which is which. A prayed-for sick mother who is healed displays God's power. A prayed-for sick mother who dies in faith displays the same God's deeper power, in a way only eternity will explain. Pray boldly. Trust the answer.",
      "One last note for new believers especially: you do not need beautiful words. You do not need a quiet hour. You do not need impressive vocabulary. The shortest prayer in the Bible is Peter's: 'Lord, save me!' as he was sinking (Matt 14:30). It was three words and it was enough. The tax collector in Luke 18 prayed only 'God, be merciful to me, a sinner,' and Jesus said he went home justified. Your Father is not grading. He is your Father. Start where you are.",
    ],
    witnesses: [
      {
        who: "Brother Lawrence",
        when: "1614–1691",
        source: "The Practice of the Presence of God",
        quote:
          "We need only to recognize God intimately present with us, to address ourselves to Him every moment, that we may beg His assistance for knowing His will in things doubtful, and for rightly performing those which we plainly see He requires of us.",
      },
      {
        who: "Teresa of Ávila",
        when: "1515–1582",
        source: "Way of Perfection",
        quote:
          "Prayer is nothing else than being on terms of friendship with God — frequently conversing in secret with Him who, we know, loves us.",
      },
    ],
    readingMinutes: 35,
    crosswalk: [
      { catechism: "Heidelberg", refs: "LD 45–52 · the Lord's Prayer in detail" },
      { catechism: "Westminster Shorter", refs: "Q. 98–107 · prayer and the Lord's Prayer" },
      { catechism: "Baltimore", refs: "Lessons 27–28 · on prayer" },
    ],
    facilitatorNotes: [
      "Many new believers feel ashamed they 'don't know how to pray.' Normalize this. Even the disciples asked Jesus to teach them.",
      "Pray together aloud — circle prayer, popcorn prayer, or pairs. Modeling matters more than instruction.",
      "Don't give pat answers to 'why didn't my prayer get answered.' Sit in the question. The Psalms are honest.",
    ],
    reflection: [
      "What stops you from praying as much as you'd like?",
      "Which line of the Lord's Prayer is hardest for you to mean right now?",
      "Is there something specific you've been afraid to ask the Father about?",
      "When was the last time you prayed with the full range of the Psalms — including anger or grief?",
    ],
    discussion: [
      "Share: when did prayer first feel real to you (or hasn't it yet)?",
      "Read the Lord's Prayer slowly together. Which line lands hardest?",
      "How do you keep praying when it feels like nothing is happening?",
      "What would it look like for your small group to actually pray for one another by name this week?",
    ],
    recommendedReading: [
      {
        title: "The Practice of the Presence of God",
        author: "Brother Lawrence",
        when: "1692 (compiled)",
        why: "A monastery dishwasher's short book on speaking to God all day. One of the most practical guides to prayer ever written.",
        url: "https://www.ccel.org/ccel/lawrence/practice.html",
      },
      {
        title: "The Way of Perfection",
        author: "Teresa of Ávila",
        when: "1566",
        why: "Teresa's careful, warm school of contemplative prayer — written for her own sisters and useful for any believer.",
        url: "https://www.ccel.org/ccel/teresa/way.html",
      },
    ],
    practice:
      "Pray the Lord's Prayer slowly each morning this week. One phrase at a time. Pause to mean it.",
    journalPrompt:
      "Write Psalm 139:23-24 at the top of a page, then sit and listen. Anything the Spirit surfaces — pride, sin, fear, gratitude — write it. End by handing it to the Father.",
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
        why: "'In everything by prayer and petition with thanksgiving let your requests be made known to God.'",
      },
      {
        q: "When your mind wanders in prayer, the right response is to…",
        options: [
          "Stop praying",
          "Be hard on yourself",
          "Gently return your attention; every return is itself prayer",
          "Quit being Christian",
        ],
        correctIndex: 2,
        why: "Every saint across history has struggled with distraction. The desert fathers called it acedia. Return without shame.",
      },
      {
        q: "The shortest prayer in the Bible may be Peter's…",
        options: [
          "'Lord, save me!'",
          "'Father, hear me.'",
          "'I believe; help my unbelief.'",
          "'Have mercy.'",
        ],
        correctIndex: 0,
        why: "Matthew 14:30. He was sinking. Three words were enough.",
      },
      {
        q: "The Psalms model praying with…",
        options: [
          "Only joy and praise",
          "The full range of human emotion, including lament and complaint",
          "Polished theological language",
          "Short petitions only",
        ],
        correctIndex: 1,
        why: "Lament, joy, anger, longing, hope — all lawful before God. The Psalms are honest school for prayer.",
      },
      {
        q: "When prayer feels dry, the historic Christian wisdom is to…",
        options: [
          "Quit",
          "Pray harder until you feel something",
          "Keep showing up; pray the Psalms and the Lord's Prayer; trust",
          "Wait for it to feel right again",
        ],
        correctIndex: 2,
        why: "Faithfulness is not the same as feeling. The Father hears you on dry days just as on sweet ones.",
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

  /* ── WEEK 6 ───────────────────────────────────────────────── */
  {
    week: 6,
    title: "Repentance & Forgiveness",
    tagline: "Turn. Be forgiven. Forgive.",
    scripture: {
      ref: "1 John 1:8-9",
      text:
        "If we say that we have no sin, we deceive ourselves, and the truth is not in us. If we confess our sins, He is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.",
    },
    memoryVerse: {
      ref: "Ephesians 4:32",
      text:
        "Be kind to one another, tenderhearted, forgiving one another, even as God in Christ forgave you.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "A broken and contrite heart",
        passage: "Psalm 51",
        meditation:
          "David has committed adultery and arranged a murder. This is what real repentance looks like. Not self-pity. Not blame-shifting. 'Against You, You only, have I sinned.' Pray verses 10-12 today as your own.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "The waiting Father",
        passage: "Luke 15:11-32",
        meditation:
          "Read the prodigal son slowly. Notice the Father is waiting. He runs. He kisses. He clothes. Repentance is not what earns the Father's love; it is what receives the love that was already coming for you.",
      },
      {
        day: 3,
        label: "Pray",
        title: "If we confess",
        passage: "1 John 1:5-2:2",
        meditation:
          "Today, pray verse 9 by name. Open your hand and confess one specific sin — not a general 'sorry for everything,' a specific thing. Then receive: 'He is faithful and righteous to forgive.' Take Him at His word.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Forgiven much",
        passage: "Luke 7:36-50",
        meditation:
          "A 'woman of the city' weeps at Jesus' feet, washes them with her tears, dries them with her hair. The Pharisee judges. Jesus says: she who has been forgiven much loves much. Today, ask: do I know how much I have been forgiven?",
      },
      {
        day: 5,
        label: "Journal",
        title: "The debt I hold",
        passage: "Matthew 18:21-35",
        meditation:
          "Jesus' parable of the unforgiving servant is the sharpest warning He ever gave about unforgiveness. Today, journal: who do I still hold a debt against? Write the name. Then write what they did. Then write: 'Father, I hand the debt to You.'",
      },
      {
        day: 6,
        label: "Review",
        title: "From the heart",
        passage: "Mark 11:25; Matthew 6:14-15",
        meditation:
          "Forgiveness is not a feeling; it is a release of a debt. Sometimes feelings follow; often they take years. Don't wait. Release the debt now. The feelings will come.",
      },
      {
        day: 7,
        label: "Rest",
        title: "As far as the east is from the west",
        passage: "Psalm 103",
        meditation:
          "Read the whole psalm aloud. 'As far as the east is from the west, so far has He removed our transgressions from us.' Rest in this. Your forgiven sins are not floating around waiting to be remembered by God. He has set them as far away as east is from west — which is to say, infinitely.",
      },
    ],
    lesson: [
      "Repentance is not despair. It is not earning forgiveness. It is not the same as remorse. It is turning — from sin and toward God. The Greek word the New Testament uses is metanoia, a change of mind that results in a change of direction. The believer's whole life is, in one sense, a long turn home — not a one-time event at conversion but a daily reorientation.",
      "Three notes about confession. First, it should be specific. 'Lord, forgive my sin' is a fine starting place, but 'Lord, I lied to my coworker about why I missed the deadline' is closer to what repentance actually means. Name the thing. The Spirit usually does the naming for you if you sit still. Second, it should be honest. Don't soften it. Don't blame the other person. Don't list contributing factors. Just bring the thing and own it before God. Third, it should be received. The promise of 1 John 1:9 is breathtaking: if we confess, He forgives. Always. Every time. He does not ration grace. He does not nurse grudges. He does not hold the sins of last month over the head of the child He has already adopted. The hardest part of confession for many believers is believing the second half of the verse.",
      "Then there is the other side. Jesus tells us to forgive as we have been forgiven (Matt 6:14-15, 18:21-35). This is hard. Some people have wounded you in ways the world calls unforgivable — abuse, betrayal, the slow accumulation of a thousand small cuts. Christ does not minimize these wounds. He hung on a cross for them. And He says: forgive.",
      "Forgiveness does not mean what people often think. It does not mean pretending the wound did not happen. It does not mean trusting the offender again before they have proven trustworthy. It does not mean staying in an abusive situation, or refusing to seek justice, or not setting boundaries. Forgiveness is a release of debt — handing the books to the One who keeps them rightly. It is saying, 'I will not collect on this anymore. I trust God to.' That is hard, and it is freeing, and it is non-negotiable for the Christian.",
      "The parable in Matthew 18 is sobering. A king forgives a servant a debt of millions; that same servant turns around and grabs a fellow servant by the throat for a few dollars. The king is furious. Jesus says, 'So also my heavenly Father will do to every one of you, if you do not forgive your brother from your heart.' This is not a side issue. The forgiven who refuse to forgive have not yet understood what they themselves have received.",
      "Practically: how do you forgive someone who has done something terrible? You do it the way you do most hard Christian things — by faith, in steps, with help. You name the wound honestly to God. You hand the debt to Him. You ask Him to bless the person — yes, bless (Luke 6:28). You do this repeatedly, often, for years if needed. You may need to do it again every time the memory surfaces. That is not a failure of forgiveness; that is what forgiveness over years actually looks like. The platform's Forgive walk on /forgive is a structured way to do this prayerfully.",
      "There is one more shape of repentance to name. Sometimes you have wounded another believer. James 5:16 says, 'Confess your sins to one another and pray for one another, that you may be healed.' Going to the person you have hurt — not just to God — is part of true repentance. It is humbling, and it is healing. Christ goes with you when you go.",
      "The whole rhythm — turning, being forgiven, forgiving — is the daily breath of the Christian life. In, then out. Receive grace; give grace. The believer never graduates from this. Augustine, after thirty years a Christian, wrote, 'Lord, deliver me from my old loves.' The longest-walking saint still repents. Welcome to the family.",
    ],
    witnesses: [
      {
        who: "Augustine of Hippo",
        when: "354–430",
        source: "Confessions, Book X",
        quote:
          "Late have I loved You, O Beauty ever ancient, ever new, late have I loved You! You were within me, but I was outside, and it was there that I searched for You.",
      },
      {
        who: "Catherine of Siena",
        when: "1347–1380",
        source: "Dialogue",
        quote:
          "We owe more love to one who has been forgiven much than to one who has been forgiven little. For greater is the love that follows greater forgiveness.",
      },
    ],
    readingMinutes: 35,
    crosswalk: [
      { catechism: "Heidelberg", refs: "LD 33 · true repentance · LD 51 · 'Forgive us our debts'" },
      { catechism: "Westminster Shorter", refs: "Q. 87 · repentance unto life" },
      { catechism: "Baltimore", refs: "Lessons 19–20 · the Sacrament of Penance · contrition, confession, satisfaction" },
    ],
    reflection: [
      "Is there a specific sin you have not yet confessed to the Father, by name?",
      "Is there a specific person you have not yet forgiven?",
      "What is the difference between forgiving and pretending the wound did not happen?",
      "Where might you need to go to another believer this week, not just to God?",
    ],
    discussion: [
      "Discuss: why is naming a specific sin different from a vague 'sorry'?",
      "Share, if you can, a time you received the depth of God's forgiveness.",
      "Forgiveness is not trust restored. What is the difference, and why does it matter?",
      "Pray for one another, by name, the wounds you are still trying to release.",
    ],
    recommendedReading: [
      {
        title: "Confessions",
        author: "Augustine of Hippo",
        when: "397–400",
        why: "The first and greatest spiritual autobiography. Augustine on repentance and the slow return home.",
        url: "https://www.ccel.org/ccel/augustine/confess.html",
      },
      {
        title: "Total Forgiveness",
        author: "R. T. Kendall",
        when: "2002",
        why: "A working pastor's careful, biblical walk through what forgiving actually means (and does not mean). Modern; not public domain, but worth purchasing.",
      },
    ],
    practice:
      "Confess one specific sin to the Father this week, by name. Then walk a forgiveness step toward one specific person. Use /forgive on the platform if it helps.",
    journalPrompt:
      "Make two columns. Left: a sin I confess today. Right: a debt I release today. Date the page. Sign it. Pray over both columns and close the journal.",
    quiz: [
      {
        q: "What is repentance, in the New Testament sense?",
        options: [
          "Earning forgiveness through guilt",
          "Turning from sin and toward God — a change of mind that changes direction",
          "A one-time act at conversion",
          "Promising never to sin again",
        ],
        correctIndex: 1,
        why: "Metanoia. A reorientation, ongoing throughout the Christian life.",
      },
      {
        q: "1 John 1:9 says when we confess, God…",
        options: [
          "Forgives sometimes",
          "Reduces the punishment",
          "Faithfully and righteously forgives and cleanses",
          "Waits for proof we won't repeat",
        ],
        correctIndex: 2,
        why: "He is faithful and righteous to forgive. Always. Every time.",
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
          "Because feelings of resentment are unhealthy",
          "Because it heals the offender",
        ],
        correctIndex: 1,
        why: "Ephesians 4:32 — 'Forgiving one another, as God in Christ has forgiven you.'",
      },
      {
        q: "Psalm 103 says God has removed our transgressions from us…",
        options: [
          "As far as the heavens are above the earth",
          "As far as the east is from the west",
          "Beyond the grave",
          "Until we sin again",
        ],
        correctIndex: 1,
        why: "Psalm 103:12. East from west — infinitely.",
      },
      {
        q: "Jesus' parable of the unforgiving servant teaches that…",
        options: [
          "Forgiveness is optional",
          "Receiving God's forgiveness without forgiving others has not yet understood grace",
          "Earthly debts don't matter",
          "Bitter people get rewarded",
        ],
        correctIndex: 1,
        why: "Matthew 18:21-35. The forgiven must forgive, or they have not truly received what they were given.",
      },
      {
        q: "When you have wounded another believer, James 5:16 tells you to…",
        options: [
          "Confess only to God",
          "Confess your sins to one another and pray for one another",
          "Stay silent",
          "Apologize generally",
        ],
        correctIndex: 1,
        why: "Confession is also horizontal — to those we've hurt — when it can be done safely and lovingly.",
      },
    ],
  },

  /* ── WEEK 7 ───────────────────────────────────────────────── */
  {
    week: 7,
    title: "The Holy Spirit & New Life",
    tagline: "He lives in you.",
    scripture: {
      ref: "Romans 8:9-11",
      text:
        "But you are not in the flesh but in the Spirit, if it is so that the Spirit of God dwells in you. But if any man doesn't have the Spirit of Christ, he is not His. If Christ is in you, the body is dead because of sin, but the spirit is alive because of righteousness. But if the Spirit of Him who raised up Jesus from the dead dwells in you, He who raised up Christ Jesus from the dead will also give life to your mortal bodies through His Spirit who dwells in you.",
    },
    memoryVerse: {
      ref: "Galatians 5:22-23",
      text:
        "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Against such things there is no law.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "Another Comforter",
        passage: "John 14:15-31",
        meditation:
          "Jesus tells His disciples He will send 'another Comforter' — of the same kind as Himself. The Spirit's job: to be Jesus' presence in His people once Jesus has gone to the Father.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Born of the Spirit",
        passage: "John 3:1-15",
        meditation:
          "Jesus tells Nicodemus he must be born again — born of water and the Spirit. The Christian life is not self-improvement. It is new birth. The Spirit did this in you the moment you trusted Christ.",
      },
      {
        day: 3,
        label: "Pray",
        title: "Fill me",
        passage: "Ephesians 5:15-21",
        meditation:
          "'Be filled with the Spirit' is in the Greek a present continuous command — keep on being filled. Today, pray each morning: 'Father, fill me with Your Spirit again.' He gives the Spirit to those who ask (Luke 11:13).",
      },
      {
        day: 4,
        label: "Apply",
        title: "Walking by the Spirit",
        passage: "Galatians 5:13-26",
        meditation:
          "Paul contrasts the works of the flesh with the fruit of the Spirit. Flesh produces immorality, anger, jealousy, envy. Spirit produces love, joy, peace. The Christian life is not 'try harder' — it is 'walk by the Spirit, and you will not gratify the desires of the flesh.'",
      },
      {
        day: 5,
        label: "Journal",
        title: "Fruit",
        passage: "Matthew 7:15-20",
        meditation:
          "Trees are known by their fruit. Today, examine yourself honestly — not in despair, in hope. Which fruit is the Spirit slowly growing in you? Which is still small? Journal it. Then thank Him for the growth and ask for more.",
      },
      {
        day: 6,
        label: "Review",
        title: "The Spirit prays in you",
        passage: "Romans 8:14-30",
        meditation:
          "Romans 8 is the New Testament's most concentrated chapter on the Spirit's work. He cries 'Abba!' in you. He testifies that you are God's child. He intercedes for you when you don't know what to pray. He is at work in everything for your good.",
      },
      {
        day: 7,
        label: "Rest",
        title: "Sealed",
        passage: "Ephesians 1:13-14",
        meditation:
          "'You were sealed with the Holy Spirit of promise, who is a pledge of our inheritance.' A seal in the ancient world was a mark of ownership and a guarantee. The Spirit Himself is the down payment that God will finish what He started. Rest in being sealed today.",
      },
    ],
    lesson: [
      "When you trusted Christ, the Spirit of God moved in. Not to visit — to live. Romans 8:9 says anyone who does not have the Spirit of Christ does not belong to Him; the corollary is staggering: if you do belong to Christ, His Spirit is in you. The same Spirit who moved over the waters in Genesis, who came on the prophets, who descended on Jesus at the Jordan, who raised Him from the dead — that Spirit lives in you.",
      "The Spirit does specific work. He regenerates you (John 3) — the new birth. He indwells you (1 Cor 6:19) — your body is His temple. He seals you (Eph 1:13) — He is the down payment that God will finish what He started. He testifies that you are God's child (Rom 8:16). He intercedes for you when you can't find the words (Rom 8:26). He produces fruit — love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control (Gal 5:22-23). And He gives gifts for the building up of the body (1 Cor 12).",
      "About fruit: this is the slow, real evidence that He is changing you. Notice the singular — fruit, not fruits. It is one fruit with nine flavors, and it grows together. You will not be wildly patient but a stranger to love. The Spirit grows all nine, slowly, sometimes painfully, like a tree pushes up through concrete. If you are five years into your walk and you are noticeably more loving, more patient, more self-controlled than you were on day one — the Spirit is doing exactly what He came to do. The fruit grows by abiding (John 15) more than by trying. You do not produce fruit by clenching your teeth. You produce fruit by remaining attached to the Vine.",
      "About gifts: every believer has been given something for the building up of the body. 1 Corinthians 12 names many — wisdom, knowledge, faith, healing, working of miracles, prophecy, discerning of spirits, tongues, interpretation. Romans 12 and Ephesians 4 name others — service, teaching, exhortation, leadership, mercy. Take the Spiritual Gifts walk on /gifts when you can. The point of every gift is the same: not to make you impressive, but to build up the body.",
      "Here is where Christians have lovingly disagreed for centuries: are the more dramatic gifts (tongues, prophecy, healing) for today, or did they cease with the apostolic era? Cessationists say they were the credentials of the apostles and the foundation has been laid. Continuationists say the New Testament gives no expiration date and the Spirit is still freely sovereign. This platform exists across both traditions and does not arbitrate the question. Every faithful tradition agrees: the Spirit indwells every believer, produces fruit, and equips you to serve.",
      "Two things every Christian must understand about the Spirit. First, He is a Person, not a force. The New Testament uses personal pronouns — He, not it. He can be grieved (Eph 4:30); He can be quenched (1 Thess 5:19). Relate to Him as you would to a beloved Friend who has moved into your home. Speak to Him. Listen to Him. Obey His promptings. The believer who learns to walk with the Spirit becomes the believer who walks differently than the world.",
      "Second, the Spirit is given. Not earned. You did not deserve Him when He came; you do not have to deserve Him to be filled. Luke 11:13 settles it: 'If you then, being evil, know how to give good gifts to your children, how much more will your heavenly Father give the Holy Spirit to those who ask Him?' Ask. Today. He does not parcel out the Spirit grudgingly. He floods.",
      "One pastoral word before we close. Many young believers feel pressure to have a dramatic 'baptism in the Spirit' experience. The New Testament records dramatic experiences (Acts 2, Acts 10, Acts 19) and also describes the Spirit's quieter, daily work (Romans 8, Galatians 5). Both are real. Don't chase the lightning. Walk with the Spirit, day by day, asking to be filled. He will lead you into all truth. He will produce real fruit. He will give you gifts to serve. He will pray with you in the dark. He is already here.",
    ],
    witnesses: [
      {
        who: "Basil the Great",
        when: "c. 330–379",
        source: "On the Holy Spirit",
        quote:
          "Through the Holy Spirit the rising of the dead is brought to completion, the angels are made glorious, the heavens illuminated, the air filled with hymns, and every creature renewed.",
      },
      {
        who: "John Wesley",
        when: "1703–1791",
        source: "Sermon 10 — The Witness of the Spirit",
        quote:
          "The testimony of the Spirit is an inward impression on the soul, whereby the Spirit of God directly witnesses to my spirit, that I am a child of God; that Jesus Christ hath loved me, and given Himself for me; that all my sins are blotted out, and I, even I, am reconciled to God.",
      },
    ],
    readingMinutes: 40,
    crosswalk: [
      { catechism: "Heidelberg", refs: "Q&A 53 · the Holy Spirit · Q&A 76 · partakers of Christ by the Spirit" },
      { catechism: "Westminster Shorter", refs: "Q. 31 · effectual calling by the Spirit · Q. 33–36 · the benefits" },
      { catechism: "Apostles' Creed", refs: "'I believe in the Holy Spirit'" },
    ],
    traditions: [
      {
        tradition: "Orthodox",
        voice:
          "The Spirit is the Giver of Life, who proceeds from the Father, received in the mysteries (baptism, chrismation, the Eucharist). Theosis — being made like God by grace — is the Spirit's slow, glorious work.",
      },
      {
        tradition: "Catholic",
        voice:
          "The Spirit is given in baptism and sealed in confirmation. Charisms (1 Cor 12) are real gifts for building up the Body. The dramatic gifts have not ceased; they are widely received in the renewal movements of the global Church.",
      },
      {
        tradition: "Lutheran",
        voice:
          "The Spirit works through the Word preached and the sacraments to create and sustain faith. The believer continually returns to baptism as the ground of new life.",
      },
      {
        tradition: "Reformed",
        voice:
          "The Spirit regenerates, indwells, and sanctifies. Many Reformed have held cessationism — that the dramatic sign-gifts authenticated the apostolic age — though continuationist Reformed voices have grown in recent decades. All affirm the Spirit's ordinary work in Word and sacrament.",
      },
      {
        tradition: "Wesleyan / Methodist",
        voice:
          "After conversion, the believer can experience entire sanctification — a 'second blessing' of perfecting love by the Spirit. The Spirit's work is both crisis and lifelong process.",
      },
      {
        tradition: "Pentecostal / Charismatic",
        voice:
          "The 'baptism in the Holy Spirit' is a distinct experience subsequent to conversion, often (in classical Pentecostalism) evidenced by speaking in tongues. All New Testament gifts continue — tongues, prophecy, healing, miracles.",
      },
      {
        tradition: "Anabaptist / Baptist",
        voice:
          "The Spirit indwells every believer at conversion. Subsequent fillings come through obedience, surrender, and the local church gathered to discern Christ's mind together.",
      },
    ],
    reflection: [
      "Which fruit of the Spirit is the Spirit slowly growing in you?",
      "Have you ever asked the Father to fill you afresh with His Spirit? Do it today.",
      "What does it change to know your prayer is helped by the Spirit Himself?",
      "What gift might He have given you for the building up of the body?",
    ],
    discussion: [
      "What's the difference between 'try harder' Christianity and 'walking by the Spirit' Christianity?",
      "Discuss kindly: how do continuationists and cessationists differ, and what do they share?",
      "Where do you feel grieved or quenched in your walk? What might the Spirit be saying?",
      "Share: name one fruit the Spirit has clearly grown in someone in your group.",
    ],
    recommendedReading: [
      {
        title: "A Plain Account of Christian Perfection",
        author: "John Wesley",
        when: "1777",
        why: "Wesley on the Spirit's deeper work — entire sanctification — for the believer who longs for more.",
        url: "https://www.ccel.org/ccel/wesley/perfection.html",
      },
      {
        title: "Institutes, Book III (chapters 1–3)",
        author: "John Calvin",
        when: "1559",
        why: "Calvin on the Spirit's secret work in uniting the believer to Christ.",
        url: "https://www.ccel.org/ccel/calvin/institutes.html",
      },
    ],
    practice:
      "Each morning this week, before you do anything, ask the Father: 'Fill me with Your Spirit today.' Then watch.",
    journalPrompt:
      "Pick one fruit of the Spirit you most need this season — and write a prayer asking the Spirit to grow it in you. Specifically. Name a relationship or moment where you need that fruit this week.",
    quiz: [
      {
        q: "Romans 8 says the Spirit who dwells in believers is the same Spirit who…",
        options: ["wrote the Old Testament", "raised Jesus from the dead", "moved over the waters", "spoke through angels"],
        correctIndex: 1,
        why: "Romans 8:11. The resurrection power lives in His people.",
      },
      {
        q: "The 'fruit of the Spirit' (Gal 5:22-23) is singular and begins with…",
        options: ["zeal", "love", "wisdom", "patience"],
        correctIndex: 1,
        why: "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. One fruit, nine flavors.",
      },
      {
        q: "Romans 8:26 says when we don't know how to pray, the Spirit…",
        options: ["leaves us alone", "intercedes for us with groanings too deep for words", "scolds us", "writes us a script"],
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
        why: "Ephesians 1:13 — you were sealed with the Holy Spirit when you believed. Christians have varied views on subsequent fillings; see the Apologetics page.",
      },
      {
        q: "Ephesians 5:18 says 'be filled with the Spirit' in a tense that means…",
        options: [
          "Once and you're done",
          "Only for special people",
          "Continuously — keep on being filled",
          "Only in church",
        ],
        correctIndex: 2,
        why: "Greek present continuous. The filling is ongoing, daily.",
      },
      {
        q: "The Holy Spirit is…",
        options: [
          "A force",
          "An energy",
          "A Person",
          "An influence",
        ],
        correctIndex: 2,
        why: "He is the third Person of the Trinity. He can be grieved, quenched, addressed. Relate to Him personally.",
      },
      {
        q: "Christians lovingly disagree about whether dramatic gifts (tongues, prophecy, healing)…",
        options: [
          "Are required for all believers",
          "Ceased with the apostolic era or continue today",
          "Are demonic",
          "Are unimportant",
        ],
        correctIndex: 1,
        why: "Cessationism vs. continuationism. Both are held by faithful believers. This platform does not arbitrate.",
      },
      {
        q: "Fruit of the Spirit grows by…",
        options: [
          "Clenched-teeth effort",
          "Abiding in Christ (John 15)",
          "Reading more books",
          "Long fasting alone",
        ],
        correctIndex: 1,
        why: "The branch bears fruit by remaining attached to the Vine. Effort serves abiding; it does not replace it.",
      },
    ],
  },

  /* ── WEEK 8 ───────────────────────────────────────────────── */
  {
    week: 8,
    title: "The Church",
    tagline: "One body. Many members.",
    scripture: {
      ref: "Acts 2:42-47",
      text:
        "They continued steadfastly in the apostles' teaching and fellowship, in the breaking of bread, and prayer. Fear came on every soul, and many wonders and signs were done through the apostles. All who believed were together, and had all things in common. They sold their possessions and goods, and distributed them to all, according as anyone had need. Day by day, continuing steadfastly with one accord in the temple, and breaking bread at home, they took their food with gladness and singleness of heart, praising God, and having favor with all the people. The Lord added to the assembly day by day those who were being saved.",
    },
    memoryVerse: {
      ref: "Hebrews 10:24-25",
      text:
        "Let us consider how to provoke one another to love and good works, not forsaking our own assembling together, as the custom of some is, but exhorting one another, and so much the more as you see the Day approaching.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "The first church",
        passage: "Acts 2:42-47",
        meditation:
          "Four marks: apostles' teaching, fellowship, breaking of bread, prayers. Notice they were physical, daily, public, sacrificial. This is what 'church' meant in the New Testament — not an event on Sunday morning, but a way of life together.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "One body",
        passage: "1 Corinthians 12:12-27",
        meditation:
          "Paul's metaphor: the Christian life is a body. The eye can't say to the hand, 'I have no need of you.' Read this passage and ask: who in the local body have I been treating as if I don't need them?",
      },
      {
        day: 3,
        label: "Pray",
        title: "That they may be one",
        passage: "John 17:20-26",
        meditation:
          "Jesus' great prayer on the night before He died is for unity — that His people would be one. Today, pray for your local church. Pray for the global Church. Pray for unity across the traditions.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Bear one another",
        passage: "Galatians 6:1-10",
        meditation:
          "'Bear one another's burdens.' Notice: not 'announce' or 'evaluate.' Bear. Today, identify one person in your church who is carrying something heavy. Ask the Spirit: how can I help carry it?",
      },
      {
        day: 5,
        label: "Journal",
        title: "What's kept me away",
        passage: "Hebrews 10:19-25",
        meditation:
          "Today, journal honestly. What has kept you on the edge of (or outside) a local church? Hurt by a previous one? Fear of being known? Disagreement with the leadership? Bring it to God. Ask Him for next steps.",
      },
      {
        day: 6,
        label: "Review",
        title: "The household of God",
        passage: "1 Timothy 3:14-15; Ephesians 2:11-22",
        meditation:
          "Paul calls the Church 'the household of God, the church of the living God, the pillar and ground of the truth.' It is not an extra. It is the very household into which God has adopted you. Family.",
      },
      {
        day: 7,
        label: "Rest",
        title: "Every tribe and tongue",
        passage: "Revelation 7:9-12",
        meditation:
          "Look ahead to the great multitude — every nation, tribe, people, and language, standing before the throne. Your local church is the local outpost of that multitude. The little congregation you walk into next Sunday is part of something cosmic.",
      },
    ],
    lesson: [
      "There is no solo Christianity in the Bible. From Acts 2 onward, the believers gathered — for teaching, for the meal, for prayer, for one another. The 'one another' commands in the New Testament number over fifty. Love one another. Bear one another's burdens. Confess your sins to one another. Forgive one another. Encourage one another. Spur one another on. You cannot fulfill any of these commands alone. The Christian life is, by design, embodied and communal.",
      "Jesus is building one Church across every tribe and tongue and language and nation. He called it His Body (1 Cor 12). He called it His Bride (Eph 5:25-32). He called it the household of God (1 Tim 3:15). He prayed at the end of His life that we would be one (John 17:21). And He purchased it with His own blood (Acts 20:28). This Church is not a human institution — it is the Spirit-filled outpost of the Kingdom in every neighborhood. It is also gloriously local. The New Testament knows nothing of an unaffiliated Christian. Every believer in Acts was part of a specific congregation in a specific city, taught by specific elders, taking the Lord's Supper around a specific table.",
      "Christians have lovingly differed on church order for two thousand years. Catholic and Orthodox traditions emphasize bishops in apostolic succession. Anglican and some Lutheran traditions also hold to episcopal order. Presbyterian and Reformed traditions emphasize plural elders. Congregational and Baptist traditions emphasize the local congregation's authority. Charismatic and Pentecostal congregations often weave several patterns. This platform honors that family discussion and does not arbitrate. What every faithful tradition agrees on: the Church is real, local, leadership-shaped, Word-and-sacrament-fed, and prayer-soaked. Find a faithful church. Don't outsource the question to which polity you like best on paper. Find one where Christ is preached, the Scriptures are honored, the sacraments are administered, prayer is real, and love is visible.",
      "What about a 'bad church experience'? Many new believers — and many old ones — have been wounded by churches. Pastors who abused. Communities that turned cold. Doctrine that turned into pride. These wounds are real, and the Lord does not minimize them. But the cure for a bad church is not no church; it is a faithful church. Do not let one congregation's failure rob you of the family Jesus is gathering. The Church is bigger than your worst memory of her.",
      "Practical commitments. (1) Pick a church. Don't church-shop forever. After honest looking, commit. (2) Be there regularly. The promise of Hebrews 10:24-25 only works if you show up. (3) Become a member if your tradition has formal membership; if not, become known by name. (4) Submit to the leadership where it does not contradict Scripture. The New Testament uses startling language — 'obey your leaders and submit to them, for they are keeping watch over your souls' (Heb 13:17). (5) Bring your gifts. You are not coming only to receive. You are a part of the body, and the body needs your hands, your feet, your ears. (6) Give. The early Church shared possessions; even modest faithfulness with money rearranges your heart.",
      "Three things to expect. First, you will be disappointed sometimes. Churches are full of redeemed sinners and not-yet-redeemed sinners. They will let you down. So would you let them down. Lower your expectations of perfection; raise your expectations of love. Second, you will be needed. Even brand new believers can serve — pray, welcome a stranger, set up chairs, watch children, sit with the grieving. Don't wait until you feel qualified. Just show up. Third, you will be transformed. Walking with a local body, in person, over time, is one of the most powerful means by which the Spirit shapes a disciple. You cannot become like Jesus alone. You must be sanded against the lives of other believers, learning to love people you would not have chosen as friends. That is the point.",
      "One last note for very new believers. You do not need to wait until you understand everything to join a church. Show up next Sunday — at a Bible-honoring, gospel-preaching, prayer-loving local body. Tell someone you are new. Ask how you can serve. Take the Lord's Supper. Sing the hymns even when you don't know the tunes. Go again the next Sunday. Within a year, you will be planted. Within a decade, you will be a pillar. That is how it has always worked.",
    ],
    witnesses: [
      {
        who: "Cyprian of Carthage",
        when: "c. 200–258",
        source: "On the Unity of the Church",
        quote:
          "He cannot have God for his Father who has not the Church for his mother. If anyone could escape who was outside the ark of Noah, then he also may escape who shall be outside of the Church.",
      },
      {
        who: "Charles Spurgeon",
        when: "1834–1892",
        source: "Sermon · I and the Children",
        quote:
          "I know there are some who say, 'Well, I've given myself to the Lord, but I don't intend to give myself to any church.' Now why not? Because you think yourself to be so much better than the Lord's people that you cannot fellowship with them? Better stand back, then. The truth is, you ought to be glad to find a church.",
      },
    ],
    readingMinutes: 35,
    crosswalk: [
      { catechism: "Heidelberg", refs: "LD 21 · the holy catholic church · Q&A 54–55" },
      { catechism: "Westminster Shorter", refs: "Q. 88–90 · the means of grace" },
      { catechism: "Apostles' Creed", refs: "'the holy catholic Church · the communion of saints'" },
    ],
    reflection: [
      "What's kept you out of (or at the edge of) a local church?",
      "What would 'being known' by a local body cost you — and what would it give you?",
      "What gift might Christ have given you for the building up of the body?",
      "Where do you see Christ's Body suffering — your local church or the global one — and how could you help?",
    ],
    discussion: [
      "Discuss: how do different Christian traditions handle church order, and what do they share?",
      "Share a 'bad church' story honestly. How has Christ ministered to you in it?",
      "What would change if every member of your church believed they were genuinely needed?",
      "Pray together for the universal Church — for unity, faithfulness, and protection.",
    ],
    recommendedReading: [
      {
        title: "On the Unity of the Church",
        author: "Cyprian of Carthage",
        when: "251",
        why: "An early bishop's grave, beautiful argument for one Church — written under persecution.",
        url: "https://www.ccel.org/ccel/schaff/anf05.iv.iv.html",
      },
      {
        title: "Lectures to My Students",
        author: "Charles Spurgeon",
        when: "1875",
        why: "Spurgeon coaching young pastors. Useful even for non-pastors who love a faithful local church.",
        url: "https://www.ccel.org/ccel/spurgeon/lectures.html",
      },
    ],
    practice:
      "If you do not have a church home, visit one this Sunday. Use /connect to find one. If you have one, tell a leader you are walking through Foundations and ask how you can serve.",
    journalPrompt:
      "Write a letter to your future self — five years from now — describing what you hope your relationship with a local church will look like. Date it. Tuck it in.",
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
          "Avoid meeting together to protect their faith",
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
          "It preaches Christ, honors the Scriptures, administers the sacraments, prays, and loves",
          "It has the best music",
          "It is small",
          "It is famous",
        ],
        correctIndex: 0,
        why: "Word, sacrament, prayer, love. Across every faithful tradition.",
      },
      {
        q: "Christians have differed for centuries on church order. The platform's posture is…",
        options: [
          "To insist on one polity",
          "To honor the family conversation and not arbitrate",
          "To pick the historical winner",
          "To avoid the topic",
        ],
        correctIndex: 1,
        why: "We exist under your local church, not over it, on matters Scripture leaves room for difference.",
      },
      {
        q: "What is the right response to a bad church experience?",
        options: [
          "Quit church forever",
          "Find a faithful church and try again",
          "Start your own home church alone",
          "Become bitter",
        ],
        correctIndex: 1,
        why: "The cure for a bad church is not no church. The Church is bigger than your worst memory of her.",
      },
      {
        q: "When you join a church, you should expect to be…",
        options: [
          "Only a receiver",
          "Disappointed sometimes, needed often, and transformed slowly",
          "Constantly comfortable",
          "The center",
        ],
        correctIndex: 1,
        why: "Real bodies have real friction and real fruit. Lower your expectations of perfection; raise your expectations of love.",
      },
    ],
  },

  /* ── WEEK 9 ───────────────────────────────────────────────── */
  {
    week: 9,
    title: "Baptism & the Lord's Supper",
    tagline: "Two practices Jesus gave His Church.",
    scripture: {
      ref: "Matthew 28:18-20; 1 Corinthians 11:23-26",
      text:
        "All authority has been given to Me in heaven and on earth. Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you… For I received from the Lord that which also I delivered to you, that the Lord Jesus on the night in which He was betrayed took bread; and when He had given thanks, He broke it, and said, 'Take, eat. This is My body which is broken for you. Do this in remembrance of Me.' In the same way He also took the cup, after supper, saying, 'This cup is the new covenant in My blood. Do this, as often as you drink, in remembrance of Me.' For as often as you eat this bread and drink this cup, you proclaim the Lord's death until He comes.",
    },
    memoryVerse: {
      ref: "1 Corinthians 11:26",
      text:
        "For as often as you eat this bread and drink this cup, you proclaim the Lord's death until He comes.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "The Great Commission",
        passage: "Matthew 28:16-20",
        meditation:
          "Jesus' final command. Make disciples. Baptize. Teach. Notice baptism is not optional or symbolic-only — it is part of how disciples are made.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Buried with Him",
        passage: "Romans 6:1-14",
        meditation:
          "Paul connects baptism to dying and rising with Christ. The old you goes under the water; a new you comes up. Baptism does not just symbolize — in some real sense, it enacts your union with Christ.",
      },
      {
        day: 3,
        label: "Pray",
        title: "The night He was betrayed",
        passage: "1 Corinthians 11:17-34",
        meditation:
          "Pray Paul's careful words. Discern the body. Examine yourself. Take the Supper with reverence. Today, ask the Father for fresh awe at the Table.",
      },
      {
        day: 4,
        label: "Apply",
        title: "The Ethiopian eunuch",
        passage: "Acts 8:26-39",
        meditation:
          "Philip explains the gospel; the eunuch believes; immediately he asks to be baptized — and they go down into water together. Baptism in the New Testament happens quickly after faith. If you have trusted Christ and are not yet baptized, who is your pastor?",
      },
      {
        day: 5,
        label: "Journal",
        title: "Examine yourself",
        passage: "1 Corinthians 11:23-32",
        meditation:
          "Paul says before taking the Supper, examine yourself. Today, journal: when did you last take communion with full attention? What was in your heart? What posture do you want to bring to the next Table?",
      },
      {
        day: 6,
        label: "Review",
        title: "One bread, one body",
        passage: "1 Corinthians 10:14-22",
        meditation:
          "'Because there is one bread, we, who are many, are one body; for we all partake of the one bread.' The Supper is not private. It binds you to every other believer who shares the loaf.",
      },
      {
        day: 7,
        label: "Rest",
        title: "Until He comes",
        passage: "Revelation 19:6-9",
        meditation:
          "The Supper looks back to Christ's death AND forward to His return — to the wedding supper of the Lamb. Every time you take it, you are rehearsing the marriage feast we are all coming to.",
      },
    ],
    lesson: [
      "Jesus commanded two specific practices for His Church: baptism and the Lord's Supper. Christians have lovingly disagreed for centuries on the details — when to baptize, how much water, what exactly the Supper does, who may preside, who may receive — but every faithful tradition has held both close. They are not optional cultural add-ons. They are commanded by Christ.",
      "Baptism is the public sign of belonging to Christ. Romans 6 connects it to dying and rising with Jesus. You go down into the water; the old you is buried; you come up new. The Great Commission (Matt 28:18-20) names baptism as part of making disciples. The book of Acts records new believers being baptized immediately after they trust Christ — three thousand in one day (Acts 2), the Philippian jailer and his household in one night (Acts 16), an Ethiopian official on a roadside (Acts 8). If you have trusted Christ and are not yet baptized, this is the next step — and a local pastor is who you talk to about it, not an app.",
      "Christians differ on three baptism questions, all centuries old. (1) Who? Baptists and many evangelicals baptize only those who can profess faith for themselves — believer's baptism. Catholic, Orthodox, Lutheran, Reformed, Anglican, Methodist traditions also baptize the infants of believing parents, on the analogy of circumcision in the old covenant — paedobaptism. (2) How? Some traditions baptize by full immersion; others by pouring or sprinkling. The Greek word baptizo allows both. (3) What happens? Some traditions speak of baptismal regeneration — that grace is genuinely conveyed through the act. Others view baptism as a sign and seal of a regeneration that has already happened by the Spirit. The platform honors all of these as the position of faithful Christians. If you are sorting through which tradition fits your conscience, ask a local pastor in the church family God has placed you in.",
      "The Lord's Supper (Communion, the Eucharist, the Table) is the meal Jesus gave us the night before He died. He took bread, gave thanks, broke it, and said, 'This is my body, broken for you.' He took the cup and said, 'This cup is the new covenant in my blood.' He told us to do this 'until He comes.' Every Sunday somewhere in the world the Church is doing exactly that — taking the bread and the cup, proclaiming His death, remembering Him, anticipating His return.",
      "Christians have always understood that something more than ordinary bread and wine is happening at the Table. They have disagreed about the language. Catholic theology speaks of transubstantiation — the elements truly become the body and blood of Christ. Lutheran theology speaks of sacramental union — Christ is truly present 'in, with, and under' the bread and wine. Reformed theology speaks of spiritual presence — Christ is truly received by the believer in the act of eating, by the work of the Spirit, though not in the elements themselves. Many Anabaptist and free-church traditions emphasize memorial — the Supper as a powerful remembrance. This platform honors all of these as the careful work of faithful believers wrestling with mystery. What every faithful tradition agrees on: at the Table, Christ is really present in some real way, by the Spirit, to His people. Receive Him.",
      "Practically. (1) Take communion regularly with your local church. If you cannot get to church — illness, mission, persecution — your church may have a way to receive it; consult your pastor; the platform also has a reverent home liturgy at /communion when no other option exists. (2) Examine yourself before the Table (1 Cor 11:28). Are you trusting Christ? Are you in unrepented sin? Is there a brother or sister against whom you hold something (Matt 5:23-24)? Bring it up first. (3) Take it with attention. Don't rush. The bread is Christ's body for you. The cup is His blood for you. He is here. (4) Receive it in joy. The Supper is not a funeral. It is a wedding rehearsal.",
      "Two pastoral words. If you are a new believer and have not yet been baptized, please make that conversation a priority. Find a faithful local pastor and ask. The wait is rarely good for the soul; the obedience is. If you have been baptized but it has been a long time since you took the Supper attentively, the next time can be the deepest one yet. He has been waiting at His table for you the whole time.",
      "One last truth. These two practices are not magic. The water does not save apart from Christ; the bread does not save apart from Christ. But they are also not mere symbols, as if Christ were absent. They are means of grace — appointed ways the Lord meets His people. They are the visible Word. Receive them.",
    ],
    witnesses: [
      {
        who: "Cyril of Jerusalem",
        when: "c. 313–386",
        source: "Catechetical Lectures",
        quote:
          "Trust not the judgment to thy bodily palate; no, but to faith unfaltering; for they who taste are bidden to taste, not bread and wine, but the antitypical Body and Blood of Christ.",
      },
      {
        who: "John Calvin",
        when: "1509–1564",
        source: "Institutes, IV.17",
        quote:
          "I exhort my readers to rise much higher than I am able to lead them. For when this mystery is in question, I always am much more conscious of how feeble my understanding is than of having attained anything in it.",
      },
    ],
    readingMinutes: 45,
    crosswalk: [
      { catechism: "Heidelberg", refs: "LD 25–30 · sacraments, baptism, the Lord's Supper" },
      { catechism: "Westminster Shorter", refs: "Q. 91–97 · the sacraments, baptism, the Lord's Supper" },
      { catechism: "Baltimore", refs: "Lessons 13–24 · the seven sacraments (baptism + Eucharist treated in detail)" },
      { catechism: "Orthodox Catechism", refs: "Part II · the mysteries — baptism, chrismation, Eucharist" },
    ],
    facilitatorNotes: [
      "Cross-tradition members may experience this week as tender — childhood traditions are deep. Honor differences without flattening them.",
      "Don't take communion in the group unless your tradition allows; honor that. If you do, prepare hearts thoroughly.",
      "If anyone has never been baptized, this is a high-stakes pastoral moment. Walk with them to their local pastor — don't try to be the pastor.",
    ],
    traditions: [
      {
        tradition: "Orthodox",
        voice:
          "Baptism by triple immersion forgives sin and unites the candidate to Christ's death and resurrection; chrismation (anointing with holy oil) seals the gift of the Spirit. The Eucharist is a true mystery — the bread and cup truly become the Body and Blood of Christ. Infants are baptized and chrismated; small children commune from the chalice.",
      },
      {
        tradition: "Catholic",
        voice:
          "Baptism removes original sin and confers sanctifying grace, the first of seven sacraments. The Eucharist is transubstantiated — the substance of the elements truly becomes Christ's Body and Blood while the appearances remain. Infants of believing parents are baptized.",
      },
      {
        tradition: "Lutheran",
        voice:
          "Baptism is regenerative: God works through water and Word to save. The Eucharist is the true Body and Blood 'in, with, and under' the bread and wine (sacramental union). Infants of believing parents are baptized.",
      },
      {
        tradition: "Anglican",
        voice:
          "Baptism is regenerative in some sense (the prayer-book language) but received by faith. The Eucharist holds a wide range — from memorialist to high sacramental presence — across the Communion. Infants of believing parents are baptized.",
      },
      {
        tradition: "Reformed",
        voice:
          "Baptism is the sign and seal of the covenant of grace, replacing circumcision in the New Covenant; infants of believing parents are baptized. The Lord's Supper is true spiritual feeding on the body and blood of Christ by the Spirit (Calvin's spiritual presence).",
      },
      {
        tradition: "Wesleyan / Methodist",
        voice:
          "Baptism initiates into the covenant community; infants of believing parents are baptized. The Eucharist is a real means of grace where Christ is truly present, though Methodism has not bound itself to a single metaphysics.",
      },
      {
        tradition: "Anabaptist / Baptist",
        voice:
          "Baptism is for those who can profess faith for themselves — believer's baptism by immersion. The Lord's Supper is most often understood as a memorial proclamation of Christ's death, with the congregation gathered to remember and proclaim.",
      },
      {
        tradition: "Pentecostal / Charismatic",
        voice:
          "Most Pentecostal traditions hold believer's baptism by immersion. The Lord's Supper is typically memorial, with strong expectation of the Spirit's presence in the gathered church.",
      },
    ],
    reflection: [
      "Have you been baptized? If not, who is the pastor you could talk to this week?",
      "What does it mean to you that the Table proclaims His death 'until He comes'?",
      "Why might Jesus have given His Church two physical signs, not just words?",
      "How does your tradition describe what happens at the Table, and how does that differ from your neighbor's?",
    ],
    discussion: [
      "Discuss respectfully: how do your members' traditions handle baptism — who, how, and what it accomplishes?",
      "Share, gently, your experience of communion across different traditions. What have you learned?",
      "What might it mean for unity in your group to honor the family disagreements here?",
      "Pray for the Church around the world taking communion in places of persecution this Sunday.",
    ],
    recommendedReading: [
      {
        title: "Catechetical Lectures",
        author: "Cyril of Jerusalem",
        when: "c. 350",
        why: "The 4th-century bishop's lectures to those preparing for baptism. The earliest pastoral guide to the sacraments still in use.",
        url: "https://www.ccel.org/ccel/schaff/npnf207.toc.html",
      },
      {
        title: "Institutes, Book IV (chapters 14–18)",
        author: "John Calvin",
        when: "1559",
        why: "Calvin's careful treatment of the sacraments in the Reformed tradition.",
        url: "https://www.ccel.org/ccel/calvin/institutes.html",
      },
    ],
    practice:
      "If you have never been baptized, message a local pastor this week and ask. If you have, take communion at your church this Sunday with full attention — examine yourself, then receive Him.",
    journalPrompt:
      "Write what these two practices mean to you — not abstractly, but as a child of God who has been signed and fed. If you have been baptized, when and where? If not, what is the next step?",
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
        why: "The Table is preaching with bread and cup — past (His death), present (His presence), and future (His return).",
      },
      {
        q: "Christian traditions disagree about exactly how Christ is present at the Table. We should respond by…",
        options: [
          "Choosing the cleverest theology",
          "Holding the unity of Christ's people while honoring the centuries-long conversation",
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
      {
        q: "Before taking the Supper, Paul says we should…",
        options: [
          "Pay a fee",
          "Be perfect",
          "Examine ourselves",
          "Fast for a day",
        ],
        correctIndex: 2,
        why: "1 Corinthians 11:28. Self-examination — not perfection — is the posture.",
      },
      {
        q: "Christians differ on who should be baptized. Believer's-baptism traditions baptize…",
        options: [
          "Anyone who walks in",
          "Only those who can profess faith for themselves",
          "Only children",
          "Only ordained ministers",
        ],
        correctIndex: 1,
        why: "Credobaptism (Baptist, most evangelicals). Paedobaptism traditions also baptize infants of believing parents.",
      },
      {
        q: "Both practices are…",
        options: [
          "Optional cultural traditions",
          "Magical acts that save apart from Christ",
          "Means of grace — visible signs Jesus commanded for His Church",
          "Tests of obedience",
        ],
        correctIndex: 2,
        why: "Commanded by Christ; ways the Lord meets His people; ineffective apart from faith in Him.",
      },
    ],
  },

  /* ── WEEK 10 ──────────────────────────────────────────────── */
  {
    week: 10,
    title: "Witness",
    tagline: "Tell someone what He has done.",
    scripture: {
      ref: "Acts 1:8",
      text:
        "You will receive power when the Holy Spirit has come upon you. You will be witnesses to Me in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth.",
    },
    memoryVerse: {
      ref: "1 Peter 3:15",
      text:
        "Sanctify the Lord God in your hearts; and always be ready to give an answer to everyone who asks you a reason concerning the hope that is in you, with humility and fear.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "You will be witnesses",
        passage: "Acts 1",
        meditation:
          "Jesus' last command before ascending. The Spirit's power is given for witness. Witness is not for the gifted; it is for every believer who has received the Spirit.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Come and see",
        passage: "John 1:35-51",
        meditation:
          "Watch the first disciples bring others. Andrew finds Peter. Philip finds Nathanael. Nathanael doubts; Philip's answer is two words: 'Come and see.' Witness is friendship-shaped invitation.",
      },
      {
        day: 3,
        label: "Pray",
        title: "Boldness",
        passage: "Acts 4:23-31",
        meditation:
          "The first Christians, threatened by the authorities, didn't pray for protection — they prayed for boldness. Today, ask the Father for the same. Boldness is not loudness. It is the courage to speak what is true.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Your story",
        passage: "John 9:1-25",
        meditation:
          "The man born blind, when interrogated, gives the simplest witness in the Gospels: 'One thing I know — I was blind, now I see.' He doesn't have all the theology. He has his story. Today, draft yours in three sentences: before, Jesus met me, now.",
      },
      {
        day: 5,
        label: "Journal",
        title: "Who don't yet know",
        passage: "Romans 10:13-17",
        meditation:
          "'How shall they hear without a preacher?' List today the names of three to five people in your life who do not yet know Jesus. Then pray each name out loud. The list is your assignment.",
      },
      {
        day: 6,
        label: "Review",
        title: "With meekness",
        passage: "1 Peter 3:13-17",
        meditation:
          "Be ready to give a defense — with meekness and fear. Posture matters as much as content. The Christian witness is not arguing someone into the Kingdom; she is introducing them to a Person she loves.",
      },
      {
        day: 7,
        label: "Rest",
        title: "He will be with you",
        passage: "Matthew 28:16-20",
        meditation:
          "Jesus' last word to the disciples sending them out: 'And behold, I am with you always.' You are not sent alone. He goes with you to every coffee shop, every kitchen table, every late-night conversation.",
      },
    ],
    lesson: [
      "A witness tells what they have seen and heard. That is all. You do not need a seminary degree, an evangelism outline, or a Bible college. You need the truth — Jesus is real, He has saved me, here is what He has done — and the courage to say it. The book of Acts is full of ordinary, unschooled fishermen-and-tax-collectors witnesses. The Roman Empire watched what those witnesses did, and within three centuries the whole empire bent the knee to Christ.",
      "The Greek word for witness is martyr. The witnesses in Acts knew it could cost them their lives, and they spoke anyway. Stephen is stoned mid-sermon; he keeps preaching as he dies. The early Church grew in the soil watered with the blood of martyrs. Most of us today are not asked to die for the gospel. But the same Spirit who gave Stephen his words gives them to us — for the harder conversation with your father, the coffee with a college roommate who has rejected the faith, the cousin at Thanksgiving who is curious.",
      "Most people come to Christ through one ordinary friend who told them gently and stayed close. Not a TV preacher. A neighbor. A roommate. A cousin. The Spirit pairs your faltering words with His power (1 Cor 2:4). The history of the global Church is a quiet history of mothers, grandfathers, classmates, taxi drivers, nurses. Not famous evangelists. Faithful friends.",
      "1 Peter 3:15 gives the New Testament's clearest framework. 'Be ready to give a defense to everyone who asks you a reason for the hope that is in you, with meekness and fear.' Three things. (1) Be ready. Don't wait until you feel qualified. Think now about how you would explain why you trust Jesus. (2) Speak when asked. Notice Peter assumes the conversation is started by your hope — that something about your life makes someone curious enough to ask. Live a life that provokes questions. (3) Meekness and fear. Posture matters. You are not winning an argument; you are introducing a Person.",
      "There are two complementary aspects of witness. The first is your story — your personal testimony. You can tell it in three sentences: before, Jesus met me, now. Before, I was a man born blind. Jesus opened my eyes. Now, I see. Your story does not have to be dramatic. Many of the most powerful testimonies are quiet: 'I was raised in church but never knew Him. Three years ago I read the Gospel of John honestly. Now I am following Jesus.' Practice yours so you can give it in two minutes if asked.",
      "The second is the gospel itself — the four facts of 1 Corinthians 15. Christ died for our sins. He was buried. He rose on the third day. He was seen. You also know this: anyone who trusts Him is forgiven, indwelt by the Spirit, adopted as a child of God. This is the gospel. Don't add to it. Don't water it down. The Spirit uses these words to bring sinners to life.",
      "On posture: the way you witness is itself part of the witness. If you speak the truth with arrogance, people will reject the messenger and miss the message. If you speak with love, you give the Spirit space to do His work. The early Christians were called 'people of the Way' — and the way they lived (love, generosity, holiness, joy in suffering) was as evangelistic as anything they said. The Roman emperor Julian, who tried to revive paganism in the 4th century, complained that the Christians cared for the poor of his cities even while persecuted — and won converts that way. Live a life that provokes questions. Then have the answer ready.",
      "Two specific suggestions for this week. First, write down five names of people in your life who do not yet know Christ. Pray for them every day this week, by name. Second, plan one actual conversation — coffee with a friend, dinner with a family member, a walk with a neighbor. Don't preach. Just bring up Christ honestly. Tell them one thing He has done in your life recently. See what the Spirit does.",
      "One last word. Witness is not your work; it is the Spirit's work through you. The harvest is not yours to control. You sow. You water. God gives the growth (1 Cor 3:6-7). Some seeds will germinate years later, after you have forgotten the conversation. Some will land on rocky soil. Some will fall in a ready heart and produce thirty- and sixtyfold. Your job is to scatter. The Lord of the harvest does the rest.",
    ],
    witnesses: [
      {
        who: "Polycarp of Smyrna",
        when: "c. 69–155",
        source: "Martyrdom of Polycarp",
        quote:
          "Eighty and six years have I served Him, and He never did me any wrong. How then can I blaspheme my King who saved me?",
      },
      {
        who: "Charles Spurgeon",
        when: "1834–1892",
        source: "Sermon · Personal Service for Christ",
        quote:
          "Every Christian here is either a missionary or an impostor. Recollect that. You either try to spread abroad the kingdom of Christ, or else you do not love Him at all. It cannot be that there is a high appreciation of Jesus and a totally silent tongue about Him.",
      },
    ],
    readingMinutes: 30,
    crosswalk: [
      { catechism: "Westminster Shorter", refs: "Q. 35 · sanctification (the new life flowing out)" },
      { catechism: "Heidelberg", refs: "Q&A 86 · why we should still do good works" },
    ],
    reflection: [
      "Who in your life right now does not yet know Jesus?",
      "What stops you from telling them?",
      "What is the simplest version of your story you could share over coffee?",
      "What about your life provokes questions? What doesn't?",
    ],
    discussion: [
      "Share your three-sentence testimony with the group. Refine each other's.",
      "Discuss: why is posture as important as content in witness?",
      "Pray for one another by name — for boldness in one specific conversation this week.",
      "What's the difference between sharing the gospel and 'winning an argument'?",
    ],
    recommendedReading: [
      {
        title: "The Soul-Winner",
        author: "Charles Spurgeon",
        when: "1895",
        why: "Spurgeon's clearest teaching on how ordinary believers reach souls. Practical, warm, urgent.",
        url: "https://www.ccel.org/ccel/spurgeon/soulwinner.html",
      },
      {
        title: "Out of the Salt Shaker and into the World",
        author: "Rebecca Manley Pippert",
        when: "1979",
        why: "A modern classic on witness as friendship. Not public domain, but widely available.",
      },
    ],
    practice:
      "Tell one person this week, in plain words: 'Here is something Jesus has done in my life.' Don't argue. Don't perform. Tell.",
    journalPrompt:
      "Write the five names. Pray each one. Then write your three-sentence testimony. Date it. Keep it where you can find it.",
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
        options: ["argues", "tells what they have seen and heard", "preaches sermons only", "debates"],
        correctIndex: 1,
        why: "You are not the judge or the prosecutor. You are the witness.",
      },
      {
        q: "Most people come to Christ through…",
        options: ["TV preachers", "ordinary friends who tell them gently and stay close", "books alone", "billboards"],
        correctIndex: 1,
        why: "The pattern of Acts and church history. Witness is friendship plus truth, over time.",
      },
      {
        q: "The man born blind (John 9) gives this simple testimony…",
        options: [
          "'I have studied theology.'",
          "'I was blind; now I see.'",
          "'I argued with the Pharisees.'",
          "'Jesus is the Messiah.'",
        ],
        correctIndex: 1,
        why: "Your story is enough. You don't need to have all the answers — you need to tell the truth.",
      },
      {
        q: "The Greek word for witness is also the word for…",
        options: ["pastor", "martyr", "saint", "teacher"],
        correctIndex: 1,
        why: "Martyr. The witnesses in Acts knew it could cost their lives. Many of us today aren't asked for our lives — but the courage is the same kind.",
      },
      {
        q: "Romans 10:13-17 emphasizes that people come to faith by…",
        options: [
          "Visions",
          "Hearing the word about Christ",
          "Trying harder",
          "Religious experiences alone",
        ],
        correctIndex: 1,
        why: "'Faith comes by hearing, and hearing by the word of Christ.' Witness is how hearing happens.",
      },
      {
        q: "The harvest belongs to…",
        options: ["the witness", "the Lord", "the local pastor", "the strongest evangelist"],
        correctIndex: 1,
        why: "1 Corinthians 3:6-7. You sow; God gives the growth. Your job is to scatter.",
      },
    ],
  },

  /* ── WEEK 11 ──────────────────────────────────────────────── */
  {
    week: 11,
    title: "Suffering, Hope, and Eternity",
    tagline: "Living between the times.",
    scripture: {
      ref: "Romans 8:18-25",
      text:
        "For I consider that the sufferings of this present time are not worthy to be compared with the glory which will be revealed toward us. For the creation waits with eager expectation for the children of God to be revealed. For the creation was subjected to vanity, not of its own will, but because of him who subjected it, in hope that the creation itself also will be delivered from the bondage of decay into the liberty of the glory of the children of God. For we know that the whole creation groans and travails in pain together until now. Not only so, but ourselves also, who have the first fruits of the Spirit, even we ourselves groan within ourselves, waiting for adoption, the redemption of our body. For we were saved in hope, but hope that is seen is not hope. For who hopes for that which he sees?",
    },
    memoryVerse: {
      ref: "Revelation 21:4",
      text:
        "He will wipe away from them every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more: the first things have passed away.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "More than conquerors",
        passage: "Romans 8:18-39",
        meditation:
          "Sit slowly with this whole chapter. Paul does not deny present suffering; he names it directly. But he does not let it have the last word. Nothing — not death, not life, not angels, not powers, not anything in creation — can separate you from the love of God in Christ Jesus.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Blessed are those who mourn",
        passage: "Matthew 5:1-12",
        meditation:
          "Jesus does not say grief is bad. He calls those who mourn blessed and promises they shall be comforted. The Christian doesn't pretend pain isn't there. She brings it to the One who promises to wipe every tear.",
      },
      {
        day: 3,
        label: "Pray",
        title: "Lament",
        passage: "Psalm 13",
        meditation:
          "'How long, O LORD?' is one of the most repeated phrases in the Psalms. Today, pray Psalm 13 as your own. If there is pain you have been hiding from God, name it. The Bible's prayer book gives you words.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Endurance produces character",
        passage: "James 1:2-12",
        meditation:
          "'Count it all joy, my brothers and sisters, when you fall into various trials.' James does not say feel happy about suffering. He says count it joy because of what it produces — endurance, maturity, completeness. The Christian's suffering is never wasted.",
      },
      {
        day: 5,
        label: "Journal",
        title: "What I am carrying",
        passage: "1 Peter 5:6-11",
        meditation:
          "'Cast all your worries on Him, because He cares for you.' Today, journal three specific things you are carrying — losses, fears, ongoing pains. Write each one. Then write under each: 'Cast on Him today.'",
      },
      {
        day: 6,
        label: "Review",
        title: "Behold, He makes all things new",
        passage: "Revelation 21:1-7",
        meditation:
          "Read this passage out loud. Twice. The end of the Story is not your soul floating away to a disembodied heaven. The end is a new creation, a new Jerusalem, God dwelling with His people, every tear wiped away. This is where you are going.",
      },
      {
        day: 7,
        label: "Rest",
        title: "I am with you",
        passage: "Isaiah 43:1-7",
        meditation:
          "'When you pass through the waters, I will be with you; and through the rivers, they will not overflow you. When you walk through the fire, you will not be burned, and flame will not scorch you.' Suffering will come; abandonment will not. Rest in that today.",
      },
    ],
    lesson: [
      "The Christian life is lived between Christ's first coming and His second. The Kingdom has come; it has not yet come in full. So we suffer real loss, real grief, real hardship. Christians get cancer. Christians lose children. Christians experience betrayal, depression, persecution, war. The New Testament does not promise otherwise. It promises something different and better: that suffering does not have the last word, and that you do not suffer alone.",
      "Notice what the Bible does and does not say. It does not say suffering is good. It does not say Christians should pretend to be happy about it. It does not say grief is a failure of faith. Paul says even creation 'groans and travails in pain' (Rom 8:22), and Christians groan with it. Jesus wept at Lazarus's grave even though He knew He was about to raise him. Tears were never beneath Him; they will not be beneath you.",
      "What the Bible does say is that suffering is not the last word. Three convictions hold the Christian in pain. First, God is sovereign over suffering. He does not always cause it, but He is never surprised by it, and He is always able to bring good out of it. Romans 8:28 — 'all things work together for good for those who love God.' Not all things are good. All things will be woven, by Him, for good. Second, Christ has suffered too. The God we are praying to has scars. Jesus is not aloof from your pain; He bore it. Hebrews 4:15 — He sympathizes with our weakness. He has been through the worst of it, and He waits with you in yours. Third, suffering is forming you. Romans 5:3-5 — suffering produces endurance; endurance, character; character, hope. The believer who has been through the fire and come out trusting Christ has something the comfortable believer doesn't yet have. The early Church called these the 'sufferings of Christ' (Col 1:24), and they were considered precious.",
      "Christians grieve differently — not less, but with hope. 1 Thessalonians 4:13 is the clearest verse on Christian grief: 'we do not grieve as those who have no hope.' Note: we grieve. The grief is real. We just don't grieve as if death were the final fact. Hope is the believer's distinctive note in the dark.",
      "What is the hope? The hope is not vague — 'a better place,' 'spirits in heaven.' The Christian hope is staggering and specific. Jesus will return. The dead in Christ will rise — bodily. There will be a new creation. God will dwell with His people. Every tear will be wiped from every eye. Death will be no more. Mourning, crying, pain will be no more. The world will be made new (Rev 21). This is not metaphor. This is what the Bible promises in plain language. The whole purpose of suffering is not to teach you to leave the world but to make you long for the world to come — and to be the kind of person who can live there.",
      "Practical wisdom for the suffering believer. (1) Bring it to Him. The Psalms give you words for everything — anger, lament, confusion, longing, hope. Pray honestly. (2) Don't isolate. The body of Christ is supposed to bear one another's burdens (Gal 6:2). Tell someone. Let them carry it with you. (3) Resist the lie that your suffering proves God doesn't love you, or proves He isn't real. Read Job. Read the Psalms of lament. Read Hebrews 11 — heroes of faith who 'experienced mockings and scourgings' and 'did not receive the promise.' Their faith was real precisely in the suffering. (4) Hold both — the present pain and the coming glory. Don't deny either one. Christianity is not stoicism; it is not pretending the pain isn't there. It is also not despair; it is not pretending the hope isn't coming.",
      "One word about death specifically. You will die, almost certainly. So will everyone you love. Christians have always faced this honestly. Paul: 'To live is Christ, and to die is gain' (Phil 1:21). Christians do not love death — Paul calls death an enemy (1 Cor 15:26) — but they do not fear it. The grave is a doorway, not a wall. The same Jesus who walked out of His tomb will walk you out of yours. Rest in this. Plan your death in this light. Live as someone for whom death has been defanged.",
      "Final thought. The Christian's confidence is not based on the absence of pain but on the presence of Christ in the pain. Whatever you are carrying — and you are carrying something, even if you do not name it today — bring it to Him. He has not promised you a painless life. He has promised that you will never walk through it alone, and that the end of the Story is a sea of joy.",
    ],
    witnesses: [
      {
        who: "Julian of Norwich",
        when: "c. 1342–1416",
        source: "Revelations of Divine Love",
        quote:
          "He said not, 'Thou shalt not be tempested, thou shalt not be travailed, thou shalt not be afflicted'; but He said, 'Thou shalt not be overcome.'",
      },
      {
        who: "Charles Spurgeon",
        when: "1834–1892",
        source: "Sermon · The Sword of Bereavement",
        quote:
          "I have learned to kiss the wave that throws me against the Rock of Ages.",
      },
    ],
    readingMinutes: 40,
    crosswalk: [
      { catechism: "Heidelberg", refs: "Q&A 1 · my only comfort in life and in death" },
      { catechism: "Westminster Shorter", refs: "Q. 37–38 · death and the resurrection of the body" },
      { catechism: "Apostles' Creed", refs: "'the resurrection of the body and the life everlasting'" },
    ],
    reflection: [
      "What loss are you carrying right now that you have not yet brought to Him?",
      "How is your suffering different because of Jesus — not lighter, but different?",
      "What does it change about today to know how the Story ends?",
      "Where might pretending be costing you communion with the Father — pretending to be fine?",
    ],
    discussion: [
      "Share a season of suffering (then or now). What did Christ do for you in it?",
      "Discuss: how does the Christian hope differ from 'a better place' or 'spirits in heaven'?",
      "How do you minister to a fellow believer in crisis, without minimizing pain or false-promising God?",
      "Pray for one another's specific burdens by name.",
    ],
    recommendedReading: [
      {
        title: "Revelations of Divine Love",
        author: "Julian of Norwich",
        when: "1395",
        why: "An anchoress's visions in a plague-haunted town — 'all shall be well, and all manner of thing shall be well.' Held by the Body for six centuries in pain.",
        url: "https://www.ccel.org/ccel/julian/revelations.html",
      },
      {
        title: "Pensées",
        author: "Blaise Pascal",
        when: "1670",
        why: "A scientist's fragmentary notes on suffering, hope, and the wager of faith. Honest about pain, certain of God.",
        url: "https://www.ccel.org/ccel/pascal/pensees.html",
      },
    ],
    practice:
      "Read Revelation 21:1-7 every day this week, slowly, out loud. Memorize verse 4 if you can.",
    journalPrompt:
      "Write the worst thing you are currently carrying. Then, beneath it, write Revelation 21:4 in your own hand. End with: 'Father, I trust You with this until the day You wipe every tear.'",
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
        why: "A specific chain — suffering does real work in the saint when held in faith.",
      },
      {
        q: "Revelation 21 promises that in the new creation…",
        options: [
          "we will rest forever doing nothing",
          "God will dwell with His people; every tear wiped away",
          "we will become gods",
          "the earth will be destroyed and forgotten",
        ],
        correctIndex: 1,
        why: "Revelation 21:3-4. God with us — the deepest joy. And a new creation, not its abandonment.",
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
      {
        q: "Christians can grieve and lament because…",
        options: [
          "Faith is weak",
          "The Psalms give us inspired words for the whole range of human pain",
          "God secretly disapproves",
          "It's culturally acceptable",
        ],
        correctIndex: 1,
        why: "The Psalms of lament are the Bible's own school of honest, hope-filled grief.",
      },
      {
        q: "Paul calls death…",
        options: ["a friend", "an enemy that will be the last enemy destroyed", "a graduation", "an illusion"],
        correctIndex: 1,
        why: "1 Corinthians 15:26. Christians do not love death; they refuse to fear it because Christ has defanged it.",
      },
      {
        q: "The Christian's confidence in suffering rests on…",
        options: [
          "The absence of pain",
          "Personal strength",
          "The presence of Christ in the pain",
          "A positive attitude",
        ],
        correctIndex: 2,
        why: "Not pain-free, but never alone. Isaiah 43:2.",
      },
    ],
  },

  /* ── WEEK 12 ──────────────────────────────────────────────── */
  {
    week: 12,
    title: "The Long Obedience",
    tagline: "A lifetime of following Jesus.",
    scripture: {
      ref: "Hebrews 12:1-2",
      text:
        "Therefore let us also, seeing we are surrounded by so great a cloud of witnesses, lay aside every weight and the sin which so easily entangles us, and let us run with patience the race that is set before us, looking to Jesus, the author and perfecter of faith, who for the joy that was set before Him endured the cross, despising shame, and has sat down at the right hand of the throne of God.",
    },
    memoryVerse: {
      ref: "Philippians 1:6",
      text:
        "Being confident of this very thing, that He who began a good work in you will complete it until the day of Jesus Christ.",
    },
    days: [
      {
        day: 1,
        label: "Read",
        title: "The cloud of witnesses",
        passage: "Hebrews 11:1–12:3",
        meditation:
          "The whole 11th chapter is a roll call of those who walked by faith — Abel, Noah, Abraham, Sarah, Moses, Rahab, David, the prophets. They didn't see what was promised; they trusted anyway. You are joining a line that has been walking for thousands of years.",
      },
      {
        day: 2,
        label: "Meditate",
        title: "Press on",
        passage: "Philippians 3:7-16",
        meditation:
          "Paul, in prison, in his sixties, says, 'Not that I have already attained, or am already made perfect; but I press on…' If Paul wasn't done, neither are you. The Christian life is a press, not a peak.",
      },
      {
        day: 3,
        label: "Pray",
        title: "Until the day",
        passage: "Philippians 1:1-11",
        meditation:
          "Paul's confident prayer: 'He who began a good work in you will complete it.' Today, pray this over yourself. The same God who started saving you is committed to finishing the job. He will not abandon the work of His own hands.",
      },
      {
        day: 4,
        label: "Apply",
        title: "Faithful in the small",
        passage: "Luke 16:10-13",
        meditation:
          "'He who is faithful in a very little is faithful also in much.' Christian maturity is built in small obediences nobody sees. Today, pick one small faithfulness — a daily Scripture, a phone call, a temptation refused — and do it.",
      },
      {
        day: 5,
        label: "Journal",
        title: "Twelve weeks",
        passage: "Psalm 16",
        meditation:
          "Today, journal: twelve weeks ago, who was I? Who am I today? What has the Lord done? Name the small mercies. Name the slow growth. Name the unsolved struggles. Then thank Him.",
      },
      {
        day: 6,
        label: "Review",
        title: "Hand it on",
        passage: "2 Timothy 2:1-7",
        meditation:
          "'What you have heard from me in the presence of many witnesses entrust to faithful people who will be able to teach others also.' You started this course as a learner. You finish it ready to teach someone else. Who?",
      },
      {
        day: 7,
        label: "Rest",
        title: "Until I see Him",
        passage: "1 John 3:1-3",
        meditation:
          "'We are God's children. It is not yet revealed what we shall be; but we know that when He is revealed, we shall be like Him; for we shall see Him as He is.' Rest today in this: you are headed for the day when you see Him face to face. That day is closer today than it was twelve weeks ago.",
      },
    ],
    lesson: [
      "Twelve weeks does not finish a disciple. Twelve years will not. The Christian life is, as Eugene Peterson famously put it, 'a long obedience in the same direction.' The cross is once-for-all. The walk is for life. You started this course as a new believer; you finish it as a believer who has begun. The beginning is everything, and it is also the beginning.",
      "Look back over the eleven weeks behind you. Week 1 — who Jesus is. The center. Week 2 — what He did. The cross and the empty tomb. Week 3 — Father, Son, Spirit. The Triune God who loves you. Week 4 — the Bible. God's voice you can hold in your hand. Week 5 — prayer. The freedom to talk to a Father. Week 6 — repentance and forgiveness. The daily breath. Week 7 — the Spirit. Indwelling power. Week 8 — the Church. Family. Week 9 — baptism and the Supper. Visible signs. Week 10 — witness. Tell someone. Week 11 — suffering and hope. The Story's end. These eleven are not separate topics; they are the eleven sides of one faith. You can come back to any one of them for the rest of your life and find more.",
      "Now, the question is: how do you keep walking when no twelve-week course is structuring it for you? Three habits will hold you through the years. (1) The Word. Read it daily, even briefly. Five minutes is better than zero. A chapter a day will move you through every Bible book in a few years. The platform has reading plans, daily devotionals, memory training, all of it free. (2) Prayer. Talk to your Father, every day. Don't only ask — adore, confess, thank, and ask. The Lord's Prayer is enough on the days you have no words. (3) The gathered Body. A faithful local church, in person, week by week. Don't outsource this to a podcast or a stream. Be there in body.",
      "Add to these the smaller disciplines you have learned in this course — confession, fasting, the Lord's Supper, Sabbath, generosity, witness, memorization, lament. None of them will save you. All of them will form you. Pick one or two for this season and walk them; pick others next season. The platform's Rule of Life at /rule helps you build a simple, doable rhythm.",
      "Then there is the next thing. 2 Timothy 2:2 — Paul to Timothy: 'The things which you have heard from me among many witnesses, commit to faithful people who will be able to teach others also.' You did not finish this course just to consume it. You finished it to hand it on. The faithful believer becomes a parent in the faith — walking with one other person, who walks with one other person, until the Kingdom fills the earth. Twelve weeks from today, you can be walking another new believer through this same course. That is how Paul discipled Timothy. That is how Timothy discipled faithful people. That is how the gospel reached you, in fact — through a long chain of believers handing it on.",
      "Now, a serious word about the years ahead. The Christian life is not a constant high. You will have seasons of sweet nearness to God and seasons of dryness. Seasons when prayer pours and seasons when it crawls. Seasons of growth and seasons that feel like spinning wheels. Seasons of joy and seasons of suffering. Do not measure your faith by the season. Measure it by the direction. Are you, today, still turned toward Christ? Then you are walking. Keep walking. Bunyan's pilgrim got lost, fell in a slough, was imprisoned by Giant Despair, was tempted by Vanity Fair — and still arrived at the Celestial City. So will you.",
      "Beware three things across the years. First, drift. Hebrews 2:1 — 'we must pay much closer attention to what we have heard, lest we drift away.' Drift happens slowly. Skip one Sunday; then two; then ten. Stop praying; barely notice. The remedy is showing up to the routines you've established — Word, prayer, Body — even when you don't feel like it. Second, pride. You have learned things in this course that not every Christian knows. Hold them with humility. The point of knowledge is love (1 Cor 13). Third, isolation. The believer alone is the believer at risk. Stay in the body. Be known. Confess. Forgive. Be loved.",
      "Beware too the seductive thought that you've graduated. You will never graduate. Augustine, thirty years a Christian and a bishop, wrote his Confessions begging God to deepen his love. John Wesley at eighty-eight was still preaching. Mother Teresa in her seventies still mourned how little she loved Jesus. The longest-walking saints know they have just begun. Stay teachable.",
      "The road from here is long, and you have not been left to walk it alone. The Father chose you before the foundation of the world. The Son died for you and is alive and praying for you right now at the Father's right hand. The Spirit lives in you and will not leave. A great cloud of witnesses surrounds you (Heb 12:1). A faithful local church (Lord willing) is committed to your soul. And one day you will see Him face to face. That day is closer today than it was twelve weeks ago.",
      "Welcome to the long obedience. The course is finished; the walk is for life. Go, and the Lord be with you.",
    ],
    witnesses: [
      {
        who: "Augustine of Hippo",
        when: "354–430",
        source: "Confessions, Book I",
        quote:
          "You have made us for Yourself, O Lord, and our heart is restless until it rests in You.",
      },
      {
        who: "John Bunyan",
        when: "1628–1688",
        source: "The Pilgrim's Progress",
        quote:
          "Then said Mr. Valiant-for-Truth, 'I am going to my Father's, and though with great difficulty I have got hither, yet now I do not repent me of all the trouble I have been at to arrive where I am. My sword I give to him that shall succeed me in my pilgrimage, and my courage and skill to him that can get them.'",
      },
    ],
    readingMinutes: 35,
    crosswalk: [
      { catechism: "Westminster Larger", refs: "Q. 79 · the perseverance of the saints" },
      { catechism: "Heidelberg", refs: "Q&A 32 · why are we called Christian? · Q&A 86 · the new obedience" },
    ],
    facilitatorNotes: [
      "Celebrate. Twelve weeks is a real walk. Don't rush the conclusion.",
      "Have each person name the one discipline they'll carry forward by name; hold each other to it in love.",
      "Pray a sending blessing over each person — by name — citing Philippians 1:6 over them.",
    ],
    reflection: [
      "Twelve weeks in — what has changed in you?",
      "Who could you walk this same course alongside next?",
      "What one discipline will you carry for the rest of your life?",
      "What does the next year of following Jesus look like for you?",
    ],
    discussion: [
      "Each share: what was the most life-shaping week of the course for you?",
      "Discuss: how will you protect against drift in the year ahead?",
      "Who in your life could you walk the course with next?",
      "Pray for one another by name for the long obedience ahead.",
    ],
    recommendedReading: [
      {
        title: "The Imitation of Christ",
        author: "Thomas à Kempis",
        when: "c. 1418",
        why: "Six centuries the second-most-read Christian book after the Bible. Short chapters. A whole life of obedience in 200 pages.",
        url: "https://www.ccel.org/ccel/kempis/imitation.html",
      },
      {
        title: "The Pilgrim's Progress (full)",
        author: "John Bunyan",
        when: "1678",
        why: "If you've only read excerpts, read the whole journey now. It is the long obedience in story form.",
        url: "https://www.ccel.org/ccel/bunyan/pilgrim.html",
      },
    ],
    practice:
      "Open The Path on /disciple. Mark the stages that are honestly true of you. Pick the next stage. Walk it.",
    journalPrompt:
      "Write a letter to yourself, twelve weeks from today. Tell yourself how you walked. Date it. Open it then.",
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
          "memorize it perfectly",
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
        q: "Hebrews 2:1 warns us most against…",
        options: [
          "Active rebellion",
          "Drift",
          "Doubt",
          "Doctrinal error",
        ],
        correctIndex: 1,
        why: "'Lest we drift away.' Slowly skipping the disciplines is more dangerous than dramatic rebellion.",
      },
      {
        q: "Philippians 1:6 promises that God…",
        options: [
          "Will reward our hard work",
          "Will complete the good work He began",
          "Wants us to try harder",
          "Has already finished with us",
        ],
        correctIndex: 1,
        why: "The same God who started saving you is committed to finishing. He will not abandon His own work.",
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
      {
        q: "Faithful in a little, says Jesus, faithful also in…",
        options: ["much", "everything", "the future", "fame"],
        correctIndex: 0,
        why: "Luke 16:10. Christian maturity is built in unseen daily obediences.",
      },
    ],
  },
];

/* ── FINAL EXAM ──────────────────────────────────────────────
   24 questions, 2 from each week (drawn from each week's quiz).
   Pass = 80% (≥ 19/24). A believer who took the weeks seriously
   is well-prepared.
*/

export const EXAM_QUESTION_COUNT = 24;
export const EXAM_PASS_PERCENT = COURSE_PASS_PCT;

export type ExamQuestion = Quiz & { week: number };

/** Two questions per week, drawn from the weekly quizzes. Stable across sessions. */
export function buildFinalExam(): ExamQuestion[] {
  const out: ExamQuestion[] = [];
  for (const w of COURSE_WEEKS) {
    // First (central) + fifth (applied / character) — drawn from now-larger 8-question quizzes
    const first = w.quiz[0];
    const second = w.quiz[4] ?? w.quiz[2] ?? w.quiz[1];
    for (const q of [first, second]) out.push({ ...q, week: w.week });
  }
  return out;
}

/** Pass = ≥ 80% correct. */
export function passed(correct: number, total: number = EXAM_QUESTION_COUNT) {
  return (correct / total) * 100 >= EXAM_PASS_PERCENT;
}
