import { DollarSign, ShieldCheck, TrendingUp, Clock, Users, LineChart, AlertTriangle, Ban, BarChart } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { BusinessMetrics } from "./types";

interface MetricsOverviewProps {
  metrics: BusinessMetrics;
}

export const MetricsOverview = ({ metrics }: MetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <MetricCard
        title="Monthly Growth"
        value={`${metrics.monthlyGrowthRate.toFixed(1)}%`}
        icon={TrendingUp}
        description="Month-over-month transaction volume growth"
      />
      <MetricCard
        title="Risk Score Distribution"
        value={`${metrics.riskScoreDistribution.toFixed(1)}%`}
        icon={BarChart}
        description="Average risk score across all transactions"
      />
      <MetricCard
        title="High Risk Transactions"
        value={`${metrics.highRiskPercentage.toFixed(1)}%`}
        icon={AlertTriangle}
        description="Percentage of transactions marked as high risk"
      />
      <MetricCard
        title="Blocked Transaction Rate"
        value={`${metrics.blockedTransactionRate.toFixed(1)}%`}
        icon={Ban}
        description="Percentage of transactions blocked due to risk"
      />
      <MetricCard
        title="Avg Response Time"
        value={`${metrics.averageResponseTime.toFixed(0)}ms`}
        icon={Clock}
        description="Average system response time for fraud detection"
      />
      <MetricCard
        title="Retention Rate"
        value={`${metrics.retentionRate.toFixed(1)}%`}
        icon={Users}
        description="Customer retention rate after fraud incidents"
      />
      <MetricCard
        title="Fraud Prevention"
        value={`${metrics.fraudPreventionRate.toFixed(1)}%`}
        icon={LineChart}
        description="Successfully prevented fraud attempts"
      />
    </div>
  );
};