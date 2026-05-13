export type IntroRequest = {
  id: string;
  newcomerName: string;
  city: string;
  source: string;
  language: string;
  note: string;
  receivedAt: string;
};

export const sampleIntros: IntroRequest[] = [
  {
    id: "intro-001",
    newcomerName: "Amaka O.",
    city: "Lagos · Surulere",
    source: "Verse Lens · John 8:1–30",
    language: "English",
    note: "Reading John 8 daily for two weeks. Has not been to a church in three years. Asking how to come back without being judged.",
    receivedAt: "Today",
  },
  {
    id: "intro-002",
    newcomerName: "Daniel S.",
    city: "Lagos · Yaba (university)",
    source: "The Path · Stage 2 (Repent & Believe)",
    language: "English / Pidgin",
    note: "Just finished John in 30 Days. Came to faith last week. Wants to be baptized and connected to a small group with other students.",
    receivedAt: "Yesterday",
  },
  {
    id: "intro-003",
    newcomerName: "Bola A.",
    city: "Lagos · Lekki Phase 1",
    source: "Witness · share testimony form",
    language: "English",
    note: "Already a believer, recently relocated for work. Looking for a community that takes discipleship seriously.",
    receivedAt: "3 days ago",
  },
];

export const replyTemplates = [
  {
    label: "Welcome warmly + propose Sunday",
    body: `Hello {{name}},

Praise God for your message — we would love to welcome you this Sunday at {{church}}. We meet at {{time}}, and I would be glad to greet you personally.

In Christ,
{{pastor}}`,
  },
  {
    label: "Set up a brief call this week",
    body: `Hello {{name}},

Thank you for reaching out. Before Sunday I would love to spend 15 minutes hearing your story over a phone call. Would tomorrow or {{day}} work?

In Christ,
{{pastor}}`,
  },
  {
    label: "Connect with a small-group leader nearby",
    body: `Hello {{name}},

We have a small group meeting on {{day}} in {{neighborhood}}, led by {{leader}}, that I think would be a good first home for you. May I introduce you?

In Christ,
{{pastor}}`,
  },
];

export const weeklyMetrics = {
  introsThisWeek: 3,
  introsLastWeek: 2,
  introsByOrigin: [
    { origin: "/today (daily rhythm)", count: 1 },
    { origin: "/lens (Verse Lens)", count: 1 },
    { origin: "/witness/share", count: 1 },
  ],
  newcomersByLanguage: [
    { language: "English", count: 2 },
    { language: "English / Pidgin", count: 1 },
  ],
};

export const pastoralResources = [
  {
    title: "The Path · 12 stages",
    body: "Our discipleship spine, with one observable step per stage.",
    href: "/disciple",
  },
  {
    title: "Verse Lens",
    body: "How the whole Church has read each anchor passage.",
    href: "/lens",
  },
  {
    title: "Pastor claim flow",
    body: "Update or correct your church's listing.",
    href: "/connect/claim",
  },
  {
    title: "Search the platform",
    body: "Find a passage, plan, prayer, church, or testimony in one place.",
    href: "/search",
  },
];
