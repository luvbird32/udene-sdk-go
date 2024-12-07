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
  timestamp: string
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

    // Get recent transactions for pattern analysis
    const { data: recentTransactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', data.customer_id)
      .order('created_at', { ascending: false })
      .limit(10)

    // Get ML insights from Python function
    const mlResponse = await supabase.functions.invoke('python-ml', {
      body: { 
        transaction: data,
        recent_transactions: recentTransactions 
      }
    })

    if (mlResponse.error) {
      throw new Error(`ML analysis failed: ${mlResponse.error.message}`)
    }

    const mlRiskScore = mlResponse.data.risk_score || 0
    console.log('ML risk analysis:', mlResponse.data)

    // Combine ML score with basic rules
    const basicRiskScore = await calculateBasicRiskScore(data)
    const totalRiskScore = (mlRiskScore * 0.6) + (basicRiskScore * 0.4)
    
    console.log('Final combined risk score:', totalRiskScore)

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
          description: `Risk factors: ML Score ${mlRiskScore.toFixed(1)}%, Basic Score ${basicRiskScore.toFixed(1)}%`
        })

      if (alertError) throw alertError
    }

    return new Response(
      JSON.stringify({ 
        risk_score: totalRiskScore,
        is_fraudulent: totalRiskScore > 70,
        ml_insights: mlResponse.data.risk_factors
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

async function calculateBasicRiskScore(transaction: Transaction): Promise<number> {
  let score = 0
  
  // Amount-based risk
  if (transaction.amount > 1000) score += 20
  if (transaction.amount > 5000) score += 20
  
  // Transaction type risk
  if (!transaction.card_present) score += 15
  if (!transaction.recurring && transaction.amount > 1000) score += 15
  
  // Time-based risk (basic)
  const hour = new Date(transaction.timestamp).getHours()
  if (hour >= 0 && hour < 5) score += 20
  
  return Math.min(100, score)
}