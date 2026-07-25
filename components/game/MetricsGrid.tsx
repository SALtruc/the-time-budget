import { MetricBar } from "@/components/ui/MetricBar";
import type { ProfileMetrics } from "@/lib/game/types";

export function MetricsGrid({ metrics }: { metrics: ProfileMetrics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <MetricBar metric="performance" value={metrics.performance} />
      <MetricBar metric="stress" value={metrics.stress} />
      <MetricBar metric="wellbeing" value={metrics.wellbeing} />
      <MetricBar metric="missedOpps" value={metrics.missedOpps} />
    </div>
  );
}
