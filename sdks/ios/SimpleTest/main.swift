// Simple test for UdeneSDK
import Foundation

print("UdeneSDK Simple Test")
print("Testing UdeneSDK version 1.0.5")

// Import the SDK modules directly
// This is a simple test to verify the SDK structure

// List the contents of the SDK directory
let process = Process()
process.executableURL = URL(fileURLWithPath: "C:\\Program Files\\Git\\bin\\ls.exe")
process.arguments = ["-la", "../Sources/UdeneSDK"]

let pipe = Pipe()
process.standardOutput = pipe
process.standardError = pipe

do {
    try process.run()
    process.waitUntilExit()
    
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    if let output = String(data: data, encoding: .utf8) {
        print("SDK Directory Contents:")
        print(output)
    }
} catch {
    print("Error: \(error)")
}

print("Simple test completed!")