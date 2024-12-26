import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface AffiliateStats {
  date: string;
  riskScore: number;
  amount: number;
}

export const useAffiliateData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["affiliate-fraud-stats"],
    queryFn: async () => {
      try {
        console.log("Fetching affiliate activity data...");
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
          .from('affiliate_activities')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(100);

        if (error) {
          console.error("Error fetching affiliate activities:", error);
          throw error;
        }

        console.log("Affiliate activities fetched:", data?.length || 0, "records");
        return data?.map(activity => ({
          date: new Date(activity.created_at).toLocaleDateString(),
          riskScore: activity.risk_score || 0,
          amount: activity.transaction_amount || 0
        })) || [];
      } catch (error) {
        console.error("Error in affiliate data query:", error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Affiliate data fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load affiliate activity data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });
};