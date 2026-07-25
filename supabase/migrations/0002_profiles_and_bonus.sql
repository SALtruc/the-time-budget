-- The Time Budget: player profile capture (RMIT ID + avatar + onboarding)
-- and the "surprise event" time-budget bonus for co-op sessions.

-- Columns beyond student_id are filled in incrementally as the player moves
-- through the onboarding steps (SID -> avatar -> profile form), so only
-- student_id is required at row-creation time.
create table if not exists player_profiles (
  id uuid primary key default gen_random_uuid(),
  student_id text not null check (student_id ~ '^[0-9]{6}$'),
  avatar_id text,
  year_of_study text,
  program text,
  access_code text,
  created_at timestamptz not null default now()
);

alter table participants
  add column if not exists player_profile_id uuid references player_profiles(id);

alter table sessions
  add column if not exists bonus_hours int not null default 0;

alter table player_profiles enable row level security;

-- Same MVP tradeoff as 0001_init.sql: permissive policies, no real auth.
create policy "anyone can create a player profile" on player_profiles for insert with check (true);
create policy "anyone can read player profiles" on player_profiles for select using (true);
create policy "anyone can update a player profile" on player_profiles for update using (true);

-- Grants are required in addition to RLS policies (see 0001_init.sql).
grant select, insert, update on player_profiles to anon, authenticated;
