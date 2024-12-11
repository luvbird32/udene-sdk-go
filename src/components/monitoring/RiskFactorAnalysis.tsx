import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RiskChart } from "./RiskChart";
import { RiskIndicators } from "./RiskIndicators";
import { analyzeDatingRiskIndicators } from "@/utils/riskAnalysis";
import type { DatabaseTransaction, TransactionWithPatterns } from "@/types/risk";

export const RiskFactorAnalysis = () => {
  const { data: latestTransaction, isLoading } = useQuery({
    queryKey: ["latest-flagged-transaction"],
    queryFn: async () => {
      console.log("Fetching latest flagged transaction...");
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      return (data && data.length > 0 ? data[0] : null) as TransactionWithPatterns | null;
    },
    refetchInterval: 5000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (!latestTransaction) {
    return (
      <Card className="p-4">
        <Alert>
          <AlertDescription>
            No transactions available. New transactions will appear here automatically.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  const riskFactors = latestTransaction.risk_factors || {};
  const featureImportance = latestTransaction.feature_importance || {};
  
  const datingRiskIndicators = analyzeDatingRiskIndicators(latestTransaction);
  
  const additionalFactors = Object.entries(riskFactors)
    .filter(([key]) => !['multiple_platforms', 'fraud_history'].includes(key))
    .map(([key, value]) => [key, String(value)]) as [string, string][];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Risk Factor Analysis</h3>
        <Badge 
          variant={latestTransaction.risk_score && latestTransaction.risk_score >= 70 ? "destructive" : "secondary"}
        >
          Risk Score: {latestTransaction.risk_score?.toFixed(1)}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Feature Importance</h4>
          <RiskChart featureImportance={featureImportance} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Risk Explanations</h4>
          <RiskIndicators 
            indicators={datingRiskIndicators}
            additionalFactors={additionalFactors}
          />
        </div>
      </div>
    </Card>
  );
};