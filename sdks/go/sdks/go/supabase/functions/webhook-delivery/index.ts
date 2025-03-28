import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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

    const { event_type, payload } = await req.json()
    console.log(`Processing webhook delivery for event: ${event_type}`)

    // Fetch active webhooks for this event type
    const { data: webhooks, error: webhookError } = await supabaseClient
      .from('webhooks')
      .select('*')
      .contains('events', [event_type])
      .eq('is_active', true)

    if (webhookError) throw webhookError

    // Deliver to each webhook endpoint
    const deliveryPromises = webhooks.map(async (webhook) => {
      try {
        console.log(`Delivering to webhook: ${webhook.url}`)
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': webhook.secret_key,
          },
          body: JSON.stringify({
            event_type,
            payload,
            timestamp: new Date().toISOString(),
          }),
        })

        // Record delivery attempt
        await supabaseClient
          .from('webhook_deliveries')
          .insert({
            webhook_id: webhook.id,
            event_type,
            payload,
            response_status: response.status,
            response_body: await response.text(),
          })

        // Update webhook stats
        await supabaseClient
          .from('webhooks')
          .update({
            last_triggered_at: new Date().toISOString(),
            failure_count: response.ok ? 0 : webhook.failure_count + 1,
          })
          .eq('id', webhook.id)

        console.log(`Delivery completed for webhook: ${webhook.url}`)
      } catch (error) {
        console.error(`Delivery failed for webhook: ${webhook.url}`, error)
        // Record failed delivery
        await supabaseClient
          .from('webhook_deliveries')
          .insert({
            webhook_id: webhook.id,
            event_type,
            payload,
            response_status: 500,
            response_body: error.message,
          })
      }
    })

    await Promise.all(deliveryPromises)

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error in webhook-delivery function:', error)
    
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