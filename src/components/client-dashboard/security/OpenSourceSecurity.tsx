/**
 * OpenSourceSecurity Component
 * 
 * Displays the results of open source security scans, including vulnerability
 * findings and severity breakdowns. Provides real-time updates of scan results
 * and remediation recommendations.
 * 
 * Features:
 * - Real-time scan results display
 * - Vulnerability severity breakdown
 * - Remediation steps
 * - Loading state handling
 * - Error state handling
 * - Automatic refresh every 30 seconds
 */
import { Card } from "@/components/ui/card";
import { useOpenSourceScan } from "./hooks/useOpenSourceScan";
import { ScanHeader } from "./components/ScanHeader";
import { OpenSourceStats } from "./components/open-source/OpenSourceStats";
import { RemediationSteps } from "./components/RemediationSteps";
import { LoadingScanState } from "./components/scan-results/LoadingScanState";

export const OpenSourceSecurity = () => {
  const { data: latestScan, isLoading } = useOpenSourceScan();

  if (isLoading) {
    return <LoadingScanState />;
  }

  const totalVulnerabilities = latestScan ? 
    Object.values(latestScan.severity_breakdown).reduce((a, b) => a + b, 0) : 0;

  // Transform string array into RemediationStep array
  const formattedSteps = latestScan?.remediation_steps?.map((step: string) => ({
    title: "Remediation Required",
    description: step,
    severity: "medium" as const
  })) || [];

  return (
    <Card className="p-6 space-y-6">
      <ScanHeader 
        totalVulnerabilities={totalVulnerabilities}
        scanType="Open Source"
      />

      {latestScan && (
        <>
          <OpenSourceStats 
            scan={latestScan}
            totalVulnerabilities={totalVulnerabilities}
          />
          <RemediationSteps steps={formattedSteps} />
        </>
      )}
    </Card>
  );
};