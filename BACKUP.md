# Backing up Scripture Theory

Three things to back up. The codebase, the database, and the configuration that
ties them together.

## 1 · Codebase

The git repository on GitHub is the primary backup. Everything anyone has ever
committed lives there. To make that backup resilient against a single account
loss, mirror it elsewhere.

### Local working copy (everyday safety)

You already have one. Keep it pushed.

```bash
git push -u origin claude/scripture-theory-ai-platform-oVCIS
git push origin main
```

### Mirror to a second remote (recommended once a month)

Add a second git host so a GitHub outage or account incident doesn't lock you out.

```bash
# GitLab, Codeberg, Forgejo — any will do. Create the empty repo there first.
git remote add gitlab git@gitlab.com:your-user/scripture-theory.git
git push gitlab --mirror   # pushes every branch + tag
```

To refresh later:

```bash
git push gitlab --mirror
```

### Cold offline bundle (yearly snapshot)

A single file you can hand someone or burn to a drive:

```bash
git bundle create scripture-theory-$(date +%Y-%m-%d).bundle --all
```

Restore with `git clone scripture-theory-YYYY-MM-DD.bundle`.

### Encrypted full archive (paranoia tier)

Includes git history, untracked work-in-progress, `.env.local` if you have it:

```bash
cd ..
tar --exclude='scripture-theory/node_modules' \
    --exclude='scripture-theory/.next' \
    -czf scripture-theory-$(date +%Y-%m-%d).tar.gz scripture-theory/

# Encrypt with a passphrase (age, gpg, or openssl)
gpg --symmetric --cipher-algo AES256 scripture-theory-*.tar.gz
# → scripture-theory-YYYY-MM-DD.tar.gz.gpg
```

Keep the encrypted archive somewhere off-machine (1Password file vault, an
external drive, Backblaze B2, etc.). Without the passphrase the contents are
unreadable.

## 2 · Database (Supabase)

The codebase is worthless without the testimonies, the Wall of Yeses, the
prayer requests, and the admin allowlist. Supabase has two backup paths.

### Built-in daily backups

Supabase automatically retains daily backups on the Pro plan (7 days). Free
plan keeps 24-hour point-in-time. Verify yours at:

```
Dashboard → Project → Database → Backups
```

If you're on the free plan, take manual backups before any schema change.

### Manual `pg_dump` (recommended monthly)

Grab the connection string from `Dashboard → Project Settings → Database` and
run:

```bash
# Schema-only (small, for review)
pg_dump --schema-only \
        --no-owner \
        --no-privileges \
        "$SUPABASE_DB_URL" > schema-$(date +%Y-%m-%d).sql

# Full dump (schema + every row)
pg_dump --no-owner \
        --no-privileges \
        --format=custom \
        "$SUPABASE_DB_URL" > scripture-theory-$(date +%Y-%m-%d).dump
```

Restore (to a fresh Supabase project or local Postgres):

```bash
pg_restore --no-owner --no-privileges --dbname="$TARGET_DB_URL" \
           scripture-theory-YYYY-MM-DD.dump
```

Then re-run the migrations from `supabase/migrations/` to ensure indexes and
policies match the source of truth.

### What lives where

| Where | What it has | If you lose it |
|---|---|---|
| Git repo | Every line of code + the migration SQL | Mirror remote, bundle, archive |
| Supabase Postgres | Testimonies, Wall of Yeses, prayer requests, admin allowlist, profiles | `pg_dump` backups + Supabase's daily |
| User devices | Each believer's `localStorage` (reading plans, the Secret Place, the Names) | The device-bridge export (already shipped at `/me`) |
| Vercel env vars | `ESV_API_KEY`, give URLs, Supabase keys | The encrypted archive of `.env.local` |

## 3 · Configuration (env vars + secrets)

Vercel doesn't back up env vars for you. Keep an off-machine copy.

```bash
# Pull current values into a local file (only run in a trusted environment)
vercel env pull .env.production

# Encrypt and store
gpg --symmetric --cipher-algo AES256 .env.production
mv .env.production.gpg ~/path/to/secure/backup/
rm .env.production
```

Or use a password manager that supports secure notes: paste the env vars there,
labelled "Scripture Theory · Vercel".

## A simple ritual

Once a month, run this script:

```bash
#!/bin/sh
# Place at ~/bin/backup-scripture-theory.sh
set -e
DATE=$(date +%Y-%m-%d)
cd ~/projects/scripture-theory

# 1. Codebase
git push origin --all
git push origin --tags
git push gitlab --mirror 2>/dev/null || true
git bundle create ~/Backups/scripture-theory-$DATE.bundle --all

# 2. Database
pg_dump --no-owner --no-privileges --format=custom \
        "$SUPABASE_DB_URL" > ~/Backups/scripture-theory-$DATE.dump

echo "Backed up to ~/Backups/scripture-theory-$DATE.*"
```

Add it to a calendar reminder or cron job:

```cron
0 4 1 * * /Users/you/bin/backup-scripture-theory.sh >> /tmp/st-backup.log 2>&1
```

That's it. Three things, three places off your laptop, monthly.
