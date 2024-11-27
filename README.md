# Fraud Detection API Documentation

## Project info

**URL**: https://lovable.dev/projects/93cd0ad5-a304-45e0-bed8-a08742db3f9f

## Quick Start

```bash
# Set your API key in the environment
export FRAUD_API_KEY=your_api_key_here

# Make your first API request
curl -X GET "https://api.example.com/v1/metrics" \
  -H "Authorization: Bearer $FRAUD_API_KEY"
```

## Authentication

All API requests require authentication using Bearer tokens. Include your API key in the Authorization header:

```bash
Authorization: Bearer your_api_key_here
```

## API Reference

### Get Fraud Metrics

```http
GET /api/v1/metrics
```

Returns current fraud detection metrics including risk score, active users, and alert count.

**Response**
```json
{
  "riskScore": 42.5,
  "activeUsers": 1234,
  "alertCount": 5,
  "apiCalls": 8765
}
```

### Get Recent Activity

```http
GET /api/v1/activity
```

Returns a list of recent fraud detection events.

**Response**
```json
[
  {
    "id": "evt_123",
    "type": "suspicious",
    "description": "Multiple failed login attempts",
    "timestamp": "2024-02-20T15:30:00Z"
  }
]
```

### Track User Interaction

```http
POST /api/v1/track
```

Track user interactions for fraud analysis.

**Request Body**
```json
{
  "userId": "user_123",
  "action": "login",
  "timestamp": "2024-02-20T15:30:00Z",
  "metadata": {
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

## SDKs & Libraries

### JavaScript/TypeScript
```typescript
import { FraudClient } from '@fraud/js-sdk';

const client = new FraudClient('your_api_key');
const metrics = await client.getMetrics();
```

### Python
```python
from fraud_sdk import FraudClient

client = FraudClient('your_api_key')
metrics = client.get_metrics()
```

### Java
```java
import com.fraud.sdk.FraudClient;

FraudClient client = new FraudClient("your_api_key");
Metrics metrics = client.getMetrics();
```

## Rate Limits

- 100 requests per minute for standard plans
- 1000 requests per minute for enterprise plans
- Burst limit: 200 requests per 10 seconds

## Error Codes

| Code | Description |
|------|-------------|
| 401  | Invalid API key |
| 403  | Rate limit exceeded |
| 404  | Resource not found |
| 500  | Internal server error |

## Webhooks

Configure webhooks to receive real-time notifications for fraud events:

```http
POST https://your-server.com/webhook
```

**Example Payload**
```json
{
  "event": "fraud_detected",
  "severity": "high",
  "details": {
    "userId": "user_123",
    "riskScore": 0.95,
    "timestamp": "2024-02-20T15:30:00Z"
  }
}
```

## Integration Guides

1. [Getting Started](docs/getting-started.md)
2. [Authentication](docs/authentication.md)
3. [Webhooks Setup](docs/webhooks.md)
4. [Best Practices](docs/best-practices.md)

## Resources

- [API Status Page](https://status.fraud-api.com)
- [Changelog](CHANGELOG.md)
- [Support](https://support.fraud-api.com)

## How to Deploy

Simply open [Lovable](https://lovable.dev/projects/93cd0ad5-a304-45e0-bed8-a08742db3f9f) and click on Share -> Publish.

## Custom Domains

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)