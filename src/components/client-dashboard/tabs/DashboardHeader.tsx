import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/client-dashboard/ThemeToggle";

export const DashboardHeader = () => {
  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Fraud Detection Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your transaction security and risk metrics
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <Link 
          to="/client-settings" 
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </header>
  );
};