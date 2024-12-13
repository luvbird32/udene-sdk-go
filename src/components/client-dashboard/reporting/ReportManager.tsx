import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ReportHeader } from "./components/ReportHeader";
import { ReportGuide } from "./components/ReportGuide";
import { ReportControls } from "./components/ReportControls";
import { ReportDateRange } from "./components/ReportDateRange";
import { ReportScheduling } from "./components/ReportScheduling";
import { ReportActions } from "./components/ReportActions";
import type { DateRange } from "react-day-picker";

export const ReportManager = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });
  const [reportType, setReportType] = useState("transactions");
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleFrequency, setScheduleFrequency] = useState("daily");

  const saveTemplate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('compliance_reports')
        .insert({
          report_type: reportType,
          report_period: `[${dateRange.from?.toISOString()},${dateRange.to?.toISOString()}]`,
          status: 'template',
          generated_by: user.id,
        });

      if (error) throw error;

      toast({
        title: "Template Saved",
        description: "Report template has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save template",
        variant: "destructive",
      });
    }
  };

  const scheduleReport = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('compliance_reports')
        .insert({
          report_type: reportType,
          report_period: `[${dateRange.from?.toISOString()},${dateRange.to?.toISOString()}]`,
          status: 'scheduled',
          generated_by: user.id,
        });

      if (error) throw error;

      toast({
        title: "Report Scheduled",
        description: `Report will be generated ${scheduleFrequency}`,
      });
    } catch (error) {
      toast({
        title: "Scheduling Failed",
        description: error instanceof Error ? error.message : "Failed to schedule report",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <ReportHeader />
        <ReportGuide />
        
        <ReportControls 
          dateRange={dateRange}
          reportType={reportType}
          onDateRangeChange={setDateRange}
          onReportTypeChange={setReportType}
        />

        <ReportDateRange 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <ReportScheduling 
          scheduleName={scheduleName}
          scheduleFrequency={scheduleFrequency}
          onScheduleNameChange={setScheduleName}
          onScheduleFrequencyChange={setScheduleFrequency}
        />

        <ReportActions 
          onSaveTemplate={saveTemplate}
          onScheduleReport={scheduleReport}
        />
      </div>
    </Card>
  );
};