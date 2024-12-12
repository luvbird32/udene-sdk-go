import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { verificationId, documentData } = await req.json()

    // Log the verification attempt
    const { error: attemptError } = await supabaseClient
      .from('verification_attempts')
      .insert({
        verification_id: verificationId,
        attempt_type: 'document_verification',
        attempt_data: documentData,
      })

    if (attemptError) throw attemptError

    // Simulate document verification process
    const verificationResult = {
      success: Math.random() > 0.2, // 80% success rate for demo
      score: Math.random() * 100,
      riskFlags: [],
    }

    // Update the verification record
    const { error: updateError } = await supabaseClient
      .from('identity_verifications')
      .update({
        status: verificationResult.success ? 'approved' : 'rejected',
        verification_score: verificationResult.score,
        risk_flags: verificationResult.riskFlags,
        verified_at: new Date().toISOString(),
        rejection_reason: verificationResult.success ? null : 'Document verification failed',
      })
      .eq('id', verificationId)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify(verificationResult),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})