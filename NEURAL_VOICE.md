# Neural voice (human text-to-speech)

Scripture Theory reads text aloud with a real **neural** voice instead of the
robotic device `speechSynthesis`. It powers the Bible reader's **Listen**
control, the course **LessonAudio** player, and any future voice surface — all
through one component, `components/NeuralAudioPlayer.tsx`.

## What it uses

- **Model:** [Kokoro-82M](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX),
  an open-weight (**Apache-2.0**, commercial-safe) TTS model that sounds human.
- **Runtime:** [`kokoro-js`](https://www.npmjs.com/package/kokoro-js) →
  `@huggingface/transformers` → `onnxruntime-web`. Inference runs **entirely in
  the browser** (WebGPU when available, otherwise WebAssembly on the CPU).
- **Cost:** free. No server inference, no API keys, no per-use fees. The model
  weights (~86 MB, `q8`) download once from the Hugging Face Hub and are cached
  by the browser; after that the voice works offline.

Nothing is sent to a server — the text never leaves the device.

## How playback works

`NeuralAudioPlayer` takes a list of `{ label?, text }` segments and, on play:

1. If a `resolveAudioUrl(voiceId)` prop returns a URL, it plays that
   **pre-generated recording** directly (instant, zero download). Not wired up
   yet — see "Next step" below.
2. Otherwise it lazily loads Kokoro and **streams** the passage sentence by
   sentence, so audio starts before the whole passage is synthesised.
3. If the neural engine can't load or run (old browser, blocked download), it
   **falls back to the device `speechSynthesis` voice** — the reader can also
   switch manually. It never hard-fails.

The heavy library is imported only when the user presses play, so it never
touches the initial bundle or SSR.

## Deployment notes

- **Same-origin wasm.** The build emits onnxruntime-web's wasm as a hashed
  static asset (`/_next/static/media/…`), so the runtime loads it from our own
  origin — no third-party CDN, and nothing for a deploy to forget. (We
  deliberately do **not** override `wasmPaths`.) Only the model *weights* +
  voices are fetched remotely, from `huggingface.co`.
- **CSP** (`next.config.js`) grants exactly what the engine needs:
  `'wasm-unsafe-eval'`, `connect-src` to `huggingface.co` (+ its CDN/Xet
  subdomains) and `cdn.jsdelivr.net` (wasm fallback), and `blob:` for
  `media-src`/`worker-src`.
- **Install safety.** `.npmrc` skips the `onnxruntime-node` native binary
  download (we never use the Node runtime; skipping it keeps CI installs fast
  and deterministic).
- **Turbopack.** kokoro-js references a few Node built-ins at module scope that
  are never reached in the browser; `turbopack.resolveAlias` (and a parallel
  `webpack` fallback) map them to `lib/tts/node-stub.js`.

## Pre-generated Bible audio (instant, zero-download)

For the Bible reader, the best experience is to render each chapter's audio
**once** and stream it from Supabase Storage — instant, studio-consistent, no
per-user model download, great on low-bandwidth devices. This is wired up and
ready; you just run the batch job (it can't run on the serverless app, and it
needs network + a Supabase service key).

**How it fits together**

- `scripts/generate-bible-audio.mjs` — fetches public-domain text, synthesises
  it with Kokoro, compresses (ffmpeg → mp3/opus, or WAV if ffmpeg is absent),
  uploads to a public Supabase Storage bucket, and records availability in
  `data/bible/audio-manifest.json`.
- `lib/tts/bible-audio.ts` — `resolveBibleAudioUrl(...)` reads that manifest and
  returns the recording's public URL, or `null` when a chapter hasn't been
  generated (so the reader synthesises on-device). Wired into the reader via the
  player's `resolveAudioUrl` prop.
- Until the manifest lists a chapter, nothing changes — the reader just uses the
  on-device voice. Generate audio, commit the updated manifest, and those
  chapters start serving the recording.

**Run it** (on a machine with network + optionally ffmpeg):

```bash
# smoke-test one chapter locally, no upload:
npm run generate-bible-audio -- --books=john --limit=1 --dry-run

# generate + upload the Gospels and Psalms:
export SUPABASE_URL=https://<project>.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # server secret, never client
npm run generate-bible-audio -- --books=gospels,psalms
```

Then commit the updated `data/bible/audio-manifest.json`. The script creates the
public `bible-audio` bucket if it doesn't exist. Flags: `--books`,
`--translation`, `--voice`, `--format=mp3|opus|wav`, `--limit`, `--force`,
`--dry-run`.

**Notes**

- Storage: mp3 is ~3–5 MB/chapter; Gospels + Psalms (~239 chapters) ≈ ~1 GB.
  Use `--format=opus` to roughly halve that.
- Start with public-domain translations (WEB, KJV). The **ESV carries separate
  audio terms** — check Crossway before generating ESV audio.
- Node generation needs espeak phonemes; if `phonemizer` complains on your OS,
  install `espeak-ng` (e.g. `apt-get install espeak-ng`).

## Verifying

`npm run build` (Turbopack) must pass. Full end-to-end audio requires a browser
that can fetch the model from Hugging Face — open the Bible reader, press
**Listen → Play**, and confirm a warm voice reads the chapter (first play shows a
one-time model-download progress bar).
