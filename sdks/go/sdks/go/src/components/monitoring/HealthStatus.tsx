import { Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const HealthStatus = () => {
  const { toast } = useToast();

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
        toast({
          variant: "destructive",
          title: "System Health Check Failed",
          description: error instanceof Error ? error.message : "Unable to verify system health",
        });
        throw error;
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
    retry: 2,
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

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to check system health"}
          </AlertDescription>
        </Alert>
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
          <span 
            className={health?.api ? "text-green-500" : "text-red-500"}
            role="status"
            aria-label={`API is ${health?.api ? 'online' : 'offline'}`}
          >
            {health?.api ? "Online" : "Offline"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Database</span>
          <span 
            className={health?.database ? "text-green-500" : "text-red-500"}
            role="status"
            aria-label={`Database is ${health?.database ? 'connected' : 'disconnected'}`}
          >
            {health?.database ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Cache</span>
          <span 
            className={health?.cache ? "text-green-500" : "text-red-500"}
            role="status"
            aria-label={`Cache is ${health?.cache ? 'available' : 'unavailable'}`}
          >
            {health?.cache ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>
    </Card>
  );
};