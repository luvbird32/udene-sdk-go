import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Shield, CheckCircle2 } from "lucide-react";

interface ServiceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    title: string;
    description: string;
    features: string[];
    type: string;
  };
}

export const ServiceDetailsDialog = ({ open, onOpenChange, service }: ServiceDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {service.title}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="pr-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <h4 className="font-medium">Overview</h4>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Key Features</h4>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Implementation Details</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>This service integrates seamlessly with your existing infrastructure:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Real-time monitoring and alerts</li>
                  <li>Customizable settings and thresholds</li>
                  <li>Detailed analytics and reporting</li>
                  <li>API integration available</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};