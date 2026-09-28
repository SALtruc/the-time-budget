import type { ParticipantRow } from "@/lib/supabase/sessions";

// Older rooms could contain abandoned extra joins. Pair comparison needs
// two completed allocations, not a submission from every historical row.
export function getReadyPair(participants: ParticipantRow[]): ParticipantRow[] {
  return participants
    .filter((p) => p.is_ready && p.allocation && p.profile_result)
    .sort((a, b) => a.joined_at.localeCompare(b.joined_at) || a.id.localeCompare(b.id))
    .slice(0, 2);
}
