
# Udene iOS SDK

The official Swift SDK for Udene Fraud Detection API.

## Installation

### CocoaPods

To integrate UdeneSDK into your Xcode project using CocoaPods, add it to your `Podfile`:

```ruby
pod 'UdeneSDK', '~> 1.0.2'
```

Then run:

```bash
pod install
```

### Swift Package Manager

To integrate UdeneSDK into your Xcode project using Swift Package Manager, add it to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/luvbird32/udene-sdk-go.git", from: "1.0.2")
]
```

### Xcode

You can also add the SDK directly in Xcode:

1. In Xcode, select File > Swift Packages > Add Package Dependency
2. Enter the repository URL: https://github.com/luvbird32/udene-sdk-go.git
3. Specify the version constraints (e.g., "Up to Next Major" with "1.0.2")
4. Click Next and then Finish

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

## Publishing

To publish a new version of the iOS SDK:

1. Make your code changes
2. Update the version in `UdeneSDK.podspec` and the version comment in `Package.swift`
3. Create and push a tag with the format `ios-v{version}` (e.g., `ios-v1.0.1`):

```bash
git tag ios-v1.0.1
git push origin ios-v1.0.1
```

This will trigger the GitHub Actions workflow that will:
- Build and test the SDK
- Create an XCFramework
- Publish to CocoaPods
- Create a GitHub release with the XCFramework attached

### Requirements for Publishing

- You need a CocoaPods account and must be added as an owner of the UdeneSDK pod
- The `COCOAPODS_TRUNK_TOKEN` secret must be set in the GitHub repository

## License

MIT
