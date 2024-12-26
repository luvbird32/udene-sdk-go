import { Card } from "@/components/ui/card";
import { RiskScoreChart } from "./analytics/shared/RiskScoreChart";
import { LoadingState } from "./analytics/shared/LoadingState";
import { ErrorState } from "./analytics/shared/ErrorState";
import { EmptyState } from "./analytics/shared/EmptyState";
import { useRiskData } from "./analytics/risk/useRiskData";
import ErrorBoundary from "@/components/ErrorBoundary";

export const RiskOverview = () => {
  const { data: riskData, isLoading, error } = useRiskData();

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Risk Score Trend</h3>
        
        {isLoading && <LoadingState title="Loading risk data..." />}
        {error && <ErrorState error={error} />}
        {!isLoading && !error && (!riskData || riskData.length === 0) && <EmptyState />}
        
        {!isLoading && !error && riskData && riskData.length > 0 && (
          <div className="h-[400px]">
            <RiskScoreChart data={riskData} />
          </div>
        )}
      </Card>
    </ErrorBoundary>
  );
};