// ─── Rule of Life ─────────────────────────────────────────────
// A "rule of life" (Latin: regula) is not a list of things to be good at.
// It is a trellis — a structure on which the vine of your life with Jesus
// can grow. The rule is not the life. Christ is the life.

import type { RuleDiscipline } from "@/lib/profile";

export type DisciplineDef = {
  id: RuleDiscipline;
  name: string;
  short: string;       // 1-line description
  why: string;         // 2-3 sentences of biblical rationale
  practices: string[]; // concrete starting points
  scripture: { ref: string; text: string };
  cadence: ("daily" | "weekly" | "monthly")[];
};

export const disciplines: DisciplineDef[] = [
  {
    id: "scripture",
    name: "Scripture",
    short: "Read, hear, study, and obey the Word.",
    why: "The Word of God is living and active (Heb 4:12). It is how Christ shapes us — without it we drift, with it we are renewed in mind (Rom 12:2). It is daily food, not optional reading.",
    practices: [
      "One chapter a day, slowly, asking 'who is God here? what does this ask of me?'",
      "Read a Gospel through every quarter.",
      "Memorize one verse a week (use /memory).",
    ],
    scripture: { ref: "Joshua 1:8", text: "This Book of the Law shall not depart from your mouth, but you shall meditate in it day and night." },
    cadence: ["daily"],
  },
  {
    id: "prayer",
    name: "Prayer",
    short: "Speak to the Father, listen for His voice.",
    why: "Jesus modeled it; He commanded it; He died so we could enter it (Heb 4:16). Prayer is not the prelude to the Christian life — it is the Christian life.",
    practices: [
      "Pray the Lord's Prayer slowly each morning.",
      "Pray for one person who doesn't know Jesus, every day.",
      "End the day with the /examen.",
    ],
    scripture: { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
    cadence: ["daily"],
  },
  {
    id: "silence",
    name: "Silence & solitude",
    short: "Be still. Stop performing.",
    why: "Jesus often withdrew (Luke 5:16). The voice of God is most often a still small voice (1 Kings 19:12) — and you cannot hear it through the noise of feeds, screens, and self-talk.",
    practices: [
      "10 minutes of silence each morning before phones or news.",
      "One walk a week with no audio at all.",
      "Sabbath afternoon: no input, only listening.",
    ],
    scripture: { ref: "Psalm 46:10", text: "Be still, and know that I am God." },
    cadence: ["daily", "weekly"],
  },
  {
    id: "sabbath",
    name: "Sabbath",
    short: "One day in seven, stop.",
    why: "God built rest into creation (Gen 2:2-3) and into the Ten Commandments (Ex 20:8-11). Refusing sabbath is refusing to trust that God can run the world without us. Jesus is Lord of the Sabbath (Mark 2:28) — He gives it back to us as gift.",
    practices: [
      "Choose one 24-hour stretch each week. Stop work.",
      "Worship with the gathered church.",
      "Eat slowly, sleep enough, walk somewhere beautiful.",
    ],
    scripture: { ref: "Mark 2:27", text: "The Sabbath was made for man, and not man for the Sabbath." },
    cadence: ["weekly"],
  },
  {
    id: "fasting",
    name: "Fasting",
    short: "Hunger of the body to clarify hunger of the soul.",
    why: "Jesus said 'when you fast' (Matt 6:16). The Church has fasted for 2000 years — for hearing, repentance, intercession, breakthrough. Fasting is not earning; it is dependence made visible.",
    practices: [
      "One meal a week, given to prayer instead.",
      "One sundown-to-sundown fast a month (see /fast).",
      "A media fast in seasons of drift.",
    ],
    scripture: { ref: "Joel 2:12", text: "Return to me with all your heart, with fasting, with weeping, and with mourning." },
    cadence: ["weekly", "monthly"],
  },
  {
    id: "worship",
    name: "Corporate worship",
    short: "Gather with the body of Christ.",
    why: "We are not solo Christians. The local church is Christ's body and His bride (Eph 5:25-27). To love Jesus is to love the church — even with its limp.",
    practices: [
      "Sunday gathering, every week you can.",
      "The Lord's Supper as your church practices it.",
      "Sing — even off-key. The Father loves it.",
    ],
    scripture: { ref: "Hebrews 10:24-25", text: "Not forsaking the assembling of ourselves together, as is the manner of some." },
    cadence: ["weekly"],
  },
  {
    id: "community",
    name: "Christian community",
    short: "Ordinary friendship, with Jesus at the center.",
    why: "We were made for it (Gen 2:18). The early church met daily, ate together, prayed together (Acts 2:42-47). Discipleship doesn't happen alone.",
    practices: [
      "One meal a week with a brother or sister in Christ.",
      "One person you pray with weekly, by name.",
      "One older saint you learn from, one younger you serve.",
    ],
    scripture: { ref: "Hebrews 3:13", text: "Exhort one another daily, while it is called Today, lest any of you be hardened through the deceitfulness of sin." },
    cadence: ["weekly"],
  },
  {
    id: "generosity",
    name: "Generosity",
    short: "Open hand. Free hand. Christ-shaped giving.",
    why: "What you do with money reveals what you trust. Jesus spoke about it more than about heaven or hell. Generous people are free people; tight people are tight in the soul.",
    practices: [
      "Give regularly to your local church.",
      "Set aside a portion for the poor and the persecuted.",
      "Practice spontaneous gifts — meals, cash, time.",
    ],
    scripture: { ref: "2 Corinthians 9:7", text: "God loves a cheerful giver." },
    cadence: ["weekly", "monthly"],
  },
  {
    id: "service",
    name: "Service",
    short: "Take the lower place. Wash feet.",
    why: "The Son of Man came to serve (Mark 10:45). Christianity is upside down — the great become small, the leaders become slaves. To serve is to be conformed to Jesus.",
    practices: [
      "One hidden act of service a week — no one sees, no one thanks you.",
      "Volunteer regularly with your church or a ministry to the poor.",
      "Notice the person no one notices.",
    ],
    scripture: { ref: "Galatians 5:13", text: "Through love serve one another." },
    cadence: ["weekly"],
  },
  {
    id: "confession",
    name: "Confession",
    short: "Bring it into the light. Don't carry it alone.",
    why: "We confess to God for forgiveness (1 John 1:9), and to one another for healing (James 5:16). Sin grows in secret and shrivels in light. The mature believer has someone they tell the truth to.",
    practices: [
      "Daily before sleep — a brief confession, named, then released.",
      "Weekly with a trusted brother or sister, by phone or in person.",
      "Walk the /forgive path when bitterness rises.",
    ],
    scripture: { ref: "James 5:16", text: "Confess your trespasses to one another, and pray for one another, that you may be healed." },
    cadence: ["daily", "weekly"],
  },
  {
    id: "witness",
    name: "Witness",
    short: "Tell the truth about Jesus, gently and without fear.",
    why: "He said 'go' (Matt 28:19). The world is dying for the news we have. Witness is not technique — it is the overflow of a person who has seen something they cannot keep to themselves.",
    practices: [
      "Pray daily for one person who doesn't know Jesus.",
      "Look for one open conversation a week — bring Him in if you can.",
      "Be ready to give the reason for your hope (1 Pet 3:15).",
    ],
    scripture: { ref: "Acts 1:8", text: "You shall be witnesses to Me in Jerusalem, and in all Judea and Samaria, and to the end of the earth." },
    cadence: ["daily", "weekly"],
  },
];

export const ruleIntro = {
  title: "What a rule of life is — and is not.",
  body: [
    "A rule of life (Latin: regula) is not a list of things to be good at. It is a trellis — a small, agreed-upon structure on which the vine of your life with Jesus can grow.",
    "It is not legalism. It is not earning. The disciplines do not make you holy; Christ does. But the disciplines remove the obstacles to His work and put you in the path of His grace.",
    "Choose less, not more. A few practices done faithfully outweigh a long list done occasionally. The point is not the rule — the point is Christ.",
  ],
};

export const sampleRules = [
  {
    name: "The seeker's rule",
    body: "Daily: 10 minutes of Scripture, the Lord's Prayer, one prayer for someone you love. Weekly: church service. Monthly: one quiet hour.",
    forWhom: "If you are new or returning. Start here.",
    daily: ["scripture", "prayer"] as RuleDiscipline[],
    weekly: ["worship"] as RuleDiscipline[],
    monthly: ["silence"] as RuleDiscipline[],
  },
  {
    name: "The disciple's rule",
    body: "Daily: Scripture, prayer, examen, silence. Weekly: sabbath, gathered worship, one meal in community, one act of service. Monthly: a longer fast or quiet day.",
    forWhom: "If you have been walking with Jesus a while. Build this slowly.",
    daily: ["scripture", "prayer", "silence", "confession"] as RuleDiscipline[],
    weekly: ["sabbath", "worship", "community", "service", "witness"] as RuleDiscipline[],
    monthly: ["fasting", "generosity"] as RuleDiscipline[],
  },
  {
    name: "The leader's rule",
    body: "Same as the disciple's, with longer silence, deeper accountability, and unfailing sabbath. Leaders who ignore the rule burn out and take others with them.",
    forWhom: "If you pastor, disciple, or lead. Especially this.",
    daily: ["scripture", "prayer", "silence", "confession"] as RuleDiscipline[],
    weekly: ["sabbath", "worship", "community", "service", "witness", "fasting"] as RuleDiscipline[],
    monthly: ["generosity"] as RuleDiscipline[],
  },
];
