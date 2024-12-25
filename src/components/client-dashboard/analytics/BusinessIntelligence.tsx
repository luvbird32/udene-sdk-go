import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, ShieldCheck } from "lucide-react";
import { MetricCard } from "./components/MetricCard";
import { DetectionAccuracy } from "./components/DetectionAccuracy";
import { CustomerImpact } from "./components/CustomerImpact";

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