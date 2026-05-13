// ─── The Path — twelve-stage discipleship journey ────────────
// The single source of truth for what each stage is, what completing
// it looks like, and whether it requires a local pastor's hand.

import type { GlyphId } from "@/components/ui/Glyph";

export type PathStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Stage = {
  stage: PathStage;
  name: string;
  scripture: string;
  focus: string;
  /** Plain-language observable sign that this stage is real. */
  observable: string;
  /** Specific next-step suggestion when this is the current stage. */
  nextStep: string;
  /** Internal link a believer can follow to act on this stage. */
  href?: string;
  glyph: GlyphId;
  /** "alone" stages can be done solo; "body" stages require the local church. */
  kind: "alone" | "body";
  /** Stages where a pastor's confirmation is meaningful (baptism, belonging). */
  pastorConfirmable?: boolean;
};

export const STAGES: Stage[] = [
  {
    stage: 1,
    name: "Encounter",
    scripture: "John 4:1–42",
    focus: "First meeting with Jesus, the Living Water.",
    observable: "I can tell someone, in my own words, who Jesus is and why I am here.",
    nextStep: "Open the Gospel and read it slowly.",
    href: "/gospel",
    glyph: "wave",
    kind: "alone",
  },
  {
    stage: 2,
    name: "Repent & Believe",
    scripture: "Mark 1:14–15",
    focus: "Turning from self-rule, trusting the King.",
    observable: "I have told the Father, in my own words, that I am turning from sin and trusting Christ.",
    nextStep: "Pray honestly. Tell Him you trust Him.",
    href: "/pray",
    glyph: "key",
    kind: "alone",
  },
  {
    stage: 3,
    name: "Confess & Baptize",
    scripture: "Romans 10:9–10 · Matt. 28:19",
    focus: "Public confession; baptism in your local church.",
    observable: "I have publicly confessed Christ and been baptized (or made a credible plan to be).",
    nextStep: "Find a faithful local church and ask their pastor about baptism.",
    href: "/connect",
    glyph: "chalice",
    kind: "body",
    pastorConfirmable: true,
  },
  {
    stage: 4,
    name: "Receive the Spirit",
    scripture: "Acts 2:38–39",
    focus: "Welcoming the Spirit's presence and power.",
    observable: "I have asked the Father to fill me with His Spirit and trust He has.",
    nextStep: "Ask the Father to fill you. He gives the Spirit to those who ask (Luke 11:13).",
    href: "/gifts",
    glyph: "dove",
    kind: "alone",
  },
  {
    stage: 5,
    name: "Learn the Story",
    scripture: "Luke 24:27",
    focus: "Read the whole Bible as one story centered on Christ.",
    observable: "I have begun a reading plan and can sketch the storyline of Scripture.",
    nextStep: "Start a reading plan you can actually keep — John 30 is a great first one.",
    href: "/read",
    glyph: "open-book",
    kind: "alone",
  },
  {
    stage: 6,
    name: "Pray & Fast",
    scripture: "Matt. 6:5–18",
    focus: "Daily life with the Father in secret.",
    observable: "I have a real, repeated rhythm of private prayer and have fasted at least once.",
    nextStep: "Enter the Secret Place or pray the Daily Office tonight.",
    href: "/secret-place",
    glyph: "door",
    kind: "alone",
  },
  {
    stage: 7,
    name: "Belong",
    scripture: "Acts 2:42–47",
    focus: "A committed local church and a small community.",
    observable: "I am a member or covenanted regular of a faithful local church and a small group.",
    nextStep: "If you don't have a church, find one and visit this Sunday.",
    href: "/connect",
    glyph: "house",
    kind: "body",
    pastorConfirmable: true,
  },
  {
    stage: 8,
    name: "Forgive & Reconcile",
    scripture: "Matt. 5:21–26 · 18:15–22",
    focus: "Healing relationships; refusing bitterness.",
    observable: "I have walked through forgiveness with at least one person who wounded me.",
    nextStep: "Walk a real forgiveness step today.",
    href: "/forgive",
    glyph: "forgive",
    kind: "body",
  },
  {
    stage: 9,
    name: "Steward",
    scripture: "Luke 16:10–13",
    focus: "Money, time, work, and gifts under His Lordship.",
    observable: "My money, calendar, and gifts have changed in observable ways under His Lordship.",
    nextStep: "Set or revise your Rule of Life — money, time, gifts.",
    href: "/rule",
    glyph: "rule",
    kind: "alone",
  },
  {
    stage: 10,
    name: "Suffer Well",
    scripture: "1 Peter 4:12–19",
    focus: "Joy in trial; cross-shaped obedience.",
    observable: "I have walked through real suffering and not abandoned faith — and someone knows.",
    nextStep: "Bring the wound to Him. Open the Lament walk.",
    href: "/lament",
    glyph: "cross",
    kind: "alone",
  },
  {
    stage: 11,
    name: "Witness",
    scripture: "Acts 1:8",
    focus: "Telling your story, sharing the gospel where you live.",
    observable: "I have told at least one person the gospel in plain words.",
    nextStep: "Tell one person this week. Use the Witness page.",
    href: "/witness",
    glyph: "lamp",
    kind: "body",
  },
  {
    stage: 12,
    name: "Reproduce",
    scripture: "2 Tim. 2:2",
    focus: "Discipling one person who disciples another.",
    observable: "I am walking a regular discipleship rhythm with at least one other believer.",
    nextStep: "Open the Journey and add the name of one person to walk with.",
    href: "/disciple/journey",
    glyph: "path",
    kind: "body",
  },
];

export const PATH_LENGTH: PathStage = 12 as PathStage;

export function findStage(n: number): Stage | undefined {
  return STAGES.find((s) => s.stage === n);
}
