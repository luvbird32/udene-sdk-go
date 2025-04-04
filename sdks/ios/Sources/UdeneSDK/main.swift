// UdeneSDK main.swift
// This file is required for Swift package publishing
// Version: 1.0.5

import Foundation

// This is a library, not an executable, so we don't need a main() function
// This file exists primarily to satisfy package requirements

// Export public symbols
@_exported import Foundation
#if canImport(UIKit)
@_exported import UIKit
#endif

// The SDK version is defined in UdeneClient.swift
// public let kUdeneSDKVersion = "1.0.5"

// Library initialization code can go here if needed
// For now, we'll just print a debug message that won't be included in release builds
#if DEBUG
print("UdeneSDK v\(kUdeneSDKVersion) initialized")
#endif