import { supabase } from "@/integrations/supabase/client";
import type { TrialUsage } from "@/integrations/supabase/types/trial";

export const createTrialUsage = async (userId: string, trialType: string) => {
  try {
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days trial

    const { data: trial, error: createError } = await supabase
      .from('trial_usage')
      .insert({
        user_id: userId,
        trial_type: trialType,
        start_date: startDate,
        end_date: endDate,
        status: 'active'
      })
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

export const getTrialUsage = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('trial_usage')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching trial usage:', error);
    throw error;
  }
};

export const updateTrialStatus = async (trialId: string, status: string) => {
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