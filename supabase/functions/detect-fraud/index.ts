import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { transaction_type, data } = await req.json()
    
    let riskAnalysis = { risk_score: 0, risk_factors: {} }
    
    switch (transaction_type) {
      case 'trial_signup':
        // Get historical trial data
        const { data: trialHistory } = await supabase
          .from('trial_usage')
          .select('*')
          .eq('user_id', data.user_id)
          .order('created_at', { ascending: false })
        
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
          .single()
          
        if (trialError) throw trialError
        
        // Analyze trial patterns
        const trialRisk = await analyzeFraudRisk('trial', data, trialHistory || [])
        riskAnalysis = trialRisk
        break
        
      case 'referral':
        // Get historical referral data
        const { data: referralHistory } = await supabase
          .from('referral_tracking')
          .select('*')
          .or(`referrer_id.eq.${data.referrer_id},referred_id.eq.${data.referrer_id}`)
          .order('created_at', { ascending: false })
        
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
          .single()
          
        if (referralError) throw referralError
        
        // Analyze referral patterns
        const referralRisk = await analyzeFraudRisk('referral', data, referralHistory || [])
        riskAnalysis = referralRisk
        break
    }
    
    // Create fraud alert for high-risk activities
    if (riskAnalysis.risk_score > 70) {
      await supabase
        .from('fraud_alerts')
        .insert({
          alert_type: `${transaction_type}_fraud`,
          severity: riskAnalysis.risk_score > 85 ? 'high' : 'medium',
          description: `High risk ${transaction_type} activity detected. Score: ${riskAnalysis.risk_score}`,
          status: 'open'
        })
    }

    return new Response(
      JSON.stringify(riskAnalysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

async function analyzeFraudRisk(type: string, currentData: any, historicalData: any[]) {
  // Call Python ML function for sophisticated analysis
  const mlResponse = await fetch(
    `${Deno.env.get('SUPABASE_URL')}/functions/v1/python-ml`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        analysis_type: type,
        current_data: currentData,
        historical_data: historicalData
      })
    }
  )

  if (!mlResponse.ok) {
    throw new Error('ML analysis failed')
  }

  return await mlResponse.json()
}