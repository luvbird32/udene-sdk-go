import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const TrialAbuseMonitoring = () => {
  const { toast } = useToast();
  
  const { data: trialStats, isLoading } = useQuery({
    queryKey: ["trial-abuse-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trial_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch trial usage data",
          variant: "destructive",
        });
        throw error;
      }

      const stats = (data || []).reduce((acc: any, curr) => {
        const status = curr.status === 'active' ? 
          (curr.risk_score >= 70 ? 'High Risk' : 'Active') : 
          'Terminated';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]) => ({ name, value }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Trial Usage Analysis</h3>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading trial data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Trial Usage Analysis</h3>
        <Badge variant="outline">Active Trials</Badge>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={trialStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {trialStats?.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};