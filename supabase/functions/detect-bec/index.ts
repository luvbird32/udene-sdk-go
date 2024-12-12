import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { 
  analyzeEmailPatterns, 
  analyzeBehavioralPatterns,
  checkDomainReputation,
  calculateRiskScore 
} from './analyzers.ts'
import { generateRecommendations } from './utils.ts'
import type { EmailAnalysisRequest } from './types.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const emailData: EmailAnalysisRequest = await req.json()
    
    // Analyze email patterns
    const patterns = await analyzeEmailPatterns(supabase, emailData)
    
    // Check domain reputation
    const domainRisk = await checkDomainReputation(emailData.senderEmail)
    
    // Analyze behavioral patterns
    const behavioralRisk = analyzeBehavioralPatterns(emailData)
    
    // Calculate risk score
    const riskScore = calculateRiskScore(patterns, domainRisk, behavioralRisk)
    
    // Update email reputation
    await supabase
      .from('email_reputation')
      .upsert({
        email: emailData.senderEmail,
        risk_score: riskScore,
        last_updated: new Date().toISOString(),
        platform_occurrences: {},
        fraud_flags: patterns.suspicious_patterns
      })

    // Create fraud alert if high risk
    if (riskScore > 80) {
      await supabase
        .from('fraud_alerts')
        .insert({
          alert_type: 'bec_attempt',
          severity: riskScore > 90 ? 'high' : 'medium',
          description: `Potential BEC attempt detected from ${emailData.senderEmail}`,
          status: 'open',
          email_data: emailData,
          domain_risk_score: domainRisk.risk_level === 'high' ? 1 : 0,
          behavioral_indicators: behavioralRisk.anomalies
        })
    }

    return new Response(
      JSON.stringify({
        risk_score: riskScore,
        risk_factors: {
          domain_spoofing: domainRisk.spoofing_detected,
          suspicious_patterns: patterns.suspicious_patterns,
          behavioral_anomalies: behavioralRisk.anomalies,
        },
        recommendations: generateRecommendations(
          riskScore, 
          patterns.suspicious_patterns, 
          domainRisk.spoofing_detected
        )
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in BEC detection:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})