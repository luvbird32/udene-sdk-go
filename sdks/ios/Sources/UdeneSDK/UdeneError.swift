
import Foundation

/// Errors that can occur when using the Udene SDK
public enum UdeneError: Error {
    /// No data received
    case noData
    
    /// Invalid response received
    case invalidResponse
    
    /// Authentication error
    case unauthorized
    
    /// Rate limit exceeded
    case rateLimit(retryAfter: Int)
    
    /// Network error
    case networkError(Error)
    
    /// Error encoding request data
    case encodingError(Error)
    
    /// Error decoding response data
    case decodingError(Error)
    
    /// Client-side error (400-level)
    case clientError(statusCode: Int)
    
    /// Server-side error (500-level)
    case serverError(statusCode: Int)
    
    /// Unknown error
    case unknown
}

extension UdeneError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .noData:
            return "No data received from server"
        case .invalidResponse:
            return "Invalid response from server"
        case .unauthorized:
            return "Unauthorized: Invalid API key"
        case .rateLimit(let retryAfter):
            return "Rate limit exceeded. Try again in \(retryAfter) seconds"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .encodingError(let error):
            return "Error encoding request: \(error.localizedDescription)"
        case .decodingError(let error):
            return "Error decoding response: \(error.localizedDescription)"
        case .clientError(let statusCode):
            return "Client error with status code: \(statusCode)"
        case .serverError(let statusCode):
            return "Server error with status code: \(statusCode)"
        case .unknown:
            return "Unknown error occurred"
        }
    }
}
