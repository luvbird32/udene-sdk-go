import { supabase } from "@/integrations/supabase/client";

interface AccountTakeoverCheck {
  userId: string;
  ipAddress: string;
  deviceFingerprint: string;
  userAgent: string;
  loginTimestamp: string;
  geoLocation?: string;
  behavioralData?: {
    typingPattern?: string;
    mouseMovements?: string[];
    timeOnPage?: number;
  };
}

interface AccountTakeoverResponse {
  riskScore: number;
  isSuspicious: boolean;
  requiresAdditionalVerification: boolean;
}

export const checkAccountTakeover = async (
  checkData: AccountTakeoverCheck
): Promise<AccountTakeoverResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('detect-account-takeover', {
      body: checkData
    });

    if (error) {
      console.error('Error checking account takeover:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in checkAccountTakeover:', error);
    throw error;
  }
};

export const getAccountSecurityHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('profile_id', userId)
      .eq('activity_type', 'login_security')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching security history:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAccountSecurityHistory:', error);
    throw error;
  }
};

export const getSecurityAlerts = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('fraud_alerts')
      .select('*')
      .eq('alert_type', 'account_takeover')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching security alerts:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSecurityAlerts:', error);
    throw error;
  }
};