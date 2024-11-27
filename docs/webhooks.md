# Webhooks Setup Guide

## Overview
Webhooks allow you to receive real-time notifications when fraud-related events occur.

## Configuration
1. Go to your dashboard
2. Navigate to Webhooks section
3. Add a new webhook URL
4. Select events to subscribe to

## Event Types
- `fraud_detected`: High-confidence fraud detection
- `suspicious_activity`: Potentially suspicious behavior
- `risk_score_change`: Significant changes in risk score

## Handling Webhook Events
```javascript
// Example webhook handler
app.post('/webhook', (req, res) => {
  const event = req.body;
  
  switch(event.type) {
    case 'fraud_detected':
      // Handle fraud detection
      break;
    case 'suspicious_activity':
      // Handle suspicious activity
      break;
  }
  
  res.sendStatus(200);
});
```