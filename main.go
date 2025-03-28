package main

import (
	"fmt"

	"github.com/luvbird32/udene-sdk-go"
)

func main() {
	fmt.Println("Hello World!")

	// Example of using the SDK
	client := udene.NewClient("your_api_key")

	// Get fraud metrics
	metrics, err := client.GetMetrics()
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	fmt.Printf("Current risk score: %f\n", metrics.RiskScore)
}
