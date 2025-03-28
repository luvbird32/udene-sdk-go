
#!/usr/bin/env ruby
# frozen_string_literal: true

require "fileutils"

def run_command(command)
  puts "Running: #{command}"
  system(command)
  exit($?.exitstatus) unless $?.success?
end

# Clean previous builds
FileUtils.rm_rf("pkg") if Dir.exist?("pkg")

# Build the gem
run_command("gem build udene_sdk.gemspec")

# Get the built gem file
gem_file = Dir.glob("udene_sdk-*.gem").first
raise "No gem file found" unless gem_file

# Push to RubyGems
run_command("gem push #{gem_file}")

puts "Gem published successfully!"
