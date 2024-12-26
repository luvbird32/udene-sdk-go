import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { TransactionList } from "./TransactionList";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const TransactionHistory = () => {
  const { toast } = useToast();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  
  const fetchTransactions = useCallback(async () => {
    if (!user) {
      throw new Error("Authentication required");
    }

    console.log("Fetching recent transactions...");
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }

    console.log("Transactions fetched:", data);
    return data;
  }, [user]);

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["recent-transactions", user?.id],
    queryFn: fetchTransactions,
    enabled: !!user,
    refetchInterval: 30000,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Transaction fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load transaction history. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  if (userLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading user data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please log in to view transaction history.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading transactions...</p>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load transactions. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (!transactions || transactions.length === 0) && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}

        {!isLoading && !error && transactions && transactions.length > 0 && (
          <TransactionList 
            transactions={transactions} 
            isLoading={isLoading}
          />
        )}
      </Card>
    </ErrorBoundary>
  );
};