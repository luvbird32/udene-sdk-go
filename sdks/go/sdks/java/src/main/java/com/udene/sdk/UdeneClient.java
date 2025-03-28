
package com.udene.sdk;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.udene.sdk.exceptions.ClientException;
import com.udene.sdk.exceptions.RateLimitException;
import com.udene.sdk.exceptions.ServerException;
import com.udene.sdk.exceptions.UdeneApiException;
import com.udene.sdk.models.ActivityResponse;
import com.udene.sdk.models.ErrorResponse;
import com.udene.sdk.models.InteractionData;
import com.udene.sdk.models.InteractionResponse;
import com.udene.sdk.models.MetricsResponse;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

/**
 * Client for interacting with the Udene Fraud Detection API
 */
public class UdeneClient {
    private final String apiKey;
    private final String baseUrl;
    private final HttpClient client;
    private final ObjectMapper mapper;
    
    /**
     * Creates a new UdeneClient with the default API URL
     * 
     * @param apiKey API key for authentication
     */
    public UdeneClient(String apiKey) {
        this(apiKey, "https://api.udene.com/v1");
    }
    
    /**
     * Creates a new UdeneClient with a custom API URL
     * 
     * @param apiKey API key for authentication
     * @param baseUrl Base URL for the API
     */
    public UdeneClient(String apiKey, String baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(30))
            .build();
        this.mapper = new ObjectMapper();
    }
    
    /**
     * Get fraud metrics data
     * 
     * @return Metrics data
     * @throws UdeneApiException If an API error occurs
     * @throws IOException If an I/O error occurs
     * @throws InterruptedException If the operation is interrupted
     */
    public MetricsResponse getMetrics() throws UdeneApiException, IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/metrics"))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .header("X-Client-Version", "1.0.0")
            .header("X-SDK-Type", "java")
            .GET()
            .build();
        
        return executeRequest(request, MetricsResponse.class);
    }
    
    /**
     * Track a user interaction for fraud analysis
     * 
     * @param interaction Interaction data to track
     * @return Response from the tracking operation
     * @throws UdeneApiException If an API error occurs
     * @throws IOException If an I/O error occurs
     * @throws InterruptedException If the operation is interrupted
     */
    public InteractionResponse trackInteraction(InteractionData interaction) 
            throws UdeneApiException, IOException, InterruptedException {
        String json = mapper.writeValueAsString(interaction);
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/track"))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .header("X-Client-Version", "1.0.0")
            .header("X-SDK-Type", "java")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();
        
        return executeRequest(request, InteractionResponse.class);
    }
    
    /**
     * Get user activity data
     * 
     * @return Activity data
     * @throws UdeneApiException If an API error occurs
     * @throws IOException If an I/O error occurs
     * @throws InterruptedException If the operation is interrupted
     */
    public ActivityResponse getActivity() throws UdeneApiException, IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/activity"))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .header("X-Client-Version", "1.0.0")
            .header("X-SDK-Type", "java")
            .GET()
            .build();
        
        return executeRequest(request, ActivityResponse.class);
    }
    
    /**
     * Analyze a transaction for fraud
     * 
     * @param transactionData Transaction data to analyze
     * @return Analysis results
     * @throws UdeneApiException If an API error occurs
     * @throws IOException If an I/O error occurs
     * @throws InterruptedException If the operation is interrupted
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> analyzeTransaction(Map<String, Object> transactionData) 
            throws UdeneApiException, IOException, InterruptedException {
        String json = mapper.writeValueAsString(transactionData);
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/analyze-transaction"))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .header("X-Client-Version", "1.0.0")
            .header("X-SDK-Type", "java")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();
        
        return executeRequest(request, Map.class);
    }
    
    /**
     * Execute an HTTP request and parse the response
     * 
     * @param request HTTP request to execute
     * @param responseType Type of response to parse
     * @param <T> Response type
     * @return Parsed response
     * @throws UdeneApiException If an API error occurs
     * @throws IOException If an I/O error occurs
     * @throws InterruptedException If the operation is interrupted
     */
    private <T> T executeRequest(HttpRequest request, Class<T> responseType) 
            throws UdeneApiException, IOException, InterruptedException {
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() >= 200 && response.statusCode() < 300) {
            return mapper.readValue(response.body(), responseType);
        } else {
            handleErrorResponse(response.statusCode(), response.body());
            // The line above will throw an exception, but we need to return something to satisfy the compiler
            return null;
        }
    }
    
    /**
     * Handle error responses from the API
     * 
     * @param statusCode HTTP status code
     * @param responseBody Response body
     * @throws UdeneApiException Appropriate exception for the error
     */
    private void handleErrorResponse(int statusCode, String responseBody) throws UdeneApiException {
        // Handle rate limiting
        if (statusCode == 429) {
            int retryAfter = 60; // Default to 60 seconds
            try {
                ErrorResponse error = mapper.readValue(responseBody, ErrorResponse.class);
                if (error.getRetryAfter() != null) {
                    retryAfter = error.getRetryAfter();
                }
            } catch (IOException e) {
                // Ignore parsing error, use default retry after
            }
            throw new RateLimitException("Rate limit exceeded", retryAfter);
        }
        
        // Try to parse error message
        String errorMessage;
        try {
            ErrorResponse error = mapper.readValue(responseBody, ErrorResponse.class);
            errorMessage = error.getError();
        } catch (IOException e) {
            errorMessage = "Unknown error";
        }
        
        // Throw appropriate exception
        if (statusCode >= 400 && statusCode < 500) {
            throw new ClientException(errorMessage, statusCode);
        } else if (statusCode >= 500) {
            throw new ServerException(errorMessage, statusCode);
        } else {
            throw new UdeneApiException("Unexpected status code: " + statusCode);
        }
    }
}
