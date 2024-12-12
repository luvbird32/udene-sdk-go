import { supabase } from "@/integrations/supabase/client";
import { ComplianceReport, SecurityAssessment } from "@/integrations/supabase/types/security";

export interface ComplianceMetrics {
  totalReports: number;
  pendingReports: number;
  completedReports: number;
  recentAssessments: SecurityAssessment[];
  complianceScore: number;
}

export const complianceMonitoringService = {
  // Fetch compliance reports with pagination
  async getComplianceReports(page = 1, pageSize = 10) {
    console.log('Fetching compliance reports, page:', page);
    const start = (page - 1) * pageSize;
    
    const { data, error, count } = await supabase
      .from('compliance_reports')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, start + pageSize - 1);

    if (error) {
      console.error('Error fetching compliance reports:', error);
      throw error;
    }

    return { data, count };
  },

  // Get compliance metrics dashboard
  async getComplianceMetrics(): Promise<ComplianceMetrics> {
    console.log('Fetching compliance metrics');
    
    const { data: reports, error: reportsError } = await supabase
      .from('compliance_reports')
      .select('status');

    if (reportsError) throw reportsError;

    const { data: assessments, error: assessmentsError } = await supabase
      .from('security_assessments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (assessmentsError) throw assessmentsError;

    const totalReports = reports?.length || 0;
    const pendingReports = reports?.filter(r => r.status === 'pending').length || 0;
    const completedReports = reports?.filter(r => r.status === 'completed').length || 0;
    
    // Calculate compliance score based on completed reports and assessments
    const complianceScore = (completedReports / totalReports) * 100 || 0;

    return {
      totalReports,
      pendingReports,
      completedReports,
      recentAssessments: assessments || [],
      complianceScore: Math.round(complianceScore)
    };
  },

  // Create a new compliance report
  async createComplianceReport(reportData: Pick<ComplianceReport, 'report_type' | 'report_period' | 'generated_by'>) {
    console.log('Creating compliance report:', reportData);
    
    const { data, error } = await supabase
      .from('compliance_reports')
      .insert(reportData)
      .select()
      .single();

    if (error) {
      console.error('Error creating compliance report:', error);
      throw error;
    }

    return data;
  },

  // Update compliance report status
  async updateReportStatus(reportId: string, status: string) {
    console.log('Updating report status:', reportId, status);
    
    const { data, error } = await supabase
      .from('compliance_reports')
      .update({ status })
      .eq('id', reportId)
      .select()
      .single();

    if (error) {
      console.error('Error updating report status:', error);
      throw error;
    }

    return data;
  },

  // Get security assessments
  async getSecurityAssessments() {
    console.log('Fetching security assessments');
    
    const { data, error } = await supabase
      .from('security_assessments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching security assessments:', error);
      throw error;
    }

    return data;
  },

  // Create security assessment
  async createSecurityAssessment(assessmentData: Pick<SecurityAssessment, 'assessment_type' | 'program_id' | 'status'>) {
    console.log('Creating security assessment:', assessmentData);
    
    const { data, error } = await supabase
      .from('security_assessments')
      .insert(assessmentData)
      .select()
      .single();

    if (error) {
      console.error('Error creating security assessment:', error);
      throw error;
    }

    return data;
  }
};