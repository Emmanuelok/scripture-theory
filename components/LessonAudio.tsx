"use client";

import NeuralAudioPlayer, { type NarrationSegment } from "@/components/NeuralAudioPlayer";

/**
 * LessonAudio — reads course content aloud (the lesson, quoted scripture, the
 * memory verse, prayer prompts). It now speaks with a real neural voice that
 * sounds human, falling back to the device voice where the neural engine can't
 * run. A legitimate accessibility affordance for commuters, the visually
 * impaired, dyslexic readers, and anyone who prefers ear to eye.
 *
 * The playback engine lives in NeuralAudioPlayer; this component just maps the
 * lesson's labelled segments onto it and keeps the original props stable.
 */

type Segment = { label: string; text: string };

type Props = {
  /** Title shown in the player (e.g. "Week 1 · Who Jesus Is"). */
  title: string;
  /** Ordered segments to read. Each is announced with its label. */
  segments: Segment[];
};

export default function LessonAudio({ title, segments }: Props) {
  const narration: NarrationSegment[] = segments.map((s) => ({
    label: s.label,
    text: s.text,
  }));
  return <NeuralAudioPlayer title={title} segments={narration} eyebrow="Listen" />;
}
