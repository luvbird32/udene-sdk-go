import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { OpenSourceScan } from "@/integrations/supabase/types/security";
import { SeverityBreakdownDisplay } from "./components/SeverityBreakdownDisplay";
import { RemediationSteps } from "./components/RemediationSteps";
import { ScanHeader } from "./components/ScanHeader";
import { DependencyInfo } from "./components/DependencyInfo";

export const OpenSourceSecurity = () => {
  const { toast } = useToast();

  const { data: latestScan, isLoading } = useQuery({
    queryKey: ["open-source-security"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('open_source_scans')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching open source scan:", error);
        toast({
          title: "Error",
          description: "Failed to fetch security scan results. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      if (!data) {
        return null;
      }

      let severityBreakdown = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      };

      if (data.severity_breakdown && typeof data.severity_breakdown === 'object') {
        const breakdown = data.severity_breakdown as Record<string, number>;
        severityBreakdown = {
          critical: breakdown.critical || 0,
          high: breakdown.high || 0,
          medium: breakdown.medium || 0,
          low: breakdown.low || 0
        };
      }

      return {
        ...data,
        severity_breakdown: severityBreakdown,
        remediation_steps: Array.isArray(data.remediation_steps) ? data.remediation_steps : []
      } as OpenSourceScan;
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Open Source Security</h3>
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading scan results...</p>
        </div>
      </Card>
    );
  }

  const totalVulnerabilities = latestScan ? 
    Object.values(latestScan.severity_breakdown).reduce((a, b) => a + b, 0) : 0;

  return (
    <Card className="p-6 space-y-6">
      <ScanHeader totalVulnerabilities={totalVulnerabilities} />

      {latestScan && (
        <>
          <div className="space-y-4">
            <DependencyInfo dependenciesScanned={latestScan.dependencies_scanned} />

            <SeverityBreakdownDisplay 
              severityBreakdown={latestScan.severity_breakdown}
              totalVulnerabilities={totalVulnerabilities}
            />
          </div>

          <RemediationSteps steps={latestScan.remediation_steps} />
        </>
      )}
    </Card>
  );
};