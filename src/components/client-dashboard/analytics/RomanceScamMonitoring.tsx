/**
 * RomanceScamMonitoring Component
 * 
 * Visualizes and analyzes potential romance scam activities through a pie chart.
 * This component helps identify and track:
 * - Distribution of risk levels across user interactions
 * - Patterns in suspicious romantic relationships
 * - Potential financial exploitation attempts
 */
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartCrack } from "lucide-react";
import { LoadingState } from "./romance-scam/LoadingState";
import { RomanceScamChart } from "./romance-scam/RomanceScamChart";
import { useRomanceScamData } from "./romance-scam/useRomanceScamData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const RomanceScamMonitoring = () => {
  const { data, isLoading, error } = useRomanceScamData();

  if (error) {
    return (
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <HeartCrack className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold">Romance Scam Analysis</h3>
          </div>
          <Badge variant="outline">Last 100 Interactions</Badge>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load romance scam data: {error.message}
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  const chartData = data ? Object.entries(data.riskLevels).map(([name, value]) => ({
    name,
    value: value as number
  })) : [];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <HeartCrack className="h-5 w-5 text-destructive" />
          <h3 className="font-semibold">Romance Scam Analysis</h3>
        </div>
        <Badge variant="outline">Last 100 Interactions</Badge>
      </div>
      <RomanceScamChart data={chartData} />
    </Card>
  );
};