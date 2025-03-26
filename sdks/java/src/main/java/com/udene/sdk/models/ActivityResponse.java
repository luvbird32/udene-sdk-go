
package com.udene.sdk.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Response from activity endpoint
 */
public class ActivityResponse {
    @JsonProperty("activities")
    private List<ActivityItem> activities;
    
    @JsonProperty("total")
    private int total;
    
    /**
     * Default constructor for Jackson
     */
    public ActivityResponse() {
    }
    
    /**
     * Constructor with all fields
     * 
     * @param activities List of activities
     * @param total Total count of activities
     */
    public ActivityResponse(List<ActivityItem> activities, int total) {
        this.activities = activities;
        this.total = total;
    }
    
    /**
     * Get the list of activities
     * 
     * @return Activities
     */
    public List<ActivityItem> getActivities() {
        return activities;
    }
    
    /**
     * Get the total count of activities
     * 
     * @return Total count
     */
    public int getTotal() {
        return total;
    }
}
