
import Foundation

/// Response from tracking an interaction
public struct InteractionResponse: Codable {
    /// Whether the tracking was successful
    public let success: Bool
    
    /// Optional transaction ID
    public let transactionId: String?
}
