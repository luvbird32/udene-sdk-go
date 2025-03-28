import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PromoValidationRequest {
  code: string;
  userId: string;
  deviceFingerprint: string;
  ipAddress: string;
}

interface ValidationResult {
  isValid: boolean;
  riskScore: number;
  validationResults: {
    multipleAccounts?: boolean;
    ipVelocity?: boolean;
    deviceVelocity?: boolean;
    usageLimitExceeded?: boolean;
    expired?: boolean;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { code, userId, deviceFingerprint, ipAddress }: PromoValidationRequest = await req.json();

    // Get promo code details
    const { data: promoCode, error: promoError } = await supabaseClient
      .from('promo_codes')
      .select('*')
      .eq('code', code)
      .single();

    if (promoError || !promoCode) {
      console.error('Error fetching promo code:', promoError);
      return new Response(
        JSON.stringify({ error: 'Invalid promo code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Check if code is active and not expired
    if (!promoCode.is_active || (promoCode.expires_at && new Date(promoCode.expires_at) < new Date())) {
      return new Response(
        JSON.stringify({ error: 'Promo code is inactive or expired' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Check usage limits
    if (promoCode.times_used >= promoCode.usage_limit) {
      return new Response(
        JSON.stringify({ error: 'Usage limit exceeded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get recent usage patterns
    const timeWindow = new Date();
    timeWindow.setHours(timeWindow.getHours() - 24);

    const { data: recentUsage, error: usageError } = await supabaseClient
      .from('promo_code_usage')
      .select('*')
      .eq('promo_code_id', promoCode.id)
      .gte('usage_timestamp', timeWindow.toISOString());

    if (usageError) {
      console.error('Error fetching usage data:', usageError);
      throw usageError;
    }

    // Calculate risk factors
    const validationResults: ValidationResult['validationResults'] = {};
    let riskScore = 0;

    // Check for multiple accounts using same device/IP
    const deviceUsage = recentUsage.filter(u => u.device_fingerprint === deviceFingerprint).length;
    const ipUsage = recentUsage.filter(u => u.ip_address === ipAddress).length;

    if (deviceUsage > 2) {
      validationResults.deviceVelocity = true;
      riskScore += 30;
    }

    if (ipUsage > 3) {
      validationResults.ipVelocity = true;
      riskScore += 25;
    }

    // Check for multiple accounts
    const userUsage = recentUsage.filter(u => u.user_id === userId).length;
    if (userUsage > 0) {
      validationResults.multipleAccounts = true;
      riskScore += 45;
    }

    // Log the usage attempt
    const { error: logError } = await supabaseClient
      .from('promo_code_usage')
      .insert({
        promo_code_id: promoCode.id,
        user_id: userId,
        ip_address: ipAddress,
        device_fingerprint: deviceFingerprint,
        risk_score: riskScore,
        is_flagged: riskScore > 50,
        validation_results: validationResults
      });

    if (logError) {
      console.error('Error logging promo code usage:', logError);
      throw logError;
    }

    // If risk score is too high, reject the code
    if (riskScore > 75) {
      return new Response(
        JSON.stringify({ 
          error: 'High risk promo code usage detected',
          riskScore,
          validationResults 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        isValid: true,
        riskScore,
        validationResults,
        promoCode: {
          code: promoCode.code,
          description: promoCode.description
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing promo code:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});