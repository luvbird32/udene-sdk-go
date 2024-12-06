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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { transaction } = await req.json() as { transaction: Transaction }
    console.log('Processing transaction:', transaction)

    // Simple fraud detection logic
    const riskFactors = []
    let riskScore = 0

    // Check amount threshold
    if (transaction.amount > 10000) {
      riskFactors.push('High amount transaction')
      riskScore += 30
    }

    // Check card present vs online
    if (!transaction.card_present) {
      riskScore += 20
      riskFactors.push('Card not present')
    }

    // Location-based risk
    if (transaction.location.toLowerCase().includes('high_risk_country')) {
      riskScore += 25
      riskFactors.push('High-risk location')
    }

    const isFraudulent = riskScore >= 50

    // Store transaction
    const { data: transactionData, error: transactionError } = await supabase
      .from('transactions')
      .insert([{
        ...transaction,
        risk_score: riskScore,
        is_fraudulent: isFraudulent
      }])
      .select()
      .single()

    if (transactionError) throw transactionError

    // Create fraud alert if necessary
    if (isFraudulent) {
      const { error: alertError } = await supabase
        .from('fraud_alerts')
        .insert([{
          transaction_id: transactionData.id,
          alert_type: 'high_risk_transaction',
          severity: riskScore >= 75 ? 'high' : 'medium',
          description: `Suspicious transaction detected: ${riskFactors.join(', ')}`
        }])

      if (alertError) throw alertError
    }

    // Update metrics
    const { error: metricsError } = await supabase
      .from('metrics')
      .insert([
        {
          metric_name: 'total_transactions',
          metric_value: 1
        },
        {
          metric_name: 'average_risk_score',
          metric_value: riskScore
        },
        {
          metric_name: 'fraud_alerts',
          metric_value: isFraudulent ? 1 : 0
        }
      ])

    if (metricsError) throw metricsError

    return new Response(
      JSON.stringify({
        risk_score: riskScore,
        is_fraudulent: isFraudulent,
        risk_factors: riskFactors
      }),
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
        status: 500,
      },
    )
  }
})