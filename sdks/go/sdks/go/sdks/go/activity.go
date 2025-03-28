
package udene

import (
	"encoding/json"
)

// Activity represents activity data from the API
type Activity struct {
	Activities []ActivityItem `json:"activities"`
	Total      int            `json:"total"`
}

// ActivityItem represents a single activity item
type ActivityItem struct {
	ID        string                 `json:"id"`
	Timestamp string                 `json:"timestamp"`
	Type      string                 `json:"type"`
	UserID    string                 `json:"userId"`
	Data      map[string]interface{} `json:"data"`
}

// GetActivity retrieves activity data
func (c *Client) GetActivity() (*Activity, error) {
	respBody, err := c.doRequest("GET", "activity", nil)
	if err != nil {
		return nil, err
	}

	var activity Activity
	if err := json.Unmarshal(respBody, &activity); err != nil {
		return nil, &APIError{
			Message:    "failed to unmarshal activity response",
			StatusCode: 200,
			RawBody:    string(respBody),
		}
	}

	return &activity, nil
}
