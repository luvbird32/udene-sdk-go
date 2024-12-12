import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ComplianceCheckRequest {
  reportId: string;
  checkType: string;
  parameters: Record<string, any>;
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

    // Parse request body
    const { reportId, checkType, parameters } = await req.json() as ComplianceCheckRequest

    console.log('Processing compliance check:', { reportId, checkType, parameters });

    // Fetch the compliance report
    const { data: report, error: reportError } = await supabaseClient
      .from('compliance_reports')
      .select('*')
      .eq('id', reportId)
      .single();

    if (reportError) throw reportError;

    // Perform compliance checks based on type
    let checkResults;
    switch (checkType) {
      case 'data_retention':
        checkResults = await checkDataRetention(supabaseClient, parameters);
        break;
      case 'access_control':
        checkResults = await checkAccessControl(supabaseClient, parameters);
        break;
      case 'privacy_compliance':
        checkResults = await checkPrivacyCompliance(supabaseClient, parameters);
        break;
      default:
        throw new Error(`Unsupported check type: ${checkType}`);
    }

    // Update the compliance report with check results
    const { error: updateError } = await supabaseClient
      .from('compliance_reports')
      .update({
        report_data: {
          ...report.report_data,
          [`${checkType}_results`]: checkResults,
          last_checked: new Date().toISOString(),
        },
        status: 'completed',
      })
      .eq('id', reportId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ success: true, results: checkResults }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing compliance check:', error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function checkDataRetention(supabaseClient: any, parameters: any) {
  // Implement data retention policy checks
  const { data, error } = await supabaseClient
    .from('transactions')
    .select('created_at')
    .lt('created_at', parameters.retentionLimit);

  if (error) throw error;

  return {
    oldRecordsCount: data.length,
    retentionLimit: parameters.retentionLimit,
    status: data.length > 0 ? 'action_required' : 'compliant',
  };
}

async function checkAccessControl(supabaseClient: any, parameters: any) {
  // Implement access control checks
  const { data: accessLogs, error } = await supabaseClient
    .from('audit_logs')
    .select('*')
    .eq('event_type', 'access')
    .gte('created_at', parameters.checkPeriod);

  if (error) throw error;

  return {
    totalAccesses: accessLogs.length,
    unauthorizedAttempts: accessLogs.filter((log: any) => log.status === 'unauthorized').length,
    checkPeriod: parameters.checkPeriod,
    status: 'completed',
  };
}

async function checkPrivacyCompliance(supabaseClient: any, parameters: any) {
  // Implement privacy compliance checks
  const { data: privacyRequests, error } = await supabaseClient
    .from('compliance_reports')
    .select('*')
    .eq('report_type', 'privacy_request')
    .gte('created_at', parameters.checkPeriod);

  if (error) throw error;

  return {
    totalRequests: privacyRequests.length,
    pendingRequests: privacyRequests.filter((req: any) => req.status === 'pending').length,
    averageResponseTime: calculateAverageResponseTime(privacyRequests),
    status: 'completed',
  };
}

function calculateAverageResponseTime(requests: any[]) {
  const completedRequests = requests.filter(req => req.status === 'completed');
  if (completedRequests.length === 0) return null;

  const totalTime = completedRequests.reduce((sum, req) => {
    const created = new Date(req.created_at).getTime();
    const updated = new Date(req.updated_at).getTime();
    return sum + (updated - created);
  }, 0);

  return totalTime / completedRequests.length;
}