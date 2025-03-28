import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";

interface RiskRange {
  range: string;
  count: number;
}

export const RiskDistribution = () => {
  const { toast } = useToast();

  const { data: riskDistribution, error, isLoading } = useQuery({
    queryKey: ["risk-distribution"],
    queryFn: async () => {
      console.log("Fetching risk distribution data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Fetch recent transactions for risk analysis
      const { data, error } = await supabase
        .from('transactions')
        .select('risk_score')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) {
        console.error("Error fetching risk distribution:", error);
        throw error;
      }

      console.log("Processing risk distribution data...");
      // Group by risk score ranges
      const ranges: RiskRange[] = Array.from({ length: 10 }, (_, i) => ({
        range: `${i * 10}-${(i + 1) * 10}`,
        count: 0,
      }));

      (data || []).forEach(transaction => {
        if (transaction.risk_score !== null) {
          const rangeIndex = Math.min(Math.floor(transaction.risk_score / 10), 9);
          ranges[rangeIndex].count += 1;
        }
      });

      console.log("Risk distribution processed:", ranges);
      return ranges;
    },
    refetchInterval: 30000,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Risk distribution error:", error);
        toast({
          title: "Error",
          description: "Failed to load risk distribution data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <ErrorBoundary>
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-white">Risk Score Distribution</h3>
        
        {isLoading && (
          <div className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-white/60">Loading risk distribution...</p>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-white">
              Failed to load risk distribution: {error.message}
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (!riskDistribution || riskDistribution.length === 0) && (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-white/60">No risk distribution data available</p>
          </div>
        )}

        {!isLoading && !error && riskDistribution && riskDistribution.length > 0 && (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution}>
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#8884d8" 
                  name="Transaction Count"
                  radius={[4, 4, 0, 0]} // Rounded corners on top
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </ErrorBoundary>
  );
};