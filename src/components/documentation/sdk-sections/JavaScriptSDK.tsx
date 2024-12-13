import { CodeBlock } from "../code-block/CodeBlock";

export const JavaScriptSDK = () => {
  const jsCode = `// Install the SDK
npm install fraud-sdk

// Initialize the client
import { FraudClient } from 'fraud-sdk';
const client = new FraudClient('your_api_key');

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
});`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">JavaScript</h4>
      <CodeBlock code={jsCode} language="javascript" />
    </div>
  );
};