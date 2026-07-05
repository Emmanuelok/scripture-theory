"use client";

import { useEffect, useMemo, useState } from "react";
import { useProfile, type JournalEntry, type JournalKind, type SecretPrayer, type Gratitude, type Season } from "@/lib/profile";
import { PROMPTS, SEASONS, todaysPrompt } from "@/data/secret-prompts";
import { useRecordActivity } from "@/lib/lastActivity";
import { findThematicallySimilar, type ThemeMatch } from "@/lib/journalThemes";

const KIND_LABEL: Record<JournalKind, string> = {
  reflection: "Reflection",
  prayer: "Prayer",
  gratitude: "Gratitude",
  confession: "Confession",
  lesson: "What I learned",
  letter: "A letter to the Father",
};

const KIND_PROMPT: Record<JournalKind, string> = {
  reflection: "Where is your heart today? What is the Spirit stirring?",
  prayer: "Bring your request to the Father, in your own words.",
  gratitude: "What good gift would you like to thank Him for?",
  confession: "Bring it into the light. He is faithful and just (1 John 1:9).",
  lesson: "What did the Lord teach you today?",
  letter: "Dear Father, …",
};

const KIND_EMOJI: Record<JournalKind, string> = {
  reflection: "🕯",
  prayer: "🙏",
  gratitude: "✨",
  confession: "🕊",
  lesson: "📖",
  letter: "✉",
};

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SecretPlace() {
  const { profile, update, mounted } = useProfile();
  const sp = profile.secretPlace ?? {};

  useRecordActivity(
    mounted
      ? {
          type: "secret-place",
          href: "/secret-place",
          label: "Secret Place",
          sublabel: "Journal · prayer · gratitude",
        }
      : null,
    [mounted]
  );

  // Pre-fill from URL params — e.g. when arriving from a course week's
  // "Journal this prompt" link.
  const [seed, setSeed] = useState<{ title?: string; body?: string } | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const promptParam = url.searchParams.get("prompt");
    const titleParam = url.searchParams.get("title");
    if (promptParam || titleParam) {
      setSeed({
        title: titleParam ?? undefined,
        body: promptParam ? `${promptParam}\n\n` : undefined,
      });
      // Clean the URL so a refresh doesn't keep re-seeding
      url.searchParams.delete("prompt");
      url.searchParams.delete("title");
      window.history.replaceState({}, "", url.pathname + (url.search ? `?${url.searchParams.toString()}` : ""));
    }
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Opening the door…
      </div>
    );
  }

  if (!sp.setupComplete) {
    return <SetupWizard onDone={(state) => update({ secretPlace: { ...state, setupComplete: true, startedAt: new Date().toISOString() } })} />;
  }

  return (
    <div className="space-y-8">
      <Greeting alias={sp.alias} season={sp.season} anchorVerse={sp.anchorVerse} anchorRef={sp.anchorRef} />
      <DailyPromptCard season={sp.season} />
      <JournalSection
        entries={sp.entries ?? []}
        seedTitle={seed?.title}
        seedBody={seed?.body}
        onSave={(e) => update({ secretPlace: { ...sp, entries: [e, ...(sp.entries ?? [])] } })}
        onDelete={(id) => update({ secretPlace: { ...sp, entries: (sp.entries ?? []).filter((x) => x.id !== id) } })}
      />
      <PrayerJournalSection
        prayers={sp.prayers ?? []}
        onAdd={(p) => update({ secretPlace: { ...sp, prayers: [p, ...(sp.prayers ?? [])] } })}
        onUpdate={(id, patch) =>
          update({
            secretPlace: {
              ...sp,
              prayers: (sp.prayers ?? []).map((p) => (p.id === id ? { ...p, ...patch } : p)),
            },
          })
        }
        onDelete={(id) =>
          update({ secretPlace: { ...sp, prayers: (sp.prayers ?? []).filter((p) => p.id !== id) } })
        }
      />
      <GratitudeSection
        gratitudes={sp.gratitudes ?? []}
        onAdd={(g) => update({ secretPlace: { ...sp, gratitudes: [g, ...(sp.gratitudes ?? [])] } })}
        onDelete={(id) =>
          update({ secretPlace: { ...sp, gratitudes: (sp.gratitudes ?? []).filter((g) => g.id !== id) } })
        }
      />
      <SettingsPanel
        sp={sp}
        onChange={(patch) => update({ secretPlace: { ...sp, ...patch } })}
        onReset={() => {
          if (typeof window !== "undefined" && window.confirm("Clear the whole Secret Place? This deletes every entry, prayer, and gratitude.")) {
            update({ secretPlace: undefined });
          }
        }}
        onExport={() => exportAll(sp)}
      />
    </div>
  );
}

/* ─── Setup wizard ─── */
function SetupWizard({ onDone }: { onDone: (s: { alias?: string; season?: Season; anchorVerse?: string; anchorRef?: string }) => void }) {
  const [step, setStep] = useState(0);
  const [alias, setAlias] = useState("");
  const [season, setSeason] = useState<Season | undefined>(undefined);
  const [ref, setRef] = useState("");
  const [verse, setVerse] = useState("");

  return (
    <div className="rounded-3xl border border-ink-200 bg-card-subtle p-8 md:p-10 max-w-2xl mx-auto">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-flame-700">Welcome</span>
        <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900 leading-tight">
          Step into your Secret Place.
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">
          "When you pray, go into your inner room, and having shut your door, pray to your Father
          who is in secret." — Matthew 6:6
        </p>
        <p className="mt-2 text-xs text-ink-500 italic">
          Everything you write here lives only on this device. We never see it, never sync it.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {step === 0 && (
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Question 1 of 3 · optional</div>
            <h3 className="font-serif text-xl text-ink-900 mt-1">What should we call you here?</h3>
            <p className="text-sm text-ink-600 mt-1">A first name, a pseudonym, or nothing at all.</p>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="(leave blank to stay anonymous)"
              className="mt-4 w-full rounded-xl border border-ink-200 bg-card px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              maxLength={40}
            />
            <button onClick={() => setStep(1)} className="mt-5 rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700">
              Continue →
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Question 2 of 3 · optional</div>
            <h3 className="font-serif text-xl text-ink-900 mt-1">What season are you in?</h3>
            <p className="text-sm text-ink-600 mt-1">Pick one. You can change it any time. The prompts will adapt to where you are.</p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {SEASONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setSeason(s.id)}
                    className={`w-full text-left rounded-xl border p-3 transition-colors text-sm ${
                      season === s.id
                        ? "bg-ink-900 text-ink-50 border-ink-900"
                        : "bg-card text-ink-900 border-ink-200 hover:border-flame-500"
                    }`}
                  >
                    <div className="font-serif text-base">{s.label}</div>
                    <div className={`text-xs mt-0.5 ${season === s.id ? "text-ink-300" : "text-ink-500"}`}>
                      {s.blurb}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between text-sm">
              <button onClick={() => setStep(0)} className="text-ink-500 hover:text-ink-900">← Back</button>
              <button onClick={() => setStep(2)} className="rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700">
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Question 3 of 3 · optional</div>
            <h3 className="font-serif text-xl text-ink-900 mt-1">A verse that is anchoring you?</h3>
            <p className="text-sm text-ink-600 mt-1">If a particular verse is on your heart, write it here. It will sit at the top of your page.</p>
            <input
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="Reference — e.g. Psalm 23:1"
              className="mt-4 w-full rounded-xl border border-ink-200 bg-card px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              maxLength={40}
            />
            <textarea
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="Verse text (optional)"
              rows={3}
              className="mt-2 w-full rounded-xl border border-ink-200 bg-card px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
            />
            <div className="mt-5 flex justify-between text-sm">
              <button onClick={() => setStep(1)} className="text-ink-500 hover:text-ink-900">← Back</button>
              <button
                onClick={() =>
                  onDone({
                    alias: alias.trim() || undefined,
                    season,
                    anchorRef: ref.trim() || undefined,
                    anchorVerse: verse.trim() || undefined,
                  })
                }
                className="rounded-full bg-flame-600 text-white px-5 py-2.5 text-sm hover:bg-flame-700"
              >
                Open my Secret Place →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Greeting ─── */
function Greeting({
  alias,
  season,
  anchorVerse,
  anchorRef,
}: {
  alias?: string;
  season?: Season;
  anchorVerse?: string;
  anchorRef?: string;
}) {
  const seasonInfo = SEASONS.find((s) => s.id === season);
  const now = new Date();
  const hour = now.getHours();
  const greet = hour < 5 ? "Quiet night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const name = alias?.trim() ? `, ${alias}` : "";
  return (
    <header className="text-center py-6 md:py-10">
      <div className="text-xs uppercase tracking-widest text-flame-700">Matthew 6:6 · the inner room</div>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        {greet}{name}.
      </h1>
      <p className="mt-3 text-ink-600 italic">Welcome back to your Secret Place.</p>

      {seasonInfo && (
        <div className="mt-6 inline-flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-widest text-ink-500">A season of</div>
          <div className="font-serif text-2xl text-ink-900 mt-0.5">{seasonInfo.label}</div>
          <div className="text-sm text-ink-600 mt-1 italic max-w-md">{seasonInfo.blurb}</div>
          <div className="text-xs text-flame-700 mt-1">{seasonInfo.verse}</div>
        </div>
      )}

      {anchorVerse && (
        <blockquote className="mt-8 mx-auto max-w-xl prose-scripture text-ink-800">
          <p>"{anchorVerse}"</p>
          {anchorRef && <footer className="text-xs text-ink-500 mt-1 not-italic">— {anchorRef}</footer>}
        </blockquote>
      )}
    </header>
  );
}

/* ─── Daily prompt ─── */
function DailyPromptCard({ season }: { season?: Season }) {
  const p = useMemo(() => todaysPrompt(season), [season]);
  const movementLabel = {
    listen: "Listening",
    ask: "Asking",
    remember: "Remembering",
    become: "Becoming",
    release: "Releasing",
  }[p.movement];

  return (
    <section className="rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-widest text-flame-700">Today's prompt · {movementLabel}</div>
      <p className="mt-4 font-serif text-xl md:text-2xl text-ink-900 leading-snug">{p.text}</p>
      {p.scripture && (
        <blockquote className="mt-5 border-l-4 border-flame-300 pl-4">
          <p className="prose-scripture text-ink-800 text-sm italic">"{p.scripture.text}"</p>
          <footer className="text-xs text-ink-500 mt-1 not-italic">— {p.scripture.ref}</footer>
        </blockquote>
      )}
      <p className="mt-5 text-xs text-ink-500 italic">Take five minutes. Write below.</p>
    </section>
  );
}

/* ─── Journal ─── */
function JournalSection({
  entries,
  seedTitle,
  seedBody,
  onSave,
  onDelete,
}: {
  entries: JournalEntry[];
  seedTitle?: string;
  seedBody?: string;
  onSave: (e: JournalEntry) => void;
  onDelete: (id: string) => void;
}) {
  const [kind, setKind] = useState<JournalKind>("reflection");
  const [body, setBody] = useState(seedBody ?? "");
  const [title, setTitle] = useState(seedTitle ?? "");
  const [scriptureRef, setScriptureRef] = useState("");
  const [filter, setFilter] = useState<JournalKind | "all">("all");

  // Re-seed if the param changes after first render
  useEffect(() => {
    if (seedTitle != null) setTitle(seedTitle);
    if (seedBody != null) setBody(seedBody);
    if ((seedTitle || seedBody) && typeof window !== "undefined") {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedTitle, seedBody]);

  function submit() {
    if (!body.trim()) return;
    onSave({
      id: newId(),
      kind,
      title: title.trim() || undefined,
      body: body.trim(),
      scriptureRef: scriptureRef.trim() || undefined,
      date: new Date().toISOString(),
    });
    setBody("");
    setTitle("");
    setScriptureRef("");
  }

  const visible = filter === "all" ? entries : entries.filter((e) => e.kind === filter);

  // Debounced theme-aware recall — surfaces past entries that share themes
  // with what is being written now. Pure on-device.
  const [matches, setMatches] = useState<ThemeMatch[]>([]);
  useEffect(() => {
    const draft = `${title} ${body}`.trim();
    if (draft.length < 60 || entries.length === 0) {
      setMatches([]);
      return;
    }
    const t = setTimeout(() => {
      setMatches(findThematicallySimilar({ body, title }, entries, 3));
    }, 600);
    return () => clearTimeout(t);
  }, [body, title, entries]);

  return (
    <section className="max-w-2xl mx-auto">
      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Write</div>
            <h3 className="font-serif text-xl text-ink-900 mt-0.5">{KIND_LABEL[kind]}</h3>
            <p className="text-xs text-ink-500 italic mt-0.5">{KIND_PROMPT[kind]}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(Object.keys(KIND_LABEL) as JournalKind[]).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                kind === k
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
              }`}
            >
              <span className="mr-1.5" aria-hidden>{KIND_EMOJI[k]}</span>
              {KIND_LABEL[k]}
            </button>
          ))}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A short title (optional)"
          className="w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300 mb-2"
          maxLength={120}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          placeholder="Write freely. Nothing is sent anywhere."
          className="w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300 font-serif leading-relaxed"
        />
        <input
          value={scriptureRef}
          onChange={(e) => setScriptureRef(e.target.value)}
          placeholder="A scripture that goes with this (optional) — e.g. Psalm 23:1"
          className="mt-2 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
          maxLength={60}
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={submit}
            disabled={!body.trim()}
            className="rounded-full bg-flame-600 text-white px-5 py-2 text-sm hover:bg-flame-700 disabled:opacity-50"
          >
            Save to the Secret Place
          </button>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="mt-4 rounded-3xl border border-flame-200 bg-flame-50/40 p-5">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            You've been here before
          </div>
          <p className="mt-1 text-sm text-ink-700 italic">
            Past entries that share themes with what you're writing now —
            {matches[0].sharedTerms.length > 0 && (
              <>
                {" "}around{" "}
                <span className="text-flame-700">
                  {matches[0].sharedTerms.slice(0, 4).join(", ")}
                </span>.
              </>
            )}
          </p>
          <ul className="mt-3 space-y-2">
            {matches.map((m) => (
              <li
                key={m.entry.id}
                className="rounded-2xl border border-ink-200 bg-card p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      <span className="mr-1" aria-hidden>{KIND_EMOJI[m.entry.kind]}</span>
                      {KIND_LABEL[m.entry.kind]}
                    </div>
                    {m.entry.title && (
                      <h5 className="font-serif text-base text-ink-900 mt-0.5 truncate">
                        {m.entry.title}
                      </h5>
                    )}
                  </div>
                  <div className="text-xs text-ink-500 shrink-0">{fmtDate(m.entry.date)}</div>
                </div>
                <p className="mt-1.5 text-sm text-ink-700 leading-relaxed line-clamp-3">
                  {m.entry.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {entries.length > 0 && (
        <>
          <div className="mt-8 mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-xl text-ink-900">Your entries</h3>
            <div className="flex flex-wrap gap-1.5">
              <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>All ({entries.length})</FilterPill>
              {(Object.keys(KIND_LABEL) as JournalKind[]).map((k) => {
                const n = entries.filter((e) => e.kind === k).length;
                if (n === 0) return null;
                return (
                  <FilterPill key={k} active={filter === k} onClick={() => setFilter(k)}>
                    {KIND_EMOJI[k]} {n}
                  </FilterPill>
                );
              })}
            </div>
          </div>
          <ul className="space-y-3">
            {visible.map((e) => (
              <li key={e.id} className="rounded-2xl border border-ink-200 bg-card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      <span className="mr-1" aria-hidden>{KIND_EMOJI[e.kind]}</span>
                      {KIND_LABEL[e.kind]}
                    </div>
                    {e.title && <h4 className="font-serif text-lg text-ink-900 mt-0.5">{e.title}</h4>}
                  </div>
                  <div className="text-xs text-ink-500 shrink-0">{fmtDate(e.date)}</div>
                </div>
                <p className="mt-2 prose-scripture text-ink-800 whitespace-pre-wrap leading-relaxed">{e.body}</p>
                {e.scriptureRef && (
                  <div className="mt-2 text-xs text-flame-700">— {e.scriptureRef}</div>
                )}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.confirm("Delete this entry?")) onDelete(e.id);
                    }}
                    className="text-xs text-ink-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/* ─── Prayer journal ─── */
function PrayerJournalSection({
  prayers,
  onAdd,
  onUpdate,
  onDelete,
}: {
  prayers: SecretPrayer[];
  onAdd: (p: SecretPrayer) => void;
  onUpdate: (id: string, patch: Partial<SecretPrayer>) => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [view, setView] = useState<"active" | "answered" | "released">("active");
  const [answerNote, setAnswerNote] = useState<Record<string, string>>({});

  function add() {
    if (!title.trim()) return;
    onAdd({
      id: newId(),
      title: title.trim(),
      body: body.trim() || undefined,
      date: new Date().toISOString(),
      status: "active",
    });
    setTitle("");
    setBody("");
  }

  const filtered = prayers.filter((p) => p.status === view);
  const counts = {
    active: prayers.filter((p) => p.status === "active").length,
    answered: prayers.filter((p) => p.status === "answered").length,
    released: prayers.filter((p) => p.status === "released").length,
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">Prayer journal</div>
        <h3 className="font-serif text-xl text-ink-900 mt-0.5">What are you asking the Father for?</h3>

        <div className="mt-4 space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title — e.g. 'Mom's healing', 'wisdom for the move'"
            className="w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
            maxLength={120}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="The fuller request, if you want (optional)"
            className="w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300 font-serif"
          />
          <div className="flex justify-end">
            <button
              onClick={add}
              disabled={!title.trim()}
              className="rounded-full bg-flame-600 text-white px-4 py-1.5 text-sm hover:bg-flame-700 disabled:opacity-50"
            >
              Add to my prayers
            </button>
          </div>
        </div>

        {prayers.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <FilterPill active={view === "active"} onClick={() => setView("active")}>
                Active ({counts.active})
              </FilterPill>
              <FilterPill active={view === "answered"} onClick={() => setView("answered")}>
                Answered ({counts.answered})
              </FilterPill>
              <FilterPill active={view === "released"} onClick={() => setView("released")}>
                Released ({counts.released})
              </FilterPill>
            </div>

            <ul className="space-y-3">
              {filtered.map((p) => (
                <li key={p.id} className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-ink-900">{p.title}</h4>
                    <div className="text-xs text-ink-500">{fmtDate(p.date)}</div>
                  </div>
                  {p.body && <p className="mt-1.5 text-sm text-ink-700 leading-relaxed whitespace-pre-wrap">{p.body}</p>}
                  {p.status === "answered" && p.answerNote && (
                    <div className="mt-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-900">
                      <div className="text-[10px] uppercase tracking-widest text-emerald-700 mb-1">
                        Answered {p.answeredAt && `· ${fmtDate(p.answeredAt)}`}
                      </div>
                      <p className="leading-relaxed">{p.answerNote}</p>
                    </div>
                  )}
                  {p.status === "active" && (
                    <div className="mt-3 space-y-2">
                      <textarea
                        value={answerNote[p.id] ?? ""}
                        onChange={(e) => setAnswerNote((m) => ({ ...m, [p.id]: e.target.value }))}
                        placeholder="When He answers, write how (optional)…"
                        rows={2}
                        className="w-full rounded-lg border border-ink-200 bg-card px-2.5 py-1.5 text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            onUpdate(p.id, {
                              status: "answered",
                              answeredAt: new Date().toISOString(),
                              answerNote: (answerNote[p.id] ?? "").trim() || undefined,
                            })
                          }
                          className="rounded-full bg-emerald-600 text-white px-3 py-1 text-xs hover:bg-emerald-700"
                        >
                          Mark answered ✓
                        </button>
                        <button
                          onClick={() => onUpdate(p.id, { status: "released" })}
                          className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
                          title="Lay this down and trust the Father with it"
                        >
                          Release it
                        </button>
                        <button
                          onClick={() => {
                            if (typeof window !== "undefined" && window.confirm("Remove this prayer permanently? This can't be undone."))
                              onDelete(p.id);
                          }}
                          className="ml-auto text-xs text-ink-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                  {(p.status === "answered" || p.status === "released") && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => onUpdate(p.id, { status: "active", answeredAt: undefined, answerNote: undefined })}
                        className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
                      >
                        Move back to active
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.confirm("Remove this prayer permanently? This can't be undone."))
                            onDelete(p.id);
                        }}
                        className="ml-auto text-xs text-ink-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="text-sm text-ink-500 italic text-center py-6">
                  No prayers in this view yet.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Gratitude log ─── */
function GratitudeSection({
  gratitudes,
  onAdd,
  onDelete,
}: {
  gratitudes: Gratitude[];
  onAdd: (g: Gratitude) => void;
  onDelete: (id: string) => void;
}) {
  const [text, setText] = useState("");

  function add() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({ id: newId(), text: trimmed, date: new Date().toISOString() });
    setText("");
  }

  return (
    <section className="max-w-2xl mx-auto">
      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">Gratitudes</div>
        <h3 className="font-serif text-xl text-ink-900 mt-0.5">Count the gifts.</h3>
        <p className="text-sm text-ink-500 italic mt-1">Quick, no pressure. Small things count.</p>

        <div className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") add(); }}
            placeholder="A morning ray of sun · a friend's text · daily bread …"
            className="flex-1 rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
            maxLength={200}
          />
          <button
            onClick={add}
            disabled={!text.trim()}
            className="rounded-full bg-flame-600 text-white px-4 py-1.5 text-sm hover:bg-flame-700 disabled:opacity-50"
          >
            +
          </button>
        </div>

        {gratitudes.length > 0 && (
          <ul className="mt-5 space-y-2">
            {gratitudes.slice(0, 30).map((g) => (
              <li key={g.id} className="flex items-baseline justify-between gap-3 rounded-xl bg-card-subtle border border-ink-200 px-3 py-2">
                <span className="text-sm text-ink-800 leading-relaxed">✨ {g.text}</span>
                <span className="text-xs text-ink-500 shrink-0">{fmtDate(g.date)}</span>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined" && window.confirm("Remove this gratitude permanently?"))
                      onDelete(g.id);
                  }}
                  className="text-xs text-ink-400 hover:text-red-600"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </li>
            ))}
            {gratitudes.length > 30 && (
              <li className="text-xs text-ink-500 text-center pt-2">…{gratitudes.length - 30} more, kept safely</li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ─── Settings ─── */
function SettingsPanel({
  sp,
  onChange,
  onReset,
  onExport,
}: {
  sp: { alias?: string; season?: Season; anchorVerse?: string; anchorRef?: string };
  onChange: (patch: { alias?: string; season?: Season; anchorVerse?: string; anchorRef?: string }) => void;
  onReset: () => void;
  onExport: () => void;
}) {
  return (
    <section className="max-w-2xl mx-auto">
      <details className="rounded-3xl border border-ink-200 bg-card-subtle p-5 md:p-6">
        <summary className="cursor-pointer text-sm text-ink-700 hover:text-flame-700">
          Settings · alias · season · anchor verse · export · reset
        </summary>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-ink-500">What you're called here</span>
            <input
              value={sp.alias ?? ""}
              onChange={(e) => onChange({ alias: e.target.value || undefined })}
              placeholder="(blank for anonymous)"
              className="mt-1 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              maxLength={40}
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-ink-500">Season</span>
            <select
              value={sp.season ?? ""}
              onChange={(e) => onChange({ season: (e.target.value || undefined) as Season | undefined })}
              className="mt-1 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-flame-300"
            >
              <option value="">(none)</option>
              {SEASONS.map((s) => (
                <option key={s.id} value={s.id}>{s.label} — {s.blurb}</option>
              ))}
            </select>
          </label>

          <div className="grid sm:grid-cols-[200px_1fr] gap-2">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-ink-500">Anchor verse — reference</span>
              <input
                value={sp.anchorRef ?? ""}
                onChange={(e) => onChange({ anchorRef: e.target.value || undefined })}
                placeholder="Psalm 23:1"
                className="mt-1 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-ink-500">Anchor verse — text</span>
              <input
                value={sp.anchorVerse ?? ""}
                onChange={(e) => onChange({ anchorVerse: e.target.value || undefined })}
                placeholder="Yahweh is my shepherd; I shall lack nothing."
                className="mt-1 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={onExport}
              className="rounded-full border border-ink-300 bg-card px-4 py-1.5 text-xs text-ink-700 hover:border-ink-900"
              title="Download every entry, prayer, and gratitude as a text file"
            >
              Export everything
            </button>
            <button
              onClick={onReset}
              className="rounded-full border border-red-200 bg-card text-red-700 px-4 py-1.5 text-xs hover:bg-red-50"
            >
              Clear the Secret Place
            </button>
          </div>

          <p className="text-[11px] text-ink-500 italic leading-relaxed pt-2">
            Privacy: this page lives only on this device. We never see, sync, or sell any of it.
            If you clear your browser data, it goes with it — export first.
          </p>
        </div>
      </details>
    </section>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs border transition-colors ${
        active ? "bg-ink-900 text-ink-50 border-ink-900" : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
      }`}
    >
      {children}
    </button>
  );
}

function exportAll(sp: {
  alias?: string;
  season?: Season;
  anchorRef?: string;
  anchorVerse?: string;
  entries?: JournalEntry[];
  prayers?: SecretPrayer[];
  gratitudes?: Gratitude[];
}) {
  if (typeof window === "undefined") return;
  const lines: string[] = [];
  lines.push("Scripture Theory · My Secret Place");
  lines.push(`Exported ${new Date().toLocaleString()}`);
  lines.push("");
  if (sp.alias) lines.push(`Alias: ${sp.alias}`);
  if (sp.season) lines.push(`Season: ${sp.season}`);
  if (sp.anchorRef || sp.anchorVerse) {
    lines.push(`Anchor verse: ${sp.anchorVerse ?? ""}${sp.anchorRef ? ` — ${sp.anchorRef}` : ""}`);
  }
  lines.push("");
  if ((sp.entries ?? []).length > 0) {
    lines.push("─── JOURNAL ───");
    for (const e of sp.entries!) {
      lines.push("");
      lines.push(`[${KIND_LABEL[e.kind]}] ${e.title ?? ""}  (${fmtDate(e.date)})`);
      lines.push(e.body);
      if (e.scriptureRef) lines.push(`— ${e.scriptureRef}`);
    }
    lines.push("");
  }
  if ((sp.prayers ?? []).length > 0) {
    lines.push("─── PRAYERS ───");
    for (const p of sp.prayers!) {
      lines.push("");
      lines.push(`[${p.status.toUpperCase()}] ${p.title}  (${fmtDate(p.date)})`);
      if (p.body) lines.push(p.body);
      if (p.answerNote) lines.push(`Answered: ${p.answerNote}`);
    }
    lines.push("");
  }
  if ((sp.gratitudes ?? []).length > 0) {
    lines.push("─── GRATITUDES ───");
    for (const g of sp.gratitudes!) lines.push(`${fmtDate(g.date)} — ${g.text}`);
  }

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `secret-place-${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
