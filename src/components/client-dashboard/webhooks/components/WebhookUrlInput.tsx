import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WebhookUrlInputProps {
  url: string;
  onChange: (url: string) => void;
}

export const WebhookUrlInput = ({ url, onChange }: WebhookUrlInputProps) => {
  return (
    <div>
      <Label htmlFor="url">Webhook URL</Label>
      <Input
        id="url"
        placeholder="https://your-domain.com/webhook"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono"
      />
    </div>
  );
};