import { memo } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DatabaseTransaction } from "@/types/transactions";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TransactionItemProps {
  transaction: DatabaseTransaction;
}

export const TransactionItem = memo(function TransactionItem({ transaction }: TransactionItemProps) {
  const { toast } = useToast();
  
  // Decrypt amount for display
  const decryptAmount = async (encrypted: string | null, iv: string | null) => {
    if (!encrypted || !iv) return "N/A";
    try {
      const { data, error } = await supabase.rpc('decrypt_sensitive_data', {
        encrypted_data: encrypted,
        iv: iv
      });
      
      if (error) throw error;
      return Number(data).toLocaleString();
    } catch (error) {
      console.error("Error decrypting amount:", error);
      toast({
        title: "Error",
        description: "Could not decrypt transaction amount",
        variant: "destructive",
      });
      return "Error";
    }
  };

  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
    >
      <div>
        <p className="font-medium">
          ${transaction.amount_encrypted ? decryptAmount(transaction.amount_encrypted, transaction.amount_iv) : "N/A"}
        </p>
        <p className="text-sm text-muted-foreground">
          {transaction.created_at 
            ? format(new Date(transaction.created_at), 'MMM d, yyyy HH:mm') 
            : 'Unknown date'}
        </p>
      </div>
      <Badge 
        variant={transaction.is_fraudulent ? "destructive" : "secondary"}
      >
        {transaction.is_fraudulent ? "Flagged" : "Clear"}
      </Badge>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.transaction.id === nextProps.transaction.id &&
    prevProps.transaction.amount_encrypted === nextProps.transaction.amount_encrypted &&
    prevProps.transaction.is_fraudulent === nextProps.transaction.is_fraudulent
  );
});