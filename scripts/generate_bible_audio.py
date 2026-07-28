#!/usr/bin/env python3
"""Pre-generate Bible-chapter narration and publish it to object storage (R2).

Runs as an OFFLINE batch job (see .github/workflows/generate-bible-audio.yml),
NOT on the serverless app. For each chapter it:
  1. fetches the public-domain text (bible-api.com),
  2. synthesises it with Kokoro (the reference `kokoro` package),
  3. encodes MP3 (ffmpeg), and
  4. uploads it to a public R2 bucket, then records availability in
     data/bible/audio-manifest.json (commit that file so the reader serves it).

The reader then plays these instantly, with zero per-visitor model download;
any chapter not yet generated falls back to on-device synthesis.

Usage:
  R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... R2_BUCKET=... \
      python scripts/generate_bible_audio.py --books gospels,psalms
  python scripts/generate_bible_audio.py --books john --limit 1 --dry-run

Flags:
  --books gospels,psalms,nt,ot,all,<id>   book set(s)/ids (default gospels,psalms)
  --translation WEB                        public-domain translation (default WEB)
  --voice af_heart                         Kokoro voice (default af_heart)
  --format mp3|wav                         output format (default mp3)
  --limit N                                stop after N chapters (smoke testing)
  --force                                  re-generate chapters already in manifest
  --dry-run                                write locally, skip upload
"""
import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CANON = ROOT / "data" / "bible" / "canon.ts"
MANIFEST = ROOT / "data" / "bible" / "audio-manifest.json"

BOOK_SETS = {
    "gospels": ["matthew", "mark", "luke", "john"],
    "psalms": ["psalms"],
}


def load_canon():
    src = CANON.read_text(encoding="utf-8")
    rx = re.compile(r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)"[^}]*?chapters:\s*(\d+)')
    order = []
    books = {}
    for m in rx.finditer(src):
        bid, name, chapters = m.group(1), m.group(2), int(m.group(3))
        books[bid] = {"id": bid, "name": name, "chapters": chapters}
        order.append(bid)
    # 'nt' / 'ot' / 'all' rely on canonical order; NT starts at Matthew.
    nt_start = order.index("matthew") if "matthew" in order else len(order)
    BOOK_SETS["all"] = list(order)
    BOOK_SETS["ot"] = order[:nt_start]
    BOOK_SETS["nt"] = order[nt_start:]
    return books


def resolve_book_ids(raw, books):
    ids = []
    for token in [t.strip() for t in raw.split(",") if t.strip()]:
        if token in BOOK_SETS:
            ids.extend(BOOK_SETS[token])
        elif token in books:
            ids.append(token)
        else:
            print(f"[skip] unknown book/set: {token}", file=sys.stderr)
    seen, out = set(), []
    for i in ids:
        if i not in seen:
            seen.add(i)
            out.append(i)
    return out


def fetch_chapter_text(book_name, chapter, api_key):
    import time

    import requests

    url = f"https://bible-api.com/{book_name} {chapter}?translation={api_key}"
    last = None
    for attempt in range(3):  # bible-api.com occasionally times out / rate-limits
        try:
            r = requests.get(url, timeout=30)
            r.raise_for_status()
            data = r.json()
            verses = data.get("verses") or []
            text = " ".join(re.sub(r"\s+", " ", (v.get("text") or "")).strip() for v in verses)
            return text.strip()
        except Exception as e:  # noqa: BLE001 — retry any transient failure
            last = e
            time.sleep(2 * (attempt + 1))
    raise last


def to_np(audio):
    import numpy as np

    try:
        import torch

        if isinstance(audio, torch.Tensor):
            return audio.detach().cpu().numpy().astype("float32")
    except Exception:
        pass
    return np.asarray(audio, dtype="float32")


def encode(wav_path, out_path, fmt):
    if fmt == "wav":
        os.replace(wav_path, out_path)
        return
    codec = ["-c:a", "libmp3lame", "-q:a", "4"] if fmt == "mp3" else ["-c:a", "libopus", "-b:a", "48k"]
    subprocess.run(
        ["ffmpeg", "-y", "-i", wav_path, *codec, out_path],
        check=True,
        capture_output=True,
    )


def make_r2_client():
    import boto3

    acct = os.environ["R2_ACCOUNT_ID"]
    return boto3.client(
        "s3",
        endpoint_url=f"https://{acct}.r2.cloudflarestorage.com",
        aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
        region_name="auto",
    )


def r2_object_exists(s3, bucket, key):
    """True if the object is already in R2. Lets runs resume off storage itself,
    so a re-run (or a parallel shard) never regenerates a finished chapter and
    doesn't depend on a shared manifest."""
    try:
        s3.head_object(Bucket=bucket, Key=key)
        return True
    except Exception:
        return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--books", default="gospels,psalms")
    ap.add_argument("--translation", default="WEB")
    ap.add_argument("--voice", default="af_heart")
    ap.add_argument("--format", default="mp3", choices=["mp3", "wav", "opus"])
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    translation = args.translation.upper()
    api_key = translation.lower()  # bible-api key: web, kjv, asv…
    fmt = args.format
    content_type = {"mp3": "audio/mpeg", "wav": "audio/wav", "opus": "audio/ogg"}[fmt]

    books = load_canon()
    book_ids = resolve_book_ids(args.books, books)

    # The manifest is hand-maintained CONFIG (baseUrl, format, translations) —
    # the reader resolves a chapter's audio by asking R2 for the object, so
    # there is no generated availability map to keep in sync (and therefore no
    # cross-shard merge conflicts). We only read it here, to sanity-check that
    # what we're about to generate matches what the app will request.
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if manifest.get("format") and manifest["format"] != fmt:
        print(
            f"WARNING: generating .{fmt} but the app requests .{manifest['format']} "
            f"(data/bible/audio-manifest.json). These must match.",
            file=sys.stderr,
        )
    covered = manifest.get("translations") or ["WEB"]
    if translation not in covered:
        print(
            f"WARNING: '{translation}' is not in the manifest's translations list "
            f"{covered}; the reader won't offer these recordings until it is.",
            file=sys.stderr,
        )

    s3 = None
    if not args.dry_run:
        missing = [k for k in ("R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET") if not os.environ.get(k)]
        if missing:
            print(f"Missing env: {', '.join(missing)}. Use --dry-run to test without upload.", file=sys.stderr)
            sys.exit(1)
        s3 = make_r2_client()
    bucket = os.environ.get("R2_BUCKET", "")
    out_dir = ROOT / "bible-audio-out"
    if args.dry_run:
        out_dir.mkdir(exist_ok=True)

    # Kokoro pipeline. lang_code 'a' = American English (af_/am_), 'b' = British.
    from kokoro import KPipeline
    import numpy as np
    import soundfile as sf

    lang_code = "b" if args.voice.startswith(("bf_", "bm_")) else "a"
    print(f"Loading Kokoro (voice={args.voice}, lang={lang_code})…", flush=True)
    pipeline = KPipeline(lang_code=lang_code)

    done = 0
    have = 0
    failed = []
    for bid in book_ids:
        book = books.get(bid)
        if not book:
            continue
        for ch in range(1, book["chapters"] + 1):
            if args.limit and done >= args.limit:
                break
            key = f"{translation}/{bid}/{ch}"
            obj_key = f"{translation}/{bid}/{ch}.{fmt}"
            if not args.force:
                # Resume off R2 itself: idempotent, needs no shared state, and
                # is safe to run in parallel shards.
                if s3 is not None and r2_object_exists(s3, bucket, obj_key):
                    have += 1
                    continue
            try:
                text = fetch_chapter_text(book["name"], ch, api_key)
                if not text:
                    failed.append(f"{key} (no text)")
                    print(f"[skip] {key}: no text", file=sys.stderr)
                    continue
                parts = [to_np(audio) for _, _, audio in pipeline(text, voice=args.voice, speed=1)]
                if not parts:
                    failed.append(f"{key} (no audio)")
                    print(f"[skip] {key}: no audio", file=sys.stderr)
                    continue
                audio = np.concatenate(parts)

                with tempfile.TemporaryDirectory() as td:
                    wav_path = os.path.join(td, "a.wav")
                    out_path = os.path.join(td, f"a.{fmt}")
                    sf.write(wav_path, audio, 24000)
                    encode(wav_path, out_path, fmt)
                    size = os.path.getsize(out_path)
                    if args.dry_run:
                        dest = out_dir / obj_key
                        dest.parent.mkdir(parents=True, exist_ok=True)
                        os.replace(out_path, dest)
                        print(f"[dry-run] {obj_key} ({size // 1024} KB)", flush=True)
                    else:
                        with open(out_path, "rb") as f:
                            s3.put_object(Bucket=bucket, Key=obj_key, Body=f.read(), ContentType=content_type)
                        print(f"[upload] {obj_key} ({size // 1024} KB)", flush=True)

                done += 1
            except Exception as e:  # keep going; one bad chapter shouldn't stop the batch
                failed.append(f"{key} ({e})")
                print(f"[fail] {key}: {e}", file=sys.stderr)
        if args.limit and done >= args.limit:
            break

    print(
        f"\nDone. {done} generated, {have} already present, {len(failed)} failed.",
        flush=True,
    )
    if failed:
        # Fail loudly: a green run must mean "this batch is fully covered", so a
        # silently-skipped chapter can't masquerade as success. Re-running is
        # cheap — everything already in R2 is skipped.
        print("\nChapters still missing:", file=sys.stderr)
        for f in failed[:50]:
            print(f"  - {f}", file=sys.stderr)
        if len(failed) > 50:
            print(f"  … and {len(failed) - 50} more", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
