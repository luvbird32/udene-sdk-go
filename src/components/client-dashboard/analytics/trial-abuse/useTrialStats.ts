import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrialStatData } from "./types";
import { useToast } from "@/hooks/use-toast";

interface TrialUsageData {
  risk_score: number | null;
  created_at: string;
  status: string;
  device_fingerprints: any[];
  ip_addresses: any[];
  usage_patterns: Record<string, any>;
}

export const useTrialStats = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["trial-abuse-stats"],
    queryFn: async () => {
      try {
        console.log("Fetching trial usage data...");
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Error getting user:", userError);
          throw userError;
        }

        if (!user) {
          console.error("No user found");
          throw new Error("No user found");
        }

        const { data, error } = await supabase
          .from('trial_usage')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching trial usage data:", error);
          throw error;
        }

        console.log("Trial usage data fetched:", data?.length || 0, "records");

        // Group data by risk levels and analyze patterns
        const stats = (data as TrialUsageData[] || []).reduce((acc: Record<string, number>, curr) => {
          const score = curr.risk_score ?? 0;
          const riskLevel = score >= 70 ? 'High Risk' : 
                          score >= 40 ? 'Medium Risk' : 
                          'Low Risk';
          
          // Count occurrences of each risk level
          acc[riskLevel] = (acc[riskLevel] || 0) + 1;

          // Analyze patterns
          if (curr.device_fingerprints?.length > 2) {
            acc['Multiple Devices'] = (acc['Multiple Devices'] || 0) + 1;
          }
          if (curr.ip_addresses?.length > 2) {
            acc['Multiple IPs'] = (acc['Multiple IPs'] || 0) + 1;
          }
          
          return acc;
        }, {});

        return Object.entries(stats).map(([name, value]): TrialStatData => ({
          name,
          value
        }));
      } catch (error) {
        console.error("Error in trial stats query:", error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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