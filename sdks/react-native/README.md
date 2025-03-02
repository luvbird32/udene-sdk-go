
# Udene React Native SDK

A powerful fraud detection and security monitoring SDK for React Native applications.

## Installation

```bash
npm install @udene/react-native-sdk
# or
yarn add @udene/react-native-sdk
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

## API Reference

### FraudProvider

The `FraudProvider` component initializes the SDK and provides context for fraud detection features.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| apiKey | string | Yes | Your Udene API key |
| baseUrl | string | No | Custom API URL (defaults to https://udene.net/v1) |
| children | ReactNode | Yes | Child components |

### useFraud Hook

The `useFraud` hook provides access to fraud detection functionality.

#### Methods

| Method | Description | Parameters | Return |
|--------|-------------|------------|--------|
| trackInteraction | Track user actions | InteractionData | Promise<any> |
| getMetrics | Get fraud metrics | None | Promise<MetricsResponse> |

#### Types

```typescript
interface InteractionData {
  action: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

interface MetricsResponse {
  riskScore: number;
  activeUsers: number;
  alertCount: number;
  lastUpdated?: string;
}
```

## Advanced Usage

### Transaction Monitoring

```jsx
const { trackInteraction } = useFraud();

// Track a purchase transaction
const trackPurchase = () => {
  trackInteraction({
    action: 'purchase',
    metadata: {
      productId: '123',
      amount: 99.99,
      currency: 'USD',
      paymentMethod: 'credit_card'
    }
  });
};
```

### Risk Analysis

```jsx
const { getMetrics } = useFraud();

// Check risk metrics before processing a payment
const processPayment = async () => {
  const metrics = await getMetrics();
  
  if (metrics.riskScore > 0.7) {
    // High risk, implement additional verification
    startVerificationProcess();
  } else {
    // Proceed with payment
    completePayment();
  }
};
```

## Troubleshooting

### Common Issues

- **SDK Not Initialized**: Ensure you've wrapped your app with `FraudProvider`
- **API Key Invalid**: Verify your API key is correct
- **Network Errors**: Check your device's internet connection

## License

MIT
