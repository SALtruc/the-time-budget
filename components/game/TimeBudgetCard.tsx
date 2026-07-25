import { StickerCard } from "@/components/ui/StickerCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getTotalPercent } from "@/lib/game/allocation";
import type { Allocation } from "@/lib/game/types";

export function TimeBudgetCard({ allocation }: { allocation: Allocation }) {
  const total = getTotalPercent(allocation);

  return (
    <StickerCard className="p-5 sm:p-6">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-bold text-lg sm:text-xl">Time budget</span>
        <span className="font-display text-2xl sm:text-3xl text-brand-red">
          {total}%
        </span>
      </div>
      <ProgressBar
        percent={Math.min(total, 100)}
        colorClassName="bg-brand-red"
        className="h-3"
      />
    </StickerCard>
  );
}
