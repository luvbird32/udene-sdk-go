import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrialStatData } from "./types";
import { useToast } from "@/hooks/use-toast";

interface TrialUsageData {
  risk_score: number | null;
}

export const useTrialStats = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["trial-abuse-stats"],
    queryFn: async () => {
      console.log("Fetching trial usage data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('trial_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching trial usage data:", error);
        throw error;
      }

      console.log("Trial usage data fetched:", data?.length || 0, "records");

      // Group data by status and calculate risk levels
      const stats = (data as TrialUsageData[] || []).reduce((acc: Record<string, number>, curr) => {
        // Default to 0 if risk_score is null
        const score = curr.risk_score ?? 0;
        const riskLevel = score >= 70 ? 'High Risk' : 
                         score >= 40 ? 'Medium Risk' : 
                         'Low Risk';
        acc[riskLevel] = (acc[riskLevel] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]): TrialStatData => ({
        name,
        value
      }));
    },
    refetchInterval: 30000,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Trial stats fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load trial abuse data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });
};