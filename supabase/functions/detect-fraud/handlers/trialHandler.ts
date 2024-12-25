import { createClient } from '@supabase/supabase-js';
import { analyzeFraudRisk } from '../services/riskAnalysis';

export async function handleTrialSignup(supabase: ReturnType<typeof createClient>, data: any) {
  // Get historical trial data
  const { data: trialHistory } = await supabase
    .from('trial_usage')
    .select('*')
    .eq('user_id', data.user_id)
    .order('created_at', { ascending: false });
  
  // Store trial data
  const { data: trial, error: trialError } = await supabase
    .from('trial_usage')
    .insert({
      user_id: data.user_id,
      trial_type: data.trial_type,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      ip_addresses: [data.ip_address],
      device_fingerprints: [data.device_fingerprint],
      usage_patterns: {}
    })
    .select()
    .single();
    
  if (trialError) throw trialError;
  
  // Analyze trial patterns
  return await analyzeFraudRisk('trial', data, trialHistory || []);
}