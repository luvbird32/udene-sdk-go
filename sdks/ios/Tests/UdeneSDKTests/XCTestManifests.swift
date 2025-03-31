import XCTest

#if !canImport(ObjectiveC)
public func allTests() -> [XCTestCaseEntry] {
    return [
        testCase(UdeneClientTests.allTests),
        testCase(PlatformTests.allTests),
    ]
}
#endifimport XCTest

#if !canImport(ObjectiveC)
public func allTests() -> [XCTestCaseEntry] {
    return [
        testCase(UdeneClientTests.allTests),
    ]
}
#endif