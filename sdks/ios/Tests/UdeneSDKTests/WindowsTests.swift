import XCTest 
@testable import UdeneSDK 
 
final class WindowsTests: XCTestCase { 
    func testWindowsSpecific() { 
        XCTAssertTrue(true, "Windows test passed") 
    } 
 
    static var allTests = [ 
        ("testWindowsSpecific", testWindowsSpecific), 
    ] 
} 
