import { MetricBar } from "@/components/ui/MetricBar";
import type { ProfileMetrics } from "@/lib/game/types";

export function MetricsGrid({ metrics }: { metrics: ProfileMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <MetricBar metric="performance" value={metrics.performance} index={0} />
      <MetricBar metric="stress" value={metrics.stress} index={1} />
      <MetricBar metric="wellbeing" value={metrics.wellbeing} index={2} />
      <MetricBar metric="missedOpps" value={metrics.missedOpps} index={3} />
    </div>
  );
}
