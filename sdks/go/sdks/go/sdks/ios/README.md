
# Udene iOS SDK

The official Swift SDK for Udene Fraud Detection API.

## Installation

### CocoaPods

To integrate UdeneSDK into your Xcode project using CocoaPods, add it to your `Podfile`:

```ruby
pod 'UdeneSDK', '~> 1.0'
```

Then run:

```bash
pod install
```

### Swift Package Manager

To integrate UdeneSDK into your Xcode project using Swift Package Manager, add it to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/udene/ios-sdk.git", from: "1.0.0")
]
```

## Usage

```swift
import UdeneSDK

// Initialize the client
let client = UdeneClient(apiKey: "your_api_key")

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
}
```

## Documentation

For complete documentation, visit [https://docs.udene.net](https://docs.udene.net)

## License

MIT
