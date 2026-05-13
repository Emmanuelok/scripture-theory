// ─── The Family Altar ─────────────────────────────────────────
// "These words which I command you today shall be in your heart. You shall
// teach them diligently to your children… when you sit in your house, when
// you walk by the way, when you lie down, and when you rise up." — Deut 6:6-7
//
// Most Christian parents WANT to disciple their kids — they just don't know
// how. Most home worship plans are too long, too text-heavy, or too churchy.
// This is short, doable, weekly, every-age.

export type AgeGroup = "littles" | "kids" | "youth" | "adults";

export type AltarDay = {
  id: string;       // e.g. "monday"
  weekday: string;  // display name
  theme: string;
  scripture: { ref: string; text: string };
  song: string;     // hymn or chorus by name
  prayer: string;
  byAge: Record<AgeGroup, { question: string; activity: string }>;
};

export const ageInfo: Record<AgeGroup, { label: string; range: string; note: string }> = {
  littles: {
    label: "Littles",
    range: "ages 3–6",
    note: "Short, sensory, repetitive. Aim for 5–10 minutes. Repeat the verse three times.",
  },
  kids: {
    label: "Kids",
    range: "ages 7–12",
    note: "Stories, questions, real conversation. Aim for 10–15 minutes. Let them ask anything.",
  },
  youth: {
    label: "Youth",
    range: "ages 13–18",
    note: "Treat them as theologians. Be honest about doubt. Read the Word aloud together.",
  },
  adults: {
    label: "Adult household",
    range: "spouses, roommates, parents alone",
    note: "Even one or two adults gathered around the Word is a family altar. Read, pray, sing.",
  },
};

export const altarWeek: AltarDay[] = [
  {
    id: "monday",
    weekday: "Monday",
    theme: "God made everything — and He made us on purpose.",
    scripture: {
      ref: "Genesis 1:31",
      text: "Then God saw everything that He had made, and indeed it was very good.",
    },
    song: "Praise to the Lord, the Almighty",
    prayer:
      "Father, thank You that You made the world, and that You made us, and that You made us for You. Help us to see Your goodness today.",
    byAge: {
      littles: {
        question: "What's something God made that makes you happy?",
        activity: "Go outside for 60 seconds. Point at three things God made.",
      },
      kids: {
        question: "If God made everything good, why is the world also broken?",
        activity:
          "Read Genesis 1:31, then Genesis 3:6 — two verses, the whole story of why the world is beautiful AND broken.",
      },
      youth: {
        question:
          "What does it mean that you were made on purpose, not by accident? How does that change how you treat your body, your work, and others?",
        activity: "Read Psalm 139:13-16 aloud. Each person says one thing they thank God for making.",
      },
      adults: {
        question: "Where have I forgotten that the world is His good gift?",
        activity: "Take communion or a meal together; thank God for one created thing each.",
      },
    },
  },
  {
    id: "tuesday",
    weekday: "Tuesday",
    theme: "Jesus is who He said He was.",
    scripture: {
      ref: "John 14:6",
      text: "I am the way, the truth, and the life. No one comes to the Father except through Me.",
    },
    song: "Be Thou My Vision",
    prayer:
      "Lord Jesus, You are the way. We don't have to figure life out alone. Show us the next step today.",
    byAge: {
      littles: {
        question: "Who is Jesus to you?",
        activity: "Say together three times: 'Jesus is the Way.' Hold up a finger each time.",
      },
      kids: {
        question:
          "Jesus didn't say He showed the way — He said He IS the way. What's the difference?",
        activity:
          "Each person draws a tiny picture of one thing Jesus did in the Gospels. Share why you picked it.",
      },
      youth: {
        question:
          "Why couldn't Jesus have been 'just a good teacher'? (Read C. S. Lewis's trilemma in your own words.)",
        activity: "Read John 14:1-7 aloud. Discuss: what is the doubt this passage is answering?",
      },
      adults: {
        question: "Where today am I trying to find another way besides Christ?",
        activity: "Pray together for one person who does not yet know Jesus by name.",
      },
    },
  },
  {
    id: "wednesday",
    weekday: "Wednesday",
    theme: "Walking with God means listening.",
    scripture: {
      ref: "1 Samuel 3:9",
      text: "Speak, LORD, for Your servant hears.",
    },
    song: "Open My Eyes, That I May See",
    prayer:
      "Holy Spirit, You speak. Teach us to listen — to Your Word, to each other, and to the still small voice.",
    byAge: {
      littles: {
        question: "Can you stay quiet for ten seconds and listen?",
        activity:
          "Count to ten slowly with eyes closed. Ask: 'God, is there anything You want to say to me today?' Then share what came to mind.",
      },
      kids: {
        question: "How did Samuel know it was God speaking, not his own thoughts?",
        activity:
          "Read 1 Samuel 3 together. Ask: who else helped Samuel discern God's voice? (Eli.)",
      },
      youth: {
        question:
          "What does it look like to test what you 'feel God said' against the Scriptures and wise believers?",
        activity:
          "Each person shares one Scripture they've returned to recently. Ask the others to pray it back over them.",
      },
      adults: {
        question: "Where have I been talking and not listening this week?",
        activity: "Two minutes of silence together. Then read Psalm 46:10 aloud.",
      },
    },
  },
  {
    id: "thursday",
    weekday: "Thursday",
    theme: "The cross. The empty tomb. The good news.",
    scripture: {
      ref: "1 Corinthians 15:3-4",
      text:
        "Christ died for our sins according to the Scriptures, and that He was buried, and that He rose again the third day according to the Scriptures.",
    },
    song: "When I Survey the Wondrous Cross",
    prayer:
      "Lord Jesus, You died for our sins. You rose again. You are alive. We worship You. Make us bold to tell others.",
    byAge: {
      littles: {
        question: "Where is Jesus now?",
        activity: "Make a 'tomb' from couch cushions. Lift the lid — He's not there. He is alive!",
      },
      kids: {
        question:
          "Why did Jesus HAVE to die? Couldn't God have forgiven sin without the cross?",
        activity:
          "Talk through: a) sin is real, b) God is just, c) someone had to pay, d) Jesus paid for us, e) we're free. Read Romans 3:23-25 aloud.",
      },
      youth: {
        question:
          "If Jesus didn't actually rise from the dead, what would change about Christianity? (1 Cor 15:14-19)",
        activity:
          "Each person says, in their own words, the Gospel in 30 seconds. Time each other.",
      },
      adults: {
        question: "Whose name shall I lift to Christ this week — who needs to hear?",
        activity:
          "Choose one person you will share the Gospel with this week. Pray for them by name now.",
      },
    },
  },
  {
    id: "friday",
    weekday: "Friday",
    theme: "Love one another — even in this house.",
    scripture: {
      ref: "John 13:34-35",
      text:
        "A new commandment I give to you, that you love one another; as I have loved you… By this all will know that you are My disciples.",
    },
    song: "They'll Know We Are Christians by Our Love",
    prayer:
      "Father, our family is Your first witness. Help us to love each other today — with words, with patience, with quick forgiveness.",
    byAge: {
      littles: {
        question: "Who in this room can you tell, 'I love you,' right now?",
        activity: "Take turns saying: 'I love you, ___, because God made you.'",
      },
      kids: {
        question: "What does love look like when someone in our family is being unkind?",
        activity:
          "Each person names one specific way they want to be a kinder family member this week.",
      },
      youth: {
        question:
          "It's easy to love the church online. Why is the family the hardest place to actually do it?",
        activity:
          "Pass: 'One thing I appreciate about you is ___.' Each person to the person on their right.",
      },
      adults: {
        question:
          "Where have I withheld love in this house this week? What needs confession or repair?",
        activity: "Confess to one another (James 5:16). Pray for one another.",
      },
    },
  },
  {
    id: "saturday",
    weekday: "Saturday",
    theme: "Sabbath — He has done it, we can rest.",
    scripture: {
      ref: "Mark 2:27",
      text: "The Sabbath was made for man, and not man for the Sabbath.",
    },
    song: "Come, Thou Fount of Every Blessing",
    prayer:
      "Father, You finished the work. We don't have to earn anything. Teach our family to rest, to play, to be together. In Jesus' name, amen.",
    byAge: {
      littles: {
        question: "What's something fun we can do together today?",
        activity: "Pick something un-productive together: a walk, a game, a story.",
      },
      kids: {
        question: "Why did God rest? Was He tired?",
        activity:
          "Read Genesis 2:1-3. Discuss: God rested to show us we are not what we do — we are loved children.",
      },
      youth: {
        question:
          "What in your week says you DON'T trust God to run the world without you? Where is your sabbath?",
        activity:
          "Put down phones together for one hour. Read, walk, talk. See what surfaces.",
      },
      adults: {
        question: "What false god of productivity needs to die in me?",
        activity: "Plan tomorrow's rest deliberately. Cook a slow meal together.",
      },
    },
  },
  {
    id: "sunday",
    weekday: "Sunday",
    theme: "Gather with the Body. He is risen.",
    scripture: {
      ref: "Hebrews 10:24-25",
      text:
        "Let us consider one another in order to stir up love and good works, not forsaking the assembling of ourselves together.",
    },
    song: "Christ the Lord Is Risen Today",
    prayer:
      "Lord Jesus, You are alive. Today we gather with Your people. Bring us with joyful, hungry hearts. Speak to us through Your Word.",
    byAge: {
      littles: {
        question: "What do we do at church?",
        activity: "Say together: 'We sing, we pray, we hear God's Word, we love each other.'",
      },
      kids: {
        question: "Why do Christians gather every week instead of just praying alone?",
        activity:
          "On the way to or from church, ask: 'What did God say to you today?' Listen without correcting.",
      },
      youth: {
        question:
          "The hardest commandment for our generation may be 'don't forsake the gathering.' Why?",
        activity:
          "After church: each person names one thing from the sermon or worship that stayed with them.",
      },
      adults: {
        question: "Whom in our church family can we serve this week?",
        activity:
          "Identify one practical need in your church (a meal, a ride, a card, a prayer). Do it before next Sunday.",
      },
    },
  },
];

export const altarPattern = [
  {
    step: "Open",
    body: "One person says: 'The Lord be with you.' The others reply: 'And also with you.' (Or simply: 'Let's begin.')",
  },
  { step: "Sing", body: "One verse of the day's hymn. Even a hum counts. Even off-key counts." },
  { step: "Read", body: "Read the verse for the day. Read it twice. Let it settle." },
  { step: "Ask", body: "The age-appropriate question. Let the children answer first, then adults." },
  { step: "Do", body: "The short activity. Keep it short. It is the doing that disciples, not the talking." },
  { step: "Pray", body: "The day's prayer aloud. Then, one petition from each person." },
  {
    step: "Bless",
    body:
      "End with Numbers 6:24-26: 'The Lord bless you and keep you; the Lord make His face to shine upon you and be gracious to you; the Lord lift up His countenance upon you and give you peace.'",
  },
];
