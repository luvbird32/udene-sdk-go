import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Info, MessageCircle, UserCog, Smartphone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const RiskFactorAnalysis = () => {
  const { data: latestTransaction, isLoading } = useQuery({
    queryKey: ["latest-flagged-transaction"],
    queryFn: async () => {
      console.log("Fetching latest flagged transaction...");
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      
      return data && data.length > 0 ? data[0] : null;
    },
    refetchInterval: 5000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (!latestTransaction) {
    return (
      <Card className="p-4">
        <Alert>
          <AlertDescription>
            No transactions available. New transactions will appear here automatically.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  const riskFactors = latestTransaction?.risk_factors || {};
  const featureImportance = latestTransaction?.feature_importance || {};
  const profileChanges = latestTransaction?.profile_changes || {};
  const interactionPatterns = latestTransaction?.interaction_patterns || {};
  
  // Transform data for the chart
  const chartData = Object.entries(featureImportance).map(([factor, importance]) => ({
    factor,
    importance: Number(importance) * 100
  })).sort((a, b) => b.importance - a.importance);

  // Dating-specific risk indicators
  const getDatingRiskIndicators = () => {
    const indicators = [];
    
    if (latestTransaction.message_velocity > 50) {
      indicators.push({
        icon: <MessageCircle className="w-4 h-4 mt-1 text-muted-foreground" />,
        title: "High Message Velocity",
        description: `Unusual messaging pattern detected: ${latestTransaction.message_velocity.toFixed(1)} messages/hour`
      });
    }
    
    if (Object.keys(profileChanges).length > 0) {
      indicators.push({
        icon: <UserCog className="w-4 h-4 mt-1 text-muted-foreground" />,
        title: "Frequent Profile Changes",
        description: "Multiple profile updates in short period"
      });
    }
    
    if (interactionPatterns.multiple_devices) {
      indicators.push({
        icon: <Smartphone className="w-4 h-4 mt-1 text-muted-foreground" />,
        title: "Multiple Device Usage",
        description: "Access from unusual number of devices"
      });
    }
    
    return indicators;
  };

  const datingRiskIndicators = getDatingRiskIndicators();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Risk Factor Analysis</h3>
        <Badge variant={latestTransaction?.risk_score >= 70 ? "destructive" : "secondary"}>
          Risk Score: {latestTransaction?.risk_score?.toFixed(1)}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Feature Importance</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="factor" width={100} />
                <Tooltip />
                <Bar dataKey="importance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Risk Explanations</h4>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {datingRiskIndicators.map((indicator, index) => (
                <div key={index} className="p-2 bg-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    {indicator.icon}
                    <div>
                      <p className="font-medium">{indicator.title}</p>
                      <p className="text-sm text-muted-foreground">{indicator.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              {Object.entries(riskFactors).map(([factor, explanation]) => (
                <div key={factor} className="p-2 bg-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{factor}</p>
                      <p className="text-sm text-muted-foreground">{explanation as string}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};