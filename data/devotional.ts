/**
 * Daily devotional entries — written by Scripture Theory editorial.
 *
 * These are NOT excerpts from Spurgeon, Murray, or any other named author.
 * They are short, original, Scripture-anchored meditations meant to point
 * the reader to Christ. The day-of-year rotation gives the reader a
 * different one each day; the same entry repeats once a month.
 *
 * Verse texts are quoted in the public-domain World English Bible (WEB)
 * unless noted otherwise.
 */

export type DevotionalEntry = {
  title: string;
  reference: string; // e.g. "Psalm 23:1"
  bookId?: string;
  chapter?: number;
  verse?: number;
  verseText: string;
  body: string;
  prayer: string;
};

export const devotional: DevotionalEntry[] = [
  {
    title: "He is not far",
    reference: "Acts 17:27",
    bookId: "acts",
    chapter: 17,
    verse: 27,
    verseText:
      "that they should seek the Lord, if perhaps they might reach out for him and find him, though he is not far from each one of us.",
    body: "Whatever brought you to this page today — curiosity, ache, habit, hope — Paul's words on Mars Hill stand. The God who made the galaxies is not aloof. He is near to the broken, near to the seeker, near even to the one who is sure He is not real. Reach out. He is closer than you think.",
    prayer: "Lord, if You are real, make Yourself known to me today. I am reaching out. Amen.",
  },
  {
    title: "Come to Me",
    reference: "Matthew 11:28",
    bookId: "matthew",
    chapter: 11,
    verse: 28,
    verseText:
      "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
    body: "Jesus does not say, \"Fix yourself and then come.\" He says, \"Come.\" Heavy doesn't disqualify you — heavy is the entry condition. Whatever you are dragging today, drag it to Him. Rest is not a technique. Rest is a Person.",
    prayer: "Jesus, I come to You with everything I am carrying. Give me Your rest. Amen.",
  },
  {
    title: "The fear of the Lord",
    reference: "Proverbs 9:10",
    bookId: "proverbs",
    chapter: 9,
    verse: 10,
    verseText:
      "The fear of Yahweh is the beginning of wisdom. The knowledge of the Holy One is understanding.",
    body: "Wisdom does not begin in a library or a TED talk. It begins on the floor — face down before the One who made you. To fear the Lord is to know who is God and who is not. That single piece of clarity reorders every other decision you will make today.",
    prayer: "Father, teach me to fear You rightly — and so to walk wisely. Amen.",
  },
  {
    title: "Streams in the desert",
    reference: "Isaiah 43:19",
    bookId: "isaiah",
    chapter: 43,
    verse: 19,
    verseText:
      "Behold, I will do a new thing. It springs out now. Don't you know it? I will even make a way in the wilderness, and rivers in the desert.",
    body: "Wildernesses lie. They tell you nothing grows here, no one is coming, the way forward is sealed. God says otherwise. Where you see scorched ground He sees the line of a river that has not yet appeared. Keep walking. The water is on its way.",
    prayer: "Lord, in the dry places of my life, open up rivers. Amen.",
  },
  {
    title: "Cast it on Him",
    reference: "1 Peter 5:7",
    bookId: "1peter",
    chapter: 5,
    verse: 7,
    verseText: "casting all your worries on him, because he cares for you.",
    body: "Peter does not say share your worries, or process your worries, or journal your worries. He says cast — throw, hurl, get them off of you and onto Him. The reason is breathtaking: He cares for you. The Sovereign of the universe is bent toward you in tenderness today.",
    prayer: "Father, I throw it all on You. Catch what I cannot hold. Amen.",
  },
  {
    title: "Be still",
    reference: "Psalm 46:10",
    bookId: "psalms",
    chapter: 46,
    verse: 10,
    verseText:
      "Be still, and know that I am God. I will be exalted among the nations. I will be exalted in the earth.",
    body: "The Hebrew is closer to \"cease striving\" — drop your hands, stop the fight, let go. Stillness is not laziness. It is the posture of someone who finally remembers who God is. He is being exalted in the nations whether or not you are striving. Sit down in that.",
    prayer: "God, I cease. I let You be God. Quiet my soul. Amen.",
  },
  {
    title: "The blood that speaks better",
    reference: "Hebrews 12:24",
    bookId: "hebrews",
    chapter: 12,
    verse: 24,
    verseText:
      "to Jesus, the mediator of a new covenant, and to the blood of sprinkling that speaks better than that of Abel.",
    body: "Abel's blood cried out for justice. Jesus' blood cries out for mercy. The same kind of evidence — a life unjustly poured out — and yet the verdict is reversed because the Voice is the Son's. When the enemy reminds you of your past, listen to the louder Voice on the cross.",
    prayer: "Jesus, drown the accuser's voice in the sound of Your blood. Amen.",
  },
  {
    title: "Search me, O God",
    reference: "Psalm 139:23–24",
    bookId: "psalms",
    chapter: 139,
    verse: 23,
    verseText:
      "Search me, God, and know my heart. Try me, and know my thoughts. See if there is any wicked way in me, and lead me in the everlasting way.",
    body: "David does not pray, \"Help me hide,\" but \"Search me.\" The Christian life is the slow surrender of the rooms we kept locked. Whatever room you are still defending today — invite Him in. The Light is not here to shame you. The Light is here to set you free.",
    prayer: "Search me, Lord. I unlock every door. Lead me in the everlasting way. Amen.",
  },
  {
    title: "He delights in you",
    reference: "Zephaniah 3:17",
    bookId: "zephaniah",
    chapter: 3,
    verse: 17,
    verseText:
      "Yahweh, your God, is among you, a mighty one who will save. He will rejoice over you with joy. He will calm you in his love. He will rejoice over you with singing.",
    body: "Read it twice. The God of armies is singing — over you. Most of us imagine God endures us. Scripture says He sings. If your picture of the Father is a tight-lipped accountant, this verse is here to demolish it. Let Him love you today.",
    prayer: "Father, sing over me. Let me hear it in the quiet. Amen.",
  },
  {
    title: "The lamp",
    reference: "Psalm 119:105",
    bookId: "psalms",
    chapter: 119,
    verse: 105,
    verseText:
      "Your word is a lamp to my feet, and a light for my path.",
    body: "A lamp does not floodlight the next decade. It illuminates the next step. If you are anxious about a season you cannot see yet, that is because God did not give you a stadium light — He gave you a lamp. Take the next step in obedience. He will show you the one after that.",
    prayer: "Lord, light up the step in front of me. I'll trust You for the rest. Amen.",
  },
  {
    title: "A new creation",
    reference: "2 Corinthians 5:17",
    bookId: "2corinthians",
    chapter: 5,
    verse: 17,
    verseText:
      "Therefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new.",
    body: "You are not your worst day. You are not your last sin. If you are in Christ, you are something the universe has not seen before — a person remade. Live today not from what you were trying to escape, but from who you are now becoming.",
    prayer: "Jesus, You have made me new. Help me walk like it. Amen.",
  },
  {
    title: "He will hold you fast",
    reference: "John 10:28",
    bookId: "john",
    chapter: 10,
    verse: 28,
    verseText:
      "I give eternal life to them. They will never perish, and no one will snatch them out of my hand.",
    body: "Your grip on Jesus shakes. His grip on you does not. Eternal life is not a probationary deal you can blow on a bad week — it is a hand the cross has scarred shut around you. Rest there today.",
    prayer: "Shepherd, thank You that no one — including me — can pry me out of Your hand. Amen.",
  },
  {
    title: "Bear one another's burdens",
    reference: "Galatians 6:2",
    bookId: "galatians",
    chapter: 6,
    verse: 2,
    verseText:
      "Bear one another's burdens, and so fulfill the law of Christ.",
    body: "The Christian life is not a solo sport. Somewhere today, a brother or sister is carrying more than they can lift. Ask the Lord whose load you can step under. Then text them. Call them. Bring them a meal. The body of Christ is meant to be felt, not just believed.",
    prayer: "Lord, show me whose burden I am to share today, and give me courage to do it. Amen.",
  },
  {
    title: "Joy in the morning",
    reference: "Psalm 30:5",
    bookId: "psalms",
    chapter: 30,
    verse: 5,
    verseText:
      "Weeping may stay for the night, but joy comes in the morning.",
    body: "If you are still in the night, this verse is not a denial of what you are feeling — it is a refusal to let the night write the ending. Tears are real. Joy is also real. And in the economy of God, joy gets the final word. Hold on.",
    prayer: "Father, even in the night, I trust the morning is Yours. Amen.",
  },
  {
    title: "It is finished",
    reference: "John 19:30",
    bookId: "john",
    chapter: 19,
    verse: 30,
    verseText:
      "When Jesus therefore had received the vinegar, he said, \"It is finished!\" He bowed his head, and gave up his spirit.",
    body: "Three words. One Greek word: tetelestai. \"Paid in full.\" The debt you cannot pay was settled on a Roman cross before you were born. Stop trying to add to the receipt. The work is done. Receive it.",
    prayer: "Jesus, thank You. There is nothing left for me to pay. Amen.",
  },
  {
    title: "Walk in the Spirit",
    reference: "Galatians 5:16",
    bookId: "galatians",
    chapter: 5,
    verse: 16,
    verseText:
      "But I say, walk by the Spirit, and you won't fulfill the lust of the flesh.",
    body: "Sanctification is not gritting your teeth harder against sin. It is walking, step by step, in step with the Spirit. The flesh starves when the Spirit is fed. What will you feed today?",
    prayer: "Holy Spirit, I yield. Walk me through this day. Amen.",
  },
  {
    title: "All things",
    reference: "Romans 8:28",
    bookId: "romans",
    chapter: 8,
    verse: 28,
    verseText:
      "We know that all things work together for good for those who love God, for those who are called according to his purpose.",
    body: "Not all things are good. The verse never said that. It says God is sovereign enough to weave even the things that should not have happened to you into something redemptive. You don't have to call evil good. You can call God good in the middle of it.",
    prayer: "Sovereign Lord, weave even this into something good. I trust You with the loom. Amen.",
  },
  {
    title: "A bruised reed",
    reference: "Matthew 12:20",
    bookId: "matthew",
    chapter: 12,
    verse: 20,
    verseText:
      "He won't break a bruised reed. He won't quench a smoking flax, until he leads justice to victory.",
    body: "If your faith feels fragile today — a reed already cracked, a wick barely smoking — this is the Messiah you have. He will not snap the reed to put it out of its misery. He will mend it. He will not stamp out the spark. He will fan it. Bring Him your weak places.",
    prayer: "Tender Christ, I bring You my bruised places. Bind them up. Amen.",
  },
  {
    title: "Greater is He",
    reference: "1 John 4:4",
    bookId: "1john",
    chapter: 4,
    verse: 4,
    verseText:
      "You are of God, little children, and have overcome them; because greater is he who is in you than he who is in the world.",
    body: "Whatever you are up against — habit, fear, accuser, news cycle — the One inside you is greater. You are not fighting for the victory. You are fighting from it. Live today out of that math.",
    prayer: "Spirit of the living God, You are in me. Greater. Stronger. Win this day through me. Amen.",
  },
  {
    title: "The Lord is my Shepherd",
    reference: "Psalm 23:1",
    bookId: "psalms",
    chapter: 23,
    verse: 1,
    verseText:
      "Yahweh is my shepherd; I shall lack nothing.",
    body: "David did not say, \"The Lord gives me a shepherd.\" The Lord Himself takes the staff. Sheep do not lack with a shepherd like this one. Whatever you feel the lack of today — name it — and watch Him fill it in His way and in His time.",
    prayer: "Shepherd of my soul, lead me. I have everything I need in You. Amen.",
  },
  {
    title: "Pray without ceasing",
    reference: "1 Thessalonians 5:17",
    bookId: "1thessalonians",
    chapter: 5,
    verse: 17,
    verseText: "Pray without ceasing.",
    body: "Three words that change everything. Prayer is not the bell on a meeting. Prayer is the air the believer breathes. Today, talk to Him on the bus, at the sink, between meetings, in the silence. The Father is listening on every channel.",
    prayer: "Father, teach me to live my whole day as a conversation with You. Amen.",
  },
  {
    title: "The Word became flesh",
    reference: "John 1:14",
    bookId: "john",
    chapter: 1,
    verse: 14,
    verseText:
      "The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.",
    body: "The infinite became finite. The Author wrote Himself into the story. The eternal Word took on tongue and teeth so He could say to your face, \"I love you.\" If God came that close, no part of your life is too small to bring to Him.",
    prayer: "Jesus, Word made flesh, thank You for closing the distance. Amen.",
  },
  {
    title: "Renewed strength",
    reference: "Isaiah 40:31",
    bookId: "isaiah",
    chapter: 40,
    verse: 31,
    verseText:
      "but those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.",
    body: "Waiting on the Lord is not waiting around. It is the active trust of one who has stopped scrambling for what only God can supply. The strength you need today is not in your reserves. It is in His. Lift your eyes.",
    prayer: "Lord, I wait on You. Renew the strength I do not have. Amen.",
  },
  {
    title: "The fellowship of His suffering",
    reference: "Philippians 3:10",
    bookId: "philippians",
    chapter: 3,
    verse: 10,
    verseText:
      "that I may know him, and the power of his resurrection, and the fellowship of his sufferings, becoming conformed to his death.",
    body: "We long for the power of His resurrection. Paul names a second longing most of us avoid — the fellowship of His sufferings. There is a closeness with Christ that only comes by sharing in His cross. If you are suffering today, you are not far from Him. You are nearer than ever.",
    prayer: "Jesus, in my suffering, draw me closer to You than I have ever been. Amen.",
  },
  {
    title: "Free indeed",
    reference: "John 8:36",
    bookId: "john",
    chapter: 8,
    verse: 36,
    verseText:
      "If therefore the Son makes you free, you will be free indeed.",
    body: "The world offers freedom-from. Jesus offers freedom-for — for joy, for holiness, for love, for the kind of life you were made to live. The chains you have struggled against for years can fall in a moment if you bring them to Him. Ask Him for that freedom today.",
    prayer: "Son of God, set me free where I am still bound. Make me free indeed. Amen.",
  },
  {
    title: "I am with you always",
    reference: "Matthew 28:20",
    bookId: "matthew",
    chapter: 28,
    verse: 20,
    verseText:
      "Behold, I am with you always, even to the end of the age.",
    body: "The last sentence Jesus spoke before ascending — and the first promise He wants ringing in your ears. Wherever you have to go today, He goes. Whatever you have to face, He faces with you. Not on call. With you.",
    prayer: "Immanuel, thank You that I am not alone in any room I will walk into today. Amen.",
  },
  {
    title: "Forgiven much, loves much",
    reference: "Luke 7:47",
    bookId: "luke",
    chapter: 7,
    verse: 47,
    verseText:
      "Therefore I tell you, her sins, which are many, are forgiven, for she loved much. But to whom little is forgiven, the same loves little.",
    body: "If your love for Jesus feels small, it is not because you have sinned too little — it is because you have not yet seen how much He has forgiven. Sit with the size of the debt that was cancelled. Then watch what rises up in you.",
    prayer: "Jesus, show me the depth of my pardon, that I may rise loving You with everything. Amen.",
  },
  {
    title: "Cast down, not destroyed",
    reference: "2 Corinthians 4:8–9",
    bookId: "2corinthians",
    chapter: 4,
    verse: 8,
    verseText:
      "We are pressed on every side, yet not crushed; perplexed, yet not to despair; pursued, yet not forsaken; struck down, yet not destroyed.",
    body: "Paul does not pretend the pressure is not there. He simply refuses to let the pressure have the last word. Pressed — but not crushed. Knocked down — but not finished. If you are in any of these clauses today, finish the verse. The \"yet not\" is the gospel.",
    prayer: "Lord, hold me up under the weight. Carry me where I cannot stand. Amen.",
  },
  {
    title: "Love one another",
    reference: "John 13:34",
    bookId: "john",
    chapter: 13,
    verse: 34,
    verseText:
      "A new commandment I give to you, that you love one another. Just as I have loved you, you also love one another.",
    body: "The new commandment is not new in topic — Leviticus already said love your neighbor. It is new in measure: as I have loved you. The cross sets the standard. Today, love someone the way Jesus loved you when you were unlovable.",
    prayer: "Jesus, fill me with Your love so I can spend it on someone today. Amen.",
  },
  {
    title: "Maranatha",
    reference: "Revelation 22:20",
    bookId: "revelation",
    chapter: 22,
    verse: 20,
    verseText:
      "He who testifies these things says, \"Yes, I come quickly.\" Amen! Yes, come, Lord Jesus.",
    body: "The Bible ends with a prayer, and it should end every day. Yes — come. Come to this city. Come to my family. Come to my own tired heart. The story is not closed. The King is coming back. Live ready.",
    prayer: "Amen. Even so, come, Lord Jesus. Amen.",
  },
  {
    title: "Hidden with Christ",
    reference: "Colossians 3:3",
    bookId: "colossians",
    chapter: 3,
    verse: 3,
    verseText: "For you died, and your life is hidden with Christ in God.",
    body: "Your real self is not on display. It is not what your boss sees, not what the comments say, not even what you see in the mirror. The truest thing about you is hidden — sealed inside Christ, inside the Father. The world cannot reach it. Neither can your worst day.",
    prayer: "Father, when I am loud or invisible, remind me that my real life is hidden with Christ. That is enough. Amen.",
  },
  {
    title: "Smaller than the gift",
    reference: "1 Corinthians 4:7",
    bookId: "1corinthians",
    chapter: 4,
    verse: 7,
    verseText:
      "For who makes you different? What do you have that you didn't receive? But if you did receive it, why do you boast as if you had not received it?",
    body: "Every gift in your hand — your mind, your kindness, the door that opened, the friend who stayed — came from somewhere outside you. Nothing you have is self-made. That single truth, faced honestly, melts pride and silences envy in the same breath. You can only receive what you cannot earn.",
    prayer: "Lord, thank You for what I did not give myself. Make me a generous receiver, a grateful steward. Amen.",
  },
  {
    title: "He restores my soul",
    reference: "Psalm 23:3",
    bookId: "psalms",
    chapter: 23,
    verse: 3,
    verseText: "He restores my soul. He guides me in the paths of righteousness for his name's sake.",
    body: "Notice the order. He restores first, then He guides. You cannot follow the path until your soul has been put back together. If today feels frayed, do not strain. Be still. The Shepherd is doing the restoring work no app or willpower can do.",
    prayer: "Shepherd, restore the parts of me that are tired and torn. Then guide me. Amen.",
  },
  {
    title: "A spirit of power, love, and self-control",
    reference: "2 Timothy 1:7",
    bookId: "2timothy",
    chapter: 1,
    verse: 7,
    verseText:
      "For God didn't give us a spirit of fear, but of power, love, and self-control.",
    body: "Fear is loud, but it is not from God. What He has given you is not a thunderclap of confidence, but three quieter things: power to do today's small obediences, love for the people in your line of sight, and self-control to say no to what is unworthy. That is more than enough.",
    prayer: "Father, drive out the spirit of fear. Fill me with the steady mind You have promised. Amen.",
  },
  {
    title: "Wait on the Lord",
    reference: "Isaiah 40:31",
    bookId: "isaiah",
    chapter: 40,
    verse: 31,
    verseText:
      "but those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.",
    body: "Waiting on God is not standing still. It is leaning the full weight of your hope on Someone who has never broken a promise. The eagle does not flap; he reads the rising air. Today, lean. The rising air is the Spirit beneath you.",
    prayer: "Lord, I cannot manufacture strength. I wait on You. Lift me on Your rising air. Amen.",
  },
  {
    title: "Take up your cross",
    reference: "Luke 9:23",
    bookId: "luke",
    chapter: 9,
    verse: 23,
    verseText:
      "He said to all, \"If anyone desires to come after me, let him deny himself, take up his cross, and follow me.\"",
    body: "The cross was not a metaphor in Jesus' mouth. It was an instrument of public death. To take up yours is to agree that the version of you who must be served, defended, and amplified must die — daily. What rises in its place is freer than that small self ever was.",
    prayer: "Jesus, today I deny myself one small thing and follow You. Strengthen me to do it. Amen.",
  },
  {
    title: "He who began",
    reference: "Philippians 1:6",
    bookId: "philippians",
    chapter: 1,
    verse: 6,
    verseText:
      "being confident of this very thing, that he who began a good work in you will complete it until the day of Jesus Christ.",
    body: "He started it. He will finish it. Your part is not to manufacture the work, only to remain in the One who is doing it. If you have been a believer for forty days or forty years, the same hand is shaping you. He does not abandon half-built things.",
    prayer: "Father, You began this. Finish what You started in me. I am not the builder. Amen.",
  },
  {
    title: "Cast your cares",
    reference: "1 Peter 5:7",
    bookId: "1peter",
    chapter: 5,
    verse: 7,
    verseText: "casting all your worries on him, because he cares for you.",
    body: "Casting is a verb of release, not deposit. You do not slide your worries onto a shelf for safekeeping. You throw them — to the one place they belong. The reason this is even possible is the second half of the verse: He cares. Anxiety, in the end, is a quiet doubt that the Father is paying attention. He is.",
    prayer: "Father, I throw this day's weight onto You. Catch it. Catch me. Amen.",
  },
  {
    title: "Behold the Lamb",
    reference: "John 1:29",
    bookId: "john",
    chapter: 1,
    verse: 29,
    verseText:
      "The next day, he saw Jesus coming to him, and said, \"Behold, the Lamb of God, who takes away the sin of the world!\"",
    body: "John the Baptist's one job, finally, was to point. Not to himself, not to the crowd's appetite for a show — but to Jesus. Look. The Lamb is here. Sin is not your final reality. The Lamb is. Whatever else demands your attention today, look at Him first.",
    prayer: "Lamb of God, take away my sin. I look to You first today. Amen.",
  },
  {
    title: "The God who sees",
    reference: "Genesis 16:13",
    bookId: "genesis",
    chapter: 16,
    verse: 13,
    verseText:
      "She called the name of Yahweh who spoke to her, \"You are a God who sees,\" for she said, \"Have I even stayed alive after seeing him?\"",
    body: "Hagar is a slave, a runaway, an outsider — and yet she is the first person in Scripture to name God. She calls Him El-Roi, the God who sees. If you feel unseen today — by your family, your church, your city — the One who matters is already looking. He knows your name.",
    prayer: "El-Roi, You see me. That is enough. Walk with me today. Amen.",
  },
  {
    title: "Quiet and trust",
    reference: "Isaiah 30:15",
    bookId: "isaiah",
    chapter: 30,
    verse: 15,
    verseText:
      "For thus said the Lord Yahweh, the Holy One of Israel, \"You will be saved in returning and rest. Your strength will be in quietness and in confidence.\"",
    body: "Israel wanted horses and fortresses. God offered them quietness and trust. We do the same: noise, plans, leverage. He says: return, rest, be quiet, trust. The world will tell you that is weakness. It is the only kind of strength that does not run out.",
    prayer: "Lord, I have been loud and self-reliant. Return me to quietness and trust today. Amen.",
  },
  {
    title: "Living water",
    reference: "John 7:37",
    bookId: "john",
    chapter: 7,
    verse: 37,
    verseText:
      "Now on the last and greatest day of the feast, Jesus stood and cried out, \"If anyone is thirsty, let him come to me and drink!\"",
    body: "Notice what Jesus does: He stands up and shouts in the middle of a religious festival. No quiet whisper. He has watched a crowd try to drink from broken cisterns long enough. The invitation has not changed. If you are thirsty, come. Drink. He has not run out.",
    prayer: "Jesus, I am thirsty. I come. Pour into me what only You can give. Amen.",
  },
  {
    title: "Created for good works",
    reference: "Ephesians 2:10",
    bookId: "ephesians",
    chapter: 2,
    verse: 10,
    verseText:
      "For we are his workmanship, created in Christ Jesus for good works, which God prepared before that we would walk in them.",
    body: "You are not saved by your works, but you are saved for them. Somewhere in your day, God has already prepared a kindness, a conversation, a small obedience that has your name on it. Watch for it. You were made to walk into it.",
    prayer: "Father, open my eyes for the good work You have prepared for me today. Amen.",
  },
  {
    title: "The narrow door",
    reference: "Luke 13:24",
    bookId: "luke",
    chapter: 13,
    verse: 24,
    verseText:
      "Strive to enter in by the narrow door, for many, I tell you, will seek to enter in, and will not be able.",
    body: "Jesus does not pretend the door is wide. He says it is narrow, and the narrowness is Himself. You cannot drag old gods, old idols, old self-rule through. They will not fit. The good news is that the door is open. Strive to enter — bring only what He will let you carry.",
    prayer: "Lord, narrow my life to fit Your door. Strip what You must. Amen.",
  },
  {
    title: "Better is one day",
    reference: "Psalm 84:10",
    bookId: "psalms",
    chapter: 84,
    verse: 10,
    verseText:
      "For a day in your courts is better than a thousand. I would rather be a doorkeeper in the house of my God, than to dwell in the tents of wickedness.",
    body: "A thousand days of comfort, prestige, or pleasure cannot match one day in the nearness of God. The psalmist would rather be a doorman in the temple than the king of every other house. Where would you rather be today? Aim for the door.",
    prayer: "Father, make my heart prefer Your courts. One day with You is more than enough. Amen.",
  },
  {
    title: "He must increase",
    reference: "John 3:30",
    bookId: "john",
    chapter: 3,
    verse: 30,
    verseText: "He must increase, but I must decrease.",
    body: "John the Baptist watched his ministry shrink, and he called it good. He understood his job: get smaller so Jesus could be seen clearly. That is also your job. Today, in one conversation, decide to become less visible so that Christ becomes more so.",
    prayer: "Jesus, increase. I will gladly decrease. Be seen through me today. Amen.",
  },
  {
    title: "Sown in tears",
    reference: "Psalm 126:5",
    bookId: "psalms",
    chapter: 126,
    verse: 5,
    verseText: "Those who sow in tears will reap in joy.",
    body: "If you are weeping while you work, while you parent, while you pray for someone who will not return your calls — you are not wasting the tears. The Bible has a whole economy where tears are seed. The harvest is coming, and it will not match the size of what you put in.",
    prayer: "Lord, count my tears as seed. Bring in the harvest in Your time. Amen.",
  },
  {
    title: "Hidden manna",
    reference: "Revelation 2:17",
    bookId: "revelation",
    chapter: 2,
    verse: 17,
    verseText:
      "To him who overcomes, to him I will give of the hidden manna…",
    body: "There is bread you can only eat by overcoming. Hidden manna — sustenance the world does not know exists. Every act of faithfulness today opens you a little wider to it. Keep going. He feeds those who keep walking.",
    prayer: "Jesus, feed me on the bread that only the faithful know. Sustain me today. Amen.",
  },
  {
    title: "Out of weakness",
    reference: "Hebrews 11:34",
    bookId: "hebrews",
    chapter: 11,
    verse: 34,
    verseText:
      "…quenched the power of fire, escaped the edge of the sword, from weakness were made strong, grew mighty in war, and caused foreign armies to flee.",
    body: "The hall of faith is a hall of weak people who were made strong. None of them started competent. None of them stopped trembling. God uses the weak — not in spite of their weakness but through it. Bring your weakness today, not your résumé.",
    prayer: "Father, You are not embarrassed by my weakness. Make me strong through You. Amen.",
  },
  {
    title: "The Spirit helps",
    reference: "Romans 8:26",
    bookId: "romans",
    chapter: 8,
    verse: 26,
    verseText:
      "In the same way, the Spirit also helps our weaknesses, for we don't know how to pray as we ought. But the Spirit himself makes intercession for us with groanings which can't be uttered.",
    body: "If you have ever opened your mouth to pray and nothing came — the Spirit was already speaking for you. He prays with groans, with sighs, with everything beneath words. You are never praying alone, even when you don't know what to say.",
    prayer: "Spirit of God, pray in me what I cannot find words for. Amen.",
  },
  {
    title: "He set his face",
    reference: "Luke 9:51",
    bookId: "luke",
    chapter: 9,
    verse: 51,
    verseText:
      "It came to pass, when the days were near that he should be taken up, he intently set his face to go to Jerusalem.",
    body: "Jesus walked toward His own death with a set face. Not eager — but not turning. There is a road today that you must walk toward, not away from. Some hard conversation, some unfinished forgiveness, some duty. Set your face. The cross was a heavier road than yours, and He walked it for you.",
    prayer: "Lord, give me a face set toward what I must do today. Steady me. Amen.",
  },
  {
    title: "Underneath",
    reference: "Deuteronomy 33:27",
    bookId: "deuteronomy",
    chapter: 33,
    verse: 27,
    verseText:
      "The eternal God is your dwelling place. Underneath are the everlasting arms.",
    body: "Whatever you are standing on today — a job, a marriage, a hard-won routine, a hope — underneath all of it are arms that do not tire. If the ground gives way, the arms will not. Lean back, on purpose, into them.",
    prayer: "Eternal God, You are underneath me. I lean back. Hold me. Amen.",
  },
  {
    title: "Quiet in the storm",
    reference: "Mark 4:39",
    bookId: "mark",
    chapter: 4,
    verse: 39,
    verseText:
      "He awoke and rebuked the wind, and said to the sea, \"Peace! Be still!\" The wind ceased and there was a great calm.",
    body: "Jesus did not yell over the storm. He spoke two words. The wind that should have terrified Him obeyed Him. The same voice still speaks. He has not lost authority over what frightens you. Ask Him to say it over your weather.",
    prayer: "Jesus, speak peace over what is loud in my life. Bring great calm. Amen.",
  },
  {
    title: "Love your enemies",
    reference: "Luke 6:27",
    bookId: "luke",
    chapter: 6,
    verse: 27,
    verseText:
      "But I tell you who hear: love your enemies, do good to those who hate you,",
    body: "There is no longer a category of human you are allowed to write off. Jesus closes the door on hate as a Christian option. Love your enemy. Not necessarily feel warm about them — love them: pray for them by name, do them concrete good, refuse to wish their ruin. This is the family resemblance of God.",
    prayer: "Father, You loved me when I was Your enemy. Teach me to love mine. Amen.",
  },
  {
    title: "Not by might",
    reference: "Zechariah 4:6",
    bookId: "zechariah",
    chapter: 4,
    verse: 6,
    verseText:
      "Then he answered and spoke to me, saying, \"This is Yahweh's word to Zerubbabel, saying, 'Not by might, nor by power, but by my Spirit,' says Yahweh of Armies.\"",
    body: "Whatever you are trying to build today — a marriage, a witness, a business, a fragile faith — God is not waiting for you to be impressive. He is waiting for you to be dependent. Not by might. Not by power. By His Spirit. Ask, today, for less of you and more of Him.",
    prayer: "Spirit of God, do in me what I cannot do in my own strength. Amen.",
  },
  {
    title: "Sheep among wolves",
    reference: "Matthew 10:16",
    bookId: "matthew",
    chapter: 10,
    verse: 16,
    verseText:
      "\"Behold, I send you out as sheep among wolves. Therefore be wise as serpents, and harmless as doves.\"",
    body: "Jesus does not hide what discipleship costs. He sends sheep among wolves. But He also tells you who to be in that wilderness — wise but harmless, shrewd but pure. The world will misread you either way. He has read you correctly. Walk in.",
    prayer: "Shepherd, walk with me into rooms where I feel like a sheep. Make me wise and pure. Amen.",
  },
  {
    title: "His delight",
    reference: "Zephaniah 3:17",
    bookId: "zephaniah",
    chapter: 3,
    verse: 17,
    verseText:
      "Yahweh, your God, is among you, a mighty one who will save. He will rejoice over you with joy. He will calm you in his love. He will rejoice over you with singing.",
    body: "Read it slowly. He rejoices over you. He sings over you. The God who hangs the stars hums over your sleeping head. If you have only known a quiet, distant God, you have not yet met the real One. He delights in you — not because you are impressive but because you are His.",
    prayer: "Father, sing over me today. Let me hear it. Amen.",
  },
  {
    title: "The kindness of God",
    reference: "Romans 2:4",
    bookId: "romans",
    chapter: 2,
    verse: 4,
    verseText:
      "Or do you despise the riches of his goodness, forbearance, and patience, not knowing that the goodness of God leads you to repentance?",
    body: "What turns you around is not God's anger. It is His kindness. The Father who keeps being good to you, even today, is not soft on sin — He is wooing you out of it. Don't waste the kindness. Let it move you somewhere.",
    prayer: "Father, Your kindness is too much. Lead me, today, into the change it asks of me. Amen.",
  },
  {
    title: "Forever",
    reference: "Psalm 23:6",
    bookId: "psalms",
    chapter: 23,
    verse: 6,
    verseText:
      "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh's house forever.",
    body: "Notice the verbs that follow you. Goodness. Loving kindness. They are not in front, demanding to be earned. They are behind, picking up what you drop. And the end is not a question: forever, in His house. Whatever today is, the address is already set.",
    prayer: "Father, goodness and mercy are behind me, and Your house is ahead. Walk me home. Amen.",
  },
];

/**
 * Returns a stable devotional based on the day-of-year, so the same day
 * shows the same entry to everyone in every timezone — without needing
 * to ship 366 entries.
 */
export function todaysDevotional(date = new Date()): DevotionalEntry {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const day = Math.floor(diff / 86400000); // 1..366
  return devotional[(day - 1) % devotional.length];
}
