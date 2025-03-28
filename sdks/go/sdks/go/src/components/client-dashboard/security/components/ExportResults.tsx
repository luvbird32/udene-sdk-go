import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExportResultsProps {
  scanId: string;
  scanType: string;
}

export const ExportResults = ({ scanId, scanType }: ExportResultsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Fetch scan results
      const { data: scanData, error: scanError } = await supabase
        .from('vulnerability_scans')
        .select('*')
        .eq('id', scanId)
        .single();

      if (scanError) throw scanError;

      // Format data for export
      const exportData = {
        scan_id: scanData.id,
        scan_type: scanData.scan_type,
        timestamp: scanData.created_at,
        total_vulnerabilities: scanData.total_vulnerabilities,
        severity_breakdown: scanData.severity_breakdown,
        findings: scanData.findings,
      };

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vulnerability-scan-${scanId}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Export Successful",
        description: "Scan results have been exported successfully.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the scan results.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      size="sm"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </>
      )}
    </Button>
  );
};