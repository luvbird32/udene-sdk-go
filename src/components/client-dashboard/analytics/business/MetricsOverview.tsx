
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
        details={
          <div className="space-y-2">
            <p>Monthly savings breakdown:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Prevented fraud losses: ${(metrics.roi * 0.7).toLocaleString()}</li>
              <li>Operational cost reduction: ${(metrics.roi * 0.3).toLocaleString()}</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="Cost Savings"
        value={`$${metrics.savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
        icon={ShieldCheck}
        description="Total amount saved from blocked fraudulent transactions"
        details={
          <div className="space-y-2">
            <p>Savings categories:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Direct fraud prevention: ${(metrics.savings * 0.8).toLocaleString()}</li>
              <li>Chargeback reduction: ${(metrics.savings * 0.2).toLocaleString()}</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="Monthly Growth"
        value={`${metrics.monthlyGrowthRate.toFixed(1)}%`}
        icon={TrendingUp}
        description="Month-over-month transaction volume growth"
        details={
          <div className="space-y-2">
            <p>Growth indicators:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>New users: +{(metrics.monthlyGrowthRate * 1.2).toFixed(1)}%</li>
              <li>Transaction volume: +{(metrics.monthlyGrowthRate * 0.9).toFixed(1)}%</li>
              <li>Revenue growth: +{(metrics.monthlyGrowthRate * 1.1).toFixed(1)}%</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="Risk Score Distribution"
        value={`${metrics.riskScoreDistribution.toFixed(1)}%`}
        icon={BarChart}
        description="Average risk score across all transactions"
        details={
          <div className="space-y-2">
            <p>Risk level breakdown:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Low risk (0-30): {(100 - metrics.riskScoreDistribution).toFixed(1)}%</li>
              <li>Medium risk (31-70): {(metrics.riskScoreDistribution * 0.6).toFixed(1)}%</li>
              <li>High risk (71-100): {(metrics.riskScoreDistribution * 0.4).toFixed(1)}%</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="High Risk Transactions"
        value={`${metrics.highRiskPercentage.toFixed(1)}%`}
        icon={AlertTriangle}
        description="Percentage of transactions marked as high risk"
        details={
          <div className="space-y-2">
            <p>Risk factors:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Suspicious IP addresses: {(metrics.highRiskPercentage * 0.4).toFixed(1)}%</li>
              <li>Unusual amounts: {(metrics.highRiskPercentage * 0.3).toFixed(1)}%</li>
              <li>Pattern matches: {(metrics.highRiskPercentage * 0.3).toFixed(1)}%</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="Blocked Transaction Rate"
        value={`${metrics.blockedTransactionRate.toFixed(1)}%`}
        icon={Ban}
        description="Percentage of transactions blocked due to risk"
        details={
          <div className="space-y-2">
            <p>Block reasons:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>High risk score: {(metrics.blockedTransactionRate * 0.5).toFixed(1)}%</li>
              <li>Suspicious activity: {(metrics.blockedTransactionRate * 0.3).toFixed(1)}%</li>
              <li>Policy violations: {(metrics.blockedTransactionRate * 0.2).toFixed(1)}%</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="Avg Response Time"
        value={`${metrics.averageResponseTime.toFixed(0)}ms`}
        icon={Clock}
        description="Average system response time for fraud detection"
        details={
          <div className="space-y-2">
            <p>Response time breakdown:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Risk analysis: {(metrics.averageResponseTime * 0.4).toFixed(0)}ms</li>
              <li>Pattern matching: {(metrics.averageResponseTime * 0.3).toFixed(0)}ms</li>
              <li>Decision making: {(metrics.averageResponseTime * 0.3).toFixed(0)}ms</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="Retention Rate"
        value={`${metrics.retentionRate.toFixed(1)}%`}
        icon={Users}
        description="Customer retention rate after fraud incidents"
        details={
          <div className="space-y-2">
            <p>Retention factors:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Issue resolution: {(metrics.retentionRate * 0.4).toFixed(1)}%</li>
              <li>Customer satisfaction: {(metrics.retentionRate * 0.3).toFixed(1)}%</li>
              <li>Trust restoration: {(metrics.retentionRate * 0.3).toFixed(1)}%</li>
            </ul>
          </div>
        }
      />
      <MetricCard
        title="Fraud Prevention"
        value={`${metrics.fraudPreventionRate.toFixed(1)}%`}
        icon={LineChart}
        description="Successfully prevented fraud attempts"
        details={
          <div className="space-y-2">
            <p>Prevention methods:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>AI detection: {(metrics.fraudPreventionRate * 0.5).toFixed(1)}%</li>
              <li>Rule-based: {(metrics.fraudPreventionRate * 0.3).toFixed(1)}%</li>
              <li>Manual review: {(metrics.fraudPreventionRate * 0.2).toFixed(1)}%</li>
            </ul>
          </div>
        }
      />
    </div>
  );
};
