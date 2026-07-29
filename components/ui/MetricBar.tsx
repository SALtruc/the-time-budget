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
}: {
  metric: "performance" | "stress" | "wellbeing" | "missedOpps";
  value: number;
}) {
  return (
    <StickerCard className="p-4 sm:p-5">
      <p className="mb-3 font-display text-xl font-extrabold leading-tight sm:text-2xl">
        {METRIC_LABELS[metric]}
      </p>
      <ProgressBar
        percent={(value / 5) * 100}
        colorClassName={METRIC_COLORS[metric]}
        className="h-2.5 bg-brand-grey/70"
      />
    </StickerCard>
  );
}
