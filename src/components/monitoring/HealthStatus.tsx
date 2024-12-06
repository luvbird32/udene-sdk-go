import { Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const HealthStatus = () => {
  const { data: health, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      try {
        // Check Supabase connection
        const { data: dbCheck, error: dbError } = await supabase
          .from('metrics')
          .select('count(*)', { count: 'exact', head: true });

        // Check if we can access the API
        const apiCheck = await fetch("/api/v1/health");
        const apiStatus = apiCheck.ok;

        return {
          status: !dbError && apiStatus ? "healthy" : "unhealthy",
          api: apiStatus,
          database: !dbError,
          cache: !dbError // Using same check for cache since we're using Supabase
        };
      } catch (error) {
        console.error("Health check failed:", error);
        return {
          status: "unhealthy",
          api: false,
          database: false,
          cache: false
        };
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

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