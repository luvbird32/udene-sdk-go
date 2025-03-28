import { Settings } from "lucide-react";

export const DialogImplementation = () => {
  return (
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
  );
};