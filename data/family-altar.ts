// ─── The Family Altar ─────────────────────────────────────────
// "These words which I command you today shall be in your heart. You shall
// teach them diligently to your children… when you sit in your house, when
// you walk by the way, when you lie down, and when you rise up." — Deut 6:6-7
//
// Most Christian parents WANT to disciple their kids — they just don't know
// how. Most home worship plans are too long, too text-heavy, or too churchy.
// This is short, doable, daily, every-age.
//
// Each weekday is a "pillar" with its own settled theme. Within each pillar
// is a rotation of distinct entries, so the household sees a new scripture,
// question, and activity each week before the cycle returns. The rhythm
// stays predictable; the food stays fresh.

export type AgeGroup = "littles" | "kids" | "youth" | "adults";

export type AltarEntry = {
  theme: string;
  scripture: { ref: string; text: string };
  song: string;
  prayer: string;
  byAge: Record<AgeGroup, { question: string; activity: string }>;
};

export type WeekdaySlot = {
  id: string;          // "sunday" .. "saturday"
  weekday: string;     // "Sunday" .. "Saturday"
  pillar: string;      // "Gather"
  pillarBlurb: string; // one-line description of why this day, this theme
  entries: AltarEntry[];
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

// Rotation epoch: Sunday, 4 January 2026. All weeks share the same index across
// the 7-day window, so "this week's preview" stays internally coherent.
const EPOCH_MS = Date.UTC(2026, 0, 4);

function cycleIndexFor(date: Date, cycleLength: number): number {
  const localMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.floor((localMs - EPOCH_MS) / 86_400_000);
  const weeks = Math.floor(days / 7);
  return ((weeks % cycleLength) + cycleLength) % cycleLength;
}

export function entryForDate(date: Date, slot: WeekdaySlot): { entry: AltarEntry; index: number } {
  const index = cycleIndexFor(date, slot.entries.length);
  return { entry: slot.entries[index], index };
}

export function slotForWeekday(weekday: number): WeekdaySlot {
  return altarWeekdays[weekday];
}

export const altarWeekdays: WeekdaySlot[] = [
  {
    id: "sunday",
    weekday: "Sunday",
    pillar: "Gather",
    pillarBlurb: "The day the Lord rose. We gather with His Body before we scatter into the week.",
    entries: [
      {
        theme: "Don't give up gathering.",
        scripture: {
          ref: "Hebrews 10:24-25",
          text: "Let us consider how to provoke one another to love and good works, not forsaking our own assembling together, as the custom of some is, but exhorting one another, and so much the more as you see the Day approaching.",
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
              "After church, each person names one thing from the sermon or worship that stayed with them.",
          },
          adults: {
            question: "Whom in our church family can we serve this week?",
            activity:
              "Identify one practical need in your church (a meal, a ride, a card, a prayer). Do it before next Sunday.",
          },
        },
      },
      {
        theme: "The first church kept showing up.",
        scripture: {
          ref: "Acts 2:42",
          text: "They continued steadfastly in the apostles' teaching and fellowship, in the breaking of bread, and prayer.",
        },
        song: "The Church's One Foundation",
        prayer:
          "Father, make our family a steady part of Your church — teachable, generous, prayerful, present. In Jesus' name, amen.",
        byAge: {
          littles: {
            question: "What are the four things the first church did?",
            activity: "Count them on four fingers: teaching, friends, bread, prayer. Repeat twice.",
          },
          kids: {
            question: "Which of the four — teaching, fellowship, communion, prayer — is hardest for our family?",
            activity:
              "Pick one of the four to do extra well this week. Write it on the fridge.",
          },
          youth: {
            question:
              "'Continued steadfastly' is a strong phrase. What does steadiness in faith look like at your age?",
            activity:
              "Each person names one Christian friend they want to be steadier with this month. Text them today.",
          },
          adults: {
            question: "Which of the four marks of the early church is thinning in our household?",
            activity: "Choose one practice to thicken in the next 30 days. Tell each other so you can ask.",
          },
        },
      },
      {
        theme: "Glad to go to the house of the Lord.",
        scripture: {
          ref: "Psalm 122:1",
          text: "I was glad when they said to me, 'Let's go to Yahweh's house!'",
        },
        song: "Come, We That Love the Lord",
        prayer:
          "Lord, give us glad hearts on the way to worship today. Strip away dread, distraction, and pretending. We come to meet You.",
        byAge: {
          littles: {
            question: "Are you glad to go to church? Why?",
            activity: "Skip or hop on the way to the car / door — make the journey to worship a happy one.",
          },
          kids: {
            question: "What's the difference between going to church because you HAVE to and going because you WANT to?",
            activity: "Each person names one thing about church they look forward to.",
          },
          youth: {
            question:
              "When did church start to feel like duty instead of delight, and what would gladness look like again?",
            activity: "Pray Psalm 122 aloud, then sit in silence for one minute before leaving for service.",
          },
          adults: {
            question: "What in me resists corporate worship — pride, busyness, an old wound?",
            activity: "Confess it aloud to one another. Forgive in Jesus' name. Then go gladly.",
          },
        },
      },
      {
        theme: "Where two or three gather, He is there.",
        scripture: {
          ref: "Matthew 18:20",
          text: "For where two or three are gathered together in my name, there I am in the middle of them.",
        },
        song: "Holy, Holy, Holy",
        prayer:
          "Lord Jesus, You are with us as we gather — small as we are. Make this room Your sanctuary. Speak, and we will listen.",
        byAge: {
          littles: {
            question: "Who is here with us right now that we can't see?",
            activity: "Look at the empty space in the room and whisper: 'Welcome, Lord Jesus.'",
          },
          kids: {
            question: "Does Jesus only show up at big churches, or does He come to small living rooms too?",
            activity: "Move chairs into a tiny circle. Say: 'This is church, too.'",
          },
          youth: {
            question:
              "If Jesus is present where two or three gather, how should that change a youth group? a study? a couple of friends praying?",
            activity:
              "Text one friend right now: 'Want to read a chapter with me this week?'",
          },
          adults: {
            question: "Whom could we invite into 'two or three' rhythm — a couple, a single, a struggling friend?",
            activity: "Name one couple or person to invite into a regular meal + prayer. Send the message before Sunday ends.",
          },
        },
      },
      {
        theme: "Every nation around the throne.",
        scripture: {
          ref: "Revelation 7:9-10",
          text: "After these things I looked, and behold, a great multitude, which no man could count, out of every nation and of all tribes, peoples, and languages, standing before the throne and before the Lamb… crying with a loud voice, saying, 'Salvation be to our God who sits on the throne, and to the Lamb!'",
        },
        song: "All Hail the Power of Jesus' Name",
        prayer:
          "Lord, our church is bigger than our church. We thank You for brothers and sisters in every nation. Hasten the day every voice joins the song.",
        byAge: {
          littles: {
            question: "Who is going to be at God's throne?",
            activity: "Name three countries. Say: 'God has children there.'",
          },
          kids: {
            question: "Are there Christians in places where it's hard to be a Christian?",
            activity:
              "Pray for one country where being a Christian is dangerous. (Look it up if you don't know one.)",
          },
          youth: {
            question:
              "If heaven is full of every nation, what does that say about how our local church should look and welcome?",
            activity: "Pray Revelation 7:9-10 aloud. Each person names a believer they know from a different culture.",
          },
          adults: {
            question: "Where is our church narrow when heaven is wide?",
            activity: "Choose a global mission or persecuted-church ministry to support or pray for monthly.",
          },
        },
      },
      {
        theme: "One body, many members.",
        scripture: {
          ref: "1 Corinthians 12:12-13",
          text: "For as the body is one and has many members, and all the members of the body, being many, are one body; so also is Christ. For in one Spirit we were all baptized into one body…",
        },
        song: "In Christ There Is No East or West",
        prayer:
          "Father, You made the Body of Christ from many. Keep us from despising another part. Keep us from despising the part we are.",
        byAge: {
          littles: {
            question: "What does your hand do that your foot can't do?",
            activity: "Wiggle hands, wiggle feet. Say: 'God made us different on purpose.'",
          },
          kids: {
            question: "Is there a kind of person at church you don't connect with easily? Why?",
            activity: "Pray a one-line prayer for one person at church who is very different from you.",
          },
          youth: {
            question: "Which 'part of the body' are you tempted to think the church doesn't need?",
            activity: "Read 1 Corinthians 12:14-26 aloud. Name where you've seen the body fail this — and where you've seen it shine.",
          },
          adults: {
            question: "Where have we been a hand pretending to be an eye — or refusing to be a foot?",
            activity: "Each adult names one gift they suspect God has put in them. Pray for courage to use it.",
          },
        },
      },
    ],
  },
  {
    id: "monday",
    weekday: "Monday",
    pillar: "Creation & calling",
    pillarBlurb: "God made the world, and He made us on purpose. The week begins by remembering whose we are.",
    entries: [
      {
        theme: "God made it all — and it was very good.",
        scripture: {
          ref: "Genesis 1:31",
          text: "God saw everything that he had made, and, behold, it was very good. There was evening and there was morning, a sixth day.",
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
            activity: "Take a meal together; thank God aloud for one created thing each.",
          },
        },
      },
      {
        theme: "The skies are preaching all the time.",
        scripture: {
          ref: "Psalm 19:1-2",
          text: "The heavens declare the glory of God. The expanse shows his handiwork. Day after day they pour out speech, and night after night they display knowledge.",
        },
        song: "How Great Thou Art",
        prayer:
          "Lord, the sky is preaching. The fields are preaching. Open our ears today, so we hear what creation has been singing all along.",
        byAge: {
          littles: {
            question: "What does the sky tell us about God?",
            activity: "Look up out a window. Say: 'God is big!' three times.",
          },
          kids: {
            question: "If creation is preaching, what is it preaching?",
            activity: "Each person finds ONE thing outside (or out the window) and says what it teaches about God.",
          },
          youth: {
            question:
              "If even people who never read the Bible can see something of God in the world, what does that say about anyone's claim to 'no evidence'?",
            activity: "Step outside after dark. Be quiet for one minute. Read Psalm 19:1-6 by phone light.",
          },
          adults: {
            question: "When did I last let the natural world re-tune me toward worship?",
            activity: "Plan a 15-minute outdoor walk this week with no phone. Just notice and thank.",
          },
        },
      },
      {
        theme: "All things hold together in Him.",
        scripture: {
          ref: "Colossians 1:16-17",
          text: "For by him all things were created in the heavens and on the earth, things visible and things invisible… All things have been created through him and for him. He is before all things, and in him all things are held together.",
        },
        song: "Crown Him with Many Crowns",
        prayer:
          "Lord Jesus, You made it all and You hold it all together. We are not running the universe today. You are. Help us to rest in that.",
        byAge: {
          littles: {
            question: "Who keeps the world going?",
            activity: "Clap and say: 'Jesus made everything! Jesus holds everything!'",
          },
          kids: {
            question: "If Jesus is holding the universe together, what's He holding for you this week?",
            activity: "Each person names ONE worry. Pray: 'Jesus, hold this together.'",
          },
          youth: {
            question:
              "What does it change if Jesus isn't just your savior but the One sustaining every atom of you right now?",
            activity: "Read Colossians 1:15-20 aloud, slowly. Sit quiet for 30 seconds afterward.",
          },
          adults: {
            question: "What have I been trying to hold together that I was never meant to?",
            activity: "Write the thing down. Tear up the paper. Pray: 'Christ holds this, not me.'",
          },
        },
      },
      {
        theme: "Knit together in the secret place.",
        scripture: {
          ref: "Psalm 139:13-14",
          text: "For you formed my inmost being. You knit me together in my mother's womb. I will give thanks to you, for I am fearfully and wonderfully made.",
        },
        song: "Take My Life, and Let It Be",
        prayer:
          "Father, You knit each one of us. You knew our names before our parents did. Thank You for our bodies and our breath. We give them back to You today.",
        byAge: {
          littles: {
            question: "Who made YOU?",
            activity: "Point at each person and say: 'God made you on purpose.'",
          },
          kids: {
            question: "If God made you on purpose, can you be an accident, a mistake, or 'too much'?",
            activity: "Each person names one thing about themselves that God made and they thank Him for.",
          },
          youth: {
            question:
              "Where does the culture tell you that you are an accident, a problem, or a project to optimize? How does Psalm 139 answer that?",
            activity: "Read Psalm 139 aloud. Pray it back over each person by name.",
          },
          adults: {
            question: "Whose dignity am I failing to see — including my own — because I forget Psalm 139?",
            activity: "Name one person you've belittled (in word or thought) this week. Repent and bless them in prayer.",
          },
        },
      },
      {
        theme: "Plans for welfare, not for harm.",
        scripture: {
          ref: "Jeremiah 29:11",
          text: "'For I know the thoughts that I think toward you,' says Yahweh, 'thoughts of peace, and not of evil, to give you hope and a future.'",
        },
        song: "Great Is Thy Faithfulness",
        prayer:
          "Father, You have good plans for us — even when this week looks hard. Help us to walk into Monday with hope, because You are walking with us.",
        byAge: {
          littles: {
            question: "Does God have good plans for you?",
            activity: "Hold up two thumbs and say: 'Yes! God has good plans!'",
          },
          kids: {
            question: "Jeremiah 29 was written to people in trouble. Why does that matter for how we read this verse?",
            activity:
              "Read the verse before AND after (Jeremiah 29:10, 12). Talk about what God promised and what they had to wait through.",
          },
          youth: {
            question:
              "'God has a plan for my life' — true and abused. How do you hold the promise without making it about your career or your crush?",
            activity: "Each person names one fear about the future. Pray Jeremiah 29:11-14 over each other.",
          },
          adults: {
            question: "What plan of mine has died, and where is God inviting me into His instead?",
            activity: "Name the dead plan honestly. Then ask, 'Lord, what now?' and listen for two minutes.",
          },
        },
      },
      {
        theme: "His workmanship, for good works.",
        scripture: {
          ref: "Ephesians 2:10",
          text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared before that we would walk in them.",
        },
        song: "A Charge to Keep I Have",
        prayer:
          "Father, You made us, and You made us for something. Show us the works You prepared for us today. Give us courage to do them.",
        byAge: {
          littles: {
            question: "Did God give you something good to do today?",
            activity: "Each person picks ONE kind thing to do today. Say it out loud.",
          },
          kids: {
            question: "What's the difference between trying to be good to earn God's love and doing good because He already loves you?",
            activity:
              "Each person names one 'good work' God might have for them this week — at home, school, or with a friend.",
          },
          youth: {
            question:
              "If God 'prepared good works' for you in advance, what does that mean for the chaos of choosing a path?",
            activity: "Pray: 'Lord, show me one work You've prepared for me today, and one You're preparing me for.'",
          },
          adults: {
            question: "What good work is in front of me that I've been calling 'just my life' and missing as ministry?",
            activity: "Name the work. Offer it to God aloud. Do it as worship.",
          },
        },
      },
    ],
  },
  {
    id: "tuesday",
    weekday: "Tuesday",
    pillar: "Who Christ is",
    pillarBlurb: "Every Tuesday we look at Jesus — a name, a claim, a moment from His life. Christianity stands or falls with Him.",
    entries: [
      {
        theme: "Jesus is who He said He was.",
        scripture: {
          ref: "John 14:6",
          text: "Jesus said to him, 'I am the way, the truth, and the life. No one comes to the Father, except through me.'",
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
              "Why couldn't Jesus have been 'just a good teacher'? (Talk through C. S. Lewis's trilemma in your own words.)",
            activity: "Read John 14:1-7 aloud. Discuss: what is the doubt this passage is answering?",
          },
          adults: {
            question: "Where today am I trying to find another way besides Christ?",
            activity: "Pray together for one person who does not yet know Jesus by name.",
          },
        },
      },
      {
        theme: "The Word became flesh.",
        scripture: {
          ref: "John 1:14",
          text: "The Word became flesh and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.",
        },
        song: "Hark! The Herald Angels Sing",
        prayer:
          "Lord Jesus, You took on flesh to find us. Thank You for not staying far away. Help our family to walk with You today as a real Person, not an idea.",
        byAge: {
          littles: {
            question: "Did Jesus have a body like ours?",
            activity: "Wiggle fingers and toes. Say: 'Jesus had these too! He knows what it's like to be us.'",
          },
          kids: {
            question: "Why did God become a real human and not just speak from the sky?",
            activity: "Read Hebrews 4:15. Talk about: Jesus knows what it feels like to be tired, hungry, sad, tempted.",
          },
          youth: {
            question:
              "If Jesus is fully God AND fully human, which side do you instinctively underweight — and what does that do to your faith?",
            activity:
              "Read John 1:1-18 aloud, slowly. Each person says ONE phrase that stood out and why.",
          },
          adults: {
            question: "What does the incarnation cost me when I see my own flesh as too dirty for God?",
            activity: "Confess one shame you keep hidden from Jesus. Receive that He came IN flesh, not despite it.",
          },
        },
      },
      {
        theme: "He took the form of a servant.",
        scripture: {
          ref: "Philippians 2:5-7",
          text: "Have this in your mind, which was also in Christ Jesus, who, existing in the form of God, didn't consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men.",
        },
        song: "Crown Him with Many Crowns",
        prayer:
          "Lord Jesus, You did not cling to glory. You came low. Form that mind in us — at home, at work, at school. Make us low for love.",
        byAge: {
          littles: {
            question: "What does it mean to serve someone?",
            activity: "Each person does ONE small kind thing for someone else right now (refill a cup, pick up a toy).",
          },
          kids: {
            question: "Jesus chose to come low. Where is it hardest for you to come low?",
            activity: "Each person names one chore they usually complain about. Do it today without complaining as worship.",
          },
          youth: {
            question:
              "Philippians 2 says have THIS mind in you. What does the 'going-low mind' look like online, at school, in a friend group?",
            activity: "Read Philippians 2:1-11 aloud. Each person identifies ONE place this week to step down on purpose.",
          },
          adults: {
            question: "Where have I been grasping at status that Christ didn't grasp at?",
            activity: "Name it. Confess it. Choose one act of going-low this week.",
          },
        },
      },
      {
        theme: "The radiance of God's glory.",
        scripture: {
          ref: "Hebrews 1:3",
          text: "His Son is the radiance of his glory, the very image of his substance, and upholding all things by the word of his power. When he had by himself purified us of our sins, he sat down on the right hand of the Majesty on high.",
        },
        song: "Immortal, Invisible, God Only Wise",
        prayer:
          "Lord Jesus, You shine with the Father's glory. You finished the work of cleansing. You are seated. We worship You today as the One who finished what He started.",
        byAge: {
          littles: {
            question: "What does the sun do?",
            activity: "Say: 'Jesus shines like that — He shows us what God is like.'",
          },
          kids: {
            question: "Hebrews 1:3 says Jesus 'sat down' after cleansing sins. Why is that important?",
            activity: "Old Testament priests stood (their work was never done). Stand up. Then sit. Say: 'Jesus' work is finished.'",
          },
          youth: {
            question:
              "What does it mean that Jesus is the EXACT image of God? How does that protect us from making God up in our own image?",
            activity: "Each person says ONE thing they wrongly assumed God was like before they knew Jesus.",
          },
          adults: {
            question: "Where am I still trying to finish what Christ already finished?",
            activity: "Name the unfinished list you keep carrying. Lay it down. Pray Hebrews 1:3 over yourself.",
          },
        },
      },
      {
        theme: "The First and the Last.",
        scripture: {
          ref: "Revelation 1:17-18",
          text: "Don't be afraid. I am the first and the last, and the Living one. I was dead, and behold, I am alive forever and ever. I have the keys of Death and of Hades.",
        },
        song: "Crown Him with Many Crowns",
        prayer:
          "Lord Jesus, You have the keys. Nothing in this house, nothing in this week, nothing in this world is outside Your hand. We worship the Living One.",
        byAge: {
          littles: {
            question: "Is Jesus alive?",
            activity: "Jump up. Say: 'Jesus is alive! Jesus is alive! Jesus is alive!'",
          },
          kids: {
            question: "What does Jesus have the keys to? Why does it matter that He, not death, has them?",
            activity: "Each person names one thing they're afraid of. Pray: 'Jesus, You have the keys.'",
          },
          youth: {
            question:
              "John fell as dead before the risen Jesus. Have you ever taken Jesus' actual power seriously, or just His being 'nice'?",
            activity: "Read Revelation 1:9-18 aloud. Each person says one thing about Jesus they hadn't pictured before.",
          },
          adults: {
            question: "What fear has been louder than the voice of the Living One this week?",
            activity: "Speak the fear aloud. Then speak Revelation 1:17-18 back over it.",
          },
        },
      },
      {
        theme: "The Good Shepherd lays down His life.",
        scripture: {
          ref: "John 10:11",
          text: "I am the good shepherd. The good shepherd lays down his life for the sheep.",
        },
        song: "Savior, Like a Shepherd Lead Us",
        prayer:
          "Lord Jesus, You are our Shepherd. We are not lost — You are with us. Lead this household today. We follow Your voice.",
        byAge: {
          littles: {
            question: "What does a shepherd do?",
            activity: "Walk in a tiny line behind one parent. Say: 'Jesus is our Shepherd. We follow Him.'",
          },
          kids: {
            question: "Why did Jesus call Himself a SHEPHERD and not a king or a teacher here?",
            activity: "Read John 10:1-16 together. Find every reason Jesus gives that He's a good shepherd.",
          },
          youth: {
            question:
              "Sheep are not flattering animals. What does it cost your pride to think of yourself as one of His sheep?",
            activity: "Pray Psalm 23 aloud, slowly, each person taking one verse.",
          },
          adults: {
            question: "Whose voice has been leading me this week — His, or another shepherd's?",
            activity: "Identify one 'other shepherd' (a fear, a feed, a person). Renounce them. Listen for His voice.",
          },
        },
      },
    ],
  },
  {
    id: "wednesday",
    weekday: "Wednesday",
    pillar: "Listening",
    pillarBlurb: "Mid-week we slow down. Christianity is first a hearing faith — listening to Scripture, to the Spirit, to one another.",
    entries: [
      {
        theme: "Speak, Lord, Your servant is listening.",
        scripture: {
          ref: "1 Samuel 3:9",
          text: "Therefore Eli said to Samuel, 'Go, lie down. It shall be, if he calls you, that you shall say, \"Speak, Yahweh; for your servant hears.\"'",
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
        theme: "Delight in the law of the Lord.",
        scripture: {
          ref: "Psalm 1:1-2",
          text: "Blessed is the man who doesn't walk in the counsel of the wicked… but his delight is in Yahweh's law. On his law he meditates day and night.",
        },
        song: "How Firm a Foundation",
        prayer:
          "Father, plant our family by Your stream. Make Your Word our delight, not our duty. Make us trees that don't dry up when the wind blows.",
        byAge: {
          littles: {
            question: "Where does a tree get its water?",
            activity: "Pretend to be little trees. 'Drink' from the imaginary stream. Say: 'God's Word is our water.'",
          },
          kids: {
            question: "What's the difference between READING the Bible because you have to and DELIGHTING in it?",
            activity:
              "Each person names ONE Bible story they actually love. Talk about why.",
          },
          youth: {
            question:
              "Psalm 1 contrasts two paths. Where are the 'counsels of the wicked' loudest in your week — and what does delighting in Scripture instead actually look like?",
            activity: "Read Psalm 1 aloud. Each person picks one verse to memorize this week.",
          },
          adults: {
            question: "Is Scripture a stream I drink from, or a chore I tick off?",
            activity: "Choose a short book (1 John, Ruth, Philippians) and read one chapter together this week.",
          },
        },
      },
      {
        theme: "The still small voice.",
        scripture: {
          ref: "1 Kings 19:11-12",
          text: "A great and strong wind tore the mountains… but Yahweh was not in the wind. After the wind an earthquake; but Yahweh was not in the earthquake. After the earthquake a fire passed; but Yahweh was not in the fire. After the fire, a still small voice.",
        },
        song: "Dear Lord and Father of Mankind",
        prayer:
          "Father, You don't always come in the loud places. Quiet us down. Make our family the kind of household where Your still small voice can be heard.",
        byAge: {
          littles: {
            question: "Was God in the wind, the earthquake, or the fire?",
            activity:
              "Whisper together three times: 'God speaks softly.' Each whisper quieter than the last.",
          },
          kids: {
            question: "Why might God choose to speak softly instead of loudly?",
            activity:
              "Sit in silence for one minute together. After: each person says what they heard (inside or outside).",
          },
          youth: {
            question:
              "The world rewards loud. God often speaks soft. What in your life is too loud for His voice to land?",
            activity:
              "Pick one source of noise (a feed, a show, a habit) to pause for 24 hours.",
          },
          adults: {
            question: "When did I last sit in real silence before God — not 'I'm listening' as a posture?",
            activity: "Three minutes of silence together. Read 1 Kings 19:11-13 aloud after.",
          },
        },
      },
      {
        theme: "Quick to hear, slow to speak.",
        scripture: {
          ref: "James 1:19",
          text: "So, then, my beloved brothers, let every man be swift to hear, slow to speak, and slow to anger.",
        },
        song: "May the Mind of Christ My Savior",
        prayer:
          "Lord, change our family's reflexes. Make us quicker to listen than to argue. Make our anger slow. Make our love quick.",
        byAge: {
          littles: {
            question: "Which is harder for you — listening or talking?",
            activity: "Take turns: one person talks for 20 seconds, the others LISTEN without saying anything.",
          },
          kids: {
            question: "James says 'slow to speak.' What's something you wish you HADN'T said this week?",
            activity:
              "Practice the count-to-five rule: before responding when annoyed, count to five silently.",
          },
          youth: {
            question:
              "In an age of hot takes, what is the cost of being slow to speak? What's the reward?",
            activity: "Each person commits to one 'slow to speak' practice — one less reply, one more question.",
          },
          adults: {
            question: "Whose voice in this house have I been talking over instead of hearing?",
            activity: "Go to that person. Say: 'I want to listen. Tell me what I've missed.'",
          },
        },
      },
      {
        theme: "A lamp for our feet.",
        scripture: {
          ref: "Psalm 119:105",
          text: "Your word is a lamp to my feet, and a light for my path.",
        },
        song: "Thy Word",
        prayer:
          "Father, Your Word is light. Where this week looks dark or unclear, shine. We want to walk by Your light, not by our own guessing.",
        byAge: {
          littles: {
            question: "What does a lamp do at night?",
            activity: "Turn off the lights. Hold one small flashlight. Say: 'God's Word lights our way.'",
          },
          kids: {
            question: "A lamp for your FEET — not a spotlight a mile down the road. Why might God light just the next step?",
            activity:
              "Each person names ONE next step they need wisdom for. Pray: 'Lord, light my feet for this step.'",
          },
          youth: {
            question:
              "When you can't see five years out, what does it mean to walk by lamp-light instead of headlight?",
            activity: "Each person picks ONE Scripture to keep on their phone lock-screen this week.",
          },
          adults: {
            question: "Where am I demanding a floodlit road when God has given a footlamp?",
            activity: "Confess the demand. Take the next step you can see, in faith.",
          },
        },
      },
      {
        theme: "My sheep hear My voice.",
        scripture: {
          ref: "John 10:27",
          text: "My sheep hear my voice, and I know them, and they follow me.",
        },
        song: "Like a River Glorious",
        prayer:
          "Lord Jesus, tune our ears to Your voice. Help us know it among all the other voices that pull at us. We are Yours; lead us today.",
        byAge: {
          littles: {
            question: "Whose voice can you tell apart from anyone else's?",
            activity: "One parent stands behind the others and softly says each child's name. They turn when they hear it.",
          },
          kids: {
            question: "How can you tell Jesus' voice from your own thoughts or the world's voice?",
            activity:
              "Talk about three tests: Does it agree with Scripture? Does it sound like Jesus? Do wise believers confirm it?",
          },
          youth: {
            question:
              "If His sheep hear His voice, why does it sometimes feel like you can't tell what He's saying?",
            activity: "Each person names one 'other shepherd' voice they want to turn down this week.",
          },
          adults: {
            question: "Whose voice has been training my ear most this season — and is it His?",
            activity: "Audit one source of input. Cut, replace, or rebalance to make room for His voice.",
          },
        },
      },
    ],
  },
  {
    id: "thursday",
    weekday: "Thursday",
    pillar: "The cross & mission",
    pillarBlurb: "The Gospel for us and the Gospel through us. Thursday we rehearse the news and ask who needs to hear.",
    entries: [
      {
        theme: "The cross. The empty tomb. The good news.",
        scripture: {
          ref: "1 Corinthians 15:3-4",
          text: "I delivered to you first of all that which I also received: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures.",
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
        theme: "While we were still sinners.",
        scripture: {
          ref: "Romans 5:8",
          text: "But God commends his own love toward us, in that while we were yet sinners, Christ died for us.",
        },
        song: "And Can It Be",
        prayer:
          "Father, You loved us before we cleaned up. You sent Jesus while we were still a mess. Thank You. Help us love others the way You loved us.",
        byAge: {
          littles: {
            question: "Did you have to be good before God loved you?",
            activity: "Cross your arms in an X (no). Say: 'God loved us first!'",
          },
          kids: {
            question: "What's the difference between God loving us BECAUSE we're good and God loving us BEFORE we're good?",
            activity:
              "Each person says: 'Jesus died for me when I was still ___.' Fill in the blank honestly.",
          },
          youth: {
            question:
              "Where have you secretly been trying to earn God's love instead of receiving it?",
            activity: "Read Romans 5:6-11 aloud. Pray it back over each person by name.",
          },
          adults: {
            question: "Whom am I withholding love from because they haven't 'cleaned up' first?",
            activity: "Name them. Pray Romans 5:8 over them. Take one concrete step of grace this week.",
          },
        },
      },
      {
        theme: "Wounded for our transgressions.",
        scripture: {
          ref: "Isaiah 53:5",
          text: "But he was pierced for our transgressions. He was crushed for our iniquities. The punishment that brought our peace was on him; and by his wounds we are healed.",
        },
        song: "Man of Sorrows! What a Name",
        prayer:
          "Lord Jesus, You were wounded for us. You took what we should have taken. We bring our broken places to You and trust Your wounds to heal.",
        byAge: {
          littles: {
            question: "Did Jesus take our hurt for us?",
            activity: "Touch your hand and say: 'Jesus took the boo-boo for me.'",
          },
          kids: {
            question: "What does 'by His wounds we are healed' actually mean?",
            activity: "Each person names ONE place they need healing. Pray Isaiah 53:5 over them.",
          },
          youth: {
            question:
              "Isaiah 53 was written 700 years before Jesus. What does that fact do to your confidence in Scripture?",
            activity: "Read Isaiah 53 aloud. Each person says one phrase that hit hardest and why.",
          },
          adults: {
            question: "What wound am I still carrying that Christ already bore?",
            activity: "Speak the wound aloud. Place a hand on the spot. Pray: 'Lord, I bring this to Your cross.'",
          },
        },
      },
      {
        theme: "Go and make disciples.",
        scripture: {
          ref: "Matthew 28:18-20",
          text: "Jesus came to them and spoke to them, saying, 'All authority has been given to me in heaven and on earth. Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I commanded you. Behold, I am with you always, even to the end of the age.'",
        },
        song: "We've a Story to Tell to the Nations",
        prayer:
          "Lord Jesus, You have all authority. You sent us. You are with us. Send our family this week — to a neighbor, a friend, a stranger. We are not staying silent.",
        byAge: {
          littles: {
            question: "Who is Jesus telling us to tell about Him?",
            activity: "Point in four directions: north, south, east, west. Say: 'Tell EVERYONE!'",
          },
          kids: {
            question: "If 'all authority' belongs to Jesus, what does that mean for whether we should be scared to share Him?",
            activity:
              "Each person names ONE friend who doesn't know Jesus. Pray for them by name.",
          },
          youth: {
            question:
              "What's the difference between sharing your opinion online and actually making a disciple?",
            activity: "Pick ONE person to invest in this month — not convert in a moment.",
          },
          adults: {
            question: "Whom am I discipling? Whom is discipling me?",
            activity: "If neither, name a step toward fixing each. Pray for courage to take it this week.",
          },
        },
      },
      {
        theme: "You shall be My witnesses.",
        scripture: {
          ref: "Acts 1:8",
          text: "But you will receive power when the Holy Spirit has come upon you. You will be witnesses to me in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth.",
        },
        song: "I Love to Tell the Story",
        prayer:
          "Holy Spirit, give us power to witness today — at home (our Jerusalem), in our neighborhood (our Judea), and beyond. Make us bold and kind.",
        byAge: {
          littles: {
            question: "What is a witness?",
            activity: "Each person says one true thing about Jesus they have seen or know.",
          },
          kids: {
            question:
              "If your 'Jerusalem' is your house and school, what would it look like to be a witness THERE first?",
            activity: "Each person names ONE specific person in their daily life who needs Jesus.",
          },
          youth: {
            question:
              "Why does Jesus put 'witness' BEFORE 'argue' or 'preach'? What's the difference?",
            activity:
              "Practice saying in one sentence: 'What I know about Jesus is ___.' Each person.",
          },
          adults: {
            question: "Have we treated witness as the work of the church staff instead of our own?",
            activity: "Identify your household's 'Jerusalem' (the people closest). Begin to pray daily for one of them.",
          },
        },
      },
      {
        theme: "Ambassadors for Christ.",
        scripture: {
          ref: "2 Corinthians 5:19-20",
          text: "God was in Christ reconciling the world to himself, not reckoning to them their trespasses, and having committed to us the word of reconciliation. We are therefore ambassadors on behalf of Christ, as though God were entreating by us. We beg you on behalf of Christ, be reconciled to God.",
        },
        song: "O Zion, Haste",
        prayer:
          "Lord Jesus, You made us Your ambassadors. Forgive us when we represent You badly. Help our family speak and act as Your representatives this week.",
        byAge: {
          littles: {
            question: "An ambassador speaks for a king. Whose ambassadors are we?",
            activity: "Stand up tall. Say: 'I speak for the King!' three times.",
          },
          kids: {
            question: "If you're an ambassador for Jesus, what does the way you talk and treat people say about Him?",
            activity:
              "Name ONE place this week where you might represent Jesus badly. Pray for help there.",
          },
          youth: {
            question:
              "Ambassadors don't make up the message. What's the difference between representing Jesus and rebranding Him?",
            activity: "Discuss: where do you see Christians 'rebranding' Jesus to look like a side they want?",
          },
          adults: {
            question: "Where have I represented Christ poorly this week and need to apologize?",
            activity: "If anyone is owed an apology, send it today. Then pray for the next conversation.",
          },
        },
      },
    ],
  },
  {
    id: "friday",
    weekday: "Friday",
    pillar: "One another",
    pillarBlurb: "Love is the proof. Friday we focus on the people closest — the family, the household, the brothers and sisters in this room.",
    entries: [
      {
        theme: "Love one another — even in this house.",
        scripture: {
          ref: "John 13:34-35",
          text: "A new commandment I give to you, that you love one another. Just as I have loved you, you also love one another. By this everyone will know that you are my disciples, if you have love for one another.",
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
        theme: "Kind, tenderhearted, forgiving.",
        scripture: {
          ref: "Ephesians 4:32",
          text: "And be kind to one another, tender hearted, forgiving each other, just as God also in Christ forgave you.",
        },
        song: "Blest Be the Tie That Binds",
        prayer:
          "Father, You have forgiven us so much. Make us forgivers in this house. No grudges held overnight. In Jesus' name, amen.",
        byAge: {
          littles: {
            question: "What does it feel like when someone forgives you?",
            activity:
              "Each person says: 'I forgive you' to someone in the room — even for a tiny thing. Hug after.",
          },
          kids: {
            question: "Is there anyone in this house you need to forgive — even for something small?",
            activity:
              "Don't share names. But each person whispers a one-line prayer of forgiveness.",
          },
          youth: {
            question:
              "Why is unforgiveness so hard to put down — even when you know it's hurting you more than them?",
            activity: "Read Matthew 18:21-35 together. Discuss who plays which role in your story.",
          },
          adults: {
            question: "Whose forgiveness am I withholding — and what does that say about how I receive God's?",
            activity: "Take a step (call, write, pray-and-release) toward forgiveness before bed.",
          },
        },
      },
      {
        theme: "Love is patient. Love is kind.",
        scripture: {
          ref: "1 Corinthians 13:4-7",
          text: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud, doesn't behave itself inappropriately, doesn't seek its own way, is not provoked, takes no account of evil; doesn't rejoice in unrighteousness, but rejoices with the truth; bears all things, believes all things, hopes all things, endures all things.",
        },
        song: "The Love of God",
        prayer:
          "Father, fill this house with the love You describe. Where we are impatient, slow us. Where we are unkind, soften us. Where we keep score, free us.",
        byAge: {
          littles: {
            question: "What is one thing love DOES, and one thing love does NOT do?",
            activity: "Pick two words from the verse. Act them out together.",
          },
          kids: {
            question:
              "Which line from 1 Corinthians 13 is hardest for YOU right now — patient? kind? not envious? not easily angered?",
            activity:
              "Each person picks ONE phrase to pray over themselves this week.",
          },
          youth: {
            question:
              "Re-read it with your name in place of 'love.' Where does it ring true? Where does it sting?",
            activity:
              "Read 1 Corinthians 13 aloud, then pray it slowly back over the household.",
          },
          adults: {
            question: "Which line do I most need God to grow in me at home?",
            activity: "Confess to your spouse / housemate / Christian friend. Ask them to ask you about it next week.",
          },
        },
      },
      {
        theme: "Outdo one another in showing honor.",
        scripture: {
          ref: "Romans 12:10",
          text: "In love of the brothers be tenderly affectionate to one another; in honor preferring one another.",
        },
        song: "Bind Us Together, Lord",
        prayer:
          "Lord, give our family the kind of love that puts the other first. Make our house a place where everyone is preferred.",
        byAge: {
          littles: {
            question: "What does it mean to let someone go first?",
            activity:
              "At the next snack or activity, take turns going LAST on purpose. Notice how it feels.",
          },
          kids: {
            question: "What's one way you could honor a sibling or parent this week?",
            activity:
              "Each person picks ONE family member to secretly serve this week. Don't tell.",
          },
          youth: {
            question:
              "Honor is not flattery. What does honoring someone you disagree with actually look like?",
            activity: "Each person names ONE family member and says one thing they honestly honor about them.",
          },
          adults: {
            question: "Whom in this house have I been quietly dishonoring — in tone, in words, in jokes?",
            activity: "Confess if needed. Begin building back honor in concrete words this week.",
          },
        },
      },
      {
        theme: "Bear with one another.",
        scripture: {
          ref: "Colossians 3:13",
          text: "Bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do.",
        },
        song: "Brethren, We Have Met to Worship",
        prayer:
          "Lord Jesus, You bear with us. Teach this house to bear with each other — the slow days, the bad moods, the same old failure. Forgive as we are forgiven.",
        byAge: {
          littles: {
            question: "What does it mean to 'bear with' someone?",
            activity: "Practice saying: 'It's okay. I'm with you.' Each person to one other.",
          },
          kids: {
            question: "Which person in your life is hardest to 'bear with' right now? Why?",
            activity:
              "Pray for that person by name. Ask God to give you the patience you don't have.",
          },
          youth: {
            question:
              "Is there a difference between 'bearing with' someone and being walked on? Where is the line?",
            activity: "Read Colossians 3:12-17 aloud. Talk about clothing yourself with these traits daily.",
          },
          adults: {
            question: "What complaint have I let fester instead of bringing it to God and to the person?",
            activity: "Pray it through first. Then have the honest, kind conversation.",
          },
        },
      },
      {
        theme: "Don't forget hospitality.",
        scripture: {
          ref: "Hebrews 13:1-2",
          text: "Let brotherly love continue. Don't forget to show hospitality to strangers, for in doing so, some have entertained angels without knowing it.",
        },
        song: "All Hail the Power of Jesus' Name",
        prayer:
          "Lord, open this house to people who need to be inside one. Open our table. Open our calendar. Open our hearts.",
        byAge: {
          littles: {
            question: "Who could we invite over for a snack or a meal?",
            activity: "Name one person together. Pick a day this week to call or text them.",
          },
          kids: {
            question: "What's the difference between entertaining and hospitality?",
            activity: "Tidy the entryway together so it's ready for a guest this week.",
          },
          youth: {
            question:
              "Who in your circle eats alone, sits alone, or hasn't been invited in a long time?",
            activity:
              "Each person commits to one act of hospitality this week — a seat at lunch, an invite, a 'come over.'",
          },
          adults: {
            question: "Has our home become a fortress or an open door? Whom are we ignoring?",
            activity: "Schedule one specific person or family on the calendar before next Friday.",
          },
        },
      },
    ],
  },
  {
    id: "saturday",
    weekday: "Saturday",
    pillar: "Sabbath rest",
    pillarBlurb: "He finished the work. We can rest. Saturday we slow the household down before the Lord's Day.",
    entries: [
      {
        theme: "The Sabbath was made for man.",
        scripture: {
          ref: "Mark 2:27",
          text: "He said to them, 'The Sabbath was made for man, not man for the Sabbath.'",
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
        theme: "God finished — and rested.",
        scripture: {
          ref: "Genesis 2:1-3",
          text: "The heavens, the earth, and all their vast array were finished. On the seventh day God finished his work which he had made; and he rested on the seventh day from all his work which he had made. God blessed the seventh day, and made it holy, because he rested in it from all his work of creation which he had done.",
        },
        song: "Now Thank We All Our God",
        prayer:
          "Father, You finished. You rested. You called it holy. Give us courage to stop, to bless, to call rest holy in this house too.",
        byAge: {
          littles: {
            question: "When God was done making the world, what did He do?",
            activity: "Stretch arms up, then sit down. Say: 'God rested!' three times.",
          },
          kids: {
            question: "God didn't rest because He was tired. Why did He rest?",
            activity:
              "Pick one thing to STOP for today (a screen, a chore, a worry). Bless the stopping.",
          },
          youth: {
            question:
              "If even God modeled stopping, what does it say about us if we never do?",
            activity: "Block one hour today as 'stopped.' Read, walk, or simply sit.",
          },
          adults: {
            question: "What in me believes the world won't hold together if I stop?",
            activity: "Confess that belief aloud. Practice one act of trust-by-stopping today.",
          },
        },
      },
      {
        theme: "Remember the Sabbath.",
        scripture: {
          ref: "Exodus 20:8-10",
          text: "Remember the Sabbath day, to keep it holy. You shall labor six days, and do all your work, but the seventh day is a Sabbath to Yahweh your God. You shall not do any work in it, you, nor your son, nor your daughter…",
        },
        song: "O Day of Rest and Gladness",
        prayer:
          "Lord, Your command to rest is a gift, not a burden. Help us receive it. Help us make a small protected pocket of stopping in this household.",
        byAge: {
          littles: {
            question: "Did God tell us to work all the time, or to rest too?",
            activity: "Say together: 'God says: REST is good.' Lie on the floor for ten seconds.",
          },
          kids: {
            question: "Why is REMEMBER the first word? What might happen if we forget to rest?",
            activity: "As a family, write down ONE thing you'll stop tomorrow to make space for rest.",
          },
          youth: {
            question:
              "Sabbath includes 'nor your son, nor your daughter.' What does it mean for kids to also be allowed to rest in your culture?",
            activity: "Plan a 'Sabbath hour' for tomorrow — no schoolwork, no chores, no scroll. What will you do instead?",
          },
          adults: {
            question: "Has our household practiced any form of weekly stopping — or has work bled through every day?",
            activity: "Choose a 24-hour window this week to practice as Sabbath. Tell each other so it's protected.",
          },
        },
      },
      {
        theme: "Come to Me, all who are weary.",
        scripture: {
          ref: "Matthew 11:28-30",
          text: "Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls. For my yoke is easy, and my burden is light.",
        },
        song: "What a Friend We Have in Jesus",
        prayer:
          "Lord Jesus, we are tired. We carry too much. We come to You. Take our burdens. Give us Your easy yoke.",
        byAge: {
          littles: {
            question: "Are you tired sometimes? Where does Jesus say to come?",
            activity: "Each person closes eyes and says: 'Jesus, I come to You.'",
          },
          kids: {
            question: "What is something heavy you've been carrying that you can give Jesus?",
            activity:
              "Hold something heavy together. Set it down. Pray: 'Lord, I give this to You.'",
          },
          youth: {
            question:
              "Jesus says HIS yoke is easy — but you can still be tired in the wrong yoke. Whose yoke are you wearing this season?",
            activity: "Read Matthew 11:28-30 slowly, three times. Be quiet between each.",
          },
          adults: {
            question: "What burden am I carrying that Jesus never asked me to?",
            activity: "Name it. Hand it over in prayer aloud. Receive His easy yoke instead.",
          },
        },
      },
      {
        theme: "He makes me lie down.",
        scripture: {
          ref: "Psalm 23:1-3",
          text: "Yahweh is my shepherd; I shall lack nothing. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul. He guides me in the paths of righteousness for his name's sake.",
        },
        song: "The King of Love My Shepherd Is",
        prayer:
          "Lord, You are our Shepherd. We lack nothing. Make us lie down. Lead us to still waters. Restore our souls this Saturday.",
        byAge: {
          littles: {
            question: "Who is your Shepherd?",
            activity:
              "Lie down on the carpet together. Say slowly: 'The Lord is my Shepherd.'",
          },
          kids: {
            question: "Sometimes a shepherd MAKES sheep lie down because they won't on their own. Why?",
            activity: "Each person says ONE thing that's been making them anxious this week. Pray Psalm 23 over each.",
          },
          youth: {
            question:
              "Where in your life has God 'made you lie down' — through illness, loss, or just exhaustion — and what did He restore?",
            activity: "Pray Psalm 23 aloud, each person taking one verse.",
          },
          adults: {
            question: "If God has to MAKE me lie down, what am I refusing to lay down voluntarily?",
            activity: "Lay it down. Then nap, walk, or sit in silence for 20 minutes today.",
          },
        },
      },
      {
        theme: "A Sabbath rest remains.",
        scripture: {
          ref: "Hebrews 4:9-10",
          text: "There remains therefore a Sabbath rest for the people of God. For he who has entered into his rest has himself also rested from his works, as God did from his.",
        },
        song: "Like a River Glorious",
        prayer:
          "Father, You promise a rest that remains. Help us taste it today. Help us live this week from rest, not for it. In Jesus' name, amen.",
        byAge: {
          littles: {
            question: "Is there a special rest waiting for God's people?",
            activity: "Smile big. Say: 'Yes! God has rest waiting for us!'",
          },
          kids: {
            question: "What's the difference between resting FROM your work and resting IN Jesus' finished work?",
            activity:
              "Talk about: when we trust Jesus' finished work, we can stop trying to earn God's smile.",
          },
          youth: {
            question:
              "If a Sabbath rest 'remains,' how do you live FROM rest in a season that won't slow down?",
            activity:
              "Each person names one practice that helps them rest IN Christ — keep doing it this week.",
          },
          adults: {
            question: "Am I living from rest or for rest?",
            activity: "Choose one Sabbath-from-striving practice this week (a no-work hour, a slow meal, a praise walk).",
          },
        },
      },
    ],
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
