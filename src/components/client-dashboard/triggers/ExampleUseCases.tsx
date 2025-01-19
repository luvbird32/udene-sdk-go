import { Info } from "lucide-react";

export const ExampleUseCases = () => {
  return (
    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-white/60" />
        <span className="text-sm font-medium text-white/60">Example Use Cases:</span>
      </div>
      <ul className="list-disc list-inside text-sm text-white/60 space-y-1 ml-4">
        <li>Block transactions when suspicious patterns are detected</li>
        <li>Send notifications when risk scores change significantly</li>
        <li>Automatically blacklist devices involved in fraudulent activities</li>
        <li>Track and alert on unusual location-based activities</li>
        <li>Monitor reward program abuse and suspicious point redemptions</li>
        <li>Get notified of significant email reputation changes</li>
        <li>Track ML model performance and retraining events</li>
        <li>Stay informed about compliance and privacy-related events</li>
      </ul>
    </div>
  );
};