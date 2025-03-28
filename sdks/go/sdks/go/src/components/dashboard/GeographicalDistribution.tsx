import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const GeographicalDistribution = () => {
  const { data: distribution, error, isLoading } = useQuery({
    queryKey: ["geographical-distribution"],
    queryFn: async () => {
      console.log("Fetching geographical distribution...");
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

  if (error) {
    return (
      <Card className="p-4 border-red-500/20">
        <Alert variant="destructive" className="animate-fade-in">
          <AlertDescription>
            Error loading geographical distribution: {error.message}
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading || !distribution) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Top Transaction Locations</h3>
        <div className="h-[200px] space-y-4">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
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
              className="animate-fade-in"
            >
              {distribution?.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                border: 'none',
                borderRadius: '8px',
                padding: '8px'
              }} 
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};