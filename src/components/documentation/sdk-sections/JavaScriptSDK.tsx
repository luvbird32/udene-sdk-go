import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const JavaScriptSDK = () => {
  const { toast } = useToast();
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopyCode = (code: string, snippetId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(snippetId);
    toast({
      title: "Code copied",
      description: "The code snippet has been copied to your clipboard",
    });
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const jsCode = `// Install the SDK
npm install @fraud/js-sdk

// Initialize the client
import { FraudClient } from '@fraud/js-sdk';
const client = new FraudClient('your_api_key');

// Example: Get fraud metrics
const metrics = await client.getMetrics();
console.log('Current risk score:', metrics.riskScore);

// Example: Track user interaction
await client.trackInteraction({
  userId: 'user_123',
  action: 'login',
  metadata: {
    ipAddress: '192.168.1.1',
    deviceId: 'device_456'
  }
});`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">JavaScript/TypeScript</h4>
      <div className="relative">
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code className="text-sm font-mono">{jsCode}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => handleCopyCode(jsCode, 'js')}
        >
          {copiedSnippet === 'js' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};