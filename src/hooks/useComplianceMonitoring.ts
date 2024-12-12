import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complianceMonitoringService, ComplianceMetrics } from '@/services/complianceMonitoringService';
import { useToast } from '@/components/ui/use-toast';
import { ComplianceReport, SecurityAssessment } from '@/integrations/supabase/types/security';

export const useComplianceMonitoring = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch compliance reports with pagination
  const {
    data: reportsData,
    isLoading: isLoadingReports,
    error: reportsError
  } = useQuery({
    queryKey: ['compliance-reports', currentPage],
    queryFn: () => complianceMonitoringService.getComplianceReports(currentPage),
  });

  // Fetch compliance metrics
  const {
    data: metrics,
    isLoading: isLoadingMetrics,
    error: metricsError
  } = useQuery({
    queryKey: ['compliance-metrics'],
    queryFn: complianceMonitoringService.getComplianceMetrics,
  });

  // Create compliance report mutation
  const createReport = useMutation({
    mutationFn: (reportData: Partial<ComplianceReport>) => 
      complianceMonitoringService.createComplianceReport(reportData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance-reports'] });
      queryClient.invalidateQueries({ queryKey: ['compliance-metrics'] });
      toast({
        title: "Success",
        description: "Compliance report created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create compliance report",
        variant: "destructive",
      });
      console.error('Error creating report:', error);
    },
  });

  // Update report status mutation
  const updateReportStatus = useMutation({
    mutationFn: ({ reportId, status }: { reportId: string; status: string }) =>
      complianceMonitoringService.updateReportStatus(reportId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance-reports'] });
      queryClient.invalidateQueries({ queryKey: ['compliance-metrics'] });
      toast({
        title: "Success",
        description: "Report status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
      console.error('Error updating report status:', error);
    },
  });

  // Create security assessment mutation
  const createAssessment = useMutation({
    mutationFn: (assessmentData: Partial<SecurityAssessment>) =>
      complianceMonitoringService.createSecurityAssessment(assessmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-assessments'] });
      toast({
        title: "Success",
        description: "Security assessment created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create security assessment",
        variant: "destructive",
      });
      console.error('Error creating assessment:', error);
    },
  });

  return {
    // Reports data and pagination
    reports: reportsData?.data || [],
    totalReports: reportsData?.count || 0,
    currentPage,
    setCurrentPage,
    isLoadingReports,
    reportsError,

    // Metrics
    metrics: metrics as ComplianceMetrics,
    isLoadingMetrics,
    metricsError,

    // Mutations
    createReport: createReport.mutate,
    isCreatingReport: createReport.isPending,
    updateReportStatus: updateReportStatus.mutate,
    isUpdatingStatus: updateReportStatus.isPending,
    createAssessment: createAssessment.mutate,
    isCreatingAssessment: createAssessment.isPending,
  };
};