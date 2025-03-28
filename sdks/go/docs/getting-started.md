# Getting Started with Udene API

## Prerequisites
- API key (obtain from your dashboard)
- Node.js 14+ / Python 3.7+ / Java 11+ (depending on your SDK choice)

## Quick Start

1. Install the SDK for your language:

```bash
# JavaScript
npm install @udene/sdk

# Python
pip install udene-sdk

# Java
maven install udene-sdk
```

2. Initialize the client:

```javascript
// JavaScript
const { UdeneClient } = require('@udene/sdk');
const client = new UdeneClient('your_api_key');

// Python
from udene_sdk import UdeneClient
client = UdeneClient('your_api_key')

// Java
import com.udene.sdk.UdeneClient;
UdeneClient client = new UdeneClient("your_api_key");
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