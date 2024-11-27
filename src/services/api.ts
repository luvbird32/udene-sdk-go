import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Type definitions
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
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const validateApiKey = async (apiKey: string) => {
  const response = await api.post('/api/v1/validate-key', { apiKey });
  return response.data.valid;
};

export const getApiKeys = async () => {
  const response = await api.get('/api/v1/api-keys');
  return response.data;
};

export const createApiKey = async ({ name }: { name: string }) => {
  const response = await api.post('/api/v1/api-keys', { name });
  return response.data;
};

export const deleteApiKey = async (id: string) => {
  await api.delete(`/api/v1/api-keys/${id}`);
};

export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  const response = await api.get('/api/v1/metrics');
  return response.data;
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  const response = await api.get('/api/v1/activity');
  return response.data;
};

export default api;