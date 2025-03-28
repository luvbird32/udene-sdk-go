
# @udene/sdk

A comprehensive fraud detection and security package for JavaScript applications.

## Installation

```sh
npm install @udene/sdk
# or
yarn add @udene/sdk
```

## Usage

### Browser / Frontend Usage

```javascript
import { UdeneClient } from '@udene/sdk';

// Initialize the client
const client = new UdeneClient('your_api_key');

// Example: Get fraud metrics
const metrics = await client.getMetrics();
console.log(`Current risk score: ${metrics.riskScore}`);

// Example: Track user interaction
await client.trackInteraction({
    userId: 'user_123',
    action: 'login',
    metadata: {
        ipAddress: '192.168.1.1',
        deviceId: 'device_456'
    }
});
```

### Node.js Usage

```javascript
const { UdeneClient } = require('@udene/sdk');

// Initialize the client
const client = new UdeneClient('your_api_key');

// Analyze a transaction
async function checkTransaction(transactionData) {
  try {
    const result = await client.analyzeTransaction(transactionData);
    
    if (result.riskLevel === 'high') {
      // Handle high-risk transaction
      console.log('Suspicious transaction detected');
    }
    
    return result;
  } catch (error) {
    console.error('Error analyzing transaction:', error);
    throw error;
  }
}
```

## API Reference

### UdeneClient

The main client for accessing fraud detection services.

#### Constructor

```javascript
new UdeneClient(apiKey, baseURL)
```

- `apiKey` (required) - Your API key for the fraud detection service
- `baseURL` (optional) - Custom API base URL if needed

#### Methods

- `getMetrics()` - Get fraud metrics for the current user/session
- `getActivity()` - Get activity data for analysis
- `trackInteraction(data)` - Track a user interaction for fraud analysis
- `analyzeTransaction(transaction)` - Analyze a transaction for fraud
- `getDeviceFingerprint()` - Get device fingerprint information

## Error Handling

The SDK automatically logs errors to the console. You can handle errors using try/catch:

```javascript
try {
  const result = await client.analyzeTransaction(data);
} catch (error) {
  // Handle error
  console.error('Custom error handling:', error);
}
```

## License

MIT
