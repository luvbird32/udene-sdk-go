import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  Mail, 
  Share2,
  Pause,
  Play,
  StopCircle,
  RefreshCw,
  AlertTriangle,
  FileJson
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportQuickActionsProps {
  onStartScan?: () => void;
  isScanning?: boolean;
}

export const ReportQuickActions = ({ onStartScan, isScanning = false }: ReportQuickActionsProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    if (action === "Start New Scan" && onStartScan) {
      onStartScan();
      return;
    }

    // For other actions, show toast notification
    toast({
      title: "Action Triggered",
      description: `${action} action has been triggered.`,
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="font-medium">Scan Actions</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Start New Scan")}
            disabled={isScanning}
          >
            <Play className="h-4 w-4" />
            Start New Scan
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Pause Scan")}
            disabled={!isScanning}
          >
            <Pause className="h-4 w-4" />
            Pause Scan
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Stop Scan")}
            disabled={!isScanning}
          >
            <StopCircle className="h-4 w-4" />
            Stop Scan
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Resume Scan")}
            disabled={!isScanning}
          >
            <RefreshCw className="h-4 w-4" />
            Resume Scan
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Export Results")}
          >
            <FileJson className="h-4 w-4" />
            Export Results
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-destructive hover:text-destructive"
            onClick={() => handleAction("Report Issue")}
          >
            <AlertTriangle className="h-4 w-4" />
            Report Issue
          </Button>

          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Schedule")}
          >
            <Clock className="h-4 w-4" />
            Schedule
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Download Previous")}
          >
            <Download className="h-4 w-4" />
            Download Previous
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Share")}
          >
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Email")}
          >
            <Mail className="h-4 w-4" />
            Email Report
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Generate Report")}
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Calendar")}
          >
            <Calendar className="h-4 w-4" />
            Add to Calendar
          </Button>
        </div>
      </div>
    </Card>
  );
};