// ─── Calling Discernment ─────────────────────────────────────
// Christians have two callings: the universal call to follow Jesus
// (which all believers share), and the particular call to a specific
// life, vocation, place, and people (which differs). This walk
// addresses the particular — for those wrestling with vocation,
// ministry, a move, a marriage, a career change.

import type { CallingNote } from "@/lib/profile";

export const callingFoundations = [
  {
    title: "First calling: to be a Christian.",
    body: "Before vocation, before ministry, you are called to belong to Jesus. If that is not settled, the rest cannot be. Romans 1:6 — 'called to belong to Jesus Christ.'",
  },
  {
    title: "Vocation is broader than ministry.",
    body: "A baker, a mother, a software engineer, a pastor — all are callings if done unto the Lord (Col 3:23-24). 'Christian' is not a job category; it shapes every job.",
  },
  {
    title: "God speaks through many channels.",
    body: "Scripture, the Spirit's inward witness, the wise counsel of mature believers, your wiring and gifts, open and closed doors, and the world's needs — together.",
  },
  {
    title: "Calling is confirmed, not just felt.",
    body: "A feeling alone is not a calling. Confirmation comes through the Body, through fruit, and through obedient first steps. The Lord rarely gives the whole road, only the next bend.",
  },
];

export const callingSteps: { step: CallingNote["step"]; n: string; name: string; prompt: string; scripture: { ref: string; text: string }; }[] = [
  {
    step: "love",
    n: "1",
    name: "What you love",
    prompt:
      "What stirs deep joy in you — the kind that feels close to God's pleasure? What kind of person are you most yourself with? What work, even unpaid, makes time disappear?",
    scripture: { ref: "Psalm 37:4", text: "Delight yourself also in the LORD, and He shall give you the desires of your heart." },
  },
  {
    step: "wired",
    n: "2",
    name: "How you're wired",
    prompt:
      "What are your spiritual gifts (see /gifts)? Your natural strengths? Your weaknesses? Your story? God called Moses out of his stutter, Paul out of his learning, Peter out of his impulsiveness. He uses all of you.",
    scripture: { ref: "Psalm 139:13-16", text: "You formed my inward parts; You covered me in my mother's womb… my frame was not hidden from You." },
  },
  {
    step: "world",
    n: "3",
    name: "The world's need you see",
    prompt:
      "What injustice, lack, or longing in the world will not leave you alone? Where do you weep, get angry, or refuse to look away? Frederick Buechner: the place God calls you is where your deep gladness meets the world's deep hunger.",
    scripture: { ref: "Isaiah 6:8", text: "Then I heard the voice of the Lord saying, 'Whom shall I send, and who will go for Us?' Then I said, 'Here am I! Send me.'" },
  },
  {
    step: "word",
    n: "4",
    name: "Scriptures that have spoken",
    prompt:
      "What passages have followed you in this season? What verse keeps surfacing? Write them. They are part of God's voice over your life, weighed against the rest of His Word.",
    scripture: { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
  },
  {
    step: "wise",
    n: "5",
    name: "The counsel of the wise",
    prompt:
      "Whom have you asked? Whom should you ask? At least two mature believers — pastors, mentors, an older saint. Be specific. Listen for both 'yes' and 'wait' and 'no.'",
    scripture: { ref: "Proverbs 15:22", text: "Without counsel, plans go awry, but in the multitude of counselors they are established." },
  },
  {
    step: "yes",
    n: "6",
    name: "What you sense He is saying",
    prompt:
      "Bring it all into His presence. After hearing love + wiring + world + word + wisdom, what do you sense the Lord is inviting you toward? Hold it gently. Submit it to be tested.",
    scripture: { ref: "Romans 12:1-2", text: "Present your bodies a living sacrifice, holy, acceptable to God — and you may prove what is that good and acceptable and perfect will of God." },
  },
  {
    step: "next",
    n: "7",
    name: "The next obedient step",
    prompt:
      "Not the whole road — just the next step. What can you do this week to walk in the direction of what you've sensed? A conversation. A class. A first attempt. We learn calling in motion, not in theory.",
    scripture: { ref: "Psalm 119:133", text: "Direct my steps by Your word, and let no iniquity have dominion over me." },
  },
];

export const callingClose = {
  scripture: "Faithful is He who calls you, who also will do it. — 1 Thessalonians 5:24",
  prayer:
    "Father, You called me before I was born and You will keep calling me until I see Your face. Make me faithful in what You have already given. Open my ears to what You are saying. Send me where You will. In Jesus' name, amen.",
};
