import { useEffect, useState } from 'react';
import { botDetectionService } from '@/utils/botDetection';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useBotDetection = () => {
  const [isBotDetected, setIsBotDetected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    botDetectionService.attachEventListeners();

    const checkInterval = setInterval(async () => {
      const indicators = botDetectionService.analyze();
      
      // If multiple indicators are true, likely a bot
      const suspiciousCount = Object.values(indicators).filter(Boolean).length;
      const isLikelyBot = suspiciousCount >= 3;

      if (isLikelyBot && !isBotDetected) {
        setIsBotDetected(true);
        
        // Log the bot detection
        await supabase.from('audit_logs').insert({
          event_type: 'bot_detected',
          entity_type: 'user_session',
          entity_id: 'session',
          changes: indicators
        });

        toast({
          title: "Suspicious Activity Detected",
          description: "Unusual patterns have been detected. This may affect your access.",
          variant: "destructive"
        });
      }
    }, 5000);

    return () => {
      clearInterval(checkInterval);
      botDetectionService.detachEventListeners();
    };
  }, [isBotDetected, toast]);

  return { isBotDetected };
};