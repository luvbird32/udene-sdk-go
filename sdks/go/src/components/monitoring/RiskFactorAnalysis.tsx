import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RiskChart } from "./RiskChart";
import { RiskIndicators } from "./RiskIndicators";
import { analyzeDatingRiskIndicators } from "@/utils/riskAnalysis";
import type { TransactionWithPatterns } from "@/types/risk";
import { useMemo } from "react";

export const RiskFactorAnalysis = () => {
  const { data: latestTransaction, isLoading } = useQuery({
    queryKey: ["latest-flagged-transaction"],
    queryFn: async () => {
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

  // Memoize calculations to prevent unnecessary re-renders
  const { datingRiskIndicators, additionalFactors, chartData } = useMemo(() => {
    if (!latestTransaction) {
      return { 
        datingRiskIndicators: [], 
        additionalFactors: [],
        chartData: []
      };
    }

    const riskFactors = latestTransaction.risk_factors || {};
    const indicators = analyzeDatingRiskIndicators(latestTransaction);
    const factors = Object.entries(riskFactors)
      .filter(([key]) => !['multiple_platforms', 'fraud_history'].includes(key))
      .map(([key, value]) => [key, String(value)]) as [string, string][];

    const featureImportanceData = latestTransaction.feature_importance 
      ? Object.entries(latestTransaction.feature_importance).map(([key, value]) => ({
          timestamp: key,
          value: value
        }))
      : [];

    return { 
      datingRiskIndicators: indicators, 
      additionalFactors: factors,
      chartData: featureImportanceData
    };
  }, [latestTransaction]);

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
          <AlertDescription className="text-white">
            No transactions available. New transactions will appear here automatically.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Risk Factor Analysis</h3>
        <Badge 
          variant={latestTransaction.risk_score && latestTransaction.risk_score >= 70 ? "destructive" : "secondary"}
          className="text-white"
        >
          Risk Score: {latestTransaction.risk_score?.toFixed(1)}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2 text-white">Feature Importance</h4>
          <RiskChart 
            title="Feature Importance"
            data={chartData}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-white">Risk Explanations</h4>
          <RiskIndicators 
            indicators={datingRiskIndicators}
            additionalFactors={additionalFactors}
          />
        </div>
      </div>
    </Card>
  );
};