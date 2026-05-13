// Topical Scripture index — "What the Bible says about…"
// Every verse below is from the World English Bible (WEB, public domain).

export type TopicVerse = {
  ref: string;
  text: string;
};

export type Topic = {
  slug: string;
  title: string;
  category: "Heart" | "Relationships" | "Life" | "Trial" | "Doctrine" | "Mission";
  blurb: string;
  verses: TopicVerse[];
  cross?: string[]; // slugs of related topics
};

export const TOPICS: Topic[] = [
  // ─── HEART ───
  {
    slug: "anxiety",
    title: "Anxiety",
    category: "Heart",
    blurb: "Anxiety is not a moral failure. It is a place to bring honestly to the Father.",
    verses: [
      { ref: "Philippians 4:6–7", text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus." },
      { ref: "1 Peter 5:7", text: "Casting all your worries on him, because he cares for you." },
      { ref: "Matthew 6:34", text: "Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own evil is sufficient." },
      { ref: "Psalm 94:19", text: "In the multitude of my thoughts within me, your comforts delight my soul." },
    ],
    cross: ["fear", "peace", "trust"],
  },
  {
    slug: "fear",
    title: "Fear",
    category: "Heart",
    blurb: "The most-repeated command in Scripture is some form of 'do not be afraid.' He is with us.",
    verses: [
      { ref: "Isaiah 41:10", text: "Don't you be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you." },
      { ref: "2 Timothy 1:7", text: "For God didn't give us a spirit of fear, but of power, love, and self-control." },
      { ref: "Psalm 27:1", text: "Yahweh is my light and my salvation. Whom shall I fear?" },
      { ref: "1 John 4:18", text: "There is no fear in love; but perfect love casts out fear." },
    ],
    cross: ["anxiety", "courage", "trust"],
  },
  {
    slug: "anger",
    title: "Anger",
    category: "Heart",
    blurb: "Anger is not always sin, but it is always dangerous. Bring it to God before it bears bitter fruit.",
    verses: [
      { ref: "Ephesians 4:26–27", text: "'Be angry, and don't sin.' Don't let the sun go down on your wrath, and don't give place to the devil." },
      { ref: "James 1:19–20", text: "Let every man be swift to hear, slow to speak, and slow to anger; for the anger of man doesn't produce the righteousness of God." },
      { ref: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
    ],
  },
  {
    slug: "pride",
    title: "Pride",
    category: "Heart",
    blurb: "Pride is the root sin. God opposes it; humility receives His grace.",
    verses: [
      { ref: "James 4:6", text: "God resists the proud, but gives grace to the humble." },
      { ref: "Proverbs 16:18", text: "Pride goes before destruction, and an arrogant spirit before a fall." },
      { ref: "1 Peter 5:5–6", text: "All of you clothe yourselves with humility, to subject yourselves to one another... Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time." },
    ],
  },
  {
    slug: "doubt",
    title: "Doubt",
    category: "Heart",
    blurb: "Doubt is not the opposite of faith — unbelief is. Jesus welcomes honest questions.",
    verses: [
      { ref: "Mark 9:24", text: "Immediately the father of the child cried out with tears, 'I believe. Help my unbelief!'" },
      { ref: "Matthew 28:17", text: "When they saw him, they bowed down to him, but some doubted." },
      { ref: "James 1:5–6", text: "If any of you lacks wisdom, let him ask of God... but let him ask in faith, without any doubting." },
    ],
  },
  {
    slug: "temptation",
    title: "Temptation",
    category: "Heart",
    blurb: "Temptation is not sin. The way of escape always exists, and Christ Himself was tempted.",
    verses: [
      { ref: "1 Corinthians 10:13", text: "No temptation has taken you except what is common to man. God is faithful, who will not allow you to be tempted above what you are able, but will with the temptation also make the way of escape." },
      { ref: "Hebrews 4:15–16", text: "We don't have a high priest who can't be touched with the feeling of our infirmities, but one who has been in all points tempted like we are, yet without sin. Let's therefore draw near with boldness to the throne of grace." },
      { ref: "James 1:13–15", text: "Let no man say when he is tempted, 'I am tempted by God,' for God can't be tempted by evil." },
    ],
  },
  {
    slug: "guilt",
    title: "Guilt & shame",
    category: "Heart",
    blurb: "Guilt rightly leads us to confession; shame, if held, accuses us beyond the cross. Christ has carried both.",
    verses: [
      { ref: "Romans 8:1", text: "There is therefore now no condemnation to those who are in Christ Jesus, who don't walk according to the flesh, but according to the Spirit." },
      { ref: "Psalm 32:5", text: "I acknowledged my sin to you. I didn't hide my iniquity. I said, I will confess my transgressions to Yahweh, and you forgave the iniquity of my sin." },
      { ref: "Isaiah 1:18", text: "Come now, and let us reason together... Though your sins are as scarlet, they shall be as white as snow." },
    ],
  },
  {
    slug: "hope",
    title: "Hope",
    category: "Heart",
    blurb: "Christian hope is not optimism; it is a confident expectation in the God who keeps His promises.",
    verses: [
      { ref: "Romans 15:13", text: "Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope, in the power of the Holy Spirit." },
      { ref: "Hebrews 6:19", text: "This hope we have as an anchor of the soul, a hope both sure and steadfast." },
      { ref: "Lamentations 3:21–23", text: "This I recall to my mind; therefore I have hope. It is because of Yahweh's loving kindnesses that we are not consumed... they are new every morning." },
    ],
  },
  {
    slug: "joy",
    title: "Joy",
    category: "Heart",
    blurb: "Christian joy is not the absence of pain but the abiding presence of the Lord.",
    verses: [
      { ref: "Philippians 4:4", text: "Rejoice in the Lord always! Again I will say, 'Rejoice!'" },
      { ref: "Psalm 16:11", text: "In your presence is fullness of joy. In your right hand there are pleasures forever more." },
      { ref: "Nehemiah 8:10", text: "The joy of Yahweh is your strength." },
      { ref: "John 15:11", text: "I have spoken these things to you, that my joy may remain in you, and that your joy may be made full." },
    ],
  },

  // ─── RELATIONSHIPS ───
  {
    slug: "love",
    title: "Love",
    category: "Relationships",
    blurb: "Christian love is not a feeling. It is the laying-down of one's life for another, after Christ.",
    verses: [
      { ref: "1 John 4:7–10", text: "Beloved, let's love one another, for love is of God... In this God's love was revealed in us, that God has sent his one and only Son into the world that we might live through him." },
      { ref: "1 Corinthians 13:4–7", text: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud... bears all things, believes all things, hopes all things, endures all things." },
      { ref: "John 13:34–35", text: "A new commandment I give to you, that you love one another. By this everyone will know that you are my disciples, if you have love for one another." },
    ],
  },
  {
    slug: "forgiveness",
    title: "Forgiveness",
    category: "Relationships",
    blurb: "Forgiveness is what the forgiven breathe. To refuse it is to choke ourselves.",
    verses: [
      { ref: "Ephesians 4:32", text: "And be kind to one another, tender-hearted, forgiving each other, just as God also in Christ forgave you." },
      { ref: "Matthew 18:21–22", text: "Then Peter came and said to him, 'Lord, how often shall my brother sin against me, and I forgive him? Until seven times?' Jesus said to him, 'I don't tell you until seven times, but, until seventy times seven.'" },
      { ref: "Colossians 3:13", text: "Bearing with one another, and forgiving each other... even as Christ forgave you, so you also do." },
    ],
  },
  {
    slug: "marriage",
    title: "Marriage",
    category: "Relationships",
    blurb: "Marriage is a covenant before God — a picture, however imperfect, of Christ and His Church.",
    verses: [
      { ref: "Genesis 2:24", text: "Therefore a man will leave his father and his mother, and will join with his wife, and they will be one flesh." },
      { ref: "Ephesians 5:25", text: "Husbands, love your wives, even as Christ also loved the assembly, and gave himself up for it." },
      { ref: "1 Corinthians 13:7", text: "[Love] bears all things, believes all things, hopes all things, endures all things." },
      { ref: "Malachi 2:16", text: "For I hate divorce, says Yahweh, the God of Israel." },
    ],
  },
  {
    slug: "children",
    title: "Children & parenting",
    category: "Relationships",
    blurb: "Children are a gift; parents are stewards. Raise them in the Lord, not under our wrath.",
    verses: [
      { ref: "Psalm 127:3", text: "Behold, children are a heritage of Yahweh. The fruit of the womb is his reward." },
      { ref: "Deuteronomy 6:6–7", text: "These words, which I command you today, shall be on your heart; and you shall teach them diligently to your children, and shall talk of them when you sit in your house, and when you walk by the way." },
      { ref: "Ephesians 6:4", text: "You fathers, don't provoke your children to wrath, but nurture them in the discipline and instruction of the Lord." },
    ],
  },
  {
    slug: "friendship",
    title: "Friendship",
    category: "Relationships",
    blurb: "A real friend stays through what no audience would. Christ is the truest of friends.",
    verses: [
      { ref: "Proverbs 17:17", text: "A friend loves at all times; and a brother is born for adversity." },
      { ref: "Proverbs 27:17", text: "Iron sharpens iron; so a man sharpens his friend's countenance." },
      { ref: "John 15:13–15", text: "Greater love has no one than this, that someone lay down his life for his friends... I have called you friends, for everything that I heard from my Father, I have made known to you." },
    ],
  },

  // ─── LIFE ───
  {
    slug: "work",
    title: "Work",
    category: "Life",
    blurb: "Work is not the curse — fruitless work is. Christian work is worship done with our hands.",
    verses: [
      { ref: "Colossians 3:23–24", text: "Whatever you do, work heartily, as for the Lord, and not for men, knowing that from the Lord you will receive the reward of the inheritance; for you serve the Lord Christ." },
      { ref: "2 Thessalonians 3:10", text: "If anyone is not willing to work, don't let him eat." },
      { ref: "Proverbs 16:3", text: "Commit your deeds to Yahweh, and your plans shall succeed." },
    ],
  },
  {
    slug: "money",
    title: "Money & possessions",
    category: "Life",
    blurb: "Money is a tool, not a master. The Lord owns it all; we manage briefly.",
    verses: [
      { ref: "1 Timothy 6:10", text: "For the love of money is a root of all kinds of evil." },
      { ref: "Matthew 6:19–21", text: "Don't lay up treasures for yourselves on the earth... But lay up for yourselves treasures in heaven... where your treasure is, there your heart will be also." },
      { ref: "Hebrews 13:5", text: "Be free from the love of money, content with such things as you have, for he has said, 'I will in no way leave you, neither will I in any way forsake you.'" },
      { ref: "Proverbs 22:9", text: "Whoever has a bountiful eye will be blessed, for he shares his bread with the poor." },
    ],
  },
  {
    slug: "patience",
    title: "Patience",
    category: "Life",
    blurb: "Patience is the slow fruit of the Spirit, grown in the soil of trial.",
    verses: [
      { ref: "James 1:2–4", text: "Count it all joy, my brothers, when you fall into various temptations, knowing that the testing of your faith produces endurance. Let endurance have its perfect work." },
      { ref: "Romans 12:12", text: "Rejoicing in hope; enduring in troubles; continuing steadfastly in prayer." },
      { ref: "Galatians 5:22–23", text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control." },
    ],
  },
  {
    slug: "speech",
    title: "Speech & the tongue",
    category: "Life",
    blurb: "The tongue is the rudder of the whole life. Watch it carefully.",
    verses: [
      { ref: "James 3:5–6", text: "So the tongue is also a little member, and boasts great things. See how a small fire can spread to a large forest!" },
      { ref: "Ephesians 4:29", text: "Let no corrupt speech proceed out of your mouth, but only what is good for building up as the need may be, that it may give grace to those who hear." },
      { ref: "Proverbs 18:21", text: "Death and life are in the power of the tongue; those who love it will eat its fruit." },
    ],
  },

  // ─── TRIAL ───
  {
    slug: "suffering",
    title: "Suffering",
    category: "Trial",
    blurb: "Suffering is not God's absence. Christ Himself suffered — and we suffer with Him for glory ahead.",
    verses: [
      { ref: "Romans 8:18", text: "I consider that the sufferings of this present time are not worthy to be compared with the glory which will be revealed toward us." },
      { ref: "2 Corinthians 1:3–4", text: "Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort; who comforts us in all our affliction." },
      { ref: "1 Peter 4:12–13", text: "Beloved, don't be astonished at the fiery trial which has come upon you... rejoice, to the extent that you partake of Christ's sufferings." },
    ],
  },
  {
    slug: "grief",
    title: "Grief",
    category: "Trial",
    blurb: "Christians grieve — but not as those who have no hope. Jesus wept at the grave of His friend.",
    verses: [
      { ref: "1 Thessalonians 4:13–14", text: "We don't want you to be ignorant... concerning those who have fallen asleep, so that you don't grieve like the rest, who have no hope." },
      { ref: "John 11:35", text: "Jesus wept." },
      { ref: "Psalm 34:18", text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit." },
      { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more." },
    ],
  },
  {
    slug: "sickness",
    title: "Sickness",
    category: "Trial",
    blurb: "He is the God who heals — sometimes now, always finally.",
    verses: [
      { ref: "James 5:14–15", text: "Is any among you sick? Let him call for the elders of the assembly, and let them pray over him, anointing him with oil in the name of the Lord, and the prayer of faith will heal him who is sick." },
      { ref: "Psalm 103:2–3", text: "Praise Yahweh, my soul, and don't forget all his benefits; who forgives all your sins, who heals all your diseases." },
      { ref: "Isaiah 53:5", text: "He was pierced for our transgressions... and with his wounds we are healed." },
    ],
  },
  {
    slug: "loneliness",
    title: "Loneliness",
    category: "Trial",
    blurb: "Loneliness is real but not final. Christ promised His presence to the end of the age.",
    verses: [
      { ref: "Matthew 28:20", text: "I am with you always, even to the end of the age." },
      { ref: "Hebrews 13:5", text: "I will in no way leave you, neither will I in any way forsake you." },
      { ref: "Psalm 68:6", text: "God sets the lonely in families." },
    ],
  },

  // ─── DOCTRINE ───
  {
    slug: "salvation",
    title: "Salvation",
    category: "Doctrine",
    blurb: "Salvation is the work of God from start to finish, received by faith in Jesus.",
    verses: [
      { ref: "Ephesians 2:8–9", text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast." },
      { ref: "John 3:16", text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life." },
      { ref: "Romans 10:9", text: "If you will confess with your mouth that Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved." },
      { ref: "Acts 4:12", text: "There is salvation in no one else, for neither is there any other name under heaven that is given among men, by which we must be saved." },
    ],
  },
  {
    slug: "trinity",
    title: "Trinity",
    category: "Doctrine",
    blurb: "One God, eternally existing in three persons: Father, Son, and Holy Spirit.",
    verses: [
      { ref: "Matthew 28:19", text: "Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." },
      { ref: "2 Corinthians 13:14", text: "The grace of the Lord Jesus Christ, God's love, and the fellowship of the Holy Spirit, be with you all." },
      { ref: "Deuteronomy 6:4", text: "Hear, Israel: Yahweh is our God. Yahweh is one." },
      { ref: "John 1:1", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
    ],
  },
  {
    slug: "holy-spirit",
    title: "Holy Spirit",
    category: "Doctrine",
    blurb: "The Spirit is God Himself — comforter, teacher, sealer, and the down-payment of glory.",
    verses: [
      { ref: "John 14:16–17", text: "I will pray to the Father, and he will give you another Counselor, that he may be with you forever — the Spirit of truth." },
      { ref: "Romans 8:14", text: "For as many as are led by the Spirit of God, these are children of God." },
      { ref: "Galatians 5:22–23", text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control." },
      { ref: "Ephesians 1:13–14", text: "You were sealed with the Holy Spirit of promise, who is a pledge of our inheritance." },
    ],
  },
  {
    slug: "cross",
    title: "The Cross",
    category: "Doctrine",
    blurb: "The cross is where God's love met God's justice in the body of Christ.",
    verses: [
      { ref: "1 Corinthians 1:18", text: "For the word of the cross is foolishness to those who are dying, but to us who are saved it is the power of God." },
      { ref: "Galatians 6:14", text: "But far be it from me to boast, except in the cross of our Lord Jesus Christ." },
      { ref: "Colossians 2:14", text: "Wiping out the handwriting in ordinances which was against us; and he has taken it out of the way, nailing it to the cross." },
    ],
  },
  {
    slug: "resurrection",
    title: "Resurrection",
    category: "Doctrine",
    blurb: "The empty tomb is the hinge of history. If He is risen, everything is different.",
    verses: [
      { ref: "1 Corinthians 15:20–22", text: "But now Christ has been raised from the dead. He became the first fruit of those who are asleep... For as in Adam all die, so also in Christ all will be made alive." },
      { ref: "John 11:25–26", text: "Jesus said to her, 'I am the resurrection and the life. He who believes in me will still live, even if he dies. Whoever lives and believes in me will never die.'" },
      { ref: "Romans 6:4", text: "We were buried therefore with him through baptism into death, that just as Christ was raised from the dead through the glory of the Father, so we also might walk in newness of life." },
    ],
  },
  {
    slug: "heaven",
    title: "Heaven & the new creation",
    category: "Doctrine",
    blurb: "The Christian hope is not a disembodied soul drifting away but a new heaven and new earth.",
    verses: [
      { ref: "Revelation 21:1–4", text: "I saw a new heaven and a new earth... God himself will be with them as their God. He will wipe away every tear from their eyes." },
      { ref: "John 14:2–3", text: "In my Father's house are many homes. If it weren't so, I would have told you. I am going to prepare a place for you." },
      { ref: "2 Peter 3:13", text: "But, according to his promise, we look for new heavens and a new earth, in which righteousness dwells." },
    ],
  },
  {
    slug: "second-coming",
    title: "The return of Christ",
    category: "Doctrine",
    blurb: "He came once in humility; He comes again in glory. Live ready.",
    verses: [
      { ref: "Acts 1:11", text: "This Jesus, who was received up from you into the sky, will come back in the same way as you saw him going into the sky." },
      { ref: "1 Thessalonians 4:16–17", text: "The Lord himself will descend from heaven with a shout, with the voice of the archangel and with God's trumpet..." },
      { ref: "Matthew 24:42", text: "Watch therefore, for you don't know in what hour your Lord comes." },
    ],
  },

  // ─── MISSION ───
  {
    slug: "evangelism",
    title: "Evangelism",
    category: "Mission",
    blurb: "Every believer is sent. The Gospel is not ours to keep.",
    verses: [
      { ref: "Matthew 28:18–20", text: "All authority in heaven and on earth has been given to me. Go and make disciples of all nations..." },
      { ref: "Acts 1:8", text: "You will be witnesses to me in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth." },
      { ref: "Romans 10:14–15", text: "How then will they call on him in whom they have not believed? How will they believe in him whom they have not heard? How will they hear without a preacher?" },
    ],
  },
  {
    slug: "justice",
    title: "Justice & the poor",
    category: "Mission",
    blurb: "True religion visits the orphan, the widow, the stranger. The Lord listens for them.",
    verses: [
      { ref: "Micah 6:8", text: "He has shown you, O man, what is good. What does Yahweh require of you, but to act justly, to love mercy, and to walk humbly with your God?" },
      { ref: "James 1:27", text: "Pure religion and undefiled before our God and Father is this: to visit the fatherless and widows in their affliction, and to keep oneself unstained by the world." },
      { ref: "Isaiah 1:17", text: "Learn to do well. Seek justice. Relieve the oppressed. Judge the fatherless. Plead for the widow." },
    ],
  },
  {
    slug: "unity",
    title: "Unity of the Church",
    category: "Mission",
    blurb: "Jesus prayed for our oneness. Division wounds the witness.",
    verses: [
      { ref: "John 17:20–23", text: "I pray... that they may all be one; just as you, Father, are in me, and I in you, that they also may be one in us; that the world may believe that you sent me." },
      { ref: "Ephesians 4:3–6", text: "Being eager to keep the unity of the Spirit in the bond of peace. There is one body, and one Spirit... one Lord, one faith, one baptism, one God and Father of all." },
      { ref: "1 Corinthians 1:10", text: "I beg you, brothers, through the name of our Lord, Jesus Christ, that you all speak the same thing, and that there be no divisions among you." },
    ],
  },
];

export const CATEGORIES = ["Heart", "Relationships", "Life", "Trial", "Doctrine", "Mission"] as const;
