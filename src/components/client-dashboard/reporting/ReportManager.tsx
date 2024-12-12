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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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

  const { data: savedTemplates, isLoading: templatesLoading } = useQuery({
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

  if (templatesLoading) {
    return (
      <Card className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="space-x-2">
            <Skeleton className="h-10 w-32 inline-block" />
            <Skeleton className="h-10 w-32 inline-block" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Report Management</h3>
            <p className="text-sm text-muted-foreground">Generate and schedule custom reports</p>
          </div>
          <Badge variant="outline" className="ml-2">Beta</Badge>
        </div>
        <ExportActions 
          onExportCSV={() => exportReport('csv')}
          onExportPDF={() => exportReport('pdf')}
        />
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Getting Started</AlertTitle>
        <AlertDescription>
          Select a date range and report type to begin. You can save report templates for future use or schedule regular report generation.
        </AlertDescription>
      </Alert>

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
          <label className="block text-sm font-medium mb-2">Saved Templates</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={savedTemplates?.length ? "Load template" : "No templates saved"} />
            </SelectTrigger>
            <SelectContent>
              {savedTemplates?.length === 0 ? (
                <SelectItem value="none" disabled>No saved templates</SelectItem>
              ) : (
                savedTemplates?.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.report_type}
                  </SelectItem>
                ))
              )}
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
