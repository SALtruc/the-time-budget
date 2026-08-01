import clsx from "clsx";
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
}: {
  allocation: Allocation;
  onContinue: () => void;
  buttonLabel?: string;
  disabled?: boolean;
}) {
  const total = getTotalPercent(allocation);
  const remaining = getRemainingPercent(allocation);
  const isComplete = total === 100;
  const overAllocated = total > 100;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-brand-navy bg-brand-cream/95 px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1">
          <div className="mb-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            <span className="font-display text-base sm:text-lg text-brand-blue">
              {total}% allocated ({percentToHours(total, TOTAL_HOURS)}h)
            </span>
            <span className="text-xs sm:text-sm font-bold">
              {overAllocated
                ? `${Math.abs(remaining)}% over budget`
                : `${remaining}% remaining`}
            </span>
          </div>
          <ProgressBar
            percent={Math.min(total, 100)}
            colorClassName="bg-brand-blue"
            className="h-3 border-2 border-brand-navy"
          />
        </div>
        <Button
          variant="secondary"
          size="lg"
          disabled={!isComplete || disabled}
          onClick={onContinue}
          className={clsx(
            "w-full sm:w-auto",
            isComplete && !disabled && "animate-ready-bounce"
          )}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
