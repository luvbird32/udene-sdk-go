import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ApiDocs = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">API Documentation</h2>
      
      <Tabs defaultValue="quickstart" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[600px] pr-4">
          <TabsContent value="quickstart">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Start Guide</h3>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  {`export FRAUD_API_KEY=your_api_key_here
curl -X GET "https://api.example.com/v1/metrics" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`}
                </pre>
              </div>
              
              <h4 className="text-lg font-semibold mt-6">Technology Stack</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>API Framework: Python (FastAPI)</li>
                <li>Machine Learning: TensorFlow, PyTorch</li>
                <li>Database: Cassandra, MongoDB</li>
                <li>Caching: Redis</li>
                <li>Message Queue: Apache Kafka</li>
                <li>Monitoring: Prometheus, Grafana</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="authentication">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Authentication</h3>
              <p>All API requests require Bearer token authentication:</p>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  Authorization: Bearer your_api_key_here
                </pre>
              </div>
              
              <h4 className="text-lg font-semibold mt-6">Rate Limits</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Standard: 100 req/min</li>
                <li>Enterprise: 1000 req/min</li>
                <li>Burst: 200 req/10s</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="endpoints">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">API Endpoints</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold">GET /api/v1/metrics</h4>
                  <p className="text-muted-foreground">Retrieve fraud detection metrics</p>
                  <div className="bg-muted p-4 rounded-md mt-2">
                    <pre className="text-sm">
                      {`curl -X GET "https://api.example.com/v1/metrics" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold">GET /api/v1/activity</h4>
                  <p className="text-muted-foreground">Get recent fraud events</p>
                  <div className="bg-muted p-4 rounded-md mt-2">
                    <pre className="text-sm">
                      {`curl -X GET "https://api.example.com/v1/activity" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold">POST /api/v1/track</h4>
                  <p className="text-muted-foreground">Track user interaction</p>
                  <div className="bg-muted p-4 rounded-md mt-2">
                    <pre className="text-sm">
                      {`curl -X POST "https://api.example.com/v1/track" \\
  -H "Authorization: Bearer $FRAUD_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"userId": "123", "action": "login"}'`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sdks">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">SDK Examples</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold">JavaScript/TypeScript</h4>
                  <div className="bg-muted p-4 rounded-md mt-2">
                    <pre className="text-sm">
                      {`import { FraudClient } from '@fraud/js-sdk';
const client = new FraudClient('your_api_key');
const metrics = await client.getMetrics();`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold">Python</h4>
                  <div className="bg-muted p-4 rounded-md mt-2">
                    <pre className="text-sm">
                      {`from fraud_sdk import FraudClient
client = FraudClient('your_api_key')
metrics = client.get_metrics()`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold">Java</h4>
                  <div className="bg-muted p-4 rounded-md mt-2">
                    <pre className="text-sm">
                      {`import com.fraud.sdk.FraudClient;
FraudClient client = new FraudClient("your_api_key");
Metrics metrics = client.getMetrics();`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};