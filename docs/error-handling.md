# Error Handling Guidelines

## HTTP Status Codes
- 400: Bad Request (invalid input)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {
      "field": "Additional context"
    }
  }
}
```

## Common Error Codes
- `INVALID_INPUT`: Request validation failed
- `RATE_LIMITED`: API rate limit exceeded
- `INSUFFICIENT_FUNDS`: Transaction failed
- `FRAUD_DETECTED`: Suspicious activity detected

## Client Error Handling
```typescript
try {
  await api.post('/predict', data);
} catch (error) {
  if (error.response?.status === 429) {
    // Handle rate limiting
    await delay(1000);
    // Retry request
  }
}
```

## Logging and Monitoring
- All 5xx errors logged to Prometheus
- Error alerts sent to PagerDuty
- Error trends monitored in Grafana