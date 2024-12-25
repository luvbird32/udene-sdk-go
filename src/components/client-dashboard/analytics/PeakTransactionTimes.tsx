import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LoadingState } from "./peak-times/LoadingState";
import { EmptyState } from "./peak-times/EmptyState";
import { ErrorState } from "./peak-times/ErrorState";
import { PeakTimesChart } from "./peak-times/PeakTimesChart";

export const PeakTransactionTimes = () => {
  const { toast } = useToast();
  
  const { data: peakTimes, isLoading, error } = useQuery({
    queryKey: ["peak-transaction-times"],
    queryFn: async () => {
      console.log("Fetching peak transaction times data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user found");
        throw new Error("No user found");
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      console.log("Processing transaction times data...");
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
    meta: {
      errorHandler: (error: Error) => {
        console.error("Peak transaction times error:", error);
        toast({
          title: "Error",
          description: "Failed to load peak transaction times data. Please try again later.",
          variant: "destructive",
        });
      },
    },
    refetchInterval: 30000,
  });

  return (
    <ErrorBoundary>
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Peak Transaction Times</h3>
        
        {isLoading && <LoadingState />}
        {error && <ErrorState />}
        {!isLoading && !error && (!peakTimes || peakTimes.length === 0) && <EmptyState />}
        {!isLoading && !error && peakTimes && peakTimes.length > 0 && (
          <PeakTimesChart data={peakTimes} />
        )}
      </Card>
    </ErrorBoundary>
  );
};