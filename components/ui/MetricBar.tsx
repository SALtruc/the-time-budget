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
      className="animate-pop-in p-3 sm:p-4"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <p className="mb-2 font-display text-sm font-extrabold leading-tight sm:text-lg">
        {METRIC_LABELS[metric]}
      </p>
      <ProgressBar
        percent={(value / 5) * 100}
        colorClassName={METRIC_COLORS[metric]}
        className="h-2 bg-brand-grey/70"
      />
    </StickerCard>
  );
}
