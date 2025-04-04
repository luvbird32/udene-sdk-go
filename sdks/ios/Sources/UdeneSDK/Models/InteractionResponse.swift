
import Foundation

/// Response from tracking an interaction
public struct InteractionResponse: Codable {
    /// Whether the tracking was successful
    public let success: Bool

    /// Optional transaction ID
    public let transactionId: String?

    /// The trust score for this interaction (optional)
    public let trustScore: Double?

    /// Any flags that were triggered (optional)
    public let flags: [String]?

    /// Whether the interaction was blocked (optional)
    public let blocked: Bool?

    /// Reason for blocking, if applicable (optional)
    public let blockReason: String?
}
