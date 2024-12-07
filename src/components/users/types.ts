export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "analyst";
  lastActive: string;
  status: "active" | "inactive";
}