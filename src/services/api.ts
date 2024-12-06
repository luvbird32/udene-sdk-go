import axios, { AxiosError } from "axios";
import { supabase } from "@/integrations/supabase/client";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

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

export interface APIError {
  detail: string;
  status_code: number;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // FastAPI default timeout
  timeout: 60000,
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fraud_api_key");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling and performance monitoring
api.interceptors.response.use(
  (response) => {
    // Track processing time from FastAPI response header
    const processingTime = response.headers["x-process-time"];
    if (processingTime) {
      console.log(`API call processed in ${processingTime}ms`);
    }
    return response;
  },
  (error: AxiosError<APIError>) => {
    if (error.response) {
      // FastAPI specific error handling
      const errorDetail = error.response.data.detail;
      
      switch (error.response.status) {
        case 401:
          // Handle unauthorized - clear token and redirect to login
          localStorage.removeItem("fraud_api_key");
          window.location.href = "/login";
          break;
        case 422:
          // Handle validation errors
          console.error("Validation Error:", errorDetail);
          break;
        case 429:
          // Handle rate limiting
          console.error("Rate limit exceeded:", errorDetail);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  try {
    const { data: metricsData, error: metricsError } = await supabase
      .from('metrics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (metricsError) throw metricsError;

    // Calculate aggregated metrics
    const recentMetrics = metricsData.reduce((acc, metric) => {
      if (metric.metric_name === 'average_risk_score') {
        acc.riskScore = Math.round(metric.metric_value);
      } else if (metric.metric_name === 'fraud_alerts') {
        acc.alertCount = (acc.alertCount || 0) + metric.metric_value;
      }
      return acc;
    }, {} as Partial<FraudMetrics>);

    // Get active users (transactions in last hour)
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: activeUsers } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', hourAgo);

    // Get API calls (transactions processed)
    const { count: apiCalls } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true });

    // Calculate accuracy from recent transactions
    const { data: recentTransactions } = await supabase
      .from('transactions')
      .select('is_fraudulent, risk_score')
      .order('timestamp', { ascending: false })
      .limit(1000);

    const accuracy = recentTransactions?.length 
      ? recentTransactions.filter(t => 
          (t.risk_score >= 50 && t.is_fraudulent) || 
          (t.risk_score < 50 && !t.is_fraudulent)
        ).length / recentTransactions.length * 100
      : 95;

    return {
      riskScore: recentMetrics.riskScore || 0,
      activeUsers: activeUsers || 0,
      alertCount: recentMetrics.alertCount || 0,
      apiCalls: apiCalls || 0,
      accuracy,
      falsePositiveRate: 100 - accuracy,
      avgProcessingTime: 35, // This would need actual timing data
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
      .select(`
        *,
        transactions (
          amount,
          merchant_id,
          customer_id
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    return alerts.map(alert => ({
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
