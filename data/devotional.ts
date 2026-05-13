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
