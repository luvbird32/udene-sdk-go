import { supabase } from "@/integrations/supabase/client";
import { getItem, setItem } from "@/utils/indexedDB";

export interface UdeneMetrics {
  riskScore: number;
  activeUsers: number;
  alertCount: number;
  apiCalls: number;
  accuracy: number;
  falsePositiveRate: number;
  avgProcessingTime: number;
  concurrentCalls: number;
}

export interface Activity {
  id: string;
  type: "suspicious" | "normal";
  description: string;
  timestamp: string;
}

export const getFraudMetrics = async (): Promise<UdeneMetrics> => {
  try {
    // Try to get cached metrics first
    const cachedMetrics = await getItem('apiResponses', 'fraudMetrics');
    if (cachedMetrics) {
      return cachedMetrics;
    }

    // If no cache, fetch from API
    const { data: recentTransactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('risk_score, is_fraudulent')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (transactionsError) throw transactionsError;

    // Get active users (transactions in last hour)
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: activeUsers, error: activeUsersError } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', hourAgo);

    if (activeUsersError) throw activeUsersError;

    // Calculate average risk score
    const avgRiskScore = recentTransactions?.reduce((acc, t) => acc + (t.risk_score || 0), 0) / 
      (recentTransactions?.length || 1);

    // Calculate accuracy from transactions with known fraud status
    const transactionsWithStatus = recentTransactions?.filter(t => t.is_fraudulent !== null) || [];
    const correctPredictions = transactionsWithStatus.filter(t => 
      (t.risk_score >= 70 && t.is_fraudulent) || 
      (t.risk_score < 70 && !t.is_fraudulent)
    ).length;
    
    const accuracy = transactionsWithStatus.length > 0 
      ? (correctPredictions / transactionsWithStatus.length) * 100 
      : 95;

    // Get total number of alerts
    const { count: alertCount, error: alertError } = await supabase
      .from('fraud_alerts')
      .select('*', { count: 'exact', head: true });

    if (alertError) throw alertError;

    const metrics = {
      riskScore: Math.round(avgRiskScore || 0),
      activeUsers: activeUsers || 0,
      alertCount: alertCount || 0,
      apiCalls: recentTransactions?.length || 0,
      accuracy,
      falsePositiveRate: 100 - accuracy,
      avgProcessingTime: 35,
      concurrentCalls: activeUsers || 0
    };

    // Cache the metrics for 5 minutes
    await setItem('apiResponses', 'fraudMetrics', metrics, Date.now() + 5 * 60 * 1000);

    return metrics;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  try {
    // Try to get cached activity first
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
      type: "suspicious" as const, // Explicitly set as "suspicious" since these are fraud alerts
      description: alert.description,
      timestamp: alert.created_at
    }));

    // Cache the activity for 1 minute
    await setItem('apiResponses', 'recentActivity', activity, Date.now() + 60 * 1000);

    return activity;
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  if (!apiKey?.trim()) {
    console.log('Empty API key provided');
    return false;
  }

  try {
    console.log("Checking Udene API key in database");
    const { data, error } = await supabase
      .from('api_keys')
      .select('status')
      .eq('key_value', apiKey)
      .single();

    if (error) {
      console.error('Udene API key validation error:', error);
      return false;
    }

    if (!data) {
      console.log('No Udene API key found');
      return false;
    }

    const isValid = data.status === 'active';
    console.log('Udene API key validation result:', isValid);
    return isValid;
  } catch (error) {
    console.error('Udene API key validation failed:', error);
    return false;
  }
};

export const setApiKey = (apiKey: string): void => {
  localStorage.setItem("udene_api_key", apiKey);
};

export const clearApiKey = (): void => {
  localStorage.removeItem("udene_api_key");
};
