import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const AuditLogger = () => {
  useEffect(() => {
    const channel = supabase
      .channel('detailed_audit')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events
          schema: 'public',
          table: 'fraud_alerts'
        },
        async (payload) => {
          // Create detailed audit log entry
          await supabase.from('audit_logs').insert({
            event_type: `fraud_alert_${payload.eventType}`,
            entity_type: 'fraud_alert',
            entity_id: payload.new?.id || payload.old?.id,
            changes: {
              previous_state: payload.old,
              new_state: payload.new,
              change_type: payload.eventType
            },
            performance_metrics: {
              processing_time: Date.now(),
              system_load: await getSystemMetrics(),
              event_context: {
                table: 'fraud_alerts',
                operation: payload.eventType,
                timestamp: new Date().toISOString()
              }
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getSystemMetrics = async () => {
    const { data } = await supabase
      .from('metrics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    return data || {};
  };

  return null; // This is a background component
};