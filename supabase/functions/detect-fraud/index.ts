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
  referral_data?: any
  affiliate_data?: any
  trial_data?: any
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

    const { transaction, is_confirmed_fraud } = await req.json()
    
    // If this is a fraud confirmation update
    if (is_confirmed_fraud !== undefined) {
      console.log('Updating model with fraud confirmation:', is_confirmed_fraud);
      
      const { data: recentTransactions } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      
      const mlResponse = await supabase.functions.invoke('python-ml', {
        body: { 
          transaction,
          recent_transactions: recentTransactions,
          is_confirmed_fraud
        }
      })
      
      return new Response(
        JSON.stringify(mlResponse.data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get ML insights from Python function
    const { data: recentTransactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', transaction.customer_id)
      .order('created_at', { ascending: false })
      .limit(10)

    const mlResponse = await supabase.functions.invoke('python-ml', {
      body: { 
        transaction,
        recent_transactions: recentTransactions 
      }
    })

    if (mlResponse.error) {
      throw new Error(`ML analysis failed: ${mlResponse.error.message}`)
    }

    console.log('ML risk analysis:', mlResponse.data)

    // Store transaction with risk scores
    const { data: savedTransaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        ...transaction,
        risk_score: mlResponse.data.risk_score,
        is_fraudulent: mlResponse.data.risk_score > 70,
        risk_factors: mlResponse.data.risk_factors
      })
      .select()
      .single()

    if (transactionError) throw transactionError

    // Create fraud alert for high-risk transactions
    if (mlResponse.data.risk_score > 70) {
      await supabase
        .from('fraud_alerts')
        .insert({
          transaction_id: savedTransaction.id,
          alert_type: 'High Risk Transaction',
          severity: mlResponse.data.risk_score > 85 ? 'high' : 'medium',
          description: `Risk factors detected in ${
            transaction.transaction_type
          } transaction. Score: ${mlResponse.data.risk_score.toFixed(1)}%`
        })
    }

    return new Response(
      JSON.stringify({ 
        risk_score: mlResponse.data.risk_score,
        is_fraudulent: mlResponse.data.risk_score > 70,
        risk_factors: mlResponse.data.risk_factors
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