
/**
 * Activity Service Module
 * 
 * Handles fetching and caching of activity events from the system.
 * Implements local caching using IndexedDB for improved performance
 * and offline capabilities.
 */
import { getItem, setItem } from "@/utils/indexedDB";
import { supabase } from "@/integrations/supabase/client";

/**
 * Interface defining the structure of an activity event
 * @property {string} id - Unique identifier for the activity
 * @property {'suspicious' | 'normal'} type - Classification of the activity
 * @property {string} description - Detailed description of what occurred
 * @property {string} timestamp - When the activity took place
 */
export interface Activity {
  id: string;
  type: "suspicious" | "normal";
  description: string;
  timestamp: string;
}

/**
 * Retrieves recent activity events from the system
 * 
 * First checks IndexedDB cache for recent data. If not found or expired,
 * fetches from Supabase backend. Results are cached for 60 seconds.
 * 
 * @returns {Promise<Activity[]>} Array of recent activities, sorted by timestamp
 * @throws {Error} If there's an issue fetching the data
 */
export const getRecentActivity = async (): Promise<Activity[]> => {
  try {
    console.log("Fetching recent activity data...");
    
    // Check cache first
    const cachedActivity = await getItem('apiResponses', 'recentActivity');
    if (cachedActivity) {
      console.log("Returning cached activity data");
      return cachedActivity;
    }

    console.log("Cache miss - fetching from Supabase");
    const { data, error } = await supabase
      .from('fraud_alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error("Supabase query error:", error);
      throw error;
    }

    // Transform fraud alerts into activity objects
    const activity: Activity[] = (data || []).map(alert => ({
      id: alert.id,
      type: "suspicious",
      description: alert.description,
      timestamp: alert.created_at
    }));

    // Cache the results for 60 seconds
    await setItem('apiResponses', 'recentActivity', activity, Date.now() + 60 * 1000);
    console.log(`Cached ${activity.length} activity records`);

    return activity;
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }
};
