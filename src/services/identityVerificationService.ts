import { supabase } from "@/integrations/supabase/client";
import type { IdentityVerification, VerificationAttempt } from "@/types/verification";

export const identityVerificationService = {
  async createVerification(data: Partial<IdentityVerification>) {
    const { data: verification, error } = await supabase
      .from('identity_verifications')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return verification;
  },

  async getVerifications(userId: string) {
    const { data: verifications, error } = await supabase
      .from('identity_verifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return verifications;
  },

  async getVerificationById(id: string) {
    const { data: verification, error } = await supabase
      .from('identity_verifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return verification;
  },

  async updateVerification(id: string, data: Partial<IdentityVerification>) {
    const { data: verification, error } = await supabase
      .from('identity_verifications')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return verification;
  },

  async logVerificationAttempt(data: Partial<VerificationAttempt>) {
    const { data: attempt, error } = await supabase
      .from('verification_attempts')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return attempt;
  },

  async getVerificationAttempts(verificationId: string) {
    const { data: attempts, error } = await supabase
      .from('verification_attempts')
      .select('*')
      .eq('verification_id', verificationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return attempts;
  }
};