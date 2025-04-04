# Create a minimal test app for UdeneSDK
# This script creates a minimal test app in a separate directory

# Set working directory
$workingDir = $PSScriptRoot
Set-Location $workingDir

Write-Host "Creating Minimal Test App for UdeneSDK" -ForegroundColor Cyan

# Create a directory for the minimal test app
$testAppDir = "C:\Users\victo\UdeneSDKMinimalTest"
if (Test-Path $testAppDir) {
    Write-Host "Directory already exists. Cleaning..."
    Remove-Item -Recurse -Force $testAppDir
}

New-Item -ItemType Directory -Path $testAppDir | Out-Null
Set-Location $testAppDir

Write-Host "Created directory: $testAppDir"

# Create Package.swift
Write-Host "Creating Package.swift..."
@"
// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "UdeneSDKMinimalTest",
    platforms: [
        .macOS(.v10_15)
    ],
    dependencies: [
        .package(path: "C:/Users/victo/udene/udene/sdks/ios")
    ],
    targets: [
        .executableTarget(
            name: "UdeneSDKMinimalTest",
            dependencies: [
                .product(name: "UdeneSDK", package: "UdeneSDK")
            ],
            path: ".")
    ]
)
"@ | Out-File -FilePath "Package.swift" -Encoding utf8

# Create main.swift
Write-Host "Creating main.swift..."
@"
// UdeneSDK Minimal Test App
import Foundation
print("UdeneSDK Minimal Test App")

// Try to import UdeneSDK
print("Attempting to import UdeneSDK...")
import UdeneSDK
print("Successfully imported UdeneSDK!")

// Add your test code here
// For example:
// let client = UdeneClient(apiKey: "test-api-key")
// print("Created client for platform: \(UdeneClient.platformName())")

print("Test completed successfully!")
"@ | Out-File -FilePath "main.swift" -Encoding utf8

# Create build and run script
Write-Host "Creating build_and_run.ps1..."
@"
# Build and run the minimal test app

# Set working directory
Set-Location $testAppDir

Write-Host "Building and running UdeneSDK Minimal Test App..."

# Clean previous builds
if (Test-Path .build) { 
    Remove-Item -Recurse -Force .build 
}

# Build the test app
swift build

if (`$LASTEXITCODE -eq 0) {
    Write-Host "`nRunning test app:" -ForegroundColor Green
    swift run
} else {
    Write-Host "Build failed!" -ForegroundColor Red
}
"@ | Out-File -FilePath "build_and_run.ps1" -Encoding utf8

Write-Host "`nMinimal test app created successfully!" -ForegroundColor Green
Write-Host "To build and run the test app, navigate to $testAppDir and run:"
Write-Host ".\build_and_run.ps1" -ForegroundColor Yellow