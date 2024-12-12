import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RiskFactor {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transaction } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Risk assessment logic
    const riskFactors: RiskFactor[] = [];
    let riskScore = 0;

    // 1. Check transaction amount patterns
    const { data: recentTransactions } = await supabaseClient
      .from('transactions')
      .select('amount, created_at')
      .eq('customer_id', transaction.customer_id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (recentTransactions?.length) {
      const avgAmount = recentTransactions.reduce((sum, t) => sum + Number(t.amount), 0) / recentTransactions.length;
      
      if (transaction.amount > avgAmount * 3) {
        riskFactors.push({
          type: 'unusual_amount',
          severity: 'medium',
          description: 'Transaction amount significantly higher than user average'
        });
        riskScore += 25;
      }
    }

    // 2. Check location-based risks
    const { data: userTransactions } = await supabaseClient
      .from('transactions')
      .select('location')
      .eq('customer_id', transaction.customer_id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (userTransactions?.length && userTransactions[0].location !== transaction.location) {
      riskFactors.push({
        type: 'location_change',
        severity: 'medium',
        description: 'Transaction location differs from usual pattern'
      });
      riskScore += 20;
    }

    // 3. Check velocity
    const timeWindow = new Date();
    timeWindow.setHours(timeWindow.getHours() - 1);

    const { count } = await supabaseClient
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', transaction.customer_id)
      .gte('created_at', timeWindow.toISOString());

    if (count && count > 5) {
      riskFactors.push({
        type: 'high_velocity',
        severity: 'high',
        description: 'Unusually high number of transactions in short period'
      });
      riskScore += 30;
    }

    // 4. Device fingerprint check
    if (transaction.device_id) {
      const { data: deviceHistory } = await supabaseClient
        .from('device_fingerprints')
        .select('risk_score')
        .eq('id', transaction.device_id)
        .single();

      if (deviceHistory?.risk_score && deviceHistory.risk_score > 70) {
        riskFactors.push({
          type: 'suspicious_device',
          severity: 'high',
          description: 'Device associated with suspicious activity'
        });
        riskScore += 35;
      }
    }

    // Determine recommendation based on risk score
    let recommendation: 'allow' | 'review' | 'block' = 'allow';
    let verificationRequired = false;

    if (riskScore >= 80) {
      recommendation = 'block';
      verificationRequired = true;
    } else if (riskScore >= 50) {
      recommendation = 'review';
      verificationRequired = true;
    }

    // Log the assessment
    await supabaseClient
      .from('transactions')
      .update({
        risk_score: riskScore,
        risk_factors: riskFactors,
      })
      .eq('id', transaction.id);

    const response = {
      riskScore,
      riskFactors: riskFactors.map(f => f.description),
      recommendation,
      verificationRequired,
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in payment risk assessment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});