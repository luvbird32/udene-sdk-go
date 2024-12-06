import { supabase } from "@/integrations/supabase/client";

export interface FraudMetrics {
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

export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  try {
    // Get recent transactions for risk calculation
    const { data: recentTransactions } = await supabase
      .from('transactions')
      .select('risk_score, is_fraudulent')
      .order('created_at', { ascending: false })
      .limit(1000);

    // Get active users (transactions in last hour)
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: activeUsers } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', hourAgo);

    // Calculate average risk score
    const avgRiskScore = recentTransactions?.reduce((acc, t) => acc + (t.risk_score || 0), 0) / 
      (recentTransactions?.length || 1);

    // Calculate accuracy from transactions with known fraud status
    const transactionsWithStatus = recentTransactions?.filter(t => t.is_fraudulent !== null) || [];
    const correctPredictions = transactionsWithStatus.filter(t => 
      (t.risk_score >= 50 && t.is_fraudulent) || 
      (t.risk_score < 50 && !t.is_fraudulent)
    ).length;
    
    const accuracy = transactionsWithStatus.length > 0 
      ? (correctPredictions / transactionsWithStatus.length) * 100 
      : 95;

    // Get total number of alerts
    const { count: alertCount } = await supabase
      .from('fraud_alerts')
      .select('*', { count: 'exact', head: true });

    return {
      riskScore: Math.round(avgRiskScore || 0),
      activeUsers: activeUsers || 0,
      alertCount: alertCount || 0,
      apiCalls: recentTransactions?.length || 0,
      accuracy,
      falsePositiveRate: 100 - accuracy,
      avgProcessingTime: 35, // Default value since we don't track this yet
      concurrentCalls: activeUsers || 0
    };
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  try {
    const { data: alerts, error } = await supabase
      .from('fraud_alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    return (alerts || []).map(alert => ({
      id: alert.id,
      type: 'suspicious',
      description: alert.description,
      timestamp: alert.created_at
    }));
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }
};

export const trackInteraction = async (data: {
  userId: string;
  action: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}): Promise<void> => {
  await api.post("/track", data);
};

export const setApiKey = (apiKey: string): void => {
  localStorage.setItem("fraud_api_key", apiKey);
};

export const clearApiKey = (): void => {
  localStorage.removeItem("fraud_api_key");
};

export const validateApiKey = async (): Promise<boolean> => {
  try {
    await api.get("/validate");
    return true;
  } catch {
    return false;
  }
};
