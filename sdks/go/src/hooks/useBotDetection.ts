import { useEffect, useState } from 'react';
import { botDetectionService } from '@/utils/botDetection';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { BotIndicators } from '@/types/bot-detection';

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
        
        // Convert BotIndicators to a Record<string, boolean> for JSON compatibility
        const indicatorsRecord: Record<string, boolean> = {
          ...indicators
        };
        
        // Log the bot detection
        await supabase.from('audit_logs').insert({
          event_type: 'bot_detected',
          entity_type: 'user_session',
          entity_id: 'session',
          changes: indicatorsRecord
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