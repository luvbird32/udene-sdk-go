import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export const ComplianceReporting = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Get the current user's ID when component mounts
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const { data: reports, isLoading } = useQuery({
    queryKey: ["compliance-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const generateReport = async (type: string) => {
    // Check if user is authenticated
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to generate reports",
        variant: "destructive"
      });
      return;
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const { error } = await supabase
      .from('compliance_reports')
      .insert({
        report_type: type,
        report_period: `[${startOfMonth.toISOString()},${endOfMonth.toISOString()}]`,
        status: 'pending',
        generated_by: userId
      });

    if (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Report generation started"
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-black/20 rounded w-1/4"></div>
          <div className="h-32 bg-black/20 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-400">Generate Compliance Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="glass-button flex items-center gap-2"
            onClick={() => generateReport('gdpr_data_access')}
            disabled={!userId}
          >
            <FileText className="h-4 w-4" />
            GDPR Data Access Report
          </Button>
          <Button 
            variant="outline"
            className="glass-button flex items-center gap-2"
            onClick={() => generateReport('psd2_transaction_log')}
            disabled={!userId}
          >
            <FileText className="h-4 w-4" />
            PSD2 Transaction Log
          </Button>
          <Button 
            variant="outline"
            className="glass-button flex items-center gap-2"
            onClick={() => generateReport('fraud_audit_trail')}
            disabled={!userId}
          >
            <FileText className="h-4 w-4" />
            Fraud Audit Trail
          </Button>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-400">Recent Reports</h3>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {reports?.map((report) => (
              <div 
                key={report.id} 
                className="glass-card p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-green-400">{report.report_type.replace(/_/g, ' ').toUpperCase()}</p>
                  <p className="text-sm text-green-300/80">
                    Generated: {new Date(report.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-300/80 capitalize">
                    Status: {report.status}
                  </p>
                </div>
                {report.download_url && (
                  <Button variant="ghost" size="sm" className="glass-button flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    Download
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};