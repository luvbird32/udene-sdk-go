import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from './useCurrentUser';
import { useBotDetection } from './useBotDetection';
import { useInteractionTracking } from './useInteractionTracking';

interface AIActivityPattern {
  timestamp: number;
  type: string;
  data: Record<string, any>;
}

export const useAIActivityMonitoring = () => {
  const patterns = useRef<AIActivityPattern[]>([]);
  const { data: currentUser } = useCurrentUser();
  const { isBotDetected } = useBotDetection();
  const isTracking = useRef(false);

  // Track timing patterns that might indicate AI automation
  const trackTimingPattern = (event: KeyboardEvent | MouseEvent) => {
    patterns.current.push({
      timestamp: event.timeStamp,
      type: event.type,
      data: {
        target: (event.target as HTMLElement)?.tagName,
        key: event instanceof KeyboardEvent ? event.key : null,
      }
    });

    if (patterns.current.length > 100) {
      patterns.current.shift();
    }

    analyzePatterns();
  };

  const analyzePatterns = async () => {
    if (!currentUser?.id || patterns.current.length < 10) return;

    const timingAnalysis = analyzeTimingPatterns();
    const interactionAnalysis = analyzeInteractionPatterns();
    const riskScore = calculateRiskScore(timingAnalysis, interactionAnalysis);

    if (riskScore > 70) {
      await logAIActivity({
        userId: currentUser.id,
        activityType: 'suspicious_pattern',
        riskScore,
        patterns: {
          timing: timingAnalysis,
          interaction: interactionAnalysis
        }
      });
    }
  };

  const analyzeTimingPatterns = () => {
    const intervals = [];
    for (let i = 1; i < patterns.current.length; i++) {
      intervals.push(patterns.current[i].timestamp - patterns.current[i-1].timestamp);
    }

    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);

    return {
      meanInterval: mean,
      stdDev,
      isConsistent: stdDev < 50, // Suspiciously consistent timing
      isTooFast: mean < 20 // Suspiciously fast interactions
    };
  };

  const analyzeInteractionPatterns = () => {
    const keyboardPatterns = patterns.current.filter(p => p.type.startsWith('key'));
    const mousePatterns = patterns.current.filter(p => p.type.startsWith('mouse'));

    return {
      keyboardRatio: keyboardPatterns.length / patterns.current.length,
      mouseRatio: mousePatterns.length / patterns.current.length,
      isNaturalMix: Math.abs(keyboardPatterns.length - mousePatterns.length) < 10
    };
  };

  const calculateRiskScore = (
    timing: ReturnType<typeof analyzeTimingPatterns>,
    interaction: ReturnType<typeof analyzeInteractionPatterns>
  ) => {
    let score = 0;
    
    if (timing.isConsistent) score += 30;
    if (timing.isTooFast) score += 30;
    if (!interaction.isNaturalMix) score += 20;
    if (isBotDetected) score += 20;

    return Math.min(score, 100);
  };

  const logAIActivity = async ({
    userId,
    activityType,
    riskScore,
    patterns
  }: {
    userId: string;
    activityType: string;
    riskScore: number;
    patterns: Record<string, any>;
  }) => {
    try {
      await supabase.from('ai_activity_monitoring').insert({
        user_id: userId,
        activity_type: activityType,
        risk_score: riskScore,
        detection_patterns: patterns,
        metadata: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language
        },
        ip_address: null, // Will be captured by RLS
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log AI activity:', error);
    }
  };

  useEffect(() => {
    if (isTracking.current || !currentUser?.id) return;
    isTracking.current = true;

    document.addEventListener('keydown', trackTimingPattern);
    document.addEventListener('mousemove', trackTimingPattern);
    document.addEventListener('click', trackTimingPattern);

    return () => {
      document.removeEventListener('keydown', trackTimingPattern);
      document.removeEventListener('mousemove', trackTimingPattern);
      document.removeEventListener('click', trackTimingPattern);
      isTracking.current = false;
    };
  }, [currentUser?.id]);

  return {
    isMonitoring: isTracking.current,
    currentPatterns: patterns.current
  };
};