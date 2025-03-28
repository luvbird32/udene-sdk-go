import { Badge } from "@/components/ui/badge";

export const ReferralHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Referral Fraud Risk Distribution</h3>
      <Badge variant="outline">Last 100 Referrals</Badge>
    </div>
  );
};