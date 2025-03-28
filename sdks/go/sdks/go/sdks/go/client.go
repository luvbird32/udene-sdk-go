
package udene

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

const (
	defaultBaseURL = "https://udene.net/v1"
	version        = "1.0.0"
)

// Client is the main entry point for the Udene SDK
type Client struct {
	httpClient *http.Client
	apiKey     string
	baseURL    string
}

// ClientOption is a function that modifies a Client
type ClientOption func(*Client)

// WithHTTPClient sets a custom HTTP client
func WithHTTPClient(httpClient *http.Client) ClientOption {
	return func(c *Client) {
		c.httpClient = httpClient
	}
}

// WithBaseURL sets a custom base URL for API requests
func WithBaseURL(baseURL string) ClientOption {
	return func(c *Client) {
		c.baseURL = baseURL
	}
}

// NewClient creates a new Udene API client
func NewClient(apiKey string, options ...ClientOption) *Client {
	client := &Client{
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
		apiKey:  apiKey,
		baseURL: defaultBaseURL,
	}

	for _, option := range options {
		option(client)
	}

	return client
}

// doRequest performs an HTTP request and processes the response
func (c *Client) doRequest(method, path string, body interface{}) ([]byte, error) {
	var reqBody []byte
	var err error

	if body != nil {
		reqBody, err = json.Marshal(body)
		if err != nil {
			return nil, fmt.Errorf("error marshaling request body: %w", err)
		}
	}

	req, err := http.NewRequest(method, fmt.Sprintf("%s/%s", c.baseURL, path), bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Client-Version", version)
	req.Header.Set("X-SDK-Type", "go")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error sending request: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := readResponseBody(resp)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode >= 400 {
		return nil, c.handleErrorResponse(resp, respBody)
	}

	return respBody, nil
}

// readResponseBody reads the response body and returns it as a byte slice
func readResponseBody(resp *http.Response) ([]byte, error) {
	var respBody []byte
	buf := new(bytes.Buffer)
	_, err := buf.ReadFrom(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}
	respBody = buf.Bytes()
	return respBody, nil
}

// handleErrorResponse handles error responses from the API
func (c *Client) handleErrorResponse(resp *http.Response, body []byte) error {
	// Handle rate limit errors
	if resp.StatusCode == 429 {
		retryAfter := 60
		if retryStr := resp.Header.Get("Retry-After"); retryStr != "" {
			if retry, err := strconv.Atoi(retryStr); err == nil {
				retryAfter = retry
			}
		}
		return &RateLimitError{
			Message:    "rate limit exceeded",
			RetryAfter: retryAfter,
		}
	}

	// Handle API errors
	var apiErr Error
	if err := json.Unmarshal(body, &apiErr); err != nil {
		// If we can't unmarshal the error, create a generic one
		return &APIError{
			Message:    fmt.Sprintf("API error with status %d", resp.StatusCode),
			StatusCode: resp.StatusCode,
			RawBody:    string(body),
		}
	}

	return &APIError{
		Message:    apiErr.Error,
		StatusCode: resp.StatusCode,
		RawBody:    string(body),
	}
}
