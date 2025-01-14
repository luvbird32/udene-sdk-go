export const API_CONFIG = {
  BASE_URL: 'https://udene.net/v1',
  ENDPOINTS: {
    METRICS: '/metrics',
    ACTIVITY: '/activity',
    TRACK: '/track'
  },
  // Add proper URL validation
  getUrl: (endpoint: keyof typeof API_CONFIG.ENDPOINTS) => {
    const path = API_CONFIG.ENDPOINTS[endpoint];
    return `${API_CONFIG.BASE_URL}${path}`;
  }
} as const;

export type ApiEndpoint = keyof typeof API_CONFIG.ENDPOINTS;