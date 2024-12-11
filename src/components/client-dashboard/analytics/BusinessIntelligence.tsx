import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, ShieldCheck, UserCheck, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const MetricCard = ({ title, value, icon: Icon, description }: MetricCardProps) => (
  <Card className="p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
  </Card>
);

export const BusinessIntelligence = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["business-intelligence"],
    queryFn: async () => {
      const { data: transactions } = await supabase
        .from('transactions')
        .select('amount, risk_score, is_fraudulent')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (!transactions) return null;

      // Calculate ROI and savings
      const blockedTransactions = transactions.filter(t => t.risk_score >= 70);
      const totalBlocked = blockedTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      const avgTransactionAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0) / transactions.length;
      
      // Calculate accuracy metrics
      const verifiedTransactions = transactions.filter(t => t.is_fraudulent !== null);
      const truePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && t.is_fraudulent).length;
      const falsePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && !t.is_fraudulent).length;
      const trueNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && !t.is_fraudulent).length;
      const falseNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && t.is_fraudulent).length;

      // Calculate rates
      const totalVerified = verifiedTransactions.length;
      const falsePositiveRate = totalVerified ? (falsePositives / totalVerified) * 100 : 0;
      const falseNegativeRate = totalVerified ? (falseNegatives / totalVerified) * 100 : 0;
      
      // Estimate customer impact
      const affectedCustomers = new Set(blockedTransactions.map(t => t.amount)).size;
      const customerImpactRate = (affectedCustomers / transactions.length) * 100;

      return {
        roi: totalBlocked * 0.15, // Assuming 15% of blocked amount is saved
        savings: totalBlocked,
        falsePositiveRate,
        falseNegativeRate,
        customerImpactRate,
        totalTransactions: transactions.length,
        affectedCustomers
      };
    },
    refetchInterval: 30000,
  });

  if (isLoading || !metrics) {
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Business Intelligence</h2>
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

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Detection Accuracy</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-red-500">
              <span>False Positive Rate</span>
              <span>{metrics.falsePositiveRate.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.falsePositiveRate} className="h-2 bg-red-100">
              <div className="h-full bg-red-500 transition-all" style={{ width: `${metrics.falsePositiveRate}%` }} />
            </Progress>
          </div>
          <div>
            <div className="flex justify-between mb-2 text-yellow-500">
              <span>False Negative Rate</span>
              <span>{metrics.falseNegativeRate.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.falseNegativeRate} className="h-2 bg-yellow-100">
              <div className="h-full bg-yellow-500 transition-all" style={{ width: `${metrics.falseNegativeRate}%` }} />
            </Progress>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Customer Impact</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Affected Customers</p>
              <p className="text-2xl font-bold">{metrics.affectedCustomers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Impact Rate</p>
              <p className="text-2xl font-bold">{metrics.customerImpactRate.toFixed(1)}%</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>Customer Impact Rate</span>
              <span>{metrics.customerImpactRate.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.customerImpactRate} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};