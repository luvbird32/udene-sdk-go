
package udene

import (
	"encoding/json"
)

// InteractionData represents the data sent when tracking an interaction
type InteractionData struct {
	UserID   string                 `json:"userId"`
	Action   string                 `json:"action"`
	Metadata map[string]interface{} `json:"metadata,omitempty"`
}

// InteractionResponse represents the response from tracking an interaction
type InteractionResponse struct {
	Success      bool   `json:"success"`
	TransactionID string `json:"transactionId,omitempty"`
}

// TrackInteraction sends interaction data to the Udene API
func (c *Client) TrackInteraction(data *InteractionData) error {
	respBody, err := c.doRequest("POST", "track", data)
	if err != nil {
		return err
	}

	var response InteractionResponse
	if err := json.Unmarshal(respBody, &response); err != nil {
		return &APIError{
			Message:    "failed to unmarshal track interaction response",
			StatusCode: 200,
			RawBody:    string(respBody),
		}
	}

	if !response.Success {
		return &APIError{
			Message:    "interaction tracking unsuccessful",
			StatusCode: 200,
			RawBody:    string(respBody),
		}
	}

	return nil
}
