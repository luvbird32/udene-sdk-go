
package com.udene.sdk.models;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Response from metrics endpoint
 */
public class MetricsResponse {
    @JsonProperty("riskScore")
    private double riskScore;
    
    @JsonProperty("activeUsers")
    private int activeUsers;
    
    @JsonProperty("alertCount")
    private int alertCount;
    
    /**
     * Default constructor for Jackson
     */
    public MetricsResponse() {
    }
    
    /**
     * Constructor with all fields
     * 
     * @param riskScore Risk score (0-100)
     * @param activeUsers Number of active users
     * @param alertCount Number of alert events
     */
    public MetricsResponse(double riskScore, int activeUsers, int alertCount) {
        this.riskScore = riskScore;
        this.activeUsers = activeUsers;
        this.alertCount = alertCount;
    }
    
    /**
     * Get the risk score
     * 
     * @return Risk score (0-100)
     */
    public double getRiskScore() {
        return riskScore;
    }
    
    /**
     * Get the number of active users
     * 
     * @return Number of active users
     */
    public int getActiveUsers() {
        return activeUsers;
    }
    
    /**
     * Get the number of alert events
     * 
     * @return Number of alert events
     */
    public int getAlertCount() {
        return alertCount;
    }
}
