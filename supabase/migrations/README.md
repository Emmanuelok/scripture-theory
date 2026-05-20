# Scripture Theory · database migrations

Apply these in order. Each file is idempotent (`if not exists` /
`drop policy if exists`), so re-running is safe.

| # | File | What it adds |
|---|------|--------------|
| 0001 | `0001_profiles.sql` | Cloud sync for on-device profile + Secret Place opt-in |
| 0002 | `0002_pastor.sql` | Pastor / church claim records |
| 0003 | `0003_prayer_wall.sql` | Prayer requests, intercessions, flags, RPCs |
| 0004 | `0004_cohorts.sql` | Course cohorts for the discipleship track |
| 0005 | `0005_prayer_admin.sql` | `admin_emails` allowlist, `is_admin()`, admin policies on the Prayer Wall |
| 0006 | `0006_testimonies.sql` | Testimonies table + editorial RLS (depends on 0005) |
| 0007 | `0007_sending_covenant.sql` | Project 1M Cloud of Witnesses + `pray_for_yes` RPC (depends on 0005) |

## After applying

Add yourself (and any co-maintainers) to the admin allowlist:

```sql
insert into admin_emails(email) values ('you@example.com');
```

Then sign into the app with that email and visit `/admin` — the three
editorial queues (Testimonies, Wall of Yeses, Prayer Wall) become available.

## Running them

From the Supabase dashboard:

1. SQL editor → New query
2. Paste the contents of each `00NN_*.sql` file in order
3. Run

Or with the Supabase CLI:

```bash
supabase db push
```

## Notes

- The app degrades gracefully when Supabase env vars are unset, so local
  development without these tables still renders every page.
- `is_admin()` is defined once in `0005_prayer_admin.sql` and reused by
  every later migration; do not redefine it.
- All admin policies live in their respective table's migration so the
  policy lives next to the schema it guards.
