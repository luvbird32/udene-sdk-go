export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: "admin" | "user" | "analyst" | "premium";
  lastActive: string;
  status: "active" | "inactive" | "blocked" | "suspended" | "investigating";
  lastStatusChange?: string;
}