import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

export const useSessionTimeout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let lastActivity = Date.now();
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      lastActivity = Date.now();
    };

    const checkTimeout = async () => {
      const now = Date.now();
      if (now - lastActivity >= SESSION_TIMEOUT) {
        // Session expired
        await supabase.auth.signOut();
        navigate('/login');
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
      }
    };

    // Set up activity listeners
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    // Check session every minute
    timeoutId = setInterval(checkTimeout, 60000);

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
      clearInterval(timeoutId);
    };
  }, [navigate, toast]);
};