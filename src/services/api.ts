import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export interface FraudMetrics {
  riskScore: number;
  activeUsers: number;
  alertCount: number;
  apiCalls: number;
}

export interface Activity {
  id: string;
  type: "suspicious" | "normal";
  description: string;
  timestamp: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      // If API is not available, return mock data for demo purposes
      if (error.config.url.includes('/metrics')) {
        return {
          data: {
            riskScore: Math.random() * 100,
            activeUsers: Math.floor(Math.random() * 1000),
            alertCount: Math.floor(Math.random() * 10),
            apiCalls: Math.floor(Math.random() * 10000)
          }
        };
      }
      if (error.config.url.includes('/activity')) {
        return {
          data: Array.from({ length: 5 }, (_, i) => ({
            id: `mock-${i}`,
            type: Math.random() > 0.5 ? "suspicious" : "normal",
            description: `Mock activity ${i + 1}`,
            timestamp: new Date(Date.now() - i * 1000 * 60).toISOString()
          }))
        };
      }
    }
    return Promise.reject(error);
  }
);

export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  const response = await api.get("/metrics");
  return response.data;
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  const response = await api.get("/activity");
  return response.data;
};

export const trackInteraction = async (data: Record<string, unknown>) => {
  await api.post("/track", data);
};