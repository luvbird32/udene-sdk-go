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
    console.log('Processing fraud detection request');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { transaction } = await req.json()
    const data: Transaction = transaction

    // Enhanced scoring system
    const scores = await Promise.all([
      calculateVelocityScore(supabase, data),
      calculateLocationRisk(data.location),
      calculateDeviceTrustScore(supabase, data.device_id),
      calculateTransactionPatternScore(data),
      calculateAmountRiskScore(data.amount),
    ])

    // Apply weighted scoring
    const [velocityScore, locationRisk, deviceTrust, patternScore, amountRisk] = scores
    console.log('Individual risk scores:', {
      velocityScore,
      locationRisk,
      deviceTrust,
      patternScore,
      amountRisk
    });

    // Weighted combination of scores
    let totalRiskScore = (
      velocityScore * 0.25 +      // Transaction velocity weight
      locationRisk * 0.2 +        // Location risk weight
      (100 - deviceTrust) * 0.2 + // Device trust weight (inverted)
      patternScore * 0.2 +        // Transaction pattern weight
      amountRisk * 0.15          // Amount risk weight
    )

    // Apply business rules
    const riskFactors = []
    
    // Check for high-risk conditions
    if (velocityScore > 70) riskFactors.push('High transaction velocity')
    if (locationRisk > 70) riskFactors.push('Suspicious location')
    if (deviceTrust < 30) riskFactors.push('Untrusted device')
    if (patternScore > 70) riskFactors.push('Unusual transaction pattern')
    if (amountRisk > 70) riskFactors.push('Suspicious amount')
    
    // Additional business rules
    if (!data.card_present && data.amount > 1000) {
      totalRiskScore += 15
      riskFactors.push('Large card-not-present transaction')
    }

    if (!data.recurring && data.amount > 5000) {
      totalRiskScore += 20
      riskFactors.push('Large non-recurring transaction')
    }

    // Normalize final score to 0-100 range
    totalRiskScore = Math.min(100, Math.max(0, totalRiskScore))
    console.log('Final risk score:', totalRiskScore);

    // Store transaction with risk scores
    const { data: savedTransaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        ...data,
        risk_score: totalRiskScore,
        is_fraudulent: totalRiskScore > 70
      })
      .select()
      .single()

    if (transactionError) throw transactionError

    // Create fraud alert for high-risk transactions
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

// Enhanced helper functions
async function calculateVelocityScore(supabase: any, transaction: Transaction): Promise<number> {
  const timeWindows = [
    { hours: 1, weight: 0.5 },   // Last hour
    { hours: 24, weight: 0.3 },  // Last day
    { hours: 168, weight: 0.2 }, // Last week
  ]

  let totalScore = 0
  
  for (const window of timeWindows) {
    const timeWindow = new Date()
    timeWindow.setHours(timeWindow.getHours() - window.hours)

    const { count } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', transaction.customer_id)
      .gte('created_at', timeWindow.toISOString())

    // Calculate window-specific score
    const windowScore = Math.min(100, (count || 0) * (10 / window.hours))
    totalScore += windowScore * window.weight
  }

  return totalScore
}

async function calculateLocationRisk(location: string): Promise<number> {
  const highRiskLocations = ['anonymous proxy', 'satellite provider', 'unknown']
  const mediumRiskLocations = ['high fraud rate country', 'unusual location for customer']
  
  const locationLower = location.toLowerCase()
  
  if (highRiskLocations.includes(locationLower)) return 100
  if (mediumRiskLocations.includes(locationLower)) return 70
  
  return 0
}

async function calculateDeviceTrustScore(supabase: any, deviceId: string): Promise<number> {
  // Check device history
  const { data: deviceHistory } = await supabase
    .from('transactions')
    .select('is_fraudulent')
    .eq('device_id', deviceId)

  if (!deviceHistory?.length) return 30 // New device starts with low trust

  // Calculate trust score based on transaction history
  const fraudulentCount = deviceHistory.filter(t => t.is_fraudulent).length
  const trustScore = Math.max(0, 100 - (fraudulentCount * 20))
  
  return trustScore
}

function calculateTransactionPatternScore(transaction: Transaction): number {
  let score = 0
  
  // Check for unusual patterns
  if (!transaction.card_present && transaction.amount > 1000) {
    score += 30
  }
  
  if (transaction.transaction_type === 'international' && !transaction.recurring) {
    score += 20
  }
  
  if (transaction.amount % 100 === 0 && transaction.amount > 500) {
    score += 15 // Round amounts are sometimes suspicious
  }
  
  return Math.min(100, score)
}

function calculateAmountRiskScore(amount: number): number {
  // Define amount thresholds
  const thresholds = [
    { amount: 10000, score: 100 },
    { amount: 5000, score: 80 },
    { amount: 1000, score: 60 },
    { amount: 500, score: 40 },
    { amount: 100, score: 20 },
  ]
  
  for (const threshold of thresholds) {
    if (amount >= threshold.amount) {
      return threshold.score
    }
  }
  
  return 0
}