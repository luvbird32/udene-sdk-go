import { CheckCircle2 } from "lucide-react";

interface DialogFeaturesProps {
  features: string[];
}

export const DialogFeatures = ({ features }: DialogFeaturesProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        Key Features
      </h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};