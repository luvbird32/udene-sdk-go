import { Info } from "lucide-react";

export const InvestigationInfo = () => {
  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div className="space-y-2">
          <h3 className="font-medium text-foreground">About Investigation Logs</h3>
          <p className="text-sm text-muted-foreground">
            Investigation logs help you track and document security investigations, fraud analysis, and compliance reviews. 
            Each log includes:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside ml-4 space-y-1">
            <li>Investigation type and current status</li>
            <li>Detailed findings and observations</li>
            <li>Sanitization steps taken</li>
            <li>Manual actions performed</li>
            <li>Timestamps for audit trails</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            Use the "New Investigation" button to create a new log when starting an investigation.
          </p>
        </div>
      </div>
    </div>
  );
};