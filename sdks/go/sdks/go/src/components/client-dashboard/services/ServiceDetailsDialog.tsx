import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DialogOverview } from "./components/dialog/DialogOverview";
import { DialogFeatures } from "./components/dialog/DialogFeatures";
import { DialogImplementation } from "./components/dialog/DialogImplementation";
import { DialogSecurity } from "./components/dialog/DialogSecurity";
import { DialogBestPractices } from "./components/dialog/DialogBestPractices";
import { DialogSupport } from "./components/dialog/DialogSupport";

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
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader className="sticky top-0 bg-background z-10 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {service.title}
          </DialogTitle>
          <DialogDescription>
            Detailed information about {service.title} and its features
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="pr-4 h-[calc(80vh-120px)] overflow-y-auto">
          <div className="space-y-6 pr-2">
            <DialogOverview description={service.description} />
            <Separator />
            <DialogFeatures features={service.features} />
            <Separator />
            <DialogImplementation />
            <Separator />
            <DialogSecurity />
            <Separator />
            <DialogBestPractices />
            <Separator />
            <DialogSupport />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};