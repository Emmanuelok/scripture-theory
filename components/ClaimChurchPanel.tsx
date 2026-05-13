"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  createClaim,
  deleteClaim,
  listMyClaims,
  updateClaim,
  type ChurchClaim,
} from "@/lib/pastor";

/* ──────────────────────────────────────────────────────────────────
   ClaimChurchPanel — pastor signs in, claims their church, and can
   edit or remove the claim. Real rows in Supabase.
────────────────────────────────────────────────────────────────── */

const empty = {
  church_name: "",
  city: "",
  country: "",
  tradition: "",
  osm_id: "",
  service_times: "",
  contact_email: "",
  pastor_name: "",
  pastor_role: "",
  notes: "",
};

type Draft = typeof empty;

export default function ClaimChurchPanel() {
  const { configured, ready, user } = useAuth();
  const [claims, setClaims] = useState<ChurchClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft>(empty);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!configured || !ready || !user) {
      setLoading(false);
      return;
    }
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured, ready, user]);

  async function refresh() {
    setLoading(true);
    const list = await listMyClaims();
    setClaims(list);
    setLoading(false);
  }

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function startEdit(c: ChurchClaim) {
    setEditingId(c.id);
    setDraft({
      church_name: c.church_name ?? "",
      city: c.city ?? "",
      country: c.country ?? "",
      tradition: c.tradition ?? "",
      osm_id: c.osm_id ?? "",
      service_times: c.service_times ?? "",
      contact_email: c.contact_email ?? "",
      pastor_name: c.pastor_name ?? "",
      pastor_role: c.pastor_role ?? "",
      notes: c.notes ?? "",
    });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(empty);
    setStatus("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.church_name || !draft.city || !draft.country) {
      setStatus("Church name, city, and country are required.");
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const payload = {
        ...draft,
        tradition: draft.tradition || null,
        osm_id: draft.osm_id || null,
        service_times: draft.service_times || null,
        contact_email: draft.contact_email || null,
        pastor_name: draft.pastor_name || null,
        pastor_role: draft.pastor_role || null,
        notes: draft.notes || null,
      };
      const res = editingId
        ? await updateClaim(editingId, payload)
        : await createClaim(payload);
      if (!res.ok) {
        setStatus(res.error ?? "Could not save.");
      } else {
        setDraft(empty);
        setEditingId(null);
        setStatus(editingId ? "Claim updated." : "Church claimed.");
        await refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (typeof window !== "undefined" && !window.confirm("Remove this claim?")) return;
    setBusy(true);
    const res = await deleteClaim(id);
    setBusy(false);
    if (!res.ok) {
      setStatus(res.error ?? "Could not delete.");
    } else {
      setStatus("Claim removed.");
      await refresh();
    }
  }

  if (!ready) {
    return <Card>Loading…</Card>;
  }

  if (!configured) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Setup needed</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          Pastor accounts aren't yet enabled.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          The platform maintainer needs to configure Supabase and run the pastor migration. See{" "}
          <Link href="/account" className="text-flame-700 hover:underline">
            /account
          </Link>{" "}
          for the one-time setup.
        </p>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Sign in to claim</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          Pastors, deacons, elders — sign in first.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          A pastor's claim is tied to your sign-in (passwordless magic link) so we know it's
          really you when a disciple's request is routed to your church.
        </p>
        <Link
          href="/account"
          className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 transition-colors"
        >
          Sign in to continue →
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Existing claims */}
      {!loading && claims.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-ink-900">Your claimed churches</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {claims.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-ink-200 bg-card p-5 flex flex-col gap-3"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg text-ink-900">{c.church_name}</h3>
                    {c.verified ? (
                      <span className="text-[10px] uppercase tracking-widest text-emerald-700">
                        Verified ✓
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest text-ink-400">
                        Pending review
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-ink-500 mt-0.5">
                    {c.city}, {c.country}
                    {c.tradition && <> · {c.tradition}</>}
                  </div>
                  {c.pastor_name && (
                    <div className="text-xs text-ink-500 mt-0.5">
                      {c.pastor_role || "Pastor"}: {c.pastor_name}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <button
                    onClick={() => startEdit(c)}
                    className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-700 hover:border-ink-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(c.id)}
                    className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-500 hover:text-ink-900 hover:border-ink-900"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Form */}
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">
          {editingId ? "Edit claim" : "Claim a church"}
        </div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          {editingId ? "Update your church's details." : "Tell us about your local body."}
        </h2>
        <p className="mt-1 text-sm text-ink-600">
          You can claim multiple churches if you serve in more than one.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Church name"
              required
              value={draft.church_name}
              onChange={(v) => set("church_name", v)}
              placeholder="St. Paul's Anglican, Lagos"
            />
            <Field
              label="Tradition"
              value={draft.tradition}
              onChange={(v) => set("tradition", v)}
              placeholder="Anglican / Reformed / Pentecostal …"
            />
            <Field
              label="City"
              required
              value={draft.city}
              onChange={(v) => set("city", v)}
              placeholder="Lagos"
            />
            <Field
              label="Country"
              required
              value={draft.country}
              onChange={(v) => set("country", v)}
              placeholder="Nigeria"
            />
            <Field
              label="OpenStreetMap ID (optional)"
              value={draft.osm_id}
              onChange={(v) => set("osm_id", v)}
              placeholder="node/12345 or way/67890"
            />
            <Field
              label="Contact email"
              type="email"
              value={draft.contact_email}
              onChange={(v) => set("contact_email", v)}
              placeholder="pastor@church.org"
            />
            <Field
              label="Your name"
              value={draft.pastor_name}
              onChange={(v) => set("pastor_name", v)}
              placeholder="Pastor Daniel"
            />
            <Field
              label="Your role"
              value={draft.pastor_role}
              onChange={(v) => set("pastor_role", v)}
              placeholder="Senior pastor / Elder / Deacon"
            />
          </div>
          <Field
            label="Service times"
            value={draft.service_times}
            onChange={(v) => set("service_times", v)}
            placeholder="Sun 9am & 11am · Wed 7pm prayer"
          />
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">
              Anything else we should know
            </label>
            <textarea
              rows={3}
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Languages spoken, kids ministry, accessibility…"
              className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 disabled:opacity-50"
            >
              {busy ? "Saving…" : editingId ? "Update" : "Claim church"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900"
              >
                Cancel
              </button>
            )}
            <Link
              href="/connect/dashboard"
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900 ml-auto"
            >
              Open dashboard →
            </Link>
          </div>
          {status && (
            <p className="text-sm text-ink-600" role="status">
              {status}
            </p>
          )}
        </form>
      </Card>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">{children}</div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-flame-700">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
      />
    </label>
  );
}
