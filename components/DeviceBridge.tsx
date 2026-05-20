"use client";

import { useRef, useState } from "react";
import {
  applyBundle,
  bundleKeyCount,
  collectBundle,
  decryptBundle,
  downloadBundleFile,
  encryptBundle,
  readBundleFile,
  type ApplyMode,
  type Bundle,
} from "@/lib/device-bridge";

type Tab = "export" | "import";

export default function DeviceBridge() {
  const [tab, setTab] = useState<Tab>("export");
  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
      <div className="flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">Carry your walk</div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
            Move this device&apos;s record to another.
          </h2>
        </div>
        <div className="flex gap-2">
          {(["export", "import"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
                tab === t
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-card text-ink-700 border-ink-300 hover:border-ink-900"
              }`}
            >
              {t === "export" ? "Export" : "Import"}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-700 leading-relaxed max-w-2xl">
        Reading plans, the Secret Place, bookmarks, your profile, and every other
        local record can be sealed into a single encrypted bundle. Choose a
        passphrase only you know; nothing is uploaded.
      </p>

      <div className="mt-6">{tab === "export" ? <ExportPanel /> : <ImportPanel />}</div>

      <p className="mt-6 text-xs text-ink-500 leading-relaxed">
        Crypto: PBKDF2-SHA256 (200,000 iterations) → AES-GCM-256. Excluded from
        the bundle: the auth session, this device&apos;s anonymous IDs, and PWA
        install state — sign in / re-install fresh on the new device.
      </p>
    </div>
  );
}

/* ────────────────────────────── EXPORT ───────────────────────────── */

function ExportPanel() {
  const [passphrase, setPassphrase] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ payload: string; keyCount: number } | null>(null);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setError(null);
    setResult(null);
    if (passphrase.length < 8) {
      setError("Passphrase must be at least 8 characters.");
      return;
    }
    if (passphrase !== confirmPass) {
      setError("The two passphrases don't match.");
      return;
    }
    setBusy(true);
    try {
      const bundle = collectBundle();
      const keyCount = bundleKeyCount(bundle);
      if (keyCount === 0) {
        setError("Nothing on this device yet — there's no record to carry.");
        return;
      }
      const payload = await encryptBundle(bundle, passphrase);
      setResult({ payload, keyCount });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't seal the bundle.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy — select the text and copy by hand.");
    }
  }

  function download() {
    if (!result) return;
    downloadBundleFile(result.payload);
  }

  function reset() {
    setPassphrase("");
    setConfirmPass("");
    setResult(null);
    setError(null);
    setCopied(false);
  }

  return (
    <div className="space-y-4">
      {!result ? (
        <>
          <Field
            label="Choose a passphrase (8+ characters)"
            id="bridge-pass"
            value={passphrase}
            onChange={setPassphrase}
            type="password"
            placeholder="something only you would know"
          />
          <Field
            label="Confirm passphrase"
            id="bridge-pass-2"
            value={confirmPass}
            onChange={setConfirmPass}
            type="password"
          />
          {error && <ErrorPanel>{error}</ErrorPanel>}
          <button
            onClick={generate}
            disabled={busy}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 disabled:opacity-60"
          >
            {busy ? "Sealing…" : "Seal this device's walk →"}
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 leading-relaxed">
            <div className="text-xs uppercase tracking-widest text-emerald-700">Sealed</div>
            <p className="mt-1">
              {result.keyCount} item{result.keyCount === 1 ? "" : "s"} sealed. Copy
              the bundle below, or download it as a file. On the other device, open
              the same page and use the Import tab with the same passphrase.
            </p>
          </div>
          <textarea
            readOnly
            value={result.payload}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            className="w-full h-32 rounded-2xl border border-ink-200 bg-card-subtle p-3 font-mono text-xs text-ink-800"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copy}
              className="rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
            >
              {copied ? "Copied ✓" : "Copy bundle"}
            </button>
            <button
              onClick={download}
              className="rounded-full border border-ink-300 text-ink-800 bg-card px-4 py-1.5 text-sm hover:border-ink-900"
            >
              Download .stbundle
            </button>
            <button
              onClick={reset}
              className="rounded-full border border-ink-300 text-ink-700 bg-card px-4 py-1.5 text-sm hover:border-ink-900"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────── IMPORT ───────────────────────────── */

function ImportPanel() {
  const [payload, setPayload] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [mode, setMode] = useState<ApplyMode>("merge");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<Bundle | null>(null);
  const [applied, setApplied] = useState<{ written: number; skipped: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function unseal() {
    setError(null);
    setApplied(null);
    setPreview(null);
    if (!payload.trim()) {
      setError("Paste a bundle or upload a .stbundle file first.");
      return;
    }
    if (!passphrase) {
      setError("Enter the passphrase you used when sealing.");
      return;
    }
    setBusy(true);
    try {
      const b = await decryptBundle(payload, passphrase);
      setPreview(b);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't unseal.");
    } finally {
      setBusy(false);
    }
  }

  function apply() {
    if (!preview) return;
    const res = applyBundle(preview, mode);
    if (!res.ok) {
      setError(res.error ?? "Couldn't write the bundle.");
      return;
    }
    setApplied({ written: res.written, skipped: res.skipped });
    setPreview(null);
    setPayload("");
    setPassphrase("");
  }

  async function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await readBundleFile(f);
      setPayload(text);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read the file.");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function reset() {
    setPayload("");
    setPassphrase("");
    setPreview(null);
    setApplied(null);
    setError(null);
  }

  if (applied) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 text-sm text-emerald-900 leading-relaxed">
          <div className="text-xs uppercase tracking-widest text-emerald-700">Carried over</div>
          <p className="mt-1">
            {applied.written} item{applied.written === 1 ? "" : "s"} written
            {applied.skipped > 0 && `, ${applied.skipped} skipped (already had a value)`}.
            Refresh the page to see the imported reading plans, profile, and bookmarks
            come back to life.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700"
          >
            Refresh now →
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-ink-300 text-ink-700 bg-card px-4 py-1.5 text-sm hover:border-ink-900"
          >
            Import another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="bridge-payload" className="block text-xs uppercase tracking-widest text-ink-500 mb-1">
          Bundle (paste, or upload below)
        </label>
        <textarea
          id="bridge-payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="ST1:..."
          className="w-full h-28 rounded-2xl border border-ink-300 bg-card px-3 py-2 font-mono text-xs text-ink-900 placeholder:text-ink-400"
        />
        <div className="mt-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".stbundle,.txt,text/plain"
            onChange={pickFile}
            className="text-xs text-ink-600 file:mr-3 file:rounded-full file:border-0 file:bg-ink-900 file:text-ink-50 file:px-3 file:py-1.5 file:text-xs hover:file:bg-flame-700 file:cursor-pointer"
          />
        </div>
      </div>

      <Field
        label="Passphrase"
        id="bridge-import-pass"
        value={passphrase}
        onChange={setPassphrase}
        type="password"
        placeholder="the passphrase you used when sealing"
      />

      <fieldset className="rounded-2xl border border-ink-200 bg-card-subtle p-3">
        <legend className="px-2 text-[11px] uppercase tracking-widest text-ink-500">If a key already exists on this device</legend>
        <div className="flex flex-col gap-2 mt-1">
          <Radio
            id="mode-merge"
            name="mode"
            checked={mode === "merge"}
            onChange={() => setMode("merge")}
            label="Keep what's here, only fill in what's missing"
            sub="Safer — won't overwrite anything you've added on this device."
          />
          <Radio
            id="mode-replace"
            name="mode"
            checked={mode === "replace"}
            onChange={() => setMode("replace")}
            label="Overwrite this device's record with the bundle"
            sub="Use when this device is the new one and you want a full restore."
          />
        </div>
      </fieldset>

      {error && <ErrorPanel>{error}</ErrorPanel>}

      {!preview ? (
        <button
          onClick={unseal}
          disabled={busy}
          className="rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 disabled:opacity-60"
        >
          {busy ? "Unsealing…" : "Unseal & preview →"}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="rounded-2xl border border-flame-300 bg-flame-50/60 p-4 text-sm text-ink-900 leading-relaxed">
            <div className="text-xs uppercase tracking-widest text-flame-700">Ready to apply</div>
            <p className="mt-1">
              Bundle sealed{" "}
              <span className="font-medium">
                {new Date(preview.exportedAt).toLocaleString()}
              </span>
              {" — "}
              <span className="font-medium">{bundleKeyCount(preview)}</span> item
              {bundleKeyCount(preview) === 1 ? "" : "s"}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={apply}
              className="rounded-full bg-emerald-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-emerald-700"
            >
              Apply to this device →
            </button>
            <button
              onClick={() => setPreview(null)}
              className="rounded-full border border-ink-300 text-ink-700 bg-card px-4 py-1.5 text-sm hover:border-ink-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────── helpers ──────────────────────────── */

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-ink-500 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400"
      />
    </div>
  );
}

function Radio({
  id,
  name,
  checked,
  onChange,
  label,
  sub,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  sub: string;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-2 cursor-pointer">
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 accent-flame-600"
      />
      <span className="text-sm text-ink-900 leading-snug">
        {label}
        <span className="block text-xs text-ink-600 italic">{sub}</span>
      </span>
    </label>
  );
}

function ErrorPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">
      {children}
    </div>
  );
}
