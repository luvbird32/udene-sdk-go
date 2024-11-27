import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

export const ApiKeyGenerator = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();

  const generateApiKey = () => {
    // Generate a random API key with a prefix
    const key = 'fraud_' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 32);
    
    setApiKey(key);
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated. Make sure to copy it now - you won't be able to see it again!",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">API Key Management</h3>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={generateApiKey} variant="default">
            Generate New API Key
          </Button>
        </div>
        
        {apiKey && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Copy your API key now. You won't be able to see it again!
            </p>
            <div className="flex gap-2">
              <Input
                value={apiKey}
                readOnly
                className="font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};