import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Pattern {
  type: string;
  count: number;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}

export const FraudPatterns = () => {
  const { data: patterns, error, isLoading } = useQuery({
    queryKey: ["fraud-patterns"],
    queryFn: async () => {
      console.log("Analyzing fraud patterns...");
      const { data: fraudulent, error } = await supabase
        .from('transactions')
        .select('*, interaction_patterns, risk_factors, profile_changes')
        .eq('is_fraudulent', true)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Analyze patterns with null checks
      const cardNotPresentCount = fraudulent?.filter(t => t.card_present === false).length || 0;
      const recurringCount = fraudulent?.filter(t => t.recurring === true).length || 0;
      const highRiskCount = fraudulent?.filter(t => (t.risk_score || 0) >= 80).length || 0;
      
      // New pattern analysis
      const multipleDevicesCount = fraudulent?.filter(t => 
        t.interaction_patterns?.multiple_devices === true
      ).length || 0;
      
      const rapidProfileChangesCount = fraudulent?.filter(t => 
        Object.keys(t.profile_changes || {}).length > 3
      ).length || 0;
      
      const unusualLocationCount = fraudulent?.filter(t => 
        t.risk_factors?.location_mismatch === true
      ).length || 0;
      
      const highVelocityCount = fraudulent?.filter(t => 
        (t.message_velocity || 0) > 50
      ).length || 0;
      
      const vpnUsageCount = fraudulent?.filter(t => 
        t.interaction_patterns?.vpn_detected === true
      ).length || 0;
      
      const oddHoursCount = fraudulent?.filter(t => {
        const hour = new Date(t.timestamp).getHours();
        return hour >= 1 && hour <= 5;
      }).length || 0;

      const patterns: Pattern[] = [
        {
          type: "Card Not Present",
          count: cardNotPresentCount,
          description: "Fraudulent transactions without physical card presence",
          severity: 'high'
        },
        {
          type: "Multiple Devices",
          count: multipleDevicesCount,
          description: "Access from unusual number of devices",
          severity: 'high'
        },
        {
          type: "Rapid Profile Changes",
          count: rapidProfileChangesCount,
          description: "Multiple profile updates in short period",
          severity: 'medium'
        },
        {
          type: "Unusual Location",
          count: unusualLocationCount,
          description: "Transactions from unexpected locations",
          severity: 'high'
        },
        {
          type: "High Message Velocity",
          count: highVelocityCount,
          description: "Unusually high message frequency",
          severity: 'medium'
        },
        {
          type: "VPN Usage",
          count: vpnUsageCount,
          description: "Transactions through VPN connections",
          severity: 'medium'
        },
        {
          type: "Odd Hours Activity",
          count: oddHoursCount,
          description: "Suspicious activity during 1-5 AM",
          severity: 'medium'
        },
        {
          type: "Recurring Fraud",
          count: recurringCount,
          description: "Fraud detected in recurring transactions",
          severity: 'high'
        },
        {
          type: "High Risk Score",
          count: highRiskCount,
          description: "Transactions with risk score >= 80",
          severity: 'high'
        }
      ];

      return patterns.sort((a, b) => b.count - a.count);
    },
    refetchInterval: 30000,
  });

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading fraud patterns: {error.message}
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Fraud Pattern Analysis</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  const getBadgeVariant = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Fraud Pattern Analysis</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {patterns?.map((pattern, index) => (
            <div key={index} className="space-y-2 p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium">{pattern.type}</span>
                <div className="flex gap-2 items-center">
                  {pattern.severity && (
                    <Badge variant={getBadgeVariant(pattern.severity)} className="capitalize">
                      {pattern.severity}
                    </Badge>
                  )}
                  <Badge variant="outline">{pattern.count} cases</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{pattern.description}</p>
            </div>
          ))}
          {(!patterns || patterns.length === 0) && (
            <div className="text-center text-muted-foreground py-4">
              No fraud patterns detected
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};