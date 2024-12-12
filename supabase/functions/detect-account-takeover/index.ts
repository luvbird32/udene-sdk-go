import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AccountTakeoverRequest {
  userId: string;
  ipAddress: string;
  deviceFingerprint: string;
  userAgent: string;
  timestamp: string;
  geoLocation?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const requestData: AccountTakeoverRequest = await req.json();
    const { userId, ipAddress, deviceFingerprint, userAgent, timestamp, geoLocation } = requestData;

    // Get recent login attempts for this user
    const timeWindow = new Date();
    timeWindow.setHours(timeWindow.getHours() - 24);

    const { data: recentActivity, error: activityError } = await supabaseClient
      .from('user_activities')
      .select('*')
      .eq('profile_id', userId)
      .gte('created_at', timeWindow.toISOString())
      .order('created_at', { ascending: false });

    if (activityError) {
      console.error('Error fetching user activities:', activityError);
      throw activityError;
    }

    // Calculate risk factors
    let riskScore = 0;
    const riskFactors: Record<string, boolean> = {
      unusualLocation: false,
      rapidLoginAttempts: false,
      newDevice: false,
      suspiciousIp: false
    };

    // Check login velocity
    if (recentActivity && recentActivity.length > 10) {
      riskScore += 25;
      riskFactors.rapidLoginAttempts = true;
    }

    // Check for new device
    const knownDevices = recentActivity?.filter(a => 
      a.metadata?.deviceFingerprint === deviceFingerprint
    );
    if (!knownDevices?.length) {
      riskScore += 20;
      riskFactors.newDevice = true;
    }

    // Log the activity
    const { error: logError } = await supabaseClient
      .from('user_activities')
      .insert({
        profile_id: userId,
        activity_type: 'login_attempt',
        description: 'Login attempt analysis',
        metadata: {
          ipAddress,
          deviceFingerprint,
          userAgent,
          geoLocation,
          riskFactors
        }
      });

    if (logError) {
      console.error('Error logging activity:', logError);
      throw logError;
    }

    // Create fraud alert if risk score is high
    if (riskScore >= 45) {
      const { error: alertError } = await supabaseClient
        .from('fraud_alerts')
        .insert({
          alert_type: 'account_takeover',
          severity: riskScore >= 75 ? 'high' : 'medium',
          description: 'Suspicious login activity detected',
          behavioral_indicators: riskFactors
        });

      if (alertError) {
        console.error('Error creating fraud alert:', alertError);
        throw alertError;
      }
    }

    return new Response(
      JSON.stringify({
        riskScore,
        riskFactors,
        isHighRisk: riskScore >= 45,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );

  } catch (error) {
    console.error('Error in account takeover detection:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }
});