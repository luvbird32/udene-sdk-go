
import Foundation

/// Client for interacting with the Udene Fraud Detection API
public class UdeneClient {
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
        
        let version = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
        self.userAgent = "UdeneSDK/\(version) iOS/\(UIDevice.current.systemVersion)"
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
        request.addValue("1.0.0", forHTTPHeaderField: "X-Client-Version")
        request.addValue("ios", forHTTPHeaderField: "X-SDK-Type")
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
