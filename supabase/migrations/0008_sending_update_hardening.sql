-- Scripture Theory · harden the sending_covenant update path
--
-- The original 0007 policy "sending_update_own_device" allowed UPDATE on
-- any row where device_id is not null, with check (device_id is not null).
-- Because RLS gates rows but not columns, that let ANY anonymous caller
-- rewrite ANY column of ANY public wall entry — first_name, region,
-- prayer, even `hidden` — by issuing an update against a known row id.
-- That is an integrity / moderation hole (a malicious caller could edit
-- or hide other believers' Wall-of-Yeses entries).
--
-- Fix: drop the broad UPDATE policy and route the only legitimate
-- self-service write (a believer adjusting their own "souls walking with"
-- count from the same device) through a security-definer RPC that:
--   • matches BOTH the row id and the caller-supplied device_id
--   • only ever writes the souls_walking_with column
--   • clamps the value to 0..10000
--   • refuses hidden rows
-- Admins keep their full update policy from 0007.

drop policy if exists "sending_update_own_device" on public.sending_covenant;

create or replace function public.update_my_souls(
  yes_id uuid,
  dev text,
  n integer
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  clamped integer := greatest(0, least(10000, coalesce(n, 0)));
  new_val integer;
begin
  if dev is null or char_length(dev) = 0 then
    return null;
  end if;
  update sending_covenant
  set souls_walking_with = clamped
  where id = yes_id
    and device_id = dev
    and hidden = false
  returning souls_walking_with into new_val;
  return new_val; -- null when no row matched (wrong device / unknown id)
end;
$$;

grant execute on function public.update_my_souls(uuid, text, integer) to anon, authenticated;
