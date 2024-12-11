import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Transaction, RiskFactors } from "@/types/risk";

export const DetectionMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ["detection-metrics"],
    queryFn: async () => {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      return (transactions as Transaction[])?.reduce((acc: any, tx: Transaction) => {
        const riskFactors = tx.risk_factors as RiskFactors;
        
        if (riskFactors?.location_mismatch) {
          acc.locationMismatches = (acc.locationMismatches || 0) + 1;
        }
        if (riskFactors?.suspicious_ip) {
          acc.suspiciousIPs = (acc.suspiciousIPs || 0) + 1;
        }

        if (tx.risk_score && tx.risk_score > 70) {
          acc.highRiskCount = (acc.highRiskCount || 0) + 1;
        }

        return acc;
      }, {});
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Detection Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={metrics}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="highRiskCount" stroke="#ff0000" />
          <Line type="monotone" dataKey="locationMismatches" stroke="#00ff00" />
          <Line type="monotone" dataKey="suspiciousIPs" stroke="#0000ff" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
