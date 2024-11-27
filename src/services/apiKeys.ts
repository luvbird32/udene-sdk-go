import { api } from './api';
import type { ApiKey } from './api';

export const getApiKeys = async (): Promise<ApiKey[]> => {
  const response = await api.get('/api-keys');
  return response.data;
};

export const createApiKey = async (name: string): Promise<ApiKey> => {
  const response = await api.post('/api-keys', { name });
  return response.data;
};

export const deleteApiKey = async (id: string): Promise<void> => {
  await api.delete(`/api-keys/${id}`);
};