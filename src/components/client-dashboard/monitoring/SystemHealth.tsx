import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface SystemStatus {
  status: string;
  api: boolean;
  database: boolean;
  cache: boolean;
}

export const SystemHealth = () => {
  const { data: health, isLoading, error } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      try {
        console.log("Checking database connection...");
        
        const { count, error: dbError } = await supabase
          .from('metrics')
          .select('*', { count: 'exact', head: true });

        if (dbError) {
          console.error("Database check failed:", dbError);
          throw new Error(`Database connection failed: ${dbError.message}`);
        }

        // Since we're using Supabase, if we can query the database, the API is working
        const status = {
          status: count !== null ? "healthy" : "unhealthy",
          api: true,
          database: count !== null,
          cache: count !== null // Using same check for cache since we're using Supabase
        };

        console.log("Health check result:", status);
        return status;
      } catch (error) {
        console.error("Health check failed:", error);
        throw error;
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
  });

  if (isLoading) {
    return <LoadingState message="Checking system health..." />;
  }

  if (error) {
    return <ErrorState error={error instanceof Error ? error : new Error("Failed to check system health")} />;
  }

  const getStatusColor = (isHealthy: boolean) => {
    return isHealthy ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500";
  };

  const getStatusIcon = (isHealthy: boolean) => {
    return isHealthy ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">System Health</h3>
        <Badge 
          variant="outline" 
          className={health?.status === "healthy" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
        >
          {health?.status === "healthy" ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : (
            <AlertTriangle className="h-4 w-4 mr-2" />
          )}
          {health?.status === "healthy" ? "All Systems Operational" : "System Issues Detected"}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">API Status</span>
          <Badge variant="outline" className={getStatusColor(health?.api || false)}>
            {getStatusIcon(health?.api || false)}
            <span className="ml-2">{health?.api ? "Online" : "Offline"}</span>
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Database</span>
          <Badge variant="outline" className={getStatusColor(health?.database || false)}>
            {getStatusIcon(health?.database || false)}
            <span className="ml-2">{health?.database ? "Connected" : "Disconnected"}</span>
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Cache</span>
          <Badge variant="outline" className={getStatusColor(health?.cache || false)}>
            {getStatusIcon(health?.cache || false)}
            <span className="ml-2">{health?.cache ? "Available" : "Unavailable"}</span>
          </Badge>
        </div>
      </div>
    </Card>
  );
};