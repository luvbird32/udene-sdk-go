import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface VerificationStatsProps {
  totalVerifications: number;
}

export const VerificationStats = ({ totalVerifications }: VerificationStatsProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-white/60" />
        <h3 className="font-semibold text-white">Identity Verification Status</h3>
      </div>
      <Badge variant="outline">
        {totalVerifications} Total
      </Badge>
    </div>
  );
};