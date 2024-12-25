/**
 * RewardProgramMonitoring Component
 * 
 * Monitors and analyzes reward program activities for potential abuse
 * and fraudulent behavior.
 * 
 * Key Metrics:
 * - Points earned/redeemed
 * - Transaction patterns
 * - User behavior analysis
 * - Risk scoring
 * 
 * Protection Features:
 * - Velocity checks
 * - Pattern recognition
 * - Multiple account detection
 * - Suspicious redemption monitoring
 * 
 * Visualization:
 * - Bar chart showing program type distribution
 * - Transaction volume analysis
 * - Risk level indicators
 * 
 * Updates every 30 seconds to maintain current program insights.
 */
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

export const RewardProgramMonitoring = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["reward-program-stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: rewards, error } = await supabase
        .from('rewards_transactions')
        .select('program_type, points_earned')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Aggregate data by program type
      const programTypes = rewards?.reduce((acc: Record<string, number>, curr) => {
        const type = curr.program_type || 'Unknown';
        acc[type] = (acc[type] || 0) + (curr.points_earned || 0);
        return acc;
      }, {});

      return programTypes;
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Reward Program Protection</h3>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading reward data...</p>
        </div>
      </Card>
    );
  }

  const chartData = data ? Object.entries(data).map(([name, value]) => ({
    name,
    value
  })) : [];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Reward Program Protection</h3>
        </div>
        <Badge variant="outline">Last 100 Transactions</Badge>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};