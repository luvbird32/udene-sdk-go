/**
 * TrendAnalysis Component
 * 
 * A comprehensive visualization component that displays transaction trends over time.
 * Uses dual Y-axes to simultaneously show transaction counts and total amounts.
 * 
 * Features:
 * - Real-time data updates every 30 seconds
 * - Interactive tooltips showing detailed metrics
 * - Responsive design that adapts to container size
 * - Error boundary protection
 * 
 * Data Display:
 * - Left Y-axis: Total transaction amounts ($)
 * - Right Y-axis: Number of transactions
 * - X-axis: Time periods (days)
 * 
 * @example
 * ```tsx
 * <TrendAnalysis />
 * ```
 */

import { Card } from "@/components/ui/card";
import { TransactionTrendHeader } from "./trends/TransactionTrendHeader";
import { TransactionTrendChart } from "./trends/TransactionTrendChart";
import { useTrendData } from "./trends/useTrendData";

export const TrendAnalysis = () => {
  const { data: trends, isLoading, error } = useTrendData();

  if (isLoading) {
    return (
      <Card className="p-4">
        <TransactionTrendHeader title="Transaction Trends" />
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-white">Loading trends...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <TransactionTrendHeader title="Transaction Trends" />
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-red-500">Failed to load trends. Please try again later.</p>
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