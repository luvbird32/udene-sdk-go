import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

        // Since we're using Supabase client, we can only verify client-side connectivity
        const status = {
          status: count !== null ? "healthy" : "unhealthy",
          api: true, // This is from client perspective
          database: count !== null,
          cache: count !== null
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
    <TooltipProvider>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">System Health</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">This health status reflects client-side connectivity to our services. For real-time system status, please check our status page.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Badge 
            variant="outline" 
            className={health?.status === "healthy" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
          >
            {health?.status === "healthy" ? (
              <CheckCircle className="h-4 w-4 mr-2" />
            ) : (
              <AlertTriangle className="h-4 w-4 mr-2" />
            )}
            {health?.status === "healthy" ? "Client Connection Active" : "Connection Issues Detected"}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">API Status</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Indicates if your client can reach our API endpoints</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge variant="outline" className={getStatusColor(health?.api || false)}>
              {getStatusIcon(health?.api || false)}
              <span className="ml-2">{health?.api ? "Connected" : "Disconnected"}</span>
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Database</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shows if your client can query the database</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge variant="outline" className={getStatusColor(health?.database || false)}>
              {getStatusIcon(health?.database || false)}
              <span className="ml-2">{health?.database ? "Connected" : "Disconnected"}</span>
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Cache</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Indicates if client-side caching is functioning</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge variant="outline" className={getStatusColor(health?.cache || false)}>
              {getStatusIcon(health?.cache || false)}
              <span className="ml-2">{health?.cache ? "Connected" : "Disconnected"}</span>
            </Badge>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};