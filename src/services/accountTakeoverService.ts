
import { supabase } from "@/integrations/supabase/client";

/**
 * Data required to perform an account takeover risk check
 * @property {string} userId - Identifier of the user being checked
 * @property {string} ipAddress - IP address of the current session
 * @property {string} deviceFingerprint - Unique identifier for the device
 * @property {string} userAgent - Browser/client user agent string
 * @property {string} loginTimestamp - When the login attempt occurred
 * @property {string} [geoLocation] - Optional geographic location data
 * @property {object} [behavioralData] - Optional user behavior metrics
 */
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

/**
 * Response from an account takeover risk assessment
 * @property {number} riskScore - Calculated risk score (0-100)
 * @property {boolean} isSuspicious - Whether the activity is flagged as suspicious
 * @property {boolean} requiresAdditionalVerification - Whether extra verification is needed
 */
interface AccountTakeoverResponse {
  riskScore: number;
  isSuspicious: boolean;
  requiresAdditionalVerification: boolean;
}

/**
 * Analyzes login attempt for potential account takeover risks
 * 
 * Evaluates various signals including device fingerprint, location,
 * and behavioral patterns to detect suspicious login attempts.
 * 
 * @param {AccountTakeoverCheck} checkData - Data about the login attempt
 * @returns {Promise<AccountTakeoverResponse>} Risk assessment results
 * @throws {Error} If the check fails or backend is unreachable
 */
export const checkAccountTakeover = async (
  checkData: AccountTakeoverCheck
): Promise<AccountTakeoverResponse> => {
  try {
    console.log("Performing account takeover check:", {
      userId: checkData.userId,
      deviceFingerprint: checkData.deviceFingerprint,
      timestamp: checkData.loginTimestamp
    });

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

/**
 * Retrieves security history for a specific user
 * 
 * Includes login attempts, security challenges, and previous risk assessments.
 * Results are ordered by timestamp descending (most recent first).
 * 
 * @param {string} userId - ID of the user to check
 * @returns {Promise<Array>} Security activity history
 * @throws {Error} If history cannot be retrieved
 */
export const getAccountSecurityHistory = async (userId: string) => {
  try {
    console.log("Fetching security history for user:", userId);

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

/**
 * Retrieves active security alerts for account takeover attempts
 * 
 * Returns all unresolved alerts related to suspicious login activity
 * or potential account compromise attempts.
 * 
 * @param {string} userId - ID of the user to check
 * @returns {Promise<Array>} Active security alerts
 * @throws {Error} If alerts cannot be retrieved
 */
export const getSecurityAlerts = async (userId: string) => {
  try {
    console.log("Fetching security alerts for user:", userId);

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
