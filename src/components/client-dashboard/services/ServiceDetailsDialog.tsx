import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Shield, CheckCircle2, AlertTriangle, Clock, Settings, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
            {/* Overview Section */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <h4 className="font-medium">Overview</h4>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Key Features Section */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Key Features
              </h4>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Implementation Details */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-500" />
                Implementation Details
              </h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>This service integrates seamlessly with your existing infrastructure:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Real-time monitoring and alerts</li>
                  <li>Customizable settings and thresholds</li>
                  <li>Detailed analytics and reporting</li>
                  <li>API integration available</li>
                  <li>Automated response mechanisms</li>
                  <li>Custom rules engine</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Security Measures */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Lock className="h-4 w-4 text-indigo-500" />
                Security Measures
              </h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Enhanced security features include:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>End-to-end encryption</li>
                  <li>Regular security audits</li>
                  <li>Compliance with industry standards</li>
                  <li>Multi-factor authentication support</li>
                  <li>Access control and permissions</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Best Practices */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Best Practices
              </h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>For optimal results, we recommend:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Regular monitoring of alerts and notifications</li>
                  <li>Periodic review of security settings</li>
                  <li>Keeping integration endpoints up to date</li>
                  <li>Following security guidelines</li>
                  <li>Regular staff training on security protocols</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Support and Resources */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-rose-500" />
                Support and Resources
              </h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>We provide comprehensive support:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>24/7 technical support</li>
                  <li>Detailed documentation</li>
                  <li>Regular updates and improvements</li>
                  <li>Community forums and knowledge base</li>
                  <li>Dedicated account manager</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};