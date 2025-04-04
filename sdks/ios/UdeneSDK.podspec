Pod::Spec.new do |s|
  s.name             = 'UdeneSDK'
  s.version          = '1.0.5'
  s.summary          = 'The official Swift SDK for Udene Fraud Detection API'
  s.description      = <<-DESC
  UdeneSDK provides a Swift interface for interacting with the Udene Fraud Detection API.
  It allows you to track user interactions, get fraud metrics, and analyze user activity
  to help protect your application from fraudulent behavior.
                       DESC

  s.homepage         = 'https://github.com/luvbird32/udene'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'Udene' => 'support@udene.net' }
  s.source           = { :git => 'https://github.com/luvbird32/udene.git', :tag => "swift-v#{s.version}" }

  s.ios.deployment_target = '13.0'
  s.osx.deployment_target = '10.15'
  s.swift_version = '5.7'

  s.source_files = 'Sources/UdeneSDK/**/*'

  s.frameworks = 'Foundation'

  # Exclude test files
  s.exclude_files = 'Tests/**/*'

  # Add platform-specific frameworks
  s.ios.frameworks = 'UIKit'

  # Specify the Swift tools version
  s.prepare_command = <<-CMD
    echo "// swift-tools-version:5.7" > Package.swift
    echo "// UdeneSDK v1.0.5 - Cross-platform Swift SDK" >> Package.swift
    echo "import PackageDescription" >> Package.swift
    echo "let package = Package(" >> Package.swift
    echo "    name: \\"UdeneSDK\\"," >> Package.swift
    echo "    platforms: [.iOS(.v13), .macOS(.v10_15)]," >> Package.swift
    echo "    products: [.library(name: \\"UdeneSDK\\", targets: [\\"UdeneSDK\\"])]," >> Package.swift
    echo "    targets: [.target(name: \\"UdeneSDK\\", dependencies: [], path: \\"Sources/UdeneSDK\\")]" >> Package.swift
    echo ")" >> Package.swift
  CMD
end