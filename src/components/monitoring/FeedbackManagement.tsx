import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tables } from "@/integrations/supabase/types/database";

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
          <CardTitle className="text-white">False Positive Management</CardTitle>
          <CardDescription className="text-white/60">Loading flagged transactions...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white">False Positive Management</CardTitle>
        <CardDescription className="text-white/60">Review and manage flagged transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flaggedTransactions?.length === 0 ? (
            <p className="text-white/60">No flagged transactions to review.</p>
          ) : (
            flaggedTransactions?.map((transaction: any) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium text-white">
                    Transaction ID: {transaction.id.slice(0, 8)}...
                  </p>
                  <p className="text-sm text-white/60">
                    Amount: ${transaction.amount}
                  </p>
                  <p className="text-sm text-white/60">
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
                    <div className="space-y-4 py-4">
                      <RadioGroup
                        value={feedbackStatus}
                        onValueChange={setFeedbackStatus}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="confirmed_fraud" id="confirmed_fraud" />
                          <Label htmlFor="confirmed_fraud">Confirm Fraud</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="confirmed_legitimate"
                            id="confirmed_legitimate"
                          />
                          <Label htmlFor="confirmed_legitimate">Mark as Legitimate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="appealed" id="appealed" />
                          <Label htmlFor="appealed">Under Appeal</Label>
                        </div>
                      </RadioGroup>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any relevant notes about this transaction..."
                          value={feedbackNotes}
                          onChange={(e) => setFeedbackNotes(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
                    </DialogFooter>
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
