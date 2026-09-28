import { supabase } from "./client";
import type { Allocation, Profile, RoleId } from "@/lib/game/types";

export type SessionMode = "pair" | "group";

export interface SessionRow {
  id: string;
  mode: SessionMode;
  room_code: string;
  status: "waiting" | "active" | "complete";
  bonus_hours: number;
  created_at: string;
}

export interface ParticipantRow {
  id: string;
  session_id: string;
  display_name: string;
  role_id: RoleId | null;
  player_profile_id: string | null;
  allocation: Allocation | null;
  profile_result: Profile | null;
  is_ready: boolean;
  joined_at: string;
}

function generateRoomCode(): string {
  // 5-digit numeric code, matching the design reference's OTP-style entry.
  return String(Math.floor(10000 + Math.random() * 90000));
}

/**
 * Turns Supabase/network failures into a message a student can act on.
 * Unreachable backends (paused project, offline) surface from supabase-js
 * as a "Failed to fetch" error rather than anything readable.
 */
export function describeSessionError(err: unknown): string {
  const message =
    err && typeof err === "object" && "message" in err
      ? String((err as { message: unknown }).message)
      : "";
  if (/failed to fetch|network|load failed|fetch failed/i.test(message)) {
    return "We couldn't reach the game server. Check your connection and try again, or ask your facilitator.";
  }
  return message || "Something went wrong. Please try again.";
}

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to use Pair/Group modes."
    );
  }
  return supabase;
}

export async function createSession(mode: SessionMode): Promise<SessionRow> {
  const client = requireSupabase();

  const bonusHours = 0;

  // Retry on the (rare) chance a generated code collides with an existing one.
  for (let attempt = 0; attempt < 5; attempt++) {
    const roomCode = generateRoomCode();
    const { data, error } = await client
      .from("sessions")
      .insert({ mode, room_code: roomCode, bonus_hours: bonusHours })
      .select()
      .single();

    if (!error) return data as SessionRow;
    if (!error.message.includes("duplicate")) throw error;
  }

  throw new Error("Could not generate a unique room code, please try again.");
}

export async function getSessionByRoomCode(
  roomCode: string
): Promise<SessionRow | null> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("sessions")
    .select()
    .eq("room_code", roomCode.trim())
    .maybeSingle();

  if (error) throw error;
  return data as SessionRow | null;
}

const pendingJoins = new Map<string, Promise<ParticipantRow>>();

export function joinSession(
  sessionId: string,
  displayName: string,
  roleId: RoleId | null = null,
  playerProfileId: string | null = null
): Promise<ParticipantRow> {
  // A second click can arrive before React disables the join button.
  // Share the in-flight join instead of starting another database request.
  const pending = pendingJoins.get(sessionId);
  if (pending) return pending;
  const request = joinSessionOnce(sessionId, displayName, roleId, playerProfileId)
    .finally(() => pendingJoins.delete(sessionId));
  pendingJoins.set(sessionId, request);
  return request;
}

async function joinSessionOnce(
  sessionId: string,
  displayName: string,
  roleId: RoleId | null = null,
  playerProfileId: string | null = null
): Promise<ParticipantRow> {
  const client = requireSupabase();
  // Save before the request: retries after a lost response must reuse the
  // same primary key. Names are not identities (two students can share one).
  const storageKey = `time-budget:participant:${sessionId}`;
  let participantId = localStorage.getItem(storageKey);
  if (!participantId) {
    participantId = crypto.randomUUID();
    localStorage.setItem(storageKey, participantId);
  }
  const existing = await client
    .from("participants")
    .select()
    .eq("session_id", sessionId)
    .eq("id", participantId)
    .maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data) return existing.data as ParticipantRow;

  // Also recover older joins made before the browser identity was saved.
  if (playerProfileId) {
    const previous = await client
      .from("participants")
      .select()
      .eq("session_id", sessionId)
      .eq("player_profile_id", playerProfileId)
      .order("is_ready", { ascending: false })
      .order("joined_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (previous.error) throw previous.error;
    if (previous.data) {
      localStorage.setItem(storageKey, previous.data.id);
      return previous.data as ParticipantRow;
    }
  }

  const session = await client.from("sessions").select("mode").eq("id", sessionId).single();
  if (session.error) throw session.error;
  if (session.data.mode === "pair") {
    const participants = await listParticipants(sessionId);
    const concurrentJoin = participants.find((p) => p.id === participantId);
    if (concurrentJoin) return concurrentJoin;
    if (participants.length >= 2) {
      throw new Error("This pair room already has two players. Create a new room to play with another partner.");
    }
  }

  const { data, error } = await client
    .from("participants")
    .upsert({
      id: participantId,
      session_id: sessionId,
      display_name: displayName,
      role_id: roleId,
      player_profile_id: playerProfileId,
    }, { onConflict: "id", ignoreDuplicates: true })
    .select()
    .maybeSingle();

  if (error) throw error;
  if (data) return data as ParticipantRow;
  // Another concurrent request with this ID already inserted the row.
  const saved = await client.from("participants").select().eq("id", participantId).single();
  if (saved.error) throw saved.error;
  return saved.data as ParticipantRow;
}

export async function submitAllocation(
  participantId: string,
  allocation: Allocation,
  profileResult: Profile
): Promise<void> {
  const client = requireSupabase();
  const { error } = await client
    .from("participants")
    .update({
      allocation,
      profile_result: profileResult,
      is_ready: true,
    })
    .eq("id", participantId)
    .select("id")
    .single();

  if (error) throw error;
}

export async function updateParticipantRole(
  participantId: string,
  roleId: RoleId
): Promise<void> {
  const client = requireSupabase();
  const { error } = await client
    .from("participants")
    .update({ role_id: roleId })
    .eq("id", participantId);

  if (error) throw error;
}

export async function listParticipants(
  sessionId: string
): Promise<ParticipantRow[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("participants")
    .select()
    .eq("session_id", sessionId)
    .order("joined_at", { ascending: true });

  if (error) throw error;
  return data as ParticipantRow[];
}

export function subscribeToParticipants(
  sessionId: string,
  onChange: (participants: ParticipantRow[]) => void
): () => void {
  const client = requireSupabase();

  // Re-fetch the full list on any change — simplest way to stay consistent,
  // and participant counts per session are tiny (a handful of players).
  let active = true;
  let refreshing = false;
  let refreshAgain = false;
  const refresh = async () => {
    if (refreshing) {
      refreshAgain = true;
      return;
    }
    refreshing = true;
    try {
      do {
        refreshAgain = false;
        const participants = await listParticipants(sessionId);
        if (active) onChange(participants);
      } while (active && refreshAgain);
    } catch (err) {
      console.error(err);
    } finally {
      refreshing = false;
    }
  };

  const channel = client
    .channel(`participants:${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "participants",
        filter: `session_id=eq.${sessionId}`,
      },
      refresh
    )
    .subscribe((status) => {
      if (status === "SUBSCRIBED") void refresh();
    });

  void refresh();
  // Mobile browsers can miss Realtime events while backgrounded.
  const poll = window.setInterval(refresh, 5000);
  window.addEventListener("focus", refresh);

  return () => {
    active = false;
    window.clearInterval(poll);
    window.removeEventListener("focus", refresh);
    client.removeChannel(channel);
  };
}
