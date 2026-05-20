"use client";

/* ──────────────────────────────────────────────────────────────────
   Device bridge — carrying one's walk between devices.

   The platform stores nothing about a believer on our servers (the
   /me promise). But many believers use a phone and a laptop, or
   replace a phone every few years. This module makes it possible
   to *export* an encrypted bundle of the device-local data and
   *import* it on a second device. Passphrase chosen by the user;
   we never see it.

   Crypto: PBKDF2-SHA256 (200k iterations) → AES-GCM-256.
   Layout: [salt 16B][iv 12B][ciphertext+tag], base64-encoded.

   Excluded keys (device-bound or sensitive — sign in / re-install
   on the new device instead):
     - scripture-theory-auth          (Supabase session token)
     - scripture-theory-sending-device      (unique device id)
     - scripture-theory-testimony-device    (unique device id)
     - scripture-theory-installed           (PWA install state)
     - scripture-theory-install-dismissed   (PWA prompt state)
────────────────────────────────────────────────────────────────── */

const KEY_PREFIX = "scripture-theory-";

const EXCLUDED = new Set<string>([
  "scripture-theory-auth",
  "scripture-theory-sending-device",
  "scripture-theory-testimony-device",
  "scripture-theory-installed",
  "scripture-theory-install-dismissed",
]);

export const BUNDLE_VERSION = 1;
export const BUNDLE_PREFIX = "ST1:"; // visible marker on the encoded blob

export type Bundle = {
  v: number;
  exportedAt: string;
  app: "scripture-theory";
  keys: Record<string, string>;
};

/* ──────────────────────────────────────────────────────────────────
   Collecting / applying
────────────────────────────────────────────────────────────────── */

export function collectBundle(): Bundle {
  const keys: Record<string, string> = {};
  if (typeof window === "undefined") {
    return { v: BUNDLE_VERSION, exportedAt: new Date().toISOString(), app: "scripture-theory", keys };
  }
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (!k || !k.startsWith(KEY_PREFIX) || EXCLUDED.has(k)) continue;
      const v = window.localStorage.getItem(k);
      if (v !== null) keys[k] = v;
    }
  } catch {}
  return { v: BUNDLE_VERSION, exportedAt: new Date().toISOString(), app: "scripture-theory", keys };
}

export function bundleKeyCount(b: Bundle): number {
  return Object.keys(b.keys).length;
}

export type ApplyMode = "merge" | "replace";

export type ApplyResult = {
  ok: boolean;
  written: number;
  skipped: number;
  error?: string;
};

/**
 * Write a bundle into localStorage.
 *  merge   — only set keys that aren't already present (safer)
 *  replace — overwrite every key in the bundle (full restore)
 * Either way, keys outside the bundle are left untouched.
 */
export function applyBundle(b: Bundle, mode: ApplyMode): ApplyResult {
  if (typeof window === "undefined") {
    return { ok: false, written: 0, skipped: 0, error: "Not in a browser." };
  }
  if (b.app !== "scripture-theory") {
    return { ok: false, written: 0, skipped: 0, error: "This bundle isn't from Scripture Theory." };
  }
  if (typeof b.v !== "number" || b.v > BUNDLE_VERSION) {
    return {
      ok: false,
      written: 0,
      skipped: 0,
      error: `Bundle version ${b.v} is newer than this app supports (v${BUNDLE_VERSION}). Update the app and try again.`,
    };
  }
  let written = 0;
  let skipped = 0;
  try {
    for (const [k, v] of Object.entries(b.keys)) {
      if (!k.startsWith(KEY_PREFIX) || EXCLUDED.has(k)) {
        skipped++;
        continue;
      }
      if (mode === "merge" && window.localStorage.getItem(k) !== null) {
        skipped++;
        continue;
      }
      window.localStorage.setItem(k, v);
      written++;
    }
    return { ok: true, written, skipped };
  } catch (e) {
    return {
      ok: false,
      written,
      skipped,
      error: e instanceof Error ? e.message : "Couldn't write to localStorage (quota?).",
    };
  }
}

/* ──────────────────────────────────────────────────────────────────
   Crypto (WebCrypto subtle)
────────────────────────────────────────────────────────────────── */

const SALT_LEN = 16;
const IV_LEN = 12;
const PBKDF2_ITERS = 200_000;

function ensureCrypto(): SubtleCrypto {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    throw new Error("This browser doesn't support secure encryption.");
  }
  return window.crypto.subtle;
}

function randomBytes(n: number): Uint8Array {
  const a = new Uint8Array(n);
  window.crypto.getRandomValues(a);
  return a;
}

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const subtle = ensureCrypto();
  const baseKey = await subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERS, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function toBase64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return window.btoa(s);
}

function fromBase64(b64: string): Uint8Array {
  const s = window.atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

/** Returns a string of the form `ST1:<base64>` suitable for sharing. */
export async function encryptBundle(b: Bundle, passphrase: string): Promise<string> {
  if (!passphrase || passphrase.length < 8) {
    throw new Error("Passphrase must be at least 8 characters.");
  }
  const subtle = ensureCrypto();
  const salt = randomBytes(SALT_LEN);
  const iv = randomBytes(IV_LEN);
  const key = await deriveKey(passphrase, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(b));
  const ciphertext = new Uint8Array(
    await subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext),
  );
  const blob = new Uint8Array(salt.length + iv.length + ciphertext.length);
  blob.set(salt, 0);
  blob.set(iv, salt.length);
  blob.set(ciphertext, salt.length + iv.length);
  return BUNDLE_PREFIX + toBase64(blob);
}

export async function decryptBundle(payload: string, passphrase: string): Promise<Bundle> {
  const trimmed = payload.trim();
  if (!trimmed.startsWith(BUNDLE_PREFIX)) {
    throw new Error("This doesn't look like a Scripture Theory bundle.");
  }
  const blob = fromBase64(trimmed.slice(BUNDLE_PREFIX.length));
  if (blob.length < SALT_LEN + IV_LEN + 16) {
    throw new Error("Bundle is too short — it may be corrupt.");
  }
  const salt = blob.slice(0, SALT_LEN);
  const iv = blob.slice(SALT_LEN, SALT_LEN + IV_LEN);
  const ciphertext = blob.slice(SALT_LEN + IV_LEN);
  const key = await deriveKey(passphrase, salt);
  const subtle = ensureCrypto();
  let plaintext: ArrayBuffer;
  try {
    plaintext = await subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  } catch {
    throw new Error("Wrong passphrase, or the bundle is corrupt.");
  }
  const json = new TextDecoder().decode(plaintext);
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Decrypted, but the contents aren't valid JSON.");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Bundle contents are malformed.");
  }
  const candidate = parsed as Partial<Bundle>;
  if (candidate.app !== "scripture-theory" || typeof candidate.v !== "number" || !candidate.keys) {
    throw new Error("Bundle is missing required fields.");
  }
  return candidate as Bundle;
}

/* ──────────────────────────────────────────────────────────────────
   File helpers — download / read a .stbundle
────────────────────────────────────────────────────────────────── */

export function downloadBundleFile(payload: string, suggestedName?: string): void {
  if (typeof window === "undefined") return;
  const name = suggestedName ?? defaultBundleFilename();
  const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function defaultBundleFilename(d = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `scripture-theory-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.stbundle`;
}

export function readBundleFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error("Couldn't read the file."));
    fr.onload = () => resolve(String(fr.result ?? ""));
    fr.readAsText(file);
  });
}
