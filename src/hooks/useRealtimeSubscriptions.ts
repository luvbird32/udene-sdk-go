

import { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRealtimeSubscriptions = () => {
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up real-time fraud alerts subscription...");
    
    let fraudAlertsChannel;
    let transactionsChannel;

    try {
      fraudAlertsChannel = supabase
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

              // Check user notification preferences before showing toast
              const { data: { user } } = await supabase.auth.getUser();
              if (user) {
                const { data: preferences } = await supabase
                  .from('profiles')
                  .select('settings')
                  .eq('id', user.id)
                  .single();

                const notificationPrefs = preferences?.settings?.notification_preferences;
                const currentHour = new Date().getHours();
                const quietHoursEnabled = notificationPrefs?.quiet_hours?.enabled;
                const quietStart = parseInt(notificationPrefs?.quiet_hours?.start?.split(':')[0] || '0');
                const quietEnd = parseInt(notificationPrefs?.quiet_hours?.end?.split(':')[0] || '0');
                
                const isQuietHours = quietHoursEnabled && 
                  ((quietStart <= quietEnd && currentHour >= quietStart && currentHour < quietEnd) ||
                   (quietStart > quietEnd && (currentHour >= quietStart || currentHour < quietEnd)));

                const shouldNotify = 
                  notificationPrefs?.severity_levels?.[payload.new.severity] &&
                  notificationPrefs?.categories?.fraud &&
                  !isQuietHours;

                if (shouldNotify) {
                  toast({
                    title: "New Fraud Alert",
                    description: payload.new.description,
                    variant: "destructive",
                  });
                }
              }
            } catch (error) {
              console.error('Failed to deliver webhook:', error);
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to fraud alerts');
          } else if (status === 'CHANNEL_ERROR') {
            console.error('Error in fraud alerts channel');
            toast({
              title: "Connection Error",
              description: "Unable to connect to fraud alerts service",
              variant: "destructive",
            });
          }
        });

      transactionsChannel = supabase
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

              // Check notification preferences for transactions
              const { data: { user } } = await supabase.auth.getUser();
              if (user && payload.new.risk_score > 0.7) { // High-risk transactions
                const { data: preferences } = await supabase
                  .from('profiles')
                  .select('settings')
                  .eq('id', user.id)
                  .single();

                const notificationPrefs = preferences?.settings?.notification_preferences;
                if (notificationPrefs?.categories?.security && notificationPrefs?.severity_levels?.high) {
                  toast({
                    title: "High Risk Transaction Detected",
                    description: `Transaction ${payload.new.id} has a high risk score of ${payload.new.risk_score}`,
                    variant: "destructive",
                  });
                }
              }
            } catch (error) {
              console.error('Failed to deliver webhook:', error);
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to transactions');
          } else if (status === 'CHANNEL_ERROR') {
            console.error('Error in transactions channel');
            toast({
              title: "Connection Error",
              description: "Unable to connect to transactions service",
              variant: "destructive",
            });
          }
        });
    } catch (error) {
      console.error('Error setting up subscriptions:', error);
      toast({
        title: "Connection Error",
        description: "Unable to set up real-time monitoring",
        variant: "destructive",
      });
    }

    return () => {
      console.log("Cleaning up subscriptions...");
      if (fraudAlertsChannel) supabase.removeChannel(fraudAlertsChannel);
      if (transactionsChannel) supabase.removeChannel(transactionsChannel);
    };
  }, [toast]);
};
