-- The Time Budget: co-op session schema (Pair Comparison + Group Roleplay)
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a free-tier project.

create extension if not exists "pgcrypto";

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  mode text not null check (mode in ('pair', 'group')),
  room_code text not null unique,
  status text not null default 'waiting' check (status in ('waiting', 'active', 'complete')),
  created_at timestamptz not null default now()
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  display_name text not null,
  role_id text,
  allocation jsonb,
  profile_result jsonb,
  is_ready boolean not null default false,
  joined_at timestamptz not null default now()
);

create index if not exists participants_session_id_idx on participants(session_id);

-- RLS policies alone don't grant access — Postgres also requires base
-- table privileges for the role. Hosted Supabase projects pre-configure
-- this for you; a fresh local/self-hosted Postgres does not, so it's
-- explicit here.
grant usage on schema public to anon, authenticated;
grant select, insert, update on sessions to anon, authenticated;
grant select, insert, update on participants to anon, authenticated;

alter table sessions enable row level security;
alter table participants enable row level security;

-- MVP tradeoff: this is a low-stakes classroom game with no sensitive data,
-- so we allow any client holding the anon key to read/write freely, scoped
-- only by knowing a session's id / room code (not true auth). Do not reuse
-- this policy for anything handling real user data.
create policy "anyone can read sessions" on sessions for select using (true);
create policy "anyone can create sessions" on sessions for insert with check (true);
create policy "anyone can update sessions" on sessions for update using (true);

create policy "anyone can read participants" on participants for select using (true);
create policy "anyone can join as a participant" on participants for insert with check (true);
create policy "anyone can update their participant row" on participants for update using (true);

-- Enable Realtime for participants so clients can subscribe to live changes.
alter publication supabase_realtime add table participants;
alter publication supabase_realtime add table sessions;
