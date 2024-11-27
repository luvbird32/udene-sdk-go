/**
 * HealthStatus Component
 * Displays real-time system health information including API, database, and cache status.
 * Updates automatically every 30 seconds.
 */
import { Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export const HealthStatus = () => {
  // Fetch health status data with automatic refresh
  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await fetch("/api/v1/health");
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <Card className="p-4">
      {/* Header with status indicator */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">System Health</h3>
        {health?.status === "healthy" ? (
          <Shield className="text-green-500 w-5 h-5" />
        ) : (
          <AlertTriangle className="text-red-500 w-5 h-5" />
        )}
      </div>
      
      {/* Individual service status indicators */}
      <div className="space-y-2">
        {/* API Status */}
        <div className="flex justify-between">
          <span>API Status</span>
          <span className={health?.api ? "text-green-500" : "text-red-500"}>
            {health?.api ? "Online" : "Offline"}
          </span>
        </div>
        {/* Database Status */}
        <div className="flex justify-between">
          <span>Database</span>
          <span className={health?.database ? "text-green-500" : "text-red-500"}>
            {health?.database ? "Connected" : "Disconnected"}
          </span>
        </div>
        {/* Cache Status */}
        <div className="flex justify-between">
          <span>Cache</span>
          <span className={health?.cache ? "text-green-500" : "text-red-500"}>
            {health?.cache ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>
    </Card>
  );
};