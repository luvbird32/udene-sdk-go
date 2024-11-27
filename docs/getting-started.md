# Getting Started with Fraud Detection API

## Prerequisites
- API key (obtain from your dashboard)
- Node.js 14+ / Python 3.7+ / Java 11+ (depending on your SDK choice)

## Quick Start

1. Install the SDK for your language:

```bash
# JavaScript
npm install @fraud/js-sdk

# Python
pip install fraud-sdk

# Java
maven install fraud-sdk
```

2. Initialize the client:

```javascript
// JavaScript
const { FraudClient } = require('@fraud/js-sdk');
const client = new FraudClient('your_api_key');

// Python
from fraud_sdk import FraudClient
client = FraudClient('your_api_key')

// Java
import com.fraud.sdk.FraudClient;
FraudClient client = new FraudClient("your_api_key");
```

3. Make your first API call:

```javascript
// Get current metrics
const metrics = await client.getMetrics();
console.log(metrics);
```

## Next Steps
- Review the [Authentication Guide](authentication.md)
- Set up [Webhooks](webhooks.md)
- Learn about [Best Practices](best-practices.md)