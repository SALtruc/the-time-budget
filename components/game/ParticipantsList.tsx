import { StickerCard } from "@/components/ui/StickerCard";
import { getRole } from "@/lib/game/roles";
import type { ParticipantRow } from "@/lib/supabase/sessions";

export function ParticipantsList({
  participants,
}: {
  participants: ParticipantRow[];
}) {
  return (
    <StickerCard className="p-5 sm:p-6">
      <h2 className="font-display text-lg sm:text-xl mb-3">Players</h2>
      <ul className="flex flex-col gap-2">
        {participants.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-xl border-ink px-4 py-2.5"
          >
            <span className="font-semibold">
              {p.display_name}
              {p.role_id && (
                <span className="ml-2 text-xs font-bold text-brand-navy/50">
                  {getRole(p.role_id).name}
                </span>
              )}
            </span>
            <span
              className={
                p.is_ready
                  ? "text-brand-navy font-display text-sm"
                  : "text-brand-navy/50 text-sm"
              }
            >
              {p.is_ready ? "✓ Ready" : "Allocating…"}
            </span>
          </li>
        ))}
        {participants.length === 0 && (
          <li className="text-sm text-brand-navy/60">
            Waiting for players to join…
          </li>
        )}
      </ul>
    </StickerCard>
  );
}
