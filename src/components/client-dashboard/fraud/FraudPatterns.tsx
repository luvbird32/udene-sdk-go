import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PatternCard } from "./PatternCard";
import { analyzeFraudPatterns } from "@/utils/fraudPatternAnalysis";
import type { TransactionWithPatterns } from "@/types/fraud";

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

      return analyzeFraudPatterns(fraudulent as TransactionWithPatterns[]);
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

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Fraud Pattern Analysis</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {patterns?.map((pattern, index) => (
            <PatternCard key={index} pattern={pattern} />
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