import { CodeBlock } from "../code-block/CodeBlock";

const metricsCode = `curl -X GET "https://api.example.com/v1/metrics" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`;

const activityCode = `curl -X GET "https://api.example.com/v1/activity" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`;

const trackCode = `curl -X POST "https://api.example.com/v1/track" \\
  -H "Authorization: Bearer $FRAUD_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123",
    "action": "login",
    "metadata": {
      "ipAddress": "192.168.1.1",
      "deviceId": "device_456"
    }
  }'`;

export const EndpointsSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">API Endpoints</h3>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-lg font-semibold mb-2">GET /api/v1/metrics</h4>
          <p className="text-muted-foreground mb-4">Retrieve fraud detection metrics and statistics</p>
          <CodeBlock code={metricsCode} />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">GET /api/v1/activity</h4>
          <p className="text-muted-foreground mb-4">Get recent fraud events and suspicious activities</p>
          <CodeBlock code={activityCode} />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">POST /api/v1/track</h4>
          <p className="text-muted-foreground mb-4">Track and analyze user interactions in real-time</p>
          <CodeBlock code={trackCode} />
        </div>
      </div>
    </div>
  );
};