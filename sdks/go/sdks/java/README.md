
# Udene Java SDK

The official Java SDK for Udene's Fraud Detection API.

## Installation

### Maven

Add the following to your `pom.xml` file:

```xml
<dependency>
    <groupId>com.udene</groupId>
    <artifactId>udene-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Gradle

Add the following to your `build.gradle` file:

```groovy
implementation 'com.udene:udene-sdk:1.0.0'
```

## Usage

```java
import com.udene.sdk.UdeneClient;
import com.udene.sdk.models.InteractionData;
import com.udene.sdk.models.InteractionResponse;
import com.udene.sdk.models.MetricsResponse;
import com.udene.sdk.exceptions.UdeneApiException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class FraudDetectionExample {
    public static void main(String[] args) {
        // Initialize the client
        UdeneClient client = new UdeneClient("your_api_key");
        
        try {
            // Get fraud metrics
            MetricsResponse metrics = client.getMetrics();
            System.out.println("Current risk score: " + metrics.getRiskScore());
            
            // Track user interaction
            Map<String, Object> metadata = new HashMap<>();
            metadata.put("ipAddress", "192.168.1.1");
            metadata.put("deviceId", "device_123");
            
            InteractionData interaction = new InteractionData()
                .setUserId("user_123")
                .setAction("login")
                .setMetadata(metadata);
            
            InteractionResponse response = client.trackInteraction(interaction);
            System.out.println("Interaction tracked successfully: " + response.isSuccess());
            
            // Analyze a transaction
            Map<String, Object> transaction = new HashMap<>();
            transaction.put("amount", 1000);
            transaction.put("currency", "USD");
            transaction.put("userId", "user_123");
            transaction.put("paymentMethod", "credit_card");
            
            Map<String, Object> result = client.analyzeTransaction(transaction);
            System.out.println("Transaction analysis result: " + result);
            
        } catch (UdeneApiException e) {
            System.err.println("API error: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("I/O error: " + e.getMessage());
        } catch (InterruptedException e) {
            System.err.println("Operation interrupted: " + e.getMessage());
            Thread.currentThread().interrupt();
        }
    }
}
```

## API Reference

### UdeneClient

The main client for accessing the Udene Fraud Detection API.

#### Constructor

```java
// Default constructor with standard API endpoint
UdeneClient(String apiKey)

// Constructor with custom API endpoint
UdeneClient(String apiKey, String baseUrl)
```

#### Methods

* `MetricsResponse getMetrics()` - Get fraud metrics data
* `InteractionResponse trackInteraction(InteractionData interaction)` - Track a user interaction
* `ActivityResponse getActivity()` - Get user activity data
* `Map<String, Object> analyzeTransaction(Map<String, Object> transactionData)` - Analyze a transaction for fraud

### Exception Handling

The SDK provides several exception types for handling different error scenarios:

* `UdeneApiException` - Base exception class for all API errors
* `ClientException` - For client-side errors (HTTP 4xx)
* `ServerException` - For server-side errors (HTTP 5xx)
* `RateLimitException` - When the API rate limit is exceeded

## Development

### Building the SDK

```bash
mvn clean package
```

### Running Tests

```bash
mvn test
```

## License

MIT
