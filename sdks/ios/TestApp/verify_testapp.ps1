# TestApp Verification Script
# This script helps verify that the TestApp can correctly use the UdeneSDK

# Set working directory
$workingDir = $PSScriptRoot
Set-Location $workingDir

Write-Host "TestApp Verification Script" -ForegroundColor Cyan
Write-Host "Working directory: $workingDir"

# Check TestApp structure
Write-Host "`n=== Checking TestApp Structure ===" -ForegroundColor Green

# Check if Sources directory exists
if (Test-Path "Sources") {
    Write-Host "✓ Sources directory exists" -ForegroundColor Green
    
    # List files in Sources
    Write-Host "`nFiles in Sources:"
    Get-ChildItem -Path "Sources" -File | ForEach-Object {
        Write-Host "  - $($_.Name)"
    }
} else {
    Write-Host "✗ Sources directory does not exist" -ForegroundColor Red
}

# Check if Package.swift exists
if (Test-Path "Package.swift") {
    Write-Host "`n✓ Package.swift exists" -ForegroundColor Green
    
    # Display Package.swift content
    Write-Host "`nPackage.swift content:"
    Get-Content -Path "Package.swift" | ForEach-Object {
        Write-Host "  $_"
    }
} else {
    Write-Host "`n✗ Package.swift does not exist" -ForegroundColor Red
}

# Try to build the package
Write-Host "`n=== Building TestApp ===" -ForegroundColor Green

# Clean previous builds
if (Test-Path .build) { 
    Remove-Item -Recurse -Force .build 
}

swift build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ TestApp builds successfully" -ForegroundColor Green
    
    # Run the TestApp
    Write-Host "`n=== Running TestApp ===" -ForegroundColor Green
    swift run
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ TestApp ran successfully" -ForegroundColor Green
    } else {
        Write-Host "`n✗ TestApp execution failed" -ForegroundColor Red
    }
} else {
    Write-Host "`n✗ TestApp build failed" -ForegroundColor Red
    
    # Provide troubleshooting tips
    Write-Host "`nTroubleshooting tips:" -ForegroundColor Yellow
    Write-Host "1. Make sure the UdeneSDK package is correctly referenced in Package.swift"
    Write-Host "2. Check that the UdeneSDK package builds successfully (run ../verify_sdk.ps1)"
    Write-Host "3. Verify that the main.swift file imports UdeneSDK correctly"
    Write-Host "4. Try updating the Package.swift file with the following content:"
    Write-Host @"
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
"@ -ForegroundColor Gray
}

# Final summary
Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "TestApp verification completed. Check the results above to ensure your TestApp can correctly use the UdeneSDK."