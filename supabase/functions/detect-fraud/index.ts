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

Deno.serve(async (req) => {
  // Handle CORS
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

    // Simple fraud detection logic
    const riskFactors = []
    let riskScore = 0

    // High amount transactions
    if (data.amount > 10000) {
      riskFactors.push('High amount transaction')
      riskScore += 30
    }

    // Card not present transactions
    if (!data.card_present) {
      riskFactors.push('Card not present')
      riskScore += 20
    }

    // New device for customer
    const { data: previousTransactions } = await supabase
      .from('transactions')
      .select('device_id')
      .eq('customer_id', data.customer_id)
      .eq('device_id', data.device_id)

    if (!previousTransactions?.length) {
      riskFactors.push('New device')
      riskScore += 25
    }

    // Store transaction
    const { data: savedTransaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        ...data,
        risk_score: riskScore,
        is_fraudulent: riskScore > 50
      })
      .select()
      .single()

    if (transactionError) throw transactionError

    // Create fraud alert if risk score is high
    if (riskScore > 50) {
      const { error: alertError } = await supabase
        .from('fraud_alerts')
        .insert({
          transaction_id: savedTransaction.id,
          alert_type: 'High Risk Transaction',
          severity: riskScore > 75 ? 'high' : 'medium',
          description: `Risk factors: ${riskFactors.join(', ')}`
        })

      if (alertError) throw alertError
    }

    // Update metrics
    const { error: metricsError } = await supabase
      .from('metrics')
      .insert({
        metric_name: 'average_risk_score',
        metric_value: riskScore
      })

    if (metricsError) throw metricsError

    return new Response(
      JSON.stringify({ 
        success: true, 
        risk_score: riskScore,
        is_fraudulent: riskScore > 50 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})