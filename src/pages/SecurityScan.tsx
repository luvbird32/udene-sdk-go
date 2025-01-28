import { Card } from "@/components/ui/card";
import { VulnerabilityScanList } from "@/components/client-dashboard/security/components/vulnerability/VulnerabilityScanList";
import { ScanQuickActions } from "@/components/client-dashboard/security/components/vulnerability/ScanQuickActions";
import { SeverityBreakdown } from "@/components/client-dashboard/security/components/vulnerability/SeverityBreakdown";
import { useVulnerabilityScans } from "@/components/client-dashboard/security/hooks/useVulnerabilityScans";
import { DependencyMonitor } from "@/components/client-dashboard/security/components/dependency/DependencyMonitor";

const SecurityScan = () => {
  const { data: scans, isLoading } = useVulnerabilityScans();

  const totalVulnerabilities = scans?.reduce((sum, scan) => sum + scan.total_vulnerabilities, 0) || 0;
  const severityBreakdown = scans?.[0]?.severity_breakdown || {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Security Scanning</h1>
        <ScanQuickActions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Vulnerability Overview</h2>
          <SeverityBreakdown 
            breakdown={severityBreakdown}
            total={totalVulnerabilities}
          />
        </Card>
        <DependencyMonitor />
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>
        <VulnerabilityScanList 
          scans={scans} 
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default SecurityScan;