import { Info, Shield, Settings, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ServiceGuide = () => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Services Guide</h3>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="getting-started">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Getting Started with Services
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Each service can be enabled or disabled using the toggle switch</li>
              <li>• Configure automatic actions and notifications for each service</li>
              <li>• View detailed features and capabilities by clicking "Learn More"</li>
              <li>• Services are automatically monitored once enabled</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="configuration">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuring Services
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Customize action preferences for automated responses</li>
              <li>• Set up email and dashboard notifications</li>
              <li>• Configure IP and device blocking rules</li>
              <li>• Adjust risk thresholds and sensitivity levels</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Managing Notifications
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Choose between email and dashboard notifications</li>
              <li>• Set up custom notification rules for each service</li>
              <li>• Configure notification frequency and priority</li>
              <li>• Receive real-time alerts for critical events</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};