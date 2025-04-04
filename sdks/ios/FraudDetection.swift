import Foundation

/// Convenience class for interacting with the Udene Fraud Detection API
/// This is a simplified wrapper around UdeneClient
public class FraudClient {
    /// The underlying UdeneClient instance
    private let client: UdeneClient

    /// Initializes a new FraudClient
    /// - Parameters:
    ///   - apiKey: Your Udene API key
    ///   - baseURL: Optional custom base URL for the API
    public init(apiKey: String, baseURL: String = "https://api.udene.net/v1") {
        self.client = UdeneClient(apiKey: apiKey, baseURLString: baseURL)
    }

    /// Gets fraud metrics
    /// - Parameter completion: Completion handler with Result
    public func getMetrics(completion: @escaping (Result<Metrics, Error>) -> Void) {
        client.getMetrics { result in
            switch result {
            case .success(let metrics):
                completion(.success(metrics))
            case .failure(let error):
                completion(.failure(error))
            }
        }
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
        completion: @escaping (Result<InteractionResponse, Error>) -> Void
    ) {
        client.trackInteraction(
            userId: userId,
            action: action,
            metadata: metadata
        ) { result in
            switch result {
            case .success(let response):
                completion(.success(response))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }

    /// Gets activity data
    /// - Parameters:
    ///   - page: Page number (optional)
    ///   - perPage: Items per page (optional)
    ///   - completion: Completion handler with Result
    public func getActivity(
        page: Int? = nil,
        perPage: Int? = nil,
        completion: @escaping (Result<Activity, Error>) -> Void
    ) {
        client.getActivity(page: page, perPage: perPage) { result in
            switch result {
            case .success(let activity):
                completion(.success(activity))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }

    /// Analyzes user behavior for fraud detection
    /// - Parameters:
    ///   - userId: User identifier
    ///   - events: Array of behavior events
    ///   - completion: Completion handler with Result
    public func analyzeBehavior(
        userId: String,
        events: [[String: Any]],
        completion: @escaping (Result<InteractionResponse, Error>) -> Void
    ) {
        client.analyzeBehavior(userId: userId, events: events) { result in
            switch result {
            case .success(let response):
                completion(.success(response))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
}
