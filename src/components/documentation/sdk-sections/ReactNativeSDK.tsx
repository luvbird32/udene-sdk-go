
import { CodeBlock } from "../code-block/CodeBlock";

export const ReactNativeSDK = () => {
  const rnCode = `// Install the SDK
npm install @udene/react-native-sdk

// Initialize in your app
import { FraudProvider, useFraud } from '@udene/react-native-sdk';

// Wrap your app with the provider
export default function App() {
  return (
    <FraudProvider apiKey="your_api_key">
      <YourApp />
    </FraudProvider>
  );
}

// Use the hook in your components
function YourComponent() {
  const { trackInteraction, getMetrics } = useFraud();

  useEffect(() => {
    // Example: Track user interaction
    trackInteraction({
      action: 'view_product',
      metadata: { productId: '123' }
    });
  }, []);

  return <View>...</View>;
}

// Or use the client directly
import { UdeneClient } from '@udene/react-native-sdk';

const client = new UdeneClient({
  apiKey: 'your_api_key'
});

// Track a suspicious event
await client.trackInteraction({
  userId: 'user_123',
  action: 'failed_login_attempt',
  metadata: { attemptCount: 5 }
});`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">React Native</h4>
      <p className="text-sm text-muted-foreground">
        Our React Native SDK provides seamless integration with React Native applications, offering 
        both a hook-based API and direct client usage for comprehensive fraud detection and security.
      </p>
      <CodeBlock code={rnCode} language="javascript" />
    </div>
  );
};
