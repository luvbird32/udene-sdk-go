import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export interface APIError {
  detail: string;
  status_code: number;
}

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
  type: string;
  description: string;
  timestamp: string;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    const processingTime = response.headers["x-process-time"];
    if (processingTime) {
      console.log(`API call processed in ${processingTime}ms`);
    }
    return response;
  },
  (error: AxiosError<APIError>) => {
    if (error.response) {
      const errorDetail = error.response.data.detail;
      
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("fraud_api_key");
          window.location.href = "/login";
          break;
        case 422:
          console.error("Validation Error:", errorDetail);
          break;
        case 429:
          console.error("Rate limit exceeded:", errorDetail);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await api.post('/validate-key', { apiKey });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  const response = await api.get('/metrics');
  return response.data;
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  const response = await api.get('/activity');
  return response.data;
};

export * from './apiKeys';