import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
  // Query hook for fetching risk data with automatic refresh
  const { data: riskData, isLoading } = useQuery({
    queryKey: ["risk-overview"],
    queryFn: async () => {
      // Verify user authentication
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Fetch the 20 most recent transactions ordered by creation date
      // This limit provides enough data points for trend analysis
      // while maintaining good performance
      const { data, error } = await supabase
        .from('transactions')
        .select('risk_score, created_at')
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) throw error;

      // Transform the data for visualization
      // Converts timestamps to local date strings for better readability
      return (data as Transaction[]).map(d => ({
        timestamp: new Date(d.created_at!).toLocaleDateString(),
        score: d.risk_score || 0
      }));
    },
    // Refresh interval of 30 seconds ensures timely detection of risk patterns
    refetchInterval: 30000,
  });

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Risk Score Trend</h3>
      <div className="h-[400px]">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading risk data...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskData}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};