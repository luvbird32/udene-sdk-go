import { Card } from "@/components/ui/card";
import { useRewardProgramData } from "@/hooks/useRewardProgramData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

export const RewardProgramMonitoring = () => {
  const { data, isLoading } = useRewardProgramData();

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Reward Program Protection</h3>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading reward data...</p>
        </div>
      </Card>
    );
  }

  const chartData = data ? Object.entries(data.programTypes).map(([name, value]) => ({
    name,
    value
  })) : [];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Reward Program Protection</h3>
        </div>
        <Badge variant="outline">Last 100 Transactions</Badge>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};