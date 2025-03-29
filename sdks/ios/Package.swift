
// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "UdeneSDK",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15)
    ],
    products: [
        .library(
            name: "UdeneSDK",
            targets: ["UdeneSDK"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "UdeneSDK",
            dependencies: []),
        .testTarget(
            name: "UdeneSDKTests",
            dependencies: ["UdeneSDK"]),
    ],
    swiftLanguageVersions: [.v5]
)

// Version: "1.0.2"
