import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { EmailAnalysisRequest, BECAnalysisResponse } from "@/types/bec";

export const useBECDetection = () => {
  const { toast } = useToast();

  const analyzeBEC = useMutation({
    mutationFn: async (emailData: EmailAnalysisRequest): Promise<BECAnalysisResponse> => {
      try {
        const { data, error } = await supabase.functions.invoke<BECAnalysisResponse>(
          'detect-bec',
          {
            body: emailData
          }
        );

        if (error) {
          console.error('BEC Detection error:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error in BEC detection:', error);
        toast({
          title: "Error",
          description: "Failed to analyze email for BEC patterns. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
    }
  });

  return {
    analyzeBEC,
    isAnalyzing: analyzeBEC.isPending
  };
};