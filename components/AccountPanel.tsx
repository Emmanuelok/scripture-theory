"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";
import { loadSyncPrefs, saveSyncPrefs, pushCloudProfile, pullCloudProfile, type SyncPrefs } from "@/lib/cloud-sync";

export default function AccountPanel() {
  const { configured, ready, user, signInWithMagicLink, signInWithOAuth, signOut } = useAuth();
  const { profile } = useProfile();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [prefs, setPrefs] = useState<SyncPrefs>({});
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPrefs(loadSyncPrefs());
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const cloud = await pullCloudProfile();
      if (cloud) setLastSyncedAt(cloud.updatedAt);
    })();
  }, [user]);

  if (!ready) {
    return <Card>Loading…</Card>;
  }

  if (!configured) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Setup needed</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">Cloud sync not yet enabled.</h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          The platform owner needs to set two environment variables (Supabase URL and anon key) and
          run a small SQL migration. Until then, everything continues to live on this device — which
          is itself a feature, not a limitation.
        </p>
        <details className="mt-4 rounded-2xl border border-ink-200 bg-ink-50 p-4 text-sm">
          <summary className="cursor-pointer font-medium text-ink-900">
            Setup instructions (for the maintainer)
          </summary>
          <ol className="mt-3 space-y-2 list-decimal list-inside text-ink-700">
            <li>Create a free project at <code>supabase.com</code>.</li>
            <li>
              Add to <code>.env.local</code>:
              <pre className="mt-1 rounded bg-ink-900 text-ink-50 text-xs p-2 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY`}
              </pre>
            </li>
            <li>
              In the Supabase SQL editor, run the migration from{" "}
              <code>supabase/migrations/0001_profiles.sql</code>.
            </li>
            <li>Enable Email magic-link auth (and optionally Google / Apple) in Supabase → Auth → Providers.</li>
            <li>Redeploy.</li>
          </ol>
        </details>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Sign in</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          A passwordless link, sent to your email.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          No password to forget. We use a one-tap magic link — click it on any device and you're in.
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email.trim()) return;
            setSending(true);
            setStatus("");
            const res = await signInWithMagicLink(email.trim());
            setSending(false);
            setStatus(
              res.ok
                ? `Check ${email.trim()} for a sign-in link.`
                : `Could not send the link. ${res.error ?? ""}`
            );
          }}
          className="mt-5"
        >
          <label className="text-xs uppercase tracking-widest text-flame-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-2xl border border-ink-200 bg-card px-4 py-3 text-ink-900 focus:outline-none focus:border-flame-500"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Email me a sign-in link"}
            </button>
            <span className="text-xs text-ink-500 self-center">or</span>
            <button
              type="button"
              onClick={async () => {
                setStatus("");
                const r = await signInWithOAuth("google");
                if (!r.ok) setStatus(r.error ?? "Google sign-in failed.");
              }}
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={async () => {
                setStatus("");
                const r = await signInWithOAuth("apple");
                if (!r.ok) setStatus(r.error ?? "Apple sign-in failed.");
              }}
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
            >
              Continue with Apple
            </button>
          </div>
          {status && <p className="mt-3 text-sm text-ink-600">{status}</p>}
        </form>

        <ul className="mt-6 space-y-2 text-xs text-ink-500">
          <li>· We store only the things you'd want to carry between devices.</li>
          <li>· The Secret Place is excluded by default (you can opt it in below after signing in).</li>
          <li>· You can sign out and erase your cloud copy any time.</li>
        </ul>
      </Card>
    );
  }

  // Signed in
  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Signed in</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">{user.email}</h2>
            <p className="text-xs text-ink-500 mt-1">
              {lastSyncedAt ? `Last synced ${new Date(lastSyncedAt).toLocaleString()}` : "Synced just now."}
            </p>
          </div>
          <button
            onClick={async () => {
              await signOut();
              setStatus("Signed out. Your local data remains on this device.");
            }}
            className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900"
          >
            Sign out
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={async () => {
              setBusy(true);
              const res = await pushCloudProfile(profile);
              setBusy(false);
              setStatus(res.ok ? "Pushed to cloud." : `Push failed. ${res.error ?? ""}`);
              if (res.ok) setLastSyncedAt(new Date().toISOString());
            }}
            disabled={busy}
            className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700 disabled:opacity-50"
          >
            Push now
          </button>
          <button
            onClick={async () => {
              setBusy(true);
              const cloud = await pullCloudProfile();
              setBusy(false);
              if (!cloud) {
                setStatus("Nothing in the cloud yet.");
                return;
              }
              setLastSyncedAt(cloud.updatedAt);
              setStatus(`Pulled cloud snapshot from ${new Date(cloud.updatedAt).toLocaleString()}.`);
            }}
            disabled={busy}
            className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900 disabled:opacity-50"
          >
            Pull from cloud
          </button>
        </div>
        {status && <p className="mt-3 text-sm text-ink-600">{status}</p>}
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Sync preferences</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">What syncs to the cloud?</h2>

        <ul className="mt-4 space-y-3 text-sm text-ink-700">
          <li>
            <span className="font-medium text-ink-900">Always synced:</span> name, language, stage,
            reading plans, prayer list, fasts, examens, listening, forgiveness, healing, fruit,
            gifts, marriage, parenting, sabbath, calling, sermon notes, catechism progress, nations
            prayed for.
          </li>
          <li className="rounded-2xl border border-flame-200 bg-flame-50/50 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!prefs.includeSecretPlace}
                onChange={(e) => {
                  const next = { ...prefs, includeSecretPlace: e.target.checked };
                  setPrefs(next);
                  saveSyncPrefs(next);
                  setStatus(
                    e.target.checked
                      ? "Secret Place will sync on the next push."
                      : "Secret Place will stay on this device only."
                  );
                }}
                className="mt-1"
              />
              <span>
                <span className="font-medium text-ink-900">Include the Secret Place</span>
                <span className="block text-xs text-ink-600 mt-0.5">
                  Off by default. Matthew 6:6 — your inner room is private. Turn this on only if
                  you want your journal entries, prayers, and gratitudes to travel between devices.
                </span>
              </span>
            </label>
          </li>
        </ul>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Danger zone</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">Erase my cloud copy.</h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          Removes the synced row in our database. Your local data on this device is untouched.
        </p>
        <button
          onClick={async () => {
            if (typeof window === "undefined") return;
            if (!window.confirm("Delete your cloud-synced profile? Your local data is kept.")) return;
            setBusy(true);
            const res = await pushCloudProfile({});
            setBusy(false);
            setStatus(res.ok ? "Cloud copy cleared." : `Failed. ${res.error ?? ""}`);
          }}
          disabled={busy}
          className="mt-3 inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-600 hover:text-ink-900 hover:border-ink-900 disabled:opacity-50"
        >
          Clear cloud copy
        </button>
      </Card>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">{children}</div>;
}
