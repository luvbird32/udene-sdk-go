
import { Sparkles, TrendingUp, Clock } from "lucide-react";

interface PricingPromoProps {
  promotion: string;
  savings?: string;
  volumeDiscount: string;
}

export const PricingPromo = ({ promotion, savings, volumeDiscount }: PricingPromoProps) => {
  return (
    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6 space-y-2">
      <p className="text-sm text-secondary flex items-center">
        <Sparkles className="w-4 h-4 mr-2" />
        {promotion}
      </p>
      {savings && (
        <p className="text-sm text-secondary flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          {savings}
        </p>
      )}
      <p className="text-sm text-secondary flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        {volumeDiscount}
      </p>
    </div>
  );
};
