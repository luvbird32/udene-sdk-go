import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OpenSourceScan, SeverityBreakdown } from "@/integrations/supabase/types/security";

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

      // Parse severity_breakdown with type safety
      let severityBreakdown: SeverityBreakdown = {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Open Source Security</h3>
        </div>
        <Badge variant={totalVulnerabilities > 0 ? "destructive" : "secondary"}>
          {totalVulnerabilities} {totalVulnerabilities === 1 ? 'vulnerability' : 'vulnerabilities'}
        </Badge>
      </div>

      {latestScan && (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Dependencies Scanned</span>
              </div>
              <span className="font-medium">{latestScan.dependencies_scanned}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Critical</span>
                <span className="text-red-500">{latestScan.severity_breakdown.critical}</span>
              </div>
              <Progress 
                value={(latestScan.severity_breakdown.critical / totalVulnerabilities) * 100} 
                className="h-2 bg-red-100"
              >
                <div className="h-full bg-red-500 transition-all" />
              </Progress>

              <div className="flex items-center justify-between text-sm">
                <span>High</span>
                <span className="text-orange-500">{latestScan.severity_breakdown.high}</span>
              </div>
              <Progress 
                value={(latestScan.severity_breakdown.high / totalVulnerabilities) * 100} 
                className="h-2 bg-orange-100"
              >
                <div className="h-full bg-orange-500 transition-all" />
              </Progress>

              <div className="flex items-center justify-between text-sm">
                <span>Medium</span>
                <span className="text-yellow-500">{latestScan.severity_breakdown.medium}</span>
              </div>
              <Progress 
                value={(latestScan.severity_breakdown.medium / totalVulnerabilities) * 100} 
                className="h-2 bg-yellow-100"
              >
                <div className="h-full bg-yellow-500 transition-all" />
              </Progress>

              <div className="flex items-center justify-between text-sm">
                <span>Low</span>
                <span className="text-blue-500">{latestScan.severity_breakdown.low}</span>
              </div>
              <Progress 
                value={(latestScan.severity_breakdown.low / totalVulnerabilities) * 100} 
                className="h-2 bg-blue-100"
              >
                <div className="h-full bg-blue-500 transition-all" />
              </Progress>
            </div>
          </div>

          {latestScan.remediation_steps && latestScan.remediation_steps.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Recommended Actions</h4>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {latestScan.remediation_steps.map((step, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Card>
  );
};