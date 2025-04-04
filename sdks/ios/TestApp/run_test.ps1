# Run the UdeneSDK Test App

# Set working directory
$workingDir = $PSScriptRoot
Set-Location $workingDir

Write-Host "Building and running UdeneSDK Test App..."

# Clean previous builds
if (Test-Path .build) { 
    Remove-Item -Recurse -Force .build 
}

# Build the test app
swift build

# Run the test app
if ($LASTEXITCODE -eq 0) {
    Write-Host "`nRunning test app:" -ForegroundColor Green
    swift run
} else {
    Write-Host "Build failed!" -ForegroundColor Red
}