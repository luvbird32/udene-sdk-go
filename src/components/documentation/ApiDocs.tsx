import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Code, BookOpen, Link, Info, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ApiDocs = () => {
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

  const CodeBlock = ({ code, snippetId }: { code: string; snippetId: string }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-md overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={() => handleCopyCode(code, snippetId)}
      >
        {copiedSnippet === snippetId ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6" />
        <h2 className="text-2xl font-bold">API Documentation</h2>
      </div>
      
      <Tabs defaultValue="quickstart" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quickstart">
            <Info className="h-4 w-4 mr-2" />
            Quick Start
          </TabsTrigger>
          <TabsTrigger value="authentication">
            <Link className="h-4 w-4 mr-2" />
            Authentication
          </TabsTrigger>
          <TabsTrigger value="endpoints">
            <Code className="h-4 w-4 mr-2" />
            Endpoints
          </TabsTrigger>
          <TabsTrigger value="sdks">
            <BookOpen className="h-4 w-4 mr-2" />
            SDKs
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[600px] pr-4">
          <TabsContent value="quickstart" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Start Guide</h3>
              <p className="text-muted-foreground">
                Get started with our Fraud Detection API in minutes. First, set up your API key:
              </p>
              
              <CodeBlock 
                snippetId="quick-start"
                code={`# Set your API key as an environment variable
export FRAUD_API_KEY=your_api_key_here

# Make your first API request
curl -X GET "https://api.example.com/v1/metrics" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`}
              />
              
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold">Technology Stack</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>API Framework: Python (FastAPI)</li>
                  <li>Machine Learning: TensorFlow, PyTorch</li>
                  <li>Database: Supabase (PostgreSQL)</li>
                  <li>Caching: Redis</li>
                  <li>Message Queue: Apache Kafka</li>
                  <li>Monitoring: Prometheus, Grafana</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Authentication</h3>
              <p className="text-muted-foreground">
                All API requests require Bearer token authentication using your API key:
              </p>
              
              <CodeBlock 
                snippetId="auth"
                code={`Authorization: Bearer your_api_key_here`}
              />
              
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold">Rate Limits</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standard Plan: 100 requests per minute</li>
                  <li>Enterprise Plan: 1000 requests per minute</li>
                  <li>Burst Limit: 200 requests per 10 seconds</li>
                </ul>
                
                <div className="bg-muted p-4 rounded-md mt-4">
                  <h5 className="font-semibold mb-2">Rate Limit Headers</h5>
                  <pre className="text-sm">
                    X-RateLimit-Limit: 100
                    X-RateLimit-Remaining: 95
                    X-RateLimit-Reset: 1614556800
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">API Endpoints</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold mb-2">GET /api/v1/metrics</h4>
                  <p className="text-muted-foreground mb-4">Retrieve fraud detection metrics and statistics</p>
                  <CodeBlock 
                    snippetId="metrics"
                    code={`curl -X GET "https://api.example.com/v1/metrics" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">GET /api/v1/activity</h4>
                  <p className="text-muted-foreground mb-4">Get recent fraud events and suspicious activities</p>
                  <CodeBlock 
                    snippetId="activity"
                    code={`curl -X GET "https://api.example.com/v1/activity" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">POST /api/v1/track</h4>
                  <p className="text-muted-foreground mb-4">Track and analyze user interactions in real-time</p>
                  <CodeBlock 
                    snippetId="track"
                    code={`curl -X POST "https://api.example.com/v1/track" \\
  -H "Authorization: Bearer $FRAUD_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123",
    "action": "login",
    "metadata": {
      "ipAddress": "192.168.1.1",
      "deviceId": "device_456"
    }
  }'`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sdks" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">SDK Examples</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold mb-2">JavaScript/TypeScript</h4>
                  <CodeBlock 
                    snippetId="js-sdk"
                    code={`import { FraudClient } from '@fraud/js-sdk';

const client = new FraudClient('your_api_key');

// Get fraud metrics
const metrics = await client.getMetrics();
console.log('Current risk score:', metrics.riskScore);

// Track user interaction
await client.trackInteraction({
  userId: 'user_123',
  action: 'login',
  metadata: {
    ipAddress: '192.168.1.1',
    deviceId: 'device_456'
  }
});`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Python</h4>
                  <CodeBlock 
                    snippetId="python-sdk"
                    code={`from fraud_sdk import FraudClient

client = FraudClient('your_api_key')

# Get fraud metrics
metrics = client.get_metrics()
print(f"Current risk score: {metrics['risk_score']}")

# Track user interaction
client.track_interaction(
    user_id='user_123',
    action='login',
    metadata={
        'ip_address': '192.168.1.1',
        'device_id': 'device_456'
    }
)`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};