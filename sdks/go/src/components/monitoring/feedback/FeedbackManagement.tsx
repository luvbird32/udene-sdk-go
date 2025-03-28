import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FeedbackForm } from "./FeedbackForm";

export const FeedbackManagement = () => {
  const { toast } = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: flaggedTransactions, isLoading } = useQuery({
    queryKey: ["flagged-transactions"],
    queryFn: async () => {
      console.log("Fetching flagged transactions...");
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("is_fraudulent", true)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  const handleSubmitFeedback = async () => {
    try {
      const { error } = await supabase
        .from("transactions")
        .update({
          feedback_status: feedbackStatus,
          feedback_notes: feedbackNotes,
          appeal_timestamp: feedbackStatus === "appealed" ? new Date().toISOString() : null,
        })
        .eq("id", selectedTransaction.id);

      if (error) throw error;

      if (feedbackStatus === "confirmed_legitimate") {
        const { error: whitelistError } = await supabase
          .from("whitelist")
          .insert({
            entity_type: "customer",
            entity_id: selectedTransaction.customer_id,
            reason: `Confirmed legitimate transaction ${selectedTransaction.id}`,
          });

        if (whitelistError) throw whitelistError;
      }

      toast({
        title: "Feedback submitted",
        description: "The transaction has been updated with your feedback.",
      });

      setIsDialogOpen(false);
      setSelectedTransaction(null);
      setFeedbackNotes("");
      setFeedbackStatus("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>False Positive Management</CardTitle>
          <CardDescription>Loading flagged transactions...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>False Positive Management</CardTitle>
        <CardDescription>Review and manage flagged transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flaggedTransactions?.length === 0 ? (
            <p className="text-muted-foreground">No flagged transactions to review.</p>
          ) : (
            flaggedTransactions?.map((transaction: any) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    Transaction ID: {transaction.id.slice(0, 8)}...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Amount: ${transaction.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: {transaction.feedback_status || "Pending Review"}
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Transaction Review</DialogTitle>
                      <DialogDescription>
                        Provide feedback for this flagged transaction
                      </DialogDescription>
                    </DialogHeader>
                    <FeedbackForm 
                      feedbackStatus={feedbackStatus}
                      setFeedbackStatus={setFeedbackStatus}
                      feedbackNotes={feedbackNotes}
                      setFeedbackNotes={setFeedbackNotes}
                      onSubmit={handleSubmitFeedback}
                      onCancel={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};