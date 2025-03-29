# Publishing the iOS SDK

This document provides detailed instructions for publishing the Udene iOS SDK.

## Prerequisites

Before publishing, ensure you have:

1. A CocoaPods account with permissions to publish the UdeneSDK pod
2. The `COCOAPODS_TRUNK_TOKEN` secret set in your GitHub repository
3. Access to push tags to the repository

## Publishing Process

### 1. Prepare Your Changes

- Make all necessary code changes to the SDK
- Update tests to cover new functionality
- Ensure all tests pass locally: `cd sdks/ios && swift test`

### 2. Update Version Numbers

Update the version in the following files:

- `UdeneSDK.podspec`: Change the `s.version` value
- `Package.swift`: Update the version comment at the bottom of the file

### 3. Create and Push a Tag

Create a tag with the format `ios-v{version}` and push it to GitHub:

```bash
git tag ios-v1.0.2
git push origin ios-v1.0.2
```

### 4. Monitor the GitHub Actions Workflow

The workflow will automatically:

1. Build the SDK
2. Run tests
3. Create an XCFramework
4. Publish to CocoaPods
5. Create a GitHub release with the XCFramework attached

You can monitor the progress in the "Actions" tab of your GitHub repository.

### 5. Verify the Release

After the workflow completes:

1. Check that the new version is available on CocoaPods: `pod search UdeneSDK`
2. Verify the GitHub release was created with the XCFramework attached
3. Test the installation in a sample project using both CocoaPods and Swift Package Manager

## Troubleshooting

If the publishing process fails:

1. Check the GitHub Actions logs for error messages
2. Verify that the `COCOAPODS_TRUNK_TOKEN` is valid and has not expired
3. Ensure the version number in the podspec is unique and not already published
4. Check that the build process completes successfully

For CocoaPods-specific issues:

```bash
# Validate the podspec locally
pod spec lint UdeneSDK.podspec

# Check if the version already exists
pod trunk info UdeneSDK
```

## Manual Publishing (if needed)

If you need to publish manually:

```bash
# From the sdks/ios directory
pod trunk push UdeneSDK.podspec
```

You'll need to have your CocoaPods credentials set up locally.