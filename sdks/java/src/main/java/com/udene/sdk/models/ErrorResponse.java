
package com.udene.sdk.models;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Error response from the API
 */
public class ErrorResponse {
    @JsonProperty("error")
    private String error;
    
    @JsonProperty("retry_after")
    private Integer retryAfter;
    
    /**
     * Default constructor for Jackson
     */
    public ErrorResponse() {
    }
    
    /**
     * Constructor with error message
     * 
     * @param error Error message
     */
    public ErrorResponse(String error) {
        this.error = error;
    }
    
    /**
     * Constructor with error message and retry after
     * 
     * @param error Error message
     * @param retryAfter Retry after in seconds
     */
    public ErrorResponse(String error, Integer retryAfter) {
        this.error = error;
        this.retryAfter = retryAfter;
    }
    
    /**
     * Get the error message
     * 
     * @return Error message
     */
    public String getError() {
        return error;
    }
    
    /**
     * Get the retry after value
     * 
     * @return Retry after in seconds
     */
    public Integer getRetryAfter() {
        return retryAfter;
    }
}
