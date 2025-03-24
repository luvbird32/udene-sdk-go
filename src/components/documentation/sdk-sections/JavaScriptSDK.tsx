
import { CodeBlock } from "../code-block/CodeBlock";

export const JavaScriptSDK = () => {
  const jsCode = `// Install the SDK
npm install @udene/sdk

// Initialize the client
import { UdeneClient } from '@udene/sdk';
const client = new UdeneClient('your_api_key');

// Example: Get fraud metrics
const metrics = await client.getMetrics();
console.log(\`Current risk score: \${metrics.riskScore}\`);

// Example: Track user interaction
await client.trackInteraction({
    userId: 'user_123',
    action: 'login',
    metadata: {
        ipAddress: '192.168.1.1',
        deviceId: 'device_456'
    }
});

// Example: Analyze a transaction
const result = await client.analyzeTransaction({
    amount: 1000,
    currency: 'USD',
    userId: 'user_123',
    paymentMethod: 'credit_card'
});`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">JavaScript</h4>
      <p className="text-sm text-muted-foreground">
        Our JavaScript SDK works in both browser and Node.js environments, providing a consistent API 
        for fraud detection across your entire stack.
      </p>
      <CodeBlock code={jsCode} language="javascript" />
    </div>
  );
};
