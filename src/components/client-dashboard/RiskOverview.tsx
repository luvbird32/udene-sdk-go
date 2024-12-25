import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { RiskScoreChart } from "./analytics/shared/RiskScoreChart";
import { LoadingState } from "./analytics/shared/LoadingState";
import { Transaction } from "@/types/supabase";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundary from "@/components/ErrorBoundary";

export const RiskOverview = () => {
  const { toast } = useToast();
  
  const { data: riskData, isLoading, error } = useQuery({
    queryKey: ["risk-overview"],
    queryFn: async () => {
      console.log("Fetching risk overview data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('risk_score, created_at')
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) {
        console.error("Error fetching risk data:", error);
        throw error;
      }

      console.log("Risk data fetched:", data);
      return (data as Transaction[]).map(d => ({
        timestamp: new Date(d.created_at!).toLocaleDateString(),
        score: d.risk_score || 0
      }));
    },
    meta: {
      errorHandler: (error: Error) => {
        console.error("Risk overview error:", error);
        toast({
          title: "Error",
          description: "Failed to load risk overview data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Risk Score Trend</h3>
        
        {isLoading && (
          <div className="h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading risk data...</p>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load risk overview data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (!riskData || riskData.length === 0) && (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No risk data available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Risk data will appear here once transactions are processed.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !error && riskData && riskData.length > 0 && (
          <div className="h-[400px]">
            <RiskScoreChart data={riskData} />
          </div>
        )}
      </Card>
    </ErrorBoundary>
  );
};