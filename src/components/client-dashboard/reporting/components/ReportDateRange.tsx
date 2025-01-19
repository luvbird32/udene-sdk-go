import { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

interface ReportDateRangeProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export const ReportDateRange = ({ dateRange, onDateRangeChange }: ReportDateRangeProps) => {
  return (
    <Card className="p-4">
      <Label className="block mb-2 text-white/60">Select Date Range</Label>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={onDateRangeChange}
        numberOfMonths={2}
        className="rounded-md border"
      />
    </Card>
  );
};