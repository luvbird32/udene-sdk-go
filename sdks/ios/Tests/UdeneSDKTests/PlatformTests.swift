import XCTest
@testable import UdeneSDK

final class PlatformTests: XCTestCase {
    
    func testPlatformSpecificCode() {
        // This test verifies that platform-specific code works correctly
        
        #if os(macOS) || os(iOS) || os(tvOS) || os(watchOS)
        // Test Apple platform specific functionality
        XCTAssertTrue(UdeneClient.isApplePlatform())
        #elseif os(Windows)
        // Test Windows specific functionality
        XCTAssertTrue(UdeneClient.isWindowsPlatform())
        #elseif os(Linux)
        // Test Linux specific functionality
        XCTAssertTrue(UdeneClient.isLinuxPlatform())
        #endif
        
        // Test that the SDK version is correctly set
        XCTAssertFalse(UdeneClient.sdkVersion.isEmpty)
    }
    
    func testNetworkingWorks() {
        // This test verifies that basic networking works on all platforms
        let expectation = XCTestExpectation(description: "Network request completes")
        
        // Create a simple URLSession data task
        let url = URL(string: "https://httpbin.org/get")!
        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            // Just verify we can make network requests
            XCTAssertNil(error, "Network request failed: \(String(describing: error))")
            XCTAssertNotNil(data, "No data received")
            
            if let httpResponse = response as? HTTPURLResponse {
                XCTAssertEqual(httpResponse.statusCode, 200, "Expected 200 status code")
            }
            
            expectation.fulfill()
        }
        task.resume()
        
        wait(for: [expectation], timeout: 10.0)
    }
    
    func testFileSystemAccess() {
        // This test verifies that file system access works on all platforms
        let tempFileURL = FileManager.default.temporaryDirectory.appendingPathComponent("udene_test_file.txt")
        let testString = "UdeneSDK cross-platform test"
        
        do {
            try testString.write(to: tempFileURL, atomically: true, encoding: .utf8)
            let readString = try String(contentsOf: tempFileURL, encoding: .utf8)
            XCTAssertEqual(readString, testString, "File content doesn't match what was written")
            
            try FileManager.default.removeItem(at: tempFileURL)
            XCTAssertFalse(FileManager.default.fileExists(atPath: tempFileURL.path), "File should be deleted")
        } catch {
            XCTFail("File system operations failed: \(error)")
        }
    }
    
    static var allTests = [
        ("testPlatformSpecificCode", testPlatformSpecificCode),
        ("testNetworkingWorks", testNetworkingWorks),
        ("testFileSystemAccess", testFileSystemAccess),
    ]
}