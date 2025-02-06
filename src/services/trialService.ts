
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { generateDeviceFingerprint } from "@/utils/deviceFingerprint";

type TrialUsage = Tables<'trial_usage'>;
type TrialUsageInsert = Omit<TrialUsage, 'id' | 'created_at' | 'updated_at'>;

export const createTrialUsage = async (userId: string, trialType: string) => {
  try {
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days trial

    // Get device fingerprint
    const deviceData = await generateDeviceFingerprint();

    // Check if device is blocked
    const { data: isBlocked, error: blockCheckError } = await supabase
      .rpc('is_device_blocked', {
        device_fp: deviceData.fingerprint_hash
      });

    if (blockCheckError) throw blockCheckError;

    if (isBlocked) {
      throw new Error("This device has already used a free trial and is not eligible for another one.");
    }

    // Convert deviceData to a format compatible with Json type
    const deviceFingerprint = {
      fingerprint_hash: deviceData.fingerprint_hash,
      browser_info: {
        userAgent: deviceData.browser_info.userAgent,
        platform: deviceData.browser_info.platform,
        cookiesEnabled: deviceData.browser_info.cookiesEnabled,
        doNotTrack: deviceData.browser_info.doNotTrack
      },
      os_info: {
        platform: deviceData.os_info.platform,
        oscpu: deviceData.os_info.oscpu,
        language: deviceData.os_info.language
      },
      hardware_info: {
        deviceMemory: deviceData.hardware_info.deviceMemory,
        hardwareConcurrency: deviceData.hardware_info.hardwareConcurrency,
        maxTouchPoints: deviceData.hardware_info.maxTouchPoints
      },
      network_info: {
        connectionType: deviceData.network_info.connectionType,
        effectiveType: deviceData.network_info.effectiveType,
        downlink: deviceData.network_info.downlink,
        rtt: deviceData.network_info.rtt
      },
      timezone_info: deviceData.timezone_info,
      language_info: deviceData.language_info,
      screen_resolution: deviceData.screen_resolution,
      color_depth: deviceData.color_depth
    };

    const trialData: TrialUsageInsert = {
      user_id: userId,
      trial_type: trialType,
      start_date: startDate,
      end_date: endDate,
      status: 'active',
      risk_score: 0,
      ip_addresses: [], 
      device_fingerprints: [deviceFingerprint],
      usage_patterns: {}
    };

    const { data: trial, error: createError } = await supabase
      .from('trial_usage')
      .insert(trialData)
      .select()
      .single();

    if (createError) throw createError;

    // Analyze for potential fraud
    const { data: fraudAnalysis } = await supabase.functions
      .invoke('detect-trial-fraud', {
        body: { trial }
      });

    return {
      trial,
      fraudAnalysis
    };
  } catch (error) {
    console.error('Error in trial creation:', error);
    throw error;
  }
};

export const getTrialUsage = async (userId: string): Promise<TrialUsage[]> => {
  try {
    const { data, error } = await supabase
      .from('trial_usage')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching trial usage:', error);
    throw error;
  }
};

export const updateTrialStatus = async (trialId: string, status: string): Promise<TrialUsage | null> => {
  try {
    const { data, error } = await supabase
      .from('trial_usage')
      .update({ status })
      .eq('id', trialId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating trial status:', error);
    throw error;
  }
};
