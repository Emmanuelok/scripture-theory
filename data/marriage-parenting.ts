// ─── Marriage and Parenting daily prayer rhythms ──────────────
// These are not "advice columns" — they are short, biblical prayer
// rhythms for spouses and parents. One small thing a day.

export type DayPrayer = {
  weekday: string;
  focus: string;
  scripture: { ref: string; text: string };
  prayer: string;
};

export const marriageWeek: DayPrayer[] = [
  {
    weekday: "Monday",
    focus: "Christ at the center",
    scripture: { ref: "Ephesians 5:32", text: "This is a great mystery, but I speak concerning Christ and the church." },
    prayer: "Father, our marriage is a picture of Your Son and His Bride. Save us from making it about us. Center us on Christ today.",
  },
  {
    weekday: "Tuesday",
    focus: "Words that build",
    scripture: { ref: "Ephesians 4:29", text: "Let no corrupt word proceed out of your mouth, but what is good for necessary edification." },
    prayer: "Lord, guard our mouths today. Let nothing we say to each other tear down. Help us speak life.",
  },
  {
    weekday: "Wednesday",
    focus: "Repent quickly",
    scripture: { ref: "Ephesians 4:26-27", text: "Do not let the sun go down on your wrath, nor give place to the devil." },
    prayer: "Father, where there is unrepented hurt between us, give us courage to confess and forgive today — before nightfall.",
  },
  {
    weekday: "Thursday",
    focus: "Honor and serve",
    scripture: { ref: "Ephesians 5:21", text: "Submitting to one another in the fear of God." },
    prayer: "Lord Jesus, You washed feet. Teach us to outserve each other today, with joy and without scorekeeping.",
  },
  {
    weekday: "Friday",
    focus: "Joy and play",
    scripture: { ref: "Proverbs 5:18", text: "Rejoice with the wife of your youth." },
    prayer: "Father, give us laughter, simple meals, and undivided attention today. Restore the friendship under the marriage.",
  },
  {
    weekday: "Saturday",
    focus: "Sabbath together",
    scripture: { ref: "Genesis 2:24", text: "Therefore a man shall leave his father and mother and be joined to his wife, and they shall become one flesh." },
    prayer: "Lord of the Sabbath, let us rest today — together. Bring our bodies, hearts, and minds back to one another.",
  },
  {
    weekday: "Sunday",
    focus: "Worship together",
    scripture: { ref: "Joshua 24:15", text: "As for me and my house, we will serve the LORD." },
    prayer: "Father, take us into Your house today as one. Renew our covenant before You and Your people.",
  },
];

export const parentingWeek: DayPrayer[] = [
  {
    weekday: "Monday",
    focus: "Their hearts",
    scripture: { ref: "Proverbs 4:23", text: "Keep your heart with all diligence, for out of it spring the issues of life." },
    prayer: "Father, You see the heart of each of my children. Guard their hearts today from what we cannot see. Draw them to Yourself.",
  },
  {
    weekday: "Tuesday",
    focus: "My example",
    scripture: { ref: "Deuteronomy 6:6-7", text: "These words which I command you today shall be in your heart. You shall teach them diligently to your children." },
    prayer: "Lord, my children learn You first by watching me. Make me a witness today — in patience, in repentance, in prayer.",
  },
  {
    weekday: "Wednesday",
    focus: "Their friends and influences",
    scripture: { ref: "1 Corinthians 15:33", text: "Do not be deceived: evil company corrupts good habits." },
    prayer: "Father, give my children friends who love You. Protect them from the influences I cannot see. Let our home be a haven of truth.",
  },
  {
    weekday: "Thursday",
    focus: "Their salvation",
    scripture: { ref: "Acts 16:31", text: "Believe on the Lord Jesus Christ, and you will be saved, you and your household." },
    prayer: "Lord Jesus, save my children. Not just protect them — save them. Make each of them Yours from a young age and forever.",
  },
  {
    weekday: "Friday",
    focus: "My weariness",
    scripture: { ref: "Matthew 11:28", text: "Come to Me, all you who labor and are heavy laden, and I will give you rest." },
    prayer: "Father, parenting is more than I can carry today. Give me Your patience and Your joy. Forgive my harsh words. Renew me.",
  },
  {
    weekday: "Saturday",
    focus: "Their calling",
    scripture: { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, says the LORD, thoughts of peace and not of evil." },
    prayer: "Lord, You have a calling for each of my children. Help me steward them — not own them. Open the doors they are meant to walk through.",
  },
  {
    weekday: "Sunday",
    focus: "Faith handed on",
    scripture: { ref: "Psalm 78:4", text: "We will not hide them from their children, telling to the generation to come the praises of the LORD." },
    prayer: "Father, by Your grace let this family be the generation that did not stop the story. Hand the faith on through us. Through Jesus, amen.",
  },
];

export const marriageIntentions = [
  "I will not let the sun go down on my anger toward my spouse.",
  "I will pray for my spouse by name every day.",
  "I will speak words that build up, not tear down.",
  "I will not compare my marriage to others — online or in person.",
  "I will protect our intimacy from intruders — pornography, emotional affairs, secrets.",
  "I will keep short accounts: confess, forgive, repeat.",
  "I will lead, serve, and lay down my life — even when I don't feel like it.",
  "I will tell my spouse what I love about them, out loud, every week.",
];

export const parentingIntentions = [
  "I will pray for each of my children by name every day.",
  "I will apologize to my children when I am wrong.",
  "I will spend time, not just money, with them this week.",
  "I will read or speak Scripture with my children at least three times this week.",
  "I will guard my own example more than I monitor theirs.",
  "I will not let my anger discipline them. The Spirit will.",
  "I will look each child in the eyes today and tell them I love them.",
  "I will receive my children as gifts, not as projects.",
];
