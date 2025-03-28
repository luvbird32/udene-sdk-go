import { DateRangeSelector } from "../DateRangeSelector";
import { ReportTypeSelector } from "../ReportTypeSelector";
import { SavedTemplates } from "./SavedTemplates";
import type { DateRange } from "react-day-picker";

interface ReportControlsProps {
  dateRange: DateRange | undefined;
  reportType: string;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onReportTypeChange: (type: string) => void;
}

export const ReportControls = ({
  dateRange,
  reportType,
  onDateRangeChange,
  onReportTypeChange,
}: ReportControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DateRangeSelector 
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
      <ReportTypeSelector 
        reportType={reportType}
        onReportTypeChange={onReportTypeChange}
      />
      <SavedTemplates />
    </div>
  );
};