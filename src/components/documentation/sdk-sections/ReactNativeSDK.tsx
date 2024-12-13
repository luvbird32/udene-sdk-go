import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ReactNativeSDK = () => {
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

  const rnCode = `// Install the SDK
npm install @fraud/react-native-sdk

// Initialize the client
import { FraudClient } from '@fraud/react-native-sdk';

const client = new FraudClient({
  apiKey: 'your_api_key',
  platform: Platform.OS
});

// Example: Get fraud metrics
const metrics = await client.getMetrics();
console.log('Current risk score:', metrics.riskScore);

// Example: Track user interaction with device info
await client.trackInteraction({
  userId: 'user_123',
  action: 'login',
  metadata: {
    // Device info is automatically collected
    customData: 'your-custom-data'
  }
});

// Example: Analyze Business Email Compromise
const emailAnalysis = await client.analyzeBEC({
  sender: 'suspicious@example.com',
  subject: 'Urgent wire transfer',
  content: 'Email content here'
});`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">React Native</h4>
      <div className="relative">
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code className="text-sm font-mono">{rnCode}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => handleCopyCode(rnCode, 'rn')}
        >
          {copiedSnippet === 'rn' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};