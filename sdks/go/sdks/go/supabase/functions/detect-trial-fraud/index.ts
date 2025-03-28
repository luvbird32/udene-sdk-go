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

    const { trial } = await req.json()
    
    // Get historical trial data for this user
    const { data: trialHistory } = await supabase
      .from('trial_usage')
      .select('*')
      .eq('user_id', trial.user_id)
      .order('created_at', { ascending: false })

    // Analyze patterns
    const riskFactors = []
    let riskScore = 0

    // Check for multiple trials
    if (trialHistory && trialHistory.length > 1) {
      riskFactors.push('multiple_trials')
      riskScore += 30
    }

    // Check IP address patterns
    const uniqueIps = new Set(trialHistory?.flatMap(t => t.ip_addresses || []))
    if (uniqueIps.size > 3) {
      riskFactors.push('multiple_ips')
      riskScore += 20
    }

    // Check device fingerprint patterns
    const uniqueDevices = new Set(trialHistory?.flatMap(t => t.device_fingerprints || []))
    if (uniqueDevices.size > 3) {
      riskFactors.push('multiple_devices')
      riskScore += 20
    }

    // Check trial creation velocity
    const recentTrials = trialHistory?.filter(t => 
      new Date(t.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    )
    if (recentTrials && recentTrials.length > 2) {
      riskFactors.push('high_velocity')
      riskScore += 30
    }

    // Create fraud alert if risk score is high
    if (riskScore > 70) {
      await supabase
        .from('fraud_alerts')
        .insert({
          alert_type: 'trial_abuse',
          severity: riskScore > 85 ? 'high' : 'medium',
          description: `High risk trial activity detected. Risk factors: ${riskFactors.join(', ')}`,
          status: 'open'
        })
    }

    // Update trial risk score
    await supabase
      .from('trial_usage')
      .update({ risk_score: riskScore })
      .eq('id', trial.id)

    return new Response(
      JSON.stringify({ risk_score: riskScore, risk_factors: riskFactors }),
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