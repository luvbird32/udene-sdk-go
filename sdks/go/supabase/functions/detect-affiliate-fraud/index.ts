import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { activity } = await req.json()
    
    // Get historical activities for pattern analysis
    const { data: historicalActivities, error: historyError } = await supabase
      .from('affiliate_activities')
      .select('*')
      .eq('affiliate_id', activity.affiliate_id)
      .order('created_at', { ascending: false })
      .limit(100)

    if (historyError) throw historyError

    // Analyze patterns and calculate risk score
    const riskFactors = []
    let riskScore = 0

    // 1. Velocity check
    const recentActivities = historicalActivities?.filter(ha => 
      new Date(ha.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    )
    if (recentActivities?.length > 50) {
      riskScore += 30
      riskFactors.push('High activity velocity')
    }

    // 2. IP address patterns
    const uniqueIPs = new Set(historicalActivities?.map(ha => ha.ip_address))
    if (uniqueIPs.size > 10) {
      riskScore += 20
      riskFactors.push('Multiple IP addresses')
    }

    // 3. Commission amount patterns
    const avgCommission = historicalActivities?.reduce((sum, ha) => 
      sum + (ha.commission_amount || 0), 0) / (historicalActivities?.length || 1)
    
    if (activity.commission_amount > avgCommission * 3) {
      riskScore += 25
      riskFactors.push('Unusual commission amount')
    }

    // 4. Time pattern analysis
    const activityHours = historicalActivities?.map(ha => 
      new Date(ha.created_at).getHours()
    )
    const suspiciousHours = activityHours?.filter(hour => hour >= 1 && hour <= 5).length
    if (suspiciousHours > 10) {
      riskScore += 15
      riskFactors.push('Suspicious activity hours')
    }

    // 5. User agent analysis
    const uniqueAgents = new Set(historicalActivities?.map(ha => ha.user_agent))
    if (uniqueAgents.size > 5) {
      riskScore += 10
      riskFactors.push('Multiple user agents')
    }

    // Update activity with risk assessment
    const { error: updateError } = await supabase
      .from('affiliate_activities')
      .update({
        risk_score: riskScore,
        fraud_indicators: riskFactors,
        status: riskScore > 70 ? 'flagged' : 'approved'
      })
      .eq('id', activity.id)

    if (updateError) throw updateError

    // Create fraud alert for high-risk activities
    if (riskScore > 70) {
      const { error: alertError } = await supabase
        .from('fraud_alerts')
        .insert({
          alert_type: 'affiliate_fraud',
          severity: riskScore > 85 ? 'high' : 'medium',
          description: `High-risk affiliate activity detected. Risk factors: ${riskFactors.join(', ')}`,
          status: 'open'
        })

      if (alertError) throw alertError
    }

    console.log(`Affiliate fraud detection completed for ${activity.id}. Risk score: ${riskScore}`)

    return new Response(
      JSON.stringify({
        risk_score: riskScore,
        risk_factors: riskFactors,
        status: riskScore > 70 ? 'flagged' : 'approved'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in affiliate fraud detection:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})