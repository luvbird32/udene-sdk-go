import { CodeBlock } from "../code-block/CodeBlock";

export const GoSDK = () => {
  const goCode = `// Install the package
// go get github.com/udene/udene-sdk-go

package main

import (
    "fmt"
    "github.com/udene/udene-sdk-go"
)

func main() {
    client := udene.NewClient("your_api_key")

    // Example: Get fraud metrics
    metrics, err := client.GetMetrics()
    if err != nil {
        if rateErr, ok := err.(*udene.RateLimitError); ok {
            fmt.Printf("Rate limit exceeded. Retry after: %d seconds\\n", rateErr.RetryAfter)
            return
        }
        fmt.Printf("Error: %v\\n", err)
        return
    }
    fmt.Printf("Current risk score: %f\\n", metrics.RiskScore)

    // Example: Track user interaction
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
        fmt.Printf("Error: %v\\n", err)
        return
    }
}`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Go</h4>
      <CodeBlock code={goCode} language="go" />
    </div>
  );
};