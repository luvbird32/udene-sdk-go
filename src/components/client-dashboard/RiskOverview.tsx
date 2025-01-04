import { Card } from "@/components/ui/card";
import { RiskScoreChart } from "./analytics/shared/RiskScoreChart";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";
import { useRiskData } from "./analytics/risk/useRiskData";
import ErrorBoundary from "@/components/ErrorBoundary";

export const RiskOverview = () => {
  const { data: riskData, isLoading, error } = useRiskData();

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Your Risk Score Trend</h3>
        
        {isLoading && <LoadingState message="Loading your risk data..." />}
        {error && <ErrorState error={error} />}
        {!isLoading && !error && (!riskData || riskData.length === 0) && (
          <EmptyState message="No risk data available for your account" />
        )}
        
        {!isLoading && !error && riskData && riskData.length > 0 && (
          <div className="h-[400px]">
            <RiskScoreChart data={riskData} />
          </div>
        )}
      </Card>
    </ErrorBoundary>
  );
};