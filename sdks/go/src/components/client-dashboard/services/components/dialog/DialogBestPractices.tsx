import { AlertTriangle } from "lucide-react";

export const DialogBestPractices = () => {
  return (
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
  );
};