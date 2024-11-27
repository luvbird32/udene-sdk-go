import { Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export const HealthStatus = () => {
  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await fetch("/api/v1/health");
      return response.json();
    },
    refetchInterval: 30000, // Check every 30 seconds
  });

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">System Health</h3>
        {health?.status === "healthy" ? (
          <Shield className="text-green-500 w-5 h-5" />
        ) : (
          <AlertTriangle className="text-red-500 w-5 h-5" />
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>API Status</span>
          <span className={health?.api ? "text-green-500" : "text-red-500"}>
            {health?.api ? "Online" : "Offline"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Database</span>
          <span className={health?.database ? "text-green-500" : "text-red-500"}>
            {health?.database ? "Connected" : "Disconnected"}
          </span>
        </div>
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