import { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRealtimeSubscriptions = () => {
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up real-time fraud alerts subscription...");
    const fraudAlertsChannel = supabase
      .channel('fraud_alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'fraud_alerts'
        },
        async (payload) => {
          console.log("New fraud alert received:", payload);
          
          try {
            await supabase.functions.invoke('webhook-delivery', {
              body: {
                event_type: 'fraud.detected',
                payload: {
                  alert_id: payload.new.id,
                  transaction_id: payload.new.transaction_id,
                  alert_type: payload.new.alert_type,
                  severity: payload.new.severity,
                  description: payload.new.description
                }
              }
            });
          } catch (error) {
            console.error('Failed to deliver webhook:', error);
          }

          toast({
            title: "New Fraud Alert",
            description: payload.new.description,
            variant: "destructive",
          });
        }
      )
      .subscribe();

    const transactionsChannel = supabase
      .channel('transactions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions'
        },
        async (payload) => {
          console.log("New transaction received:", payload);
          
          try {
            await supabase.functions.invoke('webhook-delivery', {
              body: {
                event_type: 'transaction.created',
                payload: {
                  transaction_id: payload.new.id,
                  amount: payload.new.amount,
                  merchant_id: payload.new.merchant_id,
                  customer_id: payload.new.customer_id,
                  timestamp: payload.new.timestamp,
                  risk_score: payload.new.risk_score
                }
              }
            });
          } catch (error) {
            console.error('Failed to deliver webhook:', error);
          }
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up subscriptions...");
      supabase.removeChannel(fraudAlertsChannel);
      supabase.removeChannel(transactionsChannel);
    };
  }, [toast]);
};