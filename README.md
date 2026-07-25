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

Open [http://localhost:3000](http://localhost:3000). **Self-paced mode works
immediately with no setup** — it's fully client-side.

Run the game-logic test suite:

```bash
npm test
```

## Enabling Pair Comparison & Group Roleplay (Supabase)

These two modes sync players in real time and need a free Supabase project.

1. Create a project at [supabase.com](https://supabase.com) (free tier: 500MB
   database, unlimited API requests, Realtime included).
2. In the Supabase dashboard, open the **SQL Editor** and run the contents of
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
   This creates the `sessions` and `participants` tables, enables Row Level
   Security with permissive policies (fine for a low-stakes classroom game —
   see the comment in the migration for the tradeoff), and turns on Realtime
   for both tables.
3. In **Project Settings → API**, copy the **Project URL** and **anon public
   key**.
4. Copy `.env.local.example` to `.env.local` and fill them in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

5. Restart `npm run dev`. Pair Comparison and Group Roleplay will now work —
   until these are set, both modes show a friendly "needs a database" screen
   instead of crashing.

## Project structure

```
app/                  Routes (Start, Choose mode, How to play, Self-paced,
                       Pair + Pair/[roomCode], Group + Group/[roomCode])
components/ui/         Design-system primitives (Button, StickerCard, MetricBar, ...)
components/game/       Game-specific pieces (BlockAllocatorCard, ProfileResultCard, ...)
lib/game/              Framework-independent game engine:
                        types, blocks, hours, 17 profiles, matchProfile, 5 roles
lib/store/              Zustand stores (allocation state, co-op session state)
lib/supabase/           Supabase client + session/participant helpers
supabase/migrations/    SQL schema for co-op sessions
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
