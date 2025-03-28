
package com.udene.sdk.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

/**
 * Data for tracking an interaction
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InteractionData {
    @JsonProperty("userId")
    private String userId;
    
    @JsonProperty("action")
    private String action;
    
    @JsonProperty("metadata")
    private Map<String, Object> metadata;
    
    /**
     * Default constructor for Jackson
     */
    public InteractionData() {
    }
    
    /**
     * Constructor with all fields
     * 
     * @param userId User identifier
     * @param action Action performed
     * @param metadata Additional metadata
     */
    public InteractionData(String userId, String action, Map<String, Object> metadata) {
        this.userId = userId;
        this.action = action;
        this.metadata = metadata;
    }
    
    /**
     * Get the user identifier
     * 
     * @return User identifier
     */
    public String getUserId() {
        return userId;
    }
    
    /**
     * Set the user identifier
     * 
     * @param userId User identifier
     * @return This object for method chaining
     */
    public InteractionData setUserId(String userId) {
        this.userId = userId;
        return this;
    }
    
    /**
     * Get the action performed
     * 
     * @return Action performed
     */
    public String getAction() {
        return action;
    }
    
    /**
     * Set the action performed
     * 
     * @param action Action performed
     * @return This object for method chaining
     */
    public InteractionData setAction(String action) {
        this.action = action;
        return this;
    }
    
    /**
     * Get additional metadata
     * 
     * @return Additional metadata
     */
    public Map<String, Object> getMetadata() {
        return metadata;
    }
    
    /**
     * Set additional metadata
     * 
     * @param metadata Additional metadata
     * @return This object for method chaining
     */
    public InteractionData setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
        return this;
    }
}
