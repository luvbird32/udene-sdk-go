import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface VerificationStat {
  name: string;
  value: number;
}

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

export const IdentityVerificationMonitoring = () => {
  const { data: verificationStats, isLoading } = useQuery<VerificationStat[]>({
    queryKey: ["identity-verification-stats"],
    queryFn: async () => {
      console.log("Fetching identity verification stats...");
      const { data, error } = await supabase
        .from('identity_verifications')
        .select('status')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const stats = (data || []).reduce((acc: Record<string, number>, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]) => ({
        name,
        value
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Identity Verification Status</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading verification data...</p>
        </div>
      </Card>
    );
  }

  const totalVerifications = verificationStats?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Identity Verification Status</h3>
        </div>
        <Badge variant="outline">
          {totalVerifications} Total
        </Badge>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={verificationStats || []}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {verificationStats?.map((_, index) => (
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