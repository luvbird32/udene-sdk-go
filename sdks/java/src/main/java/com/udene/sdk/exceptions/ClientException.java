
package com.udene.sdk.exceptions;

/**
 * Exception for client errors (400-level)
 */
public class ClientException extends UdeneApiException {
    private final int statusCode;
    
    /**
     * Creates a new ClientException
     * 
     * @param message Error message
     * @param statusCode HTTP status code
     */
    public ClientException(String message, int statusCode) {
        super("Client error (" + statusCode + "): " + message);
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
