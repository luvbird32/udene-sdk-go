import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handleTrialSignup } from './handlers/trialHandler.ts'
import { handleReferral } from './handlers/referralHandler.ts'
import { createFraudAlert } from './services/alertManager.ts'

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
        riskAnalysis = await handleTrialSignup(supabase, data)
        break
        
      case 'referral':
        riskAnalysis = await handleReferral(supabase, data)
        break
    }
    
    // Create fraud alert if needed
    await createFraudAlert(supabase, transaction_type, riskAnalysis.risk_score, data)

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