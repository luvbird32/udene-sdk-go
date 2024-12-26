import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RewardProgramHeader } from "./reward-program/RewardProgramHeader";
import { RewardProgramChart } from "./reward-program/RewardProgramChart";
import { RewardProgramEmptyState } from "./reward-program/RewardProgramEmptyState";
import { useRewardProgramData } from "./reward-program/useRewardProgramData";

export const RewardProgramMonitoring = () => {
  const { data, isLoading, error } = useRewardProgramData();

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load reward program data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Reward Program Protection</h3>
        <div className="h-[200px] animate-pulse bg-gray-100 rounded-lg"></div>
      </Card>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return <RewardProgramEmptyState />;
  }

  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <Card className="p-4">
      <RewardProgramHeader />
      <RewardProgramChart data={chartData} />
    </Card>
  );
};