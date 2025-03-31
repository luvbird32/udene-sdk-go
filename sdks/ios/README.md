
# Udene Swift SDK

The official Swift SDK for Udene Fraud Detection API. Now with cross-platform support for iOS, macOS, Windows, and Linux.

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

To integrate UdeneSDK using Swift Package Manager (works on all supported platforms), add it to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/luvbird32/udene-sdk-go.git", from: "1.0.2")
]
```

For the target dependencies:

```swift
targets: [
    .target(
        name: "YourTarget",
        dependencies: [
            .product(name: "UdeneSDK", package: "udene-sdk-go")
        ]
    )
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

## Cross-Platform Support

UdeneSDK now supports multiple platforms:

- **iOS/macOS**: Full support through Swift Package Manager or CocoaPods
- **Windows**: Support through Swift Package Manager
- **Linux**: Support through Swift Package Manager (where Swift is available)

### Requirements

- Swift 5.7 or later
- iOS 13.0+ / macOS 10.15+ for Apple platforms

### Installation on Windows/Linux

To use UdeneSDK on Windows or Linux:

1. Make sure you have Swift 5.7 or later installed
2. Add the package to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/luvbird32/udene-sdk-go.git", from: "1.0.2")
]
```

3. Import the package in your code:

```swift
import UdeneSDK
```

4. Build your project:

```bash
swift build
```

## Documentation

For complete documentation, visit [https://docs.udene.net](https://docs.udene.net)

## Publishing

To publish a new version of the Swift SDK:

1. Make your code changes
2. Update the version in:
   - `UdeneSDK.podspec` for CocoaPods
   - The version constant in `UdeneClient.swift` (`kUdeneSDKVersion`)
   - The version comment in `Package.swift` if needed
3. Create and push a tag with the format `swift-v{version}` (e.g., `swift-v1.0.3`):

```bash
git tag swift-v1.0.3
git push origin swift-v1.0.3
```

This will trigger the GitHub Actions workflow that will:
- Build and test the SDK on multiple platforms
- Create an XCFramework for Apple platforms
- Publish to CocoaPods
- Create a GitHub release with the XCFramework attached

### Requirements for Publishing

- You need a CocoaPods account and must be added as an owner of the UdeneSDK pod
- The `COCOAPODS_TRUNK_TOKEN` secret must be set in the GitHub repository
- For cross-platform testing, ensure your CI environment has Swift 5.7+ installed

## License

MIT
