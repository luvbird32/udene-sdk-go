import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { DateRangeSelector } from "./DateRangeSelector";
import { ReportTypeSelector } from "./ReportTypeSelector";
import { ScheduleSection } from "./ScheduleSection";
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

  const { data: savedTemplates } = useQuery({
    queryKey: ["report-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_reports')
        .select('*')
        .eq('status', 'template')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

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
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Report Management</h3>
        <ExportActions 
          onExportCSV={() => exportReport('csv')}
          onExportPDF={() => exportReport('pdf')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DateRangeSelector 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        <ReportTypeSelector 
          reportType={reportType}
          onReportTypeChange={setReportType}
        />
        <div>
          <label className="block text-sm font-medium mb-2">Templates</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Load template" />
            </SelectTrigger>
            <SelectContent>
              {savedTemplates?.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.report_type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScheduleSection 
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