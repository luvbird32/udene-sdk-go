import XCTest
@testable import UdeneSDK

final class UdeneClientTests: XCTestCase {
    func testClientInitialization() {
        let client = UdeneClient(apiKey: "test_api_key")
        XCTAssertNotNil(client)
    }

    func testClientWithCustomBaseURL() {
        let client = UdeneClient(apiKey: "test_api_key", baseURLString: "https://test.udene.net/v1")
        XCTAssertNotNil(client)
    }

    func testSDKVersion() {
        XCTAssertEqual(UdeneClient.sdkVersion, kUdeneSDKVersion)
        XCTAssertEqual(UdeneClient.sdkVersion, "1.0.3")
    }

    func testPlatformDetection() {
        // Only one of these should be true
        let platformCount = [
            UdeneClient.isApplePlatform(),
            UdeneClient.isWindowsPlatform(),
            UdeneClient.isLinuxPlatform()
        ].filter { $0 }.count

        XCTAssertEqual(platformCount, 1, "Exactly one platform should be detected")

        // Platform name should not be empty
        XCTAssertFalse(UdeneClient.platformName().isEmpty)
    }

    func testJSONSerialization() {
        // Test that we can serialize and deserialize JSON on all platforms
        let testData: [String: Any] = [
            "userId": "test123",
            "action": "login",
            "metadata": [
                "ipAddress": "127.0.0.1",
                "deviceId": "test-device"
            ]
        ]

        do {
            let jsonData = try JSONSerialization.data(withJSONObject: testData)
            XCTAssertFalse(jsonData.isEmpty)

            let deserializedData = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any]
            XCTAssertNotNil(deserializedData)
            XCTAssertEqual(deserializedData?["userId"] as? String, "test123")
        } catch {
            XCTFail("JSON serialization failed: \(error)")
        }
    }

    static var allTests = [
        ("testClientInitialization", testClientInitialization),
        ("testClientWithCustomBaseURL", testClientWithCustomBaseURL),
        ("testSDKVersion", testSDKVersion),
        ("testPlatformDetection", testPlatformDetection),
        ("testJSONSerialization", testJSONSerialization),
    ]
}