import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StatusBadge } from "./StatusBadge";
import { ServiceStatus } from "./ServiceStatus";

interface SystemStatus {
  status: "connected" | "disconnected";
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

        const status: SystemStatus = {
          status: count !== null ? "connected" : "disconnected",
          api: count !== null,
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
    refetchInterval: 30000,
  });

  if (isLoading) {
    return <LoadingState message="Checking connection status..." />;
  }

  if (error) {
    return <ErrorState error={error instanceof Error ? error : new Error("Failed to check connection status")} />;
  }

  return (
    <TooltipProvider>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Connection Status</h3>
          <StatusBadge status={health?.status || "disconnected"} />
        </div>

        <div className="space-y-4">
          <ServiceStatus 
            label="Lovable API"
            isConnected={health?.api || false}
            tooltipContent="Connection status to Lovable's API services"
          />
          
          <ServiceStatus 
            label="Lovable Database"
            isConnected={health?.database || false}
            tooltipContent="Connection status to Lovable's database services"
          />
          
          <ServiceStatus 
            label="Lovable Cache"
            isConnected={health?.cache || false}
            tooltipContent="Connection status to Lovable's caching services"
          />
        </div>
      </Card>
    </TooltipProvider>
  );
};