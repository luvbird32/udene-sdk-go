# Swift SDK Publishing Guide

This guide explains how to publish new versions of the Swift SDK for Udene.

> **Note for Windows Users**: If you're using Windows, please see the [Swift SDK Windows Publishing Guide](swift-sdk-windows-publishing.md) for Windows-specific instructions.

## Prerequisites

Before publishing a new version of the Swift SDK, ensure you have:

1. Access to the GitHub repository with permission to push tags
2. A CocoaPods account with permission to publish the UdeneSDK pod (if publishing to CocoaPods)
3. The `COCOAPODS_TRUNK_TOKEN` secret set in the GitHub repository settings

## Publishing Process

### 1. Update the SDK Code

First, make any necessary changes to the Swift SDK code in the `sdks/ios` directory:

- Add new features
- Fix bugs
- Update documentation
- Add or update tests

### 2. Test Locally

Before publishing, test the SDK locally:

```bash
cd sdks/ios
swift build
swift test
```

### 3. Use the Publishing Script (macOS/Linux)

We provide a script to automate the publishing process:

```bash
# Make the script executable
chmod +x scripts/publish-swift-sdk.sh

# Run the script with the new version number
./scripts/publish-swift-sdk.sh 1.0.4
```

The script will:
- Update version numbers in all relevant files
- Build and test the SDK
- Commit the changes
- Create and push a tag to trigger the GitHub Actions workflow

### 4. Monitor the Workflow

After pushing the tag, the GitHub Actions workflow will automatically:

1. Build and test the SDK on multiple platforms (macOS, Linux, Windows)
2. Update version numbers in all relevant files
3. Create an XCFramework for Apple platforms
4. Create a GitHub release with the XCFramework attached
5. Publish to CocoaPods (if configured)

You can monitor the progress in the "Actions" tab of the GitHub repository.

### 5. Verify the Release

After the workflow completes:

1. Check that the GitHub release was created with the correct version
2. Verify that the XCFramework is attached to the release
3. If publishing to CocoaPods, check that the new version is available:
   ```bash
   pod search UdeneSDK
   ```
4. Test the installation in a sample project using both Swift Package Manager and CocoaPods

## Troubleshooting

If the publishing process fails:

1. Check the GitHub Actions logs for error messages
2. Verify that all required secrets are set correctly
3. Ensure the version number is unique and follows semantic versioning
4. Check that all tests pass before publishing

For CocoaPods-specific issues:

```bash
# Validate the podspec locally
pod spec lint UdeneSDK.podspec

# Check if the version already exists
pod trunk info UdeneSDK
```

## Manual Publishing

If you need to publish manually:

1. Update version numbers in:
   - `UdeneClient.swift` (the `kUdeneSDKVersion` constant)
   - `Package.swift` (the version comment)
   - `UdeneSDK.podspec` (the `s.version` value)

2. Create and push a tag:
   ```bash
   git tag swift-v1.0.4
   git push origin swift-v1.0.4
   ```

3. Create an XCFramework manually (macOS only):
   ```bash
   cd sdks/ios
   swift build -c release
   mkdir -p build/xcframeworks
   xcodebuild -create-xcframework \
     -library .build/release/libUdeneSDK.a \
     -output build/xcframeworks/UdeneSDK.xcframework
   ```

4. Create a GitHub release with the XCFramework attached

5. Publish to CocoaPods:
   ```bash
   pod trunk push UdeneSDK.podspec
   ```

## Cross-Platform Considerations

The Swift SDK supports multiple platforms:

- **iOS/macOS**: Full support through Swift Package Manager or CocoaPods
- **Windows**: Support through Swift Package Manager (some limitations)
- **Linux**: Support through Swift Package Manager

When making changes, be sure to test on all supported platforms if possible.

## Version History

| Version | Release Date | Major Changes |
|---------|--------------|---------------|
| 1.0.3   | 2023-09-15   | Cross-platform support for Windows and Linux |
| 1.0.2   | 2023-07-20   | Improved error handling |
| 1.0.1   | 2023-05-10   | Bug fixes |
| 1.0.0   | 2023-04-01   | Initial release |