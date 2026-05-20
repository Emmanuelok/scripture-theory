/**
 * Testimonies type used across the witness pages.
 *
 * IMPORTANT: this file no longer contains any sample / placeholder stories.
 * Real testimonies are submitted by believers through /witness/share and
 * stored in the `testimonies` Supabase table (see lib/testimonies-cloud.ts
 * for the schema and helpers). The `testimonies` array below is exported
 * as an empty list ONLY so legacy imports keep type-checking — every
 * surface that displays testimonies now reads them from the database
 * via the TestimoniesWall component.
 */

export type Testimony = {
  name: string;
  place: string;
  before: string;
  encounter: string;
  now: string;
  verse: string;
};

export const testimonies: Testimony[] = [];

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
