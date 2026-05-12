export type GospelMovement = {
  number: string;
  title: string;
  subtitle: string;
  scripture: string;
  reference: string;
  body: string;
  echoes: string[];
};

export const gospelMovements: GospelMovement[] = [
  {
    number: "01",
    title: "God",
    subtitle: "He made you. He loves you. He is good.",
    scripture:
      "In the beginning, God created the heavens and the earth... And God saw everything that he had made, and behold, it was very good.",
    reference: "Genesis 1:1, 31",
    body: "Before anything else, there is God — the Father, the Son, and the Holy Spirit — who has always existed in perfect love. He made the universe, and He made you. You were created on purpose, by Someone who is good. You were never meant to live for yourself or by yourself. You were made for Him.",
    echoes: ["Psalm 139:13–14", "Acts 17:24–28", "1 John 4:8"],
  },
  {
    number: "02",
    title: "Our sin",
    subtitle: "Something went wrong — in the world, and in us.",
    scripture:
      "For all have sinned and fall short of the glory of God... For the wages of sin is death.",
    reference: "Romans 3:23; 6:23",
    body: "From the beginning, humanity has chosen to live as if we were God instead of trusting Him. The Bible calls this sin. It is not just bad behavior — it is a broken relationship. Sin separates us from God, breaks our communion with one another, and ends in death. We cannot fix it by trying harder or being more religious. We need to be rescued.",
    echoes: ["Genesis 3:1–13", "Isaiah 59:1–2", "Ephesians 2:1–3"],
  },
  {
    number: "03",
    title: "Jesus",
    subtitle: "He came. He died. He rose. He is Lord.",
    scripture:
      "For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures, and that he appeared...",
    reference: "1 Corinthians 15:3–5",
    body: "God did not leave us in our sin. The eternal Son of God became a man — Jesus of Nazareth. He lived the life we should have lived. He died on a Roman cross, in our place, for our sins. He was buried. On the third day, He rose from the dead, conquering death itself. He is now King of kings, and one day He will return. This is the ONE Gospel — there is no other.",
    echoes: ["John 1:14; 3:16", "Romans 5:6–8", "1 Peter 3:18"],
  },
  {
    number: "04",
    title: "Your response",
    subtitle: "Turn. Trust. Follow. Belong.",
    scripture:
      "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.",
    reference: "Romans 10:9",
    body: "The Gospel asks for a response. Turn from sin. Trust Jesus. Receive His Spirit. Be baptized. Follow Him. Belong to His people — the Church. This is not a one-time decision; it is a whole life. And it begins the moment you say yes to Him.",
    echoes: ["Mark 1:14–15", "Acts 2:38–39", "John 1:12–13"],
  },
];

export const prayerOfResponse = {
  intro:
    "If you have never said yes to Jesus, or if you want to say it again today, here are simple words you can pray. There is nothing magic about the words — Jesus hears the heart behind them.",
  prayer: `Jesus,
I have lived for myself.
I have sinned, and I cannot save myself.
I believe You died for me and rose again.
Today I turn from my sin and turn to You.
Be my Lord. Be my Savior. Be my friend.
Send Your Spirit. Make me new.
I belong to You now. Lead me, and I will follow.
Amen.`,
};

export const nextSteps = [
  {
    title: "Tell someone today",
    body: "Tell one Christian friend you said yes to Jesus. If you don't know one, write to a pastor near you. The Christian life is not lived alone.",
  },
  {
    title: "Open the Word",
    body: "Begin with the Gospel of John. We have a 30-day plan ready for you. Read a chapter a day and let Jesus introduce Himself.",
  },
  {
    title: "Find a local church",
    body: "Baptism, the Lord's Supper, and life with God's people happen in a real church. We can help you find one — and meet a real pastor.",
  },
  {
    title: "Begin to pray",
    body: "Talk to God like a Father. He is. Use the Lord's Prayer as your guide. We have a walk-through to help you start.",
  },
];
