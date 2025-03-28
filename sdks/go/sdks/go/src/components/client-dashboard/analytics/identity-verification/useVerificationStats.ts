import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VerificationStat {
  name: string;
  value: number;
}

interface VerificationData {
  stats: VerificationStat[];
  faceMatchAlerts: number;
  avgFaceMatchScore: number;
}

export const useVerificationStats = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["identity-verification-stats"],
    queryFn: async () => {
      console.log("Fetching identity verification stats...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('identity_verifications')
        .select('status, face_matching_score, face_match_alerts')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching verification stats:", error);
        throw error;
      }

      // Calculate status statistics
      const stats = (data || []).reduce((acc: Record<string, number>, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      // Calculate face matching alerts
      const faceMatchAlerts = data?.filter(d => 
        d.face_match_alerts && 
        (d.face_match_alerts as any[]).length > 0
      ).length || 0;

      // Calculate average face matching score
      const avgFaceMatchScore = data?.reduce((acc, curr) => 
        acc + (curr.face_matching_score || 0), 0) / (data?.length || 1);

      return {
        stats: Object.entries(stats).map(([name, value]) => ({
          name,
          value
        })),
        faceMatchAlerts,
        avgFaceMatchScore
      };
    },
    meta: {
      errorHandler: (error: Error) => {
        console.error("Identity verification error:", error);
        toast({
          title: "Error",
          description: "Failed to load verification statistics",
          variant: "destructive",
        });
      },
    },
    refetchInterval: 30000,
  });
};