import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TrialAbuseHeader } from "./trial-abuse/TrialAbuseHeader";
import { TrialStatsChart } from "./trial-abuse/TrialStatsChart";
import { EmptyState } from "./trial-abuse/EmptyState";
import { useTrialStats } from "./trial-abuse/useTrialStats";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "@/components/client-dashboard/analytics/shared/LoadingState";

export const TrialAbuseMonitoring = () => {
  const { toast } = useToast();
  const { data: trialStats, isLoading, error } = useTrialStats();

  if (error) {
    return (
      <Card className="p-4">
        <TrialAbuseHeader />
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-foreground">
            Failed to load trial abuse data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading) {
    return <LoadingState title="Loading trial abuse data..." />;
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