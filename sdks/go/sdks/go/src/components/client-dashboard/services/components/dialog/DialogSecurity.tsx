import { Lock } from "lucide-react";

export const DialogSecurity = () => {
  return (
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
  );
};