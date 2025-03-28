import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DatabaseTransaction } from "@/types/transactions";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, memo } from "react";

interface TransactionItemProps {
  transaction: DatabaseTransaction;
}

export const TransactionItem = memo(function TransactionItem({ transaction }: TransactionItemProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("Loading...");
  
  useEffect(() => {
    const decryptAmount = async () => {
      if (!transaction.amount_encrypted || !transaction.amount_iv) {
        setAmount("N/A");
        return;
      }

      try {
        const { data, error } = await supabase.rpc('decrypt_sensitive_data', {
          encrypted_data: transaction.amount_encrypted,
          iv: transaction.amount_iv
        });
        
        if (error) throw error;
        setAmount(Number(data).toLocaleString());
      } catch (error) {
        console.error("Error decrypting amount:", error);
        toast({
          title: "Error",
          description: "Could not decrypt transaction amount",
          variant: "destructive",
        });
        setAmount("Error");
      }
    };

    decryptAmount();
  }, [transaction.amount_encrypted, transaction.amount_iv, toast]);

  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
    >
      <div>
        <p className="font-medium">${amount}</p>
        <p className="text-sm text-muted-foreground">
          {transaction.created_at 
            ? format(new Date(transaction.created_at), 'MMM d, yyyy HH:mm') 
            : 'Unknown date'}
        </p>
      </div>
      {transaction.is_fraudulent && (
        <Badge variant="destructive">Fraudulent</Badge>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.transaction.id === nextProps.transaction.id &&
    prevProps.transaction.amount_encrypted === nextProps.transaction.amount_encrypted &&
    prevProps.transaction.is_fraudulent === nextProps.transaction.is_fraudulent
  );
});