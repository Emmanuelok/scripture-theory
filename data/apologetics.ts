// ─── Apologetics — when challenged ─────────────────────────────
// "Always be ready to give a defense to everyone who asks you a reason
// for the hope that is in you, with meekness and fear." — 1 Peter 3:15
//
// These are not debate scripts. They are short, honest answers — for the
// believer who is asked, for the seeker who is asking. Built on Scripture,
// Christian tradition, and reasonable engagement. Apologetics is in the
// service of love, never as a weapon.

export type Topic = "god" | "bible" | "jesus" | "evil" | "science" | "other" | "hard";

export type ApolQA = {
  id: string;
  topic: Topic;
  question: string;
  oneLine: string;     // very short summary
  answer: string[];    // paragraphs
  scripture: string[]; // refs
  furtherReading?: string[];
};

export const topicInfo: Record<Topic, { label: string; sub: string }> = {
  god: { label: "Does God exist?", sub: "Reasons and witness" },
  bible: { label: "The Bible", sub: "Reliability, authority, contradictions" },
  jesus: { label: "Jesus", sub: "Resurrection, deity, the cross" },
  evil: { label: "Suffering & evil", sub: "If God is good and powerful…" },
  science: { label: "Science & faith", sub: "Origins, miracles, evolution" },
  other: { label: "Other religions", sub: "Pluralism and conversion" },
  hard: { label: "Hard sayings", sub: "Hell, sexuality, judgment, wrath" },
};

export const apologeticsPosture = {
  title: "Posture before content.",
  body: [
    "You will not argue anyone into the kingdom. You may, by the Spirit's help, remove an obstacle. Most people who have intellectual questions are also working through wounds — from the church, from a parent, from a culture that has lied to them. Listen first.",
    "1 Peter 3:15 says to be ready — with meekness and fear. Meekness toward them. Fear before the Lord. Never weaponize an answer. Win the soul, not the argument.",
    "If you do not know — say so. 'I don't know, but I'll find out.' Honesty respects the questioner and the truth more than a guess.",
  ],
};

export const apologetics: ApolQA[] = [
  {
    id: "god-exists",
    topic: "god",
    question: "Does God exist?",
    oneLine: "The universe began, is finely tuned, contains conscious moral beings, and gave us Jesus Christ. The atheist owes an explanation for all four.",
    answer: [
      "Four pointers, each worth a lifetime of thought:",
      "(1) The universe began (the Big Bang). Anything that begins has a cause. The cause of the universe must be outside the universe — non-physical, timeless, immensely powerful, and personal (only persons originate things).",
      "(2) The universe is finely tuned. Dozens of constants must be exquisitely precise for any life to exist. Either we won an incomprehensible lottery, or it was set up.",
      "(3) We have moral intuitions that bind us — that cruelty is wrong, that children matter, that justice is real. If there is no moral lawgiver, those intuitions are evolved fictions; but we cannot live as if they are.",
      "(4) And then there is Jesus — a historical figure whose followers, within a generation, were dying to say He had been raised. None of the alternative explanations (hallucination, conspiracy, legend) hold under scrutiny.",
      "These do not prove God by themselves. Together they make the Christian claim a reasonable, even compelling, answer.",
    ],
    scripture: ["Romans 1:19-20", "Psalm 19:1-4", "Acts 17:24-28"],
  },
  {
    id: "bible-reliable",
    topic: "bible",
    question: "Is the Bible reliable?",
    oneLine: "The New Testament is the best-attested ancient document by orders of magnitude, and the Old Testament's transmission is corroborated by Dead Sea Scrolls and ancient versions.",
    answer: [
      "For the New Testament: we have over 5,800 Greek manuscripts and many thousands more in Latin, Syriac, Coptic, etc. The earliest are within decades of the originals. By contrast, our best Greek classical authors survive in dozens of manuscripts copied centuries later.",
      "For the Old Testament: the Dead Sea Scrolls (1947) gave us copies a thousand years older than what scribes had preserved — and the text was almost identical. The transmission was real and careful.",
      "Variants exist (about 400,000 in the NT manuscripts), but the vast majority are spelling, word order, and minor differences. No major Christian doctrine rests on a disputed text.",
      "The Bible is a library — 66 books, three languages, 40+ authors, over 1500 years. It is also the most-attacked, most-translated, most-printed book in history, and it has kept its shape.",
    ],
    scripture: ["2 Timothy 3:16", "Isaiah 40:8", "1 Peter 1:25"],
  },
  {
    id: "bible-contradictions",
    topic: "bible",
    question: "Doesn't the Bible contradict itself?",
    oneLine: "Almost all alleged contradictions resolve under careful reading — and the diversity of voices is a strength, not a flaw.",
    answer: [
      "Most 'contradictions' come from comparing two accounts of the same event written by different authors with different purposes — like four newspapers covering the same press conference. Differences in detail are signs of independent witness, not error.",
      "Some take real work to resolve. Did Judas hang himself (Matt 27:5) or fall and burst open (Acts 1:18)? Likely both — he hanged himself and the body later fell. Both accounts focus on what they want to emphasize.",
      "The Bible's diversity — 66 books across genres and centuries — is part of its power. It tells one story with many voices, like a chorus, not a soloist.",
      "If you find a contradiction that troubles you, look it up. Christians have wrestled with these for 2,000 years. There are reasonable answers. There may also be a few we will not solve this side of glory. That does not undo the whole.",
    ],
    scripture: ["John 21:25", "2 Peter 1:20-21"],
  },
  {
    id: "jesus-rose",
    topic: "jesus",
    question: "Did Jesus rise from the dead?",
    oneLine: "Within a generation of His death, His followers were dying to say He rose. The alternative explanations all fail.",
    answer: [
      "Almost all historians of antiquity grant several facts: Jesus died by Roman crucifixion. His tomb was found empty by women. His disciples sincerely believed they had seen Him alive. Within a few years the movement was already preaching this in Jerusalem itself — where the body could have been produced.",
      "Hallucination? Mass hallucinations of the kind required do not occur. Group hallucinations of physical interaction, conversation, and meals are unknown.",
      "Stolen body? By whom? The disciples were terrified and scattered. The Jewish authorities would have produced the body to end the movement. The Romans had no reason.",
      "Legend over time? The proclamation began immediately. Paul records an early creed (1 Cor 15:3-7) traceable within five years of the event.",
      "The simplest explanation, given the evidence, is what the witnesses said: God raised Him.",
    ],
    scripture: ["1 Corinthians 15:3-8", "Acts 2:32", "Romans 10:9"],
  },
  {
    id: "jesus-deity",
    topic: "jesus",
    question: "Did Jesus claim to be God?",
    oneLine: "Yes — by His own statements, His authority over the law and sin, the worship He received, and the names He claimed.",
    answer: [
      "He forgave sins (Mark 2:5-12). Only God can do that.",
      "He accepted worship (Matt 14:33, John 9:38, Matt 28:9). A faithful Jew would have refused.",
      "He claimed the divine name 'I AM' from Exodus 3:14 (John 8:58) — and they took up stones to kill Him for blasphemy.",
      "He claimed authority over the Sabbath (Mark 2:28) which Yahweh gave.",
      "He said, 'Before Abraham was, I AM' and 'I and the Father are one' (John 10:30).",
      "The earliest creed of the church — within years of His death — confessed Him as Lord (Phil 2:5-11). Either He claimed it and is who He said, or He claimed it and was a fraud or a madman. Liar, lunatic, or Lord — but not merely a good teacher.",
    ],
    scripture: ["John 8:58", "Mark 14:61-62", "Hebrews 1:8"],
  },
  {
    id: "evil-suffering",
    topic: "evil",
    question: "If God is good and powerful, why is there so much evil and suffering?",
    oneLine: "The cross is the Christian answer — God Himself enters the suffering, defeats it from inside, and promises a day when every tear will be wiped away.",
    answer: [
      "Other worldviews avoid the question by denying either God's goodness, His power, or the reality of evil. Christianity affirms all three — and meets the contradiction at the cross.",
      "God did not create evil; He created a good world (Gen 1:31). Evil entered through the willful rebellion of His creatures, beginning with us. He could have prevented it only by removing the freedom that makes love possible.",
      "But He did not stay distant. He came. He suffered in His own flesh worse than any of us has, and rose to begin the unmaking of evil from the inside.",
      "We are not yet at the end of the story. He has promised: no more death, no more crying, no more pain (Rev 21:4). Every wound will be answered. Every tear, kept and remembered (Ps 56:8).",
      "If you are in suffering right now: the right thing is not an argument but a lament. Open the /lament walk.",
    ],
    scripture: ["Romans 8:18-23", "Revelation 21:4", "John 11:35"],
  },
  {
    id: "science-faith",
    topic: "science",
    question: "Hasn't science disproven God?",
    oneLine: "No. Modern science arose from the Christian assumption that the universe is orderly and knowable. The categories are different.",
    answer: [
      "Science describes how the universe behaves. The Christian claim is about who made it and what it is for. Asking whether God exists by doing chemistry is like asking what a book means by analyzing the ink.",
      "Modern science was largely born in the Christian West — by believers like Kepler, Galileo, Newton, Pascal, Faraday, Maxwell, Mendel, Lemaître — who assumed the universe was orderly because a rational God made it.",
      "Many of the leading scientists today are Christians. Francis Collins (head of the Human Genome Project, then NIH director) is one example. Christianity and science are not enemies; they are different ways of knowing the same world.",
      "On evolution specifically — Christians hold a range of views (young-earth, old-earth, evolutionary creation). What we share is that the world is God's, that Adam fell, that Christ has come, and that creation has a Creator who is also a Father.",
    ],
    scripture: ["Psalm 19:1", "Colossians 1:16-17", "Hebrews 1:3"],
  },
  {
    id: "other-religions",
    topic: "other",
    question: "Aren't all religions basically the same?",
    oneLine: "No. They make contradictory claims about who God is, what is wrong with us, and what fixes it. They cannot all be right.",
    answer: [
      "Islam denies the Trinity, the deity of Christ, and the crucifixion. Buddhism denies a personal God. Hinduism affirms many gods and reincarnation. Judaism denies that Jesus is Messiah. Christianity affirms all of those things the others deny.",
      "They share some moral common ground — that is the image of God in every human (Rom 2:14-15). But they answer the core questions differently and they cannot all be right at the same time.",
      "Jesus said, 'I am the way, and the truth, and the life. No one comes to the Father except through Me' (John 14:6). That is either an arrogant lie, a tragic mistake, or the most important sentence ever spoken.",
      "Christians are not those who think non-Christians are stupid or evil. We are those who believe Christ is the unique Savior — and so we love and pray for our neighbors of every faith, that they would meet Him as we have.",
    ],
    scripture: ["John 14:6", "Acts 4:12", "1 Timothy 2:5"],
  },
  {
    id: "hell",
    topic: "hard",
    question: "How can a loving God send people to hell?",
    oneLine: "God does not delight in sending people away — but love that respects freedom must allow refusal. Hell is the door locked from the inside.",
    answer: [
      "Jesus spoke about hell more than anyone else in Scripture. He took it with utmost seriousness — and so we must.",
      "Hell is not a chamber of horrors God designed to torture His enemies. It is the final and ratified absence of God for those who, having met His mercy, have refused it. C. S. Lewis: the doors of hell are locked from the inside.",
      "God does not 'send' anyone in the way we picture. He confirms a choice already made — to remain self-sovereign rather than receive Him. Even now He pleads (2 Pet 3:9): 'not willing that any should perish.'",
      "If you find hell hard, you are in good company. So have all the saints. The Christian holds two things at once: God's perfect justice and His perfect love met at the cross. He has done everything to keep us out of it. He has died.",
    ],
    scripture: ["2 Peter 3:9", "John 3:16-17", "Matthew 25:41-46"],
  },
  {
    id: "sexuality",
    topic: "hard",
    question: "Why does Christianity teach what it does about sexuality?",
    oneLine: "Because sex is a sacred sign of Christ and His Church — not a private hobby — and the Bible's teaching, costly as it is, has been consistent for 2,000 years.",
    answer: [
      "Scripture teaches that sex belongs in covenant marriage between one man and one woman, for a lifetime (Gen 2:24, Matt 19:4-6). It calls every other sexual expression — including those of heterosexual people outside of marriage — sin.",
      "This is not a hatred of the body or of pleasure. It is the opposite. The Bible says sex is so weighty that it images the union of Christ with His Bride (Eph 5:31-32). To bend the sign breaks the meaning.",
      "Every believer is asked to lay something down — the wealthy their money, the angry their rage, the proud their pride, the sexual their unsanctioned desires. Singleness is honored in the New Testament (1 Cor 7) as Jesus was single. So is faithful marriage.",
      "If this teaching is hard for you, you are not alone. Some of the most faithful Christians in the world — gay and straight — are walking it out at real cost. Christians are called to love every person, not condemn — and to hold the truth Jesus gave us, gently and firmly.",
    ],
    scripture: ["Genesis 2:24", "1 Corinthians 6:18-20", "Ephesians 5:31-32"],
  },
  {
    id: "hypocrites",
    topic: "hard",
    question: "Aren't most Christians hypocrites?",
    oneLine: "Some are — and Jesus reserved His harshest words for hypocrisy. But the failure of those who claim a thing does not falsify the thing.",
    answer: [
      "Jesus called out hypocrisy in religious leaders more than He called out any other sin (Matt 23). He was no friend of pious masks.",
      "But the failure of a doctor does not make medicine false. The failure of teachers does not make education worthless. The failure of Christians is not an argument against Christ — it is, if anything, evidence that we needed Him.",
      "The church is, as Augustine said, a hospital for sinners. People are not better than they used to be when they became Christians — they are forgiven, in process, and being remade.",
      "If you have been wounded by Christians or by the church, that is real, and Jesus stands with you in the wound, not against you. Many of the loudest critics of corrupt religion in history were prophets and saints of the same church.",
    ],
    scripture: ["Matthew 23:1-12", "Romans 7:18-25", "1 John 1:8-10"],
  },
  {
    id: "old-violence",
    topic: "hard",
    question: "What about violence and slavery in the Old Testament?",
    oneLine: "The Old Testament describes a real, broken world. Read in canon, it points to the Christ who would heal it.",
    answer: [
      "Scripture is unflinching about violence — including Israel's. It is description, not always endorsement.",
      "The 'conquest' passages (Joshua) are short, regional, and within a unique covenant context that does not repeat. The New Testament rules out crusade and violence by the church (John 18:36, 2 Cor 10:3-4).",
      "On slavery: ancient slavery was not chattel race-based slavery; it was largely debt-bondage. The OT law regulated it and required release. The NT laid the seeds (Philemon, Gal 3:28) that abolished it — and abolitionists were largely Christians (Wilberforce, Sojourner Truth).",
      "The whole story of the Bible bends toward the cross — where God enters human violence as victim, not victor, and breaks the cycle from the inside. To read the OT honestly is to grow into needing Christ more, not less.",
    ],
    scripture: ["John 18:36", "Galatians 3:28", "Matthew 5:38-48"],
  },
  {
    id: "miracles",
    topic: "science",
    question: "Aren't miracles impossible in a scientific age?",
    oneLine: "If God exists, miracles are possible — they are God doing what He pleases in the world He made. The question is not 'can He?' but 'has He?'",
    answer: [
      "Miracles are not 'breaking the laws of nature.' Natural laws are descriptions of how things normally go. The Author of those laws can act in a way not predicted by them.",
      "David Hume argued miracles are improbable. That is true by definition — they are unusual. But improbable is not impossible. If God exists, the only question is the evidence in a given case.",
      "The central Christian claim is that one specific miracle occurred — God raised Jesus from the dead. The evidence for that one event (see Jesus → resurrection) is unusually strong.",
      "Today, missionaries in closed countries continue to report healings, conversions through dreams, deliverances. The global church takes these seriously. They are not for our entertainment — they serve the proclamation of Christ.",
    ],
    scripture: ["Matthew 19:26", "Hebrews 13:8", "Acts 26:8"],
  },
  {
    id: "salvation-by-faith",
    topic: "jesus",
    question: "Why doesn't God just forgive everyone — why need the cross?",
    oneLine: "Forgiveness without cost denies justice. The cross is how God can be both just and the One who justifies.",
    answer: [
      "If a judge let a murderer off because he was 'feeling generous,' we would call it injustice, not mercy. Real moral wrong demands a real response.",
      "God could not 'just forgive' without ceasing to be just — and a God who is not just is not safe.",
      "The cross is His solution. He bears the cost Himself. He pays the debt He did not owe so that we, who owed it, can go free. Both justice and mercy are honored — and we get a God we can both trust and love.",
      "Romans 3:26 — 'that He might be just and the justifier of the one who has faith in Jesus.'",
    ],
    scripture: ["Romans 3:21-26", "1 John 4:10", "2 Corinthians 5:21"],
  },
];
