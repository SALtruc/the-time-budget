import { StickerCard } from "./StickerCard";
import { ProgressBar } from "./ProgressBar";

const METRIC_COLORS: Record<string, string> = {
  performance: "bg-brand-cyan",
  stress: "bg-brand-red",
  wellbeing: "bg-brand-pink",
  missedOpps: "bg-brand-gold-dark",
};

const METRIC_LABELS: Record<string, string> = {
  performance: "Performance",
  stress: "Stress level",
  wellbeing: "Wellbeing",
  missedOpps: "Missed opps",
};

export function MetricBar({
  metric,
  value,
  index = 0,
}: {
  metric: "performance" | "stress" | "wellbeing" | "missedOpps";
  value: number;
  index?: number;
}) {
  return (
    <StickerCard
      className="animate-pop-in p-2 sm:p-3"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <p className="mb-1 font-display text-xs font-extrabold leading-tight sm:text-sm">
        {METRIC_LABELS[metric]}
      </p>
      <ProgressBar
        percent={(value / 5) * 100}
        colorClassName={METRIC_COLORS[metric]}
        className="h-1.5 bg-brand-grey/70"
      />
    </StickerCard>
  );
}
