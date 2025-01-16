import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Get metrics from the database
    const { data: metricsData, error: metricsError } = await supabaseClient
      .from('metrics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    if (metricsError) throw metricsError

    const response = {
      riskScore: metricsData?.metric_value || 0,
      activeUsers: metricsData?.active_users || 0,
      alertCount: 0, // TODO: Implement alert count
      apiCalls: 0, // TODO: Implement API call count
      accuracy: 0.95, // TODO: Implement accuracy calculation
      falsePositiveRate: 0.05, // TODO: Implement false positive rate calculation
      avgProcessingTime: metricsData?.avg_processing_time || 35,
      concurrentCalls: metricsData?.concurrent_calls || 0
    }

    console.log('Metrics endpoint response:', response)

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error in metrics endpoint:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})