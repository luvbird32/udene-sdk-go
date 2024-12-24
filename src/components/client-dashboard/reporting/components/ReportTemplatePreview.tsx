import { Card } from "@/components/ui/card";
import { FileText, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface ReportTemplatePreviewProps {
  reportType: string;
  dateRange: DateRange | undefined;
  scheduleName?: string;
  scheduleFrequency?: string;
}

export const ReportTemplatePreview = ({
  reportType,
  dateRange,
  scheduleName,
  scheduleFrequency,
}: ReportTemplatePreviewProps) => {
  return (
    <Card className="p-4 bg-muted/50">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium">Report Preview</h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Report Type:</span>
            <span className="font-medium">{reportType}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Date Range:</span>
            <span className="font-medium">
              {dateRange?.from && dateRange?.to ? (
                <>
                  {format(dateRange.from, "MMM d, yyyy")} -{" "}
                  {format(dateRange.to, "MMM d, yyyy")}
                </>
              ) : (
                "Not selected"
              )}
            </span>
          </div>
          
          {scheduleName && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Schedule Name:</span>
              <span className="font-medium">{scheduleName}</span>
            </div>
          )}
          
          {scheduleFrequency && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frequency:</span>
              <span className="font-medium capitalize">{scheduleFrequency}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};