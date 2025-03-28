import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackFormProps {
  feedbackStatus: string;
  setFeedbackStatus: (status: string) => void;
  feedbackNotes: string;
  setFeedbackNotes: (notes: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const FeedbackForm = ({
  feedbackStatus,
  setFeedbackStatus,
  feedbackNotes,
  setFeedbackNotes,
  onSubmit,
  onCancel
}: FeedbackFormProps) => {
  return (
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
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Submit Feedback</Button>
      </div>
    </div>
  );
};