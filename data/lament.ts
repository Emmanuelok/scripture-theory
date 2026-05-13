// ─── The Christian Practice of Lament ─────────────────────────
// Over a third of the Psalter is lament. The modern church has largely
// lost this language — and so we suffer in silence or rage. This guide
// walks the believer through the biblical pattern of lament, shaped by
// the Psalms and the cry of Jesus from the cross.

export type LamentMovement = {
  id: "turn" | "complaint" | "ask" | "trust" | "praise";
  number: string;
  name: string;
  scripture: { ref: string; text: string };
  prompt: string;
  placeholder: string;
  pastoralNote: string;
};

export const lamentMovements: LamentMovement[] = [
  {
    id: "turn",
    number: "One",
    name: "Turn toward Him",
    scripture: {
      ref: "Psalm 22:1",
      text: "My God, my God, why have You forsaken me?",
    },
    prompt:
      "Address Him by name. Even your accusation belongs in His ear. He can take it.",
    placeholder: "Father… My God… Lord Jesus… Holy Spirit…",
    pastoralNote:
      "The lament psalms always begin by speaking TO God. Don't write about Him. Speak to Him. Even the howl on the cross was addressed to the Father.",
  },
  {
    id: "complaint",
    number: "Two",
    name: "Say what is true",
    scripture: {
      ref: "Psalm 88:14-15",
      text: "LORD, why do You cast off my soul? Why do You hide Your face from me? I have been afflicted and ready to die from my youth up.",
    },
    prompt:
      "Tell Him exactly what is wrong, what hurts, what has broken, what you feel He has done or not done.",
    placeholder:
      "I am exhausted. I am afraid. I do not understand why You allowed… The grief is heavier than I can carry…",
    pastoralNote:
      "This is not unbelief — this is the language of faith refusing to pretend. Job, David, Jeremiah, Habakkuk, and Jesus all spoke this way. You can too.",
  },
  {
    id: "ask",
    number: "Three",
    name: "Ask boldly",
    scripture: {
      ref: "Psalm 13:3",
      text: "Consider and hear me, O LORD my God; Enlighten my eyes, lest I sleep the sleep of death.",
    },
    prompt:
      "Now ask. Not vaguely. Specifically. For what you actually need from the Father. Healing. Justice. Comfort. Bread.",
    placeholder: "Lord, would You…",
    pastoralNote:
      "Boldness in prayer is not arrogance — it is the right of a child. Jesus told us to ask, seek, and knock (Matt 7:7). Be specific. Be unguarded.",
  },
  {
    id: "trust",
    number: "Four",
    name: "Choose to trust",
    scripture: {
      ref: "Psalm 13:5",
      text: "But I have trusted in Your mercy; my heart shall rejoice in Your salvation.",
    },
    prompt:
      "Even with the wound open and the answer not yet given — speak the name of His character. He is good. He is faithful. He is here.",
    placeholder:
      "I do not feel it, but I know that You are… I have seen You be faithful when…",
    pastoralNote:
      "This is not denial of the pain. It is the deeper truth underneath it. You do not need to feel trust to confess trust. Many psalms shift here — not because the circumstance changed, but because the soul turned its face.",
  },
  {
    id: "praise",
    number: "Five",
    name: "Vow to praise",
    scripture: {
      ref: "Psalm 13:6",
      text: "I will sing to the LORD, because He has dealt bountifully with me.",
    },
    prompt:
      "Promise the praise that is coming. The lament ends with a vow — even before the answer arrives.",
    placeholder:
      "Whatever You do, I will praise You. When this is over, I will tell of Your faithfulness…",
    pastoralNote:
      "Only Psalm 88 — and arguably one or two others — refuse to make this turn. Almost every lament ends here. Faith says: I will praise You for what You will yet do.",
  },
];

export const lamentIntro = {
  title: "It is right to grieve before Him.",
  body: [
    "We have been taught — wrongly — that a 'good Christian' suppresses grief, rage, fear, and doubt. The Bible teaches the opposite. Over a third of the Psalms are laments. The book of Lamentations is five whole chapters of wailing. Jesus quoted Psalm 22 from the cross.",
    "Lament is not the absence of faith. Lament is faith refusing to lie about reality. It is bringing the wound, the question, the unbearable thing — to the only One who can hold it.",
    "This walk has five movements, drawn from the Psalms. Take your time. There is no rush. Your tears are kept (Psalm 56:8).",
  ],
};

export const lamentClose = {
  scripture: "He heals the brokenhearted and binds up their wounds. — Psalm 147:3",
  prayer:
    "Father, You have heard me. I leave this here, on the floor of Your throne room. Walk with me into what comes next. In Jesus' name, amen.",
};
