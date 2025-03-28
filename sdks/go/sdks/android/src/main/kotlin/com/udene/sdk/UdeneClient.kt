
package com.udene.sdk

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import com.udene.sdk.exceptions.ClientException
import com.udene.sdk.exceptions.RateLimitException
import com.udene.sdk.exceptions.ServerException
import com.udene.sdk.exceptions.UdeneApiException
import com.udene.sdk.models.ActivityResponse
import com.udene.sdk.models.ErrorResponse
import com.udene.sdk.models.InteractionData
import com.udene.sdk.models.InteractionResponse
import com.udene.sdk.models.MetricsResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.IOException
import java.util.concurrent.TimeUnit

/**
 * Client for interacting with the Udene Fraud Detection API
 *
 * @param apiKey API key for authentication
 * @param baseURL Base URL for API requests (optional)
 * @param httpClient Custom OkHttpClient (optional)
 */
class UdeneClient(
    private val apiKey: String,
    private val baseURL: String = "https://udene.net/v1",
    httpClient: OkHttpClient? = null
) {
    private val client: OkHttpClient = httpClient ?: OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()

    private val moshi: Moshi = Moshi.Builder()
        .addLast(KotlinJsonAdapterFactory())
        .build()

    /**
     * Get fraud metrics
     *
     * @return Metrics data
     * @throws UdeneApiException if the API request fails
     * @throws RateLimitException if the rate limit is exceeded
     */
    @Throws(UdeneApiException::class, RateLimitException::class)
    suspend fun getMetrics(): MetricsResponse = withContext(Dispatchers.IO) {
        val request = buildRequest("metrics")
        executeRequest(request, MetricsResponse::class.java)
    }

    /**
     * Get activity data
     *
     * @return Activity data
     * @throws UdeneApiException if the API request fails
     * @throws RateLimitException if the rate limit is exceeded
     */
    @Throws(UdeneApiException::class, RateLimitException::class)
    suspend fun getActivity(): ActivityResponse = withContext(Dispatchers.IO) {
        val request = buildRequest("activity")
        executeRequest(request, ActivityResponse::class.java)
    }

    /**
     * Track a user interaction
     *
     * @param data Interaction data
     * @return Interaction response
     * @throws UdeneApiException if the API request fails
     * @throws RateLimitException if the rate limit is exceeded
     */
    @Throws(UdeneApiException::class, RateLimitException::class)
    suspend fun trackInteraction(data: InteractionData): InteractionResponse = withContext(Dispatchers.IO) {
        val jsonAdapter = moshi.adapter(InteractionData::class.java)
        val json = jsonAdapter.toJson(data)
        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = json.toRequestBody(mediaType)
        
        val request = buildRequest("track", "POST", body)
        executeRequest(request, InteractionResponse::class.java)
    }

    /**
     * Analyze a transaction for fraud
     *
     * @param transactionData Transaction data
     * @return Analysis results
     * @throws UdeneApiException if the API request fails
     * @throws RateLimitException if the rate limit is exceeded
     */
    @Throws(UdeneApiException::class, RateLimitException::class)
    suspend fun analyzeTransaction(transactionData: Map<String, Any>): Map<String, Any> = withContext(Dispatchers.IO) {
        val jsonAdapter = moshi.adapter(Map::class.java)
        val json = jsonAdapter.toJson(transactionData)
        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = json.toRequestBody(mediaType)
        
        val request = buildRequest("analyze-transaction", "POST", body)
        executeRequest(request, Map::class.java) as Map<String, Any>
    }

    // Private helper methods

    private fun buildRequest(
        endpoint: String,
        method: String = "GET",
        body: okhttp3.RequestBody? = null
    ): Request {
        val builder = Request.Builder()
            .url("$baseURL/$endpoint")
            .header("Authorization", "Bearer $apiKey")
            .header("Content-Type", "application/json")
            .header("X-Client-Version", "1.0.0")
            .header("X-SDK-Type", "android")

        when (method) {
            "GET" -> builder.get()
            "POST" -> builder.post(body!!)
            "PUT" -> builder.put(body!!)
            "DELETE" -> builder.delete(body)
        }

        return builder.build()
    }

    private fun <T> executeRequest(request: Request, responseType: Class<T>): T {
        try {
            client.newCall(request).execute().use { response ->
                val responseBody = response.body?.string()
                
                if (response.isSuccessful && responseBody != null) {
                    val jsonAdapter = moshi.adapter(responseType)
                    return jsonAdapter.fromJson(responseBody)
                        ?: throw UdeneApiException("Failed to parse response")
                } else {
                    handleErrorResponse(response.code, responseBody)
                }
            }
        } catch (e: IOException) {
            throw UdeneApiException("Network error: ${e.message}", e)
        }
    }

    private fun handleErrorResponse(statusCode: Int, responseBody: String?): Nothing {
        // Handle rate limiting
        if (statusCode == 429) {
            throw RateLimitException("Rate limit exceeded", 60)
        }

        // Try to parse error response
        val errorMessage = try {
            val errorAdapter = moshi.adapter(ErrorResponse::class.java)
            val errorResponse = responseBody?.let { errorAdapter.fromJson(it) }
            errorResponse?.error ?: "Unknown error"
        } catch (e: Exception) {
            "Failed to parse error response"
        }

        // Throw appropriate exception based on status code
        when (statusCode) {
            in 400..499 -> throw ClientException(errorMessage, statusCode)
            in 500..599 -> throw ServerException(errorMessage, statusCode)
            else -> throw UdeneApiException("Unexpected status code: $statusCode")
        }
    }
}
