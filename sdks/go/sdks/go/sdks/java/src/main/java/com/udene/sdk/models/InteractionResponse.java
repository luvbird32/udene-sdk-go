
package com.udene.sdk.models;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Response from track interaction endpoint
 */
public class InteractionResponse {
    @JsonProperty("success")
    private boolean success;
    
    @JsonProperty("transactionId")
    private String transactionId;
    
    /**
     * Default constructor for Jackson
     */
    public InteractionResponse() {
    }
    
    /**
     * Constructor with all fields
     * 
     * @param success Whether the operation was successful
     * @param transactionId Transaction identifier
     */
    public InteractionResponse(boolean success, String transactionId) {
        this.success = success;
        this.transactionId = transactionId;
    }
    
    /**
     * Get whether the operation was successful
     * 
     * @return True if successful
     */
    public boolean isSuccess() {
        return success;
    }
    
    /**
     * Get the transaction identifier
     * 
     * @return Transaction identifier
     */
    public String getTransactionId() {
        return transactionId;
    }
}
