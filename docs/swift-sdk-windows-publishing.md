# Swift SDK Publishing on Windows

This guide provides step-by-step instructions for publishing the Swift SDK on Windows.

## Prerequisites

- Git installed and configured
- Swift for Windows installed
- Access to the GitHub repository with permission to push tags

## Manual Publishing Process

### 1. Update Version Numbers

1. Open `sdks\ios\Sources\UdeneSDK\UdeneClient.swift` and update the version:
   ```swift
   public let kUdeneSDKVersion = "1.0.4" // Change to your new version
   ```

2. Open `sdks\ios\Package.swift` and update the version comment:
   ```swift
   // swift-tools-version:5.7
   // UdeneSDK v1.0.4 - Cross-platform Swift SDK
   ```

3. Open `sdks\ios\UdeneSDK.podspec` and update the version:
   ```ruby
   s.version          = '1.0.4' # Change to your new version
   ```

### 2. Test the SDK

Before testing, you can run our fix script to automatically correct common issues in the test files:

```bash
scripts\fix-swift-tests.bat
```

This script will:
- Fix syntax issues in XCTestManifests.swift
- Fix duplicate code in LinuxMain.swift
- Skip networking tests on Windows
- Add a Windows-specific test file

After running the fix script, build and test the SDK:

```bash
cd sdks\ios
swift build
swift test
```

If you still encounter test failures, you can continue with the publishing process anyway, as the GitHub Actions workflow is configured to handle test failures on Windows.

### 3. Commit Your Changes

```bash
git add sdks\ios\Sources\UdeneSDK\UdeneClient.swift sdks\ios\Package.swift sdks\ios\UdeneSDK.podspec
git commit -m "Bump Swift SDK version to 1.0.4"
```

### 4. Create and Push a Tag

```bash
git tag swift-v1.0.4
git push origin swift-v1.0.4
```

### 5. Monitor the GitHub Actions Workflow

After pushing the tag, the GitHub Actions workflow will automatically:

1. Build and test the SDK on multiple platforms
2. Create an XCFramework for Apple platforms
3. Create a GitHub release with the XCFramework attached
4. Publish to CocoaPods (if configured)

You can monitor the progress in the "Actions" tab of the GitHub repository.

## Troubleshooting

### Common Issues on Windows

1. **Test failures related to networking**:
   - Windows Swift networking support may be limited
   - Consider adding platform-specific conditionals to skip certain tests on Windows

2. **File path issues**:
   - Windows uses backslashes (`\`) while Unix uses forward slashes (`/`)
   - Swift generally handles this automatically, but be careful in scripts

3. **Line ending differences**:
   - Windows uses CRLF (`\r\n`) while Unix uses LF (`\n`)
   - Configure Git to handle line endings appropriately

4. **Test file syntax errors**:
   - If you encounter errors in `XCTestManifests.swift` or `LinuxMain.swift`, check for syntax issues
   - Common problems include:
     - Missing line breaks after `#endif`
     - Duplicate code in test files
     - Missing or incorrect imports

### Fixing Common Test File Issues

If you encounter errors in the test files, here's how to fix them:

#### XCTestManifests.swift

If you see an error like `no macro named 'endifimport'`, check for missing line breaks:

```swift
// Incorrect:
#endif import XCTest

// Correct:
#endif
import XCTest
```

#### LinuxMain.swift

If you see duplicate code or errors about redeclaration of variables:

```swift
// Incorrect (duplicated code):
import XCTest
import UdeneSDKTests
var tests = [XCTestCaseEntry]()
tests += UdeneSDKTests.allTests()
XCTMain(tests)import XCTest
import UdeneSDKTests
var tests = [XCTestCaseEntry]()
tests += UdeneSDKTests.allTests()
XCTMain(tests)

// Correct:
import XCTest
import UdeneSDKTests
var tests = [XCTestCaseEntry]()
tests += UdeneSDKTests.allTests()
XCTMain(tests)
```

### If the GitHub Actions Workflow Fails

1. Check the workflow logs for specific error messages
2. Make necessary corrections to the code or configuration
3. Create a new tag with an incremented version number
4. Push the new tag to trigger the workflow again