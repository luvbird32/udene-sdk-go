import Foundation

/// Type for encoding/decoding arbitrary JSON values
public struct AnyCodable: Codable {
    private let value: Any

    public init(_ value: Any) {
        self.value = value
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()

        if container.decodeNil() {
            self.value = NSNull()
        } else if let bool = try? container.decode(Bool.self) {
            self.value = bool
        } else if let int = try? container.decode(Int.self) {
            self.value = int
        } else if let double = try? container.decode(Double.self) {
            self.value = double
        } else if let string = try? container.decode(String.self) {
            self.value = string
        } else if let array = try? container.decode([AnyCodable].self) {
            self.value = array.map { $0.value }
        } else if let dictionary = try? container.decode([String: AnyCodable].self) {
            self.value = dictionary.mapValues { $0.value }
        } else {
            throw DecodingError.dataCorruptedError(
                in: container,
                debugDescription: "Unable to decode value"
            )
        }
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()

        switch self.value {
        case is NSNull:
            try container.encodeNil()
        case let bool as Bool:
            try container.encode(bool)
        case let int as Int:
            try container.encode(int)
        case let double as Double:
            try container.encode(double)
        case let string as String:
            try container.encode(string)
        case let array as [Any]:
            try container.encode(array.map { AnyCodable($0) })
        case let dictionary as [String: Any]:
            try container.encode(dictionary.mapValues { AnyCodable($0) })
        default:
            let context = EncodingError.Context(
                codingPath: container.codingPath,
                debugDescription: "Unable to encode value \(self.value)"
            )
            throw EncodingError.invalidValue(self.value, context)
        }
    }
}

/// Represents metrics data from the API
public struct Metrics: Codable {
    /// Risk score (0-100)
    public let riskScore: Double

    /// Number of active users
    public let activeUsers: Int

    /// Number of alert events
    public let alertCount: Int
}

/// Represents a response from tracking an interaction
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

/// Represents activity data from the API
public struct Activity: Codable {
    /// List of activity items
    public let activities: [ActivityItem]

    /// Total number of activities
    public let total: Int

    /// Pagination information (optional)
    public let pagination: Pagination?
}

/// Represents a single activity item
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