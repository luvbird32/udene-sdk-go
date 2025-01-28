import { useState } from "react";
import { Card } from "@/components/ui/card";
import { VulnerabilityScanList } from "@/components/client-dashboard/security/components/vulnerability/VulnerabilityScanList";
import { ScanQuickActions } from "@/components/client-dashboard/security/components/vulnerability/ScanQuickActions";
import { SeverityBreakdown } from "@/components/client-dashboard/security/components/vulnerability/SeverityBreakdown";
import { useVulnerabilityScans } from "@/components/client-dashboard/security/hooks/useVulnerabilityScans";
import { DependencyMonitor } from "@/components/client-dashboard/security/components/dependency/DependencyMonitor";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TooltipProvider } from "@/components/ui/tooltip";

const SecurityScan = () => {
  const { data: scans, isLoading, refetch } = useVulnerabilityScans();
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const totalVulnerabilities = scans?.reduce((sum, scan) => sum + scan.total_vulnerabilities, 0) || 0;
  const severityBreakdown = scans?.[0]?.severity_breakdown || {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  };

  const handleStartScan = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to start a scan.",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    try {
      // Create initial scan record
      const { data: scanRecord, error: insertError } = await supabase
        .from('vulnerability_scans')
        .insert({
          user_id: user.id,
          scan_type: 'full',
          status: 'in_progress',
          start_time: new Date().toISOString(),
          severity_breakdown: { critical: 0, high: 0, medium: 0, low: 0 },
          total_vulnerabilities: 0
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Start the scan using the edge function
      const { data, error } = await supabase.functions.invoke('vulnerability-scan', {
        body: {
          user_id: user.id,
          scan_id: scanRecord.id,
          scan_type: 'comprehensive',
        },
      });

      if (error) throw error;

      toast({
        title: "Scan Started",
        description: "Your security scan has been initiated successfully.",
      });
      
      // Refresh the scans list
      refetch();

    } catch (error) {
      console.error('Error starting scan:', error);
      toast({
        title: "Scan Failed",
        description: "Failed to start security scan. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Security Scanning</h1>
          <ScanQuickActions 
            onStartScan={handleStartScan}
            isScanning={isScanning}
          />
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
    </TooltipProvider>
  );
};

export default SecurityScan;