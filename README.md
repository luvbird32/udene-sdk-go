# Fraud Detection API Documentation

## Quick Start

```bash
# Set your API key as an environment variable
export FRAUD_API_KEY=your_api_key_here

# Make your first API request
curl -X GET "https://api.example.com/v1/metrics" \
  -H "Authorization: Bearer $FRAUD_API_KEY"
```

## Technology Stack

### Backend Infrastructure
- **Database**: Supabase (PostgreSQL) - Scalable and secure data storage
- **Machine Learning**: Edge Functions - Real-time fraud detection models
- **Caching**: Supabase - Optimized query performance
- **Message Queue**: Supabase Realtime - Real-time fraud alerts
- **Monitoring**: Supabase Dashboard - System health and metrics

## Authentication

All API requests require Bearer token authentication. Your API key should be included in the Authorization header:
```bash
Authorization: Bearer your_api_key_here
```

## API Reference

### Core Endpoints

```http
GET /api/v1/metrics    # Retrieve fraud detection metrics and statistics
GET /api/v1/activity   # Get recent fraud events and suspicious activities
POST /api/v1/track     # Track and analyze user interactions in real-time
```

Full OpenAPI specification: [openapi.yaml](openapi.yaml)

## SDKs

### JavaScript/TypeScript
```typescript
// Install the SDK
npm install @fraud/js-sdk

// Initialize the client
import { FraudClient } from '@fraud/js-sdk';
const client = new FraudClient('your_api_key');

// Example: Get fraud metrics
const metrics = await client.getMetrics();
console.log('Current risk score:', metrics.riskScore);

// Example: Track user interaction
await client.trackInteraction({
  userId: 'user_123',
  action: 'login',
  metadata: {
    ipAddress: '192.168.1.1',
    deviceId: 'device_456'
  }
});

// Example: Handle errors
try {
  const activity = await client.getActivity();
} catch (error) {
  if (error.response?.status === 429) {
    // Handle rate limiting
    console.log('Rate limit exceeded, retry after:', error.response.headers['retry-after']);
  }
}
```

### Python
```python
# Install the SDK
pip install fraud-sdk

# Initialize the client
from fraud_sdk import FraudClient
client = FraudClient('your_api_key')

# Example: Get fraud metrics
metrics = client.get_metrics()
print(f"Current risk score: {metrics['risk_score']}")

# Example: Track user interaction with custom metadata
client.track_interaction(
    user_id='user_123',
    action='login',
    metadata={
        'ip_address': '192.168.1.1',
        'device_id': 'device_456'
    }
)

# Example: Error handling with context manager
from fraud_sdk.exceptions import RateLimitError
try:
    activity = client.get_activity()
except RateLimitError as e:
    print(f"Rate limit exceeded. Retry after: {e.retry_after} seconds")
```

### Java
```java
// Add dependency to pom.xml
// <dependency>
//   <groupId>com.fraud</groupId>
//   <artifactId>fraud-sdk</artifactId>
//   <version>1.0.0</version>
// </dependency>

// Initialize the client
import com.fraud.sdk.FraudClient;
import com.fraud.sdk.models.*;
import com.fraud.sdk.exceptions.*;

FraudClient client = new FraudClient("your_api_key");

// Example: Get fraud metrics
try {
    Metrics metrics = client.getMetrics();
    System.out.println("Current risk score: " + metrics.getRiskScore());
    
    // Example: Track user interaction
    InteractionData data = new InteractionData.Builder()
        .userId("user_123")
        .action("login")
        .addMetadata("ipAddress", "192.168.1.1")
        .addMetadata("deviceId", "device_456")
        .build();
    
    client.trackInteraction(data);
    
} catch (RateLimitException e) {
    System.out.println("Rate limit exceeded. Retry after: " + e.getRetryAfter() + " seconds");
} catch (FraudApiException e) {
    System.out.println("API error: " + e.getMessage());
}
```

## Rate Limits
- **Standard Plan**: 100 requests per minute
- **Enterprise Plan**: 1000 requests per minute
- **Burst Limit**: 200 requests per 10 seconds

Rate limit headers are included in all responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1614556800
```

## Resources
- [Integration Guides](docs/) - Detailed implementation guides
- [API Status](https://status.fraud-api.com) - Real-time API status
- [Support](https://support.fraud-api.com) - Technical support and documentation

## Deployment

Visit [Lovable](https://lovable.dev/projects/93cd0ad5-a304-45e0-bed8-a08742db3f9f) and use Share -> Publish.

For custom domains, use Netlify. See [docs](https://docs.lovable.dev/tips-tricks/custom-domain/).