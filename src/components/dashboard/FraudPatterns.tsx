import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Pattern {
  type: string;
  count: number;
  description: string;
}

export const FraudPatterns = () => {
  const { data: patterns } = useQuery({
    queryKey: ["fraud-patterns"],
    queryFn: async () => {
      console.log("Analyzing fraud patterns...");
      const { data: fraudulent, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('is_fraudulent', true)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Analyze patterns
      const cardNotPresentCount = fraudulent?.filter(t => !t.card_present).length || 0;
      const recurringCount = fraudulent?.filter(t => t.recurring).length || 0;
      const highRiskCount = fraudulent?.filter(t => t.risk_score >= 80).length || 0;

      const patterns: Pattern[] = [
        {
          type: "Card Not Present",
          count: cardNotPresentCount,
          description: "Fraudulent transactions without physical card presence"
        },
        {
          type: "Recurring",
          count: recurringCount,
          description: "Fraud detected in recurring transactions"
        },
        {
          type: "High Risk Score",
          count: highRiskCount,
          description: "Transactions with risk score >= 80"
        }
      ];

      return patterns.sort((a, b) => b.count - a.count);
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Fraud Pattern Analysis</h3>
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-4">
          {patterns?.map((pattern, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{pattern.type}</span>
                <Badge variant="secondary">{pattern.count} cases</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{pattern.description}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};