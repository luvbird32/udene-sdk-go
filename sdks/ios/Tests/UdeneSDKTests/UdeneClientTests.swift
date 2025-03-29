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
    
    static var allTests = [
        ("testClientInitialization", testClientInitialization),
        ("testClientWithCustomBaseURL", testClientWithCustomBaseURL),
    ]
}