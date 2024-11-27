import { api } from './api';

export interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
  name: string;
}

export interface CreateApiKeyRequest {
  name: string;
}

export const getApiKeys = async (): Promise<ApiKey[]> => {
  try {
    const response = await api.get('/api-keys');
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      // Return mock data in development
      return [
        {
          id: '1',
          key: 'fraud_' + '1'.repeat(32),
          createdAt: new Date().toISOString(),
          name: 'Development Key'
        }
      ];
    }
    throw error;
  }
};

export const createApiKey = async (request: CreateApiKeyRequest): Promise<ApiKey> => {
  try {
    const response = await api.post('/api-keys', request);
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      // Return mock data in development
      return {
        id: Math.random().toString(),
        key: 'fraud_' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')
          .slice(0, 32),
        createdAt: new Date().toISOString(),
        name: request.name
      };
    }
    throw error;
  }
};

export const deleteApiKey = async (id: string): Promise<void> => {
  await api.delete(`/api-keys/${id}`);
};