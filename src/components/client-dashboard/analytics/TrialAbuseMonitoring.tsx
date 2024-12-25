import { Card } from "@/components/ui/card";
import { TrialStatsChart } from "./trial-abuse/TrialStatsChart";
import { TrialAbuseHeader } from "./trial-abuse/TrialAbuseHeader";
import { LoadingState } from "./trial-abuse/LoadingState";
import { EmptyState } from "./trial-abuse/EmptyState";
import { useTrialStats } from "./trial-abuse/useTrialStats";
import { useToast } from "@/hooks/use-toast";

export const TrialAbuseMonitoring = () => {
  const { toast } = useToast();
  const { data: trialStats, isLoading, error } = useTrialStats();

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load trial abuse data. Please try again.",
      variant: "destructive",
    });
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!trialStats || trialStats.length === 0) {
    return <EmptyState />;
  }

  return (
    <Card className="p-4">
      <TrialAbuseHeader />
      <TrialStatsChart data={trialStats} />
    </Card>
  );
};