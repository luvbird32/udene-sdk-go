import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const GeographicalDistribution = () => {
  const { data: distribution } = useQuery({
    queryKey: ["geographical-distribution"],
    queryFn: async () => {
      console.log("Fetching geographical distribution...");
      const { data, error } = await supabase
        .from('transactions')
        .select('location')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      // Group by location
      const locationCounts = (data || []).reduce((acc: { [key: string]: number }, transaction) => {
        acc[transaction.location] = (acc[transaction.location] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(locationCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // Top 5 locations
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Top Transaction Locations</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
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