import { Card } from "@/components/ui/card";
import { ReferralChart } from "./referral/ReferralChart";
import { ReferralHeader } from "./referral/ReferralHeader";
import { ReferralLoadingState } from "./referral/ReferralLoadingState";
import { ReferralErrorState } from "./referral/ReferralErrorState";
import { ReferralEmptyState } from "./referral/ReferralEmptyState";
import { useReferralStats } from "./referral/useReferralStats";

export const ReferralFraudMonitoring = () => {
  const { data: referralStats, isLoading, error } = useReferralStats();

  if (error) {
    return <ReferralErrorState />;
  }

  if (isLoading) {
    return <ReferralLoadingState />;
  }

  if (!referralStats || referralStats.length === 0) {
    return <ReferralEmptyState />;
  }

  return (
    <Card className="p-4">
      <ReferralHeader />
      <ReferralChart data={referralStats} />
    </Card>
  );
};