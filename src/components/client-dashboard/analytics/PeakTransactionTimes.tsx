import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundary from "@/components/ErrorBoundary";

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
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <ErrorBoundary>
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Peak Transaction Times</h3>
        
        {isLoading && (
          <div className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading peak times...</p>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load peak transaction times. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (!peakTimes || peakTimes.length === 0) && (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No transaction data available</p>
            </div>
          </div>
        )}

        {!isLoading && !error && peakTimes && peakTimes.length > 0 && (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakTimes}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#8884d8" 
                  name="Transaction Count"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </ErrorBoundary>
  );
};