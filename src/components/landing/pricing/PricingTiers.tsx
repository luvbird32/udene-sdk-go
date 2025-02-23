
import { Shield } from "lucide-react";

interface PricingTiersProps {
  tiers: string[];
}

export const PricingTiers = ({ tiers }: PricingTiersProps) => {
  if (!tiers || tiers.length === 0) return null;

  return (
    <div className="mb-6 bg-black/20 rounded-lg p-4">
      <p className="text-sm font-semibold text-gray-200 mb-3">Volume Pricing:</p>
      <ul className="space-y-2">
        {tiers.map((tier, idx) => (
          <li key={idx} className="text-sm text-gray-300 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-secondary" />
            {tier}
          </li>
        ))}
      </ul>
    </div>
  );
};
