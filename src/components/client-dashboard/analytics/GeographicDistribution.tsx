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

export const GeographicDistribution = () => {
  const { data: distribution, isLoading } = useGeographicData();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Geographic Distribution</h3>
      <div className="h-[300px]">
        <DistributionChart distribution={distribution || []} />
      </div>
    </Card>
  );
};