
import { Check } from "lucide-react";

interface PricingFeaturesProps {
  features: string[];
}

export const PricingFeatures = ({ features }: PricingFeaturesProps) => {
  return (
    <ul className="space-y-3 mb-8">
      {features?.map((feature, idx) => (
        <li key={idx} className="flex items-center text-gray-300 text-sm">
          <Check className="w-5 h-5 text-secondary mr-3" />
          {feature}
        </li>
      ))}
    </ul>
  );
};
