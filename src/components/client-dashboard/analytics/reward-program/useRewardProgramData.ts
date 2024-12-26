import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useRewardProgramData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["reward-program-stats"],
    queryFn: async () => {
      console.log("Fetching reward program statistics...");
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.error("No user found");
          throw new Error("No user found");
        }

        const { data: rewards, error } = await supabase
          .from('rewards_transactions')
          .select('program_type, points_earned')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) {
          console.error("Error fetching rewards data:", error);
          throw error;
        }

        console.log(`Processing ${rewards?.length || 0} reward transactions`);

        // Aggregate data by program type
        const programTypes = rewards?.reduce((acc: Record<string, number>, curr) => {
          const type = curr.program_type || 'Unknown';
          acc[type] = (acc[type] || 0) + (curr.points_earned || 0);
          return acc;
        }, {});

        console.log("Reward program statistics calculated successfully");
        return programTypes;
      } catch (error) {
        console.error("Error in reward program statistics calculation:", error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Failed to fetch reward program statistics:", error);
        toast({
          title: "Error",
          description: "Failed to load reward program data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });
};