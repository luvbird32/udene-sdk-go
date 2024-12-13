package com.example.fraudsdk

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException

class FraudClient(
    private val apiKey: String,
    private val baseURL: String = "https://api.example.com/v1"
) {
    private val client = OkHttpClient.Builder()
        .addInterceptor { chain ->
            val original = chain.request()
            val request = original.newBuilder()
                .header("Authorization", "Bearer $apiKey")
                .header("Content-Type", "application/json")
                .header("X-Platform", "android")
                .header("X-SDK-Version", "1.0.0")
                .header("X-SDK-Type", "android-native")
                .method(original.method, original.body)
                .build()
            chain.proceed(request)
        }
        .build()

    @Throws(IOException::class)
    suspend fun getMetrics(): MetricsResponse = withContext(Dispatchers.IO) {
        val request = Request.Builder()
            .url("$baseURL/metrics")
            .get()
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw IOException("Unexpected code $response")
            
            val body = response.body?.string() ?: throw IOException("Empty response")
            val json = JSONObject(body)
            
            MetricsResponse(
                riskScore = json.getDouble("riskScore"),
                activeUsers = json.getInt("activeUsers"),
                alertCount = json.getInt("alertCount")
            )
        }
    }

    @Throws(IOException::class)
    suspend fun trackInteraction(data: JSONObject): InteractionResponse = withContext(Dispatchers.IO) {
        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = data.toString().toRequestBody(mediaType)
        
        val request = Request.Builder()
            .url("$baseURL/track")
            .post(body)
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw IOException("Unexpected code $response")
            
            val responseBody = response.body?.string() ?: throw IOException("Empty response")
            val json = JSONObject(responseBody)
            
            InteractionResponse(
                success = json.getBoolean("success"),
                transactionId = json.optString("transactionId")
            )
        }
    }
}

data class MetricsResponse(
    val riskScore: Double,
    val activeUsers: Int,
    val alertCount: Int
)

data class InteractionResponse(
    val success: Boolean,
    val transactionId: String?
)