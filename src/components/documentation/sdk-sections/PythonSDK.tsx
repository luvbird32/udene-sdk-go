import { CodeBlock } from "../code-block/CodeBlock";

export const PythonSDK = () => {
  const pythonCode = `# Install the SDK
pip install fraud-sdk

# Initialize the client
from fraud_sdk import FraudClient
client = FraudClient('your_api_key')

# Example: Get fraud metrics
metrics = client.get_metrics()
print(f"Current risk score: {metrics['risk_score']}")

# Example: Track user interaction
client.track_interaction(
    user_id='user_123',
    action='login',
    metadata={
        'ip_address': '192.168.1.1',
        'device_id': 'device_456'
    }
)`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Python</h4>
      <CodeBlock code={pythonCode} language="python" />
    </div>
  );
};