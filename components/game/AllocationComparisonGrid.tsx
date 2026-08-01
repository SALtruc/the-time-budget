import { StickerCard } from "@/components/ui/StickerCard";
import { BLOCK_ORDER, BLOCKS } from "@/lib/game/blocks";
import { percentToHours, TOTAL_HOURS } from "@/lib/game/hours";
import type { ParticipantRow } from "@/lib/supabase/sessions";
import { ActivityIcon } from "./ActivityIcon";

export function AllocationComparisonGrid({
  participants,
  columns = "auto",
}: {
  participants: ParticipantRow[];
  columns?: "auto" | "pair";
}) {
  const gridClass =
    columns === "pair"
      ? "grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid w-full gap-4 ${gridClass}`}>
      {participants.map((participant) => (
        <StickerCard key={participant.id} className="p-4 sm:p-5">
          <h3 className="mb-3 truncate font-display text-base sm:text-lg">
            {participant.display_name}
          </h3>
          <div className="flex flex-col gap-2">
            {BLOCK_ORDER.map((key) => {
              const block = BLOCKS[key];
              const percent = participant.allocation?.[key] ?? 0;
              return (
                <div
                  key={key}
                  className={`flex flex-col gap-1 rounded-2xl border-2 border-brand-navy px-3 py-2 ${block.cardBg} ${block.cardText}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <ActivityIcon blockKey={key} className="size-6 shrink-0" />
                    <span className="font-display text-sm tabular-nums sm:text-base">
                      {percentToHours(percent, TOTAL_HOURS)}h
                    </span>
                  </div>
                  <span className="break-words text-[11px] font-bold leading-tight sm:text-xs">
                    {block.label}
                  </span>
                </div>
              );
            })}
          </div>
        </StickerCard>
      ))}
    </div>
  );
}
