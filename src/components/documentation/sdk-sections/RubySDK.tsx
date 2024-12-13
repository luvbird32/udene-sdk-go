import { CodeBlock } from "../code-block/CodeBlock";

export const RubySDK = () => {
  const rubyCode = `# Install the gem
gem install fraud_sdk

# Initialize the client
require 'fraud_sdk'
client = FraudSDK::Client.new('your_api_key')

# Example: Get fraud metrics
begin
  metrics = client.get_metrics
  puts "Current risk score: #{metrics.risk_score}"
rescue FraudSDK::RateLimitError => e
  puts "Rate limit exceeded. Retry after: #{e.retry_after} seconds"
end

# Example: Track user interaction
begin
  client.track_interaction(
    user_id: 'user_123',
    action: 'login',
    metadata: {
      ip_address: '192.168.1.1',
      device_id: 'device_456'
    }
  )
rescue FraudSDK::APIError => e
  puts "Error: #{e.message}"
end`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Ruby</h4>
      <CodeBlock code={rubyCode} language="ruby" />
    </div>
  );
};