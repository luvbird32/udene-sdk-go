
# Udene Android SDK

The official Android SDK for Udene Fraud Detection API.

## Installation

Add the following to your build.gradle file:

```gradle
dependencies {
    implementation 'com.udene:udene-sdk:1.0.0'
}
```

## Usage

```kotlin
import com.udene.sdk.UdeneClient
import com.udene.sdk.models.*

class FraudDetection {
    private val client = UdeneClient("your_api_key")

    suspend fun getMetrics() {
        try {
            val metrics = client.getMetrics()
            println("Current risk score: ${metrics.riskScore}")
        } catch (e: RateLimitException) {
            println("Rate limit exceeded. Retry after: ${e.retryAfter} seconds")
        }
    }

    suspend fun trackInteraction() {
        val data = InteractionData(
            userId = "user_123",
            action = "login",
            metadata = mapOf(
                "ipAddress" to "192.168.1.1",
                "deviceId" to "device_456"
            )
        )
        
        try {
            client.trackInteraction(data)
            println("Interaction tracked successfully")
        } catch (e: UdeneApiException) {
            println("Error: ${e.message}")
        }
    }
}
```

## Documentation

For complete documentation, visit [https://docs.udene.net](https://docs.udene.net)

## License

MIT
