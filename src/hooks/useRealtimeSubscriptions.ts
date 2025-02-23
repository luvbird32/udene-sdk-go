
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRealtimeSubscriptions = () => {
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up real-time notifications subscription...");
    
    let notificationsChannel;
    let connectionAttempts = 0;
    const maxRetries = 3;

    const setupChannel = async () => {
      try {
        // Subscribe to user notifications
        notificationsChannel = supabase
          .channel('user_notifications')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'user_notifications',
              filter: `user_id=eq.${(await supabase.auth.getUser()).data.user?.id}`
            },
            (payload) => {
              console.log("New notification received:", payload);
              toast({
                title: payload.new.title,
                description: payload.new.message,
                variant: payload.new.type === 'fraud_alert' || payload.new.type === 'high_risk_transaction' 
                  ? "destructive" 
                  : "default",
              });
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              console.log('Successfully subscribed to notifications');
              connectionAttempts = 0;
            } else if (status === 'CHANNEL_ERROR') {
              console.error('Error in notifications channel');
              handleConnectionError('notifications');
            }
          });
      } catch (error) {
        console.error('Error setting up subscription:', error);
        handleConnectionError('notification service');
      }
    };

    const handleConnectionError = (service: string) => {
      connectionAttempts++;
      if (connectionAttempts <= maxRetries) {
        toast({
          title: "Connection Error",
          description: `Unable to connect to ${service}. Retrying... (Attempt ${connectionAttempts}/${maxRetries})`,
          variant: "destructive",
        });
        setTimeout(setupChannel, 2000 * connectionAttempts);
      } else {
        toast({
          title: "Connection Failed",
          description: `Failed to connect to ${service} after ${maxRetries} attempts. Please check your network connection.`,
          variant: "destructive",
        });
      }
    };

    setupChannel();

    return () => {
      console.log("Cleaning up notification subscription...");
      if (notificationsChannel) supabase.removeChannel(notificationsChannel);
    };
  }, [toast]);
};
