# Getting Started

## Environment Setup
```bash
# Set your API key
export FRAUD_API_KEY=your_api_key_here

# Install dependencies
npm install
```

## Authentication
```typescript
// Initialize the client
import { FraudClient } from '@fraud/js-sdk';
const client = new FraudClient('your_api_key');
```

## Basic Usage
```typescript
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