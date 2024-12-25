/**
 * TrialAbuseMonitoring Component
 * 
 * Monitors and visualizes trial usage patterns to detect potential abuse.
 * This component tracks:
 * - Active trial usage statistics
 * - Risk levels of trial accounts
 * - Suspicious usage patterns
 * 
 * Features:
 * - Real-time monitoring of trial usage
 * - Visual breakdown of trial status distribution
 * - Automatic risk assessment of trial accounts
 * - Detection of multiple trial attempts
 * 
 * The data refreshes every 30 seconds to provide up-to-date insights
 * into potential trial abuse patterns.
 * 
 * @example
 * ```tsx
 * <TrialAbuseMonitoring />
 * ```
 */
import { Card } from "@/components/ui/card";
import { TrialStatsChart } from "./trial-abuse/TrialStatsChart";
import { TrialAbuseHeader } from "./trial-abuse/TrialAbuseHeader";
import { LoadingState } from "./trial-abuse/LoadingState";
import { useTrialStats } from "./trial-abuse/useTrialStats";

export const TrialAbuseMonitoring = () => {
  const { data: trialStats, isLoading } = useTrialStats();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="p-4">
      <TrialAbuseHeader />
      <TrialStatsChart data={trialStats || []} />
    </Card>
  );
};