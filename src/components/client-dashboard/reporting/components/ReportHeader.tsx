import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ReportHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <FileText className="h-5 w-5 text-primary" />
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Report Management</h3>
          <Badge variant="outline">Beta</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Generate and schedule custom reports
        </p>
      </div>
    </div>
  );
};