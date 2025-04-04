// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "UdeneSDKTestApp",
    platforms: [
        .macOS(.v10_15)
    ],
    dependencies: [
        .package(name: "UdeneSDK", path: "..")
    ],
    targets: [
        .executableTarget(
            name: "UdeneSDKTestApp",
            dependencies: [
                .product(name: "UdeneSDK", package: "UdeneSDK")
            ],
            path: "Sources")
    ]
)