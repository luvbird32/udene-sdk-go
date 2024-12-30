import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";
import { DependencyAlert } from "./DependencyAlert";
import { ScanHistory } from "./ScanHistory";
import { useToast } from "@/hooks/use-toast";

export const DependencyMonitor = () => {
  const { toast } = useToast();

  const { data: vulnerabilities, isLoading } = useQuery({
    queryKey: ["dependency-vulnerabilities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dependency_vulnerabilities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching vulnerabilities:", error);
        toast({
          title: "Error",
          description: "Failed to fetch vulnerability data",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const criticalCount = vulnerabilities?.filter(v => v.severity === 'critical').length || 0;
  const highCount = vulnerabilities?.filter(v => v.severity === 'high').length || 0;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Dependency Security Monitor</h3>
        </div>
      </div>

      {(criticalCount > 0 || highCount > 0) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Security Vulnerabilities Detected</AlertTitle>
          <AlertDescription>
            Found {criticalCount} critical and {highCount} high severity vulnerabilities.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {vulnerabilities?.map((vulnerability) => (
          <DependencyAlert 
            key={vulnerability.id}
            vulnerability={vulnerability}
          />
        ))}
      </div>

      <ScanHistory />
    </Card>
  );
};