/**
 * API Service Module
 * Handles all API communication and provides type-safe interfaces for API responses.
 * Includes error handling, authentication, and response interceptors.
 */
import axios, { AxiosError } from "axios";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

// Type definitions for API responses
export interface APIError {
  detail: string;
  status_code: number;
}

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

// Initialize axios instance with default configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// Authentication request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fraud_api_key");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response and error handling interceptor
api.interceptors.response.use(
  (response) => {
    // Log API processing time if available
    const processingTime = response.headers["x-process-time"];
    if (processingTime) {
      console.log(`API call processed in ${processingTime}ms`);
    }
    return response;
  },
  (error: AxiosError<APIError>) => {
    if (error.response) {
      const errorDetail = error.response.data.detail;
      
      // Handle different error scenarios
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("fraud_api_key");
          window.location.href = "/login";
          break;
        case 422:
          console.error("Validation Error:", errorDetail);
          break;
        case 429:
          console.error("Rate limit exceeded:", errorDetail);
          break;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Validates an API key against the server
 * @param apiKey - The API key to validate
 * @returns Promise<boolean> - Whether the key is valid
 */
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await api.post('/validate-key', { apiKey });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

/**
 * Fetches fraud metrics from the server
 * @returns Promise<FraudMetrics> - Current fraud metrics
 */
export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  const response = await api.get('/metrics');
  return response.data;
};

/**
 * Fetches recent activity data
 * @returns Promise<Activity[]> - List of recent activities
 */
export const getRecentActivity = async (): Promise<Activity[]> => {
  const response = await api.get('/activity');
  return response.data;
};

export * from './apiKeys';