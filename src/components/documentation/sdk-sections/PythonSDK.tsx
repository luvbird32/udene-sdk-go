import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const PythonSDK = () => {
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

  const pythonCode = `# Install the SDK
pip install fraud-sdk

# Initialize the client
from fraud_sdk import FraudClient
client = FraudClient('your_api_key')

# Example: Get fraud metrics
metrics = client.get_metrics()
print(f"Current risk score: {metrics['risk_score']}")

# Example: Track user interaction
client.track_interaction(
    user_id='user_123',
    action='login',
    metadata={
        'ip_address': '192.168.1.1',
        'device_id': 'device_456'
    }
)`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Python</h4>
      <div className="relative">
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code className="text-sm font-mono">{pythonCode}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => handleCopyCode(pythonCode, 'python')}
        >
          {copiedSnippet === 'python' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};