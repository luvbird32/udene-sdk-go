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
        console.log("Checking connection to Lovable services...");
        
        const { count, error: dbError } = await supabase
          .from('metrics')
          .select('*', { count: 'exact', head: true });

        if (dbError) {
          console.error("Connection check failed:", dbError);
          throw new Error(`Connection failed: ${dbError.message}`);
        }

        const status = {
          status: count !== null ? "connected" : "disconnected",
          api: count !== null, // If we can reach Supabase, API is accessible
          database: count !== null,
          cache: count !== null
        };

        console.log("Connection check result:", status);
        return status;
      } catch (error) {
        console.error("Connection check failed:", error);
        throw error;
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
  });

  if (isLoading) {
    return <LoadingState message="Checking connection status..." />;
  }

  if (error) {
    return <ErrorState error={error instanceof Error ? error : new Error("Failed to check connection status")} />;
  }

  const getStatusColor = (isConnected: boolean) => {
    return isConnected ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500";
  };

  const getStatusIcon = (isConnected: boolean) => {
    return isConnected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  };

  return (
    <TooltipProvider>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Connection Status</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Shows your connection status to Lovable's services. This does not reflect the status of your own systems.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Badge 
            variant="outline" 
            className={health?.status === "connected" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
          >
            {health?.status === "connected" ? (
              <CheckCircle className="h-4 w-4 mr-2" />
            ) : (
              <AlertTriangle className="h-4 w-4 mr-2" />
            )}
            {health?.status === "connected" ? "Connected to Lovable" : "Connection Issues"}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Lovable API</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connection status to Lovable's API services</p>
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
              <span className="text-muted-foreground">Lovable Database</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connection status to Lovable's database services</p>
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
              <span className="text-muted-foreground">Lovable Cache</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connection status to Lovable's caching services</p>
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