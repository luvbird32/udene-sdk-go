
/**
 * API Configuration Module
 * 
 * Centralizes API configuration including:
 * - Base URL management for different environments
 * - Endpoint path definitions
 * - URL formatting utilities
 * 
 * The configuration automatically switches between production
 * and development URLs based on the environment.
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://udene.net/v1'
    : 'http://localhost:8080/v1',
  ENDPOINTS: {
    /**
     * Endpoint for retrieving fraud detection metrics and analytics
     * Response includes risk scores, transaction counts, and system health
     */
    METRICS: '/metrics',

    /**
     * Endpoint for fetching recent fraud detection activity and alerts
     * Returns chronological list of suspicious activities and system events
     */
    ACTIVITY: '/activity',

    /**
     * Endpoint for tracking and analyzing user interactions
     * Accepts POST requests with interaction data for real-time analysis
     */
    TRACK: '/track'
  },

  /**
   * Utility function to construct complete API URLs
   * 
   * @param {keyof typeof API_CONFIG.ENDPOINTS} endpoint - The API endpoint key
   * @returns {string} Complete URL with base path and endpoint
   */
  getUrl: (endpoint: keyof typeof API_CONFIG.ENDPOINTS) => {
    const path = API_CONFIG.ENDPOINTS[endpoint];
    // Remove any trailing slashes and ensure proper URL formatting
    const baseUrl = API_CONFIG.BASE_URL.replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    return `${baseUrl}/${cleanPath}`;
  }
} as const;

export type ApiEndpoint = keyof typeof API_CONFIG.ENDPOINTS;
