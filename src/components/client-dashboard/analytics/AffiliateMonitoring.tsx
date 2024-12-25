import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LoadingState } from "./affiliate/LoadingState";
import { EmptyState } from "./affiliate/EmptyState";
import { AffiliateChart } from "./affiliate/AffiliateChart";
import { useAffiliateData } from "./affiliate/useAffiliateData";

export const AffiliateMonitoring = () => {
  const { data: affiliateStats, isLoading } = useAffiliateData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!affiliateStats || affiliateStats.length === 0) {
    return <EmptyState />;
  }

  return (
    <ErrorBoundary>
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Affiliate Activity Monitoring</h3>
          <Badge variant="outline">Risk Trends</Badge>
        </div>
        <AffiliateChart data={affiliateStats} />
      </Card>
    </ErrorBoundary>
  );
};