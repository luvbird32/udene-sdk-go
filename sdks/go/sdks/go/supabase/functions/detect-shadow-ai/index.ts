import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    const { userId, activityData } = await req.json()
    
    // Extract relevant data
    const {
      content,
      toolSignature,
      metadata,
      ipAddress,
      userAgent
    } = activityData

    // Analyze AI patterns
    const detectionPatterns = analyzeAIPatterns(content, metadata)
    const riskScore = calculateRiskScore(detectionPatterns)

    // Log the AI activity
    const { data: activity, error: insertError } = await supabase
      .from('ai_activity_monitoring')
      .insert({
        user_id: userId,
        activity_type: 'shadow_ai_detection',
        tool_signature: toolSignature,
        risk_score: riskScore,
        detection_patterns: detectionPatterns,
        metadata: metadata,
        ip_address: ipAddress,
        user_agent: userAgent
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Create fraud alert for high-risk activities
    if (riskScore > 70) {
      await supabase
        .from('fraud_alerts')
        .insert({
          alert_type: 'shadow_ai',
          severity: riskScore > 85 ? 'high' : 'medium',
          description: `Suspicious AI activity detected. Risk score: ${riskScore}`,
          behavioral_indicators: detectionPatterns,
          status: 'open'
        })
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        risk_score: riskScore, 
        detection_patterns: detectionPatterns 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in shadow AI detection:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

function analyzeAIPatterns(content: string, metadata: any): Record<string, any> {
  const patterns = {
    repetitive_patterns: detectRepetitivePatterns(content),
    unusual_vocabulary: detectUnusualVocabulary(content),
    context_consistency: checkContextConsistency(content),
    timing_patterns: analyzeTimingPatterns(metadata),
    tool_signatures: detectToolSignatures(metadata)
  }
  
  return patterns
}

function calculateRiskScore(patterns: Record<string, any>): number {
  let score = 0
  
  // Weight different patterns
  if (patterns.repetitive_patterns) score += 20
  if (patterns.unusual_vocabulary) score += 15
  if (!patterns.context_consistency) score += 25
  if (patterns.timing_patterns) score += 20
  if (patterns.tool_signatures) score += 20
  
  return Math.min(score, 100)
}

function detectRepetitivePatterns(content: string): boolean {
  // Implement pattern detection logic
  const words = content.toLowerCase().split(/\s+/)
  const wordFreq = new Map<string, number>()
  
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
  })
  
  return Array.from(wordFreq.values()).some(freq => freq > 3)
}

function detectUnusualVocabulary(content: string): boolean {
  // Check for uncommon word combinations or technical terms
  const technicalTerms = ['api', 'algorithm', 'neural', 'model', 'token']
  return technicalTerms.some(term => content.toLowerCase().includes(term))
}

function checkContextConsistency(content: string): boolean {
  // Analyze context switches and consistency
  const sentences = content.split(/[.!?]+/)
  let consistent = true
  
  for (let i = 1; i < sentences.length; i++) {
    if (sentences[i].length > 0 && !hasContextualContinuity(sentences[i-1], sentences[i])) {
      consistent = false
      break
    }
  }
  
  return consistent
}

function analyzeTimingPatterns(metadata: any): boolean {
  if (!metadata.timestamps || !Array.isArray(metadata.timestamps)) {
    return false
  }
  
  // Check for suspiciously regular intervals
  const intervals = []
  for (let i = 1; i < metadata.timestamps.length; i++) {
    intervals.push(metadata.timestamps[i] - metadata.timestamps[i-1])
  }
  
  // Check if intervals are too consistent
  return hasConsistentIntervals(intervals)
}

function detectToolSignatures(metadata: any): boolean {
  const knownSignatures = [
    'gpt-',
    'claude-',
    'llama-',
    'palm-',
    'anthropic'
  ]
  
  return knownSignatures.some(sig => 
    metadata.userAgent?.toLowerCase().includes(sig) ||
    metadata.toolSignature?.toLowerCase().includes(sig)
  )
}

function hasContextualContinuity(prev: string, current: string): boolean {
  // Simple check for common words or pronouns that indicate continuity
  const continuityMarkers = ['it', 'this', 'that', 'these', 'those', 'they', 'he', 'she']
  return continuityMarkers.some(marker => current.toLowerCase().includes(marker))
}

function hasConsistentIntervals(intervals: number[]): boolean {
  if (intervals.length < 2) return false
  
  const mean = intervals.reduce((a, b) => a + b) / intervals.length
  const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length
  
  // If variance is too low, intervals might be artificially generated
  return variance < 100
}