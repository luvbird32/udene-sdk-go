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

  # Source files
  s.source_files = 'Sources/UdeneSDK/**/*.swift'
  
  # Frameworks
  s.frameworks = 'Foundation'
  s.ios.frameworks = 'UIKit'
  
  # Exclude test files
  s.exclude_files = 'Tests/**/*'
  
  # Swift Package Manager compatibility
  s.swift_package_manager_compatibility = true
end