import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WebhookDescriptionProps {
  description: string;
  onChange: (description: string) => void;
}

export const WebhookDescription = ({ description, onChange }: WebhookDescriptionProps) => {
  return (
    <div>
      <Label htmlFor="description" className="text-white/80">Description (optional)</Label>
      <Textarea
        id="description"
        placeholder="Describe the purpose of this webhook"
        value={description}
        onChange={(e) => onChange(e.target.value)}
        className="text-white bg-black/30 placeholder:text-white/50"
      />
    </div>
  );
};