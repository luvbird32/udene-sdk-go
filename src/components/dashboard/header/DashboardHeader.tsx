import { Settings, Link } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { AccountTypeIndicator } from "@/components/dashboard/AccountTypeIndicator";

export const DashboardHeader = () => {
  return (
    <header className="mb-8 flex justify-between items-center relative z-10">
      <div className="glass-card p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-green-400 animate-pulse-slow" tabIndex={0}>
          Admin Control Center
        </h2>
        <p className="text-green-300/80" tabIndex={0}>
          Advanced system monitoring and management interface
        </p>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <RouterLink 
          to="/settings" 
          className="flex items-center gap-2 px-6 py-3 rounded-md hover:bg-green-900/20 transition-all duration-300 glass-card"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </RouterLink>
      </div>
    </header>
  );
};