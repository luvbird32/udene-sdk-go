import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const GeographicDistribution = () => {
  const { data: distribution, isLoading } = useQuery({
    queryKey: ["geographic-distribution"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('location')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      const locationCounts = (data || []).reduce((acc: { [key: string]: number }, transaction) => {
        const location = transaction.location || 'Unknown';
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(locationCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Geographic Distribution</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading distribution...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Geographic Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {distribution?.map((_, index) => (
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