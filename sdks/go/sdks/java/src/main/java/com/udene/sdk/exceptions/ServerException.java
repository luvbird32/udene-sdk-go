
package com.udene.sdk.exceptions;

/**
 * Exception for server errors (500-level)
 */
public class ServerException extends UdeneApiException {
    private final int statusCode;
    
    /**
     * Creates a new ServerException
     * 
     * @param message Error message
     * @param statusCode HTTP status code
     */
    public ServerException(String message, int statusCode) {
        super("Server error (" + statusCode + "): " + message);
        this.statusCode = statusCode;
    }
    
    /**
     * Get the HTTP status code
     * 
     * @return HTTP status code
     */
    public int getStatusCode() {
        return statusCode;
    }
}
