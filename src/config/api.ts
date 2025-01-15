export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://udene.net/v1'
    : 'http://localhost:8080/v1',
  ENDPOINTS: {
    METRICS: '/metrics',
    ACTIVITY: '/activity',
    TRACK: '/track'
  },
  getUrl: (endpoint: keyof typeof API_CONFIG.ENDPOINTS) => {
    const path = API_CONFIG.ENDPOINTS[endpoint];
    return `${API_CONFIG.BASE_URL}${path}`;
  }
} as const;

export type ApiEndpoint = keyof typeof API_CONFIG.ENDPOINTS;