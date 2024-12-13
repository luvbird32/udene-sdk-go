export const API_CONFIG = {
  BASE_URL: 'https://udene.net/v1',
  ENDPOINTS: {
    METRICS: '/metrics',
    ACTIVITY: '/activity', 
    TRACK: '/track'
  }
} as const;

export type ApiEndpoint = keyof typeof API_CONFIG.ENDPOINTS;