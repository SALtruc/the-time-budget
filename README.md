# The Time Budget

A weekly life-simulation game: allocate a 40-hour week across 7 activity
blocks and get matched to one of 17 "Time Profile" characters. Three modes —
Self-paced (solo), Pair Comparison, and Group Roleplay — built with
Next.js, Tailwind CSS, Zustand, and Supabase.

## Stack

- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- **State**: Zustand (local game state), Supabase Realtime (co-op session sync)
- **Backend/DB**: Supabase (Postgres + Realtime), free tier — no custom server
- **Tests**: Vitest, covering the 17-rule profile-matching engine

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Every mode now goes
through an onboarding step (RMIT Student ID → avatar → profile) that writes to
Supabase, so **all three modes need Supabase configured** — see below. Without
it, onboarding will show a "Something went wrong" error rather than crashing.

Run the game-logic test suite:

```bash
npm test
```

## Enabling Supabase (required for all modes)

1. Create a project at [supabase.com](https://supabase.com) (free tier: 500MB
   database, unlimited API requests, Realtime included).
2. In the Supabase dashboard, open the **SQL Editor** and run, in order:
   - [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
     — `sessions` + `participants` tables (co-op rooms), RLS + Realtime.
   - [`supabase/migrations/0002_profiles_and_bonus.sql`](supabase/migrations/0002_profiles_and_bonus.sql)
     — `player_profiles` table (RMIT ID/avatar/onboarding), plus
     `sessions.bonus_hours` and `participants.player_profile_id`.

   Both use the same permissive-RLS tradeoff (fine for a low-stakes classroom
   game, not for anything sensitive — see the comments in each file), and
   both need explicit `grant`s in addition to the RLS policies (a fresh
   Postgres doesn't grant table access by default the way a hosted Supabase
   project's default schema sometimes does).
3. In **Project Settings → API**, copy the **Project URL** and the
   **anon public / publishable key**.
4. Copy `.env.local.example` to `.env.local` and fill them in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (or sb_publishable_...)
   ```

5. Restart `npm run dev` (or redeploy). All three modes need this now — the
   onboarding flow (RMIT ID → avatar → profile) that runs before mode select
   writes to `player_profiles` regardless of which mode is picked afterward.

## Project structure

```
app/                  Routes: Start -> rmit-id -> avatar -> profile -> mode ->
                       {self-paced | pair(+[roomCode]) | group(+[roomCode])}
components/ui/         Design-system primitives (Button, StickerCard, Ribbon,
                        StripeDivider, DigitInput, MetricBar, ScreenHeader, ...)
components/game/       Game-specific pieces (BlockAllocatorCard, ProfileResultCard,
                        TimeBudgetCard, SurpriseEventCard, ChallengeAgainCTA, ...)
lib/game/              Framework-independent game engine:
                        types, blocks, hours, 17 profiles (+ deltas), matchProfile,
                        5 roles, avatars
lib/store/              Zustand stores (allocation state, co-op session state,
                        onboarding/player-profile state)
lib/supabase/           Supabase client + session/participant/profile helpers
supabase/migrations/    SQL schema (0001: co-op sessions, 0002: player profiles + bonus hours)
```

The game engine (`lib/game/`) has no dependency on React or Supabase — it's
pure functions over plain objects, which is what makes it unit-testable in
isolation (see `lib/game/matchProfile.test.ts`).

## Design notes

- The time base is a **40-hour week** (not the 168-hour figure mentioned
  elsewhere in the source spec) — see the comment in `lib/game/hours.ts`.
  All 17 profile-matching rules and the 5 role pre-allocations are expressed
  as percentages, so only displayed hour figures depend on this constant.
- Visual style ("sticker" cards: thick black borders, hard offset shadows,
  bold condensed headers) is defined as Tailwind utilities in
  `app/globals.css` and reused via `components/ui/StickerCard.tsx`.

## Deploying

- **Frontend**: push to GitHub, import the repo on [Vercel](https://vercel.com/new)
  (free tier), and add the two `NEXT_PUBLIC_SUPABASE_*` env vars in the
  Vercel project settings.
- **Backend/DB**: nothing to deploy — Supabase is already hosted.
