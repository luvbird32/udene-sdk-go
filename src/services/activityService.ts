import { getItem, setItem } from "@/utils/indexedDB";
import { supabase } from "@/integrations/supabase/client";

export interface Activity {
  id: string;
  type: "suspicious" | "normal";
  description: string;
  timestamp: string;
}

export const getRecentActivity = async (): Promise<Activity[]> => {
  try {
    const cachedActivity = await getItem('apiResponses', 'recentActivity');
    if (cachedActivity) {
      return cachedActivity;
    }

    const { data, error } = await supabase
      .from('fraud_alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    const activity: Activity[] = (data || []).map(alert => ({
      id: alert.id,
      type: "suspicious",
      description: alert.description,
      timestamp: alert.created_at
    }));

    await setItem('apiResponses', 'recentActivity', activity, Date.now() + 60 * 1000);

    return activity;
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }
};