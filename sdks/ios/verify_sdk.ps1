# UdeneSDK Verification Script
# This script helps verify the SDK structure and prepare it for publishing

# Set working directory
$workingDir = $PSScriptRoot
Set-Location $workingDir

Write-Host "UdeneSDK Verification Script" -ForegroundColor Cyan
Write-Host "Working directory: $workingDir"

# Check SDK structure
Write-Host "`n=== Checking SDK Structure ===" -ForegroundColor Green

# Check if Sources/UdeneSDK directory exists
if (Test-Path "Sources/UdeneSDK") {
    Write-Host "✓ Sources/UdeneSDK directory exists" -ForegroundColor Green
    
    # List files in Sources/UdeneSDK
    Write-Host "`nFiles in Sources/UdeneSDK:"
    Get-ChildItem -Path "Sources/UdeneSDK" -File | ForEach-Object {
        Write-Host "  - $($_.Name)"
    }
} else {
    Write-Host "✗ Sources/UdeneSDK directory does not exist" -ForegroundColor Red
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

# Check if UdeneSDK.podspec exists
if (Test-Path "UdeneSDK.podspec") {
    Write-Host "`n✓ UdeneSDK.podspec exists" -ForegroundColor Green
    
    # Extract version from podspec
    $podspecContent = Get-Content -Path "UdeneSDK.podspec" -Raw
    if ($podspecContent -match "s\.version\s*=\s*'([^']+)'") {
        $version = $matches[1]
        Write-Host "  SDK Version: $version" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n✗ UdeneSDK.podspec does not exist" -ForegroundColor Red
}

# Check if main.swift exists (it shouldn't)
if (Test-Path "Sources/UdeneSDK/main.swift") {
    Write-Host "`n✗ main.swift exists (this will cause issues)" -ForegroundColor Red
    Write-Host "  Consider removing main.swift or renaming it"
} else {
    Write-Host "`n✓ No main.swift found (good)" -ForegroundColor Green
}

# Try to build the package
Write-Host "`n=== Building Package ===" -ForegroundColor Green
swift build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Package builds successfully" -ForegroundColor Green
} else {
    Write-Host "`n✗ Package build failed" -ForegroundColor Red
}

# Validate the podspec
Write-Host "`n=== Validating Podspec ===" -ForegroundColor Green
pod spec lint UdeneSDK.podspec --allow-warnings

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Podspec validation successful" -ForegroundColor Green
} else {
    Write-Host "`n✗ Podspec validation failed" -ForegroundColor Red
}

# Final summary
Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "SDK verification completed. Check the results above to ensure your SDK is ready for publishing."
Write-Host "If everything looks good, you can publish your SDK using the following commands:"
Write-Host "  git tag swift-v$version" -ForegroundColor Yellow
Write-Host "  git push origin swift-v$version" -ForegroundColor Yellow
Write-Host "This will trigger the GitHub Actions workflow to publish your SDK."