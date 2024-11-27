package com.fraud.sdk;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class FraudClient {
    private final String apiKey;
    private final String baseUrl;
    private final HttpClient client;
    private final ObjectMapper mapper;

    public FraudClient(String apiKey) {
        this(apiKey, "https://api.example.com/v1");
    }

    public FraudClient(String apiKey, String baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.client = HttpClient.newHttpClient();
        this.mapper = new ObjectMapper();
    }

    public FraudMetrics getMetrics() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + "/metrics"))
            .header("Authorization", "Bearer " + apiKey)
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        return mapper.readValue(response.body(), FraudMetrics.class);
    }

    // Additional methods for activity and tracking...
}