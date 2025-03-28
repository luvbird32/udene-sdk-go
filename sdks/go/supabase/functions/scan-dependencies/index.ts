import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
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

    // Simulate scanning package.json
    const mockVulnerabilities = [
      {
        package_name: 'example-package',
        current_version: '1.0.0',
        recommended_version: '1.1.0',
        severity: 'high',
        description: 'Security vulnerability found',
        cve_id: 'CVE-2023-1234'
      }
    ]

    // Record scan results
    const { data: scanData, error: scanError } = await supabase
      .from('dependency_scans')
      .insert({
        total_dependencies: 100,
        vulnerabilities_found: mockVulnerabilities.length,
        scan_status: 'completed',
        scan_log: { details: 'Scan completed successfully' }
      })
      .select()
      .single()

    if (scanError) throw scanError

    // Record vulnerabilities
    const { error: vulnError } = await supabase
      .from('dependency_vulnerabilities')
      .insert(mockVulnerabilities)

    if (vulnError) throw vulnError

    // Notify webhooks if critical vulnerabilities found
    const criticalVulnerabilities = mockVulnerabilities.filter(v => v.severity === 'critical')
    if (criticalVulnerabilities.length > 0) {
      const { data: webhooks } = await supabase
        .from('security_webhooks')
        .select('*')
        .eq('enabled', true)
        .contains('notification_types', ['critical_vulnerability'])

      // Process webhook notifications
      if (webhooks) {
        for (const webhook of webhooks) {
          try {
            await fetch(webhook.url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Secret': webhook.secret_key
              },
              body: JSON.stringify({
                type: 'critical_vulnerability',
                data: criticalVulnerabilities
              })
            })
          } catch (error) {
            console.error(`Failed to notify webhook ${webhook.id}:`, error)
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, scan: scanData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})