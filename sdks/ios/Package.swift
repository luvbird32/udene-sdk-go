// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "UdeneSDK",
    platforms: [
        .macOS(.v10_15),
        .iOS(.v13)
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
            path: "Sources/UdeneSDK"),
        .testTarget(
            name: "UdeneSDKTests",
            dependencies: ["UdeneSDK"],
            path: "Tests/UdeneSDKTests"),
    ],
    swiftLanguageVersions: [.v5]
)
