import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const validateApiKey = async (apiKey: string) => {
  try {
    const response = await api.post('/api/v1/validate-key', { apiKey });
    return response.data.valid;
  } catch (error) {
    console.error('API Key validation failed:', error);
    return false;
  }
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

export const getMetrics = async () => {
  const response = await api.get('/api/v1/metrics');
  return response.data;
};

export const getActivity = async () => {
  const response = await api.get('/api/v1/activity');
  return response.data;
};

export default api;