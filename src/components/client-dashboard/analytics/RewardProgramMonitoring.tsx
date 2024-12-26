import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Gift, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface RewardProgramData {
  name: string;
  value: number;
}

export const RewardProgramMonitoring = () => {
  const { toast } = useToast();
  const { data, isLoading, error } = useQuery<Record<string, number>>({
    queryKey: ["reward-program-stats"],
    queryFn: async () => {
      console.log("Fetching reward program statistics...");
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.error("No user found");
          throw new Error("No user found");
        }

        const { data: rewards, error } = await supabase
          .from('rewards_transactions')
          .select('program_type, points_earned')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) {
          console.error("Error fetching rewards data:", error);
          throw error;
        }

        console.log(`Processing ${rewards?.length || 0} reward transactions`);

        // Aggregate data by program type
        const programTypes = rewards?.reduce((acc: Record<string, number>, curr) => {
          const type = curr.program_type || 'Unknown';
          acc[type] = (acc[type] || 0) + (curr.points_earned || 0);
          return acc;
        }, {});

        console.log("Reward program statistics calculated successfully");
        return programTypes;
      } catch (error) {
        console.error("Error in reward program statistics calculation:", error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Failed to fetch reward program statistics:", error);
        toast({
          title: "Error",
          description: "Failed to load reward program data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

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
    return (
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Reward Program Protection</h3>
          </div>
          <Badge variant="outline">No Data Available</Badge>
        </div>
        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
          No reward program data available
        </div>
      </Card>
    );
  }

  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value
  }));

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