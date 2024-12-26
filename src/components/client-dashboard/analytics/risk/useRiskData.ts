import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Transaction } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

export interface RiskDataPoint {
  timestamp: string;
  score: number;
}

export const useRiskData = () => {
  const { toast } = useToast();

  return useQuery({
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
};