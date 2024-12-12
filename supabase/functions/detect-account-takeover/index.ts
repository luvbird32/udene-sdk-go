import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

import { Database } from '../_shared/database.types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AccountTakeoverRequest {
  userId: string;
  ipAddress: string;
  deviceFingerprint: string;
  userAgent: string;
  loginTimestamp: string;
  geoLocation?: string;
  behavioralData?: {
    typingPattern?: string;
    mouseMovements?: string[];
    timeOnPage?: number;
  };
}

const supabase = createClient<Database>(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

async function calculateRiskScore(data: AccountTakeoverRequest): Promise<number> {
  let riskScore = 0;

  // Check login velocity from IP
  const { data: recentLogins } = await supabase
    .from('user_activities')
    .select('*')
    .eq('profile_id', data.userId)
    .eq('activity_type', 'login')
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false });

  if (recentLogins && recentLogins.length > 10) {
    riskScore += 30; // High login frequency
  }

  // Check if IP is new for this user
  const { data: knownIPs } = await supabase
    .from('user_activities')
    .select('metadata->ip_address')
    .eq('profile_id', data.userId)
    .eq('activity_type', 'login')
    .neq('metadata->ip_address', data.ipAddress);

  if (knownIPs && knownIPs.length === 0) {
    riskScore += 20; // New IP address
  }

  // Check for suspicious location changes
  if (data.geoLocation) {
    const { data: lastLogin } = await supabase
      .from('user_activities')
      .select('metadata->geo_location')
      .eq('profile_id', data.userId)
      .eq('activity_type', 'login')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (lastLogin && lastLogin.metadata?.geo_location !== data.geoLocation) {
      riskScore += 25; // Location change
    }
  }

  // Check for unusual timing
  const loginHour = new Date(data.loginTimestamp).getHours();
  if (loginHour >= 0 && loginHour <= 5) {
    riskScore += 15; // Unusual login time
  }

  return Math.min(riskScore, 100);
}

async function logAccountTakeoverAttempt(
  data: AccountTakeoverRequest,
  riskScore: number,
  isSuspicious: boolean
) {
  // Log the activity
  await supabase.from('user_activities').insert({
    profile_id: data.userId,
    activity_type: 'login_security',
    description: isSuspicious ? 'Suspicious login attempt detected' : 'Login attempt analyzed',
    metadata: {
      ip_address: data.ipAddress,
      device_fingerprint: data.deviceFingerprint,
      user_agent: data.userAgent,
      risk_score: riskScore,
      geo_location: data.geoLocation,
      behavioral_data: data.behavioralData,
      timestamp: data.loginTimestamp,
    },
  });

  // If suspicious, create a fraud alert
  if (isSuspicious) {
    await supabase.from('fraud_alerts').insert({
      alert_type: 'account_takeover',
      severity: riskScore > 75 ? 'high' : 'medium',
      description: `Suspicious login attempt detected with risk score ${riskScore}`,
      behavioral_indicators: {
        ip_address: data.ipAddress,
        device_fingerprint: data.deviceFingerprint,
        user_agent: data.userAgent,
        geo_location: data.geoLocation,
        behavioral_data: data.behavioralData,
      },
    });
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, ipAddress, deviceFingerprint, userAgent, loginTimestamp, geoLocation, behavioralData } = 
      await req.json() as AccountTakeoverRequest;

    console.log('Processing account takeover detection for user:', userId);

    // Calculate risk score based on various factors
    const riskScore = await calculateRiskScore({
      userId,
      ipAddress,
      deviceFingerprint,
      userAgent,
      loginTimestamp,
      geoLocation,
      behavioralData,
    });

    const isSuspicious = riskScore > 50;

    // Log the attempt and create alerts if necessary
    await logAccountTakeoverAttempt(
      {
        userId,
        ipAddress,
        deviceFingerprint,
        userAgent,
        loginTimestamp,
        geoLocation,
        behavioralData,
      },
      riskScore,
      isSuspicious
    );

    return new Response(
      JSON.stringify({
        riskScore,
        isSuspicious,
        requiresAdditionalVerification: riskScore > 75,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in account takeover detection:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
