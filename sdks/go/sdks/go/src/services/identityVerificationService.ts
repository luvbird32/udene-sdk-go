import { supabase } from "@/integrations/supabase/client";
import type { IdentityVerification, IdentityVerificationInsert, VerificationAttempt, VerificationAttemptInsert } from "@/types/verification";

export const identityVerificationService = {
  async createVerification(data: IdentityVerificationInsert) {
    const { data: verification, error } = await supabase
      .from('identity_verifications')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return verification as IdentityVerification;
  },

  async getVerifications(userId: string) {
    const { data: verifications, error } = await supabase
      .from('identity_verifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return verifications as IdentityVerification[];
  },

  async getVerificationById(id: string) {
    const { data: verification, error } = await supabase
      .from('identity_verifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return verification as IdentityVerification;
  },

  async updateVerification(id: string, data: Partial<IdentityVerification>) {
    const { data: verification, error } = await supabase
      .from('identity_verifications')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return verification as IdentityVerification;
  },

  async logVerificationAttempt(data: VerificationAttemptInsert) {
    const { data: attempt, error } = await supabase
      .from('verification_attempts')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return attempt as VerificationAttempt;
  },

  async getVerificationAttempts(verificationId: string) {
    const { data: attempts, error } = await supabase
      .from('verification_attempts')
      .select('*')
      .eq('verification_id', verificationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return attempts as VerificationAttempt[];
  }
};