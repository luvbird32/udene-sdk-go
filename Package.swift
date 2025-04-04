// swift-tools-version:6.0
import PackageDescription

let package = Package(
    name: "UdeneSDK",
    products: [
        // Change this from .library to .executable since you have a main.swift file
        .executable(name: "UdeneSDK", targets: ["UdeneSDK"]),
    ],
    dependencies: [
        // Your dependencies here
    ],
    targets: [
        // Change this from .target to .executableTarget
        .executableTarget(
            name: "UdeneSDK",
            dependencies: []),
        .testTarget(
            name: "UdeneSDKTests",
            dependencies: ["UdeneSDK"]),
    ]
) 