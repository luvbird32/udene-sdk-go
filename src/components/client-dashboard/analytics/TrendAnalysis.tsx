import { Card } from "@/components/ui/card";
import { TransactionTrendHeader } from "./trends/TransactionTrendHeader";
import { TransactionTrendChart } from "./trends/TransactionTrendChart";
import { useTrendData } from "./trends/useTrendData";

/**
 * TrendAnalysis Component
 * 
 * Visualizes and analyzes transaction trends over time to identify:
 * 1. Unusual spikes or drops in transaction volumes
 * 2. Patterns in transaction amounts
 * 3. Time-based anomalies
 * 
 * Key Metrics Tracked:
 * - Daily transaction totals
 * - Transaction count per day
 * - Trend patterns and deviations
 * 
 * The component uses dual Y-axes to simultaneously display:
 * - Left axis: Total transaction amounts
 * - Right axis: Number of transactions
 * 
 * Data is refreshed every 30 seconds to maintain near real-time
 * monitoring of transaction patterns.
 */
export const TrendAnalysis = () => {
  const { data: trends, isLoading, error } = useTrendData();

  if (isLoading) {
    return (
      <Card className="p-4">
        <TransactionTrendHeader title="Transaction Trends" />
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading trends...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <TransactionTrendHeader title="Transaction Trends" />
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-destructive">Failed to load trends. Please try again later.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <TransactionTrendHeader title="Transaction Trends" />
      <div className="h-[300px]">
        <TransactionTrendChart data={trends || []} />
      </div>
    </Card>
  );
};