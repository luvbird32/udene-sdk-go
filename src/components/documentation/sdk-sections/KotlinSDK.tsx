import { CodeBlock } from "../code-block/CodeBlock";

export const KotlinSDK = () => {
  const kotlinCode = `// Add dependency to build.gradle
// implementation 'com.fraud:fraud-sdk:1.0.0'

import com.fraud.sdk.FraudClient
import com.fraud.sdk.models.*

class FraudDetection {
    private val client = FraudClient("your_api_key")

    suspend fun getMetrics() {
        try {
            val response = client.getMetrics()
            println("Current risk score: ${response.riskScore}")
        } catch (exception: RateLimitException) {
            println("Rate limit exceeded. Retry after: ${exception.retryAfter} seconds")
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
        } catch (exception: FraudApiException) {
            println("Error: ${exception.message}")
        }
    }
}`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Android (Kotlin)</h4>
      <CodeBlock code={kotlinCode} language="kotlin" />
    </div>
  );
};