import { CodeBlock } from "../code-block/CodeBlock";

export const KotlinSDK = () => {
  const kotlinCode = `// Add dependency to build.gradle
// implementation 'com.udene:udene-sdk:1.0.0'

import com.udene.sdk.UdeneClient
import com.udene.sdk.models.*

class FraudDetection {
    private val client = UdeneClient("your_api_key")

    suspend fun getMetrics() {
        try {
            val metrics = client.getMetrics()
            println("Current risk score: \${metrics.riskScore}")
        } catch (e: RateLimitException) {
            println("Rate limit exceeded. Retry after: \${e.retryAfter} seconds")
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
            println("Error: \${e.message}")
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