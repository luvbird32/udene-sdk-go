import { supabase } from "@/integrations/supabase/client";
import { Transaction } from "@/types/supabase";

export interface PaymentRiskAssessment {
  riskScore: number;
  riskFactors: string[];
  recommendation: 'allow' | 'review' | 'block';
  verificationRequired: boolean;
}

export const udenePaymentProtectionService = {
  async assessTransaction(transactionData: Partial<Transaction>): Promise<PaymentRiskAssessment> {
    try {
      const { data: response, error } = await supabase.functions.invoke('assess-payment-risk', {
        body: { transaction: transactionData }
      });

      if (error) throw error;
      return response;
    } catch (error) {
      console.error('Error assessing payment risk:', error);
      throw error;
    }
  },

  async getTransactionHistory(userId: string) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  },

  async logVerificationAttempt(transactionId: string, verificationData: any) {
    try {
      const { data, error } = await supabase
        .from('verification_attempts')
        .insert([{
          verification_id: transactionId,
          attempt_type: 'payment_verification',
          attempt_data: verificationData
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging verification attempt:', error);
      throw error;
    }
  }
};