import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type AIActivityMonitoring = Tables<'ai_activity_monitoring'>;

export interface ShadowAIDetectionData {
  content: string;
  toolSignature?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export const detectShadowAI = async (
  userId: string,
  activityData: ShadowAIDetectionData
) => {
  try {
    const { data, error } = await supabase.functions.invoke('detect-shadow-ai', {
      body: {
        userId,
        activityData
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in shadow AI detection:', error);
    throw error;
  }
};

export const getAIActivities = async (userId: string): Promise<AIActivityMonitoring[]> => {
  try {
    const { data, error } = await supabase
      .from('ai_activity_monitoring')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching AI activities:', error);
    throw error;
  }
};

export const getAIRiskMetrics = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('ai_activity_monitoring')
      .select('risk_score')
      .eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    const riskScores = data.map(d => d.risk_score || 0);
    return {
      averageRisk: riskScores.reduce((a, b) => a + b, 0) / riskScores.length || 0,
      highRiskCount: riskScores.filter(score => score > 70).length,
      totalActivities: riskScores.length
    };
  } catch (error) {
    console.error('Error fetching AI risk metrics:', error);
    throw error;
  }
};