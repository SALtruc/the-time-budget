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

  // "Surprise lecture cancelled" event: rolled once per session so every
  // participant in a Pair/Group room sees the same bonus (fairness).
  const bonusHours = Math.random() < 0.5 ? 2 : 0;

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

export async function joinSession(
  sessionId: string,
  displayName: string,
  roleId: RoleId | null = null,
  playerProfileId: string | null = null
): Promise<ParticipantRow> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("participants")
    .insert({
      session_id: sessionId,
      display_name: displayName,
      role_id: roleId,
      player_profile_id: playerProfileId,
    })
    .select()
    .single();

  if (error) throw error;
  return data as ParticipantRow;
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
    .eq("id", participantId);

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
  const refresh = () => {
    listParticipants(sessionId).then(onChange).catch(console.error);
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
    .subscribe();

  refresh();

  return () => {
    client.removeChannel(channel);
  };
}
