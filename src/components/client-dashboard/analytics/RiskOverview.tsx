import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { RiskScoreChart } from "./shared/RiskScoreChart";
import { LoadingState } from "./shared/LoadingState";
import { Transaction } from "@/types/supabase";

/**
 * RiskOverview Component
 * 
 * Displays a real-time visualization of transaction risk scores over time.
 * The component fetches the most recent transactions and plots their risk scores
 * to help identify patterns and trends in potentially fraudulent activity.
 * 
 * Risk Score Interpretation:
 * - 0-30: Low risk - Normal transaction behavior
 * - 31-60: Medium risk - Some unusual patterns detected
 * - 61-80: High risk - Multiple risk factors present
 * - 81-100: Critical risk - Immediate attention required
 * 
 * The data is automatically refreshed every 30 seconds to ensure
 * near real-time monitoring of transaction risks.
 */
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