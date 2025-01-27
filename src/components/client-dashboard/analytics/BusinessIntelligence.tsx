import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MetricsOverview } from "./business/MetricsOverview";
import { DetectionAccuracy } from "./components/DetectionAccuracy";
import { CustomerImpact } from "./components/CustomerImpact";
import { useBusinessMetrics } from "./business/useBusinessMetrics";

/**
 * BusinessIntelligence Component
 * 
 * Comprehensive business metrics dashboard showing:
 * - Overall detection system performance
 * - False positive/negative rates
 * - Customer impact analysis
 * - Real-time metric tracking
 * 
 * Handles data loading, error states, and provides
 * visual feedback for system performance.
 * 
 * @returns {JSX.Element} Business intelligence dashboard
 */
export const BusinessIntelligence = () => {
  // Fetch business metrics with real-time updates
  const { data: metrics, isLoading, error } = useBusinessMetrics();

  // Handle error state with user feedback
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-foreground">
          Failed to load business intelligence metrics. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  // Display loading skeleton while fetching data
  if (isLoading || !metrics) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-primary/10 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-primary/10 rounded"></div>
            <div className="h-4 bg-primary/10 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">Business Intelligence</h2>
      
      {/* Overview of key business metrics */}
      <MetricsOverview metrics={metrics} />

      {/* System accuracy metrics display */}
      <DetectionAccuracy
        falsePositiveRate={metrics.falsePositiveRate}
        falseNegativeRate={metrics.falseNegativeRate}
      />

      {/* Customer impact analysis */}
      <CustomerImpact
        affectedCustomers={metrics.affectedCustomers}
        customerImpactRate={metrics.customerImpactRate}
      />
    </div>
  );
};