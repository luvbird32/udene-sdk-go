import { api } from './api';

export interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
  name: string;
}

export const getApiKeys = async (): Promise<ApiKey[]> => {
  const response = await api.get('/api/v1/api-keys');
  return response.data;
};

export const createApiKey = async (name: string): Promise<ApiKey> => {
  const response = await api.post('/api/v1/api-keys', { name });
  return response.data;
};

export const deleteApiKey = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/api-keys/${id}`);
};