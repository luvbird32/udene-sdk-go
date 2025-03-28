import { AnalyticsGrid } from "@/components/dashboard/AnalyticsGrid";
import ErrorBoundary from "@/components/ErrorBoundary";

export const AnalyticsSection = () => {
  return (
    <ErrorBoundary>
      <AnalyticsGrid />
    </ErrorBoundary>
  );
};