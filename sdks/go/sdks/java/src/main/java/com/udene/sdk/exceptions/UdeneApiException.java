
package com.udene.sdk.exceptions;

/**
 * Base exception for API errors
 */
public class UdeneApiException extends Exception {
    /**
     * Creates a new UdeneApiException
     * 
     * @param message Error message
     */
    public UdeneApiException(String message) {
        super(message);
    }
    
    /**
     * Creates a new UdeneApiException
     * 
     * @param message Error message
     * @param cause Cause of the exception
     */
    public UdeneApiException(String message, Throwable cause) {
        super(message, cause);
    }
}
