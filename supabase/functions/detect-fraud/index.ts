import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Transaction {
  amount: number
  merchant_id: string
  customer_id: string
  location: string
  device_id: string
  ip_address: string
  transaction_type: string
  card_present: boolean
  recurring: boolean
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

    const { transaction } = await req.json()
    const data: Transaction = transaction

    // Calculate risk scores
    const velocityScore = await calculateVelocityScore(supabase, data)
    const locationRiskScore = await calculateLocationRisk(data.location)
    const deviceTrustScore = await calculateDeviceTrustScore(supabase, data.device_id)

    // Apply fraud rules
    const { data: rules } = await supabase
      .from('fraud_rules')
      .select('*')
      .eq('is_active', true)

    let totalRiskScore = 0
    const riskFactors = []

    // Apply each active rule
    for (const rule of rules || []) {
      const condition = rule.condition_json
      if (evaluateCondition(condition, data)) {
        totalRiskScore += rule.risk_score
        riskFactors.push(rule.name)
      }
    }

    // Factor in other scores
    totalRiskScore += velocityScore * 0.3
    totalRiskScore += locationRiskScore * 0.3
    totalRiskScore += (100 - deviceTrustScore) * 0.4

    // Normalize score to 0-100 range
    totalRiskScore = Math.min(100, Math.max(0, totalRiskScore))

    // Store transaction with risk scores
    const { data: savedTransaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        ...data,
        risk_score: totalRiskScore,
        velocity_score: velocityScore,
        location_risk_score: locationRiskScore,
        device_trust_score: deviceTrustScore,
        is_fraudulent: totalRiskScore > 70
      })
      .select()
      .single()

    if (transactionError) throw transactionError

    // Create fraud alert if risk score is high
    if (totalRiskScore > 70) {
      const { error: alertError } = await supabase
        .from('fraud_alerts')
        .insert({
          transaction_id: savedTransaction.id,
          alert_type: 'High Risk Transaction',
          severity: totalRiskScore > 85 ? 'high' : 'medium',
          description: `Risk factors: ${riskFactors.join(', ')}`
        })

      if (alertError) throw alertError
    }

    return new Response(
      JSON.stringify({ 
        risk_score: totalRiskScore,
        is_fraudulent: totalRiskScore > 70,
        risk_factors: riskFactors
      }),
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

// Helper functions
async function calculateVelocityScore(supabase: any, transaction: Transaction): Promise<number> {
  const timeWindow = new Date()
  timeWindow.setHours(timeWindow.getHours() - 24)

  const { count } = await supabase
    .from('transactions')
    .select('*', { count: 'exact', head: true })
    .eq('customer_id', transaction.customer_id)
    .gte('created_at', timeWindow.toISOString())

  return Math.min(100, (count || 0) * 10)
}

async function calculateLocationRisk(location: string): Promise<number> {
  // Simplified location risk calculation
  const highRiskLocations = ['anonymous proxy', 'satellite provider', 'unknown']
  return highRiskLocations.includes(location.toLowerCase()) ? 100 : 0
}

async function calculateDeviceTrustScore(supabase: any, deviceId: string): Promise<number> {
  const { data } = await supabase
    .from('device_fingerprints')
    .select('trust_score')
    .eq('device_id', deviceId)
    .single()

  return data?.trust_score || 0
}

function evaluateCondition(condition: any, transaction: Transaction): boolean {
  try {
    // Simple condition evaluation
    switch (condition.type) {
      case 'amount_threshold':
        return transaction.amount > condition.value
      case 'card_not_present':
        return !transaction.card_present
      case 'new_device':
        return true // This will be handled by device trust score
      default:
        return false
    }
  } catch (error) {
    console.error('Error evaluating condition:', error)
    return false
  }
}