import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2, Shield, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { OpenSourceScanTable } from "@/integrations/supabase/types/tables/open-source-security";

type OpenSourceScan = OpenSourceScanTable['Row'];

export const OpenSourceSecurity = () => {
  const { data: scans, isLoading } = useQuery({
    queryKey: ["open-source-scans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('open_source_scans')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as OpenSourceScan[];
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Open Source Security
        </h3>
      </div>

      {scans?.map((scan) => (
        <Card key={scan.id} className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{scan.package_manager} Scan</h4>
              <p className="text-sm text-muted-foreground">
                {scan.dependencies_scanned} dependencies scanned
              </p>
            </div>
            {scan.vulnerabilities_found > 0 && (
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            )}
          </div>

          {scan.severity_breakdown && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Security Score</span>
                <span className="font-medium">
                  {calculateSecurityScore(scan.severity_breakdown)}%
                </span>
              </div>
              <Progress 
                value={calculateSecurityScore(scan.severity_breakdown)} 
                className="h-2"
              />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Critical:</span>
                  <span className="text-red-500 font-medium">
                    {scan.severity_breakdown.critical}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>High:</span>
                  <span className="text-orange-500 font-medium">
                    {scan.severity_breakdown.high}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Medium:</span>
                  <span className="text-yellow-500 font-medium">
                    {scan.severity_breakdown.medium}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Low:</span>
                  <span className="text-green-500 font-medium">
                    {scan.severity_breakdown.low}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}

      {(!scans || scans.length === 0) && (
        <Card className="p-6 text-center text-muted-foreground">
          No security scans found. Run a scan to monitor your dependencies.
        </Card>
      )}
    </div>
  );
};

const calculateSecurityScore = (severityBreakdown: NonNullable<OpenSourceScan['severity_breakdown']>): number => {
  const weights = {
    critical: 10,
    high: 5,
    medium: 3,
    low: 1
  };

  const totalIssues = Object.values(severityBreakdown).reduce((a, b) => a + b, 0);
  if (totalIssues === 0) return 100;

  const weightedSum = Object.entries(severityBreakdown).reduce(
    (sum, [severity, count]) => sum + (count * weights[severity as keyof typeof weights]),
    0
  );

  const maxPossibleScore = totalIssues * weights.critical;
  const score = 100 - ((weightedSum / maxPossibleScore) * 100);

  return Math.max(0, Math.round(score));
};