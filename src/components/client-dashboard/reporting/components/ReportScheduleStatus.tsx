import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ReportScheduleStatus = () => {
  const { data: scheduledReports } = useQuery({
    queryKey: ["scheduled-reports"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('compliance_reports')
        .select('*')
        .eq('status', 'scheduled')
        .eq('generated_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium">Scheduled Reports</h4>
          </div>
          <Badge variant="outline">
            {scheduledReports?.length || 0} Active
          </Badge>
        </div>

        {scheduledReports && scheduledReports.length > 0 ? (
          <div className="space-y-2">
            {scheduledReports.map((report) => (
              <div 
                key={report.id} 
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{report.report_type}</span>
                </div>
                <Badge>{report.status}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>No scheduled reports</span>
          </div>
        )}
      </div>
    </Card>
  );
};