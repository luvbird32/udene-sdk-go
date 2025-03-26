
# Udene Ruby SDK

The official Ruby SDK for Udene Fraud Detection API.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'udene_sdk'
```

And then execute:

```bash
$ bundle install
```

Or install it yourself as:

```bash
$ gem install udene_sdk
```

## Usage

```ruby
require 'udene_sdk'

# Initialize the client
client = UdeneSDK::Client.new('your_api_key')

# Get fraud metrics
begin
  metrics = client.get_metrics
  puts "Current risk score: #{metrics.risk_score}"
rescue UdeneSDK::RateLimitError => e
  puts "Rate limit exceeded. Retry after: #{e.retry_after} seconds"
end

# Track user interaction
client.track_interaction(
  user_id: 'user_123',
  action: 'login',
  metadata: {
    ip_address: '192.168.1.1',
    device_id: 'device_456'
  }
)
```

## Documentation

For complete documentation, visit [https://docs.udene.net](https://docs.udene.net)

## License

The gem is available as open source under the terms of the MIT License.
