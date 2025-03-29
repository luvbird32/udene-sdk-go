Pod::Spec.new do |s|
  s.name             = 'UdeneSDK'
  s.version          = '1.0.2'
  s.summary          = 'The official iOS SDK for Udene Fraud Detection API'
  s.description      = <<-DESC
  UdeneSDK provides a Swift interface for interacting with the Udene Fraud Detection API.
  It allows you to track user interactions, get fraud metrics, and analyze user activity
  to help protect your application from fraudulent behavior.
                       DESC

  s.homepage         = 'https://github.com/luvbird32/udene-sdk-go'
  s.license          = { :type => 'MIT', :file => 'sdks/ios/LICENSE' }
  s.author           = { 'Udene' => 'support@udene.net' }
  s.source           = { :git => 'https://github.com/luvbird32/udene-sdk-go.git', :tag => "ios-v#{s.version}" }

  s.ios.deployment_target = '13.0'
  s.osx.deployment_target = '10.15'
  s.swift_version = '5.3'

  s.source_files = 'sdks/ios/Sources/UdeneSDK/**/*'

  s.frameworks = 'Foundation'

  # Specify the Swift tools version
  s.prepare_command = <<-CMD
    echo "// swift-tools-version:5.3" > sdks/ios/Package.swift
    echo "import PackageDescription" >> sdks/ios/Package.swift
    echo "let package = Package(" >> sdks/ios/Package.swift
    echo "    name: \\"UdeneSDK\\"," >> sdks/ios/Package.swift
    echo "    platforms: [.iOS(.v13), .macOS(.v10_15)]," >> sdks/ios/Package.swift
    echo "    products: [.library(name: \\"UdeneSDK\\", targets: [\\"UdeneSDK\\"])]," >> sdks/ios/Package.swift
    echo "    targets: [.target(name: \\"UdeneSDK\\", dependencies: [])]" >> sdks/ios/Package.swift
    echo ")" >> sdks/ios/Package.swift
  CMD
end