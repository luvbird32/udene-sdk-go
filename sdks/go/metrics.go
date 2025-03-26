
package udene

import (
	"encoding/json"
)

// Metrics represents the fraud detection metrics
type Metrics struct {
	RiskScore   float64 `json:"riskScore"`
	ActiveUsers int     `json:"activeUsers"`
	AlertCount  int     `json:"alertCount"`
}

// GetMetrics retrieves fraud detection metrics
func (c *Client) GetMetrics() (*Metrics, error) {
	respBody, err := c.doRequest("GET", "metrics", nil)
	if err != nil {
		return nil, err
	}

	var metrics Metrics
	if err := json.Unmarshal(respBody, &metrics); err != nil {
		return nil, &APIError{
			Message:    "failed to unmarshal metrics response",
			StatusCode: 200,
			RawBody:    string(respBody),
		}
	}

	return &metrics, nil
}
