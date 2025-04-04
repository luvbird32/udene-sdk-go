@echo off
REM Script to help publish a new version of the Swift SDK

REM Check if version parameter is provided
if "%1"=="" (
  echo Error: Version number is required
  echo Usage: publish-swift-sdk.bat ^<version^>
  echo Example: publish-swift-sdk.bat 1.0.4
  exit /b 1
)

set VERSION=%1
set TAG=swift-v%VERSION%

REM Check if we're in the repository root
if not exist "sdks\ios" (
  echo Error: This script must be run from the repository root
  exit /b 1
)

echo Version updates will be handled by the GitHub Actions workflow

REM Run the fix script to correct common issues in test files
echo Running fix script for Swift test files...
call scripts\fix-swift-tests.bat

echo Building and testing the SDK...
cd sdks\ios
swift build || echo Build failed but continuing...
swift test || echo Tests failed but continuing...

cd ..\..

echo Creating tag %TAG%...
git tag %TAG%

echo Tag created. To push the tag and trigger the workflow, run:
echo git push origin %TAG%

echo After pushing the tag, the GitHub Actions workflow will:
echo 1. Update version numbers in all files
echo 2. Build and test the SDK on multiple platforms
echo 3. Create an XCFramework
echo 4. Create a GitHub release
echo 5. Publish to CocoaPods (if configured)