import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { complianceMonitoringService } from "@/services/complianceMonitoringService";
import { SecurityAssessment } from "@/integrations/supabase/types/security";
import { useToast } from "@/hooks/use-toast";

export const useComplianceMonitoring = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createAssessment = useMutation({
    mutationFn: (assessmentData: Pick<SecurityAssessment, 'assessment_type' | 'program_id' | 'status'>) => 
      complianceMonitoringService.createSecurityAssessment(assessmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-programs'] });
      toast({
        title: "Assessment Created",
        description: "Security assessment has been created successfully.",
      });
    },
    onError: (error) => {
      console.error('Error creating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to create security assessment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getAssessments = useQuery({
    queryKey: ['security-assessments'],
    queryFn: () => complianceMonitoringService.getSecurityAssessments("all"), // Added "all" as default parameter
    meta: {
      errorHandler: (error: Error) => {
        console.error('Error fetching assessments:', error);
        toast({
          title: "Error",
          description: "Failed to fetch security assessments. Please try again.",
          variant: "destructive",
        });
      }
    }
  });

  return {
    createAssessment,
    getAssessments,
  };
};