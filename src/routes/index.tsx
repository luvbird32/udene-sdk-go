import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import SecurityScan from "@/pages/SecurityScan";
import Landing from "@/pages/Landing"; // Assuming you have a Landing page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/security-scan",
    element: <SecurityScan />,
  },
]);
