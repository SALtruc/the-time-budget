-- Serialize joins on the room row so simultaneous joins cannot exceed two.
-- Existing overfilled rooms and their allocations are preserved.
create or replace function public.enforce_pair_capacity()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  room_mode text;
begin
  if TG_OP = 'UPDATE' and new.session_id = old.session_id then
    return new;
  end if;

  select mode into room_mode from public.sessions
    where id = new.session_id for update;

  -- An idempotent INSERT ... ON CONFLICT DO NOTHING can resume a full room.
  if TG_OP = 'INSERT' and exists (
    select 1 from public.participants
    where id = new.id and session_id = new.session_id
  ) then
    return new;
  end if;

  if room_mode = 'pair' and (
    select count(*) from public.participants
    where session_id = new.session_id and id <> new.id
  ) >= 2 then
    raise exception 'This pair room already has two players. Create a new room to play with another partner.'
      using errcode = '23514';
  end if;
  return new;
end;
$$;

revoke all on function public.enforce_pair_capacity() from public;
create trigger enforce_pair_capacity
before insert or update of session_id on public.participants
for each row execute function public.enforce_pair_capacity();
