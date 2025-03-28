
# Udene Go SDK

The official Go SDK for Udene Fraud Detection API.

## Installation

```bash
go get github.com/YOUR_USERNAME/udene-sdk-go
```

## Usage

```go
package main

import (
    "fmt"
    "github.com/YOUR_USERNAME/udene-sdk-go"
)

func main() {
    client := udene.NewClient("your_api_key")

    // Get fraud metrics
    metrics, err := client.GetMetrics()
    if err != nil {
        if rateErr, ok := err.(*udene.RateLimitError); ok {
            fmt.Printf("Rate limit exceeded. Retry after: %d seconds\n", rateErr.RetryAfter)
            return
        }
        fmt.Printf("Error: %v\n", err)
        return
    }
    fmt.Printf("Current risk score: %f\n", metrics.RiskScore)

    // Track user interaction
    interaction := &udene.InteractionData{
        UserID: "user_123",
        Action: "login",
        Metadata: map[string]interface{}{
            "ipAddress": "192.168.1.1",
            "deviceId":  "device_456",
        },
    }

    err = client.TrackInteraction(interaction)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
}
```

## Documentation

For complete documentation, visit [https://docs.udene.net](https://docs.udene.net)

## License

MIT
