
import Foundation

/// Represents errors that can occur in the SDK
public enum UdeneError: Error {
    /// Network-related error
    case networkError(Error)

    /// No data received
    case noData

    /// Invalid response received
    case invalidResponse

    /// Error decoding data
    case decodingError(Error)

    /// Error encoding data
    case encodingError(Error)

    /// Unauthorized (invalid API key)
    case unauthorized

    /// Rate limit exceeded
    case rateLimit(retryAfter: Int)

    /// Client error (4xx)
    case clientError(statusCode: Int)

    /// Server error (5xx)
    case serverError(statusCode: Int)

    /// Unknown error
    case unknown
}

extension UdeneError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .noData:
            return "No data received from the server"
        case .invalidResponse:
            return "Invalid response from the server"
        case .decodingError(let error):
            return "Error decoding response: \(error.localizedDescription)"
        case .encodingError(let error):
            return "Error encoding request: \(error.localizedDescription)"
        case .unauthorized:
            return "Unauthorized: Invalid API key"
        case .rateLimit(let retryAfter):
            return "Rate limit exceeded. Try again in \(retryAfter) seconds"
        case .clientError(let statusCode):
            return "Client error: HTTP \(statusCode)"
        case .serverError(let statusCode):
            return "Server error: HTTP \(statusCode)"
        case .unknown:
            return "Unknown error occurred"
        }
    }
}
