import { supabase } from "@/integrations/supabase/client";
import { SecurityAssessment, SecurityProgram } from "@/integrations/supabase/types/security";

export const complianceMonitoringService = {
  async createSecurityAssessment(assessmentData: Pick<SecurityAssessment, 'assessment_type' | 'program_id' | 'status'>) {
    console.log('Creating security assessment:', assessmentData);
    
    const { data, error } = await supabase
      .from('security_assessments')
      .insert({
        assessment_type: assessmentData.assessment_type,
        program_id: assessmentData.program_id,
        status: assessmentData.status
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating security assessment:', error);
      throw error;
    }

    return data;
  },

  async getSecurityAssessments(programId: string) {
    const query = supabase
      .from('security_assessments')
      .select('*');
      
    // If programId is not "all", filter by program_id
    if (programId !== "all") {
      query.eq('program_id', programId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching security assessments:', error);
      throw error;
    }

    return data;
  },

  async updateSecurityAssessment(assessmentId: string, updates: Partial<SecurityAssessment>) {
    const { data, error } = await supabase
      .from('security_assessments')
      .update(updates)
      .eq('id', assessmentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating security assessment:', error);
      throw error;
    }

    return data;
  },

  async deleteSecurityAssessment(assessmentId: string) {
    const { data, error } = await supabase
      .from('security_assessments')
      .delete()
      .eq('id', assessmentId)
      .select()
      .single();

    if (error) {
      console.error('Error deleting security assessment:', error);
      throw error;
    }

    return data;
  },
};