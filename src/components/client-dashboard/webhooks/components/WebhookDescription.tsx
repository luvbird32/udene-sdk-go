import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WebhookDescriptionProps {
  description: string;
  onChange: (description: string) => void;
}

export const WebhookDescription = ({ description, onChange }: WebhookDescriptionProps) => {
  return (
    <div>
      <Label htmlFor="description">Description (optional)</Label>
      <Textarea
        id="description"
        placeholder="Describe the purpose of this webhook"
        value={description}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};