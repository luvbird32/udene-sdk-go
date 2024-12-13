import { CodeBlock } from "../code-block/CodeBlock";

export const SwiftSDK = () => {
  const swiftCode = `// Install via CocoaPods
// pod 'FraudSDK'

import FraudSDK

// Initialize the client
let client = FraudClient(apiKey: "your_api_key")

// Example: Get fraud metrics
client.getMetrics { result in
    switch result {
    case .success(let metrics):
        print("Current risk score: \(metrics.riskScore)")
    case .failure(let error):
        print("Error: \(error)")
    }
}

// Example: Track user interaction
let metadata = [
    "ipAddress": "192.168.1.1",
    "deviceId": "device_456"
]

client.trackInteraction(
    userId: "user_123",
    action: "login",
    metadata: metadata
) { result in
    switch result {
    case .success:
        print("Interaction tracked successfully")
    case .failure(let error):
        print("Error: \(error)")
    }
}`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">iOS (Swift)</h4>
      <CodeBlock code={swiftCode} language="swift" />
    </div>
  );
};