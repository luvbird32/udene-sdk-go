import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.example.com/v1";

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