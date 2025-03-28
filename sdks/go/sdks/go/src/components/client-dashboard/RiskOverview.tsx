import { Card } from "@/components/ui/card";
import { RiskScoreChart } from "./analytics/shared/RiskScoreChart";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";
import { useRiskData } from "./analytics/risk/useRiskData";
import ErrorBoundary from "@/components/ErrorBoundary";

/**
 * RiskOverview Component
 * 
 * Displays a real-time visualization of transaction risk scores and patterns.
 * Includes error handling, loading states, and empty state management.
 * 
 * Risk Score Categories:
 * - 0-30: Low risk (Normal transaction behavior)
 * - 31-60: Medium risk (Some unusual patterns)
 * - 61-80: High risk (Multiple risk factors)
 * - 81-100: Critical risk (Immediate attention needed)
 * 
 * @returns {JSX.Element} Card containing risk score visualization
 */
export const RiskOverview = () => {
  // Fetch risk data with automatic refresh every 30 seconds
  const { data: riskData, isLoading, error } = useRiskData();

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4 text-foreground">Risk Score Trend</h3>
        
        {/* Handle loading state */}
        {isLoading && <LoadingState message="Loading risk data..." />}
        
        {/* Handle error state */}
        {error && <ErrorState error={error} />}
        
        {/* Handle empty state */}
        {!isLoading && !error && (!riskData || riskData.length === 0) && (
          <EmptyState message="No risk data available" />
        )}
        
        {/* Render risk score chart when data is available */}
        {!isLoading && !error && riskData && riskData.length > 0 && (
          <div className="h-[400px]">
            <RiskScoreChart data={riskData} />
          </div>
        )}
      </Card>
    </ErrorBoundary>
  );
};