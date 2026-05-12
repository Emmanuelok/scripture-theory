export type Testimony = {
  name: string;
  place: string;
  before: string;
  encounter: string;
  now: string;
  verse: string;
};

export const testimonies: Testimony[] = [
  {
    name: "Amaka",
    place: "Lagos, Nigeria",
    before:
      "I was raised in church but had never met Jesus. I went through the motions and carried shame I never told anyone about.",
    encounter:
      "At a Bible study a friend read John 8 over me — 'neither do I condemn you.' I wept for an hour. Jesus did not turn away from what I was hiding.",
    now: "I lead a small group of women in my neighborhood who were also hiding. Together we are learning how to pray.",
    verse: "John 8:11",
  },
  {
    name: "Daniel",
    place: "São Paulo, Brazil",
    before:
      "I was addicted, angry, and had walked out on my family. I thought God was finished with me.",
    encounter:
      "A pastor visited me in jail and read Luke 15 — the father running to meet his son. I gave my life to Jesus on that concrete floor.",
    now: "I am sober four years. I am back home. My wife and I started a recovery group out of our local church.",
    verse: "Luke 15:20",
  },
  {
    name: "Mei",
    place: "Eastern Asia",
    before:
      "I had never read a Bible. A coworker quietly gave me one in my own language and told me to start with John.",
    encounter:
      "I read the whole Gospel in a weekend. By the end I knew Jesus was alive. I prayed in my bedroom and told Him I was His.",
    now: "I meet with two other women in secret. We pray for our families. We pray for our nation. Jesus is enough.",
    verse: "John 20:31",
  },
  {
    name: "Hannah",
    place: "Manchester, United Kingdom",
    before:
      "I had a degree, a career, and panic attacks every Sunday night. I did not believe in God.",
    encounter:
      "A friend dragged me to her church and the pastor preached on the Sermon on the Mount. Jesus made sense for the first time in my life.",
    now: "I have been baptized. I read the Bible on my commute. I have peace for the first time I can remember.",
    verse: "Matthew 11:28–30",
  },
  {
    name: "Pedro",
    place: "Mexico City, Mexico",
    before:
      "I grew up Catholic, but it was words I didn't understand. After my brother died I quit believing anything was real.",
    encounter:
      "A neighbor invited me to read Romans with him. When we got to chapter 8 I understood — nothing could separate me from God's love. Not even my grief.",
    now: "I am still Catholic. I love my parish. But Jesus is no longer a stranger to me. He is my Lord.",
    verse: "Romans 8:38–39",
  },
];

export const sharePrompts = [
  {
    title: "Your one-sentence story",
    body: "Finish this sentence aloud, then write it down: 'Before I met Jesus I was ___. He met me when ___. Now I ___.'",
  },
  {
    title: "Pray for three names",
    body: "Write down three people who do not yet know Jesus. Pray for them by name every day this week.",
  },
  {
    title: "Open John together",
    body: "Ask one of those three friends to read the Gospel of John with you. Two chapters a week, over coffee, no pressure.",
  },
  {
    title: "Invite them to the table",
    body: "Have them over for a meal before you have them in a service. Hospitality is half the Gospel.",
  },
  {
    title: "Be ready for the question",
    body: "When they ask why you have hope, give the answer Peter gives — 'with gentleness and respect' (1 Peter 3:15).",
  },
  {
    title: "Hand them off to the Body",
    body: "Introduce them to your pastor, your small group, your church. The Christian life is not a solo sport.",
  },
];
