# Run the simple test

# Set working directory
$workingDir = $PSScriptRoot
Set-Location $workingDir

Write-Host "Running simple test for UdeneSDK..."

# Run the Swift script
swift main.swift

if ($LASTEXITCODE -eq 0) {
    Write-Host "Test completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Test failed!" -ForegroundColor Red
}