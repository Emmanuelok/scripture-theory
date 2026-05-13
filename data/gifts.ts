// ─── Spiritual Gifts ──────────────────────────────────────────
// Scripture lists spiritual gifts in four main places: Romans 12:6-8,
// 1 Corinthians 12:7-11, 28-30, Ephesians 4:11-13, and 1 Peter 4:10-11.
// This is not a personality test — it is a discernment tool. Gifts are
// confirmed by the church and the fruit of their use, not by self-report.

import type { GiftId } from "@/lib/profile";

export type Gift = {
  id: GiftId;
  name: string;
  scripture: string[]; // refs
  short: string;
  long: string;
  caution: string;
  served: string;      // how it serves the body
};

export const gifts: Gift[] = [
  {
    id: "prophecy",
    name: "Prophecy",
    scripture: ["Romans 12:6", "1 Corinthians 12:10", "1 Corinthians 14:1-5"],
    short: "Speaking God's truth into the moment — to comfort, build up, and convict.",
    long:
      "A prophet sees what others miss. They speak the Word of God plainly into the present — not a new revelation, but the living application of Scripture that pierces a heart, exposes a lie, or calls a people back to the Lord. Always tested against the Word (1 Cor 14:29).",
    caution:
      "Most error in the church comes from un-tested prophetic words. Cultivate humility, submit to Scripture, welcome being weighed by mature believers.",
    served: "Calls the church to truth and to repentance.",
  },
  {
    id: "serving",
    name: "Serving",
    scripture: ["Romans 12:7", "1 Peter 4:11"],
    short: "Seeing practical needs and meeting them without being asked.",
    long:
      "The hands of the body. The one who shows up early, stays late, cleans up after, fixes what is broken. They make the work of others possible — and rarely want the platform.",
    caution: "Watch for resentment when service goes unnoticed. Serve to the Lord, not to people (Col 3:23).",
    served: "Lets every other gift in the body function freely.",
  },
  {
    id: "teaching",
    name: "Teaching",
    scripture: ["Romans 12:7", "1 Corinthians 12:28", "Ephesians 4:11"],
    short: "Making the truth of God clear, accurate, and life-giving to others.",
    long:
      "The teacher loves the Word, studies it carefully, and has the ability to make hard things plain. James warns that not many should teach — because we will be judged more strictly (James 3:1) — yet without this gift the body starves.",
    caution: "Don't mistake information for transformation. Teach with prayer; teach to obey, not just to know.",
    served: "Grounds the body in truth so the saints are not blown around by every wind of doctrine.",
  },
  {
    id: "exhortation",
    name: "Exhortation / Encouragement",
    scripture: ["Romans 12:8"],
    short: "Coming alongside believers to strengthen, console, and urge them on.",
    long:
      "Barnabas, the 'son of encouragement,' had this gift (Acts 4:36). Exhorters notice the one who is wavering, the one in grief, the one ready to quit — and they speak the right word at the right time. Their words land where teaching alone cannot.",
    caution: "Encouragement without truth becomes flattery. Hold the Word — and the person.",
    served: "Keeps the weary on their feet until the morning.",
  },
  {
    id: "giving",
    name: "Giving",
    scripture: ["Romans 12:8"],
    short: "Resourcing the work of the Kingdom with material wealth, joyfully.",
    long:
      "Some Christians have a particular grace to give. They make money to give it, they hear of needs and respond before being asked, and they would rather see ten people fed than buy a second of anything. They give in secret (Matt 6:3).",
    caution: "Watch for pride in generosity. Watch for control over those you give to. Give and let go.",
    served: "Fuels every other ministry of the body.",
  },
  {
    id: "leadership",
    name: "Leadership",
    scripture: ["Romans 12:8", "1 Corinthians 12:28"],
    short: "Casting vision, organizing people, and shepherding them toward what God is doing.",
    long:
      "Leaders see where the body needs to go, gather the right people around the work, and bear the cost of being out front. Greatest in the kingdom by being least; first by being last (Mark 10:43-44).",
    caution: "Power corrupts. Lead from the towel and basin (John 13). Surround yourself with truth-tellers.",
    served: "Aligns the body to walk in the same direction.",
  },
  {
    id: "mercy",
    name: "Mercy",
    scripture: ["Romans 12:8"],
    short: "Feeling for the suffering and moving toward them, not away.",
    long:
      "The merciful person grieves with the grieving, sits with the dying, befriends the prisoner, listens to the depressed. They have a stomach for pain. They see the human under the wound.",
    caution: "Mercy without boundaries empties the giver. Even Jesus withdrew. Rest, or you cannot continue.",
    served: "Embodies the heart of Christ in the body's tenderness toward the broken.",
  },
  {
    id: "wisdom",
    name: "Word of wisdom",
    scripture: ["1 Corinthians 12:8"],
    short: "Speaking God's wisdom into a specific situation in a way that brings clarity.",
    long:
      "Not native cleverness — Spirit-given counsel. The one who, after others have argued, says the sentence that resolves it. James 1:5 promises wisdom to all who ask; some receive it as a particular gift to give to others.",
    caution: "Distinguish your opinion from the Lord's. Speak only what He gives.",
    served: "Helps the body know what to do next.",
  },
  {
    id: "knowledge",
    name: "Word of knowledge",
    scripture: ["1 Corinthians 12:8"],
    short: "Sudden Spirit-given knowing of something you could not have known on your own.",
    long:
      "A piece of insight — about a person, a circumstance, a hidden sin or wound — that comes from the Spirit, not deduction. Confirmed when shared in love and met with recognition. Always submitted to Scripture and the Body.",
    caution: "Easy to fake, easy to misuse. If unsure, ask the Lord; if shared, share humbly and let it be weighed.",
    served: "Cuts through pretense; opens hearts to the real ministry of Christ.",
  },
  {
    id: "faith",
    name: "Faith",
    scripture: ["1 Corinthians 12:9"],
    short: "Believing God for what most cannot — for healing, provision, breakthrough.",
    long:
      "Distinct from the saving faith common to every believer. This is a Spirit-given confidence for a specific situation — Hudson Taylor for China, George Müller for orphans. They risk on God and watch Him show up.",
    caution: "Don't impose your faith on others' suffering. Some pray and are not yet healed.",
    served: "Pulls the body forward into what only God can do.",
  },
  {
    id: "healing",
    name: "Gifts of healings",
    scripture: ["1 Corinthians 12:9, 28"],
    short: "Being a channel through which God brings physical, emotional, or spiritual healing.",
    long:
      "The Greek is plural — gifts of healings — suggesting different healings for different situations. The gift is not the healer; God heals. The gift is the prayer that meets the need.",
    caution: "Never tell a sufferer that their lack of healing is their lack of faith. Mystery remains.",
    served: "Demonstrates that Christ is risen and at work today.",
  },
  {
    id: "miracles",
    name: "Working of miracles",
    scripture: ["1 Corinthians 12:10, 28"],
    short: "Being used by God in events that exceed natural explanation.",
    long:
      "From the early church through today, the global church has stories of provision, deliverance, and divine intervention that cannot be explained any other way. These accompany the spread of the Gospel especially where it is new.",
    caution: "Signs serve the message; they do not replace it. Beware the miracle-chasing soul.",
    served: "Confirms the message of the Gospel where it has not yet taken root.",
  },
  {
    id: "discernment",
    name: "Discernment of spirits",
    scripture: ["1 Corinthians 12:10", "1 John 4:1"],
    short: "Knowing what is from God, what is from the flesh, and what is from the enemy.",
    long:
      "The believer with this gift can sense when something is off — a teaching, a presence, a movement — even when others cannot articulate why. They keep the church from drinking poison.",
    caution: "Discernment without love becomes cynicism. Be the watchman, not the prosecutor.",
    served: "Protects the body from deception.",
  },
  {
    id: "tongues",
    name: "Tongues",
    scripture: ["1 Corinthians 12:10, 28-30", "1 Corinthians 14"],
    short: "Spirit-given prayer language, in known or unknown tongues.",
    long:
      "At Pentecost, the Spirit fell and the disciples spoke languages they had not learned (Acts 2). Paul also describes a personal prayer language (1 Cor 14:14-15). Traditions differ on whether and how this continues; all should receive what God gives without disputing.",
    caution: "Public use without interpretation is unedifying (1 Cor 14:27-28). Private prayer in tongues is for personal edification.",
    served: "Builds up the praying believer; declares God's works to outsiders.",
  },
  {
    id: "interpretation",
    name: "Interpretation of tongues",
    scripture: ["1 Corinthians 12:10, 30", "1 Corinthians 14:13"],
    short: "Translating Spirit-given speech so the body can understand and be edified.",
    long:
      "A complement to the gift of tongues in corporate gatherings. Without interpretation, the body cannot say 'amen' (1 Cor 14:16). This gift is its servant.",
    caution: "Test the interpretation — does it edify, does it agree with Scripture?",
    served: "Lets the body hear and receive what the Spirit is saying.",
  },
  {
    id: "apostleship",
    name: "Apostolic gifting",
    scripture: ["1 Corinthians 12:28", "Ephesians 4:11"],
    short: "Pioneering Gospel work where the church does not yet exist.",
    long:
      "The Twelve hold a unique, foundational role (Eph 2:20) — but the apostolic function continues in those who go where Christ is not yet named (Rom 15:20), plant new churches, and steward movements.",
    caution: "An apostle is sent; do not self-appoint. Confirmation comes from the Body and the fruit.",
    served: "Extends the kingdom into new ground.",
  },
  {
    id: "evangelism",
    name: "Evangelism",
    scripture: ["Ephesians 4:11", "2 Timothy 4:5"],
    short: "Sharing the Gospel with people who do not yet know Jesus — and seeing them come.",
    long:
      "Every Christian is a witness. The evangelist has a particular grace to articulate the Gospel, to find open hearts, to go where unbelievers are. They are not afraid of the conversation.",
    caution: "Methods become idols. Stay close to the Gospel itself; pray for the people, not just their decisions.",
    served: "Brings new sheep into the fold.",
  },
  {
    id: "shepherding",
    name: "Shepherding / Pastor",
    scripture: ["Ephesians 4:11", "1 Peter 5:2"],
    short: "Knowing the sheep, feeding them, guarding them — the long work of care.",
    long:
      "The shepherd knows the name and story of each one. They do not just preach; they walk with. They bandage wounds, retrieve wanderers, and bear the burden of the whole flock. Mostly hidden, mostly costly.",
    caution: "Don't let the people be your idol — and don't let yourself become theirs.",
    served: "Keeps the body whole and growing in Christ.",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    scripture: ["Romans 12:13", "1 Peter 4:9"],
    short: "Opening home, table, and life to strangers as well as friends.",
    long:
      "The Greek philoxenia — love of stranger. The hospitable Christian makes home a doorway into the kingdom. The early church grew around tables (Acts 2:46).",
    caution: "Hospitality is not entertaining. It is welcome, not perfection.",
    served: "Embodies the welcome of God to a hostile world.",
  },
  {
    id: "administration",
    name: "Administration",
    scripture: ["1 Corinthians 12:28"],
    short: "Bringing order to ministry so the work of God can run.",
    long:
      "From the Greek kybernesis — 'steering a ship.' These believers can take a complex effort and make it run. They schedule, plan, budget, coordinate — and free others to do the parts only they can do.",
    caution: "Order serves mission, not the other way around. Don't strangle the work with policy.",
    served: "Makes large, complex ministry possible.",
  },
];

// Each gift gets several statements. Score 0..4 (Disagree → Agree).
// Each statement is tagged with the gift it points to. Final score per gift
// is the sum of its statement scores.

export type Statement = { id: string; text: string; gift: GiftId };

export const statements: Statement[] = [
  // prophecy
  { id: "p1", text: "When I read Scripture, I often see direct application to the moment my church or friend is in.", gift: "prophecy" },
  { id: "p2", text: "I am willing to say uncomfortable, scriptural truth when I believe it is needed.", gift: "prophecy" },
  // serving
  { id: "s1", text: "I notice practical needs (set-up, clean-up, fixing things) and quietly meet them.", gift: "serving" },
  { id: "s2", text: "I am more energized doing hands-on work than being in front of people.", gift: "serving" },
  // teaching
  { id: "t1", text: "I love studying Scripture in depth and helping others understand it.", gift: "teaching" },
  { id: "t2", text: "People say my explanations of biblical concepts are clear and helpful.", gift: "teaching" },
  // exhortation
  { id: "ex1", text: "I find the right word for someone who is discouraged and watch them be lifted.", gift: "exhortation" },
  { id: "ex2", text: "Friends often come to me when they are about to give up on something.", gift: "exhortation" },
  // giving
  { id: "g1", text: "When I hear of a need, my first instinct is to give money or goods.", gift: "giving" },
  { id: "g2", text: "I feel joy — not loss — when I give generously.", gift: "giving" },
  // leadership
  { id: "l1", text: "When a group is unclear about direction, people often look to me.", gift: "leadership" },
  { id: "l2", text: "I can see a vision and bring people together to pursue it.", gift: "leadership" },
  // mercy
  { id: "m1", text: "I sit easily with people in deep grief, pain, or suffering.", gift: "mercy" },
  { id: "m2", text: "Stories of injustice and suffering move me to action, not just emotion.", gift: "mercy" },
  // wisdom
  { id: "w1", text: "In confusing or conflicted situations, I often see the wise path forward.", gift: "wisdom" },
  { id: "w2", text: "People come to me for counsel on difficult decisions.", gift: "wisdom" },
  // knowledge
  { id: "k1", text: "I sometimes know things about a person or situation I could not have learned naturally.", gift: "knowledge" },
  { id: "k2", text: "I have insights from the Lord that, when shared in love, prove accurate.", gift: "knowledge" },
  // faith
  { id: "f1", text: "I believe God for outcomes others find unrealistic.", gift: "faith" },
  { id: "f2", text: "I have seen God answer specific, bold prayers I prayed in confidence.", gift: "faith" },
  // healing
  { id: "h1", text: "When I pray for the sick, I have seen God bring healing — physical, emotional, or spiritual.", gift: "healing" },
  { id: "h2", text: "I feel drawn to pray with the sick and suffering, with hope.", gift: "healing" },
  // miracles
  { id: "mi1", text: "I have witnessed God do unmistakably supernatural things through my prayers.", gift: "miracles" },
  { id: "mi2", text: "I have a faith for divine intervention, not just for ordinary providence.", gift: "miracles" },
  // discernment
  { id: "d1", text: "I can often sense when something is spiritually off, even before I can explain why.", gift: "discernment" },
  { id: "d2", text: "I am quick to detect false teaching or counterfeit spiritual practice.", gift: "discernment" },
  // tongues
  { id: "to1", text: "I pray in a Spirit-given language privately or in gathered worship.", gift: "tongues" },
  { id: "to2", text: "I have experienced edification through praying in tongues.", gift: "tongues" },
  // interpretation
  { id: "in1", text: "When tongues are spoken aloud in worship, I am sometimes given the interpretation.", gift: "interpretation" },
  { id: "in2", text: "I have helped a congregation understand what was being said in the Spirit.", gift: "interpretation" },
  // apostleship
  { id: "ap1", text: "I am drawn to take the Gospel into places where the church does not exist.", gift: "apostleship" },
  { id: "ap2", text: "I have started or want to start new Gospel communities.", gift: "apostleship" },
  // evangelism
  { id: "ev1", text: "I find it natural to talk about Jesus with people who don't yet know Him.", gift: "evangelism" },
  { id: "ev2", text: "I have seen people come to faith in Jesus through my witness.", gift: "evangelism" },
  // shepherding
  { id: "sh1", text: "I know and remember the personal stories of those in my church community.", gift: "shepherding" },
  { id: "sh2", text: "I instinctively check in on people who are drifting or in difficulty.", gift: "shepherding" },
  // hospitality
  { id: "ho1", text: "I love opening my home — even imperfect — to strangers as well as friends.", gift: "hospitality" },
  { id: "ho2", text: "Strangers often feel welcomed and at ease at my table.", gift: "hospitality" },
  // administration
  { id: "ad1", text: "I can take a messy, ambitious project and organize it into something that runs.", gift: "administration" },
  { id: "ad2", text: "I love planning, scheduling, and coordinating ministry logistics.", gift: "administration" },
];

export const giftsIntro = {
  title: "Discerning, not testing.",
  body: [
    "Spiritual gifts are not personality traits and this is not a personality test. The Spirit gives them as He wills (1 Corinthians 12:11), for the building up of the body, not for self-image.",
    "Forty short statements. Rate each one honestly. The top three give you a place to begin praying — not a final verdict. Real confirmation comes through prayer, mature believers, and the actual fruit of using the gift in your local church.",
    "Whatever your gifts: love is the more excellent way (1 Corinthians 13). Without love, every gift is noise.",
  ],
};
