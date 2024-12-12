import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type PromoCode = Tables<'promo_codes'>;
type PromoCodeUsage = Tables<'promo_code_usage'>;

interface ValidationResult {
  isValid: boolean;
  riskScore: number;
  validationResults: {
    multipleAccounts?: boolean;
    ipVelocity?: boolean;
    deviceVelocity?: boolean;
    usageLimitExceeded?: boolean;
    expired?: boolean;
  };
  promoCode?: {
    code: string;
    description?: string;
  };
}

export const validatePromoCode = async (
  code: string,
  userId: string,
  deviceFingerprint: string,
  ipAddress: string
): Promise<ValidationResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('detect-promo-fraud', {
      body: {
        code,
        userId,
        deviceFingerprint,
        ipAddress
      }
    });

    if (error) {
      console.error('Error validating promo code:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in validatePromoCode:', error);
    throw error;
  }
};

export const getPromoCodeHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('promo_code_usage')
      .select(`
        *,
        promo_codes (
          code,
          description
        )
      `)
      .eq('user_id', userId)
      .order('usage_timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching promo code history:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getPromoCodeHistory:', error);
    throw error;
  }
};

export const createPromoCode = async (promoCodeData: Partial<PromoCode>) => {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .insert([{
        ...promoCodeData,
        is_active: true,
        times_used: 0,
        risk_score: 0
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating promo code:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createPromoCode:', error);
    throw error;
  }
};