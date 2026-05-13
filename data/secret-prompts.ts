import type { Season } from "@/lib/profile";

// 40 contemplative prompts grouped by movement of the soul.
// Rotated daily by day-of-year. A few are season-aware.

export type Prompt = {
  id: string;
  movement: "listen" | "ask" | "remember" | "become" | "release";
  text: string;
  scripture?: { ref: string; text: string };
  seasons?: Season[]; // surface preferentially for these seasons
};

export const PROMPTS: Prompt[] = [
  // ─── LISTENING ───
  {
    id: "listen-1",
    movement: "listen",
    text: "What is one verse the Spirit has been bringing back to your mind this week? Sit with it. Write what it might be saying.",
    scripture: { ref: "John 14:26", text: "The Counselor, the Holy Spirit... he will teach you all things, and will remind you of all that I said to you." },
  },
  {
    id: "listen-2",
    movement: "listen",
    text: "Where did you sense God's nearness yesterday? Even a small whisper. Name it before Him now.",
    scripture: { ref: "Psalm 16:11", text: "In your presence is fullness of joy." },
  },
  {
    id: "listen-3",
    movement: "listen",
    text: "What conviction has been quietly knocking at the door of your heart? Open it. Tell Him.",
    scripture: { ref: "Revelation 3:20", text: "Behold, I stand at the door and knock." },
  },
  {
    id: "listen-4",
    movement: "listen",
    text: "If Jesus were sitting across from you right now with a cup of coffee, what would He say?",
    scripture: { ref: "Revelation 3:20", text: "If anyone hears my voice and opens the door, then I will come in to him, and will dine with him." },
    seasons: ["waiting", "listening"],
  },
  {
    id: "listen-5",
    movement: "listen",
    text: "Be still for two minutes before writing anything. Then write one sentence that surfaces.",
    scripture: { ref: "Psalm 46:10", text: "Be still, and know that I am God." },
    seasons: ["resting", "listening"],
  },
  {
    id: "listen-6",
    movement: "listen",
    text: "What scripture have you been avoiding? Open it. Sit with it without commentary.",
  },
  {
    id: "listen-7",
    movement: "listen",
    text: "What is the longing of your heart today — beneath the surface noise?",
    scripture: { ref: "Psalm 42:1", text: "As the deer pants for the water brooks, so my soul pants after you, God." },
  },
  {
    id: "listen-8",
    movement: "listen",
    text: "Which line of the Lord's Prayer is most alive in you today? Stay there.",
  },

  // ─── ASKING ───
  {
    id: "ask-1",
    movement: "ask",
    text: "What is your boldest, most honest request to the Father today? Ask it without softening.",
    scripture: { ref: "Hebrews 4:16", text: "Let's therefore draw near with boldness to the throne of grace." },
  },
  {
    id: "ask-2",
    movement: "ask",
    text: "Where do you need wisdom right now? Ask the Father — He gives generously and without reproach.",
    scripture: { ref: "James 1:5", text: "If any of you lacks wisdom, let him ask of God, who gives to all liberally." },
  },
  {
    id: "ask-3",
    movement: "ask",
    text: "Who in your life needs Christ today? Pray for them by name.",
    seasons: ["called", "growing"],
  },
  {
    id: "ask-4",
    movement: "ask",
    text: "What are you afraid to ask God for because you're afraid of the answer? Bring it anyway.",
    seasons: ["waiting", "wrestling"],
  },
  {
    id: "ask-5",
    movement: "ask",
    text: "Pray Psalm 51:10 over yourself: 'Create in me a clean heart, O God; and renew a right spirit within me.'",
    scripture: { ref: "Psalm 51:10", text: "Create in me a clean heart, O God; and renew a right spirit within me." },
  },
  {
    id: "ask-6",
    movement: "ask",
    text: "Where do you need the Lord's hand on the people you love? Pray for each by name.",
  },
  {
    id: "ask-7",
    movement: "ask",
    text: "What burden are you carrying that you have not yet put down? Cast it on Him.",
    scripture: { ref: "1 Peter 5:7", text: "Casting all your worries on him, because he cares for you." },
  },
  {
    id: "ask-8",
    movement: "ask",
    text: "What injustice has been weighing on you? Bring it to the Judge of all the earth.",
    scripture: { ref: "Genesis 18:25", text: "Shall not the Judge of all the earth do right?" },
  },

  // ─── REMEMBERING ───
  {
    id: "remember-1",
    movement: "remember",
    text: "Name three good gifts from God in the last week. Specific. Small or large.",
    scripture: { ref: "James 1:17", text: "Every good gift and every perfect gift is from above." },
  },
  {
    id: "remember-2",
    movement: "remember",
    text: "What is one answered prayer you can give thanks for today?",
  },
  {
    id: "remember-3",
    movement: "remember",
    text: "Recall the day Jesus became real to you. Where were you? What was He saying?",
  },
  {
    id: "remember-4",
    movement: "remember",
    text: "Who is one person whose love for Christ shaped you? Thank God for them by name.",
  },
  {
    id: "remember-5",
    movement: "remember",
    text: "What is one promise of God you have seen Him keep in your life?",
    scripture: { ref: "Joshua 23:14", text: "Not one thing has failed of all the good things which Yahweh your God spoke concerning you." },
  },
  {
    id: "remember-6",
    movement: "remember",
    text: "Write three sentences that begin with 'Lord, you have been...'",
    scripture: { ref: "Psalm 90:1", text: "Lord, you have been our dwelling place for all generations." },
  },
  {
    id: "remember-7",
    movement: "remember",
    text: "What season is now behind you that the Lord brought you through? Name what He did.",
    seasons: ["restoring", "joyful"],
  },
  {
    id: "remember-8",
    movement: "remember",
    text: "What scripture has the Lord used to comfort you in the past? Read it again now.",
  },

  // ─── BECOMING ───
  {
    id: "become-1",
    movement: "become",
    text: "Which fruit of the Spirit feels most distant from you today? Ask the Spirit to begin growing it.",
    scripture: { ref: "Galatians 5:22–23", text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control." },
  },
  {
    id: "become-2",
    movement: "become",
    text: "Who is the Christ-formed person you want to be ten years from now? Write one sentence describing them.",
  },
  {
    id: "become-3",
    movement: "become",
    text: "What is one small obedience you have been postponing? Take a step today.",
    scripture: { ref: "James 1:22", text: "But be doers of the word, and not only hearers, deluding your own selves." },
  },
  {
    id: "become-4",
    movement: "become",
    text: "Where do you need to die a little this week so Christ can live a little more?",
    scripture: { ref: "Galatians 2:20", text: "I have been crucified with Christ, and it is no longer I who live, but Christ lives in me." },
  },
  {
    id: "become-5",
    movement: "become",
    text: "Which beatitude is your Father working into you this season? Notice it.",
    scripture: { ref: "Matthew 5:3", text: "Blessed are the poor in spirit, for theirs is the Kingdom of Heaven." },
  },
  {
    id: "become-6",
    movement: "become",
    text: "What one rhythm — Scripture, prayer, Sabbath, generosity, service — is the Lord asking you to start this season?",
    seasons: ["growing", "called"],
  },
  {
    id: "become-7",
    movement: "become",
    text: "Who could you serve in secret this week — no one knowing?",
    scripture: { ref: "Matthew 6:3–4", text: "Don't let your left hand know what your right hand does, so that your merciful deeds may be in secret." },
  },
  {
    id: "become-8",
    movement: "become",
    text: "What conversation has the Lord been preparing you for? Pray for grace and courage.",
  },

  // ─── RELEASING ───
  {
    id: "release-1",
    movement: "release",
    text: "Who do you need to forgive? Even one syllable of forgiveness is a beginning. Speak it now to the Father.",
    scripture: { ref: "Matthew 6:14", text: "If you forgive men their trespasses, your heavenly Father will also forgive you." },
    seasons: ["wrestling", "grieving"],
  },
  {
    id: "release-2",
    movement: "release",
    text: "What sin have you been carrying that you have not yet brought into the light? Confess it now. He is faithful and just.",
    scripture: { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness." },
  },
  {
    id: "release-3",
    movement: "release",
    text: "What anxiety has been sitting on your chest? Name it specifically. Then leave it on this page.",
    scripture: { ref: "Philippians 4:6–7", text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God." },
    seasons: ["wrestling"],
  },
  {
    id: "release-4",
    movement: "release",
    text: "What outcome have you been gripping too tightly? Open your hand and tell Him so.",
    scripture: { ref: "Proverbs 16:9", text: "A man's heart plans his course, but Yahweh directs his steps." },
  },
  {
    id: "release-5",
    movement: "release",
    text: "What grief is still unspoken? Tell Him. He keeps your tears in a bottle.",
    scripture: { ref: "Psalm 56:8", text: "You have kept count of my tossings; put my tears in your bottle. Are they not in your book?" },
    seasons: ["grieving"],
  },
  {
    id: "release-6",
    movement: "release",
    text: "What identity have you been clinging to that is not 'beloved'? Lay it down. Receive His name for you instead.",
    scripture: { ref: "1 John 3:1", text: "See what kind of love the Father has given to us, that we should be called children of God!" },
  },
  {
    id: "release-7",
    movement: "release",
    text: "What part of your day are you trying to control? Confess it. Trust the One who holds the sun in His hand.",
    scripture: { ref: "Psalm 31:15", text: "My times are in your hand." },
  },
  {
    id: "release-8",
    movement: "release",
    text: "What old story about yourself are you ready to stop believing? Write the new one He has spoken.",
    seasons: ["restoring", "growing"],
  },
];

export const SEASONS: { id: Season; label: string; blurb: string; verse: string }[] = [
  { id: "waiting", label: "Waiting", blurb: "Something has not arrived. He has not forgotten.", verse: "Psalm 27:14" },
  { id: "wrestling", label: "Wrestling", blurb: "You are in a fight with the Lord — like Jacob. Hold on for the blessing.", verse: "Genesis 32:26" },
  { id: "growing", label: "Growing", blurb: "He is forming Christ in you. Pay attention.", verse: "Galatians 4:19" },
  { id: "grieving", label: "Grieving", blurb: "Jesus wept too. Come to the One who keeps your tears.", verse: "Psalm 56:8" },
  { id: "joyful", label: "Joyful", blurb: "A season of gladness. Receive it. Give thanks.", verse: "Psalm 16:11" },
  { id: "called", label: "Called", blurb: "He has put something in your hands. Walk forward.", verse: "Isaiah 6:8" },
  { id: "restoring", label: "Restoring", blurb: "He is making what was broken whole. Let Him.", verse: "Joel 2:25" },
  { id: "resting", label: "Resting", blurb: "A Sabbath season. Receive His rest without guilt.", verse: "Matthew 11:28" },
  { id: "listening", label: "Listening", blurb: "Tuning your ear to the Father's voice.", verse: "1 Samuel 3:9" },
  { id: "surrendering", label: "Surrendering", blurb: "Laying down what was never yours to carry.", verse: "Luke 22:42" },
];

export function todaysPrompt(season?: Season, base = new Date()): Prompt {
  const start = Date.UTC(base.getUTCFullYear(), 0, 0);
  const here = Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate());
  const day = Math.floor((here - start) / 86400000);

  // If a season is set, prefer prompts that match it.
  if (season) {
    const seasonal = PROMPTS.filter((p) => p.seasons?.includes(season));
    if (seasonal.length > 0) return seasonal[day % seasonal.length];
  }
  return PROMPTS[day % PROMPTS.length];
}
