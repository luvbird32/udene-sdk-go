import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RewardActivity {
  points_earned: number
  points_redeemed: number
  created_at: string
  device_fingerprint: string
  ip_address: string
  program_type: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userId, transactionData } = await req.json()

    // Get user's reward activity in the last 24 hours
    const { data: recentActivity, error: activityError } = await supabaseClient
      .from('rewards_transactions')
      .select('points_earned, points_redeemed, created_at, device_fingerprint, ip_address, program_type')
      .eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })

    if (activityError) {
      console.error('Error fetching recent activity:', activityError)
      throw activityError
    }

    const fraudScore = calculateFraudScore(recentActivity || [], transactionData)
    const riskFactors = identifyRiskFactors(recentActivity || [], transactionData)

    // Log suspicious activity if fraud score is high
    if (fraudScore > 70) {
      await supabaseClient.from('fraud_alerts').insert({
        alert_type: 'reward_abuse',
        severity: fraudScore > 90 ? 'high' : 'medium',
        description: `Suspicious reward program activity detected for user ${userId}`,
        status: 'open',
      })
    }

    return new Response(
      JSON.stringify({
        fraudScore,
        riskFactors,
        recommendation: fraudScore > 70 ? 'block' : 'allow',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in reward fraud detection:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

function calculateFraudScore(recentActivity: RewardActivity[], currentTransaction: any): number {
  let score = 0
  
  // Check for velocity (too many transactions)
  if (recentActivity.length > 10) {
    score += 30
  }

  // Check for multiple devices/IPs
  const uniqueDevices = new Set(recentActivity.map(a => a.device_fingerprint)).size
  const uniqueIPs = new Set(recentActivity.map(a => a.ip_address)).size
  
  if (uniqueDevices > 3) score += 20
  if (uniqueIPs > 3) score += 20

  // Check for suspicious points earning patterns
  const totalPointsEarned = recentActivity.reduce((sum, a) => sum + a.points_earned, 0)
  if (totalPointsEarned > 10000) score += 25

  // Check for quick redemption after earning
  const hasQuickRedemption = recentActivity.some((a, i, arr) => {
    if (i === 0) return false
    const timeDiff = new Date(a.created_at).getTime() - new Date(arr[i-1].created_at).getTime()
    return timeDiff < 5 * 60 * 1000 && a.points_redeemed > 0 // 5 minutes
  })
  
  if (hasQuickRedemption) score += 25

  return Math.min(score, 100)
}

function identifyRiskFactors(recentActivity: RewardActivity[], currentTransaction: any): string[] {
  const riskFactors = []

  if (recentActivity.length > 10) {
    riskFactors.push('High transaction velocity')
  }

  const uniqueDevices = new Set(recentActivity.map(a => a.device_fingerprint)).size
  if (uniqueDevices > 3) {
    riskFactors.push('Multiple devices used')
  }

  const uniqueIPs = new Set(recentActivity.map(a => a.ip_address)).size
  if (uniqueIPs > 3) {
    riskFactors.push('Multiple IP addresses detected')
  }

  const totalPointsEarned = recentActivity.reduce((sum, a) => sum + a.points_earned, 0)
  if (totalPointsEarned > 10000) {
    riskFactors.push('Unusual points accumulation')
  }

  const hasQuickRedemption = recentActivity.some((a, i, arr) => {
    if (i === 0) return false
    const timeDiff = new Date(a.created_at).getTime() - new Date(arr[i-1].created_at).getTime()
    return timeDiff < 5 * 60 * 1000 && a.points_redeemed > 0
  })
  
  if (hasQuickRedemption) {
    riskFactors.push('Suspicious redemption pattern')
  }

  return riskFactors
}