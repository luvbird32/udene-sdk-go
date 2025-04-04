
import Foundation

/// Activity data
public struct Activity: Codable {
    /// List of activity items
    public let activities: [ActivityItem]

    /// Total number of activities
    public let total: Int

    /// Pagination information (optional)
    public let pagination: Pagination?
}

/// A single activity item
public struct ActivityItem: Codable {
    /// Activity ID
    public let id: String

    /// Timestamp of the activity
    public let timestamp: String

    /// Type of activity
    public let type: String

    /// Associated user ID
    public let userId: String

    /// Additional data
    public let data: [String: AnyCodable]

    /// Trust score for this activity (optional)
    public let trustScore: Double?

    /// Whether the activity was flagged (optional)
    public let flagged: Bool?

    /// Whether the activity was blocked (optional)
    public let blocked: Bool?
}

/// Represents pagination information
public struct Pagination: Codable {
    /// Current page number
    public let page: Int

    /// Number of items per page
    public let perPage: Int

    /// Total number of pages
    public let totalPages: Int

    /// Whether there is a next page
    public let hasNext: Bool

    /// Whether there is a previous page
    public let hasPrevious: Bool
}
