import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ReportHeader } from "./components/ReportHeader";
import { ReportGuide } from "./components/ReportGuide";
import { ReportControls } from "./components/ReportControls";
import { ReportDateRange } from "./components/ReportDateRange";
import { ReportScheduling } from "./components/ReportScheduling";
import { ReportActions } from "./components/ReportActions";
import { ReportTemplatePreview } from "./components/ReportTemplatePreview";
import { ReportQuickActions } from "./components/ReportQuickActions";
import { ReportScheduleStatus } from "./components/ReportScheduleStatus";
import { useReportOperations } from "./hooks/useReportOperations";
import type { DateRange } from "react-day-picker";

export const ReportManager = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });

  const {
    reportType,
    setReportType,
    scheduleName,
    setScheduleName,
    scheduleFrequency,
    setScheduleFrequency,
    saveTemplate,
    scheduleReport,
  } = useReportOperations();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <ReportHeader />
        <ReportGuide />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
              onSaveTemplate={() => saveTemplate(dateRange)}
              onScheduleReport={() => scheduleReport(dateRange)}
            />
          </div>

          <div className="space-y-6">
            <ReportTemplatePreview 
              reportType={reportType}
              dateRange={dateRange}
              scheduleName={scheduleName}
              scheduleFrequency={scheduleFrequency}
            />
            <ReportQuickActions />
            <ReportScheduleStatus />
          </div>
        </div>
      </div>
    </Card>
  );
};