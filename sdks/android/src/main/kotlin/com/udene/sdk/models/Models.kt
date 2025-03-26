
package com.udene.sdk.models

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

/**
 * Response from metrics endpoint
 */
@JsonClass(generateAdapter = true)
data class MetricsResponse(
    @Json(name = "riskScore") val riskScore: Double,
    @Json(name = "activeUsers") val activeUsers: Int,
    @Json(name = "alertCount") val alertCount: Int
)

/**
 * Data for tracking an interaction
 */
@JsonClass(generateAdapter = true)
data class InteractionData(
    @Json(name = "userId") val userId: String,
    @Json(name = "action") val action: String,
    @Json(name = "metadata") val metadata: Map<String, Any>? = null
)

/**
 * Response from track interaction endpoint
 */
@JsonClass(generateAdapter = true)
data class InteractionResponse(
    @Json(name = "success") val success: Boolean,
    @Json(name = "transactionId") val transactionId: String? = null
)

/**
 * Activity item
 */
@JsonClass(generateAdapter = true)
data class ActivityItem(
    @Json(name = "id") val id: String,
    @Json(name = "timestamp") val timestamp: String,
    @Json(name = "type") val type: String,
    @Json(name = "userId") val userId: String,
    @Json(name = "data") val data: Map<String, Any>
)

/**
 * Response from activity endpoint
 */
@JsonClass(generateAdapter = true)
data class ActivityResponse(
    @Json(name = "activities") val activities: List<ActivityItem>,
    @Json(name = "total") val total: Int
)

/**
 * Error response from API
 */
@JsonClass(generateAdapter = true)
internal data class ErrorResponse(
    @Json(name = "error") val error: String
)
