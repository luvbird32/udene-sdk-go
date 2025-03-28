
package com.udene.sdk.exceptions

/**
 * Base exception for API errors
 */
open class UdeneApiException(
    message: String,
    cause: Throwable? = null
) : Exception(message, cause)

/**
 * Exception for client errors (400-level)
 */
class ClientException(
    message: String,
    val statusCode: Int
) : UdeneApiException("Client error ($statusCode): $message")

/**
 * Exception for server errors (500-level)
 */
class ServerException(
    message: String,
    val statusCode: Int
) : UdeneApiException("Server error ($statusCode): $message")

/**
 * Exception for rate limit errors
 */
class RateLimitException(
    message: String,
    val retryAfter: Int
) : UdeneApiException("$message. Retry after $retryAfter seconds")
