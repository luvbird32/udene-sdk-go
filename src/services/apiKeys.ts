import api from './api';

export const getApiKeys = async () => {
  const response = await api.get('/api/v1/api-keys');
  return response.data;
};

export const createApiKey = async (name: string) => {
  const response = await api.post('/api/v1/api-keys', { name });
  return response.data;
};

export const deleteApiKey = async (id: string) => {
  await api.delete(`/api/v1/api-keys/${id}`);
};