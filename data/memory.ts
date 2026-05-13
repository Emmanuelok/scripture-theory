// Scripture Memory — a curated set of well-loved verses that have shaped the
// Church across centuries. Every text below is from the World English Bible
// (WEB, public domain). Hand-verified against the published WEB edition;
// never machine-translated.

export type Theme =
  | "jesus"
  | "gospel"
  | "father"
  | "spirit"
  | "discipleship"
  | "prayer"
  | "comfort"
  | "wisdom"
  | "mission"
  | "love";

export const themeLabels: Record<Theme, string> = {
  jesus: "Jesus",
  gospel: "The Gospel",
  father: "The Father",
  spirit: "The Spirit",
  discipleship: "Discipleship",
  prayer: "Prayer",
  comfort: "Comfort",
  wisdom: "Wisdom",
  mission: "Mission",
  love: "Love",
};

export type MemoryVerse = {
  id: string;
  ref: string;
  text: string;
  translation: "WEB";
  theme: Theme;
  why: string;
};

export const memoryVerses: MemoryVerse[] = [
  // — JESUS —
  {
    id: "john-1-1",
    ref: "John 1:1",
    translation: "WEB",
    theme: "jesus",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    why: "The foundation of every Christian confession of Christ: He is eternal, He is with the Father, He is God.",
  },
  {
    id: "john-1-14",
    ref: "John 1:14",
    translation: "WEB",
    theme: "jesus",
    text: "The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.",
    why: "The Incarnation in a single sentence. The God who is became the man who moved into the neighborhood.",
  },
  {
    id: "john-14-6",
    ref: "John 14:6",
    translation: "WEB",
    theme: "jesus",
    text: "Jesus said to him, \"I am the way, the truth, and the life. No one comes to the Father, except through me.\"",
    why: "The Lord's own claim, in His own voice. Carry it with gentleness and fear.",
  },
  {
    id: "hebrews-13-8",
    ref: "Hebrews 13:8",
    translation: "WEB",
    theme: "jesus",
    text: "Jesus Christ is the same yesterday, today, and forever.",
    why: "Twelve words that anchor every changing season to the unchanging Christ.",
  },
  {
    id: "philippians-2-9-11",
    ref: "Philippians 2:9–11",
    translation: "WEB",
    theme: "jesus",
    text: "Therefore God also highly exalted him, and gave to him the name which is above every name; that at the name of Jesus every knee should bow, of those in heaven, those on earth, and those under the earth, and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.",
    why: "How history ends: every knee. Memorize this and the world looks different.",
  },

  // — THE GOSPEL —
  {
    id: "john-3-16",
    ref: "John 3:16",
    translation: "WEB",
    theme: "gospel",
    text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.",
    why: "The Gospel in one sentence from Jesus' own mouth.",
  },
  {
    id: "romans-6-23",
    ref: "Romans 6:23",
    translation: "WEB",
    theme: "gospel",
    text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.",
    why: "The wage you earn next to the gift you receive. The Gospel in one verse.",
  },
  {
    id: "romans-5-8",
    ref: "Romans 5:8",
    translation: "WEB",
    theme: "gospel",
    text: "But God commends his own love toward us, in that while we were yet sinners, Christ died for us.",
    why: "Not for the worthy — for sinners. Hold this verse against any voice that says God's love must be earned.",
  },
  {
    id: "ephesians-2-8-9",
    ref: "Ephesians 2:8–9",
    translation: "WEB",
    theme: "gospel",
    text: "for by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast.",
    why: "Grace. Faith. Gift. Not works. Read it slowly before every sermon you preach to yourself.",
  },
  {
    id: "romans-10-9",
    ref: "Romans 10:9",
    translation: "WEB",
    theme: "gospel",
    text: "that if you will confess with your mouth that Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved.",
    why: "The simplest confession of saving faith. Memorize it to share it.",
  },
  {
    id: "2-corinthians-5-17",
    ref: "2 Corinthians 5:17",
    translation: "WEB",
    theme: "gospel",
    text: "Therefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new.",
    why: "Who you are now. Not who you used to be. Not who you fear you might become. Now.",
  },
  {
    id: "1-john-1-9",
    ref: "1 John 1:9",
    translation: "WEB",
    theme: "gospel",
    text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.",
    why: "For every Christian still learning to bring their sins back into the light.",
  },

  // — THE FATHER —
  {
    id: "psalm-23-1",
    ref: "Psalm 23:1",
    translation: "WEB",
    theme: "father",
    text: "Yahweh is my shepherd; I shall lack nothing.",
    why: "Six words. A whole posture of trust.",
  },
  {
    id: "psalm-46-1",
    ref: "Psalm 46:1",
    translation: "WEB",
    theme: "father",
    text: "God is our refuge and strength, a very present help in trouble.",
    why: "Carry this verse into every hard hour.",
  },
  {
    id: "jeremiah-29-11",
    ref: "Jeremiah 29:11",
    translation: "WEB",
    theme: "father",
    text: "For I know the thoughts that I think toward you, says Yahweh, thoughts of peace, and not of evil, to give you hope and a future.",
    why: "Spoken first to exiles. Still spoken to anyone who feels far from home.",
  },
  {
    id: "isaiah-41-10",
    ref: "Isaiah 41:10",
    translation: "WEB",
    theme: "father",
    text: "Don't you be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.",
    why: "Fear's most-cited cure in the whole Bible.",
  },

  // — THE SPIRIT —
  {
    id: "galatians-5-22-23",
    ref: "Galatians 5:22–23",
    translation: "WEB",
    theme: "spirit",
    text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control. Against such things there is no law.",
    why: "The portrait of a Spirit-filled life. Memorize it. Pray it over yourself.",
  },
  {
    id: "acts-1-8",
    ref: "Acts 1:8",
    translation: "WEB",
    theme: "spirit",
    text: "But you will receive power when the Holy Spirit has come upon you. You will be witnesses to me in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth.",
    why: "The Lord's last word before His ascension. The Church's marching orders.",
  },

  // — DISCIPLESHIP —
  {
    id: "matthew-28-19-20",
    ref: "Matthew 28:19–20",
    translation: "WEB",
    theme: "discipleship",
    text: "Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I commanded you. Behold, I am with you always, even to the end of the age.",
    why: "The Great Commission. Every disciple is a maker of disciples.",
  },
  {
    id: "galatians-2-20",
    ref: "Galatians 2:20",
    translation: "WEB",
    theme: "discipleship",
    text: "I have been crucified with Christ, and it is no longer I who live, but Christ lives in me. That life which I now live in the flesh, I live by faith in the Son of God, who loved me, and gave himself up for me.",
    why: "Paul's autobiography in one verse. Make it yours.",
  },
  {
    id: "luke-9-23",
    ref: "Luke 9:23",
    translation: "WEB",
    theme: "discipleship",
    text: "If anyone desires to come after me, let him deny himself, take up his cross, and follow me.",
    why: "Costly grace. The Lord's terms, not ours.",
  },
  {
    id: "romans-12-1-2",
    ref: "Romans 12:1–2",
    translation: "WEB",
    theme: "discipleship",
    text: "Therefore I urge you, brothers, by the mercies of God, to present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service. Don't be conformed to this world, but be transformed by the renewing of your mind.",
    why: "How the disciple is shaped: a body offered, a mind renewed.",
  },

  // — PRAYER —
  {
    id: "philippians-4-6-7",
    ref: "Philippians 4:6–7",
    translation: "WEB",
    theme: "prayer",
    text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.",
    why: "The antidote to anxiety, written in chains by Paul.",
  },
  {
    id: "1-thessalonians-5-16-18",
    ref: "1 Thessalonians 5:16–18",
    translation: "WEB",
    theme: "prayer",
    text: "Rejoice always. Pray without ceasing. In everything give thanks, for this is the will of God in Christ Jesus toward you.",
    why: "Three commands you can obey today. Twelve words to live by.",
  },

  // — COMFORT —
  {
    id: "romans-8-28",
    ref: "Romans 8:28",
    translation: "WEB",
    theme: "comfort",
    text: "We know that all things work together for good for those who love God, to those who are called according to his purpose.",
    why: "Not 'all things are good,' but 'all things work together for good.' Hold this in the dark.",
  },
  {
    id: "romans-8-38-39",
    ref: "Romans 8:38–39",
    translation: "WEB",
    theme: "comfort",
    text: "For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other created thing will be able to separate us from God's love which is in Christ Jesus our Lord.",
    why: "Memorize this against every voice that whispers you have lost His love.",
  },
  {
    id: "john-14-27",
    ref: "John 14:27",
    translation: "WEB",
    theme: "comfort",
    text: "Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don't let your heart be troubled, neither let it be fearful.",
    why: "Jesus' gift in His own voice, on the night He was betrayed.",
  },

  // — WISDOM —
  {
    id: "proverbs-3-5-6",
    ref: "Proverbs 3:5–6",
    translation: "WEB",
    theme: "wisdom",
    text: "Trust in Yahweh with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight.",
    why: "The pivot of every decision.",
  },
  {
    id: "psalm-119-105",
    ref: "Psalm 119:105",
    translation: "WEB",
    theme: "wisdom",
    text: "Your word is a lamp to my feet, and a light for my path.",
    why: "Just enough light for the next step. That's how God leads.",
  },
  {
    id: "2-timothy-3-16-17",
    ref: "2 Timothy 3:16–17",
    translation: "WEB",
    theme: "wisdom",
    text: "Every Scripture is God-breathed and profitable for teaching, for reproof, for correction, and for instruction in righteousness, that each person who belongs to God may be complete, thoroughly equipped for every good work.",
    why: "Why we open the Bible. All of it. Every day.",
  },

  // — LOVE —
  {
    id: "john-13-34-35",
    ref: "John 13:34–35",
    translation: "WEB",
    theme: "love",
    text: "A new commandment I give to you, that you love one another, just as I have loved you, that you also love one another. By this everyone will know that you are my disciples, if you have love for one another.",
    why: "The badge by which the world knows we are His. Not arguments. Love.",
  },
  {
    id: "1-corinthians-13-4-7",
    ref: "1 Corinthians 13:4–7",
    translation: "WEB",
    theme: "love",
    text: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud, doesn't behave itself inappropriately, doesn't seek its own way, is not provoked, takes no account of evil; doesn't rejoice in unrighteousness, but rejoices with the truth; bears all things, believes all things, hopes all things, endures all things.",
    why: "The portrait that exposes us and re-shapes us.",
  },

  // — MISSION —
  {
    id: "1-peter-3-15",
    ref: "1 Peter 3:15",
    translation: "WEB",
    theme: "mission",
    text: "But sanctify the Lord God in your hearts; and always be ready to give an answer to everyone who asks you a reason concerning the hope that is in you, with humility and fear.",
    why: "Ready, but humble. Honest, but gentle. The shape of every faithful witness.",
  },
  {
    id: "romans-1-16",
    ref: "Romans 1:16",
    translation: "WEB",
    theme: "mission",
    text: "For I am not ashamed of the Good News of Christ, for it is the power of God for salvation for everyone who believes; for the Jew first, and also for the Greek.",
    why: "Memorize this against every temptation to hide what you have been given.",
  },
];

export function findVerse(id: string) {
  return memoryVerses.find((v) => v.id === id);
}

// Verse of the week — rotates Mondays, deterministic by ISO week number.
export function thisWeeksVerse(d = new Date()): MemoryVerse {
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  const here = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const dayOfYear = Math.floor((here - start) / 86400000);
  const weekNum = Math.floor(dayOfYear / 7);
  return memoryVerses[weekNum % memoryVerses.length];
}
