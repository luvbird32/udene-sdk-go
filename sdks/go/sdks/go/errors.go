
package udene

// Error represents a basic API error structure
type Error struct {
	Error string `json:"error"`
}

// APIError represents an error returned by the API
type APIError struct {
	Message    string
	StatusCode int
	RawBody    string
}

// Error implements the error interface for APIError
func (e *APIError) Error() string {
	return e.Message
}

// RateLimitError represents a rate limiting error
type RateLimitError struct {
	Message    string
	RetryAfter int
}

// Error implements the error interface for RateLimitError
func (e *RateLimitError) Error() string {
	return e.Message
}
