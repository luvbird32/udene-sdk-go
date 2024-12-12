import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ReportHeader } from "./components/ReportHeader";
import { ReportGuide } from "./components/ReportGuide";
import { ReportControls } from "./components/ReportControls";
import { ScheduleControls } from "./components/ScheduleControls";
import { ExportActions } from "./ExportActions";

interface DateRange {
  from: Date;
  to: Date;
}

export const ReportManager = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });
  const [reportType, setReportType] = useState("transactions");
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleFrequency, setScheduleFrequency] = useState("daily");

  const exportReport = async (format: 'csv' | 'pdf') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      if (error) throw error;

      if (format === 'csv') {
        const csvContent = convertToCSV(data);
        downloadFile(csvContent, 'report.csv', 'text/csv');
      } else {
        toast({
          title: "PDF Export",
          description: "PDF export functionality coming soon!",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export report",
        variant: "destructive",
      });
    }
  };

  const saveTemplate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('compliance_reports')
        .insert({
          report_type: reportType,
          report_period: `[${dateRange.from.toISOString()},${dateRange.to.toISOString()}]`,
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
          report_period: `[${dateRange.from.toISOString()},${dateRange.to.toISOString()}]`,
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

  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    );
    return [headers, ...rows].join('\n');
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <ReportHeader />
        <ExportActions 
          onExportCSV={() => exportReport('csv')}
          onExportPDF={() => exportReport('pdf')}
        />
      </div>

      <ReportGuide />

      <ReportControls 
        dateRange={dateRange}
        reportType={reportType}
        onDateRangeChange={setDateRange}
        onReportTypeChange={setReportType}
      />

      <ScheduleControls 
        scheduleName={scheduleName}
        scheduleFrequency={scheduleFrequency}
        onScheduleNameChange={setScheduleName}
        onScheduleFrequencyChange={setScheduleFrequency}
        onSaveTemplate={saveTemplate}
        onScheduleReport={scheduleReport}
      />
    </Card>
  );
};