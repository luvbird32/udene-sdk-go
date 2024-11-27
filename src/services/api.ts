import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.udene.com/v1';

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
  // Add timeout and better error handling
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 500,
});

// Add request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
);

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
  try {
    const response = await api.get('/api-keys');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to load API keys');
    }
    throw error;
  }
};

export const createApiKey = async (data: { name: string }): Promise<ApiKey> => {
  try {
    const response = await api.post('/api-keys', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create API key');
    }
    throw error;
  }
};

export const deleteApiKey = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api-keys/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete API key');
    }
    throw error;
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