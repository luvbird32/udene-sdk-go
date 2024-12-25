import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function createFraudAlert(
  supabase: ReturnType<typeof createClient>,
  transactionType: string,
  riskScore: number,
  details: any
) {
  if (riskScore > 70) {
    await supabase
      .from('fraud_alerts')
      .insert({
        alert_type: `${transactionType}_fraud`,
        severity: riskScore > 85 ? 'high' : 'medium',
        description: `High risk ${transactionType} activity detected. Score: ${riskScore}`,
        status: 'open'
      });
  }
}