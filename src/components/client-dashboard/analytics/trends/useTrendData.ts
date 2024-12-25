import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface TrendData {
  date: string;
  total: number;
  count: number;
}

export const useTrendData = () => {
  const { toast } = useToast();

  return useQuery<TrendData[]>({
    queryKey: ["transaction-trends"],
    queryFn: async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw new Error("Authentication error");
        }

        if (!session) {
          throw new Error("No active session");
        }

        console.log("Fetching transaction trends...");
        const { data, error: metricsError } = await supabase
          .from('metrics')
          .select('*')
          .order('timestamp', { ascending: true })
          .limit(100);

        if (metricsError) {
          console.error("Metrics fetch error:", metricsError);
          throw metricsError;
        }

        // Group by date and calculate daily totals
        const dailyTotals = (data || []).reduce((acc: Record<string, TrendData>, metric) => {
          const date = format(new Date(metric.timestamp), 'MMM d');
          if (!acc[date]) {
            acc[date] = {
              date,
              total: 0,
              count: 0
            };
          }
          acc[date].total += Number(metric.metric_value);
          acc[date].count += 1;
          return acc;
        }, {});

        return Object.values(dailyTotals);
      } catch (error) {
        console.error("Error in transaction trends query:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load transaction trends. Please try again later."
        });
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};