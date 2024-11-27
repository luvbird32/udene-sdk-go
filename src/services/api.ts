import axios from 'axios';

const API_URL = 'https://api.udene.com/v1';

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

export interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
  name: string;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await api.post('/validate-key', { apiKey });
    return response.data.valid;
  } catch (error) {
    console.error('API key validation error:', error);
    return false;
  }
};

export const getApiKeys = async (): Promise<ApiKey[]> => {
  const response = await api.get('/api-keys');
  return response.data;
};

export const createApiKey = async (data: { name: string }): Promise<ApiKey> => {
  const response = await api.post('/api-keys', data);
  return response.data;
};

export const deleteApiKey = async (id: string): Promise<void> => {
  await api.delete(`/api-keys/${id}`);
};

export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  const response = await api.get('/api/v1/metrics');
  return response.data;
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  const response = await api.get('/api/v1/activity');
  return response.data;
};
