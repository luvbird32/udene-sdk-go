
import Foundation

/// Fraud metrics data
public struct Metrics: Codable {
    /// Risk score (0-100)
    public let riskScore: Double

    /// Number of active users
    public let activeUsers: Int

    /// Number of alert events
    public let alertCount: Int
}
