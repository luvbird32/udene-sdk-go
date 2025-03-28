
package com.udene.sdk.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

/**
 * Activity item from activity endpoint
 */
public class ActivityItem {
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("timestamp")
    private String timestamp;
    
    @JsonProperty("type")
    private String type;
    
    @JsonProperty("userId")
    private String userId;
    
    @JsonProperty("data")
    private Map<String, Object> data;
    
    /**
     * Default constructor for Jackson
     */
    public ActivityItem() {
    }
    
    /**
     * Constructor with all fields
     * 
     * @param id Activity identifier
     * @param timestamp When the activity occurred
     * @param type Type of activity
     * @param userId User identifier
     * @param data Additional data
     */
    public ActivityItem(String id, String timestamp, String type, String userId, Map<String, Object> data) {
        this.id = id;
        this.timestamp = timestamp;
        this.type = type;
        this.userId = userId;
        this.data = data;
    }
    
    /**
     * Get the activity identifier
     * 
     * @return Activity identifier
     */
    public String getId() {
        return id;
    }
    
    /**
     * Get when the activity occurred
     * 
     * @return Activity timestamp
     */
    public String getTimestamp() {
        return timestamp;
    }
    
    /**
     * Get the type of activity
     * 
     * @return Activity type
     */
    public String getType() {
        return type;
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
     * Get additional data
     * 
     * @return Additional data
     */
    public Map<String, Object> getData() {
        return data;
    }
}
