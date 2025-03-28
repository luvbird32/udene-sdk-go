import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const AutomatedResponse = () => {
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('threat_response')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'fraud_alerts'
        },
        async (payload) => {
          if (payload.new.severity === 'high') {
            // Log automated response action
            await supabase.from('audit_logs').insert({
              event_type: 'automated_response',
              entity_type: 'fraud_alert',
              entity_id: payload.new.id,
              changes: {
                response_type: 'automated_block',
                trigger: payload.new.alert_type,
                action_taken: new Date().toISOString()
              }
            });

            // Add IP to blocklist if present
            if (payload.new.ip_address) {
              await supabase.from('ip_allowlist').insert({
                ip_address: payload.new.ip_address,
                description: `Automatically blocked due to high-severity alert: ${payload.new.alert_type}`,
                is_blocked: true
              });

              toast({
                title: "Automated Response",
                description: `IP ${payload.new.ip_address} has been automatically blocked`,
                variant: "default",
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return null; // This is a background component
};