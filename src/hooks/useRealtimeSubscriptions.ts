
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRealtimeSubscriptions = () => {
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up real-time fraud alerts subscription...");
    
    let fraudAlertsChannel;
    let transactionsChannel;
    let connectionAttempts = 0;
    const maxRetries = 3;

    const setupChannels = async () => {
      try {
        // Set up fraud alerts channel
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
              connectionAttempts = 0;
            } else if (status === 'CHANNEL_ERROR') {
              console.error('Error in fraud alerts channel');
              handleConnectionError('fraud alerts');
            }
          });

        // Set up transactions channel
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
              connectionAttempts = 0;
            } else if (status === 'CHANNEL_ERROR') {
              console.error('Error in transactions channel');
              handleConnectionError('transactions');
            }
          });
      } catch (error) {
        console.error('Error setting up subscriptions:', error);
        handleConnectionError('subscription services');
      }
    };

    const handleConnectionError = (service: string) => {
      connectionAttempts++;
      if (connectionAttempts <= maxRetries) {
        toast({
          title: "Connection Error",
          description: `Unable to connect to ${service} service. Retrying... (Attempt ${connectionAttempts}/${maxRetries})`,
          variant: "destructive",
        });
        setTimeout(setupChannels, 2000 * connectionAttempts);
      } else {
        toast({
          title: "Connection Failed",
          description: `Failed to connect to ${service} service after ${maxRetries} attempts. Please check your network connection.`,
          variant: "destructive",
        });
      }
    };

    setupChannels();

    return () => {
      console.log("Cleaning up subscriptions...");
      if (fraudAlertsChannel) supabase.removeChannel(fraudAlertsChannel);
      if (transactionsChannel) supabase.removeChannel(transactionsChannel);
    };
  }, [toast]);
};

