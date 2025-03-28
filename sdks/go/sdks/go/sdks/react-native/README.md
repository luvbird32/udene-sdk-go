
# @udene/react-native-sdk

A comprehensive fraud detection and security package for React Native applications.

## Installation

```sh
npm install @udene/react-native-sdk
# or
yarn add @udene/react-native-sdk
```

## Usage

### Basic Usage with Provider

```jsx
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
```

### Direct Client Usage

```jsx
import { UdeneClient } from '@udene/react-native-sdk';

// Initialize the client
const client = new UdeneClient({
  apiKey: 'your_api_key',
  // Optional parameters
  baseURL: 'https://custom-api.example.com',
  platform: 'ios' // For explicitly setting platform
});

// Get fraud metrics
const metrics = await client.getMetrics();

// Track user interaction
await client.trackInteraction({
  userId: 'user_123',
  action: 'login',
  metadata: {
    ipAddress: '192.168.1.1',
    deviceId: 'device_456'
  }
});
```

## API Reference

### UdeneClient

The main client for accessing fraud detection services.

#### Methods

- `getMetrics()` - Get fraud metrics for the current user/device
- `getActivity()` - Get activity data for analysis
- `trackInteraction(data)` - Track a user interaction for fraud analysis
- `analyzeBEC(emailData)` - Analyze an email for Business Email Compromise (BEC) threats

### FraudProvider

React context provider for fraud detection services.

#### Props

- `apiKey` (required) - Your API key for the fraud detection service
- `baseURL` (optional) - Custom API base URL if needed
- `children` (required) - Child components

### useFraud

React hook for accessing fraud detection functionality within components.

#### Returns

- `client` - The UdeneClient instance
- `trackInteraction` - Function to track user interactions
- `getMetrics` - Function to get fraud metrics

## License

MIT
