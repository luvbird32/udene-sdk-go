import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { analyzeFraudRisk } from '../services/riskAnalysis.ts';

export async function handleReferral(supabase: ReturnType<typeof createClient>, data: any) {
  // Get historical referral data
  const { data: referralHistory } = await supabase
    .from('referral_tracking')
    .select('*')
    .or(`referrer_id.eq.${data.referrer_id},referred_id.eq.${data.referrer_id}`)
    .order('created_at', { ascending: false });
  
  // Store referral data
  const { data: referral, error: referralError } = await supabase
    .from('referral_tracking')
    .insert({
      referrer_id: data.referrer_id,
      referred_id: data.referred_id,
      referral_code: data.referral_code,
      ip_address: data.ip_address,
      device_fingerprint: data.device_fingerprint
    })
    .select()
    .single();
    
  if (referralError) throw referralError;
  
  // Analyze referral patterns
  return await analyzeFraudRisk('referral', data, referralHistory || []);
}