export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: "admin" | "user" | "analyst";
  lastActive: string;
  status: "active" | "inactive";
}