import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface Report {
  id: string;
  report_type: string;
  created_at: string;
  status: string;
  download_url?: string;
}

interface ReportListProps {
  reports: Report[];
}

export const ReportList = ({ reports }: ReportListProps) => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {reports?.map((report) => (
          <div 
            key={report.id} 
            className="glass-card p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-green-400">{report.report_type.replace(/_/g, ' ').toUpperCase()}</p>
              <p className="text-sm text-green-300/80">
                Generated: {new Date(report.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-green-300/80 capitalize">
                Status: {report.status}
              </p>
            </div>
            {report.download_url && (
              <Button variant="ghost" size="sm" className="glass-button flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                Download
              </Button>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};