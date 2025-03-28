
import { CodeBlock } from "../code-block/CodeBlock";

export const JavaSDK = () => {
  const javaCode = `// Add dependency to your pom.xml
<dependency>
    <groupId>com.udene</groupId>
    <artifactId>udene-sdk</artifactId>
    <version>1.0.0</version>
</dependency>

// Initialize the client
import com.udene.sdk.UdeneClient;
UdeneClient client = new UdeneClient("your_api_key");

// Example: Get fraud metrics
MetricsResponse metrics = client.getMetrics();
System.out.println("Current risk score: " + metrics.getRiskScore());

// Example: Track user interaction
Map<String, Object> metadata = new HashMap<>();
metadata.put("ipAddress", "192.168.1.1");
metadata.put("deviceId", "device_123");

InteractionData interaction = new InteractionData()
    .setUserId("user_123")
    .setAction("login")
    .setMetadata(metadata);

InteractionResponse response = client.trackInteraction(interaction);

// Example: Analyze a transaction
Map<String, Object> transaction = new HashMap<>();
transaction.put("amount", 1000);
transaction.put("currency", "USD");
transaction.put("userId", "user_123");
transaction.put("paymentMethod", "credit_card");

Map<String, Object> result = client.analyzeTransaction(transaction);`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Java</h4>
      <p className="text-sm text-muted-foreground">
        Our Java SDK provides a robust interface to Udene's fraud detection API for server-side applications,
        with comprehensive exception handling and thread-safe operation.
      </p>
      <CodeBlock code={javaCode} language="java" />
    </div>
  );
};
