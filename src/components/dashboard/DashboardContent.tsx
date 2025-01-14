import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { TransactionHistory } from "@/components/client-dashboard/transactions/TransactionHistory";
import { RiskOverview } from "@/components/client-dashboard/RiskOverview";

interface DashboardContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardContent = ({ 
  metrics, 
  metricsLoading, 
  metricsError 
}: DashboardContentProps) => {
  if (metricsError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Error loading dashboard metrics: {metricsError.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (metricsLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-primary/10 rounded w-1/4"></div>
          <div className="h-10 bg-primary/10 rounded"></div>
          <div className="h-20 bg-primary/10 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <RiskOverview />
      <TransactionHistory />
    </div>
  );
};