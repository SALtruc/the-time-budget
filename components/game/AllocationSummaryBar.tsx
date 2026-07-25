import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getRemainingPercent, getTotalPercent } from "@/lib/game/allocation";
import { percentToHours, TOTAL_HOURS } from "@/lib/game/hours";
import type { Allocation } from "@/lib/game/types";

export function AllocationSummaryBar({
  allocation,
  onContinue,
  buttonLabel = "See Results",
  disabled = false,
  bonusHours = 0,
}: {
  allocation: Allocation;
  onContinue: () => void;
  buttonLabel?: string;
  disabled?: boolean;
  bonusHours?: number;
}) {
  const total = getTotalPercent(allocation);
  const remaining = getRemainingPercent(allocation);
  const isComplete = total === 100;
  const overAllocated = total > 100;
  const effectiveTotalHours = TOTAL_HOURS + bonusHours;

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 border-t-2 border-brand-navy bg-brand-cream/95 backdrop-blur px-4 py-4 sm:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-sm sm:text-base font-bold">
            <span>
              {total}% allocated ({percentToHours(total, effectiveTotalHours)}h)
            </span>
            <span className={overAllocated ? "text-brand-red" : ""}>
              {overAllocated
                ? `${Math.abs(remaining)}% over budget`
                : `${remaining}% remaining`}
            </span>
          </div>
          <ProgressBar
            percent={Math.min(total, 100)}
            colorClassName={overAllocated ? "bg-brand-red" : "bg-brand-navy"}
            className="h-3"
          />
        </div>
        <Button
          variant="secondary"
          size="lg"
          disabled={!isComplete || disabled}
          onClick={onContinue}
          className="w-full sm:w-auto"
        >
          {buttonLabel} ›
        </Button>
      </div>
    </div>
  );
}
