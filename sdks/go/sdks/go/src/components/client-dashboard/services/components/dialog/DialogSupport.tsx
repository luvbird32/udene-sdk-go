import { Clock } from "lucide-react";

export const DialogSupport = () => {
  return (
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
  );
};