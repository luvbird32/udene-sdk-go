import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "./components/MetricCard";
import { DetectionAccuracy } from "./components/DetectionAccuracy";
import { CustomerImpact } from "./components/CustomerImpact";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessMetrics {
  roi: number;
  savings: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  customerImpactRate: number;
  totalTransactions: number;
  affectedCustomers: number;
}

export const BusinessIntelligence = () => {
  const { toast } = useToast();
  const { data: metrics, isLoading, error } = useQuery<BusinessMetrics>({
    queryKey: ["business-intelligence"],
    queryFn: async () => {
      console.log("Fetching business intelligence metrics...");
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.error("No user found");
          throw new Error("No user found");
        }

        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('amount, risk_score, is_fraudulent')
          .order('created_at', { ascending: false })
          .limit(1000);

        if (error) {
          console.error("Error fetching transactions:", error);
          throw error;
        }

        if (!transactions) {
          console.log("No transactions found");
          return null;
        }

        console.log(`Processing ${transactions.length} transactions for metrics`);

        const blockedTransactions = transactions.filter(t => t.risk_score >= 70);
        const totalBlocked = blockedTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
        
        const verifiedTransactions = transactions.filter(t => t.is_fraudulent !== null);
        const truePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && t.is_fraudulent).length;
        const falsePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && !t.is_fraudulent).length;
        const trueNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && !t.is_fraudulent).length;
        const falseNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && t.is_fraudulent).length;

        const totalVerified = verifiedTransactions.length;
        const falsePositiveRate = totalVerified ? (falsePositives / totalVerified) * 100 : 0;
        const falseNegativeRate = totalVerified ? (falseNegatives / totalVerified) * 100 : 0;
        
        const affectedCustomers = new Set(blockedTransactions.map(t => t.amount)).size;
        const customerImpactRate = transactions.length ? (affectedCustomers / transactions.length) * 100 : 0;

        console.log("Business intelligence metrics calculated successfully");

        return {
          roi: totalBlocked * 0.15,
          savings: totalBlocked,
          falsePositiveRate,
          falseNegativeRate,
          customerImpactRate,
          totalTransactions: transactions.length,
          affectedCustomers
        };
      } catch (error) {
        console.error("Error in business intelligence metrics calculation:", error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Failed to fetch business intelligence metrics:", error);
        toast({
          title: "Error",
          description: "Failed to load business metrics. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load business intelligence metrics. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || !metrics) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
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