import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { RiskScoreChart } from "./analytics/shared/RiskScoreChart";
import { LoadingState } from "./analytics/shared/LoadingState";
import { Transaction } from "@/types/supabase";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export const RiskOverview = () => {
  const { toast } = useToast();
  const { data: riskData, isLoading, error } = useQuery({
    queryKey: ["risk-overview"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('risk_score, created_at')
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) throw error;

      return (data as Transaction[]).map(d => ({
        timestamp: new Date(d.created_at!).toLocaleDateString(),
        score: d.risk_score || 0
      }));
    },
    meta: {
      errorHandler: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load risk overview data",
          variant: "destructive",
        });
      },
    },
  });

  if (isLoading) {
    return <LoadingState title="Risk Score Trend" />;
  }

  if (error) {
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load risk overview data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!riskData || riskData.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No risk data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Risk Score Trend</h3>
      <div className="h-[400px]">
        <RiskScoreChart data={riskData} />
      </div>
    </Card>
  );
};