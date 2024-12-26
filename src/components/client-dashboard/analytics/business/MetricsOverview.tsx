import { DollarSign, ShieldCheck } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { BusinessMetrics } from "./types";

interface MetricsOverviewProps {
  metrics: BusinessMetrics;
}

export const MetricsOverview = ({ metrics }: MetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MetricCard
        title="ROI on Fraud Prevention"
        value={`$${metrics.roi.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
        icon={DollarSign}
        description="Estimated return on investment from prevented fraud"
      />
      <MetricCard
        title="Cost Savings"
        value={`$${metrics.savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
        icon={ShieldCheck}
        description="Total amount saved from blocked fraudulent transactions"
      />
    </div>
  );
};