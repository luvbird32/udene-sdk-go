import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailAnalysisRequest {
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  content: string;
  ipAddress: string;
  timestamp: string;
  headers: Record<string, string>;
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
    await updateEmailReputation(supabase, emailData, riskScore)

    // Create fraud alert if high risk
    if (riskScore > 80) {
      await createFraudAlert(supabase, emailData, riskScore)
    }

    return new Response(
      JSON.stringify({
        risk_score: riskScore,
        risk_factors: {
          domain_spoofing: domainRisk.spoofing_detected,
          suspicious_patterns: patterns.suspicious_patterns,
          behavioral_anomalies: behavioralRisk.anomalies,
        },
        recommendations: generateRecommendations(riskScore, patterns, domainRisk)
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

async function analyzeEmailPatterns(supabase: any, emailData: EmailAnalysisRequest) {
  const patterns = {
    suspicious_patterns: [],
    confidence: 0
  }

  // Check for similar domain typos
  const originalDomain = emailData.recipientEmail.split('@')[1]
  const senderDomain = emailData.senderEmail.split('@')[1]
  
  if (calculateLevenshteinDistance(originalDomain, senderDomain) <= 2) {
    patterns.suspicious_patterns.push('similar_domain')
    patterns.confidence += 0.4
  }

  // Check for executive names in sender
  const { data: executives } = await supabase
    .from('profiles')
    .select('username')
    .eq('role', 'executive')

  if (executives?.some(exec => 
    emailData.senderEmail.toLowerCase().includes(exec.username.toLowerCase())
  )) {
    patterns.suspicious_patterns.push('executive_name_used')
    patterns.confidence += 0.3
  }

  return patterns
}

async function checkDomainReputation(email: string) {
  const domain = email.split('@')[1]
  
  return {
    spoofing_detected: false,
    age_days: 0,
    suspicious_records: [],
    risk_level: 'low'
  }
}

function analyzeBehavioralPatterns(emailData: EmailAnalysisRequest) {
  const anomalies = []
  let riskLevel = 0

  // Check for urgent language
  const urgentWords = ['urgent', 'immediate', 'required', 'asap']
  if (urgentWords.some(word => 
    emailData.subject.toLowerCase().includes(word) || 
    emailData.content.toLowerCase().includes(word)
  )) {
    anomalies.push('urgent_language')
    riskLevel += 0.3
  }

  // Check for payment-related content
  const paymentWords = ['payment', 'invoice', 'transfer', 'bank', 'wire']
  if (paymentWords.some(word => 
    emailData.content.toLowerCase().includes(word)
  )) {
    anomalies.push('payment_related')
    riskLevel += 0.25
  }

  return {
    anomalies,
    risk_level: riskLevel
  }
}

function calculateRiskScore(
  patterns: any,
  domainRisk: any,
  behavioralRisk: any
): number {
  let score = 0
  
  // Pattern-based scoring
  score += patterns.confidence * 40

  // Domain reputation scoring
  if (domainRisk.spoofing_detected) score += 30
  if (domainRisk.risk_level === 'high') score += 20

  // Behavioral scoring
  score += behavioralRisk.risk_level * 30

  return Math.min(Math.round(score), 100)
}

async function updateEmailReputation(
  supabase: any,
  emailData: EmailAnalysisRequest,
  riskScore: number
) {
  const { error } = await supabase
    .from('email_reputation')
    .upsert({
      email: emailData.senderEmail,
      risk_score: riskScore,
      last_updated: new Date().toISOString(),
      platform_occurrences: {},
      fraud_flags: []
    })

  if (error) throw error
}

async function createFraudAlert(
  supabase: any,
  emailData: EmailAnalysisRequest,
  riskScore: number
) {
  const { error } = await supabase
    .from('fraud_alerts')
    .insert({
      alert_type: 'bec_attempt',
      severity: riskScore > 90 ? 'high' : 'medium',
      description: `Potential BEC attempt detected from ${emailData.senderEmail}`,
      status: 'open'
    })

  if (error) throw error
}

function generateRecommendations(
  riskScore: number,
  patterns: any,
  domainRisk: any
): string[] {
  const recommendations = []

  if (riskScore > 80) {
    recommendations.push('Immediately verify sender through alternative communication channel')
    recommendations.push('Do not act on any payment-related instructions')
  }

  if (patterns.suspicious_patterns.includes('similar_domain')) {
    recommendations.push('Verify sender domain authenticity')
  }

  if (domainRisk.spoofing_detected) {
    recommendations.push('Enable additional email authentication protocols')
  }

  return recommendations
}

function calculateLevenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => 
    Array(a.length + 1).fill(null)
  )

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      )
    }
  }

  return matrix[b.length][a.length]
}