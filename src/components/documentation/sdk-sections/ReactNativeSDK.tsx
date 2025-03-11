
import { CodeBlock } from "../code-block/CodeBlock";

export const ReactNativeSDK = () => {
  const rnCode = `// React Native SDK is under development
// Basic usage will be similar to:

import { FraudClient } from '@fraud/react-native-sdk';

// Initialize the client
const client = new FraudClient({
  apiKey: 'your_api_key'
});

// Track interactions
client.trackInteraction({
  action: 'view_product',
  metadata: { productId: '123' }
});

// Get metrics
const metrics = await client.getMetrics();`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">React Native (Under Development)</h4>
      <CodeBlock code={rnCode} language="javascript" />
    </div>
  );
};
