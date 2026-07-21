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

- **Self-hosted wasm.** The onnxruntime-web runtime would normally be pulled
  from a third-party CDN. To keep the strict CSP tight, `postinstall`
  (`scripts/copy-ort-runtime.mjs`) copies it into `public/ort/` and we point the
  runtime there (`lib/tts/kokoro.ts`). `public/ort/` is git-ignored and
  regenerated on every install. Only the model *weights* are fetched remotely.
- **CSP** (`next.config.js`) grants exactly what the engine needs:
  `'wasm-unsafe-eval'`, `connect-src` to `huggingface.co` (+ its CDN/Xet
  subdomains), and `blob:` for `media-src`/`worker-src`.
- **Install safety.** `.npmrc` skips the `onnxruntime-node` native binary
  download (we never use the Node runtime; skipping it keeps CI installs fast
  and deterministic).
- **Turbopack.** kokoro-js references a few Node built-ins at module scope that
  are never reached in the browser; `turbopack.resolveAlias` (and a parallel
  `webpack` fallback) map them to `lib/tts/node-stub.js`.

## Next step (recommended): pre-generate Bible audio

For the Bible reader, the best experience is to render each chapter's audio
**once** with Kokoro and store it in Supabase Storage, then stream it — instant,
studio-consistent, zero per-user download, great on low-bandwidth devices. The
player already supports this via the `resolveAudioUrl` prop; only the batch
pipeline + a lookup resolver need to be added. Start with the highest-traffic,
public-domain books (Gospels, Psalms) so there is no licensing question. The ESV
carries separate audio terms — check Crossway before generating ESV audio.

## Verifying

`npm run build` (Turbopack) must pass. Full end-to-end audio requires a browser
that can fetch the model from Hugging Face — open the Bible reader, press
**Listen → Play**, and confirm a warm voice reads the chapter (first play shows a
one-time model-download progress bar).
