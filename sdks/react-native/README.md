
# Udene React Native SDK

A powerful fraud detection and security monitoring SDK for React Native applications.

## Installation

```bash
npm install @udene/react-native-sdk axios
# or
yarn add @udene/react-native-sdk axios
```

## Quick Start

```jsx
import { FraudProvider, useFraud } from '@udene/react-native-sdk';

// Wrap your app with FraudProvider
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
    // Track user interaction
    trackInteraction({
      action: 'view_product',
      metadata: { productId: '123' }
    });
    
    // Get risk metrics
    getMetrics().then(metrics => {
      console.log('Risk score:', metrics.riskScore);
    });
  }, []);
  
  return <View>...</View>;
}
```

## Features

- Real-time fraud detection
- User behavior tracking
- Risk metrics analysis
- Device fingerprinting
- Secure API communication

## Documentation

For full documentation, visit [https://udene.net/docs/sdk/react-native](https://udene.net/docs/sdk/react-native)

## License

MIT
