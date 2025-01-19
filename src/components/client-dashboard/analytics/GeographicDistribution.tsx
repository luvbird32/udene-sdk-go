/**
 * GeographicDistribution Component
 * 
 * Visualizes and analyzes the geographic distribution of transactions
 * to identify potential location-based fraud patterns.
 * 
 * Key Analysis Points:
 * 1. Location Clustering:
 *    - Identifies unusual concentrations of activity
 *    - Detects transactions from high-risk regions
 *    - Monitors cross-border transaction patterns
 * 
 * 2. Fraud Indicators:
 *    - Rapid location changes
 *    - Impossible travel patterns
 *    - Known high-risk locations
 *    - VPN/proxy detection
 * 
 * 3. Visualization Features:
 *    - Interactive pie chart showing top transaction locations
 *    - Percentage distribution of activity by region
 *    - Color-coded risk levels by location
 * 
 * The data refreshes every 30 seconds to maintain real-time
 * geographic fraud pattern detection.
 */
import { Card } from "@/components/ui/card";
import { LoadingState } from "./geographic/LoadingState";
import { DistributionChart } from "./geographic/DistributionChart";
import { useGeographicData } from "./geographic/useGeographicData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const GeographicDistribution = () => {
  const { data: distribution, isLoading, error } = useGeographicData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-white">
            Failed to load geographic distribution data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!distribution || distribution.length === 0) {
    return (
      <Card className="p-4">
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-white/60 mx-auto mb-2" />
            <p className="text-white/60">No geographic data available</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4 text-white">Geographic Distribution</h3>
      <div className="h-[300px]">
        <DistributionChart distribution={distribution} />
      </div>
    </Card>
  );
};