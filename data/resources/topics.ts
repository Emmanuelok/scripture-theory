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
    cross: ["anxiety", "trust"],
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

  // ─── HEART (additions) ───
  {
    slug: "peace",
    title: "Peace",
    category: "Heart",
    blurb: "Not the absence of storm. The presence of the One who sleeps in the boat.",
    verses: [
      { ref: "John 14:27", text: "Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don't let your heart be troubled, neither let it be fearful." },
      { ref: "Isaiah 26:3", text: "You will keep whoever's mind is steadfast in perfect peace, because he trusts in you." },
      { ref: "Romans 5:1", text: "Being therefore justified by faith, we have peace with God through our Lord Jesus Christ." },
      { ref: "Colossians 3:15", text: "Let the peace of God rule in your hearts, to which also you were called in one body, and be thankful." },
      { ref: "Philippians 4:7", text: "The peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus." },
    ],
    cross: ["anxiety", "fear", "trust"],
  },
  {
    slug: "trust",
    title: "Trust",
    category: "Heart",
    blurb: "Not the absence of questions. The decision to lean anyway.",
    verses: [
      { ref: "Proverbs 3:5–6", text: "Trust in Yahweh with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight." },
      { ref: "Psalm 56:3", text: "When I am afraid, I will put my trust in you." },
      { ref: "Isaiah 41:10", text: "Don't you be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness." },
      { ref: "Jeremiah 17:7–8", text: "Blessed is the man who trusts in Yahweh, and whose confidence is in Yahweh. For he will be as a tree planted by the waters." },
      { ref: "Psalm 37:5", text: "Commit your way to Yahweh. Trust also in him, and he will do this." },
    ],
    cross: ["faith", "peace", "anxiety"],
  },
  {
    slug: "humility",
    title: "Humility",
    category: "Heart",
    blurb: "The mind of Christ, who emptied Himself.",
    verses: [
      { ref: "Philippians 2:5–7", text: "Have this in your mind, which was also in Christ Jesus, who, existing in the form of God... emptied himself, taking the form of a servant." },
      { ref: "James 4:6", text: "God resists the proud, but gives grace to the humble." },
      { ref: "1 Peter 5:6", text: "Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time." },
      { ref: "Micah 6:8", text: "What does Yahweh require of you, but to act justly, to love mercy, and to walk humbly with your God?" },
      { ref: "Matthew 23:12", text: "Whoever exalts himself will be humbled, and whoever humbles himself will be exalted." },
    ],
    cross: ["pride"],
  },
  {
    slug: "contentment",
    title: "Contentment",
    category: "Heart",
    blurb: "Learned, not stumbled into. Paul says so.",
    verses: [
      { ref: "Philippians 4:11–13", text: "I have learned in whatever state I am, to be content in it. I know how to be humbled, and I know also how to abound... I can do all things through Christ, who strengthens me." },
      { ref: "1 Timothy 6:6–8", text: "Godliness with contentment is great gain... if we have food and clothing, we will be content with that." },
      { ref: "Hebrews 13:5", text: "Be free from the love of money, content with such things as you have, for he has said, 'I will in no way leave you, neither will I in any way forsake you.'" },
      { ref: "Psalm 23:1", text: "Yahweh is my shepherd: I shall lack nothing." },
    ],
    cross: ["money", "envy"],
  },
  {
    slug: "discouragement",
    title: "Discouragement",
    category: "Heart",
    blurb: "When the soul says give up. The Word that says don't.",
    verses: [
      { ref: "Joshua 1:9", text: "Haven't I commanded you? Be strong and courageous. Don't be afraid. Don't be dismayed, for Yahweh your God is with you wherever you go." },
      { ref: "Galatians 6:9", text: "Let's not be weary in doing good, for we will reap in due season, if we don't give up." },
      { ref: "2 Corinthians 4:16–18", text: "Therefore we don't faint, but though our outward man is decaying, yet our inward man is renewed day by day." },
      { ref: "Psalm 42:11", text: "Why are you in despair, my soul? Why are you disturbed within me? Hope in God! For I shall still praise him." },
      { ref: "Isaiah 40:31", text: "Those who wait for Yahweh will renew their strength. They will mount up with wings like eagles." },
    ],
    cross: ["hope", "depression", "burnout"],
  },
  {
    slug: "bitterness",
    title: "Bitterness",
    category: "Heart",
    blurb: "A root that, left alone, poisons everything.",
    verses: [
      { ref: "Hebrews 12:15", text: "Looking carefully lest there be any man who falls short of the grace of God; lest any root of bitterness springing up trouble you, and many be defiled by it." },
      { ref: "Ephesians 4:31–32", text: "Let all bitterness, wrath, anger, outcry, and slander, be put away from you, with all malice. And be kind to one another, tenderhearted, forgiving each other, just as God also in Christ forgave you." },
      { ref: "James 3:14", text: "If you have bitter jealousy and selfish ambition in your heart, don't boast and don't lie against the truth." },
    ],
    cross: ["forgiveness", "anger"],
  },
  {
    slug: "lust",
    title: "Lust",
    category: "Heart",
    blurb: "The wrong fire. The Word about putting it out.",
    verses: [
      { ref: "Matthew 5:28", text: "Everyone who gazes at a woman to lust after her has committed adultery with her already in his heart." },
      { ref: "1 Corinthians 6:18–20", text: "Flee sexual immorality... you are not your own, for you were bought with a price. Therefore glorify God in your body." },
      { ref: "Romans 13:14", text: "Put on the Lord Jesus Christ, and make no provision for the flesh, for its lusts." },
      { ref: "Job 31:1", text: "I made a covenant with my eyes, how then should I look lustfully at a young woman?" },
      { ref: "2 Timothy 2:22", text: "Flee from youthful lusts; but pursue righteousness, faith, love, and peace with those who call on the Lord out of a pure heart." },
    ],
    cross: ["temptation"],
  },
  {
    slug: "envy",
    title: "Envy & jealousy",
    category: "Heart",
    blurb: "Cain's old wound. Christ's healing comparison.",
    verses: [
      { ref: "Proverbs 14:30", text: "The life of the body is a heart at peace, but envy rots the bones." },
      { ref: "James 3:16", text: "Where jealousy and selfish ambition are, there is confusion and every evil deed." },
      { ref: "Galatians 5:26", text: "Let's not become conceited, provoking one another, and envying one another." },
      { ref: "1 Corinthians 13:4", text: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud." },
    ],
    cross: ["pride", "contentment"],
  },

  // ─── RELATIONSHIPS (additions) ───
  {
    slug: "singleness",
    title: "Singleness",
    category: "Relationships",
    blurb: "Not a holding pattern. A genuine vocation Paul calls a gift.",
    verses: [
      { ref: "1 Corinthians 7:7–8", text: "Yet I wish that all men were like me. However each man has his own gift from God, one of this kind, and another of that kind... I say to the unmarried and to widows, it is good for them if they remain even as I am." },
      { ref: "1 Corinthians 7:32–34", text: "He who is unmarried is concerned for the things of the Lord, how he may please the Lord." },
      { ref: "Isaiah 56:4–5", text: "I will give to them in my house and within my walls a memorial and a name better than of sons and of daughters. I will give them an everlasting name." },
      { ref: "Matthew 19:11–12", text: "Not all men can receive this saying, but those to whom it is given... He who is able to receive it, let him receive it." },
    ],
    cross: ["loneliness", "marriage"],
  },
  {
    slug: "conflict",
    title: "Conflict",
    category: "Relationships",
    blurb: "How the New Testament Church handles offense — directly, in love, in steps.",
    verses: [
      { ref: "Matthew 18:15–17", text: "If your brother sins against you, go, show him his fault between you and him alone. If he listens to you, you have gained back your brother." },
      { ref: "Romans 12:18", text: "If it is possible, as much as it is up to you, be at peace with all men." },
      { ref: "Ephesians 4:26–27", text: "Be angry, and don't sin. Don't let the sun go down on your wrath, and don't give place to the devil." },
      { ref: "James 1:19", text: "Let every man be swift to hear, slow to speak, and slow to anger." },
      { ref: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
    ],
    cross: ["anger", "forgiveness", "reconciliation"],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    category: "Relationships",
    blurb: "Open table, open home — a New Testament mark of the Church.",
    verses: [
      { ref: "Hebrews 13:2", text: "Don't forget to show hospitality to strangers, for in doing so, some have entertained angels without knowing it." },
      { ref: "Romans 12:13", text: "Contributing to the needs of the saints; given to hospitality." },
      { ref: "1 Peter 4:9", text: "Be hospitable to one another without grumbling." },
      { ref: "Luke 14:13–14", text: "When you make a feast, ask the poor, the maimed, the lame, or the blind; and you will be blessed." },
    ],
    cross: ["generosity"],
  },
  {
    slug: "reconciliation",
    title: "Reconciliation",
    category: "Relationships",
    blurb: "The Father's heart. The Son's work. Now ours to carry.",
    verses: [
      { ref: "2 Corinthians 5:18–20", text: "All things are of God, who reconciled us to himself through Jesus Christ, and gave to us the ministry of reconciliation... We are therefore Christ's ambassadors." },
      { ref: "Matthew 5:23–24", text: "If therefore you are offering your gift at the altar, and there remember that your brother has anything against you, leave your gift there before the altar, and go your way. First be reconciled to your brother, and then come and offer your gift." },
      { ref: "Colossians 1:20", text: "Through him to reconcile all things to himself, by him, whether things on the earth, or things in the heavens, having made peace through the blood of his cross." },
    ],
    cross: ["forgiveness", "conflict"],
  },

  // ─── LIFE (additions) ───
  {
    slug: "wisdom",
    title: "Wisdom",
    category: "Life",
    blurb: "Begins in the fear of the Lord. Found in His Word. Given to those who ask.",
    verses: [
      { ref: "James 1:5", text: "If any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him." },
      { ref: "Proverbs 9:10", text: "The fear of Yahweh is the beginning of wisdom. The knowledge of the Holy One is understanding." },
      { ref: "1 Corinthians 1:30", text: "Because of him, you are in Christ Jesus, who was made to us wisdom from God, and righteousness and sanctification, and redemption." },
      { ref: "Colossians 2:3", text: "In whom are all the treasures of wisdom and knowledge hidden." },
      { ref: "Proverbs 4:7", text: "Wisdom is supreme. Get wisdom. Yes, though it costs all your possessions, get understanding." },
    ],
    cross: ["decisions"],
  },
  {
    slug: "decisions",
    title: "Decisions & guidance",
    category: "Life",
    blurb: "He leads. He has not promised a stadium light — but He has given a lamp.",
    verses: [
      { ref: "Psalm 119:105", text: "Your word is a lamp to my feet, and a light for my path." },
      { ref: "Proverbs 3:5–6", text: "Trust in Yahweh with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight." },
      { ref: "Isaiah 30:21", text: "Your ears will hear a word behind you, saying, 'This is the way. Walk in it,' when you turn to the right hand, and when you turn to the left." },
      { ref: "James 1:5", text: "If any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him." },
      { ref: "Psalm 32:8", text: "I will instruct you and teach you in the way which you shall go. I will counsel you with my eye on you." },
    ],
    cross: ["wisdom", "trust"],
  },
  {
    slug: "self-control",
    title: "Self-control",
    category: "Life",
    blurb: "A fruit of the Spirit. Not your strength — His, growing in you.",
    verses: [
      { ref: "Galatians 5:22–23", text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control." },
      { ref: "2 Timothy 1:7", text: "For God didn't give us a spirit of fear, but of power, love, and self-control." },
      { ref: "1 Corinthians 9:25–27", text: "Every man who strives in the games exercises self-control in all things... I beat my body and bring it into submission." },
      { ref: "Proverbs 25:28", text: "Like a city that is broken down and without walls is a man whose spirit is without restraint." },
      { ref: "Titus 2:11–12", text: "The grace of God has appeared, bringing salvation to all men, instructing us... that we should live soberly, righteously, and godly in this present age." },
    ],
    cross: ["temptation", "lust"],
  },
  {
    slug: "aging",
    title: "Aging",
    category: "Life",
    blurb: "Gray hair is a crown of glory when it is found in the way of righteousness.",
    verses: [
      { ref: "Proverbs 16:31", text: "Gray hair is a crown of glory. It is attained by a life of righteousness." },
      { ref: "Psalm 71:9, 18", text: "Don't reject me in my old age. Don't forsake me when my strength fails... Yes, even when I am old and gray-haired, God, don't forsake me." },
      { ref: "Isaiah 46:4", text: "Even to old age I am he, and even to gray hairs I will carry you. I have made, and I will bear. Yes, I will carry, and will deliver." },
      { ref: "2 Corinthians 4:16", text: "Therefore we don't faint, but though our outward man is decaying, yet our inward man is renewed day by day." },
      { ref: "Psalm 92:14", text: "They will still bring out fruit in old age. They will be full of sap and green." },
    ],
  },
  {
    slug: "death-of-loved-one",
    title: "Death of a loved one",
    category: "Life",
    blurb: "Christians grieve. But not as those who have no hope.",
    verses: [
      { ref: "1 Thessalonians 4:13–14", text: "We don't want you to be ignorant, brothers, concerning those who have fallen asleep, so that you don't grieve like the rest, who have no hope. For if we believe that Jesus died and rose again, even so God will bring with him those who have fallen asleep in Jesus." },
      { ref: "John 11:25–26", text: "I am the resurrection and the life. He who believes in me will still live, even if he dies. Whoever lives and believes in me will never die." },
      { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more." },
      { ref: "Psalm 23:4", text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me." },
      { ref: "2 Corinthians 5:8", text: "We are courageous, I say, and are willing rather to be absent from the body, and to be at home with the Lord." },
    ],
    cross: ["grief", "hope", "resurrection"],
  },

  // ─── TRIAL (additions) ───
  {
    slug: "persecution",
    title: "Persecution",
    category: "Trial",
    blurb: "Promised by Christ. Not borne alone. Counted blessed.",
    verses: [
      { ref: "Matthew 5:10–12", text: "Blessed are those who have been persecuted for righteousness' sake, for theirs is the Kingdom of Heaven... Rejoice, and be exceedingly glad, for great is your reward in heaven." },
      { ref: "2 Timothy 3:12", text: "Yes, and all who desire to live godly in Christ Jesus will suffer persecution." },
      { ref: "John 15:18–20", text: "If the world hates you, you know that it has hated me before it hated you... A servant is not greater than his lord. If they persecuted me, they will also persecute you." },
      { ref: "Romans 8:35–37", text: "Who shall separate us from the love of Christ? Could oppression, or anguish, or persecution... No, in all these things, we are more than conquerors through him who loved us." },
      { ref: "Hebrews 13:3", text: "Remember the prisoners, as if you were bound with them; and those who are mistreated, since you are also in the body." },
    ],
    cross: ["suffering"],
  },
  {
    slug: "sleeplessness",
    title: "Sleeplessness",
    category: "Trial",
    blurb: "He gives sleep to His beloved. When He does not, He gives Himself.",
    verses: [
      { ref: "Psalm 127:2", text: "It is vain for you to rise up early, to stay up late, eating the bread of toil; for he gives sleep to his loved ones." },
      { ref: "Psalm 4:8", text: "In peace I will both lay myself down and sleep, for you, Yahweh alone, make me live in safety." },
      { ref: "Psalm 63:6", text: "When I remember you on my bed, and think about you in the night watches." },
      { ref: "Psalm 121:3–4", text: "He who keeps you will not slumber. Behold, he who keeps Israel will neither slumber nor sleep." },
      { ref: "Proverbs 3:24", text: "When you lie down, you will not be afraid. Yes, you will lie down, and your sleep will be sweet." },
    ],
  },
  {
    slug: "depression",
    title: "Depression",
    category: "Trial",
    blurb: "The Psalms know it by name. The Spirit prays through it. The Lord meets us in it.",
    verses: [
      { ref: "Psalm 42:5", text: "Why are you in despair, my soul? Why are you disturbed within me? Hope in God! For I shall still praise him for the saving help of his presence." },
      { ref: "Psalm 34:18", text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit." },
      { ref: "2 Corinthians 1:8–9", text: "We were weighed down exceedingly, beyond our power, so much that we despaired even of life... that we should not trust in ourselves, but in God who raises the dead." },
      { ref: "Lamentations 3:19–23", text: "Remember my affliction and my misery, the wormwood and the gall... It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail. They are new every morning. Great is your faithfulness." },
      { ref: "1 Kings 19:5–7", text: "He lay down and slept under a juniper tree; and behold, an angel touched him, and said to him, 'Arise and eat.'" },
    ],
    cross: ["grief", "discouragement", "burnout"],
  },
  {
    slug: "when-god-is-silent",
    title: "When God seems silent",
    category: "Trial",
    blurb: "The hardest test of faith. The Psalms model the prayer.",
    verses: [
      { ref: "Psalm 13:1–2", text: "How long, Yahweh? Will you forget me forever? How long will you hide your face from me? How long shall I take counsel in my soul, having sorrow in my heart every day?" },
      { ref: "Psalm 22:1–2", text: "My God, my God, why have you forsaken me? Why are you so far from helping me, and from the words of my groaning?" },
      { ref: "Habakkuk 1:2–4", text: "Yahweh, how long will I cry, and you will not hear? I cry out to you 'Violence!' and will you not save?" },
      { ref: "Isaiah 50:10", text: "Who among you fears Yahweh and obeys the voice of his servant? He who walks in darkness and has no light, let him trust in Yahweh's name, and rely on his God." },
      { ref: "Hebrews 13:5", text: "He has said, 'I will in no way leave you, neither will I in any way forsake you.'" },
    ],
    cross: ["doubt", "depression"],
  },
  {
    slug: "burnout",
    title: "Burnout",
    category: "Trial",
    blurb: "Even Elijah collapsed under a juniper tree. The Lord did not rebuke him.",
    verses: [
      { ref: "Matthew 11:28–30", text: "Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and lowly in heart; and you will find rest for your souls. For my yoke is easy, and my burden is light." },
      { ref: "Exodus 33:14", text: "He said, 'My presence will go with you, and I will give you rest.'" },
      { ref: "Mark 6:31", text: "He said to them, 'Come away into a deserted place, and rest awhile.'" },
      { ref: "Isaiah 40:29–31", text: "He gives power to the weak. He increases the strength of him who has no might. Even the youths faint and get weary... but those who wait for Yahweh will renew their strength." },
      { ref: "Psalm 23:2–3", text: "He makes me lie down in green pastures. He leads me beside still waters. He restores my soul." },
    ],
    cross: ["discouragement", "depression"],
  },

  // ─── DOCTRINE (additions) ───
  {
    slug: "father",
    title: "God the Father",
    category: "Doctrine",
    blurb: "The first Person of the Trinity, and the model Jesus gave us for every prayer.",
    verses: [
      { ref: "Matthew 6:9", text: "Pray like this: 'Our Father in heaven, may your name be kept holy.'" },
      { ref: "1 John 3:1", text: "Behold, how great a love the Father has bestowed on us, that we should be called children of God!" },
      { ref: "Luke 15:20", text: "He arose, and came to his father. But while he was still far off, his father saw him, and was moved with compassion, and ran, and fell on his neck, and kissed him." },
      { ref: "James 1:17", text: "Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom can be no variation, nor turning shadow." },
      { ref: "Ephesians 1:3", text: "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ." },
    ],
    cross: ["trinity"],
  },
  {
    slug: "creation",
    title: "Creation",
    category: "Doctrine",
    blurb: "Made by Him, through Him, for Him. Declared very good.",
    verses: [
      { ref: "Genesis 1:1, 31", text: "In the beginning, God created the heavens and the earth... God saw everything that he had made, and, behold, it was very good." },
      { ref: "John 1:3", text: "All things were made through him. Without him, nothing was made that has been made." },
      { ref: "Colossians 1:16", text: "For by him all things were created, in the heavens and on the earth, things visible and things invisible... All things have been created through him and for him." },
      { ref: "Psalm 19:1", text: "The heavens declare the glory of God. The expanse shows his handiwork." },
      { ref: "Romans 1:20", text: "His invisible attributes are clearly seen, being perceived through the things that are made, even his everlasting power and divinity." },
    ],
  },
  {
    slug: "prayer",
    title: "Prayer",
    category: "Doctrine",
    blurb: "The child's conversation with the Father. Continual. Plain. Heard.",
    verses: [
      { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
      { ref: "Philippians 4:6", text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God." },
      { ref: "Matthew 7:7–8", text: "Ask, and it will be given you. Seek, and you will find. Knock, and it will be opened for you." },
      { ref: "James 5:16", text: "The insistent prayer of a righteous person is powerfully effective." },
      { ref: "Hebrews 4:16", text: "Let's therefore draw near with boldness to the throne of grace, that we may receive mercy, and may find grace for help in time of need." },
    ],
  },
  {
    slug: "faith",
    title: "Faith",
    category: "Doctrine",
    blurb: "Confidence in what God has said. The hinge of the Christian life.",
    verses: [
      { ref: "Hebrews 11:1", text: "Now faith is assurance of things hoped for, proof of things not seen." },
      { ref: "Hebrews 11:6", text: "Without faith it is impossible to be well pleasing to him, for he who comes to God must believe that he exists, and that he is a rewarder of those who seek him." },
      { ref: "Romans 10:17", text: "So faith comes by hearing, and hearing by the word of God." },
      { ref: "Ephesians 2:8–9", text: "By grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast." },
      { ref: "Galatians 2:20", text: "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. That life which I now live in the flesh, I live by faith in the Son of God." },
    ],
    cross: ["trust", "salvation"],
  },
  {
    slug: "repentance",
    title: "Repentance",
    category: "Doctrine",
    blurb: "Not punishment. A turning home, made joyful by grace.",
    verses: [
      { ref: "Acts 3:19", text: "Repent therefore, and turn again, that your sins may be blotted out, so that there may come times of refreshing from the presence of the Lord." },
      { ref: "2 Corinthians 7:10", text: "Godly sorrow produces repentance leading to salvation, which brings no regret. But the sorrow of the world produces death." },
      { ref: "Luke 15:7", text: "There will be more joy in heaven over one sinner who repents, than over ninety-nine righteous people who need no repentance." },
      { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness." },
      { ref: "Joel 2:13", text: "Tear your heart, and not your garments, and turn to Yahweh, your God; for he is gracious and merciful, slow to anger, and abundant in loving kindness." },
    ],
    cross: ["forgiveness"],
  },
  {
    slug: "sanctification",
    title: "Sanctification",
    category: "Doctrine",
    blurb: "Being made like Christ — slowly, surely, by the Spirit.",
    verses: [
      { ref: "1 Thessalonians 4:3", text: "For this is the will of God: your sanctification." },
      { ref: "Philippians 2:12–13", text: "Work out your own salvation with fear and trembling. For it is God who works in you both to will and to work, for his good pleasure." },
      { ref: "2 Corinthians 3:18", text: "We all, with unveiled face seeing the glory of the Lord as in a mirror, are transformed into the same image from glory to glory, even as from the Lord, the Spirit." },
      { ref: "Romans 12:2", text: "Don't be conformed to this world, but be transformed by the renewing of your mind." },
      { ref: "Hebrews 12:14", text: "Follow after peace with all men, and the sanctification without which no man will see the Lord." },
    ],
    cross: ["holy-spirit"],
  },
  {
    slug: "church",
    title: "The Church",
    category: "Doctrine",
    blurb: "Christ's Body. Universal and local. Built by Him; gathered for Him.",
    verses: [
      { ref: "Matthew 16:18", text: "I tell you that you are Peter, and on this rock I will build my assembly, and the gates of Hades will not prevail against it." },
      { ref: "Acts 2:42", text: "They continued steadfastly in the apostles' teaching and fellowship, in the breaking of bread, and prayer." },
      { ref: "Ephesians 5:25–27", text: "Husbands, love your wives, even as Christ also loved the assembly, and gave himself up for it; that he might sanctify it... that he might present the assembly to himself gloriously, not having spot or wrinkle." },
      { ref: "Hebrews 10:24–25", text: "Let's consider how to provoke one another to love and good works, not forsaking our own assembling together." },
      { ref: "1 Peter 2:9", text: "But you are a chosen race, a royal priesthood, a holy nation, a people for God's own possession." },
    ],
    cross: ["unity"],
  },

  // ─── MISSION (additions) ───
  {
    slug: "great-commission",
    title: "The Great Commission",
    category: "Mission",
    blurb: "Christ's last spoken word to His Church. The marching order until He returns.",
    verses: [
      { ref: "Matthew 28:18–20", text: "All authority has been given to me in heaven and on earth. Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I commanded you. Behold, I am with you always, even to the end of the age." },
      { ref: "Mark 16:15", text: "Go into all the world, and preach the Good News to the whole creation." },
      { ref: "Acts 1:8", text: "You will receive power when the Holy Spirit has come upon you. You will be witnesses to me in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth." },
      { ref: "Romans 10:14–15", text: "How then will they call on him in whom they have not believed? How will they believe in him whom they have not heard? And how will they hear without a preacher?" },
      { ref: "Revelation 7:9", text: "A great multitude, which no man could count, out of every nation and of all tribes, peoples, and languages, standing before the throne and before the Lamb." },
    ],
    cross: ["evangelism", "persecuted-church"],
  },
  {
    slug: "persecuted-church",
    title: "The persecuted Church",
    category: "Mission",
    blurb: "Remember them as if chained with them. 365 million believers under high persecution.",
    verses: [
      { ref: "Hebrews 13:3", text: "Remember the prisoners, as if you were bound with them; and those who are mistreated, since you are also in the body." },
      { ref: "Matthew 5:10–12", text: "Blessed are those who have been persecuted for righteousness' sake, for theirs is the Kingdom of Heaven... Rejoice, and be exceedingly glad, for great is your reward in heaven." },
      { ref: "1 Corinthians 12:26", text: "When one member suffers, all the members suffer with it. When one member is honored, all the members rejoice with it." },
      { ref: "Revelation 6:9–11", text: "I saw underneath the altar the souls of those who had been killed for the word of God, and for the testimony of the Lamb which they had." },
      { ref: "2 Thessalonians 3:1–2", text: "Pray for us, that the word of the Lord may spread rapidly and be glorified... and that we may be delivered from unreasonable and evil men." },
    ],
    cross: ["persecution", "great-commission"],
  },
  {
    slug: "generosity",
    title: "Generosity",
    category: "Mission",
    blurb: "Open hands are a mark of the redeemed. The poor are God's particular concern.",
    verses: [
      { ref: "2 Corinthians 9:7", text: "Let each man give according as he has determined in his heart; not grudgingly, or under compulsion; for God loves a cheerful giver." },
      { ref: "Acts 20:35", text: "Remember the words of the Lord Jesus, that he himself said, 'It is more blessed to give than to receive.'" },
      { ref: "Proverbs 19:17", text: "He who has pity on the poor lends to Yahweh; he will reward him." },
      { ref: "Luke 6:38", text: "Give, and it will be given to you: good measure, pressed down, shaken together, and running over." },
      { ref: "1 Timothy 6:18–19", text: "That they do good, that they be rich in good works, that they be ready to distribute, willing to share." },
    ],
    cross: ["money"],
  },
  {
    slug: "discipleship",
    title: "Making disciples",
    category: "Mission",
    blurb: "Not converts only. Followers — taught to obey everything Jesus commanded.",
    verses: [
      { ref: "Matthew 28:19–20", text: "Make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I commanded you." },
      { ref: "2 Timothy 2:2", text: "The things which you have heard from me among many witnesses, commit the same things to faithful men, who will be able to teach others also." },
      { ref: "Titus 2:3–5", text: "Teach the older women... that they may train the younger women to love their husbands, to love their children, to be sober minded, chaste, workers at home, kind, being in subjection to their own husbands." },
      { ref: "1 Thessalonians 2:8", text: "Even so, being affectionately desirous of you, we were well pleased to impart to you, not the Good News of God only, but also our own souls, because you had become very dear to us." },
      { ref: "Acts 11:26", text: "It happened, that for a whole year they were gathered together with the assembly, and taught many people." },
    ],
    cross: ["great-commission", "evangelism"],
  },
];

export const CATEGORIES = ["Heart", "Relationships", "Life", "Trial", "Doctrine", "Mission"] as const;
