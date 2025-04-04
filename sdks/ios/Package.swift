// swift-tools-version:5.7
// UdeneSDK v1.0.5 - Cross-platform Swift SDK
import PackageDescription

let package = Package(
    name: "UdeneSDK",
    platforms: [
        .macOS(.v10_15),
        .iOS(.v13)
        // Windows and Linux are supported without version constraints
    ],
    products: [
        .library(
            name: "UdeneSDK",
            targets: ["UdeneSDK"]),
    ],
    dependencies: [
        // Dependencies go here
    ],
    targets: [
        .target(
            name: "UdeneSDK",
            dependencies: [],
            path: "Sources/UdeneSDK",
            exclude: []),
        .testTarget(
            name: "UdeneSDKTests",
            dependencies: ["UdeneSDK"],
            path: "Tests/UdeneSDKTests"),
    ],
    swiftLanguageVersions: [.v5]
)
