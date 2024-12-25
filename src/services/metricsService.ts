import { getItem, setItem } from "@/utils/indexedDB";
import { supabase, handleSupabaseError } from "@/integrations/supabase/client";

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

export const getFraudMetrics = async (): Promise<UdeneMetrics> => {
  try {
    // Try to get cached metrics first
    const cachedMetrics = await getItem('apiResponses', 'fraudMetrics');
    if (cachedMetrics) {
      return cachedMetrics;
    }

    // If no cache, fetch from API with retry logic
    const fetchWithRetry = async (retries = 3): Promise<UdeneMetrics> => {
      try {
        const { data: recentTransactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('risk_score, is_fraudulent')
          .order('created_at', { ascending: false })
          .limit(1000);

        if (transactionsError) {
          throw transactionsError;
        }

        // Calculate metrics
        const avgRiskScore = recentTransactions?.reduce((acc, t) => acc + (t.risk_score || 0), 0) / 
          (recentTransactions?.length || 1);

        const transactionsWithStatus = recentTransactions?.filter(t => t.is_fraudulent !== null) || [];
        const correctPredictions = transactionsWithStatus.filter(t => 
          (t.risk_score >= 70 && t.is_fraudulent) || 
          (t.risk_score < 70 && !t.is_fraudulent)
        ).length;
        
        const accuracy = transactionsWithStatus.length > 0 
          ? (correctPredictions / transactionsWithStatus.length) * 100 
          : 95;

        const { count: alertCount, error: alertError } = await supabase
          .from('fraud_alerts')
          .select('*', { count: 'exact', head: true });

        if (alertError) {
          throw alertError;
        }

        const metrics = {
          riskScore: Math.round(avgRiskScore || 0),
          activeUsers: 0,
          alertCount: alertCount || 0,
          apiCalls: recentTransactions?.length || 0,
          accuracy,
          falsePositiveRate: 100 - accuracy,
          avgProcessingTime: 35,
          concurrentCalls: 0
        };

        // Cache the metrics
        await setItem('apiResponses', 'fraudMetrics', metrics, Date.now() + 5 * 60 * 1000);

        return metrics;
      } catch (error) {
        if (retries > 0) {
          await handleSupabaseError(error);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return fetchWithRetry(retries - 1);
        }
        throw error;
      }
    };

    return await fetchWithRetry();
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return {
      riskScore: 0,
      activeUsers: 0,
      alertCount: 0,
      apiCalls: 0,
      accuracy: 0,
      falsePositiveRate: 0,
      avgProcessingTime: 0,
      concurrentCalls: 0
    };
  }
};