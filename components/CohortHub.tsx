"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthConfigured } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import {
  createCohort,
  joinCohort,
  listMyCohorts,
  setActiveCohortId,
  type Cohort,
} from "@/lib/cohorts";
import { useProfile } from "@/lib/profile";
import { Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export default function CohortHub() {
  const configured = isAuthConfigured();
  const { user, ready, signInWithMagicLink } = useAuth();
  const { profile } = useProfile();
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"none" | "create" | "join">("none");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) {
        setCohorts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const list = await listMyCohorts();
      if (!cancelled) {
        setCohorts(list);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!configured) {
    return (
      <div className="rounded-3xl border border-flame-300 bg-flame-50/40 p-6 md:p-7">
        <div className="flex items-start gap-3">
          <Glyph id="people" size={36} className="text-flame-700 shrink-0" />
          <div>
            <h3 className="font-serif text-xl text-ink-900">Cohorts need cloud sync.</h3>
            <p className="mt-1 text-sm text-ink-700 leading-relaxed">
              The rest of Scripture Theory lives on this device. Cohorts require a small bit of
              cloud — Supabase — so a group can share progress and a prayer thread. Set
              <code className="text-flame-700 mx-1">NEXT_PUBLIC_SUPABASE_URL</code> and
              <code className="text-flame-700 mx-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your
              environment, run the cohort migration (0004_cohorts.sql), and reload.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <SignInPrompt onSent={() => {}} signInWithMagicLink={signInWithMagicLink} />;
  }

  return (
    <div className="space-y-6">
      {/* Action tiles */}
      <div className="grid sm:grid-cols-2 gap-3">
        <button
          onClick={() => setMode("create")}
          className="text-left rounded-3xl border border-flame-300 bg-flame-50/40 p-5 hover:border-flame-500 hover:bg-flame-50 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            For pastors, small-group leaders, family heads
          </div>
          <h3 className="font-serif text-xl text-ink-900 mt-1">+ Start a cohort</h3>
          <p className="text-sm text-ink-700 mt-1 leading-relaxed">
            Five to eight believers, twelve weeks. Share the code; everyone walks together.
          </p>
        </button>
        <button
          onClick={() => setMode("join")}
          className="text-left rounded-3xl border border-ink-200 bg-card p-5 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            Joining a group
          </div>
          <h3 className="font-serif text-xl text-ink-900 mt-1">Join with a code</h3>
          <p className="text-sm text-ink-700 mt-1 leading-relaxed">
            Your leader gave you a six-letter code. Enter it; pick a display name.
          </p>
        </button>
      </div>

      {mode === "create" && (
        <CreateCohortForm
          defaultAlias={profile.name || profile.secretPlace?.alias || ""}
          onCancel={() => setMode("none")}
          onCreated={(c) => {
            setActiveCohortId(c.id);
            setCohorts((prev) => [c, ...prev]);
            setMode("none");
            if (typeof window !== "undefined") {
              window.location.href = `/cohort/${c.code}`;
            }
          }}
        />
      )}

      {mode === "join" && (
        <JoinCohortForm
          defaultAlias={profile.name || profile.secretPlace?.alias || ""}
          onCancel={() => setMode("none")}
          onJoined={(code) => {
            setMode("none");
            if (typeof window !== "undefined") {
              window.location.href = `/cohort/${code}`;
            }
          }}
        />
      )}

      {/* My cohorts */}
      <div>
        <h2 className="font-serif text-2xl text-ink-900 mb-3">Your cohorts</h2>
        {loading ? (
          <div className="rounded-2xl border border-ink-200 bg-card-subtle p-6 text-center text-ink-500">
            Loading…
          </div>
        ) : cohorts.length === 0 ? (
          <div className="rounded-3xl border border-ink-200 bg-card-subtle p-8 text-center">
            <Glyph id="people" size={48} className="text-flame-700/40 mx-auto mb-3" />
            <p className="text-sm text-ink-600 italic max-w-md mx-auto">
              You're not in any cohort yet. Start one, or join one with a code.
            </p>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-3">
            {cohorts.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/cohort/${c.code}`}
                  className="block rounded-3xl border border-ink-200 bg-card p-5 hover:border-flame-500 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    {c.code} · {c.leader_id === user.id ? "leader" : "member"}
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mt-1">{c.name}</h3>
                  {c.description && (
                    <p className="text-sm text-ink-700 mt-1 leading-relaxed line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Tile
        href="/course/lead"
        eyebrow="For leaders"
        title="How to lead a cohort well"
        sub="Six principles, the shape of a cohort, per-week facilitator notes."
        glyph={<Glyph id="lamp" size={48} />}
      />
    </div>
  );
}

function CreateCohortForm({
  defaultAlias,
  onCancel,
  onCreated,
}: {
  defaultAlias: string;
  onCancel: () => void;
  onCreated: (c: Cohort) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startsOn, setStartsOn] = useState("");
  const [alias, setAlias] = useState(defaultAlias);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!name.trim() || !alias.trim()) {
      setError("Cohort name and your display name are both needed.");
      return;
    }
    setBusy(true);
    setError(null);
    const c = await createCohort({
      name: name.trim(),
      description: description.trim() || undefined,
      startsOn: startsOn || undefined,
      alias: alias.trim(),
    });
    setBusy(false);
    if (!c) {
      setError("Couldn't create the cohort. Try again.");
      return;
    }
    onCreated(c);
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl text-ink-900">Start a new cohort</h3>
        <button onClick={onCancel} className="text-xs text-ink-500 hover:text-ink-900">
          Cancel
        </button>
      </div>
      <Field label="Cohort name" value={name} onChange={setName} placeholder="e.g. Thursday Living Room · Lagos" />
      <Field
        label="Description (optional)"
        value={description}
        onChange={setDescription}
        placeholder="Where you meet, who you are, what you're praying for"
      />
      <Field
        label="Start date (optional)"
        value={startsOn}
        onChange={setStartsOn}
        type="date"
      />
      <Field
        label="Your display name (shown to members)"
        value={alias}
        onChange={setAlias}
        placeholder="e.g. Anna O."
        required
      />
      {error && <p className="text-xs text-red-700">{error}</p>}
      <button
        onClick={submit}
        disabled={busy}
        className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 disabled:opacity-50"
      >
        {busy ? "Creating…" : "Create cohort →"}
      </button>
      <p className="text-xs text-ink-500 italic">
        You'll get a six-letter code to share with your group.
      </p>
    </div>
  );
}

function JoinCohortForm({
  defaultAlias,
  onCancel,
  onJoined,
}: {
  defaultAlias: string;
  onCancel: () => void;
  onJoined: (code: string) => void;
}) {
  const [code, setCode] = useState("");
  const [alias, setAlias] = useState(defaultAlias);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!code.trim()) {
      setError("Enter the code your leader shared.");
      return;
    }
    setBusy(true);
    setError(null);
    const cohortId = await joinCohort(code, alias);
    setBusy(false);
    if (!cohortId) {
      setError("Could not join — check the code and try again.");
      return;
    }
    setActiveCohortId(cohortId);
    onJoined(code.toUpperCase().replace(/[^A-Z0-9-]/g, ""));
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl text-ink-900">Join a cohort</h3>
        <button onClick={onCancel} className="text-xs text-ink-500 hover:text-ink-900">
          Cancel
        </button>
      </div>
      <Field label="Cohort code" value={code} onChange={(v) => setCode(v.toUpperCase())} placeholder="ABCDEF" required />
      <Field
        label="Your display name (shown to the group)"
        value={alias}
        onChange={setAlias}
        placeholder="e.g. Anna O."
        required
      />
      {error && <p className="text-xs text-red-700">{error}</p>}
      <button
        onClick={submit}
        disabled={busy}
        className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 disabled:opacity-50"
      >
        {busy ? "Joining…" : "Join cohort →"}
      </button>
    </div>
  );
}

function SignInPrompt({
  signInWithMagicLink,
  onSent,
}: {
  signInWithMagicLink: (email: string) => Promise<{ ok: boolean; error?: string }>;
  onSent: () => void;
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!email.includes("@")) {
      setError("Enter a real email address.");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await signInWithMagicLink(email);
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? "Could not send the link.");
      return;
    }
    setSent(true);
    onSent();
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-emerald-300 bg-emerald-50/60 p-6 text-center">
        <Glyph id="dove" size={36} className="text-emerald-700 mx-auto" />
        <h3 className="font-serif text-xl text-ink-900 mt-2">Check your inbox</h3>
        <p className="mt-1 text-sm text-ink-700">
          We sent a sign-in link to {email}. Open it on this device to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 space-y-4">
      <h3 className="font-serif text-xl text-ink-900">Sign in to join or create a cohort</h3>
      <p className="text-sm text-ink-700 leading-relaxed">
        Cohorts need a small bit of cloud so a group can see each other's progress and share a
        prayer thread. Your personal Secret Place, journal, and notes still live only on this
        device.
      </p>
      <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" required />
      {error && <p className="text-xs text-red-700">{error}</p>}
      <button
        onClick={submit}
        disabled={busy}
        className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 disabled:opacity-50"
      >
        {busy ? "Sending…" : "Send sign-in link"}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-flame-700">
        {label}
        {required && <span className="text-flame-600 ml-1">*</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-flame-500"
      />
    </label>
  );
}
