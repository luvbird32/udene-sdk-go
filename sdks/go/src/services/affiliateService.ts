import { supabase } from "@/integrations/supabase/client";
import type { AffiliateActivity } from "@/integrations/supabase/types/affiliate";

export const createAffiliateActivity = async (activityData: Partial<Omit<AffiliateActivity, 'affiliate_id'>> & { affiliate_id: string }) => {
  try {
    // First create the activity record
    const { data: activity, error: createError } = await supabase
      .from('affiliate_activities')
      .insert({
        ...activityData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) throw createError;

    // Then analyze it for fraud
    const { data: fraudAnalysis, error: fraudError } = await supabase.functions
      .invoke('detect-affiliate-fraud', {
        body: { activity }
      });

    if (fraudError) throw fraudError;

    return {
      activity,
      fraudAnalysis
    };
  } catch (error) {
    console.error('Error in affiliate activity creation:', error);
    throw error;
  }
};

export const getAffiliateActivities = async (affiliateId: string) => {
  try {
    const { data, error } = await supabase
      .from('affiliate_activities')
      .select('*')
      .eq('affiliate_id', affiliateId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching affiliate activities:', error);
    throw error;
  }
};

export const getAffiliateMetrics = async (affiliateId: string) => {
  try {
    const { data: activities, error } = await supabase
      .from('affiliate_activities')
      .select('risk_score, status, commission_amount')
      .eq('affiliate_id', affiliateId);

    if (error) throw error;

    const totalActivities = activities?.length || 0;
    const flaggedActivities = activities?.filter(a => a.status === 'flagged').length || 0;
    const totalCommission = activities?.reduce((sum, a) => sum + (a.commission_amount || 0), 0) || 0;
    const avgRiskScore = activities?.reduce((sum, a) => sum + (a.risk_score || 0), 0) / totalActivities || 0;

    return {
      totalActivities,
      flaggedActivities,
      flaggedPercentage: (flaggedActivities / totalActivities) * 100,
      totalCommission,
      avgRiskScore
    };
  } catch (error) {
    console.error('Error fetching affiliate metrics:', error);
    throw error;
  }
};