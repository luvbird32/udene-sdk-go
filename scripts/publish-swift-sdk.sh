#!/bin/bash
# Script to help publish a new version of the Swift SDK

# Check if version parameter is provided
if [ -z "$1" ]; then
  echo "Error: Version number is required"
  echo "Usage: ./publish-swift-sdk.sh <version>"
  echo "Example: ./publish-swift-sdk.sh 1.0.4"
  exit 1
fi

VERSION=$1
TAG="swift-v$VERSION"

# Check if we're in the repository root
if [ ! -d "sdks/ios" ]; then
  echo "Error: This script must be run from the repository root"
  exit 1
fi

# Update version in UdeneClient.swift
echo "Updating version in UdeneClient.swift..."
sed -i.bak "s/public let kUdeneSDKVersion = \".*\"/public let kUdeneSDKVersion = \"$VERSION\"/" sdks/ios/Sources/UdeneSDK/UdeneClient.swift
rm sdks/ios/Sources/UdeneSDK/UdeneClient.swift.bak

# Update version in Package.swift
echo "Updating version in Package.swift..."
sed -i.bak "s/UdeneSDK v.* - Cross-platform Swift SDK/UdeneSDK v$VERSION - Cross-platform Swift SDK/" sdks/ios/Package.swift
rm sdks/ios/Package.swift.bak

# Update version in UdeneSDK.podspec
echo "Updating version in UdeneSDK.podspec..."
sed -i.bak "s/s.version          = '.*'/s.version          = '$VERSION'/" sdks/ios/UdeneSDK.podspec
rm sdks/ios/UdeneSDK.podspec.bak

# Build and test
echo "Building and testing the SDK..."
cd sdks/ios
swift build
swift test

# Check if build and test were successful
if [ $? -ne 0 ]; then
  echo "Error: Build or tests failed. Please fix the issues before publishing."
  exit 1
fi

cd ../..

# Commit the changes
echo "Committing version changes..."
git add sdks/ios/Sources/UdeneSDK/UdeneClient.swift sdks/ios/Package.swift sdks/ios/UdeneSDK.podspec
git commit -m "Bump Swift SDK version to $VERSION"

# Create and push the tag
echo "Creating and pushing tag $TAG..."
git tag $TAG
git push origin $TAG

echo "Done! The GitHub Actions workflow has been triggered."
echo "You can monitor the progress at: https://github.com/yourusername/yourrepo/actions"