import XCTest

#if !canImport(ObjectiveC)
public func allTests() -> [XCTestCaseEntry] {
    return [
        testCase(UdeneClientTests.allTests),
        testCase(PlatformTests.allTests),
        testCase(WindowsTests.allTests),
    ]
}
#endif
