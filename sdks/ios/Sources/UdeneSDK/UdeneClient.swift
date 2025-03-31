
import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
#if canImport(UIKit)
import UIKit
#endif

/// SDK Version
public let kUdeneSDKVersion = "1.0.3"

/// Client for interacting with the Udene Fraud Detection API
public class UdeneClient {
    /// The SDK version
    public static var sdkVersion: String {
        return kUdeneSDKVersion
    }

    /// Determines if the code is running on an Apple platform
    public static func isApplePlatform() -> Bool {
        #if os(macOS) || os(iOS) || os(tvOS) || os(watchOS)
        return true
        #else
        return false
        #endif
    }

    /// Determines if the code is running on Windows
    public static func isWindowsPlatform() -> Bool {
        #if os(Windows)
        return true
        #else
        return false
        #endif
    }

    /// Determines if the code is running on Linux
    public static func isLinuxPlatform() -> Bool {
        #if os(Linux)
        return true
        #else
        return false
        #endif
    }

    /// Returns the current platform name
    public static func platformName() -> String {
        #if os(iOS)
        return "iOS"
        #elseif os(macOS)
        return "macOS"
        #elseif os(tvOS)
        return "tvOS"
        #elseif os(watchOS)
        return "watchOS"
        #elseif os(Windows)
        return "Windows"
        #elseif os(Linux)
        return "Linux"
        #else
        return "Unknown"
        #endif
    }
    /// API Key for authentication
    private let apiKey: String
    
    /// Base URL for API requests
    private let baseURL: URL
    
    /// URLSession for network requests
    private let session: URLSession
    
    /// User-Agent string for requests
    private let userAgent: String
    
    /// Initializes a new UdeneClient
    /// - Parameters:
    ///   - apiKey: Your Udene API key
    ///   - baseURL: Optional custom base URL for the API
    ///   - session: Optional custom URLSession
    public init(
        apiKey: String,
        baseURLString: String = "https://udene.net/v1",
        session: URLSession = .shared
    ) {
        self.apiKey = apiKey
        
        guard let url = URL(string: baseURLString) else {
            fatalError("Invalid base URL: \(baseURLString)")
        }
        
        self.baseURL = url
        self.session = session
        
        var appVersion = kUdeneSDKVersion
        #if os(iOS)
            if let bundleVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String {
                appVersion = bundleVersion
            }
            self.userAgent = "UdeneSDK/\(kUdeneSDKVersion) iOS/\(UIDevice.current.systemVersion) App/\(appVersion)"
        #elseif os(macOS)
            self.userAgent = "UdeneSDK/\(kUdeneSDKVersion) macOS Swift/5.7"
        #elseif os(Windows)
            self.userAgent = "UdeneSDK/\(kUdeneSDKVersion) Windows Swift/5.7"
        #elseif os(Linux)
            self.userAgent = "UdeneSDK/\(kUdeneSDKVersion) Linux Swift/5.7"
        #else
            self.userAgent = "UdeneSDK/\(kUdeneSDKVersion) Swift/5.7"
        #endif
    }
    
    /// Gets fraud metrics
    /// - Parameter completion: Completion handler with Result
    public func getMetrics(completion: @escaping (Result<Metrics, UdeneError>) -> Void) {
        let url = baseURL.appendingPathComponent("metrics")
        var request = URLRequest(url: url)
        
        addHeaders(to: &request)
        
        let task = session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(.networkError(error)))
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse else {
                completion(.failure(.invalidResponse))
                return
            }
            
            self.handleResponse(data: data, response: httpResponse, completion: completion)
        }
        
        task.resume()
    }
    
    /// Tracks a user interaction
    /// - Parameters:
    ///   - userId: User identifier
    ///   - action: Action name
    ///   - metadata: Additional metadata
    ///   - completion: Completion handler with Result
    public func trackInteraction(
        userId: String,
        action: String,
        metadata: [String: Any]? = nil,
        completion: @escaping (Result<InteractionResponse, UdeneError>) -> Void
    ) {
        let url = baseURL.appendingPathComponent("track")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        
        addHeaders(to: &request)
        
        var body: [String: Any] = [
            "userId": userId,
            "action": action
        ]
        
        if let metadata = metadata {
            body["metadata"] = metadata
        }
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        } catch {
            completion(.failure(.encodingError(error)))
            return
        }
        
        let task = session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(.networkError(error)))
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse else {
                completion(.failure(.invalidResponse))
                return
            }
            
            self.handleResponse(data: data, response: httpResponse, completion: completion)
        }
        
        task.resume()
    }
    
    /// Gets activity data
    /// - Parameter completion: Completion handler with Result
    public func getActivity(completion: @escaping (Result<Activity, UdeneError>) -> Void) {
        let url = baseURL.appendingPathComponent("activity")
        var request = URLRequest(url: url)
        
        addHeaders(to: &request)
        
        let task = session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(.networkError(error)))
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse else {
                completion(.failure(.invalidResponse))
                return
            }
            
            self.handleResponse(data: data, response: httpResponse, completion: completion)
        }
        
        task.resume()
    }
    
    // MARK: - Private helpers
    
    private func addHeaders(to request: inout URLRequest) {
        request.addValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue(userAgent, forHTTPHeaderField: "User-Agent")
        request.addValue(kUdeneSDKVersion, forHTTPHeaderField: "X-Client-Version")
        request.addValue(UdeneClient.platformName().lowercased(), forHTTPHeaderField: "X-SDK-Type")
    }
    
    private func handleResponse<T: Decodable>(
        data: Data?,
        response: HTTPURLResponse,
        completion: @escaping (Result<T, UdeneError>) -> Void
    ) {
        switch response.statusCode {
        case 200...299:
            guard let data = data else {
                completion(.failure(.noData))
                return
            }
            
            do {
                let decoder = JSONDecoder()
                decoder.keyDecodingStrategy = .convertFromSnakeCase
                let result = try decoder.decode(T.self, from: data)
                completion(.success(result))
            } catch {
                completion(.failure(.decodingError(error)))
            }
            
        case 401:
            completion(.failure(.unauthorized))
            
        case 429:
            let retryAfter = response.value(forHTTPHeaderField: "Retry-After")
                .flatMap { Int($0) } ?? 60
            completion(.failure(.rateLimit(retryAfter: retryAfter)))
            
        case 400...499:
            completion(.failure(.clientError(statusCode: response.statusCode)))
            
        case 500...599:
            completion(.failure(.serverError(statusCode: response.statusCode)))
            
        default:
            completion(.failure(.unknown))
        }
    }
}
