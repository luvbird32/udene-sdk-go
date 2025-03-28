
package com.udene.sdk.exceptions;

/**
 * Exception for rate limit errors
 */
public class RateLimitException extends UdeneApiException {
    private final int retryAfter;
    
    /**
     * Creates a new RateLimitException
     * 
     * @param message Error message
     * @param retryAfter Seconds to wait before retrying
     */
    public RateLimitException(String message, int retryAfter) {
        super(message + ". Retry after " + retryAfter + " seconds");
        this.retryAfter = retryAfter;
    }
    
    /**
     * Get seconds to wait before retrying
     * 
     * @return Seconds to wait
     */
    public int getRetryAfter() {
        return retryAfter;
    }
}
