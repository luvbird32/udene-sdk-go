
# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "udene_sdk"
  spec.version       = "1.0.0"
  spec.authors       = ["Udene Team"]
  spec.email         = ["support@udene.net"]
  
  spec.summary       = "Udene Fraud Detection SDK for Ruby"
  spec.description   = "Ruby SDK for integrating with Udene's fraud detection and security services"
  spec.homepage      = "https://github.com/udene/ruby-sdk"
  spec.license       = "MIT"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.5.0")
  
  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/udene/ruby-sdk"
  spec.metadata["documentation_uri"] = "https://docs.udene.net"
  
  # Specify which files should be added to the gem when it is released.
  spec.files = Dir.glob("{bin,lib}/**/*") + %w[LICENSE README.md]
  spec.require_paths = ["lib"]
  
  spec.add_dependency "faraday", "~> 1.0"
  spec.add_dependency "faraday_middleware", "~> 1.0"
  
  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
