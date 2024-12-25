import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { RiskScoreChart } from "./analytics/shared/RiskScoreChart";
import { LoadingState } from "./analytics/shared/LoadingState";
import { Transaction } from "@/types/supabase";

export const RiskOverview = () => {
  const { data: riskData, isLoading } = useQuery({
    queryKey: ["risk-overview"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('risk_score, created_at')
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) throw error;

      return (data as Transaction[]).map(d => ({
        timestamp: new Date(d.created_at!).toLocaleDateString(),
        score: d.risk_score || 0
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return <LoadingState title="Risk Score Trend" />;
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Risk Score Trend</h3>
      <div className="h-[400px]">
        <RiskScoreChart data={riskData || []} />
      </div>
    </Card>
  );
};