# Swift SDK Test and Publish Script for Windows
# Usage: ./test_and_publish.ps1 [test|publish]

param (
    [string]$action = "test"
)

# Set working directory
$workingDir = $PSScriptRoot
Set-Location $workingDir

Write-Host "UdeneSDK Test and Publish Script"
Write-Host "Working directory: $workingDir"
Write-Host "Action: $action"

# Function to test the SDK
function Test-SDK {
    Write-Host "`n=== Testing UdeneSDK ===" -ForegroundColor Green
    
    # Clean previous builds
    if (Test-Path .build) { 
        Write-Host "Cleaning .build directory..."
        Remove-Item -Recurse -Force .build 
    }
    
    # Build the package
    Write-Host "Building Swift package..."
    swift build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed!" -ForegroundColor Red
        exit 1
    }
    
    # Validate the podspec
    Write-Host "Validating podspec..."
    pod spec lint UdeneSDK.podspec --allow-warnings
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Podspec validation failed!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "All tests passed!" -ForegroundColor Green
}

# Function to publish the SDK
function Publish-SDK {
    Write-Host "`n=== Publishing UdeneSDK ===" -ForegroundColor Green
    
    # Ensure we have the publish version of the podspec
    if (Test-Path UdeneSDK.podspec.publish) {
        Write-Host "Backing up local validation podspec..."
        Copy-Item UdeneSDK.podspec UdeneSDK.podspec.local
        Write-Host "Copying publish podspec to UdeneSDK.podspec..."
        Copy-Item UdeneSDK.podspec.publish UdeneSDK.podspec
    }
    
    # Commit changes
    Write-Host "Committing changes..."
    git add .
    git commit -m "Update UdeneSDK to version 1.0.5"
    
    # Create and push tag
    Write-Host "Creating and pushing tag swift-v1.0.5..."
    git tag swift-v1.0.5
    git push origin swift-v1.0.5
    
    # Push changes
    Write-Host "Pushing changes to remote repository..."
    git push origin main
    
    Write-Host "SDK published! GitHub Actions should now handle the CocoaPods publishing." -ForegroundColor Green
    Write-Host "Check the Actions tab in your GitHub repository for progress."
}

# Main script
if ($action -eq "test") {
    Test-SDK
} elseif ($action -eq "publish") {
    Test-SDK
    Publish-SDK
} else {
    Write-Host "Invalid action. Use 'test' or 'publish'." -ForegroundColor Red
}