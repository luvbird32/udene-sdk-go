import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

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
  type: "suspicious" | "normal";
  description: string;
  timestamp: string;
}

export interface APIError {
  detail: string;
  status_code: number;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // FastAPI default timeout
  timeout: 60000,
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fraud_api_key");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling and performance monitoring
api.interceptors.response.use(
  (response) => {
    // Track processing time from FastAPI response header
    const processingTime = response.headers["x-process-time"];
    if (processingTime) {
      console.log(`API call processed in ${processingTime}ms`);
    }
    return response;
  },
  (error: AxiosError<APIError>) => {
    if (error.response) {
      // FastAPI specific error handling
      const errorDetail = error.response.data.detail;
      
      switch (error.response.status) {
        case 401:
          // Handle unauthorized - clear token and redirect to login
          localStorage.removeItem("fraud_api_key");
          window.location.href = "/login";
          break;
        case 422:
          // Handle validation errors
          console.error("Validation Error:", errorDetail);
          break;
        case 429:
          // Handle rate limiting
          console.error("Rate limit exceeded:", errorDetail);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "analyst";
  lastActive: string;
  status: "active" | "inactive";
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      // Return mock data in development
      return [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          lastActive: "2024-02-20T10:00:00",
          status: "active",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "analyst",
          lastActive: "2024-02-19T15:30:00",
          status: "active",
        },
      ];
    }
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: User["role"]): Promise<void> => {
  await api.put(`/users/${userId}/role`, { role });
};

export const updateUserStatus = async (userId: string, status: User["status"]): Promise<void> => {
  await api.put(`/users/${userId}/status`, { status });
};

export const getFraudMetrics = async (): Promise<FraudMetrics> => {
  try {
    const response = await api.get("/metrics");
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      // Return mock data in development if API is not available
      return {
        riskScore: Math.random() * 100,
        activeUsers: Math.floor(Math.random() * 1000),
        alertCount: Math.floor(Math.random() * 10),
        apiCalls: Math.floor(Math.random() * 10000),
        accuracy: 97.5,
        falsePositiveRate: 1.5,
        avgProcessingTime: 35,
        concurrentCalls: 12500
      };
    }
    throw error;
  }
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  try {
    const response = await api.get("/activity");
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      // Return mock data in development if API is not available
      return Array.from({ length: 5 }, (_, i) => ({
        id: `mock-${i}`,
        type: Math.random() > 0.5 ? "suspicious" : "normal",
        description: `Mock activity ${i + 1}`,
        timestamp: new Date(Date.now() - i * 1000 * 60).toISOString()
      }));
    }
    throw error;
  }
};

export const trackInteraction = async (data: {
  userId: string;
  action: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}): Promise<void> => {
  await api.post("/track", data);
};

export const setApiKey = (apiKey: string): void => {
  localStorage.setItem("fraud_api_key", apiKey);
};

export const clearApiKey = (): void => {
  localStorage.removeItem("fraud_api_key");
};

export const validateApiKey = async (): Promise<boolean> => {
  try {
    await api.get("/validate");
    return true;
  } catch {
    return false;
  }
};

export const sendPasswordResetLink = async (email: string): Promise<void> => {
  await api.post("/auth/password-reset", { email });
};

export const verifyEmail = async (code: string): Promise<void> => {
  await api.post("/auth/verify-email", { code });
};

export const setupMFA = async (method: string): Promise<void> => {
  await api.post("/auth/mfa/setup", { method });
};

export const verifyMFA = async (code: string): Promise<void> => {
  await api.post("/auth/mfa/verify", { code });
};
