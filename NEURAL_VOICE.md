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

- **Self-hosted runtime (committed).** onnxruntime-web loads BOTH its wasm
  binary and its `.mjs` glue (a dynamic module import) from `env.wasmPaths`; the
  library default is a jsdelivr CDN, whose *script* our CSP blocks — which
  otherwise breaks the engine with "no available backend found". So we ship both
  files in `public/ort/` (committed, present in every deploy) and set
  `wasmPaths = "/ort/"` (`lib/tts/kokoro.ts`). Regenerate after bumping
  transformers with `node scripts/copy-ort-runtime.mjs`. Only the model
  *weights* + voices are fetched remotely, from `huggingface.co`.
- **CSP** (`next.config.js`) grants exactly what the engine needs:
  `'wasm-unsafe-eval'`, `connect-src` to `huggingface.co` (+ its CDN/Xet
  subdomains), and `blob:` for `media-src`/`worker-src`. No third-party script
  host is trusted.
- **Install safety.** `.npmrc` skips the `onnxruntime-node` native binary
  download (we never use the Node runtime; skipping it keeps CI installs fast
  and deterministic).
- **Turbopack.** kokoro-js references a few Node built-ins at module scope that
  are never reached in the browser; `turbopack.resolveAlias` (and a parallel
  `webpack` fallback) map them to `lib/tts/node-stub.js`.

## Pre-generated Bible audio (instant, zero-download)

The in-browser voice depends on each visitor's device downloading a ~90–160 MB
model and running it (WebGPU/WASM) — which is fragile and slow on some hardware.
The robust answer for the Bible reader is to render each chapter's audio **once**
and serve it as a plain MP3 from object storage. No download, no GPU, no WASM —
the browser just plays a file, instantly, on every device.

**How it fits together**

- `.github/workflows/generate-bible-audio.yml` — a GitHub Action that runs the
  generation where the model is reachable (GitHub's runners), so nothing local
  is needed.
- `scripts/generate_bible_audio.py` — fetches public-domain text (bible-api.com),
  synthesises it with the reference `kokoro` package, encodes MP3 (ffmpeg), and
  uploads each chapter to a **Cloudflare R2** bucket, recording availability in
  `data/bible/audio-manifest.json`.
- `lib/tts/bible-audio.ts` — `resolveBibleAudioUrl(...)` reads that manifest and
  returns the recording's public URL, or `null` when a chapter hasn't been
  generated (so the reader falls back to on-device synthesis). Wired into the
  reader via the player's `resolveAudioUrl` prop.
- Until the manifest lists a chapter, nothing changes for the reader. Generate a
  batch, the Action commits the updated manifest, and those chapters start
  serving the recording.

**One-time setup**

1. Create a free **Cloudflare R2** bucket and enable a public URL (`Settings →
   Public access → r2.dev`, or attach a custom domain).
2. Create an **R2 API token** (Object Read & Write).
3. Add repo secrets (Settings → Secrets and variables → Actions):
   `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`.
4. Set the reader's base URL in Vercel:
   `NEXT_PUBLIC_BIBLE_AUDIO_BASE_URL=https://pub-xxxx.r2.dev` (your public URL).
   (An `NEXT_PUBLIC_SUPABASE_URL` Storage bucket is used as a fallback if this is
   unset — object key `bucket/<translation>/<book>/<chapter>.<format>`.)

**Run it**

Actions tab → **Generate Bible audio** → Run workflow. Pick books
(`gospels,psalms` to start; `nt`, `ot`, or `all` for more) and format. Generation
is CPU-only (~seconds/chapter), so do it in **batches** — the manifest
accumulates and already-done chapters are skipped, so re-running resumes. The
whole Bible (~1,189 chapters) is a few hours total across runs.

**Notes**

- Storage: MP3 ≈ 3–4 MB/chapter → whole Bible ≈ 3–4 GB (fits R2's 10 GB free
  tier, which also has free egress). `opus` roughly halves it.
- Start with public-domain translations (WEB, KJV). The **ESV carries separate
  audio terms** — check Crossway before generating ESV audio.

## Verifying

`npm run build` (Turbopack) must pass. After a generation run, open the Bible
reader on a generated chapter → **Listen → Play**: it plays the pre-rendered MP3
instantly (badge reads "Studio recording"), with no model-download bar.
