import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

interface BehaviorPattern {
  patternType: string;
  confidence: number;
  indicators: Record<string, unknown>;
  timestamp: string;
}

interface ActivityMetadata {
  confidence: number;
  indicators: Record<string, unknown>;
}

export const getBehaviorPatterns = async (userId: string): Promise<BehaviorPattern[]> => {
  const { data: patterns, error } = await supabase
    .from('user_activities')
    .select('activity_type, metadata, created_at')
    .eq('profile_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;

  return (patterns || []).map(pattern => {
    const metadata = pattern.metadata as unknown as ActivityMetadata;
    return {
      patternType: pattern.activity_type,
      confidence: metadata?.confidence || 0,
      indicators: metadata?.indicators || {},
      timestamp: pattern.created_at
    };
  });
};

export const logUserActivity = async (
  userId: string, 
  activityType: string, 
  metadata: ActivityMetadata
) => {
  const { data, error } = await supabase
    .from('user_activities')
    .insert({
      profile_id: userId,
      activity_type: activityType,
      metadata: metadata as unknown as Json
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};