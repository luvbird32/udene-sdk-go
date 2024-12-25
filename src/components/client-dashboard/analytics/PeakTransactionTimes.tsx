import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

export const PeakTransactionTimes = () => {
  const { data: peakTimes, isLoading } = useQuery({
    queryKey: ["peak-transaction-times"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      // Group by hour
      const hourlyData = (data || []).reduce((acc: any[], transaction) => {
        const hour = format(new Date(transaction.created_at), 'HH:00');
        const existing = acc.find(item => item.hour === hour);
        
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ hour, count: 1 });
        }
        return acc;
      }, []);

      return hourlyData.sort((a, b) => a.hour.localeCompare(b.hour));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Peak Transaction Times</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading peak times...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Peak Transaction Times</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={peakTimes}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};