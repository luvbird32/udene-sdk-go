import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MetricsOverview } from "./business/MetricsOverview";
import { DetectionAccuracy } from "./components/DetectionAccuracy";
import { CustomerImpact } from "./components/CustomerImpact";
import { useBusinessMetrics } from "./business/useBusinessMetrics";

export const BusinessIntelligence = () => {
  const { data: metrics, isLoading, error } = useBusinessMetrics();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-white">
          Failed to load business intelligence metrics. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || !metrics) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded"></div>
            <div className="h-4 bg-white/10 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Business Intelligence</h2>
      
      <MetricsOverview metrics={metrics} />

      <DetectionAccuracy
        falsePositiveRate={metrics.falsePositiveRate}
        falseNegativeRate={metrics.falseNegativeRate}
      />

      <CustomerImpact
        affectedCustomers={metrics.affectedCustomers}
        customerImpactRate={metrics.customerImpactRate}
      />
    </div>
  );
};