"use client";

import { useMemo, useState } from "react";
import { useProfile, type SermonNote } from "@/lib/profile";
import { referenceHref } from "@/lib/reference";
import Link from "next/link";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const FIELDS: { key: keyof SermonNote; label: string; placeholder: string; rows?: number }[] = [
  { key: "passage", label: "Passage", placeholder: "Romans 8:28-39" },
  { key: "title", label: "Sermon title (if given)", placeholder: "" },
  { key: "preacher", label: "Preacher", placeholder: "" },
  { key: "church", label: "Church / gathering", placeholder: "" },
  { key: "bigIdea", label: "The big idea", placeholder: "In one sentence — what is the sermon saying?", rows: 2 },
  { key: "outline", label: "Outline / what was said", placeholder: "Main points, illustrations, quotes — in your own shorthand.", rows: 6 },
  { key: "questions", label: "Questions to study", placeholder: "Where do I want to dig deeper? What did I not understand?", rows: 3 },
  { key: "application", label: "Application — for me", placeholder: "What will I do this week? Who do I need to share this with?", rows: 3 },
  { key: "prayer", label: "Prayer", placeholder: "Father, in light of this Word…", rows: 3 },
];

export default function SermonNotesView() {
  const { profile, update, mounted } = useProfile();
  const sermons = profile.sermons ?? [];

  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<SermonNote>>({});
  const [editing, setEditing] = useState(false);

  const sorted = useMemo(() => [...sermons].sort((a, b) => b.date.localeCompare(a.date)), [sermons]);
  const opened = openId ? sermons.find((s) => s.id === openId) : null;

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function startNew() {
    setOpenId(null);
    setDraft({});
    setEditing(true);
  }

  function save() {
    if (editing && !openId) {
      const s: SermonNote = {
        id: newId(),
        date: new Date().toISOString(),
        ...draft,
      };
      update({ sermons: [s, ...sermons] });
      setOpenId(s.id);
      setDraft({});
      setEditing(false);
    } else if (editing && openId) {
      update({
        sermons: sermons.map((s) => (s.id === openId ? { ...s, ...draft } : s)),
      });
      setEditing(false);
      setDraft({});
    }
  }

  function startEdit() {
    if (!opened) return;
    setDraft(opened);
    setEditing(true);
  }

  function deleteOne(id: string) {
    if (typeof window !== "undefined" && window.confirm("Delete this sermon note?")) {
      update({ sermons: sermons.filter((s) => s.id !== id) });
      if (openId === id) setOpenId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Sermon notes</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">
              Catch what your pastor says.
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              The Word you hear preached fades within hours unless you write it down. Capture it
              here, on your device. Cross-reference into the Bible reader. Pray it back during the
              week.
            </p>
          </div>
          <button
            onClick={startNew}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700 shrink-0"
          >
            + New sermon note
          </button>
        </div>
      </section>

      {editing && (
        <section className="rounded-3xl border border-flame-300 bg-card p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-flame-700">
            {openId ? "Editing" : "New sermon"}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {FIELDS.map((f) => (
              <div key={f.key as string} className={f.rows ? "sm:col-span-2" : ""}>
                <label className="text-[10px] uppercase tracking-widest text-flame-700">
                  {f.label}
                </label>
                {f.rows ? (
                  <textarea
                    rows={f.rows}
                    value={(draft[f.key] as string) ?? ""}
                    onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
                  />
                ) : (
                  <input
                    value={(draft[f.key] as string) ?? ""}
                    onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={save}
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setDraft({});
              }}
              className="rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      {opened && !editing && (
        <article className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-flame-300">
                {new Date(opened.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {opened.preacher && ` · ${opened.preacher}`}
                {opened.church && ` · ${opened.church}`}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl mt-1">{opened.title || "Sermon"}</h2>
              {opened.passage && (
                <div className="mt-1 text-flame-300 text-sm">
                  {(() => {
                    const href = referenceHref(opened.passage);
                    return href ? (
                      <Link href={href} className="hover:underline">
                        {opened.passage} →
                      </Link>
                    ) : (
                      opened.passage
                    );
                  })()}
                </div>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={startEdit}
                className="text-xs text-flame-300 hover:text-ink-50"
              >
                Edit
              </button>
              <button
                onClick={() => deleteOne(opened.id)}
                className="text-xs text-ink-400 hover:text-flame-300"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {opened.bigIdea && <Block label="Big idea" body={opened.bigIdea} />}
            {opened.outline && <Block label="Outline" body={opened.outline} />}
            {opened.questions && <Block label="Questions to study" body={opened.questions} />}
            {opened.application && <Block label="Application" body={opened.application} />}
            {opened.prayer && <Block label="Prayer" body={opened.prayer} />}
          </div>
        </article>
      )}

      {!editing && sorted.length > 0 && (
        <section>
          <h3 className="font-serif text-2xl text-ink-900">All notes</h3>
          <ul className="mt-3 space-y-2">
            {sorted.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    setOpenId(s.id);
                    setEditing(false);
                  }}
                  className={`w-full text-left rounded-2xl border p-4 ${
                    openId === s.id ? "border-flame-500 bg-flame-50/60" : "border-ink-200 bg-card hover:border-ink-400"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    {new Date(s.date).toLocaleDateString()}
                    {s.preacher && ` · ${s.preacher}`}
                  </div>
                  <div className="font-serif text-ink-900 mt-1">
                    {s.title || s.passage || "Untitled sermon"}
                  </div>
                  {s.bigIdea && <p className="text-xs text-ink-500 mt-0.5 line-clamp-1">{s.bigIdea}</p>}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!editing && sorted.length === 0 && (
        <p className="text-ink-500 text-sm">
          No sermon notes yet. Sunday is coming.
        </p>
      )}
    </div>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-flame-300">{label}</div>
      <p className="mt-1 text-ink-100 leading-relaxed whitespace-pre-wrap">{body}</p>
    </div>
  );
}
