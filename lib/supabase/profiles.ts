import { supabase } from "./client";

export interface PlayerProfileRow {
  id: string;
  student_id: string;
  avatar_id: string | null;
  year_of_study: string | null;
  program: string | null;
  access_code: string | null;
  created_at: string;
}

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }
  return supabase;
}

/** Called right after the RMIT Student ID step — creates the profile row immediately. */
export async function createPlayerProfile(
  studentId: string
): Promise<PlayerProfileRow> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("player_profiles")
    .insert({ student_id: studentId })
    .select()
    .single();

  if (error) throw error;
  return data as PlayerProfileRow;
}

/** Called after the avatar picker and the profile form, to fill in the rest incrementally. */
export async function updatePlayerProfile(
  id: string,
  fields: Partial<{
    avatarId: string;
    yearOfStudy: string;
    program: string;
    accessCode: string;
  }>
): Promise<void> {
  const client = requireSupabase();
  const patch: Record<string, string> = {};
  if (fields.avatarId !== undefined) patch.avatar_id = fields.avatarId;
  if (fields.yearOfStudy !== undefined) patch.year_of_study = fields.yearOfStudy;
  if (fields.program !== undefined) patch.program = fields.program;
  if (fields.accessCode !== undefined) patch.access_code = fields.accessCode;

  const { error } = await client.from("player_profiles").update(patch).eq("id", id);
  if (error) throw error;
}
