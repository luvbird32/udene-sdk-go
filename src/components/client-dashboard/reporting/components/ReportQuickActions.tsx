import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  Mail, 
  Share2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ReportQuickActions = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} action has been triggered.`,
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="font-medium">Quick Actions</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Generate Now")}
          >
            <FileText className="h-4 w-4" />
            Generate Now
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
            Share
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction("Email")}
          >
            <Mail className="h-4 w-4" />
            Email
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